using SpeakTogether.Service.FileStorage.Interface;
using SpeakTogether.Service.Interface;

namespace SpeakTogether.Service
{
    public class MaterialService : IMaterialService
    {
        private readonly IFileStorage _fileStorage;

        public MaterialService(IFileStorage fileStorage)
        {
            _fileStorage = fileStorage;
        }
        
        public async Task<Stream?> GetFileAsync(string fileName)
        {
            return await _fileStorage.GetFileAsync(fileName);
        }
    }
}
