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
    public class OrdersStorage : BaseStorage<Order>
    {
        public OrdersStorage(DBConfig dbConfig) : base(dbConfig)
        {
        }

        public async Task<long> AddNew(long employeeId, decimal totalPrice)
        {
            try
            {
                var orderModel = new Order
                {
                    Id = await GetLastIdAsync() + 1,
                    EmployeeId = employeeId,
                    TotalPrice = totalPrice,
                    TimeOfPurchase = DateTime.Now,
                    Status = OrderStatus.Open,
                };

                await AddAsync(orderModel);
                return orderModel.Id;
            }
            catch (Exception e)
            {
                throw new Exception($"Не получилось создать заказ {e}");
            }
        }

        public async Task<List<Order>> GetClosedOrders()
        {
            try
            {
                return await DbTable
                    .Where(x => x.Status.Equals(OrderStatus.Cancelled) 
                                || x.Status.Equals(OrderStatus.Received))
                    .ToListAsync();
            }
            catch (Exception e)
            {
                throw new Exception($"{e}, Не удалось получить закрытые заказы");
            }
        }
        
        public async Task<List<Order>> GetInWorkOrders()
        {
            try
            {
                return await DbTable
                    .Where(x => x.Status.Equals(OrderStatus.Accepted) 
                                || x.Status.Equals(OrderStatus.ReadyToReceive)
                                || x.Status.Equals(OrderStatus.Open))
                    .ToListAsync();
            }
            catch (Exception e)
            {
                throw new Exception($"{e}, Не удалось получить заказы в работе");
            }
        }
        
        public async Task<List<Order>> GetEmployeeOrders(long idEmployee)
        {
            try
            {
                return await DbTable
                    .Where(x => x.EmployeeId.Equals(idEmployee))
                    .ToListAsync();
            }
            catch (Exception e)
            {
                throw new Exception($"{e}, Не удалось получить заказы сотрудника");
            }
        }
    }
}