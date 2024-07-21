using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using BlazorGHPages;
using MudBlazor.Services;
using BlazorGHPages.Models;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

AllSkills.Languages = builder.Configuration.GetSection("Languages").Get<List<string>>();
AllSkills.Description = builder.Configuration.GetSection("Language_Description").Get<List<string>>();
AllSkills.Software = builder.Configuration.GetSection("Software").Get<List<string>>();


builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
//builder.Services.AddScoped<IDependencyLogic, BetterDependencyLogic>();
builder.Services.AddMudServices();


await builder.Build().RunAsync();
