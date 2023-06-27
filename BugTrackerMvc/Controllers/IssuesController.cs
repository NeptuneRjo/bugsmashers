using BugTracker.Data;
using BugTracker.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BugTrackerMvc.Controllers
{
    public class IssuesController : Controller
    {
        private readonly DataContext _context;

        public IssuesController(DataContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            if (_context.Issues == null)
            {
                return NotFound();
            }

            ViewData["Issues"] = await _context.Issues.ToArrayAsync();

            return View("Index");
        }

        [HttpGet("/issues/new-issue")]
        public IActionResult NewIssue() => View("NewIssue");

        [HttpGet("/issues/{id}")]
        public async Task<ActionResult<Issue>> GetIssue(int id)
        {
            try
            {
                if (_context.Issues == null)
                {
                    return NotFound();
                }
                var issue = await _context.Issues.FindAsync(id);

                if (issue == null)
                {
                    return NotFound();
                }
                ViewData["Issue"] = issue;

                return View("IssueDetails");
            }
            catch (Exception err)
            {
                return BadRequest(err);
                throw;
            }

        }

        [HttpPost("/issues/new")]
        public async Task<ActionResult<Issue>> PostIssue(Issue issue)
        {
            try
            {
                if (_context.Issues == null)
                {
                    return Problem("Entity set 'DataContext.Issues'  is null.");
                }
                _context.Issues.Add(issue);
                await _context.SaveChangesAsync();

                return CreatedAtAction("PostIssue", new { id = issue.Id }, issue);
            }
            catch (Exception err)
            {
                return BadRequest(err);
                throw;
            }
        }

        [HttpDelete("/issues/delete/{id}")]
        public async Task<IActionResult> DeleteIssue(int id)
        {
            try
            {
                if (_context.Issues == null)
                {
                    return NotFound();
                }

                Issue issue = await _context.Issues.FindAsync(id);
                if (issue == null)
                {
                    return NotFound();
                }

                _context.Issues.Remove(issue);   
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception err)
            {
                return BadRequest(err);
                throw;
            }
        }

        [HttpPut("/issues/edit/{id}")]
        public async Task<IActionResult> PutIssue(int id, Issue issue)
        {
            try
            {
                if (id != issue.Id)
                {
                    return BadRequest();
                }

                _context.Entry(issue).State = EntityState.Modified;

                await _context.SaveChangesAsync();


                return NoContent();
            }
            catch (DbUpdateConcurrencyException err)
            {
                if (!IssueExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest(err);
                    throw;
                }
            }           
        }

        private bool IssueExists(int id)
        {
            return (_context.Issues?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
