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
        private readonly IStorageFactory _storageFactory;
        
        public AdminAccrualService(IStorageFactory storageFactory)
        {
            _storageFactory = storageFactory;
        }
        
        public async Task<List<Employee>> GetAllEmployees()
        {
            var employeesStorage = _storageFactory.CreateEmployeeStorage();
            return await employeesStorage.GetAllAsync();
        }
        
        public async Task<bool> AccrualCoinsToEmployees(string nameOfEvent, string description, decimal coins,
            DateTime dateOfEvent, List<long> employeesIds)
        {
            var adminAccrualStorage = _storageFactory.CreateAdminAccrualStorage();
            var accrualId = await adminAccrualStorage.AddNewAccrual(nameOfEvent, description, coins, dateOfEvent);

            var adminAccrualEmployeeStorage = _storageFactory.CreateAdminAccrualEmployeeStorage();
            await adminAccrualEmployeeStorage.AddWithSeveralEmployees(accrualId, employeesIds);

            var employeeCoinsStorage = _storageFactory.CreateEmployeeCoinsStorage();
            foreach (var e in employeesIds)
            {
                await employeeCoinsStorage.AddCoins(e, coins);
            }

            return true;
        }

        public async Task<List<GetAccrualWithFioResponse>> GetAllAccrualsWithFio()
        {
            var adminAccrualStorage = _storageFactory.CreateAdminAccrualStorage();
            var allAccruals = await adminAccrualStorage.GetAllAsync();
            
            var adminAccrualEmployeeStorage = _storageFactory.CreateAdminAccrualEmployeeStorage();
            var accrualEmployees = await adminAccrualEmployeeStorage.GetAllAsync();

            var employeeCoinsStorage = _storageFactory.CreateEmployeeStorage();
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
                    NameOfEvent = e.NameOfEvent,
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