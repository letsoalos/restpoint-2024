using API.Dtos;
using AutoMapper;
using Core.Enteties;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PaymentHistoriesController(IGenericRepository<PaymentHistory> repo, IMapper mapper) : BaseApiController
{
    [HttpGet("payment-histories")]
    public async Task<ActionResult<IReadOnlyList<PaymentHistoryDto>>> GetPaymentHistories([FromQuery] PaymentHistorySpecParams specParams,
        [FromQuery] int? clientId)
    {
        var spec = new PaymentHistorySpecification(specParams, clientId);

        return await CreatePagedResult<PaymentHistory, PaymentHistoryDto>(repo, spec, specParams.PageIndex, specParams.PageSize, mapper);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<PaymentHistoryDto>> GetPaymentHistory(int id)
    {
        var spec = new PaymentHistorySpecification(id);

        var paymentHistory = await repo.GetEntityWithSpec(spec);

        if (paymentHistory == null) return NotFound();

        return Ok(mapper.Map<PaymentHistory, PaymentHistoryDto>(paymentHistory));
    }
}
