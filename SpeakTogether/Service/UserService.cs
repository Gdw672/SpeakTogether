using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Context.Interface;
using SpeakTogether.Enums;
using SpeakTogether.Models;
using SpeakTogether.Service.Interface;
using SpeakTogether.Service.PasswordHasher.Interface;
using System.Diagnostics.Eventing.Reader;

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

        public User CreateUser(string Name, string Email, string Password, DateTime RegistrationDate, LangLevel Level)
        {
            var registrationDateUtc = DateTime.SpecifyKind(RegistrationDate, DateTimeKind.Utc);

            var hash = passwordHashService.Hash(Password);

            var user = new User { Name = Name, Email = Email, PasswordHash = hash, RegistrationDate = registrationDateUtc, Level = Level };

            speakTogetherDbContext.Users.Add(user);
            speakTogetherDbContext.SaveChanges();

            return user;
        }

        public bool Verify(string name, string password)
        {
           var hash = speakTogetherDbContext.Users.FirstOrDefault(user => user.Name == name).PasswordHash;

           return passwordHashService.Verify(password, hash);
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
