---
topic: javascript
language: en
version: 3.0
---

# JavaScript Interview Questions

## Available Categories

- Fundamentals
- Execution Context & Scope
- Memory & References
- Functions
- Asynchronous & Event Loop
- Engine & Runtime
- Language Behavior
- Objects & Internals

## Difficulty Levels

- Easy
- Medium
- Hard

## 🧠 Question 1

**ID**: javascript-001  
**Title**: What is JavaScript and how does it differ from compiled languages?  
**Difficulty**: Easy  
**Category**: Fundamentals

### Answer 📄

JavaScript is a high-level, interpreted programming language primarily used for building interactive web applications. It runs inside the browser as well as on servers using environments like Node.js.

Unlike compiled languages such as C or C++, JavaScript does not require a separate compilation step before execution. Instead, it is executed by a JavaScript engine at runtime.

Modern JavaScript engines internally use Just-In-Time (JIT) compilation to optimize performance, which makes JavaScript fast while still behaving like an interpreted language from the developer’s perspective.

## 🧠 Question 2

**ID**: javascript-002  
**Title**: What are the primitive data types in JavaScript?  
**Difficulty**: Easy  
**Category**: Fundamentals

### Answer 📄

JavaScript has seven primitive data types:

- String
- Number
- BigInt
- Boolean
- Undefined
- Null
- Symbol

Primitive values are immutable and are stored directly in memory. When assigned to a new variable, a copy of the value is created.

## 🧠 Question 3

**ID**: javascript-003  
**Title**: What is the difference between null and undefined?  
**Difficulty**: Easy  
**Category**: Fundamentals

### Answer 📄

`undefined` means a variable has been declared but has not been assigned a value.

`null` is an intentional assignment that represents the absence of any object value.

In short:

- `undefined` is the default state of uninitialized variables.
- `null` is explicitly assigned by the developer to indicate “no value”.

## 🧠 Question 4

**ID**: javascript-004  
**Title**: What is the difference between var, let, and const?  
**Difficulty**: Easy  
**Category**: Fundamentals

### Answer 📄

`var`, `let`, and `const` are used to declare variables, but they differ in scope and behavior.

- `var` is function-scoped and allows redeclaration.
- `let` is block-scoped and does not allow redeclaration in the same scope.
- `const` is block-scoped and cannot be reassigned after initialization.

Additionally, variables declared with `let` and `const` are not accessible before initialization due to the Temporal Dead Zone.

Example:

```js
// var vs let
{
  var x = 10;
  let y = 20;
}

console.log(x); // 10
console.log(y); // ReferenceError
```

## 🧠 Question 5

**ID**: javascript-005  
**Title**: What is scope in JavaScript?  
**Difficulty**: Medium  
**Category**: Execution Context & Scope

### Answer 📄

Scope determines the accessibility of variables and functions in different parts of the code.

JavaScript has three main types of scope:

- Global Scope: Accessible everywhere in the program.
- Function Scope: Accessible only within a specific function.
- Block Scope: Accessible only inside a block defined by curly braces.

Scope is determined lexically, meaning it depends on where variables are written in the code, not where they are executed.

Example:

```js
let globalVar = 'global'; // Global Scope

function example() {
  let funcVar = 'function'; // Function Scope

  if (true) {
    let blockVar = 'block'; // Block Scope
    console.log(blockVar); // block
  }

  // console.log(blockVar); // ReferenceError
}
```

## 🧠 Question 6

**ID**: javascript-006  
**Title**: What is hoisting in JavaScript?  
**Difficulty**: Medium  
**Category**: Execution Context & Scope

### Answer 📄

Hoisting is JavaScript’s default behavior of moving variable and function declarations to the top of their containing scope during the creation phase of execution.

Function declarations are fully hoisted.

Variables declared with `var` are hoisted but initialized with `undefined`.

Variables declared with `let` and `const` are hoisted but remain in the Temporal Dead Zone until initialized.

Example:

```js
// Hoisting behavior

console.log(a); // undefined
var a = 5;

console.log(b); // ReferenceError
let b = 10;
```

## 🧠 Question 7

**ID**: javascript-007  
**Title**: What is the difference between primitive values and reference values?  
**Difficulty**: Medium  
**Category**: Memory & References

### Answer 📄

Primitive values are stored directly in memory and are immutable.

Reference values such as objects and arrays are stored in the heap, and variables hold references to their memory location.

When a primitive is assigned to another variable, a copy is created.

When a reference value is assigned, both variables point to the same memory location.

Example:

```js
// Primitive vs Reference

let a = 10;
let b = a;
b = 20;

console.log(a); // 10

let obj1 = { name: 'Ali' };
let obj2 = obj1;
obj2.name = 'Sara';

console.log(obj1.name); // Sara
```

## 🧠 Question 8

**ID**: javascript-008  
**Title**: How does memory management work in JavaScript?  
**Difficulty**: Medium  
**Category**: Memory & References

### Answer 📄

JavaScript automatically allocates memory when variables are declared and frees it when it is no longer needed.

Memory management relies on garbage collection.

Most modern JavaScript engines use a mark-and-sweep algorithm to identify unused objects. If an object is no longer reachable from the root (such as the global object), it becomes eligible for garbage collection.

Example:

```js
let user = { name: 'Rasool' }; // memory allocated

user = null; // reference removed → eligible for garbage collection
```

## 🧠 Question 9

**ID**: javascript-009  
**Title**: What is a closure in JavaScript?  
**Difficulty**: Medium  
**Category**: Functions

### Answer 📄

A closure is a function that remembers variables from its lexical scope even after the outer function has finished executing.

Closures allow functions to access variables that were available at the time they were created.

They are commonly used for data privacy, function factories, and maintaining state in asynchronous code.

Example:

```js
// Closure

function outer() {
  let count = 0;

  return function inner() {
    count++;
    return count;
  };
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```

## 🧠 Question 10

**ID**: javascript-010  
**Title**: What is the event loop in JavaScript?  
**Difficulty**: Medium  
**Category**: Asynchronous & Event Loop

### Answer 📄

JavaScript is single-threaded, meaning it has one call stack.

The event loop is a mechanism that allows JavaScript to handle asynchronous operations without blocking execution.

It continuously checks whether the call stack is empty. If it is, it takes tasks from the callback queue and pushes them onto the stack for execution.

This mechanism enables non-blocking behavior while maintaining a single-threaded model.

Example:

```js
// Event Loop

console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

console.log('End');

// Output:
// Start
// End
// Timeout
```

## 🧠 Question 11

**ID**: javascript-011  
**Title**: What is an execution context in JavaScript?  
**Difficulty**: Medium  
**Category**: Execution Context & Scope

### Answer 📄

An execution context is the environment in which JavaScript code is evaluated and executed.

There are three types of execution contexts:

- Global Execution Context
- Function Execution Context
- Eval Execution Context

Each execution context consists of two phases:

1. Creation Phase
2. Execution Phase

During the creation phase, variables and function declarations are stored in memory. During the execution phase, code runs line by line.

Execution contexts are managed using the call stack.

Example:

```js
// Global Execution Context is created first
const name = 'Rasool';

function greet() {
  // Function Execution Context is created when greet() is called
  const message = 'Hello ' + name; // accesses global scope via scope chain
  return message;
}

console.log(greet()); // Hello Rasool
// After greet() returns, its execution context is removed from the stack
```

## 🧠 Question 12

**ID**: javascript-012  
**Title**: What happens during the creation phase of an execution context?  
**Difficulty**: Medium  
**Category**: Execution Context & Scope

### Answer 📄

During the creation phase:

- The scope chain is determined.
- The variable environment is created.
- The `this` binding is established.
- Function declarations are fully initialized.
- Variables declared with `var` are initialized with undefined.
- Variables declared with `let` and `const` are placed in the Temporal Dead Zone.

No code is executed during this phase.

Example:

```js
// Creation Phase

console.log(x); // undefined
var x = 5;

function test() {}
```

## 🧠 Question 13

**ID**: javascript-013  
**Title**: What is the call stack and how does it work?  
**Difficulty**: Medium  
**Category**: Engine & Runtime

### Answer 📄

The call stack is a data structure that keeps track of function execution.

When a function is invoked, a new execution context is pushed onto the stack.

When a function completes, its execution context is removed from the stack.

If the stack exceeds its maximum size due to excessive recursion, a stack overflow error occurs.

Example:

```js
// Call Stack

function first() {
  second();
}

function second() {
  third();
}

function third() {
  console.log('Inside third');
}

first();
```

## 🧠 Question 14

**ID**: javascript-014  
**Title**: What is the Temporal Dead Zone (TDZ)?  
**Difficulty**: Medium  
**Category**: Execution Context & Scope

### Answer 📄

The Temporal Dead Zone is the time between entering a block and the actual declaration of a variable using `let` or `const`.

During this period, accessing the variable results in a ReferenceError.

Although `let` and `const` declarations are hoisted, they are not initialized until execution reaches their declaration line.

Example:

```js
// Temporal Dead Zone

{
  console.log(a); // ReferenceError: Cannot access 'a' before initialization
  let a = 10;
}
```

## 🧠 Question 15

