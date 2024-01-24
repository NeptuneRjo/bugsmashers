using AutoMapper;
using BugTracker.BLL.Services;
using BugTracker.BLL.Services.IServices;
using BugTracker.DAL.Entities;
using BugTracker.DAL.Models;
using BugTracker.DAL.Repositories;
using BugTracker.DAL.Repositories.IRepositories;
using BugTracker.DTO.DTOs;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Test.Services
{
    public class IssueServiceTests
    {
        private readonly IIssueRepository _repository;
        private readonly IIssueService _service;
        private readonly IMapper _mapper;

        public IssueServiceTests()
        {
            _repository = Substitute.For<IIssueRepository>();
            _mapper = Substitute.For<IMapper>();

            _service = new IssueService(_repository, _mapper);
        }

        [Fact]
        public async Task AddComment_WhenIssueExists_ReturnsUpdatedIssue()
        {
            var dto = TestEntities._mockIssueDto;
            var issue = TestEntities._mockIssue;

            _repository
                .AddComment(1, Arg.Any<Comment>())
                .Returns(issue);

            _mapper.Map<IssueDto>(issue).Returns(dto);

            var result = await _service.AddComment(1, "testposter", "content");

            Assert.NotNull(result);
            Assert.Equivalent(result, dto, strict: true);
        }

        [Fact]
        public async Task AddComment_WhenIssueDoesNotExist_ThrowsException()
        {
            await Assert.ThrowsAsync<KeyNotFoundException>(
                () => _service.AddComment(1, "testposter", "content"));
        }

        [Fact]
        public async Task CreateIssue_WhenSuccess_ReturnsIssue()
        {
            var dto = TestEntities._mockIssueDto;
            var issueModel = TestEntities._mockIssueModel;
            var issue = TestEntities._mockIssue;

            _repository.Add(issue).Returns(issue);

            _mapper.Map(Arg.Any<IssueModel>(), Arg.Any<Issue>()).Returns(issue);
            _mapper.Map<IssueDto>(Arg.Any<Issue>()).Returns(dto);

            var result = await _service.CreateIssue("Test Poster", issueModel);

            Assert.NotNull(result);
        }
    }
}
