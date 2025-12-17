using Konscious.Security.Cryptography;
using SpeakTogether.Service.PasswordHasher.Interface;
using System.Security.Cryptography;
using System.Text;

namespace SpeakTogether.Service.PasswordHasher
{
    public class Argon2HashService : IPasswordHashService
    {
        private const int SaltSize = 16;
        private const int HashSize = 32;
        private const int MemorySize = 65536;
        private const int Iterations = 4;
        private const int Parallelism = 4;

        public string Hash(string password)
        {
            var salt = RandomNumberGenerator.GetBytes(SaltSize);

            var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
            {
                Salt = salt,
                DegreeOfParallelism = Parallelism,
                MemorySize = MemorySize,
                Iterations = Iterations
            };

            var hash = argon2.GetBytes(HashSize);

            return Convert.ToBase64String(salt) + "." +
                   Convert.ToBase64String(hash);
        }

        public bool Verify(string password, string stored)
        {
            var parts = stored.Split('.');
            var salt = Convert.FromBase64String(parts[0]);
            var storedHash = Convert.FromBase64String(parts[1]);

            var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
            {
                Salt = salt,
                DegreeOfParallelism = Parallelism,
                MemorySize = MemorySize,
                Iterations = Iterations
            };

            var hash = argon2.GetBytes(HashSize);
            return CryptographicOperations.FixedTimeEquals(hash, storedHash);
        }
    }
}
