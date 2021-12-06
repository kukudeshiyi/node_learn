import { Readable } from "stream";

const inStream = new Readable({
  read(size) {},
});

inStream.push("ABCDEFGHIJKLM");
inStream.push("NOPQRSTUVWXYZ");
inStream.push(null);

inStream.pipe(process.stdout);
