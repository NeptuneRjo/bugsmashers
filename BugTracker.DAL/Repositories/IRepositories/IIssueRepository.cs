using BugTracker.DAL.Entities;

namespace BugTracker.DAL.Repositories.IRepositories
{
    public interface IIssueRepository : IGenericRepository<Issue>
    {
        void InsertIssue(Issue Issue);
        void UpdateIssue(Issue issue);
        void DeleteIssue(int? id);
        Task<Issue> AddComment(int issueId, Comment comment);
    }
}
