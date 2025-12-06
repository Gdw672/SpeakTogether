using SpeakTogether.Enums;
using System.Text.Json.Serialization;

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

        public int  Id { get; set; }
        public int  CreatorId { get; set; }
        [JsonIgnore]
        public User LessonCreator { get; set; } 
        public string Name { get; set; }
        public string Description { get; set; }
        public LangLevel LangLevel { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public ICollection<Material> Materials { get; set; } = new List<Material>();

    }
}
