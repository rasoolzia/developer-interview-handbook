---
topic: react
language: fa
version: 4.2
---

# سوالات مصاحبه React

## دسته‌بندی‌ها

- مبانی React
- JSX و رندرینگ
- کامپوننت‌ها
- Props و State
- Hooks
- Effects و چرخه حیات
- فرم‌ها و رویدادها
- Context API
- مدیریت State
- بهینه‌سازی عملکرد
- رفتار رندرینگ
- Concurrent React
- Server Components
- SSR / Hydration
- معماری و الگوها
- داخلی‌های React
- موارد لبه و تله‌ها

## سطح سوال‌ها

- آسان
- متوسط
- سخت

## 🧠 سوال 1

**شناسه**: react-001  
**عنوان**: React چیست و چه مشکلی را حل می‌کند؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: مبانی React

### پاسخ 📄

React یک کتابخانه جاوااسکریپت متن‌باز است که توسط Meta (فیسبوک) برای ساخت رابط‌های کاربری، عمدتاً اپلیکیشن‌های تک‌صفحه‌ای، توسعه یافته است.

این کتابخانه چندین چالش اصلی فرانت‌اند را حل می‌کند:

- **هماهنگ نگه داشتن UI با state** — در React، نمایش تابعی خالص از state است. هنگام تغییر state، React به‌طور خودکار بخش‌های مرتبط UI را دوباره رندر می‌کند.
- **به‌روزرسانی کارآمد DOM** — React از Virtual DOM استفاده می‌کند تا عملیات گران‌قیمت DOM واقعی را با محاسبه حداقل تغییرات لازم به حداقل برساند.
- **کامپوننت‌های UI قابل استفاده مجدد** — مدل کامپوننت به توسعه‌دهندگان اجازه می‌دهد UI‌های پیچیده را از قطعات کوچک، مجزا و قابل تست بسازند.

React عمداً تنها بر لایه نمایش تمرکز دارد. مسیریابی، دریافت داده، و مدیریت state توسط اکوسیستم اطراف آن (React Router، TanStack Query، Zustand، Redux و غیره) انجام می‌شود.

چون React یک کتابخانه است نه یک فریمورک، به راحتی در اپلیکیشن‌های موجود ادغام می‌شود و به تیم‌ها کنترل کامل بر تصمیمات معماری می‌دهد.

## 🧠 سوال 2

**شناسه**: react-002  
**عنوان**: Virtual DOM چیست و React چگونه از آن استفاده می‌کند؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: مبانی React

### پاسخ 📄

Virtual DOM (VDOM) یک نمایش سبک‌وزن در حافظه از درخت DOM واقعی است. این یک درخت شیء جاوااسکریپت ساده است که ساختار UI را توصیف می‌کند.

هنگامی که state یا props یک کامپوننت تغییر می‌کند، React:

1. **رندر** — یک درخت Virtual DOM جدید با فراخوانی تابع رندر کامپوننت می‌سازد.
2. **مقایسه (Diff)** — درخت جدید را با درخت قبلی مقایسه می‌کند (تطبیق) تا تغییرات را پیدا کند.
3. **اعمال (Patch)** — فقط گره‌های تغییریافته را در DOM واقعی اعمال می‌کند (فاز commit).

این فرآیند **تطبیق (reconciliation)** نام دارد و تغییرات DOM را به حداقل می‌رساند، چون لمس کردن DOM واقعی بسیار گران‌تر از مقایسه اشیاء جاوااسکریپت است.

React در هر تغییر state کل صفحه را دوباره رندر نمی‌کند — فقط زیردرختی که به state تغییریافته وابسته است ارزیابی می‌شود.

```jsx
// هنگام تغییر count، React Counter را دوباره رندر می‌کند،
// حداقل به‌روزرسانی DOM را محاسبه کرده و فقط آن را اعمال می‌کند.
function Counter() {
  const [count, setCount] = React.useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

**مهم:** VDOM یک جزئیات پیاده‌سازی است. React Native، برای مثال، از reconciler ری‌اکت بدون DOM مرورگر استفاده می‌کند.

## 🧠 سوال 3

**شناسه**: react-003  
**عنوان**: JSX چیست و چگونه زیر پوسته کار می‌کند؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: JSX و رندرینگ

### پاسخ 📄

JSX (JavaScript XML) یک افزونه نحوی است که به شما اجازه می‌دهد markup شبیه HTML را درون جاوااسکریپت بنویسید. این خودش جاوااسکریپت معتبر نیست — باید قبل از اجرا توسط یک transpiler (Babel یا کامپایلر TypeScript) کامپایل شود.

هر عنصر JSX به یک فراخوانی `React.createElement()` (runtime کلاسیک) یا یک فراخوانی `jsx()` از `react/jsx-runtime` (runtime خودکار، React 17+) تبدیل می‌شود:

```jsx
// JSX
const element = <h1 className="title">سلام، {name}</h1>;

// کامپایل‌شده (runtime خودکار — React 17+)
import { jsx as _jsx } from 'react/jsx-runtime';
const element = _jsx('h1', { className: 'title', children: `سلام، ${name}` });
```

نتیجه یک شیء جاوااسکریپت ساده است — یک **React element** (vnode):

```js
{
  type: 'h1',
  props: { className: 'title', children: 'سلام، علی' },
  key: null,
  ref: null,
}
```

**قوانین کلیدی JSX:**

- یک کامپوننت باید یک عنصر ریشه برگرداند (برای چندین ریشه از `<>...</>` fragments استفاده کنید).
- `class` به `className` تبدیل می‌شود؛ `for` به `htmlFor`.
- همه تگ‌ها باید بسته شوند: `<img />`, `<br />`.
- عبارات جاوااسکریپت داخل `{}` قرار می‌گیرند.
- نام کامپوننت‌ها باید با حرف بزرگ شروع شوند تا از تگ‌های HTML متمایز شوند.

## 🧠 سوال 4

**شناسه**: react-004  
**عنوان**: کامپوننت‌های functional در React چیستند؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: کامپوننت‌ها

### پاسخ 📄

یک کامپوننت functional یک تابع جاوااسکریپت است که یک شیء `props` دریافت می‌کند و JSX (عناصر React) برمی‌گرداند. این روش استاندارد نوشتن کامپوننت‌ها در React مدرن است.

```jsx
function Greeting({ name, role = 'user' }) {
  return (
    <div>
      <h1>سلام، {name}!</h1>
      <p>نقش: {role}</p>
    </div>
  );
}

// نحو arrow function — به همین اندازه معتبر است
const Greeting = ({ name, role = 'user' }) => (
  <div>
    <h1>سلام، {name}!</h1>
    <p>نقش: {role}</p>
  </div>
);
```

قبل از React 16.8، کامپوننت‌های functional "بدون state" بودند — state و چرخه حیات به کامپوننت‌های class نیاز داشتند. Hooks این را تغییر داد: کامپوننت‌های functional اکنون می‌توانند از state (`useState`)، side effects (`useEffect`)، context، refs و هر custom hook استفاده کنند.

**چرا کامپوننت‌های functional ترجیح داده می‌شوند:**

- مدل ذهنی ساده‌تر — بدون `this`، بدون قراردادهای نام‌گذاری متدهای چرخه حیات.
- آزمون‌پذیری آسان‌تر — توابع خالص قابل پیش‌بینی هستند.
- استنتاج بهتر TypeScript.
- تمام ویژگی‌های React (Concurrent Mode، Server Components) حول توابع طراحی شده‌اند.

کامپوننت‌های class هنوز کار می‌کنند اما دیگر رویکرد توصیه‌شده نیستند.

## 🧠 سوال 5

**شناسه**: react-005  
**عنوان**: Props در React چیستند و چگونه کار می‌کنند؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: Props و State

### پاسخ 📄

Props (مخفف "properties") مکانیزم انتقال داده از کامپوننت والد به کامپوننت فرزند هستند. آن‌ها فقط-خواندنی هستند — یک کامپوننت هرگز نباید props خودش را تغییر دهد.

```jsx
// والد داده را از طریق props منتقل می‌کند
function App() {
  return <UserCard name="علی" age={30} isAdmin={true} />;
}

// فرزند props را به عنوان یک شیء ساده دریافت می‌کند
function UserCard({ name, age, isAdmin }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>سن: {age}</p>
      {isAdmin && <span>مدیر</span>}
    </div>
  );
}
```

**انواع Prop:**

- رشته‌ها: `name="علی"` (نیازی به آکولاد نیست)
- هر چیز دیگری (اعداد، booleans، آرایه‌ها، اشیاء، توابع): `age={30}`
- boolean حذف‌شده: `<Button disabled />` معادل `disabled={true}` است

**prop `children`** — محتوای بین تگ‌های باز و بسته به عنوان `props.children` منتقل می‌شود:

```jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

// استفاده
<Card title="اطلاعات">
  <p>محتوا</p>
</Card>;
```

**پخش Props** — از عملگر spread برای ارسال همه props استفاده کنید:

```jsx
function Button({ className, ...rest }) {
  return <button className={`btn ${className}`} {...rest} />;
}
```

## 🧠 سوال 6

**شناسه**: react-006  
**عنوان**: State در React چیست و چه تفاوتی با props دارد؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: Props و State

### پاسخ 📄

State داده‌های قابل تغییر است که درون یک کامپوننت مدیریت می‌شود. هنگامی که state تغییر می‌کند، React کامپوننت را برای نشان دادن state جدید دوباره رندر می‌کند. برخلاف props (که متعلق به والد است)، state متعلق به خود کامپوننت است و توسط آن کنترل می‌شود.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // مقدار اولیه: 0

  return (
    <div>
      <p>تعداد: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
    </div>
  );
}
```

**Props در مقابل State:**

|                        | Props                             | State                              |
| ---------------------- | --------------------------------- | ---------------------------------- |
| مالک                   | کامپوننت والد                     | خود کامپوننت                       |
| قابل تغییر؟            | خیر (فقط-خواندنی)                 | بله (از طریق setter)               |
| باعث re-render می‌شود؟ | بله (زمانی که والد re-render کند) | بله (زمانی که setter فراخوانی شود) |
| منتقل می‌شود از طریق   | آرگومان تابع                      | hook `useState`                    |

**فرم به‌روزرسانی functional** — هنگامی که مقدار جدید به مقدار قبلی وابسته است، یک تابع به setter منتقل کنید. این برای صحت در callback های async یا به‌روزرسانی‌های دسته‌ای ضروری است:

```js
setCount((prev) => prev + 1); // ایمن — همیشه آخرین مقدار را می‌خواند
setCount(count + 1); // ممکن است در concurrent mode قدیمی باشد
```

**State محلی و캡encapsulated است** — کامپوننت‌های همتا مستقیماً state را به اشتراک نمی‌گذارند. برای اشتراک‌گذاری state، آن را به نزدیک‌ترین جد مشترک انتقال دهید.

## 🧠 سوال 7

**شناسه**: react-007  
**عنوان**: React چگونه رویدادها را مدیریت می‌کند؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: فرم‌ها و رویدادها

### پاسخ 📄

React از یک **سیستم رویداد synthetic** استفاده می‌کند که رویدادهای بومی DOM مرورگر را در بر می‌گیرد. React یک event listener واحد را در ریشه درخت React نصب می‌کند (نه روی هر عنصر)، و رویدادها را از طریق event delegation به handler های صحیح ارسال می‌کند.

```jsx
function Form() {
  function handleSubmit(event) {
    event.preventDefault(); // مانند preventDefault بومی کار می‌کند
    console.log('ارسال شد');
  }

  function handleChange(event) {
    console.log(event.target.value); // SyntheticEvent — همان API بومی
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
    </form>
  );
}
```

**تفاوت‌های کلیدی با رویدادهای DOM:**

- نام‌های event با camelCase نوشته می‌شوند: `onClick`، `onChange`، `onSubmit` (نه `onclick`).
- شما یک تابع منتقل می‌کنید، نه یک رشته: `onClick={handler}` نه `onclick="handler()"`.
- رویدادها bubble می‌کنند همانطور که انتظار می‌رود؛ از `event.stopPropagation()` برای متوقف کردن استفاده کنید. `event.persist()` در React 17+ ضروری نیست چون SyntheticEvents دیگر pooled نمی‌شوند.

**انتشار رویداد** همانند رویدادهای بومی (حباب‌ها، مرحله ضبط) عمل می‌کند. می‌توانید با `event.stopPropagation()` انتشار را متوقف کنید.

React 17 ریشه واگذاری رویداد را از `document` به کانتینر ریشه React تغییر داده است، که باعث می‌شود ترکیب میکرو-فرانت‌اند با نسخه‌های مختلف React ایمن‌تر شود.

## 🧠 سوال 8

**شناسه**: react-008  
**عنوان**: رندرینگ شرطی در React چگونه کار می‌کند؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: JSX و رندرینگ

### پاسخ 📄

React هیچ دستور ویژهای برای شرط ها ندارد — شما از عبارات جاوااسکریپت معمولی درون JSX استفاده میکنید.

**عملگر سهگانه (Ternary)** — رایج ترین الگو:

```jsx
function Alert({ type, message }) {
  return (
    <div className={`alert alert-${type}`}>
      {type === 'error' ? <ErrorIcon /> : <InfoIcon />}
      <span>{message}</span>
    </div>
  );
}
```

**اتصال کوتاه `&&`** — سمت راست را فقط زمانی رندر میکند که سمت چپ truthy باشد:

```jsx
{
  isLoggedIn && <Dashboard />;
}
```

**تله:** اگر سمت چپ `0` باشد، React عدد `0` را در DOM رندر میکند (چون `0` falsy است اما یک مقدار قابل رندر معتبر نیز هست). برای امنیت از `!!` یا ternary استفاده کنید:

```jsx
{
  items.length > 0 && <List items={items} />;
} // ایمن — boolean
{
  items.length && <List items={items} />;
} // خطرناک — اگر خالی باشد "0" رندر میکند
```

**الگوی بازگشت زودهنگام:**

```jsx
function Profile({ user }) {
  if (!user) return <p>Loading...</p>;
  return <div>{user.name}</div>;
}
```

**`null` برای رندر نکردن هیچ چیز:**

```jsx
function Banner({ visible, message }) {
  if (!visible) return null;
  return <div className="banner">{message}</div>;
}
```

## 🧠 سوال 9

**شناسه**: react-009  
**عنوان**: چگونه لیست‌ها را در React رندر می‌کنید و `key` چرا مهم است؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: JSX و رندرینگ

### پاسخ 📄

از `Array.map()` برای تبدیل آرایه‌های داده به عناصر React استفاده کنید. هر عنصر در یک لیست باید یک prop `key` منحصربه‌فرد داشته باشد:

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          {todo.done && <span>✓</span>}
        </li>
      ))}
    </ul>
  );
}
```

**چرا `key` مهم است:**

وقتی React یک لیست را تطبیق می‌دهد، از `key` برای تطبیق عناصر بین رندر قبلی و جدید استفاده می‌کند. بدون کلیدهای پایدار، React به تطبیق مبتنی بر شاخص بازمی‌گردد، که باعث می‌شود هنگام مرتب‌سازی مجدد، درج یا حذف موارد، رفتار نادرستی رخ دهد:

- حالت کامپوننت (مانند مقدار تایپ شده ورودی) به عنصر اشتباه متصل می‌شود.
- جهش‌های غیرضروری DOM رخ می‌دهد.
- انیمیشن‌ها و فوکوس مختل می‌شوند.

**قوانین مربوط به کلیدها:**

- باید در بین سایر موارد منحصر به فرد باشد\*\* (نه منحصر به فرد سراسری).
- باید پایدار باشد\*\* - یک آیتم باید در رندرهای مختلف، کلید یکسانی داشته باشد.
- باید یک شناسه پایدار از داده‌های شما باشد (شناسه پایگاه داده، UUID). از استفاده از اندیس آرایه خودداری کنید، مگر اینکه لیست ایستا باشد و هرگز تغییر ترتیب ندهد.

```jsx
// بد — index ناپایدار است هنگام مرتب‌سازی/فیلتر کردن
{
  items.map((item, i) => <Item key={i} {...item} />);
}

// خوب — ID های ثابت
{
  items.map((item) => <Item key={item.id} {...item} />);
}
```

## 🧠 سوال 10

**شناسه**: react-010  
**عنوان**: کامپوننت‌های controlled در مقابل uncontrolled چیستند؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: فرم‌ها و رویدادها

### پاسخ 📄

**Controlled components** مقدار فرم خود را از React state دریافت می‌کنند. React "منبع حقیقت" است:

```jsx
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value} // React مقدار را کنترل می‌کند
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

**Uncontrolled components** مقدار خود را در DOM ذخیره می‌کنند. شما با یک `ref` هنگام نیاز به آن، مقدار را می‌خوانید:

```jsx
function UncontrolledInput() {
  const inputRef = useRef(null);

  function handleSubmit() {
    console.log(inputRef.current.value); //بنا به تقاضا بخوانید
  }

  return (
    <>
      <input ref={inputRef} defaultValue="پیش‌فرض" />
      <button onClick={handleSubmit}>ارسال</button>
    </>
  );
}
```

|                                          | Controlled                    | Uncontrolled               |
| ---------------------------------------- | ----------------------------- | -------------------------- |
| اعتبارسنجی در هر keystroke               | ✅ طبیعی                      | ❌ نیاز به polling با ref  |
| بازخورد فوری (فرمت، غیرفعال کردن submit) | ✅                            | ❌                         |
| ورودیهای فایل                            | ❌ نمیتوان مقدار را کنترل کرد | ✅ باید از ref استفاده شود |
| فرمهای ساده، یکپارچهسازیهای شخص ثالث     | ❌ کد بیشتر                   | ✅ کد کمتر                 |

اکثر فرم های React از کامپوننت های controlled استفاده میکنند. کتابخانه هایی مانند React Hook Form رویکرد ترکیبی دارند (uncontrolled در زیرساخت برای عملکرد، API شبیه controlled برای اعتبارسنجی).
ا منطق وابسته به مقادیر.

## 🧠 سوال 11

**شناسه**: react-011  
**عنوان**: React Fragment چیست و چه زمانی باید از آن استفاده کنید؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: JSX و رندرینگ

### پاسخ 📄

Fragment به یک کامپوننت اجازه می‌دهد چندین عنصر را بدون اضافه کردن یک نود DOM اضافی به عنوان wrapper برگرداند.

```jsx
// بدون Fragment — یک <div> غیرضروری اضافه می‌شود
function Columns() {
  return (
    <div>
      <td>Name</td>
      <td>Age</td>
    </div>
  ); // HTML نامعتبر — <div> داخل <tr>
}

// با Fragment — بدون نود DOM اضافه
function Columns() {
  return (
    <>
      <td>Name</td>
      <td>Age</td>
    </>
  );
}
```

**دو نحو برای آن وجود دارد:**

```jsx
// کوتاه‌نویسی — نمی‌تواند props بگیرد
<>...</>;

// صریح — وقتی به key نیاز دارید لازم است (مثلا در map روی یک لیست)
function List({ items }) {
  return items.map((item) => (
    <React.Fragment key={item.id}>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </React.Fragment>
  ));
}
```

**موارد استفاده:**

- برگرداندن چندین سلول جدول (`<td>`) یا سطر (`<tr>`) از یک کامپوننت
- گروه‌بندی عناصری که از یک کامپوننت برمی‌گردند بدون شلوغ کردن DOM
- رندر کردن لیستی که هر آیتم آن چندین عنصر هم‌سطح تولید می‌کند

Fragment ها هیچ خروجی‌ای در DOM تولید نمی‌کنند، بنابراین روی استایل یا layout اثری ندارند.

## 🧠 سوال 12

**شناسه**: react-012  
**عنوان**: تفاوت بین class component و functional component چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: کامپوننت‌ها

### پاسخ 📄

هر دو نوع می‌توانند خروجی یکسانی تولید کنند، اما از نظر syntax، API، و نحوه مدیریت state و lifecycle تفاوت‌های مهمی دارند.

**Class component ها** از کلاس‌های ES6 استفاده می‌کنند، `this` دارند، متدهای lifecycle دارند و از `this.state` استفاده می‌کنند:

```jsx
class Counter extends React.Component {
  state = { count: 0 };

  componentDidMount() {
    document.title = `Count: ${this.state.count}`;
  }

  componentDidUpdate() {
    document.title = `Count: ${this.state.count}`;
  }

  render() {
    return (
      <button onClick={() => this.setState((s) => ({ count: s.count + 1 }))}>
        {this.state.count}
      </button>
    );
  }
}
```

**Functional component ها** از hook ها استفاده می‌کنند:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  });

  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

**تفاوت‌های کلیدی:**

|                       | Class Components               | Functional Components              |
| --------------------- | ------------------------------ | ---------------------------------- |
| State                 | `this.state` + `this.setState` | `useState`                         |
| Lifecycle             | `componentDidMount` و غیره     | `useEffect`                        |
| اتصال `this`          | لازم است                       | لازم نیست                          |
| استفاده مجدد از کد    | Mixins (مشکل‌دار)              | Custom hooks (تمیزتر)              |
| Error boundary        | پشتیبانی می‌شود                | هنوز نه (تا React 18)              |
| ویژگی‌های آینده React | در اولویت نیست                 | همه قابلیت‌های جدید برای توابع‌اند |

Class component ها کاملا پشتیبانی می‌شوند، اما legacy محسوب می‌شوند. تمام API های جدید React مثل Concurrent Mode و Server Components حول توابع طراحی شده‌اند.

## 🧠 سوال 13

**شناسه**: react-013  
**عنوان**: Reconciliation در React چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: رفتار رندرینگ

### پاسخ 📄

Reconciliation فرایندی است که React با آن تشخیص می‌دهد بین دو رندر چه چیزی در UI تغییر کرده و DOM را بر همان اساس به‌روزرسانی می‌کند.

وقتی state یا props تغییر می‌کند، React تابع render کامپوننت را اجرا می‌کند و یک درخت virtual DOM جدید می‌سازد. سپس این درخت جدید را با درخت قبلی **diff** می‌کند. این کار با یک الگوریتم heuristic انجام می‌شود که دو فرض مهم دارد:

1. **نوع‌های متفاوت عنصر، درخت‌های متفاوتی تولید می‌کنند.** اگر نوع ریشه عوض شود (مثلا `<div>` به `<span>`)، React کل زیر‌درخت قدیمی را حذف می‌کند و یکی جدید از صفر می‌سازد؛ یعنی همه child component ها هم unmount می‌شوند.

2. **`key` عناصر پایدار را بین رندرها مشخص می‌کند.** هنگام diff کردن لیست‌ها، React از prop `key` استفاده می‌کند تا عناصر را بین دو رندر match کند. عناصری با key یکسان، همان عنصر در نظر گرفته می‌شوند و درجا update می‌شوند؛ key های حذف‌شده یا جدید باعث unmount/mount می‌شوند.

```jsx
// React فرض می‌کند عنصر ریشه عوض شده — Foo را unmount و Bar را mount می‌کند
{
  condition ? <Foo /> : <Bar />;
}

// React همان نوع ریشه را می‌بیند — فقط props های Foo را update می‌کند
{
  condition ? <Foo color="red" /> : <Foo color="blue" />;
}
```

**چرا برای performance مهم است:** reconciler ری‌اکت با استفاده از این heuristic ها از مقایسه‌های گران‌قیمت کل درخت جلوگیری می‌کند. نتیجه، diff کردن درخت با پیچیدگی `O(n)` است، نه الگوریتم naive با پیچیدگی `O(n^3)`.

Reconciler از renderer جدا است. React DOM، React Native و React Three Fiber همگی از یک reconciler مشترک استفاده می‌کنند، اما خروجی‌شان برای محیط‌های متفاوتی است.

## 🧠 سوال 14

**شناسه**: react-014  
**عنوان**: Prop drilling چیست و چگونه آن را حل می‌کنید؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: Props و State

### پاسخ 📄

Prop drilling زمانی رخ می‌دهد که داده باید از چندین لایه از کامپوننت‌های میانی عبور کند، در حالی که آن کامپوننت‌های میانی خودشان به آن داده نیاز ندارند و فقط آن را به پایین‌تر پاس می‌دهند.

```jsx
// Prop drilling — theme باید از App → Layout → Sidebar → Button عبور کند
function App() {
  const [theme, setTheme] = useState('dark');
  return <Layout theme={theme} setTheme={setTheme} />;
}
function Layout({ theme, setTheme }) {
  return <Sidebar theme={theme} setTheme={setTheme} />;
}
function Sidebar({ theme, setTheme }) {
  return <ThemeButton theme={theme} setTheme={setTheme} />;
}
function ThemeButton({ theme, setTheme }) {
  return (
    <button onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}>
      {theme}
    </button>
  );
}
```

**مشکلاتی که ایجاد می‌کند:**

- کامپوننت‌های میانی به داده‌ای که استفاده نمی‌کنند وابسته می‌شوند
- refactor کردن سخت می‌شود، چون اضافه شدن یک prop نیاز به تغییر همه لایه‌ها دارد
- استفاده مجدد از کامپوننت‌ها به‌صورت مستقل سخت‌تر می‌شود

**راه‌حل‌ها:**

1. **Context API** — داده را در یک سطح بالا provide کنید و هرجا در درخت لازم بود consume کنید، بدون اینکه مجبور به پاس دادن آن از همه لایه‌ها باشید:

```jsx
const ThemeContext = createContext('light');
// درخت را wrap کنید: <ThemeContext.Provider value={theme}>
// هرجا لازم بود بخوانید: const theme = useContext(ThemeContext);
```

2. **کتابخانه‌های مدیریت state** مثل Zustand، Redux و Jotai — یک store سراسری که از هر کامپوننتی قابل دسترسی است

3. **Component composition** — به‌جای drill کردن داده، کامپوننت‌ها را به‌صورت children یا props پاس بدهید:

```jsx
function Layout({ children }) {
  return <div>{children}</div>;
}
// والد مشخص می‌کند داخل Layout چه چیزی قرار بگیرد، پس drilling لازم نیست
```

## 🧠 سوال 15

**شناسه**: react-015  
**عنوان**: کامپوننت `StrictMode` چیست و چه کاری انجام می‌دهد؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: مبانی React

### پاسخ 📄

`<React.StrictMode>` یک wrapper مخصوص محیط توسعه است که warning ها و رفتارهای اضافی را فعال می‌کند تا به شما کمک کند مشکلات احتمالی اپلیکیشن را پیدا کنید.

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

**StrictMode چه کارهایی انجام می‌دهد** (فقط در development و بدون اثر در production):

1. **تابع‌های render، مقداردهی اولیه state، و reducer ها را دوبار اجرا می‌کند** — تا side effect هایی را پیدا کند که در توابع supposedly pure نباید وجود داشته باشند. مثلا اگر داخل render به‌اشتباه یک شمارنده را زیاد کنید، این مشکل آشکار می‌شود.

2. **هر کامپوننت را یک‌بار mount → unmount → remount می‌کند** (در React 18+) — تا بررسی کند effect ها cleanup درست دارند. این رفتار شبیه‌سازی می‌کند که اگر یک کامپوننت حفظ و دوباره بازیابی شود چه اتفاقی می‌افتد.

3. **درباره API های deprecated هشدار می‌دهد** — مثل lifecycle های قدیمی (`componentWillMount` و غیره)، string ref های قدیمی، `findDOMNode` و موارد مشابه

4. **mutation ناخواسته state را آشکار می‌کند** — و کمک می‌کند باگ‌هایی که از تغییر مستقیم state به وجود می‌آیند دیده شوند

StrictMode فقط روی زیر‌درختی اعمال می‌شود که آن را wrap کرده است، بنابراین می‌توانید آن را برای بخش‌های خاصی از اپلیکیشن به‌صورت انتخابی فعال کنید.

## 🧠 سوال 16

**شناسه**: react-016  
**عنوان**: `React.memo` چیست و چه زمانی کمک می‌کند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

`React.memo` یک higher-order component است که خروجی رندر یک functional component را memoize می‌کند. اگر props کامپوننت تغییر نکرده باشد (با shallow equality)، React از re-render شدن آن رد می‌شود و از خروجی قبلی استفاده می‌کند.

```jsx
const UserCard = React.memo(function UserCard({ name, age }) {
  console.log('rendering UserCard');
  return (
    <div>
      {name} — {age}
    </div>
  );
});

// اگر parent دوباره رندر شود اما name و age تغییر نکرده باشند،
// UserCard دوباره رندر نمی‌شود.
```

**چه زمانی کمک می‌کند:**

- وقتی parent زیاد re-render می‌شود ولی child از آن state پرنوسان استفاده نمی‌کند
- وقتی خود کامپوننت رندر گرانی دارد، مثلا محاسبات پیچیده یا child node های زیاد
- وقتی props پایدار هستند، مثل primitive ها یا object/function هایی که memoize شده‌اند

**چه زمانی کمک نمی‌کند یا حتی ضرر دارد:**

- وقتی props در هر رندر تغییر می‌کنند و shallow comparison فقط سربار اضافه می‌آورد
- وقتی props شامل object یا function هایی هستند که در parent به‌صورت inline ساخته می‌شوند و هر بار reference جدید دارند

```jsx
// این memo را بی‌اثر می‌کند — در هر رندر parent یک reference جدید می‌سازد
<UserCard style={{ color: 'red' }} onClick={() => doSomething()} />;

// راه‌حل: object و function را در parent memoize کنید
const style = useMemo(() => ({ color: 'red' }), []);
const handleClick = useCallback(() => doSomething(), []);
<UserCard style={style} onClick={handleClick} />;
```

**مقایسه سفارشی** — می‌توانید برای کنترل دقیق‌تر آرگومان دوم را هم بدهید:

```jsx
React.memo(MyComponent, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id; // true = رد شدن از re-render
});
```

## 🧠 سوال 17

**شناسه**: react-017  
**عنوان**: hook `useEffect` چیست و dependency array چگونه کار می‌کند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Effects و چرخه حیات

### پاسخ 📄

`useEffect` به شما اجازه می‌دهد یک کامپوننت را بعد از commit شدن رندر به DOM، با یک سیستم خارجی هماهنگ کنید؛ مثل DOM API، درخواست شبکه، subscription یا timer.

```jsx
useEffect(() => {
  // Side effect — به‌صورت پیش‌فرض بعد از هر رندر اجرا می‌شود
  document.title = `You clicked ${count} times`;
});
```

**Dependency array تعیین می‌کند effect چه زمانی اجرا شود:**

```jsx
// بدون dependency array — بعد از هر رندر اجرا می‌شود
useEffect(() => { ... });

// آرایه خالی — فقط یک‌بار بعد از mount اولیه اجرا می‌شود
useEffect(() => { ... }, []);

// با dependency — بعد از mount و هر بار که userId تغییر کند اجرا می‌شود
useEffect(() => {
  fetchUser(userId);
}, [userId]);
```

**تابع cleanup** — از effect برگردانده می‌شود. قبل از اجرای دوباره effect و همچنین هنگام unmount شدن کامپوننت اجرا می‌شود:

```jsx
useEffect(() => {
  const subscription = subscribe(userId, onMessage);
  return () => subscription.unsubscribe(); // cleanup
}, [userId]);
```

**React 18 + StrictMode** — در محیط توسعه، effect ها یک‌بار mount، cleanup و دوباره mount می‌شوند تا باگ‌های مربوط به cleanup آشکار شوند. این رفتار عمدی است.

**قواعد مهم:**

- هرگز `useEffect` را شرطی صدا نزنید؛ hook ها باید در همه رندرها با همان ترتیب فراخوانی شوند
- تمام مقادیری را که داخل effect خوانده می‌شوند در dependency array بگذارید؛ قانون `react-hooks/exhaustive-deps` در ESLint این را enforce می‌کند
- از `useEffect` برای event handler ها استفاده نکنید؛ handler ها باید مستقیم روی element قرار بگیرند

## 🧠 سوال 18

**شناسه**: react-018  
**عنوان**: `useState` چیست و به‌روزرسانی state چگونه کار می‌کند؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: Hooks

### پاسخ 📄

`useState` پایه‌ای‌ترین hook برای اضافه کردن state محلی به یک functional component است. این hook یک جفت مقدار برمی‌گرداند: مقدار فعلی state و یک تابع setter.

```jsx
const [state, setState] = useState(initialValue);
```

**به‌روزرسانی‌های state async و batched هستند** — صدا زدن `setState` بلافاصله مقدار `state` را عوض نمی‌کند. React یک re-render را زمان‌بندی می‌کند و همه به‌روزرسانی‌های state در همان event handler را در یک batch اعمال می‌کند:

```jsx
function handleClick() {
  setCount((c) => c + 1);
  setCount((c) => c + 1);
  // React آن‌ها را batch می‌کند — count بعد از یک re-render به اندازه 2 زیاد می‌شود
}
```

**فرم functional update** — وقتی مقدار جدید به مقدار قبلی وابسته است، یک تابع به setter بدهید:

```jsx
setState((prev) => ({ ...prev, name: 'Alice' }));
```

هر زمان داخل callback های async، `useEffect` یا event handler هایی هستید که ممکن است مقدار state در آن‌ها stale شده باشد، از این فرم استفاده کنید.

**مقداردهی اولیه state** — برای محاسبات گران، یک تابع پاس بدهید تا در هر رندر دوباره اجرا نشود:

```jsx
// بد — expensiveCalc() در هر رندر اجرا می‌شود، با اینکه فقط بار اول لازم است
const [value, setValue] = useState(expensiveCalc());

// خوب — فقط یک‌بار هنگام mount اولیه اجرا می‌شود
const [value, setValue] = useState(() => expensiveCalc());
```

**Object و array ها** — React state شیء را به‌صورت خودکار merge نمی‌کند (برخلاف `this.setState` در class component ها). باید خودتان spread کنید:

```jsx
setState((prev) => ({ ...prev, age: 31 })); // درست
setState({ age: 31 }); // غلط — بقیه فیلدها را حذف می‌کند
```

## 🧠 سوال 19

**شناسه**: react-019  
**عنوان**: `useRef` چیست و چه زمانی باید از آن استفاده کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Hooks

### پاسخ 📄

`useRef` یک شیء `ref` قابل تغییر با property به نام `.current` برمی‌گرداند که بین رندرها حفظ می‌شود و با تغییرش re-render ایجاد نمی‌شود. این hook دو کاربرد اصلی دارد.

**1. دسترسی مستقیم به عناصر DOM:**

```jsx
function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} />;
}
```

**2. نگه‌داری مقادیر mutable که نباید باعث re-render شوند:**

```jsx
function Timer() {
  const intervalId = useRef(null);
  const [seconds, setSeconds] = useState(0);

  function start() {
    intervalId.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  }

  function stop() {
    clearInterval(intervalId.current);
  }

  return (
    <>
      <p>{seconds}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  );
}
```

**ویژگی‌های مهم:**

- تغییر `ref.current` باعث re-render نمی‌شود، برخلاف `useState`
- شیء ref در تمام رندرها همان شیء قبلی باقی می‌ماند
- برای نگه داشتن previous value، شناسه animation frame، نمونه WebSocket، یا context های canvas مفید است

**مقایسه `useRef` و `useState`:**

|                              | `useRef`                  | `useState`        |
| ---------------------------- | ------------------------- | ----------------- |
| باعث re-render می‌شود؟       | خیر                       | بله               |
| مقدار بین رندرها حفظ می‌شود؟ | بله                       | بله               |
| نحوه دسترسی                  | `.current`                | مستقیم            |
| کاربرد اصلی                  | دسترسی DOM، ذخیره mutable | state رابط کاربری |

## 🧠 سوال 20

**شناسه**: react-020  
**عنوان**: `useMemo` چیست و چه زمانی باید از آن استفاده کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

`useMemo` نتیجه یک محاسبه گران را memoize می‌کند و فقط زمانی آن را دوباره محاسبه می‌کند که یکی از dependency ها تغییر کرده باشد.

```jsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

در re-render هایی که `a` و `b` تغییری نکرده‌اند، React محاسبه را رد می‌کند و نتیجه cache شده را برمی‌گرداند.

**چه زمانی از `useMemo` استفاده کنیم:**

1. **محاسبات گران** — مثل sort، filter یا transform کردن مجموعه داده‌های بزرگ:

```jsx
const sortedUsers = useMemo(
  () => [...users].sort((a, b) => a.name.localeCompare(b.name)),
  [users],
);
```

2. **پایدار نگه داشتن reference شیء یا آرایه** برای child component هایی که با `React.memo` پوشانده شده‌اند یا برای dependency array های `useEffect`:

```jsx
const config = useMemo(() => ({ theme, locale }), [theme, locale]);
// reference مربوط به config پایدار می‌ماند و effect یا memo check را بی‌دلیل دوباره فعال نمی‌کند
```

**چه زمانی نباید از `useMemo` استفاده کرد:**

- برای محاسبات ارزان، چون سربار memoization ممکن است از سودش بیشتر شود
- وقتی dependency ها در هر رندر عوض می‌شوند و cache عملا هیچ‌وقت استفاده نمی‌شود
- به‌عنوان بهینه‌سازی زودهنگام؛ اول profile بگیرید

**تفاوت `useMemo` و `useCallback`:**

```jsx
useMemo(() => fn(), [deps]); // مقدار برگشتی fn را memoize می‌کند
useCallback(fn, [deps]); // خود تابع fn را memoize می‌کند
```

React ممکن است تصمیم بگیرد مقدار cache شده `useMemo` را کنار بگذارد، مثلا تحت فشار حافظه. بنابراین برای درست کار کردن برنامه روی `useMemo` تکیه نکنید؛ فقط برای performance از آن استفاده کنید.

## 🧠 سوال 21

**شناسه**: react-021  
**عنوان**: `useCallback` چیست و چه زمانی باید از آن استفاده کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

`useCallback` یک نسخه memoized از یک تابع callback برمی‌گرداند. تا زمانی که dependency های آن تغییر نکنند، هویت تابع بین رندرها حفظ می‌شود.

```jsx
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

