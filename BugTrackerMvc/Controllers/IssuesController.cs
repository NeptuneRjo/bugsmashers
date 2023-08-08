using Microsoft.AspNetCore.Mvc;
using BugTrackerMvc.Models;
using Microsoft.AspNetCore.Authorization;
using BugTrackerMvc.Interfaces;
using System.Security.Claims;
using BugTrackerMvc.CustomExceptions;

namespace BugTrackerMvc.Controllers
{
    public class IssuesController : Controller
    {
        private readonly IIssueService _service;

        public IssuesController(IIssueService service)
        {
            _service = service;
        }

        // GET: Issues
        public async Task<IActionResult> Index() => View(await _service.GetIssues());

        // GET: Issues/Details/5
        public async Task<IActionResult> Details(int id)
        {
            try
            {
                Issue issue = await _service.GetIssue(id);

                return View(issue);
            }
            catch (ObjectNotFoundException ex)
            {
                return View("Notfound", ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: Issues/Create
        [HttpGet]
        public IActionResult Create() => View("Create");

        // POST: Issues/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<IActionResult> Create([Bind("Title,Description,Solved,Status,Priority,Label")] IssueModel issueModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            try
            {
                string poster = User.FindFirst(ClaimTypes.Name)?.Value;

                if (issueModel.Poster == null)
                    issueModel.Poster = poster;

                Issue issue = await _service.CreateIssue(issueModel);

                return RedirectToAction("Details", "Issues", new { id = issue.Id });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }                
        }

        // GET: Issues/Edit/5
        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            try
            {
                Issue issue = await _service.GetIssue(id);

                return View(issue);
            }
            catch (ObjectNotFoundException ex)
            {
                return View("Notfound", ex.Message);
            }
        }

        // POST: Issues/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<IActionResult> Edit(int id, [Bind("Title,Description,Solved,Status,Priority,Label")] IssueModel issueModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                string poster = User.FindFirst(ClaimTypes.Name)?.Value;

                if (issueModel.Poster == null)
                    issueModel.Poster = poster;

                Issue issue = await _service.UpdateIssue(id, issueModel);

                return RedirectToAction("Details", "Issues", new { id = issue.Id });
            }
            catch (ObjectNotFoundException ex)
            {
                return View("Notfound", ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Comment(int id, [Bind("Content")] CommentModel commentModel)
        {
            try
            {
                string poster = User.FindFirst(ClaimTypes.Name)?.Value;
                
                if (commentModel.Poster == null)
                    commentModel.Poster = poster;
                
                Issue issue = await _service.AddComment(id, commentModel);

                return RedirectToAction("Details", "Issues", new { id = id });
            }
            catch (ObjectNotFoundException ex)
            {
                return View("Notfound", ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                Issue issue = await _service.GetIssue(id);

                return View(issue);
            }
            catch (ObjectNotFoundException ex)
            {
                return View("Notfound", ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
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
                string poster = User.FindFirst(ClaimTypes.Name)?.Value;

                bool deleted = await _service.Delete(id, poster);

                if (!deleted)
                    return StatusCode(500, "Failed to delete item");

                return RedirectToAction("Index", "Issues");
            }
            catch (ObjectNotFoundException ex)
            {
                return View("Notfound", ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
