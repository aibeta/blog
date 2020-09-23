# Promise Async

### promise

- promise 不是对回调对替代，而是在回调代码和将要执行这个任务的异步代码之间提供了一个可靠的中间机制来管理回调
- promise 决议只有两种：完成或者拒绝，完成最终值称为完成值，拒绝最终值称为原因
- 一旦promise 被决议，那么它就不会再发生改变

### new Promise

new Promise( (resolve, reject))，如果 resolve 传入另一个 promise，这个promise 就是采用传入的 promise 的状态

```jsx
var rej = new Promise((resolve, reject) => {
	reject(new Error('err'))
} );

var res = new Promise((resolve, reject) => {
	resolve(rej);
})

res; // Promise(<reject>)
```

### Promise.then

then(...) 接收一个或两个回调函数作为参数。第一个参数是完成决议的，第二个是拒绝决议的回调

### Promise.catch

catch(handleRejection) 就是 then(null, handleRejection) 的简写

then 和 catch 都会自动构造并返回另一个 promise 实例

### Promise.all([...])

- 可以接收一个或多个值的数组（比如：立即值、promise、thenable）返回一个promise
- 如果所有的值都是完成，那么它就是完成，返回数组，是所有完成的 promise 的值
- 一旦有一个被拒绝，那么它就是拒绝

### Promise.rece([...])

接收一个或多个值的数组，只要有一个决议成功，那么就返回决议成功的 promise

### 生成器+promise

yield 一个 promise 来恢复生成器，这样的模式很强大，语言会内置支持？

```jsx
step1()
.then(
	step2,
	step2Failed
)
.then(
	function(msg) {
		return Promise.all([
			step3a(msg),
			step3b(msg),
			step3c(msg),
		])
	}
)
.then(step4);

// 生成器方案

function *main() {
	var ret = yield step1();
	
	try{
		ret = step2(ret)
	}
	catch(err) {
		ret = yield step2Faile(err);
	}

	ret = yield Promise.all([
		step3a(msg),
		step3b(msg),
		step3c(msg),
	]);

	yield step4(ret);
}

// 我们需要一个运行生成器的运行器

function run(gen) {
	var args = [].slice.call(arguments, 1);
	var it = gen.apply(this, args);

	return Promise.resolve()
		.then(function handleNext(value ) {
			var next = it.next(value);
			
			return (function handleResult(next)) {
				if(next.done) {
					return next.value;
				}else {
					return Promise.resolve(next.value)
						.then(
							handleNext,
							function handleErr(err) {
								return Promise.resolve(
									it.throw(err)
								)
								.then(handleResult)
							}
						)
				}
			})
		})
}
```

## promise 和 回调的不同

- 回调本身表达的其实是一种控制反转。
- 回调表达异步和管理并发的两个缺陷是：缺乏顺序性和安全性。
- 回调可能出现的问题：调用过早/过晚/次数过多/过少/未能传递环境和参数/吞掉可能的错误或异常
- 我们用回调函数来封装程序中的 continuation，然后把回调交给第三方等待调用执行功能，比如JSONP，ajax callback
- Promise 是让第三方告诉我们任务何时结束
- 未来值: Promise 一旦被决议，那么就会永远保持这个状态。此时变为不变值(immutable vlaue)

### 3.1.2 完成事件

- then(...) 注册一个"fullfillment" 和 “rejection” 事件
- new Promise( function(...) {}) 传入的函数会立即执行
- then 中的回调其实是异步的

## 3.2 具有 then 方法的鸭子类型

- 判断一个值是不是 promise 不能使用 instance of，因为这个 promise 可能是从 ifame 中得到的。
- 鸭子类型(duck type)：如果它看起来像只鸭子、叫起来像只鸭子，那么它一定是只鸭子。
- 我们定义 thenable：一个方法或函数拥有 then 方法。那么他就是一个 promise

## 3.3 Promise 的信任问题

### 3.3.1 调用过早

- 一个任务有时同步完成，有时异步完成，可能会导致竞态条件
- 存在 Zalgo 副作用
- 但是立即完成的 Promise，比如 new Promise( function(resolve) { resolve(42); }) 也无法被同步观察到
    - new Promise( function(resolve) { console.log("1"); resolve(42); });console.log("2");
    - 为什么显示的是1.2，所说的同步观察是什么意思
- 对于一个 Promise 调用 then 方法的时候，即使这个 Promise 已经被决议，那么提供给 then 的回调也是异步调用的

### Promise 问题

- promise.catch(onRejected).catch() 第二个 catch 在什么情况下会触发
    - 在第一个 catch 里的 onRejected 发生错误的时候会触发
- promise.then(onFulfilled, onRejected).catch() catch 在什么情况话会触发
    - 在 then 方法里的 onRejected 发生错误时触发
- promise.then(null, onReject) 和 promise.catch() 有区别吗
    - 没有区别