بدون `useCallback`، در هر رندر یک reference جدید از تابع ساخته می‌شود. این موضوع وقتی دردسرساز می‌شود که تابع را به این موارد پاس دهید:

- child component هایی که با `React.memo` پوشانده شده‌اند، چون shallow comparison را خراب می‌کند
- dependency array های `useEffect`، چون effect را بی‌دلیل دوباره اجرا می‌کند

**مثال عملی:**

```jsx
const MemoizedChild = React.memo(function Child({ onAction }) {
  console.log('Child rendered');
  return <button onClick={onAction}>Action</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  // بدون useCallback: در هر رندر یک تابع جدید ساخته می‌شود و Child همیشه re-render می‌شود
  const handleAction = useCallback(() => {
    console.log('action');
  }, []); // reference پایدار — Child فقط یک‌بار رندر می‌شود

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <MemoizedChild onAction={handleAction} />
    </>
  );
}
```

**`useCallback(fn, deps)` معادل `useMemo(() => fn, deps)` است.**

**چه زمانی نباید از آن استفاده کرد:**

- وقتی child با `React.memo` پوشانده نشده و سودی ندارد
- وقتی تابع به چیزی پاس داده نمی‌شود که به referential stability وابسته باشد
- به‌عنوان بهینه‌سازی زودهنگام؛ قبل از استفاده profile بگیرید

## 🧠 سوال 22

**شناسه**: react-022  
**عنوان**: قوانین hook ها چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Hooks

### پاسخ 📄

React برای اینکه hook ها درست کار کنند، دو قانون اصلی را enforce می‌کند.

**قانون 1: hook ها را فقط در بالاترین سطح صدا بزنید.**

هیچ‌وقت hook را داخل شرط، حلقه یا تابع تو‌در‌تو صدا نزنید. React برای اینکه هر hook را به state درست خودش وصل کند، به یکسان بودن ترتیب فراخوانی hook ها در همه رندرها وابسته است.

```jsx
// ❌ اشتباه — hook داخل شرط
function Component({ isLoggedIn }) {
  if (isLoggedIn) {
    const [user, setUser] = useState(null); // ترتیب hook ها را به‌هم می‌زند
  }
}

// ✅ درست — شرط را در نحوه استفاده از hook اعمال کنید
function Component({ isLoggedIn }) {
  const [user, setUser] = useState(null);
  if (!isLoggedIn) return null;
  // use user...
}
```

**قانون 2: hook ها را فقط از داخل توابع React صدا بزنید.**

hook ها باید فقط از اینجاها صدا زده شوند:

- functional component ها
- custom hook ها

هیچ‌وقت آن‌ها را از توابع معمولی جاوااسکریپت، class component ها یا مستقیم داخل event handler ها صدا نزنید.

**چرا این قوانین وجود دارند:**

React در داخل برای هر کامپوننت یک لیست از state های مربوط به hook ها را بر اساس ترتیب فراخوانی نگه می‌دارد. اگر یک hook شرطی صدا زده شود، ترتیب بین رندرها تغییر می‌کند و React state اشتباه را می‌خواند؛ نتیجه، باگ‌هایی است که پیدا کردنشان سخت است.

پکیج `eslint-plugin-react-hooks` هر دو قانون را به‌صورت خودکار در زمان توسعه بررسی می‌کند.

## 🧠 سوال 23

**شناسه**: react-023  
**عنوان**: custom hook ها چیستند و چگونه آن‌ها را می‌نویسید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Hooks

### پاسخ 📄

یک custom hook یک تابع جاوااسکریپت است که نامش با `use` شروع می‌شود و می‌تواند hook های دیگر را صدا بزند. custom hook ها مهم‌ترین راه برای استخراج و اشتراک‌گذاری منطق stateful بین کامپوننت‌ها هستند و برای این کار جایگزین mixin ها و render prop ها شده‌اند.

```jsx
// useLocalStorage — state را در localStorage نگه می‌دارد
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue];
}

// استفاده — API آن شبیه useState است
function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  return (
    <button onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
      {theme}
    </button>
  );
}
```

**بهترین روش‌ها:**

- همیشه نام آن را با `use` شروع کنید تا قوانین ESLint مربوط به hook ها بتوانند آن را درست بررسی کنند
- مقداری برگردانید که با الگوی hook ای که دور آن wrapper ساخته‌اید هماهنگ باشد، مثل tuple به شکل `[value, setter]` یا یک object
- هر custom hook باید فقط یک مسئولیت مشخص و متمرکز داشته باشد
- ورودی‌ها را به‌صورت آرگومان بگیرید و آن‌ها را hardcode نکنید تا hook قابل استفاده مجدد بماند
- منطق hook را مستقل از رندر نگه دارید و داخل hook JSX ننویسید

## 🧠 سوال 24

**شناسه**: react-024  
**عنوان**: Context API چیست و چگونه از آن استفاده می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Context API

### پاسخ 📄

Context API راهی برای پاس دادن داده در درخت کامپوننت‌ها بدون prop drilling فراهم می‌کند. Context شبیه یک "کانال پخش" است که هر descendant می‌تواند در آن subscribe کند.

**ساخت و provide کردن context:**

```jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light'); // 'light' مقدار پیش‌فرض است

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

**مصرف context با `useContext`:**

```jsx
function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
      Current: {theme}
    </button>
  );
}

// در اپلیکیشن
function App() {
  return (
    <ThemeProvider>
      <ThemeButton />
    </ThemeProvider>
  );
}
```

**نکته performance** — هر consumer یک context، وقتی value آن context تغییر کند دوباره رندر می‌شود. اگر value یک object باشد که inline ساخته شده، در هر رندر provider عوض می‌شود:

```jsx
// بد — در هر رندر یک object جدید ساخته می‌شود و همه consumer ها re-render می‌شوند
<Context.Provider value={{ theme, setTheme }}>

// بهتر — value را memoize کنید
const value = useMemo(() => ({ theme, setTheme }), [theme]);
<Context.Provider value={value}>
```

برای اپلیکیشن‌های بزرگ با state پرتغییر، برای داده‌های حساس به performance معمولا کتابخانه‌های مدیریت state انتخاب بهتری نسبت به Context هستند.

## 🧠 سوال 25

**شناسه**: react-025  
**عنوان**: `useReducer` چیست و چه زمانی باید به‌جای `useState` از آن استفاده کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Hooks

### پاسخ 📄

`useReducer` یک جایگزین برای `useState` در مدیریت منطق state پیچیده است. این hook از الگوی Redux الهام گرفته است: یک reducer تابعی، state فعلی و یک action را می‌گیرد و state بعدی را برمی‌گرداند.

```jsx
import { useReducer } from 'react';

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>
        Count: {state.count} (step: {state.step})
      </p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
```

**چه زمانی `useReducer` را به `useState` ترجیح دهیم:**

- وقتی state چند زیرمقدار دارد که با هم تغییر می‌کنند
- وقتی state بعدی به شکل‌های پیچیده‌ای به state قبلی وابسته است
- وقتی منطق update آن‌قدر پیچیده است که بهتر است در یک reducer خالص و قابل تست قرار بگیرد
- وقتی می‌خواهید همه transition های state را در یک جا متمرکز کنید
- وقتی می‌خواهید `dispatch` را به child ها پاس بدهید و update ها را به‌صورت action محور و شفاف نگه دارید

**تفاوت `useReducer` و Redux:** `useReducer` محلی است و داخل همان کامپوننت یا همراه با Context استفاده می‌شود. Redux یک store سراسری با middleware، DevTools و time-travel debugging فراهم می‌کند.

## 🧠 سوال 26

**شناسه**: react-026  
**عنوان**: `useLayoutEffect` چیست و چه تفاوتی با `useEffect` دارد؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: Effects و چرخه حیات

### پاسخ 📄

هر دو hook امضای یکسانی دارند، اما در زمان‌های متفاوتی از چرخه رندر اجرا می‌شوند.

**`useEffect`** — به‌صورت async بعد از این اجرا می‌شود که مرورگر صفحه را paint کرده باشد. یعنی کامپوننت رندر می‌شود، خروجی بصری روی صفحه می‌آید و بعد effect اجرا می‌شود.

**`useLayoutEffect`** — به‌صورت sync بعد از اینکه React تغییرات DOM را commit کرد اما قبل از paint شدن مرورگر اجرا می‌شود. تا وقتی effect تمام نشود، paint شدن صفحه متوقف می‌ماند.

```
React renders → React commits DOM mutations
  → useLayoutEffect runs (synchronously)
  → Browser paints
  → useEffect runs (asynchronously)
```

**چه زمانی از `useLayoutEffect` استفاده کنیم:**

- وقتی لازم است قبل از دیده شدن صفحه توسط کاربر، اندازه یا موقعیت DOM را بخوانید تا از flicker یا "نمایش اشتباه لحظه‌ای" جلوگیری شود

```jsx
function Tooltip({ targetRef, content }) {
  const tooltipRef = useRef(null);

  useLayoutEffect(() => {
    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current;
    // قبل از paint مرورگر tooltip را در جای درست قرار بده
    tooltip.style.top = `${targetRect.bottom}px`;
    tooltip.style.left = `${targetRect.left}px`;
  });

  return (
    <div ref={tooltipRef} className="tooltip">
      {content}
    </div>
  );
}
```

**چه زمانی بهتر است از `useEffect` استفاده کنید:**

- برای هر چیزی که لازم نیست paint را block کند، مثل data fetching، subscription، analytics یا logging

**نکته مربوط به server-side rendering:** `useLayoutEffect` روی سرور اجرا نمی‌شود، چون DOM وجود ندارد، و همین باعث warning می‌شود. برای کامپوننت‌های سازگار با SSR از `useEffect` استفاده کنید یا با `typeof window !== 'undefined'` آن را شرطی کنید.

## 🧠 سوال 27

**شناسه**: react-027  
**عنوان**: Error Boundary ها در React چیستند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: کامپوننت‌ها

### پاسخ 📄

Error Boundary یک class component است که خطاهای جاوااسکریپتی در هرجای درخت child component هایش را می‌گیرد و به‌جای crash کردن کل اپلیکیشن، یک fallback UI نمایش می‌دهد.

Error boundary ها خطاها را در این موارد می‌گیرند:

- رندر
- متدهای lifecycle
- constructor های child component ها

اما این خطاها را نمی‌گیرند:

- event handler ها، که باید با `try/catch` مدیریت شوند
- کدهای async مثل `setTimeout` یا promise ها
- server-side rendering
- خطاهایی که در خود error boundary رخ می‌دهند

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    // state را برای نمایش fallback UI به‌روزرسانی کن
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // لاگ کردن در سرویس گزارش خطا
    logError(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

// استفاده
<ErrorBoundary fallback={<ErrorPage />}>
  <Dashboard />
</ErrorBoundary>;
```

خود Error Boundary ها همچنان در React به‌صورت class component پیاده‌سازی می‌شوند. در پروژه‌هایی که بیشتر با function component نوشته شده‌اند، خیلی از تیم‌ها از پکیج `react-error-boundary` برای داشتن wrapper آماده و الگوی سازگارتر با hook ها استفاده می‌کنند.

بخش‌های مختلف UI را در Error Boundary های جداگانه بپیچید تا خراب شدن یک بخش باعث از کار افتادن کل اپلیکیشن نشود.

## 🧠 سوال 28

**شناسه**: react-028  
**عنوان**: Portal ها در React چیستند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: کامپوننت‌ها

### پاسخ 📄

Portal فرزندان یک کامپوننت را در یک نود DOM متفاوت از نود والدش رندر می‌کند، در حالی که آن کامپوننت همچنان جای معمول خود را در درخت کامپوننت React حفظ می‌کند.

```jsx
import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body, // داخل document.body رندر می‌شود، نه داخل DOM والد
  );
}
```

**چرا Portal وجود دارد:**

ویژگی‌های CSS مثل `overflow: hidden`، `z-index` و `transform` روی ancestor ها می‌توانند UI هایی را که باید از والد خود "بیرون بزنند" قطع کنند یا در لایه اشتباه قرار دهند؛ مثل modal، tooltip، dropdown و notification.

**رفتارهای مهم:**

- **درخت React، نه درخت DOM** — حباب‌سازی event ها از سلسله‌مراتب React پیروی می‌کند، نه از سلسله‌مراتب DOM. یعنی کلیک داخل portal با اینکه در DOM جای دیگری است، در React به ancestor های خودش bubble می‌کند
- **Context کار می‌کند** — کامپوننت portal همچنان می‌تواند context را از والد React خودش بخواند
- **Lifecycle به والد React وابسته است** — وقتی والد unmount شود، محتوای portal هم cleanup می‌شود

```jsx
// محتوای Portal در DOM داخل document.body رندر می‌شود
// اما حباب‌سازی event در React از <Page> → <App> عبور می‌کند
function App() {
  return (
    <Page>
      <Modal>
        {' '}
        {/* والد React برابر Page است، والد DOM برابر body */}
        <button onClick={handleClose}>Close</button>
      </Modal>
    </Page>
  );
}
```

## 🧠 سوال 29

**شناسه**: react-029  
**عنوان**: `useImperativeHandle` چیست و چه زمانی به `forwardRef` نیاز دارید؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: Hooks

### پاسخ 📄

`forwardRef` یک wrapper است که به کامپوننت والد اجازه می‌دهد یک `ref` را تا DOM element یک child component یا یک imperative handle سفارشی عبور دهد.

به‌صورت پیش‌فرض، `ref` روی functional component ها کار نمی‌کند و ref فقط مستقیم به DOM element ها متصل می‌شود. `forwardRef` این امکان را می‌دهد که ref به functional component ها هم متصل شود.

```jsx
const FancyInput = forwardRef(function FancyInput(props, ref) {
  return <input ref={ref} className="fancy-input" {...props} />;
});

// Parent
function Form() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // دسترسی مستقیم به DOM
  }, []);

  return <FancyInput ref={inputRef} />;
}
```

**`useImperativeHandle`** مشخص می‌کند والد از طریق ref دقیقا چه چیزی را ببیند. یعنی به‌جای DOM element خام، یک API محدود و کنترل‌شده در اختیار والد قرار می‌گیرد:

```jsx
const VideoPlayer = forwardRef(function VideoPlayer(props, ref) {
  const videoRef = useRef(null);

  useImperativeHandle(ref, () => ({
    play() {
      videoRef.current.play();
    },
    pause() {
      videoRef.current.pause();
    },
    seek(time) {
      videoRef.current.currentTime = time;
    },
    // خود videoRef.current با تمام DOM API آن مستقیما expose نمی‌شود
  }));

  return <video ref={videoRef} src={props.src} />;
});

// والد فقط { play, pause, seek } را می‌بیند
playerRef.current.play();
```

**چه زمانی استفاده کنیم:** با احتیاط. expose کردن یک API دستوری معمولا در مدل declarative ری‌اکت یک anti-pattern محسوب می‌شود. اولویت با پاس دادن state و callback از طریق props است. از `useImperativeHandle` زمانی استفاده کنید که واقعا لازم باشد والد عملی را به‌صورت imperative اجرا کند؛ مثل مدیریت focus، پخش media یا animation.

## 🧠 سوال 30

**شناسه**: react-030  
**عنوان**: `React.lazy` چیست و همراه با `Suspense` چگونه کار می‌کند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

`React.lazy` امکان code splitting در سطح کامپوننت را فراهم می‌کند. این API یک `import()` پویا را wrap می‌کند و کامپوننتی lazy برمی‌گرداند که React فقط زمانی آن را بارگیری می‌کند که برای اولین بار رندر شود.

```jsx
import { lazy, Suspense } from 'react';

// باندل کامپوننت فقط وقتی Dashboard رندر شود دانلود می‌شود
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

function App() {
  const [page, setPage] = useState('dashboard');

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {page === 'dashboard' ? <Dashboard /> : <Settings />}
    </Suspense>
  );
}
```

**نحوه کار:**

1. `React.lazy(() => import('./Dashboard'))` کامپوننتی می‌سازد که یک Promise را نگه می‌دارد
2. وقتی React برای اولین بار بخواهد آن lazy component را رندر کند، Promise را می‌خواند
3. اگر Promise هنوز pending باشد، React آن Promise را "throw" می‌کند و `<Suspense>` آن را می‌گیرد و fallback را نشان می‌دهد
4. وقتی Promise resolve شود و chunk دانلود شود، React دوباره رندر می‌کند

**نیازمندی‌ها:**

- `import()` پویا باید به ماژولی resolve شود که یک **default export** داشته باشد و آن export یک React component باشد
- باید در جایی بالاتر از lazy component یک مرز `<Suspense>` وجود داشته باشد

**ترکیب با React Router** برای route-level splitting:

```jsx
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

<Routes>
  <Route
    path="/"
    element={
      <Suspense fallback={<Spinner />}>
        <Home />
      </Suspense>
    }
  />
  <Route
    path="/about"
    element={
      <Suspense fallback={<Spinner />}>
        <About />
      </Suspense>
    }
  />
</Routes>;
```

## 🧠 سوال 31

**شناسه**: react-031  
**عنوان**: React چگونه به‌روزرسانی‌های state را batch می‌کند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: رفتار رندرینگ

### پاسخ 📄

Batching یکی از بهینه‌سازی‌های React است که چندین به‌روزرسانی state را از یک event یکجا در یک re-render گروه‌بندی می‌کند.

**React 17 و قبل‌تر:** فقط update هایی که داخل React event handler ها بودند batch می‌شدند. update هایی که داخل `setTimeout`، `Promise.then` یا native event listener ها بودند batch نمی‌شدند و هرکدام یک re-render جدا ایجاد می‌کردند.

**React 18:** مفهوم **Automatic Batching** را معرفی کرد. یعنی به‌صورت پیش‌فرض همه update های state، فارغ از اینکه از کجا آمده باشند، batch می‌شوند:

```jsx
// React 18 — هر سه update در یک re-render واحد batch می‌شوند
setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  setData((d) => [...d, 1]);
  // فقط یک re-render رخ می‌دهد
}, 1000);

// داخل Promise.then، native event listener ها و غیره هم batch می‌شوند
fetch('/api').then(() => {
  setLoading(false);
  setData(result);
  // یک re-render
});
```

**خارج شدن از batching با `flushSync`:**

```jsx
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount((c) => c + 1); // بلافاصله re-render می‌شود
  });
  // DOM اینجا به‌روزرسانی شده و برای خواندن اندازه‌ها مفید است
  flushSync(() => {
    setFlag((f) => !f);
  });
}
```

از `flushSync` با احتیاط استفاده کنید، چون رندر sync را تحمیل می‌کند، performance را کاهش می‌دهد و ممکن است با قابلیت‌های Concurrent React تداخل داشته باشد.

## 🧠 سوال 32

**شناسه**: react-032  
**عنوان**: `useTransition` چیست و چه زمانی باید از آن استفاده کنید؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: Concurrent React

### پاسخ 📄

`useTransition` یکی از hook های Concurrent React است که یک update را به‌عنوان "غیرفوری" یا transition علامت‌گذاری می‌کند. React در طول transition رابط کاربری را responsive نگه می‌دارد و اگر update مهم‌تری مثل تایپ کاربر برسد، update سنگین را به تعویق می‌اندازد.

```jsx
import { useTransition, useState } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    setQuery(e.target.value); // فوری — input بلافاصله آپدیت می‌شود

    startTransition(() => {
      // غیرفوری — React می‌تواند آن را عقب بیندازد تا input روان بماند
      setResults(searchDatabase(e.target.value));
    });
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <ResultsList results={results} />
    </>
  );
}
```

**از نظر داخلی چه اتفاقی می‌افتد:**

- React update مربوط به transition را با اولویت پایین‌تر رندر می‌کند
- اگر قبل از کامل شدن transition یک update فوری جدید برسد، React رندر نیمه‌کاره transition را کنار می‌گذارد و از اول با اطلاعات جدید شروع می‌کند
- تا وقتی transition در حال انجام است، `isPending` برابر `true` است و می‌توانید برای نمایش loading indicator از آن استفاده کنید

**تفاوت `useTransition` و `useDeferredValue`:**

- `useTransition` یک state setter را wrap می‌کند؛ یعنی خودتان مشخص می‌کنید کدام update با تاخیر انجام شود
- `useDeferredValue` یک value را wrap می‌کند؛ وقتی value را از prop یا context می‌گیرید و کنترل مستقیمی روی زمان update ندارید، مناسب‌تر است

## 🧠 سوال 33

**شناسه**: react-033  
**عنوان**: `useDeferredValue` چیست و چه تفاوتی با debouncing دارد؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: Concurrent React

### پاسخ 📄

`useDeferredValue` یک value می‌گیرد و نسخه deferred شده آن را برمی‌گرداند. اگر هنگام re-render یک update با اولویت بالاتر در صف باشد، مقدار deferred موقتاً عقب می‌ماند و React برای responsive ماندن UI از مقدار قدیمی استفاده می‌کند. بعداً وقتی مرورگر فرصت پیدا کند، دوباره با مقدار جدید رندر می‌شود.

```jsx
import { useDeferredValue, memo } from 'react';

function SearchPage({ query }) {
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <p>Showing results for: {query}</p> {/* همیشه به‌روز */}
      <Results query={deferredQuery} /> {/* ممکن است کمی عقب‌تر باشد */}
    </>
  );
}

// برای اینکه فقط وقتی deferredQuery عوض شد دوباره رندر شود،
// کامپوننت گران را با memo بپیچید
const Results = memo(function Results({ query }) {
  // محاسبه / رندر سنگین
  const items = searchItems(query);
  return (
    <ul>
      {items.map((i) => (
        <li key={i.id}>{i.name}</li>
      ))}
    </ul>
  );
});
```

**تفاوت با debouncing:**

- **Debouncing** update را با یک timer ثابت به تاخیر می‌اندازد و همیشه latency ایجاد می‌کند، حتی روی دستگاه‌های سریع
- **`useDeferredValue`** تطبیقی است؛ روی دستگاه سریع و بدون رقابت، ممکن است تقریباً فوری رندر شود. تاخیر فقط وقتی اعمال می‌شود که رقابت بین update ها وجود داشته باشد

**تفاوت با `useTransition`:**

- `useTransition` state setter را wrap می‌کند و وقتی مناسب است که خودتان محل update را کنترل می‌کنید
- `useDeferredValue` روی خود value اعمال می‌شود و وقتی مناسب است که value را از prop یا context دریافت می‌کنید و نمی‌توانید زمان update آن را کنترل کنید

## 🧠 سوال 34

**شناسه**: react-034  
**عنوان**: React Server Components چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: Server Components

### پاسخ 📄

React Server Components یا RSC کامپوننت‌هایی هستند که فقط روی سرور رندر می‌شوند و کد جاوااسکریپت آن‌ها هرگز به کلاینت ارسال نمی‌شود. این کامپوننت‌ها می‌توانند مستقیم به منابع سمت سرور مثل دیتابیس، فایل‌سیستم یا API های داخلی دسترسی داشته باشند، بدون نیاز به رفت‌وبرگشت API از سمت مرورگر.

**ویژگی‌های کلیدی:**

- روی حجم باندل جاوااسکریپت مرورگر اثری ندارند، چون کدشان اصلاً به browser نمی‌رسد
- می‌توانند مستقیم داخل بدنه کامپوننت از `async/await` استفاده کنند
- نمی‌توانند از state (`useState`)، effect (`useEffect`) یا API های مخصوص مرورگر استفاده کنند
- نمی‌توانند مستقیماً تعاملات کاربر را مدیریت کنند

```jsx
// app/users/page.jsx (Next.js App Router)
// این کامپوننت فقط روی سرور اجرا می‌شود — هیچ JS ای به کلاینت نمی‌رود

async function UsersPage() {
  // دسترسی مستقیم به دیتابیس — بدون نیاز به fetch از API
  const users = await db.query('SELECT * FROM users');

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <UserCard user={user} /> {/* این هم server component است */}
          <InteractiveButton userId={user.id} /> {/* client component */}
        </li>
      ))}
    </ul>
  );
}
```

**تفاوت Server Component و Client Component:**

|                        | Server Components | Client Components        |
| ---------------------- | ----------------- | ------------------------ |
| محل رندر               | فقط سرور          | سرور (اولیه) + کلاینت    |
| حجم باندل              | صفر               | به باندل JS اضافه می‌شود |
| State/Effects          | ❌                | ✅                       |
| دسترسی مستقیم به DB/FS | ✅                | ❌                       |
| `async/await` در بدنه  | ✅                | ❌                       |
| دستور `"use client"`   | لازم نیست         | لازم است                 |

**مدل interleaving** — server component و client component می‌توانند تو‌در‌تو باشند. یک server component می‌تواند client component را import کند، اما یک client component نمی‌تواند server component را import کند؛ البته می‌تواند آن را از طریق props یا `children` دریافت کند.

## 🧠 سوال 35

**شناسه**: react-035  
**عنوان**: Hydration در React SSR چیست و چه چیزی باعث hydration mismatch می‌شود؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: SSR / Hydration

### پاسخ 📄

**Server-Side Rendering یا SSR** کل HTML را روی سرور تولید می‌کند و آن را به مرورگر می‌فرستد. مرورگر می‌تواند این HTML را بدون صبر برای جاوااسکریپت فوراً نمایش دهد.

**Hydration** فرایندی است که در آن React روی کلاینت کنترل HTML رندرشده توسط سرور را به دست می‌گیرد، event listener ها را وصل می‌کند و آن HTML ایستا را interactive می‌سازد. React درخت کامپوننت را دوباره رندر می‌کند و آن را با DOM موجود reconcile می‌کند، نه اینکه همه نودها را از صفر بسازد.

```jsx
// Server: به HTML string رندر می‌کند
// Client: DOM موجود را hydrate می‌کند
import { hydrateRoot } from 'react-dom/client';

hydrateRoot(document.getElementById('root'), <App />);
```

**Hydration mismatch** زمانی رخ می‌دهد که HTML تولیدشده در سرور با چیزی که React در کلاینت رندر می‌کند متفاوت باشد. در این حالت React هشدار می‌دهد و برای آن subtree به client-side rendering fallback می‌کند.

**دلایل رایج:**

1. **رندر غیرقطعی** — مثل `Date.now()`، `Math.random()` یا `new Date()` که در سرور و کلاینت مقدارهای متفاوتی می‌دهند
2. **API های مخصوص مرورگر** — مثل `window`، `localStorage` یا `navigator` که هنگام render روی سرور وجود ندارند
3. **رندر شرطی بر اساس `typeof window`** — باعث می‌شود محتوای سرور و کلاینت فرق کند
4. **HTML نامعتبر** — مثل قرار دادن یک `<p>` داخل `<p>` دیگر که مرورگرها آن را به‌طور متفاوتی اصلاح می‌کنند
5. **افزونه‌های مرورگر شخص ثالث** — که نودهایی به DOM تزریق می‌کنند و React انتظارشان را ندارد

**راه‌حل‌ها:**

```jsx
// API های مرورگر را با useEffect یا رندر مخصوص کلاینت محافظت کنید
const [isMounted, setIsMounted] = useState(false);
useEffect(() => setIsMounted(true), []);

return isMounted ? <ClientOnlyComponent /> : null;

// یا برای تفاوت‌های عمدی از suppressHydrationWarning استفاده کنید
<time suppressHydrationWarning>{new Date().toLocaleString()}</time>;
```

## 🧠 سوال 36

**شناسه**: react-036  
**عنوان**: React Fiber چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: داخلی‌های React

### پاسخ 📄

React Fiber بازنویسی کامل الگوریتم اصلی reconciliation در React است که در React 16 معرفی شد. Fiber جای reconciler قدیمی و sync مبتنی بر stack را با یک معماری incremental و interruptible عوض کرد.

**مشکل reconciler قدیمی:**

reconciler اولیه React از پیمایش بازگشتی درخت استفاده می‌کرد و امکان pause شدن نداشت. وقتی React رندر یک درخت بزرگ را شروع می‌کرد، مجبور بود آن را تا انتها تمام کند و این موضوع main thread را block می‌کرد، باعث افت فریم و UI غیرresponsive می‌شد.

**Fiber چه چیزی را ممکن می‌کند:**

1. **رندر incremental** — کار رندر به واحدهای کوچک‌تری به نام fiber شکسته می‌شود. React می‌تواند بعد از هر واحد مکث کند، کنترل را به مرورگر بدهد و بعداً ادامه دهد
2. **زمان‌بندی بر اساس اولویت** — update های مختلف می‌توانند اولویت‌های متفاوت داشته باشند. مثلا تایپ کاربر مهم‌تر از refetch شدن داده در پس‌زمینه است
3. **Concurrent rendering** — امکان کار روی چند نسخه از UI به‌صورت هم‌زمان
4. **Suspense** — امکان "مکث" در رندر تا زمانی که داده آماده شود و سپس ادامه رندر

**Fiber چیست:**

Fiber یک شیء جاوااسکریپتی است که یک واحد کار برای یک نمونه از کامپوننت را نمایش می‌دهد. این شیء شامل موارد زیر است:

- نوع کامپوننت، props و state
- ارجاع به fiber والد، sibling و child به‌صورت linked list
- effect flag هایی که مشخص می‌کنند چه تغییراتی باید روی DOM اعمال شود

```
FiberNode {
  type: Counter,
  stateNode: { count: 0 },
  return: <parentFiber>,
  child: <childFiber>,
  sibling: <siblingFiber>,
  effectTag: UPDATE,
  ...
}
```

React دو درخت Fiber نگه می‌دارد: **current tree** که الان روی صفحه است، و **work-in-progress tree** که در حال ساخته شدن است. وقتی کار کامل شد، React این دو را جابه‌جا می‌کند. این الگو را double buffering می‌گویند.

## 🧠 سوال 37

**شناسه**: react-037  
**عنوان**: تفاوت بین render phase و commit phase در React چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: داخلی‌های React

### پاسخ 📄

چرخه update در React به دو phase مجزا تقسیم می‌شود که ویژگی‌های متفاوتی دارند.

**Render Phase (Reconciliation)**

- React تابع کامپوننت‌ها را صدا می‌زند و یک درخت virtual DOM جدید می‌سازد
- React درخت جدید را با درخت فعلی diff می‌کند تا تغییرات را پیدا کند
- **Async و interruptible است** — React می‌تواند این کار را pause، abort یا restart کند. به همین دلیل ممکن است تابع کامپوننت چند بار صدا زده شود و به همین خاطر باید pure باشد
- در این مرحله هیچ تغییری روی DOM واقعی اعمال نمی‌شود
- `useState`، `useMemo`، `useReducer` و `useCallback` در این phase عمل می‌کنند

**Commit Phase**

- React تغییرات محاسبه‌شده را روی DOM واقعی اعمال می‌کند
- **Sync و غیرقابل قطع است** — React همه mutation ها را یکجا اعمال می‌کند تا UI در وضعیت نیمه‌کاره نماند
- سه زیرمرحله دارد:
  1. **Before mutation** — متد `getSnapshotBeforeUpdate` در class component ها DOM را قبل از تغییر می‌خواند
  2. **Mutation** — نودهای DOM اضافه، حذف یا update می‌شوند
  3. **Layout** — `useLayoutEffect` و `componentDidMount/Update` اینجا به‌صورت sync اجرا می‌شوند
- بعد از paint شدن مرورگر، cleanup و setup مربوط به `useEffect` اجرا می‌شود

```
Render Phase (interruptible):
  → Component functions called
  → Virtual DOM diffed

Commit Phase (synchronous):
  → DOM mutations applied
  → useLayoutEffect runs
  → Browser paints
  → useEffect runs
```

**چرا مهم است:** side effect هایی که DOM را می‌خوانند یا می‌نویسند باید داخل `useLayoutEffect` یا `useEffect` باشند، نه در بدنه کامپوننت، چون render phase ممکن است چند بار اجرا شود بدون اینکه اصلاً commit ای رخ دهد.

## 🧠 سوال 38

**شناسه**: react-038  
**عنوان**: Concurrent React چیست و چه چیزی را ممکن می‌کند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: Concurrent React

### پاسخ 📄

Concurrent React یک تغییر زیرساختی در نحوه رندر درخت کامپوننت‌ها توسط React است که به‌صورت پایدار در React 18 معرفی شد. این مدل رندر React را interruptible می‌کند، یعنی React می‌تواند هم‌زمان روی چند کار مختلف کار کند و مهم‌ترین کار را در اولویت قرار دهد.

**قابلیت اصلی:** React حالا می‌تواند رندر یک درخت جدید را شروع کند، در میانه راه برای رسیدگی به یک update با اولویت بالاتر مثل تایپ کاربر مکث کند، کار نیمه‌تمام را کنار بگذارد و دوباره از نو شروع کند.

**چیزهایی که ممکن می‌کند:**

1. **`useTransition` / `startTransition`** — update ها را کم‌اولویت علامت‌گذاری می‌کنند تا هنگام رندرهای سنگین، UI responsive بماند

2. **`useDeferredValue`** — رندر یک subtree را تا زمانی که مرورگر آزاد شود عقب می‌اندازد؛ شبیه debouncing اما به‌صورت تطبیقی

3. **Automatic batching** — همه update های state به‌طور پیش‌فرض batch می‌شوند، نه فقط آن‌هایی که در event handler هستند

4. **Streaming SSR** — React می‌تواند HTML را به‌صورت تدریجی از سرور stream کند و هر بخش را به‌محض آماده شدن بفرستد

5. **Suspense برای data fetching** — React می‌تواند یک کامپوننت را suspend کند، fallback نشان دهد و وقتی داده آماده شد، آن را بدون پرش‌های عجیب نمایش دهد

**نحوه opt-in به Concurrent Mode:**

```jsx
// React 18 — با createRoot رندر concurrent به‌صورت پیش‌فرض فعال است
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')).render(<App />);

// Legacy mode — بدون قابلیت‌های concurrent
ReactDOM.render(<App />, document.getElementById('root'));
```

**مهم:** concurrent rendering یک تغییر معماری opt-in است. اپلیکیشن‌های قدیمی که از `ReactDOM.render` استفاده می‌کنند همچنان در legacy mode کار می‌کنند و قابلیت‌های concurrent را ندارند.

## 🧠 سوال 39

**شناسه**: react-039  
**عنوان**: `Suspense` در React چیست و چگونه کار می‌کند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: Concurrent React

### پاسخ 📄

`<Suspense>` یک کامپوننت داخلی React است که به شما اجازه می‌دهد برای چیزی مثل یک lazy-loaded component یا داده async "منتظر" بمانید و در این فاصله یک fallback UI نشان دهید.

```jsx
<Suspense fallback={<LoadingSpinner />}>
  <LazyComponent />
</Suspense>
```

**مکانیزم اصلی — throw کردن Promise:**

وقتی یک کامپوننت آماده رندر نیست، مثلا کد یا داده آن هنوز در حال بارگیری است، یک Promise را throw می‌کند. مرز Suspense این Promise را می‌گیرد، `fallback` را نمایش می‌دهد و وقتی Promise resolve شد، کامپوننت را دوباره رندر می‌کند.

```jsx
// نسخه ساده‌شده از مکانیزم داخلی
function LazyComponent() {
  const resource = cache.read(); // اگر هنوز در حال بارگیری باشد Promise throw می‌کند
  return <div>{resource.data}</div>;
}
```

**موارد استفاده:**

1. **Code splitting** با `React.lazy`:

```jsx
const Chart = lazy(() => import('./Chart'));
<Suspense fallback={<Spinner />}>
  <Chart />
</Suspense>;
```

2. **Data fetching** با framework هایی مثل Next.js و Remix یا کتابخانه‌هایی مثل TanStack Query در حالت Suspense:

```jsx
// Next.js Server Component — کامپوننت async به‌صورت خودکار suspend می‌شود
async function UserProfile({ id }) {
  const user = await fetchUser(id);
  return <div>{user.name}</div>;
}
```

**مرزهای تو‌در‌توی Suspense** وضعیت‌های loading را مستقل از هم مدیریت می‌کنند:

```jsx
<Suspense fallback={<PageSkeleton />}>
  <Header />
  <Suspense fallback={<FeedSkeleton />}>
    <NewsFeed />
  </Suspense>
</Suspense>
```

مرز داخلی در حالی که feed بارگیری می‌شود، `<FeedSkeleton />` را نشان می‌دهد، در حالی که header از قبل قابل مشاهده است.

## 🧠 سوال 40

**شناسه**: react-040  
**عنوان**: prop `key` چیست و وقتی از index به‌عنوان key استفاده می‌کنید چه اتفاقی می‌افتد؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: JSX و رندرینگ

### پاسخ 📄

prop `key` یک hint ویژه است که React هنگام reconciliation لیست‌ها از آن استفاده می‌کند تا بفهمد کدام آیتم‌ها بین دو رندر تغییر کرده‌اند، اضافه شده‌اند یا حذف شده‌اند.

**چرا استفاده از index به‌عنوان key مشکل‌ساز است:**

وقتی از اندیس آرایه به‌عنوان key استفاده می‌کنید، React هر اندیس را به یک کامپوننت وصل می‌کند. اگر آرایه reorder شود، filter شود یا آیتمی به اول آن اضافه شود، اندیس‌ها جابه‌جا می‌شوند و React فکر می‌کند عنصر index 0 همان عنصر قبلی است، در حالی که حالا آیتم دیگری آنجا قرار دارد.

نتیجه این کار می‌تواند این‌ها باشد:

