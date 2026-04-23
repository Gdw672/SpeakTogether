using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Context.Interface;
using SpeakTogether.Enums;
using SpeakTogether.Models;
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
        public UserService(ISpeakTogetherDbContext speakTogetherDbContext, IPasswordHashService passwordHashService) 
        { 
          this.speakTogetherDbContext = speakTogetherDbContext;
          this.passwordHashService = passwordHashService;
        }

        public User CreateUser(string Name, string Email, string Password, DateTime RegistrationDate, LangLevel? Level = null)
        {
            var existingUser = speakTogetherDbContext.Users.FirstOrDefault(u => u.Email == Email);

            if (existingUser != null)
                return null;

            var user = new User
            {
                Name = Name,
                Email = Email,
                PasswordHash = passwordHashService.Hash(Password),
                RegistrationDate = DateTime.SpecifyKind(RegistrationDate, DateTimeKind.Utc),
                Level = Level ?? LangLevel.Elementary
            };

            speakTogetherDbContext.Users.Add(user);
            speakTogetherDbContext.SaveChanges();

            return user;
        }

        public bool Verify(string email, string password)
        {
           var user = speakTogetherDbContext.Users.FirstOrDefault(user => user.Email == email);

            if (user == null)
                return false;

            return passwordHashService.Verify(password, user.PasswordHash);
        }

        public User SoftDelete(int Id)
        {
           var users = speakTogetherDbContext.Users;
           var user = users.Where(user => user.Id == Id).FirstOrDefault();
           user.UserStatus = UserStatus.Deleted;
           speakTogetherDbContext.SaveChanges();
           return user;
        }
    }
}
