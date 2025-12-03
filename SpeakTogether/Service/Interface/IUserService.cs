using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Enums;
using SpeakTogether.Models;

namespace SpeakTogether.Service.Interface
{
    public interface IUserService
    {
        public User CreateUser(string Name, string Email, string PasswordHash, DateTime RegistrationDate, LangLevel Level);
        public User SoftDelete(int Id);

    }
}
