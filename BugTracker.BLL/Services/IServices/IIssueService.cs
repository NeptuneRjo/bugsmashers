using BugTracker.DAL.Entities;
using BugTracker.DAL.Models;
using BugTracker.DTO.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.BLL.Services.IServices
{
    public interface IIssueService
    {
        Task<IssueDto> GetIssue(int id);
        Task<Issue> GetIssue(int id, string poster);
        Task<ICollection<IssueDto>> GetIssues();
        Task<ICollection<IssueDto>> GetIssues(string poster);
        Task<IssueDto> CreateIssue(string poster, IssueModel issueModel);
        Task<IssueDto> UpdateIssue(int id, string poster, IssueModel issueModel);
        Task<IssueDto> AddComment(int id, string poster, CommentModel commentModel);
        Task<bool> Delete(int id, string poster);
    }
}
