const http = require("http");
const child = require("child_process");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.url === "/compute") {
    const sumProcess = child.fork(path.join(__dirname, "./compute.js"));
    sumProcess.on("message", (value) => {
      res.end(`sum is ${value}`);
      // process.kill(sumProcess.pid, "SIGINT");
    });
    sumProcess.on("close", (code, signal) => {
      console.log(
        `收到close事件，子进程收到信号 ${signal} 而终止，退出码 ${code}`
      );
    });
    sumProcess.send(200000);
  }
});

// server.on("error", (err) => {
//   server.listen(3000, "127.0.0.1", () => {
//     console.log(`server restarted at http://127.0.0.1:${3000}`);
//   });
// });

server.listen(3000, "127.0.0.1", () => {
  console.log(`server started at http://127.0.0.1:${3000}`);
});
