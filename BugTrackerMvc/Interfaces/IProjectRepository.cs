using BugTrackerMvc.Models;

namespace BugTrackerMvc.Interfaces
{
    public interface IProjectRepository : IRepository<Project>
    {
        Task<Issue> AddIssue(int projectId, Issue issue);
        Task<ICollection<Project>> GetAllWithComments();
        Task<Project> GetOneWithComments(int id);
    }
}
