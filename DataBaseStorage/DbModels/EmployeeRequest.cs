using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBaseStorage.DbModels
{
    [Table("employeeRequests")]
    public class EmployeeRequest : IDbModel
    {
        [Key]
        [Column("id")]
        public new long Id { get; set; }
        
        [Column("employeeId")]
        public long EmployeeId { get; set; }
        
        [Column("rejectComment")]
        public string RejectComment { get; set; }
        
        [Column("requestId")]
        public long RequestId { get; set; }
    }
}