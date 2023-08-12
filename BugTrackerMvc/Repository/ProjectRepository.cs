using BugTrackerMvc.Interfaces;
using BugTrackerMvc.Models;

namespace BugTrackerMvc.Repository
{
    public class ProjectRepository : Repository<Project>, IProjectRepository
    {
        private readonly IDataContext _context;

        public ProjectRepository(IDataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Issue> AddIssue(Project project, Issue issue)
        {
            //if (issue.Project == null)
            //    throw new Exception("Projet must be defined");

            //_context.Issues.Add(issue);

            //project.Issues.Add(issue);

            //_context.SaveChanges();

            //return issue;
            project.Issues.Add(issue);

            _context.Projects.Update(project);
            _context.SaveChanges();

            return issue;
        }
    }
}
