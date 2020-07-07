# Es6plus

### es2020

1. Promise.allSettled 处理并发请求异常的问题
2. optional chain var name = user?.info?.name;
3. 空值合并运算符（Nullish coalescing Operator）var level = user.data?.level ?? '暂无等级';
4. dynamic-import
5. globalThis
6. BigInt var bigNumRet = 9007199254740993n + 9007199254740993n; // -> -> 18014398509481986n

### es2019

1. Array.prototype.flat() 数组降维
2. 新增了String的trimStart()方法和trimEnd()方法
3. Symbol.prototype.description 访问描述
4. Object.fromEntries()
5. String.prototype.matchAll
6. Function.prototype.toString()现在返回精确字符，包括空格和注释
7. 修改 catch 绑定 try {} catch {}

### es2018

1. 异步迭代
2. Promise.finally()
3. Rest/Spread 属性

### es2017

1. .Object.getOwnPropertyDescriptors()
   - 在ES8中String新增了两个实例函数String.prototype.padStart和String.prototype.padEnd
   - Object.entries()函数返回一个给定对象自身可枚举属性的键值对的数组。
   - Object.values()是一个与Object.keys()类似的新函数，但返回的是Object自身属性的所有值，不包括继承的值。
2. async/await

### es2016

1.Array.prototype.includes()

## refernce

- https://juejin.im/post/5ca2e1935188254416288eb2#heading-54
- https://juejin.im/post/5e57b6096fb9a07ccd518b35