﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBaseInteraction.DbModels
{
    public class Products : IDbModel
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("price")]
        public decimal Price { get; set; }
        [Column("currentQuantity")]
        public long CurrentQuantity { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("image")]
        public string Image { get; set; }
    }
}