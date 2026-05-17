using Microsoft.AspNetCore.SignalR;
using SpeakTogether.Service.Interface;
using SpeakTogether.SignalR;

namespace SpeakTogether.Service
{
    public class NotificationService : INotificationService
    {
        private readonly IHubContext<NotificationHub> hub;

        public NotificationService(IHubContext<NotificationHub> hub)
        {
            this.hub = hub;
        }

        public Task SendToUser(string userId, string message)
        {
            return hub.Clients.User(userId)
                .SendAsync("ReceiveNotification", message);
        }
    }
}
