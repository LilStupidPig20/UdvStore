using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataBaseStorage.Enums;

namespace DataBaseStorage.DbModels
{
    [Table("allOrders")]
    public class Order : IDbModel
    {
        [Key] 
        [Column("id")] 
        public long Id { get; set; }
        
        [Column("userId")] 
        public long EmployeeId { get; set; }
        
        [Column("purchasedProduct")] 
        public long PurchasedProduct { get; set; }
        
        [Column("timeOfPurchase")] 
        public DateTime TimeOfPurchase { get; set; }
        
        [Column("orderStatus")]
        public OrderStatus OrderStatus { get; set; }
    }
}