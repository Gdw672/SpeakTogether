    namespace SpeakTogether.Service.PasswordHasher.Interface
    {
        public interface IPasswordHashService
        {
            Task<string> HashAsync(string password);
            Task<bool> VerifyAsync(string password, string stored);
        }
    }
