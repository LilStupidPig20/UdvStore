using System;
using System.Collections.Generic;
using System.Linq;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;
using Microsoft.EntityFrameworkCore;

namespace DataBaseStorage.DbStorage
{
    public abstract class BaseActions<TEntity> where TEntity : IDbModel
    {
        protected IDbContextFactory<PostgresContext> DbContextFactory;

        public BaseActions(IDbContextFactory<PostgresContext> context)
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