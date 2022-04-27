using System;
using System.Linq;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;
using Microsoft.EntityFrameworkCore;

namespace DataBaseStorage.DbStorage
{
    public class EmployeeRequestActions : BaseActions<EmployeeRequest>
    {
        public EmployeeRequestActions(IDbContextFactory<PostgresContext> context) : base(context)
        {
        }

        public void Add(string eventEntered, string description,
            long employeeId, DateTime time)
        {
            using var connection = DbContextFactory.CreateDbContext();
            var id = GetLastId(connection);
            if (connection.EmployeeRequests.Any() && connection.EmployeeRequests.Any(x => 
                    x.Event.Equals(eventEntered) &&
                    x.Description.Equals(description) &&
                    x.EmployeeId.Equals(employeeId) &&
                    x.Time.Equals(time)))
                throw new Exception("Запись уже существует в базе данных");
            try
            {
                var request = new EmployeeRequest
                {
                    Id = id + 1,
                    Description = description,
                    Event = eventEntered,
                    EmployeeId = employeeId,
                    IsOpen = true,
                    Time = time
                };
                connection.EmployeeRequests.Add(request);
                connection.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public EmployeeRequest CloseRequest(long idRequest)
        {
            var request = SearchById(idRequest);
            if (request.IsOpen == false)
                throw new Exception("Заявка уже закрыта");
            request.IsOpen = false;
            using var connection = DbContextFactory.CreateDbContext();
            connection.EmployeeRequests.Update(request);
            connection.SaveChanges();
            return request;
        }
    }
}