- **state اشتباه** — مثلا یک input کنترل‌شده یا حتی uncontrolled ممکن است مقدار واردشده را برای آیتم اشتباه نگه دارد
- **animation اشتباه** — transition ها روی عنصر اشتباه اعمال می‌شوند
- **state قدیمی کامپوننت** — cleanup های `useEffect` بین آیتم‌های واقعاً متفاوت اجرا نمی‌شود، چون React آن‌ها را یکسان فرض کرده است

```jsx
// نمایش باگ
const [items, setItems] = useState(['Alice', 'Bob', 'Carol']);

// بعد از اضافه کردن 'Zara' به ابتدای لیست:
// قبلا index 0 برابر 'Alice' بود، حالا 'Zara' است
// React فکر می‌کند فقط props همان عنصر قبلی عوض شده و آن را unmount/remount نمی‌کند
{
  items.map((name, index) => (
    <input key={index} defaultValue={name} /> // ممکن است مقادیر اشتباه نشان دهد
  ));
}

// راه‌حل — از ID پایدار استفاده کنید
{
  items.map((item) => <input key={item.id} defaultValue={item.name} />);
}
```

**چه زمانی استفاده از index به‌عنوان key قابل قبول است:**

- لیست ایستا باشد و هرگز reorder نشود
- از وسط لیست آیتمی اضافه یا حذف نشود
- آیتم‌ها child های stateful مثل input یا animation نداشته باشند

## 🧠 سوال 41

**شناسه**: react-041  
**عنوان**: `useId` چیست و چه زمانی به آن نیاز دارید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Hooks

### پاسخ 📄

`useId` در React 18 یک ID یکتا و پایدار تولید می‌کند که بین رندر سمت سرور و سمت کلاینت سازگار می‌ماند. این hook مشکل تولید ID برای ویژگی‌های دسترس‌پذیری مثل `htmlFor`، `aria-describedby` و `aria-labelledby` را به‌شکلی سازگار با SSR حل می‌کند.

```jsx
import { useId } from 'react';

function PasswordField() {
  const id = useId(); // مثلا ":r3:"

  return (
    <div>
      <label htmlFor={id}>Password</label>
      <input id={id} type="password" aria-describedby={`${id}-hint`} />
      <p id={`${id}-hint`}>Must be at least 8 characters.</p>
    </div>
  );
}
```

**چرا از `Math.random()` یا شمارنده استفاده نکنیم؟**

- `Math.random()` در هر رندر مقدار متفاوتی می‌دهد، از جمله بین سرور و کلاینت، و باعث hydration mismatch می‌شود
- شمارنده‌ای که در سطح ماژول تعریف شده باشد در سرور و کلاینت به شکل متفاوتی افزایش پیدا می‌کند

`useId` بر اساس جایگاه کامپوننت در درخت React، ID ها را به‌صورت deterministic تولید می‌کند؛ اگر ساختار درخت یکسان باشد، ID سمت سرور و کلاینت هم یکسان خواهد بود.

**مهم:** از `useId` به‌عنوان key لیست استفاده نکنید. این hook برای هر فراخوانی hook در هر instance کامپوننت یک ID می‌سازد، نه برای هر آیتم لیست.

## 🧠 سوال 42

**شناسه**: react-042  
**عنوان**: `useSyncExternalStore` چیست و چه زمانی باید از آن استفاده کنید؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: Hooks

### پاسخ 📄

`useSyncExternalStore` در React 18 hook توصیه‌شده برای subscribe شدن به store های خارجی است؛ یعنی هر منبع داده mutable که خارج از سیستم state خود React قرار دارد. این hook در Concurrent React سازگاری را حفظ می‌کند، چون ممکن است React قبل از commit چند بار یک کامپوننت را رندر کند.

```jsx
import { useSyncExternalStore } from 'react';

// subscribe شدن به وضعیت آنلاین بودن مرورگر
function useOnlineStatus() {
  return useSyncExternalStore(
    // subscribe: وقتی React بخواهد subscribe کند صدا زده می‌شود
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    // getSnapshot: مقدار فعلی را برمی‌گرداند
    () => navigator.onLine,
    // getServerSnapshot: مقدار سمت سرور برای SSR
    () => true,
  );
}

function Status() {
  const isOnline = useOnlineStatus();
  return <p>{isOnline ? '🟢 Online' : '🔴 Offline'}</p>;
}
```

**چرا نه فقط `useEffect` + `useState`؟**

در Concurrent React ممکن است React پیش از commit چند بار کامپوننت را رندر کند. اگر بین این رندرها یک store خارجی تغییر کند، بخش‌های مختلف UI ممکن است نسخه‌های متفاوتی از یک داده را نشان دهند. به این مشکل tearing می‌گویند. `useSyncExternalStore` با همگام‌سازی خواندن داده این مشکل را حل می‌کند.

تقریباً همه کتابخانه‌های بزرگ مدیریت state مثل Zustand، Redux و Valtio از `useSyncExternalStore` در پیاده‌سازی داخلی خود استفاده می‌کنند.

## 🧠 سوال 43

**شناسه**: react-043  
**عنوان**: `useInsertionEffect` چیست و چه زمانی استفاده می‌شود؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: Hooks

### پاسخ 📄

`useInsertionEffect` به‌صورت synchronous قبل از اینکه React هرگونه mutation روی DOM انجام دهد اجرا می‌شود. این hook در React 18 به‌طور خاص برای نویسندگان کتابخانه‌های CSS-in-JS معرفی شد؛ کسانی که باید style ها را قبل از هرگونه layout read به DOM تزریق کنند.

```jsx
// برای کتابخانه‌های CSS-in-JS طراحی شده، نه کد معمول اپلیکیشن
useInsertionEffect(() => {
  const styleElement = document.createElement('style');
  styleElement.textContent = `.btn-${hash} { color: red; }`;
  document.head.appendChild(styleElement);
  return () => document.head.removeChild(styleElement);
}, [hash]);
```

**ترتیب اجرا:**

```
React computes DOM mutations (render phase complete)
  → useInsertionEffect (CSS injected — no layout yet)
  → React applies DOM mutations (commit mutation phase)
  → useLayoutEffect (layout can be read)
  → Browser paints
  → useEffect
```

**چرا وجود دارد:** کتابخانه‌های CSS-in-JS مثل Emotion یا styled-components باید style ها را قبل از اجرای `useLayoutEffect` وارد DOM کنند، چون `useLayoutEffect` ممکن است اندازه‌ها و layout را بخواند و این اندازه‌ها باید با style درست محاسبه شوند. بدون `useInsertionEffect` این کتابخانه‌ها مجبور بودند از `useLayoutEffect` استفاده کنند و این موضوع می‌توانست باعث باگ شود.

**توسعه‌دهندگان معمول اپلیکیشن نباید مستقیماً از `useInsertionEffect` استفاده کنند.** این hook تقریباً مخصوص لایه داخلی کتابخانه‌های CSS-in-JS است.

## 🧠 سوال 44

**شناسه**: react-044  
**عنوان**: `useDebugValue` چیست و چگونه استفاده می‌شود؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: Hooks

### پاسخ 📄

`useDebugValue` یک برچسب برای custom hook شما به React DevTools اضافه می‌کند. این قابلیت برای کتابخانه‌ها و custom hook های مشترک مفید است تا هنگام دیباگ، بررسی آن‌ها راحت‌تر شود.

```jsx
function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);

  // در React DevTools چیزی مثل "Online" یا "Offline" نمایش می‌دهد
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}
```

**فرمت‌دهی با تاخیر** — اگر ساختن مقدار debug پرهزینه است، می‌توانید آرگومان دوم را به‌صورت تابع formatter بدهید. React فقط وقتی DevTools باز باشد آن را صدا می‌زند:

```jsx
function useUser(id) {
  const user = fetchUserFromCache(id);

  // این formatter فقط هنگام inspect شدن این hook در DevTools اجرا می‌شود
  useDebugValue(user, (u) => `${u.name} (${u.role})`);

  return user;
}
```

**راهنماها:**

- فقط به custom hook هایی `useDebugValue` اضافه کنید که در بخش‌های زیادی استفاده می‌شوند
- آن را به هر hook کوچکی اضافه نکنید، چون هم سربار ایجاد می‌کند و هم DevTools را شلوغ می‌کند
- در build های production اثری ندارد

## 🧠 سوال 45

**شناسه**: react-045  
**عنوان**: تفاوت بین `createElement` و JSX چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: JSX و رندرینگ

### پاسخ 📄

JSX در اصل syntax sugar برای `React.createElement` یا تابع `jsx` در JSX transform جدید است. هر دو خروجی یکسانی تولید می‌کنند.

```jsx
// JSX
const element = (
  <div className="container">
    <h1>Hello</h1>
    <p>{message}</p>
  </div>
);

// معادل بدون JSX — طولانی‌تر ولی از نظر نتیجه یکسان
const element = React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, 'Hello'),
  React.createElement('p', null, message),
);
```

هر دو در نهایت یک شیء React element مشابه تولید می‌کنند:

```js
{
  type: 'div',
  props: {
    className: 'container',
    children: [
      { type: 'h1', props: { children: 'Hello' } },
      { type: 'p', props: { children: message } }
    ]
  }
}
```

**JSX transform جدید در React 17+:**

runtime خودکار JSX در `react/jsx-runtime` معرفی شد تا دیگر لازم نباشد در هر فایل `React` را به‌صورت دستی import کنید. transpiler این import را خودش اضافه می‌کند.

```jsx
// قبل از React 17 — import دستی لازم بود
import React from 'react';

// در React 17+ با automatic transform — import دستی لازم نیست
// transpiler چیزی شبیه این را تزریق می‌کند: import { jsx as _jsx } from 'react/jsx-runtime';
```

مستقیماً `React.createElement` را معمولاً فقط در این حالت‌ها می‌نویسید:

- وقتی نوع element در runtime تعیین می‌شود و می‌خواهید آن را پویا بسازید
- وقتی در محیطی هستید که JSX را پشتیبانی نمی‌کند
- وقتی ابزارها یا renderer های سطح پایین می‌سازید

## 🧠 سوال 46

**شناسه**: react-046  
**عنوان**: prop `children` چیست و چه الگوهایی می‌توان با آن داشت؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: کامپوننت‌ها

### پاسخ 📄

`children` یک prop داخلی React است که محتوای قرارگرفته بین تگ باز و بسته یک کامپوننت را در خود نگه می‌دارد. این محتوا می‌تواند یک element، چند element، رشته، تابع یا هر مقدار قابل رندر دیگری باشد.

```jsx
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
    </div>
  );
}

// children = <p>Content</p>
<Card title="Info">
  <p>Content</p>
</Card>;
```

**الگوهای رایج:**

**کامپوننت‌های layout یا wrapper:**

```jsx
<Layout>
  <Sidebar />
  <MainContent />
</Layout>
```

**Render props** یعنی پاس دادن تابع به‌عنوان `children`:

```jsx
<DataFetcher url="/api/users">
  {({ data, loading }) => (loading ? <Spinner /> : <UserList users={data} />)}
</DataFetcher>;

// کامپوننت children را به‌صورت تابع صدا می‌زند
function DataFetcher({ url, children }) {
  const { data, loading } = useFetch(url);
  return children({ data, loading });
}
```

**ابزارهای `React.Children`** برای بررسی یا تبدیل children:

```jsx
React.Children.count(children);
React.Children.map(children, (child) => cloneElement(child, { theme }));
React.Children.toArray(children).filter(Boolean);
```

**Named slot ها با prop های اضافه** برای ناحیه‌های مختلف محتوا:

```jsx
<Modal header={<h2>Title</h2>} footer={<Button>Close</Button>}>
  <p>Modal body content</p>
</Modal>
```

## 🧠 سوال 47

**شناسه**: react-047  
**عنوان**: Higher-Order Component یا HOC چیست و چه زمانی استفاده می‌شود؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

Higher-Order Component یا HOC تابعی است که یک کامپوننت را می‌گیرد و یک کامپوننت جدید و تقویت‌شده برمی‌گرداند. این یک الگو برای استفاده مجدد از منطق کامپوننت است و بر پایه composition کار می‌کند، نه inheritance.

```jsx
// withAuth — یک HOC که کاربران بدون احراز هویت را redirect می‌کند
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <WrappedComponent {...props} user={user} />;
  };
}

// استفاده
const ProtectedDashboard = withAuth(Dashboard);
```

**موارد استفاده رایج HOC:**

- بررسی authentication یا authorization
- logging و analytics
- تزریق داده یا context به کامپوننت‌ها
- اضافه کردن رفتارهایی مثل error boundary

**قراردادهای مهم هنگام نوشتن HOC:**

- همه prop های نامرتبط را با `{...props}` عبور دهید
- برای debugging یک `displayName` معنادار تنظیم کنید
- کامپوننت wrapped شده را mutate نکنید؛ یک کامپوننت جدید برگردانید
- HOC را داخل کامپوننت دیگری تعریف نکنید، چون هر بار inner component دوباره ساخته می‌شود

**تفاوت HOC و custom hook:**

در React مدرن، custom hook ها جای بسیاری از کاربردهای HOC را گرفته‌اند. hook ها ساده‌ترند، node اضافه به درخت UI نمی‌کنند و مشکل تداخل نام prop ندارند. با این حال HOC هنوز برای سازگاری با class component ها یا افزودن wrapper های سطح JSX مفید است.

## 🧠 سوال 48

**شناسه**: react-048  
**عنوان**: الگوی render prop چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

الگوی render prop تکنیکی است که در آن یک کامپوننت تابعی را به‌عنوان prop یا به‌عنوان `children` می‌گیرد و آن را صدا می‌زند تا مسئولیت رندر را به مصرف‌کننده واگذار کند. این الگو امکان اشتراک‌گذاری منطق بین کامپوننت‌ها را بدون HOC یا تکرار کد فراهم می‌کند.

```jsx
// دنبال‌کننده ماوس با render prop
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    setPosition({ x: e.clientX, y: e.clientY });
  }

  return (
    <div onMouseMove={handleMouseMove} style={{ height: '100vh' }}>
      {render(position)}
    </div>
  );
}

// مصرف‌کننده مشخص می‌کند با داده موقعیت چه چیزی رندر شود
<MouseTracker
  render={({ x, y }) => (
    <div>
      Mouse at ({x}, {y})
    </div>
  )}
/>;

// همان کامپوننت با رندر متفاوت
<MouseTracker render={({ x, y }) => <Circle cx={x} cy={y} r={10} />} />;
```

**`children` به‌عنوان render prop** همان الگو با syntax متفاوت:

```jsx
<MouseTracker>{({ x, y }) => <div>({x}, {y})</div>}</MouseTracker>

// پیاده‌سازی children را مثل یک تابع صدا می‌زند
function MouseTracker({ children }) {
  // ...
  return <div onMouseMove={...}>{children(position)}</div>;
}
```

**تفاوت render prop و custom hook:**

custom hook ها تا حد زیادی جای render prop را برای اشتراک‌گذاری منطق گرفته‌اند، چون تمیزتر هستند و node اضافه در درخت UI ایجاد نمی‌کنند. اما render prop هنوز وقتی مفید است که رفتار مشترک ذاتاً به خود رندر وابسته باشد.

## 🧠 سوال 49

**شناسه**: react-049  
**عنوان**: state colocation چیست و چرا مهم است؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

State colocation یعنی state را تا حد ممکن نزدیک به کامپوننت‌هایی نگه دارید که واقعاً از آن استفاده می‌کنند و آن را بی‌دلیل به سطوح بالاتر درخت منتقل نکنید.

**چرا مهم است:**

وقتی state بیش از حد بالا در درخت نگه داشته شود، هر تغییر آن باعث re-render شدن کل زیر‌درخت می‌شود، حتی کامپوننت‌هایی که اصلاً به آن state نیازی ندارند:

```jsx
// بد — state مربوط به جستجو داخل App نگه داشته شده
function App() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <>
      <Header /> {/* با هر تایپ دوباره رندر می‌شود */}
      <Sidebar /> {/* با هر تایپ دوباره رندر می‌شود */}
      <SearchBox query={searchQuery} onChange={setSearchQuery} />
      <Results query={searchQuery} />
    </>
  );
}

// خوب — state نزدیک مالک واقعی آن قرار گرفته
function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <>
      <SearchBox query={searchQuery} onChange={setSearchQuery} />
      <Results query={searchQuery} />
    </>
  );
}

function App() {
  return (
    <>
      <Header /> {/* دیگر با تایپ دوباره رندر نمی‌شود */}
      <Sidebar /> {/* دیگر با تایپ دوباره رندر نمی‌شود */}
      <SearchSection />
    </>
  );
}
```

**اصل colocation:** state باید در پایین‌ترین جد مشترک همه کامپوننت‌هایی قرار بگیرد که به آن نیاز دارند.

**چه زمانی state را بالا ببریم:** فقط وقتی که چند sibling باید همان state مشترک را مصرف کنند. حتی در این حالت هم فقط تا همان سطح لازم آن را بالا ببرید، نه لزوماً تا root.

State colocation به‌طور طبیعی re-render ها را کم می‌کند، بدون اینکه همیشه لازم باشد سراغ `React.memo`، `useMemo` یا ابزارهای پیچیده مدیریت state بروید.

## 🧠 سوال 50

**شناسه**: react-050  
**عنوان**: الگوی compound component چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

الگوی compound component روشی برای طراحی کامپوننت‌هایی است که با هم کار می‌کنند، state مشترک را به‌طور ضمنی از طریق Context با هم به اشتراک می‌گذارند و در عین حال به مصرف‌کننده آزادی زیادی در composition و نحوه رندر می‌دهند.

```jsx
import { createContext, useContext, useState } from 'react';

const TabsContext = createContext(null);

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return (
    <div className="tab-list" role="tablist">
      {children}
    </div>
  );
}

function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      role="tab"
      aria-selected={activeTab === id}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
}

function TabPanel({ id, children }) {
  const { activeTab } = useContext(TabsContext);
  return activeTab === id ? <div role="tabpanel">{children}</div> : null;
}

// اتصال sub-component ها به‌عنوان property
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

// مصرف‌کننده روی layout و composition کنترل کامل دارد
function App() {
  return (
    <Tabs defaultTab="home">
      <Tabs.List>
        <Tabs.Tab id="home">Home</Tabs.Tab>
        <Tabs.Tab id="profile">Profile</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel id="home">
        <HomeContent />
      </Tabs.Panel>
      <Tabs.Panel id="profile">
        <ProfileContent />
      </Tabs.Panel>
    </Tabs>
  );
}
```

**مزیت نسبت به یک کامپوننت monolithic:** مصرف‌کننده می‌تواند sub-component ها را جابه‌جا کند، حذف کند یا بین آن‌ها عناصر دیگری قرار دهد. state مشترک از دید مصرف‌کننده پنهان می‌ماند، اما همه sub-component ها به آن دسترسی دارند.

## 🧠 سوال 51

**شناسه**: react-051  
**عنوان**: cleanup در `useEffect` چگونه کار می‌کند و چرا مهم است؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Effects و چرخه حیات

### پاسخ 📄

تابعی که از `useEffect` برگردانده می‌شود، تابع cleanup است. React این تابع را قبل از اجرای دوباره effect، وقتی dependency ها تغییر کنند، و همچنین هنگام unmount شدن کامپوننت اجرا می‌کند.

اگر cleanup درست انجام نشود، effect ها می‌توانند این مشکلات را ایجاد کنند:

