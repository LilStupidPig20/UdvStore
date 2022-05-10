using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataBaseStorage.Context
{
    public interface IBaseStorage<TEntity>
    {
        public Task<bool> IsExist(long id);
        public Task<TEntity> SearchById(long id);
        public Task<List<TEntity>> GetAll();
        public Task<long> GetLastId();
    }
}