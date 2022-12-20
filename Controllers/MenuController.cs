using Microsoft.AspNetCore.Mvc;
using Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Models;
using System.Collections.Generic;

namespace Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MenuController : ControllerBase
    {
        [HttpPost]
        public IEnumerable<Menu> Post()
        {
            return new List<Menu>() {
                new Menu() {label="入库",key="sub1",icon="MailOutlined", children = new List<Menu>{
                    new Menu() { label="产品入库导入",key="cprkdr",icon="" },
                    new Menu() { label="配件入库导入",key="page/pjrkdr",icon="" },
                    new Menu() { label="其他",key="sub2",icon="",children = new List<Menu>(){
                        new Menu() { label="入库导入设置",key="page/rkdrsz",icon="" }
                    }}
                }},
                new Menu() {label="出库",key="sub3",icon="", children = new List<Menu>{
                    new Menu() { label="产品出库导入",key="page/cpckdr",icon="" },
                    new Menu() { label="配件出库导入",key="page/pjckdr",icon="" },
                    new Menu() { label="其他",key="sub4",icon="",children = new List<Menu>(){
                        new Menu() { label="出库导入设置",key="page/ckdrsz",icon="" }
                    }}
                }},
                new Menu() {label="基础资料",key="sub5",icon="", children = new List<Menu>{
                    new Menu() { label="基础资料导入",key="page/jczldr",icon="" },
                    new Menu() { label="其他信息同步",key="page/qtxxtb",icon="" },
                }}
            };
        }
    }
}
