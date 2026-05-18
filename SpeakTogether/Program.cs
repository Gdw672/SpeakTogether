    using Microsoft.EntityFrameworkCore;
    using SpeakTogether.Context;
    using SpeakTogether.Context.Interface;
    using SpeakTogether.Service;
    using SpeakTogether.Service.FileStorage;
    using SpeakTogether.Service.FileStorage.Interface;
    using SpeakTogether.Service.Interface;
    using SpeakTogether.Service.PasswordHasher;
    using SpeakTogether.Service.PasswordHasher.Interface;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.IdentityModel.Tokens;
    using System.Text;
using Hangfire;
using Hangfire.MemoryStorage;
using SpeakTogether.SignalR;
using SpeakTogether.Hangfire;


var builder = WebApplication.CreateBuilder(args);

    var Origins = "speak-together-front";



    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
options.AddPolicy(Origins, policy =>
{
    policy.WithOrigins("https://localhost:5181", "http://localhost:5173")
          .AllowAnyMethod()
          .AllowAnyHeader()
          .AllowCredentials(); 
}));


builder.Services.AddDbContext<SpeakTogetherDbContext>(options =>
        options.UseNpgsql("Host=localhost;Port=5433;Username=postgres;Password=example;Database=speakTogether"));

    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])
            )
        };

        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];
                var path = context.HttpContext.Request.Path;

                if (!string.IsNullOrEmpty(accessToken) &&
                    path.StartsWithSegments("/notificationHub"))
                {
                    context.Token = accessToken;
                }
                return Task.CompletedTask;
            }
        };
    });

    builder.Services.AddScoped<ISpeakTogetherDbContext>(provider =>
        provider.GetRequiredService<SpeakTogetherDbContext>());

    builder.Services.AddHttpClient<IZoomService, ZoomService>();
    builder.Services.AddScoped<ILessonService, LessonService>();
    builder.Services.AddScoped<IUserService, UserService>();
    builder.Services.AddScoped<IFileStorage, LocalMaterialStorageService>();
    builder.Services.AddScoped<IPasswordHashService, Argon2HashService>();
    builder.Services.AddScoped<IMaterialService, MaterialService>();
    builder.Services.AddScoped<ILessonParticipianService, LessonParticipianService>();
    builder.Services.AddScoped<IJwtService, JwtService>();
    builder.Services.AddScoped<INotificationService, NotificationService>();

    builder.Services.AddSignalR();

    builder.Services.AddHangfire(config =>
      config.UseMemoryStorage()
       );


builder.WebHost.UseUrls("https://localhost:7173");

    var app = builder.Build();

app.UseSwagger();
    app.UseSwaggerUI();

    app.UseHttpsRedirection();

    app.UseCors(Origins);

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapHub<NotificationHub>("/notificationHub");

    app.UseHangfireDashboard();

    app.MapControllers();
    app.UseHangfireServer();

using (var scope = app.Services.CreateScope())
{
    var recurringJobManager = scope.ServiceProvider.GetRequiredService<IRecurringJobManager>();

    recurringJobManager.AddOrUpdate<NotificationJob>(
        "check-upcoming-lessons", 
        job => job.RunNotificationHeartbeat(), 
        Cron.Minutely
    );
}

app.Run();
