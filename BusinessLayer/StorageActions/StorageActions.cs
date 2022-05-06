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

        //TODO перенести на интерфейсы и в стартапе собрать зависимости с интерфейсом
        //TODO в контроллеры пускать только сервисы, в которых уже определяются нужные storage
        public EmployeeActions CreateEmployeeStorage()
        {
            return new EmployeeActions(context);
        }

        public EmployeeCoinsActions CreateEmployeeCoinsStorage()
        {
            return new EmployeeCoinsActions(context);
        }

        public ProductsActions CreateProductsStorage()
        {
            return new ProductsActions(context);
        }

        public AdminActions CreateAdminStorage()
        {
            return new AdminActions(context);
        }

        public AllRequestActions CreateAllRequestStorage()
        {
            return new AllRequestActions(context);
        }

        public EmployeeRequestsActions CreateEmployeeRequestsStorage()
        {
            return new EmployeeRequestsActions(context);
        }
    }
}