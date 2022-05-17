using DataBaseStorage.Context;
using DataBaseStorage.DbModels;
using DataBaseStorage.DbStorage;
using DataBaseStorage.StoragesInterfaces;
using Microsoft.EntityFrameworkCore;

namespace BusinessLayer.StorageActions
{
    public interface IStorageActions
    {
        public EmployeesStorage CreateEmployeeStorage();
        public EmployeeCoinsStorage CreateEmployeeCoinsStorage();
        public ProductsStorage CreateProductsStorage();
        public AdminStorage CreateAdminStorage();
        public OpenEmployeesRequestsStorage CreateOpenEmployeesRequestsStorage();
        public ClosedEmployeesRequestsStorage CreateClosedEmployeesRequestsStorage();
        public AdminAccrualStorage CreateAdminAccrualStorage();
        public AdminAccrualEmployeeStorage CreateAdminAccrualEmployeeStorage();
        public ClosedOrdersStorage CreateClosedOrdersStorage();
        public ClothesProductStorage CreateClothesProductStorage();
        public OrdersInWorkStorage CreateOrdersInWorkStorage();
    }
}