# Typescript Diffence

### 1. typescript 里面都有哪些 js 中没有的类型？

```javascript
any：可以是任何类型
unknown：不清楚它的类型
void：函数的一种返回类型，表示不返回任何东西
never：函数的一种返回类型，表示从不返回，如常驻
enum: number 和 string
enum language = {
	English
}
Tuples: 表示固定长度的数组
let a: [string, number] = ['a', 1]
```

### 2. typescript type 和 interface 的区别?

```typescript
// 1. 都可以描述一个对象或者函数
interface User {
  name: string
  age: number
}
interface SetUser {
  (name: string, age: number): void;
}
type User = {
  name: string
  age: number
};

type SetUser = (name: string, age: number)=> void;
// 2. 都可以扩展
interface Name {
  name: string;
}
interface User extends Name {
  age: number;
}
type Name = {
  name: string;
}
type User = Name & { age: number  };
```

差异：

1. type 可以声明联合类型、元祖 `type union = Number | String; type PetList = [Dog, Pet]`
2. interface 多个声明会合并

### reference

- https://juejin.im/post/5c2723635188252d1d34dc7d
