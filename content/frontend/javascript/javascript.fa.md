---
topic: javascript
language: fa
version: 3.0
---

# سوالات مصاحبه JavaScript

## دسته‌بندی‌ها

- اصول اولیه
- زمینه اجرا و محدوده
- حافظه و مراجع
- توابع
- ناهمزمان و حلقه رویداد
- موتور و زمان اجرا
- رفتار زبان
- اشیاء و داخلیها

## سطح سوال‌ها

- آسان
- متوسط
- سخت

## 🧠 سوال ۱

**شناسه**: javascript-001  
**عنوان**: JavaScript چیست و چگونه با زبانهای کامپایل شده تفاوت دارد؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

JavaScript یک زبان برنامهنویسی سطح بالا و تفسیری است که عمدتاً برای ساخت اپلیکیشنهای وب تعاملی استفاده میشود. در مرورگر و همچنین روی سرورها با استفاده از محیطهایی مانند Node.js اجرا میشود.

برخلاف زبانهای کامپایل شده مانند C یا C++، JavaScript نیازی به مرحله کامپایل جداگانه قبل از اجرا ندارد. بلکه توسط موتور JavaScript در زمان اجرا تفسیر میشود.

موتورهای مدرن JavaScript از کامپایل Just-In-Time (JIT) برای بهینهسازی عملکرد استفاده میکنند که JavaScript را سریع میکند در حالی که از نظر توسعهدهنده همچنان مانند یک زبان تفسیری رفتار میکند.

## 🧠 سوال ۲

**شناسه**: javascript-002  
**عنوان**: انواع دادههای اولیه در JavaScript چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

JavaScript دارای هفت نوع داده اولیه است:

- String (رشته)
- Number (عدد)
- BigInt (عدد بزرگ)
- Boolean (بولی)
- Undefined (تعریف نشده)
- Null (خالی)
- Symbol (نماد)

مقادیر اولیه تغییرناپذیر هستند و مستقیماً در حافظه ذخیره میشوند. هنگام انتساب به متغیر جدید، کپی از مقدار ایجاد میشود.

## 🧠 سوال ۳

**شناسه**: javascript-003  
**عنوان**: تفاوت بین null و undefined چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

`undefined` به این معنی است که متغیر اعلان شده اما مقداری به آن اختصاص داده نشده است.

`null` یک انتساب عمدی است که نشاندهنده عدم وجود هر مقدار شیء است.

به طور خلاصه:

- `undefined` حالت پیشفرض متغیرهای مقداردهی نشده است.
- `null` صراحتاً توسط توسعهدهنده برای نشان دادن "بدون مقدار" اختصاص داده میشود.

## 🧠 سوال ۴

**شناسه**: javascript-004  
**عنوان**: تفاوت بین var، let و const چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

`var`، `let` و `const` برای اعلان متغیر استفاده میشوند، اما در محدوده و رفتار تفاوت دارند.

- `var` دارای محدوده تابع است و اجازه اعلان مجدد میدهد.
- `let` دارای محدوده بلوک است و اجازه اعلان مجدد در همان محدوده را نمیدهد.
- `const` دارای محدوده بلوک است و پس از مقداردهی اولیه نمیتواند مجدداً مقداردهی شود.

علاوه بر این، متغیرهای اعلان شده با `let` و `const` به دلیل Temporal Dead Zone قبل از مقداردهی قابل دسترسی نیستند.

مثال:

```js
// var در مقابل let
{
  var x = 10;
  let y = 20;
}

console.log(x); // 10
console.log(y); // ReferenceError
```

## 🧠 سوال ۵

**شناسه**: javascript-005  
**عنوان**: محدوده (scope) در JavaScript چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: زمینه اجرا و محدوده

### پاسخ 📄

محدوده قابلیت دسترسی متغیرها و توابع را در بخشهای مختلف کد تعیین میکند.

JavaScript دارای سه نوع اصلی محدوده است:

- محدوده سراسری: در همه جای برنامه قابل دسترسی.
- محدوده تابع: فقط درون یک تابع خاص قابل دسترسی.
- محدوده بلوک: فقط درون بلوکی که با آکولاد تعریف شده قابل دسترسی.

محدوده به صورت لغوی تعیین میشود، یعنی بستگی به جایی دارد که متغیرها در کد نوشته شدهاند، نه جایی که اجرا میشوند.

مثال:

```js
let globalVar = 'global'; // محدوده سراسری

function example() {
  let funcVar = 'function'; // محدوده تابع

  if (true) {
    let blockVar = 'block'; // محدوده بلوک
    console.log(blockVar); // block
  }

  // console.log(blockVar); // ReferenceError
}
```

## 🧠 سوال ۶

**شناسه**: javascript-006  
**عنوان**: hoisting در JavaScript چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: زمینه اجرا و محدوده

### پاسخ 📄

Hoisting رفتار پیشفرض JavaScript است که اعلان متغیرها و توابع را در مرحله ایجاد اجرا به بالای محدوده حاویشان منتقل میکند.

اعلان توابع به طور کامل hoist میشوند.

متغیرهای اعلان شده با `var` hoist میشوند اما با `undefined` مقداردهی میشوند.

متغیرهای اعلان شده با `let` و `const` hoist میشوند اما تا زمان مقداردهی در Temporal Dead Zone باقی میمانند.

مثال:

```js
// Hoisting behavior

console.log(a); // undefined
var a = 5;

console.log(b); // ReferenceError
let b = 10;
```

## 🧠 سوال ۷

**شناسه**: javascript-007  
**عنوان**: تفاوت بین مقادیر اولیه و مقادیر مرجع چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: حافظه و مراجع

### پاسخ 📄

مقادیر اولیه مستقیماً در حافظه ذخیره میشوند و تغییرناپذیر هستند.

مقادیر مرجع مانند اشیاء و آرایهها در heap ذخیره میشوند و متغیرها مرجعی به مکان حافظهشان نگه میدارند.

هنگام انتساب یک مقدار اولیه به متغیر دیگر، کپی ایجاد میشود.

هنگام انتساب یک مقدار مرجع، هر دو متغیر به همان مکان حافظه اشاره میکنند.

مثال:

```js
// Primitive vs Reference

let a = 10;
let b = a;
b = 20;

console.log(a); // 10

let obj1 = { name: 'علی' };
let obj2 = obj1;
obj2.name = 'سارا';

console.log(obj1.name); // سارا
```

## 🧠 سوال ۸

**شناسه**: javascript-008  
**عنوان**: مدیریت حافظه در JavaScript چگونه کار میکند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: حافظه و مراجع

### پاسخ 📄

JavaScript به طور خودکار هنگام اعلان متغیرها حافظه تخصیص میدهد و زمانی که دیگر نیاز نیست آن را آزاد میکند.

مدیریت حافظه بر garbage collection متکی است.

اکثر موتورهای مدرن JavaScript از الگوریتم mark-and-sweep برای شناسایی اشیاء استفاده نشده استفاده میکنند. اگر شیء دیگر از root (مانند شیء سراسری) قابل دسترسی نباشد، برای garbage collection واجد شرایط میشود.

مثال:

```js
let user = { name: 'رسول' }; // حافظه تخصیص داده شد

user = null; // مرجع حذف شد ← واجد شرایط garbage collection
```

## 🧠 سوال ۹

**شناسه**: javascript-009  
**عنوان**: closure در JavaScript چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: توابع

### پاسخ 📄

Closure تابعی است که متغیرهای محدوده لغوی خود را حتی پس از اتمام اجرای تابع بیرونی به خاطر میسپارد.

Closureها به توابع اجازه میدهند به متغیرهایی که در زمان ایجادشان در دسترس بودند، دسترسی داشته باشند.

معمولاً برای حریم خصوصی داده، کارخانههای تابع و حفظ وضعیت در کد ناهمزمان استفاده میشوند.

مثال:

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

## 🧠 سوال ۱۰

**شناسه**: javascript-010  
**عنوان**: حلقه رویداد (event loop) در JavaScript چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: ناهمزمان و حلقه رویداد

### پاسخ 📄

JavaScript تک رشتهای است، یعنی یک call stack دارد.

حلقه رویداد مکانیزمی است که به JavaScript اجازه میدهد عملیات ناهمزمان را بدون مسدود کردن اجرا مدیریت کند.

به طور مداوم بررسی میکند که آیا call stack خالی است یا نه. اگر خالی باشد، وظایف را از callback queue میگیرد و برای اجرا روی stack قرار میدهد.

این مکانیزم رفتار غیرمسدودکننده را در حین حفظ مدل تک رشتهای امکانپذیر میکند.

مثال:

```js
// Event Loop

console.log('شروع');

setTimeout(() => {
  console.log('تایم اوت');
}, 0);

console.log('پایان');

// خروجی:
// شروع
// پایان
// تایم اوت
```

## 🧠 سوال ۱۱

**شناسه**: javascript-011  
**عنوان**: زمینه اجرا (execution context) در JavaScript چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: زمینه اجرا و محدوده

### پاسخ 📄

زمینه اجرا محیطی است که در آن کد JavaScript ارزیابی و اجرا میشود.

سه نوع زمینه اجرا وجود دارد:

- زمینه اجرای سراسری
- زمینه اجرای تابع
- زمینه اجرای Eval

هر زمینه اجرا از دو مرحله تشکیل شده:

1. مرحله ایجاد
2. مرحله اجرا

در مرحله ایجاد، متغیرها و اعلان توابع در حافظه ذخیره میشوند. در مرحله اجرا، کد خط به خط اجرا میشود.

زمینههای اجرا با استفاده از call stack مدیریت میشوند.

مثال:

```js
// زمینه اجرای سراسری ابتدا ایجاد میشود
const name = 'رسول';

function greet() {
  // زمینه اجرای تابع هنگام فراخوانی greet() ایجاد میشود
  const message = 'سلام ' + name; // از طریق زنجیره محدوده به محدوده سراسری دسترسی دارد
  return message;
}

console.log(greet()); // سلام رسول
// پس از بازگشت greet()، زمینه اجرایش از stack حذف میشود
```

## 🧠 سوال ۱۲

**شناسه**: javascript-012  
**عنوان**: در مرحله ایجاد زمینه اجرا چه اتفاقی میافتد؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: زمینه اجرا و محدوده

### پاسخ 📄

در مرحله ایجاد:

- زنجیره محدوده تعیین میشود.
- محیط متغیر ایجاد میشود.
- اتصال `this` برقرار میشود.
- اعلان توابع به طور کامل مقداردهی میشوند.
- متغیرهای اعلان شده با `var` با undefined مقداردهی میشوند.
- متغیرهای اعلان شده با `let` و `const` در Temporal Dead Zone قرار میگیرند.

در این مرحله هیچ کدی اجرا نمیشود.

مثال:

```js
// Creation Phase

console.log(x); // undefined
var x = 5;

function test() {}
```

## 🧠 سوال ۱۳

**شناسه**: javascript-013  
**عنوان**: call stack چیست و چگونه کار میکند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: موتور و زمان اجرا

### پاسخ 📄

Call stack ساختار دادهای است که اجرای توابع را پیگیری میکند.

هنگام فراخوانی تابع، زمینه اجرای جدیدی روی stack قرار میگیرد.

هنگام تکمیل تابع، زمینه اجرایش از stack حذف میشود.

اگر stack به دلیل بازگشت بیش از حد از حداکثر اندازهاش تجاوز کند، خطای stack overflow رخ میدهد.

مثال:

```js
// Call Stack

function first() {
  second();
}

function second() {
  third();
}

function third() {
  console.log('درون third');
}

first();
```

## 🧠 سوال ۱۴

