using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.Helpers;
using BusinessLayer.StorageActions;
using DataBaseStorage.DbModels;
using DataBaseStorage.Enums;
using DataBaseStorage.ResponseModels;

namespace BusinessLayer.Services
{
    public class UserCoinsService
    {
        private readonly IStorageFactory _storageFactory;
        private readonly CoinsHelper _coinsHelper;

        public UserCoinsService(IStorageFactory storageFactory, CoinsHelper coinsHelper)
        {
            _storageFactory = storageFactory;
            _coinsHelper = coinsHelper;
        }

        public async Task<decimal> GetCurrentUserCoins(long idEmployee)
        {
            var coinsStorage = _storageFactory.CreateEmployeeCoinsStorage();
            return await coinsStorage.GetCurrentCoinsOfUser(idEmployee);
        }

        public async Task TransferCoins(long sender, long receiver, decimal coinsCount, string comment)
        {
            var employeeCoinsStorage = _storageFactory.CreateEmployeeCoinsStorage();
            var senderEmployee = await employeeCoinsStorage.GetByEmployeeId(sender);
            if (senderEmployee.CurrentBalance < coinsCount)
                throw new Exception("Недостаточно коинов на балансе");
            
            var receiverEmployee = await employeeCoinsStorage.IsExistAsync(receiver);
            if (receiverEmployee == false)
            {
                throw new Exception("Не удалось найти пользователя-получателя");
            }
            
            await _coinsHelper.ReduceEmployeeCoins(sender, coinsCount);
            await _coinsHelper.AddEmployeeCoins(receiver, coinsCount);

            var transferHistoryStorage = _storageFactory.CreateTransferCoinsHistoryStorage();
            await transferHistoryStorage.AddToHistory(sender, receiver, coinsCount, comment);
        }
        
        public async Task<List<GetAllEmployeesResponse>> GetAllEmployees(long currentEmployeeId)
        {
            var employeesStorage = _storageFactory.CreateEmployeeStorage();
            var allEmployees = await employeesStorage.GetAllEmployees();
            return allEmployees.Where(x => !x.Id.Equals(currentEmployeeId)).ToList();
        }

        public async Task<List<CommonHistoryResponse>> GetHistory(long employeeId)
        {
            var resultHistory = new List<CommonHistoryResponse>();
            
            var openRequestsStorage = _storageFactory.CreateOpenEmployeesRequestsStorage();
            var openRequests = await openRequestsStorage.GetEmployeeHistory(employeeId);
            foreach (var e in openRequests)
            {
                resultHistory.Add(new CommonHistoryResponse
                {
                    Id = e.Id,
                    TypesOfCoinsActions = TypesOfCoinsActions.EmployeeRequestOpen,
                    Name = e.Event,
                    DateTime = e.TimeSent,
                    CoinsAsString = "В ожидании"
                });
            }
            
            var closedRequestsStorage = _storageFactory.CreateClosedEmployeesRequestsStorage();
            var closedRequest = await closedRequestsStorage.GetEmployeeHistory(employeeId);
            foreach (var e in closedRequest)
            {
                resultHistory.Add(new CommonHistoryResponse
                {
                    Id = e.Id,
                    TypesOfCoinsActions = TypesOfCoinsActions.EmployeeRequestClosed,
                    Name = e.Event,
                    DateTime = e.TimeSent,
                    CoinsAsString = e.Status == RequestStatus.Rejected ? "Отклонено" : $"+ {e.CoinsAccrued} UC",
                    Comment = e.RejectComment
                });
            }
            
            var transferHistoryStorage = _storageFactory.CreateTransferCoinsHistoryStorage();
            var transfers = await transferHistoryStorage.GetEmployeeHistory(employeeId);
            foreach (var e in transfers)
            {
                var employeeStorage = _storageFactory.CreateEmployeeStorage();
                string otherEmployeeName;
                if (e.Sender.Equals(employeeId))
                {
                    var otherEmployee = await employeeStorage.SearchByIdAsync(e.Receiver);
                    otherEmployeeName = otherEmployee.Fio;
                }
                else
                {
                    var otherEmployee = await employeeStorage.SearchByIdAsync(e.Sender);
                    otherEmployeeName = otherEmployee.Fio;
                }
                
                resultHistory.Add(new CommonHistoryResponse
                {
                    Id = e.Id,
                    TypesOfCoinsActions = TypesOfCoinsActions.Transfer,
                    Name = e.Sender == employeeId ? $"Перевод для {otherEmployeeName}" : $"Перевод от {otherEmployeeName}",
                    DateTime = e.TimeOfTransfer,
                    CoinsAsString = e.Sender == employeeId ? $"- {e.CoinsCount} UC" : $"+ {e.CoinsCount} UC",
                    Comment = e.Comment
                });
            }
            
            var adminAccrualEmployeeStorage = _storageFactory.CreateAdminAccrualEmployeeStorage();
            var adminAccrualEmployeeHistory = await adminAccrualEmployeeStorage.GetEmployeeHistory(employeeId);
            var requiredIds = adminAccrualEmployeeHistory.Select(x => x.Id).ToList();
            var adminAccrualStorage = _storageFactory.CreateAdminAccrualStorage();
            var adminAccruals = await adminAccrualStorage.GetSeveralByIdsAsync(requiredIds);
            foreach (var e in adminAccruals)
            {
                resultHistory.Add(new CommonHistoryResponse
                {
                    Id = e.Id,
                    TypesOfCoinsActions = TypesOfCoinsActions.AdminAccrual,
                    Name = e.NameOfEvent,
                    DateTime = e.TimeSent,
                    CoinsAsString = $"+ {e.Coins} UC",
                    Comment = e.Description
                });
            }

            resultHistory.Sort((x, y) => DateTime.Compare(y.DateTime, x.DateTime));
            return resultHistory;
        }

        public class CommonHistoryResponse
        {
            public long Id { get; set; }
            public TypesOfCoinsActions TypesOfCoinsActions { get; set; }
            public string Name { get; set; }
            public DateTime DateTime { get; set; }
            public string CoinsAsString { get; set; }
            public string Comment { get; set; }
        }
    }
}