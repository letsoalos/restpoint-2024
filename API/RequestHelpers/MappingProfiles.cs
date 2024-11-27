using API.Dtos;
using AutoMapper;
using Core.Enteties;
using Core.Enteties._LookUps;

namespace API.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Client, ClientDto>()
            .ForMember(d => d.DocumentType, o => o.MapFrom(s => s.DocumentType.Name))
            .ForMember(d => d.Gender, o => o.MapFrom(s => s.Gender.Name))
            .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.Name))
            .ForMember(d => d.Title, o => o.MapFrom(s => s.Title.Name))
            .ForMember(d => d.Ethnicity, o => o.MapFrom(s => s.Ethnicity.Name))
            .ForMember(d => d.MaritalStatus, o => o.MapFrom(s => s.MaritalStatus.Name))
            .ForMember(d => d.BurialSociety, o => o.MapFrom(s => s.BurialSociety!.Name))
            .ForMember(d => d.Branch, o => o.MapFrom(s => s.Branch.Name));

        CreateMap<ClientDto, Client>()
            .ForMember(d => d.DocumentType, o => o.Ignore())
            .ForMember(d => d.Gender, o => o.Ignore())
            .ForMember(d => d.Status, o => o.Ignore())
            .ForMember(d => d.Title, o => o.Ignore())
            .ForMember(d => d.Ethnicity, o => o.Ignore())
            .ForMember(d => d.MaritalStatus, o => o.Ignore())
            .ForMember(d => d.BurialSociety, o => o.Ignore())
            .ForMember(d => d.Branch, o => o.Ignore());


        CreateMap<FamilyMember, FamilyMemberDto>()
            .ForMember(d => d.Client, o => o.MapFrom(s => s.Client.FirstName))
            .ForMember(d => d.Client, o => o.MapFrom(s => s.Client.LastName))
            .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.Name))
            .ForMember(d => d.Relationship, o => o.MapFrom(s => s.Relationship.Name))
            .ForMember(d => d.Gender, o => o.MapFrom(s => s.Gender.Name));

        CreateMap<FamilyMemberDto, FamilyMember>()
            .ForMember(d => d.Gender, o => o.Ignore())
            .ForMember(d => d.Status, o => o.Ignore())
            .ForMember(d => d.Client, o => o.Ignore())
            .ForMember(d => d.Relationship, o => o.Ignore());

        CreateMap<PaymentHistory, PaymentHistoryDto>()
            .ForMember(d => d.Client, o => o.MapFrom(s => s.Client.FirstName))
            .ForMember(d => d.Client, o => o.MapFrom(s => s.Client.LastName))
            .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.Name))
            .ForMember(d => d.PaymentMethod, o => o.MapFrom(s => s.PaymentMethod.Name));

        CreateMap<Branch, BranchDto>()
            .ForMember(d => d.ContactPerson, o => o.MapFrom(s => s.ContactPerson.FirstName))
            .ForMember(d => d.ContactPerson, o => o.MapFrom(s => s.ContactPerson.LastName))
            .ForMember(d => d.Province, o => o.MapFrom(s => s.Province.Name));

        CreateMap<BranchDto, Branch>()
            .ForMember(d => d.ContactPerson, o => o.Ignore())
            .ForMember(d => d.Province, o => o.Ignore());
    }
}
