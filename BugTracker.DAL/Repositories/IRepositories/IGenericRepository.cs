﻿using System.Linq.Expressions;

namespace BugTracker.DAL.Repositories.IRepositories
{
    public interface IGenericRepository<TEntity>
    {
        Task<ICollection<TEntity>> GetAll();
        Task<ICollection<TEntity>> GetAllByQuery(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] includes);
        Task<TEntity> GetByQuery(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] includes);
        void Update(TEntity entity);
        Task<TEntity> Add(TEntity entity);
        void Delete(int id);
        Task<bool> Exists(int id);
    }
}
