using BugTrackerMvc.Controllers;
using BugTrackerMvc.CustomExceptions;
using BugTrackerMvc.DTOs;
using BugTrackerMvc.Interfaces;
using BugTrackerMvc.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using System.Security.Claims;

namespace BugTrackerMvcTesting
{
    public class IssuesControllerFunctionalTests
    {
        private readonly ControllerContext _controllerContext;
        private readonly IIssueService _service;
        private readonly string poster = "Test";

        public IssuesControllerFunctionalTests()
        {
            _service = Substitute.For<IIssueService>();
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
        public async Task GetIssues_Returns_Ok_Dtos()
        {
            ICollection<IssueDto> dtos = new List<IssueDto>()
            {
                new IssueDto() { Id = 1, Title = "Test 1" },
                new IssueDto() { Id = 2, Title = "Test 2" },
                new IssueDto() { Id = 3, Title = "Test 3" }
            };

            _service.GetIssues().Returns(dtos);

            IssuesController controller = new IssuesController(_service);

            ObjectResult result = await TestHelpers.ReturnsOk(e => e.Get(), controller);

            ICollection<IssueDto> returnedDtos = Assert.IsAssignableFrom<ICollection<IssueDto>>(result.Value);

            Assert.Equal(dtos.Count(), returnedDtos.Count());
            Assert.All(dtos, dto => Assert.Contains(dto, returnedDtos));
        }

        [Fact]
        public async Task GetIssueById_Returns_Ok_Dto()
        {
            int id = 1;
            IssueDto dto = new IssueDto() { Id = id, Title = "Test" };

            _service.GetIssue(id).Returns(dto);

            IssuesController controller = new IssuesController(_service);

            ObjectResult result = await TestHelpers.ReturnsOk(e => e.Get(id), controller);

            IssueDto returnedDto = Assert.IsAssignableFrom<IssueDto>(result.Value);

            Assert.Equal(dto, returnedDto);
        }

        [Fact]
        public async Task GetIssueById_Returns_NotFound()
        {
            Task<IssueDto> exception = Task.FromException<IssueDto>(new ObjectNotFoundException());

            _service.GetIssue(1).Returns(exception);

            IssuesController controller = new IssuesController(_service);

            await TestHelpers.ReturnsNotFound(e => e.Get(1), controller);
        }

        //[Fact]
        //public async Task PostIssue_Returns_Ok_Dto()
        //{
        //    IssueDto dto = new IssueDto() { Id = 1, Title = "Test", Poster = poster };
        //    IssueModel model = new IssueModel() { Title = "Test" };

        //    _service.CreateIssue(poster, model).Returns(dto);

        //    IssuesController controller = new IssuesController(_service);

        //    controller.ControllerContext = _controllerContext;

        //    ObjectResult result = await TestHelpers.ReturnsOk(e => e.Post(model), controller);

        //    IssueDto returnedDto = Assert.IsAssignableFrom<IssueDto>(result.Value);

        //    Assert.Equal(dto, returnedDto);
        //}

        //[Fact]
        //public async Task PostIssue_Returns_BadRequest()
        //{
        //    IssuesController controller = new(_service);

        //    controller.ControllerContext = _controllerContext;
        //    controller.ModelState.AddModelError("Title", "Error");

        //    await TestHelpers.ReturnsBadRequest(e => e.Post(new IssueModel()), controller);
        //}

        //[Fact]
        //public async Task PostIssue_Returns_Unauthorized()
        //{
        //    Task<IssueDto> exception = Task.FromException<IssueDto>(new UnauthorizedAccessException("Test"));
        //    IssueModel model = new() { Title = "Test", Poster = "Fail" };

        //    _service.CreateIssue(poster, model).Returns(exception);

        //    IssuesController controller = new(_service);
        //    controller.ControllerContext = _controllerContext;

        //    await TestHelpers.ReturnsUnauthorized(e => e.Post(model), controller);
        //}

        [Fact]
        public async Task PutIssue_Returns_Ok_Dto()
        {
            int id = 1;

            IssueModel model = new() { Title = "Test" };
            IssueDto dto = new() { Id = id, Title = "Test", Poster = poster };

            _service.UpdateIssue(id, poster, model).Returns(dto);

            IssuesController controller = new(_service);

            controller.ControllerContext = _controllerContext;

            ObjectResult result = await TestHelpers.ReturnsOk(e => e.Put(id, model), controller);

            IssueDto returrnedDto = Assert.IsAssignableFrom<IssueDto>(result.Value);
            
            Assert.Equal(dto, returrnedDto);
        }

        [Fact]
        public async Task PutIssue_Returns_NotFound()
        {
            Task<IssueDto> exception = Task.FromException<IssueDto>(new ObjectNotFoundException());
            IssueModel model = new() { Title = "Test", Poster = poster };

            _service.UpdateIssue(1, poster, model).Returns(exception);

            IssuesController controller = new(_service);

            controller.ControllerContext = _controllerContext;

            await TestHelpers.ReturnsNotFound(e => e.Put(1, model), controller);
        }

        [Fact]
        public async Task PutIssue_Returns_Unauthorized()
        {
            Task<IssueDto> exception = Task.FromException<IssueDto>(new UnauthorizedAccessException());
            IssueModel model = new() { Title = "Test", Poster = poster };

            _service.UpdateIssue(1, poster, model).Returns(exception);

            IssuesController controller = new(_service);

            controller.ControllerContext = _controllerContext;

            await TestHelpers.ReturnsUnauthorized(e => e.Put(1, model), controller);
        }

        [Fact]
        public async Task DeleteIssue_Returns_Ok()
        {
            int id = 1;

            _service.Delete(id, poster).Returns(true);

            IssuesController controller = new(_service);

            controller.ControllerContext = _controllerContext;

            await TestHelpers.ReturnsOk(e => e.Delete(id), controller);
        }

        [Fact]
        public async Task DeleteIssue_Returns_ServerError()
        {
            int id = 1;

            _service.Delete(id, poster).Returns(false);

            IssuesController controller = new(_service);

            controller.ControllerContext = _controllerContext;

            ObjectResult result = await controller.Delete(id) as ObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status500InternalServerError, result.StatusCode);
        }

