using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SpeakTogether.Models;
using System.Security.Claims;

namespace SpeakTogether.SignalR
{
    public class NotificationHub : Hub
    {
        [Authorize]
        public void Notify()
        {
            var creatorId = int.Parse(
                            Context.User.FindFirst(ClaimTypes.NameIdentifier).Value
                        );


        }
    }
}
