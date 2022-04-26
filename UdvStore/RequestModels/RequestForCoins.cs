using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace UdvStore.RequestModels
{
    public class RequestForCoins
    {
        public string Event { get; set; }
        public string Description { get; set; }
        public long EmployeeId { get; set; }
        public DateTime Time { get; set; }
    }
}