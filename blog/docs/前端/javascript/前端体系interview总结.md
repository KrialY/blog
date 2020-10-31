```
title: "前端体系interview总结"
date: "2020-08-26"
permalink: "持续输出总结"
```

## 数据结构

### 排序

#### **十大排序**

##### 快速排序

###### 代码

```javascript
function hoare (arr,l,r) { //找到第一个数字对应的位置
  let temp=arr[l];
  while(l<r){
    while(l<r&&temp<=arr[r]){
      r--;
    }
    if(l<r){
      arr[l]=arr[r];
      l++;
    }
    while(l<r&&temp>=arr[l]){
      l++;
    }
    if(l<r){
      arr[r]=arr[l];
      r--;
    }
  }
  arr[l]=temp;
  return l;
}
function qsort (arr,l,r) { //分治
  if(l<r){
    let k=hoare(arr,l,r);
    qsort(arr,l,k-1);
    qsort(arr,k+1,r);
  }
}
let arr=[3,2,1,5,2,1,3,2,1,5,7,8,6,4,5,7,8,3,1,0,7,42,4];
console.log(arr);
qsort(arr,0,arr.length-1);
console.log(arr);
```

###### 时间复杂度

​	O(nlogn)

###### 稳定性

​	不稳定，快速排序会进行交换，所以不稳定

##### 归并排序

###### 实现

```javascript
function mergeSort (arr) { //分治
  if (arr.length < 2) return arr;
  let left = mergeSort(arr.slice(0, Math.floor(arr.length/2)));
  let right = mergeSort(arr.slice(Math.floor(arr.length/2), arr.length));

  return merge(left,right);
}
function merge (left, right) { //对不同的两个待合并的数组进行合并操作
  let res = [];

  while (left.length > 0 && right.length > 0) {
    if (left[0] > right[0]) {
      res.push(right.shift());
    }else {
      res.push(left.shift());
    }
  }
  while (left.length > 0) res.push(left.shift());
  while (right.length > 0) res.push(right.shift());
  return res;
}
let arr = [13,12,2,12,3,21,2,31,23,4,1,2,4,5,2,34,6,6,32,3];
console.log(mergeSort(arr), arr);
```

###### 时间复杂度

​	O(nlogn)

稳定性

​	稳定

##### 冒泡排序

###### 时间复杂度

​	O(n^2)

###### 稳定性

​	稳定

##### 简单选择排序



##### 插入排序



##### 希尔排序



##### 堆排序

###### 实现

```javascript
function swap (tree, a, b) { //交换
  let temp = tree[a];
  tree[a] = tree[b];
  tree[b] = temp;
}
function heapify (tree, n, i) { //对当前位置的结点进行一次大根堆化操作
  if (i >= n) return;
  let l = 2*i + 1,
      r = 2*i + 2,
      max = i;
  if (l < n && tree[l] > tree[max]) {
    max = l;
  }
  if (r < n && tree[r] > tree[max]) {
    max = r;
  }
  if (max != i) {
    swap(tree, max, i);
    heapify(tree, n, max);
  }    
}
function buildHeap (tree) { //对所有节点进行大根堆化操作，构造大根堆
  let last_node = tree.length-1;
  let parent_node = Math.floor((last_node - 1) / 2);
  for(let i = parent_node;i >= 0;i--) {
    heapify(tree, tree.length, i);
  }
}
function headSort (tree) { //将根顶与最后一个节点进行交换，然后对剩下的n-1个节点再次进行大根堆化操作
  buildHeap(tree);
  console.log(tree);
  for(let i = tree.length-1;i >= 0;i--) {
    swap(tree, 0, i);
    heapify(tree, i, 0);
    // console.log(tree);
  }
}
let tree = [1, 2, 3, 4, 5, 6, 7, 8, 9],
    tree2 = [2, 5, 3, 1, 10, 4];

headSort(tree2);
console.log(tree2);
```

###### 时间复杂度

​	O(nlogn)

###### 稳定性

​	不稳定，这里进行了堆顶节点与最后一个节点的交换操作

### 树

### 图

### 链表

## 组成原理

### Javascript中的知识点

##### 为什么0.1+0.2 != 0.3？

在js中数字是以64位双精度浮点数存储的，0.1转化为二进制是一个无限循环的二进制数，然而存储空间有限，所以多出去的部分会删去，这就造成了不精确的问题，这个问题不只是出现在javascript中。

##### 解决方案

```javascript
var a = 0.1;
var b = 0.2;
parseFloat((a + b).toFixed(5)) === 0.3; // true
// ⚠️注意：这里toFixed调用后会返回字符串，我们需要重新将字符串转化为浮点数
```

## 计算机网络

### 七层模型

#### 一条信息在模型中传输的过程

### HTTP

HTTP1.0

