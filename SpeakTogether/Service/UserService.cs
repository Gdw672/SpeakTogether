using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Context.Interface;
using SpeakTogether.Enums;
using SpeakTogether.Models;
using SpeakTogether.Service.Interface;

namespace SpeakTogether.Service
{
    public class UserService : IUserService
    {
        private ISpeakTogetherDbContext speakTogetherDbContext;

        public UserService(ISpeakTogetherDbContext speakTogetherDbContext) 
        { 
          this.speakTogetherDbContext = speakTogetherDbContext;
        }

        public User CreateUser(string Name, string Email, string PasswordHash, DateTime RegistrationDate, LangLevel Level)
        {
            var registrationDateUtc = DateTime.SpecifyKind(RegistrationDate, DateTimeKind.Utc);

            var user = new User { Name = Name, Email = Email, PasswordHash = PasswordHash, RegistrationDate = registrationDateUtc, Level = Level };

            speakTogetherDbContext.GetUsers().Add(user);
            speakTogetherDbContext.SaveChanges();

            return user;
        }

        public User SoftDelete(int Id)
        {
           var users = speakTogetherDbContext.GetUsers();
           var user = users.Where(user => user.Id == Id).FirstOrDefault();
           user.UserStatus = UserStatus.Deleted;
           speakTogetherDbContext.SaveChanges();
           return user;
        }
    }
}