        [Fact]
        public async Task DeleteIssue_Returns_NotFound()
        {
            int id = 1;
            Task<bool> exception = Task.FromException<bool>(new ObjectNotFoundException());

            _service.Delete(id, poster).Returns(exception);

            IssuesController controller = new(_service);

            controller.ControllerContext = _controllerContext;

            await TestHelpers.ReturnsNotFound(e => e.Delete(id), controller);
        }

        [Fact]
        public async Task DeleteIssue_Returns_Unauthorized()
        {
            int id = 1;
            Task<bool> exception = Task.FromException<bool>(new UnauthorizedAccessException());

            _service.Delete(id, poster).Returns(exception);

            IssuesController controller = new(_service);

            controller.ControllerContext = _controllerContext;

            await TestHelpers.ReturnsUnauthorized(e => e.Delete(id), controller);
        }

        [Fact]
        public async Task PostComment_Returns_Ok_Dto()
        {
            IssueDto dto = new() { Poster = poster, Title = "Test", Comments = new List<CommentDto>() };
            CommentModel model = new();

            _service.AddComment(1, poster, model).Returns(dto);

            IssuesController controller = new(_service);

            controller.ControllerContext = _controllerContext;

            ObjectResult result = await TestHelpers.ReturnsOk(e => e.PostComment(1, model), controller);

            IssueDto returnedDto = Assert.IsAssignableFrom<IssueDto>(result.Value);

            Assert.Equal(dto, returnedDto);
        }

        [Fact]
        public async Task PostComment_Returns_BadRequest()
        {
            int id = 1;
            CommentModel model = new();

            IssuesController controller = new(_service);

            controller.ControllerContext = _controllerContext;
            controller.ModelState.AddModelError("Title", "Error");

            await TestHelpers.ReturnsBadRequest(e => e.PostComment(id, model), controller);
        }

        [Fact]
        public async Task PostComment_Returns_NotFound()
        {
            int id = 1;
            CommentModel model = new();
            Task<IssueDto> exception = Task.FromException<IssueDto>(new ObjectNotFoundException());

            _service.AddComment(1, poster, model).Returns(exception);

            IssuesController controller = new(_service);

            controller.ControllerContext = _controllerContext;


            await TestHelpers.ReturnsNotFound(e => e.PostComment(id, model), controller);
        }
    }
}
