# Vue Responsive

vue 实例里面的 data 属性会变成 obsevable 的，通过给所有的属性加上 setter 和 getter 来实现。

```jsx
// 这里会让 data 对象里所有的属性在 set 的时候调用 cb，也就是 render
function observe(value, cb) {
    Object.keys(value).forEach((key) => defineReactive(value, key, value[key] , cb))
}

function defineReactive (obj, key, val, cb) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: ()=>{
            /*....依赖收集等....*/
            /*Github:https://github.com/answershuto*/
            return val
        },
        set:newVal=> {
            val = newVal;
            cb();/*订阅者收到消息的回调*/
        }
    })
}

class Vue {
    constructor(options) {
        this._data = options.data;
				// 在实例化的时候
        observe(this._data, options.render)
    }
}

let app = new Vue({
    el: '#app',
    data: {
        text: 'text',
        text2: 'text2'
    },
    render(){
        console.log("render");
    }
})
```

因为数据绑定在 app._text 下，所以使用代理，使得 app.text 可以直接使用。

```jsx
_proxy.call(this, options.data);/*构造函数中*/

/*代理*/
function _proxy (data) {
    const that = this;
    Object.keys(data).forEach(key => {
        Object.defineProperty(that, key, {
            configurable: true,
            enumerable: true,
            get: function proxyGetter () {
                return that._data[key];
            },
            set: function proxySetter (val) {
                that._data[key] = val;
            }
        })
    });
}
```

## 依赖收集

有一部分数据改变不需要重新 render，所以我们需要收集那些在 render 里出现的data。

### Dep

Dep 是一个类，是依赖收集的核心

- 有属性 subs<Watcher[]> ，
- 全局属性 Dep.target: null | Watcher 指向的是一个
- 有 addSub, removeSub 方法可以添加和移除watcher
- 有 depend 方法
- 有 notify 方法，调用时会调用 subs 里面所有 watcher 的 update 方法

### Watcher

在 mountComponent 的时候会实例化一个渲染watcher，在watch 的回调中传入 updateComponent 方法。在此方法中调用 vm._render 方法先生成虚拟 Node，最终调用 vm._update 更新 DOM

```jsx
updateComponent = () => {
    vm._update(vm._render(), hydrating)
}

new Watcher(vm, updateComponent, noop, {
  before () {
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate')
    }
  }
}, true /* isRenderWatcher */)
```

watcher 是一个订阅者，修改 data 数据会触发 dep 对象中的notify，通知 watcher 去修改对应视图

- 有 deps<Dep[]> newDeps<Dep[]>属性
- 有depIds<Set> newDepIds<Set> 属性
- get
- addDep
- cleanupDep

```jsx
class Dep() {
		constructor () {
        this.subs = [];
    }

    addSub (sub: Watcher) {
        this.subs.push(sub)
    }

    removeSub (sub: Watcher) {
        remove(this.subs, sub)
    }
    /*Github:https://github.com/answershuto*/
    notify () {
        // stabilize the subscriber list first
        const subs = this.subs.slice()
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }
    }
}

function remove (arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
    }
}

class Watcher {
    constructor (vm, expOrFn, cb, options) {
        this.cb = cb;
        this.vm = vm;

        /*在这里将观察者本身赋值给全局的target，只有被target标记过的才会进行依赖收集*/
        Dep.target = this;
        /*Github:https://github.com/answershuto*/
        /*触发渲染操作进行依赖收集*/
        this.cb.call(this.vm);
    }

    update () {
        this.cb.call(this.vm);
    }
}

class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data, options.render);
        let watcher = new Watcher(this, );
    }
}

function defineReactive (obj, key, val, cb) {
    /*在闭包内存储一个Dep对象*/
    const dep = new Dep();

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: ()=>{
            if (Dep.target) {
                /*Watcher对象存在全局的Dep.target中*/
                dep.addSub(Dep.target);
            }
        },
        set:newVal=> {
            /*只有之前addSub中的函数才会触发*/
            dep.notify();
        }
    })
}

Dep.target = null;
```

### reference

- [https://github.com/answershuto/learnVue/blob/master/docs/响应式原理.MarkDown](https://github.com/answershuto/learnVue/blob/master/docs/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86.MarkDown)
- [https://ustbhuangyi.github.io/vue-analysis/v2/reactive/getters.html#过程分析](https://ustbhuangyi.github.io/vue-analysis/v2/reactive/getters.html#%E8%BF%87%E7%A8%8B%E5%88%86%E6%9E%90)