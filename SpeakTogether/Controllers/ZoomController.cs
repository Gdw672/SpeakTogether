using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Service;
using SpeakTogether.Service.Interface;

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
        public async Task<IActionResult> CreateMeeting(int lessonId)
        {
            var result = await zoomService.CreateConferenceAsync(lessonId);
            return Ok(result);
        }
    }
}