- 注意 .then(onFulfilled, onRejected) 和 .then(onFulfilled).then(null, onRejected) 和 .then(onFulfilled).catch(onRejected) 区别
    - 第二个和第三个没区别，第一个不能捕捉到 onFulfilled 中的错误
- promise 是异步的还是同步的
    - 异步调用的
- promise 除了 resolve reject 还有 pending，那么 pending 是什么
    - promise对象刚被创建后的初始化状态
- 为什么不要对异步函数进行同步调用
    - 如果对异步回调函数进行同步调用的话，处理顺序可能会与预期不符，可能带来意料之外的后果。
    - 对异步回调函数进行同步调用，还可能导致栈溢出或异常处理错乱等问题。
    - 如果想在将来某时刻调用异步回调函数的话，可以使用 setTimeout 等异步API。
- then() 中如果有返回值，那么该值会被 promise 化吗
    - 每次调用then都会返回一个新创建的promise对象
- Promise.all 的接收值和返回值分别是什么
    - 接收一个 promise对象的数组作为参数，当这个数组里的所有promise对象全部变为resolve或reject状态的时候，会被决议，返回一个被决议的数组
- Promise.race 的接收值和返回值分别是什么
    - 接收一个 promise对象的数组作为参数，当这个数组里只要有一个 promise对象变为resolve或reject状态的时候，会被决议，返回一个被决议的值
    - Promise.race 在第一个promise对象变为Fulfilled之后，并不会取消其他promise对象的执行。
- Promise.resolve(thenable) 是一个比较重要的概念
- Promise.reject(42).then().then().catch(e=>console.log(e))
    - Promise 被决议之后，会执行 promise chain 中第一个 onFulfilled 或 onRejected
- let promise = Promise.resolve(Date.now()); promise.then(res=>console.log(res)) //repeat
    - promise 一点被决议就不会再改变，除非你重新创建一个 promise

定制Error对象

1. Error 对象是ECMAScript的内建（build in）对象。
2. 怎样定制一个类型的错误

Deferred

1. Deferred 拥有 Promise
2. Deferred 具备对 Promise的状态进行操作的特权方法
3. Promise代表了一个对象，这个对象的状态现在还不确定，但是未来一个时间点它的状态要么变为正常值（FulFilled），要么变为异常值（Rejected）；而Deferred对象表示了一个处理还没有结束的这种事实，在它的处理结束的时候，可以通过Promise来取得处理结果。

## Promise

- new Promise((resolve, reject)=>{})
- promise 有三种状态：resolve,reject,pending
- Promise#catch 只是 promise.then(undefined, onRejected) 的一个别名，是等价的
- Promise在规范上规定 Promise只能使用异步调用方式 。
- Promise.resolve(42)，可以认为是以下代码的语法糖，用于 Promise 对象的初始化或者编写测试代码，reject 也同理。

```
new Promise(function(resolve){
    resolve(42);
});

```

- Promise.then 中指定的方法调用是异步进行的

```
var promise = new Promise(function (resolve){
    console.log("inner promise"); // 1
    resolve(42);
});
promise.then(function(value){
    console.log(value); // 3
});
console.log("outer promise"); // 2

inner promise // 1
outer promise // 2
42            // 3

```

- return的值会由 Promise.resolve(return的返回值); 进行相应的包装处理，因此不管回调函数中会返回一个什么样的值，最终 then 的结果都是返回一个新创建的promise对象。

```
function doubleUp(value) {
    return value * 2;
}
function increment(value) {
    return value + 1;
}
function output(value) {
    console.log(value);// => (1 + 1) * 2
}

var promise = Promise.resolve(1);
promise
    .then(increment)
    .then(doubleUp)
    .then(output)
    .catch(function(error){
        // promise chain中出现异常的时候会被调用
        console.error(error);
    });

```

- 从代码上乍一看， aPromise.then(...).catch(...) 像是针对最初的 aPromise 对象进行了一连串的方法链调用。然而实际上不管是 then 还是 catch 方法调用，都返回了一个新的promise对象

```
// 1: 对同一个promise对象同时调用 `then` 方法
var aPromise = new Promise(function (resolve) {
    resolve(100);
});
aPromise.then(function (value) {
    return value * 2;
});
aPromise.then(function (value) {
    return value * 2;
});
aPromise.then(function (value) {
    console.log("1: " + value); // => 100
})

// vs

// 2: 对 `then` 进行 promise chain 方式进行调用
var bPromise = new Promise(function (resolve) {
    resolve(100);
});
bPromise.then(function (value) {
    return value * 2;
}).then(function (value) {
    return value * 2;
}).then(function (value) {
    console.log("2: " + value); // => 100 * 2 * 2
});

```

## 问题

- promise.then().catch().then().then().catch()
- then(onFulfilled, onReject) 和 catch(onReject) 的区别
- 如果在 onReject 中接收了错误，那么后面的 catch 就捕捉不到了

```
new Promise((resolve,reject)=>{reject(1)}).then(,(n)=>{console.log(n)})
```