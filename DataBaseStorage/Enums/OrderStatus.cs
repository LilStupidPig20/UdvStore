using NpgsqlTypes;

namespace DataBaseStorage.Enums
{
    public enum OrderStatus
    {
        [PgName("Open")]
        Open,
        [PgName("Accepted")]
        Accepted,
        [PgName("ReadyToReceive")]
        ReadyToReceive,
        [PgName("Received")]
        Received,
        [PgName("Cancelled")]
        Cancelled
    }
}