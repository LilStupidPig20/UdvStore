using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataBaseStorage.Enums;

namespace DataBaseStorage.DbModels
{
    [Table("productsOrders")]
    public class ProductsOrder : IDbModel
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }
        
        [Column("order")]
        public long Order { get; set; }
        
        [Column("product")]
        public long Product { get; set; }
        
        [Column("productCount")]
        public long ProductCount { get; set; }
        
        [Column("size")]
        public Sizes? Size { get; set; }
    }
}