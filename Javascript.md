## Javascript Interview Questions

### Explain event delegation.

Event delegation is a technique for listening to events where you delegate a parent element as the listener for all the events that happen inside it instead of adding event listeners to specific nodes. That event listener analyzes bubbled events to find a match on child elements. 

### Explain how ```this``` works in JavaScript. 

##### "this" refers to global object

By default, the execution context of an exection is global which means that if a code is being executed as part of a simple function call then ```this``` refers to the global object. 

##### "this" refers to new instance

When a function is invoked with ```new``` keyword, then the function is known as a constructor function and returns a new instance. 

##### "this" refers to invoker object (parent object)

In JavaScript, property of an object can be a method or a simple value. When an Object's method is invoked, then "this" refers to the object which contains the method being invoked. 

##### "this" with call, apply methods

A function in javascript is also a special type of object. Every function has call, bind, and apply methods. These methods can be used to set custome value of "this" to the execution context of the function. 

##### "this" with bind method

Bind method returns a new method with ```this``` refers to the first argment passed. 

- Can you give an example of one of the ways that working with ```this``` has changed in ES6? 

When a fat arrow is used, then it doesn't create a new value for ```this```. ```this``` keeps on referring to the same object it is referring, outside the function. 



### Explain how prototypal inheritance works.

A prototype is a working object instance. Objects inherit directly from other objects. 

Instances may be composed from many different source objects, allowing for easy selective inheritance and a flat Prototype delegation hierarchy. In other words, class taxonomies are not an automatic side-effect of prototypal OO: a critical distinction. 


### What's the difference between a variable that is: ```null```, ```undefined``` or ```undeclared```?

Null is a value of a variable and is a type of object. 

Undefined is a variable that has been declared but not value exists and is a type of itself "undefined" 

Undeclared variables is a variable that has been declared without ```var``` keyword. 


### What is a closure, and how/why would you use one?

A closure is an inner function that has access to the outer (enclosing) function’s variables—scope chain. The closure has three scope chains: it has access to its own scope (variables defined between its curly brackets), it has access to the outer function’s variables, and it has access to the global variables.

The inner function has access not only to the outer function’s variables, but also to the outer function’s parameters. Note that the inner function cannot call the outer function’s arguments object, however, even though it can call the outer function’s parameters directly.

You create a closure by adding a function inside another function.

### What language constructions do you use for iterating over object properties and array items?

 for loop, for..in, for each..in, map, reduce etc.


### Can you describe the main difference between the Array.forEach() loop and Array.map() methods and why you would pick one versus the other?

forEach() — executes a provided function once for each array element.
map() — creates a new array with the results of calling a provided function on every element in the calling array.

forEach() may be preferable when you’re not trying to change the data in your array, but instead want to just do something with it

And map() might be preferable when changing or altering data. Not only is it faster but it returns a new Array. 




