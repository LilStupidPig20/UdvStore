using DataBaseStorage.Context;
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
    }
}