- **Memory leak** — مثل event listener، timer یا subscription هایی که جمع می‌شوند
- **به‌روزرسانی state بعد از unmount** — callback های قدیمی هنوز تلاش می‌کنند state را عوض کنند
- **stale closure** — subscription یا async callback قدیمی با داده‌های منقضی‌شده کار می‌کند

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false; // برای جلوگیری از update های قدیمی
    const controller = new AbortController();

    async function fetchUser() {
      try {
        const res = await fetch(`/api/users/${userId}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        if (!cancelled) setUser(data);
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err);
      }
    }

    fetchUser();

    return () => {
      cancelled = true;
      controller.abort(); // لغو درخواست در حال اجرا
    };
  }, [userId]); // با تغییر userId دوباره اجرا می‌شود و cleanup قبلی را انجام می‌دهد

  return user ? <div>{user.name}</div> : <Spinner />;
}
```

**React 18 + StrictMode** در محیط توسعه effect ها را به شکل mount → cleanup → mount دوبار اجرا می‌کند تا cleanup های ناقص مشخص شوند. اگر برنامه در StrictMode خراب می‌شود، معمولاً effect شما cleanup مناسب ندارد.

## 🧠 سوال 52

**شناسه**: react-052  
**عنوان**: بالا بردن state در React یعنی چه؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: Props و State

### پاسخ 📄

Lifting state up یعنی state را از یک child component به نزدیک‌ترین جد مشترک منتقل کنیم، وقتی دو یا چند sibling باید آن state را با هم به اشتراک بگذارند یا همگام نگه دارند.

```jsx
// مشکل — هر Thermometer state خودش را دارد و نمی‌توانند sync شوند
function ThermometerCelsius() {
  const [celsius, setCelsius] = useState(0);
  return <input value={celsius} onChange={(e) => setCelsius(e.target.value)} />;
}
function ThermometerFahrenheit() {
  const [fahrenheit, setFahrenheit] = useState(32);
  return (
    <input value={fahrenheit} onChange={(e) => setFahrenheit(e.target.value)} />
  );
}

// راه‌حل — state را به والد منتقل می‌کنیم
function TemperatureConverter() {
  const [celsius, setCelsius] = useState(0);
  const fahrenheit = (celsius * 9) / 5 + 32;

  return (
    <>
      <input
        value={celsius}
        onChange={(e) => setCelsius(Number(e.target.value))}
        placeholder="Celsius"
      />
      <input
        value={fahrenheit}
        onChange={(e) => setCelsius(((Number(e.target.value) - 32) * 5) / 9)}
        placeholder="Fahrenheit"
      />
    </>
  );
}
```

**چه زمانی state را بالا می‌بریم:**

- وقتی دو sibling باید یک مقدار مشترک را بخوانند یا sync کنند
- وقتی والد باید به تغییر state فرزند واکنش نشان دهد
- وقتی یک state رفتار یا visibility چند کامپوننت مختلف را کنترل می‌کند

**نقطه ضعف این کار:** هر بار که آن state تغییر کند، ancestor دوباره رندر می‌شود و ممکن است sibling های نامرتبط هم دوباره رندر شوند. می‌توان این اثر را با state colocation مناسب، `React.memo` یا شکستن کامپوننت‌ها کمتر کرد.

## 🧠 سوال 53

**شناسه**: react-053  
**عنوان**: الگوریتم diffing در reconciliation ری‌اکت دقیقاً چگونه کار می‌کند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: داخلی‌های React

### پاسخ 📄

الگوریتم diffing ری‌اکت دو درخت virtual DOM را با استفاده از heuristic ها مقایسه می‌کند تا به‌جای پیچیدگی نظری `O(n^3)` در مقایسه کامل درخت‌ها، به پیچیدگی حدود `O(n)` برسد.

**سه heuristic اصلی:**

**1. عنصرهایی با type متفاوت، درخت‌های کاملاً متفاوتی تولید می‌کنند.**

اگر type در یک موقعیت عوض شود، مثلا `<div>` به `<span>` یا `<Counter>` به `<Timer>`، ری‌اکت کل subtree قبلی را unmount می‌کند، از جمله همه child ها و state آن‌ها، و subtree جدید را از صفر mount می‌کند.

```jsx
// React، Counter را unmount و Timer را mount می‌کند
{
  isTimer ? <Timer /> : <Counter />;
}
```

**2. prop `key` هویت عناصر را بین رندرها پایدار می‌کند.**

در لیست‌ها، React از `key` برای match کردن عناصر استفاده می‌کند. element هایی با key یکسان درجا update می‌شوند و instance آن‌ها حفظ می‌شود. element هایی که key متناظر ندارند unmount می‌شوند و key های جدید mount می‌شوند.

**3. عنصرهایی با type یکسان درجا update می‌شوند.**

اگر type عنصر یکسان باشد، React همان DOM node موجود را نگه می‌دارد و فقط prop ها یا attribute های تغییر کرده را update می‌کند:

```jsx
// React فقط className را update می‌کند و نود DOM را از نو نمی‌سازد
// Before: <div className="old" />
// After:  <div className="new" />
```

برای element های کامپوننتی با type یکسان، React همان instance را نگه می‌دارد، prop ها را update می‌کند و دوباره render آن را اجرا می‌کند تا virtual DOM بعدی را بگیرد.

**چرا diff بازگشتی زود متوقف می‌شود:** React هرگز نودها را بین موقعیت‌های sibling مختلف یا بین سطوح مختلف درخت با هم مقایسه نمی‌کند. هر موقعیت در درخت فقط با همان موقعیت متناظر در درخت جدید مقایسه می‌شود و همین باعث خطی ماندن الگوریتم می‌شود.

## 🧠 سوال 54

**شناسه**: react-054  
**عنوان**: `React.cloneElement` چیست و چه زمانی استفاده می‌شود؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: کامپوننت‌ها

### پاسخ 📄

`React.cloneElement` یک کپی از یک React element می‌سازد و در صورت نیاز prop ها یا children آن را تغییر می‌دهد. از آن معمولاً برای تزریق prop های اضافه به child element هایی استفاده می‌شود که والد کنترل مستقیمی روی پیاده‌سازی آن‌ها ندارد.

```jsx
React.cloneElement(element, [newProps], [...newChildren]);
```

**مثال — یک `RadioGroup` که prop `name` را به child های `Radio` تزریق می‌کند:**

```jsx
function RadioGroup({ name, children }) {
  return (
    <div>
      {React.Children.map(
        children,
        (child) => React.cloneElement(child, { name }), // تزریق 'name' خاصبت
      )}
    </div>
  );
}

// استفاده — کامپوننت‌های Radio به‌صورت خودکار name="gender" را دریافت می‌کنند
<RadioGroup name="gender">
  <Radio value="male">Male</Radio>
  <Radio value="female">Female</Radio>
</RadioGroup>;
```

**موارد استفاده رایج:**

- تزریق prop های مشترک مثل group name، theme یا variant به children
- wrap کردن child ها با event handler یا ref های اضافه
- کتابخانه‌های tooltip یا overlay که هر element دلخواهی را wrap می‌کنند

**جایگزین‌های مدرن:**

`cloneElement` در React مدرن تا حدی anti-pattern محسوب می‌شود، چون وابستگی ضمنی بین والد و child ایجاد می‌کند. معمولاً این گزینه‌ها بهتر هستند:

- **Context API** — برای تزریق داده به یک subtree دلخواه
- **Compound components** — برای رابطه ساختاریافته بین والد و child
- **Render props** یا `children` به‌شکل تابع — برای انعطاف بیشتر

`cloneElement` هنوز برای primitive های سطح پایین UI که باید بدون نیاز به context، prop هایی به element های دلخواه اضافه کنند، کاربردی است.

## 🧠 سوال 55

**شناسه**: react-055  
**عنوان**: فرم‌ها را در React همراه با validation چگونه مدیریت می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: فرم‌ها و رویدادها

### پاسخ 📄

مدیریت فرم در React معمولاً یعنی استفاده از controlled component ها؛ یعنی نگه داشتن مقادیر فرم در state و اعتبارسنجی هنگام تغییر یا submit.

**فرم controlled ساده با validation:**

```jsx
function SignUpForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  function validate(values) {
    const errs = {};
    if (!values.email.includes('@')) errs.email = 'Invalid email';
    if (values.password.length < 8) errs.password = 'Password too short';
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // پاک کردن خطا هنگام تغییر
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    submitForm(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={form.email} onChange={handleChange} />
      {errors.email && <span>{errors.email}</span>}

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
      {errors.password && <span>{errors.password}</span>}

      <button type="submit">Sign Up</button>
    </form>
  );
}
```

**کتابخانه‌های فرم** بخش‌هایی مثل validation، dirty state و submit را انتزاعی می‌کنند:

- **React Hook Form** — رویکرد بیشتر uncontrolled با الگوی register؛ re-render کم؛ سازگاری خوب با Zod یا Yup
- **Formik** — بیشتر controlled؛ re-render بیشتر ولی API کامل
- **Remix forms / Server Actions** — submit در سمت سرور انجام می‌شود و برای فرم‌های ساده شاید اصلاً state سمت کلاینت لازم نباشد

## 🧠 سوال 56

**شناسه**: react-056  
**عنوان**: `forwardRef` در React چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Hooks

### پاسخ 📄

`forwardRef` یک API در React است که به کامپوننت والد اجازه می‌دهد یک `ref` را به DOM element یا instance داخل یک child component عبور دهد.

به‌صورت پیش‌فرض، `ref` را نمی‌توان مستقیماً روی functional component گذاشت، چون به‌طور خودکار به چیزی در داخل آن forward نمی‌شود. `forwardRef` به‌صورت صریح این قابلیت را فعال می‌کند.

```jsx
import { forwardRef, useRef } from 'react';

const Input = forwardRef(function Input({ label, ...props }, ref) {
  return (
    <div>
      <label>{label}</label>
      <input ref={ref} {...props} /> {/* ref به input واقعی forward می‌شود */}
    </div>
  );
});

// Parent
function Form() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <>
      <Input label="Email" ref={inputRef} type="email" />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}
```

**همراه با TypeScript:**

```tsx
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, ...props },
  ref,
) {
  return <input ref={ref} {...props} />;
});
```

**تغییرات React 19:** در React 19، `ref` در function component ها به‌عنوان یک prop معمولی هم در دسترس است، بنابراین برای کامپوننت‌های جدید خیلی وقت‌ها دیگر به `forwardRef` نیاز ندارید. با این حال اگر از نسخه‌های قدیمی‌تر React پشتیبانی می‌کنید، یا با class component ها و الگوهای قدیمی‌تر سروکار دارید، `forwardRef` همچنان مهم است.

```jsx
// React 19 — در بسیاری از function component ها دیگر forwardRef لازم نیست
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}
```

## 🧠 سوال 57

**شناسه**: react-057  
**عنوان**: React profiler چیست و چگونه از آن برای پیدا کردن مشکلات performance استفاده می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

React دو راه اصلی برای profiling عملکرد رندر کامپوننت‌ها فراهم می‌کند.

**React DevTools Profiler** — تب مخصوصی در افزونه مرورگر که همه رندرها و علت آن‌ها را در طول یک interaction ثبت می‌کند.

**نحوه استفاده:**

1. React DevTools را باز کنید و به تب Profiler بروید
2. روی Record کلیک کنید
3. با برنامه تعامل انجام دهید، مثل کلیک، تایپ یا navigation
4. ضبط را متوقف کنید
5. flame graph را بررسی کنید؛ هر نوار نماینده یک رندر کامپوننت است. عرض نوار برابر مدت زمان رندر است

**یافته‌های رایج:**

- کامپوننتی زیاد رندر می‌شود بدون اینکه prop هایش تغییر کرده باشد — شاید `React.memo` کمک کند
- کامپوننتی فقط چون والدش رندر شده دوباره رندر می‌شود — بررسی کنید آیا state والد در جای درستی قرار دارد
- تعداد زیادی رندر کوچک با هم یکی شده‌اند — batching درست کار می‌کند
- یک رندر خیلی طولانی است — منطق کامپوننت سنگین است و شاید `useMemo` یا virtualization لازم باشد

**API مربوط به `React.Profiler`** — برای اندازه‌گیری برنامه‌نویسی‌شده:

```jsx
import { Profiler } from 'react';

function onRender(id, phase, actualDuration) {
  // id: همان id ای که به Profiler داده‌اید
  // phase: "mount" یا "update"
  // actualDuration: مدت زمان رندر برحسب میلی‌ثانیه
  if (actualDuration > 16) {
    reportSlowRender(id, actualDuration);
  }
}

<Profiler id="Dashboard" onRender={onRender}>
  <Dashboard />
</Profiler>;
```

کامپوننت `Profiler` سربار کمی دارد، هرچند زیاد نیست. آن را به‌صورت هدفمند استفاده کنید و در صورت نیاز برای build های production حذفش کنید.

## 🧠 سوال 58

**شناسه**: react-058  
**عنوان**: windowing یا virtualization چیست و چه زمانی در React به آن نیاز دارید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

Windowing یا virtualization تکنیکی است که فقط بخش قابل‌مشاهده یک لیست بزرگ را رندر می‌کند. به‌جای ساختن هزاران DOM node، فقط آیتم‌هایی که در viewport هستند به‌همراه یک بافر کوچک رندر می‌شوند. با اسکرول کاربر، آیتم‌ها وارد و خارج از مجموعه رندرشده می‌شوند.

**چه زمانی از آن استفاده کنیم:**

- وقتی لیست صدها یا هزاران آیتم دارد و رندر کامل باعث این مشکلات می‌شود:
  - زمان اولیه رندر زیاد
  - مصرف حافظه بالا
  - اسکرول کند و افت فریم

**کتابخانه‌ها:**

- **`react-window`** — سبک و با API ساده
- **`react-virtual` / `@tanstack/virtual`** — headless و منعطف
- **`react-virtuoso`** — کامل‌تر با پشتیبانی از ارتفاع متغیر، infinite scroll و grouping

```jsx
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {/* style شامل موقعیت top و height است */}
      <UserCard user={items[index]} />
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={72}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

**Trade-off ها:**

- آیتم‌های بیرون viewport unmount و هنگام اسکرول دوباره mount می‌شوند، بنابراین ممکن است state محلی خود را از دست بدهند
- دسترس‌پذیری می‌تواند پیچیده‌تر شود، چون screen reader ها شاید آیتم‌های خارج از viewport را نبینند
- navigation با کیبورد معمولاً نیاز به رسیدگی بیشتر دارد

برای حالت‌های ساده با چندصد آیتم، معمولاً قبل از رفتن سراغ virtualization، استفاده از فیلتر مناسب، `React.memo` و `useMemo` کافی است.

## 🧠 سوال 59

**شناسه**: react-059  
**عنوان**: تفاوت‌های React 17 و React 18 چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: مبانی React

### پاسخ 📄

React 18 چند قابلیت و تغییر مهم معرفی کرد.

**API جدید برای root:**

```jsx
// React 17 — legacy mode و بدون قابلیت‌های concurrent
ReactDOM.render(<App />, document.getElementById('root'));

// React 18 — قابلیت‌های concurrent را فعال می‌کند
const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

**Automatic Batching:**

در React 17 فقط update های state داخل React event handler ها batch می‌شدند. در React 18 همه update ها، حتی داخل `setTimeout`، `Promise.then` و native listener ها، به‌صورت پیش‌فرض batch می‌شوند.

**قابلیت‌های concurrent که پایدار شدند:**

- `useTransition` و `startTransition`
- `useDeferredValue`
- `useId`
- `useSyncExternalStore`
- `useInsertionEffect`

**Streaming SSR همراه با Suspense:**

React 18 از `renderToPipeableStream` در Node.js و `renderToReadableStream` در محیط‌های Edge پشتیبانی می‌کند و امکان stream کردن تدریجی HTML را فراهم می‌کند.

**دوبار اجرا شدن effect ها در StrictMode:**

در React 18، StrictMode در محیط توسعه effect ها را به‌صورت mount → unmount → remount اجرا می‌کند تا cleanup های ناقص پیدا شوند.

**React 18 پشتیبانی از IE11 را حذف کرد.**

## 🧠 سوال 60

**شناسه**: react-060  
**عنوان**: `startTransition` چیست و چه تفاوتی با `useTransition` دارد؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Concurrent React

### پاسخ 📄

هر دو `startTransition` و `useTransition` update های state را به‌عنوان transition های غیرفوری علامت‌گذاری می‌کنند، اما در موقعیت‌های متفاوتی استفاده می‌شوند.

**`startTransition`** — یک تابع مستقل است که از React import می‌شود. وقتی فقط می‌خواهید update را کم‌اولویت کنید و نیازی به وضعیت pending ندارید، از آن استفاده می‌کنید:

```jsx
import { startTransition } from 'react';

function handleSearch(query) {
  startTransition(() => {
    setSearchResults(search(query)); // غیرفوری
  });
}
```

**`useTransition`** — یک hook است که علاوه بر `startTransition` یک مقدار `isPending` هم برمی‌گرداند تا بتوانید هنگام transition وضعیت loading نشان دهید:

```jsx
import { useTransition } from 'react';

function SearchBox() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  function handleChange(e) {
    setQuery(e.target.value); // فوری

    startTransition(() => {
      setResults(search(e.target.value)); // غیرفوری
    });
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />} {/* فقط در useTransition در دسترس است */}
      <ResultsList results={results} />
    </>
  );
}
```

**وقتی React transition را مدیریت می‌کند چه می‌شود:**

- update های فوری مثل تایپ یا کلیک بلافاصله رندر می‌شوند
- update های transition با اولویت پایین‌تر رندر می‌شوند و می‌توانند قطع شوند
- اگر کاربر قبل از پایان transition دوباره تایپ کند، React کار نیمه‌تمام را کنار می‌گذارد و از نو با داده جدید شروع می‌کند

وقتی به `isPending` نیاز ندارید از `startTransition` استفاده کنید، و وقتی لازم است وضعیت درحال‌انتظار را نشان دهید از `useTransition` استفاده کنید.

## 🧠 سوال 61

**شناسه**: react-061  
**عنوان**: سیستم رویداد synthetic در React چگونه کار می‌کند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: داخلی‌های React

### پاسخ 📄

React رویدادهای بومی مرورگر را داخل یک شیء `SyntheticEvent` قرار می‌دهد تا تفاوت‌های مرورگرهای مختلف را یکدست کند. همه synthetic event ها فارغ از مرورگر، API یکسانی دارند.

**Event Delegation:**

React روی هر DOM node جداگانه event listener نصب نمی‌کند. در عوض، یک listener واحد روی root container مثل `#root` قرار می‌دهد. وقتی رویداد تا ریشه bubble می‌کند، React تشخیص می‌دهد کدام handler مربوط به کدام کامپوننت باید اجرا شود. به این روش **event delegation** می‌گویند.

در React 16 و قبل‌تر، رویدادها روی `document` delegate می‌شدند. در React 17 این رفتار به root DOM container تغییر کرد و همین باعث شد embed کردن React داخل اپ‌های غیر React ساده‌تر شود.

```jsx
// React یک listener روی #root می‌گذارد، نه روی هر دکمه
function App() {
  return (
    <div>
      <button onClick={() => console.log('clicked')}>Click me</button>
    </div>
  );
}
```

**Event Pooling** — در React 16 و قبل‌تر، حذف شد در React 17:

React 16 برای performance، شیء `SyntheticEvent` را بین event ها reuse می‌کرد. بعد از تمام شدن handler، property های event خالی می‌شدند. اگر می‌خواستید event را بعداً به‌صورت async استفاده کنید، باید `e.persist()` را صدا می‌زدید.

در React 17 event pooling حذف شد، بنابراین `SyntheticEvent` ها دیگر reuse نمی‌شوند و می‌توانید با خیال راحت در `setTimeout` یا `Promise.then` هم به property های event دسترسی داشته باشید.

**متوقف کردن انتشار:**

```jsx
function Parent() {
  return (
    <div onClick={() => console.log('parent')}>
      <button
        onClick={(e) => {
          e.stopPropagation(); // جلوی اجرای handler والد را می‌گیرد
          console.log('child');
        }}
      >
        Click
      </button>
    </div>
  );
}
```

**دسترسی به رویداد بومی:**

```jsx
function handleClick(e) {
  console.log(e.nativeEvent); // شیء Event اصلی مرورگر
}
```

**فاز capture:**

برای مدیریت رویداد در فاز capture از `onClickCapture` به‌جای `onClick` استفاده می‌کنید. capture از بالا به پایین است، در حالی که bubble از پایین به بالا انجام می‌شود.

## 🧠 سوال 62

**شناسه**: react-062  
**عنوان**: `flushSync` چیست و چه زمانی به آن نیاز دارید؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: Concurrent React

### پاسخ 📄

`flushSync` به React مجبور می‌کند همه update های در انتظار را داخل callback داده‌شده **به‌صورت synchronous** اجرا و commit کند و از مسیر عادی async و batched خارج شود.

```jsx
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount((c) => c + 1);
  });
  // اینجا DOM حتماً به‌روزرسانی شده است
  console.log(document.getElementById('counter').textContent);

  flushSync(() => {
    setFlag(true);
  });
  // دوباره DOM به‌روزرسانی شده
}
```

**چرا وجود دارد:**

React 18 تقریباً همه update ها را به‌صورت خودکار batch می‌کند. این رفتار معمولاً بهترین انتخاب است. اما بعضی سناریوها نیاز دارند DOM قبل از ادامه اجرا فوراً به‌روزرسانی شود:

- **اندازه‌گیری DOM** بلافاصله بعد از تغییر state
- **یکپارچه‌سازی با کتابخانه‌های third-party** که بعد از تغییر React باید DOM را بخوانند
- **scroll یا animation دستوری** که به موقعیت جدید DOM وابسته است

**نکات مهم:**

- `flushSync` به performance ضربه می‌زند، چون render و commit را sync می‌کند
- صدا زدن آن داخل render یا lifecycle های نامناسب می‌تواند مشکل‌ساز شود
- باید آخرین راه‌حل باشد؛ در خیلی از موارد `useLayoutEffect` انتخاب بهتری است

```jsx
// جایگزین ترجیحی: useLayoutEffect برای اندازه‌گیری DOM
useLayoutEffect(() => {
  const height = elementRef.current.offsetHeight;
  setContainerHeight(height);
}, [dependency]);
```

## 🧠 سوال 63

**شناسه**: react-063  
**عنوان**: hook `use()` در React 19 چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Concurrent React

### پاسخ 📄

`use()` یک API در React 19 است که اجازه می‌دهد داخل render کامپوننت، مقدار یک منبع مثل **Promise** یا **Context** را بخوانید. برخلاف hook های سنتی، `use()` می‌تواند به‌صورت شرطی هم صدا زده شود.

**خواندن Promise:**

```jsx
import { use, Suspense } from 'react';

function UserProfile({ userPromise }) {
  const user = use(userPromise); // تا resolve شدن Promise کامپوننت suspend می‌شود
  return <h1>{user.name}</h1>;
}

function App() {
  const userPromise = fetchUser(1); // بیرون از کامپوننت ساخته شده
  return (
    <Suspense fallback={<Spinner />}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}
```

اگر Promise هنوز pending باشد، `use()` کامپوننت را suspend می‌کند. اگر Promise reject شود، خطا به نزدیک‌ترین Error Boundary می‌رسد.

**خواندن Context به‌صورت شرطی:**

برخلاف `useContext`، می‌توان `use(Context)` را داخل شرط‌ها و حلقه‌ها هم استفاده کرد:

```jsx
function Component({ show }) {
  if (!show) return null;
  const theme = use(ThemeContext); // معتبر است — به‌صورت شرطی استفاده شده
  return <div style={{ color: theme.color }}>Hello</div>;
}
```

**قواعد مهم:**

- Promise باید **بیرون از render کامپوننت** ساخته شود؛ ساختن Promise جدید در هر render باعث suspend بی‌پایان می‌شود
- `use()` یک hook سنتی نیست و لازم نیست قوانین معمول Hook ها را دقیقاً دنبال کند
- هم در Client Component ها و هم در Server Component ها کار می‌کند

## 🧠 سوال 64

**شناسه**: react-064  
**عنوان**: `useOptimistic` در React 19 چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Concurrent React

### پاسخ 📄

`useOptimistic` اجازه می‌دهد وقتی یک عملیات async در حال انجام است، یک UI خوش‌بینانه و موقت نشان دهید و بعد از تمام شدن عملیات، به‌صورت خودکار به state واقعی برگردید.

```jsx
import { useOptimistic } from 'react';

function MessageList({ messages, sendMessage }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (currentMessages, newText) => [
      ...currentMessages,
      { text: newText, pending: true },
    ],
  );

  async function handleSubmit(formData) {
    const text = formData.get('message');
    addOptimisticMessage(text); // UI بلافاصله آپدیت می‌شود
    await sendMessage(text); // درخواست واقعی به سرور
    // در موفقیت: prop اصلی messages آپدیت می‌شود و جای state خوش‌بینانه را می‌گیرد
  }

  return (
    <form action={handleSubmit}>
      {optimisticMessages.map((msg, i) => (
        <div key={i} style={{ opacity: msg.pending ? 0.5 : 1 }}>
          {msg.text}
        </div>
      ))}
      <input name="message" />
      <button type="submit">Send</button>
    </form>
  );
}
```

**امضا:**

```jsx
const [optimisticState, addOptimistic] = useOptimistic(
  state, // فعلی state
  updateFn, // (وضعیت فعلی، مقدار خوش‌بینانه) => وضعیت خوش‌بینانه جدید
);
```

**رفتار:**

- تا وقتی action async در حال اجراست، `optimisticState` نتیجه `updateFn` را برمی‌گرداند
- وقتی action تمام شود، React state خوش‌بینانه را کنار می‌گذارد و state واقعی جدید را استفاده می‌کند
- چند update خوش‌بینانه می‌توانند در صف قرار بگیرند و پشت سر هم اعمال شوند

## 🧠 سوال 65

**شناسه**: react-065  
**عنوان**: `useActionState` در React 19 چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Concurrent React

### پاسخ 📄

`useActionState` state حاصل از یک form action را مدیریت می‌کند. این hook معمولاً همراه با Server Actions یا تابع‌های async استفاده می‌شود تا نتیجه و وضعیت pending ارسال فرم را دنبال کند. این API قبلاً در کانال canary با نام `useFormState` شناخته می‌شد.

```jsx
import { useActionState } from 'react';

async function submitAction(previousState, formData) {
  const name = formData.get('name');
  if (!name) return { error: 'Name is required' };
  await saveToServer(name);
  return { success: true, name };
}

function Form() {
  const [state, formAction, isPending] = useActionState(submitAction, null);

  return (
    <form action={formAction}>
      <input name="name" />
      {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
      {state?.success && <p>Saved: {state.name}</p>}
      <button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
```

**امضا:**

```jsx
const [state, formAction, isPending] = useActionState(action, initialState);
```

- `action`: تابع async که `(previousState, formData)` را می‌گیرد و می‌تواند Server Action باشد
- `initialState`: مقدار state قبل از اولین submit
- `state`: خروجی آخرین اجرای action
- `formAction`: action بسته‌بندی‌شده برای پاس دادن به `<form action={...}>`
- `isPending`: تا وقتی action در حال اجراست برابر `true` است

**نکات مهم:**

- action، **state قبلی** را به‌عنوان آرگومان اول دریافت می‌کند
- همراه با Server Action به‌صورت progressive enhancement هم کار می‌کند و فرم می‌تواند حتی بدون جاوااسکریپت submit شود
- جایگزین الگوی قدیمی مدیریت دستی loading و error با `useState` و `useEffect` می‌شود

## 🧠 سوال 66

**شناسه**: react-066  
**عنوان**: React Server Actions چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: Server Components

### پاسخ 📄

Server Actions تابع‌های async ای هستند که **روی سرور** اجرا می‌شوند اما می‌توان آن‌ها را مستقیماً از event handler های سمت کلاینت یا action فرم صدا زد. این قابلیت در React 19 پایدار شده و بیشتر در framework هایی مثل Next.js App Router دیده می‌شود.

**تعریف یک Server Action:**

```js
// actions.js — 'use server' یعنی این ماژول فقط روی سرور اجرا می‌شود
'use server';

export async function saveUser(formData) {
  const name = formData.get('name');
  await db.users.create({ name }); // دسترسی مستقیم به دیتابیس
  revalidatePath('/users');
}
```

**استفاده در Server Component** همراه با progressive enhancement:

```jsx
import { saveUser } from './actions';

export default function UserForm() {
  return (
    <form action={saveUser}>
      <input name="name" placeholder="Enter name" />
      <button type="submit">Save</button>
    </form>
  );
}
```

**استفاده از Client Component:**

```jsx
'use client';
import { saveUser } from './actions';
import { useActionState } from 'react';

function UserForm() {
  const [state, action, isPending] = useActionState(saveUser, null);
  return (
    <form action={action}>
      <input name="name" />
      <button disabled={isPending}>Save</button>
    </form>
  );
}
```

**پشت صحنه چه می‌شود:**

- framework، Server Action را به handler های HTTP POST کامپایل می‌کند
- صدا زدن آن از کلاینت باعث ارسال POST request به سرور می‌شود
- پاسخ برای به‌روزرسانی state UI استفاده می‌شود، مثلا با `useActionState` یا `useOptimistic`
- بدون جاوااسکریپت هم کار می‌کنند، چون مرورگر می‌تواند فرم را به‌صورت native submit کند

**امنیت:**

- Server Action ها در محیط قابل اعتماد سرور اجرا می‌شوند و می‌توانند به دیتابیس یا secret ها دسترسی داشته باشند
- با این حال ورودی‌های کلاینت همچنان باید validate و sanitize شوند، چون کاربر می‌تواند هر `FormData` دلخواهی ارسال کند

## 🧠 سوال 67

**شناسه**: react-067  
**عنوان**: `useFormStatus` در React 19 چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Concurrent React

### پاسخ 📄

`useFormStatus` وضعیت submit شدن **فرم والد** را می‌خواند. این hook اجازه می‌دهد کامپوننت‌های عمیق‌تر مثل دکمه submit بدون prop drilling بفهمند که فرم در حال submit شدن است یا نه.

```jsx
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save'}
    </button>
  );
}

function Form() {
  return (
    <form action={serverAction}>
      <input name="name" />
      <SubmitButton /> {/* وضعیت فرم والد را می‌خواند */}
    </form>
  );
}
```

**خروجی `useFormStatus`:**

```ts
{
  pending: boolean;
  data: FormData | null;
  method: string | null;
  action: string | Function | null;
}
```

**محدودیت مهم:**

`useFormStatus` باید **داخل یک child component فرم** استفاده شود. اگر در همان کامپوننتی استفاده شود که خود `<form>` را render می‌کند، کار نخواهد کرد.

```jsx
// غلط — useFormStatus در همان کامپوننت فرم است
function Form() {
  const { pending } = useFormStatus(); // همیشه pending: false
  return <form action={action}>...</form>;
}

// درست — داخل یک child component
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>Submit</button>;
}
```

## 🧠 سوال 68

**شناسه**: react-068  
**عنوان**: بهبودهای ref در React 19 چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: مبانی React

### پاسخ 📄

React 19 دو بهبود مهم برای ref ها معرفی کرد:

**1. ref به‌عنوان prop — بدون نیاز همیشگی به `forwardRef`:**

در React 18 و قبل‌تر، برای پاس دادن ref به یک کامپوننت سفارشی، معمولاً باید آن را داخل `React.forwardRef()` می‌پیچید:

```jsx
// React 18 — نیاز به wrapper
const Input = React.forwardRef((props, ref) => <input ref={ref} {...props} />);

<Input ref={inputRef} />;
```

در React 19، در function component ها می‌توان `ref` را مثل یک prop معمولی دریافت کرد:

```jsx
// React 19 — ساده‌تر
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

<Input ref={inputRef} />;
```

**2. cleanup function برای ref callback:**

در React 19، callback ref می‌تواند یک cleanup function برگرداند، شبیه `useEffect`. React این cleanup را هنگام unmount یا تغییر ref اجرا می‌کند:

```jsx
function Component() {
  return (
    <div
      ref={(node) => {
        if (!node) return;

        const observer = new ResizeObserver(handleResize);
        observer.observe(node);

        // cleanup: هنگام unmount یا تغییر ref اجرا می‌شود
        return () => observer.disconnect();
      }}
    />
  );
}
```

قبلاً معمولاً مجبور بودید داخل callback ref بررسی کنید که آیا `node` برابر `null` شده یا نه. الگوی cleanup function صریح‌تر و تمیزتر است.

## 🧠 سوال 69

**شناسه**: react-069  
**عنوان**: `Suspense` برای data fetching چگونه کار می‌کند و چگونه با framework ها یکپارچه می‌شود؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: Concurrent React

### پاسخ 📄

`Suspense` برای data fetching به این شکل کار می‌کند که کامپوننت‌ها وقتی داده هنوز آماده نیست، یک **Promise را throw می‌کنند**. React آن Promise را می‌گیرد، fallback UI را رندر می‌کند، و وقتی Promise resolve شد کامپوننت را دوباره رندر می‌کند.

**مکانیزم پایه‌ای که کتابخانه‌ها پیاده‌سازی می‌کنند:**

```jsx
// نسخه ساده‌شده از کاری که کتابخانه‌هایی مثل TanStack Query انجام می‌دهند
const cache = {};

function fetchUser(id) {
  if (cache[id]?.status === 'success') return cache[id].data;
  if (cache[id]?.status === 'pending') throw cache[id].promise;
  if (cache[id]?.status === 'error') throw cache[id].error;

  const promise = fetch(`/api/users/${id}`)
    .then((r) => r.json())
    .then((data) => {
      cache[id] = { status: 'success', data };
    });

  cache[id] = { status: 'pending', promise };
  throw promise;
}

function UserProfile({ id }) {
  const user = fetchUser(id); // اگر آماده نباشد suspend می‌شود
  return <h1>{user.name}</h1>;
}
```

**یکپارچه‌سازی با framework ها:**

- **Next.js App Router**: Server Component ها از `async/await` به‌صورت بومی پشتیبانی می‌کنند و `await` داخل آن‌ها به‌طور طبیعی با Suspense یکپارچه می‌شود
- **TanStack Query**: هوک `useSuspenseQuery` هنگام loading throw می‌کند و با Suspense کار می‌کند

```jsx
import { useSuspenseQuery } from '@tanstack/react-query';

function UserProfile({ id }) {
  const { data } = useSuspenseQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
  });
  return <h1>{data.name}</h1>;
}

// کاربرد — مرزها، بارگذاری و وضعیت خطا را مدیریت می‌کنند
<Suspense fallback={<Spinner />}>
  <ErrorBoundary fallback={<ErrorUI />}>
    <UserProfile id={1} />
  </ErrorBoundary>
</Suspense>;
```

**مزیت‌ها:**

- کامپوننت فقط حالت موفقیت را توصیف می‌کند و loading/error در سطح boundary مدیریت می‌شوند
- چند کامپوننت suspend شده داخل یک Suspense مشترک، با هم مدیریت می‌شوند
- React می‌تواند در Concurrent React رندر suspend شده را متوقف و دوباره امتحان کند

## 🧠 سوال 70

**شناسه**: react-070  
**عنوان**: مدیریت خطا همراه با Suspense و Error Boundary چگونه کار می‌کند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: داخلی‌های React

### پاسخ 📄

`Suspense` و `ErrorBoundary` معمولاً به‌صورت یک جفت کار می‌کنند: Suspense وضعیت **loading** را مدیریت می‌کند و Error Boundary وضعیت **error** را.

```jsx
<ErrorBoundary fallback={<ErrorUI />}>
  <Suspense fallback={<Spinner />}>
    <DataComponent /> {/* ممکن است suspend کند یا خطا throw کند */}
  </Suspense>
</ErrorBoundary>
```

**انتشار خطاها چگونه رخ می‌دهد:**

1. `DataComponent` یک Promise throw می‌کند → Suspense آن را می‌گیرد → `<Spinner />` نمایش داده می‌شود
2. اگر Promise reject شود یا خود کامپوننت یک `Error` throw کند → Error Boundary آن را می‌گیرد → `<ErrorUI />` نمایش داده می‌شود
3. اگر همه چیز موفق باشد → Suspense fallback را حذف می‌کند و `DataComponent` با داده واقعی رندر می‌شود

**پیاده‌سازی Error Boundary** که باید class component باشد:

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    logError(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return typeof this.props.fallback === 'function'
        ? this.props.fallback(this.state.error)
        : this.props.fallback;
    }
    return this.props.children;
  }
}
```

**ریست کردن Error Boundary:**

```jsx
// کتابخانه react-error-boundary (پیشنهادشده)
import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary
  fallbackRender={({ error, resetErrorBoundary }) => (
    <div>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )}
  onReset={() => refetch()}
>
  <DataComponent />
</ErrorBoundary>;
```

**خطاها در `useEffect` و event handler ها:**

Error Boundary فقط خطاهایی را می‌گیرد که **در زمان render** throw شوند. خطاهای `useEffect` یا event handler ها باید دستی مدیریت شوند و اگر لازم بود به چرخه render برگردانده شوند:

```jsx
function Component() {
  const [error, setError] = useState(null);
  if (error) throw error; // دوباره داخل render throw می‌شود تا Error Boundary آن را بگیرد

  useEffect(() => {
    fetchData().catch(setError);
  }, []);
}
```

## 🧠 سوال 71

**شناسه**: react-071  
**عنوان**: `React.cache()` در React 19 چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: Server Components

### پاسخ 📄

`React.cache()` نتیجه فراخوانی یک تابع را **به‌ازای هر درخواست سرور** memoize می‌کند. این API برای React Server Components طراحی شده تا عملیات گران مثل query به دیتابیس را در یک render pass واحد deduplicate کند.

```jsx
import { cache } from 'react';

// هر دو کامپوننت getUser(id) را صدا می‌زنند، اما در هر request فقط یک query اجرا می‌شود
export const getUser = cache(async (id) => {
  return await db.users.findById(id);
});

async function UserProfile({ id }) {
  const user = await getUser(id);
  return <h2>{user.name}</h2>;
}

async function UserAvatar({ id }) {
  const user = await getUser(id); // cache hit — query دوم اجرا نمی‌شود
  return <img src={user.avatarUrl} />;
}
```

**مقایسه با `useMemo`:**

|                | `React.cache()`          | `useMemo`                    |
| -------------- | ------------------------ | ---------------------------- |
| محل استفاده    | Server Components        | Client Components            |
| محدوده cache   | هر request سرور          | هر instance کامپوننت         |
| کلید cache     | آرگومان‌های تابع         | dependency array             |
| پشتیبانی async | بله                      | نه                           |
| ماندگاری       | در هر request پاک می‌شود | تا عمر کامپوننت باقی می‌ماند |

**ویژگی‌های مهم:**

- cache فقط در محدوده یک request سرور معتبر است، بنابراین داده بین کاربران نشت نمی‌کند
- با تابع‌های async کار می‌کند، برخلاف `useMemo`
- باید در سطح ماژول فراخوانی شود، نه داخل خود کامپوننت
- روی کلاینت در دسترس نیست؛ برای caching سمت کلاینت از `useMemo` یا کتابخانه‌هایی مثل TanStack Query استفاده کنید

## 🧠 سوال 72

**شناسه**: react-072  
**عنوان**: lazy initialization در `useState` چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Hooks

### پاسخ 📄

`useState` می‌تواند یا یک مقدار مستقیم بگیرد یا یک **initializer function**. وقتی یک تابع به آن می‌دهید، React فقط **یک‌بار** در mount اولیه آن تابع را اجرا می‌کند تا state اولیه را بسازد. به این الگو lazy initialization می‌گویند.

```jsx
// غیر lazy: expensiveComputation() در هر render اجرا می‌شود
const [state, setState] = useState(expensiveComputation());

// lazy: expensiveComputation() فقط یک‌بار در mount اجرا می‌شود
const [state, setState] = useState(() => expensiveComputation());
```

**چه زمانی مفید است:**

- وقتی از `localStorage` یا `sessionStorage` مقدار اولیه می‌خوانید
- وقتی ساختن state اولیه محاسبه گران دارد
- وقتی پارامترهای URL یا داده serialize شده را parse می‌کنید

```jsx
function Component() {
  const [filters, setFilters] = useState(() => {
    // فقط یک‌بار اجرا می‌شود
    const saved = localStorage.getItem('filters');
    return saved ? JSON.parse(saved) : defaultFilters;
  });
}
```

**چرا مهم است:**

React بعد از اولین render مقدار اولیه state را نادیده می‌گیرد. اما اگر از فرم تابعی استفاده نکنید، آن expression همچنان در هر render **محاسبه می‌شود** و فقط نتیجه‌اش دور ریخته می‌شود. برای کارهای سنگین این اتلاف می‌تواند محسوس باشد.

```jsx
// در هر render JSON را parse می‌کند، حتی اگر بعد از mount دیگر لازم نباشد
const [data, setData] = useState(JSON.parse(heavyJsonString));

// فقط یک‌بار parse می‌کند
const [data, setData] = useState(() => JSON.parse(heavyJsonString));
```

همین الگو برای `useReducer` هم وجود دارد:

```jsx
const [state, dispatch] = useReducer(reducer, arg, initFn);
// initFn(arg) فقط یک‌بار برای ساخت state اولیه اجرا می‌شود
```

## 🧠 سوال 73

**شناسه**: react-073  
**عنوان**: چگونه از memory leak در کامپوننت‌های React جلوگیری می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Effects و چرخه حیات

### پاسخ 📄

Memory leak در React معمولاً وقتی رخ می‌دهد که یک کامپوننت بعد از unmount شدن هنوز تلاش کند state را تغییر دهد یا subscription ها و منابع باز را آزاد نکند. راه‌حل اصلی در همه این موارد، cleanup درست داخل `useEffect` است.

**1. عملیات fetch async:**

```jsx
// مشکل‌دار — ممکن است setState بعد از unmount اجرا شود
useEffect(() => {
  fetch('/api/data')
    .then((r) => r.json())
    .then((data) => setData(data));
}, []);

// درست — AbortController درخواست در حال اجرا را لغو می‌کند
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/data', { signal: controller.signal })
    .then((r) => r.json())
    .then((data) => setData(data))
    .catch((err) => {
      if (err.name === 'AbortError') return;
    });

  return () => controller.abort();
}, []);
```

**2. event listener ها:**

```jsx
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

**3. interval و timeout:**

```jsx
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);
```

**4. subscription ها مثل WebSocket یا store:**

```jsx
useEffect(() => {
  const subscription = eventBus.subscribe(topic, handleMessage);
  return () => subscription.unsubscribe();
}, [topic]);
```

**قاعده کلی:** هر `useEffect` که چیزی پایدار راه‌اندازی می‌کند، مثل request، event listener، timer یا subscription، باید cleanup متناظر برای جمع کردن آن برگرداند.

React 18 در StrictMode عمداً effect ها را در development به شکل mount → unmount → remount اجرا می‌کند تا cleanup های ناقص زودتر پیدا شوند.

## 🧠 سوال 74

**شناسه**: react-074  
**عنوان**: `React.Children` چیست و چه زمانی از آن استفاده می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

`React.Children` مجموعه‌ای از utility ها برای کار ایمن با prop `children` است. چون `children` می‌تواند یک عنصر، آرایه، `null`، `undefined`، رشته یا عدد باشد، این ابزارها شکل‌های مختلف آن را یکدست مدیریت می‌کنند.

```jsx
function List({ children }) {
  const count = React.Children.count(children);

  return (
    <div>
      <p>{count} items</p>
      <ul>
        {React.Children.map(children, (child, index) => (
          <li key={index}>{child}</li>
        ))}
      </ul>
    </div>
  );
}
```

**متدهای موجود:**

- `React.Children.map(children, fn)` — شبیه `Array.map`
- `React.Children.forEach(children, fn)` — شبیه `Array.forEach`
- `React.Children.count(children)` — تعداد child ها
- `React.Children.only(children)` — بررسی می‌کند دقیقاً یک child وجود داشته باشد
- `React.Children.toArray(children)` — `children` را به آرایه تخت با key های پایدار تبدیل می‌کند

**چه زمانی استفاده می‌شود:**

- وقتی layout component ای می‌سازید که باید روی child ها loop بزند یا آن‌ها را بشمارد
- وقتی می‌خواهید دور هر child یک wrapper بگذارید
- وقتی می‌خواهید child های خاصی را بر اساس type فیلتر یا انتخاب کنید

**جایگزین مدرن:**

تیم React معمولاً توصیه می‌کند به‌جای تکیه زیاد بر `React.Children`، از render prop یا آرایه‌ای از object ها استفاده کنید، چون:

- وقتی child ها داخل `Fragment` باشند، بعضی الگوها پیچیده می‌شوند
- با کامپوننت‌هایی که خودشان آرایه برمی‌گردانند همیشه خوب compose نمی‌شود
- `React.cloneElement` که معمولاً کنار `React.Children` استفاده می‌شود، یک escape hatch محسوب می‌شود

```jsx
// الگوی ترجیحی مدرن — slot های صریح با props
function Tabs({ tabs }) {
  return tabs.map((tab) => <TabPanel key={tab.id} {...tab} />);
}
```

## 🧠 سوال 75

**شناسه**: react-075  
**عنوان**: `displayName` در React چیست و چرا مهم است؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: مبانی React

### پاسخ 📄

`displayName` یک property رشته‌ای است که روی کامپوننت تنظیم می‌کنید تا مشخص کند آن کامپوننت در React DevTools، پیام‌های خطا و stack trace ها با چه نامی نمایش داده شود.

**چرا لازم می‌شود:**

در build های production نام توابع ممکن است minify شوند. حتی در development هم arrow function های anonymous اسم خوبی در DevTools ندارند. `displayName` یک برچسب پایدار و خوانا فراهم می‌کند.

**تنظیم روی HOC:**

```jsx
function withAuth(Component) {
  function WithAuth(props) {
    const user = useAuth();
    if (!user) return <Redirect to="/login" />;
    return <Component {...props} />;
  }

  // DevTools چیزی مثل withAuth(Button) را نشان می‌دهد
  WithAuth.displayName = `withAuth(${Component.displayName ?? Component.name})`;
  return WithAuth;
}
```

**تنظیم روی Context:**

```jsx
const ThemeContext = React.createContext(null);
ThemeContext.displayName = 'ThemeContext';
```

**تابع named در برابر anonymous:**

```jsx
// anonymous — ممکن است DevTools نام خوبی نشان ندهد
const MyList = memo(({ items }) => <ul>{...}</ul>);

// named — خروجی DevTools خواناتر است
const MyList = memo(function MyList({ items }) {
  return <ul>{...}</ul>;
});
```

**چه چیزهایی آن را خودکار تنظیم می‌کنند:**

کتابخانه‌هایی مثل `styled-components`، `Apollo Client` و `react-query` معمولاً روی کامپوننت‌های تولیدی خود `displayName` می‌گذارند تا خروجی DevTools خواناتر باشد.

## 🧠 سوال 76

**شناسه**: react-076  
**عنوان**: چگونه کامپوننت‌های React را با React Testing Library تست می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: مبانی React

### پاسخ 📄

React Testing Library یا RTL روش استاندارد تست کامپوننت‌های React است. فلسفه اصلی آن این است: **رفتار را از دید کاربر تست کن، نه جزئیات پیاده‌سازی را**.

**تست ساده:**

