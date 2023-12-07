using BugTracker.DAL.Models;
using BugTracker.DTO.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.BLL.Services.IServices
{
    public interface IProjectService
    {
        Task<ICollection<ProjectDto>> GetProjects();
        Task<ICollection<ProjectDto>> GetProjects(string poster);
        Task<ProjectDto> GetProject(int id);
        Task<ProjectDto> CreateProject(string poster, ProjectModel projectModel);
        Task<ProjectDto> UpdateProject(int id, string poster, ProjectModel projectModel);
        Task<ProjectDto> AddIssue(int id, string poster, IssueModel model);
        Task<bool> DeleteProject(int id, string poster);
    }
}
