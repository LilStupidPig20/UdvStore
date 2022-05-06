using System.Collections.Generic;
using System.Linq;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;
using DataBaseStorage.Enums;
using Microsoft.EntityFrameworkCore;

namespace DataBaseStorage.DbStorage
{
    public class EmployeeRequestsActions : BaseActions<EmployeeRequest>
    {
        public EmployeeRequestsActions(IDbContextFactory<PostgresContext> context) : base(context)
        {
        }

        public void Add(long idEmployee, long idRequest)
        {
            using var context = DbContextFactory.CreateDbContext();
            var employeeRequest = new EmployeeRequest
            {
                Id = GetLastId(context) + 1,
                EmployeeId = idEmployee,
                RequestId = idRequest
            };
            context.EmployeeRequests.Add(employeeRequest);
            context.SaveChanges();
        }

        public void AddCommentToRecord(long idRequest, string comment)
        {
            var request = SearchById(idRequest);
            using var context = DbContextFactory.CreateDbContext();
            request.RejectComment = comment;
            context.EmployeeRequests.Update(request);
            context.SaveChanges();
        }
    }
}