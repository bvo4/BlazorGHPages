using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Configuration;
using MudBlazor;

namespace BlazorGHPages.Models
{
    public static class Extensions
	{
		public static void Test()
        {
			var configurationBuilder = new ConfigurationBuilder();
			var config = configurationBuilder.Build();

			var list = new List<string>();
			list = config.GetSection("Software").Get<List<string>>();
		}
    }
}
