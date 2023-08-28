using BugTrackerMvc.CustomExceptions;
using BugTrackerMvc.DTOs;
using BugTrackerMvc.Interfaces;
using BugTrackerMvc.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BugTrackerMvc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IssuesController : ControllerBase
    {
        private readonly IIssueService _service;

        public IssuesController(IIssueService service)
        {
            _service = service;
        }

        // GET: api/<IssuesController>
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Get()
        {
            string poster = User.FindFirst(ClaimTypes.Name)?.Value;

            if (poster != null)
            {
                return Ok(await _service.GetIssues(poster));
            }

            return Ok(await _service.GetIssues());
        }

        // GET api/<IssuesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                return Ok(await _service.GetIssue(id));
            }
            catch (ObjectNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PostComment(int id, [FromBody] CommentModel commentModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                string poster = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "username")?.Value;

                IssueDto dto = await _service.AddComment(id, poster, commentModel);

                return Ok(dto);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (ObjectNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // PUT api/<IssuesController>/5
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Put(int id, [FromBody] IssueModel issueModel)
        {
            try
            {
                string poster = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "username")?.Value;

                IssueDto dto = await _service.UpdateIssue(id, poster, issueModel);

                return Ok(dto);
            }
            catch (ObjectNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // DELETE api/<IssuesController>/5
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                string poster = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "username")?.Value;

                bool deleted = await _service.Delete(id, poster);

                if (!deleted)
                    return StatusCode(500, "Failed to delete object");

                return Ok($"Successfully deleted issue {id}");
            }
            catch (ObjectNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
