# Typescript Generic

## 多态类型参数

```jsx
type Filter = (<T>(array: T(), f(item: T) ⇒ boolean): T[])
```

T的类型相当于我们目前还不知道，调用时绑定<> 符号用于定义 generic，视为 generic type，T 其实是只个类型名，多个的时候，也可以用U，V

```jsx
type Filter<T> = {
  (array: T[], f: (item: T) => boolean): T[]
}

let filter: Filter = (array, f) => // Error TS2314: Generic type 'Filter'
  // ...                           // requires 1 type argument(s).

type OtherFilter = Filter          // Error TS2314: Generic type 'Filter'
                                   // requires 1 type argument(s).

let filter: Filter<number> = (array, f) =>
  // ...

type StringFilter = Filter<string>
let stringFilter: StringFilter = (array, f) =>
  // ...
```

- 对于函数，调用是会固定 generic types
- 对于class，实例化会固定 generic types
- 对于 type alias 和 interface，是implement 的时候固定

```jsx
type Filter = { 1
  <T>(array: T[], f: (item: T) => boolean): T[]
}
let filter: Filter = // ...

type Filter<T> = { 2
  (array: T[], f: (item: T) => boolean): T[]
}
let filter: Filter<number> = // ...

type Filter = <T>(array: T[], f: (item: T) => boolean) => T[] 3
let filter: Filter = // ...

type Filter<T> = (array: T[], f: (item: T) => boolean) => T[] 4
let filter: Filter<string> = // ...

function filter<T>(array: T[], f: (item: T) => boolean): T[] { 5
  // ...
}
```

## Polymorphism

```jsx
function filter(array, f) {
  let result = []
  for (let i = 0; i < array.length; i++) {
    let item = array[i]
    if (f(item)) {
      result.push(item)
    }
  }
  return result
}

filter([1, 2, 3, 4], _ => _ < 3) // evaluates to [1, 2]

// 约为

type Filter = {
  (array: number[], f: (item: number) => boolean): number[]
}
```