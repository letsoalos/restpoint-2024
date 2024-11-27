using Core.Enteties;

namespace Core.Interfaces;

public interface IGenericRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(int id);
    Task<IReadOnlyList<T>> ListAllAsync();
    Task<T?> GetEntityWithSpec(ISpecification<T> spec);
    Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
    Task<TResult?> GetEntityWithSpec<TResult>(ISpecification<T, TResult> spec);
    Task<IReadOnlyList<TResult>> ListAsync<TResult>(ISpecification<T, TResult> spec);
    void Add(T entinty);
    void Update(T entinty);
    void Remove(T entinty);
    Task SoftDelete(T entity);
    Task<bool> SaveAllAsync();
    bool Exists(int id);
    Task<bool> ClientExist(string? identityNumber, string? passport);
    Task<int> CountAsync(ISpecification<T> spec);
}