**ID**: javascript-015  
**Title**: How does the `this` keyword work in JavaScript?  
**Difficulty**: Medium  
**Category**: Functions

### Answer 📄

The value of `this` depends on how a function is called.

- In the global context, `this` refers to the global object.
- In a regular function call, `this` depends on strict mode.
- In a method call, `this` refers to the object that owns the method.
- In arrow functions, `this` is lexically inherited from the surrounding scope.
- In constructor functions, `this` refers to the newly created instance.

Example:

```js
// this behavior

const obj = {
  name: 'Ali',
  greet() {
    console.log(this.name);
  },
};

obj.greet(); // Ali
```

## 🧠 Question 16

**ID**: javascript-016  
**Title**: What is the difference between regular functions and arrow functions?  
**Difficulty**: Medium  
**Category**: Functions

### Answer 📄

Arrow functions differ from regular functions in several ways:

- They do not have their own `this`.
- They do not have their own `arguments` object.
- They cannot be used as constructors.
- They are always anonymous.

Arrow functions inherit `this` from their lexical scope.

Example:

```js
// Arrow vs Regular

const obj = {
  name: 'Sara',
  regular() {
    console.log(this.name);
  },
  arrow: () => {
    console.log(this.name);
  },
};

obj.regular(); // Sara
obj.arrow(); // undefined
```

## 🧠 Question 17

**ID**: javascript-017  
**Title**: What is the difference between shallow copy and deep copy?  
**Difficulty**: Medium  
**Category**: Memory & References

### Answer 📄

A shallow copy creates a new object but copies references for nested objects.

A deep copy creates a completely independent clone, including all nested objects.

Modifying nested properties in a shallow copy affects the original object, while a deep copy prevents this behavior.

Example:

```js
// Shallow Copy — nested objects are still shared

const original = { info: { age: 20 } };
const shallow = { ...original };

shallow.info.age = 30;

console.log(original.info.age); // 30 (original was mutated)
```

```js
// Deep Copy — completely independent clone

const original = { info: { age: 20 } };
const deep = JSON.parse(JSON.stringify(original));

deep.info.age = 30;

console.log(original.info.age); // 20 (original is unchanged)
```

## 🧠 Question 18

**ID**: javascript-018  
**Title**: What are microtasks and macrotasks in the event loop?  
**Difficulty**: Hard  
**Category**: Asynchronous & Event Loop

### Answer 📄

In JavaScript’s event loop:

- Macrotasks include tasks such as timers and I/O operations.
- Microtasks include Promise callbacks and mutation observers.

After each macrotask completes, all microtasks in the queue are executed before the next macrotask begins.

Microtasks have higher priority than macrotasks.

Example:

```js
// Microtask vs Macrotask

console.log('Start');

setTimeout(() => console.log('Macrotask'), 0);

Promise.resolve().then(() => {
  console.log('Microtask');
});

console.log('End');

// Output:
// Start
// End
// Microtask
// Macrotask
```

## 🧠 Question 19

**ID**: javascript-019  
**Title**: What are the different states of a Promise?  
**Difficulty**: Medium  
**Category**: Asynchronous & Event Loop

### Answer 📄

A Promise has three states:

- Pending
- Fulfilled
- Rejected

Once a Promise is fulfilled or rejected, its state becomes settled and cannot change.

Promise handlers are executed asynchronously.

Example:

```js
// Promise states

const promise = new Promise((resolve, reject) => {
  resolve('Done');
});

promise.then((result) => console.log(result));
```

## 🧠 Question 20

**ID**: javascript-020  
**Title**: How does async/await work internally?  
**Difficulty**: Hard  
**Category**: Asynchronous & Event Loop

### Answer 📄

Async/await is syntactic sugar built on top of Promises.

An async function always returns a Promise.

The await keyword pauses execution of the async function until the Promise resolves, but it does not block the main thread.

Internally, async/await transforms asynchronous code into a structure similar to chained Promise calls.

Example:

```js
// async/await — await pauses the function, not the main thread

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log('Before await');
  await delay(1000);
  console.log('After await'); // runs after 1 second
}

run();
console.log('This runs immediately');

// Output:
// Before await
// This runs immediately
// After await
```

## 🧠 Question 21

**ID**: javascript-021  
**Title**: What is a prototype in JavaScript?  
**Difficulty**: Medium  
**Category**: Objects & Internals

### Answer 📄

A prototype is an object from which other objects inherit properties and methods.

Every JavaScript object has an internal link to another object called its prototype. When a property is accessed on an object, JavaScript first looks for it on the object itself. If not found, it looks up the prototype chain.

This mechanism is known as prototypal inheritance.

Example:

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  return `Hi, I'm ${this.name}`;
};

const user = new Person('Rasool');

console.log(user.sayHello()); // Hi, I'm Rasool
console.log(user.__proto__ === Person.prototype); // true
```

## 🧠 Question 22

**ID**: javascript-022  
**Title**: What is the prototype chain and how does property lookup work?  
**Difficulty**: Hard  
**Category**: Objects & Internals

### Answer 📄

The prototype chain is a series of linked objects that JavaScript uses to resolve property access.

When a property is requested:

1. The engine checks the object itself.
2. If not found, it checks the object's prototype.
3. This continues until reaching null.

If the property is not found anywhere in the chain, undefined is returned.

This lookup process enables inheritance in JavaScript.

Example:

```js
const animal = {
  eats: true,
};

const dog = Object.create(animal);
dog.barks = true;

console.log(dog.barks); // true (own property)
console.log(dog.eats); // true (inherited from prototype)
console.log(dog.hasOwnProperty('eats')); // false
```

## 🧠 Question 23

**ID**: javascript-023  
**Title**: What is the difference between `__proto__` and `prototype`?  
**Difficulty**: Hard  
**Category**: Objects & Internals

### Answer 📄

`prototype` is a property of constructor functions. It defines what will become the prototype of instances created with that constructor.

`__proto__` is an accessor property available on objects that points to their internal prototype.

In simple terms:

- `prototype` exists on functions.
- `__proto__` exists on objects.

Example:

```js
function Car() {}

const myCar = new Car();

console.log(Car.prototype === myCar.__proto__); // true
console.log(typeof Car.prototype); // object
console.log(typeof myCar.prototype); // undefined
```

`prototype` is on the function  
`__proto__` on the object created

## 🧠 Question 24

**ID**: javascript-024  
**Title**: How does inheritance work in JavaScript?  
**Difficulty**: Medium  
**Category**: Objects & Internals

### Answer 📄

Inheritance in JavaScript is based on prototypes.

Objects inherit properties and methods from other objects via the prototype chain.

This can be achieved using constructor functions, Object.create, or ES6 classes.

Unlike classical inheritance in other languages, JavaScript uses prototypal inheritance.

Example:

```js
class Animal {
  speak() {
    return 'Some sound';
  }
}

class Cat extends Animal {
  speak() {
    return 'Meow';
  }
}

const kitty = new Cat();

console.log(kitty.speak()); // Meow
```

Behind the scenes, it works the same with prototype, only the syntax is cleaner.

## 🧠 Question 25

**ID**: javascript-025  
**Title**: What is strict mode in JavaScript and why is it important?  
**Difficulty**: Medium  
**Category**: Language Behavior

### Answer 📄

Strict mode is a way to opt into a restricted version of JavaScript.

It eliminates some silent errors by throwing exceptions and prevents unsafe actions such as:

- Creating global variables accidentally
- Assigning to non-writable properties
- Using duplicate parameter names

Strict mode makes code more secure and easier to optimize.

Example:

```js
'use strict';

x = 10; // ReferenceError: x is not defined

function test(a, a) {
  // SyntaxError: Duplicate parameter name not allowed in this context
  return a;
}
```

Without strict mode, these errors would be silently ignored.
With strict mode, the engine throws immediately, making bugs easier to detect.

## 🧠 Question 26

**ID**: javascript-026  
**Title**: What are JavaScript modules and how do they work?  
**Difficulty**: Medium  
**Category**: Fundamentals

### Answer 📄

JavaScript modules allow code to be split into reusable, isolated files.

Modules use export to expose functionality and import to consume it.

Each module has its own scope and executes only once.

ES Modules are the standard module system in modern JavaScript.

Example:

```js
// math.js

export function add(a, b) {
  return a + b;
}
```

```js
// app.js

import { add } from './math.js';

console.log(add(2, 3)); // 5
```

Each file has a separate scope.  
The load is only done once.

## 🧠 Question 27

**ID**: javascript-027  
**Title**: What is a memory leak and how can it happen in JavaScript?  
**Difficulty**: Hard  
**Category**: Memory & References

### Answer 📄

A memory leak occurs when memory that is no longer needed is not released.

In JavaScript, memory leaks often happen due to:

- Unused references being retained
- Closures holding large objects
- Forgotten timers or event listeners
- Detached DOM elements still referenced in code

Memory leaks degrade performance over time.

Example:

```js
function startTimer() {
  const largeData = new Array(1000000).fill('leak');

  setInterval(() => {
    console.log(largeData.length);
  }, 1000);
}

