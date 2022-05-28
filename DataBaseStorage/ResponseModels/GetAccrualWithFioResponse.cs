using System;
using System.Collections.Generic;

namespace DataBaseStorage.ResponseModels
{
    public class GetAccrualWithFioResponse
    {
        public string NameOfEvent { get; set; }
        public string Description { get; set; }
        public decimal Coins { get; set; }
        public DateTime DateOfEvent { get; set; }
        public List<string> EmployeeNames { get; set; }
        public DateTime TimeSent { get; set; }
    }
}