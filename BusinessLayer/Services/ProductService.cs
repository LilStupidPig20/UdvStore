using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLayer.StorageActions;
using DataBaseStorage.ResponseModels;

namespace BusinessLayer.Services
{
    public class ProductService
    {
        private readonly IStorageActions storage;

        public ProductService(IStorageActions storage)
        {
            this.storage = storage;
        }

        public async Task<List<ProductResponse>> GetAllProducts()
        {
            var productsStorage = storage.CreateProductsStorage();
            return await productsStorage.GetProductsWithoutDescription();
        }

        public async Task<GetClothesInfoResponse> GetClothesItemInfo(long idProduct)
        {
            var productStorage = storage.CreateProductsStorage();
            var commonInfoPart = await productStorage.SearchByIdAsync(idProduct);

            var clothesStorage = storage.CreateClothesProductStorage();
            var clothesInfoPart = await clothesStorage.GetFullInfo(idProduct);

            return new GetClothesInfoResponse
            {
                CommonInfo = commonInfoPart,
                Sizes = clothesInfoPart
            };
        }
    }
}