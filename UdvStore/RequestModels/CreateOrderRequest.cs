using System.Collections.Generic;
using DataBaseStorage.Enums;

namespace UdvStore.RequestModels
{
    public class CreateOrderRequest
    {
        public long EmployeeId { get; set; }
        public List<OrderRequestProductPart> Products { get; set; }
        
        public class OrderRequestProductPart
        {
            public long Id { get; set; }
            public long Count { get; set; }
            public Sizes? Size { get; set; }
        }
    }
}