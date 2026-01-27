using SpeakTogether.Enums;

namespace SpeakTogether.Models
{
    public class LessonParticipant
    {
        public LessonParticipant() { }

        public LessonParticipant(int UserId, int LessonId) 
        { 
            this.UserId = UserId;
            this.LessonId = LessonId;
            Role = UserLessonRole.Participian;
        }

        public int LessonId { get; set; }

        public int UserId { get; set; }

        public Lesson Lesson { get; set; }

        public User User { get; set; }

        public UserLessonRole Role { get; set; }
    }
}
