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
        public async Task<IActionResult> Index() => View(await _issueRepository.GetIssues());

        // GET: Issues/Details/5
        public async Task<IActionResult> Details(int id)
        {
            try
            {
                var issue = await _issueRepository.GetIssueById(id);

                var comments = _issueRepository.GetComments(id);

                ViewData["Comments"] = comments;


                ViewData["Comments"] = comments;

                return View(issue);
            }
            catch (ArgumentException ex)
            {
                ViewData["Error"] = ex.Message;

                return View("Error");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: /issues/my-issues
        [HttpGet("/my-issues")]
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

                return View("Profile", issues);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        // GET: Issues/Create
        [HttpGet]
        [Authorize]
        public IActionResult Create() => View("Create");

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
            return Redirect($"/issues/details/{issue.Id}");
        }

        // GET: Issues/Edit/5
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Edit(int id)
        {
            var issue = await _issueRepository.GetIssueById(id);

            if (issue.Poster != HttpContext.User.Claims.ElementAt(1).Value)
                Unauthorized();

            return  View(await _issueRepository.GetIssueById(id));
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
            return Redirect($"/issues/details/{issue.Id}");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Comment(int id, Comment comment)
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

                return Redirect($"/issues/details/{issue.Id}");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var issue = await _issueRepository.GetIssueById(id);

            if (User.Claims.ElementAt(1)?.Value != issue.Poster)
            {
                return Unauthorized();
            }

            if (issue == null)
                return NotFound();

            return View(issue);
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

                return Redirect("/");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
