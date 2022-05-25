using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataBaseStorage.Enums;

namespace DataBaseStorage.DbModels
{
    [Table("productsClothes")]
    public class ClothesProduct : IDbModel
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }
        
        [Column("product")]
        public long Product { get; set; }
        
        [Column("size")]
        public Sizes Size { get; set; }
        
        [Column("quantity")]
        public long Quantity { get; set; }
    }
}