using BugTrackerMvc.Models;

namespace BugTrackerMvc.Interfaces
{
    public interface IIssueRepository
    {
        void InsertIssue(Issue Issue);
        Task<IEnumerable<Issue>> GetIssues();
        Task<Issue> GetIssueById(int id);
        Task<IEnumerable<Issue>> GetIssuesByPoster(string poster);
        Task<bool> IssueExists(int id);
        void UpdateIssue(Issue issue);
        void DeleteIssue(int id);
        IEnumerable<Comment> GetComments(int id);
        Task<IEnumerable<Comment>> GetCommentsByPoster(string poster);
    }
}
