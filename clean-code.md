# Clean Code

### 代码会一直存在

需要牢记的一点是，代码是需求的详细表述，只要需求存在，那么代码就会存在。

而糟糕的代码往往造成很多不好的后果，如果总想着以后优化，那就往往碰到 Leblanc 法则，以后，意味着没有以后。

在糟糕的代码基础上进行开发，往往意味着更严重的后果，会把生产效率越降越低。如果想要依赖项目重构，那么不仅影响业务，开发周期很长，而且往往无法实现。

不要总是责怪产品提出不合理的需求，开发者需要做的，是作出良好的系统设计，并让产品了解那些在可控范围里面，让他们意识到一些需求可能产生风险。

有一点抱怨是，时间太紧，所以只能写出糟糕的代码。富有经验的开发者应该意识到这是有逻辑问题的，事实是，烂代码不会让你更快！

拥有 【代码上的品味】是很重要的特质，有人天生就有，但大多数人需要练习获得。这种品味不仅仅让你知道什么是糟糕的代码，还知道它为什么糟糕，以及如何把它改为干净的代码。

### 干净的代码

引用 C++ 的发明者 Bjarne Stroustrup 的想法

> 我喜欢我的代码是优雅的、高效的，逻辑简单易懂所以错误很难藏身，依赖最小维护轻松，通过链式策略保持错误处理完整性，性能接近完美，所以那些看代码的人不会想去做出自以为是的优化。

干净的代码应***保持专注，***每个函数、类、模块应该实现一个目的，让心智不被多余的细节所分散。

引用 一个作者  Grady Booch 的想法

> 干净代码是简单直接的，读起来像是散文。干净的代码不会模糊设计者的意图，而是充满了精准的抽象和简单易懂的控制流。

当然读代码不会像是读指环王一样，这里只是给出了一个文学上的隐喻。精准的抽象意味着代码的读者能够感知到我们的决断。

再引用一个 Dave Thomas 的说法

> 干净的代码可以被其他的开发者所阅读和增强，它应该有单元测试，有意义的名字，只提供一个途径完成一个特定任务而不是提供很多途径。它有这最小的依赖，提供一个清晰的API，不需要多余的说明。

代码应该是易于让别人增强的，这对于团队合作很重要，也要了解代码易读和易于增强两者之间的不同。测试同样是十分重要的，没有任何测试的代码，应该属于不干净的。

Dave 还提出了代码应该是 literate 的，意思是代码应该被组织成一种易于阅读的形式。

引用一个 Michael Feathers 的话

> 干净代码能让你感觉到写的人是 care 的，对于维护的人来说，会深深地感激前人 care 他们的代码。

他的意思是代码应该得到精心的照顾，需要有人花时间让它简单有序，对细节投入足够的关注，真正的关心代码。

再看 Ron Jefferis 的说法

> 运行所有的测试、移除重复代码、表达出系统的设计思路、最小化类/方法/函数 的实体。在这其中，首先关注的是如何移除重复代码，其次是怎样更清晰地表达想法，所以需要逐步找到最精确的名字做表达。之后，所有的对象和方法，只做一件事。

所谓的移除重复和精准表达可能需要花费很多时间去更深的理解。举一个例子，在一个集合里找出一个元素，无论是哈希表还是数组，Ron 往往用抽象的方法或类来实现它。

再看看 Ward Cuningham 的说法

> 如果每一次阅读代码都会和你期望的一样，你会知道自己做的是干净的代码。代码很漂亮，看起来完美地表达了想要解决的问题。

Ward 的意思是在你边读代码可以边点头，嗯，写的真有节奏。等一下，代码和你期望的一样是什么意思，你还记得曾经看到一个模块表现是你期待的一样吗？还是说模块充满了迷惑、复杂、纠缠。

期待意味着不需要花费很多精力去理解。读的时候简单明了，每一步都告诉你接下来是什么。杰出的设计会让它看起来出人意料的简单。

有一条简单却无比有效的方法，就是所谓的童子军规：你走后的营地要比你到达时干净。

关于本书的作者的想法，会在后面章节进行说明。

### 人物背景

- Bjarne Stroustrup, inventor of C++ and author of The C++ Programming Language
- Grady Booch, author of Object Oriented Analysis and Design with Applications
- “Big” Dave Thomas, founder of OTI, godfather of the Eclipse strategy
- Michael Feathers, author of Working Effectively with Legacy Code
- Ron Jeffries, author of Extreme Programming Installed and Extreme Programming Adventures in C#
- Ward Cunningham, inventor of Wiki, inventor of Fit, coinventor of eXtreme Programming. Motive force behind Design Patterns. Smalltalk and OO thought leader. The godfather of all those who care about code.

### 使用目的明确的名字

好的名字会花费一些时间，但是是值得的，牢记那些阅读你代码的人会很开心的。

变量、函数、类的名字应该是在回答一个问题：它为什么存在、做了什么、怎么使用