**شناسه**: javascript-014  
**عنوان**: Temporal Dead Zone (TDZ) چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: زمینه اجرا و محدوده

### پاسخ 📄

Temporal Dead Zone زمان بین ورود به بلوک و اعلان واقعی متغیر با استفاده از `let` یا `const` است.

در این دوره، دسترسی به متغیر منجر به ReferenceError میشود.

اگرچه اعلانات `let` و `const` hoist میشوند، اما تا زمانی که اجرا به خط اعلانشان برسد مقداردهی نمیشوند.

مثال:

```js
// Temporal Dead Zone

{
  console.log(a); // ReferenceError: Cannot access 'a' before initialization
  let a = 10;
}
```

## 🧠 سوال ۱۵

**شناسه**: javascript-015  
**عنوان**: کلیدواژه `this` در JavaScript چگونه کار میکند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: توابع

### پاسخ 📄

مقدار `this` بستگی به نحوه فراخوانی تابع دارد.

- در زمینه سراسری، `this` به شیء سراسری اشاره میکند.
- در فراخوانی تابع معمولی، `this` بستگی به حالت strict دارد.
- در فراخوانی متد، `this` به شیئی که مالک متد است اشاره میکند.
- در arrow functionها، `this` به صورت لغوی از محدوده اطراف به ارث میرسد.
- در constructor functionها، `this` به نمونه تازه ایجاد شده اشاره میکند.

مثال:

```js
// this behavior

const obj = {
  name: 'علی',
  greet() {
    console.log(this.name);
  },
};

obj.greet(); // علی
```

## 🧠 سوال ۱۶

**شناسه**: javascript-016  
**عنوان**: تفاوت بین توابع معمولی و arrow functionها چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: توابع

### پاسخ 📄

Arrow functionها در چندین جهت با توابع معمولی تفاوت دارند:

- `this` مخصوص خود ندارند.
- شیء `arguments` مخصوص خود ندارند.
- نمیتوانند به عنوان constructor استفاده شوند.
- همیشه ناشناس هستند.

Arrow functionها `this` را از محدوده لغوی خود به ارث میبرند.

مثال:

```js
// Arrow در مقابل معمولی

const obj = {
  name: 'سارا',
  regular() {
    console.log(this.name);
  },
  arrow: () => {
    console.log(this.name);
  },
};

obj.regular(); // سارا
obj.arrow(); // undefined
```

## 🧠 سوال ۱۷

**شناسه**: javascript-017  
**عنوان**: تفاوت بین shallow copy و deep copy چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: حافظه و مراجع

### پاسخ 📄

Shallow copy شیء جدیدی ایجاد میکند اما برای اشیاء تودرتو مراجع کپی میکند.

Deep copy کلون کاملاً مستقلی ایجاد میکند که شامل تمام اشیاء تودرتو میشود.

تغییر خصوصیات تودرتو در shallow copy روی شیء اصلی تأثیر میگذارد، در حالی که deep copy از این رفتار جلوگیری میکند.

مثال:

```js
// کپی سطحی — اشیاء تودرتو هنوز مشترک هستند

const original = { info: { age: 20 } };
const shallow = { ...original };

shallow.info.age = 30;

console.log(original.info.age); // 30 (اصل تغییر کرد)
```

```js
// کپی عمیق — کلون کاملاً مستقل

const original = { info: { age: 20 } };
const deep = JSON.parse(JSON.stringify(original));

deep.info.age = 30;

console.log(original.info.age); // 20 (اصل تغییر نکرد)
```

## 🧠 سوال ۱۸

**شناسه**: javascript-018  
**عنوان**: microtaskها و macrotaskها در حلقه رویداد چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: ناهمزمان و حلقه رویداد

### پاسخ 📄

در حلقه رویداد JavaScript:

- Macrotaskها شامل وظایفی مانند timerها و عملیات I/O هستند.
- Microtaskها شامل callbackهای Promise و mutation observerها هستند.

پس از تکمیل هر macrotask، تمام microtaskهای موجود در صف قبل از شروع macrotask بعدی اجرا میشوند.

Microtaskها اولویت بالاتری نسبت به macrotaskها دارند.

مثال:

```js
// Microtask در مقابل Macrotask

console.log('شروع');

setTimeout(() => console.log('Macrotask'), 0);

Promise.resolve().then(() => {
  console.log('Microtask');
});

console.log('پایان');

// خروجی:
// شروع
// پایان
// Microtask
// Macrotask
```

## 🧠 سوال ۱۹

**شناسه**: javascript-019  
**عنوان**: حالتهای مختلف Promise چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: ناهمزمان و حلقه رویداد

### پاسخ 📄

Promise سه حالت دارد:

- Pending (در انتظار)
- Fulfilled (تکمیل شده)
- Rejected (رد شده)

هنگامی که Promise تکمیل یا رد شود، حالتش settled میشود و نمیتواند تغییر کند.

handlerهای Promise به صورت ناهمزمان اجرا میشوند.

مثال:

```js
// Promise states

const promise = new Promise((resolve, reject) => {
  resolve('انجام شد');
});

promise.then((result) => console.log(result));
```

## 🧠 سوال ۲۰

**شناسه**: javascript-020  
**عنوان**: async/await داخلی چگونه کار میکند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: ناهمزمان و حلقه رویداد

### پاسخ 📄

Async/await شکر نحوی است که روی Promiseها ساخته شده.

تابع async همیشه Promise برمیگرداند.

کلیدواژه await اجرای تابع async را تا resolve شدن Promise متوقف میکند، اما thread اصلی را مسدود نمیکند.

داخلی، async/await کد ناهمزمان را به ساختاری شبیه به فراخوانیهای زنجیرهای Promise تبدیل میکند.

مثال:

```js
// async/await — await تابع را متوقف میکند، نه thread اصلی را

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log('قبل از await');
  await delay(1000);
  console.log('بعد از await'); // بعد از ۱ ثانیه اجرا میشود
}

run();
console.log('این بلافاصله اجرا میشود');

// خروجی:
// قبل از await
// این بلافاصله اجرا میشود
// بعد از await
```

## 🧠 سوال ۲۱

**شناسه**: javascript-021  
**عنوان**: prototype در JavaScript چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: اشیاء و داخلیها

### پاسخ 📄

Prototype شیئی است که اشیاء دیگر از آن خصوصیات و متدها را به ارث میبرند.

هر شیء JavaScript یک لینک داخلی به شیء دیگری به نام prototype دارد. وقتی یک خصوصیت روی شیء دسترسی پیدا میکند، JavaScript ابتدا آن را روی خود شیء جستجو میکند. اگر پیدا نشد، زنجیره prototype را بالا میرود.

این مکانیزم به عنوان وراثت prototypal شناخته میشود.

مثال:

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  return `سلام، من ${this.name} هستم`;
};

const user = new Person('رسول');

console.log(user.sayHello()); // سلام، من رسول هستم
console.log(user.__proto__ === Person.prototype); // true
```

## 🧠 سوال ۲۲

**شناسه**: javascript-022  
**عنوان**: زنجیره prototype چیست و جستجوی خصوصیت چگونه کار میکند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: اشیاء و داخلیها

### پاسخ 📄

زنجیره prototype یک سری از اشیاء مرتبط است که JavaScript از آن برای حل دسترسی به خصوصیات استفاده میکند.

وقتی یک خصوصیت درخواست میشود:

1. موتور خود شیء را بررسی میکند.
2. اگر پیدا نشد، prototype شیء را بررسی میکند.
3. این کار تا رسیدن به null ادامه مییابد.

اگر خصوصیت در هیچ جای زنجیره پیدا نشود، undefined برگردانده میشود.

این فرآیند جستجو وراثت را در JavaScript ممکن میکند.

مثال:

```js
const animal = {
  eats: true,
};

const dog = Object.create(animal);
dog.barks = true;

console.log(dog.barks); // true (خصوصیت خود شیء)
console.log(dog.eats); // true (به ارث رسیده از prototype)
console.log(dog.hasOwnProperty('eats')); // false
```

## 🧠 سوال ۲۳

**شناسه**: javascript-023  
**عنوان**: تفاوت بین `__proto__` و `prototype` چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: اشیاء و داخلیها

### پاسخ 📄

`prototype` یک خصوصیت از constructor functionها است. تعریف میکند که چه چیزی prototype نمونههای ایجاد شده با آن constructor خواهد شد.

`__proto__` یک accessor property موجود روی اشیاء است که به prototype داخلیشان اشاره میکند.

به زبان ساده:

- `prototype` روی functionها وجود دارد.
- `__proto__` روی اشیاء وجود دارد.

مثال:

```js
function Car() {}

const myCar = new Car();

console.log(Car.prototype === myCar.__proto__); // true
console.log(typeof Car.prototype); // object
console.log(typeof myCar.prototype); // undefined
```

`prototype` روی function است  
`__proto__` روی شیء ایجاد شده

## 🧠 سوال ۲۴

**شناسه**: javascript-024  
**عنوان**: وراثت در JavaScript چگونه کار میکند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: اشیاء و داخلیها

### پاسخ 📄

وراثت در JavaScript بر اساس prototypeها است.

اشیاء خصوصیات و متدها را از اشیاء دیگر از طریق زنجیره prototype به ارث میبرند.

این کار میتواند با استفاده از constructor functionها، Object.create، یا کلاسهای ES6 انجام شود.

برخلاف وراثت کلاسیک در زبانهای دیگر، JavaScript از وراثت prototypal استفاده میکند.

مثال:

```js
class Animal {
  speak() {
    return 'صدایی';
  }
}

class Cat extends Animal {
  speak() {
    return 'میو';
  }
}

const kitty = new Cat();

console.log(kitty.speak()); // میو
```

در پشت صحنه، با prototype به همان شکل کار میکند، فقط سینتکس تمیزتر است.

## 🧠 سوال ۲۵

**شناسه**: javascript-025  
**عنوان**: حالت strict در JavaScript چیست و چرا مهم است؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: رفتار زبان

### پاسخ 📄

حالت strict راهی برای انتخاب نسخه محدودتر JavaScript است.

برخی خطاهای خاموش را با پرتاب استثنا از بین میبرد و از اقدامات ناامن مانند موارد زیر جلوگیری میکند:

- ایجاد تصادفی متغیرهای سراسری
- انتساب به خصوصیات غیرقابل نوشتن
- استفاده از نامهای پارامتر تکراری

حالت strict کد را امنتر و بهینهسازی آسانتر میکند.

مثال:

```js
'use strict';

x = 10; // ReferenceError: x is not defined

function test(a, a) {
  // SyntaxError: Duplicate parameter name not allowed in this context
  return a;
}
```

بدون حالت strict، این خطاها بیصدا نادیده گرفته میشدند.
با حالت strict، موتور بلافاصله خطا میدهد که پیدا کردن باگها را آسانتر میکند.

## 🧠 سوال ۲۶

**شناسه**: javascript-026  
**عنوان**: ماژولهای JavaScript چیست و چگونه کار میکنند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

ماژولهای JavaScript اجازه میدهند کد به فایلهای قابل استفاده مجدد و ایزوله تقسیم شود.

ماژولها از export برای نمایش قابلیتها و import برای مصرف آن استفاده میکنند.

هر ماژول محدوده خاص خود را دارد و فقط یکبار اجرا میشود.

ES Modules سیستم ماژول استاندارد در JavaScript مدرن است.

مثال:

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

هر فایل محدوده جداگانه دارد.  
بارگذاری فقط یکبار انجام میشود.

## 🧠 سوال ۲۷

**شناسه**: javascript-027  
**عنوان**: نشت حافظه (memory leak) چیست و چگونه در JavaScript میتواند رخ دهد؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: حافظه و مراجع

### پاسخ 📄

نشت حافظه زمانی رخ میدهد که حافظهای که دیگر نیاز نیست آزاد نمیشود.

در JavaScript، نشت حافظه اغلب به دلیل موارد زیر رخ میدهد:

- نگهداری مراجع استفاده نشده
- closureهایی که اشیاء بزرگ را نگه میدارند
- timerها یا event listenerهای فراموش شده
- عناصر DOM جدا شده که هنوز در کد ارجاع دارند

نشت حافظه با گذشت زمان عملکرد را کاهش میدهد.

مثال:

```js
function startTimer() {
  const largeData = new Array(1000000).fill('leak');

  setInterval(() => {
    console.log(largeData.length);
  }, 1000);
}

