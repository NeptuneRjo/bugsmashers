using BugTracker.DAL.Entities;

namespace BugTracker.DAL.Repositories.IRepositories
{
    public interface IIssueRepository
    {
        void InsertIssue(Issue Issue);
        void UpdateIssue(Issue issue);
        void DeleteIssue(int? id);
        Task<Issue> AddComment(int issueId, Comment comment);
    }
}
