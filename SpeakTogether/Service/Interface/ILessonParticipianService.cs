using SpeakTogether.Models;

namespace SpeakTogether.Service.Interface
{
    public interface ILessonParticipianService
    {
       public Task<LessonParticipant> AddParticipianToLesson(int UserId, int LessonId);
    }
}
