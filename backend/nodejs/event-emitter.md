# Event Emitter

### EventEmitter

NodeJS 里有一个 EventEmitter 类，可以允许我们注册一个或多个 function 作为 listener。

```jsx
const { EventEmitter } = require("events");
const eeInstance = new EventEmitter();

几个方法
// .on(event, listener) 注册 listener
// .once(event, listener) 注册后，触发一次后移除
// .emit(event, [arg1], [...]) 触发监听者，并传入参数
// .removeListenr(event, listener)
```

可以看一个例子

```jsx
const EventEmitter = require('events').EventEmitter; 
const fs = require('fs'); 
 
function findPattern(files, regex) { 
  const emitter = new EventEmitter(); 
  files.forEach(function(file) { 
    fs.readFile(file, 'utf8', (err, content) => { 
      if(err) 
        return emitter.emit('error', err); 
 
      emitter.emit('fileread', file); 
      let match; 
      if(match = content.match(regex)) 
        match.forEach(elem => emitter.emit('found', file, elem)); 
    }); 
  }); 
  return emitter; 
}

// use
findPattern( 
    ['fileA.txt', 'fileB.json'], 
    /hello \w+/g 
  ) 
  .on('fileread', file => console.log(file + ' was read')) 
  .on('found', (file, match) => console.log('Matched "' + match + 
    '" in file ' + file)) 
  .on('error', err => console.log('Error emitted: ' + err.message));
```

使用类改写这个例子，实现让一个对象是 Observable 的

```jsx
const EventEmitter = require('events').EventEmitter; 
const fs = require('fs'); 
 
class FindPattern extends EventEmitter { 
  constructor (regex) { 
    super(); 
    this.regex = regex; 
    this.files = []; 
  } 
 
  addFile (file) { 
    this.files.push(file); 
    return this; 
  } 
 
  find () { 
    this.files.forEach( file => { 
      fs.readFile(file, 'utf8', (err, content) => { 
        if (err) { 
          return this.emit('error', err); 
        } 
 
        this.emit('fileread', file); 
 
        let match = null;
        if (match = content.match(this.regex)) {
          match.forEach(elem => this.emit('found', file, elem));
        }
      }); 
    }); 
    return this; 
  } 
}

// use
const findPatternObject = new FindPattern(/hello \w+/); 
findPatternObject 
  .addFile('fileA.txt') 
  .addFile('fileB.json') 
  .find() 
  .on('found', (file, match) => console.log(`Matched "${match}" 
    in file ${file}`)) 
  .on('error', err => console.log(`Error emitted ${err.message}`));
```

像回调一样，事件可以被同步或者异步的 emitted。（什么意思）

重要的一点是，在同一个 eventEmitter 里面，我们不要混合这两种。emmitted 同步和异步事件的区别在于 listener 注册的方式。如果事件是异步地 emitted，程序在 eventmitter 初始化后，还可以注册新的 listener，因为事件在下一次 event loop 之前是一定不会 fired，上面的findPattern() 函数就是完美的例子。

相反，如果同步地 emitt 事件，需要在 EventEmitter 函数开始 emit 任何事件之前就注册了所有的listener。

```jsx
const EventEmitter = require('events').EventEmitter; 
 
class SyncEmit extends EventEmitter { 
  constructor() { 
    super(); 
    this.emit('ready'); 
  } 
} 
 
const syncEmit = new SyncEmit(); 
// 这里的 emit 是同步的，所以下面一行不会到达
syncEmit.on('ready', () => console.log('Object is ready to be  used'));
```

- 相比回调，eventemitter 可以监听多种事件，注册多个listener
- 可以把这两者结合起来，在一些情况下很有用
- 有一个包 glob，用于glob的文件搜索

```jsx
const glob = require('glob'); 
glob('data/*.txt', (error, files) => console.log(`All files found: 
  ${JSON.stringify(files)}`)) 
  .on('match', match => console.log(`Match found: ${match}`));
```

### reference

- [https://learning.oreilly.com/library/view/nodejs-design-patterns/9781785885587/ch02s03.html](https://learning.oreilly.com/library/view/nodejs-design-patterns/9781785885587/ch02s03.html)