```jsx
// Component
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}

// Test
import { render, screen, fireEvent } from '@testing-library/react';

test('counter increments when button is clicked', () => {
  render(<Counter />);

  expect(screen.getByText('Count: 0')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Increment' }));

  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

**اولویت query ها طبق پیشنهاد RTL:**

1. `getByRole` — بهترین و نزدیک‌ترین به تجربه کاربر و screen reader
2. `getByLabelText` — برای input هایی که label دارند
3. `getByPlaceholderText` — گزینه دوم برای input ها
4. `getByText` — برای محتوای غیرتعاملی
5. `getByTestId` — آخرین راه‌حل

**تست async:**

```jsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('shows user data after loading', async () => {
  render(<UserProfile id={1} />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

**چه چیزهایی را نباید تست کنید:**

- state داخلی کامپوننت
- فراخوانی method های داخلی
- جزئیات پیاده‌سازی‌ای که از دید کاربر اثری ندارند

## 🧠 سوال 77

**شناسه**: react-077  
**عنوان**: چگونه custom hook ها را در React تست می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Hooks

### پاسخ 📄

Custom hook ها را نمی‌توان خارج از کامپوننت React صدا زد. utility ای به نام `renderHook` از `@testing-library/react` یک wrapper حداقلی فراهم می‌کند تا hook را به‌صورت جداگانه تست کنید.

```jsx
// Hook مورد تست
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = useCallback(() => setCount((c) => c + 1), []);
  const decrement = useCallback(() => setCount((c) => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  return { count, increment, decrement, reset };
}

// Tests
import { renderHook, act } from '@testing-library/react';

test('initializes with default value', () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toBe(0);
});

test('increments count', () => {
  const { result } = renderHook(() => useCounter(5));

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(6);
});
```

**تست با prop های متفاوت و `rerender`:**

```jsx
test('resets to new initial value on rerender', () => {
  const { result, rerender } = renderHook(
    ({ initial }) => useCounter(initial),
    { initialProps: { initial: 0 } },
  );

  expect(result.current.count).toBe(0);

  rerender({ initial: 100 });
  // توجه: count ریست نمی‌شود — initialValue فقط در mount اول اعمال می‌شود
});
```

**تست hook هایی که به context نیاز دارند:**

```jsx
test('hook using ThemeContext', () => {
  const wrapper = ({ children }) => (
    <ThemeContext.Provider value={{ color: 'blue' }}>
      {children}
    </ThemeContext.Provider>
  );

  const { result } = renderHook(() => useTheme(), { wrapper });
  expect(result.current.color).toBe('blue');
});
```

همیشه فراخوانی‌هایی که state را تغییر می‌دهند داخل `act()` قرار دهید تا queue آپدیت React قبل از assertion خالی شود.

## 🧠 سوال 78

**شناسه**: react-078  
**عنوان**: `act()` در تست React چیست و چرا لازم است؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: داخلی‌های React

### پاسخ 📄

`act()` یک utility برای تست است که مطمئن می‌شود همه update های state، effect ها و re-render هایی که توسط یک قطعه کد ایجاد شده‌اند، **قبل از assertion کاملاً پردازش شده باشند**.

**چرا لازم است:**

React update های state را batch می‌کند و effect ها را async پردازش می‌کند. بدون `act()` ممکن است روی UI قدیمی assertion بزنید، چون هنوز re-render کامل نشده است.

```jsx
// بدون act() — ممکن است assertion روی UI قدیمی انجام شود
test('broken test', () => {
  render(<Counter />);
  screen.getByRole('button').click();
  // React هنوز رندر مجدد نشده است
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});

// با act() — React قبل از assertion همه update ها را flush می‌کند
test('correct test', () => {
  render(<Counter />);

  act(() => {
    screen.getByRole('button').click();
  });

  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

**React Testing Library معمولاً `act()` را خودش انجام می‌دهد:**

در RTL، ابزارهایی مثل `render`، `fireEvent`، `userEvent` و `waitFor` معمولاً عملیات را داخل `act()` انجام می‌دهند. بنابراین در بیشتر تست‌ها لازم نیست `act()` را دستی صدا بزنید.

**`act()` async:**

```jsx
test('loads data', async () => {
  render(<DataComponent />);

  await act(async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Load' }));
  });

  expect(screen.getByText('Loaded Data')).toBeInTheDocument();
});
```

**هشدارهای `act()`:**

اگر اخطاری شبیه `not wrapped in act(...)` دیدید، یعنی یک update state بیرون از `act()` رخ داده است، معمولاً از یک عملیات async که بعد از پایان تست resolve شده. راه‌حل این است که همه عملیات async را await کنید یا از `waitFor` استفاده کنید.

## 🧠 سوال 79

**شناسه**: react-079  
**عنوان**: چرا `useContext` باعث re-render های غیرضروری می‌شود و چگونه آن را حل می‌کنید؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

`useContext` یک کامپوننت را به **کل مقدار context** subscribe می‌کند. هر زمان هر بخشی از آن مقدار تغییر کند، همه مصرف‌کننده‌های آن context دوباره رندر می‌شوند، حتی اگر فقط از یک فیلد کوچک استفاده کنند.

```jsx
const AppContext = createContext({
  user: null,
  theme: 'light',
  language: 'en',
});

// این کامپوننت با هر تغییر AppContext دوباره رندر می‌شود
function Avatar() {
  const { user } = useContext(AppContext);
  return <img src={user.avatar} />;
}
```

**راه‌حل‌ها:**

**1. تقسیم context ها بر اساس حوزه و نرخ تغییر:**

```jsx
const UserContext = createContext(null);
const ThemeContext = createContext('light');

// آواتار فقط زمانی که UserContext تغییر کند، دوباره رندر می‌شود
function Avatar() {
  const user = useContext(UserContext);
  return <img src={user.avatar} />;
}
```

**2. memoize کردن مقدار context:**

```jsx
function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  // بدون useMemo: ارجاع شیء جدید در هر رندر، همه مصرف‌کنندگان را فعال می‌کند
  const value = useMemo(
    () => ({ user, theme, setUser, setTheme }),
    [user, theme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
```

**3. استفاده از `React.memo` برای بخش مصرف‌کننده واقعی:**

```jsx
const Avatar = React.memo(function Avatar({ user }) {
  return <img src={user.avatar} />; // Avatar فقط در صورت تغییر مرجع کاربر دوباره رندر می‌شود
});

function AvatarConnected() {
  const { user } = useContext(AppContext);
  return <Avatar user={user} />;
}
```

**4. context selector ها** با کتابخانه `use-context-selector`:

```jsx
import { createContext, useContextSelector } from 'use-context-selector';

function Avatar() {
  const user = useContextSelector(AppContext, (ctx) => ctx.user);
  // فقط زمانی که ctx.user تغییر کند، دوباره رندر می‌شود
  return <img src={user.avatar} />;
}
```

**وضعیت فعلی React:**

React هنوز API داخلی برای context selector ندارد. راه پیشنهادی فعلی معمولاً split کردن context ها بر اساس domain است. درباره selector API صحبت‌هایی شده، اما هنوز به‌صورت رسمی منتشر نشده است.

## 🧠 سوال 80

**شناسه**: react-080  
**عنوان**: ترفند prop `key` برای reset کردن state کامپوننت چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: رفتار رندرینگ

### پاسخ 📄

تغییر prop `key` یک کامپوننت باعث می‌شود React **instance قبلی را unmount و یک instance کاملاً جدید mount کند** و در نتیجه همه state های داخلی آن reset شوند. این رفتار عمدی است و گاهی ساده‌ترین راه‌حل برای مسائل همگام‌سازی state است.

```jsx
function ParentForm({ userId }) {
  return (
    // وقتی userId تغییر می‌کند، React فرم قدیمی را از بین می‌برد و فرم جدیدی ایجاد می‌کند
    // همه useState های داخل فرم به طور خودکار به مقادیر اولیه بازنشانی می‌شوند
    <Form key={userId} userId={userId} />
  );
}
```

**چه مشکلی را حل می‌کند:**

وقتی همان type از کامپوننت با داده جدید رندر می‌شود، React همان instance موجود را reuse می‌کند و فقط prop ها را update می‌کند. state ای که با `useState` مقداردهی اولیه شده، خودبه‌خود reset نمی‌شود مگر اینکه خودتان آن را مدیریت کنید.

```jsx
// مشکل: با عوض شدن userId، draft فرم reset نمی‌شود
function UserForm({ userId }) {
  const [name, setName] = useState('');
}

// راه‌حل 1: استفاده از key
<UserForm key={userId} userId={userId} />;

// راه‌حل 2: reset کردن با useEffect
useEffect(() => {
  setName('');
  setEmail('');
  // ... reset کردن بقیه state ها
}, [userId]);
```

**مثال‌های کاربردی:**

```jsx
// reset کردن تایمر با تغییر تمرین
<Timer key={currentExercise.id} duration={currentExercise.duration} />

// reset کردن editor با تغییر سند
<Editor key={documentId} initialContent={document.content} />

// اجرای دوباره animation
<AnimatedBanner key={animationTrigger} message={message} />
```

**نکته مهم:** کامپوننتی که key آن را عوض می‌کنید باید بتواند state خود را از prop ها یا initializer های اولیه دوباره بسازد، چون همه state های داخلی آن در mount جدید از اول مقداردهی می‌شوند.

## 🧠 سوال 81

**شناسه**: react-081  
**عنوان**: الگوی headless component چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

Headless component الگویی است که **منطق و state** را از **UI و markup** جدا می‌کند. این نوع کامپوننت رفتار لازم مثل accessibility، تعامل با کیبورد و مدیریت state را فراهم می‌کند، اما خودش UI مشخصی رندر نمی‌کند و مصرف‌کننده markup را تعیین می‌کند.

```jsx
// hook هدلس برای toggle — فقط منطق، بدون UI
function useToggle(initialState = false) {
  const [on, setOn] = useState(initialState);
  const toggle = useCallback(() => setOn((v) => !v), []);
  const setToggle = useCallback((v) => setOn(Boolean(v)), []);
  return { on, toggle, setToggle };
}

// مصرف‌کننده 1 — رابط کاربری checkbox
function FeatureFlag({ label }) {
  const { on, toggle } = useToggle();
  return (
    <label>
      <input type="checkbox" checked={on} onChange={toggle} />
      {label}
    </label>
  );
}

// مصرف‌کننده 2 — رابط کاربری switch
function DarkModeSwitch() {
  const { on, toggle } = useToggle();
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={toggle}
      className={on ? 'switch-on' : 'switch-off'}
    >
      {on ? 'Dark' : 'Light'}
    </button>
  );
}
```

**نمونه‌های معروف در دنیای واقعی:**

- **Radix UI** — primitive های بدون استایل و دسترس‌پذیر
- **react-aria** — hook هایی مثل `useButton` و `useCheckbox`
- **Downshift** — برای autocomplete و combobox
- **TanStack Table** — جدول هدلس با sorting، filtering و pagination

**چرا مهم است:**

- یک منطق واحد می‌تواند چند UI متفاوت را پشتیبانی کند
- منطق جدا از markup تست می‌شود
- design system ها می‌توانند روی این primitive ها سوار شوند بدون درگیری با استایل‌های تحمیلی

## 🧠 سوال 82

**شناسه**: react-082  
**عنوان**: الگوی Provider در React چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

الگوی Provider از Context React برای تزریق dependency، تنظیمات یا state مشترک به یک subtree استفاده می‌کند، بدون نیاز به prop drilling. این در عمل شکل React از dependency injection است.

```jsx
// تعریف context و hook محافظ
const ConfigContext = createContext(null);

export function ConfigProvider({ config, children }) {
  const value = useMemo(() => config, [config]);
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}

export function useConfig() {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig must be used inside <ConfigProvider>');
  return ctx;
}

// Root — یک‌بار wrap می‌کنیم
function App() {
  return (
    <ConfigProvider config={{ apiUrl: 'https://api.example.com', env: 'prod' }}>
      <Router />
    </ConfigProvider>
  );
}

// هر کامپوننت nested — بدون prop drilling
function UserService() {
  const { apiUrl } = useConfig();
  // ...
}
```

**ترکیب چند Provider:**

```jsx
function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
```

**بهترین روش‌ها:**

- همیشه یک custom hook صادر کنید، نه خود Context خام
- مقدار provider را memoize کنید تا مصرف‌کننده‌ها بی‌دلیل re-render نشوند
- provider ها را بر اساس domain جدا کنید، مثل Auth، Theme یا Config

## 🧠 سوال 83

**شناسه**: react-083  
**عنوان**: کامپوننت‌های Presentational و Container چیستند؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

الگوی Presentational/Container که در سال 2015 معروف شد، کامپوننت‌ها را به دو دسته تقسیم می‌کند:

|              | Presentational | Container                  |
| ------------ | -------------- | -------------------------- |
| تمرکز        | ظاهر UI        | منطق و رفتار               |
| منبع داده    | فقط props      | state، context یا store    |
| side effect  | ندارد          | fetch، subscription و غیره |
| قابلیت reuse | بالا           | کمتر                       |

```jsx
// Presentational — فقط UI
function UserCard({ name, avatar, onFollow }) {
  return (
    <div className="card">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <button onClick={onFollow}>Follow</button>
    </div>
  );
}

// Container — منطق و fetch داده
function UserCardContainer({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  const handleFollow = () => followUser(userId);

  if (!user) return <Skeleton />;
  return (
    <UserCard name={user.name} avatar={user.avatar} onFollow={handleFollow} />
  );
}
```

**نگاه مدرن:**

بعدها خود Dan Abramov هم گفت این الگو را دیگر به‌عنوان یک قانون سخت توصیه نمی‌کند. امروز custom hook ها همان جداسازی منطق و UI را تمیزتر انجام می‌دهند، بدون اینکه حتماً به دو فایل کامپوننت جدا نیاز باشد.

```jsx
// رویکرد مدرن — hook منطق container را جدا می‌کند
function useUser(userId) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  return user;
}

function UserCard({ userId }) {
  const user = useUser(userId);
  if (!user) return <Skeleton />;
  return <div>{user.name}</div>;
}
```

نکته اصلی این الگو، یعنی جدا کردن concern ها، هنوز درست است؛ فقط ابزار پیاده‌سازی آن از container component به hook ها تغییر کرده است.

## 🧠 سوال 84

**شناسه**: react-084  
**عنوان**: ساختار پوشه‌بندی feature-based در React چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

ساختار feature-based یا domain-based کد را **بر اساس feature** سازمان‌دهی می‌کند، نه بر اساس نوع فایل. این روش در پروژه‌های بزرگ بسیار بهتر از ساختار type-based مقیاس پیدا می‌کند.

**ساختار بر اساس نوع فایل — معمولاً ضعیف‌تر برای مقیاس:**

```text
src/
  components/
  hooks/
  utils/
  services/
  types/
```

**ساختار feature-based — مناسب‌تر برای رشد پروژه:**

```text
src/
  features/
    auth/
      components/
      hooks/
      api/
      types.ts
      index.ts
    products/
      components/
      hooks/
      api/
      types.ts
      index.ts
    orders/
      ...
  shared/
    components/
    hooks/
    utils/
    types/
  app/
    App.tsx
    router.tsx
    store.ts
```

**نقش `index.ts` به‌عنوان public API:**

هر feature فقط چیزهایی را export می‌کند که بقیه feature ها باید ببینند:

```ts
// features/auth/index.ts
export { AuthProvider, AuthGuard } from './components';
export { useAuth } from './hooks/useAuth';
export type { User, AuthState } from './types';
// جزئیات پیاده‌سازی داخلی صادر نمی‌شوند
```

**مزیت‌ها نسبت به ساختار type-based:**

- همه کدهای مربوط به یک feature کنار هم هستند و پیدا کردنشان راحت‌تر است
- حذف یا استخراج یک feature ساده‌تر می‌شود
- برای تیم‌های بزرگ بهتر است، چون مالکیت بر اساس feature تعریف می‌شود نه نوع فایل

## 🧠 سوال 85

**شناسه**: react-085  
**عنوان**: barrel file چیست و trade-off های آن چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

Barrel file معمولاً یک `index.ts` یا `index.js` است که export های چند ماژول را یکجا دوباره export می‌کند و یک نقطه ورود واحد برای یک پوشه می‌سازد.

```ts
// components/index.ts — barrel file
export { Button } from './Button';
export { Input } from './Input';
export { Modal } from './Modal';

// مصرف‌کننده — import تمیزتر
import { Button, Modal } from '@/components';
// vs without barrel:
import { Button } from '@/components/Button/Button';
```

**مزیت‌ها:**

- مسیر import ها برای مصرف‌کننده کوتاه‌تر و تمیزتر می‌شود
- public API ماژول را کنترل می‌کنید
- refactor کردن داخلی ساده‌تر می‌شود، چون import مصرف‌کننده‌ها تغییر نمی‌کند

**محدودیت‌ها و مشکلات (Trade-offs and pitfalls):**

**۱. مشکل Tree shaking:**
اگر فایل بشکه‌ای (barrel) دارای `side effects` در نظر گرفته شود، `bundler`ها ممکن است کل بشکه را `import` کنند حتی اگر شما فقط از یکی از `export`های آن استفاده کنید.

**راه حل:** مقدار `"sideEffects": false` را در `package.json` قرار دهید، یا برای `production bundles` از `direct path imports` استفاده کنید.

**۲. استارت آهسته سرور در حالت توسعه (مخصوص Vite/ESBuild):**
زنجیره‌های عمیق بشکه‌ای (`deep barrel chains`) باعث می‌شوند `bundler` مجبور شود تعداد زیادی فایل را هنگام استارت پردازش کند. `Vite` به طور خاص در مورد این الگو هشدار می‌دهد.

**۳. خطر وابستگی حلقوی (Circular dependency):**
اگر `ModuleA` درون بشکه‌ای قرار داشته باشد که همان `ModuleA` نیز از آن `import` می‌کند، با خطاهای `circular dependency` مواجه خواهید شد.

**روش بهترین (Best practice):** از فایل‌های بشکه‌ای در سطح `feature` استفاده کنید (هر `feature` یک بشکه) به جای اینکه زنجیره‌های عمیق بشکه‌ای ایجاد کنید.

## 🧠 سوال 86

**شناسه**: react-086  
**عنوان**: چرا React ترکیب‌پذیری را به inheritance ترجیح می‌دهد؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

مدل کامپوننتی React کاملاً بر پایه **composition** ساخته شده است؛ یعنی کنار هم قرار دادن کامپوننت‌های کوچک‌تر، نه ساخت سلسله‌مراتب inheritance.

**چرا inheritance برای UI خوب جواب نمی‌دهد:**

```jsx
// اگر React بر پایه inheritance بود، فقط از یک کلاس می‌شد ارث برد
class FancyBorderedDialog extends BorderedBox {}
// اما UI معمولاً باید چند concern را با هم ترکیب کند، نه فقط از یک چیز ارث ببرد
```

**React چگونه همان نیازها را با composition حل می‌کند:**

```jsx
// children — composition ساختاری
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
    </div>
  );
}

function Dialog({ children }) {
  return (
    <Card title="Dialog">
      <p>{children}</p>
      <button>OK</button>
    </Card>
  );
}

// hook ها — composition منطقی
function UserDashboard() {
  const user = useAuth();
  const theme = useTheme();
  const { data } = useUserData();
  //...
}
```

**راهنمای رسمی React:**

اگر می‌خواهید منطق غیر UI را بین کامپوننت‌ها به اشتراک بگذارید، آن را به یک ماژول جاوااسکریپتی جدا یا یک custom hook استخراج کنید.

Custom hook ها امروز مهم‌ترین ابزار اشتراک‌گذاری منطق هستند و بدون پیچیدگی inheritance یا کلاس‌ها، به‌خوبی compose می‌شوند.

## 🧠 سوال 87

**شناسه**: react-087  
**عنوان**: چگونه بین state محلی، state بالا برده‌شده، Context و store های خارجی انتخاب می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

محل قرار دادن state یکی از مهم‌ترین تصمیم‌های معماری در React است. اصل کلی این است: ساده‌ترین راهی را انتخاب کنید که واقعاً نیاز شما را برآورده می‌کند.

**چارچوب تصمیم‌گیری:**

```text
آیا این state فقط توسط یک کامپوننت استفاده می‌شود؟
  └─ بله → state محلی با useState

آیا این state بین چند کامپوننت نزدیک و مرتبط استفاده می‌شود؟
  └─ بله → بالا بردن state تا نزدیک‌ترین جد مشترک

آیا این state در بخش‌های زیادی از درخت و دور از هم لازم است؟
  ├─ state سراسری UI مثل theme، locale، auth user → Context
  └─ state پرتغییر یا پیچیده؟
      ├─ server state → TanStack Query / SWR
      └─ client state پیچیده → Zustand / Redux Toolkit
```

**در عمل:**

```jsx
// 1. state محلی
const [isOpen, setIsOpen] = useState(false);

// 2. state بالا برده‌شده
function Parent() {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <List onSelect={setSelected} />
      <Detail item={selected} />
    </>
  );
}

// 3. Context
const user = useContext(AuthContext);

// 4. TanStack Query
const { data: products } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
});

// 5. Zustand
const count = useStore((state) => state.count);
```

**اشتباه‌های رایج:**

- بردن همه چیز به store سراسری
- استفاده از Context برای state پرتغییر
- استفاده نکردن از ابزارهای مخصوص server state و بازنویسی دستی caching و loading

## 🧠 سوال 88

**شناسه**: react-088  
**عنوان**: Zustand چیست و چگونه کار می‌کند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: مدیریت State

### پاسخ 📄

Zustand یک کتابخانه مدیریت state مینیمال، سریع و مقیاس‌پذیر است. این کتابخانه معمولاً از یک store واحد استفاده می‌کند که یک شیء جاوااسکریپتی ساده است و action ها کنار همان state تعریف می‌شوند. React از طریق hook ها به این store subscribe می‌شود.

```js
import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],
  total: 0,

  addItem: (product) =>
    set((state) => ({
      items: [...state.items, product],
      total: state.total + product.price,
    })),

  removeItem: (id) =>
    set((state) => {
      const items = state.items.filter((item) => item.id !== id);
      return { items, total: items.reduce((sum, item) => sum + item.price, 0) };
    }),

  clearCart: () => set({ items: [], total: 0 }),
  getItemCount: () => get().items.length,
}));
```

**استفاده در کامپوننت‌ها — subscribe به slice ها:**

```jsx
// فقط وقتی items.length تغییر کند re-render می‌شود
const itemCount = useCartStore((state) => state.items.length);

// فقط وقتی total تغییر کند re-render می‌شود
const total = useCartStore((state) => state.total);

// action ها معمولاً reference پایدار دارند
const addItem = useCartStore((state) => state.addItem);
```

**middleware ها:**

```js
import { devtools, persist } from 'zustand/middleware';

const useStore = create(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((s) => ({ count: s.count + 1 })),
      }),
      { name: 'counter-storage' },
    ),
  ),
);
```

**چرا گاهی Zustand به‌جای Redux انتخاب می‌شود:**

- boilerplate بسیار کمتر
- نیازی به Provider ندارد
- subscription مبتنی بر selector باعث کاهش re-render غیرضروری می‌شود
- action های async می‌توانند همان تابع‌های async معمولی باشند

## 🧠 سوال 89

**شناسه**: react-089  
**عنوان**: Redux Toolkit چیست و چگونه Redux را مدرن‌تر می‌کند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: مدیریت State

### پاسخ 📄

Redux Toolkit یا RTK روش رسمی و opinionated برای نوشتن Redux است. این ابزار boilerplate زیاد Redux کلاسیک را حذف می‌کند، در حالی که مزایای container قابل پیش‌بینی state و DevTools را حفظ می‌کند.

**`createSlice` — ترکیب action creator و reducer:**

```js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

**`createAsyncThunk` — برای action های async:**

```js
export const fetchUser = createAsyncThunk('users/fetchById', async (userId) => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { data: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
```

**RTK Query — data fetching داخلی:**

```js
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUsers: builder.query({ query: () => '/users' }),
    addUser: builder.mutation({
      query: (user) => ({ url: '/users', method: 'POST', body: user }),
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation } = apiSlice;
```

**تفاوت RTK و Zustand:**

RTK برای تیم‌های بزرگ با نیاز به الگوهای سخت‌گیرانه‌تر، trace کردن بهتر و DevTools قوی مناسب‌تر است. Zustand برای اپ‌های کوچک تا متوسط که سادگی و boilerplate کم می‌خواهند سبک‌تر است.

## 🧠 سوال 90

**شناسه**: react-090  
**عنوان**: TanStack Query چیست و چگونه server state را مدیریت می‌کند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: مدیریت State

### پاسخ 📄

TanStack Query که قبلاً React Query نام داشت، **server state** یعنی داده‌ای که از API ها می‌آید را مدیریت می‌کند. این کتابخانه caching، background refetch، deduplication، وضعیت loading/error و invalidation کش را به‌صورت خودکار مدیریت می‌کند.

```jsx
// خواندن داده
function UserProfile({ id }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage error={error} />;
  return <div>{data.name}</div>;
}

// mutation ها
function DeleteButton({ userId }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  return (
    <button
      onClick={() => mutation.mutate(userId)}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
```

**چرا server state به کتابخانه مخصوص خودش نیاز دارد:**

Server state اساساً با client state فرق دارد. این داده در جای دوردست نگه داشته می‌شود، ممکن است stale شود، fetch آن async است و معمولاً چند کامپوننت هم‌زمان به آن نیاز دارند. TanStack Query امکاناتی مثل این‌ها را می‌دهد:

- **Deduplication** — چند `useQuery` با key یکسان از یک request مشترک استفاده می‌کنند
- **Background refetch** — query ها مثلاً هنگام focus گرفتن دوباره tab می‌توانند refresh شوند
- **Stale-while-revalidate** — ابتدا داده cache شده نشان داده می‌شود و در پس‌زمینه داده تازه fetch می‌شود

## 🧠 سوال 91

**شناسه**: react-091  
**عنوان**: چگونه optimistic update را با TanStack Query پیاده‌سازی می‌کنید؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: مدیریت State

### پاسخ 📄

Optimistic update یعنی قبل از اینکه سرور نتیجه mutation را تایید کند، نتیجه مورد انتظار را بلافاصله در UI نشان بدهیم. TanStack Query این الگو را با `onMutate`، `onError` و `onSettled` پشتیبانی می‌کند.

```jsx
const toggleTodo = useMutation({
  mutationFn: ({ id, completed }) => updateTodo(id, { completed }),

  // 1. به‌روزرسانی optimistic روی cache
  onMutate: async ({ id, completed }) => {
    await queryClient.cancelQueries({ queryKey: ['todos'] });
    const previousTodos = queryClient.getQueryData(['todos']);

    queryClient.setQueryData(['todos'], (old) =>
      old.map((todo) => (todo.id === id ? { ...todo, completed } : todo)),
    );

    return { previousTodos }; // snapshot برای rollback
  },

  // 2. در صورت خطا rollback کن
  onError: (err, variables, context) => {
    queryClient.setQueryData(['todos'], context.previousTodos);
  },

  // 3. در پایان با حقیقت سرور sync شو
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});
```

**الگوی سه‌مرحله‌ای:**

1. `onMutate` — اعمال optimistic update و ذخیره snapshot برای بازگشت
2. `onError` — بازگرداندن snapshot قبلی
3. `onSettled` — invalidation همیشگی بعد از موفقیت یا خطا

**چه زمانی مناسب است:** برای کارهایی که تقریباً همیشه موفق می‌شوند، مثل toggle کردن، like کردن یا reorder. برای عملیات‌هایی که احتمال خطای زیاد دارند، مثل پرداخت یا فرم‌های با validation پیچیده، انتخاب خوبی نیست.

## 🧠 سوال 92

**شناسه**: react-092  
**عنوان**: چگونه یک فرم چندمرحله‌ای در React می‌سازید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

فرم چندمرحله‌ای معمولاً نیاز دارد این موارد را مدیریت کند: مرحله فعلی، داده مشترک بین مرحله‌ها، validation هر مرحله و navigation بین آن‌ها. برای این کار `useReducer` اغلب مثل یک state machine کوچک خوب عمل می‌کند.

```jsx
const STEPS = ['personal', 'address', 'payment', 'review'];

function formReducer(state, action) {
  switch (action.type) {
    case 'NEXT':
      return { ...state, step: Math.min(state.step + 1, STEPS.length - 1) };
    case 'PREV':
      return { ...state, step: Math.max(state.step - 1, 0) };
    case 'UPDATE':
      return { ...state, data: { ...state.data, ...action.payload } };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function MultiStepForm() {
  const [{ step, data }, dispatch] = useReducer(formReducer, {
    step: 0,
    data: { name: '', email: '', street: '', city: '', cardNumber: '' },
  });

  const updateData = (fields) => dispatch({ type: 'UPDATE', payload: fields });
  const next = () => dispatch({ type: 'NEXT' });
  const prev = () => dispatch({ type: 'PREV' });

  const steps = {
    personal: <PersonalStep data={data} onUpdate={updateData} onNext={next} />,
    address: (
      <AddressStep
        data={data}
        onUpdate={updateData}
        onNext={next}
        onPrev={prev}
      />
    ),
    payment: (
      <PaymentStep
        data={data}
        onUpdate={updateData}
        onNext={next}
        onPrev={prev}
      />
    ),
    review: (
      <ReviewStep data={data} onPrev={prev} onSubmit={() => submitForm(data)} />
    ),
  };

  return (
    <div>
      <ProgressBar current={step} total={STEPS.length} />
      {steps[STEPS[step]]}
    </div>
  );
}
```

**نکات مهم:**

- قبل از رفتن به مرحله بعد، همان مرحله را validate کنید
- برای حفظ پیشرفت کاربر، داده را در `sessionStorage` ذخیره کنید
- اگر لازم است مرحله فعلی قابل لینک شدن باشد، آن را با URL sync کنید

## 🧠 سوال 93

**شناسه**: react-093  
**عنوان**: الگوی polymorphic component یا prop `as` چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

کامپوننت polymorphic می‌تواند بسته به prop ای مثل `as` به‌صورت element های HTML مختلف یا حتی custom component های متفاوت رندر شود، در حالی که رفتار یا استایل اصلی خودش را حفظ می‌کند.

```tsx
// نسخه جاوااسکریپت
function Text({ as: Component = 'p', children, ...props }) {
  return <Component {...props}>{children}</Component>;
}

<Text>Paragraph</Text>
<Text as="h1">Heading</Text>
<Text as={Link} to="/about">Link</Text>
```

**TypeScript — نسخه تایپ‌شده:**

```tsx
type PolymorphicProps<T extends React.ElementType> = {
  as?: T;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

function Text<T extends React.ElementType = 'p'>({
  as, children, ...props
}: PolymorphicProps<T>) {
  const Component = as ?? 'p';
  return <Component {...props}>{children}</Component>;
}

// تایپ‌اسکریپت می‌داند که href معتبر است زیرا as="a"
<Text as="a" href="/home">Go home</Text>

// خطای تایپ‌اسکریپت - href برای "p" معتبر نیست
<Text href="/home">Wrong</Text>
```

**کاربردهای رایج:** دکمه‌ای که گاهی `<button>` و گاهی `<a>` یا `<Link>` است، کامپوننت `Text` که می‌تواند هر heading level ای باشد، یا `Card` که گاهی `<div>` و گاهی `<article>` است.

**جایگزین:** پکیج `@radix-ui/react-slot` با prop ای مثل `asChild` یک جایگزین تمیزتر برای بعضی سناریوهاست و پیچیدگی generic های TypeScript را کمتر می‌کند.

## 🧠 سوال 94

**شناسه**: react-094  
**عنوان**: الگوی slot در React چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

الگوی slot به کامپوننت والد اجازه می‌دهد محتوا را در ناحیه‌های نام‌گذاری‌شده یک کامپوننت فرزند تزریق کند؛ شبیه slot در Vue یا Web Components.

**رویکرد named props که رایج‌ترین حالت است:**

```jsx
function PageLayout({ header, sidebar, children, footer }) {
  return (
    <div className="layout">
      <header>{header}</header>
      <div className="main">
        <aside>{sidebar}</aside>
        <main>{children}</main>
      </div>
      <footer>{footer}</footer>
    </div>
  );
}

<PageLayout
  header={<Nav links={navLinks} />}
  sidebar={<FilterPanel />}
  footer={<Footer />}
>
  <ProductList products={products} />
</PageLayout>;
```

**الگوی `asChild` در Radix UI برای slot رفتاری:**

```jsx
// asChild رفتار کامپوننت را روی عنصر مصرف‌کننده رندر می‌کند
<Dialog.Trigger asChild>
  <MyCustomButton>Open Dialog</MyCustomButton>
  {/* MyCustomButton حالا رفتار trigger دیالوگ را هم می‌گیرد */}
</Dialog.Trigger>
```

**چه زمانی مفید است:** برای layout ها و shell component هایی که باید ساختار محتوا را بپذیرند، بدون اینکه نوع محتوای درونشان را دیکته کنند.

## 🧠 سوال 95

**شناسه**: react-095  
**عنوان**: accessibility یا a11y را در React چگونه مدیریت می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

دسترس‌پذیری در React از استانداردهای HTML و ARIA پیروی می‌کند، اما چون UI به‌صورت پویا رندر می‌شود، باید با دقت بیشتری به semantics، focus و keyboard interaction توجه کرد.

**اول از همه semantic HTML:**

```jsx
// اشتباه — div دسترسی کیبورد و نقش مناسب ندارد
<div onClick={handleSubmit}>Submit</div>

// درست — button به‌صورت ذاتی دسترس‌پذیر است
<button onClick={handleSubmit}>Submit</button>
```

**ویژگی‌های ARIA برای widget های سفارشی:**

```jsx
function Disclosure({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  return (
    <div>
      <button
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={() => setIsOpen((v) => !v)}
      >
        {title}
      </button>
      <div id={id} hidden={!isOpen} role="region">
        {children}
      </div>
    </div>
  );
}
```

**مدیریت focus در modal:**

```jsx
function Modal({ isOpen, onClose, children }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true">
      <button ref={closeRef} onClick={onClose} aria-label="Close">
        ×
      </button>
      {children}
    </div>
  );
}
```

**ناوبری با کیبورد:** همه عناصر interactive باید با `Tab` قابل دسترسی باشند و کلیدهایی مثل `Enter`، `Space`، `Escape` و در بعضی widget ها کلیدهای جهتی باید پشتیبانی شوند.

**ابزارها:**

- `eslint-plugin-jsx-a11y`
- `@axe-core/react`
- `react-aria`

## 🧠 سوال 96

**شناسه**: react-096  
**عنوان**: internationalization یا i18n را در React چگونه پیاده‌سازی می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

Internationalization شامل ترجمه متن‌ها، فرمت‌بندی مبتنی بر locale و پشتیبانی از RTL است. یکی از کتابخانه‌های استاندارد برای این کار **react-i18next** است.

**راه‌اندازی و استفاده:**

```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        greeting: 'Hello, {{name}}!',
        items_one: '{{count}} item',
        items_other: '{{count}} items',
      },
    },
    fa: {
      translation: {
        greeting: 'سلام، {{name}}!',
        items_one: '{{count}} آیتم',
        items_other: '{{count}} آیتم',
      },
    },
  },
});
```

```jsx
import { useTranslation } from 'react-i18next';

function Header({ user }) {
  const { t, i18n } = useTranslation();

  return (
    <header dir={i18n.dir()}>
      {/* 'rtl' برای عربی/فارسی */}
      <h1>{t('greeting', { name: user.name })}</h1>
      <p>{t('items', { count: user.cartCount })}</p>
      {/* جمع‌بندی خودکار */}
      <button onClick={() => i18n.changeLanguage('fa')}>فارسی</button>
    </header>
  );
}
```

**فرمت تاریخ و عدد با `Intl`:**

```js
const amount = new Intl.NumberFormat('fa-IR', {
  style: 'currency',
  currency: 'IRR',
}).format(150000);

const date = new Intl.DateTimeFormat('fa-IR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}).format(new Date());
```

**پشتیبانی از RTL:**

```js
document.documentElement.dir = i18n.dir();
document.documentElement.lang = i18n.language;
// در CSS: از ویژگی‌های منطقی استفاده کنید (به جای margin-left از margin-inline-start استفاده کنید)
```

## 🧠 سوال 97

**شناسه**: react-097  
**عنوان**: design system در زمینه کتابخانه‌های کامپوننت React چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

Design system مجموعه‌ای از کامپوننت‌های قابل استفاده مجدد، design token ها مثل رنگ و فاصله و تایپوگرافی، و همین‌طور guideline های استفاده است که ثبات بصری و رفتاری را تضمین می‌کند.

**Design token ها — پایه سیستم:**

```css
:root {
  --color-primary-500: #3b82f6;
  --spacing-4: 1rem;
  --radius-md: 0.375rem;
}
```

**variant های کامپوننت با CVA:**

```tsx
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center rounded font-medium focus-visible:outline-none',
  {
    variants: {
      intent: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        danger: 'bg-red-600 text-white hover:bg-red-700',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: { intent: 'primary', size: 'md' },
  },
);

function Button({ intent, size, className, ...props }) {
  return (
    <button
      className={buttonVariants({ intent, size, className })}
      {...props}
    />
  );
}

<Button intent="danger" size="lg">
  Delete Account
</Button>;
```

**نمونه‌های معروف design system یا کتابخانه‌های مرتبط:**

- `shadcn/ui`
- `Radix UI`
- `MUI`
- `Chakra UI`

## 🧠 سوال 98

**شناسه**: react-098  
**عنوان**: یک استراتژی خوب برای تست یک اپلیکیشن React چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

یک استراتژی متعادل برای تست اپ React معمولاً از **هرم تست** پیروی می‌کند: تعداد زیاد تست واحد، تعداد کمتر تست integration و تعداد خیلی کمتر تست E2E.

```text
┌──────────────────────────┐
│    E2E Tests (few)       │  Playwright, Cypress
│  Integration Tests (some)│  RTL + MSW
│  Unit Tests (many)       │  Vitest, Jest
└──────────────────────────┘
```

**Unit test — برای hook ها و utility ها:**

```jsx
test('useCounter increments', () => {
  const { result } = renderHook(() => useCounter(0));
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});
```

**Integration test — برای کامپوننت‌ها همراه با API mock شده:**

```jsx
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('/api/users', () => HttpResponse.json([{ id: 1, name: 'Ali' }])),
);

test('UserList renders fetched users', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <UserList />
    </QueryClientProvider>,
  );
  await waitFor(() => expect(screen.getByText('Ali')).toBeInTheDocument());
});
```

**E2E test — برای مسیرهای حیاتی:**

```js
test('user can sign in', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name=email]', 'user@example.com');
  await page.fill('[name=password]', 'password');
  await page.click('button[type=submit]');
  await expect(page).toHaveURL('/dashboard');
});
```

**اولویت کلی:** اول hook ها و utility ها را unit test کنید، بعد feature های کاربرمحور را integration test کنید، و E2E را فقط برای مسیرهای واقعاً حیاتی مثل sign in، checkout یا workflow اصلی نگه دارید.

## 🧠 سوال 99

**شناسه**: react-099  
**عنوان**: چگونه یک API خوب برای کامپوننت React طراحی می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

یک API خوب برای کامپوننت باید استفاده درست را آسان و استفاده اشتباه را سخت کند.

**1. پیش‌فرض‌های معقول:**

```jsx
// بد — برای یک دکمه ساده prop های زیادی لازم است
<Button variant="solid" colorScheme="blue" size="md" type="button" isDisabled={false}>Click</Button>

// خوب — از همان ابتدا قابل استفاده است
<Button>Click</Button>
<Button variant="outline">Click</Button>
```

**2. استفاده از state متمایز به‌جای ترکیب boolean ها:**

```jsx
// بد — ترکیب‌های نامعتبر ممکن می‌شود
<Button isLoading isDisabled isError />

// بهتر — یک union مشخص
<Button status="loading" />
```

**3. نام‌گذاری callback ها با `onX`:**

```jsx
<Select onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
```

**4. پشتیبانی از `...props` برای توسعه‌پذیری:**

```jsx
function Card({ title, children, className, ...props }) {
  return (
    <div className={`card ${className ?? ''}`} {...props}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
// مصرف‌کننده می‌تواند data-testid، aria-*، onClick و غیره را اضافه کند.
```

**5. ترجیح composition بر configuration زیاد:**

```jsx
// بد — prop های زیاد برای شخصی‌سازی
<Button leftIcon={<SearchIcon />} rightIcon={<ArrowIcon />} iconSpacing={2} />

// خوب — composition با children
<Button><SearchIcon /> Search <ArrowIcon /></Button>
```

**6. جداسازی داده و handler:**

```jsx
// خوب - والد داده‌ها را فراهم می‌کند، کامپوننت نمایش را مدیریت می‌کند
<ProductList products={products} onProductClick={handleClick} />
```

این الگو باعث می‌شود ارائه داده و واکنش به رویدادها تمیزتر بماند.

## 🧠 سوال 100

**شناسه**: react-100  
**عنوان**: معماری micro-frontend با React چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

Micro-frontend همان ایده microservice را به فرانت‌اند می‌آورد: شکستن یک اپلیکیشن بزرگ به بخش‌های فرانت‌اندی که بتوانند مستقل توسعه، deploy و scale شوند.

**روش‌های یکپارچه‌سازی:**

**1. در زمان build — با npm package:**

```jsx
// تیم A ویژگی خود را منتشر می‌کند
import { CheckoutWidget } from '@company/checkout-widget';
```

این روش ساده است، اما release ها باید هماهنگ باشند و معمولاً همه تیم‌ها یک نسخه مشترک از React دارند.

**2. در زمان runtime — با Module Federation در Webpack 5:**

```js
// checkout-app (remote)
new ModuleFederationPlugin({
  name: 'checkout',
  filename: 'remoteEntry.js',
  exposes: { './CheckoutWidget': './src/CheckoutWidget' },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
});

// shell-app (host)
new ModuleFederationPlugin({
  remotes: { checkout: 'checkout@https://checkout.example.com/remoteEntry.js' },
  shared: { react: { singleton: true } },
});
```

```jsx
const CheckoutWidget = React.lazy(() => import('checkout/CheckoutWidget'));

function App() {
  return (
    <Suspense fallback={<Skeleton />}>
      <CheckoutWidget />
    </Suspense>
  );
}
```

**چالش‌های اصلی:**

- **Shared dependency ها** — باید فقط یک instance از React وجود داشته باشد
- **Shared state** — معمولاً از URL، `localStorage` یا `postMessage` استفاده می‌شود
- **یکپارچگی طراحی** — بهتر است یک design system مشترک وجود داشته باشد
- **Performance** — هر micro-frontend سربار bundle خودش را اضافه می‌کند

**چه زمانی مناسب است:** برای سازمان‌های بزرگ با چند تیم مستقل که باید جداگانه release بدهند. برای بیشتر پروژه‌ها، یک monolith خوش‌ساخت ساده‌تر، سریع‌تر و کم‌هزینه‌تر است.

## 🧠 سوال 101

**شناسه**: react-101  
**عنوان**: code splitting در React فراتر از `React.lazy` پایه چگونه کار می‌کند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

Code splitting باندل را به chunk های کوچک‌تری می‌شکند که در صورت نیاز بارگیری می‌شوند. `React.lazy` نقطه شروع است، اما در استفاده واقعی معمولاً باید export های نام‌دار، preloading و بازیابی از خطاهای بارگیری chunk را هم مدیریت کنید.

**Named export ها** چون `React.lazy` به default export نیاز دارد:

```tsx
export function lazyImport<T, I extends keyof T>(
  factory: () => Promise<T>,
  name: I,
): React.LazyExoticComponent<any> {
  return React.lazy(() =>
    factory().then((module) => ({ default: module[name] as any })),
  );
}

const UserProfile = lazyImport(() => import('./features/users'), 'UserProfile');
```

**Route-based splitting** که معمولاً بیشترین اثر را دارد:

```jsx
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

**Preloading هنگام hover** برای حذف تاخیر بارگیری:

```jsx
const AdminPanel = lazy(() => import('./AdminPanel'));

function NavItem() {
  const preload = () => import('./AdminPanel');

  return (
    <Link to="/admin" onMouseEnter={preload} onFocus={preload}>
      Admin
    </Link>
  );
}
```

**مدیریت خطای بارگیری chunk:**

```jsx
<ErrorBoundary
  fallbackRender={({ resetErrorBoundary }) => (
    <button onClick={resetErrorBoundary}>Retry</button>
  )}
>
  <Suspense fallback={<Spinner />}>
    <HeavyComponent />
  </Suspense>
</ErrorBoundary>
```

**چه چیزهایی را split کنیم:** route ها، محتوای modal یا drawer، ویرایشگرها یا chart های سنگین، و بخش‌های ادمین.

## 🧠 سوال 102

**شناسه**: react-102  
**عنوان**: چگونه حجم bundle یک اپ React را تحلیل و کم می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

بزرگ شدن bundle یکی از مهم‌ترین مشکلات performance است. روند کار معمولاً این است: اندازه‌گیری → شناسایی → رفع → بررسی دوباره.

**مرحله 1 — تصویری‌سازی bundle:**

```bash
npx vite-bundle-visualizer           # Vite
npx webpack-bundle-analyzer          # Webpack
npx source-map-explorer dist/**/*.js # عمومی
```

**مرحله 2 — مقصرهای رایج و راه‌حل‌ها:**

**کتابخانه‌های بزرگ تاریخ:**

```js
// moment.js — بزرگ و همراه با locale های زیاد
import moment from 'moment';

// date-fns — قابل tree shaking و فقط آنچه لازم است وارد می‌شود
import { format, parseISO } from 'date-fns';
```

**import کامل کتابخانه:**

```js
// بد — همه lodash را وارد می‌کند
import _ from 'lodash';

