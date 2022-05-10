using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataBaseStorage.ConfigurationDb;
using DataBaseStorage.DbModels;
using DataBaseStorage.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Npgsql;

namespace DataBaseStorage.Context
{
    public class BaseStorage<TEntity> : DbContext
        where TEntity : class, IDbModel
    {
        protected DbSet<TEntity> DbTable { get; set; }
        private readonly string connectionString;

        public BaseStorage(DBConfig dbConfig)
        {
            connectionString = dbConfig.ConnectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresEnum<RequestStatus>();
        }
        
        public virtual async Task<bool> DeleteAsync(long id)
        {
            var objToRemove = await SearchByIdAsync(id);
            DbTable.Remove(objToRemove);
            return await TrySaveChanges();
        }

        public virtual async Task<bool> IsExistAsync(long id)
        {
            var entity = await DbTable.FirstOrDefaultAsync(x => x.Id.Equals(id));
            return entity != null;
        }

        public virtual async Task<TEntity> SearchByIdAsync(long id)
        {
            var foundObj = await DbTable.FirstOrDefaultAsync(x => x.Id.Equals(id));
            if (foundObj == null)
                throw new Exception($"Запись с таким идентификатором отсутствует в таблице {typeof(TEntity)}");
            return foundObj;
        }

        public virtual async Task<List<TEntity>> GetAllAsync()
        {
            if (!await DbTable.AnyAsync())
                throw new Exception($"Таблица{typeof(TEntity)} пуста, или не существует");
            return DbTable.Select(x => x).ToList();
        }

        public virtual async Task<long> GetLastIdAsync()
        {
            if (!await DbTable.AnyAsync())
                return 0;
            return DbTable.OrderBy(x => x.Id).Last().Id;
        }

        public async Task<bool> UpdateAsync(TEntity entity)
        {
            if (entity is null)
                throw new ArgumentNullException(nameof(entity));

            DbTable.Update(entity);
            return await TrySaveChanges();
        }

        public async Task<bool> AddAsync(TEntity entity)
        {
            if (entity is null)
                throw new ArgumentNullException(nameof(entity));
            await DbTable.AddAsync(entity);
            return await TrySaveChanges();
        }

        private async Task<bool> TrySaveChanges()
        {
            try
            {
                await SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}