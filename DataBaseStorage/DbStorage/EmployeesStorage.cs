using System;
using System.Collections.Generic;
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
    public class EmployeesStorage : BaseStorage<Employee> , IEmployeeActions
    {
        public EmployeesStorage(DBConfig dbConfig) : base(dbConfig)
        {
        }
        
        public async Task<bool> IsUserWithEnteredDataExist(string login, string password)
        {
            try
            {
                return await DbTable.AnyAsync(user => user.Login == login && user.Password == password);
            }
            catch (Exception e)
            {
                throw new Exception("Ошибка авторизации");
            }
        }

        public async Task<LoginResponse> FindUserByLoginRequest(string login, string password)
        {
            try
            {
                var found = await DbTable
                    .FirstOrDefaultAsync(user => user.Login == login && user.Password == password);
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

        public async Task<string> GetFioById(long id)
        {
            try
            {
                var user = await DbTable.FirstOrDefaultAsync(x => x.Id.Equals(id));
                return user.Fio;
            }
            catch (Exception e)
            {
                throw new Exception($"Не удалось найти пользователя по идентификатору {e}");
            }
        }

        public async Task<List<GetAllEmployeesResponse>> GetAllEmployees()
        {
            return DbTable.Select(e => new GetAllEmployeesResponse {Id = e.Id, Fio = e.Fio})
                .ToList();
        }
    }
}