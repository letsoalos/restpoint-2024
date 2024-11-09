using System.Reflection;
using Core.Enteties;
using Core.Enteties._LookUps;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Address> Addresses { get; set; }
    public DbSet<AssetType> AssetTypes { get; set; }
    public DbSet<Discount> Discounts { get; set; }
    public DbSet<DocumentType> DocumentTypes { get; set; }
    public DbSet<Gender> Genders { get; set; }
    public DbSet<OwnershipCategory> OwnershipCategories { get; set; }
    public DbSet<PaymentFrequency> PaymentFrequencies { get; set; }
    public DbSet<PaymentMethod> PaymentMethods { get; set; }
    public DbSet<PremiumPlan> PremiumPlans { get; set; }
    public DbSet<Relationship> Relationships { get; set; }
    public DbSet<ResourceType> ResourceTypes { get; set; }
    public DbSet<ServiceType> ServiceTypes { get; set; }
    public DbSet<Status> Statuses { get; set; }
    public DbSet<BurialSociety> BurialSocieties { get; set; }
    public DbSet<Client> Clients { get; set; }
    public DbSet<ClientPremium> ClientPremia { get; set; }
    public DbSet<FamilyMember> FamilyMembers { get; set; }
    public DbSet<FuelRecord> FuelRecords { get; set; }
    public DbSet<FuneralEvent> FuneralEvents { get; set; }
    public DbSet<IncidentRecord> IncidentRecords { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<PaymentHistory> PaymentHistories { get; set; }
    public DbSet<ResourceAllocation> ResourceAllocations { get; set; }
    public DbSet<Vehicle> Vehicles { get; set; }
    public DbSet<VehicleMaintenance> VehicleMaintenances { get; set; }
    public DbSet<Title> Titles { get; set; }
    public DbSet<Ethnicity> Ethnicities { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
