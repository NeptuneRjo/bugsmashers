using BugTrackerMvc.Data;
using BugTrackerMvc.Interfaces;
using BugTrackerMvc.Models;
using Microsoft.EntityFrameworkCore;

namespace BugTrackerMvc.Repository
{
    public class IssueRepositoryHelpers
    {
        public void ThrowNullExcept(dynamic val)
        {
            throw new ArgumentNullException(nameof(val), "Cannot be null");
        }

        public void ThrowArgumentExcept(dynamic val)
        {
            throw new ArgumentException(nameof(val), "Issue(s) not found");
        }
    }

    public class IssueRepository : IssueRepositoryHelpers, IIssueRepository
    {
        private readonly IDataContext _context;

        public IssueRepository(IDataContext context)
        {
            _context = context;
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

        public async Task<Issue> GetIssueById(int? id)
        {
            if (id == null) 
                ThrowNullExcept(id);

            Issue issue = await _context.Issues.FindAsync(id);

            if (issue == null) 
                ThrowArgumentExcept(id);

            return issue;
        }

        public async Task<IEnumerable<Issue>> GetIssues()
        {
            IEnumerable<Issue> issues = await _context.Issues.ToListAsync();

            if (issues == null) 
                ThrowArgumentExcept(null);

            return issues;
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

        public async Task<bool> IssueExists(int? id)
        {
            if (id == null)
                ThrowNullExcept(id);

            return await _context.Issues.AnyAsync(i => i.Id == id);
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

        public async Task<IEnumerable<Comment>> GetCommentsByPoster(string poster)
        {
            if (poster == null) 
                ThrowNullExcept(poster);

            var comments = await _context.Comments
                .Where(c => c.Author == poster).ToListAsync();

            if (comments == null)
                ThrowNullExcept(comments);

            return comments;
        }

        public async Task<IEnumerable<Issue>> GetIssuesByPoster(string poster)
        {
            if (poster == null)
                ThrowNullExcept(poster);

            var issues = await _context.Issues
                .Where(i => i.Poster == poster).ToListAsync();

            if (issues == null)
                ThrowNullExcept(issues);

            return issues;
        }
    }
}
