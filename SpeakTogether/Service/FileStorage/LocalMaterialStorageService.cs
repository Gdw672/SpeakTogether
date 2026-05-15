using SpeakTogether.Context.Interface;
using SpeakTogether.Models;
using SpeakTogether.Service.FileStorage.Interface;

namespace SpeakTogether.Service.FileStorage
{
    public class LocalMaterialStorageService : IFileStorage
    {
        private readonly string _basePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/materials");

        public Task DeleteFileAsync(string fileName)
        {
            var fullPath = Path.Combine(_basePath, fileName);

            if (File.Exists(fullPath))
                File.Delete(fullPath);

            return Task.CompletedTask;
        }

        public Task<Stream?> GetFileAsync(string fileName)
        {
            var fullPath = Path.Combine(_basePath, fileName);

            if (!File.Exists(fullPath))
                return Task.FromResult<Stream?>(null);

            Stream stream = File.OpenRead(fullPath);

            return Task.FromResult<Stream?>(stream);
        }

        public async Task<string> SaveFileAsync(IFormFile file)
        {
            if (!Directory.Exists(_basePath))
                Directory.CreateDirectory(_basePath);

            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);

            var fullPath = Path.Combine(_basePath, fileName);

            using var stream = new FileStream(fullPath, FileMode.Create);
            await file.CopyToAsync(stream);

            return fileName;
        }

    }
}
