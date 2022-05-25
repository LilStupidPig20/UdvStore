using NpgsqlTypes;

namespace DataBaseStorage.Enums
{
    public enum Sizes
    {
        [PgName("Xs")]
        Xs,
        [PgName("S")]
        S,
        [PgName("M")]
        M,
        [PgName("L")]
        L,
        [PgName("Xl")]
        Xl,
    }
}