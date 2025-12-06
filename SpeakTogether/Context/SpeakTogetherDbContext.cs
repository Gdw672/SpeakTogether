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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Lesson>()
              .HasOne(l => l.LessonCreator)   
              .WithMany(u => u.Lessons)
              .HasForeignKey(l => l.CreatorId)
              .OnDelete(DeleteBehavior.Restrict);

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Material> Materials { get; set; }


        public DbSet<Lesson> GetLessons()
        {
            return Lessons;
        }

        public DbSet<User> GetUsers()
        {
            return Users;
        }

        public DbSet<Material> GetMaterials()
        {
            return Materials;
        }

        public void SaveChanges()
        {
            base.SaveChanges();
        }
    }
}
