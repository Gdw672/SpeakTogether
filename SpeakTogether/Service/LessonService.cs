using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Context.Interface;
using SpeakTogether.Enums;
using SpeakTogether.Models;
using SpeakTogether.Service.Interface;

namespace SpeakTogether.Service
{
    public class LessonService : ILessonService
    {
        private ISpeakTogetherDbContext speakTogetherDbContext;

        public LessonService(ISpeakTogetherDbContext speakTogetherDbContext) 
        { 
          this.speakTogetherDbContext = speakTogetherDbContext;
        }
        public Lesson CreateLesson(string Name, string Description, DateTime StartDate, DateTime EndDate, LangLevel langLevel, int CreatorId)
        {
            var startDateUtc = DateTime.SpecifyKind(StartDate, DateTimeKind.Utc);
            var endDateUtc = DateTime.SpecifyKind(EndDate, DateTimeKind.Utc);

            var lessons = speakTogetherDbContext.GetLessons();
            var lesson = new Lesson(Name, Description, langLevel, startDateUtc, endDateUtc, CreatorId);

            lessons.Add(lesson);
            speakTogetherDbContext.SaveChanges();

            return lesson;
        }

        public Lesson DeleteLesson(int Id)
        {
            var lessons = speakTogetherDbContext.GetLessons();

            var lessonToDelete = lessons.Where(lesson => lesson.Id == Id).First();

            lessons.Remove(lessonToDelete);
            speakTogetherDbContext.SaveChanges();
            return lessonToDelete;
        }
    }
}
