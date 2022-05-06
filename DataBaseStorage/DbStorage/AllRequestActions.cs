using System;
using System.Collections.Generic;
using System.Linq;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;
using DataBaseStorage.Enums;
using Microsoft.EntityFrameworkCore;

namespace DataBaseStorage.DbStorage
{
    public class AllRequestActions : BaseActions<Request>
    {
        public AllRequestActions(IDbContextFactory<PostgresContext> context) : base(context)
        {
        }

        public Request Add(string eventEntered, string description,
            long employeeId, DateTime time)
        {
            using var connection = DbContextFactory.CreateDbContext();
            var id = GetLastId(connection);
            if (connection.AllRequests.Any() && connection.AllRequests.Any(x => 
                    x.Event.Equals(eventEntered) &&
                    x.Description.Equals(description) &&
                    x.EmployeeId.Equals(employeeId) &&
                    x.EventDate.Equals(time)))
                throw new Exception("Запись уже существует в базе данных");
            try
            {
                var request = new Request
                {
                    Id = id + 1,
                    Description = description,
                    Event = eventEntered,
                    EmployeeId = employeeId,
                    Status = RequestStatus.Open,
                    EventDate = time,
                    TimeSend = DateTime.Now
                };
                connection.AllRequests.Add(request);
                connection.SaveChanges();
                return request;
            }
            catch (Exception e)
            {
                throw new Exception($"Не получилось создать заявку {e}");
            }
        }

        public Request AcceptRequest(long idRequest)
        {
            var request = SearchById(idRequest);
            if (request.Status is RequestStatus.Accepted or RequestStatus.Rejected)
                throw new Exception("Заявка уже закрыта");
            request.Status = RequestStatus.Accepted;
            using var connection = DbContextFactory.CreateDbContext();
            connection.AllRequests.Update(request);
            connection.SaveChanges();
            return request;
        }
        
        public Request RejectRequest(long idRequest)
        {
            var request = SearchById(idRequest);
            if (request.Status is RequestStatus.Accepted or RequestStatus.Rejected)
                throw new Exception("Заявка уже закрыта");
            request.Status = RequestStatus.Rejected;
            using var connection = DbContextFactory.CreateDbContext();
            connection.AllRequests.Update(request);
            connection.SaveChanges();
            return request;
        }
        
        public List<Request> GetOpen()
        {
            using var context = DbContextFactory.CreateDbContext();
            return context.AllRequests
                .Where(x => x.Status.Equals(RequestStatus.Open))?
                .ToList();
        }

        public List<Request> GetClosed()
        {
            using var context = DbContextFactory.CreateDbContext();
            return context.AllRequests
                .Where(x => x.Status.Equals(RequestStatus.Accepted)
                            || x.Status.Equals(RequestStatus.Rejected))?
                .ToList();
        }
    }
}