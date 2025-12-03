using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Enums;
using SpeakTogether.Models;

namespace SpeakTogether.Service.Interface
{
    public interface ILessonService
    {
        public Lesson CreateLesson(string Name, string Description, DateTime StartDate, DateTime EndDate, LangLevel langLevel, int CreatorId);
        public Lesson DeleteLesson(int Id);
    }
}
