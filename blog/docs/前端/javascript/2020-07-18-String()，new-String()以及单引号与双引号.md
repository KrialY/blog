---
title: "String()，new String()以及单引号与双引号"
date: "2020-07-18"
permalink: "String()，new String()以及单引号与双引号"
---



```javascript
var yiifaa = 'yiifaa',
    str1 = new String(yiifaa),
    str2 = String(yiifaa)

//  请确认以下的判断是否准确
str1 === yiifaa
//
str2 === yiifaa
//
typeof str1 === typeof str2
```

根据JS的语法，要满足===的条件如下： 
1. 如果是引用类型，则两个变量必须指向同一个对象（同一个地址）； 
2. 如果是基本类型，则两个变量除了类型必须相同外，值还必须相等。

再把话题切换到String对象上来，String的声明方式有三种（请参见第一段代码），但产生的类型却不尽相同，结果如下：

```javascript
//  类型为string，为基本类型
typeof yiifaa
//  类型为object，为引用类型
typeof str1
//  类型为string，为基本类型
typeof str2
```

那现在答案很清楚了，如下：

```javascript
//  false， 因为str1为引用类型
str1 === yiifaa
//  true， 因为都是基本类型，并且值相等
str2 === yiifaa
// false， 虽然都是字符串，但分别为object与string
typeof str1 === typeof str2
```

转载：https://www.cnblogs.com/qfly/p/7675567.html

<hr>

```javascript
var str="123"    //只是设置变量
str=new String('123') //设置一个成员

区别
<script>
var str="123";
str.sex=1;
alert(str.sex);//输出未定义，因为不是成员，没有这属性

str=new String('123');
str.sex=1;
alert(str.sex);//输出1，成员的属性
</script>
```



单引号与双引号的区别：其实没什么区别，只是在使用的时候（例如字符串拼接）需要注意即可。

- 从代码编译的角度说的话，单引号在JS中被浏览器（IE，Chrome，Safari）编译的速度更快（在FireFox中双引号更快）。

