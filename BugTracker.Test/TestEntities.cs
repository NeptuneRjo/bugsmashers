using BugTracker.DAL.Entities;
using BugTracker.DAL.Models;
using BugTracker.DTO.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Test
{
    public static class TestEntities
    {
        public static Issue _mockIssue = new()
        {
            Id = 1,
            Title = "Test Issue",
            Description = "Test Description",
            Solved = false,
            Poster = "testposter",
            Status = "In Progress",
            Priority = "High",
            Label = "Bug",
            Comments = new List<Comment>(),
            ProjectId = 1,
            CreatedAt = DateTime.Now,
            LastUpdated = DateTime.Now,
        };

        public static IssueDto _mockIssueDto = new()
        {
            Id = 1,
            Title = "Test Issue",
            Description = "Test Description",
            Solved = false,
            Poster = "testposter",
            Status = "In Progress",
            Priority = "High",
            Label = "Bug",
            Comments = new List<CommentDto>(),
            ProjectId = 1,
            CreatedAt = DateTime.Now,
            LastUpdated = DateTime.Now,
        };

        public static IssueModel _mockIssueModel = new()
        {
            Title = "Test Issue",
            Description = "Test Description",
            Solved = false,
            Status = "In Progress",
            Priority = "High",
            Label = "Bug",
        };
    }
}