startTimer();
```

Here `largeData` gets stuck in the closure.  
It won't be garbage collected until the interval is cleared.

Solution:

```js
const interval = setInterval(() => {
  console.log('running');
}, 1000);

clearInterval(interval);
```

## 🧠 Question 28

**ID**: javascript-028  
**Title**: What are WeakMap and WeakSet and how are they different from Map and Set?  
**Difficulty**: Hard  
**Category**: Objects & Internals

### Answer 📄

WeakMap and WeakSet are similar to Map and Set but hold weak references to objects.

If no other references to the key or value exist, the garbage collector can reclaim that memory automatically.

Key differences:

- **WeakMap**: stores key-value pairs where keys must be objects. Keys are weakly referenced.
- **WeakSet**: stores a collection of objects. Values are weakly referenced.
- Neither WeakMap nor WeakSet is iterable.

Example:

```js
// WeakMap — key is weakly held
let obj = { name: 'Rasool' };

const map = new Map();
map.set(obj, 'data');

const weakMap = new WeakMap();
weakMap.set(obj, 'data');

obj = null;
// map still holds the reference → no garbage collection
// weakMap releases the reference → eligible for garbage collection
```

```js
// WeakSet — object is weakly held
let user = { id: 1 };

const weakSet = new WeakSet();
weakSet.add(user);

console.log(weakSet.has(user)); // true

user = null;
// user is now eligible for garbage collection
// weakSet no longer holds it
```

> **_NOTE:_** WeakMap and WeakSet are not iterable and have no `size` property.

## 🧠 Question 29

**ID**: javascript-029  
**Title**: How does JavaScript handle object property descriptors?  
**Difficulty**: Hard  
**Category**: Objects & Internals

### Answer 📄

Each property in a JavaScript object has descriptors that define its behavior.

Property descriptors include:

- value
- writable
- enumerable
- configurable
- get
- set

These descriptors control whether a property can be modified, deleted, or enumerated.

Example:

```js
const user = {};

Object.defineProperty(user, 'name', {
  value: 'Rasool',
  writable: false,
  enumerable: true,
  configurable: false,
});

user.name = 'Ali'; // Does not change

console.log(user.name); // Rasool
```

The descriptor determines how the property behaves.

## 🧠 Question 30

**ID**: javascript-030  
**Title**: How do JavaScript engines optimize code execution?  
**Difficulty**: Hard  
**Category**: Engine & Runtime

### Answer 📄

Modern JavaScript engines use techniques such as Just-In-Time compilation to improve performance.

They analyze code at runtime, optimize frequently executed paths, and apply inline caching.

However, certain patterns such as changing object shapes dynamically can cause de-optimization.

Understanding engine behavior helps write more performant code.

Example:

```js
function createUser(name) {
  return { name };
}

const u1 = createUser('A');
const u2 = createUser('B');
```

Here the object shape is fixed → the engine optimizes.

But this is not good:

```js
const user = {};
user.name = 'A';
user.age = 25;
user.city = 'NY';
```

Adding properties sporadically will change the hidden class and may be de-opted.

## 🧠 Question 31

**ID**: javascript-031  
**Title**: What is the Execution Context in JavaScript and what are its main components?  
**Difficulty**: Hard  
**Category**: Execution Context & Scope

### Answer 📄

An Execution Context is an abstract environment where JavaScript code is evaluated and executed.

There are three types:

- Global Execution Context
- Function Execution Context
- Eval Execution Context

Each execution context consists of:

- Variable Environment
- Lexical Environment
- This Binding

The engine creates a new execution context whenever a function is invoked.

Example:

```js
var x = 10;

function foo() {
  var y = 20;
  console.log(x + y); // 30
}

foo();
```

## 🧠 Question 32

**ID**: javascript-032  
**Title**: What is the difference between the creation phase and execution phase of an execution context?  
**Difficulty**: Hard  
**Category**: Execution Context & Scope

### Answer 📄

During the creation phase:

- Memory is allocated for variables and functions.
- Variables declared with `var` are initialized with `undefined`.
- Function declarations are fully hoisted.

During the execution phase:

- Code runs line by line.
- Variables receive assigned values.
- Functions are executed.

Example:

```js
console.log(a); // undefined

var a = 5;
```

## 🧠 Question 33

**ID**: javascript-033  
**Title**: How does the Scope Chain work during variable resolution?  
**Difficulty**: Hard  
**Category**: Execution Context & Scope

### Answer 📄

The Scope Chain is a mechanism used to resolve variable access.

When a variable is referenced:

1. The engine checks the current scope.
2. If not found, it moves to the outer lexical scope.
3. This continues until reaching the global scope.
4. If not found, a ReferenceError is thrown.

This structure enables lexical scoping.

Example:

```js
const a = 1;

function outer() {
  const b = 2;

  function inner() {
    const c = 3;
    console.log(a, b, c); // 1 2 3
  }

  inner();
}

outer();
```

## 🧠 Question 34

**ID**: javascript-034  
**Title**: What is the difference between Lexical Scope and Dynamic Scope, and which one does JavaScript use?  
**Difficulty**: Medium  
**Category**: Execution Context & Scope

### Answer 📄

Lexical Scope means scope is determined by where a function is defined in the source code.

Dynamic Scope means scope is determined by how a function is called.

JavaScript uses Lexical Scope.

The scope of a function is fixed at definition time, not call time.

Example:

```js
function outer() {
  const x = 10;

  function inner() {
    console.log(x);
  }

  return inner;
}

const fn = outer();
fn(); // 10
```

## 🧠 Question 35

**ID**: javascript-035  
**Title**: What is a Closure in JavaScript and how does it relate to lexical scoping?  
**Difficulty**: Medium  
**Category**: Functions, Execution Context & Scope

### Answer 📄

A closure is created when a function remembers variables from its lexical scope even after the outer function has finished executing.

Closures are possible because JavaScript uses lexical scoping.

They allow functions to retain access to variables from their defining environment.

Example:

```js
function counter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const increment = counter();

console.log(increment()); // 1
console.log(increment()); // 2
```

## 🧠 Question 36

**ID**: javascript-036  
**Title**: Why can closures cause memory leaks in certain situations?  
**Difficulty**: Hard  
**Category**: Functions, Memory & References

### Answer 📄

Closures can cause memory leaks when they retain references to large objects that are no longer needed.

If a closure keeps a reference alive, the garbage collector cannot free that memory.

Common causes include:

- Unremoved event listeners
- Long-running timers
- Cached data in closures

Example:

```js
function createHandler() {
  const bigData = new Array(1000000).fill('data');

  return function () {
    console.log(bigData.length);
  };
}

const handler = createHandler();
// bigData stays in memory as long as handler exists
```

To avoid this, only keep what is actually needed inside the closure:

```js
function createHandler() {
  const bigData = new Array(1000000).fill('data');
  const length = bigData.length; // extract only what's needed

  return function () {
    console.log(length); // bigData is no longer referenced
  };
}

const handler = createHandler();
```

## 🧠 Question 37

**ID**: javascript-037  
**Title**: What is the Temporal Dead Zone (TDZ) and how does it work with let and const?  
**Difficulty**: Medium  
**Category**: Execution Context & Scope

### Answer 📄

The Temporal Dead Zone is the time between entering a block scope and the actual declaration of a `let` or `const` variable.

During this period, accessing the variable results in a ReferenceError.

Unlike `var`, `let` and `const` are hoisted but not initialized.

Example:

```js
{
  console.log(a); // ReferenceError: Cannot access 'a' before initialization
  let a = 10;
}
```

## 🧠 Question 38

**ID**: javascript-038  
**Title**: How does block scope differ from function scope?  
**Difficulty**: Medium  
**Category**: Execution Context & Scope

### Answer 📄

Function scope means variables declared with `var` are scoped to the entire function.

Block scope means variables declared with `let` and `const` are scoped to the nearest block `{}`.

Block scope prevents accidental variable leakage outside conditional or loop blocks.

Example:

```js
if (true) {
  var x = 1;
  let y = 2;
}

console.log(x); // 1
console.log(y); // ReferenceError
```

## 🧠 Question 39

**ID**: javascript-039  
**Title**: What happens internally when a function is returned from another function?  
**Difficulty**: Hard  
**Category**: Functions, Execution Context & Scope

### Answer 📄

When a function is returned, its lexical environment is preserved if it references outer variables.

The engine keeps those variables in memory so the returned function can access them later.

This is the foundation of closures.

Example:

```js
function greet(name) {
  return function () {
    console.log('Hello ' + name);
  };
}

const sayHello = greet('Rasool');
sayHello(); // Hello Rasool
```

## 🧠 Question 40

**ID**: javascript-040  
**Title**: How does JavaScript handle variable lookup when multiple nested scopes exist?  
**Difficulty**: Hard  
**Category**: Execution Context & Scope

### Answer 📄

JavaScript resolves variables using the Scope Chain.

It searches from the innermost scope outward until it finds the variable.

If the variable does not exist in any scope, a ReferenceError is thrown.

This lookup process is determined at function definition time.

Example:

```js
const a = 'global';

function first() {
  const a = 'first';

  function second() {
    console.log(a);
  }

  second();
}

