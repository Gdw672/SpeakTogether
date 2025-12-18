using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Context.Interface;
using SpeakTogether.Enums;
using SpeakTogether.Models;
using SpeakTogether.Service.FileStorage.Interface;
using SpeakTogether.Service.Interface;

namespace SpeakTogether.Service
{
    public class LessonService : ILessonService
    {
        private ISpeakTogetherDbContext speakTogetherDbContext;
        private IFileStorage fileStorageService;


        public LessonService(ISpeakTogetherDbContext speakTogetherDbContext, IFileStorage fileStorage) 
        { 
          this.speakTogetherDbContext = speakTogetherDbContext;
          this.fileStorageService = fileStorage;  
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

        public Lesson DeleteLesson(int Id)
        {
            var lessons = speakTogetherDbContext.Lessons;

            var lessonToDelete = lessons.Where(lesson => lesson.Id == Id).First();

            lessons.Remove(lessonToDelete);
            speakTogetherDbContext.SaveChanges();
            return lessonToDelete;
        }
    }
}
