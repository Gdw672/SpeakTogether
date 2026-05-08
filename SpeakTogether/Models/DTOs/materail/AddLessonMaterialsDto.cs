namespace SpeakTogether.Models.DTOs.materail
{
    public class AddLessonMaterialsDto
    {
        public int LessonId { get; set; }

        public List<IFormFile> Files { get; set; } = new();

        public List<string> Links { get; set; } = new();
    }
}
