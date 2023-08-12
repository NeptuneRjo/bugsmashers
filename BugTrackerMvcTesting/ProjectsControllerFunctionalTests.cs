using AutoMapper;
using BugTrackerMvc.Controllers;
using BugTrackerMvc.CustomExceptions;
using BugTrackerMvc.Interfaces;
using BugTrackerMvc.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.AspNetCore.Mvc.Testing;
using NSubstitute;
using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using System.Security.Claims;


namespace BugTrackerMvcTesting
{
    public class ProjectsControllerFunctionalTests
    {
        private readonly ControllerContext _controllerContext;
        private readonly IProjectService _service;
        private readonly string poster = "Test";

        public ProjectsControllerFunctionalTests()
        {
            _service = Substitute.For<IProjectService>();
            _controllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext
                {
                    User = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, poster),

                    }, "test"))
                }
            };
        }

        [Fact]
        public async Task GetProjects_Returns_Ok_Dtos()
        {
            ICollection<ProjectDto> dtos = new List<ProjectDto>()
            {
                new ProjectDto { Id = 1, Title = "Test 1" },
                new ProjectDto { Id = 2, Title = "Test 2" },
                new ProjectDto { Id = 3, Title = "Test 3" }
            };

            _service.GetProjects().Returns(dtos);

            ProjectsController controller = new ProjectsController(_service);

            ObjectResult result = await TestHelpers.ReturnsOk(e => e.Get(), controller);

            // Assert that the value of result is of type ProjectDto
            // and hold the value if true
            ICollection<ProjectDto> returnedDtos = Assert.IsAssignableFrom<ICollection<ProjectDto>>(result.Value);

            Assert.Equal(dtos.Count(), returnedDtos.Count());
            // Assert that each dto in dtos exists in the returnedDtos object
            Assert.All(dtos, dto => Assert.Contains(dto, returnedDtos));
        }

        [Fact]
        public async Task GetProjectById_Returns_Ok_Dto()
        {
            int id = 1;
            ProjectDto dto = new ProjectDto() { Id = id, Title = "Test" };

            _service.GetProject(id).Returns(dto);

            ProjectsController controller = new ProjectsController(_service);

            ObjectResult result = await TestHelpers.ReturnsOk(e => e.Get(id), controller);

            ProjectDto returnedDto = Assert.IsAssignableFrom<ProjectDto>(result.Value);

            Assert.Equal(dto, returnedDto);
        }

        [Fact]
        public async Task GetProjectById_Returns_NotFound()
        {
            Task<ProjectDto> exception = Task.FromException<ProjectDto>(new ObjectNotFoundException());

            _service.GetProject(1).Returns(exception);
            
            ProjectsController controller = new ProjectsController(_service);

            await TestHelpers.ReturnsNotFound(e => e.Get(1), controller);
        }

        [Fact]
        public async Task PostProject_Returns_Ok_Dto()
        {
            ProjectDto dto = new ProjectDto() {  Id = 1, Title = "Test", Poster = poster };
            ProjectModel model = new ProjectModel() { Title = "Test" };

            _service.CreateProject(poster, model).Returns(dto);

            ProjectsController controller = new ProjectsController(_service);

            // Set the Claim properties for the controller
            controller.ControllerContext = _controllerContext;

            ObjectResult result = await TestHelpers.ReturnsOk(e => e.Post(model), controller);

            ProjectDto returnedDto = Assert.IsAssignableFrom<ProjectDto>(result.Value);

            Assert.Equal(dto, returnedDto);
        }

        [Fact]
        public async Task PostProject_Returns_BadRequest()
        {
            ProjectsController controller = new ProjectsController(_service);
            
            controller.ControllerContext = _controllerContext;
            controller.ModelState.AddModelError("Title", "Error");

            await TestHelpers.ReturnsBadRequest(e => e.Post(new ProjectModel()), controller);
        }

        [Fact]
        public async Task PostProject_Returns_Unauthorized()
        {
            Task<ProjectDto> exception = Task.FromException<ProjectDto>(new UnauthorizedAccessException("Test"));
            ProjectModel model = new ProjectModel() { Title = "Test", Poster = "Fail" };

            _service.CreateProject(poster, model).Returns(exception);

            ProjectsController controller = new ProjectsController(_service);
            controller.ControllerContext = _controllerContext;

            await TestHelpers.ReturnsUnauthorized(e => e.Post(model), controller);
        }

        [Fact]
        public async Task PutProject_Returns_Ok_Dto()
        {
            int id = 1;
            
            ProjectModel model = new ProjectModel() { Title = "Test" };
            ProjectDto dto = new ProjectDto() { Id = id, Title = "Test", Poster = poster };

            _service.UpdateProject(1, poster, model).Returns(dto);

            ProjectsController controller = new ProjectsController(_service);

            controller.ControllerContext = _controllerContext;

            ObjectResult result = await TestHelpers.ReturnsOk(e => e.Put(id, model), controller);

            ProjectDto returnedDto = Assert.IsAssignableFrom<ProjectDto>(result.Value);

            Assert.Equal(dto, returnedDto);
        }

        [Fact]
        public async Task PutProject_Returns_BadRequest()
        {
            int id = 1;
            ProjectModel model = new ProjectModel();

            ProjectsController controller = new ProjectsController(_service);

            controller.ControllerContext = _controllerContext;
            controller.ModelState.AddModelError("Title", "Error");

            await TestHelpers.ReturnsBadRequest(e => e.Put(id, model), controller);
        }

        [Fact]
        public async Task PutProject_Returns_NotFound()
        {
            Task<ProjectDto> exception = Task.FromException<ProjectDto>(new ObjectNotFoundException());
            ProjectModel model = new ProjectModel() { Title = "Test", Poster = poster };

            _service.UpdateProject(1, poster, model).Returns(exception);

            ProjectsController controller = new ProjectsController(_service);

            controller.ControllerContext = _controllerContext;

            await TestHelpers.ReturnsNotFound(e => e.Put(1, model), controller);
        }

        [Fact]
        public async Task PutProject_Returns_Unauthorized()
        {
            Task<ProjectDto> exception = Task.FromException<ProjectDto>(new UnauthorizedAccessException());
            ProjectModel model = new ProjectModel() { Title = "Test", Poster = poster };

            _service.UpdateProject(1, poster, model).Returns(exception);

            ProjectsController controller = new ProjectsController(_service);

            controller.ControllerContext = _controllerContext;

            await TestHelpers.ReturnsUnauthorized(e => e.Put(1, model), controller);
        }

        [Fact]
        public async Task DeleteProject_Returns_Ok()
        {
            int id = 1;

            _service.DeleteProject(id, poster).Returns(true);

            ProjectsController controller = new ProjectsController(_service);

            controller.ControllerContext = _controllerContext;

            await TestHelpers.ReturnsOk(e => e.Delete(id), controller);
        }

        [Fact]
        public async Task DeleteProject_Returns_ServerError()
        {
            int id = 1;

            _service.DeleteProject(id, poster).Returns(false);

            ProjectsController controller = new ProjectsController(_service);

            controller.ControllerContext = _controllerContext;

            ObjectResult result = await controller.Delete(id) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public async Task DeleteProject_Returns_NotFound()
        {
            int id = 1;
            Task<bool> exception = Task.FromException<bool>(new ObjectNotFoundException());

            _service.DeleteProject(1, poster).Returns(exception);

            ProjectsController controller = new ProjectsController(_service);

            controller.ControllerContext = _controllerContext;

            await TestHelpers.ReturnsNotFound(e => e.Delete(id), controller);
        }

        [Fact]
        public async Task DeleteProject_Returns_Unauthorized()
        {
            int id = 1;
            Task<bool> exception = Task.FromException<bool>(new UnauthorizedAccessException());

            _service.DeleteProject(1, poster).Returns(exception);

            ProjectsController controller = new ProjectsController(_service);

            controller.ControllerContext = _controllerContext;

            await TestHelpers.ReturnsUnauthorized(e => e.Delete(id), controller);
        }

        [Fact]
        public async Task PostIssue_Returns_Ok_Dto()
        {
            ProjectDto dto = new ProjectDto() { Poster = poster, Title = "Test", Issues =  new List<IssueDto>() };
            IssueModel model = new IssueModel();

            _service.AddIssue(1, model).Returns(dto);

            ProjectsController controller = new ProjectsController(_service);

            controller.ControllerContext = _controllerContext;

            ObjectResult result = await TestHelpers.ReturnsOk(e => e.PostIssue(1, model), controller);

            ProjectDto returnedDto = Assert.IsAssignableFrom<ProjectDto>(result.Value);

            Assert.Equal(dto, returnedDto);
        }

        [Fact]
        public async Task PostIssue_Returns_BadRequest()
        {
            int id = 1;
            IssueModel model = new IssueModel();

            ProjectsController controller = new ProjectsController(_service);

            controller.ControllerContext = _controllerContext;
            controller.ModelState.AddModelError("Title", "Error");

            await TestHelpers.ReturnsBadRequest(e => e.PostIssue(id, model), controller);
        }

        [Fact]
        public async Task PostIssue_Returns_NotFound()
        {
            int id = 1;
            IssueModel model = new IssueModel();
            Task<ProjectDto> exception = Task.FromException<ProjectDto>(new ObjectNotFoundException());

            _service.AddIssue(1, model).Returns(exception);

            ProjectsController controller = new ProjectsController(_service);

            controller.ControllerContext = _controllerContext;

            await TestHelpers.ReturnsNotFound(e => e.PostIssue(id, model), controller);
        }
    }

}
