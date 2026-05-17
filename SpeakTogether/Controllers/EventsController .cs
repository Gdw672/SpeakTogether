using Hangfire;
using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Hangfire;

namespace SpeakTogether.Controllers
{
    public class EventsController
    {
        private readonly IBackgroundJobClient _jobs;

        public EventsController(IBackgroundJobClient jobs)
        {
            _jobs = jobs;
        }

        /*[HttpPost]
        public IActionResult Create(*//*EventDto dto*//*)
        {
            var notifyTime = dto.DateTime.AddHours(-1);

            _jobs.Schedule<NotificationJob>(
                j => j.Execute(dto.UserId, "Событие через 1 час"),
                notifyTime
            );

            return Ok();
        }*/
    }
}
