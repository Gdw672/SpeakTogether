using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Enums;
using SpeakTogether.Models;

namespace SpeakTogether.Service.Interface
{
    public interface ICreateLessonService
    {
        public Lesson CreateLesson(string Name, string Description, DateTime StartDate, DateTime EndDate, LangLevel langLevel);
    }
}