特点：每次发送请求都需要进行一次TCP连接，连接过程导致资源不必要的浪费

HTTP1.1

特点：

1、connection中新增属性keep-alive并且默认选择即为keep-alive，这样发送http请求是不会造成每次都要进行TCP连接的情况

2、管道传输，具体实现方式为队列形式，如果其中一个http请求出现了阻塞状况会影响后续请求的发送。

HTTP2.0

1、改用二进制传输，让文件传输更加有健壮性

2、服务端主动推送，服务端可以在客户端请求一次之后把所需的数据一次返回多个所需给客户端，减少http请求次数

3、多路复用：http请求可以并行发送，这样就不会存在1.1版本中一个请求的阻塞导致整个队列阻塞的状况了

特点：

### 缓存机制

Cache: no-cache、no-store

#### 强缓存

Expire：

Last-modified



#### 协商缓存

##### 客户端

If-modified-since

If-none-match

##### 服务端

Etag

Last-modified

### TCP与UDP

#### TCP

###### 流量控制

###### 拥塞控制

##### 应用：文件传输，因为文件传输的时候不允许丢包，否则接受到的文件信息不完整，造成文件损坏

##### 三次握手

##### 四次挥手

##### 优点

##### 缺点

#### UDP

##### 应用：实时通讯、视频通话、QQ消息传输等

##### 优点：支持多对多

##### 缺点：传输不可靠，不能保证信息能够送到

## 操作系统

### 进程与线程

#### 进程与线程的区别

#### 进程间的通信

管道方式：通过一个半双工的队列形式进行通行，其中一个在传输信息的时刻，另外一方只能接受信息，待管道队列中的数据清空之后，可以进行反向传输。

### 进程与线程在前端中的应用

#### 浏览器中的进程

浏览器是多进程的，每个Tab页面都会有自己独有的一个进程，这样每个Tab页之间相互不影响，否则如果一个Tab页崩溃，那么很可能会导致整个浏览器出现崩溃。

每个Tab页是单进程多线程的，里面有js线程，render线程，事件循环线程以及定时器的线程。

# Javascript

## Async、迭代器、生成器

```javascript
var fs = require("fs").promises;

function* read () {
    var content = yield fs.readFile('generator.txt', "utf8");
    var r = yield fs.readFile(content, "utf8");
    return r;
}

// var it = read();
// co(it).then(data => {
//     console.log(data);
// },err => {
//     console.log(err);
// })

// var {
//     value,
//     done
// } = it.next();

// Promise.resolve(value).then(data => {
//     var {
//         value,
//         done
//     } = it.next(data);
//     Promise.resolve(value).then(data => {
//         var {
//             value,
//             done
//         } = it.next(data);
//         console.log(value);
//     })
// })

function co (it) {
    return new Promise((resolve, reject) => {
        function next (data) {
            var {
                value,
                done
            } = it.next(data);
            if (!done) {
                Promise.resolve(value).then(data => {
                    next(data);
                }, reject);
            } else {
                resolve(data);
            }
        }
        next();
    })
}

// 基于generator + co
async function read2 () {
    var content = await fs.readFile('generator.txt', "utf8");
    var r = await fs.readFile(content, "utf8");
    return r;
}

read2().then(data => {
    console.log(data);
})
```

## 原生函数的实现

Call

```javascript
Function.prototype.myCall = function (obj) {
  obj = obj || window;
  obj.p = this;
  // 方法一：将类数组转为数组然后截取除第一个参数之外的其他参数最后再解构
  // obj.p(...Array.from(arguments).slice(1));

  //方法二：采用es5的方法利用eval来解决问题
  var newArgs = [];
  for(var i=1;i<arguments.length;i++){
    newArgs.push('arguments[' + i + ']');
  }
  eval('obj.p('+newArgs+')');
  delete obj.p;
}
```

Apply

```javascript
Function.prototype.myApply = function (obj, arr) {
  obj = obj || window;
  obj.p = this;
  obj.p(...arr);
  delete obj.p;
}
```

Bind

```javascript
// 柯里化性质
// new 之后返回undefined
Function.prototype.myBind = function (obj) {
  var self = this;
  let argsArr = Array.from(arguments).slice(1);
  let o = function () {};
  function newF () {
    let argsArr2 = Array.from(arguments);
    console.log(this);
    if (this instanceof newF) {
      self.apply(self, argsArr.concat(argsArr2));
    }else{
      self.apply(obj, argsArr.concat(argsArr2));
    }
  }
  o.prototype = self.prototype;
  newF.prototype = new o;
  // console.log(new newF().prototype);
  return newF;
}
```

Slice

```javascript
Array.prototype.slice2 = function (start, end) {
  let res = new Array();
  let s = start || 0;
  let e = end || this.length;
  for (let i = s;i < e;i++) {
    res.push(this[i]);
  }
  return res;
}
```