first(); // "first"
```

## 🧠 Question 41

**ID**: javascript-041  
**Title**: What is the difference between == and === in JavaScript?  
**Difficulty**: Easy  
**Category**: Fundamentals

### Answer 📄

`==` is the loose equality operator. It compares values after performing type coercion if the types differ.

`===` is the strict equality operator. It compares both value and type without any coercion.

In most cases, `===` is preferred because it produces more predictable results.

Example:

```js
console.log(1 == '1'); // true  (type coercion applied)
console.log(1 === '1'); // false (different types)

console.log(null == undefined); // true
console.log(null === undefined); // false

console.log(0 == false); // true
console.log(0 === false); // false
```

## 🧠 Question 42

**ID**: javascript-042  
**Title**: How do call(), apply(), and bind() work?  
**Difficulty**: Medium  
**Category**: Functions

### Answer 📄

All three methods allow you to explicitly set the value of `this` for a function.

- `call()` invokes the function immediately with arguments passed individually.
- `apply()` invokes the function immediately with arguments passed as an array.
- `bind()` returns a new function with `this` permanently bound, without invoking it immediately.

Example:

```js
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const user = { name: 'Rasool' };

console.log(greet.call(user, 'Hello', '!')); // Hello, Rasool!
console.log(greet.apply(user, ['Hi', '.'])); // Hi, Rasool.

const boundGreet = greet.bind(user, 'Hey');
console.log(boundGreet('?')); // Hey, Rasool?
```

## 🧠 Question 43

**ID**: javascript-043  
**Title**: What is an IIFE in JavaScript?  
**Difficulty**: Medium  
**Category**: Functions

### Answer 📄

An IIFE (Immediately Invoked Function Expression) is a function that is defined and executed immediately after its creation.

It creates its own scope, preventing variables from leaking into the outer or global scope.

IIFEs were widely used before block-scoped variables with `let` and `const` were available.

Example:

```js
(function () {
  const message = 'Hello from IIFE';
  console.log(message); // Hello from IIFE
})();

// console.log(message); // ReferenceError — not accessible outside
```

## 🧠 Question 44

**ID**: javascript-044  
**Title**: What is currying in JavaScript?  
**Difficulty**: Hard  
**Category**: Functions

### Answer 📄

Currying is a technique of transforming a function with multiple arguments into a sequence of functions, each accepting a single argument.

It enables partial application, making functions more reusable and composable.

Example:

```js
// Regular function
function add(a, b) {
  return a + b;
}

// Curried version
function curriedAdd(a) {
  return function (b) {
    return a + b;
  };
}

const add5 = curriedAdd(5);
console.log(add5(3)); // 8
console.log(add5(10)); // 15
```

## 🧠 Question 45

**ID**: javascript-045  
**Title**: What is the difference between map(), filter(), and reduce()?  
**Difficulty**: Medium  
**Category**: Fundamentals

### Answer 📄

All three are higher-order array methods that return a new value without mutating the original array.

- `map()` transforms each element and returns a new array of the same length.
- `filter()` returns a new array containing only elements that pass a given condition.
- `reduce()` accumulates all elements into a single value.

Example:

```js
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4]

const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15
```

## 🧠 Question 46

**ID**: javascript-046  
**Title**: What is destructuring in JavaScript?  
**Difficulty**: Easy  
**Category**: Fundamentals

### Answer 📄

Destructuring is a syntax that allows unpacking values from arrays or properties from objects into individual variables.

It makes code more concise and readable when working with structured data.

Example:

```js
// Object destructuring
const user = { name: 'Rasool', age: 28 };
const { name, age } = user;
console.log(name); // Rasool
console.log(age); // 28

// Array destructuring
const colors = ['red', 'green', 'blue'];
const [first, second] = colors;
console.log(first); // red
console.log(second); // green
```

## 🧠 Question 47

**ID**: javascript-047  
**Title**: What are the spread and rest operators in JavaScript?  
**Difficulty**: Easy  
**Category**: Fundamentals

### Answer 📄

Both use the `...` syntax but serve opposite purposes.

The **spread** operator expands an iterable into individual elements.

The **rest** operator collects multiple elements into a single array or object.

Example:

```js
// Spread — expanding elements
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
console.log(arr2); // [1, 2, 3, 4, 5]

const base = { a: 1 };
const extended = { ...base, b: 2 };
console.log(extended); // { a: 1, b: 2 }

// Rest — collecting elements
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
```

## 🧠 Question 48

**ID**: javascript-048  
**Title**: What is the difference between Promise.all, Promise.race, Promise.allSettled, and Promise.any?  
**Difficulty**: Medium  
**Category**: Asynchronous & Event Loop

### Answer 📄

All four are Promise combinator methods used to handle multiple Promises simultaneously.

- `Promise.all()` resolves when all Promises resolve. Rejects immediately if any one fails.
- `Promise.race()` resolves or rejects as soon as the first Promise settles.
- `Promise.allSettled()` waits for all Promises to settle and returns all results regardless of outcome.
- `Promise.any()` resolves as soon as any one Promise fulfills. Rejects only if all fail.

Example:

```js
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3]).then(console.log);
// [1, 2, 3]

Promise.race([p1, p2, p3]).then(console.log);
// 1

Promise.allSettled([p1, p2, p3]).then(console.log);
// [{ status: 'fulfilled', value: 1 }, ...]

Promise.any([p1, p2, p3]).then(console.log);
// 1
```

## 🧠 Question 49

**ID**: javascript-049  
**Title**: What is event delegation in JavaScript?  
**Difficulty**: Medium  
**Category**: Language Behavior

### Answer 📄

Event delegation is a pattern where a single event listener is attached to a parent element to handle events triggered by its children.

It relies on event bubbling, where events propagate up from the target element through its ancestors.

This pattern improves performance by reducing the number of event listeners and works for dynamically added elements.

Example:

```js
// Without delegation — one listener per item (inefficient)
// document.querySelectorAll('li').forEach(li => li.addEventListener(...))

// With delegation — one listener on the parent
document.querySelector('#list').addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    console.log('Clicked:', event.target.textContent);
  }
});
```

## 🧠 Question 50

**ID**: javascript-050  
**Title**: What is type coercion in JavaScript?  
**Difficulty**: Medium  
**Category**: Fundamentals

### Answer 📄

Type coercion is the automatic or implicit conversion of a value from one data type to another.

JavaScript performs coercion in two ways:

- **Implicit coercion**: happens automatically during operations involving mixed types.
- **Explicit coercion**: done manually using conversion functions like `Number()`, `String()`, or `Boolean()`.

Example:

```js
// Implicit coercion
console.log(1 + '2'); // '12' (number coerced to string)
console.log(true + 1); // 2    (boolean coerced to number)
console.log('' == false); // true (both coerce to 0)

// Explicit coercion
console.log(Number('42')); // 42
console.log(String(100)); // '100'
console.log(Boolean(0)); // false
```

## 🧠 Question 51

**ID**: javascript-051  
**Title**: What is optional chaining (?.) in JavaScript?  
**Difficulty**: Easy  
**Category**: Fundamentals

### Answer 📄

Optional chaining (`?.`) allows you to safely access deeply nested properties without checking if each reference in the chain is valid.

If any part of the chain is `null` or `undefined`, the expression short-circuits and returns `undefined` instead of throwing an error.

It works with property access, method calls, and array indexing.

Example:

```js
const user = {
  profile: {
    address: {
      city: 'Tehran',
    },
  },
};

console.log(user?.profile?.address?.city); // Tehran
console.log(user?.contact?.phone); // undefined (no error thrown)

// With method calls
console.log(user?.getName?.()); // undefined (no error thrown)
```

## 🧠 Question 52

**ID**: javascript-052  
**Title**: What is the nullish coalescing operator (??) and how does it differ from ||?  
**Difficulty**: Easy  
**Category**: Fundamentals

### Answer 📄

The nullish coalescing operator (`??`) returns the right-hand side value only when the left-hand side is `null` or `undefined`.

The logical OR operator (`||`) returns the right-hand side when the left-hand side is any falsy value, including `0`, `''`, and `false`.

This distinction matters when `0` or an empty string are valid values.

Example:

```js
console.log(null ?? 'default'); // 'default'
console.log(undefined ?? 'default'); // 'default'

console.log(0 ?? 'default'); // 0       (not replaced — 0 is not null/undefined)
console.log(0 || 'default'); // 'default' (replaced — 0 is falsy)

