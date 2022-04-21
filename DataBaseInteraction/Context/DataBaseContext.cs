using DataBaseInteraction.DbModels;
using Microsoft.EntityFrameworkCore;

namespace DataBaseInteraction.Context
{
    /// <summary>
    /// Абстрактный класс, описывающий нобходимые поля для контекста
    /// </summary>
    public abstract class DataBaseContext
    {
        // public virtual DbSet<Employee> Employees { get; set; }
        //
        // public DataBaseContext()
        // {
        // }
        //
        // public DataBaseContext(DbContextOptions<PostgresContext> options)
        //     : base(options)
        // {
        // }
    }
}