## 闭包

### 定义

子函数使用父函数中的变量进而使得变量对象常驻内存。

### 应用

防抖函数

```javascript
function debounce (fn) {
  let timer = null;
  return function () {
    let self = this;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.call(self);
    }, 1000);
  }
}
```

节流函数

```javascript
function throttle (fn) {
  let startTime = 0; 
  return function () {
    let endTime = new Date().getTime();
    if (endTime - startTime >= 2000) {
      startTime = endTime;
      fn.call(this);
    }
  }
}
```

让函数内的变量常驻内存

### 缺点

内存泄漏

解决方案

## 函数式编程与面向对象编程

## 数组的方法

## 继承

ES6

ES5

## Object下的一些重要方法

```javascript
//1.获取原型 [[GetPrototypeOf]]
// let arr = [];
// console.log(Object.getPrototypeOf(arr) === arr.__proto__);

//2.设置原型 [[SetPrototypeOf]]
// let obj = { a: 1, b: 2};
// Object.setPrototypeOf(obj, { c: 3, d: 4});
// console.log(obj);

//3.对象的可扩展性
// let obj = { a: 1, b: 2};
// let extensible = Object.isExtensible(obj);
// console.log(extensible);

// Object.freeze(obj); // 不可写，不可删除，不可修改，可读
// let extensible2 = Object.isExtensible(obj);
// console.log(extensible2)

// Object.seal(obj)// 可写，不可删除，不可修改，可读


//4.获取自身属性[[GetOwnProperty]]
// let obj = { a: 1, b: 2};
// Object.setPrototypeOf(obj,{ c: 3, d: 5});
// console.log(Object.getOwnPropertyNames(obj));
// // for in准确来说是in 是会把原型上的属性也便遍历出来的
// console.log(Object.keys(obj));
// for(let attr in obj) {
//     console.log(attr);
// }
// console.log("c" in obj);

//5.禁止扩展对象[[PreventExtensions]]
// let obj = { a: 1, b: 2};
// Object.preventExtensions(obj);
// obj.c = 3;
// console.log(obj);

//6.拦截对象操作[[DefineOwnProperty]]

//7.判断是否是自身属性 [[HasProperty]]
// let obj = { a: 1, b: 2};
// console.log(obj.hasOwnProperty('b'));

//8.[[GET]]
// let obj = { a: 1, b: 2};
// console.log('a' in obj);
// console.log(obj.a);

//9.[[SET]]
// let obj = { a: 1, b: 2};
// obj.a = 3;
// obj['b'] = 4;
// console.log(obj);

//10.[[Delete]]
// let obj = { a: 1, b: 2};
// let arr = [1, 2, 3];
// let x = 1;
// delete obj.b;
// delete arr[0];
// delete x;
// console.log(obj, arr, x);

//11.[[Enumerate]]
// let obj = { a: 1, b: 2};
// for (var k in obj) {
//     console.log(obj[k],k);
// }

//12.获取集合 [[OwnPropertyKeys]]
// let obj = { a: 1, b: 2};
// Object.setPrototypeOf(obj, { c: 3, d: 4});
// console.log(Object.keys(obj));

const obj = {};
Object.defineProperties(obj, {
  property1: {enumerable: true, value: 1},
  property2: {enumerable: false, value: 2},
});

console.log(Object.keys(obj));
console.log(Object.getOwnPropertyNames(obj));
console.log(obj);
```

## 作用域

## 原型与原型链

## 高阶函数

## 跨域

### AOP编程

实现

```javascript

```

### 函数柯里化

实现

```javascript
//基础柯里化
function sum(a,b){
  return function(c){
    return function(d){
      return a+b+c+d;
    }
  }
}
let res=sum(1,2)(3)(4);

console.log(res);

//升级版
function curry(fn){
  let len=fn.length;
  return function reply(){
    let args=Array.prototype.slice.call(arguments);
    if(args.length>=len){
      return fn(...args);
    }else{
      return function(){
        return reply(...args,...arguments);
      }
    }

  }
}

function add(a,b,c){
  console.log(a+b);
  return a+b+c;
}
let add2=curry(add);
console.log(add2(2,3)(4));
```

作用

优点

缺点

## Promise

### Promise（resolve、reject、then、链式调用）实现