console.log('' ?? 'fallback'); // ''     (empty string is not null/undefined)
console.log('' || 'fallback'); // 'fallback' (empty string is falsy)
```

## 🧠 Question 53

**ID**: javascript-053  
**Title**: How does the typeof operator work and what are its quirks?  
**Difficulty**: Easy  
**Category**: Fundamentals

### Answer 📄

The `typeof` operator returns a string indicating the type of the given value.

Common return values:

- `'string'`, `'number'`, `'bigint'`, `'boolean'`, `'undefined'`, `'symbol'`
- `'object'` for objects and arrays
- `'function'` for functions

Known quirk: `typeof null` returns `'object'`, which is a historical bug in JavaScript.

Example:

```js
console.log(typeof 'hello'); // 'string'
console.log(typeof 42); // 'number'
console.log(typeof true); // 'boolean'
console.log(typeof undefined); // 'undefined'
console.log(typeof Symbol()); // 'symbol'
console.log(typeof function () {}); // 'function'
console.log(typeof {}); // 'object'
console.log(typeof []); // 'object'
console.log(typeof null); // 'object' ← known quirk
```

## 🧠 Question 54

**ID**: javascript-054  
**Title**: What is the instanceof operator and how does it differ from typeof?  
**Difficulty**: Easy  
**Category**: Fundamentals

### Answer 📄

`instanceof` checks whether an object was created from a specific constructor or class by walking the prototype chain. It returns a boolean.

`typeof` returns a string type name and is best suited for primitives.

`instanceof` is better suited for checking object instances and class inheritance.

Example:

```js
class Animal {}
class Dog extends Animal {}

const dog = new Dog();

console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true (walks prototype chain)
console.log(dog instanceof Object); // true (everything inherits from Object)

console.log(typeof dog); // 'object'
console.log(typeof 42); // 'number'

console.log([] instanceof Array); // true
console.log([] instanceof Object); // true
```

## 🧠 Question 55

**ID**: javascript-055  
**Title**: What are Symbols in JavaScript and when are they used?  
**Difficulty**: Medium  
**Category**: Objects & Internals

### Answer 📄

A Symbol is a primitive value that is guaranteed to be unique. No two Symbols are ever equal, even if they have the same description.

Symbols are used as unique object property keys to avoid naming collisions, especially in shared codebases or libraries.

JavaScript also has built-in well-known Symbols such as `Symbol.iterator` that enable custom object behavior.

Example:

```js
const id = Symbol('id');
const id2 = Symbol('id');

console.log(id === id2); // false — every Symbol is unique

const user = {
  name: 'Rasool',
  [id]: 12345, // Symbol used as a property key
};

console.log(user[id]); // 12345
console.log(user.id); // undefined — not accessible by string key

// Well-known Symbol
const iterable = {
  [Symbol.iterator]() {
    let n = 0;
    return { next: () => ({ value: n++, done: n > 3 }) };
  },
};

console.log([...iterable]); // [0, 1, 2]
```

## 🧠 Question 56

**ID**: javascript-056  
**Title**: What are generator functions in JavaScript?  
**Difficulty**: Hard  
**Category**: Functions

### Answer 📄

A generator function is declared with `function*` and can pause its execution using the `yield` keyword, returning control to the caller.

Each call to `.next()` on the generator resumes execution until the next `yield` or the function ends.

Generators are useful for lazy evaluation, infinite sequences, and async flow control.

Example:

```js
function* counter() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = counter();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

## 🧠 Question 57

**ID**: javascript-057  
**Title**: What is the iterator protocol in JavaScript?  
**Difficulty**: Hard  
**Category**: Language Behavior

### Answer 📄

An object follows the iterator protocol when it implements a `next()` method that returns `{ value, done }`.

An iterable is any object with a `[Symbol.iterator]()` method that returns an iterator. This enables `for...of` loops and spread syntax.

Example:

```js
const range = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      },
    };
  },
};

for (const num of range) {
  console.log(num); // 1, 2, 3
}

console.log([...range]); // [1, 2, 3]
```

## 🧠 Question 58

**ID**: javascript-058  
**Title**: What is Proxy in JavaScript?  
**Difficulty**: Hard  
**Category**: Objects & Internals

### Answer 📄

A `Proxy` wraps an object and intercepts fundamental operations on it using traps such as `get`, `set`, `has`, and `deleteProperty`.

Proxies are used for validation, logging, access control, computed properties, and building reactive systems.

Example:

```js
const user = { name: 'Rasool', age: 28 };

const proxy = new Proxy(user, {
  get(target, key) {
    return key in target ? target[key] : `Property "${key}" not found`;
  },
  set(target, key, value) {
    if (key === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    target[key] = value;
    return true;
  },
});

console.log(proxy.name); // Rasool
console.log(proxy.country); // Property "country" not found
proxy.age = 30; // valid
// proxy.age = 'thirty';   // TypeError: Age must be a number
```

## 🧠 Question 59

**ID**: javascript-059  
**Title**: What is the Reflect API in JavaScript?  
**Difficulty**: Hard  
**Category**: Objects & Internals

### Answer 📄

The `Reflect` object provides static methods that mirror the operations available as Proxy traps.

It is commonly used inside Proxy traps to forward the original operation to the target object after applying custom logic.

Using `Reflect` makes Proxy handlers more reliable and predictable.

Example:

```js
const user = { name: 'Rasool' };

const proxy = new Proxy(user, {
  set(target, key, value) {
    console.log(`Setting "${key}" to "${value}"`);
    return Reflect.set(target, key, value); // forward to original object
  },
});

proxy.name = 'Ali';
// Setting "name" to "Ali"

console.log(user.name); // Ali
```

## 🧠 Question 60

**ID**: javascript-060  
**Title**: What are default parameters in JavaScript?  
**Difficulty**: Easy  
**Category**: Functions

### Answer 📄

Default parameters allow function parameters to have a fallback value when no argument is passed or when `undefined` is explicitly provided.

Default values are evaluated at call time, not at function definition time.

Example:

```js
function greet(name = 'Guest', greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}

console.log(greet()); // Hello, Guest!
console.log(greet('Rasool')); // Hello, Rasool!
console.log(greet('Sara', 'Hi')); // Hi, Sara!
console.log(greet(undefined, 'Hey')); // Hey, Guest! (undefined triggers default)
```

## 🧠 Question 61

**ID**: javascript-061  
**Title**: What are Object.keys(), Object.values(), and Object.entries()?  
**Difficulty**: Easy  
**Category**: Objects & Internals

### Answer 📄

These static methods return arrays of an object's own enumerable properties.

- `Object.keys()` returns an array of property names.
- `Object.values()` returns an array of property values.
- `Object.entries()` returns an array of `[key, value]` pairs.

Example:

```js
const user = { name: 'Rasool', age: 28, city: 'Tehran' };

console.log(Object.keys(user)); // ['name', 'age', 'city']
console.log(Object.values(user)); // ['Rasool', 28, 'Tehran']
console.log(Object.entries(user)); // [['name', 'Rasool'], ['age', 28], ['city', 'Tehran']]

// Common use: iterating over entries
Object.entries(user).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});
```

## 🧠 Question 62

**ID**: javascript-062  
**Title**: What is the difference between Object.assign() and the spread operator for merging objects?  
**Difficulty**: Easy  
**Category**: Objects & Internals

### Answer 📄

Both copy properties from source objects into a target, but differ in how they work.

- `Object.assign()` mutates the first argument (target object).
- The spread operator `{...obj}` always creates a new object without mutation.

Both perform shallow copies — nested objects are copied by reference.

Example:

```js
const defaults = { theme: 'light', lang: 'en' };
const userPrefs = { lang: 'fa' };

// Object.assign — mutates the target
const config1 = Object.assign({}, defaults, userPrefs);
console.log(config1); // { theme: 'light', lang: 'fa' }

// Spread — creates a new object
const config2 = { ...defaults, ...userPrefs };
console.log(config2); // { theme: 'light', lang: 'fa' }
```

## 🧠 Question 63

**ID**: javascript-063  
**Title**: What is the difference between Object.freeze() and Object.seal()?  
**Difficulty**: Medium  
**Category**: Objects & Internals

### Answer 📄

Both methods restrict how an object can be modified, but at different levels.

- `Object.freeze()` prevents adding, removing, or modifying any properties.
- `Object.seal()` prevents adding or removing properties, but allows modifying existing values.

Both are shallow — nested objects are not affected.

Example:

```js
// Object.freeze
const frozen = Object.freeze({ name: 'Rasool', age: 28 });
frozen.name = 'Ali'; // silently fails (throws in strict mode)
frozen.city = 'Tehran'; // silently fails
console.log(frozen); // { name: 'Rasool', age: 28 }

// Object.seal
const sealed = Object.seal({ name: 'Rasool', age: 28 });
sealed.name = 'Ali'; // allowed — existing property
sealed.city = 'Tehran'; // silently fails — new property
console.log(sealed); // { name: 'Ali', age: 28 }
```

## 🧠 Question 64

**ID**: javascript-064  
**Title**: What are Array.from() and Array.isArray()?  
**Difficulty**: Easy  
**Category**: Fundamentals

### Answer 📄

`Array.from()` creates a new array from an array-like or iterable object. It also accepts an optional mapping function.

`Array.isArray()` checks whether a value is a true array, returning a boolean.

Example:

```js
// Array.from
console.log(Array.from('hello')); // ['h', 'e', 'l', 'l', 'o']
console.log(Array.from(new Set([1, 2, 2, 3]))); // [1, 2, 3]
console.log(Array.from({ length: 3 }, (_, i) => i + 1)); // [1, 2, 3]

// Array.isArray
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray('hello')); // false
console.log(Array.isArray({ length: 3 })); // false
```

## 🧠 Question 65

**ID**: javascript-065  
**Title**: What are flat() and flatMap() in JavaScript?  
**Difficulty**: Medium  
**Category**: Fundamentals

