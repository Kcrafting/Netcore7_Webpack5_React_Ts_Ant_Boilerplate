using Microsoft.AspNetCore.Mvc;

namespace Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Models
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecast
    {
        public DateOnly Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string? Summary { get; set; }
    }
}