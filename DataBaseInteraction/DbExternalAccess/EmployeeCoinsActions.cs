using System.Linq;
using DataBaseInteraction.Context;
using DataBaseInteraction.DbModels;
using Microsoft.EntityFrameworkCore;

namespace DataBaseInteraction.DbExternalAccess
{
    public class EmployeeCoinsActions : BaseRepository<EmployeeCoins>
    {
        public EmployeeCoinsActions(IDbContextFactory<PostgresContext> context) : base(context)
        {
        }

        public decimal GetCurrentCoinsOfUser(long employeeId)
        {
            //TODO какой-то сервис, который сможет обращаться к методам разных
            //репозиториев, но чота там сложно с коннекшенами решить кабута...
            using var context = DbContextFactory.CreateDbContext();
            return context.EmployeeCoins
                .Where(x => x.Id.Equals(employeeId))
                .Select(x => x.CurrentBalance)
                .FirstOrDefault();
        }
    }
}