### Answer 📄

`flat()` creates a new array with sub-array elements flattened to a specified depth. The default depth is 1.

`flatMap()` maps each element using a function and then flattens the result by one level. It is equivalent to calling `.map().flat(1)`.

Example:

```js
const nested = [1, [2, 3], [4, [5, 6]]];

console.log(nested.flat()); // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2)); // [1, 2, 3, 4, 5, 6]
console.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5, 6]

const sentences = ['Hello world', 'Foo bar'];
const words = sentences.flatMap((s) => s.split(' '));
console.log(words); // ['Hello', 'world', 'Foo', 'bar']
```

## 🧠 Question 66

**ID**: javascript-066  
**Title**: What are find() and findIndex() in JavaScript?  
**Difficulty**: Easy  
**Category**: Fundamentals

### Answer 📄

`find()` returns the first element that satisfies a condition, or `undefined` if no match is found.

`findIndex()` returns the index of the first matching element, or `-1` if no match is found.

Both stop iteration as soon as the first match is found.

Example:

```js
const users = [
  { id: 1, name: 'Rasool' },
  { id: 2, name: 'Sara' },
  { id: 3, name: 'Ali' },
];

const user = users.find((u) => u.id === 2);
console.log(user); // { id: 2, name: 'Sara' }

const index = users.findIndex((u) => u.id === 2);
console.log(index); // 1

console.log(users.find((u) => u.id === 99)); // undefined
console.log(users.findIndex((u) => u.id === 99)); // -1
```

## 🧠 Question 67

**ID**: javascript-067  
**Title**: What are some() and every() in JavaScript?  
**Difficulty**: Easy  
**Category**: Fundamentals

### Answer 📄

`some()` returns `true` if at least one element satisfies the condition.

`every()` returns `true` only if all elements satisfy the condition.

Both short-circuit: `some()` stops at the first truthy result, `every()` stops at the first falsy result.

Example:

```js
const numbers = [1, 2, 3, 4, 5];

console.log(numbers.some((n) => n > 4)); // true  (5 passes)
console.log(numbers.some((n) => n > 10)); // false (none passes)

console.log(numbers.every((n) => n > 0)); // true  (all pass)
console.log(numbers.every((n) => n > 3)); // false (not all pass)
```

## 🧠 Question 68

**ID**: javascript-068  
**Title**: How does Array.sort() work and what are its common pitfalls?  
**Difficulty**: Medium  
**Category**: Fundamentals

### Answer 📄

By default, `sort()` converts elements to strings and sorts them lexicographically (alphabetically). This produces incorrect results for numbers.

To sort numbers correctly, a comparator function must be provided.

`sort()` mutates the original array and is not guaranteed to be stable in all environments, though modern engines implement stable sort.

Example:

```js
const fruits = ['banana', 'apple', 'cherry'];
console.log(fruits.sort()); // ['apple', 'banana', 'cherry']

// Default sort — wrong for numbers
const nums = [10, 1, 5, 2];
console.log(nums.sort()); // [1, 10, 2, 5] ← lexicographic, incorrect

// Correct numeric sort
console.log([10, 1, 5, 2].sort((a, b) => a - b)); // [1, 2, 5, 10] — ascending
console.log([10, 1, 5, 2].sort((a, b) => b - a)); // [10, 5, 2, 1] — descending
```

## 🧠 Question 69

**ID**: javascript-069  
**Title**: What is memoization in JavaScript?  
**Difficulty**: Medium  
**Category**: Functions

### Answer 📄

Memoization is an optimization technique where the result of a function call is cached based on its inputs. If the same inputs are provided again, the cached result is returned instead of recomputing.

It is useful for expensive or frequently called functions with the same arguments.

Example:

```js
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log('From cache');
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const add = memoize((a, b) => a + b);

console.log(add(2, 3)); // 5
console.log(add(2, 3)); // From cache — 5
console.log(add(4, 5)); // 9
```

## 🧠 Question 70

**ID**: javascript-070  
**Title**: What are JavaScript error types and how do you create custom errors?  
**Difficulty**: Medium  
**Category**: Language Behavior

### Answer 📄

JavaScript has several built-in error types:

- `Error` — generic base error
- `TypeError` — operation on a wrong type
- `ReferenceError` — access to an undefined variable
- `SyntaxError` — invalid syntax
- `RangeError` — value outside an allowed range

Custom errors can be created by extending the `Error` class.

Example:

```js
// Built-in error types
try {
  null.property; // TypeError
} catch (e) {
  console.log(e instanceof TypeError); // true
  console.log(e.name); // 'TypeError'
}

// Custom error
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

try {
  throw new ValidationError('Invalid email', 'email');
} catch (e) {
  console.log(e.name); // ValidationError
  console.log(e.message); // Invalid email
  console.log(e.field); // email
}
```

## 🧠 Question 71

**ID**: javascript-071  
**Title**: What is debounce in JavaScript?  
**Difficulty**: Medium  
**Category**: Asynchronous & Event Loop

### Answer 📄

Debounce is a technique that delays the execution of a function until after a specified time has elapsed since the last time it was called.

It is commonly used to optimize performance in scenarios like search inputs, window resize, and scroll events where a function should not run on every single event.

Example:

```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const handleSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

handleSearch('j');
handleSearch('ja');
handleSearch('jav');
handleSearch('java'); // only this one actually triggers the search
```

## 🧠 Question 72

**ID**: javascript-072  
**Title**: What is throttle in JavaScript?  
**Difficulty**: Medium  
**Category**: Asynchronous & Event Loop

### Answer 📄

Throttle limits how often a function can execute over time, ensuring it runs at most once per specified interval regardless of how many times it is called.

Unlike debounce which waits for calls to stop, throttle guarantees execution at regular intervals.

Example:

```js
function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}

const handleScroll = throttle(() => {
  console.log('Scroll handled');
}, 200);

// Even if scroll fires 100 times/second, function runs at most every 200ms
window.addEventListener('scroll', handleScroll);
```

## 🧠 Question 73

**ID**: javascript-073  
**Title**: What is the difference between event bubbling and event capturing?  
**Difficulty**: Medium  
**Category**: Language Behavior

### Answer 📄

When a DOM event fires, it travels through two phases:

- **Capturing phase**: the event travels from the root down to the target element.
- **Bubbling phase**: the event travels from the target back up to the root.

By default, event listeners use the bubbling phase. Pass `true` as the third argument to `addEventListener` to use capturing.

`event.stopPropagation()` halts further propagation through the chain.

Example:

```js
document.querySelector('#parent').addEventListener('click', () => {
  console.log('Parent — bubbling');
});

document.querySelector('#child').addEventListener('click', () => {
  console.log('Child clicked');
});

// Clicking child logs:
// Child clicked
// Parent — bubbling

// Capturing — fires before bubbling
document.querySelector('#parent').addEventListener(
  'click',
  () => {
    console.log('Parent — capturing');
  },
  true,
);
```

## 🧠 Question 74

**ID**: javascript-074  
**Title**: What is the difference between localStorage, sessionStorage, and cookies?  
**Difficulty**: Medium  
**Category**: Engine & Runtime

### Answer 📄

These mechanisms store data on the client side but differ in behavior, lifetime, and security.

**localStorage**

- Persists even after the browser is closed and reopened
- Around 5MB storage limit
- Accessible only via JavaScript
- Not automatically sent with HTTP requests

**sessionStorage**

- Persists only within a single browser tab
- Cleared when the tab is closed
- Same API as localStorage

**Cookies**

- Limited to about 4KB
- Automatically sent with every HTTP request to the server
- Support expiration dates
- Can be marked `HttpOnly` and `Secure`

**Security**

- `localStorage` is vulnerable to XSS attacks
- `HttpOnly` cookies cannot be accessed via JavaScript, making them safer for tokens

Example:

```js
// localStorage
localStorage.setItem('theme', 'dark');
console.log(localStorage.getItem('theme')); // 'dark'

// sessionStorage
sessionStorage.setItem('step', '2');
console.log(sessionStorage.getItem('step')); // '2'

// Cookie
document.cookie = 'token=abc123; Secure; SameSite=Strict';
```

## 🧠 Question 75

**ID**: javascript-075  
**Title**: What is the difference between setTimeout and setInterval?  
**Difficulty**: Easy  
**Category**: Asynchronous & Event Loop

### Answer 📄

- `setTimeout(fn, delay)` executes a function once after the specified delay in milliseconds.
- `setInterval(fn, interval)` executes a function repeatedly at the specified interval.

Both return an ID that can be used to cancel execution with `clearTimeout` or `clearInterval`.

Example:

```js
// setTimeout — runs once after 1 second
const timeoutId = setTimeout(() => {
  console.log('Runs once');
}, 1000);

// setInterval — runs every second
const intervalId = setInterval(() => {
  console.log('Runs every second');
}, 1000);

// Cancel both
clearTimeout(timeoutId);
clearInterval(intervalId);
```

## 🧠 Question 76

**ID**: javascript-076  
**Title**: What is requestAnimationFrame in JavaScript?  
**Difficulty**: Medium  
**Category**: Asynchronous & Event Loop

### Answer 📄

