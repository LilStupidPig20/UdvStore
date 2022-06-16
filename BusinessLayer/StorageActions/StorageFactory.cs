using DataBaseStorage.ConfigurationDb;
using DataBaseStorage.Context;
using DataBaseStorage.DbStorage;
using DataBaseStorage.StoragesInterfaces;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayer.StorageActions
{
    public class StorageFactory : IStorageFactory
    {
        private readonly DBConfig _dbConfig;

        public StorageFactory(DBConfig dbConfig)
        {
            _dbConfig = dbConfig;
        }
        
        public EmployeesStorage CreateEmployeeStorage()
        {
            return new EmployeesStorage(_dbConfig);
        }

        public EmployeeCoinsStorage CreateEmployeeCoinsStorage()
        {
            return new EmployeeCoinsStorage(_dbConfig);
        }

        public ProductsStorage CreateProductsStorage()
        {
            return new ProductsStorage(_dbConfig);
        }

        public AdminStorage CreateAdminStorage()
        {
            return new AdminStorage(_dbConfig);
        }

        public OpenEmployeesRequestsStorage CreateOpenEmployeesRequestsStorage()
        {
            return new OpenEmployeesRequestsStorage(_dbConfig);
        }
        
        public ClosedEmployeesRequestsStorage CreateClosedEmployeesRequestsStorage()
        {
            return new ClosedEmployeesRequestsStorage(_dbConfig);
        }

        public AdminAccrualStorage CreateAdminAccrualStorage()
        {
            return new AdminAccrualStorage(_dbConfig);
        }

        public AdminAccrualEmployeeStorage CreateAdminAccrualEmployeeStorage()
        {
            return new AdminAccrualEmployeeStorage(_dbConfig);
        }

        public ClothesProductStorage CreateClothesProductStorage()
        {
            return new ClothesProductStorage(_dbConfig);
        }

        public OrdersStorage CreateOrdersStorage()
        {
            return new OrdersStorage(_dbConfig);
        }

        public ProductsOrdersStorage CreateProductsOrdersStorage()
        {
            return new ProductsOrdersStorage(_dbConfig);
        }

        public TransferCoinsHistoryStorage CreateTransferCoinsHistoryStorage()
        {
            return new TransferCoinsHistoryStorage(_dbConfig);
        }
    }
}