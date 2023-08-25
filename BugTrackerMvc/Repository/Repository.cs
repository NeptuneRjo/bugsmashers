using BugTrackerMvc.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace BugTrackerMvc.Repository
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly IDataContext _context;

        public Repository(IDataContext context)
        {
            _context = context;
        }

        public async Task<ICollection<TEntity>> GetAll()
        {
            return await _context.Set<TEntity>().ToListAsync();
        }

        public async Task<ICollection<TEntity>> GetAllByQuery(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = _context.Set<TEntity>().AsNoTracking();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.Where(predicate).ToListAsync();
        }

        public async Task<TEntity> GetByQuery(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = _context.Set<TEntity>().AsNoTracking();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.FirstOrDefaultAsync(predicate);
        }

        public async void Update(TEntity entity)
        {
            _context.Set<TEntity>().Update(entity);
            _context.SaveChanges();
        }

        public async Task<TEntity> Add(TEntity entity)
        {
            _context.Set<TEntity>().Add(entity);
            _context.SaveChanges();

            return entity;
        }

        public async void Delete(int id)
        {
            TEntity entity = _context.Set<TEntity>().Find(id);

            _context.Set<TEntity>().Remove(entity);
            _context.SaveChanges();
        }
    
        public async Task<bool> Exists(int id)
        {
            return await _context.Set<TEntity>().FindAsync(id) != null;
        }
    }
}