```javascript
function resolvePromise (promise2, x, res, rej) {
  if (x instanceof MyPromise) {
    try {
      var then = x.then;
      then.call(x, (suc) => {
        res(suc);
      }, (fail) => {
        rej(fail);
      });
    } catch (e) {
      rej(e);
    }
  } else {
    res(x);
  }
}
class MyPromise {
  constructor (executor) {
    this.status = "pending";
    this.success = "";
    this.fail = "";
    this.successCb = [];
    this.failCb = [];
    const resolve = (val) => {
      if (this.status === "pending") {
        this.success = val;
        this.status = "resolve";
        this.successCb.forEach(fn => fn());
      }
    }
    const reject = (reason) => {
      if (this.status === "pending") {
        this.fail = reason;
        this.status = "reject";
        this.failCb.forEach(fn => fn());
      }
    }
    executor(resolve, reject);
  }
  then (resolve, reject) {
    let promise2 = new MyPromise((res, rej) => {
      if (this.status === "pending") {
        this.successCb.push(() => {
          // todo
          let x = resolve(this.success);
          resolvePromise(promise2, x, res, rej);
        });
        this.failCb.push(() => {
          // todo
          let x = reject(this.fail);
          resolvePromise(promise2, x, res, rej);
        })
      }else if(this.status === "resolve") {
        setTimeout(() => {
          let x = resolve(this.success);
          resolvePromise(promise2, x, res, rej);
        }, 0);

      }else {
        reject(this.fail);
      }
    })  
    return promise2;  
  }
}
```

### Promise.all实现

```javascript
MyPromise.all = function (values) {
  return new MyPromise((resolve, reject) => {
    var arr = [];
    var index = 0;

    function processData (key, value) {
      index++;
      arr[key] = value;
      if (index == values.length){
        resolve(arr);
      }
    }
    for(let i=0;i<values.length;i++) {
      values[i].then((data) => {
        processData(i, data);
      },reject)
    }
  })
}
```

### Promise.race实现

```javascript
MyPromise.race = function(values) {
  return new Promise((resolve, reject) => {
    for (var i=0;i<values.length;i++) {
      values[i].then(res => {
        resolve(res);
      },err => {
        reject(err);
      })
    }
  });
}
```

Promise.finally实现

```javascript
MyPromise.prototype.myFinally = function (cb) {
  return this.then(data => {
    return Promise.resolve(cb()).then(() => data);
  }, err => {
    return Promise.resolve(cb()).then(() => {
      throw err;
    });
  });
}
```



### 应用场景题

实现一个自由落体小球

```html

```



# HTML

常用的标签：

块级元素与内联元素：

# CSS

### 绘制

绘制一个圆

```html

```

绘制一个扇形

绘制一个菱形

### 选择器的优先级：

### 布局

#### 三栏布局

双飞翼布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    #header{
        background-color: #444;
    }
    #container{
        width: 100%;
    }
    .column{
        float: left;
    }
    #center{
        text-align: center;
        margin-left: 200px;
        margin-right: 150px;
        background-color: aquamarine;
        min-width: 50px;
    }
    #left{
        width: 200px;
        background-color: blue;
        margin-left: -100%;
        height: 300px;
    }
    #right{
        width: 150px;
        background-color: blueviolet;
        margin-left: -150px;
        height: 200px;
    }
    #footer{
        clear: both;
        background-color: pink;
    }
</style>
<body>
    <div id="header">header</div>
    <div id="container" class="column">
        <div id="center">centeasdsadasdasr</div>
    </div>
    <div id="left" class="column">left</div>
    <div id="right" class="column">right</div>
    <div id="footer">footer</div>
</body>
</html>
```

圣杯布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .header,.footer{
        border: 1px solid #333;
        background: #ccc;
        text-align: center;
    }
    .header{
        background: red;
        text-align: center;
    }
    .footer{
        background: green;
        text-align: center;
        clear: both;
    }
    .container{
        padding: 0 220px 0 200px;
        overflow: hidden;
    }
    .left,.middle,.right{
        position: relative;
        float: left;
        min-height: 130px;
    }
    .left{
        left: -100%;
        margin-left: -200px;
        width: 200px;
        background: palegoldenrod;
    }
    .middle{
        width: 100%;
        background: pink;
    }
    .right{
        right: -220px;
        margin-left: -220px;
        width: 220px;
        background: yellow;
    }
</style>
<body>
    <div class="header">
        <h1>header</h1>
    </div>
    <div class="container">
        <div class="middle">
            <h1>middle</h1>
        </div>
        <div class="left">
            <h1>left</h1>
        </div>
        <div class="right">
            <h1>right</h1>
        </div>
    </div>
    <div class="footer">
        <h4>footer</h4>
    </div>
</body>
</html>
```

Flex布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    html,body{
        margin:0;
        text-align: center;
        height: 100%;
    }
    .container{
        box-sizing: border-box;
        overflow: hidden;
        height: 100%;
    }
    nav{
        box-sizing: border-box;
        background-clip:content-box;
        padding: 5px 5px 0 5px;
        width: 100%;
        background-color: red;
        height: 50px;
        float: left;
    }
    main{
        box-sizing: border-box;
        background-clip:content-box;
        padding: 5px 0 5px 5px;
        width: calc(100% - 200px);
        height: calc(100% - 50px);
        float: left;
        background-color: pink;
    }
    footer{
        background-clip:content-box;
        box-sizing: border-box;
        padding: 5px;
        float: left;
        width: 200px;
        height: calc(100% - 50px);
        background-color: aqua;
    }