// خوب — فقط تابع لازم را وارد می‌کند
import groupBy from 'lodash/groupBy';
```

**کتابخانه‌های icon بدون import بهینه:**

```js
// امن — import صریح و معمولاً قابل tree shaking
import FiSearch from 'react-icons/fi/FiSearch';
```

**مرحله 3 — قبل از نصب پکیج جدید بررسی کنید:**

قبل از اضافه کردن هر پکیج جدید، `bundlephobia.com` را چک کنید. خیلی از پکیج‌ها جایگزین‌های سبک‌تری دارند.

**مرحله 4 — با Lighthouse تایید کنید:**

بعد از بهینه‌سازی، FCP و TBT را در Lighthouse اندازه بگیرید تا مطمئن شوید بهبود واقعاً از دید کاربر محسوس بوده است.

## 🧠 سوال 103

**شناسه**: react-103  
**عنوان**: Core Web Vitals چگونه برای اپلیکیشن‌های React معنا پیدا می‌کنند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

Core Web Vitals یا CWV متریک‌های گوگل برای تجربه کاربری هستند. اپ‌های React الگوهای خاصی دارند که روی هرکدام از این متریک‌ها اثر می‌گذارند.

**LCP — Largest Contentful Paint** با هدف کمتر از `2.5s`:

```jsx
// هرگز عنصر LCP را به صورت lazy-load بارگذاری نکنید
<img
  src={hero}
  loading="eager"
  fetchpriority="high"
  width={1200}
  height={600}
/>

// تقسیم کد مبتنی بر مسیر، JS که رندر اول را مسدود می‌کند را کاهش می‌دهد
```

Code splitting در سطح route هم کمک می‌کند JavaScript کمتری رندر اولیه را block کند.

**INP — Interaction to Next Paint** با هدف کمتر از `200ms`:

```jsx
// مشکل: محاسبه سنگین thread را block می‌کند
function handleSearch(query) {
  const results = searchAllItems(query);
  setResults(results);
}

// راه‌حل: useTransition
function handleSearch(query) {
  setInputValue(query); // فوری
  startTransition(() => {
    setResults(searchAllItems(query)); // با اولویت پایین‌تر
  });
}
```

**CLS — Cumulative Layout Shift** با هدف کمتر از `0.1`:

```jsx
// مشکل: layout بعد از لود داده می‌پرد
{isLoading ? null : <UserCard user={user} />}

// راه‌حل: skeleton هم‌اندازه
{isLoading ? <UserCardSkeleton /> : <UserCard user={user} />}

// مشکل: تصویر بدون ابعاد
<img src={avatar} />

// راه‌حل: ابعاد صریح
<img src={avatar} width={48} height={48} />
```

**اندازه‌گیری در production:**

```jsx
import { onLCP, onINP, onCLS } from 'web-vitals';

onLCP((metric) =>
  sendToAnalytics({ name: 'LCP', value: metric.value, rating: metric.rating }),
);
onINP((metric) =>
  sendToAnalytics({ name: 'INP', value: metric.value, rating: metric.rating }),
);
onCLS((metric) =>
  sendToAnalytics({ name: 'CLS', value: metric.value, rating: metric.rating }),
);
```

## 🧠 سوال 104

**شناسه**: react-104  
**عنوان**: تله‌های `React.memo` چیست و چگونه از تابع comparison آن استفاده می‌کنید؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

`React.memo` وقتی prop ها تغییر نکرده باشند، از re-render جلوگیری می‌کند و از shallow equality استفاده می‌کند. اما چند الگوی رایج وجود دارند که بی‌سروصدا آن را بی‌اثر می‌کنند.

**تله — object و function های inline در هر render reference جدید می‌سازند:**

```jsx
// خراب — memo هیچ‌وقت skip نمی‌کند
function Parent() {
  return (
    <MemoizedChild
      style={{ color: 'red' }} // reference جدید در هر رندر
      onClick={() => doSomething()} // reference جدید در هر رندر
    />
  );
}

// درست — reference پایدار با useMemo و useCallback
function Parent() {
  const style = useMemo(() => ({ color: 'red' }), []);
  const onClick = useCallback(() => doSomething(), []);
  return <MemoizedChild style={style} onClick={onClick} />;
}
```

**تابع comparison سفارشی:**

```jsx
const MemoizedRow = React.memo(
  function Row({ user, isSelected }) {
    return <tr className={isSelected ? 'selected' : ''}>{user.name}</tr>;
  },
  (prevProps, nextProps) =>
    prevProps.user.id === nextProps.user.id &&
    prevProps.isSelected === nextProps.isSelected,
);
```

**چه زمانی `React.memo` اوضاع را بدتر می‌کند:**

- وقتی خود کامپوننت ارزان رندر می‌شود
- وقتی prop ها تقریباً در هر render عوض می‌شوند
- وقتی تعداد prop ها زیاد است و هزینه comparison بالا می‌رود

**چه زمانی واقعاً کمک می‌کند:**

- آیتم‌های گران داخل لیست که parent زیاد re-render می‌شود
- کامپوننت‌های نمایشی pure با prop های پایدار

همیشه قبل و بعد از استفاده از `memo` با React Profiler بررسی کنید.

## 🧠 سوال 105

**شناسه**: react-105  
**عنوان**: debounce و throttle را در hook های React چگونه پیاده‌سازی می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

Debounce اجرای یک کار را تا بعد از یک مکث عقب می‌اندازد. Throttle اجرای آن را به حداکثر یک بار در هر بازه زمانی محدود می‌کند.

**`useDebounce` — debounce کردن یک value:**

```jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function SearchBox() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) search(debouncedQuery);
  }, [debouncedQuery]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

**`useDebouncedCallback` — debounce کردن یک تابع و جلوگیری از stale closure:**

```jsx
function useDebouncedCallback(callback, delay) {
  const timerRef = useRef(null);
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback(
    (...args) => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => callbackRef.current(...args), delay);
    },
    [delay],
  );
}
```

**`useThrottle` — throttle کردن یک value:**

```jsx
function useThrottle(value, interval) {
  const [throttled, setThrottled] = useState(value);
  const lastRun = useRef(Date.now());

  useEffect(() => {
    const now = Date.now();
    if (now - lastRun.current >= interval) {
      lastRun.current = now;
      setThrottled(value);
    } else {
      const id = setTimeout(
        () => {
          lastRun.current = Date.now();
          setThrottled(value);
        },
        interval - (now - lastRun.current),
      );
      return () => clearTimeout(id);
    }
  }, [value, interval]);

  return throttled;
}
```

**تله stale closure:** وقتی callback را debounce می‌کنید، با `ref` مطمئن شوید همیشه آخرین نسخه callback اجرا می‌شود.

## 🧠 سوال 106

**شناسه**: react-106  
**عنوان**: infinite scroll را در React چگونه پیاده‌سازی می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

Infinite scroll با نزدیک شدن کاربر به انتهای لیست، محتوای بیشتری بار می‌کند. رویکرد مدرن معمولاً از `IntersectionObserver` برای تشخیص ورود یک sentinel به viewport استفاده می‌کند.

**پیاده‌سازی دستی:**

```jsx
function useInfiniteScroll(callback) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) callback();
      },
      { threshold: 0.1 },
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [callback]);

  return sentinelRef;
}

function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    const next = await fetchProducts(page);
    if (!next.length) {
      setHasMore(false);
      return;
    }
    setProducts((prev) => [...prev, ...next]);
    setPage((p) => p + 1);
  }, [page]);

  const sentinelRef = useInfiniteScroll(hasMore ? loadMore : () => {});

  return (
    <div>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
      {hasMore && (
        <div ref={sentinelRef}>
          <Spinner />
        </div>
      )}
    </div>
  );
}
```

**با TanStack Query** که معمولاً پیشنهاد بهتری است:

```jsx
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam = 1 }) => fetchProducts(pageParam),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

const products = data?.pages.flatMap((page) => page.items) ?? [];
```

**Infinite scroll در برابر pagination:** برای feed ها و مرور اکتشافی مناسب‌تر است. اگر کاربر باید به یک صفحه خاص برود یا URL قابل اشتراک‌گذاری برای موقعیت داشته باشد، pagination بهتر است.

## 🧠 سوال 107

**شناسه**: react-107  
**عنوان**: چگونه از React Profiler برای پیدا کردن گلوگاه‌های performance استفاده می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

React Profiler در React DevTools رندرها را ضبط می‌کند و نشان می‌دهد کدام کامپوننت‌ها رندر شده‌اند، چقدر زمان برده‌اند و چرا.

**استفاده از DevTools Profiler:**

1. React DevTools را باز کنید و به تب **Profiler** بروید
2. روی **Record** کلیک کنید
3. interaction کند را انجام دهید
4. روی **Stop** کلیک کنید و نتیجه را بررسی کنید

**خواندن flame chart:**

- **Width** یعنی زمان صرف‌شده برای render
- **Color** یعنی اینکه آیا رندر شده و چقدر کند بوده
- **Hover** زمان دقیق و علت render را نشان می‌دهد

**API مربوط به `Profiler`:**

```jsx
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration, baseDuration) {
  // اگر actualDuration خیلی کمتر از baseDuration باشد، memoization موثر بوده
  if (actualDuration > 16) {
    console.warn(`${id} slow: ${actualDuration.toFixed(2)}ms`);
  }
}

<Profiler id="ProductList" onRender={onRenderCallback}>
  <ProductList />
</Profiler>;
```

**یافته‌های رایج و راه‌حل‌ها:**

| یافته                                        | راه‌حل                                         |
| -------------------------------------------- | ---------------------------------------------- |
| render شدن با هر render والد                 | `React.memo`                                   |
| تغییر object/function prop در هر render      | `useMemo` / `useCallback`                      |
| render شدن آیتم‌های زیاد لیست                | virtualization + key پایدار                    |
| re-render غیرضروری مصرف‌کننده context        | split کردن context                             |
| «مدت زمان واقعی» بالا، «مدت زمان پایه» پایین | به خاطر سپردن کار می‌کند؛ محاسبات پایه کند است |

**نکته:** در تنظیمات Profiler گزینه "Record why each component rendered" را فعال کنید.

## 🧠 سوال 108

**شناسه**: react-108  
**عنوان**: trade-off های performance بین CSS-in-JS و CSS Modules چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

CSS-in-JS و CSS Modules دو رویکرد متفاوت برای styling هستند و profile عملکردی آن‌ها هم فرق دارد.

**Runtime CSS-in-JS** مثل styled-components و Emotion:

```jsx
const Button = styled.button`
  background: ${(props) => (props.primary ? '#3b82f6' : '#e5e7eb')};
`;
```

در هر render، کتابخانه باید template را پردازش کند، class name را hash کند، بررسی کند style قبلاً وجود داشته یا نه، و در صورت نیاز style را inject کند. این کار هزینه runtime و bundle size اضافه دارد.

**Zero-runtime CSS-in-JS** مثل vanilla-extract یا linaria:

```js
import { style } from '@vanilla-extract/css';

export const button = style({ background: '#3b82f6' });
```

در این مدل، style ها در زمان build استخراج می‌شوند و هزینه runtime ندارند.

**CSS Modules:**

```css
/* Button.module.css */
.button {
  background: #3b82f6;
}
.buttonPrimary {
  background: #1d4ed8;
}
```

```jsx
import styles from './Button.module.css';

<button
  className={`${styles.button} ${primary ? styles.buttonPrimary : ''}`}
/>;
```

این روش هزینه runtime ندارد، static است و برای tree shaking و SSR معمولاً خوب عمل می‌کند.

**توصیه کلی:**

| موضوع                         | انتخاب بهتر                 |
| ----------------------------- | --------------------------- |
| runtime performance           | CSS Modules یا zero-runtime |
| استایل‌های پویا بر اساس props | runtime CSS-in-JS           |
| سازگاری SSR                   | CSS Modules                 |
| bundle size                   | CSS Modules                 |

برای اپ‌های performance-sensitive، ترکیب CSS Modules با Tailwind یا ابزارهایی مثل vanilla-extract معمولاً انتخاب خوبی است.

## 🧠 سوال 109

**شناسه**: react-109  
**عنوان**: تصاویر را در یک اپ React چگونه بهینه می‌کنید؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

تصاویر اغلب بزرگ‌ترین asset ها هستند و یکی از علت‌های اصلی LCP و CLS ضعیف به حساب می‌آیند.

**1. Lazy loading:**

```jsx
<img src={product.image} alt={product.name} loading="lazy" />
// اما تصویر اصلی بالای صفحه را lazy-load نکنید
<img src={hero} alt="Hero" loading="eager" fetchpriority="high" />
```

**2. تعیین ابعاد برای جلوگیری از CLS:**

```jsx
// بدون ابعاد: مرورگر فضا را رزرو نمی‌کند → تغییر طرح
// با ابعاد: مرورگر بلافاصله فضای صحیح را رزرو می‌کند
<img src={avatar} alt="User" width={48} height={48} />
```

**3. فرمت‌های مدرن:**

```jsx
<picture>
  <source srcSet={image.avif} type="image/avif" />
  <source srcSet={image.webp} type="image/webp" />
  <img src={image.jpg} alt={image.alt} width={800} height={600} />
</picture>
```

**4. Responsive images:**

```jsx
<img
  src={image.md}
  srcSet={`${image.sm} 480w, ${image.md} 800w, ${image.lg} 1200w`}
  sizes="(max-width: 480px) 480px, (max-width: 800px) 800px, 1200px"
  alt={image.alt}
/>
```

**5. Blur placeholder یا LQIP:**

```jsx
function BlurImage({ src, lqip, alt, width, height }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <img
        src={lqip}
        aria-hidden
        style={{
          filter: 'blur(20px)',
          opacity: loaded ? 0 : 1,
          position: 'absolute',
        }}
      />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
      />
    </div>
  );
}
```

در Next.js، کامپوننت `<Image>` بیشتر این کارها را به‌صورت خودکار انجام می‌دهد.

## 🧠 سوال 110

**شناسه**: react-110  
**عنوان**: Streaming SSR در React 18 چگونه کار می‌کند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: SSR / Hydration

### پاسخ 📄

در SSR سنتی، سرور اول کل HTML را می‌سازد و بعد یکجا برای کلاینت می‌فرستد. در Streaming SSR که در React 18 معرفی شد، HTML به‌صورت تدریجی و هم‌زمان با آماده شدن بخش‌های مختلف صفحه ارسال می‌شود.

**SSR سنتی:** سرور همه چیز را رندر می‌کند → کل HTML را می‌فرستد → کلاینت hydrate می‌کند.

**Streaming SSR:** سرور shell اولیه را خیلی زود می‌فرستد → بقیه بخش‌ها را به‌مرور stream می‌کند → hydration هم می‌تواند تدریجی‌تر باشد.

**`renderToPipeableStream` در Node.js:**

```jsx
import { renderToPipeableStream } from 'react-dom/server';

function handler(req, res) {
  const { pipe, abort } = renderToPipeableStream(<App />, {
    bootstrapScripts: ['/static/js/main.js'],

    onShellReady() {
      res.setHeader('Content-Type', 'text/html');
      pipe(res);
    },

    onShellError(error) {
      res.status(500).send('<h1>Something went wrong</h1>');
    },
  });

  setTimeout(abort, 10000);
}
```

**Suspense به‌عنوان مرزهای streaming:**

```jsx
function App() {
  return (
    <html>
      <body>
        <Header />
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductList />
        </Suspense>
        <Suspense fallback={<ReviewsSkeleton />}>
          <Reviews />
        </Suspense>
      </body>
    </html>
  );
}
```

**Selective hydration:** React 18 لازم نیست کل صفحه را یکجا hydrate کند. اگر کاربر قبل از hydrate شدن کامل روی بخشی تعامل کند، React می‌تواند همان مرز مرتبط را در اولویت hydrate کند.

## 🧠 سوال 111

**شناسه**: react-111  
**عنوان**: tree shaking چیست و چگونه مطمئن می‌شوید در پروژه React کار می‌کند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

Tree shaking کدهای مرده یا export های استفاده‌نشده را از bundle نهایی حذف می‌کند. Bundler ها این کار را برای ES module ها انجام می‌دهند، اما الگوهای رایجی وجود دارد که آن را خراب می‌کنند.

**ES module ها تحلیل ایستا را ممکن می‌کنند:**

```js
// CommonJS — تحلیل ایستا سخت یا غیرممکن
const { format } = require('date-fns');

// ESM — bundler می‌تواند کد استفاده‌نشده را حذف کند
import { format } from 'date-fns';
```

**چه چیزهایی tree shaking را خراب می‌کنند:**

**1. نداشتن `sideEffects` در `package.json`:**

```json
{ "sideEffects": false }
```

یا می‌توانید فقط فایل‌های دارای side effect را مشخص کنید.

**2. زنجیره‌های عمیق barrel با side effect:**

```js
export * from './Button';
export * from './Modal';
```

اگر یکی از ماژول‌های re-export شده side effect داشته باشد، ممکن است کل barrel نگه داشته شود.

**3. کتابخانه‌هایی که از `require()` شرطی استفاده می‌کنند:**

این حالت تحلیل ایستا را سخت می‌کند. پکیج‌های ESM-first معمولاً بهتر هستند.

**چگونه بررسی کنیم:**

```bash
npx vite-bundle-visualizer
```

اگر کتابخانه بزرگی را می‌بینید که فقط بخش کوچکی از آن را مصرف می‌کنید، احتمالاً tree shaking درست عمل نکرده است.

**مثال عملی:**

```js
// react-icons — به درستی tree-shakeable
import { FiSearch } from 'react-icons/fi'; // فقط FiSearch در bundle
```

## 🧠 سوال 112

**شناسه**: react-112  
**عنوان**: performance انیمیشن را در React چگونه بهینه می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

انیمیشن‌هایی که در هر frame باعث محاسبه دوباره layout شوند، jank ایجاد می‌کنند. راه‌حل اصلی این است که فقط property هایی را animate کنید که روی compositor اجرا می‌شوند.

**Property های مناسب برای انیمیشن روان:**

```css
/* فقط transform و opacity را می‌توان بدون layout/paint animated کرد */
transform: translateX(100px) scale(1.1);
opacity: 0.5;
```

**Property هایی که بهتر است animate نشوند:**

```css
/* این‌ها طرح‌بندی را در هر فریم دوباره محاسبه می‌کنند */
width, height, top, left, margin, padding
```

**CSS transition** ساده و معمولاً سریع:

```jsx
function AnimatedCard({ isVisible }) {
  return (
    <div
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        opacity: isVisible ? 1 : 0,
        transition: 'transform 300ms ease, opacity 300ms ease',
        willChange: 'transform, opacity',
      }}
    >
      Content
    </div>
  );
}
```

**Framer Motion** برای انیمیشن declarative:

```jsx
import { motion, AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>;
```

**پرهیز از layout thrashing:**

```js
// بد — read و write درهم
elements.forEach((el) => {
  const h = el.offsetHeight;
  el.style.height = h * 2 + 'px';
});

// خوب — اول همه read ها، بعد همه write ها
const heights = elements.map((el) => el.offsetHeight);
elements.forEach((el, i) => {
  el.style.height = heights[i] * 2 + 'px';
});
```

## 🧠 سوال 113

**شناسه**: react-113  
**عنوان**: partial hydration و معماری islands چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: SSR / Hydration

### پاسخ 📄

در SSR سنتی، کل صفحه به‌عنوان یک اپلیکیشن واحد hydrate می‌شود، حتی محتوای کاملاً ایستا. Partial hydration فقط بخش‌های واقعاً interactive را hydrate می‌کند.

**مشکل full hydration:**

```text
سرور: ۱۰۰۰۰ کلمه + ۳ دکمه تعاملی را رندر می‌کند.
کلاینت: تمام JS را دانلود می‌کند → همه چیز از جمله متن استاتیک را هیدراته می‌کند.
(کار هدر رفته - متن استاتیک هرگز به جاوا اسکریپت نیاز ندارد)
```

**معماری Islands:**

```text
Page = 🌊 دریای HTML ایستا
     + 🏝 جزیره (سبد خرید — interactive و hydrated)
     + 🏝 جزیره (نوار جستجو — interactive و hydrated)
     + 🌊 HTML ایستا برای بقیه بخش‌ها
```

**React Server Components به‌عنوان نوعی partial hydration:**

```jsx
// Server Component — به HTML رندر می‌شود و JS آن به کلاینت نمی‌رود
async function BlogPost({ id }) {
  const post = await db.posts.findById(id);
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <CommentSection postId={id} />
    </article>
  );
}

('use client');
function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  // این بخش interactive است و همان جزیره به حساب می‌آید
}
```

**چرا مهم است:** در صفحه‌های محتوامحور، partial hydration می‌تواند حجم JavaScript لازم را به‌شدت کم کند و FCP و Time to Interactive را بهبود دهد.

## 🧠 سوال 114

**شناسه**: react-114  
**عنوان**: long task ها را چگونه مدیریت می‌کنید تا اپ React responsive بماند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

Long task هر اجرای JavaScript ای است که بیشتر از `50ms` طول بکشد. این کار مرورگر را از پاسخ به input کاربر بازمی‌دارد و jank ایجاد می‌کند.

**شناسایی long task:**

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.warn(`Long task: ${entry.duration.toFixed(0)}ms`);
  });
});
observer.observe({ entryTypes: ['longtask'] });
```

**استراتژی 1 — `useTransition`:**

```jsx
function handleSearch(query) {
  setInputValue(query); // فوری
  startTransition(() => {
    setResults(heavySearch(query)); // deferred
  });
}
```

**استراتژی 2 — پردازش chunk شده:**

```js
async function processItems(items, CHUNK = 100) {
  const results = [];
  for (let i = 0; i < items.length; i += CHUNK) {
    results.push(...items.slice(i, i + CHUNK).map(expensiveTransform));
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  return results;
}
```

**استراتژی 3 — Web Worker:**

```js
// worker.js
self.onmessage = ({ data }) => self.postMessage(expensiveComputation(data));

// Component
function useWorker(url) {
  const workerRef = useRef(null);
  useEffect(() => {
    workerRef.current = new Worker(url, { type: 'module' });
    return () => workerRef.current.terminate();
  }, [url]);

  return useCallback(
    (data) =>
      new Promise((resolve) => {
        workerRef.current.onmessage = ({ data }) => resolve(data);
        workerRef.current.postMessage(data);
      }),
    [],
  );
}
```

**چارچوب تصمیم‌گیری:**

- کمتر از `50ms`: معمولاً نیازی به اقدام نیست
- بین `50` تا `200ms` برای state React: `useTransition`
- بین `50` تا `200ms` برای پردازش داده: chunk کردن با `setTimeout`
- بیشتر از `200ms` برای محاسبه خالص: Web Worker

## 🧠 سوال 115

**شناسه**: react-115  
**عنوان**: performance اپلیکیشن React را در production چگونه مانیتور می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

ابزارهای development فقط عملکرد را در شرایط کنترل‌شده نشان می‌دهند. مانیتورینگ production متریک‌های واقعی را از دستگاه‌ها و شبکه‌های واقعی کاربران جمع می‌کند.

**Core Web Vitals در production:**

```jsx
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  navigator.sendBeacon(
    '/analytics',
    JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      url: window.location.href,
    }),
  );
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
```

**مانیتورینگ خطا با Sentry:**

```jsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'your-dsn',
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 0.1,
});

const App = Sentry.withErrorBoundary(AppRoot, { fallback: <ErrorPage /> });
```

**استفاده از `Profiler` در production برای اندازه‌گیری هدفمند:**

```jsx
function onRender(id, phase, actualDuration) {
  if (actualDuration > 16) {
    // کندتر از یک فریم ۶۰ فریم بر ثانیه
    logSlowRender({ component: id, duration: actualDuration, phase });
  }
}

<Profiler id="CheckoutForm" onRender={onRender}>
  <CheckoutForm />
</Profiler>;
```

**performance mark سفارشی:**

```js
performance.mark('cart-open-start');
openCart();
performance.mark('cart-open-end');
performance.measure('cart-open', 'cart-open-start', 'cart-open-end');

const [m] = performance.getEntriesByName('cart-open');
sendToAnalytics({ name: 'cart-open', value: m.duration });
```

## 🧠 سوال 116

**شناسه**: react-116  
**عنوان**: چک‌لیست کامل جلوگیری از re-render غیرضروری در React چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: بهینه‌سازی عملکرد

### پاسخ 📄

**1. reference پایدار برای object و array با `useMemo`:**

```jsx
const config = useMemo(() => ({ sortBy: 'name' }), []);
<List config={config} />;
```

**2. reference پایدار برای callback با `useCallback`:**

```jsx
const handleClick = useCallback(() => doSomething(id), [id]);
<Button onClick={handleClick} />;
```

**3. استفاده از `React.memo` برای کامپوننت‌های pure و گران:**

```jsx
const ExpensiveList = React.memo(({ items }) =>
  items.map((i) => <Row key={i.id} item={i} />),
);
```

**4. split کردن Context بر اساس نرخ تغییر:**

```jsx
<UserContext.Provider>
  <ThemeContext.Provider>
    <CartContext.Provider>
```

**5. پاس دادن children به‌صورت JSX:**

```jsx
// وقتی وضعیت نامرتبط والد تغییر می‌کند، فرزند دوباره رندر نمی‌شود
function App() {
  return (
    <Parent>
      <Child />
    </Parent>
  );
}
```

**6. `useMemo` برای state مشتق‌شده:**

```jsx
const sorted = useMemo(() => [...items].sort(compareFn), [items]);
```

**7. تعریف helper component ها خارج از scope رندر:**

```jsx
// ردیف تعریف شده خارج از لیست — نوع کامپوننت پایدار
const Row = ({ item }) => <div>{item.name}</div>;
function List({ items }) {
  return items.map((i) => <Row key={i.id} item={i} />);
}
```

**8. selector در Zustand:**

```jsx
const count = useStore((state) => state.count);
```

**9. مجازی‌سازی لیست‌های طولانی:**

از `react-window` یا `react-virtual` استفاده کنید — فقط موارد قابل مشاهده را رندر کنید.

**10. از کلیدهای منحصر به فرد پایدار استفاده کنید:**

هرگز از اندیس آرایه به عنوان کلید برای لیست‌هایی که می‌توانند مرتب‌سازی مجدد یا فیلتر شوند، استفاده نکنید.

**11. از state در رندر اجتناب کنید:**

مقادیر جدید را به صورت درون خطی استخراج نکنید - آنها را به خاطر بسپارید.

**12. برای stateهایی که مرتباً به‌روزرسانی می‌شوند، ترکیب را به متن ترجیح دهید:**

برای زیردرخت‌هایی که مرتباً به‌روزرسانی می‌شوند، داده‌ها را از طریق props یا render props ارسال کنید.

## 🧠 سوال 117

**شناسه**: react-117  
**عنوان**: چگونه از TypeScript همراه React برای type safety پیشرفته استفاده می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: معماری و الگوها

### پاسخ 📄

**Prop های کامپوننت با گسترش attribute های native HTML:**

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost';
  isLoading?: boolean;
}

function Button({
  variant = 'solid',
  isLoading,
  children,
  ...props
}: ButtonProps) {
  return <button {...props}>{isLoading ? <Spinner /> : children}</button>;
}
```

**نوع‌های event handler:**

```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {};
const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {};
```

**کامپوننت generic:**

```tsx
interface SelectProps<T> {
  options: T[];
  value: T | null;
  onChange: (value: T) => void;
  getLabel: (option: T) => string;
}

function Select<T>({ options, value, onChange, getLabel }: SelectProps<T>) {
  return (
    <select onChange={(e) => onChange(options[Number(e.target.value)])}>
      {options.map((opt, i) => (
        <option key={i} value={i}>
          {getLabel(opt)}
        </option>
      ))}
    </select>
  );
}

// تایپ‌اسکریپت T را به عنوان کاربر استنباط می‌کند
<Select
  options={users}
  value={selected}
  onChange={setSelected}
  getLabel={(u) => u.name}
/>;
```

**Discriminated union برای variant-driven component:**

```tsx
type AlertProps =
  | { variant: 'info'; message: string }
  | { variant: 'error'; message: string; onRetry: () => void }
  | { variant: 'success'; message: string };

function Alert(props: AlertProps) {
  return (
    <div className={`alert-${props.variant}`}>
      {props.message}
      {props.variant === 'error' && (
        <button onClick={props.onRetry}>Retry</button> // تایپ‌اسکریپت می‌داند که onRetry در اینجا وجود دارد
      )}
    </div>
  );
}
```

**`ComponentPropsWithoutRef` برای wrapper component ها:**

```tsx
type CardProps = React.ComponentPropsWithoutRef<'div'> & { title: string };

function Card({ title, className, children, ...props }: CardProps) {
  return (
    <div className={`card ${className ?? ''}`} {...props}>
      {children}
    </div>
  );
}
```

## 🧠 سوال 118

**شناسه**: react-118  
**عنوان**: تفاوت‌های کلیدی بین React DOM و React Native چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: مبانی React

### پاسخ 📄

React DOM و React Native از **یک reconciler مشترک React** استفاده می‌کنند؛ یعنی مدل کامپوننت، hook ها و مفاهیم رندر مشابه است، اما renderer آن‌ها برای پلتفرم‌های متفاوت هدف‌گیری شده است.

**تفاوت‌های اصلی:**

|             | React DOM                    | React Native                      |
| ----------- | ---------------------------- | --------------------------------- |
| هدف         | DOM مرورگر                   | view های بومی iOS / Android       |
| استایل      | CSS                          | StyleSheet API                    |
| layout      | Flexbox + Grid               | فقط Flexbox                       |
| کامپوننت‌ها | `<div>`، `<span>`، `<input>` | `<View>`، `<Text>`، `<TextInput>` |
| رویدادها    | `onClick`، `onChange`        | `onPress`، `onChangeText`         |
| navigation  | React Router                 | React Navigation                  |

**تفاوت در styling:**

```jsx
// React DOM
<div style={{ backgroundColor: 'blue', fontSize: 16 }}>Hello</div>;

// React Native
import { View, Text, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'blue' },
  text: { fontSize: 16, color: 'white' },
});
<View style={styles.container}>
  <Text style={styles.text}>Hello</Text>
</View>;
```

**کد وابسته به پلتفرم:**

```jsx
import { Platform } from 'react-native';
const shadow = Platform.select({
  ios: { shadowColor: '#000', shadowOpacity: 0.2 },
  android: { elevation: 4 },
});
```

**چیزهایی که بین دو پلتفرم قابل انتقال‌اند:**

- custom hook ها
- منطق business
- type ها و interface های TypeScript
- `react-native-web` که بعضی کامپوننت‌های React Native را در مرورگر رندر می‌کند

## 🧠 سوال 119

**شناسه**: react-119  
**عنوان**: `StrictMode` در React 18 دقیقاً چه می‌کند و چرا effect ها دوبار اجرا می‌شوند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: داخلی‌های React

### پاسخ 📄

`StrictMode` یک ابزار مخصوص development است که با صدا زدن عمدی بعضی بخش‌ها بیش از یک بار، کمک می‌کند باگ‌ها زودتر پیدا شوند. در React 18 مهم‌ترین تغییر آن **دوبار اجرا شدن effect ها** است.

**StrictMode در React 18 این کارها را انجام می‌دهد:**

1. کامپوننت‌ها را دوبار render می‌کند تا side effect داخل render مشخص شود
2. effect ها را به‌صورت mount → cleanup → mount اجرا می‌کند تا cleanup ناقص پیدا شود
3. درباره API های deprecated هشدار می‌دهد
4. بعضی به‌روزرسانی‌های state در موقعیت‌های مشکوک را هشدار می‌دهد

**چرا effect ها دوبار اجرا می‌شوند:**

React 18 برای concurrent rendering طراحی شده و در آینده ممکن است mount/unmount/remount بدون تغییر قابل مشاهده برای کاربر بیشتر رخ دهد. StrictMode این شرایط را شبیه‌سازی می‌کند تا cleanup های ناقص زودتر آشکار شوند.

```jsx
useEffect(() => {
  const ws = new WebSocket(url);
  ws.onmessage = handleMessage;
  console.log('connected'); // در dev StrictMode دو بار لاگ می‌شود

  return () => {
    ws.close();
    console.log('disconnected'); // cleanup مربوط به mount اول
  };
}, [url]);
```

**این رفتار چه باگ‌هایی را پیدا می‌کند:**

```jsx
// باگ: WebSocket دوبار باز می‌شود و cleanup ندارد
useEffect(() => {
  const ws = new WebSocket(url);
  ws.onmessage = handleMessage;
  // وارد نشده: return() => ws.close();
}, [url]);
```

**این دوبار اجرا شدن چه چیزی نیست:**

- در production اتفاق نمی‌افتد
- به کاربر دو بار mount واقعی نشان نمی‌دهد
- نشانه خراب بودن React نیست

**بهترین روش:** اگر effect شما با دوبار اجرا شدن می‌شکند، cleanup آن ناقص است. مشکل را برطرف کنید، نه اینکه StrictMode را خاموش کنید.

## 🧠 سوال 120

**شناسه**: react-120  
**عنوان**: priority lane های React چیستند و concurrent scheduler چگونه کار می‌کند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: داخلی‌های React

### پاسخ 📄

Concurrent scheduler در React از یک مدل به نام **lanes** استفاده می‌کند تا برای هر update یک اولویت تعیین کند. update های با اولویت بالاتر می‌توانند update های کم‌اولویت‌تر را قطع کنند تا UI responsive بماند.

**Lane های اولویت از بالا به پایین:**

```text
SyncLane            — synchronous
InputContinuousLane — ورودی‌های پیوسته مثل تایپ یا drag
DefaultLane         — update های معمولی
TransitionLane      — update های startTransition
IdleLane            — کارهای کم‌اهمیت مثل prefetch
```

**جریان lane ها از event کاربر:**

```jsx
function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    setQuery(e.target.value); // lane با اولویت بالاتر
    startTransition(() => {
      setResults(search(e.target.value)); // TransitionLane
    });
  }
}
```

**Scheduler چگونه کار می‌کند:**

1. هر update با یک lane برچسب می‌خورد
2. scheduler اول بالاترین lane را پردازش می‌کند
3. اگر وسط یک render کم‌اولویت، update پر‌اولویت‌تری برسد، React کار فعلی را متوقف می‌کند و به سراغ update فوری می‌رود
4. React کار render طولانی را به chunk های کوتاه تقسیم می‌کند و بین آن‌ها به مرورگر فرصت می‌دهد

**حلقه کار به‌شکل ساده‌شده:**

```js
while (workInProgress !== null) {
  if (shouldYieldToHost()) break;
  performUnitOfWork(workInProgress);
}
// کارهای باقی مانده را برای فریم بعدی زمان‌بندی می‌کند
```

**چرا این موضوع برای برنامه‌ها مهم است:**

درک Laneها توضیح می‌دهد که چرا `useTransition` کار می‌کند: قرار دادن یک به‌روزرسانی در `startTransition` آن را از `DefaultLane` به `TransitionLane` منتقل می‌کند و به React اجازه می‌دهد تا وقتی کاربر دوباره تایپ می‌کند، آن را متوقف کند - رندر در حال انجام را دور می‌اندازد و از نو با مقدار ورودی جدید شروع می‌کند.

## 🧠 سوال 121

**شناسه**: react-121  
**عنوان**: stale closure در React چیست و چگونه در `useEffect` باعث باگ می‌شود؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: موارد لبه و تله‌ها

### پاسخ 📄

Stale closure زمانی رخ می‌دهد که یک تابع در لحظه ساخته شدن، مقداری را از scope اطرافش capture کند، اما بعداً آن مقدار عوض شود و تابع همچنان به نسخه قدیمی همان مقدار اشاره کند.

در React این مشکل بیشتر داخل `useEffect` دیده می‌شود، مخصوصاً وقتی dependency array ناقص باشد:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(count); // همیشه 0 را لاگ می‌کند — stale closure
      setCount(count + 1); // همیشه 1 می‌شود و افزایش واقعی رخ نمی‌دهد
    }, 1000);
    return () => clearInterval(id);
  }, []); // count فقط یک‌بار در mount capture شده
}
```

**چرا رخ می‌دهد:** effect هنگام اجرا شدن روی `count` بسته می‌شود. چون `[]` یعنی فقط یک‌بار اجرا شود، closure هرگز دوباره ساخته نمی‌شود و `count` برای همیشه همان مقدار اولیه می‌ماند.

**راه‌حل 1 — فرم functional update** وقتی فقط به مقدار قبلی نیاز دارید:

```jsx
setCount((prev) => prev + 1); // نیازی به closure روی شمارش نیست
```

**راه‌حل 2 — dependency را اضافه کنید** تا interval دوباره ساخته شود:

```jsx
useEffect(() => {
  const id = setInterval(() => setCount(count + 1), 1000);
  return () => clearInterval(id); // قدیمی را پاک کنید
}, [count]);
```

**راه‌حل 3 — استفاده از ref برای نگه داشتن آخرین مقدار** وقتی callback نباید دوباره subscribe شود:

```jsx
const countRef = useRef(count);
useEffect(() => {
  countRef.current = count;
});

