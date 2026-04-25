using SpeakTogether.Enums;

namespace SpeakTogether.Models
{
    public class UserLanguage
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public Language Language { get; set; }
        public LangLevel Level { get; set; }
    }
}
