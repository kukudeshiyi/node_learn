const b1 = Buffer.from("10");
console.log("b1", b1);

const b2 = Buffer.from("10", "utf8");
console.log("b2", b2);

const b3 = Buffer.from([10]);
console.log("b3", b3);

const b4 = Buffer.from(b3);
console.log("b4", b4);

// buffer alloc
const bAlloc1 = Buffer.alloc(10); // 返回一个已经初始化的10个字节的缓冲区
console.log("bAlloc1", bAlloc1);

// buffer allocUnsafe
const bAlloc2 = Buffer.allocUnsafe(10); // 返回一个未初始化的10个字节的缓冲区
console.log("bAlloc2", bAlloc2);

// buffer 编码
const buf1 = Buffer.from("hello world", "ascii");
console.log("buf1", buf1.toString("hex"));

// 字符串与 Buffer 类型互转
const buf2 = Buffer.from("Node.js 技术栈", "UTF-8");
console.log("buf2", buf2.length);
console.log("buf2", buf2.toString("UTF-8", 0, 9)); // Node.js � // 因为一个汉字占用3个字节，

// Node.js 采用了 slab 机制进行预先申请、事后分配，是一种动态的管理机制。

// 使用 Buffer.alloc(size) 传入一个指定的 size 就会申请一块固定大小的内存区域，slab 具有如下三种状态：

// full：完全分配状态
// partial：部分分配状态
// empty：没有被分配状态

// Node.js 以 8KB 为界限来区分是小对象还是大对象
