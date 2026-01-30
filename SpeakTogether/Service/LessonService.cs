using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpeakTogether.Context.Interface;
using SpeakTogether.Enums;
using SpeakTogether.Models;
using SpeakTogether.Models.DTOs;
using SpeakTogether.Service.FileStorage.Interface;
using SpeakTogether.Service.Interface;

namespace SpeakTogether.Service
{
    public class LessonService : ILessonService
    {
        private ISpeakTogetherDbContext speakTogetherDbContext;
        private IFileStorage fileStorageService;

        private IZoomService zoomService;
        public LessonService(ISpeakTogetherDbContext speakTogetherDbContext, IFileStorage fileStorage, IZoomService zoomService) 
        { 
          this.speakTogetherDbContext = speakTogetherDbContext;
          this.fileStorageService = fileStorage;  
          this.zoomService = zoomService;
        }
        public Lesson CreateLesson(string Name, string Description, DateTime StartDate, DateTime EndDate, LangLevel langLevel, int CreatorId)
        {
            var startDateUtc = DateTime.SpecifyKind(StartDate, DateTimeKind.Utc);
            var endDateUtc = DateTime.SpecifyKind(EndDate, DateTimeKind.Utc);

            var lessons = speakTogetherDbContext.Lessons;
            var lesson = new Lesson(Name, Description, langLevel, startDateUtc, endDateUtc, CreatorId);

            lessons.Add(lesson);
            speakTogetherDbContext.SaveChanges();

            return lesson;
        }

        public async Task<Lesson> CreateLesson(
    string Name,
    string Description,
    DateTime StartDate,
    DateTime EndDate,
    LangLevel langLevel,
    int CreatorId,
    IFormFile file)
        {
            var path = await fileStorageService.SaveFileAsync(file);

            var startDateUtc = DateTime.SpecifyKind(StartDate, DateTimeKind.Utc);
            var endDateUtc = DateTime.SpecifyKind(EndDate, DateTimeKind.Utc);


            var lesson = new Lesson(Name, Description, langLevel, startDateUtc, endDateUtc, CreatorId);

            var material = new Material(file.FileName, path, file.ContentType);

            lesson.Materials.Add(material);

            speakTogetherDbContext.Lessons.Add(lesson);

            speakTogetherDbContext.SaveChanges();

            return lesson;
        }

        public async Task<Lesson> CreateLessonWithDTO(
    string Name,
    string Description,
    DateTime StartDate,
    DateTime EndDate,
    LangLevel langLevel,
    int CreatorId,
    IFormFile file)
        {
            var path = await fileStorageService.SaveFileAsync(file);

            var startDateUtc = DateTime.SpecifyKind(StartDate, DateTimeKind.Utc);
            var endDateUtc = DateTime.SpecifyKind(EndDate, DateTimeKind.Utc);

            var lessonDTO = new LessonDTO(CreatorId, Name, Description, langLevel, startDateUtc, endDateUtc);

            var links = await zoomService.CreateConferenceAsync(lessonDTO);

            var material = new Material(file.FileName, path, file.ContentType);

            var lesson = new Lesson(lessonDTO, CreatorId, links);

            lesson.Materials.Add(material);

            speakTogetherDbContext.Lessons.Add(lesson);

            speakTogetherDbContext.SaveChanges();

            return lesson;
        }

        public Lesson DeleteLesson(int Id)
        {
            var lessons = speakTogetherDbContext.Lessons;

            var lessonToDelete = lessons.Where(lesson => lesson.Id == Id).First();

            lessons.Remove(lessonToDelete);
            speakTogetherDbContext.SaveChanges();
            return lessonToDelete;
        }
        public async Task<Lesson?> FindByIdAsync(int id)
        {
            var lessons = speakTogetherDbContext.Lessons;
            return await lessons.FirstOrDefaultAsync(lesson => lesson.Id == id);
        }
    }
}
