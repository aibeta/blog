# Strategy

针对一个给定任务，策略模式提供了几个不同的策略或者算法，以便于根据不同的需要执行不同的策略。在js中，策略模式被广泛地用于扩展某个框架的插件。

- 策略模式由两部分构成，一个是策略，一个是context。
- 策略模式的核心是，类的行为在运行时可以更换策略。

可以看到下面的示例，我们想要计算不同快递公司的费用。那么

- context： 定义一个快递公司的类就是context，里面有设置策略和计算两个方法，可以更改当前策略和调用策略
- 策略：定义的 SF 和 ZT 类就是我们的策略

```javascript
class Express() {
    constructor() {
        this.company = ""
    }
    setStrategy(strategy) {
        this.company = strategy
    }
    calculate() {
        return this.company.calculate
    }
}

class SF() {
    calculate() {
        return 100
    }
}

class ZT() {
    calculate() {
        return 50
    }
}

function run() {
    const sf = new SF()
    const zt = new ZT()
    const express = new Express()

    express.setStrategy(sf)
    const SF_fee = express.calculate()
    express.setStrategy(zt)
    const ZT_fee = express.calculate()
}

run()
```

### 提问

- 用户的表单校验是利用了策略模式吗？

### reference

- [strategy-design-pattern](https://www.dofactory.com/javascript/strategy-design-pattern)