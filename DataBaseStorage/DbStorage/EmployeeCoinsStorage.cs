using System;
using System.Linq;
using System.Threading.Tasks;
using DataBaseStorage.ConfigurationDb;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;
using DataBaseStorage.StoragesInterfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace DataBaseStorage.DbStorage
{
    public class EmployeeCoinsStorage : BaseStorage<EmployeeCoins>, IEmployeeCoinsActions
    {
        public EmployeeCoinsStorage(DBConfig dbConfig) : base(dbConfig)
        {
        }

        public async Task<decimal> GetCurrentCoinsOfUser(long employeeId)
        {
            return await DbTable
                .Where(x => x.EmployeeId.Equals(employeeId))
                .Select(x => x.CurrentBalance)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> AddCoins(long id, decimal coinsNumber)
        {
            try
            {
                var employeeCoinsEntity = await DbTable.FirstOrDefaultAsync(x => x.EmployeeId.Equals(id));
                employeeCoinsEntity.CurrentBalance += coinsNumber;
                await UpdateAsync(employeeCoinsEntity);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception($"Не получилось добавить коины {e}");
            }
        }

        public void ReduceCoins(long id, decimal coinsNumber)
        {
            //TODO
        }
    }
}