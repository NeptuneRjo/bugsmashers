using BugTrackerMvc.Data;
using BugTrackerMvc.Interfaces;
using BugTrackerMvc.Models;
using Microsoft.EntityFrameworkCore;

namespace BugTrackerMvc.Repository
{
    public class IssueRepository : IIssueRepository
    {
        private readonly DataContext _context;

        public IssueRepository(DataContext context)
        {
            _context = context;
        }

        public void DeleteIssue(int? id)
        {
            if (id == null) ThrowNullExcept(id);

            Issue issue = _context.Issues.Find(id);

            if (issue == null)
                ThrowNullExcept(issue);

            _context.Issues.Remove(issue);            

            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to delete issue.", ex);
            }
        }

        public Issue GetIssueById(int? id)
        {
            if (id == null) 
                ThrowNullExcept(id);

            Issue issue = _context.Issues.Find(id);

            if (issue == null) 
                ThrowArgumentExcept(id);

            return issue;
        }

        public IEnumerable<Issue> GetIssues()
        {
            IEnumerable<Issue> issues = _context.Issues.ToList();

            if (issues == null) 
                ThrowArgumentExcept(null);

            return issues;
        }

        public void InsertIssue(Issue issue)
        {
            if (issue == null)
                ThrowNullExcept(issue);

            _context.Issues.Add(issue);

            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to insert the issue.", ex); ;
            }
        }

        public bool IssueExists(int? id)
        {
            if (id == null)
                ThrowNullExcept(id);

            return _context.Issues.Any(i => i.Id == id);
        }

        public void UpdateIssue(Issue issue)
        {
            if (issue == null) 
                ThrowNullExcept(issue);

            _context.Entry(issue).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update the issue.", ex); ;
            }
        }

        public IEnumerable<Comment> GetComments(int? id)
        {
            if (id == null) 
                ThrowNullExcept(id);

            var comments = _context.Comments
                .Where(c => c.IssueId == id).ToList();

            if (comments == null)
                ThrowNullExcept(comments);

            return comments;
        }

        private void ThrowNullExcept(dynamic val)
        {
            throw new ArgumentNullException(nameof(val), "Cannot be null");
        }

        private void ThrowArgumentExcept(dynamic val)
        {
            throw new ArgumentException(nameof(val), "Issue(s) not found");
        }
    }
}
