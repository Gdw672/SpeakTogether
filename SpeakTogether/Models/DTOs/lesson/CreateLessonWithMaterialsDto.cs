using SpeakTogether.Enums;

namespace SpeakTogether.Models.DTOs.lesson
{
    public class CreateLessonWithMaterialsDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Language Language { get; set; }
        public LangLevel LangLevel { get; set; }
    }
}