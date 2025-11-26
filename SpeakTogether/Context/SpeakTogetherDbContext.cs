using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpeakTogether.Context.Interface;
using SpeakTogether.Models;

namespace SpeakTogether.Context
{
    public class SpeakTogetherDbContext : DbContext, ISpeakTogetherDbContext
    {
        public SpeakTogetherDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Lesson> Lessons { get; set; }

        public DbSet<Lesson> GetLessons()
        {
            return Lessons;
        }

        public DbSet<User> GetUsers()
        {
            return Users;
        }

        public void SaveChanges()
        {
            base.SaveChanges();
        }
    }
}
