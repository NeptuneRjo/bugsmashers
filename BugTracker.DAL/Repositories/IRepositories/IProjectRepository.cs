using BugTracker.DAL.Entities;

namespace BugTracker.DAL.Repositories.IRepositories
{
    public interface IProjectRepository
    {
        Task<Issue> AddIssue(int projectId, Issue issue);
        Task<ICollection<Project>> GetAllWithComments();
        Task<Project> GetOneWithComments(int id);
    }
}