```tsx
// bad
let d: number;
// good
let elapsedTimeInDays: number;
let daysSinceCreation: number;
let daysSinceModification: number;
let fileAgeInDays: number;
```

选择目的明确的代码更容易让人理解

```tsx
// bad
function getThem(): number[] {
	let list1: numnber[] = [];
	theList.forEach((d: number) => {
		if(d === 4) list1.push(x);
	})
	return list1;
}

// good
type Cell = {
	flag: boolean,
	isFlagged: () => boolean
}
type GameBoard = Cell[];

class CellCls implements Cell{
	constructor(flag: boolean) { 
		this.flag = flag;
	}
	flag: boolean
	isFlagged() { 
		return this.flag
	}
}
let gameBoard: GameBoard = []; 

function getFlaggedCells(): Cell[] {
	let flaggedCells: Cell[] = [];
	gameBoard.forEach((cell: Cell) => {
		if(cell.isFlagged()) flaggedCells.push(cell);
	})
	return flaggedCells;
}
```

### 使用可以发音的单词，不要随便缩写

```tsx
//bad 
class DtaRcd {
	genymdhms: Date
	/* … */
}
// good
class Customer {
	generationTimestamp: Date;
	/* … */
}
```

### 使用可以用于搜索的名字

单字母做名称，除了传统的循环里的 i/j/k ，其他时候尽量不要使用这些。

```tsx
// bad
for (int j=0; j<34; j++) {
     s += (t[j]*4)/5;
}
// good
let realDaysPerIdealDay = 4;
const WORK_DAYS_PER_WEAK = 5;
let sum = 0;
for (let j =0; j < NUMBER_OF_TASKS; j++ {
	let realTasksDays: number = taskEstimate[j] * realDaysPerIdealDay;
	let realTaskWeeks: number = (realdays / WORK_DAYS_PER_WEEK );
	sum += realTaskWeeks;
}
```

### 成员前缀

看的时间长了，脑海里会自动忽略掉前缀的。

```tsx
// bad
interface Part {
	m_desc: string	
}
//good
interface Part {
	description: string
}
```

### 一些原则

- 避免假情报，如果 accountList 不是一个 List，那么用 accounts 或者别的就好
- 不要用 a1，o1，l1 这种容易看错，又不明所以的命名
- 做出有意义的差别
    - 不要用 klass 和 class
    - 也不要用 a1 和 a2
    - 不要混用 ProductInfo 和 ProductData
    - 不要有不清楚的杂音 a、an、the 这样加在变量前面
    - money 和 moneyAccount、customer 和 customerInfo 都是易于混淆的
- interface 和 implementation
    - 此处作者建议 interface 不加修饰如 ShapeFactory，实现上使用 ShapeFactoryImp
- class 名
    - class 和 object 应该用名词，如 Customer、WikiPage、AddressParser
    - 内部避免使用 Manager、processor、data、info，class名不应该是个动词
- 方法名
    - 应该是一个动词或动词短语，postPayment、deletePage、save
    - 前缀可以使用 set、get、is

    ```tsx
    // bad
    let fulcrumPoint = new Complex(23.0)
    // good
    let fulcrumPoint = Complex.fromRealNumber(23.0);
    ```

- 为每个概念选一个单词
    - 比如说拉取数据，不要同时使用 fetch、get、retrieve
    - 也不要让 controller、manager、driver 表示一样的东西
- 不要双关
    - 一个单词应该代表特定的一个意思，比 add 更精确的是 insert、append
- 可以用解决方案命名
    - 比如AccountVisitor 意味着 visitor 模式
- 不要添加无意义的上下文，

### 添加有意义的上下文

- 比如说一个地址的 state，单独出现时不明所以，我们可以用 AddressState
- 更好方式是建立一个 Address 类

```tsx
// bad
function printGuessStatistics(candidate: string, count: number) {
	let num = '';
	let verb = '';
	let pluralModifier = '';
	if(count === 0) {
		num = 'no';
		verb  = 'are';
		pluralModifier = 's'
	} else {
		num = count.toString();
		verb  = 'are';
		pluralModifier = 's'
	}
	
	let guessMessage: string = `There ${verb} ${num} ${camdodate} ${pluralModifier} `
	console.log(guessMessage);
}
// good
class GuessStatistics {
	private num = '';
	private verb = '';
	private pluralModifier = '';

	private make(candidate: string, count: number) {
		this.createPluralDependentMessagePart(count);
		return `There ${this.verb} ${this.num} ${candidate} ${this.pluralModifier} `
	}

	private createPluralDependentMessagePart(count: number) {
	if (count == 0) {
       this.thereAreNoLetters();
	} else {
       this.thereAreManyLetters(count);
	}
	}
	private thereAreNoLetters() {
		this.num = "no";
    	this.verb = "are";
    	this.pluralModifier = "s";
	}	
	private thereAreManyLetters(count: number) {
		this.num = count.toString();
    	this.verb = "are";
    	this.pluralModifier = "s";
	}	
}
```

