using BugTrackerMvc.Models;

namespace BugTrackerMvc.Interfaces
{
    public interface IIssueRepository
    {
        void InsertIssue(Issue Issue);
        IEnumerable<Issue> GetIssues();
        Issue GetIssueById(int? id);
        IEnumerable<Issue> GetIssuesByPoster(string poster);
        bool IssueExists(int? id);
        void UpdateIssue(Issue issue);
        void DeleteIssue(int? id);
        IEnumerable<Comment> GetComments(int? id);
        IEnumerable<Comment> GetCommentByPoster(string poster);
    }
}
