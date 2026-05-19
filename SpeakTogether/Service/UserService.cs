using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpeakTogether.Context.Interface;
using SpeakTogether.Enums;
using SpeakTogether.Models;
using SpeakTogether.Models.DTOs.language;
using SpeakTogether.Service.Interface;
using SpeakTogether.Service.PasswordHasher.Interface;
using System.Diagnostics.Eventing.Reader;
using System.Reflection.Emit;

namespace SpeakTogether.Service
{
    public class UserService : IUserService
    {
        private ISpeakTogetherDbContext speakTogetherDbContext;
        private IPasswordHashService passwordHashService;
        private IJwtService jwtService;
        public UserService(ISpeakTogetherDbContext speakTogetherDbContext, IPasswordHashService passwordHashService, IJwtService jwtService) 
        { 
          this.speakTogetherDbContext = speakTogetherDbContext;
          this.passwordHashService = passwordHashService;
          this.jwtService = jwtService;
        }

        public async Task<User> CreateUser(string Name, string Email, string Password, DateTime RegistrationDate)
        {
            var existingUser = await speakTogetherDbContext.Users.FirstOrDefaultAsync(u => u.Email == Email);

            if (existingUser != null)
                return null;

            var user = new User
            {
                Name = Name,
                Email = Email,
                PasswordHash = await passwordHashService.HashAsync(Password),
                RegistrationDate = DateTime.SpecifyKind(RegistrationDate, DateTimeKind.Utc),
            };

            await speakTogetherDbContext.Users.AddAsync(user);
            await speakTogetherDbContext.SaveChangesAsync();

            return user;
        }

        public async Task<bool> Verify(string email, string password)
        {
            var user = await speakTogetherDbContext.Users.FirstOrDefaultAsync(user => user.Email == email);

            if (user == null)
                return false;

            return await passwordHashService.VerifyAsync(password, user.PasswordHash);
        }

        private async Task<User> VerifyUserAsync(string email, string password)
        {
            var user = await speakTogetherDbContext.Users.FirstOrDefaultAsync(user => user.Email == email);

            if (user == null)
                return null;

            var success = await passwordHashService.VerifyAsync(password, user.PasswordHash);

            if (!success) return null;

            return user;
        }

        public User SoftDelete(int Id)
        {
           var users = speakTogetherDbContext.Users;
           var user = users.Where(user => user.Id == Id).FirstOrDefault();
           user.UserStatus = UserStatus.Deleted;
           speakTogetherDbContext.SaveChanges();
           return user;
        }

        public async Task<string> LoginAsync(string email, string password)
        {
            var user = await VerifyUserAsync(email, password);

            if (user == null)
                return null;

           return jwtService.GenerateToken(user);
        }

        public async Task AddLanguagesAsync(int userId, List<UserLanguageDto> languages)
        {
            var user = await speakTogetherDbContext.Users.Include(u => u.Languages).FirstOrDefaultAsync(user => user.Id == userId);

            if (user == null)
                throw new Exception("User not found");

            foreach (var lang in languages)
            {
                var existing = user.Languages
                    .FirstOrDefault(l => l.Language == lang.Language);

                if (existing != null)
                {
                    existing.Level = lang.Level;
                }
                else
                {
                    user.Languages.Add(new UserLanguage
                    {
                        UserId = userId,
                        Language = lang.Language,
                        Level = lang.Level
                    });
                }
            }

            await speakTogetherDbContext.SaveChangesAsync();
        }

        public async Task AddPreferencesAsync(int userId, List<UserLanguagePreferenceDto> preferences)
        {
            var user = await speakTogetherDbContext.Users
                .Include(u => u.LanguagePreferences)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                throw new Exception("User not found");

            // проще и чище: пересоздаём preferences
            user.LanguagePreferences.Clear();

            foreach (var pref in preferences)
            {
                if (pref.MinLevel > pref.MaxLevel)
                    throw new Exception("MinLevel cannot be greater than MaxLevel");

                user.LanguagePreferences.Add(new UserLanguagePreference
                {
                    UserId = userId,
                    Language = pref.Language,
                    MinLevel = pref.MinLevel,
                    MaxLevel = pref.MaxLevel
                });
            }

            await speakTogetherDbContext.SaveChangesAsync();
        }
    }
}
