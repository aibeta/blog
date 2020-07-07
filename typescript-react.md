# Typescript React

```typescript
// DOM API
type CreateElement = {
  (tag: 'a'): HTMLAnchorElement 1
  (tag: 'canvas'): HTMLCanvasElement
  (tag: 'table'): HTMLTableElement
  (tag: string): HTMLElement 2
}

let createElement: CreateElement = (tag: string): HTMLElement => { 3
  // ...
}
```

[https://learning.oreilly.com/library/view/learn-react-with/9781789610253/9702e563-55a7-4450-aacd-190e2109de84.xhtml](https://learning.oreilly.com/library/view/learn-react-with/9781789610253/9702e563-55a7-4450-aacd-190e2109de84.xhtml)

### type

- let flag; // 这里就是 any 类型
- void 类型，用于无返回的函数
- never 类型，用于while(true) 类型
- enum 类型

    ```jsx
    enum status {
    	paid,
    	shipped,
    	completed
    }
    let order = status.paid;
    ```

- 数组类型

    ```jsx
    const numbers: number[] = [];
    ```

- object 类型非常灵活，和上面的定义方式不一样
- interface 是一个约定，定义了一组属性和方法 interface a {}
- 属性是 interface 的一部分，也可以是另一个 interface
- 方法，只是定义了方法的 signature

    ```jsx
    interface orderDetail {
      getTotal(discount: number): number;
    	// 注意，上面的参数名称其实无影响，等于下面的
      // 但是缺少了名称，会造成困惑，不知道是干啥的
      getTotal(number): number;	
    }
    ```

### 可选属性和参数

```jsx
interface orderDetail {
  dateAdded?: Date,
  getTotal(discount?: number): number;	
}
```

### readonly 参数

```jsx
interface Product {
  readonly name: string;
}
```

### 继承 interface

```jsx
interface Product {
  name: string;
  unitPrice: number;
}

interface DiscountCode {
  code: string;
  percentage: number;
}

interface ProductWithDiscountCodes extends Product {
  discountCodes: DiscountCode[];
}
```

### type aliases，使用 type 关键字，给一个类型一个新名字

```typescript
type GetTotal = (discount: number) => number;

// 可以类似 interface，但不不能被继承
type orderDerail {
  getTotal: GetTotal
}
```

### basic class

```typescript
// 可以使用 class 定义类型
class Product {
  name: string;
  unitPrice: number;
}

// class 定义的interface，可以实例化
const table = new Product();
```

### implements 我们可以一起使用 class 和 interface

    ```typescript
    // 指定一个 class 实现一个特定接口
    // 用处在于针对一个 interface 的多个实现

    interface IOrderDetail {
      product: Product;
      quantity: number;
      getTotal(discount: number): number;
    }

    class OrderDetail implements IOrderDetail {
      product: Product;
      quantity: number;

      getTotal(discount: number): number {
        const priceWithoutDiscount = this.product.unitPrice *  
         this.quantity;
        const discountAmount = priceWithoutDiscount * discount;
        return priceWithoutDiscount - discountAmount;
      }
    }
    ```

### constructors，函数们，用于实例化一个 class

```typescript
class OrderDetail implements IOrderDetail {
  product: Product;  (2)
  quantity: number;  (2)

  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }

  getTotal(discount: number): number {
    ...
  }
}

// 使用public， 就可以省略 2 里的代码
constructor(public product: Product, public quantity: number = 1) {
```

### extend 类，类似 interface 的继承

```typescript
// 如果父类有构造函数，那么需要在子类里 super() 来传入构造函数的参数
class Product {
  constructor(public name: string, public unitPrice: number) {
  }
}

interface DiscountCode {
  code: string;
  percentage: number;
}

class ProductWithDiscountCodes extends Product {
  constructor(public name: string, public unitPrice: number) {
    super(name, unitPrice);
  }
  discountCodes: DiscountCode[];
}
```

### abstract class 是 class 的一种特殊类型，可以继承，但不可以实例化，但是继承它的子类是可以实例化的

```typescript
abstract class Product {
  name: string;
  unitPrice: number;
  // 抽象类可以有抽象方法，子类必须自己实现
  abstract delete(): void;
}

class Food extends Product {
  deleted: boolean;
  
  constructor(public bestBefore: Date) {
    super();
  }
  
  delete() {
    this.deleted = false;
  }
}
```

### private，只允许在 class 的内部交互，不能在 class 实例和子类里交互

```typescript
class OrderDetail {
  public product: Product;
  private deleted: boolean;

  public delete(): void {
    this.deleted = true;
  }
}
```

### 属性的 setter 和 getter，使用 set 和 get 关键字

```typescript
class Product {
  name: string;

  private _unitPrice: number;
  get unitPrice(): number {
    return this._unitPrice || 0;
  }
  set unitPrice(value: number) {
    if (value < 0) {
      value = 0;
    }
    this._unitPrice = value;
  }
}
```

### static，静态的属性和方法，只是在 class 里持有，在实例里不持有，使用 static 关键字

```typescript
// 所以不能在 static 的方法里使用 this 关键字

static getTotal(unitPrice: number, quantity: number, discount: number): number {
  const priceWithoutDiscount = unitPrice * quantity;
  const discountAmount = priceWithoutDiscount * discount;
  return priceWithoutDiscount - discountAmount;
}
```

### export

```typescript
// import { Product } from "./product";

// v1
export interface Product {
  name: string;
  unitPrice: number;
}

// v2
interface Product {
  name: string;
  unitPrice: number;
}
export { Product }
```

### tsc 可选参数

- tsc order - - target  es6 编译到指定 Ecmascript 版本
- tsc orderDetail --outDir dist 指定目录
- tsc orderDetail --module 指定的模块格式，默认是 commonJS
- tsc orderDetail --allowJS 告诉tsc 也去处理 js
- tsc orderDetail --watch 动态
- noImplicitAny 强制所有参数都要指定类型
- noImplicitReturns 确保函数返回的不是 void
- sourceMap 生成 .map 文件
- ts.config

  ```typescript
  {
    "compilerOptions": {
      ...
    },
    "files": ["product.ts", "orderDetail.ts"]
    "include": ["src/**/*"]
  }
  ```

- tslint
  - tslint.json

  ```typescript
  {
    "extends": ["tslint:recommended"],
    "rules": {
      "member-access": true
    },
    "linterOptions": {
      "exclude": ["node_modules/**/*.ts"]
      }
  }
  ```

### typescript 3

- tuples，固定长度的数组

  ```typescript
  // v1
  let product: [string, number];

  // v2 不固定长度
  type scores = [string , ...number[]];
  const billyScores: Scores = ["Billy", 60, 70, 75];

  // v3 ??
  type Scores = [string, ...number[]];
  function logNameAndScores(...scores: Scores) {
    console.log(scores);
  }

  // v4，可选的元素
  type Scores = [number, number?, number?];- unkown 
  ```

- unknown

  ```typescript
  type Scores = { name: string; scores: number[] }

  const scoresCheck = ( scores: any ): scores is Scores => {
    return "name" in scores && "scores" in scores;
  };
  ```

- type 断言
- typescript 3 支持一个前端项目和一个后端项目公用另一个项目的代码

  ```typescript
  {
    "compilerOptions": {
      "composite": true,
      "declaration": true,
      "declarationMap": true,
      ...
    },
  }
  ```

- 默认 jsx 属性
- 默认 tsconfig.json

  ```typescript
  { 
    "compilerOptions": { 
      "target": "es5", 
      "module": "es6", 
      "moduleResolution": "node", 
      "lib": ["es6", "dom"],
      "sourceMap": true, 
      "jsx": "react", 
      "strict": true, 
      "noImplicitReturns": true,
      "rootDir": "src",
      "outDir": "dist",
    },
    "include": ["**/*.ts", "**/*.typescript"],
    "exclude": ["node_modules"]
  }
  ```

- 默认 telint.json

  ```typescript
  {
    "extends": ["tslint:recommended", "tslint-react", "tslint-config-prettier"],
    "linterOptions": {
      "exclude": ["node_modules/**/*.ts"]
    }
  }
  ```

## React

- 创建组件，index.typescript，React.SFC 是没有任何内部state 的react 组件

  ```typescript
  import * as React from "react";

  const App: React.SFC = () => {
    return <h1>My React App!</h1>;
  };
  ```

- 组件属性

  ```typescript
  interface IProps {
    title: string;
    content: string;
    cancelCaption?: string; // 可选属性
    onOkClick: () => void; // 函数属性
  }

  // react.component 是一个 generic class
  // generic class 允许类内部的类型传入
  // 这里我们传入类 IProps 的 interface
  class Confirm extends React.Component<IProps>
  ```

- 默认属性

  ```typescript
  class Confirm extends React.Component<IProps> {
    public static defaultProps = {
      cancelCaption: "Cancel",
      okCaption: "Okay"
    };
    public render() { ... }
  }
  ```

- 状态类型

  ```typescript
  interface IState {
    confirmOpen: boolean;
  }

  class App extends React.Component<{}, IState>
  // {} 用于属性 props
  // Istate 用于 state

  // 初始化状态
  constructor(props: {}) {
    super(props);
    this.state = {
    confirmOpen: true,
    };
  }
  ```

- 生命周期

<!-- ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7cffaa21-be3c-4f19-92cb-a27c13a376f5/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7cffaa21-be3c-4f19-92cb-a27c13a376f5/Untitled.png) -->

