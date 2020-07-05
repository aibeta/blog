# Vue Notes

1. vue 实例会遍历 data 对象的所有属性，并设置为 getter/setter 
2. 所以vue 不可以添加根级别的响应式属性
3. 但是 vue 可以香嵌套对象添加响应式属性

    ```jsx
    this.$set(this.obj, 'b', 2)
    // equal
    Vue.set(vm.obj, 'b', 2) 
    ```

4. vue 是异步更新DOM，数据变化后 vue 开启一个队列，缓冲在同一时间循环中发生的所有数据变更，如果同一个watch被多次触发，只会推入队列一次。
5. vue 在内部尝试使用 Promise.then、MutationObserver 和setTimeout(fn, 0)
6. 如果需要在更新完DOM 之后执行，那么可以使用Vue.nextTick(callback)，在组件内部可以使用 this.$nextTick()，返回的是一个 promise
7. 不要在生命周期，选项属性或回调上使用箭头函数
8. 数据绑定最常见的形式就是使用“Mustache”语法 (双大括号) 的文本插值
9. Mustache 语法不能作用在 HTML attribute 上，遇到这种情况应该使用 v-bind 指令
10. 一些指令能够接收一个“参数”，在指令名称之后以冒号表示。例如，v-bind 指令可以用于响应式地更新 HTML attribute：`<a v-bind:href="url">`
11. 另一个例子是 v-on 指令，它用于监听 DOM 事件：v-on:click="doSomething"
12. 从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：`<a v-bind:[attributeName]="url">`
13. 修饰符 (modifier) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()
14. 这里我们声明了一个计算属性 reversedMessage。我们提供的函数将用作属性 vm.reversedMessage 的 getter 函数：

    ```jsx
    var vm = new Vue({
      el: '#example',
      data: {
        message: 'Hello'
      },
      computed: {
        // 计算属性的 getter
        reversedMessage: function () {
          // `this` 指向 vm 实例
          return this.message.split('').reverse().join('')
        }
      }
    })
    ```

15. 计算属性是基于响应进行更新，只要message 不变，那么就不会重新计算。如果不想使用缓存，那么就使用方法来代替吧
16. 计算属性只有 getter，需要时也可以设置setter
17. 当在一个自定义组件上使用 class 属性时，这些 class 将被添加到该组件的根元素上面。这个元素上已经存在的 class 不会被覆盖。
18. v-bind:style 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：<div v-bind:style="styleObject"></div>
19. 变异方法 (mutation method)，Vue 将被侦听的数组的变异方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：
    - `push() pop() shift() unshift() splice() sort()reverse()`
    - 你可以打开控制台，然后对前面例子的 `items` 数组尝试调用变异方法。比如 `example1.items.push({ message: 'Baz' })`。
20. 如果直接利用索引修改一个数组，vue 无法检测到变动

    ```jsx
    // 此时有两种方法
    // Vue.set
    Vue.set(vm.items, indexOfItem, newValue)

    vm.items.splice(indexOfItem, 1, newValue)
    ```

21. 在自定义组件上，你可以像在任何普通元素上一样使用 v-for。
22. Vue.js 为 `v-on` 提供了**事件修饰符**。之前提过，修饰符是由点开头的指令后缀来表示的。 `.stop .prevent .capture .self .once .passive`

    ```jsx
    <!-- 阻止单击事件继续传播 -->
    <a v-on:click.stop="doThis"></a>

    <!-- 提交事件不再重载页面 -->
    <form v-on:submit.prevent="onSubmit"></form>

    <!-- 修饰符可以串联 -->
    <a v-on:click.stop.prevent="doThat"></a>

    <!-- 只有修饰符 -->
    <form v-on:submit.prevent></form>

    <!-- 添加事件监听器时使用事件捕获模式 -->
    <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
    <div v-on:click.capture="doThis">...</div>

    <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
    <!-- 即事件不是从内部元素触发的 -->
    <div v-on:click.self="doThat">...</div>
    ```

23. Vue 还对应 addEventListener 中的 passive 选项提供了 .passive 修饰符。这个 .passive 修饰符尤其能够提升移动端的性能。
24. 默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。你可以添加 lazy 修饰符，从而转变为使用 change 事件进行同步：
25. 组件是可复用的 Vue 实例带有一个名字，分为全局注册和局部注册，全局注册的组册可以用于在其注册之后的任何vue 实例之中

    ```jsx
    Vue.component('my-component-name', {
      // ... options ...
    })
    ```

