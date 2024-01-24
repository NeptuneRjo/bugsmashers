using AutoMapper;
using BugTracker.BLL.Services.IServices;
using BugTracker.DAL.Entities;
using BugTracker.DAL.Models;
using BugTracker.DAL.Repositories.IRepositories;
using BugTracker.DTO.DTOs;
using System.Linq.Expressions;


namespace BugTracker.BLL.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _repository;
        private readonly IMapper _mapper;

        private Expression<Func<Project, object>>[] includes = { e => e.Issues };

        public ProjectService(IProjectRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<ProjectDto> AddIssue(int id, string poster, IssueModel model)
        {
            Project project = await _repository.GetByQuery(e => e.Id == id, includes);

            if (project == null)
                throw new KeyNotFoundException($"No project with the id of {id} was found");

            Issue issue = _mapper.Map<Issue>(model);

            issue = await _repository.AddIssue(id, issue);
            project.Issues.Add(issue);

            ProjectDto dto = _mapper.Map<ProjectDto>(project);

            return dto;
        }

        public async Task<ProjectDto> CreateProject(string poster, ProjectModel projectModel)
        {
            if (projectModel.Poster == null)
                projectModel.Poster = poster;

            if (projectModel.Poster != poster)
                throw new UnauthorizedAccessException("Credentials do not match");

            Project project = _mapper.Map<Project>(projectModel);
            project.CreatedAt = DateTime.UtcNow;

            await _repository.Add(project);

            ProjectDto dto = _mapper.Map<ProjectDto>(project);

            return dto;
        }

        public async Task<bool> DeleteProject(int id, string poster)
        {
            try
            {
                Project project = await _repository.GetByQuery(e => e.Id == id);

                if (project == null)
                    throw new KeyNotFoundException($"No project with the id of {id} was found");

                if (project.Poster != poster)
                    throw new UnauthorizedAccessException("Credentials do not match");

                _repository.Delete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<ProjectDto> GetProject(int id)
        {
            Project project = await _repository.GetOneWithComments(id);

            if (project == null)
                throw new KeyNotFoundException($"No project with the id of {id} was found");

            ProjectDto dto = _mapper.Map<ProjectDto>(project);

            return dto;
        }

        public async Task<ICollection<ProjectDto>> GetProjects()
        {
            ICollection<Project> projects = await _repository.GetAllWithComments();

            ICollection<ProjectDto> dtos = _mapper.Map<ICollection<ProjectDto>>(projects);

            return dtos;
        }

        public async Task<ICollection<ProjectDto>> GetProjects(string poster)
        {
            ICollection<Project> projects = await _repository.GetAllByQuery(e => e.Poster == poster, includes);

            ICollection<ProjectDto> dtos = _mapper.Map<ICollection<ProjectDto>>(projects);

            return dtos;
        }

        public async Task<ProjectDto> UpdateProject(int id, string poster, ProjectModel projectModel)
        {
            Project project = await _repository.GetByQuery(e => e.Id == id);

            if (project == null)
                throw new KeyNotFoundException($"No project with the id of {id} was found");

            if (projectModel.Poster == null)
                projectModel.Poster = poster;

            if (projectModel.Poster != poster)
                throw new UnauthorizedAccessException("Credentials do not match");

            project = _mapper.Map(projectModel, project);

            _repository.Update(project);

            ProjectDto dto = _mapper.Map<ProjectDto>(project);

            return dto;
        }
    }
}
