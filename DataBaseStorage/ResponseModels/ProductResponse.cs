namespace DataBaseStorage.ResponseModels
{
    public class ProductResponse
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public long CurrentQuantity { get; set; }
        public string Image { get; set; }
        public bool IsClothes { get; set; }
    }
}