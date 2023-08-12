using BugTrackerMvc.Models;

namespace BugTrackerMvc.Interfaces
{
    public interface IProjectRepository : IRepository<Project>
    {
        Task<Issue> AddIssue(Project project, Issue issue);
    }
}
