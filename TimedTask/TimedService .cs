using Microsoft.Net.Http.Headers;
using Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Models;
using Utils;
using Netcore7_Webpack5_React_Ts_Ant_Boilerplate.Controllers;
using Robam_Sync.Models;
using RestSharp;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace Netcore7_Webpack5_React_Ts_Ant_Boilerplate.TimedTask
{
    public class TimedService : BackgroundService
    {
        private readonly ILogger _logger;
        //private Timer _timer;
        public class ExeState
        {
            string _LastExecuteTime = DateTime.Parse("2022-1-1 00:00:00").ToString("yyyy-MM-dd HH:mm:ss");
            public string LastExecuteTime
            {
                get
                {
                    return _LastExecuteTime;
                }
                set
                {
                    if (_LastExecuteTime != value)
                    {
                        BeenExecute = false;
                    }
                    _LastExecuteTime = value;
                }
            } 
            public bool BeenExecute { get; set; } = false;
        }
        static ExeState exeState = new ExeState();
        public TimedService(ILogger<TimedService> logger)
        {
            _logger = logger;
        }

        public void ExeAutoJobIn(string billTypes,string startDate,string endDate)
        {
            new Thread(() => {
                try
                {
                    var client = new RestClient(new HttpClient() { BaseAddress = new Uri("https://localhost:7011/api/execute_autoinstock"), Timeout = TimeSpan.FromMinutes(40) });
                    var request = new RestRequest();
                    request.Method = Method.Post;
                    request.AddHeader("Content-Type", "application/json");
                    JObject jobj = new JObject();
                    jobj["FBillTypes"] = new JArray() { billTypes.Split(',') };
                    jobj["FStartDate"] = startDate;
                    jobj["FEndDate"] = endDate;
                    var body = JsonConvert.SerializeObject(jobj);
                    request.AddParameter("application/json", body, ParameterType.RequestBody);
                    request.AddBody(body);
                    RestResponse response = client.Execute(request);
                    Console.WriteLine(response.Content);
                }
                catch (Exception exp)
                {
                    Logger.log(exp.Message);
                }
            }) { IsBackground = true }.Start();
        }
        public void ExeAutoJobOut(string billTypes, string startDate, string endDate)
        {
            new Thread(() => {
                try
                {
                    var client = new RestClient(new HttpClient() { BaseAddress = new Uri("https://localhost:7011/api/execute_autooutstock"), Timeout = TimeSpan.FromMinutes(40) });
                    var request = new RestRequest();
                    request.Method = Method.Post;
                    request.AddHeader("Content-Type", "application/json");
                    JObject jobj = new JObject();
                    jobj["FBillTypes"] = new JArray() { billTypes.Split(',') };
                    jobj["FStartDate"] = startDate;
                    jobj["FEndDate"] = endDate;
                    var body = JsonConvert.SerializeObject(jobj);
                    request.AddParameter("application/json", body, ParameterType.RequestBody);
                    request.AddBody(body);
                    RestResponse response = client.Execute(request);
                    Console.WriteLine(response.Content);
                }
                catch (Exception exp)
                {
                    Logger.log(exp.Message);
                }
            })
            { IsBackground = true }.Start();
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("servers startA");
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    //入库
                    _logger.LogInformation("TimedServiceA DoWork");
                    var para = Sqlite_Helper_Static.read<Settings>().Where(i => SettingsController.settingItems.Contains(i.label)).ToList();
                    var para_in_timingImport = para.Where(i => i.label == "para_in_timingImport").FirstOrDefault();
                    if (para_in_timingImport != null && Boolean.Parse(para_in_timingImport.value))
                    {
                        //启动导入
                        Utils.Utils.RecordStepNew<Sqlite_Models_Instock>("启用入库导入", true);
                    }
                    else
                    {
                        Utils.Utils.RecordStepNew<Sqlite_Models_Instock>("未启用入库定时导入", true);
                    }
                    var para_in_billTypes = para.Where(i => i.label == "para_in_billTypes").FirstOrDefault();
                    var para_in_timingDelay = para.Where(i => i.label == "para_in_timingDelay").FirstOrDefault();
                    var para_in_timingDelayNumber = para.Where(i => i.label == "para_in_timingDelayNumber").FirstOrDefault();
                    var para_in_timingTime = para.Where(i => i.label == "para_in_timingTime").FirstOrDefault();
                    if (para_in_timingDelay != null && para_in_timingDelay.value != null && para_in_timingTime != null)
                    {
                        switch (para_in_timingDelay.value)
                        {
                            case "everyday":
                                {
                                    if (para_in_timingTime == null)
                                    {
                                        Utils.Utils.RecordStepNew<Sqlite_Models_Instock>("入库导入时间点未设置", true);
                                        break;
                                    }
                                    string d1 = DateTime.Now.ToString("yyyy-MM-dd HH:mm");
                                    string d2 = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd ") + para_in_timingTime.value).ToString("yyyy-MM-dd HH:mm");
                                    if (d1 == d2)
                                    {
                                        if (!exeState.BeenExecute && DateTime.Parse(exeState.LastExecuteTime).ToString("yyyy-MM-dd HH:mm") != DateTime.Now.ToString("yyyy-MM-dd HH:mm"))
                                        {
                                            exeState.LastExecuteTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                                            Utils.Utils.RecordStepNew<Sqlite_Models_Instock>("执行每天导入!", true);

                                            if (para_in_billTypes != null && para_in_billTypes.value != "")
                                            {
                                                ExeAutoJobIn(para_in_billTypes.value,DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd") + " 00:00:00", DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd") + " 23:59:59");
                                            }
                                            
                                        }
                                    }
                                    break;
                                }
                            case "everyweek":
                                {
                                    if (para_in_timingDelayNumber != null)
                                    {
                                        int dayofweek = 0;
                                        if (int.TryParse(para_in_timingDelayNumber.value, out dayofweek))
                                        {
                                            if (dayofweek - 1 >= 0 && dayofweek - 1 <= 6)
                                            {

                                            }
                                            else
                                            {
                                                Utils.Utils.RecordStepNew<Sqlite_Models_Instock>("导入间隔为每周时，导入间隔天数应该在周1-7范围内!", true);
                                                break;
                                            }
                                            if (DateTime.Now.DayOfWeek == (DayOfWeek)dayofweek - 1)
                                            {
                                                if (!exeState.BeenExecute && DateTime.Parse(exeState.LastExecuteTime).ToString("yyyy-MM-dd HH:mm") != DateTime.Now.ToString("yyyy-MM-dd HH:mm"))
                                                {
                                                    exeState.LastExecuteTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                                                    Utils.Utils.RecordStepNew<Sqlite_Models_Instock>("执行每周导入!", true);

                                                    if (para_in_billTypes != null && para_in_billTypes.value != "")
                                                    {
                                                        ExeAutoJobIn(para_in_billTypes.value, DateTime.Now.AddDays(-8).ToString("yyyy-MM-dd") + " 00:00:00", DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd") + " 23:59:59");
                                                    }
                                                   
                                                }
                                            }
                                        }
                                        else
                                        {
                                            Utils.Utils.RecordStepNew<Sqlite_Models_Instock>("导入间隔天数不能转换为数字!", true);
                                            break;
                                        }

                                    }
                                    else
                                    {
                                        Utils.Utils.RecordStepNew<Sqlite_Models_Instock>("导入间隔天数未设置", true);
                                    }
                                    break;
                                }
                            case "eachday":
                                {
                                    int delayday = 0;
                                    if(int.TryParse(para_in_timingDelayNumber.value,out delayday))
                                    {
                                        if (DateTime.Now.ToString("yyyy-MM-dd HH:mm") == DateTime.Parse(exeState.LastExecuteTime).AddDays(delayday).ToString("yyyy-MM-dd HH:mm"))
                                        {
                                            exeState.LastExecuteTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                                            Utils.Utils.RecordStepNew<Sqlite_Models_Instock>("执行每隔几天导入!", true);

                                            if (para_in_billTypes != null && para_in_billTypes.value != "")
                                            {
                                                ExeAutoJobIn(para_in_billTypes.value, DateTime.Now.AddDays(0 - (delayday + 1)).ToString("yyyy-MM-dd") + " 00:00:00", DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd") + " 23:59:59");
                                            }
                                            //执行
                                            
                                        }
                                    }
                                    
                                    break;
                                }
                            default:
                                break;
                        }
                    }
                    else
                    {
                        Utils.Utils.RecordStepNew<Sqlite_Models_Instock>("导入间隔或导入时间点未设置!", true);
                    }
                    //出库
                    var para_out_timingImport = para.Where(i => i.label == "para_in_timingImport").FirstOrDefault();
                    if (para_out_timingImport != null && Boolean.Parse(para_out_timingImport.value))
                    {
                        //启动导入
                        Utils.Utils.RecordStepNew<Sqlite_Models_Instock>("启用出库导入", true);
                    }
                    else
                    {
                        Utils.Utils.RecordStepNew<Sqlite_Models_Instock>("未启用出库定时导入", true);
                    }
                    var para_out_billTypes = para.Where(i => i.label == "para_out_billTypes").FirstOrDefault();
                    var para_out_timingDelay = para.Where(i => i.label == "para_out_timingDelay").FirstOrDefault();
                    var para_out_timingDelayNumber = para.Where(i => i.label == "para_out_timingDelayNumber").FirstOrDefault();
                    var para_out_timingTime = para.Where(i => i.label == "para_out_timingTime").FirstOrDefault();
                    if (para_out_timingDelay != null && para_out_timingDelay.value != null && para_out_timingTime != null)
                    {
                        switch (para_out_timingDelay.value)
                        {
                            case "everyday":
                                {
                                    if (para_out_timingTime == null)
                                    {
                                        Utils.Utils.RecordStepNew<Sqlite_Models_Instock>("入库导入时间点未设置", true);
                                        break;
                                    }
                                    string d1 = DateTime.Now.ToString("yyyy-MM-dd HH:mm");
                                    string d2 = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd ") + para_out_timingTime.value).ToString("yyyy-MM-dd HH:mm");
                                    if (d1 == d2)
                                    {
                                        if (!exeState.BeenExecute && DateTime.Parse(exeState.LastExecuteTime).ToString("yyyy-MM-dd HH:mm") != DateTime.Now.ToString("yyyy-MM-dd HH:mm"))
                                        {
                                            exeState.LastExecuteTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                                            Utils.Utils.RecordStepNew<Sqlite_Models_Instock>("执行每天导入!", true);

                                            if (para_out_billTypes != null && para_out_billTypes.value != "")
                                            {
                                                ExeAutoJobOut(para_out_billTypes.value, DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd") + " 00:00:00", DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd") + " 23:59:59");
                                            }

                                        }
                                    }
                                    break;
                                }
                            case "everyweek":
                                {
                                    if (para_out_timingDelayNumber != null)
                                    {
                                        int dayofweek = 0;
                                        if (int.TryParse(para_out_timingDelayNumber.value, out dayofweek))
                                        {
                                            if (dayofweek - 1 >= 0 && dayofweek - 1 <= 6)
                                            {

                                            }
                                            else
                                            {
                                                Utils.Utils.RecordStepNew<Sqlite_Models_Instock>("导入间隔为每周时，导入间隔天数应该在周1-7范围内!", true);
                                                break;
                                            }
                                            if (DateTime.Now.DayOfWeek == (DayOfWeek)dayofweek - 1)
                                            {
                                                if (!exeState.BeenExecute && DateTime.Parse(exeState.LastExecuteTime).ToString("yyyy-MM-dd HH:mm") != DateTime.Now.ToString("yyyy-MM-dd HH:mm"))
                                                {
                                                    exeState.LastExecuteTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                                                    Utils.Utils.RecordStepNew<Sqlite_Models_Instock>("执行每周导入!", true);

                                                    if (para_out_billTypes != null && para_out_billTypes.value != "")
                                                    {
                                                        ExeAutoJobOut(para_out_billTypes.value, DateTime.Now.AddDays(-8).ToString("yyyy-MM-dd") + " 00:00:00", DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd") + " 23:59:59");
                                                    }

                                                }
                                            }
                                        }
                                        else
                                        {
                                            Utils.Utils.RecordStepNew<Sqlite_Models_Instock>("导入间隔天数不能转换为数字!", true);
                                            break;
                                        }

                                    }
                                    else
                                    {
                                        Utils.Utils.RecordStepNew<Sqlite_Models_Instock>("导入间隔天数未设置", true);
                                    }
                                    break;
                                }
                            case "eachday":
                                {
                                    int delayday = 0;
                                    if (int.TryParse(para_out_timingDelayNumber.value, out delayday))
                                    {
                                        if (DateTime.Now.ToString("yyyy-MM-dd HH:mm") == DateTime.Parse(exeState.LastExecuteTime).AddDays(delayday).ToString("yyyy-MM-dd HH:mm"))
                                        {
                                            exeState.LastExecuteTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                                            Utils.Utils.RecordStepNew<Sqlite_Models_Instock>("执行每隔几天导入!", true);

                                            if (para_out_billTypes != null && para_out_billTypes.value != "")
                                            {
                                                ExeAutoJobOut(para_out_billTypes.value, DateTime.Now.AddDays(0 - (delayday + 1)).ToString("yyyy-MM-dd") + " 00:00:00", DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd") + " 23:59:59");
                                            }
                                            //执行

                                        }
                                    }

                                    break;
                                }
                            default:
                                break;
                        }
                    }
                    else
                    {
                        Utils.Utils.RecordStepNew<Sqlite_Models_Instock>("导入间隔或导入时间点未设置!", true);
                    }
                }
                catch(Exception exp)
                {
                    Utils.Utils.RecordStepNew<Sqlite_Models_Instock>(exp.Message, true);
                }
                //执行任务
                await Task.Delay(1000 * 40, stoppingToken); //延迟暂停5秒
            }

            _logger.LogInformation("servers end");
        }

        public override void Dispose()
        {
            base.Dispose();
        }
    }
}
