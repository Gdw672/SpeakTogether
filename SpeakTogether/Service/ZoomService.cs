using SpeakTogether.Models.DTOs;
using SpeakTogether.Service.Interface;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SpeakTogether.Service
{
    public class ZoomService : IZoomService
    {
        private readonly HttpClient httpClient;
        private readonly string clientId = "E2632ahoRky2OSVaWRFmHg";
        private readonly string clientSecret = "N4NxXfgEc8gF55k8eGmHJ86OLVUhX7Rp";
        private readonly string accountId = "RU_Cr4d8QmWIGTZGMIS3iw";
        private string accessToken;
        private DateTime tokenExpiry;


        public ZoomService(HttpClient httpClient)
        {
            this.httpClient = httpClient;
        }

        private async Task<string> GetAccessTokenAsync()
        {
            if (accessToken != null && DateTime.UtcNow < tokenExpiry)
                return accessToken;

            var auth = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{clientId}:{clientSecret}"));
            var request = new HttpRequestMessage(HttpMethod.Post,
                $"https://zoom.us/oauth/token?grant_type=account_credentials&account_id={accountId}");
            request.Headers.Authorization = new AuthenticationHeaderValue("Basic", auth);

            var response = await httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(json);
            accessToken = doc.RootElement.GetProperty("access_token").GetString();
            int expiresIn = doc.RootElement.GetProperty("expires_in").GetInt32();
            tokenExpiry = DateTime.UtcNow.AddSeconds(expiresIn - 60); 
            return accessToken;
        }

        public async Task<ZoomLinksDTO> CreateConferenceAsync(LessonDTO lessonDTO)
        {
            var token = await GetAccessTokenAsync();
            var duration = GetLessonDurationMinutes(lessonDTO.StartDate, lessonDTO.EndDate);

            var body = new
            {
                topic = lessonDTO.Name,
                type = 2,
                start_time = lessonDTO.StartDate.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                duration = duration,
                timezone = "Europe/Riga",
                settings = new
                {
                    host_video = true,
                    participant_video = true,
                    join_before_host = false,
                    mute_upon_entry = true
                }
            };

            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.zoom.us/v2/users/me/meetings");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            request.Content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");

            var response = await httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();

            using var doc = JsonDocument.Parse(json);
            var startUrl = doc.RootElement.GetProperty("start_url").GetString();
            var joinUrl = doc.RootElement.GetProperty("join_url").GetString();

            return new ZoomLinksDTO
            {
                StartUrl = startUrl,
                JoinUrl = joinUrl
            };
        }

        private int GetLessonDurationMinutes(DateTime startDate, DateTime endDate)
        {
            var startUtc = DateTime.SpecifyKind(startDate, DateTimeKind.Utc);
            var endUtc = DateTime.SpecifyKind(endDate, DateTimeKind.Utc);

            var duration = endUtc - startUtc;
            return (int)Math.Round(duration.TotalMinutes);
        }
    }
}
