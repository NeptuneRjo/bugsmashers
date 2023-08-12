using BugTrackerMvc.Models;
using Microsoft.EntityFrameworkCore;

namespace BugTrackerMvc.Interfaces
{
    public interface IDataContext
    {
        DbSet<Issue> Issues { get; set; }
        DbSet<Comment> Comments { get; set; }
        DbSet<Project> Projects { get; set; }

        int SaveChanges();
        DbSet<TEntity> Set<TEntity>() where TEntity : class;
    }
}
