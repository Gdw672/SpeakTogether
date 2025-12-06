namespace SpeakTogether.Service.FileStorage.Interface
{
    public interface IFileStorage
    {
        Task<string> SaveFileAsync(IFormFile file);
        Task<Stream> GetFileAsync(string filePath);
        Task DeleteFileAsync(string filePath);
    }
}
