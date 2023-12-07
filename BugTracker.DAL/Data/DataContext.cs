using BugTracker.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.DAL.Data
{
    public class DataContext : DbContext
    {
        public DataContext() { }
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }


        public DbSet<Issue> Issues { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Project> Projects { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Project>()
                .HasMany(e => e.Issues)
                .WithOne(e => e.Project)
                .HasForeignKey(e => e.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Issue>()
                .HasMany(e => e.Comments)
                .WithOne(e => e.Issue)
                .HasForeignKey(e => e.IssueId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
