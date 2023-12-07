using BugTracker.DAL.Data;
using BugTracker.DAL.Entities;
using BugTracker.DAL.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.DAL.Repositories
{
    public class ProjectRepository : GenericRepository<Project>, IProjectRepository 
    {
        private readonly DataContext _context;

        public ProjectRepository(DataContext context) : base(context)
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
