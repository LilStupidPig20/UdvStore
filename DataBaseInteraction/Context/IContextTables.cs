using DataBaseInteraction.DbModels;
using Microsoft.EntityFrameworkCore;

namespace DataBaseInteraction.Context
{
    /// <summary>
    /// to delete
    /// </summary>
    public interface IContextTables
    {
        public DbSet<Employee> Employees { get; set; }
    }
}