startTimer();
```

اینجا `largeData` در closure گیر میکند.  
تا زمانی که interval پاک نشود، garbage collect نمیشود.

راه حل:

```js
const interval = setInterval(() => {
  console.log('در حال اجرا');
}, 1000);

clearInterval(interval);
```

## 🧠 سوال ۲۸

**شناسه**: javascript-028  
**عنوان**: WeakMap و WeakSet چیست و چه تفاوتی با Map و Set دارند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: اشیاء و داخلیها

### پاسخ 📄

WeakMap و WeakSet شبیه Map و Set هستند اما مراجع ضعیف به اشیاء نگه میدارند.

اگر هیچ مرجع دیگری به کلید یا مقدار وجود نداشته باشد، garbage collector میتواند آن حافظه را به طور خودکار آزاد کند.

تفاوتهای کلیدی:

- **WeakMap**: جفتهای کلید-مقدار ذخیره میکند که کلیدها باید شیء باشند. کلیدها به صورت ضعیف ارجاع داده میشوند.
- **WeakSet**: مجموعهای از اشیاء ذخیره میکند. مقادیر به صورت ضعیف ارجاع داده میشوند.
- هیچکدام از WeakMap و WeakSet قابل iterate نیستند.

مثال:

```js
// WeakMap — کلید به صورت ضعیف نگه داشته میشود
let obj = { name: 'رسول' };

const map = new Map();
map.set(obj, 'داده');

const weakMap = new WeakMap();
weakMap.set(obj, 'داده');

obj = null;
// map هنوز مرجع را نگه میدارد ← بدون garbage collection
// weakMap مرجع را رها میکند ← واجد شرایط garbage collection
```

```js
// WeakSet — شیء به صورت ضعیف نگه داشته میشود
let user = { id: 1 };

const weakSet = new WeakSet();
weakSet.add(user);

console.log(weakSet.has(user)); // true

user = null;
// user اکنون واجد شرایط garbage collection است
// weakSet دیگر آن را نگه نمیدارد
```

> **_نکته:_** WeakMap و WeakSet قابل iterate نیستند و خاصیت `size` ندارند.

## 🧠 سوال ۲۹

**شناسه**: javascript-029  
**عنوان**: JavaScript چگونه descriptorهای خصوصیت شیء را مدیریت میکند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: اشیاء و داخلیها

### پاسخ 📄

هر خصوصیت در شیء JavaScript descriptorهایی دارد که رفتارش را تعریف میکنند.

Property descriptorها شامل:

- value
- writable
- enumerable
- configurable
- get
- set

این descriptorها کنترل میکنند که آیا خصوصیت میتواند تغییر کند، حذف شود، یا شمارش شود.

مثال:

```js
const user = {};

Object.defineProperty(user, 'name', {
  value: 'رسول',
  writable: false,
  enumerable: true,
  configurable: false,
});

user.name = 'علی'; // تغییر نمیکند

console.log(user.name); // رسول
```

descriptor تعیین میکند خصوصیت چگونه رفتار کند.

## 🧠 سوال ۳۰

**شناسه**: javascript-030  
**عنوان**: موتورهای JavaScript چگونه اجرای کد را بهینه میکنند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: موتور و زمان اجرا

### پاسخ 📄

موتورهای مدرن JavaScript از تکنیکهایی مانند کامپایل Just-In-Time برای بهبود عملکرد استفاده میکنند.

آنها کد را در زمان اجرا تحلیل میکنند، مسیرهای اجرای مکرر را بهینه میکنند، و inline caching اعمال میکنند.

با این حال، الگوهای خاصی مانند تغییر پویای شکل اشیاء میتواند باعث de-optimization شود.

درک رفتار موتور به نوشتن کد با عملکرد بهتر کمک میکند.

مثال:

```js
function createUser(name) {
  return { name };
}

const u1 = createUser('A');
const u2 = createUser('B');
```

اینجا شکل شیء ثابت است → موتور بهینه میکند.

اما این خوب نیست:

```js
const user = {};
user.name = 'A';
user.age = 25;
user.city = 'NY';
```

اضافه کردن پراکنده خصوصیات hidden class را تغییر میدهد و ممکن است de-opt شود.

## 🧠 سوال ۳۱

**شناسه**: javascript-031  
**عنوان**: زمینه اجرا (Execution Context) در JavaScript چیست و اجزای اصلی آن کدامند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: زمینه اجرا و محدوده

### پاسخ 📄

زمینه اجرا محیط انتزاعی است که در آن کد JavaScript ارزیابی و اجرا میشود.

سه نوع وجود دارد:

- زمینه اجرای سراسری
- زمینه اجرای تابع
- زمینه اجرای Eval

هر زمینه اجرا شامل موارد زیر است:

- محیط متغیر
- محیط لغوی
- اتصال This

موتور هر زمان که تابعی فراخوانی میشود، زمینه اجرای جدیدی ایجاد میکند.

مثال:

```js
var x = 10;

function foo() {
  var y = 20;
  console.log(x + y); // 30
}

foo();
```

## 🧠 سوال ۳۲

**شناسه**: javascript-032  
**عنوان**: تفاوت بین مرحله ایجاد و مرحله اجرای زمینه اجرا چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: زمینه اجرا و محدوده

### پاسخ 📄

در مرحله ایجاد:

- حافظه برای متغیرها و توابع تخصیص داده میشود.
- متغیرهای اعلان شده با `var` با `undefined` مقداردهی میشوند.
- اعلان توابع به طور کامل hoist میشوند.

در مرحله اجرا:

- کد خط به خط اجرا میشود.
- متغیرها مقادیر اختصاص یافته را دریافت میکنند.
- توابع اجرا میشوند.

مثال:

```js
console.log(a); // undefined

var a = 5;
```

## 🧠 سوال ۳۳

**شناسه**: javascript-033  
**عنوان**: زنجیره محدوده (Scope Chain) در حین تفکیک متغیر چگونه کار میکند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: زمینه اجرا و محدوده

### پاسخ 📄

زنجیره محدوده مکانیزمی است که برای تفکیک دسترسی به متغیر استفاده میشود.

هنگامی که به متغیری ارجاع داده میشود:

1. موتور محدوده فعلی را بررسی میکند.
2. اگر پیدا نشد، به محدوده لغوی بیرونی میرود.
3. این کار تا رسیدن به محدوده سراسری ادامه مییابد.
4. اگر پیدا نشود، ReferenceError پرتاب میشود.

این ساختار محدوده لغوی را امکانپذیر میکند.

مثال:

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

## 🧠 سوال ۳۴

**شناسه**: javascript-034  
**عنوان**: تفاوت بین محدوده لغوی و محدوده پویا چیست و JavaScript از کدام استفاده میکند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: زمینه اجرا و محدوده

### پاسخ 📄

محدوده لغوی به این معنی است که محدوده بر اساس جایی که تابع در کد منبع تعریف شده تعیین میشود.

محدوده پویا به این معنی است که محدوده بر اساس نحوه فراخوانی تابع تعیین میشود.

JavaScript از محدوده لغوی استفاده میکند.

محدوده تابع در زمان تعریف ثابت است، نه زمان فراخوانی.

مثال:

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

## 🧠 سوال ۳۵

**شناسه**: javascript-035  
**عنوان**: Closure در JavaScript چیست و چگونه با محدوده لغوی مرتبط است؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: توابع, زمینه اجرا و محدوده

### پاسخ 📄

Closure زمانی ایجاد میشود که تابعی متغیرهای محدوده لغوی خود را حتی پس از اتمام اجرای تابع بیرونی به خاطر بسپارد.

Closureها به دلیل استفاده JavaScript از محدوده لغوی امکانپذیر هستند.

آنها به توابع اجازه میدهند دسترسی به متغیرهای محیط تعریفشان را حفظ کنند.

مثال:

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

## 🧠 سوال ۳۶

**شناسه**: javascript-036  
**عنوان**: چرا closureها میتوانند در موقعیتهای خاص باعث نشت حافظه شوند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: توابع, حافظه و مراجع

### پاسخ 📄

Closureها میتوانند باعث نشت حافظه شوند وقتی مراجعی به اشیاء بزرگی که دیگر نیاز نیستند حفظ کنند.

اگر closure مرجعی را زنده نگه دارد، garbage collector نمیتواند آن حافظه را آزاد کند.

علل رایج شامل:

- event listenerهای حذف نشده
- timerهای طولانی مدت
- دادههای کش شده در closureها

مثال:

```js
function createHandler() {
  const bigData = new Array(1000000).fill('data');

  return function () {
    console.log(bigData.length);
  };
}

const handler = createHandler();
// bigData تا زمانی که handler وجود دارد در حافظه میماند
```

برای جلوگیری از این مشکل، فقط آنچه واقعاً نیاز است را درون closure نگه دارید:

```js
function createHandler() {
  const bigData = new Array(1000000).fill('data');
  const length = bigData.length; // فقط آنچه نیاز است استخراج میشود

  return function () {
    console.log(length); // bigData دیگر ارجاع داده نمیشود
  };
}

const handler = createHandler();
```

## 🧠 سوال ۳۷

**شناسه**: javascript-037  
**عنوان**: Temporal Dead Zone (TDZ) چیست و چگونه با let و const کار میکند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: زمینه اجرا و محدوده

### پاسخ 📄

Temporal Dead Zone زمان بین ورود به محدوده بلوک و اعلان واقعی متغیر `let` یا `const` است.

در این دوره، دسترسی به متغیر منجر به ReferenceError میشود.

برخلاف `var`، `let` و `const` hoist میشوند اما مقداردهی نمیشوند.

مثال:

```js
{
  console.log(a); // ReferenceError: Cannot access 'a' before initialization
  let a = 10;
}
```

## 🧠 سوال ۳۸

**شناسه**: javascript-038  
**عنوان**: محدوده بلوک چگونه با محدوده تابع تفاوت دارد؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: زمینه اجرا و محدوده

### پاسخ 📄

محدوده تابع به این معنی است که متغیرهای اعلان شده با `var` به کل تابع محدود میشوند.

محدوده بلوک به این معنی است که متغیرهای اعلان شده با `let` و `const` به نزدیکترین بلوک `{}` محدود میشوند.

محدوده بلوک از نشت تصادفی متغیر خارج از بلوکهای شرطی یا حلقه جلوگیری میکند.

مثال:

```js
if (true) {
  var x = 1;
  let y = 2;
}

console.log(x); // 1
console.log(y); // ReferenceError
```

## 🧠 سوال ۳۹

**شناسه**: javascript-039  
**عنوان**: داخلی چه اتفاقی میافتد وقتی تابعی از تابع دیگری برگردانده میشود؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: توابع, زمینه اجرا و محدوده

### پاسخ 📄

هنگامی که تابعی برگردانده میشود، محیط لغوی آن حفظ میشود اگر به متغیرهای بیرونی ارجاع دهد.

موتور آن متغیرها را در حافظه نگه میدارد تا تابع برگشتی بتواند بعداً به آنها دسترسی داشته باشد.

این پایه و اساس closureها است.

مثال:

```js
function greet(name) {
  return function () {
    console.log('سلام ' + name);
  };
}

