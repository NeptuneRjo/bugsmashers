using BugTrackerMvc.Controllers;
using BugTrackerMvc.Data;
using BugTrackerMvc.Interfaces;
using BugTrackerMvc.Models;
using BugTrackerMvc.Repository;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace BugTrackerMvcTesting
{
    public class IssueRepositoryTests
    {
        private readonly IssueRepository _repository;
        private readonly Mock<IDataContext> _mockDataContext;

        public IssueRepositoryTests()
        {
            _mockDataContext = new Mock<IDataContext>();
            _repository = new IssueRepository(_mockDataContext.Object);
        }

        [Fact]
        public void DeleteIssue_WhenIssueExists_ShouldDeleteIssue()
        {
            var issueId = 1;
            var issue = new Issue { Id = issueId };

            _mockDataContext.Setup(c => c.Issues.Find(issueId)).Returns(issue);

            _repository.DeleteIssue(issueId);

            _mockDataContext.Verify(c => c.Issues.Remove(issue), Times.Once);
            _mockDataContext.Verify(c => c.SaveChanges(), Times.Once);
        }

        [Fact]
        public void DeleteIssue_WhenIssueDoesNotExist_ShouldThrowException()
        {
            var nonExistantIssueId = 999;

            _mockDataContext.Setup(c => c.Issues.Find(nonExistantIssueId)).Throws<Exception>();

            Assert.Throws<Exception>(() => _repository.DeleteIssue(nonExistantIssueId));
        }

        [Fact]
        public void DeleteIssue_WhenExceptDuringDeletion_ShouldThrowExcept()
        {
            var issueId = 1;
            var issue = new Issue { Id = issueId };

            _mockDataContext.Setup(c => c.Issues.Find(issueId)).Returns(issue);
            _mockDataContext.Setup(c => c.SaveChanges()).Throws<Exception>();

            Assert.Throws<Exception>(() => _repository.DeleteIssue(issueId));
        }

        [Fact]
        public void GetIssueById_WhenIssueExists_ShouldGetIssue()
        {
            var issueId = 1;
            var issue = new Issue { Id = issueId };

            _mockDataContext.Setup(c => c.Issues.Find(issueId)).Returns(issue);

            var retrievedIssued = _repository.GetIssueById(issueId);

            Assert.Equal(issue, retrievedIssued);
        }

        [Fact]
        public void GetIssueById_WhenIssueDoesNotExist_ShouldThrowException()
        {
            var nonExistantIssueId = 999;

            _mockDataContext.Setup(c => c.Issues.Find(nonExistantIssueId)).Throws<Exception>();

            Assert.Throws<Exception>(() => _repository.GetIssueById(nonExistantIssueId));
        }

        [Fact]
        public void GetIssues_ThrowsException_WhenIssuesAreNull()
        {
            _mockDataContext.Setup(c => c.Issues).Throws<Exception>();

            Assert.Throws<Exception>(() => _repository.GetIssues());
        }

        [Fact]
        public void InsertIssues_AddsIssue_IfIssueNotNull()
        {
            var issueId = 1;
            var issue = new Issue { Id = issueId };

            _mockDataContext.Setup(c => c.Issues.Add(issue));

            _repository.InsertIssue(issue);

            _mockDataContext.Verify(c => c.Issues.Add(issue), Times.Once);
            _mockDataContext.Verify(c => c.SaveChanges(), Times.Once);
        }

        [Fact]
        public void InsertIssues_ThrowsNullExcept_WhenIssueIsNull()
        {
            var issue = new Issue();

            _mockDataContext.Setup(c => c.Issues.Add(issue)).Throws<Exception>();

            Assert.Throws<Exception>(() => _repository.InsertIssue(issue));
            _mockDataContext.Verify(c => c.Issues.Add(issue), Times.Once);
            _mockDataContext.Verify(c => c.SaveChanges(), Times.Never);
        }

        [Fact]
        public void UpdateIssue_WhenIssueExists_ShouldUpdateIssue()
        {
            var issueId = 1;
            var issue = new Issue { Id = issueId };

            _mockDataContext.Setup(c => c.Issues.Update(issue));

            _repository.UpdateIssue(issue);

            _mockDataContext.Verify(c => c.Issues.Update(issue), Times.Once);
            _mockDataContext.Verify(c => c.SaveChanges(), Times.Once);
        }

        [Fact]
        public void UpdateIssue_WhenException_ShouldThrowException()
        {
            var issue = new Issue();

            _mockDataContext.Setup(c => c.Issues.Update(issue));
            _mockDataContext.Setup(c => c.SaveChanges()).Throws<Exception>();

            Assert.Throws<Exception>(() => _repository.UpdateIssue(issue));
        }

        [Fact]
        public void GetComments_WhenCommentsExists_ShouldReturnComments()
        {
            int issueId = 1;

            var comments = new List<Comment>
            {
                new Comment { Id = 1, IssueId = issueId },
                new Comment { Id = 2, IssueId = issueId },
                new Comment { Id = 3, IssueId = issueId }
            };

            var mockDbSet = new Mock<DbSet<Comment>>();
            mockDbSet.As<IQueryable<Comment>>().Setup(m => m.Provider).Returns(comments.AsQueryable().Provider);
            mockDbSet.As<IQueryable<Comment>>().Setup(m => m.Expression).Returns(comments.AsQueryable().Expression);
            mockDbSet.As<IQueryable<Comment>>().Setup(m => m.ElementType).Returns(comments.AsQueryable().ElementType);
            mockDbSet.As<IQueryable<Comment>>().Setup(m => m.GetEnumerator()).Returns(comments.GetEnumerator());

            _mockDataContext.Setup(c => c.Comments).Returns(mockDbSet.Object);

            var result = _repository.GetComments(issueId);

            Assert.Equal(comments.Count, result.Count());
            Assert.All(comments, comment => Assert.Contains(comment, result));
        }
    }
}