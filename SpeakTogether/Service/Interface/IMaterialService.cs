namespace SpeakTogether.Service.Interface
{
    public interface IMaterialService
    {
        public Task<Stream?> GetFileAsync(string fileName);
    }
}
