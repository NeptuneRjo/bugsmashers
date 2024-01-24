using BugTracker.DAL.Data;
using BugTracker.DAL.Entities;
using BugTracker.DAL.Repositories.IRepositories;

namespace BugTracker.DAL.Repositories
{
    public class CommentRepository : GenericRepository<Comment>, ICommentRepository
    {
        private readonly DataContext _context;

        public CommentRepository(DataContext context) : base(context) 
        {
            _context = context;
        }
    }
}
