# Typescript Type

## 基础概念

- compiler：parse text， transform it into an AST, then converts AST to a bytecode
- AST: a data structure that ignores things link whitespace..
- runtime：bytecode is evaluated by the runtime
- TSC：typescript compiler will do the typecheck

    <!-- ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f14c40c5-ec03-4a79-9541-c268e59d188d/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f14c40c5-ec03-4a79-9541-c268e59d188d/Untitled.png) -->

- 动态类型:JS 是动态类型的语言，就是说直到运行，才知道变量的类型
- 检测错误:  可以检测到的：语法、类型相关错误，不可检测：栈溢出、网络失败、用户输入

## 基本配置

- 初始化： ```typescript tslint```
- tslint : ./node_modules/.bin/tslint --init
- 执行tsc: ./node_modules/.bin/tsc
- tsconfig.json ： 每个项目必需的

## 基本类型

- value:type

```jsx
let a: number = 1
let b: string = 'hello'
let c: boolean[] = [true, false] // an array of booleans
```

<!-- ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2d01181e-7762-4b2f-bbda-4e57ef6682f3/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2d01181e-7762-4b2f-bbda-4e57ef6682f3/Untitled.png) -->

- any 是所有类型的父亲，当你不指定类型时，它是默认类型
- unknown 如果不知道一个value的类型，使用unknown，可以使用操作符（== === || && ? !）还有 typeof instance
- boolean 通常直接用 let a = true; 很少用 let a: boolean = true;
- number 使用 let a = 1;  ts 可以使用 let oneMillion = 1_000_000;
- bigint 可以使用 let a = 100n;
- void 是函数的返回类型，并不返回任何东西
- nerver 是函数的一种类型，表示从不返回，如常驻，抛异常等
nerver 是所有类型的子类型，never 类型可以安全的用在各个地方
- string

    ```jsx
    let a = 'hello'
    ```

- Symbol

    ```jsx
    let a = Symbol('a') 
    let b: symbol = Symbol('b') // 等价

    const e = Symbol('e');
    const f: unique symbol = Symbol('f'); // 等价
    // unique symbol 和自己相等，和其他unique symbol 不等type literals
    ```

- type literals

    ```jsx
    let a: true = true // 使用一个value 作为type，那么就把a的值限制为了true
    ```

- Object
- Object literal

    ```jsx
    let a:{b: number } = { b: 12}
    // let 和 const 定义对象的区别
    let c: {
      firstName: string
      lastName: string
    } = {
      firstName: 'john',
      lastName: 'barrowman'
    }

    class Person {
      constructor(
        public firstName: string,   // public is shorthand for
                                    // this.firstName = firstName
        public lastName: string
      ) {}
    }
    c = new Person('matt', 'smith') // OK
    ```

- optional

    ```jsx
    let a: {
    	c?: string // a 可能会有一个属性c 是string
    	[key: number]: boolean
    }
    ```

- optional parameters

    ```jsx
    function log(userId?:string) {
      console.log(userId || 'Not signed in')
    }
    ```

- index signature

    ```jsx
    // [key: T]: U 语法，
    // 告诉 ts 对象可能包含更多 keys，
    // 意思是：所有T 类型的key，必需是 U 类型的值，U 必须是数字或字符
    ```

- readonly

    ```jsx
    let user: {
    	readonly firstName: string
    }
    ```

- type aliases

    ```jsx
    // never inferred, 可以声明一种类型， 
    type Age = number;
    type Person = { name: string age: Age};
    ```

- 交与并

    ```jsx
    type Cat = {name: string, purrs: boolean}
    type Dog = {name: string, barks: boolean, wags: boolean}
    type CatOrDogOrBoth = Cat | Dog
    type CatAndDog = Cat & Dog
    ```

- Arrays

    ```jsx
    // 注意一些 infer，
    // 使用 const 的时候不会 hint to TypeScript to infer their types more narrowly
    let a = [1, 2, 3] // number[]
    var b = ['a', 'b'] // string[]
    let c: string[] = ['a'] // string[]
    let d = [1, 'a'] // (string | number)[]
    const e = [2, 'b'] // (string | number)[]
    let g = [] // any[]
    ```

- T[] 和 Array<T>效果一样
- Tuples

    ```jsx
    // 是数组的子类型，有固定长度的数组，声明时必需声明类型
    let a: [string, number] = ['a', 1]
    let tranainFares: [number, number?][] = [
    [3.7]
    [8.1, 8.2]
    ] // 也就是支持 optional
    let friends: [string, ... string[]] = ['a', 'b', 'c'] 也就是支持...最少一个
    ```

- read-only array

    ```jsx
    let as: readonly number = [1,2,3] // 只能用 concat slice 修改
    type A = readonly string[] // readonly string[]
    type B = ReadonlyArray<string> // readonly string[]
    type C = Readonly<string[]> // readonly string[]
    type D = readonly [number, string] // readonly [number, string]
    type E = Readonly<[number, string]> // readonly [number, string]
    ```

- enums

    ```jsx
    enum language = {
      English, // ts 会 infer 一个数字，等同于 English = 0
      Spanish,
      Russian
    } // 这个可以多次声明，支持声明的合并
    // 取出 enum  可以 Language.Russian 或者 Language['English']
    // 尽量不使用 const enum 声明

    ```

- function

    ```jsx
    // infer 的是括号后面的 number
    function add(a: number, b: number): number {
      return a + b
    }
    // default parameters
    function log(userId="Not signed in") {
      console.log(userId)
    } // 和上面的等价
    type Context = {
      userId?: string
    }
    function log(context: Context = {}) {
      console.log(context.userId)
    }
    // rest parameters
    function sumVariadicSafe(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0)
    }
    sumVariadicSafe(1, 2, 3) // evaluates to 6
    ```

- class

    ```jsx
    type Color = 'Black' | 'White'
    type File = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
    type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 1

    class Position {
      constructor(
        private file: File, 2
        private rank: Rank
      ) {}
    }

    class Piece {
      protected position: Position 3
      constructor(
        private readonly color: Color, 4
        file: File,
        rank: Rank
      ) {
        this.position = new Position(file, rank)
      }
    }
    ```

- IterableIterator

    ```jsx
    function* createNumbers(): IterableIterator<number> {
    let n = 0
    	while (1) {
    	yield n++
    	}
    }
    ```

- Symbol.iterator

    ```jsx
    任何对象都包含这个属性，它的值是个函数，返回iterator
    ```

- call signature

    ```jsx
    (a: number, b: number) ⇒ number // TS 中函数的类型是这样定义
    ```

- type-level

    ```jsx
    type Log = (message: string, userId?: string) => void
    let log: Log = ( 
      userId = 'Not signed in'
    ) => { 
      console.log(userId)
    }
    ```

- contextual typing

    ```jsx
    function times(
      f: (index: number) => void,
      n: number
    ) {
       for (let i = 0; i < n; i++) {
       f(i)
    }}
    ```

- overloaded function types

    ```jsx
    // Shorthand call signature
    type Log = (message: string, userId?: string) => void
    // Full call signature
    type Log = { (message: string, userId?: string): void }

    type Reserve = {
      (from: Date, to: Date, destination: string): Reservation
      (from: Date, destination: string): Reservation
    } 1

    let reserve: Reserve = (
      from: Date,
      toOrDestination: Date | string,
      destination?: string
    ) => { 2
      // ...
    }
    ```

### reference

- ts-node