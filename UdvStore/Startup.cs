using System.Text;
using System.Text.Json.Serialization;
using BusinessLayer.Helpers;
using BusinessLayer.Services;
using BusinessLayer.StorageActions;
using DataBaseStorage;
using DataBaseStorage.ConfigurationDb;
using DataBaseStorage.Context;
using DataBaseStorage.DbStorage;
using DataBaseStorage.Enums;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using UdvStore.Services;

namespace UdvStore
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connection = Configuration.GetConnectionString("PostgresConnection");
            RegisterTypes();
            services.AddScoped<DBConfig>();
            services.AddTransient(typeof(IBaseStorage<>), typeof(BaseStorage<>));
            //services.AddDbContextFactory<BaseStorage<>>(options => options.UseNpgsql(connection));
            services.AddAuthentication(auth =>
                {
                    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = AuthOptions.ISSUER,
                        ValidateAudience = true,
                        ValidAudience = AuthOptions.AUDIENCE,
                        ValidateIssuerSigningKey = true,
                        RequireExpirationTime = true,
                        IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                    };
                });
            //BuildStorages
            services.AddScoped<EmployeesStorage>();
            services.AddScoped<EmployeeCoinsStorage>();
            services.AddScoped<ProductsStorage>();
            services.AddScoped<AdminStorage>();
            services.AddScoped<OpenEmployeesRequestsStorage>();
            services.AddScoped<ClosedEmployeesRequestsStorage>();
            services.AddScoped<AdminAccrualStorage>();
            services.AddScoped<AdminAccrualEmployeeStorage>();
            services.AddScoped<ClothesProductStorage>();
            services.AddScoped<OrdersStorage>();
            services.AddScoped<ProductsOrdersStorage>();
            //BuildFactory
            services.AddScoped<IStorageFactory, StorageFactory>();
            //BuildHelpers
            services.AddScoped<CoinsHelper>();
            services.AddScoped<ProductQuantityHelper>();
            //BuildServices
            services.AddScoped<AuthService>();
            services.AddScoped<CoinRequestService>();
            services.AddScoped<AdminAccrualService>();
            services.AddScoped<ProductService>();
            services.AddScoped<OrderService>();
            
            services.AddControllers().AddJsonOptions(x =>
            {
                x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/build"; });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
        
        public static void RegisterTypes()
        {
            NpgsqlConnection.GlobalTypeMapper.MapEnum<RequestStatus>("RequestStatus");
            NpgsqlConnection.GlobalTypeMapper.MapEnum<OrderStatus>("OrderStatus");
            NpgsqlConnection.GlobalTypeMapper.MapEnum<Sizes>("Sizes");
        }
    }
}