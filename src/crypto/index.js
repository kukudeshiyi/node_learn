const crypto = require("crypto");
//md5------------------------------------------------
const md5 = (str) => {
  return crypto.createHash("md5").update(str, "utf8").digest("hex");
};

console.log(md5("hello world"));

//cipher---------------------------------------------
