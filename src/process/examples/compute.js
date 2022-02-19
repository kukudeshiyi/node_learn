const sum = (max) => {
  let a = 0;
  for (let i = 0; i <= max; i++) {
    a += i;
  }
  return a;
};

process.on("message", (max) => {
  console.log("child process", process.pid);
  process.send(sum(max));
  process.exit();
});

// process.on("SIGINT", () => {
//   console.log("child process is killed by parent process");
// });
