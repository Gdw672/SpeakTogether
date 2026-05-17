using SpeakTogether.Enums;

namespace SpeakTogether.Models.DTOs.lesson
{
    public class LessonDtoResponse
    {
        public int Id { get; set; }
        public int CreatorId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Language Language { get; set; }
        public LangLevel LangLevel { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string ZoomStartUrl { get; set; }
        public string ZoomJoinUrl { get; set; }
        public bool IsEnrolled { get; set; }
        public bool IsOwner { get; set; }
    }
}
