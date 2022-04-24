﻿using System.Linq;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;
using DataBaseStorage.StoragesInterfaces;
using Microsoft.EntityFrameworkCore;

namespace DataBaseStorage.DbStorage
{
    public class EmployeeCoinsActions : BaseActions<EmployeeCoins>, IEmployeeCoinsActions
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
                .Where(x => x.EmployeeId.Equals(employeeId))
                .Select(x => x.CurrentBalance)
                .FirstOrDefault();
        }

        public void AddCoins()
        {
            //TODO
        }

        public void ReduceCoins()
        {
            //TODO
        }
    }
}