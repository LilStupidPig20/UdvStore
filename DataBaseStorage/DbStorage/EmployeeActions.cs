using System;
using System.Linq;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;
using DataBaseStorage.Enums;
using DataBaseStorage.ResponseModels;
using DataBaseStorage.StoragesInterfaces;
using Microsoft.EntityFrameworkCore;

namespace DataBaseStorage.DbStorage
{
    public class EmployeeActions : BaseActions<Employee> , IEmployeeActions
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
                throw new Exception("Ошибка авторизации");
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
                    Position = found.Position,
                    Role = Roles.User
                };
            }
            catch (Exception e)
            {
                throw new Exception("Введеные данные не верны");
            }
        }
    }
}