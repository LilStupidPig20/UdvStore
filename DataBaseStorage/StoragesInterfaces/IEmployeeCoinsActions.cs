namespace DataBaseStorage.StoragesInterfaces
{
    public interface IEmployeeCoinsActions
    {
        public decimal GetCurrentCoinsOfUser(long employeeId);
        public void AddCoins(long id, decimal coinsNumber);
        public void ReduceCoins(long id, decimal coinsNumber);
    }
}