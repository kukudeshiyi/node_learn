const net = require("net");
const Transcoder = require("./transcoder");
const transcoder = new Transcoder();
const HOST = "127.0.0.1";
const PORT = 3001;
let overageBuffer = null;

const server = new net.createServer();

server.listen(PORT, HOST);

server.on("listening", () => {
  console.log(`服务开启在${HOST}:${PORT}`);
});

server
  .on("connection", (socket) => {
    socket.on("data", (buffer) => {
      if (overageBuffer) {
        buffer = buffer.concat([overageBuffer, buffer]);
      }

      let packageLength = 0;

      while ((packageLength = transcoder.getPackageLength(buffer))) {
        const package = buffer.slice(0, packageLength);
        buffer = buffer.slice(packageLength);

        const result = transcoder.decode(package);
        console.log("result-", result);
        socket.write(transcoder.encode(result.body, result.serialNumber));
      }
    });
  })
  .on("close", () => {
    console.log("close");
  })
  .on("error", (err) => {
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
