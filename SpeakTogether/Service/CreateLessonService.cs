using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Context.Interface;
using SpeakTogether.Enums;
using SpeakTogether.Models;
using SpeakTogether.Service.Interface;

namespace SpeakTogether.Service
{
    public class CreateLessonService : ICreateLessonService
    {
        private ISpeakTogetherDbContext speakTogetherDbContext;

        public CreateLessonService(ISpeakTogetherDbContext speakTogetherDbContext) 
        { 
          this.speakTogetherDbContext = speakTogetherDbContext;
        }
        public Lesson CreateLesson(string Name, string Description, DateTime StartDate, DateTime EndDate, LangLevel langLevel)
        {
            var startDateUtc = DateTime.SpecifyKind(StartDate, DateTimeKind.Utc);
            var endDateUtc = DateTime.SpecifyKind(EndDate, DateTimeKind.Utc);

            var lessons = speakTogetherDbContext.GetLessons();
            var lesson = new Lesson(Name, Description, langLevel, startDateUtc, endDateUtc);

            lessons.Add(lesson);
            speakTogetherDbContext.SaveChanges();

            return lesson;
        }
    }
}