const sayHello = greet('رسول');
sayHello(); // سلام رسول
```

## 🧠 سوال ۴۰

**شناسه**: javascript-040  
**عنوان**: JavaScript چگونه جستجوی متغیر را هنگام وجود چندین محدوده تودرتو مدیریت میکند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: زمینه اجرا و محدوده

### پاسخ 📄

JavaScript متغیرها را با استفاده از زنجیره محدوده تفکیک میکند.

از درونیترین محدوده به بیرون جستجو میکند تا متغیر را پیدا کند.

اگر متغیر در هیچ محدودهای وجود نداشته باشد، ReferenceError پرتاب میشود.

این فرآیند جستجو در زمان تعریف تابع تعیین میشود.

مثال:

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

## 🧠 سوال ۴۱

**شناسه**: javascript-041  
**عنوان**: تفاوت بین == و === در JavaScript چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

`==` عملگر تساوی آزاد است. مقادیر را پس از انجام تبدیل نوع (type coercion) مقایسه میکند اگر نوعها متفاوت باشند.

`===` عملگر تساوی دقیق است. هم مقدار و هم نوع را بدون هیچ تبدیلی مقایسه میکند.

در اکثر موارد استفاده از `===` توصیه میشود چون نتایج قابل پیشبینیتری دارد.

مثال:

```js
console.log(1 == '1'); // true  (تبدیل نوع انجام شد)
console.log(1 === '1'); // false (نوعها متفاوتند)

console.log(null == undefined); // true
console.log(null === undefined); // false

console.log(0 == false); // true
console.log(0 === false); // false
```

## 🧠 سوال ۴۲

**شناسه**: javascript-042  
**عنوان**: متدهای call()، apply() و bind() چگونه کار میکنند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: توابع

### پاسخ 📄

هر سه متد به شما اجازه میدهند مقدار `this` را برای یک تابع به صورت صریح تعیین کنید.

- `call()` تابع را بلافاصله با آرگومانهای جداگانه فراخوانی میکند.
- `apply()` تابع را بلافاصله با آرگومانها به صورت آرایه فراخوانی میکند.
- `bind()` یک تابع جدید با `this` دائمی برمیگرداند، بدون اینکه بلافاصله آن را فراخوانی کند.

مثال:

```js
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const user = { name: 'رسول' };

console.log(greet.call(user, 'سلام', '!')); // سلام, رسول!
console.log(greet.apply(user, ['درود', '.'])); // درود, رسول.

const boundGreet = greet.bind(user, 'هی');
console.log(boundGreet('?')); // هی, رسول?
```

## 🧠 سوال ۴۳

**شناسه**: javascript-043  
**عنوان**: IIFE در JavaScript چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: توابع

### پاسخ 📄

IIFE (Immediately Invoked Function Expression) تابعی است که بلافاصله پس از تعریف اجرا میشود.

محدوده مخصوص خود را ایجاد میکند و از نشت متغیرها به محدوده بیرونی یا سراسری جلوگیری میکند.

قبل از اینکه `let` و `const` در دسترس باشند، IIFEها به طور گسترده استفاده میشدند.

مثال:

```js
(function () {
  const message = 'سلام از IIFE';
  console.log(message); // سلام از IIFE
})();

// console.log(message); // ReferenceError — از بیرون قابل دسترسی نیست
```

## 🧠 سوال ۴۴

**شناسه**: javascript-044  
**عنوان**: currying در JavaScript چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: توابع

### پاسخ 📄

Currying تکنیکی است که یک تابع با چندین آرگومان را به دنبالهای از توابع تبدیل میکند که هر کدام یک آرگومان میگیرند.

امکان اعمال جزئی (partial application) توابع را فراهم میکند و کد را قابل استفاده مجدد و ترکیبپذیرتر میکند.

مثال:

```js
// تابع معمولی
function add(a, b) {
  return a + b;
}

// نسخه curried
function curriedAdd(a) {
  return function (b) {
    return a + b;
  };
}

const add5 = curriedAdd(5);
console.log(add5(3)); // 8
console.log(add5(10)); // 15
```

## 🧠 سوال ۴۵

**شناسه**: javascript-045  
**عنوان**: تفاوت بین map()، filter() و reduce() چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

هر سه متد higher-order آرایه هستند که آرایه اصلی را تغییر نمیدهند.

- `map()` هر عنصر را تبدیل میکند و آرایه جدیدی با همان طول برمیگرداند.
- `filter()` آرایه جدیدی شامل فقط عناصری که شرط را برآورده میکنند برمیگرداند.
- `reduce()` تمام عناصر را به یک مقدار واحد تجمیع میکند.

مثال:

```js
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4]

const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15
```

## 🧠 سوال ۴۶

**شناسه**: javascript-046  
**عنوان**: destructuring در JavaScript چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

Destructuring سینتکسی است که اجازه میدهد مقادیر از آرایهها یا خصوصیات از اشیاء را در متغیرهای جداگانه باز کنید.

کد را هنگام کار با دادههای ساختاریافته مختصرتر و خواناتر میکند.

مثال:

```js
// Destructuring شیء
const user = { name: 'رسول', age: 28 };
const { name, age } = user;
console.log(name); // رسول
console.log(age); // 28

// Destructuring آرایه
const colors = ['قرمز', 'سبز', 'آبی'];
const [first, second] = colors;
console.log(first); // قرمز
console.log(second); // سبز
```

## 🧠 سوال ۴۷

**شناسه**: javascript-047  
**عنوان**: عملگرهای spread و rest در JavaScript چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

هر دو از سینتکس `...` استفاده میکنند اما اهداف مخالف دارند.

عملگر **spread** یک iterable را به عناصر جداگانه گسترش میدهد.

عملگر **rest** چندین عنصر را در یک آرایه یا شیء واحد جمعآوری میکند.

مثال:

```js
// Spread — گسترش عناصر
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
console.log(arr2); // [1, 2, 3, 4, 5]

const base = { a: 1 };
const extended = { ...base, b: 2 };
console.log(extended); // { a: 1, b: 2 }

// Rest — جمعآوری عناصر
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
```

## 🧠 سوال ۴۸

**شناسه**: javascript-048  
**عنوان**: تفاوت بین Promise.all، Promise.race، Promise.allSettled و Promise.any چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: ناهمزمان و حلقه رویداد

### پاسخ 📄

هر چهار متد ترکیبکننده Promise هستند که برای مدیریت همزمان چندین Promise استفاده میشوند.

- `Promise.all()` زمانی resolve میشود که همه Promiseها resolve شوند. اگر هر کدام fail شود بلافاصله reject میکند.
- `Promise.race()` به محض اینکه اولین Promise settle شود، resolve یا reject میکند.
- `Promise.allSettled()` منتظر settle شدن همه Promiseها میماند و همه نتایج را صرف نظر از نتیجه برمیگرداند.
- `Promise.any()` به محض اینکه هر Promise fulfill شود resolve میکند. فقط اگر همه fail شوند reject میکند.

مثال:

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

## 🧠 سوال ۴۹

**شناسه**: javascript-049  
**عنوان**: event delegation در JavaScript چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: رفتار زبان

### پاسخ 📄

Event delegation الگویی است که در آن یک event listener واحد به عنصر والد متصل میشود تا رویدادهای ایجاد شده توسط فرزندانش را مدیریت کند.

به event bubbling متکی است، جایی که رویدادها از عنصر هدف به سمت بالا منتشر میشوند.

این الگو با کاهش تعداد event listenerها عملکرد را بهبود میبخشد و برای عناصر اضافه شده به صورت پویا هم کار میکند.

مثال:

```js
// بدون delegation — یک listener برای هر آیتم (ناکارآمد)
// document.querySelectorAll('li').forEach(li => li.addEventListener(...))

// با delegation — یک listener روی والد
document.querySelector('#list').addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    console.log('کلیک شد:', event.target.textContent);
  }
});
```

## 🧠 سوال ۵۰

**شناسه**: javascript-050  
**عنوان**: type coercion در JavaScript چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

Type coercion تبدیل خودکار یا ضمنی یک مقدار از یک نوع داده به نوع دیگر است.

JavaScript به دو روش coercion انجام میدهد:

- **Coercion ضمنی**: به طور خودکار در حین عملیات با نوعهای مختلط اتفاق میافتد.
- **Coercion صریح**: به صورت دستی با توابع تبدیل مانند `Number()`، `String()` یا `Boolean()` انجام میشود.

مثال:

```js
// Coercion ضمنی
console.log(1 + '2'); // '12' (عدد به رشته تبدیل شد)
console.log(true + 1); // 2    (boolean به عدد تبدیل شد)
console.log('' == false); // true (هر دو به 0 تبدیل میشوند)

// Coercion صریح
console.log(Number('42')); // 42
console.log(String(100)); // '100'
console.log(Boolean(0)); // false
```

## 🧠 سوال ۵۱

**شناسه**: javascript-051  
**عنوان**: optional chaining (?.) در JavaScript چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

Optional chaining (`?.`) اجازه میدهد خصوصیات تودرتو را بدون بررسی اینکه هر مرجع در زنجیره معتبر است یا نه، به صورت امن دسترسی پیدا کنید.

اگر هر بخشی از زنجیره `null` یا `undefined` باشد، عبارت اتصال کوتاه (short-circuit) میشود و به جای پرتاب خطا `undefined` برمیگرداند.

با دسترسی به خصوصیات، فراخوانی متدها و دسترسی به آرایه کار میکند.

مثال:

```js
const user = {
  profile: {
    address: {
      city: 'تهران',
    },
  },
};

console.log(user?.profile?.address?.city); // تهران
console.log(user?.contact?.phone); // undefined (خطایی پرتاب نمیشود)

// با فراخوانی متد
console.log(user?.getName?.()); // undefined (خطایی پرتاب نمیشود)
```

## 🧠 سوال ۵۲

**شناسه**: javascript-052  
**عنوان**: عملگر nullish coalescing (??) چیست و چه تفاوتی با || دارد؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

عملگر nullish coalescing (`??`) فقط زمانی مقدار سمت راست را برمیگرداند که مقدار سمت چپ `null` یا `undefined` باشد.

عملگر OR منطقی (`||`) زمانی مقدار سمت راست را برمیگرداند که مقدار سمت چپ هر مقدار falsy باشد، از جمله `0`، `''` و `false`.

این تفاوت زمانی اهمیت دارد که `0` یا رشته خالی مقادیر معتبری هستند.

مثال:

```js
console.log(null ?? 'پیش‌فرض'); // 'پیش‌فرض'
console.log(undefined ?? 'پیش‌فرض'); // 'پیش‌فرض'

console.log(0 ?? 'پیش‌فرض'); // 0          (جایگزین نشد — 0 null/undefined نیست)
console.log(0 || 'پیش‌فرض'); // 'پیش‌فرض' (جایگزین شد — 0 falsy است)

