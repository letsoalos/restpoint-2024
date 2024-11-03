using Core.Enteties._LookUps;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class DocumentTypesController(IGenericRepository<DocumentType> repo) : BaseApiController
{

    [HttpGet("document-types")]
    public async Task<ActionResult<IReadOnlyList<DocumentType>>> GetDocumentTypes()
    {
        var documentTyeps = await repo.ListAllAsync();

        if (documentTyeps == null) return NotFound();

        return Ok(documentTyeps);
    }
}
