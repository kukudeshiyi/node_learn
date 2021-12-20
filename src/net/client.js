const net = require("net");

const client = net.createConnection({
  host: "127.0.0.1",
  port: 3001,
});

client.on("connect", () => {
  client.write("nodejs");
  setTimeout(() => {
    client.write("JavaScript ");
    client.write("TypeScript ");
    client.write("Python ");
    client.write("Java ");
    client.write("C ");
    client.write("PHP ");
    client.write("ASP.NET ");
  }, 1000);
});

client.on("data", (buffer) => {
  console.log(buffer.toString());
});

client.on("error", (err) => {
  console.log("服务器异常", err);
});

client.on("close", (err) => {
  console.log("客户端连接断开!", err);
});