console.log('' ?? 'جایگزین'); // ''         (رشته خالی null/undefined نیست)
console.log('' || 'جایگزین'); // 'جایگزین' (رشته خالی falsy است)
```

## 🧠 سوال ۵۳

**شناسه**: javascript-053  
**عنوان**: عملگر typeof چگونه کار میکند و نکات غیرمعمول آن چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

عملگر `typeof` رشتهای را برمیگرداند که نوع مقدار داده شده را نشان میدهد.

مقادیر رایج بازگشتی:

- `'string'`، `'number'`، `'bigint'`، `'boolean'`، `'undefined'`، `'symbol'`
- `'object'` برای اشیاء و آرایهها
- `'function'` برای توابع

نکته غیرمعمول شناخته‌شده: `typeof null` مقدار `'object'` برمیگرداند که یک باگ تاریخی در JavaScript است.

مثال:

```js
console.log(typeof 'سلام'); // 'string'
console.log(typeof 42); // 'number'
console.log(typeof true); // 'boolean'
console.log(typeof undefined); // 'undefined'
console.log(typeof Symbol()); // 'symbol'
console.log(typeof function () {}); // 'function'
console.log(typeof {}); // 'object'
console.log(typeof []); // 'object'
console.log(typeof null); // 'object' ← باگ تاریخی
```

## 🧠 سوال ۵۴

**شناسه**: javascript-054  
**عنوان**: عملگر instanceof چیست و چه تفاوتی با typeof دارد؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

`instanceof` با طی کردن زنجیره prototype بررسی میکند که آیا یک شیء از constructor یا کلاس خاصی ساخته شده است. مقدار boolean برمیگرداند.

`typeof` یک نام نوع به صورت رشته برمیگرداند و برای مقادیر اولیه مناسبتر است.

`instanceof` برای بررسی نمونههای شیء و وراثت کلاس بهتر است.

مثال:

```js
class Animal {}
class Dog extends Animal {}

const dog = new Dog();

console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true (زنجیره prototype را طی میکند)
console.log(dog instanceof Object); // true (همه از Object ارث میبرند)

console.log(typeof dog); // 'object'
console.log(typeof 42); // 'number'

console.log([] instanceof Array); // true
console.log([] instanceof Object); // true
```

## 🧠 سوال ۵۵

**شناسه**: javascript-055  
**عنوان**: Symbol در JavaScript چیست و چه زمانی استفاده میشود؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: اشیاء و داخلیها

### پاسخ 📄

Symbol یک مقدار اولیه است که تضمین میشود منحصربه‌فرد باشد. هیچ دو Symbol‌ای برابر نیستند، حتی اگر توضیح یکسانی داشته باشند.

از Symbol‌ها به عنوان کلیدهای منحصربه‌فرد خصوصیات شیء استفاده میشود تا از تداخل نام جلوگیری شود.

JavaScript همچنین Symbol‌های شناخته‌شده داخلی مانند `Symbol.iterator` دارد که رفتار سفارشی شیء را فعال میکنند.

مثال:

```js
const id = Symbol('id');
const id2 = Symbol('id');

console.log(id === id2); // false — هر Symbol منحصربه‌فرد است

const user = {
  name: 'رسول',
  [id]: 12345,
};

console.log(user[id]); // 12345
console.log(user.id); // undefined — از طریق کلید رشته قابل دسترسی نیست

// Symbol شناخته‌شده
const iterable = {
  [Symbol.iterator]() {
    let n = 0;
    return { next: () => ({ value: n++, done: n > 3 }) };
  },
};

console.log([...iterable]); // [0, 1, 2]
```

## 🧠 سوال ۵۶

**شناسه**: javascript-056  
**عنوان**: توابع generator در JavaScript چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: توابع

### پاسخ 📄

تابع generator با `function*` تعریف میشود و میتواند با کلیدواژه `yield` اجرایش را متوقف کند و کنترل را به فراخوانیکننده برگرداند.

هر بار که `.next()` فراخوانی شود، اجرا تا `yield` بعدی یا پایان تابع ادامه مییابد.

Generatorها برای ارزیابی تنبل، دنبالههای بینهایت و کنترل جریان ناهمزمان مفیدند.

مثال:

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

## 🧠 سوال ۵۷

**شناسه**: javascript-057  
**عنوان**: پروتکل iterator در JavaScript چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: رفتار زبان

### پاسخ 📄

یک شیء از پروتکل iterator پیروی میکند وقتی متد `next()` را پیادهسازی کند که `{ value, done }` برمیگرداند.

یک iterable هر شیئی است که متد `[Symbol.iterator]()` داشته باشد. این حلقههای `for...of` و سینتکس spread را فعال میکند.

مثال:

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

## 🧠 سوال ۵۸

**شناسه**: javascript-058  
**عنوان**: Proxy در JavaScript چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: اشیاء و داخلیها

### پاسخ 📄

`Proxy` یک شیء را میپوشاند و عملیات اساسی روی آن مانند دسترسی به خصوصیت، انتساب و فراخوانی تابع را با استفاده از traps رهگیری میکند.

Proxy‌ها برای اعتبارسنجی، لاگ گرفتن، کنترل دسترسی و ساختن سیستمهای reactive استفاده میشوند.

مثال:

```js
const user = { name: 'رسول', age: 28 };

const proxy = new Proxy(user, {
  get(target, key) {
    return key in target ? target[key] : `خصوصیت "${key}" پیدا نشد`;
  },
  set(target, key, value) {
    if (key === 'age' && typeof value !== 'number') {
      throw new TypeError('سن باید عدد باشد');
    }
    target[key] = value;
    return true;
  },
});

console.log(proxy.name); // رسول
console.log(proxy.country); // خصوصیت "country" پیدا نشد
proxy.age = 30; // معتبر
// proxy.age = 'سی';       // TypeError: سن باید عدد باشد
```

## 🧠 سوال ۵۹

**شناسه**: javascript-059  
**عنوان**: Reflect API در JavaScript چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: اشیاء و داخلیها

### پاسخ 📄

شیء `Reflect` متدهای استاتیکی ارائه میدهد که عملیات موجود به عنوان Proxy trap را منعکس میکنند.

معمولاً داخل Proxy trap‌ها برای انتقال عملیات اصلی به شیء هدف پس از اعمال منطق سفارشی استفاده میشود.

استفاده از `Reflect` handler‌های Proxy را قابل اطمینانتر و قابل پیشبینیتر میکند.

مثال:

```js
const user = { name: 'رسول' };

const proxy = new Proxy(user, {
  set(target, key, value) {
    console.log(`مقدار "${key}" به "${value}" تنظیم شد`);
    return Reflect.set(target, key, value); // به شیء اصلی انتقال میدهد
  },
});

proxy.name = 'علی';
// مقدار "name" به "علی" تنظیم شد

console.log(user.name); // علی
```

## 🧠 سوال ۶۰

**شناسه**: javascript-060  
**عنوان**: پارامترهای پیش‌فرض در JavaScript چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: توابع

### پاسخ 📄

پارامترهای پیشفرض به پارامترهای تابع اجازه میدهند مقدار پیشفرض داشته باشند اگر هیچ آرگومانی پاس داده نشود یا `undefined` صراحتاً ارسال شود.

مقادیر پیشفرض در زمان فراخوانی ارزیابی میشوند، نه در زمان تعریف تابع.

مثال:

```js
function greet(name = 'مهمان', greeting = 'سلام') {
  return `${greeting}، ${name}!`;
}

console.log(greet()); // سلام، مهمان!
console.log(greet('رسول')); // سلام، رسول!
console.log(greet('سارا', 'درود')); // درود، سارا!
console.log(greet(undefined, 'هی')); // هی، مهمان! (undefined پیش‌فرض را فعال میکند)
```

## 🧠 سوال ۶۱

**شناسه**: javascript-061  
**عنوان**: Object.keys()، Object.values() و Object.entries() چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: اشیاء و داخلیها

### پاسخ 📄

این متدهای استاتیک آرایههایی از خصوصیات enumerable خود شیء برمیگردانند.

- `Object.keys()` آرایهای از نام خصوصیات برمیگرداند.
- `Object.values()` آرایهای از مقادیر خصوصیات برمیگرداند.
- `Object.entries()` آرایهای از جفتهای `[key, value]` برمیگرداند.

مثال:

```js
const user = { name: 'رسول', age: 28, city: 'تهران' };

console.log(Object.keys(user)); // ['name', 'age', 'city']
console.log(Object.values(user)); // ['رسول', 28, 'تهران']
console.log(Object.entries(user)); // [['name', 'رسول'], ['age', 28], ['city', 'تهران']]

// استفاده رایج: پیمایش روی entryها
Object.entries(user).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});
```

## 🧠 سوال ۶۲

**شناسه**: javascript-062  
**عنوان**: تفاوت بین Object.assign() و عملگر spread برای ادغام اشیاء چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: اشیاء و داخلیها

### پاسخ 📄

هر دو خصوصیات اشیاء منبع را کپی میکنند، اما در نحوه عملکرد تفاوت دارند.

- `Object.assign()` اولین آرگومان (شیء هدف) را تغییر میدهد.
- عملگر spread `{...obj}` همیشه شیء جدیدی بدون تغییر اصلی ایجاد میکند.

هر دو کپی سطحی انجام میدهند — اشیاء تودرتو با مرجع کپی میشوند.

مثال:

```js
const defaults = { theme: 'light', lang: 'en' };
const userPrefs = { lang: 'fa' };

// Object.assign — شیء هدف را تغییر میدهد
const config1 = Object.assign({}, defaults, userPrefs);
console.log(config1); // { theme: 'light', lang: 'fa' }

// Spread — شیء جدید ایجاد میکند
const config2 = { ...defaults, ...userPrefs };
console.log(config2); // { theme: 'light', lang: 'fa' }
```

## 🧠 سوال ۶۳

**شناسه**: javascript-063  
**عنوان**: تفاوت بین Object.freeze() و Object.seal() چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: اشیاء و داخلیها

### پاسخ 📄

هر دو متد نحوه تغییر شیء را محدود میکنند، اما در سطوح مختلف.

- `Object.freeze()` از اضافه کردن، حذف یا تغییر هر خصوصیتی جلوگیری میکند.
- `Object.seal()` از اضافه یا حذف خصوصیات جلوگیری میکند، اما تغییر مقادیر موجود را اجازه میدهد.

هر دو سطحی هستند — اشیاء تودرتو تحت تأثیر قرار نمیگیرند.

مثال:

```js
// Object.freeze
const frozen = Object.freeze({ name: 'رسول', age: 28 });
frozen.name = 'علی'; // بیصدا شکست میخورد (در strict mode خطا)
frozen.city = 'تهران'; // بیصدا شکست میخورد
console.log(frozen); // { name: 'رسول', age: 28 }

// Object.seal
const sealed = Object.seal({ name: 'رسول', age: 28 });
sealed.name = 'علی'; // مجاز — خصوصیت موجود
sealed.city = 'تهران'; // بیصدا شکست میخورد — خصوصیت جدید
console.log(sealed); // { name: 'علی', age: 28 }
```

## 🧠 سوال ۶۴

**شناسه**: javascript-064  
**عنوان**: Array.from() و Array.isArray() چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

`Array.from()` آرایه جدیدی از یک شیء array-like یا iterable ایجاد میکند. همچنین یک تابع نگاشت اختیاری قبول میکند.

`Array.isArray()` بررسی میکند که آیا یک مقدار واقعاً آرایه است یا نه.

مثال:

```js
// Array.from
console.log(Array.from('سلام')); // ['س', 'ل', 'ا', 'م']
console.log(Array.from(new Set([1, 2, 2, 3]))); // [1, 2, 3]
console.log(Array.from({ length: 3 }, (_, i) => i + 1)); // [1, 2, 3]

// Array.isArray
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray('سلام')); // false
console.log(Array.isArray({ length: 3 })); // false
```

## 🧠 سوال ۶۵

**شناسه**: javascript-065  
**عنوان**: flat() و flatMap() در JavaScript چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

`flat()` آرایه جدیدی با عناصر زیر-آرایه تا عمق مشخص شده صاف میکند. عمق پیشفرض ۱ است.

`flatMap()` هر عنصر را با یک تابع نگاشت میکند و سپس نتیجه را یک سطح صاف میکند. معادل `.map().flat(1)` است.

مثال:

```js
const nested = [1, [2, 3], [4, [5, 6]]];

