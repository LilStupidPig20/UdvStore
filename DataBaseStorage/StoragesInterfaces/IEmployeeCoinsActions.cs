namespace DataBaseStorage.StoragesInterfaces
{
    public interface IEmployeeCoinsActions
    {
        public decimal GetCurrentCoinsOfUser(long employeeId);
        public void AddCoins();
        public void ReduceCoins();
    }
}