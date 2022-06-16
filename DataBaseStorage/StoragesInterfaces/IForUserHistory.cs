using System.Collections.Generic;
using System.Threading.Tasks;
using DataBaseStorage.DbModels;

namespace DataBaseStorage.StoragesInterfaces
{
    public interface IForUserHistory<T> where T: class, IDbModel
    {
        public Task<List<T>> GetEmployeeHistory(long employeeId);
    }
}