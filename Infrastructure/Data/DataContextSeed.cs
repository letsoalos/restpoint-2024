using System.Text.Json;
using Core.Enteties;
using Core.Enteties._LookUps;

namespace Infrastructure.Data;

public class DataContextSeed
{
    public static async Task SeedAsync(DataContext context)
    {
        if (!context.AssetTypes.Any())
        {
            var assetTypesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/assetType.json");

            var assetTypes = JsonSerializer.Deserialize<List<AssetType>>(assetTypesData);

            if (assetTypes == null) return;

            context.AssetTypes.AddRange(assetTypes);

            await context.SaveChangesAsync();
        }

        if (!context.Discounts.Any())
        {
            var discountsData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/discount.json");

            var discounts = JsonSerializer.Deserialize<List<Discount>>(discountsData);

            if (discounts == null) return;

            context.Discounts.AddRange(discounts);

            await context.SaveChangesAsync();
        }

        if (!context.DocumentTypes.Any())
        {
            var documentTypesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/documentType.json");

            var documentTypes = JsonSerializer.Deserialize<List<DocumentType>>(documentTypesData);

            if (documentTypes == null) return;

            context.DocumentTypes.AddRange(documentTypes);

            await context.SaveChangesAsync();
        }

        if (!context.Genders.Any())
        {
            var gendersData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/gender.json");

            var genders = JsonSerializer.Deserialize<List<Gender>>(gendersData);

            if (genders == null) return;

            context.Genders.AddRange(genders);

            await context.SaveChangesAsync();
        }

        if (!context.OwnershipCategories.Any())
        {
            var ownershipCategoriesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/ownershipCategory.json");

            var ownershipCategories = JsonSerializer.Deserialize<List<OwnershipCategory>>(ownershipCategoriesData);

            if (ownershipCategories == null) return;

            context.OwnershipCategories.AddRange(ownershipCategories);

            await context.SaveChangesAsync();
        }

        if (!context.PaymentFrequencies.Any())
        {
            var paymentFrequenciesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/paymentFrequency.json");

            var paymentFrequencies = JsonSerializer.Deserialize<List<PaymentFrequency>>(paymentFrequenciesData);

            if (paymentFrequencies == null) return;

            context.PaymentFrequencies.AddRange(paymentFrequencies);

            await context.SaveChangesAsync();
        }

        if (!context.PaymentMethods.Any())
        {
            var paymentMethodsData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/paymentMethod.json");

            var paymentMethods = JsonSerializer.Deserialize<List<PaymentMethod>>(paymentMethodsData);

            if (paymentMethods == null) return;

            context.PaymentMethods.AddRange(paymentMethods);

            await context.SaveChangesAsync();
        }

        if (!context.PremiumPlans.Any())
        {
            var premiumPlansData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/premiumPlan.json");

            var premiumPlans = JsonSerializer.Deserialize<List<PremiumPlan>>(premiumPlansData);

            if (premiumPlans == null) return;

            context.PremiumPlans.AddRange(premiumPlans);

            await context.SaveChangesAsync();
        }

        if (!context.Relationships.Any())
        {
            var relationshipsData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/relationship.json");

            var relationships = JsonSerializer.Deserialize<List<Relationship>>(relationshipsData);

            if (relationships == null) return;

            context.Relationships.AddRange(relationships);

            await context.SaveChangesAsync();
        }

        if (!context.ResourceTypes.Any())
        {
            var resourceTypesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/resourceType.json");

            var resourceTypes = JsonSerializer.Deserialize<List<ResourceType>>(resourceTypesData);

            if (resourceTypes == null) return;

            context.ResourceTypes.AddRange(resourceTypes);

            await context.SaveChangesAsync();
        }

        if (!context.ServiceTypes.Any())
        {
            var serviceTypesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/serviceType.json");

            var serviceTypes = JsonSerializer.Deserialize<List<ServiceType>>(serviceTypesData);

            if (serviceTypes == null) return;

            context.ServiceTypes.AddRange(serviceTypes);

            await context.SaveChangesAsync();
        }

        if (!context.Statuses.Any())
        {
            var statusesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/status.json");

            var statuses = JsonSerializer.Deserialize<List<Status>>(statusesData);

            if (statuses == null) return;

            context.Statuses.AddRange(statuses);

            await context.SaveChangesAsync();
        }

        if (!context.Addresses.Any())
        {
            var addressesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/address.json");

            var addresses = JsonSerializer.Deserialize<List<Address>>(addressesData);

            if (addresses == null) return;

            context.Addresses.AddRange(addresses);

            await context.SaveChangesAsync();
        }


        if (!context.BurialSocieties.Any())
        {
            var burialSocietiesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/burialSociety.json");

            var burialSocieties = JsonSerializer.Deserialize<List<BurialSociety>>(burialSocietiesData);

            if (burialSocieties == null) return;

            context.BurialSocieties.AddRange(burialSocieties);

            await context.SaveChangesAsync();
        }

        if (!context.Titles.Any())
        {
            var titlesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/title.json");

            var titles = JsonSerializer.Deserialize<List<Title>>(titlesData);

            if (titles == null) return;

            context.Titles.AddRange(titles);

            await context.SaveChangesAsync();
        }

        if (!context.Ethnicities.Any())
        {
            var ethnicitiesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/ethnicity.json");

            var ethnicities = JsonSerializer.Deserialize<List<Ethnicity>>(ethnicitiesData);

            if (ethnicities == null) return;

            context.Ethnicities.AddRange(ethnicities);

            await context.SaveChangesAsync();
        }

        if (!context.MaritalStatuses.Any())
        {
            var maritalStatusesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/mStatus.json");

            var maritalStatuses = JsonSerializer.Deserialize<List<MaritalStatus>>(maritalStatusesData);

            if (maritalStatuses == null) return;

            context.MaritalStatuses.AddRange(maritalStatuses);

            await context.SaveChangesAsync();
        }

        if (!context.Clients.Any())
        {
            var clientsData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/client.json");

            var clients = JsonSerializer.Deserialize<List<Client>>(clientsData);

            if (clients == null) return;

            context.Clients.AddRange(clients);

            await context.SaveChangesAsync();
        }

        if (!context.FamilyMembers.Any())
        {
            var familyMembersData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/familyMember.json");

            var familyMembers = JsonSerializer.Deserialize<List<FamilyMember>>(familyMembersData);

            if (familyMembers == null) return;

            context.FamilyMembers.AddRange(familyMembers);

            await context.SaveChangesAsync();
        }

        if (!context.ClientPremia.Any())
        {
            var clientPremiaData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/clientPremium.json");

            var clientPremia = JsonSerializer.Deserialize<List<ClientPremium>>(clientPremiaData);

            if (clientPremia == null) return;

            context.ClientPremia.AddRange(clientPremia);

            await context.SaveChangesAsync();
        }

        if (!context.Vehicles.Any())
        {
            var vehiclesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/vehicle.json");

            var vehicles = JsonSerializer.Deserialize<List<Vehicle>>(vehiclesData);

            if (vehicles == null) return;

            context.Vehicles.AddRange(vehicles);

            await context.SaveChangesAsync();
        }

        if (!context.FuelRecords.Any())
        {
            var fuelRecordsData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/fuelRecord.json");

            var fuelRecords = JsonSerializer.Deserialize<List<FuelRecord>>(fuelRecordsData);

            if (fuelRecords == null) return;

            context.FuelRecords.AddRange(fuelRecords);

            await context.SaveChangesAsync();
        }

        if (!context.IncidentRecords.Any())
        {
            var incidentRecordsData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/incidentRecord.json");

            var incidentRecords = JsonSerializer.Deserialize<List<IncidentRecord>>(incidentRecordsData);

            if (incidentRecords == null) return;

            context.IncidentRecords.AddRange(incidentRecords);

            await context.SaveChangesAsync();
        }

        if (!context.VehicleMaintenances.Any())
        {
            var vehicleMaintenancesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/vehicleMaintenance.json");

            var vehicleMaintenances = JsonSerializer.Deserialize<List<VehicleMaintenance>>(vehicleMaintenancesData);

            if (vehicleMaintenances == null) return;

            context.VehicleMaintenances.AddRange(vehicleMaintenances);

            await context.SaveChangesAsync();
        }

        if (!context.FuneralEvents.Any())
        {
            var funeralEventsData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/funeralEvent.json");

            var funeralEvents = JsonSerializer.Deserialize<List<FuneralEvent>>(funeralEventsData);

            if (funeralEvents == null) return;

            context.FuneralEvents.AddRange(funeralEvents);

            await context.SaveChangesAsync();
        }

        if (!context.Payments.Any())
        {
            var paymentsData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/payment.json");

            var payments = JsonSerializer.Deserialize<List<Payment>>(paymentsData);

            if (payments == null) return;

            context.Payments.AddRange(payments);

            await context.SaveChangesAsync();
        }

        if (!context.PaymentHistories.Any())
        {
            var paymentHistoriesData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/paymentHistory.json");

            var paymentHistories = JsonSerializer.Deserialize<List<PaymentHistory>>(paymentHistoriesData);

            if (paymentHistories == null) return;

            context.PaymentHistories.AddRange(paymentHistories);

            await context.SaveChangesAsync();
        }

        if (!context.ResourceAllocations.Any())
        {
            var resourceAllocationsData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/resourceAllocation.json");

            var resourceAllocations = JsonSerializer.Deserialize<List<ResourceAllocation>>(resourceAllocationsData);

            if (resourceAllocations == null) return;

            context.ResourceAllocations.AddRange(resourceAllocations);

            await context.SaveChangesAsync();
        }
    }
}
