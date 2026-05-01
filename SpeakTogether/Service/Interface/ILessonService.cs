using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Enums;
using SpeakTogether.Models;

namespace SpeakTogether.Service.Interface
{
    public interface ILessonService
    {
        Task<Lesson> CreateLessonWithDTO(string Name, string Description, DateTime StartDate, DateTime EndDate, Language language, LangLevel langLevel, int CreatorId, IFormFile? file = null);
        public Lesson DeleteLesson(int Id);
        Task<Lesson?> FindByIdAsync(int id);
    }
}
