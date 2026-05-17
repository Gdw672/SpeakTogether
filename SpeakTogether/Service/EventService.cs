using Hangfire;
using SpeakTogether.Context;
using SpeakTogether.Hangfire;

namespace SpeakTogether.Service
{
    public class EventService
    {
        private SpeakTogetherDbContext context;
        private readonly IBackgroundJobClient _jobs;

        public EventService(SpeakTogetherDbContext context, IBackgroundJobClient jobs)
        {
            this.context = context;
            this._jobs = jobs;
        }

        public void ScheduleNotification(int eventId)
        {
        /*    if (*//*ev == null*//*)
                throw new Exception("Event not found");

            var notifyTime = ev.DateTime.AddHours(-1);

            _jobs.Schedule<NotificationJob>(
                j => j.Execute(ev.UserId, "Событие через 1 час"),
                notifyTime
            );*/
        }



    }
}
