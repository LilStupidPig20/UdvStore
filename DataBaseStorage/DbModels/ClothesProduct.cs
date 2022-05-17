using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBaseStorage.DbModels
{
    [Table("productClothes")]
    public class ClothesProduct : IDbModel
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }
        
        [Column("xsQuantity")]
        public long XsQuantity { get; set; }
        
        [Column("sQuantity")]
        public long SQuantity { get; set; }
        
        [Column("mQuantity")]
        public long MQuantity { get; set; }
        
        [Column("lQuantity")]
        public long LQuantity { get; set; }
        
        [Column("xlQuantity")]
        public long XlQuantity { get; set; }
    }
}