# DOM

### append style to page's html tag

```css
document.getElementsByTagName('html')[0].style.cssText += `;background: ${data.activityBgColor}`;
```

event.current 和 event.target 什么区别? current 是当前元素，另一个是事件触发的元素
