using API.Dtos;
using Core.Enteties;

namespace API.Extensions;

public static class AddressMappingExtensions
{
    public static AddressDto? ToDto(this Address? address)
    {
        if (address == null) return null;

        return new AddressDto
        {
            StreetName = address.StreetName,
            Suburb = address.Suburb,
            City = address.City,
            PostalCode = address.PostalCode
        };
    }

    public static Address ToEntity(this AddressDto addressDto)
    {
        if (addressDto == null) throw new ArgumentNullException(nameof(addressDto));

        return new Address
        {
            StreetName = addressDto.StreetName,
            Suburb = addressDto.Suburb,
            City = addressDto.City,
            PostalCode = addressDto.PostalCode
        };
    }

    public static void UpdateFromDto(this Address address, AddressDto addressDto)
    {
        if (addressDto == null) throw new ArgumentNullException(nameof(addressDto));
        if (address == null) throw new ArgumentNullException(nameof(address));

        address.StreetName = addressDto.StreetName;
        address.Suburb = addressDto.Suburb;
        address.City = addressDto.City;
        address.PostalCode = addressDto.PostalCode;


    }
}
