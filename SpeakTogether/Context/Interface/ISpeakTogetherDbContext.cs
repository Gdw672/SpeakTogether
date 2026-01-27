using Microsoft.EntityFrameworkCore;
using SpeakTogether.Models;

namespace SpeakTogether.Context.Interface
{
    public interface ISpeakTogetherDbContext
    {
        DbSet<User> Users { get; }
        DbSet<Lesson> Lessons { get; }
        DbSet<Material> Materials { get; }
        DbSet<LessonParticipant> LessonParticipants { get; }
        public void SaveChanges();
        Task<int> SaveChangesAsync();

    }
}
