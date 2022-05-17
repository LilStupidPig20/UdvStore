using NpgsqlTypes;

namespace DataBaseStorage.Enums
{
    public enum InWorkOrderStatus
    {
        [PgName("Open")]
        Open,
        [PgName("Accepted")]
        Accepted,
        [PgName("ReadyToReceive")]
        ReadyToReceive
    }
}