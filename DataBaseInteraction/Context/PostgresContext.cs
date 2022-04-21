using System.Collections.Generic;
using DataBaseInteraction.DbModels;
using Microsoft.EntityFrameworkCore;

namespace DataBaseInteraction.Context
{
    public partial class PostgresContext : DbContext
    {
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<EmployeeCoins> EmployeeCoins { get; set; }

        public PostgresContext(DbContextOptions<PostgresContext> options)
            : base(options)
        {
        }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=udvStoreDb;Username=postgres;Password=postgres");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            OnModelCreatingPartial(modelBuilder);
        }
 
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}