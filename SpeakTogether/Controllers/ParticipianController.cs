using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Enums;
using SpeakTogether.Service;
using SpeakTogether.Service.Interface;
using System.Security.Claims;
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

        [Authorize]
        [HttpPost("add-participian-to-lesson")]
        public async Task<IActionResult> AddParticipianToLesson(int LessonId)
        {
            var UserId = int.Parse(
                    User.FindFirst(ClaimTypes.NameIdentifier).Value
                );
            return Ok(await lessonParticipianService.AddParticipianToLesson(UserId, LessonId));
        }
    }
}
