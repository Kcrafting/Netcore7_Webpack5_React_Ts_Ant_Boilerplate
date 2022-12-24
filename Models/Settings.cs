namespace Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Models
{
    [SQLite.Table("_Settings")]
    public class Settings
    {
        [SQLite.PrimaryKey,SQLite.AutoIncrement]
        public int id { get; set; }
        public string label { get; set; }
        public string value { get; set; }
    }
}
