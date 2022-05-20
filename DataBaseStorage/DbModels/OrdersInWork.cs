using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataBaseStorage.Enums;

namespace DataBaseStorage.DbModels
{
    [Table("ordersInWork")]
    public class OrdersInWork : IDbModel
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }
        
        [Column("employeeId")]
        public long EmployeeId { get; set; }
        
        [Column("product")]
        public long Product { get; set; }
        
        [Column("productCount")]
        public long ProductCount { get; set; }
        
        [Column("timeOfPurchase")]
        public DateTime TimeOfPurchase { get; set; }
        
        [Column("status")]
        public InWorkOrderStatus Status { get; set; }
        
        [Column("size")]
        public Sizes? Size { get; set; }
    }
}