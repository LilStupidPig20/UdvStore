using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataBaseStorage.Context
{
    public interface IBaseStorage<TEntity>
    {
        public Task<bool> IsExistAsync(long id);
        public Task<TEntity> SearchByIdAsync(long id);
        public Task<List<TEntity>> GetAllAsync();
        public Task<long> GetLastIdAsync();
    }
}