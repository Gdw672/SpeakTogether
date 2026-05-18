using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SpeakTogether.Models;
using System.Security.Claims;

namespace SpeakTogether.SignalR
{
    public class NotificationHub : Hub
    {
        [Authorize]
        public override async Task OnConnectedAsync()
        {
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!string.IsNullOrEmpty(userId))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, userId);
                Console.WriteLine($" User {userId} connected. ConnectionId: {Context.ConnectionId}");
            }

            await base.OnConnectedAsync();
        }

        [Authorize]
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!string.IsNullOrEmpty(userId))
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, userId);
                Console.WriteLine($" User {userId} disconnected");
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
