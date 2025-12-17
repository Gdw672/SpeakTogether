namespace SpeakTogether.Service.PasswordHasher.Interface
{
    public interface IPasswordHashService
    {
        string Hash(string password);
        bool Verify(string password, string stored);
    }
}
