using SpeakTogether.Enums;

namespace SpeakTogether.Models
{
    public class Lesson
    {
        public Lesson() { }
        public Lesson(string Name, string Description, LangLevel LangLevel, DateTime StartDate, DateTime EndDate) 
        {
            this.Name = Name;
            this.Description = Description;
            this.LangLevel = LangLevel;
            this.StartDate = StartDate;
            this.EndDate = EndDate;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public LangLevel LangLevel { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
