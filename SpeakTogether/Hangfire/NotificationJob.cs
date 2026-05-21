using Microsoft.EntityFrameworkCore;
using SpeakTogether.Context;
using SpeakTogether.Service;
using SpeakTogether.Service.Interface;

namespace SpeakTogether.Hangfire
{
    public class NotificationJob
    {
        private readonly IServiceProvider _serviceProvider;

        public NotificationJob(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        //ToDo: сделать уведомление более корректные на уровне participiant.
        public async Task RunNotificationHeartbeat()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<SpeakTogetherDbContext>();
                var notificationService = scope.ServiceProvider.GetRequiredService<INotificationService>();

                var now = DateTime.UtcNow;
                var targetTime = now.AddMinutes(30);

                var lessons = await dbContext.Lessons
                    .Include(x => x.Participants)
                    .Where(x => x.StartDate <= targetTime && x.StartDate > now && !x.NotificationSent)
                    .ToListAsync();

                foreach (var lesson in lessons)
                {
                    foreach (var participant in lesson.Participants)
                    {
                        await notificationService.SendToUser(
                            participant.UserId.ToString(),
                            $"Урок '{lesson.Name}' начнётся менее чем через 30 минут.\n Ссылка: {lesson.ZoomJoinUrl}.");
                    }

                    if (lesson.CreatorId != 0)
                    {
                        await notificationService.SendToUser(
                            lesson.CreatorId.ToString(),
                            $"Ваш урок '{lesson.Name}' начнётся менее чем через 30 минут.\n Ссылка: {lesson.ZoomJoinUrl}.");

                        Console.WriteLine($"--------- УВЕДОМЛЕНИЕ ВЫДАНО СОЗДАТЕЛЮ {lesson.CreatorId}");
                    }

                    lesson.NotificationSent = true;
                }

                if (lessons.Any())
                {
                    await dbContext.SaveChangesAsync();
                }
            }
        }
    }
}
