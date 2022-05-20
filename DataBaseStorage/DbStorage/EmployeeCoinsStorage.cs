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

        public async Task<bool> ReduceCoins(long id, decimal coinsNumber)
        {
            try
            {
                var employeeCoinsEntity = await DbTable.FirstOrDefaultAsync(x => x.EmployeeId.Equals(id));
                employeeCoinsEntity.CurrentBalance -= coinsNumber;
                if (employeeCoinsEntity.CurrentBalance < 0)
                    throw new ArgumentException("Недостаточно коинов на счету");
                await UpdateAsync(employeeCoinsEntity);
                return true;
            }
            catch (ArgumentException e)
            {
                throw;
            }
            catch (Exception e)
            {
                throw new Exception($"Не получилось снять коины {e}");
            }
        }
    }
}