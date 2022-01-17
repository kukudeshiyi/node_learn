const net = require("net");
const Transcoder = require("./transcoder");
const transcoder = new Transcoder();

const client = net.createConnection({
  host: "127.0.0.1",
  port: 3001,
});

let overageBuffer = null;

// client.on("connect", () => {
//   client.write("nodejs");
//   setTimeout(() => {
//     client.write("JavaScript ");
//     client.write("TypeScript ");
//     client.write("Python ");
//     client.write("Java ");
//     client.write("C ");
//     client.write("PHP ");
//     client.write("ASP.NET ");
//   }, 1000);
// });

client
  .on("data", (buffer) => {
    // console.log(buffer.toString());
    if (overageBuffer) {
      buffer = Buffer.concat([overageBuffer, buffer]);
    }

    let packgeLength = 0;

    while ((packgeLength = transcoder.getPackageLength(buffer))) {
      const package = buffer.slice(0, packgeLength);
      buffer = buffer.slice(packgeLength);
      const result = transcoder.decode(package);
      console.log("result-", result);
    }

    overageBuffer = buffer;
  })
  .on("error", (err) => {
    console.error("服务器异常", err);
  })
  .on("close", (err) => {
    console.log("客户端连接断开!", err);
  });

client.write(transcoder.encode("0 Nodejs"));

const arr = [
  "1 JavaScript ",
  "2 TypeScript ",
  "3 Python ",
  "4 Java ",
  "5 C ",
  "6 PHP ",
  "7 ASP.NET ",
];

setTimeout(function () {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);

    client.write(transcoder.encode(arr[i]));
  }
}, 1000);
