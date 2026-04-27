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


var builder = WebApplication.CreateBuilder(args);

var Origins = "speak-together-front";



builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
    options.AddPolicy(Origins, policy =>
    {
        policy.WithOrigins("https://localhost:5181").AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
        policy.WithOrigins("http://localhost:5173").AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();

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
});

builder.Services.AddScoped<ISpeakTogetherDbContext>(provider =>
    provider.GetRequiredService<SpeakTogetherDbContext>());

builder.Services.AddHttpClient<IZoomService, ZoomService>();
builder.Services.AddScoped<ILessonService, LessonService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IFileStorage, LocalMaterialStorageService>();
builder.Services.AddScoped<IPasswordHashService, Argon2HashService>();
builder.Services.AddScoped<ILessonParticipianService, LessonParticipianService>();
builder.Services.AddScoped<IJwtService, JwtService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(Origins);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
