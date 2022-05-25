using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLayer.StorageActions;
using DataBaseStorage.DbModels;
using DataBaseStorage.ResponseModels;

namespace BusinessLayer.Services
{
    public class CoinRequestService
    {
        private readonly IStorageFactory storage;
        public CoinRequestService(IStorageFactory storage)
        {
            this.storage = storage;
        }

        public async Task<bool> CreateRequest(string eventEntered, string description,
            long employeeId, DateTime time)
        {
            var openRequestsStorage = storage.CreateOpenEmployeesRequestsStorage();
            var request = await openRequestsStorage.Add(eventEntered, description,
                employeeId, time);
            return true;
        }

        public async Task<decimal> AcceptRequest(long id, decimal coins)
        {
            var openRequestsStorage = storage.CreateOpenEmployeesRequestsStorage();
            var openRequest = await openRequestsStorage.SearchByIdAsync(id);
            await openRequestsStorage.DeleteAsync(id);
            
            var closedRequestsStorage = storage.CreateClosedEmployeesRequestsStorage();
            var request = await closedRequestsStorage.AddAccepted(openRequest, coins);
            
            var employeeCoinsStorage = storage.CreateEmployeeCoinsStorage();
            return await employeeCoinsStorage.AddCoins(request.EmployeeId, coins);
        }

        public async Task<List<GetOpenRequestsResponse>> GetOpenRequests()
        {
            var openRequestsStorage = storage.CreateOpenEmployeesRequestsStorage();
            var allRequests =  await openRequestsStorage.GetAll();

            var employeeStorage = storage.CreateEmployeeStorage();
            
            var result = new List<GetOpenRequestsResponse>();
            foreach (var employeeRequest in allRequests)
            {
                result.Add(new GetOpenRequestsResponse
                {
                    Request = employeeRequest,
                    Fio = await employeeStorage.GetFioById(employeeRequest.EmployeeId),
                });
            }

            return result;
        }

        public async Task<List<GetClosedRequestsResponse>> GetClosedRequests()
        {
            var closedRequestsStorage = storage.CreateClosedEmployeesRequestsStorage();
            var allRequests = await closedRequestsStorage.GetAll();
            
            var employeeStorage = storage.CreateEmployeeStorage();
            
            var result = new List<GetClosedRequestsResponse>();
            foreach (var employeeRequest in allRequests)
            {
                result.Add(new GetClosedRequestsResponse
                {
                    Id = employeeRequest.Id, 
                    Fio = await employeeStorage.GetFioById(employeeRequest.EmployeeId),
                    TimeSend = employeeRequest.TimeSent
                });
            }

            return result;
        }

        public async Task<ClosedEmployeesRequest> GetClosedRequestInfo(long id)
        {
            var closedRequestsStorage = storage.CreateClosedEmployeesRequestsStorage();
            var request = await closedRequestsStorage.SearchByIdAsync(id);
            return request;
        }

        public async Task<bool> RejectRequest(long id, string comment)
        {
            var openRequestsStorage = storage.CreateOpenEmployeesRequestsStorage();
            var openRequest = await openRequestsStorage.SearchByIdAsync(id);
            await openRequestsStorage.DeleteAsync(id);
            
            var closedRequestsStorage = storage.CreateClosedEmployeesRequestsStorage();
            return await closedRequestsStorage.AddRejected(openRequest, comment);
        }
    }
}