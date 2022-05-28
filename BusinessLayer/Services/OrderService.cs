using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.Helpers;
using BusinessLayer.StorageActions;
using DataBaseStorage.DbModels;
using DataBaseStorage.DbStorage;
using DataBaseStorage.Enums;
using DataBaseStorage.ResponseModels;

namespace BusinessLayer.Services
{
    public class OrderService
    {
        private readonly IStorageFactory _storage;
        private readonly CoinsHelper _coinsHelper;
        private readonly ProductQuantityHelper _productQuantityHelper;

        public OrderService(IStorageFactory storage, CoinsHelper coinsHelper, ProductQuantityHelper productQuantityHelper)
        {
            _storage = storage;
            _coinsHelper = coinsHelper;
            _productQuantityHelper = productQuantityHelper;
        }
        
        //TODO Разнести по методам, SRP, всё такое
        //TODO Да и ваще, это не единственное место где надо бы это сделать, но чота впадлу
        public async Task<long> CreateOrder(long employeeId, List<(long id, long count, Sizes? size)> order)
        {
            try
            {
                var requiredProducts = order.Select(e => e.id).ToList();
                var productsStorage = _storage.CreateProductsStorage();
                var products = await productsStorage.GetSeveralProducts(requiredProducts);

                var totalPrice = products.Sum(e => e.Price * order.FirstOrDefault(x => x.id.Equals(e.Id)).count);
                var currentBalance = await _coinsHelper.GetBalance(employeeId);

                if (currentBalance < totalPrice)
                    throw new Exception("Недостаточно коинов на балансе для совершения покупки");
                foreach (var (id, count, size) in order)
                {
                    await _productQuantityHelper.ReduceProductQuantity(id, count, size);
                }
                await _coinsHelper.ReduceEmployeeCoins(employeeId, totalPrice);
                
            
                var ordersStorage = _storage.CreateOrdersStorage();
                var orderId = await ordersStorage.AddNew(employeeId, totalPrice);

                var productsOrderStorage = _storage.CreateProductsOrdersStorage();
                await productsOrderStorage.AddNew(orderId, order);
                return orderId;
            }
            catch (Exception e)
            {
                throw new Exception($"{e}, Хуево...");
            }
        }

        public async Task<List<GetFullOrderResponse>> GetClosedOrders()
        {
            var ordersStorage = _storage.CreateOrdersStorage();
            var orders = await ordersStorage.GetClosedOrders();
            return await GetOrdersInfo(orders);
        }

        public async Task<List<GetFullOrderResponse>> GetOpenOrders()
        {
            var ordersStorage = _storage.CreateOrdersStorage();
            var orders = await ordersStorage.GetInWorkOrders();
            return await GetOrdersInfo(orders);
        }
        
        public async Task<List<GetFullOrderResponse>> GetEmployeeHistory(long idEmployee)
        {
            var ordersStorage = _storage.CreateOrdersStorage();
            var orders = await ordersStorage.GetEmployeeOrders(idEmployee);
            return await GetOrdersInfo(orders);
        }

        public async Task ChangeStatusToAccepted(long idOrder)
        {
            var orderStorage = _storage.CreateOrdersStorage();
            var order = await ChangeOrderStatus(idOrder, orderStorage, OrderStatus.Accepted);
            await orderStorage.UpdateAsync(order);
        }
        
        public async Task ChangeStatusToReady(long idOrder)
        {
            var orderStorage = _storage.CreateOrdersStorage();
            var order = await ChangeOrderStatus(idOrder, orderStorage, OrderStatus.ReadyToReceive);
            await orderStorage.UpdateAsync(order);
        }
        
        public async Task ChangeStatusToReceived(long idOrder)
        {
            var orderStorage = _storage.CreateOrdersStorage();
            var order = await ChangeOrderStatus(idOrder, orderStorage, OrderStatus.Received);
            await orderStorage.UpdateAsync(order);
        }
        
