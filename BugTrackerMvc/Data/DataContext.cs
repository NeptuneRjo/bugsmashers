using BugTrackerMvc.Interfaces;
using BugTrackerMvc.Models;
using Microsoft.EntityFrameworkCore;

namespace BugTrackerMvc.Data
{
    public class DataContext : DbContext, IDataContext
    {
        public DataContext() { }
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        
        
        public DbSet<Issue> Issues { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Issue>()
                .HasMany(e => e.Comments)
                .WithOne(e => e.Issue)
                .HasForeignKey(e => e.IssueId);
        }
    }
}
