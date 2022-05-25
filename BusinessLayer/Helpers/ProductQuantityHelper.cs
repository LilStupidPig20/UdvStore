using System.Threading.Tasks;
using BusinessLayer.StorageActions;
using DataBaseStorage.DbStorage;
using DataBaseStorage.Enums;

namespace BusinessLayer.Helpers
{
    public class ProductQuantityHelper
    {
        private readonly ProductsStorage _productsStorage;
        private readonly ClothesProductStorage _clothesStorage;
        public ProductQuantityHelper(IStorageFactory factory)
        {
            _productsStorage = factory.CreateProductsStorage();
            _clothesStorage = factory.CreateClothesProductStorage();
        }

        public async Task<long> ReduceProductQuantity(long id, long quantity, Sizes? size)
        {
            if (size != null)
            {
                var notNullSize = (Sizes)size;
                await ReduceClothesQuantity(id, quantity, notNullSize);
            }

            return await ReduceProductQuantity(id, quantity);
        }
        
        public async Task<long> IncreaseProductQuantity(long id, long quantity, Sizes? size)
        {
            if (size != null)
            {
                var notNullSize = (Sizes)size;
                await IncreaseClothesQuantity(id, quantity, notNullSize);
            }

            return await IncreaseProductQuantity(id, quantity);
        }

        private async Task<long> ReduceClothesQuantity(long id, long quantity, Sizes size)
        {
            return await _clothesStorage.ReduceProductQuantity(id, quantity, size);
        }
        
        private async Task<long> ReduceProductQuantity(long id, long quantity)
        {
            return await _productsStorage.ReduceProductQuantity(id, quantity);
        }
        
        private async Task<long> IncreaseClothesQuantity(long id, long quantity, Sizes size)
        {
            return await _clothesStorage.IncreaseProductQuantity(id, quantity, size);
        }
        
        private async Task<long> IncreaseProductQuantity(long id, long quantity)
        {
            return await _productsStorage.IncreaseProductQuantity(id, quantity);
        }
    }
}