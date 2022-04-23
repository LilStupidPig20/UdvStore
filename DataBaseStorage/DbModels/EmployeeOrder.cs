using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBaseStorage.DbModels
{
    [Table("employeeOrders")]
    public class EmployeeOrder : IDbModel
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }
        
        [Column("employeeId")]
        public long EmployeeId { get; set; }
        
        [Column("currentOrderId")]
        public long CurrentOrderId { get; set; }
        
        [Column("history")]
        public string History { get; set; }
    }
}