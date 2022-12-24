using Microsoft.AspNetCore.Mvc;
using Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Models;

namespace Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImportController : ControllerBase
    {
        [HttpPost]
        [Route("RKDR")]
        public IEnumerable<Menu> RKDRPost([FromBody] Paras.Paras paras)
        {
            return null;
        }
        [HttpPost]
        [Route("RKDR")]
        public IEnumerable<Menu> CKDRPost([FromBody] Paras.Paras paras)
        {
            return null;
        }
    }
}
