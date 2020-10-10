# Module

```javascript
function User(){
  var username, password;
  function doLogin(user,pw) {
	  username = user;
    password = pw;
		// 执行剩下的登录工作 }
	  var publicAPI = {
      login: doLogin
      return publicAPI;
}
// 创建一个User模块实例 var fred = User();
fred.login( "fred", "12Battery34!" );
```

模块可以定义外部不可见的私有实现细节，同时提供了允许从外部访问的API