- getDerivedStateFromProps，每次组件 re-render 都会触发，当props 改变时触发用于修改 state
- getSnapshotBeforeUpdate 在 DOM 更新之前触发，
- componentDidUpdate 则是在 DOM 更新之后，可以接收上面返回的值

```typescript
public static getDerivedStateFromProps(props: {}, state: IState) {
  console.log("getDerivedStateFromProps", props, state);
  return null;
}

public getSnapshotBeforeUpdate(prevProps: {}, prevState: IState) {
  // 会传递给componentDidUpdate
  return 1;
}

public componentDidUpdate(prevProps: {}, prevState: IState, snapshot: number) {
}

public shouldComponentUpdate(nextProps: {}, nextState: IState) {
  console.log("shouldComponentUpdate", nextProps, nextState);
  return true;
}
```

- shouldComponentUpdate 在render 发生之前触发，返回一个断言，确定是否render
- SFC stateless functional component，下面是一个函数组件的模板

```typescript
import * as React from "react";

const ComponentName: React.SFC<IProps> = props => {
  const handler = () => {
  ...
  };

  return ( <div>Our JSX</div> );
};
ComponentName.defaultProps = {
  ...
};

export default ComponentName;
```

- stateful function components，有状态的函数组件，使用 useState

```typescript
const Confirm: React.SFC<IProps> = props => {

  const [cancelClickCount, setCancelClickCount] = React.useState(0);

  const handleOkClick = () => {
    props.onOkClick();
  };
  ...
}
```
