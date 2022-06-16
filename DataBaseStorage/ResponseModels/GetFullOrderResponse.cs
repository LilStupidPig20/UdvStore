using System;
using System.Collections.Generic;
using DataBaseStorage.Enums;

namespace DataBaseStorage.ResponseModels
{
    public class GetFullOrderResponse
    {
        public long Id { get; set; }
        public long EmployeeId { get; set; }
        public string EmployeeFio { get; set; }
        public List<ProductsInOrder> ProductsInOrders { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime TimeOfPurchase { get; set; }
        public OrderStatus Status { get; set; }
        public string CancellationComment { get; set; }
        
        public class ProductsInOrder
        {
            public long ProductId { get; set; }
            public string ProductName { get; set; }
            public decimal ProductPrice { get; set; }
            public long CountOrdered { get; set; }
            public Sizes? Size { get; set; }
            public string ImageLink { get; set; }
        }
    }
}