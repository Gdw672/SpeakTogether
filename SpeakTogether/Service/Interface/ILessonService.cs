using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Enums;
using SpeakTogether.Models;
using SpeakTogether.Models.DTOs.lesson;
using SpeakTogether.Models.DTOs.materail;

namespace SpeakTogether.Service.Interface
{
    public interface ILessonService
    {
        Task<List<LessonDtoResponse>> GetLessons(int creatorId);
        Task<Lesson> CreateLessonWithDTO(string Name, string Description, DateTime StartDate, DateTime EndDate, Language language, LangLevel langLevel, int CreatorId, IFormFile? file = null);
        Task<List<LessonDtoResponse>> GetHistory(int userId);
        Task<bool> AddMaterialToLesson(AddLessonMaterialsDto dto);
        public Lesson DeleteLesson(int Id);
        Task<Lesson?> FindByIdAsync(int id);
    }
}
