using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataBaseStorage.ConfigurationDb;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;
using DataBaseStorage.Enums;
using Microsoft.EntityFrameworkCore;

namespace DataBaseStorage.DbStorage
{
    public class ProductsOrdersStorage : BaseStorage<ProductsOrder>
    {
        public ProductsOrdersStorage(DBConfig dbConfig) : base(dbConfig)
        {
        }
        
        public async Task<bool> AddNew(long orderId, List<(long id, long count, Sizes? size)> productsToOrder)
        {
            try
            {
                foreach (var e in productsToOrder)
                {
                    var productsOrderModel = new ProductsOrder
                    {
                        Id = await GetLastIdAsync() + 1,
                        Order = orderId,
                        Product = e.id,
                        ProductCount = e.count,
                        Size = e.size
                    };

                    await AddAsync(productsOrderModel);
                }
                
                return true;
            }
            catch (Exception e)
            {
                throw new Exception($"Не получилось создать заказ {e}");
            }
        }

        public async Task<List<ProductsOrder>> GetProductsInOrderByOrderId(long orderId)
        {
            try
            {
                var result = await DbTable
                    .Where(x => x.Order.Equals(orderId))
                    .ToListAsync();
                if (result == null)
                    throw new Exception("Данного orderId не существует в таблице productsOrders");
                return result;
            }
            catch (Exception e)
            {
                throw new Exception($"{e}, Не удалось получить закрытые заказы");
            }
        }
    }
}