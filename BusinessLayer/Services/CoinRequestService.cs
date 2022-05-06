using System;
using System.Collections.Generic;
using BusinessLayer.StorageActions;
using DataBaseStorage.DbModels;
using DataBaseStorage.ResponseModels;

namespace BusinessLayer.Services
{
    public class CoinRequestService
    {
        private readonly IStorageActions storage;
        public CoinRequestService(IStorageActions storage)
        {
            this.storage = storage;
        }

        public void CreateRequest(string eventEntered, string description,
            long employeeId, DateTime time)
        {
            var allRequestsStorage = storage.CreateAllRequestStorage();
            var request = allRequestsStorage.Add(eventEntered, description,
                employeeId, time);

            var employeeRequestsStorage = storage.CreateEmployeeRequestsStorage();
            employeeRequestsStorage.Add(employeeId, request.Id);
        }

        public void AcceptRequest(long id, decimal coins)
        {
            var allRequestsStorage = storage.CreateAllRequestStorage();
            var request = allRequestsStorage.AcceptRequest(id);
            
            var employeeCoinsStorage = storage.CreateEmployeeCoinsStorage();
            employeeCoinsStorage.AddCoins(request.EmployeeId, coins);
        }

        public List<GetOpenRequestsResponse> GetOpenRequests()
        {
            var allRequestsStorage = storage.CreateAllRequestStorage();
            var allRequests =  allRequestsStorage.GetOpen();
            //TODO fix naming in DB, remove timeZone from DB
            var employeeStorage = storage.CreateEmployeeStorage();
            var result = new List<GetOpenRequestsResponse>();
            foreach (var employeeRequest in allRequests)
            {
                result.Add(new GetOpenRequestsResponse
                {
                    Request = employeeRequest,
                    Fio = employeeStorage.GetFioById(employeeRequest.EmployeeId),
                });
            }

            return result;
        }

        public void GetClosedRequests()
        {
            //TODO
        }

        public void GetRequest()
        {
            //TODO, but maybe use method from Base?
        }

        public void RejectRequest(long id, string comment)
        {
            var allRequestsStorage = storage.CreateAllRequestStorage();
            var request = allRequestsStorage.RejectRequest(id);
            
            var employeeRequestsStorage = storage.CreateEmployeeRequestsStorage();
            employeeRequestsStorage.AddCommentToRecord(request.Id, comment);
        }
    }
}