</style>
<body>
    <div class="container">
        <nav>bar</nav>
        <main>main</main>
        <footer>footer</footer>
    </div>
</body>
<script></script>
</html>
```

#### 两栏布局

```javascript

```



# VUE

## 虚拟dom

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
</body>
<script>
    let vn = h("div",{id:"red",a:2,style:{color:"red"}},h("p",{style:{color:"green"}},"name"),"ykl");
    let app = document.getElementById('app');
    console.log(vn);
    render(vn, app);
    function h (type, props = {}, ...children) {
        let key;
        if (props.key) {
            key = props.key;
            delete props.key;
        }
        children = children.map(child => {
            if (typeof child === "string") {
                return vnode(undefined, undefined, undefined, undefined, child);
            } else {
                return child;
            }
        });
        return vnode(type, key, props, children);
    }
    function vnode (type, key, props, children, text) {
        return {
            type,
            key,
            props,
            children,
            text
        }
    }
    function render (vnode, app) {
        let ele = createDomElementFromVnode(vnode);
        app.appendChild(ele);
        console.log(vnode, app);
    }
    function createDomElementFromVnode (vnode) {
        let {type, key, props, children, text} = vnode;
        if (typeof type !== "undefined") {
            vnode.domElement = document.createElement(type);
            updateProperties(vnode);
            children.forEach(child => {
                render(child, vnode.domElement);
            });
        } else {
            vnode.domElement = document.createTextNode(text);
        }
        return vnode.domElement;
    }
    function updateProperties (newVnode, oldProps = {}) {
        let domElement = newVnode.domElement;
        let newProps = newVnode.props;

        for (let oldPropName in oldProps) {
            if (!newProps[oldPropName]){
                delete domElement[oldProp];
            }
        }
        let newStyleObj = newProps.style || {};
        let oldStyleObj = oldProps.style || {};
        for (let key in oldStyleObj) {
            if (!newStyleObj[key]){
                domElement.style[key] = "";
            }
        }
        for (let newPropName in newProps) {
            if (newPropName === "style") {
                let styleObj = newProps[newPropName];
                for (let s in styleObj) {
                    domElement.style[s] = styleObj[s];
                }
            } else {
                domElement[newPropName] = newProps[newPropName];
            }
        }
    }
    console.log(app)
</script>
</html>
```

## Diff算法

```javascript

```



## Vue的生命周期

## Vuex

## Vue-router

#### 路由传值

#### 路由懒加载

实现

```javascript

```

原理：利用Jsonp动态加载js文件

### Hash

如何实现

### History

## Vue组件

生命周期

### 组件通信

props、emit

eventBus

### 组件中keep-alive的原理

LRU缓存算法

```javascript
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.capacity = capacity;
    this.cache = [];
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    for(var i=0;i<this.cache.length;i++){
        if(this.cache[i].key == key) {
            var temp = this.cache.splice(i,1)[0];
            this.cache.push(temp);
            return temp.val;
        }
    }
    return -1;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(this.get(key)!=-1) {
        this.cache[this.cache.length-1].val=value;
        return;
    }
    if(this.cache.length == this.capacity) this.cache.shift();
    this.cache.push({"key":key,"val":value});
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
```

## Vue数据驱动的基本原理

### 简单的双向绑定原理实现

利用defineProperty实现：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p>-1</p>
    <input type="text" id="txt">
</body>
<script>
    function defineProperty () {
        let obj = {};
        a = 0;
        Object.defineProperties (obj, {
            a:{
                get () {
                    return a;
                },
                set (newVal) {
                    let oP = document.getElementsByTagName('p')[0];
                    a = newVal;
                    oP.innerHTML=a;
                }
            }
        })
        return obj;
    }
    let obj = defineProperty();
    console.log(obj.a);
    let otext = document.getElementById('txt');
    document.addEventListener('keyup', function (e) {
        let val = e.target.value;
        console.log(val);
        obj.a = val;
    },false);
</script>
</html>
```

利用Proxy实现：

```javascript
let obj = {
  a:1,
  b:2
}
let proxy = new Proxy(obj, {
  get (target, prop) {
    console.log("my proxy:" + target[prop]);
    return target[prop];
  },
  set (target, prop, value) {
    console.log("My proxy change data:" + target[prop]);
    console.log(target === obj);
    target[prop] = value;
  }
});
console.log(obj);
console.log(proxy.a);
console.log(obj);
proxy.a=3;
console.log(obj);
// let arr = [1,2,3,4,5];