useEffect(() => {
  const id = setInterval(() => setCount(countRef.current + 1), 1000);
  return () => clearInterval(id);
}, []);
```

قانون ESLint با نام `exhaustive-deps` بیشتر stale closure ها را همان موقع نوشتن کد پیدا می‌کند.

## 🧠 سوال 122

**شناسه**: react-122  
**عنوان**: چه چیزهایی باعث loop بی‌نهایت re-render در React می‌شوند و چگونه آن‌ها را درست می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: موارد لبه و تله‌ها

### پاسخ 📄

Loop بی‌نهایت زمانی رخ می‌دهد که یک render خودش باعث update شدن state شود و آن update یک render جدید ایجاد کند، و این چرخه بدون توقف تکرار شود.

**علت 1 — صدا زدن `setState` بدون شرط در render:**

```jsx
function Bad() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // در هر render اجرا می‌شود
}
```

راه‌حل: update های state را به event handler یا effect منتقل کنید.

**علت 2 — `useEffect` با dependency ناقص یا ناپایدار:**

```jsx
useEffect(() => {
  setData(transform(data)); // setData → رندر مجدد → اجرای همان افکت
}, [data]); // اگر داده‌ها یک شیء/آرایه باشند، در هر رندر دوباره ایجاد می‌شوند
```

راه حل: وابستگی را با استفاده از `useMemo` به خاطر بسپارید، یا از فرم به‌روزرسانی تابعی استفاده کنید.

**علت 3 — object یا array ای که inline داخل dependency ساخته می‌شود:**

```jsx
useEffect(() => {
  fetchUser(options);
}, [{ id: 1 }]); // reference جدید در هر render
```

راه‌حل: object را بیرون از کامپوننت تعریف کنید یا با `useMemo` پایدارش کنید.

**علت 4 — parent و child همدیگر را update می‌کنند:**

```jsx
// Parent یک callback می‌دهد، child آن را هنگام render صدا می‌زند
// parent update می‌شود → child دوباره render می‌شود → callback دوباره اجرا می‌شود
```

راه‌حل: callback ها را با `useCallback` پایدار کنید یا جریان داده را یک‌طرفه‌تر طراحی کنید.

**نکته برای دیباگ:** React DevTools Profiler و حتی `console.count('render')` می‌توانند loop بی‌نهایت را سریع مشخص کنند.

## 🧠 سوال 123

**شناسه**: react-123  
**عنوان**: چرا literal های object و array در JSX باعث re-render غیرضروری می‌شوند؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: موارد لبه و تله‌ها

### پاسخ 📄

در جاوااسکریپت، object و array literal ها هر بار که evaluate شوند، **reference جدید** می‌سازند. وقتی آن‌ها را مستقیم داخل JSX می‌نویسید، در هر render دوباره ساخته می‌شوند و مقایسه ارجاعی React یعنی `===` همیشه آن‌ها را متفاوت می‌بیند.

**مشکل:**

```jsx
function Parent() {
  return <Child style={{ color: 'red' }} />;
  // { color: 'red' } در هر رندر والد، یک شیء جدید است
}

const Child = React.memo(({ style }) => <div style={style} />);
// React.memo بررسی می‌کند: prevStyle === nextStyle → هر بار false → در هر صورت دوباره رندر می‌شود
```

**همین مشکل برای array و callback هم وجود دارد:**

```jsx
<List items={[1, 2, 3]} />
<Button onClick={() => doSomething()} />
```

**راه‌حل‌ها:**

```jsx
// 1. تعریف مقدار پایدار بیرون از کامپوننت
const STYLE = { color: 'red' };
function Parent() {
  return <Child style={STYLE} />;
}

// 2. استفاده از useMemo
const options = useMemo(() => ({ filter, page }), [filter, page]);

// 3. استفاده از useCallback
const handleClick = useCallback(() => doSomething(id), [id]);
```

این مسئله بیشتر وقتی مهم می‌شود که child با `React.memo` پوشانده شده باشد یا همان مقدار در dependency array هوک‌هایی مثل `useEffect` و `useMemo` استفاده شود.

## 🧠 سوال 124

**شناسه**: react-124  
**عنوان**: اگر state را داخل تابع render به‌روزرسانی کنید چه اتفاقی می‌افتد؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: موارد لبه و تله‌ها

### پاسخ 📄

اگر `setState` را مستقیم داخل بدنه render صدا بزنید، React بلافاصله یک render جدید زمان‌بندی می‌کند و این معمولاً باعث loop بی‌نهایت و کرش برنامه می‌شود.

**به‌روزرسانی بدون شرط — همیشه اشتباه:**

```jsx
function Bad() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // رندر مجدد را فعال می‌کند → setCount دوباره → infinite
  return <div>{count}</div>;
}
```

**الگوی مجاز اما خاص — update شرطی داخل render:**

React در یک حالت خاص، update شرطی داخل render را به‌عنوان جایگزینی برای `getDerivedStateFromProps` کلاس‌ها قبول می‌کند. React این update sync را تشخیص می‌دهد، دوباره render می‌کند و وضعیت میانی را paint نمی‌کند:

```jsx
function List({ items }) {
  const [prevItems, setPrevItems] = useState(items);
  const [selection, setSelection] = useState(null);

  // مجاز: شرطی، بر اساس تغییر prop، به صورت همزمان اجرا می‌شود
  if (items !== prevItems) {
    setPrevItems(items);
    setSelection(null);
  }

  return <ul>{/* ... */}</ul>;
}
```

این الگو فقط وقتی مجاز است که update **شرطی** باشد و بر اساس **prop یا state قبلی** انجام شود. با این حال، تیم React معمولاً `useMemo` برای مقادیر مشتق‌شده یا reset مبتنی بر `key` را تمیزتر می‌داند.

## 🧠 سوال 125

**شناسه**: react-125  
**عنوان**: race condition در data fetching داخل `useEffect` چگونه رخ می‌دهد و چگونه جلوی آن را می‌گیرید؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: موارد لبه و تله‌ها

### پاسخ 📄

Race condition در data fetching زمانی رخ می‌دهد که چند request async هم‌زمان در حال اجرا باشند و پاسخ قدیمی‌تر اما کندتر، نتیجه جدیدتر و درست‌تر را overwrite کند.

**سناریو:**

```jsx
useEffect(() => {
  fetch(`/api/user/${userId}`)
    .then((res) => res.json())
    .then((data) => setUser(data)); // هر کدام دیرتر برسد برنده می‌شود
}, [userId]);
// کلیک‌های کاربر: id=1 (کند) → id=2 (سریع) → نتیجه id=2 نمایش داده می‌شود
// → پاسخ id=1 با تأخیر می‌رسد و با داده‌های قدیمی بازنویسی می‌شود
```

**راه‌حل 1 — فلگ boolean برای نادیده گرفتن پاسخ قدیمی:**

```jsx
useEffect(() => {
  let cancelled = false;

  fetch(`/api/user/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      if (!cancelled) setUser(data);
    });

  return () => {
    cancelled = true;
  }; // پاکسازی: اثر قبلی را بی‌اثر علامت‌گذاری کنید
}, [userId]);
```

**راه‌حل 2 — `AbortController` برای لغو خود request:**

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/user/${userId}`, { signal: controller.signal })
    .then((res) => res.json())
    .then((data) => setUser(data))
    .catch((err) => {
      if (err.name !== 'AbortError') throw err;
    });

  return () => controller.abort();
}, [userId]);
```

**راه حل ۳ — از یک کتابخانه‌ی واکشی داده استفاده کنید:** کوئری TanStack، SWR و هوک `use()` در React، همگی به طور خودکار شرایط رقابتی را مدیریت می‌کنند. این رویکرد پیشنهادی برای تولید است.

**React StrictMode** عمداً افکت‌ها را دو بار در توسعه اجرا می‌کند که بلافاصله با فعال کردن پاکسازی قبل از رسیدن اولین پاسخ، شرایط رقابتی را آشکار می‌کند.

## 🧠 سوال 126

**شناسه**: react-126  
**عنوان**: اشتباه‌های رایج هنگام به‌روزرسانی object و array در state React چیست؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: موارد لبه و تله‌ها

### پاسخ 📄

به‌روزرسانی state در React باید **immutable** باشد. یعنی نباید object یا array قبلی را مستقیم mutate کنید. چون React state را با reference مقایسه می‌کند، mutate کردن همان object قبلی معمولاً re-render ایجاد نمی‌کند.

**Mutation — اشتباه:**

```jsx
// Object
const [user, setUser] = useState({ name: 'Ali', age: 25 });
user.age = 26;
setUser(user); // همان reference قبلی

// Array
const [items, setItems] = useState([1, 2, 3]);
items.push(4);
setItems(items); // همان reference قبلی
```

**الگوهای درست و immutable:**

```jsx
// update یک فیلد object
setUser((prev) => ({ ...prev, age: 26 }));

// اضافه کردن به array
setItems((prev) => [...prev, 4]);

// حذف از array
setItems((prev) => prev.filter((item) => item !== 2));

// update یک آیتم در array
setItems((prev) =>
  prev.map((item) => (item.id === id ? { ...item, done: true } : item)),
);

// update تو‌در‌توی object
setState((prev) => ({
  ...prev,
  address: { ...prev.address, city: 'Tehran' },
}));
```

**برای تودرتوسازی عمیق**، کتابخانه Immer (که توسط Redux Toolkit استفاده می‌شود) به شما امکان می‌دهد کدی به سبک جهش بنویسید که به صورت داخلی به به‌روزرسانی‌های تغییرناپذیر تبدیل می‌شود:

```jsx
import produce from 'immer';

setState(
  produce((draft) => {
    draft.user.address.city = 'Tehran';
  }),
);
```

## 🧠 سوال 127

**شناسه**: react-127  
**عنوان**: خواندن state قدیمی داخل callback های async چگونه باعث باگ می‌شود؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: موارد لبه و تله‌ها

### پاسخ 📄

Callback های async مثل Promise، `setTimeout` یا event listener ها مقداری از state را capture می‌کنند که **در لحظه ساخته شدن callback** وجود داشته، نه در لحظه اجرا شدن آن. اگر قبل از اجرای callback، state عوض شود، callback هنوز مقدار قدیمی را می‌خواند.

**باگ کلاسیک با `setTimeout`:**

```jsx
function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setTimeout(() => {
      // شمارش در زمان کلیک ثبت می‌شود، مثلاً count = 3
      alert(`Count is: ${count}`); // مقدار قدیمی را نشان می‌دهد
    }, 3000);
  }
}
```

**باگ کلاسیک با `async/await`:**

```jsx
async function handleSubmit() {
  const result = await saveToServer(formData);
  // تا زمانی که تابع await به پایان برسد، ممکن است وضعیت کاربر تغییر کرده باشد.
  console.log(user.id); // user ممکن است در این فاصله عوض شده باشد
}
```

**راه‌حل 1 — functional update** وقتی می‌خواهید state را update کنید:

```jsx
setTimeout(() => {
  setCount((prev) => prev + 1);
}, 1000);
```

**راه‌حل 2 — استفاده از ref برای نگه داشتن آخرین مقدار:**

```jsx
const countRef = useRef(count);
useEffect(() => {
  countRef.current = count;
});

setTimeout(() => {
  console.log(countRef.current);
}, 3000);
```

**راه‌حل 3 — خواندن state در لحظه action و پاس دادن آن به callback** به‌جای خواندن آن در شکاف async.

Ref ها escape hatch رایج برای مواقعی هستند که به آخرین مقدار داخل callback های طولانی‌عمر نیاز دارید، بدون اینکه لازم باشد دوباره subscribe شوند.

## 🧠 سوال 128

**شناسه**: react-128  
**عنوان**: قانون ESLint به نام `exhaustive-deps` چیست و چه زمانی، اگر اصلاً لازم باشد، باید آن را suppress کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: موارد لبه و تله‌ها

### پاسخ 📄

`exhaustive-deps` قانونی از `eslint-plugin-react-hooks` است که هشدار می‌دهد اگر در dependency array مربوط به `useEffect`، `useMemo` یا `useCallback` مقداری استفاده شده باشد اما در dependency ها ذکر نشده باشد.

**چیزی که پیدا می‌کند:**

```jsx
const [userId, setUserId] = useState(1);

useEffect(() => {
  fetchUser(userId); // شناسه کاربری (userId) اینجا استفاده شده است
}, []);
// هشدار: هوک React به نام useEffect یک وابستگی از دست رفته دارد: 'userId'
```

این قانون قرارداد اصلی hook ها را enforce می‌کند: هر مقدار reactive که داخل effect استفاده می‌شود باید در dependency array باشد، تا effect هنگام تغییر آن مقدار دوباره اجرا شود. نبود dependency معمولاً یعنی stale closure.

**رفع هشدار — ترجیحاً با بازطراحی، نه suppress کردن:**

```jsx
// راه حل اشتباه: نمایش هشدار را متوقف کنید
// eslint-disable-next-line react-hooks/exhaustive-deps

// راه درست 1: dependency را اضافه کنید
useEffect(() => {
  fetchUser(userId);
}, [userId]);

// راه درست 2: تابع را داخل effect ببرید
useEffect(() => {
  function load() {
    fetchUser(userId);
  }
  load();
}, [userId]);

// راه درست 3: تابع را با useCallback پایدار کنید
const loadUser = useCallback(() => fetchUser(userId), [userId]);
useEffect(() => {
  loadUser();
}, [loadUser]);
```

**چه زمانی suppress کردن واقعاً قابل قبول است** که خیلی هم نادر است:

- وقتی عمداً می‌خواهید effect فقط در mount اجرا شود و مقدار استفاده‌شده واقعاً پایدار است
- هنگام integrate با کتابخانه‌ای که باید فقط یک‌بار initialize شود
- وقتی با استدلال دقیق مطمئن هستید re-run شدن effect مضر است و cleanup مشکل stale بودن را پوشش می‌دهد

حتی در این حالت‌ها هم بهتر است توضیح بدهید:

```jsx
useEffect(() => {
  analytics.init(config);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

Suppress کردن بدون فهم هشدار، یکی از راه‌های رایج وارد کردن باگ stale closure به کد است.

## 🧠 سوال 129

**شناسه**: react-129  
**عنوان**: چگونه چند Context provider را split و compose می‌کنید تا re-render غیرضروری کم شود؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Context API

### پاسخ 📄

هر consumer یک context هر بار که **reference مربوط به value آن context** عوض شود، دوباره رندر می‌شود. اگر state های نامرتبط را در یک context بزرگ بگذارید، تغییر theme باعث re-render شدن مصرف‌کننده‌هایی می‌شود که فقط user را می‌خواهند.

**الگوی اشتباه — یک context غول‌پیکر:**

```jsx
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [cart, setCart] = useState([]);

  // هر تغییر وضعیتی این شیء را دوباره ایجاد می‌کند → همه مصرف‌کنندگان دوباره رندر می‌شوند
  return (
    <AppContext.Provider
      value={{ user, theme, cart, setUser, setTheme, setCart }}
    >
      {children}
    </AppContext.Provider>
  );
}
```

**الگوی درست — یک context برای هر concern:**

```jsx
const UserContext = createContext();
const ThemeContext = createContext();
const CartContext = createContext();

function AppProvider({ children }) {
  return (
    <UserProvider>
      <ThemeProvider>
        <CartProvider>{children}</CartProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
```

**ابزار composer برای تمیز نگه داشتن nesting:**

```jsx
function combineProviders(...providers) {
  return ({ children }) =>
    providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children,
    );
}

const AppProvider = combineProviders(UserProvider, ThemeProvider, CartProvider);
```

**علاوه بر این — جدا کردن state از dispatch:**

```jsx
const CartStateContext = createContext(); // اغلب تغییر می‌کند → فقط رابط کاربری سبد خرید دوباره رندر می‌شود
const CartDispatchContext = createContext(); // پایدار → سازندگان اکشن هرگز دوباره رندر نمی‌شوند

// چون dispatch در useReducer بین render ها پایدار است، می‌توان آن را در context جدا گذاشت تا مصرف‌کننده action ها بی‌دلیل re-render نشوند.
```

این یکی از مهم‌ترین بهینه‌سازی‌ها برای اپ‌هایی است که زیاد از Context استفاده می‌کنند.

## 🧠 سوال 130

**شناسه**: react-130  
**عنوان**: چگونه `useContext` و `useReducer` را به‌عنوان یک راه‌حل سبک برای global state با هم ترکیب می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Context API

### پاسخ 📄

ترکیب `useReducer` با Context الگویی شبیه Redux به شما می‌دهد: state متمرکز، reducer خالص و action هایی که dispatch می‌شوند، بدون نیاز به کتابخانه خارجی.

**راه‌اندازی:**

```jsx
// store/cartContext.jsx
const CartStateContext = createContext();
const CartDispatchContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case 'CLEAR':
      return { items: [] };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
```

**استفاده:**

```jsx
function CartSummary() {
  const { items } = useCartState();
  return <span>{items.length} items</span>;
}

function AddToCartButton({ product }) {
  const dispatch = useCartDispatch();
  return (
    <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}>
      Add to cart
    </button>
  );
}
```

**چه زمانی از این روش استفاده کنیم و چه زمانی سراغ کتابخانه برویم:**

- برای اپ‌های با پیچیدگی متوسط و تیم‌هایی که dependency اضافی نمی‌خواهند، گزینه خوبی است
- برای اپ‌های بزرگ‌تر، debugging پیشرفته، middleware یا flow های async پیچیده، Zustand یا Redux Toolkit مناسب‌ترند

## 🧠 سوال 131

**شناسه**: react-131  
**عنوان**: context selector چیست و چرا React آن را به‌صورت native ندارد؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: Context API

### پاسخ 📄

Context selector به یک کامپوننت اجازه می‌دهد فقط به بخشی از value یک context subscribe شود و فقط زمانی re-render شود که همان بخش تغییر کند؛ شبیه `useSelector` در Redux.

**مشکل فعلی در React:**

```jsx
const store = createContext({ user: null, theme: 'light', cart: [] });

function UserAvatar() {
  const { user } = useContext(store);
  // با تغییر theme یا cart هم دوباره رندر می‌شود
}
```

`useContext` روی **کل value context** مقایسه مرجعی انجام می‌دهد و راه داخلی‌ای برای subscribe شدن فقط به بخشی از آن ندارد.

**چرا React آن را native اضافه نکرده است:**

پیاده‌سازی selector معمولاً به یک مدل subscription یا memoization پیچیده‌تر نیاز دارد. React عمداً Context را ساده نگه داشته و معمولاً توصیه می‌کند به‌جای selector، context ها را split کنید.

**راه‌حل با کتابخانه:**

```jsx
// use-context-selector (کتابخانه انجمن)
import { createContext, useContextSelector } from 'use-context-selector';

const StoreContext = createContext(null);

function UserAvatar() {
  const user = useContextSelector(StoreContext, (ctx) => ctx.user);
  return <img src={user.avatar} />;
  // فقط زمانی که context.user تغییر کند، دوباره رندر می‌شود
}
```

**راه‌حل‌های پیشنهادی React:**

1. split کردن context ها
2. memoize کردن consumer ها با `React.memo`
3. استفاده از کتابخانه‌هایی مثل Zustand که selector-based subscription را به‌صورت طبیعی ارائه می‌دهند

برای subscription های خیلی granular در اپ‌های بزرگ، معمولاً Zustand یا Jotai راه عملی‌تری از زور زدن به Context هستند.

## 🧠 سوال 132

**شناسه**: react-132  
**عنوان**: چگونه یک کامپوننت مصرف‌کننده Context را تست می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Context API

### پاسخ 📄

کامپوننتی که `useContext` صدا می‌زند باید داخل Provider متناظر رندر شود. روش استاندارد این است که یک helper سفارشی برای `render` بسازید که در تست‌ها همه provider های لازم را wrap کند.

**روش پایه — wrap کردن مستقیم با Provider:**

```jsx
import { render, screen } from '@testing-library/react';
import { CartProvider } from './cartContext';
import CartSummary from './CartSummary';

test('shows item count', () => {
  render(
    <CartProvider>
      <CartSummary />
    </CartProvider>,
  );
  expect(screen.getByText('0 items')).toBeInTheDocument();
});
```

**helper سفارشی برای render** که برای پروژه‌های بزرگ‌تر بهتر است:

```jsx
// test-utils.jsx
import { render } from '@testing-library/react';
import { CartProvider } from './cartContext';
import { UserProvider } from './userContext';

function AllProviders({ children }) {
  return (
    <UserProvider>
      <CartProvider>{children}</CartProvider>
    </UserProvider>
  );
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

**استفاده در تست:**

```jsx
import { render, screen } from './test-utils';

test('CartSummary shows 0 items initially', () => {
  render(<CartSummary />);
  expect(screen.getByText('0 items')).toBeInTheDocument();
});
```

**تست با initial state خاص:**

```jsx
render(
  <CartProvider initialState={{ items: [{ id: 1, name: 'Widget' }] }}>
    <CartSummary />
  </CartProvider>,
);
// CartProvider را ملزم به پذیرش یک prop به نام initialState می‌کند.
```

اگر Provider شما از اول prop ای مثل `initialState` بپذیرد، تست‌ها خیلی تمیزتر می‌شوند.

## 🧠 سوال 133

**شناسه**: react-133  
**عنوان**: React Hook Form چگونه کار می‌کند و چرا از controlled component ها سریع‌تر است؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: فرم‌ها و رویدادها

### پاسخ 📄

React Hook Form یا RHF state فرم را با **input های uncontrolled** و `ref` ها درونی مدیریت می‌کند و به همین خاطر از re-render شدن فرم در هر keystroke جلوگیری می‌کند.

**فرم controlled — re-render در هر keystroke:**

```jsx
function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <form>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
    </form>
  );
}
```

**React Hook Form — re-render خیلی کمتر:**

```jsx
import { useForm } from 'react-hook-form';

function RHFForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register('name', { required: 'Name is required' })} />
      {errors.name && <span>{errors.name.message}</span>}

      <input
        {...register('email', {
          required: true,
          pattern: { value: /^\\S+@\\S+$/, message: 'Invalid email' },
        })}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

**`register` چگونه کار می‌کند:** شیئی شامل `name`، `ref`، `onChange` و `onBlur` برمی‌گرداند و RHF به‌جای نگه داشتن هر حرف تایپ‌شده در state React، مقدار input ها را در زمان submit یا validation از طریق ref می‌خواند.

**مقایسه performance:**

- Controlled form: یک re-render برای هر keystroke و هر field
- RHF: معمولاً نزدیک به صفر re-render هنگام تایپ، و re-render فقط در زمان submit یا تغییر error

**اتصال به validation schema با Zod:**

```jsx
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });
```

## 🧠 سوال 134

**شناسه**: react-134  
**عنوان**: field های پویا در فرم، مثل اضافه/حذف سطر، را در React چگونه مدیریت می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: فرم‌ها و رویدادها

### پاسخ 📄

فرم‌های پویا معمولاً یک array در state نگه می‌دارند که هر entry آن معادل یک سطر از فرم است. مهم‌ترین چالش این است که identity هر ردیف پایدار بماند تا React هنگام حذف سطرها DOM اشتباه را reuse نکند.

**روش دستی با `useState`:**

```jsx
function DynamicForm() {
  const [fields, setFields] = useState([
    { id: crypto.randomUUID(), value: '' },
  ]);

  const addField = () =>
    setFields((prev) => [...prev, { id: crypto.randomUUID(), value: '' }]);

  const removeField = (id) =>
    setFields((prev) => prev.filter((f) => f.id !== id));

  const updateField = (id, value) =>
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, value } : f)));

  return (
    <form>
      {fields.map((field) => (
        <div key={field.id}>
          {/* کلید پایدار — هرگز از اندیس آرایه استفاده نکنید */}
          <input
            value={field.value}
            onChange={(e) => updateField(field.id, e.target.value)}
          />
          <button type="button" onClick={() => removeField(field.id)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addField}>
        Add field
      </button>
    </form>
  );
}
```

**با React Hook Form و `useFieldArray`:**

```jsx
import { useForm, useFieldArray } from 'react-hook-form';

function InvoiceForm() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: { items: [{ description: '', amount: 0 }] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          {/* RHF به طور خودکار شناسه‌های پایدار تولید می‌کند */}
          <input {...register(`items.${index}.description`)} />
          <input type="number" {...register(`items.${index}.amount`)} />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ description: '', amount: 0 })}
      >
        Add item
      </button>
    </form>
  );
}
```

`useFieldArray` تولید key پایدار، reorder و هم‌راستا نگه داشتن validation state با field های درست را خودش مدیریت می‌کند.

**قاعده حیاتی:** همیشه از key یکتا و پایدار استفاده کنید و هرگز از index آرایه به‌عنوان key برای field های پویا استفاده نکنید.

## 🧠 سوال 135

**شناسه**: react-135  
**عنوان**: آپلود فایل را در React چگونه مدیریت می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: فرم‌ها و رویدادها

### پاسخ 📄

Input های فایل ذاتاً uncontrolled هستند و به دلایل امنیتی نمی‌توانید `value` آن‌ها را خودتان تنظیم کنید. React آن‌ها را از طریق `onChange` مدیریت می‌کند و فایل‌های انتخاب‌شده از `event.target.files` خوانده می‌شوند.

**آپلود تک‌فایل ساده:**

```jsx
function FileUpload() {
  const [preview, setPreview] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    // ساخت URL محلی برای preview
    setPreview(URL.createObjectURL(file));

    // آپلود با FormData
    const formData = new FormData();
    formData.append('file', file);
    fetch('/api/upload', { method: 'POST', body: formData });
  }

  // برای جلوگیری از نشت حافظه، آدرس شیء را در هنگام پاکسازی لغو کنید
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="preview" width={200} />}
    </div>
  );
}
```

**چند فایل:**

```jsx
<input
  type="file"
  multiple
  onChange={(e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => console.log(file.name, file.size));
  }}
/>
```

**آپلود drag-and-drop:**

```jsx
function DropZone({ onFiles }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        onFiles(Array.from(e.dataTransfer.files));
      }}
      style={{
        border: isDragging ? '2px solid blue' : '2px dashed gray',
        padding: 20,
      }}
    >
      Drop files here
    </div>
  );
}
```

**همراه با React Hook Form:**

```jsx
const { register } = useForm();
// توزیع ثبات روی ورودی — دسترسی به FileList از طریق getValues()
<input type="file" {...register('avatar')} />;
// const file = getValues('avatar')?.[0];
```

همیشه object URL هایی را که با `URL.createObjectURL` ساخته‌اید در cleanup آزاد کنید تا memory leak ایجاد نشود.

## 🧠 سوال 136

**شناسه**: react-136  
**عنوان**: چگونه با `AbortController` هنگام unmount شدن کامپوننت یک fetch را لغو می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Effects و چرخه حیات

### پاسخ 📄

اگر کامپوننت در حالی unmount شود که یک `fetch` هنوز در حال اجرا است، request کامل می‌شود و ممکن است بعداً تلاش کند state را روی کامپوننتی که دیگر وجود ندارد update کند. `AbortController` اجازه می‌دهد خود request شبکه را در cleanup لغو کنید.

**الگوی استاندارد:**

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUser() {
      try {
        const res = await fetch(`/api/users/${userId}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message);
      }
    }

    loadUser();
    return () => controller.abort();
  }, [userId]);

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}
```

**در زمان abort چه می‌شود:** `fetch` Promise را با خطایی از نوع `AbortError` reject می‌کند. شرط `if (err.name === 'AbortError') return` باعث می‌شود لغو عمدی request به‌عنوان خطای واقعی در نظر گرفته نشود.

StrictMode در React در development یک‌بار mount → unmount → mount انجام می‌دهد، بنابراین fetch اول بلافاصله abort می‌شود. این رفتار عمدی است و برای تست cleanup درست مفید است.

**جایگزین — فلگ boolean `cancelled`:**

```jsx
useEffect(() => {
  let cancelled = false;
  fetch(`/api/users/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      if (!cancelled) setUser(data);
    });
  return () => {
    cancelled = true;
  };
}, [userId]);
```

با این حال `AbortController` بهتر است، چون خود request را لغو می‌کند و فقط جلوی `setState` را نمی‌گیرد.

## 🧠 سوال 137

**شناسه**: react-137  
**عنوان**: مدل ذهنی synchronization برای `useEffect` چیست و چه تفاوتی با lifecycle thinking دارد؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Effects و چرخه حیات

### پاسخ 📄

مدل ذهنی lifecycle می‌پرسد: «این کد را چه زمانی اجرا کنم؟» و شما را به فکر mount، update و unmount می‌برد.

مدل ذهنی synchronization می‌پرسد: «این کامپوننت باید با چه سیستم خارجی همگام بماند؟» و این همان مدلی است که مستندات React برای `useEffect` پیشنهاد می‌کنند.

**Lifecycle thinking** که می‌تواند به باگ منجر شود:

```jsx
useEffect(() => {
  // "می‌خواهم این برنامه روی mount اجرا شود"
  subscribeToChat(roomId);
  return () => unsubscribeFromChat(roomId);
}, []); // اگر roomId عوض شود subscription به‌روز نمی‌شود
```

**Synchronization thinking** که درست‌تر است:

```jsx
useEffect(() => {
  // "این کامپوننت همیشه باید در roomId فعلی مشترک باشد"
  subscribeToChat(roomId);
  return () => unsubscribeFromChat(roomId);
}, [roomId]); // هر بار roomId عوض شود دوباره sync می‌شود
```

**سه سوال اصلی این مدل:**

1. چه سیستم خارجی‌ای باید sync شود؟
2. چه value هایی وضعیت sync را تعیین می‌کنند؟
3. چگونه این sync را undo می‌کنید؟

**نگاشت بین دو مدل:**

| Lifecycle thinking       | Synchronization thinking              |
| ------------------------ | ------------------------------------- |
| «در mount اجرا شود»      | «با `[]` sync بماند»                  |
| «با تغییر prop اجرا شود» | «با تغییر dependency دوباره sync شود» |
| «در unmount اجرا شود»    | «cleanup sync را متوقف کند»           |

هر `useEffect` باید تقریباً این‌طور خوانده شود: «[سیستم خارجی] را با [این value ها] همگام نگه دار.» اگر نتوانید این جمله را برای effect خود بنویسید، شاید آن کد اصلاً باید داخل event handler باشد نه effect.

## 🧠 سوال 138

**شناسه**: react-138  
**عنوان**: چگونه lifecycle method های class component را به hook ها مهاجرت می‌دهید؟  
**سطح دشواری**: آسان  
**دسته‌بندی**: Effects و چرخه حیات

### پاسخ 📄

برای بیشتر lifecycle method های کلاس، معادل function-based وجود دارد، هرچند مدل ذهنی از event-based به synchronization-based تغییر می‌کند.

**`componentDidMount` → `useEffect` با `[]`:**

```jsx
// Class
componentDidMount() {
  this.subscription = subscribe(this.props.id);
}

// Hooks
useEffect(() => {
  const sub = subscribe(id);
  return () => sub.unsubscribe();
}, []);
```

**`componentDidUpdate` → `useEffect` با dependency:**

```jsx
// Class
componentDidUpdate(prevProps) {
  if (prevProps.id !== this.props.id) {
    this.refetch(this.props.id);
  }
}

// Hooks
useEffect(() => {
  refetch(id);
}, [id]);
```

**`componentWillUnmount` → cleanup function:**

```jsx
// Class
componentWillUnmount() {
  this.subscription.remove();
}

// Hooks
useEffect(() => {
  const sub = subscribe(id);
  return () => sub.remove();
}, [id]);
```

**`shouldComponentUpdate` → `React.memo`:**

```jsx
// Class
shouldComponentUpdate(nextProps) {
  return nextProps.id !== this.props.id;
}

// Hooks / function component
const MyComponent = React.memo(
  function MyComponent({ id }) { return <div>{id}</div>; },
  (prev, next) => prev.id === next.id, // مقایسه سفارشی اختیاری
);
```

**`getDerivedStateFromProps` → update شرطی state هنگام render:**

```jsx
const [prevProp, setPrevProp] = useState(prop);
if (prevProp !== prop) {
  setPrevProp(prop);
  setDerivedState(compute(prop));
}
```

**`getSnapshotBeforeUpdate` → `useLayoutEffect` همراه با ref:**

```jsx
const snapshot = useRef(null);
useLayoutEffect(() => {
  snapshot.current = listRef.current.scrollTop;
});
```

## 🧠 سوال 139

**شناسه**: react-139  
**عنوان**: قواعد مرز Client/Server و دستور `"use client"` چیست؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Server Components

### پاسخ 📄

در مدل Server Components، **همه کامپوننت‌ها به‌صورت پیش‌فرض Server Component هستند**. اگر در ابتدای فایل `"use client"` بنویسید، آن فایل و هر چیزی که از آن import شود به Client Component تبدیل می‌شود و داخل باندل جاوااسکریپت مرورگر قرار می‌گیرد.

**قواعد این مرز:**

```jsx
// ServerComponent.jsx — بدون directive، فقط روی سرور اجرا می‌شود
async function ServerComponent() {
  const data = await db.query('SELECT * FROM products');
  return <ClientComponent items={data} />;
}
```

```jsx
'use client';

import { useState } from 'react';

export function ClientComponent({ items }) {
  const [selected, setSelected] = useState(null);
  return (
    <ul>
      {items.map((i) => (
        <li key={i.id}>{i.name}</li>
      ))}
    </ul>
  );
}
```

**Server Component ها چه کارهایی می‌توانند بکنند که Client Component ها نمی‌توانند:**

- استفاده از `async/await` در سطح خود کامپوننت
- دسترسی مستقیم به دیتابیس، فایل‌سیستم و API های سروری
- import کردن پکیج‌های server-only بدون افزایش باندل مرورگر
- استفاده امن از secret ها و environment variable ها

**Client Component ها چه کارهایی می‌توانند بکنند که Server Component ها نمی‌توانند:**

- استفاده از hook ها مثل `useState` و `useEffect`
- استفاده از API های مرورگر مثل `window` و `document`
- اتصال event handler

**عبور دادن داده از این مرز — فقط prop های serializable:**

```jsx
// ✅ درست
<ClientComponent title="Hello" count={42} items={[1, 2, 3]} />

// ❌ غلط — function serializable نیست
<ClientComponent onClick={() => console.log('hi')} />
```

**الگوی composition با children:**

```jsx
// ServerPage.jsx
export default async function ServerPage() {
  const data = await fetchData();
  return (
    <ClientWrapper>
      {/* کامپوننت کلاینت */}
      <ServerList items={data} />
    </ClientWrapper>
  );
}
```

اگر Server Component را به‌عنوان `children` به یک Client Component بدهید، آن بخش روی سرور رندر می‌شود و به شکل payload مخصوص RSC ارسال می‌شود، نه اینکه روی کلاینت دوباره از نو رندر شود.

## 🧠 سوال 140

**شناسه**: react-140  
**عنوان**: React Server Components داده را چگونه نسبت به client component ها fetch می‌کنند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Server Components

### پاسخ 📄

Server Component ها می‌توانند داده را **مستقیم و async** در سطح خود کامپوننت fetch کنند؛ بدون `useEffect`، بدون boilerplate مربوط به loading state، و بدون hydration سمت کلاینت برای خود fetch.

**fetch داده در Client Component** قبل از RSC:

```jsx
'use client';
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
//این روش JS بیشتری به کلاینت می‌فرستد و معمولاً باعث loading flash و waterfall می‌شود.
```

**fetch داده در Server Component:**

```jsx
// بدون "use client" — این یک Server Component است
async function ProductList() {
  const products = await db.query('SELECT * FROM products WHERE active = true');
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

در این حالت برای fetch داده، JavaScript اضافی به کلاینت ارسال نمی‌شود و نیازی به loading state محلی هم نیست، مگر اینکه خودتان با Suspense آن را مدل کنید.

**Parallel fetching داخل Server Component:**

```jsx
async function Dashboard() {
  const [user, orders, analytics] = await Promise.all([
    fetchUser(),
    fetchOrders(),
    fetchAnalytics(),
  ]);

  return (
    <>
      <UserCard user={user} />
      <OrderList orders={orders} />
      <AnalyticsChart data={analytics} />
    </>
  );
}
```

**تفاوت‌های کلیدی:**

|                       | Client Components | Server Components       |
| --------------------- | ----------------- | ----------------------- |
| محل fetch داده        | مرورگر            | سرور                    |
| نیاز به loading state | بله               | نه، یا از طریق Suspense |
| امنیت secret/token    | خیر               | بله                     |
| افزودن به JS bundle   | بله               | خیر                     |
| امکان استفاده از hook | بله               | خیر                     |
| دسترسی مستقیم به DB   | خیر               | بله                     |

**Caching در Next.js:** تابع `fetch` در Server Component ها با قابلیت‌هایی مثل caching خودکار، deduplication در همان render و revalidation ارائه می‌شود.

## 🧠 سوال 141

**شناسه**: react-141  
**عنوان**: چگونه از یک Server Component به یک Client Component داده پاس می‌دهید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: Server Components

### پاسخ 📄

تنها راه پاس دادن داده از Server Component به Client Component از طریق **props** است — و این props باید **serializable** باشند، چون از مرز سرور/کلاینت با یک فرمت wire شبیه JSON عبور می‌کنند.

**Serializable و قابل ارسال به‌عنوان prop:**

- رشته، عدد، boolean، `null` و `undefined`
- object و array ساده که از مقادیر بالا تشکیل شده‌اند
- آبجکت‌های `Date` که در اغلب framework ها به رشته ISO تبدیل می‌شوند

**غیر serializable و غیرقابل ارسال به‌عنوان prop:**

- function ها
- instance های کلاس
- `Map`، `Set`، `Symbol` و `RegExp`
- React element هایی که روی سرور ساخته شده‌اند و event handler دارند

**الگوی درست:**

```jsx
// page.jsx — Server Component
import ProductCard from './ProductCard'; // "use client"

export default async function ProductPage({ params }) {
  const product = await db.products.findById(params.id);

  return (
    <ProductCard
      id={product.id} // ✅ number
      name={product.name} // ✅ string
      price={product.price} // ✅ number
      tags={product.tags} // ✅ plain array
      // onBuy={handleBuy}   // ❌ function — serializable نیست
    />
  );
}
```

```jsx
'use client';
export function ProductCard({ id, name, price, tags }) {
  const [added, setAdded] = useState(false);
  return (
    <div>
      <h2>
        {name} — ${price}
      </h2>
      <button
        onClick={() => {
          addToCart(id);
          setAdded(true);
        }}
      >
        {added ? 'Added!' : 'Add to cart'}
      </button>
    </div>
  );
}
```

**الگوی composition با `children` — پاس دادن Server Component به Client Component:**

```jsx
// layout.jsx — Server Component
export default async function Layout() {
  const nav = await fetchNavItems();
  return (
    <ClientShell>
      {/* کامپوننت کلاینت */}
      <ServerNav items={nav} /> {/* کامپوننت سرور به عنوان فرزند ارسال شد ✅ */}
    </ClientShell>
  );
}
```

`ServerNav` روی سرور رندر می‌شود و به‌عنوان یک React element از پیش محاسبه‌شده در payload مربوط به RSC به `ClientShell` می‌رسد. وقتی `ClientShell` روی کلاینت دوباره رندر شود، `ServerNav` از نو روی کلاینت رندر نمی‌شود.

## 🧠 سوال 142

**شناسه**: react-142  
**عنوان**: تفاوت server state و client state چیست و چه ابزارهایی هرکدام را مدیریت می‌کنند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: مدیریت State

### پاسخ 📄

**Client state** داده‌ای است که در مرورگر به‌وجود می‌آید و مالک آن خود اپلیکیشن است؛ مثل باز یا بسته بودن modal، tab انتخاب‌شده، مقدار input فرم یا ترجیح theme.

**Server state** داده‌ای است که روی یک سرور راه دور زندگی می‌کند؛ مثل users، products، orders و messages. این داده async است، می‌تواند stale شود، ممکن است بدون اطلاع اپ تغییر کند و برای خواندن یا نوشتن به request شبکه نیاز دارد.

**چرا این تفاوت مهم است:**

اگر server state را با `useState` و `useEffect` مدیریت کنید، باید caching، deduplication، background refetch، invalidation، loading/error state، optimistic update و pagination را خودتان دستی بسازید. کتابخانه‌های مخصوص این کارها را آماده می‌دهند.

| موضوع                 | Client State | Server State   |
| --------------------- | ------------ | -------------- |
| منبع حقیقت            | حافظه مرورگر | سرور / دیتابیس |
| async است؟            | نه           | بله            |
| ممکن است stale شود؟   | نه           | بله            |
| به caching نیاز دارد؟ | نه           | بله            |
| بین tab ها مشترک است؟ | معمولاً نه   | بله            |

**ابزارهای مناسب هرکدام:**

```jsx
// CLIENT STATE — own it completely
const [isOpen, setIsOpen] = useState(false); // useState
const { theme } = useThemeStore(); // Zustand
dispatch({ type: 'TOGGLE_MENU' }); // Redux Toolkit

// SERVER STATE — async, cached, synchronized
const { data, isLoading } = useQuery({
  // TanStack Query
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 60_000, // قبل از بازیابی پس‌زمینه، به مدت ۶۰ ثانیه آن را تازه در نظر بگیرید
});

const { data } = useSWR('/api/user', fetcher); // SWR — جایگزین ساده‌تر
```

**قاعده کلی:** اگر داده روی سرور وجود دارد و ممکن است بدون اطلاع اپ شما عوض شود، server state است. از `useState` فقط برای داده‌ای استفاده کنید که خود اپلیکیشن به‌صورت محلی مالک آن است.

## 🧠 سوال 143

**شناسه**: react-143  
**عنوان**: normalized state چیست و چرا در اپلیکیشن‌های بزرگ React مهم است؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: مدیریت State

### پاسخ 📄

Normalized state یعنی هر entity فقط **یک‌بار** در یک lookup table تخت و مبتنی بر ID ذخیره شود و رابطه‌ها با آرایه‌ای از ID ها نمایش داده شوند، نه با object های تو‌در‌تو. این همان مدل دیتابیس رابطه‌ای است که به state فرانت‌اند آورده می‌شود.

**State غیر normalized یا nested — مشکل‌دار:**

```js
const state = {
  posts: [
    {
      id: 1,
      title: 'Hello',
      author: { id: 42, name: 'Ali' }, // در هر پست تکرار شده است
      comments: [{ id: 101, text: 'Great!', author: { id: 42, name: 'Ali' } }],
    },
    {
      id: 2,
      title: 'World',
      author: { id: 42, name: 'Ali' }, // همان نویسنده - دوباره کپی شده است
    },
  ],
};
// برای به‌روزرسانی نام علی: باید هر رخداد تودرتو را پیدا و وصله‌بندی کند
```

**State normalized — هر entity فقط یک‌بار:**

```js
const state = {
  users: { 42: { id: 42, name: 'Ali' } },
  posts: {
    1: { id: 1, title: 'Hello', authorId: 42, commentIds: [101] },
    2: { id: 2, title: 'World', authorId: 42 },
  },
  comments: { 101: { id: 101, text: 'Great!', authorId: 42 } },
  postIds: [1, 2], // لیست مرتب برای رندر کردن
};
// برای به‌روزرسانی نام علی: update users[42].name — یک عملیات، فوراً سازگار
```

**مزیت‌ها:**

- **Single source of truth**
- lookup سریع با ID
- عدم تکرار داده و در نتیجه consistency بهتر

**پیاده‌سازی با `createEntityAdapter` در Redux Toolkit:**

```js
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter();
// تولید خودکار: selectAll، selectById، selectIds، addOne، updateOne، removeOne…

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    userAdded: usersAdapter.addOne,
    userUpdated: usersAdapter.updateOne,
    userRemoved: usersAdapter.removeOne,
  },
});
```

**بیشتر چه زمانی اهمیت دارد:** در اپ‌هایی با entity های زیاد، update بلادرنگ، داده مشترک در چند بخش UI و رابطه‌های پیچیده. برای CRUD های ساده شاید overhead آن ارزش نداشته باشد.

## 🧠 سوال 144

**شناسه**: react-144  
**عنوان**: مدل atomic در Jotai چه تفاوتی با Redux و Zustand دارد؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: مدیریت State

### پاسخ 📄

Jotai از یک مدل **atomic** استفاده می‌کند؛ یعنی state به واحدهای کوچک و مستقل به نام atom شکسته می‌شود. کامپوننت‌ها فقط به atom های مورد نیاز خود subscribe می‌شوند و state مشتق‌شده با atom های computed ساخته می‌شود.

**Jotai — atomic و bottom-up:**

```jsx
import { atom, useAtom } from 'jotai';

