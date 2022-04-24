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
    public class AdminActions : BaseActions<Admin>, IAdminActions
    {
        public AdminActions(IDbContextFactory<PostgresContext> context) : base(context)
        {
        }
        
        public bool IsAdminWithEnteredDataExist(string login, string password)
        {
            using var context = DbContextFactory.CreateDbContext();
            try
            {
                return context.Admins.Any(admin => admin.Login == login && admin.Password == password);
            }
            catch (Exception e)
            {
                throw new Exception("Ошибка авторизации");
            }
        }

        public LoginResponse FindAdminByLoginRequest(string login, string password)
        {
            using var context = DbContextFactory.CreateDbContext();
            try
            {
                var found = context.Admins
                    .FirstOrDefault(admin => admin.Login == login && admin.Password == password);
                return new LoginResponse
                {
                    UserId = found.Id,
                    Login = found.Login,
                    Fio = found.Name,
                    Role = Roles.Admin
                };
            }
            catch (Exception e)
            {
                throw new Exception("Введеные данные не верны");
            }
        }
    }
}