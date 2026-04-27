using SpeakTogether.Enums;
using SpeakTogether.Models;

namespace SpeakTogether.Models
{
    public class User
    {

        public User() { }

        public User(string Name, string Email, string PasswordHash, DateTime RegistrationDate, bool IsEmailVerified = false) 
        {
            this.Name = Name;
            this.Email = Email;
            this.IsEmailVerified = false;
            this.PasswordHash = PasswordHash;
            this.RegistrationDate = RegistrationDate;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsEmailVerified { get; set; }
        public string PasswordHash { get; set; }
        public DateTime RegistrationDate { get; set; }
        public ICollection<UserLanguage> Languages { get; set; } = new List<UserLanguage>();
        public ICollection<UserLanguagePreference> LanguagePreferences { get; set; } = new List<UserLanguagePreference>();
        public ICollection<LessonParticipant> LessonParticipants { get; set; } = new List<LessonParticipant>();
        public UserStatus UserStatus { get; set; } = UserStatus.Active;
    }
}
