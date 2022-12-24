using Microsoft.AspNetCore.Mvc;
using Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Models;

namespace Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Robam_ApiController : ControllerBase//:Robam_Sync.Robam_Sync
    {
        public Result_TableMessage Post()
        {
            var list = new List<Result_TableMessage_RowData>();
            for(int i = 0;i < 100000; i++)
            {
                var item = new Result_TableMessage_RowData() { 
                    index = i.ToString(),
                    isError = Random.Shared.Next()%2 == 0 ? true : false,
                    errrorTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss fff"),
                    description = "aaaaaaas" + i.ToString(),
                    
                };
                list.Add(item);
            }
            return new Result_TableMessage { rowData = list };
        }
    }
}
