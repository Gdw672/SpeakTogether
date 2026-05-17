namespace SpeakTogether.Service.Interface
{
    public interface INotificationService
    {
        public Task SendToUser(string userId, string message);
    }
}
