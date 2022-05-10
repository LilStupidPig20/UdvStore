using NpgsqlTypes;

namespace DataBaseStorage.Enums
{
    public enum RequestStatus
    {
        [PgName("Open")]
        Open,
        [PgName("Accepted")]
        Accepted,
        [PgName("Rejected")]
        Rejected
    }
}