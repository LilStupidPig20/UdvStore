using System;
using System.Collections.Generic;
using System.Linq;
using DataBaseInteraction.Context;
using DataBaseInteraction.DbModels;
using Microsoft.EntityFrameworkCore;

namespace DataBaseInteraction.DbExternalAccess
{
    public abstract class BaseRepository<TEntity> where TEntity : class, IDbModel
    {
        protected IDbContextFactory<PostgresContext> DbContextFactory;

        public BaseRepository(IDbContextFactory<PostgresContext> context)
        {
            DbContextFactory = context;
        }

        public virtual void Delete(long id)
        {
            using var context = DbContextFactory.CreateDbContext();
            var objToRemove = SearchById(id);
            context.Set<TEntity>().Remove(objToRemove);
            context.SaveChangesAsync();
        }

        public virtual bool IsExist(long id)
        {
            using var context = DbContextFactory.CreateDbContext();
            var entity = context.Set<TEntity>().FirstOrDefault(x => x.Id.Equals(id));
            return entity != null;
        }

        public virtual TEntity SearchById(long id)
        {
            using var context = DbContextFactory.CreateDbContext();
            var foundObj = context.Set<TEntity>().FirstOrDefault(x => x.Id.Equals(id));
            if (foundObj == null)
                throw new Exception($"Запись с таким идентификатором отсутствует в таблице {typeof(TEntity)}");
            return foundObj;
        }

        public virtual List<TEntity> GetAll()
        {
            using var context = DbContextFactory.CreateDbContext();
            if (!context.Set<TEntity>().Any())
                throw new Exception($"Таблица{typeof(TEntity)} пуста, или не существует");
            return context.Set<TEntity>().Select(x => x).ToList();
        }
    }
}