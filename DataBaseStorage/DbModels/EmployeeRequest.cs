using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBaseStorage.DbModels
{
    [Table("employeesRequests")]
    public class EmployeeRequest : IDbModel
    {
        [Key] 
        [Column("id")] 
        public new long Id { get; set; }
        
        [Column("event")] 
        public string Event { get; set; }
        
        [Column("description")] 
        public string Description { get; set; }
        
        [Column("employeeId")] 
        public long EmployeeId { get; set; }

        [Column("isOpen")] 
        public bool IsOpen { get; set; }
        
        [Column("time")] 
        public DateTime Time { get; set; }
    }
}