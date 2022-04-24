using DataBaseStorage.Context;
using DataBaseStorage.StoragesInterfaces;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayer.StorageActions
{
    public interface IStorageActions
    {
        public IEmployeeActions CreateEmployeeStorage();
        public IEmployeeCoinsActions CreateEmployeeCoinsStorage();
        public IProductsActions CreateProductsStorage();
    }
}