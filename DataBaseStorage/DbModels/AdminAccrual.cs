using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBaseStorage.DbModels
{
    [Table("adminsAccrual")]
    public class AdminAccrual
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }
        
        [Column("coins")]
        public long Coins { get; set; }
        
        [Column("description")]
        public string Description { get; set; }
    }
}