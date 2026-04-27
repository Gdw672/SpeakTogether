using SpeakTogether.Enums;

namespace SpeakTogether.Models.DTOs.language
{
    public class UserLanguagePreferenceDto
    {
        public Language Language { get; set; }
        public LangLevel MinLevel { get; set; }
        public LangLevel MaxLevel { get; set; }
    }
}
