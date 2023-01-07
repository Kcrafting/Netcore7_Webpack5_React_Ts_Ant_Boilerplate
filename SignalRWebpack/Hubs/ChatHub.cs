using Microsoft.AspNetCore.SignalR;
using Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Models;
//using Robam_Sync.Models;
using Utils;

namespace Netcore7_Webpack5_React_Ts_Ant_Boilerplate.SignalRWebpack.Hubs
{
    public class ChatHub : Hub
    {
        public static ChatHub staticInstance { get; private set; }
        public static void UpdateClientMessage(string billType)
        {
            if(staticInstance is not null)
            {
                staticInstance.NewMessage(new Models.SignalR_Paras() { Token = "",BillType = billType });
            }
        }
        public ChatHub()
        {
            staticInstance = this;
        }
        public async Task NewMessage(SignalR_Paras para)
        {
            var ret = para.BillType.ToUpper() switch
            {
                "INSTOCK" => new Robam_Sync.Models.Sqlite_Models_Result_TableMessage() { rowData = Sqlite_Helper_Static.read<Robam_Sync.Models.Sqlite_Models_Instock>().Select(i => i.Format()).ToList() },
                "OUTSTOCK" => new Robam_Sync.Models.Sqlite_Models_Result_TableMessage() { rowData = Sqlite_Helper_Static.read<Robam_Sync.Models.Sqlite_Models_Outstock>().Select(i => i.Format()).ToList() },
                "QTXXTB" => new Robam_Sync.Models.Sqlite_Models_Result_TableMessage() { rowData = Sqlite_Helper_Static.read<Robam_Sync.Models.Sqlite_Models_QTXXTB>().Select(i => i.Format()).ToList() },
                "JCZLTB" => new Robam_Sync.Models.Sqlite_Models_Result_TableMessage() { rowData = Sqlite_Helper_Static.read<Robam_Sync.Models.Sqlite_Models_JCZLTB>().Select(i => i.Format()).ToList() },
            };
            await Clients.All.SendAsync("messageReceived", ret);
        }
    }
}
