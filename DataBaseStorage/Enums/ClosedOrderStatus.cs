using NpgsqlTypes;

namespace DataBaseStorage.Enums
{
    public enum ClosedOrderStatus
    {
        [PgName("Received")]
        Received,
        [PgName("Cancelled")]
        Cancelled
    }
}