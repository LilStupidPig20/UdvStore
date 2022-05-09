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

        //TODO перенести на интерфейсы и в стартапе собрать зависимости с интерфейсом
        //TODO в контроллеры пускать только сервисы, в которых уже определяются нужные storage
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
    }
}