using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BugTrackerMvc.Models;
using Microsoft.AspNetCore.Authorization;
using BugTrackerMvc.Interfaces;

namespace BugTrackerMvc.Controllers
{
    public class IssuesController : Controller
    {
        private IIssueRepository _issueRepository;

        public IssuesController(IIssueRepository issueRepository)
        {
            _issueRepository = issueRepository;
        }

        // GET: Issues
        public async Task<IActionResult> Index()
        {
            try
            {
            var issues = await _issueRepository.GetIssues();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(issues);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // GET: Issues/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            try
            {
                var issue = await _issueRepository.GetIssueById(id);

                if (issue == null) 
                    NotFound();

                //var comments = _issueRepository.GetComments(id);

                // Create copy of issue and set the comments to a collection
                // instead of the object reference
                var response = issue;
                //response.Comments = (ICollection<Comment>)comments;
                //Console.WriteLine(_issueRepository.GetComments(id));

                return Ok(issue);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: Issues/user-issues
        [HttpGet("/user-issues")]
        [Authorize]
        public async Task<IActionResult> GetUserIssues()
        {
            var user = HttpContext.User.Claims.ElementAt(1).Value;

            if (user == null)
                NotFound();

            try
            {
                var issues = await _issueRepository.GetIssuesByPoster(user);

                if (issues == null)
                    NotFound();

                return Ok(issues);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        // GET: Issues/user-comments
        [HttpGet("/user-comments")]
        [Authorize]
        public async Task<IActionResult> GetUserComments()
        {
            var user = HttpContext.User.Claims.ElementAt(1).Value;

            if (user == null)
                NotFound();

            try
            {
                var comments = await _issueRepository.GetCommentsByPoster(user);

                if (comments == null)
                    NotFound();

                return Ok(comments);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        // POST: Issues/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public IActionResult Create([Bind("Id,Title,Description,Solved,Poster,Status,Priority,Label")] Issue issue)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _issueRepository.InsertIssue(issue);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }                
            }
            return Ok(issue);
        }

        // POST: Issues/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Title,Description,Solved,Poster,Status,Priority,Label")] Issue issue)
        {
            if (id != issue.Id)
            {
                return NotFound();
            }

            if (User?.Claims?.ElementAt(1)?.Value != issue.Poster)
            {
                return Unauthorized();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _issueRepository.UpdateIssue(issue);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!await _issueRepository.IssueExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return Ok(issue);
        }

        [HttpPost("/{id}/comment")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Comment(int? id, Comment comment)
        {
            var issue = await _issueRepository.GetIssueById(id);

            if (issue == null)
            {
                return NotFound();
            }

            try
            {
                issue.Comments.Add(new Comment()
                {
                    Author = comment.Author,
                    Content = comment.Content,
                });

                _issueRepository.UpdateIssue(issue);

                return Ok(issue);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // POST: Issues/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            try
            {
                var issue = await _issueRepository.GetIssueById(id);

                if (User.Claims.ElementAt(1)?.Value != issue.Poster)
                {
                    return Unauthorized();
                }

                if (issue != null)
                {
                    _issueRepository.DeleteIssue(id);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
