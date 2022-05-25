using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.Helpers;
using BusinessLayer.StorageActions;
using DataBaseStorage.DbModels;
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
        
        //TODO Разнести по методам, SRP, вся хуйня
        //TODO Да и ваще, это не единственное место где надо бы это сделать, но чота впадлу
        public async Task<bool> CreateOrder(long employeeId, List<(long id, long count, Sizes? size)> order)
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
                return await productsOrderStorage.AddNew(orderId, order);
            }
            catch (Exception e)
            {
                throw new Exception($"{e}, Хуево...");
            }
        }

        public async Task<List<GetFullOrderResponse>> GetClosedOrders()
        {
            var ordersStorage = _storage.CreateOrdersStorage();
            var employeeStorage = _storage.CreateEmployeeStorage();
            var productsOrdersStorage = _storage.CreateProductsOrdersStorage();
            var productsStorage = _storage.CreateProductsStorage();
            
            var orders = await ordersStorage.GetClosedOrders();
            var commonOrderInfoList = new List<CommonGetOrderInfo>();
            foreach (var e in orders)
            {
                var commonModel = new CommonGetOrderInfo();
                commonModel.Order = e;

                commonModel.EmployeeFio = await employeeStorage.GetFioById(e.EmployeeId);

                commonModel.ProductsOrder = await productsOrdersStorage.GetProductsOnOrderByOrderId(e.Id);

                commonModel.Products = new List<Product>();
                foreach (var product in commonModel.ProductsOrder)
                {
                    commonModel.Products.Add(await productsStorage.SearchByIdAsync(product.Id));
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
                    productOrderPart.ProductId = productOrder.Id;
                    productOrderPart.Size = productOrder.Size;
                    productOrderPart.CountOrdered = productOrder.ProductCount;
                    productOrderPart.ProductName = e.Products.Find(x => x.Id.Equals(productOrder.Id))?.Name;
                    productOrderPart.ProductPrice = e.Products.Find(x => x.Id.Equals(productOrder.Id))!.Price;
                    resultElement.ProductsInOrders.Add(productOrderPart);
                }
                
                result.Add(resultElement);
            }

            return result;
        }

        public async Task<List<GetFullOrderResponse>> GetOpenOrders()
        {
            var ordersStorage = _storage.CreateOrdersStorage();
            var employeeStorage = _storage.CreateEmployeeStorage();
            var productsOrdersStorage = _storage.CreateProductsOrdersStorage();
            var productsStorage = _storage.CreateProductsStorage();
            
            var orders = await ordersStorage.GetInWorkOrders();
            var commonOrderInfoList = new List<CommonGetOrderInfo>();
            foreach (var e in orders)
            {
                var commonModel = new CommonGetOrderInfo();
                commonModel.Order = e;

                commonModel.EmployeeFio = await employeeStorage.GetFioById(e.EmployeeId);

                commonModel.ProductsOrder = await productsOrdersStorage.GetProductsOnOrderByOrderId(e.Id);

                commonModel.Products = new List<Product>();
                foreach (var product in commonModel.ProductsOrder)
                {
                    commonModel.Products.Add(await productsStorage.SearchByIdAsync(product.Id));
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
                    productOrderPart.ProductId = productOrder.Id;
                    productOrderPart.Size = productOrder.Size;
                    productOrderPart.CountOrdered = productOrder.ProductCount;
                    productOrderPart.ProductName = e.Products.Find(x => x.Id.Equals(productOrder.Id))?.Name;
                    productOrderPart.ProductPrice = e.Products.Find(x => x.Id.Equals(productOrder.Id))!.Price;
                    resultElement.ProductsInOrders.Add(productOrderPart);
                }
                
                result.Add(resultElement);
            }

            return result;
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