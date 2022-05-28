using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataBaseStorage.ConfigurationDb;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;
using DataBaseStorage.StoragesInterfaces;
using Microsoft.EntityFrameworkCore;

namespace DataBaseStorage.DbStorage
{
    public class AdminAccrualEmployeeStorage : BaseStorage<AdminAccrualEmployee>, IForUserHistory<AdminAccrualEmployee>
    {
        public AdminAccrualEmployeeStorage(DBConfig dbConfig) : base(dbConfig)
        {
        }

        public async Task<bool> AddWithSeveralEmployees(long idAccrual, List<long> employees)
        {
            try
            {
                var id = await GetLastIdAsync();
                foreach (var e in employees)
                {
                    await AddAsync(new AdminAccrualEmployee
                    {
                        Id = id + 1,
                        AdminAccrual = idAccrual,
                        Employee = e
                    });
                    id++;
                }
                
                return true;
            }
            catch (Exception e)
            {
                throw new Exception($"Не получилось добавить запись в таблицу {e}");
            }
        }
        
        public async Task<List<AdminAccrualEmployee>> GetEmployeeHistory(long employeeId)
        {
            return await DbTable
                .Where(x => x.Employee.Equals(employeeId))
                .ToListAsync();
        }
    }
}