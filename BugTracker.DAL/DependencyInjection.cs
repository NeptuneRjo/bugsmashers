using BugTracker.DAL.Data;
using BugTracker.DAL.Repositories;
using BugTracker.DAL.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BugTracker.DAL
{
    public static class DependencyInjection
    {
        public static void RegisterDALDependencies(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<IIssueRepository, IssueRepository>();
            services.AddScoped<IProjectRepository, ProjectRepository>();

            services.AddDbContext<DataContext>(options =>
            {
                var defaultConnectionString = Configuration.GetConnectionString("DefaultConnection");

                options.UseSqlServer(defaultConnectionString);
            });
        }
    }
}
