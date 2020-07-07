# Event Loop

### 调用栈

- 调用栈是什么？
    - 调用栈使用后进先出的原则来暂时存储和管理函数调用
- 后进先出？
    - 最先执行的函数在最后被返回，在抛出错误时，我们会看到由内向外的日志输出
- 怎么管理的？
    - 存储了所调用的函数
    - 然后在函数执行完毕时，从栈中移除
    - 如果在函数执行中调用了另外的函数，将该函数加入栈
- 什么情况下会出现栈溢出错误
    - 调用栈超过了最大的值，一般是递归调用没有正确退出时出现
- 总结
    - 单线程意味着：一个时间只能做一件事
    - 代码执行是同步的
    - 每一次函数调用都会创建一个暂时存储下来的 stack frame

### event loop

- 一个例子

```
let startTime = Date.now();
setTimeout(function() {
  console.log(Date.now() - startTime);
}, 500);

while (Date.now() - startTime < 1000) {} // Pause for 1 second.

```

- 消息队列是什么？
    - JS 有一个队列叫做 messages queue，每个 message 都会关联一个处理这个message 的回调函数
- event loop 是什么？
    - JS 有这个基于 event loop 的并发模型
    - event loop 负责执行代码，收集和处理事件以及执行队列中的子任务
    - 在调用栈为空的时候，JS 会去检查消息队列，
    - 如果队列不空，则取出队列里的第一个 message 开始执行，这是会创建一个新的调用栈

```
// 如果当前没有消息在被处理，那么waitForMessage 会同步的等待消息到达
while(queue.waitForMessage()) {
  queue.processNextMessage();
}

```

- 怎样添加一个 message？
    - DOM elements, XMLHttpRequest, server-sent events, setTimeout, and setInterval
- 为什么需要消息队列和事件循环
    - 在多线程的语言中，在触发事件时，如果有函数正在执行，那么可以创建一个新的线程来进行时间处理
    - 因为 JS 是单线程的，触发事件后必须等待现有的函数执行完毕，所以需要创建一个队列，把触发的event handler 全都放进去
- hack
    - 可以使用 setTimeout(() => recursion(), 0) 来避免栈溢出，可以有更大的length
- 队列、消息队列、事件循环，有没有统一的称呼？
    - 事件循环队列
- 注意：有一个 job queue 和一个 event loop queue
    - ES6 说明了 job queue,
    - 会有一个 timer 的 queue，和一个 promise 的 queue，在两个队列里同时存在任务时，首先把promise 队列里的执行完毕再去执行 timer 的
    - [job-queue](http://www.ecma-international.org/ecma-262/6.0/#sec-jobs-and-job-queues)

```jsx
var promise = new Promise(function(resolve, reject) {resolve(1)});
promise.then(function(resolve) {console.log(1)});
console.log('a');
promise.then(function(resolve) {console.log(2);});
setTimeout(function() {console.log('h')}, 0);
promise.then(function(resolve) {console.log(3)});
console.log('b');

// a
// b
// 1
// 2
// 3
// h

```

```jsx
document.addEventListener('click', () => {
  setTimeout(console.log.bind(console, 'third'), 0);
  setTimeout(console.log.bind(console, 'fifth'), 100);
  console.log('first');
});

document.addEventListener('click', () => {
  setTimeout(console.log.bind(console, 'fourth'), 0);
  console.log('second');
});

```

## setTimeout 安排

- setTimeout 的原理
    - 后面的时间是指至少在这么久之后，执行回调函数
    - 当一个 setTimeout 调用的时候，可以说 scheduling a call
    - 此时 setTimeout() 会返回一个 id，
- 使用递归的 setTimeout 来替代 setInterval
    - setTimeout 能确保间隔
    - setInterval 会每隔100ms 执行回调，而不管你回调用时多久
- h5中规定，时间间隔至少是 4ms
- 关于 timer
    - 在创建的时候，就自动创建了一个 timer 开始在后台计时，
    - 可以理解为，设置了 delay 之后，那在 delay 之后推入队列