`requestAnimationFrame()` schedules a callback to run before the next browser repaint, typically at 60 frames per second.

It is more efficient than `setTimeout` for animations because it synchronizes with the display refresh rate and automatically pauses when the tab is not visible, saving resources.

Example:

```js
let position = 0;

function animate() {
  position += 2;
  document.querySelector('#box').style.left = position + 'px';

  if (position < 300) {
    requestAnimationFrame(animate); // schedule next frame
  }
}

requestAnimationFrame(animate);
```

## 🧠 Question 77

**ID**: javascript-077  
**Title**: What are pure functions and immutability in JavaScript?  
**Difficulty**: Medium  
**Category**: Functions

### Answer 📄

A pure function always returns the same output for the same inputs and has no side effects — it does not modify any external state.

Immutability means not modifying existing data, but creating new copies instead.

Together they make code more predictable, testable, and easier to reason about.

Example:

```js
// Impure — modifies external state
let count = 0;
function increment() {
  count++; // side effect
}

// Pure — no side effects, same input → same output
function add(a, b) {
  return a + b;
}

// Impure — mutates the original array
function addItem(arr, item) {
  arr.push(item);
  return arr;
}

// Pure — returns a new array
function addItemPure(arr, item) {
  return [...arr, item];
}
```

## 🧠 Question 78

**ID**: javascript-078  
**Title**: What is function composition in JavaScript?  
**Difficulty**: Medium  
**Category**: Functions

### Answer 📄

Function composition is the process of combining multiple functions so that the output of one becomes the input of the next.

It enables building complex operations from smaller, reusable, and testable functions.

Example:

```js
const double = (x) => x * 2;
const addTen = (x) => x + 10;
const square = (x) => x * x;

// Manual composition (right to left)
const result = square(addTen(double(3)));
console.log(result); // double(3)=6 → addTen(6)=16 → square(16)=256

// Compose utility
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((acc, fn) => fn(acc), x);

const transform = compose(square, addTen, double);
console.log(transform(3)); // 256
```

## 🧠 Question 79

**ID**: javascript-079  
**Title**: What are Web Workers in JavaScript?  
**Difficulty**: Medium  
**Category**: Engine & Runtime

### Answer 📄

Web Workers allow JavaScript to run in a background thread, separate from the main thread.

This enables heavy computations to execute without blocking the UI or freezing the browser.

Workers do not have access to the DOM. Communication between the main thread and a worker happens via `postMessage` and `onmessage`.

Example:

```js
// main.js
const worker = new Worker('worker.js');

worker.postMessage({ numbers: [1, 2, 3, 4, 5] });

worker.onmessage = (event) => {
  console.log('Sum from worker:', event.data); // 15
};

// worker.js
self.onmessage = (event) => {
  const sum = event.data.numbers.reduce((acc, n) => acc + n, 0);
  self.postMessage(sum);
};
```

## 🧠 Question 80

**ID**: javascript-080  
**Title**: How does error handling work with async/await?  
**Difficulty**: Medium  
**Category**: Asynchronous & Event Loop

### Answer 📄

In async/await, errors from rejected Promises must be caught using `try/catch`.

Without error handling, unhandled rejections can cause silent failures or crash the program.

As an alternative, `.catch()` can be chained directly on the returned Promise.

Example:

```js
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) throw new Error('User not found');

    const user = await response.json();
    return user;
  } catch (error) {
    console.log('Error:', error.message);
    return null;
  }
}

// Alternative: .catch() on the Promise
fetchUser(1)
  .then((user) => console.log(user))
  .catch((err) => console.log(err));
```

## 🧠 Question 81

**ID**: javascript-081  
**Title**: What are hidden classes in JavaScript engines and how do they affect performance?  
**Difficulty**: Hard  
**Category**: Engine & Runtime

### Answer 📄

Hidden classes are internal structures used by JavaScript engines (such as V8) to optimize object property access.

When objects are created with the same property structure and order, the engine assigns them the same hidden class. This allows fast property access through inline caching.

If object shapes change dynamically (e.g., adding properties later or in different orders), the engine may create new hidden classes, which can cause de-optimization.

Consistent object structure improves performance.

Example:

```js
function createUser(name, age) {
  return { name, age };
}

const u1 = createUser('A', 20);
const u2 = createUser('B', 25);
// Same hidden class → optimized

const user = {};
user.name = 'C';
user.age = 30;
// Different shape transitions → may de-optimize
```

## 🧠 Question 82

**ID**: javascript-082  
**Title**: What is inline caching and how does it optimize property access?  
**Difficulty**: Hard  
**Category**: Engine & Runtime

### Answer 📄

Inline caching is an optimization technique used by JavaScript engines to speed up property access.

When a property is accessed repeatedly on objects with the same hidden class, the engine caches the location of that property.

Future accesses skip full lookup and use the cached reference directly, improving performance.

If object shapes vary, inline caches may become invalidated.

Example:

```js
function getName(user) {
  return user.name;
}

const u1 = { name: 'A' };
const u2 = { name: 'B' };

getName(u1);
getName(u2);
// Engine can optimize repeated access to `.name`
```

## 🧠 Question 83

**ID**: javascript-083  
**Title**: How does generational garbage collection work in modern JavaScript engines?  
**Difficulty**: Hard  
**Category**: Memory & References, Engine & Runtime

### Answer 📄

Modern JavaScript engines use generational garbage collection.

Memory is divided into generations:

- Young generation (short-lived objects)
- Old generation (long-lived objects)

Most objects die young, so the engine frequently cleans the young generation.

Objects that survive multiple collections are promoted to the old generation, which is collected less frequently.

This improves overall performance and memory efficiency.

Example:

```js
function createTemp() {
  return { value: Math.random() };
}

for (let i = 0; i < 100000; i++) {
  createTemp();
}
// Most objects are short-lived → collected in young generation
```

## 🧠 Question 84

**ID**: javascript-084  
**Title**: What is partial application and how does it differ from currying?  
**Difficulty**: Medium  
**Category**: Functions

### Answer 📄

Partial application is a technique where a function is invoked with some of its arguments fixed, returning a new function with fewer parameters.

Currying transforms a function with multiple arguments into a sequence of functions each taking a single argument.

Partial application fixes arguments at once.
Currying transforms the function structure.

Example:

```js
function multiply(a, b, c) {
  return a * b * c;
}

function partialMultiply(a) {
  return (b, c) => multiply(a, b, c);
}

const double = partialMultiply(2);
console.log(double(3, 4)); // 24
```

## 🧠 Question 85

**ID**: javascript-085  
**Title**: What are higher-order functions and why are they important?  
**Difficulty**: Medium  
**Category**: Functions

### Answer 📄

A higher-order function is a function that either:

- Takes another function as an argument
- Returns a function
- Or both

They enable abstraction, composition, and functional programming patterns.

Common examples include map, filter, and reduce.

Example:

```js
function greet(name) {
  return `Hello ${name}`;
}

function processUser(name, callback) {
  return callback(name);
}

console.log(processUser('Rasool', greet));
```

## 🧠 Question 86

**ID**: javascript-086  
**Title**: What is referential transparency in JavaScript?  
**Difficulty**: Hard  
**Category**: Functions

### Answer 📄

Referential transparency means that a function can be replaced with its output value without changing program behavior.

A function is referentially transparent if:

- It always returns the same output for the same input
- It has no side effects

This property enables predictable and testable code.

Example:

```js
function add(a, b) {
  return a + b;
}

const result = add(2, 3);
// add(2, 3) can be replaced with 5 safely
```

## 🧠 Question 87

**ID**: javascript-087  
**Title**: What is starvation in the JavaScript event loop?  
**Difficulty**: Hard  
**Category**: Asynchronous & Event Loop

### Answer 📄

Starvation occurs when certain tasks in the event loop never get executed because other tasks continuously occupy the queue.

For example, continuously scheduling microtasks can prevent macrotasks or rendering from running.

This can block UI updates and degrade responsiveness.

Example:

```js
function loop() {
  Promise.resolve().then(loop);
}

loop();
// Macrotasks may never execute
```

## 🧠 Question 88

**ID**: javascript-088  
**Title**: Why is `typeof null` equal to "object"?  
**Difficulty**: Medium  
**Category**: Language Behavior

### Answer 📄

`typeof null` returns `"object"` due to a historical bug in early JavaScript implementations.

In the original implementation, values were tagged, and null was represented as a null pointer, which matched the object type tag.

This behavior has been preserved for backward compatibility.

Example:

```js
console.log(typeof null); // "object"
```

## 🧠 Question 89

**ID**: javascript-089  
**Title**: What is NaN and why is `NaN !== NaN`?  
**Difficulty**: Medium  
**Category**: Language Behavior

### Answer 📄

NaN stands for "Not a Number" and represents an invalid numeric result.

According to the IEEE 754 standard, NaN is not equal to any value, including itself.

To check for NaN, use Number.isNaN().

Example:

```js
console.log(NaN === NaN); // false
console.log(Number.isNaN(NaN)); // true
```

## 🧠 Question 90

**ID**: javascript-090  
**Title**: What is structuredClone and when should it be used?  
**Difficulty**: Medium  
**Category**: Objects & Internals

