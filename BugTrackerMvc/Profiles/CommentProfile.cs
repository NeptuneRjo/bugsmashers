using AutoMapper;
using BugTrackerMvc.Models;

namespace BugTrackerMvc.Profiles
{
    public class CommentProfile : Profile
    {
        public CommentProfile()
        {
            CreateMap<CommentModel, Comment>();
        }
    }
}
