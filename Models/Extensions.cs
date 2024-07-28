using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Configuration;
using MudBlazor;
using System.Reflection;
using System.ComponentModel;
using System.Text.Json;
using System.Text.Json.Serialization;

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

	public static string GetDescription(this Enum value)
        {
            Type type = value.GetType();
            string name = Enum.GetName(type, value);
            if (name != null)
            {
                FieldInfo field = type.GetField(name);
                if (field != null)
                {
                    DescriptionAttribute attr =
                           Attribute.GetCustomAttribute(field,
                             typeof(DescriptionAttribute)) as DescriptionAttribute;
                    if (attr != null)
                        return attr.Description;
                }
            }
            return string.Empty;
        }
	    
        public static List<T> ConvertFromJson<T>(this string json)
        {
            List<T> Temp = new List<T>();
            if (json.StartsWith("["))    //Check if the returned json string was an array
                Temp.Add(JsonSerializer.Deserialize<T>(json));
            else
                Temp = JsonSerializer.Deserialize<List<T>>(json);  //Deserialize back into data

            return Temp;
        }
    }
}