        public async Task CancelOrder(long idOrder, string comment)
        {
            var orderStorage = _storage.CreateOrdersStorage();
            var order = await ChangeOrderStatus(idOrder, orderStorage, OrderStatus.Cancelled);
            order.CancellationComment = comment;
            
            var productsOrdersStorage = _storage.CreateProductsOrdersStorage();
            var productsInOrder = await productsOrdersStorage.GetProductsInOrderByOrderId(idOrder);
            
            foreach (var product in productsInOrder)
            {
                await _productQuantityHelper.IncreaseProductQuantity(product.Product, product.ProductCount,
                    product.Size);
            }
            
            await _coinsHelper.AddEmployeeCoins(order.EmployeeId, order.TotalPrice);
            await orderStorage.UpdateAsync(order);
        }

        private async Task<List<GetFullOrderResponse>> GetOrdersInfo(List<Order> orders)
        {
            var employeeStorage = _storage.CreateEmployeeStorage();
            var productsOrdersStorage = _storage.CreateProductsOrdersStorage();
            var productsStorage = _storage.CreateProductsStorage();
            var commonOrderInfoList = new List<CommonGetOrderInfo>();
            
            foreach (var e in orders)
            {
                var commonModel = new CommonGetOrderInfo();
                commonModel.Order = e;
                commonModel.EmployeeFio = await employeeStorage.GetFioById(e.EmployeeId);
                commonModel.ProductsOrder = await productsOrdersStorage.GetProductsInOrderByOrderId(e.Id);
                commonModel.Products = new List<Product>();
                
                foreach (var product in commonModel.ProductsOrder)
                {
                    commonModel.Products.Add(await productsStorage.SearchByIdAsync(product.Product));
                }
                
                commonOrderInfoList.Add(commonModel);
            }

            var result = new List<GetFullOrderResponse>();
            foreach (var e in commonOrderInfoList)
            {
                var resultElement = new GetFullOrderResponse();
                resultElement.Id = e.Order.Id;
                resultElement.EmployeeFio = e.EmployeeFio;
                resultElement.Status = e.Order.Status;
                resultElement.EmployeeId = e.Order.EmployeeId;
                resultElement.TotalPrice = e.Order.TotalPrice;
                resultElement.TimeOfPurchase = e.Order.TimeOfPurchase;
                resultElement.ProductsInOrders = new List<GetFullOrderResponse.ProductsInOrder>();
                foreach (var productOrder in e.ProductsOrder)
                {
                    var productOrderPart = new GetFullOrderResponse.ProductsInOrder();
                    productOrderPart.ProductId = productOrder.Product;
                    productOrderPart.Size = productOrder.Size;
                    productOrderPart.CountOrdered = productOrder.ProductCount;
                    productOrderPart.ProductName = e.Products.Find(x => x.Id.Equals(productOrder.Product))?.Name;
                    productOrderPart.ProductPrice = e.Products.Find(x => x.Id.Equals(productOrder.Product))!.Price;
                    resultElement.ProductsInOrders.Add(productOrderPart);
                }
                
                result.Add(resultElement);
            }

            return result;
        }

        private async Task<Order> ChangeOrderStatus(long idOrder, OrdersStorage storage, OrderStatus status)
        {
            try
            {
                var order = await storage.SearchByIdAsync(idOrder);
                
                if (order.Status.Equals(OrderStatus.Received)
                    || order.Status.Equals(OrderStatus.Cancelled))
                    throw new Exception("Невозможно на данном этапе сменить статус заказа");
                order.Status = status;
                return order;
            }
            catch (Exception e)
            {
                throw new Exception($"Не удалось изменить статус заказа, {e}");
            }
        }

        private class CommonGetOrderInfo
        {
            public Order Order { get; set; }
            public string EmployeeFio { get; set; }
            public List<ProductsOrder> ProductsOrder { get; set; }
            public List<Product> Products { get; set; }
        }
    }
}