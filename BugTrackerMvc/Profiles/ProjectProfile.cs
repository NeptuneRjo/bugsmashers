﻿using AutoMapper;
using BugTrackerMvc.DTOs;
using BugTrackerMvc.Models;

namespace BugTrackerMvc.Profiles
{
    public class ProjectProfile : Profile
    {
        public ProjectProfile()
        {
            CreateMap<ProjectModel, Project>();
            CreateMap<Project, ProjectDto>();
        }
    }
}
