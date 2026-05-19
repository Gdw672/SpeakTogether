using NBomber.CSharp;

using NBomber.CSharp;
using System.Net.Http;
using System.Text;
using System.Text.Json;

using NBomber.CSharp;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading;

Thread.Sleep(TimeSpan.FromSeconds(10));

System.Net.ServicePointManager.DefaultConnectionLimit = 200;

var handler = new HttpClientHandler
{
    ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator,
};

var client = new HttpClient(handler);

client.DefaultRequestHeaders.ConnectionClose = false;

var scenario = Scenario.Create("auth_load_test", async context =>
{
    // Данные статичны, никакой лишней работы для процессора на стороне теста
    var loginBody = new
    {
        email = "test_load@mail.com",
        password = "123456"
    };

    var loginContent = new StringContent(
        JsonSerializer.Serialize(loginBody),
        Encoding.UTF8,
        "application/json"
    );

    // Делаем ВСЕГО ОДИН запрос вместо двух
    var loginResponse = await client.PostAsync(
        "https://localhost:7173/user/log-in",
        loginContent
    );

    if (!loginResponse.IsSuccessStatusCode)
        return Response.Fail();

    var json = await loginResponse.Content.ReadAsStringAsync();

    var token = JsonDocument.Parse(json)
        .RootElement
        .GetProperty("token")
        .GetString();

    return string.IsNullOrEmpty(token)
        ? Response.Fail()
        : Response.Ok();
})
.WithLoadSimulations(
    Simulation.KeepConstant(20, TimeSpan.FromSeconds(30))
);

NBomberRunner
    .RegisterScenarios(scenario)
    .Run();