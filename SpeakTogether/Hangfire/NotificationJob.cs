using SpeakTogether.Service;

namespace SpeakTogether.Hangfire
{
    public class NotificationJob
    {
        private readonly NotificationService _service;

        public NotificationJob(NotificationService service)
        {
            _service = service;
        }

        public Task Execute(string userId, string message)
        {
            return _service.SendToUser(userId, message);
        }
    }
}
