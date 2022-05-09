using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataBaseStorage.Enums;

namespace DataBaseStorage.DbModels
{
    [Table("closedEmployeesRequests")]
    public class ClosedEmployeesRequest : IDbModel
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }
        
        [Column("event")]
        public string Event { get; set; }
        
        [Column("description")]
        public string Description { get; set; }
        
        [Column("employeeId")]
        public long EmployeeId { get; set; }

        [Column("dateOfEvent")]
        public DateTime EventDate { get; set; }
        
        [Column("status")]
        public RequestStatus Status { get; set; }
        
        [Column("rejectComment")]
        public string RejectComment { get; set; }

        [Column("timeSent")]
        public DateTime TimeSent { get; set; }
        
        [Column("coinsAccrued")]
        public decimal CoinsAccrued { get; set; }
    }
}