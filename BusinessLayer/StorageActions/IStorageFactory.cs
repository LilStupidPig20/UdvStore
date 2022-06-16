using DataBaseStorage.Context;
using DataBaseStorage.DbModels;
using DataBaseStorage.DbStorage;
using DataBaseStorage.StoragesInterfaces;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayer.StorageActions
{
    public interface IStorageFactory
    {
        public EmployeesStorage CreateEmployeeStorage();
        public EmployeeCoinsStorage CreateEmployeeCoinsStorage();
        public ProductsStorage CreateProductsStorage();
        public AdminStorage CreateAdminStorage();
        public OpenEmployeesRequestsStorage CreateOpenEmployeesRequestsStorage();
        public ClosedEmployeesRequestsStorage CreateClosedEmployeesRequestsStorage();
        public AdminAccrualStorage CreateAdminAccrualStorage();
        public AdminAccrualEmployeeStorage CreateAdminAccrualEmployeeStorage();
        public ClothesProductStorage CreateClothesProductStorage();
        public OrdersStorage CreateOrdersStorage();
        public ProductsOrdersStorage CreateProductsOrdersStorage();
        public TransferCoinsHistoryStorage CreateTransferCoinsHistoryStorage();
    }
}