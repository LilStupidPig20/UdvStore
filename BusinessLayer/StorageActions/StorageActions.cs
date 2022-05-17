using DataBaseStorage.ConfigurationDb;
using DataBaseStorage.Context;
using DataBaseStorage.DbStorage;
using DataBaseStorage.StoragesInterfaces;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayer.StorageActions
{
    public class StorageActions : IStorageActions
    {
        private readonly DBConfig dbConfig;

        public StorageActions(DBConfig dbConfig)
        {
            this.dbConfig = dbConfig;
        }
        
        public EmployeesStorage CreateEmployeeStorage()
        {
            return new EmployeesStorage(dbConfig);
        }

        public EmployeeCoinsStorage CreateEmployeeCoinsStorage()
        {
            return new EmployeeCoinsStorage(dbConfig);
        }

        public ProductsStorage CreateProductsStorage()
        {
            return new ProductsStorage(dbConfig);
        }

        public AdminStorage CreateAdminStorage()
        {
            return new AdminStorage(dbConfig);
        }

        public OpenEmployeesRequestsStorage CreateOpenEmployeesRequestsStorage()
        {
            return new OpenEmployeesRequestsStorage(dbConfig);
        }
        
        public ClosedEmployeesRequestsStorage CreateClosedEmployeesRequestsStorage()
        {
            return new ClosedEmployeesRequestsStorage(dbConfig);
        }

        public AdminAccrualStorage CreateAdminAccrualStorage()
        {
            return new AdminAccrualStorage(dbConfig);
        }

        public AdminAccrualEmployeeStorage CreateAdminAccrualEmployeeStorage()
        {
            return new AdminAccrualEmployeeStorage(dbConfig);
        }

        public ClosedOrdersStorage CreateClosedOrdersStorage()
        {
            return new ClosedOrdersStorage(dbConfig);
        }

        public ClothesProductStorage CreateClothesProductStorage()
        {
            return new ClothesProductStorage(dbConfig);
        }

        public OrdersInWorkStorage CreateOrdersInWorkStorage()
        {
            return new OrdersInWorkStorage(dbConfig);
        }
    }
}