using Microsoft.AspNetCore.Mvc;

namespace SpeakTogether.Service.Interface
{
    public interface IZoomService
    {
        public Task<string> CreateConferenceAsync(int lessonId);
    }
}
