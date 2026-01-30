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
        private ILessonService lessonService;
        public LessonController(ILessonService lessonService)
        {
         this.lessonService = lessonService;
        }

        [HttpPost]
        public IActionResult CreateLesson(string Name, string Description, DateTime StartDate, DateTime EndDate, LangLevel langLevel, int CreatorId)
        {
           return Ok(lessonService.CreateLesson(Name, Description, StartDate, EndDate, langLevel, CreatorId));
        }

        [HttpPost("create-with-materials")]
        public async Task<IActionResult> CreateLessonWithMaterial(string Name, string Description, DateTime StartDate, DateTime EndDate, LangLevel langLevel, int CreatorId, IFormFile file)
        {
            Console.WriteLine(file.Name);

            return Ok(await lessonService.CreateLessonWithDTO(Name, Description, StartDate, EndDate, langLevel, CreatorId, file));
        }

        [HttpDelete]
        public IActionResult DeleteLesson(int id)
        {
            return Ok(lessonService.DeleteLesson(id));
        }
    }
}
