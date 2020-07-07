# Basic Stream Event

### 阻塞 I/O

I/O指的是输入输出，可以是数据库操作，文件系统的操作，传统的阻塞 I/O 编程，函数调用 I/O 请求会阻塞线程。

所以相同的线程是无法处理很多个连接的。那么处理方法可以是建立线程pool，需要的时候就从中拿一个。

但是线程也要消耗系统资源，占用内存，还有引起上下文切换。而且在很多时候占用的线程是空闲的，所以效率不高。

### 非阻塞 I/O

系统直接返回，而不去等待数据的写入或读出。

### libuv

是个非阻塞的 I/O 引擎，

### reference

- [https://juejin.im/post/5a5e03eef265da3e5033c5b9](https://juejin.im/post/5a5e03eef265da3e5033c5b9)
- [https://learning.oreilly.com/library/view/nodejs-design-patterns/9781785885587/ch01s03.html](https://learning.oreilly.com/library/view/nodejs-design-patterns/9781785885587/ch01s03.html)

### Buffer

Buffer 对象用于表示二进制数据。

Buffer 类是 `Unit8Array` 的子类。

它的实例可以视为一个包含 0～255 的数据的数组。

buffer 模式：几乎所有的异步API 都用的是 buffer 模式，对于输入操作，buffer 模式下会把所有的数据收集起来，然后传递给 callback。比如你读取一个文件，buffer 模式下会把整个文件读取完成后才 callback。

### Stream

Stream 是一个模块，有四个类，这四个类都是 eventEmitter 的是一个实现。

每一个 stream 实例，是这四个类的一个实现。

stream 模式会把数据分成块，立刻提供给consumber，就可以先处理这一部分数据。stream 相比 buffer

- 从空间上来说，buffer 最多利用 0x3FFFFFFF(不到1GB)，但是stream 理论上可以比这大得多的数据
- 从时间上来说，stream 会更快，以文件的读取和压缩为例，它不需要等待读取完成即可进行压缩，也可以更好地利用cpu
- 此外，他可以利用 pipe 进行组合，因为 stream 有一个一致的接口，只要前一个stream 的格式被后一个支持，就可以。格式可以是二进制、文本、或者对象。

### 常用的stream

- `fs.createReadStream()`, `fs.createWriteStream()`
- http `request` 和 `response` 也是基本的 stream

### 解析 stream

每个 stream 都是以下 4 个 class 的一个实现，属于stream 模块

- Stream.Readble
- Stream.Writable
- Stream.Duplex
- Stream.Transform

上面每个 stream 类都是 EvetEmiiter 的一个实例，所以可以订阅一些事件如emd、error。

除了二进制模式（数据以chunk的方式流动，如 buffers 和 string）stream 还支持对象模式，此时流动的数据是一系列的离散对象。

### Readable streams

代表数据源，从一个 readable stream 接收数据有两种方式：非流动和流动模式。

默认的模式是非流动的，它会同步地读取数据，使用 read 方法，`readable.read([size])` 这个方法会同步的读取数据，返回 buffer 或者 string 对象。

- 会有一个  `readable` 事件，发送可以读取的新的数据。

```jsx
process.stdin 
  .on('readable', () => { 
    let chunk; 
    console.log('New data available'); 
    while((chunk = process.stdin.read()) !== null) { 
      console.log(
        `Chunk read: (${chunk.length}) "${chunk.toString()}"` 
      ); 
    } 
  }) 
  .on('end', () => process.stdout.write('End of stream'));

// use
// cat <path to a file> | node readStdin
```

- 对于二进制的 readble stream 我们可以使用 `stream.setEncoding` 方法来读取为字符串

另一个模式是流动模式，为 stream 添加 data 事件的listener，那么它就切换为流动模式，不使用 `read` 方法，而是数据一旦抵达就推送给 data 的 listener

```jsx
process.stdin 
  .on('data', chunk => {  
    console.log('New data available');  
    console.log( 
      `Chunk read: (${chunk.length}) "${chunk.toString()}"`  
    );  
  })  
  .on('end', () => process.stdout.write('End of stream'));
```

### reference

- [https://learning.oreilly.com/library/view/nodejs-design-patterns/9781785885587/ch05s02.html](https://learning.oreilly.com/library/view/nodejs-design-patterns/9781785885587/ch05s02.html)
- [https://nodejs.org/api/stream.html#stream_buffering](https://nodejs.org/api/stream.html#stream_buffering)

