using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataBaseStorage.Enums;

namespace DataBaseStorage.DbModels
{
    [Table("orders")]
    public class Order : IDbModel
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }
        
        [Column("employee")]
        public long EmployeeId { get; set; }
        
        [Column("totalPrice")]
        public decimal TotalPrice { get; set; }

        [Column("timeOfPurchase")]
        public DateTime TimeOfPurchase { get; set; }
        
        [Column("status")]
        public OrderStatus Status { get; set; }
        
        [Column("cancellationСomment")]
        public string CancellationComment { get; set; }
    }
}