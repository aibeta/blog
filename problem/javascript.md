# javascript 

### break

从 foreach 中 break, 在 forEach 的回调函数里 return ，就不再执行下面的操作，直接开始下一次回调。
1. 在一个循环或是其他函数中我们想要终止，总是可以抛出一个错误并接收。
2. 可以在中途修改源数组，让它不进行后面的回调，但是这样数组就变了。（http://t.cn/RPITrCu）

### 为什么在开发中不要使用 gif 图？ Gif 图片会占用大量的内存空间

### 怎么检测屏幕滚动到某个区域? 添加 event listener 去获取 window.scrollY 属性

### 兼容性：在安卓webview 里面setTimeout 没有生效，是因为客户端做了某种处理 pauseTimers() 但是重新启动的时候没有加上启用

### 怎么把一个长字符串转化为每隔20个字符的一个数组?  - 使用 substring, str.substring(0, 20);
数组移除一个指定索引的元素?array.splice(index, 1)

### clipboard 在弹窗的组件里不生效的问题.问题在于类名绑定错误了 调试的时候可以把 new 出来的 Clipboard 打印出来查看一下里面的 text 字段里有没有东西clipboard 自动 copy。由于安全性，浏览器禁止模拟的事件去操作用户的剪切板。所以必须用户去点击某个按钮才能触发。

### 【07-01】date.setTIme 之后，是返回新的date ，还是改变 date 本身.改变了 date 本身，同时返回改变后的自己

### 在 for ... in  中 return 会有什么效果

- for in (es5) 中不能 return，只能循环对象，循环出的是 key
- for of (es6) 循环出的是 value，不能循环对象，都不可以 return，但都可以 break 中止
- for…of语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句。

### 正则

1. 以 lux- 开头，跟上1个[w|h|m|p]，跟上0个或1个[l|t|r|b]，跟上1-3位数字，以空格结束不包括空格 /lux-[w|h|m|][l|t|r|b]?[1-9][0-9]?[0-9]?/

### match 

如果字符串匹配到了表达式，会返回一个数组，数组的第一项是进行匹配完整的字符串，之后的项是用圆括号捕获的结果。如果没有匹配到，返回null

