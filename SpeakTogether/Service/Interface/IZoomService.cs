using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Models.DTOs;

namespace SpeakTogether.Service.Interface
{
    public interface IZoomService
    {
        public Task<ZoomLinksDTO> CreateConferenceAsync(LessonDTO lessonDTO);
    }
}
