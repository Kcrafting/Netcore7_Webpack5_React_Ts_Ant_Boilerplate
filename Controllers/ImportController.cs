using Microsoft.AspNetCore.Mvc;
using Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Models;

namespace Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Controllers
{
    [ApiController]
    
    public class ImportController : ControllerBase
    {
        [HttpPost]
        [Route("RKDR")]
        public IEnumerable<Menu> RKDRPost([FromBody] Paras paras)
        {
            return null;
        }
        [HttpPost]
        [Route("RKDR")]
        public IEnumerable<Menu> CKDRPost([FromBody] Paras paras)
        {
            return null;
        }
    }
}
