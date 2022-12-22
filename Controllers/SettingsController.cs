using Microsoft.AspNetCore.Mvc;
using Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Models;

namespace Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SettingsController : ControllerBase
    {
        [HttpPost]
        public IEnumerable<Settings> Post()
        {
            return new List<Settings>() { 
                new Settings(){ label="para_timingImport",value="false"},
                new Settings(){ label="para_timingDelay",value="everyday"},
                new Settings(){ label="para_timingDelayNumber",value="1"},
                new Settings(){ label="para_timingTime",value="00:00:00"},
            };
        }
    }
}
