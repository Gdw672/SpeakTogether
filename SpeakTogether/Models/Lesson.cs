using Microsoft.EntityFrameworkCore.Query.Internal;
using SpeakTogether.Enums;
using System.Text.Json.Serialization;
using SpeakTogether.Models.DTOs;
namespace SpeakTogether.Models
{
    public class Lesson
    {
        public Lesson() { }
        public Lesson(string Name, string Description, LangLevel LangLevel, DateTime StartDate, DateTime EndDate, int CreatorId) 
        {
            this.Name = Name;
            this.Description = Description;
            this.LangLevel = LangLevel;
            this.StartDate = StartDate;
            this.EndDate = EndDate;
            this.CreatorId = CreatorId;
        }
        public Lesson(LessonDTO lessonDTO, int CreatorId, ZoomLinksDTO zoomLinksDTO)
        {
            this.Name = lessonDTO.Name;
            this.Description = lessonDTO.Description;
            this.LangLevel= lessonDTO.LangLevel;
            this.StartDate = lessonDTO.StartDate;
            this.EndDate = lessonDTO.EndDate;
            this.CreatorId = CreatorId;
            this.ZoomJoinUrl = zoomLinksDTO.JoinUrl;
            this.ZoomStartUrl = zoomLinksDTO.StartUrl;
        }

        public int  Id { get; set; }
        public int  CreatorId { get; set; }
        [JsonIgnore]
        public User LessonCreator { get; set; } 
        public string Name { get; set; }
        public string Description { get; set; }
        public LangLevel LangLevel { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string ZoomStartUrl { get; set; }
        public string ZoomJoinUrl { get; set; }
        public ICollection<Material> Materials { get; set; } = new List<Material>();
        public ICollection<LessonParticipant> Participants { get; set; } = new List<LessonParticipant>();
    }
}
