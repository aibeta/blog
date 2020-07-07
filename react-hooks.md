# React Hooks

## React hooks

- useEffect 调用的时候，DOM元素一定是已经更新过的
- 有经验的 JS 开发看出来了每一次传入 useEffect 的函数是不一样的，是为了避免拿到的 state 过期
- 意思就是每一个effect 都属于一个特定的 render
- useEffect 在调用的时候，不会阻止浏览器刷新 DOM
- 如果需要阻止，那么要使用 useLayoutEffect
- effect 可以return 一个函数，来进行 clean up
- react 会在unmount 这个组件的时候，执行 cleanUp 函数
- 忘记在 componentDidUpdate 处理是一个常见的错误来源。
- 但是 effect 在每一次的 render 后都会执行？，所以在每一次 render 时都会 clean up

## 在 componentDidUpdate 去获取 prevProps 和 prevState 与当前的作对比

- useEffect(()=>{}, [count]) 传入第二个参数，会在 count 改变的时候才执行 effect
- 注意，要让 [] 包含到所有使用到的 prop 和 state
- 传入空数组，那么 effect 只会执行一次，在 mount或者unmount？
- 空数组时，在 effect 里的 prop 和 state 都是初始值

## Hooks 规范

- 不能在循环，条件，nested functions 里使用
- Hooks 必须在组件的顶层使用
- 因为 hooks 是按照顺序来执行的

## 自定义 hooks

- 自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hooks
- 自定义 Hooks 是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，
- 每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的

## hook 的意义

- componentDidMount、componentDidUpdate 成对调用的东西只需要出现一次
- componentDidMount、componentWillUnmount 成对调用的东西只需要出现一次
- componentDidMount、componentDidUpdate 会阻止浏览器刷新 DOM