// let proxy = new Proxy(arr, {
//     get (target, prop) {
//         console.log("My proxy:" + target[prop]);
//         return target[prop];
//     },
//     set (target, prop, value){
//         console.log("My proxy change data:" + target[prop]);
//         target[prop] = value;
//     } 
// })
// console.log(arr);
// console.log(proxy[2]);
// proxy[2]=9;
// console.log(proxy,arr);

// let fn = function () {
//     console.log('I am a function');
// }
// let proxy = new Proxy (fn, {
//     get (target, value) {
//         console.log("fn.a:" + target[value]);
//         return target[value];
//     }
// });
// fn.a=2;
// console.log(fn.a);
// console.log(proxy.a);
```

两者的区别（vue2.0与vue3.0）：



### 手写一个贫困版的Vuejs

```javascript
class Observer {
    constructor (data) {
        this.data = data;
        // console.log(data);
        this.walk(data);
    }
    walk (data) {
        if (!data || typeof data !== "object") {
            return;
        }
        Object.keys(data).forEach((key) => {
            this.defineReactive(data, key, data[key]);
        });
    }
    defineReactive (data, key, val) {
        let dep = new Dep();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get () {
                Dep.target && dep.addSub(Dep.target);
                console.log('get');
                return val;
            },
            set (newVal) {
                console.log('set');
                val = newVal;
                dep.notify();
            }
        });
        console.log(typeof val);
        this.walk(val);
    }
}
class Compiler {
    constructor (context) {
        this.$el = context.$el;
        this.context = context;
        console.log(context);
        if (this.$el) {
            this.$fragment = this.nodeToFragment(this.$el);
            this.compiler(this.$fragment);
            this.$el.appendChild(this.$fragment);
        }
    }

    nodeToFragment (node) {
        let fragment = document.createDocumentFragment();
        if (node.childNodes && node.childNodes.length) {
            node.childNodes.forEach((child) => {
                if (!this.ignorable(child)) {
                    fragment.appendChild(child);
                }
            });
        }
        return fragment;
    }

    ignorable (node) {
        let reg = /^[\t\r\n]+/;
        return node.nodeType === 8 || (node.nodeType === 3 && reg.test(node.textContent));
    }

    compiler (node) {
        if (node.childNodes && node.childNodes.length) {
            node.childNodes.forEach((child) => {
                if (child.nodeType === 1) {
                    this.compilerElementNode(child);
                }else if(child.nodeType === 3) {
                    this.compilerTextNode(child);
                }
            });
        }
    }

    compilerElementNode (node) {
        let attrs = [...node.attributes];
        let self = this;
        
        attrs.forEach(attr => {
            let { name: attrName, value: attrValue} = attr;
            console.log(attrName, attrValue);
            if (attrName.indexOf("v-") === 0 ){
                let dirName = attrName.slice(2);
                switch (dirName) {
                    case "text":
                        new Watcher(attrValue, this.context, newVal => {
                            node.textContent = newVal;
                        });
                        break;
                    case "model":
                        new Watcher(attrValue, this.context, newVal => {
                            node.value = newVal;
                        });
                        node.addEventListener("input", (e) =>{
                            self.context[attrValue] = e.target.value;
                        });
                        break;
                }
            }
            if (attrName.indexOf("@") === 0) {
                this.compilerMethods(this.context, node, attrName, attrValue);
            }
        })
        this.compiler(node);
    }

    compilerMethods (scope, node, attrName, attrValue) {
        let type = attrName.slice(1);
        let fn = scope[attrValue];
        node.addEventListener(type, fn.bind(scope));
    }

    compilerTextNode (node) {
        let text = node.textContent.trim();
        // console.log(node);
        let exp = this.parseTextExp(text);
        new Watcher(exp, this.context, function (newVal) {
            node.textContent = newVal;
        });
        
        console.log(exp);
    }

    parseTextExp (text) {
        let regText = /\{\{(.+?)\}\}/g; // 这里不懂
        let pieces = text.split(regText);
        console.log(pieces);
        let matches = text.match(regText);

        let tokens = [];
        pieces.forEach((item) => {
            if (matches && matches.indexOf("{{" + item + "}}") > -1) {
                tokens.push("("+ item + ")");
            }else{
                tokens.push("`" + item + "`");
            }
        });
        return tokens.join("+");
    }
}
var $uid = 0;
class Watcher {
    constructor (exp, context, cb) {
        this.exp = exp;
        this.context = context;
        this.cb = cb;
        this.uid = $uid++;
        this.update();
    }

    get () {
        Dep.target = this;
        let newVal = Watcher.computeExpression(this.exp, this.context);
        Dep.target = null;
        return newVal;
    }

    update () {
        let newVal = this.get();
        console.log(newVal);
        this.cb && this.cb(newVal);
    }

    static computeExpression (exp, scope) {
        console.log(scope.msg);
        let fn = new Function("scope", "with(scope){ return "+ exp +" }");
        return fn(scope);
    }
}
class Dep {
    constructor () {
        this.subs = {};

    }

