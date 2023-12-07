using BugTracker.BLL.Services.IServices;
using BugTracker.DAL.Models;
using BugTracker.DTO.DTOs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BugTracker.API.Controllers
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
        [AllowAnonymous]
        public async Task<IActionResult> Get()
        {
            string poster = User.FindFirst(ClaimTypes.Name)?.Value;

            if (poster != null)
            {
                return Ok(await _service.GetProjects(poster));
            }

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
            catch (KeyNotFoundException ex)
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
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Post(ProjectModel projectModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                string poster = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "username")?.Value;

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
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PostIssue(int id, [FromBody] IssueModel issueModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                string poster = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "username")?.Value;

                ProjectDto dto = await _service.AddIssue(id, poster, issueModel);

                return Ok(dto);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (KeyNotFoundException ex)
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
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Put(int id, [FromBody] ProjectModel projectModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                string poster = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "username")?.Value;

                ProjectDto dto = await _service.UpdateProject(id, poster, projectModel);

                return Ok(dto);
            }
            catch (KeyNotFoundException ex)
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
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                string poster = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "username")?.Value;

                bool deleted = await _service.DeleteProject(id, poster);

                if (!deleted)
                    return StatusCode(500, "Failed to delete object");

                return Ok($"Successfully deleted project {id}");
            }
            catch (KeyNotFoundException ex)
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