[Learn React Hooks](https://learning.oreilly.com/library/view/learn-react-hooks/9781838641443/)

[Learning React, 2nd Edition](https://learning.oreilly.com/library/view/learning-react-2nd/9781492051718/ch03.html#functional-programming-with-javascript)

- react 是创建view 的库
- react-dom 是在浏览器里render ui 的库

## React Elements

- 浏览器DOM 由DOM 元素组成，是一个真实的 DOM 元素
- React DOM 由 react 元素组成，是对于真实元素的描述

```jsx
// React 元素
React.createElement('h1', {id: 'myh1'}, "title")

//真实DOM
<h1 id="myh1">title</h1>
```

- 一个 react 元素只是一个literal，告诉React 如何构建DOM 元素，调用React.createElement 后返回的元素如下

```jsx
{
  $$typeof: Symbol(React.element),
  "type": "h1",
  "key": null,
  "ref": null,
  "props": {id: "myh1", children: "title"},
  "_owner": null,
  "_store": {}
}
```

## ReactDOM

创建完 react 元素后，ReactDOM 会把元素渲染到浏览器，我们会在它里面找到 render 方法

```jsx
const dish = React.createElement("h1", null, "Baked Salmon");

ReactDOM.render(dish, document.getElementById("root"));

// 也可以渲染多个元素
ReactDOM.render([dish, dessert], document.getElementById("root"));
```

创建元素

```jsx
//react 15 是 createClass 来创建元素的
//react 16
class IngredientsList extends React.Component {
  render() {
		return ...
	}
}
```

JSX

- 属性包括字符串和函数表达式，如果是表达式用{ }

Babel 

- 2015 年才正式命名
- 我们可以直接在html里引入 babel 的js，然后在script 标签加上 type="text/babel" 的属性，就可以转译jsx

### React fragment

```jsx
// 一个wrapper，<React.Fragment>
<>
      <h1>The cat's name is {name}</h1>
      <p>He's good.</p>
</>
```

如果要在js 中使用 jsx，那么必需引入React

```jsx
import React from "react";
import { render } from "react-dom";
import Menu from "./components/Menu";
import data from "./data/recipes.json";

render(<Menu recipes={data} />, document.getElementById("root"));
```

## 状态管理

### useState hook

useState 返回的是一个数组，可以使用数组结构，返的第一个值是state，第二个是个是个函数用于改变state，可以自由命名，这里我们称之为 setSelectedStar

```jsx
export default function StarRating({ totalStars = 5 }) {
  const [selectedStars, setSelectedStars] = useState(0);
  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => setSelectedStars(i + 1)}
        />
      ))}
      <p>
        {selectedStars} of {totalStars} stars
      </p>
    </>
  );
}
```

关于 hook 最重要的是 state 改变可以让 hooked 的元素 re-render，当我们执行 setSelectedStar 函数后，这个函数组件会通过 hook 重新执行，再次渲染，这一次里面的 selectedStar 是新的值

在react 16.8以前，改变state 的唯一方式是使用 class component，hooks 的设计是为了给函数组件增加 class 组件的功能

我们希望在一个地方存储state，而不是散落在各个组件里

### pure component

就是不包含state 的组件，依赖与传入的props。如果在组件里改变了DOM，那么称之为不受控制的组件。

### useRef hook

在react 里，ref 是一个mutable对象，存储一个组件一生内的值

```jsx
import React, { useRef } from "react";

export default function AddColorForm({ onNewColor = f => f }) {
  const txtTitle = useRef();
  const hexColor = useRef();

  const submit = e => { 
	// html forms 按钮的默认行为是
	// 向当前url 发送一个post 请求，
		e.preventDefault();
		const title = txtTitle.current.value;
		const color = hexColor.current.value;
		onNewColor(title, color);
		txtTitle.current.value = '';
		hexColor.current.value = '';
	}

  return (
		<form onSubmit={submit}>
      <input ref={txtTitle} type="text" placeholder="color title..." required />
      <input ref={hexColor} type="color" required />
      <button>ADD</button>
    </form>
)
}
```

### 可控组件

```jsx
import React, { useState } from "react";

export default function AddColorForm({ onNewColor = f => f }) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#000000");

	const submit = e => {
	  e.preventDefault();
	  onNewColor(title, color);
	  setTitle("");
	  setColor("");
	};

  return ( 
		<form onSubmit={submit}>
		  <input
		    value={title}
		    onChange={event => setTitle(event.target.value)}
		    type="text"
		    placeholder="color title..."
		    required
		  />
		  <input
		    value={color}
		    onChange={event => setColor(event.target.value)}
		    type="color"
		    required
		  />
		  <button>ADD</button>
		</form>
 );
}
```

### 自定义 hook

比如上面的 value={...} onChange={...} 我们可以自定义一个 useInput

```jsx
// 定义
import { useState } from "react";

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  return [
    { value, onChange: e => setValue(e.target.value) },
    () => setValue(initialValue)
  ];
};

// 使用
import React from "react";
import { useInput } from "./hooks";

export default function AddColorForm({ onNewColor = f => f }) {
  const [titleProps, resetTitle] = useInput("");
  const [colorProps, resetColor] = useInput("");

  const submit = event => {
	event.preventDefault();
  onNewColor(titleProps.value, colorProps.value);
  resetTitle();
  resetColor();
 }

  return ( 
<form onSubmit={submit}>
    <input
      {...titleProps}
      type="text"
      placeholder="color title..."
      required
    />
    <input {...colorProps} type="color" required />
    <button>ADD</button>
  </form>
);
 )
}
```

### React context

在上面看到的那样，函数通过 prop 一级一级向下传递不现实，所以要使用context provoider。它就像 a 和 b 两个地方铺设的机场，每个目的地都是一个 context consumer

```jsx
import React, { createContext } from "react";
import colors from "./color-data";
import { render } from "react-dom";
import App from "./App";

export const ColorContext = createContext();

render(
  <ColorContext.Provider value={{ colors }}>
    <App />
  </ColorContext.Provider>,
  document.getElementById("root")
);
```

通过 createContext 创建一个 context 实例，包含 provider 和 consumer 属性，

### useContext

取出上面的 color 数据

```jsx
import React, { useContext } from "react";
import { ColorContext } from "./";
import Color from "./Color";

export default function ColorList() {
  const { colors } = useContext(ColorContext);
  return (
    <div className="color-list">
      {colors.length === 0 ? (
        <p>No Colors Listed. (Add a Color)</p>
      ) : (
        colors.map(color => <Color key={color.id} {...color} />)
      )}
    </div>
  );
}
// 不使用 useCOntext
export default function ColorList() {
  return (
    <ColorContext.Consumer>
      {context => {
        return (
          <div className="color-list">
            {context.colors.length === 0 ? (
              <p>No Colors Listed. (Add a Color)</p>
            ) : (
              context.colors.map(color => <Color key={color.id} {...color} />)
            )}
          </div>
        )
      }}
    </ColorContext.Consumer>
  )
}
```

### 状态化的 context provider

```jsx
export const ColorProvider = ({ children }) => {
  const [colors, setColors] = useState(colorData);

  const addColor = (title, color) =>
    setColors([
      ...colors,
      {
        id: v4(),
        rating: 0,
        title,
        color
      }
    ]);

  const rateColor = (id, rating) =>
    setColors(
      colors.map(color => (color.id === id ? { ...color, rating } : color))
    );

  const removeColor = id => setColors(colors.filter(color => color.id !== id));

  return (
    <ColorContext.Provider value={{ colors, addColor, removeColor, rateColor }}>
      {children}
    </ColorContext.Provider>
  );
};
```

### 在 context 上的自定义 hook

```jsx
// 定义
import React, { createContext, useState, useContext } from "react";
import colorData from "./color-data.json";
import { v4 } from "uuid";

const ColorContext = createContext();
export const useColors = () => useContext(ColorContext);

// 使用
import React from "react";
import StarRating from "./StarRating";
import { useColors } from "./color-hooks";

export default function Color({ id, title, color, rating }) {
  const { rateColor, removeColor } = useColors();
  return (
    <section>
      <h1>{title}</h1>
      <button onClick={() => removeColor(id)}>X</button>
      <div style={{ height: 50, backgroundColor: color }} />
      <StarRating
        selectedStars={rating}
        onRate={rating => rateColor(id, rating)}
      />
    </section>
  );
}
```

## useEffect

使用 useEffect 意味着，

- 函数会在 render 之后被调用
- render 需要产生一些副作用，就是除了return 出来组件，还需要做点别的
- 比如alert/console/localStorage/textInput.current.focus
- 每一次状态改变 render组件，都会触发回调，因为 useEffect 每次都是unique的函数
- 可以视为，render 之后，我们可以在 useEffect 里面去查看和使用 render 的值

```jsx
useEffect(() => {
    alert(`checked: ${checked.toString()}`);
});
```

- 每一次 render，所有的effect 都会执行，如果我们不想所有effect都每次执行

```jsx
// state 变化后触发
useEffect(() => {
  console.log(`typing "${val}"`);
}, [val]);

useEffect(() => {
  console.log(`saved phrase: "${phrase}"`);
}, [phrase]);

// 第一次都会执行
typing ""                              // First Render
saved phrase: "example phrase"         // First Render
typing "S"                             // Second Render
typing "Sh"                            // Third Render
typing "Shr"                           // Fourth Render
typing "Shre"                          // Fifth Render
typing "Shred"                         // Sixth Render
typing ""                              // Seventh Render
saved phrase: "Shred"                  // Seventh Render

// 多个 state，那么任何一个变化都会触发
useEffect(() => {
  console.log("either val or phrase has changed");
}, [val, phrase]);

// 没有 state，就只在第一次render后执行一次
useEffect(() => {
  console.log("only once after initial render");
}, []);

// 如果返回了一个函数，那么会在组件从树上移除的时候被调用
useEffect(() => {
  welcomeChime.play();
  return () => goodbyeChime.play();
}, [])
```

- 一个订阅的应用

```jsx
const useJazzyNews = () => {
  const [posts, setPosts] = useState([]);
  const addPost = post => setPosts(allPosts => [post, ...allPosts]);

  useEffect(() => {
    newsFeed.subscribe(addPost);
    return () => newsFeed.unsubscribe(addPost);
  }, []);

  useEffect(() => {
    welcomeChime.play();
    return () => goodbyeChime.play();
  }, []);

  return posts;
}

function NewsFeed({ url }) {
  const posts = useJazzyNews();

  return (
    <>
      <h1>{posts.length} articles</h1>
      {posts.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </>
  );
}
```

## 深度检查依赖

- 创建一个hook，每次keydown，就 render

```jsx
const useAnyKeyToRender = () => {
  const [, forceRender] = useState();

  useEffect(() => {
    window.addEventListener("keydown", forceRender);
    return () => window.removeEventListener("keydown", forceRender);
  });
};
```

- 如果 useEffect dependenct 里面是个数组，那么每一次 render，都会重新触发

### useMemo hook

- 它会调用一个函数来计算一个可记忆的值，
- 与useEffect 类似，它需要一个 dependency 数组，如果不提供，会一直计算
- dependency 数组决定了，第一参数的那个回调什么时候才执行

```jsx
function WordCount({ children = "" }) {
  useAnyKeyToRender();

	// 如果没有这个，每次按键，useEffect 下面都会触发
  // 增加之后，之后在chidren 变化的时候才会触发
  const words = useMemo(() => children.split(" "), [children]);

  useEffect(() => {
    console.log("fresh render");
  }, [words]);

  return (...);
}
```

### renderLayoutEffect hook

如果某个 effect 对于浏览器 pain 是必须的，比如说，监听浏览器resize 去设置窗口宽高，还比如跟踪鼠标的位置

1. render
2. useLayoutEffect is called
3. BrowserPain: react 元素变成了DOM 元素
4. useEffect is called

### 使用hooks 的几个原则

- 只能在组件的function 作用域使用
- 比较复杂的使用多个 useEffect
- hooks 只能在函数作用域顶层被调用
- 如果要声明异步函数需要在 hooks 内部

```jsx
useEffect(() => {
  const fn = async () => {
    await SomePromise();
  };
  fn();
});
```

### useReducer hook

一个 reducer function，就是接收当前的状态，然后返回一个新的状态

```jsx
function Checkbox() {
  const [checked, toggle] = useReducer(checked => !checked, false);

  return (
    <>
      <input type="checkbox" value={checked} onChange={setChecked} />
      {checked ? "checked" : "not checked"}
    </>
  );
}

// 类似于 reducer，可以使用多个参数
function Numbers() {
  const [number, setNumber] = useReducer(
    (number, newNumber) => number + newNumber,
    0
  );

  return <h1 onClick={() => setNumber(30)}>{number}</h1>;
}
```

### useRef

- 可以用来出存储数据，它返回的是一个对象，有一个current 属性
- 可以用于定时器 timer

```jsx
import React, { useState, useEffect, useRef } from "react";
import { render } from "react-dom";

function Timer() {
  const [time, setTime] = useState(0);

  const interval = useRef();

  function changeTime() {
    setTime(time + 1);
  }

  useEffect(() => {
    interval.current = changeTime;
  });

  useEffect(() => {
    function getRefValue() {
      interval.current();
    }
    const timer = setInterval(getRefValue, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <h1>Seconds: {time}</h1>;
}

// 可以自定义一个hook
function useInterval(callback, delay) {
  const interval = useRef();

  useEffect(() => {
    interval.current = callback;
  }, [callback]);

  useEffect(() => {
    function getRefValue() {
      interval.current();
    }
    if (delay !== null) {
      let id = setInterval(getRefValue, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
```

## memo

我们不想每次都去re-render 一些 pure component，memo 函数可以创建一个组件，仅仅在属性变化的时候进行渲染 const PureCat = memo(Cat);

```jsx
// 第二个参数是一个断言，返回false 就会 re-render，返回ture 不 render
const PureCat = memo(
  Cat,
  (prevProps, nextProps) => prevProps.name === nextProps.name
);
```

- 之前的react 里面有 shouldComponentUpdate
- React.PureComponent 类似 React.memo 但是前面的是 class 组件的版本

## useCallback

```jsx
const PureCat = memo(Cat);
function App() {
	// 用于 memorize 函数属性，让他不变不引起 re-render
  const meow = useCallback(name => console.log(`${name} has meowed`, []);
  return <PureCat name="Biscuit" meow={meow} />
}
```

## raect profiler

用于性能的分析

- [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

## 组件

容器组件：how things work，fetch data，manage state

表象组件：how things look