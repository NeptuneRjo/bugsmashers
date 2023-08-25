using BugTrackerMvc.Interfaces;
using BugTrackerMvc.Models;
using Microsoft.EntityFrameworkCore;

namespace BugTrackerMvc.Repository
{
    public class ProjectRepository : Repository<Project>, IProjectRepository
    {
        private readonly IDataContext _context;

        public ProjectRepository(IDataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Issue> AddIssue(int projectId, Issue issue)
        {
            Project project = _context.Projects.Find(projectId);

            project.Issues.Add(issue);

            _context.Projects.Update(project);
            _context.SaveChanges();

            return issue;
        }

        public async Task<ICollection<Project>> GetAllWithComments()
        {
            ICollection<Project> projects = await _context.Projects
                .Include(e => e.Issues)
                .ThenInclude(e => e.Comments)
                .ToListAsync();

            return projects;
        }

        public async Task<Project> GetOneWithComments(int id)
        {
            Project project = await _context.Projects
                .Include(e => e.Issues)
                .ThenInclude(e => e.Comments)
                .FirstAsync(e => e.Id == id);

            return project;
        }
    }
}
