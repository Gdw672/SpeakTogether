using SpeakTogether.Context.Interface;
using SpeakTogether.Models;
using SpeakTogether.Service.FileStorage.Interface;

namespace SpeakTogether.Service.FileStorage
{
    public class LocalMaterialStorageService : IFileStorage
    {
        private readonly string _basePath = Path.Combine(Directory.GetCurrentDirectory(), "AppData/Materials");
        private readonly ISpeakTogetherDbContext speakTogetherDbContext;

        public LocalMaterialStorageService(ISpeakTogetherDbContext speakTogetherDbContext)
        {
            this.speakTogetherDbContext = speakTogetherDbContext;
        }

        public Task DeleteFileAsync(string filePath)
        {
            var fullPath = Path.Combine(_basePath, filePath);
            File.Delete(fullPath);
            return Task.CompletedTask;
        }

        public Task<Stream> GetFileAsync(string filePath)
        {
            var fullPath = Path.Combine(_basePath, filePath);
            return Task.FromResult<Stream>(File.OpenRead(fullPath));
        }

        public async Task<string> SaveFileAsync(IFormFile file)
        {
            var path = Path.Combine(_basePath, file.FileName);
            using var stream = new FileStream(path, FileMode.Create);

            await file.CopyToAsync(stream);
            return path;
        }
    }
}
