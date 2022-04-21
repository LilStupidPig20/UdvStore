using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using DataBaseInteraction.Context;
using DataBaseInteraction.DbModels;
using DataBaseInteraction.ResponseModels;
using Microsoft.EntityFrameworkCore;

namespace DataBaseInteraction.DbExternalAccess
{
    public class EmployeeActions : BaseRepository<Employee>
    {
        public EmployeeActions(IDbContextFactory<PostgresContext> context) : base(context)
        {
        }
        
        public bool IsUserWithEnteredDataExist(string login, string password)
        {
            using var context = DbContextFactory.CreateDbContext();
            try
            {
                return context.Employees.Any(user => user.Login == login && user.Password == password);
            }
            catch (Exception e)
            {
                throw new Exception("Введеные данные не верны");
            }
        }

        public LoginResponse FindUserByLoginRequest(string login, string password)
        {
            using var context = DbContextFactory.CreateDbContext();
            try
            {
                var found = context.Employees
                    .FirstOrDefault(user => user.Login == login && user.Password == password);
                return new LoginResponse
                {
                    UserId = found.Id,
                    Login = found.Login,
                    Fio = found.Fio,
                    Position = found.Position
                };
            }
            catch (Exception e)
            {
                throw new Exception("Введеные данные не верны");
            }
        }
    }
}