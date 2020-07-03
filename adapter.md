# Adapter

适配器把可以把一个类的接口转换为另一个类的接口，使不同的接口按照同样的方式工作。

接口指的是一个对象的属性和方法，适配器模式做的是接口转换的工作。

一个使用场景是程序做了重构的过程中改良了一些接口，但是旧的代码依然需要以前的接口。另一个场景是新的组件需要和以前旧的组件一起工作。

```javascript
class Shipping {
  calculate(zipStart, zipEnd, weight) {
    return '100'
  }
}

class AdvancedShipping {
  setStart(start) {}
  setDestination(destination) {}
  calculate(weight) {return '50'}
}

class ShippingAdapter {
  constructor() {
    this.shipping = new AdvancedShipping()
  }

  calculate(zipStart, zipEnd, weight) {
    this.shipping.setStart(zipStart)
    this.shipping.setDestination(zipEnd)
    return this.shipping.calculate(weight)
  }
}

function run() {
  const shipping = new Shipping();
  const old_fee = shipping.calculate('100010', '100088', '1kg')
  console.log(old_fee)
  const adapter = new ShippingAdapter();
  const new_fee = adapter.calculate('100010', '100088', '1kg')
  console.log(new_fee)
}
run()
```

## 提问

- 我们从后端获取到一些数据，写一个函数转换为组件需要的数据，是不是适配器模式？

不是，因为适配器其实是同样使用旧的接口的调用方式，但是实际调用的是新的接口。

### reference

- [adapter-design-pattern](https://www.dofactory.com/javascript/adapter-design-pattern)