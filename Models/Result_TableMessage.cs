namespace Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Models
{
    public class Result_TableMessage_ColumnType
    {
        public string name { get; set; }
        public string dataIndex { get; set; }
        public string key { get; set; }
        public bool resizable { get; set; } = true;
        public string type { get; set; }
        public int width { get; set; }
        public string formatter { get; set; }
    }
    public class Result_TableMessage_RowData
    {
        public string key { get; set; }
        public string index { get; set; }
        public string errrorTime { get; set; }
        public bool isError { get; set; }
        public string description { get; set; }
        
    }
    public class Result_TableMessage
    {
        public List<Result_TableMessage_ColumnType> columnType { get; set; } = new List<Result_TableMessage_ColumnType> { 
            new Result_TableMessage_ColumnType(){ name = "序号",dataIndex = "index",key = "index",resizable = true,width = 30},
            new Result_TableMessage_ColumnType(){ name = "错误时间",dataIndex = "errrorTime",key = "errrorTime",resizable = true,width = 250},
            new Result_TableMessage_ColumnType(){ name = "是否错误",dataIndex = "isError",key = "isError",resizable = true,width = 250/*,formatter = "const formatter = ({ row, onRowChange, isCellSelected }) => {\r\n        return (\r\n          <SelectCellFormatter\r\n            value={row.available}\r\n            onChange={() => {\r\n              onRowChange({ ...row, available: !row.available });\r\n            }}\r\n            isCellSelected={isCellSelected}\r\n          />\r\n        );\r\n      }"*/},
            new Result_TableMessage_ColumnType(){ name = "信息",dataIndex = "description",key = "description",resizable = true,width = 250},
        };
        public List<Result_TableMessage_RowData> rowData { get; set; }
    }
}
