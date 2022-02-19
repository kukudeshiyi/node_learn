const http = require("http");
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plan",
  });
  res.end("I am worker,pid" + process.pid + ",ppid," + process.ppid);
});

let worker;
process.title = "node-worker";
process.on("message", (message, sendHandle) => {
  if ("message" === "server") {
    worker = sendHandle;
    worker.on("connection", (socket) => {
      server.emit("connection", socket);
    });
  }
});

process.on("uncaughtException", (err) => {
  console.log("err", err);
  process.send({ act: "suicide" });
  worker.close(() => {
    process.exit(1);
  });
});
