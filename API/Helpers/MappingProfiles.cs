using API.Dtos;
using AutoMapper;
using Core.Enteties;

namespace API.Helpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Client, ClientDto>()
            .ForMember(d => d.DocumentType, o => o.MapFrom(s => s.DocumentType.Name))
            .ForMember(d => d.Gender, o => o.MapFrom(s => s.Gender.Name))
            .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.Name))
            .ForMember(d => d.StreetName, o => o.MapFrom(s => s.Address.StreetName))
            .ForMember(d => d.Suburb, o => o.MapFrom(s => s.Address.Suburb))
            .ForMember(d => d.PostalCode, o => o.MapFrom(s => s.Address.PostalCode))
            .ForMember(d => d.City, o => o.MapFrom(s => s.Address.City))
            .ForMember(d => d.BurialSociety, o => o.MapFrom(s => s.BurialSociety!.Name));
    }
}
