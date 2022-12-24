using Microsoft.AspNetCore.Mvc;
using Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Models;
using Utils;

namespace Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Controllers
{
    [ApiController]
    public class SettingsController : ControllerBase
    {
        public string[] settingItems = new string[8] { 
            "para_in_timingImport", "para_in_timingDelay", "para_in_timingDelayNumber", "para_in_timingTime" ,
            "para_out_timingImport", "para_out_timingDelay", "para_out_timingDelayNumber", "para_out_timingTime"
        };
        [HttpPost]
        [Route("Settings")]
        public IEnumerable<Settings> Post()
        {
            return Sqlite_Helper_Static.read<Settings>().Where(i => settingItems.Contains(i.label)).ToList();
        }
        [HttpPost]
        [Route("saveSettings")]
        public IEnumerable<Settings> Post([FromBody]IEnumerable<Settings> settings)
        {
            //Sqlite_Helper_Static.droptable<Settings>();
            foreach(var item in settings){
                if (settingItems.Contains(item.label))
                {
                    Sqlite_Helper_Static.delete<Settings>(i=>i.label == item.label);
                    Sqlite_Helper_Static.write<Settings>(item);
                }
            }
            return Sqlite_Helper_Static.read<Settings>().Where(i => settingItems.Contains(i.label)).ToList();
        }
    }
}
