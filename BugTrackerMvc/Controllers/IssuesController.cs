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
        public IActionResult Index()
        {
            try
            {
                var issues = _issueRepository.GetIssues();

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                return View(issues);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // GET: Issues/Details/5
        public IActionResult Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            try
            {
                var issue = _issueRepository.GetIssueById(id);

                if (issue == null)
                {
                    return NotFound();
                }

                ViewData["Comments"] = _issueRepository.GetComments(id);

                return View(issue);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: Issues/Create
        [Authorize]
        public IActionResult Create() => View();

        // POST: Issues/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public IActionResult Create([Bind("Id,Title,Description,Solved,Poster")] Issue issue)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _issueRepository.InsertIssue(issue);
                    return RedirectToAction(nameof(Index));
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }                
            }
            return View(issue);
        }

        // GET: Issues/Edit/5
        [Authorize]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            try
            {
                var issue = _issueRepository.GetIssueById(id);

                if (issue == null)
                {
                    return NotFound();
                }

                return View(issue);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: Issues/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public IActionResult Edit(int id, [Bind("Id,Title,Description,Solved,Poster")] Issue issue)
        {
            if (id != issue.Id)
            {
                return NotFound();
            }

            if (User?.Claims?.ElementAt(1)?.Value != issue.Poster)
            {
                return Redirect("/issues");
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _issueRepository.UpdateIssue(issue);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!_issueRepository.IssueExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(issue);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Comment(int? id, Comment comment)
        {
            var issue = _issueRepository.GetIssueById(id);

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

                return Redirect($"/issues/details/{id}");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // GET: Issues/Delete/5
        [Authorize]
        public IActionResult Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            try
            {
                var issue = _issueRepository.GetIssueById(id);

                if (issue == null)
                {
                    return NotFound();
                }

                if (User?.Claims?.ElementAt(1)?.Value != issue.Poster)
                {
                    return Redirect("/issues");
                }

                return View(issue);
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
        public IActionResult DeleteConfirmed(int id)
        {
            try
            {
                var issue = _issueRepository.GetIssueById(id);

                if (User.Claims.ElementAt(1)?.Value != issue.Poster)
                {
                    return Redirect("/issues");
                }

                if (issue != null)
                {
                    _issueRepository.DeleteIssue(id);
                }

                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
