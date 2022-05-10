namespace DataBaseStorage.ConfigurationDb
{
    public class DBConfig
    {
        public string ConnectionString { get; }
        
        public DBConfig()
        {
            ConnectionString = "Host=localhost;Port=5432;Database=udvStoreDb;Username=postgres;Password=postgres";
        }
    }
}