using Microsoft.EntityFrameworkCore;
using SpeakTogether.Models;

namespace SpeakTogether.Context.Interface
{
    public interface ISpeakTogetherDbContext
    {
        public DbSet<User> GetUsers();
        public DbSet<Lesson> GetLessons();
        public void SaveChanges();
    }
}
