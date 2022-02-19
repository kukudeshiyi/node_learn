// 启动一个进程
const http = require("http");

http.createServer().listen(3000, () => {
  process.title = "测试进程 Node.js"; // 进程进行命名
  console.log(`process.pid: `, process.pid); // process.pid: 20279
});

// 环境变量
// console.log(process.env.NODE_ENV);

// 异步
// nextTick 会让函数在 node 的下一个循环执行
// 比 setTimeout 的性能高
// TODO: 详情见https://cnodejs.org/topic/4f16442ccae1f4aa2700109b
// (function nodeAsync(){
//     console.log("刀郎");
//     process.nextTick(()=>{
//         console.log("西海情歌");
//     });
//     console.log("我们的从前");
// })();

// 获取命令行参数
// 元素1：node
// 元素2：可执行文件的绝对路径
// 元素x：其他，比如参数等
// TODO: 研究一下vite是怎么解析参数的
// (function(){
//     process.argv.forEach((arg,index)=>{
//         console.log("params",index,arg);
//     })
// })()

// 获取 node specific 执行参数
// TODO: --harmony的参数意思
// (function(){
//     process.execArgv.forEach((arg,index)=>{
//         console.log("params",index,arg);
//     })
// })()

// 获取当前工作路径，切换工作路径
// (function(){
//     console.log("start path",process.cwd());
//     try{
//         process.chdir("./src");
//         console.log("current path",process.cwd());
//     }catch(e){
//         console.log("current path",e);
//     }
// })()

// IPC
// process.connected：如果当前进程是子进程，且与父进程之间通过IPC通道连接着，则为true；
// process.disconnect()：断开与父进程之间的IPC通道，此时会将 process.connected 置为false；
// (function(){
//     const child = require("child_process");
//     console.log("master process connected status",process.connected);

//     // fork 指定的路径是相当于 cwd 来定的
//     child.fork("./src/process/child.js",{
//         stdio:"inherit"
//     });
// })()

// 标准输入输出
// TODO: process stdin 的 end 事件什么时候会触发
// TODO: 为什么第一次输入后进程就退出了
// (function(){
//     process.stdin.setEncoding("utf8");

//     process.stdin.on("readable",()=>{
//         const chunk = process.stdin.read();
//         if(chunk!==null){
//             process.stdout.write(`data:${chunk}`);
//         }
//     });

//     process.stdin.on("end",()=>{
//         process.stdout.write(`end`);
//     })
// })()

// TODO:用户组/用户 相关

// 当前进程信息
// process.pid：返回进程id
// process.title：可以用它来修改进程的名字，当你用ps命令，同时有多个node进程在跑的时候，作用就出来了
// process.uptime()：当前node进程已经运行了多长时间（单位是秒）。
// process.memoryUsage()：返回进程占用的内存，单位为字节。输出内容大致如下：
// {
//     rss: 19181568,
//     heapTotal: 8384512, // V8占用的内容
//     heapUsed: 4218408 // V8实际使用了的内存
// }
// process.cpuUsage([previousValue])：CPU使用时间耗时，单位为毫秒。user表示用户程序代码运行占用的时间，system表示系统占用时间。如果当前进程占用多个内核来执行任务，那么数值会比实际感知的要大
// process.hrtime()：一般用于做性能基准测试。返回一个数组，数组里的值为 [[seconds, nanoseconds] （1秒等10的九次方毫微秒）。 注意，这里返回的值，是相对于过去一个随机的时间，所以本身没什么意义。仅当你将上一次调用返回的值做为参数传入
// (function(){
//     console.log("当前进程id",process.pid);

// })()

// node 可执行相关信息
// process.version：返回当前node的版本，比如'v6.1.0'。
// process.versions：返回node的版本，以及依赖库的版本，如下所示。
// process.config：返回当前 node版本 编译时的参数，同样很少会用到，一般用来查问题。
// process.execPath：node可执行程序的绝对路径，比如 '/usr/local/bin/node'

// 进程运行所在环境
// process.arch：返回当前系统的处理器架构（字符串），比如'arm', 'ia32', or 'x64'。
// process.platform：返回关于平台描述的字符串，比如 darwin、win32 等。

// 抛出警告信息
// (function(){
//     process.emitWarning('Something Happened!', 'CustomWarning');

// process.on('warning', (warning) => {
//   console.warn(warning.name);
//   console.warn(warning.message);
//   console.warn(warning.stack);
// });

// })()

// 向进程发送信号
// process.kill(process.pid,'SIGNUP');

// 退出进程
// process.exit([exitCode]);

// 设置进程退出码
// process.exitCode = 1;
