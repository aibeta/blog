# Closure

闭包实现一个logger 函数

```javascript
var log = (function() {
    var log = "";
 
    return {
        add: function(msg) { log += msg + "\n"; },
        show: function() { alert(log); log = ""; }
    }
})();

log.add('1')
log.add('2')
log.show()
```