---
title: "JavaScript创建对象的方法"
date: "2020-07-12"
permalink: "JavaScript创建对象的方法"
---

**工厂模式**

```javascript
function createStudent(name,job){
  let stu=new Object;
  stu.name=name;
  stu.job=job;
  stu.getJob=function(){
    console.log(this.job);
  }
  return stu;
}
let stu1=new createStudent("小明","HR");
let stu2=new createStudent("小花","公务员");

stu1.getJob();//HR
stu2.getJob();//公务员
```

**优点：**接受参数，可以无数次的调用这个函数，创建Student对象，而每次他都可以返回一个包含三个属性一个方法的对象。

**缺点：**虽然解决了创建多个相似对象的问题，但是没有解决对象识别的问题（即怎么知道一个对象的类型）。

<hr>

**构造函数模式**

```javascript
function Student(name,job){
  this.name=name;
  this.job=job;
  this.getJob=function(){
    console.log(this.job);
  }
}
stu1=new Student("小明","HR");
stu2=new Student("小花","公务员");
stu1.getJob(); //HR
stu2.getJob(); //公务员
```

- **Student()中的代码和createStudent（）的不同之处：**

  1、没有显式地创建对象

  2、直接将属性和方法赋给了this对象

  3、没有return语句

 

- **要创建Student对象的新实例，必须使用new操作符**。**以这种方式调用构造函数世纪上会经历一下四个步骤：**

  1、创建一个新对象。

  2、将构造函数的作用域赋给新对象（因此this就指向这个新对象）

  3、执行构造函数中的代码（为这个新对象添加属性）

  4、返回新对象

**优点：**创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型。 

**缺点：**每个方法都要在每个实例上重新创新一遍。stu1，stu2都有一个名为getJob（）的方法，但这两个方法不是同一个Function的实例。因为ECMAScript中的函数是对象，所以每定义一个函数都是实例化了一个对象。

<hr>

**原型模式**

```javascript
function Student(){
}
Student.prototype.name="小明";
Student.prototype.job="HR";
Student.prototype.getJob=function(){
  console.log(this.job);
}
stu1=new Student();
stu2=new Student();

console.log(stu1.getJob===stu2.getJob); //true
```

- 理解原型对象
  - 我们创建的每个函数都有一个prototype（原型）属性，这个属性是一个指针，指向函数的原型对象。
  - 默认情况下，所有原型对象都自动获得一个constructor属性，这个属性是一个指向prototype属性所在函数的指针。
  - 当调用构造函数创建一个新实例后，该实例的内部将包含一个指针（内部属性）[[Prototype]]，指向构造函数的原型对象。

图解：

![img](https://images2018.cnblogs.com/blog/1280506/201804/1280506-20180407123707825-1897089745.jpg)

**注意：**

1、Student 的每个实例都包含一个内部属性，该属性仅仅指向了Student.prototype。换句话说，他们与构造函数之间没有直接的关系。

2、虽然这两个实例都不包含属性和方法，但我们却可以调用stu1.getJob（）。这是通过查找对象属性的过程来实现的——**当代码读取某个对象的属性时，都会执行一次搜索，目标是具有给定名字的属性。搜索首先从对象实例本身开始，如果在实例中找到了具有给定名字的属性，则返回该属性的值，如果没有找到，则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性。**

**优点**：减少了代码的重复，也可用标识来创建对象。

**缺点**：1、它省略了为构造函数传递初始化参数这一环节，结果所有势力在默认情况下都将取得相同的属性值。

　　　2、原型中所有属性是被很多势力共享的，这种共享对函数来说非常适合，对于那些包含基本值的属性也还说得过去，但是对于包含引用类型值的属性来说，就是一个问题了,因为实例一般都有属于自己的全部属性。

```javascript
function Person(){

}
Person.prototype={
  constructor:Person,
  name:"小明",
  friends:["a","b"],
  getName:function(){
    console.log(this.name);
  }
}
let person1=new Person();
let person2=new Person();

person1.friends.shift();
console.log(person1.friends,person2.friends,person1.friends===person2.friends); // ["b"] ["b"] true
```

<hr>

**组合使用构造函数模式和原型模式**

```javascript
function Person(name,job){
  this.name=name;
  this.job=job;
  this.friends=["a","b"];
}
Person.prototype={
  constructor:Person,
  getJob:function(){
    console.log(this.job);
  }
}
per1=new Person("小明","HR");
per2=new Person("小花","家庭主妇");

per1.friends.shift();
console.log(per1.friends,per2.friends,per1.friends===per2.friends,per1.getJob===per2.getJob); //["b"] ["a", "b"] false true
```

​		构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。这样，每个实例都有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度的节省了内存。而且还支持向构造函数传递参数。这种方式也是ECMAScript种使用最广泛，认同度最高的一种创建自定义类型的方法。



转自或参考：JS 创建自定义对象的方法
https://www.cnblogs.com/Renyi-Fan/p/12532342.html

版权申明：欢迎转载，但请注明出处