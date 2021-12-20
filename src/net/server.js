const net = require("net");
const HOST = "127.0.0.1";
const PORT = 3001;

const server = new net.createServer();

server.listen(PORT, HOST);

server.on("listening", () => {
  console.log(`服务开启在${HOST}:${PORT}`);
});

server.on("connection", (socket) => {
  socket.on("data", (buffer) => {
    const msg = buffer.toString();
    console.log("msg", msg);

    socket.write(Buffer.from("hello" + ` ` + msg));
  });
});

server.on("close", () => {
  console.log("close");
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log("地址正在被使用，重试中");

    setTimeout(() => {
      server.close();
      server.listen(PORT, HOST);
    }, 1000);
  } else {
    console.error("服务器异常" + err);
  }
});
