using System.Reflection;
using Core.Enteties;
using Core.Enteties._LookUps;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class DataContext(DbContextOptions options) : IdentityDbContext<AppUser>(options)
{
    public required DbSet<Address> Addresses { get; set; }
    public required DbSet<AssetType> AssetTypes { get; set; }
    public required DbSet<Discount> Discounts { get; set; }
    public required DbSet<DocumentType> DocumentTypes { get; set; }
    public required DbSet<Gender> Genders { get; set; }
    public required DbSet<OwnershipCategory> OwnershipCategories { get; set; }
    public required DbSet<PaymentFrequency> PaymentFrequencies { get; set; }
    public required DbSet<PaymentMethod> PaymentMethods { get; set; }
    public required DbSet<PremiumPlan> PremiumPlans { get; set; }
    public required DbSet<Relationship> Relationships { get; set; }
    public required DbSet<ResourceType> ResourceTypes { get; set; }
    public required DbSet<ServiceType> ServiceTypes { get; set; }
    public required DbSet<Status> Statuses { get; set; }
    public required DbSet<BurialSociety> BurialSocieties { get; set; }
    public required DbSet<Client> Clients { get; set; }
    public required DbSet<ClientPremium> ClientPremia { get; set; }
    public required DbSet<FamilyMember> FamilyMembers { get; set; }
    public required DbSet<FuelRecord> FuelRecords { get; set; }
    public required DbSet<FuneralEvent> FuneralEvents { get; set; }
    public required DbSet<IncidentRecord> IncidentRecords { get; set; }
    public required DbSet<Payment> Payments { get; set; }
    public required DbSet<PaymentHistory> PaymentHistories { get; set; }
    public required DbSet<ResourceAllocation> ResourceAllocations { get; set; }
    public required DbSet<Vehicle> Vehicles { get; set; }
    public required DbSet<VehicleMaintenance> VehicleMaintenances { get; set; }
    public required DbSet<Title> Titles { get; set; }
    public required DbSet<Ethnicity> Ethnicities { get; set; }
    public required DbSet<MaritalStatus> MaritalStatuses { get; set; }
    public required DbSet<Branch> Branches { get; set; }
    public required DbSet<ContactPerson> ContactPeople { get; set; }
    public required DbSet<Province> Provinces { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
