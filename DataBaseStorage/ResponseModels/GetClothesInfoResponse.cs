using System.Collections.Generic;
using DataBaseStorage.DbModels;

namespace DataBaseStorage.ResponseModels
{
    public class GetClothesInfoResponse
    {
        public Product CommonInfo { get; set; }
        
        public List<ClothesProduct> Sizes { get; set; }
    }
}