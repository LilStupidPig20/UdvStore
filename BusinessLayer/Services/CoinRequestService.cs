using System;
using System.Collections.Generic;
using BusinessLayer.StorageActions;
using DataBaseStorage.DbModels;

namespace BusinessLayer.Services
{
    public class CoinRequestService
    {
        private readonly IStorageActions storage;
        //TODO заменить в табличке isClosed на enum из Accepted, rejected, open
        public CoinRequestService(IStorageActions storage)
        {
            this.storage = storage;
        }

        public void CreateRequest(string eventEntered, string description,
            long employeeId, DateTime time)
        {
            var employeeRequestStorage = storage.CreateEmployeeRequestStorage();
            employeeRequestStorage.Add(eventEntered, description,
                employeeId, time);
        }

        public void AcceptRequest(long id, decimal coins)
        {
            var employeeRequestStorage = storage.CreateEmployeeRequestStorage();
            var request = employeeRequestStorage.CloseRequest(id);
            
            var employeeCoinsStorage = storage.CreateEmployeeCoinsStorage();
            employeeCoinsStorage.AddCoins(request.EmployeeId, coins);
        }

        public List<EmployeeRequest> GetAllRequests()
        {
            var employeeRequestStorage = storage.CreateEmployeeRequestStorage();
            return employeeRequestStorage.GetAll();
        }

        public void RejectRequest(long id)
        {
            var employeeRequestStorage = storage.CreateEmployeeRequestStorage();
            var request = employeeRequestStorage.CloseRequest(id);
        }
    }
}