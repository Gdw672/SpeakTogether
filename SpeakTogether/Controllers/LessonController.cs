using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Enums;
using SpeakTogether.Models;
using SpeakTogether.Models.DTOs.lesson;
using SpeakTogether.Service.Interface;
using System.Security.Claims;
using System.Threading.Tasks;

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

        [Authorize]
        [HttpPost("create-with-materials-dto")]
        public async Task<IActionResult> CreateLessonWithMaterial([FromBody] CreateLessonWithMaterialsDto dto)
        {
            var creatorId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            return Ok(await lessonService.CreateLessonWithDTO(
                dto.Name,
                dto.Description,
                dto.StartDate,
                dto.EndDate,
                dto.Language,
                dto.LangLevel,
                creatorId
            ));
        }

        [HttpDelete]
        public IActionResult DeleteLesson(int id)
        {
            return Ok(lessonService.DeleteLesson(id));
        }
    }
}