    addSub (target) {
        this.subs[target.uid] = target;
    }

    notify () {
        for (let attr in this.subs) {
            this.subs[attr].update();
        }
    }
}
class MyVue {
    constructor (options) {
        this.$el = document.querySelector(options.el);

        this.$data = options.data || {};
        this.__proxyData (this.$data);
        this.__proxyMethods(options.methods);
        new Observer(this.$data);
        new Compiler(this);
    }
    __proxyData (data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                get () {
                    return data[key];
                },
                set (newVal) {
                    data[key] = newVal;
                }
            })
        })
    }
    __proxyMethods (methods) {
        if (methods && typeof methods === "object") {
            Object.keys(methods).forEach(key => {
                this[key] = methods[key];
            })
        }
    }
}
```

# Webpack

### 模块化

```javascript
// 原生写法
var moduleA = (function () {
    var a = [1, 2, 3, 4, 5];
    var b = [7, 8, 9, 10, 11];
    return {
        a:a,
        b:b
    }
})();

// 解决了污染全局的问题
// 模块之间可以依赖了
```

```javascript
// 引入RequireJs  AMD标准

//a.js
define('moduleA', function(){
    var a=[1,2,3,4,5];
    return {
        a:a.reverse()
    };
});

//b.js
define('moduleB', ['moduleA'], function (moduleA) {
    var b = [4,5,6,7,8,9];

    return {
        b:moduleA.a.concat(b)
    };
});

//c.js
define('moduleC',['moduleB'],function(moduleB){
    return {
        c:moduleB.b.join('-');
    }
});


//index.js
require.config({
    paths: {
        moduleA: 'js/module_a',
        moduleB: 'js/module_b',
        moduleC: 'js/module_c'
    }
});

require(['moduleA','moduleB','moduleC'],function(moduleA,moduleB,moduleC){
    console.log(moduleA.a);
    console.log(moduleB.b);
    console.log(moduleC.c);
});
// 异步加载模块
// 前置依赖：后面的模块要等前面的依赖模块加载完毕之后才会调用回调函数
//index.html
<script src="require.js"></script>
<script src="index.js"></script>
```



```javascript
// CMD  sea.js

// a.js
define(function (require, exports, module) {
    var a = [1,2,3,4,5];
    return {
        a:a.reverse()
    }
});

// b.js
define(function(require, exports, module){
    var moduleA=require('module_a'),
        b=[6,7,8,9];

    return {
        b:moduleA.a.concat()
    };
});

// c.js
define(function(require, exports, module){
    var moduleB=require('module_b');

    return {
        c:moduleB.b.join('-');
    }
})

// index.js

seajs.use(['module_a.js','module_b.js','module_c.js'], function(moduleA, moduleB, moduleC){
    console.log(moduleA.a);
    console.log(moduleB.b);
    console.log(moduleC.c);
});

// 使用模块 需要配置模块URL

// 依赖加载完毕后执行factory

//依赖就近 按需加载 当需要用到对应模块的时候再加载对应模块
```



```javascript
// 一种规范，来源于nodejs
var moduleB = require('./module_b');

var c = (function(){
    return moduleB.b.join('-');
});

module.exports = {
    c
}

// 同步方法

// 引用 创建一个模块实例 实例化
// 缓存机制
// node上运行

(function(exports, require, module, __filename, __dirname){
    
})();


// commonjs与es6的区别
// 1、commonjs 模块输出的是一个值的拷贝
//    es6 模块输出的是一个值的引用
// 2、commonjs实在运行时加载
//    es6实在编译时加载
```



```javascript
// a.js
export default {
    a:[1,2,3,4,5].reverse()
}

//b.js
import moduleA from './module_a'

export default {
    b: moduleA.a.concat([6,7,8,9])
}

// 有无default
// export  {
    
// }
// import {
//     moduleA
// }


// c.js
import moduleB from './module_b';

export default{
    c:moduleB.b.join('-')
}


// index.js

import moduleA from './module_a';
import moduleB from './module_b';
import moduleC from './module_c';

