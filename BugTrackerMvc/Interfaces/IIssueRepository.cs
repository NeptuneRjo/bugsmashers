using BugTrackerMvc.Models;

namespace BugTrackerMvc.Interfaces
{
    public interface IIssueRepository : IRepository<Issue>
    {
        void InsertIssue(Issue Issue);
        void UpdateIssue(Issue issue);
        void DeleteIssue(int? id);
        Task<Issue> AddComment(int issueId, Comment comment);
    }
}