26. 同时子组件可以通过调用内建的 $emit 方法 并传入事件名称来触发一个事件：

    ```jsx
    // 父子组件的通信
    // fu
    <blog-post
      ...
      v-on:enlarge-text="postFontSize += 0.1"
    ></blog-post>

    // zi
    <button v-on:click="$emit('enlarge-text')">
      Enlarge text
    </button>
    ```

27. 自定义事件也可以用于创建支持 v-model 的自定义输入组件为了让它正常工作，这个组件内的 `<input>` 必须：
    - 将其 `value` attribute 绑定到一个名叫 `value` 的 prop 上
    - 在其 `input` 事件被触发时，将新的值通过自定义的 `input` 事件抛出
28. 动态组件

    ```jsx
    <!-- 组件会在 `currentTabComponent` 改变时改变 -->
    <component v-bind:is="currentTabComponent"></component>

    // currentTabComponent 可以是组件名或组件的选项对象
    ```

29. 组件局部注册，增加 components 属性，属性值就是这个组件的选项对象。局部注册的组件在其子组件中不可用。

    ```jsx
    components: {
        'component-a': ComponentA,
        'component-b': ComponentB
    }
    ```

30. 可以自动化注册一些基础组件，这样就不用在每个文件里注册
31. 如果你想要将一个对象的所有属性都作为 prop 传入，你可以使用不带参数的 v-bind (取代 v-bind:prop-name)

    ```jsx
    <blog-post v-bind="post"></blog-post>

    // equal
    <blog-post
      v-bind:id="post.id"
      v-bind:title="post.title"
    ></blog-post>
    ```

32. prop 验证
33. 不同于组件和 prop，事件名不会被用作一个 JavaScript 变量名或属性名，所以就没有理由使用 camelCase 或 PascalCase 了。并且 `v-on` 事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以 `v-on:myEvent` 将会变成 `v-on:myevent`——导致 `myEvent` 不可能被监听到。因此，我们推荐你**始终使用 kebab-case 的事件名**。
34. 在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。可以使用 .sync

    ```jsx
    <text-document v-bind:title.sync="doc.title"></text-document>

    // 子组件
    this.$emit('update:title', newTitle)
    ```

35. 在动态组件上使用 keep-alive

    ```jsx
    <!-- 失活的组件将会被缓存！-->
    <keep-alive>
      <component v-bind:is="currentTabComponent"></component>
    </keep-alive>
    ```

36. 异步组件，vue 在需要的时候才去加载调用 resolve，生成组件

    ```jsx
    Vue.component('async-example', function (resolve, reject) {
      setTimeout(function () {
        // 向 `resolve` 回调传递组件定义
        resolve({
          template: '<div>I am async!</div>'
        })
      }, 1000)
    })

    	// 可以和webpack 的code-splitting 一起用
    Vue.component('async-webpack-example', function (resolve) {
      // 这个特殊的 `require` 语法将会告诉 webpack
      // 自动将你的构建代码切割成多个包，这些包
      // 会通过 Ajax 请求加载
      require(['./my-async-component'], resolve)
    })

    // 也可以写为 
    new Vue({
      // ...
      components: {
        'my-component': () => import('./my-async-component')
      }
    })
    ```

37. 处理加载状态

    ```jsx
    const AsyncComponent = () => ({
      // 需要加载的组件 (应该是一个 `Promise` 对象)
      component: import('./MyComponent.vue'),
      // 异步组件加载时使用的组件
      loading: LoadingComponent,
      // 加载失败时使用的组件
      error: ErrorComponent,
      // 展示加载时组件的延时时间。默认值是 200 (毫秒)
      delay: 200,
      // 如果提供了超时时间且组件加载也超时了，
      // 则使用加载失败时使用的组件。默认值是：`Infinity`
      timeout: 3000
    })
    ```

38. 在子组件中访问根实例需要使用 this.$root
    1. 也可以用ref ，this.$ref.input.focus()
39. 依赖注入，是两个实例选项，provide 和 inject，provide 允许我们指定想要提供给后代的数据/方法

    ```jsx

    ```