const countAtom = atom(0);
const userAtom = atom(null);

// اتم مشتق شده — به طور خودکار از اتم‌های دیگر محاسبه می‌شود
const doubleCountAtom = atom((get) => get(countAtom) * 2);

// اتم ناهمگام - کامپوننت را تا زمان حل شدن به حالت تعلیق در می‌آورد
const userDataAtom = atom(async (get) => {
  const user = get(userAtom);
  return user ? await fetchUser(user.id) : null;
});

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  // فقط زمانی که countAtom تغییر کند، دوباره رندر می‌شود — نه زمانی که userAtom تغییر کند
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

**Redux Toolkit — متمرکز و top-down:**

```js
// One store with a root reducer combining slices
const store = configureStore({
  reducer: { counter: counterReducer, user: userReducer },
});
const count = useSelector((state) => state.counter.value); // memoized selector
```

**Zustand — store-based و مینیمال:**

```js
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
const count = useStore((state) => state.count);
```

**مقایسه:**

| مورد           | Jotai                             | Redux Toolkit                                            | Zustand                                       |
| -------------- | --------------------------------- | -------------------------------------------------------- | --------------------------------------------- |
| مدل            | Atom ها                           | Store واحد                                               | Store بر اساس concern                         |
| boilerplate    | کم                                | متوسط                                                    | کم                                            |
| DevTools       | محدود                             | عالی                                                     | خوب                                           |
| state مشتق‌شده | Computed atom                     | Selector                                                 | Selector / computed                           |
| async state    | Async atom                        | RTK Query / thunk                                        | middleware یا بیرونی                          |
| Best for       | حالت اشتراکی جزئی و محلی کامپوننت | تیم‌های بزرگ، برنامه‌های پیچیده، اشکال‌زدایی سفر در زمان | حالت سراسری ساده، برنامه‌های کوچک تا متوسط ​​ |

Jotai شبیه `useState` ای است که می‌تواند بین چند کامپوننت share شود؛ مناسب وقتی است که reactivity بین چند بخش لازم دارید اما نمی‌خواهید سراغ ceremony زیاد یک global store بروید.

## 🧠 سوال 145

**شناسه**: react-145  
**عنوان**: hook های React در داخل چگونه با linked list پیاده‌سازی می‌شوند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: داخلی‌های React

### پاسخ 📄

React وضعیت هر hook مربوط به یک کامپوننت را در یک **linked list** از object های hook ذخیره می‌کند که به Fiber همان کامپوننت وصل شده‌اند. هویت هر hook فقط با **موقعیتش در این لیست** مشخص می‌شود.

**ساختار ساده‌شده یک hook object:**

```js
{
  memoizedState: <current value>,
  queue: <update queue>,
  next: <pointer to next hook>
}
```

**در mount اول** React node ها را می‌سازد و به هم وصل می‌کند:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Ali');
  const ref = useRef(null);
}
// fiber.memoizedState → node1 → node2 → node3
```

**در re-render** React همین لیست را به‌ترتیب طی می‌کند:

```js
// شبه‌کد useState در حین رندر مجدد
function useState(initialValue) {
  const hook = currentHook; // node فعلی را بخوانید
  currentHook = currentHook.next; // اشاره‌گر را به جلو می‌برد

  // اعمال هرگونه به‌روزرسانی در صف انتظار
  const pending = hook.queue.pending;
  if (pending) {
    hook.memoizedState = pending.action(hook.memoizedState);
  }

  return [hook.memoizedState, hook.queue.dispatch];
}
```

**چرا ترتیب فراخوانی تنها هویت hook است:**

React برای hook ها نام یا key جداگانه ندارد. اگر یک hook جا بیفتد یا وسط راه اضافه شود، همه hook های بعدی node اشتباه را می‌خوانند و state به‌کلی به‌هم می‌ریزد.

`useEffect`، `useMemo` و `useCallback` هم در همین linked list node های خودشان را دارند و dependency ها و cleanup را همان‌جا نگه می‌دارند.

## 🧠 سوال 146

**شناسه**: react-146  
**عنوان**: چرا hook ها باید در هر render با همان ترتیب فراخوانی شوند و اگر نشوند چه چیزی در داخل React خراب می‌شود؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: داخلی‌های React

### پاسخ 📄

قوانین hook ها، مثل اینکه داخل شرط یا حلقه hook صدا نزنید، به این خاطر وجود دارند که React هر hook را با **موقعیت آن در linked list** شناسایی می‌کند. اگر ترتیب عوض شود، نگاشت بین فراخوانی hook و state ذخیره‌شده به‌هم می‌ریزد.

**نمونه‌ای از خرابی با hook شرطی:**

```jsx
function UserProfile({ isLoggedIn }) {
  if (isLoggedIn) {
    const [name, setName] = useState(''); // Hook 1 — only when logged in
  }
  const [age, setAge] = useState(0); // Hook 2 when logged in, Hook 1 when not
  const ref = useRef(null); // Hook 3 when logged in, Hook 2 when not
}
```

**render اول** با `isLoggedIn = true` سه node دارد:

```text
node1 = { memoizedState: '' }   ← name
node2 = { memoizedState: 0 }    ← age
node3 = { memoizedState: {current:null} } ← ref
```

**render بعدی** با `isLoggedIn = false` فقط دو hook صدا زده می‌شود، اما linked list قبلی هنوز سه node دارد:

```text
Call 1 → node1 را می‌خواند اما انتظار age را دارد
Call 2 → node2 را می‌خواند اما انتظار ref را دارد
node3 هرگز خوانده نمی‌شود - ref یتیم می‌شود.
```

در نتیجه هر hook بعد از hook حذف‌شده، state اشتباه می‌گیرد.

در development، React این موضوع را تشخیص می‌دهد و خطایی شبیه این می‌دهد:

```text
React has detected a change in the order of Hooks called by UserProfile.
```

**الگوی درست — شرط را داخل hook ببرید:**

```jsx
function UserProfile({ isLoggedIn }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (isLoggedIn) loadUserData();
  }, [isLoggedIn]);
}
```

## 🧠 سوال 147

**شناسه**: react-147  
**عنوان**: Suspense در داخل چگونه کار می‌کند — مکانیزم «throw کردن Promise» چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: داخلی‌های React

### پاسخ 📄

Suspense با پروتکلی کار می‌کند که در آن یک کامپوننت وقتی هنوز آماده رندر نیست، **یک Promise یا thenable را throw می‌کند**. React این throw را در نزدیک‌ترین مرز `<Suspense>` می‌گیرد، fallback را رندر می‌کند و بعد از resolve شدن Promise دوباره render را امتحان می‌کند.

**پروتکل ساده‌شده با cache:**

```js
function createResource(promise) {
  let status = 'pending';
  let result;

  promise.then(
    (data) => {
      status = 'success';
      result = data;
    },
    (err) => {
      status = 'error';
      result = err;
    },
  );

  return {
    read() {
      if (status === 'pending') throw promise; // ← THROW a Promise
      if (status === 'error') throw result; // ← THROW an Error
      return result; // ← return data when ready
    },
  };
}
```

**کامپوننتی که از resource استفاده می‌کند:**

```jsx
const userResource = createResource(fetchUser(1));

function UserCard() {
  const user = userResource.read(); // throws Promise → fallback shown
  return <div>{user.name}</div>; // runs after promise resolves
}

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <UserCard />
    </Suspense>
  );
}
```

**React در داخل چه می‌کند:**

1. render `UserCard` را شروع می‌کند
2. `read()` یک Promise throw می‌کند
3. React آن را داخل render loop می‌گیرد
4. به بالا در tree می‌رود تا نزدیک‌ترین `<Suspense>` را پیدا کند
5. fallback آن مرز را نشان می‌دهد
6. روی Promise یک `.then()` می‌گذارد
7. بعد از resolve شدن Promise دوباره از همان مرز render را امتحان می‌کند
8. این بار `read()` داده واقعی را برمی‌گرداند

**در React 19، hook `use()`** API رسمی برای خواندن Promise در render است:

```jsx
import { use } from 'react';

function UserCard({ userPromise }) {
  const user = use(userPromise); // در صورت عدم حل شدن، به حالت تعلیق در می‌آید
  return <div>{user.name}</div>;
}
```

همیشه بهتر است `<Suspense>` را همراه با `<ErrorBoundary>` استفاده کنید، چون اگر Promise reject شود، خطا به Error Boundary می‌رود نه به خود Suspense.

## 🧠 سوال 148

**شناسه**: react-148  
**عنوان**: چگونه یک renderer مینیمال شبیه React را از صفر می‌سازید؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: داخلی‌های React

### پاسخ 📄

ساختن یک renderer مینیمال کمک می‌کند بفهمیم `createElement`، reconciliation و commit phase چطور با هم کار می‌کنند. نکته اصلی این است که `React.createElement` فقط یک درخت object جاوااسکریپتی می‌سازد و renderer باید آن را به DOM واقعی تبدیل کند.

**مرحله 1 — `createElement`:**

```js
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child),
      ),
    },
  };
}

function createTextElement(text) {
  return { type: 'TEXT_ELEMENT', props: { nodeValue: text, children: [] } };
}
```

**مرحله 2 — `createDom`:**

```js
function createDom(fiber) {
  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);

  Object.keys(fiber.props)
    .filter((key) => key !== 'children')
    .forEach((name) => {
      dom[name] = fiber.props[name];
    });

  return dom;
}
```

**مرحله 3 — `reconcileChildren`:**

```js
function reconcileChildren(wipFiber, elements) {
  let oldFiber = wipFiber.alternate?.child;

  elements.forEach((element, index) => {
    const sameType = oldFiber && element.type === oldFiber.type;

    const newFiber = sameType
      ? { ...oldFiber, props: element.props, effectTag: 'UPDATE' } // reuse DOM node
      : {
          type: element.type,
          props: element.props,
          dom: null,
          effectTag: 'PLACEMENT',
        };

    if (oldFiber) oldFiber = oldFiber.sibling;
    // به درخت فیبر متصل می‌شود (لینک‌های فرزند / خواهر و برادر برای اختصار حذف شده‌اند)
  });
}
```

**مرحله 4 — `commitWork`:**

```js
function commitWork(fiber) {
  if (!fiber) return;
  const parent = fiber.parent.dom;

  if (fiber.effectTag === 'PLACEMENT') parent.appendChild(fiber.dom);
  else if (fiber.effectTag === 'UPDATE')
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  else if (fiber.effectTag === 'DELETION') parent.removeChild(fiber.dom);

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
```

**مدل دو مرحله‌ای:**

| Render phase                | Commit phase               |
| --------------------------- | -------------------------- |
| خالص و قابل قطع             | دارای side effect و sync   |
| ساخت work-in-progress tree  | اعمال همه mutation های DOM |
| بدون تغییر DOM              | اجرای effect های layout    |
| قابل مکث/از سرگیری (همزمان) | قابل قطع نیست              |

**نکته اصلی:** React محاسبه را از side effect جدا می‌کند تا render phase بتواند با ورود update های مهم‌تر قطع یا از سر گرفته شود. کتابخانه‌هایی مثل `react-three-fiber` یا `react-pdf` هم از همین نقطه گسترش استفاده می‌کنند.

## 🧠 سوال 149

**شناسه**: react-149  
**عنوان**: چه چیزهایی در React باعث re-render می‌شوند و چگونه از re-render غیرضروری جلوگیری می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: رفتار رندرینگ

### پاسخ 📄

یک کامپوننت React در این حالت‌ها re-render می‌شود:

**1. وقتی state خودش تغییر کند** مثل `useState` یا `useReducer`

```jsx
const [count, setCount] = useState(0);
setCount(1); // رندر مجدد را فعال می‌کند
```

**2. وقتی parent آن re-render شود**
به‌صورت پیش‌فرض، هر بار parent رندر شود، همه child ها هم رندر می‌شوند؛ حتی اگر prop ها تغییر نکرده باشند.

**3. وقتی value مربوط به یک Context مصرف‌شده تغییر کند**
هر کامپوننتی که `useContext` صدا بزند با تغییر value مربوطه re-render می‌شود.

**4. وقتی prop `key` عوض شود**
در این حالت React کامپوننت را unmount و remount می‌کند.

**جلوگیری از re-render غیرضروری:**

| ابزار              | کاری که انجام می‌دهد                     |
| ------------------ | ---------------------------------------- |
| `React.memo`       | جلوگیری از render مجدد با prop های یکسان |
| `useMemo`          | جلوگیری از محاسبه مجدد مقدار مشتق‌شده    |
| `useCallback`      | جلوگیری از ساخته شدن function جدید       |
| split کردن Context | کاهش re-render consumer های نامرتبط      |
| state colocation   | محدود کردن محدوده re-render              |

**قاعده طلایی:** قبل از بهینه‌سازی profile بگیرید. `React.memo` سربار دارد و اگر بی‌جا استفاده شود، فایده‌ای ندارد.

```jsx
// memo فقط در صورتی مفید است که props از نظر ارجاعی پایدار باشند
const Child = React.memo(({ onClick }) => (
  <button onClick={onClick}>Click</button>
));

function Parent() {
  // بدون useCallback، تابع onClick در هر رندر یک تابع جدید است → memo نادیده گرفته می‌شود
  const onClick = useCallback(() => console.log('click'), []);
  return <Child onClick={onClick} />;
}
```

## 🧠 سوال 150

**شناسه**: react-150  
**عنوان**: خط لوله رندر React را از تغییر state تا painted pixel ها توضیح بده.  
**سطح دشواری**: متوسط  
**دسته‌بندی**: رفتار رندرینگ

### پاسخ 📄

Pipeline رندر React سه فاز اصلی دارد:

**فاز 1 — Trigger**
چیزی مثل `setState`، `dispatch` یا `root.render()` باعث زمان‌بندی render می‌شود. React فوراً DOM را تغییر نمی‌دهد، بلکه work را از طریق scheduler داخلی برنامه‌ریزی می‌کند.

**فاز 2 — Render** که خالص و قابل قطع است
React تابع کامپوننت‌ها را صدا می‌زند و یک درخت جدید از React element ها می‌سازد. در این مرحله هیچ mutation ای روی DOM واقعی انجام نمی‌شود.

```jsx
// React این را فراخوانی می‌کند و خروجی را جمع‌آوری می‌کند
function Counter({ count }) {
  return <div>{count}</div>; // React element، یک node DOM واقعی نیست
}
```

در concurrent rendering این فاز می‌تواند pause یا resume شود.

**فاز 3 — Commit** که دارای side effect و sync است
React درخت جدید را با قبلی diff می‌کند و تغییرات را در چند زیرمرحله اعمال می‌کند:

1. `beforeMutation` — خواندن DOM و cleanup مربوط به `useLayoutEffect`
2. `mutation` — اعمال insert، update و delete روی DOM
3. `layout` — اجرای sync مربوط به `useLayoutEffect`
4. `passive effects` — زمان‌بندی `useEffect` بعد از paint

```text
Trigger → Render (pure) → Reconcile (diff) → Commit (DOM) → Paint → useEffect
                                                   ↑
                                            useLayoutEffect (sync, before paint)
```

**نکته کلیدی:** `useLayoutEffect` قبل از paint اجرا می‌شود، اما `useEffect` بعد از paint. به همین دلیل اندازه‌گیری DOM در `useLayoutEffect` از flicker جلوگیری می‌کند.

`flushSync` می‌تواند commit را sync و فوری کند، ولی باید به‌ندرت استفاده شود.

## 🧠 سوال 151

**شناسه**: react-151  
**عنوان**: concurrent scheduler در React 18 چگونه کار می‌کند و priority lane ها چه هستند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: رفتار رندرینگ

### پاسخ 📄

Concurrent rendering در React 18 با استفاده از **priority lane** ها امکان interruptible شدن render را می‌دهد. scheduler lane های با اولویت بالاتر را زودتر پردازش می‌کند و می‌تواند work کم‌اولویت را pause یا discard کند.

**اولویت lane ها از بالا به پایین:**

| Lane                  | مثال                 | رفتار              |
| --------------------- | -------------------- | ------------------ |
| `SyncLane`            | `flushSync`          | کاملاً sync        |
| `InputContinuousLane` | scroll، drag         | اولویت بالا        |
| `DefaultLane`         | `setState` معمولی    | batched            |
| `TransitionLane`      | `startTransition`    | قابل قطع           |
| `IdleLane`            | آماده‌سازی offscreen | فقط در زمان بیکاری |

**`startTransition` چگونه از lane استفاده می‌کند:**

```jsx
import { startTransition, useState } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  function handleChange(e) {
    setQuery(e.target.value); // اولویت بالاتر

    startTransition(() => {
      setResults(search(e.target.value)); // lane کم‌اولویت‌تر
    });
  }
}
```

**interruptibility چگونه عمل می‌کند:**

1. React شروع به render کردن transition می‌کند
2. کاربر دوباره input می‌دهد
3. React کار نیمه‌تمام transition را کنار می‌گذارد
4. update فوری را اول انجام می‌دهد
5. transition را از نو با state جدید شروع می‌کند

**`useDeferredValue`** یک نسخه عقب‌افتاده از یک value می‌سازد که در lane پایین‌تری به‌روزرسانی می‌شود:

```jsx
const deferredQuery = useDeferredValue(query);
```

**فرق `useTransition` و `useDeferredValue`:**

- `useTransition` برای mark کردن setter یا update به‌عنوان کم‌اولویت
- `useDeferredValue` برای lag دادن به یک value مصرف‌شده توسط کامپوننت گران

Scheduler برای دقت زمانی بهتر از `MessageChannel` استفاده می‌کند، نه `setTimeout`.

## 🧠 سوال 152

**شناسه**: react-152  
**عنوان**: چرا React.StrictMode در development تابع render و effect را دوبار صدا می‌زند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: رفتار رندرینگ

### پاسخ 📄

StrictMode در development بعضی توابع را **دوبار** اجرا می‌کند تا باگ‌های پنهان مربوط به توابع impure یا effect های بدون cleanup درست آشکار شوند.

**چه چیزهایی دوبار اجرا می‌شوند:**

- بدنه function component
- initializer های `useState` و `useReducer`
- محاسبات `useMemo`
- `useEffect` که به‌صورت setup → cleanup → setup اجرا می‌شود

**چه باگ‌هایی را پیدا می‌کند:**

**1. render impure:**

```jsx
// اشکالی که توسط رندر دوگانه StrictMode آشکار شد:
function Counter() {
  const [items, setItems] = useState([]);

  function addItem() {
    items.push('new'); // MUTATION — first render mutates, second render sees already-mutated array
    setItems(items);
  }

  return <button onClick={addItem}>Add</button>;
}
```

**2. effect بدون cleanup درست:**

```jsx
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id); // StrictMode verifies cleanup actually works
}, []);
// In dev: setup → cleanup → setup (verifies cleanup)
// In prod: setup once
```

**این رفتار عمدی است، نه باگ.** هدف آن شبیه‌سازی قابلیت‌های آینده مثل remount شدن کامپوننت‌ها در offscreen rendering است.

**اگر واقعاً initialization باید فقط یک‌بار globally انجام شود:**

```jsx
// پرچم سطح ماژول — صرف نظر از StrictMode، یک بار اجرا می‌شود
let initialized = false;

useEffect(() => {
  if (initialized) return;
  initialized = true;
  analytics.init();
}, []);
```

اما این الگو باید با احتیاط استفاده شود و معمولاً نشانه این است که آن initialization بهتر است بیرون از React قرار بگیرد.

## 🧠 سوال 153

**شناسه**: react-153  
**عنوان**: hook `useId` چیست و چگونه mismatch های hydration در SSR را حل می‌کند؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: SSR / Hydration

### پاسخ 📄

`useId` در React 18 یک **شناسه یکتا و پایدار** می‌سازد که بین render سمت سرور و hydration سمت کلاینت یکسان می‌ماند. این hook نوعی از hydration mismatch را که از ID های تصادفی ایجاد می‌شود حل می‌کند.

**مشکل:**

```jsx
// BROKEN in SSR
function FormField({ label }) {
  const id = Math.random().toString(36).slice(2); // در هر render متفاوت
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </>
  );
}
// رندرهای سرور: id="xk3m2"
// رندرهای کلاینت: id="ab9p1" → هشدار عدم تطابق هیدراتاسیون
```

سرور و کلاینت ID های متفاوتی تولید می‌کنند و hydration mismatch رخ می‌دهد.

**راه‌حل با `useId`:**

```jsx
import { useId } from 'react';

function FormField({ label }) {
  const id = useId(); // ":r0:", ":r1:", etc. — same on server and client
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </>
  );
}
```

**چگونه کار می‌کند:** React ID ها را بر اساس موقعیت کامپوننت در درخت به‌صورت deterministic تولید می‌کند. اگر ساختار tree بین سرور و کلاینت یکسان باشد، ID هم یکسان می‌شود.

**ساخت چند ID از یک `useId`:**

```jsx
function PasswordField() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id + '-input'}>Password</label>
      <input id={id + '-input'} type="password" />
      <p id={id + '-hint'}>Must be 8+ characters</p>
      <input aria-describedby={id + '-hint'} />
    </div>
  );
}
```

**چه زمانی نباید از `useId` استفاده کرد:**

- برای `key` آیتم‌های لیست
- برای class name های CSS
- برای هر چیزی که باید human-readable باشد

`suppressHydrationWarning` راه‌حل آخر برای جاهایی است که عمداً خروجی سرور و کلاینت متفاوت است، مثل timestamp:

```jsx
<time suppressHydrationWarning>{new Date().toLocaleString()}</time>
```

در استفاده از آن صرفه‌جویی کنید - این کار هشدار را بی‌صدا می‌کند اما عدم تطابق اساسی را برطرف نمی‌کند. React همچنان عنصر را در کلاینت دوباره رندر می‌کند.

## 🧠 سوال 154

**شناسه**: react-154  
**عنوان**: استراتژی‌های data fetching در Next.js App Router چیست و هرکدام را چه زمانی استفاده می‌کنید؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: SSR / Hydration

### پاسخ 📄

Next.js App Router که روی React Server Components ساخته شده، data fetching را از طریق `fetch` بومی توسعه‌داده‌شده با دستورهای caching یکپارچه می‌کند.

**Static — در زمان build:**

```jsx
async function Page() {
  // به طور نامحدود ذخیره می‌شود — یک بار در زمان ساخت دریافت می‌شود
  const data = await fetch('https://api.example.com/posts', {
    cache: 'force-cache', // default in App Router
  });
  return <Posts data={await data.json()} />;
}
```

**Dynamic — در هر request:**

```jsx
async function Page() {
  // هرگز ذخیره نمی‌شود - داده‌ها در هر درخواست تازه می‌شوند
  const data = await fetch('https://api.example.com/user', {
    cache: 'no-store',
  });
  return <Profile data={await data.json()} />;
}
```

**ISR — revalidate بر اساس زمان:**

```jsx
async function Page() {
  const data = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 }, // حداکثر هر 60 ثانیه یک بار دوباره واکشی شود
  });
  return <Posts data={await data.json()} />;
}
```

**On-demand revalidation بعد از mutation:**

```jsx
// در یک اکشن سرور یا کنترل‌کننده‌ی مسیر:
import { revalidatePath, revalidateTag } from 'next/cache';

revalidatePath('/blog'); // از طریق مسیر باطل شود
revalidateTag('posts'); // با برچسب باطل شود
// Tag usage: fetch('...', { next: { tags: ['posts'] } })
```

**درخت تصمیم:**

```text
داده برای همه کاربران یکسان و کم‌تغییر؟ → force-cache
داده زمان‌محور تغییر می‌کند؟ → revalidate: N
داده بعد از action کاربر عوض می‌شود؟ → revalidateTag
داده مخصوص کاربر یا real-time است؟ → no-store
فقط سمت کلاینت لازم است؟ → SWR / TanStack Query
```

**`generateStaticParams`:**

```jsx
// app/blog/[slug]/page.jsx
export async function generateStaticParams() {
  const posts = await fetchAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}
```

**Deduplication خودکار:** اگر چند Server Component در یک render همان URL را fetch کنند، معمولاً فقط یک request واقعی ارسال می‌شود.

## 🧠 سوال 155

**شناسه**: react-155  
**عنوان**: چگونه API های مخصوص مرورگر مثل `window`، `localStorage` و `document` را در یک اپ SSR به‌صورت امن استفاده می‌کنید؟  
**سطح دشواری**: متوسط  
**دسته‌بندی**: SSR / Hydration

### پاسخ 📄

Browser global ها مثل `window`، `document`، `localStorage` و `navigator` در محیط Node.js وجود ندارند. اگر هنگام SSR به آن‌ها دسترسی بگیرید، `ReferenceError` خواهید گرفت. قانون اصلی این است: **کد مخصوص مرورگر باید فقط بعد از hydration اجرا شود.**

**الگوی 1 — `useEffect`:**

```jsx
function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // فقط روی کلاینت، پس از هیدراتاسیون اجرا می‌شود
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next); // همچنین کنترل کننده رویداد درون safe نیز وجود دارد
  };

  return <button onClick={toggle}>{theme}</button>;
}
```

**الگوی 2 — guard با `typeof window`:**

```jsx
function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  return localStorage.getItem('theme') ?? 'light';
}
```

**الگوی 3 — import پویا با `ssr: false` در Next.js:**

```jsx
import dynamic from 'next/dynamic';

// کامپوننت هرگز روی سرور رندر نشد
const Map = dynamic(() => import('./Map'), { ssr: false });
```

برای کامپوننت‌هایی مناسب است که ذاتاً فقط در مرورگر کار می‌کنند.

**الگوی 4 — `useSyncExternalStore` با server snapshot:**

```jsx
function useWindowSize() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener('resize', cb);
      return () => window.removeEventListener('resize', cb);
    },
    () => ({ width: window.innerWidth, height: window.innerHeight }),
    () => ({ width: 0, height: 0 }),
  );
}
```

آرگومان سوم همان server snapshot است و جلوی mismatch اولیه را می‌گیرد.

**اشتباه رایج — استفاده از مقدار مرورگر در initializer مربوط به state:**

```jsx
// خراب: روی سرور اجرا می‌شود، خطای مرجع
const [width, setWidth] = useState(window.innerWidth);

// رفع شد: مقداردهی اولیه‌ی تنبل - فقط روی کلاینت اجرا می‌شود
const [width, setWidth] = useState(() =>
  typeof window !== 'undefined' ? window.innerWidth : 0,
);
```

## 🧠 سوال 156

**شناسه**: react-156  
**عنوان**: selective hydration همراه با Suspense در React 18 چگونه کار می‌کند؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: SSR / Hydration

### پاسخ 📄

Selective hydration در React 18 اجازه می‌دهد بخش‌های مختلف صفحه **به‌صورت مستقل و بر اساس اولویت** hydrate شوند، نه اینکه کل صفحه تا بارگیری همه JS منتظر بماند.

**مشکل در SSR مدل قدیمی‌تر:**

```text
Server → sends complete HTML
Client → downloads ALL JS → hydrates EVERYTHING at once → page becomes interactive
(مسدود کردن: اگر JS بزرگ باشد، تا زمانی که همه چیز تمام نشود، هیچ چیز تعاملی نیست)
```

**React 18 با مرزهای Suspense:**

```jsx
<Suspense fallback={<HeaderSkeleton />}>
  <Header /> {/* hydrates independently */}
</Suspense>

<Suspense fallback={<MainSkeleton />}>
  <Main /> {/* hydrates independently */}
</Suspense>

<Suspense fallback={<CommentsSkeleton />}>
  <Comments /> {/* lowest priority — hydrates last */}
</Suspense>
```

هر مرز `<Suspense>` یک **واحد hydration مستقل** می‌شود. React HTML هر بخش را به‌مرور stream می‌کند و هر قسمت را وقتی chunk JS خودش آماده شد hydrate می‌کند، بدون اینکه بقیه را block کند.

**افزایش اولویت بر اساس تعامل کاربر:**
اگر کاربر روی بخشی که هنوز hydrate نشده کلیک کند، React همان بخش را در اولویت قرار می‌دهد:

```text
User clicks Comments
→ React pauses hydrating Main
→ Hydrates Comments first
→ Click event fires
→ Resumes Main
```

**API سمت سرور:**

```jsx
// Node.js server
import { renderToPipeableStream } from 'react-dom/server';

const { pipe } = renderToPipeableStream(<App />, {
  bootstrapScripts: ['/main.js'],
  onShellReady() {
    res.statusCode = 200;
    pipe(res); // بلافاصله شروع به پخش می‌کند، بدون اینکه منتظر تمام داده‌ها بماند
  },
});
```

**سه مشکلی که React 18 حل می‌کند:**

| مشکل                                                  | React 17 | React 18          |
| ----------------------------------------------------- | -------- | ----------------- |
| نیاز به آماده بودن همه data قبل از HTML               | بله      | نه، stream می‌شود |
| نیاز به لود شدن همه JS قبل از hydration               | بله      | نه، مستقل         |
| نیاز به کامل شدن همه hydration قبل از interactive شدن | بله      | نه، اولویت‌دار    |

در Next.js App Router، این کار خودکار است - هر مرز `<Suspense>` یک مرز جریان است و هیدراسیون انتخابی به طور پیش‌فرض فعال است.

## 🧠 سوال 157

**شناسه**: react-157  
**عنوان**: authentication را در SSR چگونه مدیریت می‌کنید — الگوهای cookie-based auth و middleware چیست؟  
**سطح دشواری**: سخت  
**دسته‌بندی**: SSR / Hydration

### پاسخ 📄

Authentication در SSR یعنی باید credential را روی سرور بخوانید تا محتوای شخصی‌سازی‌شده را درست رندر کنید و در عین حال token ها امن بمانند.

**چرا cookie و نه `localStorage`:**
`localStorage` فقط در مرورگر وجود دارد و در SSR در دسترس نیست. اما cookie های `httpOnly` با هر HTTP request فرستاده می‌شوند، از جمله request مربوط به SSR، و به همین دلیل انتخاب استاندارد برای auth در SSR هستند.

**خواندن cookie در Server Component های Next.js App Router:**

```jsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) redirect('/login');

  const user = await validateToken(token); // اعتبارسنجی سمت سرور
  return <Dashboard user={user} />;
}
```

**Middleware در Next.js — محافظت از route ها در لبه شبکه:**

```jsx
// middleware.ts - قبل از هر درخواست، در لبه CDN اجرا می‌شود
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('auth-token')?.value;

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
};
```

**تنظیمات امن cookie:**

| Flag                         | هدف                                   |
| ---------------------------- | ------------------------------------- |
| `httpOnly`                   | جاوااسکریپت مرورگر به آن دسترسی ندارد |
| `Secure`                     | فقط روی HTTPS                         |
| `SameSite=Lax`               | کاهش ریسک CSRF                        |
| expiry کوتاه + refresh token | محدود کردن اثر سرقت token             |

**جلوگیری از hydration mismatch در auth state:**

```jsx
// مشکل: سرور Guest رندر می‌کند، کلاینت user واقعی را می‌خواند
function Header() {
  const user = getClientSideUser(); // از localStorage می‌خواند — روی سرور در دسترس نیست
  return <div>{user ? user.name : 'Guest'}</div>;
}

// راه‌حل: user را از سرور بگیرید و به props بدهید
async function Layout({ children }) {
  const user = await getServerUser(); // از کوکی httpOnly روی سرور می‌خواند
  return (
    <>
      <Header user={user} /> {/* مقدار یکسان در سرور و کلاینت */}
      {children}
    </>
  );
}
```

**Token refresh:** بهتر است منطق refresh را در middleware یا لایه سروری قرار دهید تا قبل از اجرای Server Component ها، cookie به‌روزرسانی شده باشد و state احراز هویت تازه بماند.
