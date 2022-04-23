using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBaseStorage.DbModels
{
    [Table("employeeCoins")]
    public class EmployeeCoins : IDbModel
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }
        
        [Column("employeeId")]
        public long EmployeeId { get; set; }
        
        [Column("currentBalance")]
        public decimal CurrentBalance { get; set; }
        
        [Column("history")]
        public string Password { get; set; }
    }
}