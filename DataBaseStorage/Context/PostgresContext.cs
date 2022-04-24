using DataBaseStorage.DbModels;
using DataBaseStorage.Enums;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace DataBaseStorage.Context
{
    public partial class PostgresContext : DbContext
    {
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<EmployeeCoins> EmployeeCoins { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Admin> Admins { get; set; }

        static PostgresContext()
            => NpgsqlConnection.GlobalTypeMapper.MapEnum<OrderStatus>();
        
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