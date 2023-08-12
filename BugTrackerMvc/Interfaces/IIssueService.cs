using BugTrackerMvc.Models;

namespace BugTrackerMvc.Interfaces
{
    public interface IIssueService
    {
        Task<IssueDto> GetIssue(int id);
        Task<Issue> GetIssue(int id, string poster);
        Task<ICollection<IssueDto>> GetIssues();
        Task<ICollection<Issue>> GetIssues(string poster);
        Task<IssueDto> CreateIssue(string poster, IssueModel issueModel);
        Task<IssueDto> UpdateIssue(int id, string poster, IssueModel issueModel);
        Task<IssueDto> AddComment(int id, string poster, CommentModel commentModel);
        Task<bool> Delete(int id, string poster);
    }
}
