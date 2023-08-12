using BugTrackerMvc.CustomExceptions;
using BugTrackerMvc.Interfaces;
using BugTrackerMvc.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BugTrackerMvc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _service;

        public ProjectsController(IProjectService service)
        {
            _service = service;
        }

        // GET: api/<ProjectsController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetProjects());
        }

        // GET api/<ProjectsController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                ProjectDto dto = await _service.GetProject(id);

                return Ok(dto);
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

        // POST api/<ProjectsController>
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(ProjectModel projectModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                string poster = User.FindFirst(ClaimTypes.Name)?.Value;

                ProjectDto dto = await _service.CreateProject(poster, projectModel);

                return Ok(dto);
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

        // POST api/<ProjectsController>/5
        [HttpPost("{id}")]
        [Authorize]
        public async Task<IActionResult> PostIssue(int id, [FromBody] IssueModel issueModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                string poster = User.FindFirst(ClaimTypes.Name)?.Value;

                if (issueModel.Poster == null)
                    issueModel.Poster = poster;

                if (issueModel.Poster != poster)
                    return BadRequest();

                ProjectDto dto = await _service.AddIssue(id, issueModel);

                return Ok(dto);
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

        // PUT api/<ProjectsController>/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Put(int id, [FromBody] ProjectModel projectModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                string poster = User.FindFirst(ClaimTypes.Name)?.Value;

                ProjectDto dto = await _service.UpdateProject(id, poster, projectModel);

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

        // DELETE api/<ProjectsController>/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                string poster = User.FindFirst(ClaimTypes.Name)?.Value;

                bool deleted = await _service.DeleteProject(id, poster);

                if (!deleted)
                    return StatusCode(500, "Failed to delete object");
                    
                return Ok($"Successfully deleted project {id}");
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
