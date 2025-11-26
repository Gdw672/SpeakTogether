using Microsoft.EntityFrameworkCore;
using SpeakTogether.Context;
using SpeakTogether.Context.Interface;
using SpeakTogether.Service;
using SpeakTogether.Service.Interface;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<SpeakTogetherDbContext>(options =>
    options.UseNpgsql("Host=localhost;Port=5433;Username=postgres;Password=example;Database=speakTogether"));


builder.Services.AddScoped<ISpeakTogetherDbContext>(provider =>
    provider.GetRequiredService<SpeakTogetherDbContext>());

builder.Services.AddScoped<ICreateLessonService, CreateLessonService>();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
