using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.StorageActions;
using DataBaseStorage.DbModels;
using DataBaseStorage.ResponseModels;

namespace BusinessLayer.Services
{
    public class AdminAccrualService
    {
        private readonly IStorageActions storage;
        
        public AdminAccrualService(IStorageActions storage)
        {
            this.storage = storage;
        }
        
        public async Task<List<Employee>> GetAllEmployees()
        {
            var employeesStorage = storage.CreateEmployeeStorage();
            return await employeesStorage.GetAllAsync();
        }
        
        public async Task<bool> AccrualCoinsToEmployees(string description, decimal coins,
            DateTime dateOfEvent, List<long> employeesIds)
        {
            var adminAccrualStorage = storage.CreateAdminAccrualStorage();
            var accrualId = await adminAccrualStorage.AddNewAccrual(description, coins, dateOfEvent);

            var adminAccrualEmployeeStorage = storage.CreateAdminAccrualEmployeeStorage();
            await adminAccrualEmployeeStorage.AddWithSeveralEmployees(accrualId, employeesIds);

            var employeeCoinsStorage = storage.CreateEmployeeCoinsStorage();
            foreach (var e in employeesIds)
            {
                await employeeCoinsStorage.AddCoins(e, coins);
            }

            return true;
        }

        public async Task<List<GetAccrualWithFioResponse>> GetAllAccrualsWithFio()
        {
            var adminAccrualStorage = storage.CreateAdminAccrualStorage();
            var allAccruals = await adminAccrualStorage.GetAllAsync();
            
            var adminAccrualEmployeeStorage = storage.CreateAdminAccrualEmployeeStorage();
            var accrualEmployees = await adminAccrualEmployeeStorage.GetAllAsync();

            var employeeCoinsStorage = storage.CreateEmployeeStorage();
            var output = new List<GetAccrualWithFioResponse>();
            foreach (var e in allAccruals)
            {
                var util = accrualEmployees
                    .Where(x => x.AdminAccrual.Equals(e.Id))
                    .ToList();
                var names = new List<string>();
                foreach (var f in util)
                {
                    var employee = await employeeCoinsStorage.SearchByIdAsync(f.Employee);
                    names.Add(employee.Fio);
                }
                
                output.Add(new GetAccrualWithFioResponse
                {
                    Description = e.Description,
                    Coins = e.Coins,
                    DateOfEvent = e.DateOfEvent,
                    EmployeeNames = names,
                    TimeSent = e.TimeSent
                });
            }

            return output;
        }
    }
}