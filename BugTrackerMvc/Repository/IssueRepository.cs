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
            Issue issue = _context.Issues.Find(id);
            _context.Issues.Remove(issue);
            _context.SaveChanges();
        }

        public Issue GetIssueById(int? id)
        {
            return _context.Issues.Find(id);
        }

        public IEnumerable<Issue> GetIssues()
        {
            return _context.Issues.ToList();
        }

        public void InsertIssue(Issue issue)
        {
            _context.Issues.Add(issue);
            _context.SaveChanges();
        }

        public bool IssueExists(int? id)
        {
            return _context.Issues.Any(i => i.Id == id);
        }

        public void UpdateIssue(Issue Issue)
        {
            _context.Entry(Issue).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public IEnumerable<Comment> GetComments(int? id)
        {
            return _context.Comments.Where(c => c.IssueId == id).ToList();
        }
    }
}
