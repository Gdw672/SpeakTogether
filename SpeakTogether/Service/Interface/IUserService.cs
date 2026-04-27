using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Enums;
using SpeakTogether.Models;
using SpeakTogether.Models.DTOs.language;

namespace SpeakTogether.Service.Interface
{
    public interface IUserService
    {
        public User CreateUser(string Name, string Email, string PasswordHash, DateTime RegistrationDate);

        public Task <string> LoginAsync(string email, string password);

        public User SoftDelete(int Id);
        public bool Verify(string email, string password);
        public Task AddLanguagesAsync(int userId, List<UserLanguageDto> languages);

    }
}
