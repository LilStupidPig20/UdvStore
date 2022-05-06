using DataBaseStorage.Context;
using DataBaseStorage.DbModels;
using DataBaseStorage.DbStorage;
using DataBaseStorage.StoragesInterfaces;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayer.StorageActions
{
    public interface IStorageActions
    {
        public EmployeeActions CreateEmployeeStorage();
        public EmployeeCoinsActions CreateEmployeeCoinsStorage();
        public ProductsActions CreateProductsStorage();
        public AdminActions CreateAdminStorage();
        public AllRequestActions CreateAllRequestStorage();
        public EmployeeRequestsActions CreateEmployeeRequestsStorage();
    }
}