### Answer 📄

structuredClone is a built-in method that creates a deep clone of structured data.

Unlike JSON-based cloning, it supports:

- Dates
- Maps
- Sets
- Typed arrays
- Circular references

It should be used when a reliable deep copy is needed.

Example:

```js
const obj = {
  date: new Date(),
  nested: { value: 1 },
};

const clone = structuredClone(obj);

console.log(clone !== obj); // true
console.log(clone.nested !== obj.nested); // true
```

## 🧠 Question 91

**ID**: javascript-091  
**Title**: What is the Observer pattern and how can it be implemented in JavaScript?  
**Difficulty**: Hard  
**Category**: Objects & Internals

### Answer 📄

The Observer pattern (also known as Pub/Sub) allows objects to subscribe to events and be notified when those events occur.

It decouples the event source (publisher) from the listeners (subscribers).

Key components:

- `on(event, listener)` — subscribe to an event
- `emit(event, data)` — trigger all listeners for an event
- `off(event, listener)` — unsubscribe from an event

This pattern is widely used in event-driven systems, UI frameworks, and Node.js EventEmitter.

Example:

```js
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }

  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((l) => l !== listener);
    }
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((listener) => listener(data));
    }
  }
}

const emitter = new EventEmitter();

const onLogin = (user) => console.log(`${user} logged in`);

emitter.on('login', onLogin);
emitter.emit('login', 'Rasool'); // Rasool logged in

emitter.off('login', onLogin);
emitter.emit('login', 'Ali'); // (no output)
```

## 🧠 Question 92

**ID**: javascript-092  
**Title**: What is the difference between deep equality and reference equality?  
**Difficulty**: Medium  
**Category**: Objects & Internals

### Answer 📄

Reference equality checks whether two variables point to the same memory reference.

Deep equality checks whether two values have the same structure and content.

In JavaScript, `===` compares references for objects, not structure.

Deep comparison requires recursive property checks.

Example:

```js
const a = { value: 1 };
const b = { value: 1 };

console.log(a === b); // false (different references)

function deepEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

console.log(deepEqual(a, b)); // true (structure match)
```

## 🧠 Question 93

**ID**: javascript-093  
**Title**: What are getters and setters and how do they work internally?  
**Difficulty**: Hard  
**Category**: Objects & Internals

### Answer 📄

Getters and setters are special methods that define custom behavior when accessing or modifying object properties.

They are defined using property descriptors.

Internally, they replace direct property access with function execution.

This enables validation, computed values, or side effects.

Example:

```js
const user = {
  firstName: 'Rasool',
  lastName: 'Zia',

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  set fullName(value) {
    const [first, last] = value.split(' ');
    this.firstName = first;
    this.lastName = last;
  },
};

console.log(user.fullName);
user.fullName = 'Ali Reza';
console.log(user.firstName);
```

## 🧠 Question 94

**ID**: javascript-094  
**Title**: What are well-known Symbols in JavaScript?  
**Difficulty**: Hard  
**Category**: Objects & Internals

### Answer 📄

Well-known Symbols are built-in Symbol properties that define special object behaviors.

Examples include:

- Symbol.iterator
- Symbol.toStringTag
- Symbol.toPrimitive
- Symbol.asyncIterator

They allow objects to customize language-level behavior such as iteration and type conversion.

Example:

```js
const obj = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
  },
};

for (const value of obj) {
  console.log(value);
}
```

## 🧠 Question 95

**ID**: javascript-095  
**Title**: What is async iteration and how does `for await...of` work?  
**Difficulty**: Hard  
**Category**: Asynchronous & Event Loop

### Answer 📄

Async iteration allows consuming asynchronous data sources sequentially using `for await...of`.

An async iterable implements `Symbol.asyncIterator`, which returns an async iterator whose `next()` method returns a Promise.

Async generators using `async function*` make it easy to produce async sequences.

This is useful for paginated APIs, streams, or any data that arrives asynchronously.

Example:

```js
async function* asyncRange(start, end) {
  for (let i = start; i <= end; i++) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    yield i;
  }
}

async function main() {
  for await (const num of asyncRange(1, 3)) {
    console.log(num);
    // 1
    // 2
    // 3
  }
}

main();
```

## 🧠 Question 96

**ID**: javascript-096  
**Title**: What is the difference between Object.create() and class-based instantiation?  
**Difficulty**: Medium  
**Category**: Objects & Internals

### Answer 📄

Object.create() creates a new object with a specified prototype.

Class-based instantiation uses the `class` and `new` syntax to create instances.

Under the hood, classes are syntactic sugar over prototypes.

Object.create provides more direct control over prototype chaining.

Example:

```js
const animal = {
  speak() {
    return 'sound';
  },
};

const dog = Object.create(animal);
console.log(dog.speak());
```

## 🧠 Question 97

**ID**: javascript-097  
**Title**: What are the pitfalls of Automatic Semicolon Insertion (ASI)?  
**Difficulty**: Medium  
**Category**: Language Behavior

### Answer 📄

Automatic Semicolon Insertion is a mechanism where JavaScript inserts semicolons automatically in certain cases.

This can lead to unexpected behavior when line breaks occur after `return`, `break`, or before expressions starting with `(` or `[`.

Explicit semicolons prevent ambiguity.

Example:

```js
function test() {
  return;
  {
    value: 1;
  }
}

console.log(test()); // undefined
```

## 🧠 Question 98

**ID**: javascript-098  
**Title**: How does the browser handle rendering between tasks in the event loop?  
**Difficulty**: Hard  
**Category**: Asynchronous & Event Loop

### Answer 📄

The browser performs rendering between macrotasks.

After executing a task and processing microtasks, the browser may perform layout, paint, and compositing steps.

If JavaScript blocks the main thread continuously, rendering cannot occur, causing UI freezes.

Understanding this interaction helps prevent performance issues.

Example:

```js
while (true) {
  // Blocking loop
}
```

The browser cannot render updates while the main thread is blocked.

## 🧠 Question 99

**ID**: javascript-099  
**Title**: What is the difference between `for...in` and `for...of`?  
**Difficulty**: Medium  
**Category**: Language Behavior

### Answer 📄

`for...in` iterates over the enumerable **property keys** of an object (including inherited ones).

`for...of` iterates over the **values** of an iterable (arrays, strings, Maps, Sets, generators, etc.).

Key differences:

- `for...in` works on any object; `for...of` requires an iterable
- `for...in` can unexpectedly include inherited properties
- `for...of` cannot be used directly on plain objects (they are not iterable by default)

Example:

```js
const arr = ['a', 'b', 'c'];

for (const key in arr) {
  console.log(key); // 0, 1, 2 (indices as strings)
}

for (const value of arr) {
  console.log(value); // a, b, c
}

const obj = { x: 1, y: 2 };

for (const key in obj) {
  console.log(key); // x, y
}

// for...of on plain object throws TypeError
// for (const val of obj) {} // TypeError: obj is not iterable
```

## 🧠 Question 100

**ID**: javascript-100  
**Title**: What are tagged template literals and how do they work?  
**Difficulty**: Medium  
**Category**: Fundamentals

### Answer 📄

Tagged template literals allow a function (the tag) to process a template literal before it is evaluated.

The tag function receives the string parts as an array and the interpolated values as separate arguments.

This enables custom string processing such as sanitization, localization, or DSLs.

Example:

```js
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] !== undefined ? `[${values[i]}]` : '');
  }, '');
}

const name = 'Rasool';
const score = 95;

console.log(highlight`Player ${name} scored ${score} points.`);
// Player [Rasool] scored [95] points.
```

## 🧠 Question 101

**ID**: javascript-101  
**Title**: What is dynamic `import()` and how does it differ from static import?  
**Difficulty**: Medium  
**Category**: Fundamentals

### Answer 📄

Static `import` is resolved at parse time and cannot be conditional or deferred.

Dynamic `import()` is a function-like expression that loads a module on demand at runtime and returns a Promise.

It enables code splitting — loading modules only when needed, reducing initial bundle size.

Example:

```js
// Static import (always loaded)
import { add } from './math.js';

// Dynamic import (loaded on demand)
async function loadMath() {
  const { add } = await import('./math.js');
  console.log(add(2, 3)); // 5
}

// Conditional loading
if (userNeedsChart) {
  const { renderChart } = await import('./chart.js');
  renderChart(data);
}
```

## 🧠 Question 102

**ID**: javascript-102  
**Title**: What are logical assignment operators in JavaScript?  
**Difficulty**: Medium  
**Category**: Fundamentals

### Answer 📄

Logical assignment operators combine logical operations with assignment.

There are three:

- `&&=` assigns the right value only if the left value is truthy
- `||=` assigns the right value only if the left value is falsy
- `??=` assigns the right value only if the left value is null or undefined

They are shorthand for common patterns like default value assignment or conditional updates.

Example:

```js
let a = 1;
let b = 0;
let c = null;

a &&= 99; // a is truthy → a = 99
b ||= 42; // b is falsy  → b = 42
c ??= 'default'; // c is null → c = 'default'

console.log(a); // 99
console.log(b); // 42
console.log(c); // 'default'
```
