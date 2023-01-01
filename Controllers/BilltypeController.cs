using Microsoft.AspNetCore.Mvc;
using Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Models;
using Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Paras;
using System.Reflection.Emit;
using Utils;

namespace Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BilltypeController : ControllerBase
    {
        [HttpPost]
        public IEnumerable<Result_BillType> Post([FromBody] BillType billType )
        {
            //Sqlite_Helper_Static.droptable<Result_BillType>();
            if (!Sqlite_Helper_Static.read<Result_BillType>().Any())
            {
                Sqlite_Helper_Static.write<Result_BillType>(new Result_BillType() { label = "配件入库单(含红字)",value = "pjrkd",billType = "in"});
                Sqlite_Helper_Static.write<Result_BillType>(new Result_BillType() { label = "产品入库单", value = "cprkd", billType = "in" });
                Sqlite_Helper_Static.write<Result_BillType>(new Result_BillType() { label = "产品出库单", value = "cpckd", billType = "out" });
                Sqlite_Helper_Static.write<Result_BillType>(new Result_BillType() { label = "配件出库单", value = "pjckd", billType = "out" });
                Sqlite_Helper_Static.write<Result_BillType>(new Result_BillType() { label = "产品", value = "cp", billType = "base" });
                Sqlite_Helper_Static.write<Result_BillType>(new Result_BillType() { label = "导购员", value = "dgy", billType = "base" });
                Sqlite_Helper_Static.write<Result_BillType>(new Result_BillType() { label = "门店", value = "md", billType = "base" });
                Sqlite_Helper_Static.write<Result_BillType>(new Result_BillType() { label = "配件", value = "pj", billType = "base" });
                Sqlite_Helper_Static.write<Result_BillType>(new Result_BillType() { label = "配件价格", value = "pjjg", billType = "sync" });
                Sqlite_Helper_Static.write<Result_BillType>(new Result_BillType() { label = "产品价格", value = "cpjg", billType = "sync" });
            }
            return Sqlite_Helper_Static.read<Result_BillType>().Where(i => i.billType == billType.TypeName).ToArray();
        }
    }
}
