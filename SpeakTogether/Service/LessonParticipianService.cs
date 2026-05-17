using Microsoft.AspNetCore.Routing.Constraints;
using Microsoft.EntityFrameworkCore;
using SpeakTogether.Context.Interface;
using SpeakTogether.Models;
using SpeakTogether.Service.Interface;

namespace SpeakTogether.Service
{
    public class LessonParticipianService : ILessonParticipianService
    {
        private readonly ISpeakTogetherDbContext speakTogetherDbContext;

        public LessonParticipianService(ISpeakTogetherDbContext speakTogetherDbContext) 
        { 
            this.speakTogetherDbContext = speakTogetherDbContext;
        }
        public async Task<LessonParticipant> AddParticipianToLesson(int userId, int lessonId)
        {
            var exists = await speakTogetherDbContext.LessonParticipants
                .AnyAsync(x => x.UserId == userId && x.LessonId == lessonId);

            if (exists)
                return null;

            var newParticipian = new LessonParticipant
            {
                UserId = userId,
                LessonId = lessonId
            };

            await speakTogetherDbContext.LessonParticipants.AddAsync(newParticipian);
            await speakTogetherDbContext.SaveChangesAsync();

            return newParticipian;
        }
    }
}
