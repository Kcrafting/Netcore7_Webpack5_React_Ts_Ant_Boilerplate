namespace Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Models
{
    [SQLite.Table("Result_BillType")]
    public class Result_BillType
    {
        [SQLite.PrimaryKey, SQLite.AutoIncrement]
        public int id { get; set; } 
        public string label { get; set; }
        public string value { get; set; }
        /// <summary>
        /// 出入库单据
        /// in 入库单 out 出库单 base 基础资料
        /// </summary>
        public string billType { get; set; } 
    }
}
