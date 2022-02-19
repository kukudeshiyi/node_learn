const path = require("path");

const fork = require("child_process").fork;
const cpus = require("os").cpus();

const server = require("net").createServer();
server.listen(3000);

process.title = "node-master";

const workers = {};

const createWorkers = () => {
  const worker = fork(path.join(__dirname, "./work.js"));

  worker.on("message", (message) => {
    if (message.act === "suicide") {
      createWorkers();
    }
  });

  worker.on("exit", (code, signal) => {
    console.log(`worker process exited`, code, signal);
    delete workers[worker.pid];
  });

  worker.send("server", server);
  workers[worker.pid] = worker;

  console.log(`worker process created`, worker.pid);
};

for (let i = 0; i < cpus.length; i++) {
  createWorkers();
}

const close = (code) => {
  console.log("process exited", code);

  if (code !== 0) {
    for (let pid in workers) {
      console.log("master process exited, kill worker pid: ", pid);
      workers[pid].kill("SIGINT");
    }
  }

  process.exit(0);
};

process.once("SIGINT", close.bind(this, "SIGINT")); // kill(2) Ctrl-C
process.once("SIGQUIT", close.bind(this, "SIGQUIT")); // kill(3) Ctrl-\
process.once("SIGTERM", close.bind(this, "SIGTERM")); // kill(15) default
process.once("exit", close.bind(this));
