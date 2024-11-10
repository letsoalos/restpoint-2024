using API.Dtos;
using AutoMapper;
using Core.Enteties;

namespace API.RequestHelpers;

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
            .ForMember(d => d.Title, o => o.MapFrom(s => s.Title.Name))
            .ForMember(d => d.Ethnicity, o => o.MapFrom(s => s.Ethnicity.Name))
            .ForMember(d => d.MaritalStatus, o => o.MapFrom(s => s.MaritalStatus.Name))
            .ForMember(d => d.BurialSociety, o => o.MapFrom(s => s.BurialSociety!.Name));

        CreateMap<FamilyMember, FamilyMemberDto>()
            .ForMember(d => d.Client, o => o.MapFrom(s => s.Client.FirstName))
            .ForMember(d => d.Client, o => o.MapFrom(s => s.Client.LastName))
            .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.Name))
            .ForMember(d => d.Relationship, o => o.MapFrom(s => s.Relationship.Name))
            .ForMember(d => d.Gender, o => o.MapFrom(s => s.Gender.Name));
    }
}
