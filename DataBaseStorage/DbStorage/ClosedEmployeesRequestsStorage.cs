using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataBaseStorage.ConfigurationDb;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;
using DataBaseStorage.Enums;
using Microsoft.EntityFrameworkCore;

namespace DataBaseStorage.DbStorage
{
    public class ClosedEmployeesRequestsStorage : BaseStorage<ClosedEmployeesRequest>
    {
        public ClosedEmployeesRequestsStorage(DBConfig dbConfig) : base(dbConfig)
        {
        }
        
        public async Task<ClosedEmployeesRequest> AddAccepted(OpenEmployeesRequest openRequest, decimal coinsAccrued)
        {
            var id = await GetLastIdAsync();
            if (await DbTable.AnyAsync() && await DbTable.AnyAsync(x => 
                    x.Event.Equals(openRequest.Event) &&
                    x.Description.Equals(openRequest.Description) &&
                    x.EmployeeId.Equals(openRequest.EmployeeId) &&
                    x.EventDate.Equals(openRequest.EventDate)))
                throw new Exception("Запись уже существует в базе данных");
            try
            {
                var request = new ClosedEmployeesRequest()
                {
                    Id = id + 1,
                    Description = openRequest.Description,
                    Event = openRequest.Event,
                    EmployeeId = openRequest.EmployeeId,
                    EventDate = openRequest.EventDate,
                    Status = RequestStatus.Accepted,
                    TimeSent = openRequest.TimeSent,
                    CoinsAccrued = coinsAccrued
                };
                DbTable.Add(request);
                await SaveChangesAsync();
                return request;
            }
            catch (Exception e)
            {
                throw new Exception($"Не получилось принять заявку {e}");
            }
        }
        
        public async Task<bool> AddRejected(OpenEmployeesRequest openRequest, string comment)
        {
            var id = await GetLastIdAsync();
            if (await DbTable.AnyAsync() && await DbTable.AnyAsync(x => 
                    x.Event.Equals(openRequest.Event) &&
                    x.Description.Equals(openRequest.Description) &&
                    x.EmployeeId.Equals(openRequest.EmployeeId) &&
                    x.EventDate.Equals(openRequest.EventDate)))
                throw new Exception("Запись уже существует в базе данных");
            try
            {
                var request = new ClosedEmployeesRequest()
                {
                    Id = id + 1,
                    Description = openRequest.Description,
                    Event = openRequest.Event,
                    EmployeeId = openRequest.EmployeeId,
                    EventDate = openRequest.EventDate,
                    Status = RequestStatus.Rejected,
                    RejectComment = comment,
                    TimeSent = openRequest.TimeSent
                };
                DbTable.Add(request);
                await SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                throw new Exception($"Не получилось принять заявку {e}");
            }
        }
        
        public async Task<List<ClosedEmployeesRequest>> GetAll()
        {
            return await DbTable.ToListAsync();
        }
    }
}