using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SpeakTogether.Models;
using System.Security.Claims;

namespace SpeakTogether.SignalR
{
    public class NotificationHub : Hub
    {
        [Authorize]
        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        [Authorize]
        public override Task OnDisconnectedAsync(Exception exception)
        {
            return base.OnDisconnectedAsync(exception);
        }
    }
}
