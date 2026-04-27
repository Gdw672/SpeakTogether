using SpeakTogether.Enums;

namespace SpeakTogether.Models
{
    public class UserLanguagePreference
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public Language Language { get; set; }
        public LangLevel MinLevel { get; set; }
        public LangLevel MaxLevel { get; set; }
    }
}
