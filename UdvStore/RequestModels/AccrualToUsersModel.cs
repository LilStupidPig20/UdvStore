using System;
using System.Collections.Generic;

namespace UdvStore.RequestModels
{
    public class AccrualToUsersModel
    {
        public string Description { get; set; }
        public decimal Coins { get; set; } 
        public DateTime DateOfEvent { get; set; }
        public List<long> EmployeesIds { get; set; }
    }
}