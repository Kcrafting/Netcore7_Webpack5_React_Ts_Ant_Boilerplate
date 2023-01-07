
using Netcore7_Webpack5_React_Ts_Ant_Boilerplate.SignalRWebpack.Hubs;
using Netcore7_Webpack5_React_Ts_Ant_Boilerplate.TimedTask;
using System.Security.AccessControl;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
// Add services to the container.
builder.Services.AddBackgroundServices();
builder.Services.AddControllersWithViews();
//注册跨域请求CORS服务
builder.Services.AddCors(options =>
{
    options.AddPolicy("any", builder =>
    {
        builder
        .SetIsOriginAllowed(origin => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});
//builder.Services.AddTransient(typeof(Microsoft.Extensions.Hosting.IHostedService), TimedService);
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseHttpsRedirection();
//app.UseStaticFiles();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();
//启用Cors中间件
app.UseCors();
app.MapHub<Robam_Sync.SignalRWebpack.ChatHub>("page/api/hub");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");
Utils.Logger.init("logs_");
app.Run();
