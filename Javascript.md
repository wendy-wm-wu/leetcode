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

#

