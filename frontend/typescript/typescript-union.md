# Typescript Union

### union types

```tsx
// v1 string literal types
type Control = "Textbox";
let notes: Control;
notes = "Textbox"; // notes 不能是别的

// v2 可以增强
type Control = "Textbox" | "DropDown" | "DatePicker" | "NumberSlider";

// v3 差别的类型，都有 control

interface ITextbox {
  control: "Textbox";
  value: string;
  multiline: boolean;
}

interface IDatePicker {
  control: "DatePicker";
  value: Date;
}

interface INumberSlider {
  control: "NumberSlider";
  value: number;
}
// 这里 field 可以是任何一种
type Field = ITextbox | IDatePicker | INumberSlider;
// 这里进行初始化
function intializeValue(field: Field) {
  switch (field.control) {
    case "Textbox":
      field.value = "";
      break;
    case "DatePicker":
      field.value = new Date();
      break;
    case "NumberSlider":
      field.value = 0;
      break;
		// 这个default 其实是有价值的，如果新增 interface 的时候忘记了会提示错误
    default:
      const shouldNotReach: never = field;
  }
}

```

### type guards

允许我们根据分支代码收敛一个对象的特定类型

```tsx
function firstEnhanced(stringOrArray: StringOrStringArray): string {
  if (typeof stringOrArray === "string") {
    return stringOrArray.substr(0, 1);
  } else if (typeof stringOrArray === "object") { 
    return stringOrArray[0];
  } else {
    const shouldNotReach: never = stringOrArray;
  }
}

// 使用 instanceof 而不是 typeof
// 可以使用 in 关键字检测是否是特定属性
// if ("firstName" in personOrCompany)
// 还可以自定义 type guard
function isPerson(personOrCompany: PersonOrCompany): personOrCompany is IPerson {
  return "firstName" in personOrCompany;
}
```

### Generics 泛型

可以被应用到一个类或一个函数，是一个机制，使用<>来表示

```tsx
// T 来表示一个泛型
function getData<T>(url: string): Promise<T> {
	return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
```

consume 这个函数，我们向函数传递我们指定的类型，alveoli的化，是Iperson。此时 tsc 会提示后面 then 里面的 person 其实是 IPerson 类型，所谓的泛型函数就是拥有泛型的函数

```tsx
interface IPerson {
  id: number;
  name: string;
}

getData<IPerson>("/people/1")
	.then(person => console.log(person));
```

### 泛型类

可以让我们的类使用不同的类型，但是依然是type-safe

```tsx
class List<T> {
		private data: T[] = [];
		public getList(): T[] {
			return this.data;
		}
}

interface IPerson {
  id: number;
  name: string;
}
const billy: IPerson = { id: 1, name: "Billy" };

const people = new List<IPerson>();

people.add(billy);
```

react 的例子，React.component 拥有两个泛型的 props 和 state

```tsx
interface IProps { ... }
interface IState { ... }
class App extends React.Component<IProps, IState> {
  ...
}
```

### Overload signatures

允许一个函数被不同的签名调用

```tsx
function condense(string: string): string;
function condense(array: string[]): string[];
function condense(stringOrArray: string | string[]): string | string[] { 
  return '';
}
// 这个是合法的
```

### lookup and mapped types

keyof 关键字属性 typescript，创建一个对象所有属性的联合类型，这个类型叫lookup 类型，这可以让我们基于已经存在的类型动态创建类型

```tsx
interface IPerson {
  id: number;
  name: string;
}

// 等同于 type PersonProps = "id" || 'name'
type PersonProps = keyof IPerson;

// 增强一下
class Field<T, K extends keyof T> {
  name: K;
  label: string;
  defaultValue: any;
}

const idField: Field<IPerson, "id"> = new Field();
```
