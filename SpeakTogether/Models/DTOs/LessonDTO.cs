using SpeakTogether.Enums;

namespace SpeakTogether.Models.DTOs
{
    public class LessonDTO
    {
        public LessonDTO() { }
        public LessonDTO(int creatorId, string name, string description, LangLevel langLevel, DateTime startDate, DateTime endDate)
        {
            Name = name;
            Description = description;
            LangLevel = langLevel;
            StartDate = startDate;
            EndDate = endDate; }
        public string Name { get; set; }
        public string Description { get; set; }
        public LangLevel LangLevel { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
