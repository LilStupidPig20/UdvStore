using System;
using System.Threading.Tasks;
using DataBaseStorage.ConfigurationDb;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;
using DataBaseStorage.Enums;

namespace DataBaseStorage.DbStorage
{
    public class OrdersInWorkStorage : BaseStorage<OrdersInWork>
    {
        public OrdersInWorkStorage(DBConfig dbConfig) : base(dbConfig)
        {
        }

        public async Task<bool> AddNew(long employeeId, long product, long count, Sizes? size)
        {
            try
            {
                var orderModel = new OrdersInWork
                {
                    Id = await GetLastIdAsync() + 1,
                    EmployeeId = employeeId,
                    Product = product,
                    ProductCount = count,
                    TimeOfPurchase = DateTime.Now,
                    Status = InWorkOrderStatus.Open,
                    Size = size
                };

                await AddAsync(orderModel);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception($"Не получилось создать заказ {e}");
            }
        }
    }
}