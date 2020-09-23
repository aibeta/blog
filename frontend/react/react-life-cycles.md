# React Life Cycles

### shouldComponentUpdate

如果返回false，那么在父组件的更新过程中，组件及其全部子元素的渲染方法不会调用，用于检查props 或者状态是否改变。

React.PureComponent 只在运行耗时太长的时候才用，是浅比较，就是如果props 每变，那么就不重新渲染

### shouldComponentUpdate

之前的 react 里面有。

```jsx
// 第二个参数是一个断言，返回false 就会 re-render，返回ture 不 render
const PureCat = memo(
  Cat,
  (prevProps, nextProps) => prevProps.name === nextProps.name
);
```