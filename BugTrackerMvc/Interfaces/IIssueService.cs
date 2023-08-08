using BugTrackerMvc.Models;

namespace BugTrackerMvc.Interfaces
{
    public interface IIssueService
    {
        Task<Issue> GetIssue(int id);
        Task<Issue> GetIssue(int id, string poster);
        Task<ICollection<Issue>> GetIssues();
        Task<ICollection<Issue>> GetIssues(string poster);
        Task<Issue> CreateIssue(IssueModel issueModel);
        Task<Issue> UpdateIssue(int id, IssueModel issueModel);
        Task<Issue> AddComment(int id, CommentModel commentModel);
        Task<bool> Delete(int id, string poster);
    }
}
