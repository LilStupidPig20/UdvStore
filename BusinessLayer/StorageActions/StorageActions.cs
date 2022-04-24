using DataBaseStorage.Context;
using DataBaseStorage.DbStorage;
using DataBaseStorage.StoragesInterfaces;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayer.StorageActions
{
    public class StorageActions : IStorageActions
    {
        private readonly IDbContextFactory<PostgresContext> context;

        public StorageActions(IDbContextFactory<PostgresContext> context)
        {
            this.context = context;
        }

        public IEmployeeActions CreateEmployeeStorage()
        {
            return new EmployeeActions(context);
        }

        public IEmployeeCoinsActions CreateEmployeeCoinsStorage()
        {
            return new EmployeeCoinsActions(context);
        }

        public IProductsActions CreateProductsStorage()
        {
            return new ProductsActions(context);
        }

        public IAdminActions CreateAdminStorage()
        {
            return new AdminActions(context);
        }
    }
}