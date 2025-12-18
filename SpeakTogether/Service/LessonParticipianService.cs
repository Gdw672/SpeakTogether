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
        public async Task<LessonParticipant> AddParticipianToLesson(int UserId, int LessonId)
        {
            var participians = speakTogetherDbContext.LessonParticipants;
            var newParticipian = new LessonParticipant { UserId = UserId, LessonId = LessonId };
            await speakTogetherDbContext.LessonParticipants.AddAsync(newParticipian);
            await speakTogetherDbContext.SaveChangesAsync();
            return newParticipian;
        }
    }
}
