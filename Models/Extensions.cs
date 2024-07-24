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
        //Read Appsetting.json
        //private static readonly IConfiguration config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        public static string GET_WHHIST_CONN()
        {
            var builder = new ConfigurationBuilder()
             .AddJsonFile($"appsettings.json", true, true);

            var config = builder.Build();

            var String = config["WH_HIST"];
            return String;
        }

        public static string GET_WHNEW_CONN()
        {
            var builder = new ConfigurationBuilder()
             .AddJsonFile($"appsettings.json", true, true);

            var config = builder.Build();

            var String = config["ConnectionString"];
            return String;
        }

        public static List<T> ConvertFromJson<T>(this string json)
        {
            List<T> Temp = new List<T>();
            if (json.StartsWith("["))    //Check if the returned json string was an array
                Temp.Add(json.Deserialize<T>());
            else
                Temp = json.Deserialize<List<T>>();  //Deserialize back into data

            return Temp;
        }
    }
}
