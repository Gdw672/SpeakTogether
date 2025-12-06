using System.Text.Json.Serialization;

namespace SpeakTogether.Models
{
    public class Material
    {
        public Material() { }

        public Material(string name, string path, string type)
        {
            Name = name;
            Path = path;
            Type = type;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public string Type { get; set; }
        public int LessonId { get; set; }
        [JsonIgnore]
        public Lesson Lesson { get; set; }
    }
}
