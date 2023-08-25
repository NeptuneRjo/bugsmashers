using BugTrackerMvc.Data;
using BugTrackerMvc.Interfaces;
using BugTrackerMvc.Models;
using Microsoft.EntityFrameworkCore;

namespace BugTrackerMvc.Repository
{

    public class IssueRepository : Repository<Issue>, IIssueRepository
    {
        private readonly IDataContext _context;

        public IssueRepository(IDataContext context) : base(context)
        {
            _context = context;
        }

        public void ThrowNullExcept(dynamic val)
        {
            throw new ArgumentNullException(nameof(val), "Cannot be null");
        }

        public void ThrowArgumentExcept(dynamic val)
        {
            throw new ArgumentException(nameof(val), "Issue(s) not found");
        }

        public async void DeleteIssue(int? id)
        {
            if (id == null) ThrowNullExcept(id);

            Issue issue = await _context.Issues.FindAsync(id);

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

        public async Task<Issue> GetIssueById(int id)
        {
            Issue issue = await _context.Issues.FindAsync(id);

            if (issue == null) 
                ThrowArgumentExcept(id);

            return issue;
        }

        public async void InsertIssue(Issue issue)
        {
            if (issue == null)
                ThrowNullExcept(issue);

            await _context.Issues.AddAsync(issue);

            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to insert the issue.", ex); ;
            }
        }

        public void UpdateIssue(Issue issue)
        {
            if (issue == null) 
                ThrowNullExcept(issue);

            _context.Issues.Update(issue);

            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update the issue.", ex); ;
            }
        }

        public async Task<Issue> AddComment(int issueId, Comment comment)
        {
            Issue issue = await _context.Issues.Include(e => e.Comments).FirstAsync(e => e.Id == issueId);

            comment.Issue = issue;

            if (comment.IssueId == null)
                comment.IssueId = issue.Id;

            await _context.Comments.AddAsync(comment);

            issue.Comments.Add(comment);

            _context.SaveChanges();

            return issue;
        }
    }
}