console.log(nested.flat()); // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2)); // [1, 2, 3, 4, 5, 6]
console.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5, 6]

const sentences = ['سلام دنیا', 'foo bar'];
const words = sentences.flatMap((s) => s.split(' '));
console.log(words); // ['سلام', 'دنیا', 'foo', 'bar']
```

## 🧠 سوال ۶۶

**شناسه**: javascript-066  
**عنوان**: find() و findIndex() در JavaScript چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

`find()` اولین عنصری که شرط را برآورده میکند برمیگرداند، یا اگر موردی پیدا نشد `undefined`.

`findIndex()` ایندکس اولین عنصر مطابق را برمیگرداند، یا اگر موردی پیدا نشد `-1`.

هر دو به محض یافتن اولین مطابقت پیمایش را متوقف میکنند.

مثال:

```js
const users = [
  { id: 1, name: 'رسول' },
  { id: 2, name: 'سارا' },
  { id: 3, name: 'علی' },
];

const user = users.find((u) => u.id === 2);
console.log(user); // { id: 2, name: 'سارا' }

const index = users.findIndex((u) => u.id === 2);
console.log(index); // 1

console.log(users.find((u) => u.id === 99)); // undefined
console.log(users.findIndex((u) => u.id === 99)); // -1
```

## 🧠 سوال ۶۷

**شناسه**: javascript-067  
**عنوان**: some() و every() در JavaScript چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

`some()` اگر حداقل یک عنصر شرط را برآورده کند `true` برمیگرداند.

`every()` فقط اگر همه عناصر شرط را برآورده کنند `true` برمیگرداند.

هر دو اتصال کوتاه دارند: `some()` با اولین نتیجه درست متوقف میشود، `every()` با اولین نتیجه نادرست.

مثال:

```js
const numbers = [1, 2, 3, 4, 5];

console.log(numbers.some((n) => n > 4)); // true  (5 شرط را دارد)
console.log(numbers.some((n) => n > 10)); // false (هیچکدام شرط را ندارند)

console.log(numbers.every((n) => n > 0)); // true  (همه شرط را دارند)
console.log(numbers.every((n) => n > 3)); // false (همه شرط را ندارند)
```

## 🧠 سوال ۶۸

**شناسه**: javascript-068  
**عنوان**: Array.sort() چگونه کار میکند و مشکلات رایج آن چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

به صورت پیشفرض، `sort()` عناصر را به رشته تبدیل میکند و آنها را به صورت لغوی (الفبایی) مرتب میکند. این برای اعداد نتایج اشتباه تولید میکند.

برای مرتب کردن صحیح اعداد، باید یک تابع مقایسه ارائه شود.

`sort()` آرایه اصلی را تغییر میدهد.

مثال:

```js
const fruits = ['موز', 'سیب', 'گیلاس'];
console.log(fruits.sort()); // ['garlic', 'سیب', 'موز', 'گیلاس'] — الفبایی

// مرتبسازی پیشفرض — برای اعداد اشتباه است
const nums = [10, 1, 5, 2];
console.log(nums.sort()); // [1, 10, 2, 5] ← لغوی، اشتباه

// مرتبسازی صحیح اعداد
console.log([10, 1, 5, 2].sort((a, b) => a - b)); // [1, 2, 5, 10] — صعودی
console.log([10, 1, 5, 2].sort((a, b) => b - a)); // [10, 5, 2, 1] — نزولی
```

## 🧠 سوال ۶۹

**شناسه**: javascript-069  
**عنوان**: memoization در JavaScript چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: توابع

### پاسخ 📄

Memoization تکنیک بهینهسازی است که نتیجه فراخوانی تابع را بر اساس ورودیهایش کش میکند. اگر همان ورودیها دوباره داده شوند، نتیجه کش شده برگردانده میشود.

برای توابع پرهزینه یا توابعی که با آرگومانهای یکسان مکرراً فراخوانی میشوند مفید است.

مثال:

```js
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log('از کش');
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const add = memoize((a, b) => a + b);

console.log(add(2, 3)); // 5
console.log(add(2, 3)); // از کش — 5
console.log(add(4, 5)); // 9
```

## 🧠 سوال ۷۰

**شناسه**: javascript-070  
**عنوان**: انواع خطا در JavaScript چیست و چگونه میتوان خطای سفارشی ساخت؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: رفتار زبان

### پاسخ 📄

JavaScript چندین نوع خطای داخلی دارد:

- `Error` — خطای پایه عمومی
- `TypeError` — عملیات روی نوع اشتباه
- `ReferenceError` — دسترسی به متغیر تعریف نشده
- `SyntaxError` — سینتکس نامعتبر
- `RangeError` — مقدار خارج از محدوده مجاز

خطاهای سفارشی میتوانند با گسترش کلاس `Error` ایجاد شوند.

مثال:

```js
// انواع خطای داخلی
try {
  null.property; // TypeError
} catch (e) {
  console.log(e instanceof TypeError); // true
  console.log(e.name); // 'TypeError'
}

// خطای سفارشی
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

try {
  throw new ValidationError('ایمیل نامعتبر', 'email');
} catch (e) {
  console.log(e.name); // ValidationError
  console.log(e.message); // ایمیل نامعتبر
  console.log(e.field); // email
}
```

## 🧠 سوال ۷۱

**شناسه**: javascript-071  
**عنوان**: debounce در JavaScript چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: ناهمزمان و حلقه رویداد

### پاسخ 📄

Debounce تکنیکی است که اجرای تابع را تا بعد از زمان مشخصی که از آخرین فراخوانی گذشته به تأخیر میاندازد.

برای بهینهسازی عملکرد در سناریوهایی مثل ورودی جستجو، تغییر اندازه پنجره و رویدادهای scroll مفید است.

مثال:

```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const handleSearch = debounce((query) => {
  console.log('جستجو برای:', query);
}, 300);

handleSearch('j');
handleSearch('ja');
handleSearch('jav');
handleSearch('java'); // فقط این یکی جستجوی واقعی را فعال میکند
```

## 🧠 سوال ۷۲

**شناسه**: javascript-072  
**عنوان**: throttle در JavaScript چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: ناهمزمان و حلقه رویداد

### پاسخ 📄

Throttle محدود میکند که یک تابع در طول زمان چند بار اجرا شود، و تضمین میکند که حداکثر یکبار در هر بازه زمانی مشخص اجرا شود.

برخلاف debounce که منتظر توقف فراخوانیها میماند، throttle اجرا را در بازههای منظم تضمین میکند.

مثال:

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
  console.log('scroll مدیریت شد');
}, 200);

// حتی اگر scroll صد بار در ثانیه فعال شود، تابع حداکثر هر ۲۰۰ms اجرا میشود
window.addEventListener('scroll', handleScroll);
```

## 🧠 سوال ۷۳

**شناسه**: javascript-073  
**عنوان**: تفاوت بین event bubbling و event capturing چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: رفتار زبان

### پاسخ 📄

وقتی یک رویداد DOM فعال میشود، دو مرحله طی میکند:

- **مرحله Capturing**: رویداد از root به سمت عنصر هدف میرود.
- **مرحله Bubbling**: رویداد از عنصر هدف به سمت root برمیگردد.

به صورت پیشفرض، event listenerها از مرحله bubbling استفاده میکنند. برای استفاده از capturing، `true` را به عنوان آرگومان سوم به `addEventListener` بدهید.

`event.stopPropagation()` انتشار بیشتر رویداد را متوقف میکند.

مثال:

```js
document.querySelector('#parent').addEventListener('click', () => {
  console.log('والد — bubbling');
});

document.querySelector('#child').addEventListener('click', () => {
  console.log('فرزند کلیک شد');
});

// کلیک روی فرزند لاگ میکند:
// فرزند کلیک شد
// والد — bubbling

// Capturing — قبل از bubbling فعال میشود
document.querySelector('#parent').addEventListener(
  'click',
  () => {
    console.log('والد — capturing');
  },
  true,
);
```

## 🧠 سوال ۷۴

**شناسه**: javascript-074  
**عنوان**: تفاوت بین localStorage، sessionStorage و کوکیها چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: موتور و زمان اجرا

### پاسخ 📄

این مکانیزمها داده را در سمت کلاینت ذخیره میکنند اما در رفتار، طول عمر و امنیت تفاوت دارند.

**localStorage**

- حتی پس از بسته و باز شدن مرورگر باقی میماند
- محدودیت ذخیره‌سازی حدود ۵MB
- فقط از طریق JavaScript قابل دسترسی است
- به طور خودکار با درخواستهای HTTP ارسال نمیشود

**sessionStorage**

- فقط در یک تب مرورگر باقی میماند
- هنگام بسته شدن تب پاک میشود
- همان API localStorage را دارد

**کوکیها**

- محدود به حدود ۴KB
- به طور خودکار با هر درخواست HTTP به سرور ارسال میشوند
- از تاریخ انقضا پشتیبانی میکنند
- میتوانند `HttpOnly` و `Secure` علامتگذاری شوند

**امنیت**

- `localStorage` در برابر حملات XSS آسیبپذیر است
- کوکیهای `HttpOnly` از طریق JavaScript قابل دسترسی نیستند

مثال:

```js
// localStorage
localStorage.setItem('theme', 'dark');
console.log(localStorage.getItem('theme')); // 'dark'

// sessionStorage
sessionStorage.setItem('step', '2');
console.log(sessionStorage.getItem('step')); // '2'

// کوکی
document.cookie = 'token=abc123; Secure; SameSite=Strict';
```

## 🧠 سوال ۷۵

**شناسه**: javascript-075  
**عنوان**: تفاوت بین setTimeout و setInterval چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: ناهمزمان و حلقه رویداد

### پاسخ 📄

- `setTimeout(fn, delay)` تابع را یکبار بعد از تأخیر مشخص شده به میلیثانیه اجرا میکند.
- `setInterval(fn, interval)` تابع را به طور مکرر در بازه زمانی مشخص اجرا میکند.

هر دو یک ID برمیگردانند که میتوان با `clearTimeout` یا `clearInterval` اجرا را لغو کرد.

مثال:

```js
// setTimeout — یکبار بعد از ۱ ثانیه اجرا میشود
const timeoutId = setTimeout(() => {
  console.log('یکبار اجرا میشود');
}, 1000);

// setInterval — هر ثانیه اجرا میشود
const intervalId = setInterval(() => {
  console.log('هر ثانیه اجرا میشود');
}, 1000);

// لغو هر دو
clearTimeout(timeoutId);
clearInterval(intervalId);
```

## 🧠 سوال ۷۶

**شناسه**: javascript-076  
**عنوان**: requestAnimationFrame در JavaScript چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: ناهمزمان و حلقه رویداد

### پاسخ 📄

`requestAnimationFrame()` یک callback را زمانبندی میکند تا قبل از رنگآمیزی مجدد مرورگر، معمولاً در ۶۰ فریم در ثانیه، اجرا شود.

برای انیمیشنها کارآمدتر از `setTimeout` است چون با نرخ refresh نمایش همگامسازی میشود و به طور خودکار هنگامی که تب قابل مشاهده نیست متوقف میشود.

مثال:

```js
let position = 0;

function animate() {
  position += 2;
  document.querySelector('#box').style.left = position + 'px';

  if (position < 300) {
    requestAnimationFrame(animate); // فریم بعدی را زمانبندی میکند
  }
}

requestAnimationFrame(animate);
```

## 🧠 سوال ۷۷

**شناسه**: javascript-077  
**عنوان**: توابع pure و immutability در JavaScript چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: توابع

### پاسخ 📄

یک تابع pure همیشه برای همان ورودیها همان خروجی را برمیگرداند و هیچ اثر جانبی ندارد.

