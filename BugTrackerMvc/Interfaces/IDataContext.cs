using BugTrackerMvc.Models;
using Microsoft.EntityFrameworkCore;

namespace BugTrackerMvc.Interfaces
{
    public interface IDataContext
    {
        DbSet<Issue> Issues { get; set; }
        DbSet<Comment> Comments { get; set; }

        int SaveChanges();
    }
}
