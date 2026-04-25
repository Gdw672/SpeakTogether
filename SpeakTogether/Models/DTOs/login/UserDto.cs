namespace SpeakTogether.Models.DTOs.login
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsEmailVerified { get; set; }
    }
}
