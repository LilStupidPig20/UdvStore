using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.StorageActions;
using DataBaseStorage.Enums;

namespace BusinessLayer.Services
{
    public class OrderService
    {
        private readonly IStorageActions storage;
        
        public OrderService(IStorageActions storage)
        {
            this.storage = storage;
        }

        public async Task<bool> CreateOrder(long employeeId, List<(long id, long count, Sizes? size)> order)
        {
            try
            {
                var requiredProducts = order.Select(e => e.id).ToList();
                var productsStorage = storage.CreateProductsStorage();
                var products = await productsStorage.GetSeveralProducts(requiredProducts);

                var totalPrice = products.Sum(e => e.Price * order.FirstOrDefault(x => x.id.Equals(e.Id)).count);
                var employeeCoinsStorage = storage.CreateEmployeeCoinsStorage();
                var currentBalance = await employeeCoinsStorage.GetCurrentCoinsOfUser(employeeId);

                if (currentBalance < totalPrice)
                    throw new Exception("Недостаточно коинов на балансе для совершения покупки");
            
                var ordersInWorkStorage = storage.CreateOrdersInWorkStorage();
                
            }
            catch
            {
                throw;
            }

            return true;
        }
    }
}