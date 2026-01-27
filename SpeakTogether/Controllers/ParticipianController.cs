using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Enums;
using SpeakTogether.Service;
using SpeakTogether.Service.Interface;
using System.Xml.Linq;

namespace SpeakTogether.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ParticipianController : Controller
    {
        private readonly ILessonParticipianService lessonParticipianService;

        public ParticipianController (ILessonParticipianService lessonParticipianService)
        {
            this.lessonParticipianService = lessonParticipianService;
        }

        [HttpPost("add-participian-to-lesson")]
        public async Task<IActionResult> AddParticipianToLesson(int UserId, int LessonId)
        {
            return Ok(await lessonParticipianService.AddParticipianToLesson(UserId, LessonId));
        }
    }
}
