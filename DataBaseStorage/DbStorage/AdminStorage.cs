using System;
using System.Linq;
using System.Threading.Tasks;
using DataBaseStorage.ConfigurationDb;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;
using DataBaseStorage.Enums;
using DataBaseStorage.ResponseModels;
using DataBaseStorage.StoragesInterfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace DataBaseStorage.DbStorage
{
    public class AdminStorage : BaseStorage<Admin>, IAdminActions
    {
        public AdminStorage(DBConfig dbConfig) : base(dbConfig)
        {
        }
        
        public async Task<bool> IsAdminWithEnteredDataExist(string login, string password)
        {
            try
            {
                return await DbTable.AnyAsync(admin => admin.Login == login && admin.Password == password);
            }
            catch (Exception e)
            {
                throw new Exception("Ошибка авторизации");
            }
        }

        public async Task<LoginResponse> FindAdminByLoginRequest(string login, string password)
        {
            try
            {
                var found = await DbTable
                    .FirstOrDefaultAsync(admin => admin.Login == login && admin.Password == password);
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