const events = require("events");

const emitter = new events.EventEmitter();

// emitter.on("getUp", (time) => {
//   console.log(`早上${time}，开始新的一天`);
// });
// emitter.emit("getUp", "6:00");

// const oneDayPlanRun = {
//   "6:00": function () {
//     console.log("现在是早上六点，起床了");
//   },
//   "7:00": function () {
//     console.log("现在是早上七点，吃早饭");
//   },
// };

// function OneDayPlan() {
//   events.call(this);
// }

// Object.setPrototypeOf(OneDayPlan.prototype, events.prototype);
// Object.setPrototypeOf(OneDayPlan, events);

// const oneDayPlan = new OneDayPlan();

// oneDayPlan.on("6:00", function () {
//   oneDayPlanRun["6:00"]();
// });

// oneDayPlan.on("7:00", function () {
//   oneDayPlanRun["7:00"]();
// });

// async function doMain() {
//   oneDayPlan.emit("6:00");

//   await sleep(2000); // 间隔 2 秒钟输出

//   oneDayPlan.emit("7:00");
// }

// doMain();

// async function sleep(s) {
//   return new Promise(function (reslve) {
//     setTimeout(function () {
//       reslve(1);
//     }, s);
//   });
// }

// emitter.once("handsome", () => {
//   console.log("once:you are so handsome!!");
// });

// emitter.emit("handsome");
// emitter.emit("handsome");
// emitter.emit("handsome");

const fs = require("fs");
const status = {};

const select = function (file, filename, cb) {
  emitter.once(file, cb);

  if (status[file] === undefined) {
    status[file] = "ready"; // 不存在设置默认值
  }
  if (status[file] === "ready") {
    status[file] = "pending";
    fs.readFile(file, function (err, result) {
      console.log(filename);
      emitter.emit(file, err, result.toString());
      status[file] = "ready";

      setTimeout(function () {
        delete status[file];
      }, 1000);
    });
  }
};

for (let i = 1; i <= 11; i++) {
  if (i % 2 === 0) {
    select(`../net/client.js`, "client 文件", function (err, result) {
      console.log("err: ", err, "result: ", result);
    });
  } else {
    select(`../net/server.js`, "server 文件", function (err, result) {
      console.log("err: ", err, "result: ", result);
    });
  }
}