函数是一门语言的动词，类是名词，这不是类比，而是一个古老的事实。我们可以把编程当作一种语言的艺术，用简短明晰容易理解的过程，去告诉别人你是怎么解决问题的。

### Small

函数的第一规则是它要小，第二规则是比第一规则还用小。

### Blocks and indenting

函数不应该有很多层的结构，所以缩进应该是 1 到 2 个这样

### Do one thing

函数应该只做一件事，把这件事做好。Logo 语言用 To 来定义函数。

如果一个函数包含一些步骤，和函数名是同级的，那么它也是做了一件事。

另一个判断方法是，可以从中间抽取一个函数出去，当然这个抽取不能仅仅是当前实现的重述。

可以把一个函数分离成几块：声明、初始化、过滤(sieve)

### One Level Of Abstraction Per Function

我们需要确保在一个函数里面，是同一个等级的抽象。很容器区分出高级和低级的抽象，混合不同级的抽象往往会掩盖问题。

### The Stepdown rule

我们希望代码读起来像是从上到下的记叙文。每个函数里面都是同一层级的抽象，进入某个函数内部又是另一个层级的抽象。

```tsx
// To 实现a，我们需要做b，c，d
// To 实现b，我们需要做1，2，3
// To 实现1 ... 
```

让代码读起来像是从上到下的一系列的 to 段落，是保持抽象层级连贯性的高效的技巧。

### Switch 声明

```tsx
function calculatePay(e: Employee) {
     switch (e.type) {
       case COMMISSIONED:
         return calculateCommissionedPay(e);
       case HOURLY:
         return calculateHourlyPay(e);
       case SALARIED:
         return calculateSalariedPay(e);
       default:
         throw new InvalidEmployeeType(e.type);
     }
 }
```

这个代码违反了以下原则

- SRP 原则(single Responsibility Rule)
    - there is more than one reason for it to change
- OCP 原则(Open Closed Rule)
    - it must change whenever new types are added
    - 使用异常而不是错误代码，那么新的异常出现时，只是已有异常类的派生，那么可以被添加进入系统，而不是重新编译和的部署(java)

最关键的是，我们可能有其他相似的一些函数，内部必须要拥有相同的结构。

解决办法是使用抽象工厂模式，工厂会使用 switch 去创造 Emplyee 的派生的实例，比如 `calculatePay`，`isPayDay`,`deliveryPay`，这些函数会通过 Employee 接口进行多态地分发。

```tsx
interface Employee {
	isPayDay: () => boolean
	calculatePay: () => number
	deliveryPay: (money: number) => void
}
interface EmployeeFactory {
	makeEmployee: (r: EmplyeeRecord) => Employee
}

class EmployeeFactoryImpl implements EmplyeeFactory {
	makeEployee(r: EmplyeeRecord) {
		switch (r.type) {
			case COMMISSIONED:
	       return new CommissionedEmployee(r) ;
       case HOURLY:
	       return new HourlyEmployee(r);
       case SALARIED:
	       return new SalariedEmploye(r);
       default:
	       throw new InvalidEmployeeType(r.type);
		}
	}
}
```

### 使用详细名称

要更好地描述函数做了哪些事情，值得我们花时间，花很多时间。

一个很好的办法是写几个不同的名字，带入上下文，体会哪个更好。

短而清晰 > 长而清晰 > 短而不清晰。

保持一致性特别重要，对于相似的逻辑要使用相似的词汇，包括短语、名词、动词。

### 函数的参数

参数会需要我们理解，不便于测试，所以还是尽可能的少。

- niladic
- monadic
    - 应该尽可能地让目的清晰
    - 去返回一个值，而不是在内部修改这个 input 参数
    - always use the two forms in a consistent context
    - flag 非常不好，尽量不要给函数传入boolean
- dyadic
    - 在坐标点之类参数的可用
- triadic
    - 超过三个之后，我们考虑把参数封成一个对象
- polyadic
    - 很多个参数，那也可以使用列表

### Verbs and Keywords

- verb `writeField(name)`
- keywords `assertExpectedEqualsActual(expected, actual)` 减轻我们看  `assertEqual` 的负担

### 没有副作用

函数最好不要有副作用，如果有，那么要在命名中加以体现`checkPasswordAndInitializeSession`，否则的话，很容易掩盖问题，比如忘记初始化失败的问题。

### 命令和查询分离

函数要么是做了一些事，要么是查询了一些东西，而不是都做。所以，一个函数要么改变一个对象的状态，要么返回一个对象的一些信息。

### 使用异常抛出，而不是返回一个错误代码

在一个函数里面，返回错误代码，违反了我们上面的命令和查询分离的原则。

- 我们在每个函数内部进行 try catch 异常捕获
- 封装一个 logError 方法，去统一处理错误，这样不用每次console，减少认知成本
- 因为函数只做一件事的原则，所以如果有 try catch，那么应该是 try 开始，catch 结束

### 其他原则

- DRY 原则，不要重复自己，很多继承的出现就是为了减少重复代码
- 代码是逐步优化的，先按照自己的思路写，然后去按一定原则进行优化