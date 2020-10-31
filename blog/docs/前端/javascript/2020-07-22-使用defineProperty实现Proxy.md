---
title: "使用defineProperty实现Proxy"
date: "2020-07-22"
permalink: "使用defineProperty实现Proxy"
---

**使用defineProperty实现Proxy：**

```javascript
function MyProxy(target, handler) {

  let _target = deepClone (target);

  Object.keys(_target).forEach((key) => {
    Object.defineProperty(_target, key, {
      get () {
        return handler.get && handler.get(target, key);
      },
      set (newVal) {
        return handler.set && handler.set(target, key, newVal);
      }
    });
  });
  return _target; // 返回一个新的对象
  function deepClone (org, tar) { // 深拷贝
    var tar = tar || {},
        toStr = Object.prototype.toString,
        arrType = '[object Array]';

    for(var key in org) {
      if (org.hasOwnProperty(key)) {
        if (typeof org[key] === 'object' && org[key] !== null) {
          tar[key] = toStr.call(org[key]) === arrType ? [] : {};
          deepClone(org[key], tar[key]);
        } else {
          tar[key] = org[key];
        }
      }
    }
    return tar;
  }
}
let arr = [1, 2, 3, 4];
let proxy = new MyProxy(arr, {
  get (target, prop) {
    console.log("This is proxy:" + target[prop]);
    return target[prop];
  },
  set (target, prop, newVal) {
    console.log("This is proxy:" + target[prop] + ",newVal=" + newVal);
    target[prop] = newVal;
  }
});
console.log(proxy[0]);
proxy[0] = 3;
console.log(proxy[0], arr[0])
```
