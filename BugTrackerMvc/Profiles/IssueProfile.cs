using AutoMapper;
using BugTrackerMvc.Models;

namespace BugTrackerMvc.Profiles
{
    public class IssueProfile : Profile
    {
        public IssueProfile()
        {
            CreateMap<IssueModel, Issue>();
            CreateMap<Issue, IssueDto>();
        }
    }
}
