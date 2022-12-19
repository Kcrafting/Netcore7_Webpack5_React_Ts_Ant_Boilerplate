using Microsoft.AspNetCore.Mvc;

namespace Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Models
{
    [ApiController]
    [Route("[controller]")]
    public class Menu
    {
        public string label { get; set; }
        public string key { get; set; }
        public string icon { get; set; }
        public string type { get; set; } = "group";
        public List<Menu> children { get; set; }

    }
}
