using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBaseStorage.DbModels
{
    [Table("transferCoinsHistory")]
    public class TransferCoinsHistory : IDbModel
    {
        [Key] 
        [Column("id")] 
        public long Id { get; set; }
        
        [Column("sender")] 
        public long Sender { get; set; }
        
        [Column("receiver")] 
        public long Receiver { get; set; }
        
        [Column("coinsCount")] 
        public decimal CoinsCount { get; set; }
        
        [Column("comment")] 
        public string Comment { get; set; }
        
        [Column("timeOfTransfer")] 
        public DateTime TimeOfTransfer { get; set; }
    }
}