Immutability یعنی داده موجود را تغییر ندادن و به جای آن نسخههای جدید ایجاد کردن.

با هم کد را قابل پیشبینیتر، قابل تست و آسانتر برای درک میکنند.

مثال:

```js
// Impure — حالت خارجی را تغییر میدهد
let count = 0;
function increment() {
  count++; // اثر جانبی
}

// Pure — بدون اثر جانبی
function add(a, b) {
  return a + b;
}

// Impure — آرایه اصلی را تغییر میدهد
function addItem(arr, item) {
  arr.push(item);
  return arr;
}

// Pure — آرایه جدید برمیگرداند
function addItemPure(arr, item) {
  return [...arr, item];
}
```

## 🧠 سوال ۷۸

**شناسه**: javascript-078  
**عنوان**: ترکیب توابع (function composition) در JavaScript چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: توابع

### پاسخ 📄

ترکیب توابع فرآیند ترکیب چندین تابع است به طوری که خروجی یکی ورودی بعدی میشود.

ساختن عملیات پیچیده از توابع کوچکتر، قابل استفاده مجدد و قابل تست را ممکن میکند.

مثال:

```js
const double = (x) => x * 2;
const addTen = (x) => x + 10;
const square = (x) => x * x;

// ترکیب دستی (راست به چپ)
const result = square(addTen(double(3)));
console.log(result); // double(3)=6 → addTen(6)=16 → square(16)=256

// تابع کمکی compose
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((acc, fn) => fn(acc), x);

const transform = compose(square, addTen, double);
console.log(transform(3)); // 256
```

## 🧠 سوال ۷۹

**شناسه**: javascript-079  
**عنوان**: Web Workers در JavaScript چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: موتور و زمان اجرا

### پاسخ 📄

Web Workers اجازه میدهند JavaScript در یک thread پسزمینه جداگانه از thread اصلی اجرا شود.

این کار محاسبات سنگین را بدون مسدود کردن UI یا فریز کردن مرورگر ممکن میکند.

Workerها به DOM دسترسی ندارند. ارتباط بین thread اصلی و worker از طریق `postMessage` و `onmessage` انجام میشود.

مثال:

```js
// main.js
const worker = new Worker('worker.js');

worker.postMessage({ numbers: [1, 2, 3, 4, 5] });

worker.onmessage = (event) => {
  console.log('جمع از worker:', event.data); // 15
};

// worker.js
self.onmessage = (event) => {
  const sum = event.data.numbers.reduce((acc, n) => acc + n, 0);
  self.postMessage(sum);
};
```

## 🧠 سوال ۸۰

**شناسه**: javascript-080  
**عنوان**: مدیریت خطا با async/await چگونه کار میکند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: ناهمزمان و حلقه رویداد

### پاسخ 📄

در async/await، خطاها از Promiseهای rejected باید با `try/catch` گرفته شوند.

بدون مدیریت خطا، rejectionهای مدیریت نشده میتوانند باعث خرابیهای بیصدا یا crash برنامه شوند.

به عنوان جایگزین، `.catch()` میتواند مستقیماً روی Promise برگشتی زنجیر شود.

مثال:

```js
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) throw new Error('کاربر پیدا نشد');

    const user = await response.json();
    return user;
  } catch (error) {
    console.log('خطا:', error.message);
    return null;
  }
}

// جایگزین: .catch() روی Promise
fetchUser(1)
  .then((user) => console.log(user))
  .catch((err) => console.log(err));
```

## 🧠 سوال ۸۱

**شناسه**: javascript-081  
**عنوان**: کلاس‌های پنهان در موتورهای جاوااسکریپت چیستند و چه تأثیری بر کارایی دارند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: موتور و زمان اجرا

### پاسخ 📄

کلاس‌های پنهان (Hidden Classes) ساختارهای داخلی هستند که موتورهای جاوااسکریپت (مانند V8) برای بهینه‌سازی دسترسی به ویژگی‌های آبجکت‌ها استفاده می‌کنند.

وقتی آبجکت‌ها با همان ساختار و ترتیب ویژگی ایجاد می‌شوند، موتور همان کلاس پنهان را به آنها اختصاص می‌دهد. این کار دسترسی سریع از طریق inline caching را ممکن می‌سازد.

اگر شکل آبجکت‌ها به صورت پویا تغییر کند (مثلاً اضافه کردن ویژگی‌ها بعداً یا با ترتیب متفاوت)، موتور ممکن است کلاس‌های پنهان جدیدی بسازد که می‌تواند باعث de-optimization شود.

ساختار ثابت آبجکت‌ها باعث بهبود کارایی می‌شود.

مثال:

```js
function createUser(name, age) {
  return { name, age };
}

const u1 = createUser('A', 20);
const u2 = createUser('B', 25);
// همان کلاس پنهان → بهینه‌شده

const user = {};
user.name = 'C';
user.age = 30;
// تغییر شکل متفاوت → ممکن است de-optimize شود
```

## 🧠 سوال ۸۲

**شناسه**: javascript-082  
**عنوان**: Inline caching چیست و چطور دسترسی به ویژگی را بهینه می‌کند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: موتور و زمان اجرا

### پاسخ 📄

Inline caching یک تکنیک بهینه‌سازی است که موتورهای جاوااسکریپت برای سرعت بخشیدن به دسترسی به ویژگی‌ها استفاده می‌کنند.

وقتی یک ویژگی به صورت مکرر روی آبجکت‌هایی با همان کلاس پنهان دسترسی پیدا می‌کند، موتور مکان آن ویژگی را کش می‌کند.

دسترسی‌های بعدی از جستجوی کامل صرف‌نظر کرده و مستقیماً از مرجع کش شده استفاده می‌کنند که باعث بهبود کارایی می‌شود.

اگر اشکال آبجکت‌ها متفاوت باشند، inline cache‌ها ممکن است invalidate شوند.

مثال:

```js
function getName(user) {
  return user.name;
}

const u1 = { name: 'A' };
const u2 = { name: 'B' };

getName(u1);
getName(u2);
// موتور می‌تواند دسترسی مکرر به `.name` را بهینه کند
```

## 🧠 سوال ۸۳

**شناسه**: javascript-083  
**عنوان**: جمع‌آوری زباله نسلی در موتورهای مدرن جاوااسکریپت چگونه کار می‌کند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: حافظه و مراجع, موتور و زمان اجرا

### پاسخ 📄

موتورهای مدرن جاوااسکریپت از جمع‌آوری زباله نسلی (Generational GC) استفاده می‌کنند.

حافظه به نسل‌ها تقسیم می‌شود:

- نسل جوان (آبجکت‌های کوتاه‌عمر)
- نسل پیر (آبجکت‌های بلندعمر)

اکثر آبجکت‌ها زود از بین می‌روند، بنابراین موتور به طور مکرر نسل جوان را پاک می‌کند.

آبجکت‌هایی که از چند بار جمع‌آوری جان سالم به در می‌برند به نسل پیر منتقل می‌شوند که کمتر پاک‌سازی می‌شود.

این روش کارایی کلی و بهره‌وری حافظه را بهبود می‌بخشد.

مثال:

```js
function createTemp() {
  return { value: Math.random() };
}

for (let i = 0; i < 100000; i++) {
  createTemp();
}
// اکثر آبجکت‌ها کوتاه‌عمرند → در نسل جوان جمع‌آوری می‌شوند
```

## 🧠 سوال ۸۴

**شناسه**: javascript-084  
**عنوان**: تفاوت partial application با currying چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: توابع

### پاسخ 📄

Partial application تکنیکی است که در آن یک تابع با برخی از آرگومان‌هایش فراخوانی می‌شود و یک تابع جدید با پارامترهای کمتر برمی‌گرداند.

Currying یک تابع چند آرگومانه را به یک دنباله از توابع که هر کدام یک آرگومان می‌گیرند تبدیل می‌کند.

Partial application آرگومان‌ها را یکجا ثابت می‌کند.
Currying ساختار تابع را تغییر می‌دهد.

مثال:

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

## 🧠 سوال ۸۵

**شناسه**: javascript-085  
**عنوان**: توابع مرتبه بالاتر (Higher-order functions) چیستند و چرا اهمیت دارند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: توابع

### پاسخ 📄

یک تابع مرتبه بالاتر تابعی است که یا:

- یک تابع دیگر را به عنوان آرگومان می‌گیرد
- یک تابع برمی‌گرداند
- یا هر دو

آنها انتزاع، ترکیب و الگوهای برنامه‌نویسی تابعی را ممکن می‌سازند.

مثال‌های رایج شامل map، filter و reduce هستند.

مثال:

```js
function greet(name) {
  return `Hello ${name}`;
}

function processUser(name, callback) {
  return callback(name);
}

console.log(processUser('Rasool', greet));
```

## 🧠 سوال ۸۶

**شناسه**: javascript-086  
**عنوان**: شفافیت ارجاعی (Referential transparency) در جاوااسکریپت چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: توابع

### پاسخ 📄

شفافیت ارجاعی به این معناست که یک تابع می‌تواند بدون تغییر رفتار برنامه با مقدار خروجی‌اش جایگزین شود.

یک تابع اگر شفافیت ارجاعی داشته باشد:

- همیشه برای همان ورودی، همان خروجی را برمی‌گرداند
- هیچ اثر جانبی ندارد

این ویژگی کد قابل پیش‌بینی و آزمایش‌پذیر را ممکن می‌سازد.

مثال:

```js
function add(a, b) {
  return a + b;
}

const result = add(2, 3);
// add(2, 3) می‌تواند با خیال راحت با ۵ جایگزین شود
```

## 🧠 سوال ۸۷

**شناسه**: javascript-087  
**عنوان**: Starvation در event loop جاوااسکریپت چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: ناهمزمان و حلقه رویداد

### پاسخ 📄

Starvation زمانی رخ می‌دهد که برخی از task‌ها در event loop هرگز اجرا نمی‌شوند چون task‌های دیگر به طور مداوم صف را اشغال می‌کنند.

برای مثال، زمان‌بندی مداوم microtask‌ها می‌تواند از اجرای macrotask‌ها یا رندر جلوگیری کند.

این می‌تواند به‌روزرسانی‌های UI را مسدود کرده و پاسخگویی را کاهش دهد.

مثال:

```js
function loop() {
  Promise.resolve().then(loop);
}

loop();
// Macrotask‌ها ممکن است هرگز اجرا نشوند
```

## 🧠 سوال ۸۸

**شناسه**: javascript-088  
**عنوان**: چرا `typeof null` برابر با "object" است؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: رفتار زبان

### پاسخ 📄

`typeof null` به دلیل یک باگ تاریخی در پیاده‌سازی‌های اولیه جاوااسکریپت `"object"` برمی‌گرداند.

در پیاده‌سازی اصلی، مقادیر با تگ مشخص می‌شدند و null به عنوان یک null pointer نمایش داده می‌شد که با تگ نوع object مطابقت داشت.

این رفتار برای سازگاری با نسخه‌های قبلی حفظ شده است.

مثال:

```js
console.log(typeof null); // "object"
```

## 🧠 سوال ۸۹

**شناسه**: javascript-089  
**عنوان**: NaN چیست و چرا `NaN !== NaN` است؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: رفتار زبان

### پاسخ 📄

NaN مخفف "Not a Number" است و نمایانگر یک نتیجه عددی نامعتبر است.

طبق استاندارد IEEE 754، NaN با هیچ مقداری، حتی با خودش برابر نیست.

برای بررسی NaN از Number.isNaN() استفاده کنید.

مثال:

```js
console.log(NaN === NaN); // false
console.log(Number.isNaN(NaN)); // true
```

