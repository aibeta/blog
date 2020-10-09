# vue

### mapMution 是什么作用啊？

- https://vuex.vuejs.org/guide/mutations.html
- 使用 mapMution 之后就可以使用。 store.commit('increment') 触发 action
- 不使用 mapMution 的话，可以这样调用 this.$store.commit('promotion/SET_REFRESH', true);

### vue 里面动态 class 应该怎么写?
`class="[ 1 < 2 ? 'p1' : 'p' ]" :class="{'p1' : false, 'p': true}"> :class="[{'p1': false}, isFalse]"`

### 怎么在vue 里面的属性传入number 类型?

需要使用v-bind 去传number 否则会被自动转化为 string

### class 里 动态拼接字符串? 

`:class="'a' + x"`

### vue router 里面 push 方法的不会触发 popstate，

使用watch $route 作为替代

### vue 使用对象的属性进行更新时会不生效?

- 受现代 JavaScript 的限制 (而且 Object.observe 也已经被废弃)，Vue 无法检测到对象属性的添加或删除
- Vue.set(vm.someObject, 'b', 2)
- this.$set(this.someObject,'b',2)
- this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
- https://cn.vuejs.org/v2/guide/reactivity.html

### vue: 模块 module 的 mapState

```js
computed: {
    …mapState({
      'refresh': state => state.promotion.refresh,
      'dialogUrl': state => state.promotion.dialogUrl
    })
  },

const store = new Vuex.Store({
  modules: {
    promotion
  },
});

watch: {
    refresh: {
      handler(val) {
        if (val) {
          this.fetchData({});
          this.dialogVisible = true;
          this.$store.commit('promotion/SET_REFRESH', false);
        }
      }
    },
}
```