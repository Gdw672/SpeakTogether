using SpeakTogether.Enums;
using SpeakTogether.Models;

namespace SpeakTogether.Models
{
    public class User
    {
        public User() { }

        public User(string Name, string Email, string PasswordHash, DateTime RegistrationDate, LangLevel Level) 
        {
            this.Name = Name;
            this.Email = Email;
            this.PasswordHash = PasswordHash;
            this.RegistrationDate = RegistrationDate;
            this.Level = Level;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public DateTime RegistrationDate { get; set; }
        public LangLevel Level { get; set; }
        public ICollection<LessonParticipant> LessonParticipants { get; set; } = new List<LessonParticipant>();
        public UserStatus UserStatus { get; set; } = UserStatus.Active;
    }
}