## 🧠 سوال ۹۰

**شناسه**: javascript-090  
**عنوان**: structuredClone چیست و چه زمانی باید استفاده شود؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: اشیاء و داخلیها

### پاسخ 📄

structuredClone یک متد توکار است که یک کلون عمیق از داده‌های ساختاریافته ایجاد می‌کند.

برخلاف کلون‌سازی مبتنی بر JSON، از موارد زیر پشتیبانی می‌کند:

- Date
- Map
- Set
- Typed arrays
- ارجاعات دایره‌ای (Circular references)

باید زمانی استفاده شود که یک کپی عمیق قابل اعتماد نیاز باشد.

مثال:

```js
const obj = {
  date: new Date(),
  nested: { value: 1 },
};

const clone = structuredClone(obj);

console.log(clone !== obj); // true
console.log(clone.nested !== obj.nested); // true
```

## 🧠 سوال ۹۱

**شناسه**: javascript-091  
**عنوان**: الگوی Observer چیست و چگونه در جاوااسکریپت پیاده‌سازی می‌شود؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: اشیاء و داخلیها

### پاسخ 📄

الگوی Observer (که به نام Pub/Sub نیز شناخته می‌شود) به آبجکت‌ها اجازه می‌دهد به رویدادها subscribe کنند و هنگام وقوع آنها مطلع شوند.

این الگو منبع رویداد (publisher) را از شنوندگان (subscribers) جدا می‌کند.

اجزای کلیدی:

- `on(event, listener)` — subscribe به یک رویداد
- `emit(event, data)` — فعال کردن تمام listener‌های یک رویداد
- `off(event, listener)` — unsubscribe از یک رویداد

این الگو به طور گسترده در سیستم‌های event-driven، فریم‌ورک‌های UI و EventEmitter نودجی‌اس استفاده می‌شود.

مثال:

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

const onLogin = (user) => console.log(`${user} وارد شد`);

emitter.on('login', onLogin);
emitter.emit('login', 'Rasool'); // Rasool وارد شد

emitter.off('login', onLogin);
emitter.emit('login', 'Ali'); // (خروجی ندارد)
```

## 🧠 سوال ۹۲

**شناسه**: javascript-092  
**عنوان**: تفاوت بین deep equality و reference equality چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: اشیاء و داخلیها

### پاسخ 📄

Reference equality بررسی می‌کند که آیا دو متغیر به همان مرجع در حافظه اشاره می‌کنند.

Deep equality بررسی می‌کند که آیا دو مقدار ساختار و محتوای یکسانی دارند.

در جاوااسکریپت، `===` برای آبجکت‌ها مرجع را مقایسه می‌کند، نه ساختار.

مقایسه عمیق نیاز به بررسی بازگشتی ویژگی‌ها دارد.

مثال:

```js
const a = { value: 1 };
const b = { value: 1 };

console.log(a === b); // false (مرجع‌های متفاوت)

function deepEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

console.log(deepEqual(a, b)); // true (ساختار یکسان)
```

## 🧠 سوال ۹۳

**شناسه**: javascript-093  
**عنوان**: getter و setter چیستند و چگونه به صورت داخلی کار می‌کنند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: اشیاء و داخلیها

### پاسخ 📄

getter و setter متدهای خاصی هستند که رفتار سفارشی هنگام دسترسی یا تغییر ویژگی‌های آبجکت تعریف می‌کنند.

با استفاده از property descriptor تعریف می‌شوند.

به صورت داخلی، دسترسی مستقیم به ویژگی را با اجرای تابع جایگزین می‌کنند.

این کار اعتبارسنجی، مقادیر محاسباتی یا اثرات جانبی را ممکن می‌سازد.

مثال:

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

## 🧠 سوال ۹۴

**شناسه**: javascript-094  
**عنوان**: Symbol‌های well-known در جاوااسکریپت چیستند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: اشیاء و داخلیها

### پاسخ 📄

Symbol‌های well-known ویژگی‌های Symbol توکاری هستند که رفتارهای خاص آبجکت را تعریف می‌کنند.

مثال‌ها شامل:

- Symbol.iterator
- Symbol.toStringTag
- Symbol.toPrimitive
- Symbol.asyncIterator

آنها به آبجکت‌ها اجازه می‌دهند رفتار سطح زبانی مانند iteration و تبدیل نوع را سفارشی کنند.

مثال:

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

## 🧠 سوال ۹۵

**شناسه**: javascript-095  
**عنوان**: async iteration چیست و `for await...of` چگونه کار می‌کند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: ناهمزمان و حلقه رویداد

### پاسخ 📄

async iteration امکان مصرف متوالی منابع داده ناهمزمان با استفاده از `for await...of` را فراهم می‌کند.

یک async iterable باید `Symbol.asyncIterator` را پیاده‌سازی کند که یک async iterator برمی‌گرداند و متد `next()` آن یک Promise برمی‌گرداند.

Async generator‌ها با استفاده از `async function*` تولید دنباله‌های async را آسان می‌کنند.

این برای API‌های صفحه‌بندی شده، stream‌ها یا هر داده‌ای که به صورت ناهمزمان می‌رسد مفید است.

مثال:

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

## 🧠 سوال ۹۶

**شناسه**: javascript-096  
**عنوان**: تفاوت بین Object.create() و نمونه‌سازی مبتنی بر class چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: اشیاء و داخلیها

### پاسخ 📄

Object.create() یک آبجکت جدید با prototype مشخص‌شده ایجاد می‌کند.

نمونه‌سازی مبتنی بر class از syntax `class` و `new` برای ایجاد نمونه‌ها استفاده می‌کند.

در زیر پوسته، class‌ها syntactic sugar روی prototype‌ها هستند.

Object.create کنترل مستقیم بیشتری بر زنجیره prototype فراهم می‌کند.

مثال:

```js
const animal = {
  speak() {
    return 'sound';
  },
};

const dog = Object.create(animal);
console.log(dog.speak());
```

## 🧠 سوال ۹۷

**شناسه**: javascript-097  
**عنوان**: دام‌های Automatic Semicolon Insertion (ASI) چیستند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: رفتار زبان

### پاسخ 📄

Automatic Semicolon Insertion مکانیزمی است که جاوااسکریپت در موارد خاص به طور خودکار سمی‌کالن اضافه می‌کند.

این می‌تواند هنگام وجود شکست خط بعد از `return`، `break` یا قبل از عباراتی که با `(` یا `[` شروع می‌شوند، باعث رفتار غیرمنتظره شود.

سمی‌کالن‌های صریح از ابهام جلوگیری می‌کنند.

مثال:

```js
function test() {
  return;
  {
    value: 1;
  }
}

console.log(test()); // undefined
```

## 🧠 سوال ۹۸

**شناسه**: javascript-098  
**عنوان**: مرورگر چگونه رندر را بین task‌ها در event loop مدیریت می‌کند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: ناهمزمان و حلقه رویداد

### پاسخ 📄

مرورگر رندر را بین macrotask‌ها انجام می‌دهد.

پس از اجرای یک task و پردازش microtask‌ها، مرورگر ممکن است مراحل layout، paint و compositing را انجام دهد.

اگر جاوااسکریپت به طور مداوم thread اصلی را مسدود کند، رندر نمی‌تواند رخ دهد که باعث freeze شدن UI می‌شود.

درک این تعامل به جلوگیری از مشکلات کارایی کمک می‌کند.

مثال:

```js
while (true) {
  // حلقه مسدودکننده
}
```

مرورگر نمی‌تواند به‌روزرسانی‌های رندر را در حالی که thread اصلی مسدود است انجام دهد.

## 🧠 سوال ۹۹

**شناسه**: javascript-099  
**عنوان**: تفاوت بین `for...in` و `for...of` چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: رفتار زبان

### پاسخ 📄

`for...in` روی **کلیدهای** قابل شمارش یک آبجکت پیمایش می‌کند (شامل ویژگی‌های ارث‌بری شده).

`for...of` روی **مقادیر** یک iterable پیمایش می‌کند (آرایه‌ها، رشته‌ها، Map، Set، generator و غیره).

تفاوت‌های کلیدی:

- `for...in` روی هر آبجکتی کار می‌کند؛ `for...of` به یک iterable نیاز دارد
- `for...in` ممکن است به طور غیرمنتظره‌ای ویژگی‌های ارث‌بری شده را شامل شود
- `for...of` به طور مستقیم روی آبجکت‌های ساده کار نمی‌کند (به طور پیش‌فرض iterable نیستند)

مثال:

```js
const arr = ['a', 'b', 'c'];

for (const key in arr) {
  console.log(key); // 0, 1, 2 (اندیس‌ها به صورت رشته)
}

for (const value of arr) {
  console.log(value); // a, b, c
}

const obj = { x: 1, y: 2 };

for (const key in obj) {
  console.log(key); // x, y
}

// for...of روی آبجکت ساده خطا می‌دهد
// for (const val of obj) {} // TypeError: obj is not iterable
```

## 🧠 سوال ۱۰۰

**شناسه**: javascript-100  
**عنوان**: Tagged template literals چیستند و چگونه کار می‌کنند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

Tagged template literals به یک تابع (tag) اجازه می‌دهند یک template literal را قبل از ارزیابی پردازش کند.

تابع tag قسمت‌های رشته را به صورت آرایه و مقادیر interpolate شده را به عنوان آرگومان‌های جداگانه دریافت می‌کند.

این کار پردازش سفارشی رشته مانند sanitization، localization یا ساخت DSL را ممکن می‌سازد.

مثال:

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

## 🧠 سوال ۱۰۱

**شناسه**: javascript-101  
**عنوان**: `import()` داینامیک چیست و چه تفاوتی با import استاتیک دارد؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

`import` استاتیک در زمان parse حل می‌شود و نمی‌تواند شرطی یا به تأخیر افتاده باشد.

`import()` داینامیک یک عبارت تابع‌مانند است که یک ماژول را به صورت on-demand در زمان اجرا بارگذاری می‌کند و یک Promise برمی‌گرداند.

این code splitting را ممکن می‌سازد — بارگذاری ماژول‌ها فقط زمانی که نیاز است، که حجم bundle اولیه را کاهش می‌دهد.

مثال:

```js
// import استاتیک (همیشه بارگذاری می‌شود)
import { add } from './math.js';

// import داینامیک (بارگذاری on-demand)
async function loadMath() {
  const { add } = await import('./math.js');
  console.log(add(2, 3)); // 5
}

// بارگذاری شرطی
if (userNeedsChart) {
  const { renderChart } = await import('./chart.js');
  renderChart(data);
}
```

## 🧠 سوال ۱۰۲

**شناسه**: javascript-102  
**عنوان**: عملگرهای logical assignment در جاوااسکریپت چیستند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: اصول اولیه

### پاسخ 📄

عملگرهای logical assignment عملیات منطقی را با انتساب ترکیب می‌کنند.

سه نوع وجود دارد:

- `&&=` مقدار سمت راست را فقط اگر مقدار سمت چپ truthy باشد اختصاص می‌دهد
- `||=` مقدار سمت راست را فقط اگر مقدار سمت چپ falsy باشد اختصاص می‌دهد
- `??=` مقدار سمت راست را فقط اگر مقدار سمت چپ null یا undefined باشد اختصاص می‌دهد

آنها shorthand الگوهای رایج مانند انتساب مقدار پیش‌فرض یا به‌روزرسانی شرطی هستند.

مثال:

```js
let a = 1;
let b = 0;
let c = null;

a &&= 99; // a truthy است → a = 99
b ||= 42; // b falsy است  → b = 42
c ??= 'default'; // c null است → c = 'default'

console.log(a); // 99
console.log(b); // 42
console.log(c); // 'default'
```
