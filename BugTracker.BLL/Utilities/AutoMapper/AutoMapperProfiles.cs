using AutoMapper;
using BugTracker.DAL.Entities;
using BugTracker.DAL.Models;
using BugTracker.DTO.DTOs;

namespace BugTracker.BLL.Utilities.AutoMapper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles() 
        {
            // Issue Profiles
            CreateMap<Issue, IssueDto>();
            CreateMap<IssueModel, Issue>();
        
            // Comment Profiles
            CreateMap<Comment, CommentDto>();
            CreateMap<CommentModel, Comment>();

            // Project profiles
            CreateMap<Project, ProjectDto>();
            CreateMap<Project, ProjectListDto>();
            CreateMap<ProjectModel, Project>();
        }
    }
}
