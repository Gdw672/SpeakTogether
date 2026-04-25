using SpeakTogether.Models;

namespace SpeakTogether.Service.Interface
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
