using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBaseStorage.DbModels
{
    [Table("adminsAccrual")]
    public class AdminAccrual : IDbModel
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }
        
        [Column("coins")]
        public decimal Coins { get; set; }
        
        [Column("description")]
        public string Description { get; set; }
        
        [Column("dateOfEvent")]
        public DateTime DateOfEvent { get; set; }
        
        [Column("timeSent")]
        public DateTime TimeSent { get; set; }
        
        [Column("nameOfEvent")]
        public string NameOfEvent { get; set; }
    }
}