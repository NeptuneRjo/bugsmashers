using BugTrackerMvc.DTOs;
using BugTrackerMvc.Models;

namespace BugTrackerMvc.Interfaces
{
    public interface IProjectService
    {
        Task<ICollection<ProjectDto>> GetProjects();
        Task<ProjectDto> GetProject(int id);
        Task<ProjectDto> CreateProject(string poster, ProjectModel projectModel);
        Task<ProjectDto> UpdateProject(int id, string poster, ProjectModel projectModel);
        Task<ProjectDto> AddIssue(int id, string poster, IssueModel model);
        Task<bool> DeleteProject(int id, string poster);
    }
}
