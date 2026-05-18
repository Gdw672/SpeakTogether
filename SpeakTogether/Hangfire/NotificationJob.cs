using Microsoft.EntityFrameworkCore;
using SpeakTogether.Context;
using SpeakTogether.Service;
using SpeakTogether.Service.Interface;

namespace SpeakTogether.Hangfire
{
    public class NotificationJob
    {
        private readonly NotificationService notificationService;
        private readonly SpeakTogetherDbContext speakTogetherDbContext;

        public NotificationJob(NotificationService service, SpeakTogetherDbContext speakTogetherDbContext)
        {
            notificationService = service;
            this.speakTogetherDbContext = speakTogetherDbContext;
        }

        public async Task Execute(string userId, string message)
        {
            var now = DateTime.UtcNow;
            var targetTime = now.AddMinutes(30);

            var lessons = await speakTogetherDbContext.Lessons
                .Include(x => x.Participants)
                    .ThenInclude(p => p.User)
                .Where(x =>
                    x.StartDate <= targetTime &&
                    x.StartDate > now &&
                    !x.NotificationSent)
                .ToListAsync();

            foreach (var lesson in lessons)
            {
                foreach (var participant in lesson.Participants)
                {
                    await notificationService.SendToUser(
                        participant.UserId.ToString(),
                        $"Урок '{lesson.Name}' начнётся менее чем через 30 минут");
                }

                lesson.NotificationSent = true;
            }

            await speakTogetherDbContext.SaveChangesAsync();
        }
    }
}
