using BugTracker.BLL.Services;
using BugTracker.BLL.Services.IServices;
using BugTracker.BLL.Utilities.AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BugTracker.BLL
{
    public static class DependencyInjection
    {
        public static void RegisterBLLDependencies(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddScoped<IIssueService, IssueService>();
            services.AddScoped<IProjectService, ProjectService>();

            services.AddAutoMapper(typeof(AutoMapperProfiles));
        }
    }
}

