using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Service;
using SpeakTogether.Service.Interface;
using SpeakTogether.Models.DTOs;

namespace SpeakTogether.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ZoomController : Controller
    {
        private readonly IZoomService zoomService;
        public ZoomController(IZoomService zoomService)
        { 
           this.zoomService = zoomService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateMeeting(LessonDTO lessonDTO)
        {
            var result = await zoomService.CreateConferenceAsync(lessonDTO);
            return Ok(result);
        }
    }
}
