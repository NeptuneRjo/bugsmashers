using BugTrackerMvc.Models;

namespace BugTrackerMvc.Interfaces
{
    public interface IIssueRepository
    {
        void InsertIssue(Issue Issue);
        IEnumerable<Issue> GetIssues();
        Issue GetIssueById(int? id);
        bool IssueExists(int? id);
        void UpdateIssue(Issue issue);
        void DeleteIssue(int? id);
    }
}
