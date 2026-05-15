using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Service.Interface;

namespace SpeakTogether.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        private readonly IMaterialService materialService;

        public MaterialController(IMaterialService materialService)
        {
            this.materialService = materialService;
        }

        [HttpGet("download/{fileName}")]
        public async Task<IActionResult> Download(string fileName)
        {
            var stream = await materialService.GetFileAsync(fileName);

            if (stream == null)
                return NotFound();

            var contentType = "application/octet-stream";
            return File(stream, contentType, fileName);
        }
    }
}
