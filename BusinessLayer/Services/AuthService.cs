using System;
using System.Threading.Tasks;
using BusinessLayer.StorageActions;
using DataBaseStorage.ResponseModels;

namespace BusinessLayer.Services
{
    public class AuthService
    {
        private readonly IStorageActions storage;

        public AuthService(IStorageActions storage)
        {
            this.storage = storage;
        }

        public async Task<LoginResponse> CheckUserByLoginRequest(string login, string password)
        {
            var employeeStorage = storage.CreateEmployeeStorage();
            if (await employeeStorage.IsUserWithEnteredDataExist(login, password))
            {
                return await employeeStorage.FindUserByLoginRequest(login, password);
            }

            var adminStorage = storage.CreateAdminStorage();
            if (await adminStorage.IsAdminWithEnteredDataExist(login, password))
                return await adminStorage.FindAdminByLoginRequest(login, password);
            return null;
        }
    }
}