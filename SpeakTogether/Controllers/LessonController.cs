using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Enums;
using SpeakTogether.Models;
using SpeakTogether.Service.Interface;

namespace SpeakTogether.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LessonController : ControllerBase
    {
        private ICreateLessonService createLessonService;
        public LessonController(ICreateLessonService createLessonService)
        {
         this.createLessonService = createLessonService;
        }

        [HttpPost]
        public IActionResult CreateLesson(string Name, string Description, DateTime StartDate, DateTime EndDate, LangLevel langLevel)
        {
           return Ok(createLessonService.CreateLesson(Name, Description, StartDate, EndDate, langLevel));
        }
    }
}
