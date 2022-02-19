// 创建一个shell，然后在shell里执行命令。执行完成后，将stdout、stderr作为参数传入回调方法。
// const exec = require("child_process").exec;
// exec("ls -al", (error, stdout, stderr) => {
//   if (error) {
//     console.error("error", error);
//     return;
//   }
//   console.log("stdout", stdout);
//   console.log("stderr", stderr);
// });

// exec("ls hello.txt", (error, stdout, stderr) => {
//   if (error) {
//     console.error("error", error);
//     return;
//   }
//   console.log("stdout", stdout);
//   console.log("stderr", stderr);
// });

// 跟.exec()类似，不同点在于，没有创建一个新的shell。至少有两点影响
// 比child_process.exec()效率高一些。（实际待测试）
// 一些操作，比如I/O重定向，文件glob等不支持。
// file: 可执行文件的名字，或者路径
// const execFile = require("child_process").execFile;

// execFile("node", ["--version"], (error, stdout, stderr) => {
//   if (error) {
//     console.error("error", error);
//     return;
//   }
//   console.log("stdout", stdout);
// });

// execFile("ls -al .", { shell: "/bin/bash" }, (error, stdout, stderr) => {
//   if (error) {
//     console.error("error", error);
//     return;
//   }
//   console.log("stdout", stdout);
// });

// child_process.fork(modulePath[, args][, options])
// modulePath：子进程运行的模块
const fork = require("child_process").fork;

// const child = fork("./src/process/child_process_child.js", {
//   silent: false,
// });

// child.stdout.setEncoding("utf8");
// child.stdout.on("data", (data) => {
//   console.log("data", data);
// });

// child.on("message", (data) => {
//   console.log("message from child", JSON.stringify(data));
// });

// child.send({ from: "parent" });

// 设置execArgv的目的一般在于，让子进程跟父进程保持相同的执行环境
// fork("./src/process/child_process_child.js", {
//   execArgv: process.execArgv,
// });

// child_process.spawn(command[, args][, options])
// command：要执行的命令

const spawn = require("child_process").spawn;
const child = spawn("ls", ["-a"]);
child.stdout.pipe(process.stdout);
