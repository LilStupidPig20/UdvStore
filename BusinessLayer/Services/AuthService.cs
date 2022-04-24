using System;
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

        public LoginResponse CheckUserByLoginRequest(string login, string password)
        {
            var employeeStorage = storage.CreateEmployeeStorage();
            if (employeeStorage.IsUserWithEnteredDataExist(login, password))
            {
                return employeeStorage.FindUserByLoginRequest(login, password);
            }

            var adminStorage = storage.CreateAdminStorage();
            if (adminStorage.IsAdminWithEnteredDataExist(login, password))
                return adminStorage.FindAdminByLoginRequest(login, password);
            return null;
        }
    }
}