console.log(moduleA.a);
console.log(moduleB.b);
console.log(moduleC.c);
```

## 作用

本质上,webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时,它会递归地构建一个依赖关系图(dependency graph),其中包含应用程序需要的每个模块,然后将所有这些模块打包成一个或多个 bundle。

webpack 就像一条生产线,要经过一系列处理流程后才能将源文件转换成输出结果。 这条生产线上的每个处理流程的职责都是单一的,多个流程之间有存在依赖关系,只有完成当前处理后才能交给下一个流程去处理。 插件就像是一个插入到生产线中的一个功能,在特定的时机对生产线上的资源做处理。
webpack 通过 Tapable 来组织这条复杂的生产线。 webpack 在运行过程中会广播事件,插件只需要监听它所关心的事件,就能加入到这条生产线中,去改变生产线的运作。 webpack 的事件流机制保证了插件的有序性,使得整个系统扩展性很好。 -- 深入浅出 webpack 吴浩麟

## 打包的流程

Webpack 的运行流程是一个串行的过程,从启动到结束会依次执行以下流程 :

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数,得出最终的参数。
2. 开始编译：用上一步得到的参数初始化 Compiler 对象,加载所有配置的插件,执行对象的 run 方法开始执行编译。
3. 确定入口：根据配置中的 entry 找出所有的入口文件。
4. 编译模块：从入口文件出发,调用所有配置的 Loader 对模块进行翻译,再找出该模块依赖的模块,再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后,得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。
6. 输出资源：根据入口和模块之间的依赖关系,组装成一个个包含多个模块的 Chunk,再把每个 Chunk 转换成一个单独的文件加入到输出列表,这步是可以修改输出内容的最后机会。
7. 输出完成：在确定好输出内容后,根据配置确定输出的路径和文件名,把文件内容写入到文件系统。

在以上过程中,Webpack 会在特定的时间点广播出特定的事件,插件在监听到感兴趣的事件后会执行特定的逻辑,并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

## 搭建一个最基本的配置

## 如何做优化

Plugin:uglify

Tree-shaking

## 实现

### 手写一个贫困版Webpack

### 手写Loader

```javascript
let less = require("less");
function loader (source) {
    let css = "";

    less.render(source, function(err, c) {
        css = c.css;
    });
    return css;
}

module.exports = loader;
```

```javascript
function loader (source) {
    console.log(source);
    let style = `
        let style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source)};
        document.head.appendChild(style);
    `
    return style;
}

module.exports = loader;
```

webpack配置：

```javascript
let path = require("path");

class MyPlugin{
    apply (compiler) {
        console.log("plugin start~ " + compiler);
    }
}
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    path.resolve(__dirname,"loader","style-loader"),
                    path.resolve(__dirname,"loader","less-loader")
                ]
            }
        ]
    },
    plugins: [
        new MyPlugin()
    ]
}
```

### 手写Plugin

```javascript
class MyPlugin{
    apply (compiler) {
        console.log("plugin start~ " + compiler);
    }
}
```

# 设计模式

## 观察者模式

```javascript
class Sub {
  constructor (name) {
    this.name = name;
    this.observer = [];
    this.state = "1";
  }
  attach (observer) {
    this.observer.push(observer);
  }
  notify (state) {
    this.state = state;
    this.observer.forEach((o) => o.update(state));
  }
}
class Observer {
  constructor (name) {
    this.name = name;
  }
  update (state) {
    console.log(this.name + " know that sub state change :" + state);
  }
}
let sub = new Sub("baby");
let o1 = new Observer("father");
let o2 = new Observer("mother");
sub.attach(o1);
sub.attach(o2);
sub.notify("unhappy");
sub.notify("happy");
```

## 发布订阅者模式

```javascript
function Events () {
  this.callback = [];
  this.results = [];
}
Events.prototype.on = function (callback) {
  this.callback.push(callback);
}
Events.prototype.emit = function (data) {
  this.results.push(data);
  this.callback.forEach((cb) => cb(this.results));
}

let e = new Events();
e.on(function (arr) {
  console.log(arr);
});
e.on(function (arr) {
  console.log(arr);
});

setTimeout(() => {
  e.emit("1");
},1000);
setTimeout(() => {
  e.emit("2");
},2000);
setTimeout(() => {
  e.emit("3");
},3000);
```



## 单例模式

```javascript
var Singleton = (function () {
  let obj = null;
  let createObj = function (name) {
    this.name = name;
    if (obj) {
      obj.name = name;
      return obj;
    }
    obj = this;
  }
  createObj.prototype.getName = function () {
    return this.name;
  }

  return createObj;
})();

var a = new Singleton("aaa");
var b = new Singleton("bbb");

console.log(a === b,a.getName(),b.getName());
```

# 浏览器

### URL输入到浏览器中经历的过程

1、DNS解析。

​	浏览器缓存->hosts文件->系统缓存->本地域名服务器（递归查询）->根域名服务器（迭代查询，之后同理）->.com域名服务器->baidu.com域名服务器->www.baidu.com域名服务器

2、TCP三次握手

3、发送http请求并且做资源传输

4、浏览器解析超文本文件

​	将解析dom并构建成dom树，遇到css文件并行下载，遇到js文件阻塞下载并且阻塞执行。解析css文件并构建cssom树（css object model）

### 重排与重绘

重排：重排必引起重绘，位置宽度等发生改变将引起重排，文本框输入文字也将引起重排。

重绘：外观颜色等改变。

# Nodejs

特性：

​	1、事件驱动

​	2、非阻塞io

