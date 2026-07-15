---
topic: react
language: en
version: 4.2
---

# React Interview Questions

## Available Categories

- React Basics
- JSX & Rendering
- Components
- Props & State
- Hooks
- Effects & Lifecycle
- Forms & Events
- Context API
- State Management
- Performance Optimization
- Rendering Behavior
- Concurrent React
- Server Components
- SSR / Hydration
- Architecture & Patterns
- React Internals
- Edge Cases & Pitfalls

## Difficulty Levels

- Easy
- Medium
- Hard

## 🧠 Question 1

**ID**: react-001  
**Title**: What is React and what problem does it solve?  
**Difficulty**: Easy  
**Category**: React Basics

### Answer 📄

React is an open-source JavaScript library developed by Meta (Facebook) for building user interfaces, primarily single-page applications.

It addresses several core frontend challenges:

- **Keeping the UI in sync with state** — React makes the view a pure function of state. When state changes, React re-renders the relevant parts of the UI automatically.
- **Efficient DOM updates** — React uses a Virtual DOM to minimize expensive real DOM operations by computing the minimal set of changes needed.
- **Reusable UI components** — the component model lets developers compose complex UIs from small, isolated, and testable pieces.

React is intentionally focused only on the view layer. Routing, data fetching, and state management are handled by the surrounding ecosystem (React Router, TanStack Query, Zustand, Redux, etc.).

Because React is a library rather than a framework, it integrates easily into existing applications and gives teams full control over architectural decisions.

## 🧠 Question 2

**ID**: react-002  
**Title**: What is the Virtual DOM and how does React use it?  
**Difficulty**: Easy  
**Category**: React Basics

### Answer 📄

The Virtual DOM (VDOM) is a lightweight in-memory representation of the real DOM tree. It is a plain JavaScript object tree that describes the UI structure.

When a component's state or props change, React:

1. **Renders** a new Virtual DOM tree by calling the component's render function.
2. **Diffs** the new tree against the previous one (reconciliation) to find what changed.
3. **Patches** only the changed nodes into the real DOM (commit phase).

This process is called **reconciliation** and it keeps DOM mutations minimal, because touching the real DOM is significantly more expensive than comparing JavaScript objects.

React does not re-render the whole page on every state change — only the subtree that depends on the changed state is re-evaluated.

```jsx
// When count changes, React re-renders Counter,
// computes the minimal DOM update, and applies only that.
function Counter() {
  const [count, setCount] = React.useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

**Important:** the VDOM is an implementation detail. React Native, for example, uses React's reconciler without a browser DOM at all.

## 🧠 Question 3

**ID**: react-003  
**Title**: What is JSX and how does it work under the hood?  
**Difficulty**: Easy  
**Category**: JSX & Rendering

### Answer 📄

JSX (JavaScript XML) is a syntax extension that lets you write HTML-like markup inside JavaScript. It is not valid JavaScript on its own — it must be compiled by a transpiler (Babel or the TypeScript compiler) before the browser can run it.

Each JSX element compiles to a `React.createElement()` call (classic runtime) or a `jsx()` call from `react/jsx-runtime` (automatic runtime, React 17+):

```jsx
// JSX
const element = <h1 className="title">Hello, {name}</h1>;

// Compiled (automatic runtime — React 17+)
import { jsx as _jsx } from 'react/jsx-runtime';
const element = _jsx('h1', { className: 'title', children: `Hello, ${name}` });
```

The result is a plain JavaScript object — a **React element** (vnode):

```js
{
  type: 'h1',
  props: { className: 'title', children: 'Hello, Alice' },
  key: null,
  ref: null,
}
```

**Key JSX rules:**

- A component must return a single root element (use `<>...</>` fragments for multiple roots).
- `class` becomes `className`; `for` becomes `htmlFor`.
- All tags must be closed: `<img />`, `<br />`.
- JavaScript expressions go inside `{}`.
- Component names must start with a capital letter to distinguish from HTML tags.

## 🧠 Question 4

**ID**: react-004  
**Title**: What are functional components in React?  
**Difficulty**: Easy  
**Category**: Components

### Answer 📄

A functional component is a JavaScript function that accepts a `props` object and returns JSX (React elements). It is the standard way to write components in modern React.

```jsx
function Greeting({ name, role = 'user' }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Role: {role}</p>
    </div>
  );
}

// Arrow function syntax — equally valid
const Greeting = ({ name, role = 'user' }) => (
  <div>
    <h1>Hello, {name}!</h1>
    <p>Role: {role}</p>
  </div>
);
```

Before React 16.8, functional components were "stateless" — state and lifecycle required class components. Hooks changed this: functional components can now use state (`useState`), side effects (`useEffect`), context, refs, and any custom hook.

**Why functional components are preferred:**

- Simpler mental model — no `this`, no lifecycle method naming conventions.
- Easier to test — pure functions are predictable.
- Better TypeScript inference.
- All React features (Concurrent Mode, Server Components) are designed around functions.

Class components still work but are no longer the recommended approach.

## 🧠 Question 5

**ID**: react-005  
**Title**: What are props in React and how do they work?  
**Difficulty**: Easy  
**Category**: Props & State

### Answer 📄

Props (short for "properties") are the mechanism for passing data from a parent component to a child component. They are read-only — a component must never modify its own props.

```jsx
// Parent passes data via props
function App() {
  return <UserCard name="Alice" age={30} isAdmin={true} />;
}

// Child receives props as a plain object
function UserCard({ name, age, isAdmin }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {isAdmin && <span>Admin</span>}
    </div>
  );
}
```

**Prop types:**

- Strings: `name="Alice"` (no braces needed)
- Anything else (numbers, booleans, arrays, objects, functions): `age={30}`
- Omitted boolean: `<Button disabled />` is equivalent to `disabled={true}`

**`children` prop** — content between opening and closing tags is passed as `props.children`:

```jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

// Usage
<Card title="Info">
  <p>Some content</p>
</Card>;
```

**Spreading props** — use the spread operator to forward all props:

```jsx
function Button({ className, ...rest }) {
  return <button className={`btn ${className}`} {...rest} />;
}
```

## 🧠 Question 6

**ID**: react-006  
**Title**: What is state in React and how is it different from props?  
**Difficulty**: Easy  
**Category**: Props & State

### Answer 📄

State is mutable data managed within a component. When state changes, React re-renders the component to reflect the new state. Unlike props (owned by the parent), state is owned and controlled by the component itself.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // initial value: 0

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
    </div>
  );
}
```

**Props vs State:**

|                     | Props                        | State                    |
| ------------------- | ---------------------------- | ------------------------ |
| Owner               | Parent component             | The component itself     |
| Mutable?            | No (read-only)               | Yes (via setter)         |
| Triggers re-render? | Yes (when parent re-renders) | Yes (when setter called) |
| Passed via          | Function argument            | `useState` hook          |

**Functional update form** — pass a function to the setter when the new value depends on the previous value. This is essential for correctness inside async callbacks or batched updates:

```js
setCount((prev) => prev + 1); // safe — always reads latest value
setCount(count + 1); // potentially stale in concurrent mode
```

**State is local and encapsulated** — sibling components do not share state directly. To share state, lift it to the nearest common ancestor.

## 🧠 Question 7

**ID**: react-007  
**Title**: How does React handle events?  
**Difficulty**: Easy  
**Category**: Forms & Events

### Answer 📄

React uses a **synthetic event system** that wraps the browser's native DOM events. React attaches a single event listener at the root of the React tree (not on each element), and dispatches events to the correct handlers through event delegation.

```jsx
function Form() {
  function handleSubmit(event) {
    event.preventDefault(); // works just like native preventDefault
    console.log('submitted');
  }

  function handleChange(event) {
    console.log(event.target.value); // SyntheticEvent — same API as native
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
    </form>
  );
}
```

**Key differences from native HTML events:**

- React event names are camelCase: `onClick`, `onChange`, `onSubmit` (not `onclick`).
- You pass a function reference, not a string: `onClick={handleClick}` not `onclick="handleClick()"`.
- Synthetic events are pooled in older React (≤ 16) and reused — accessing them asynchronously required `event.persist()`. In React 17+ this pooling was removed.

**Event propagation** works the same as native events (bubbles, capture phase). You can stop propagation with `event.stopPropagation()`.

React 17 changed the root of event delegation from `document` to the React root container, which makes micro-frontend composition with multiple React versions safer.

## 🧠 Question 8

**ID**: react-008  
**Title**: How does conditional rendering work in React?  
**Difficulty**: Easy  
**Category**: JSX & Rendering

### Answer 📄

React has no special template directives for conditionals — you use plain JavaScript expressions inside JSX.

**Ternary operator** — the most common pattern:

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

**Short-circuit `&&`** — renders the right side only when the left side is truthy:

```jsx
{
  isLoggedIn && <Dashboard />;
}
```

**Pitfall:** if the left side is `0`, React renders `0` in the DOM (because `0` is falsy but also a valid renderable value). Use `!!` or a ternary to be safe:

```jsx
{
  items.length > 0 && <List items={items} />;
} // safe — boolean
{
  items.length && <List items={items} />;
} // dangerous — renders "0" if empty
```

**Early return pattern:**

```jsx
function Profile({ user }) {
  if (!user) return <p>Loading...</p>;
  return <div>{user.name}</div>;
}
```

**`null` to render nothing:**

```jsx
function Banner({ visible, message }) {
  if (!visible) return null;
  return <div className="banner">{message}</div>;
}
```

## 🧠 Question 9

**ID**: react-009  
**Title**: How do you render lists in React and why is the `key` prop important?  
**Difficulty**: Easy  
**Category**: JSX & Rendering

### Answer 📄

Lists in React are rendered by mapping over an array and returning JSX for each item. Each element in the list must have a unique `key` prop.

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

**Why `key` matters:**

When React reconciles a list, it uses `key` to match elements between the previous and new render. Without stable keys, React falls back to index-based matching, which causes incorrect behavior when items are reordered, inserted, or deleted:

- Component state (like an input's typed value) gets attached to the wrong element.
- Unnecessary DOM mutations occur.
- Animations and focus are disrupted.

**Rules for keys:**

- Must be **unique among siblings** (not globally unique).
- Must be **stable** — the same item should have the same key across renders.
- Should be a **stable identifier** from your data (database ID, UUID). Avoid using array index unless the list is static and never reordered.

```jsx
// Bad — index as key breaks with sorting/filtering
{
  items.map((item, index) => <Item key={index} {...item} />);
}

// Good — stable ID from data
{
  items.map((item) => <Item key={item.id} {...item} />);
}
```

## 🧠 Question 10

**ID**: react-010  
**Title**: What are controlled and uncontrolled components in React?  
**Difficulty**: Easy  
**Category**: Forms & Events

### Answer 📄

**Controlled components** — form elements whose value is driven by React state. The component is the single source of truth, and every keystroke goes through a state update.

```jsx
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value} // React controls the value
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

**Uncontrolled components** — form elements that manage their own internal state. React reads the value via a `ref` only when needed (e.g., on form submit).

```jsx
function UncontrolledInput() {
  const inputRef = useRef(null);

  function handleSubmit() {
    console.log(inputRef.current.value); // read on demand
  }

  return (
    <>
      <input ref={inputRef} defaultValue="initial" />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
```

**When to use each:**

|                                           | Controlled             | Uncontrolled            |
| ----------------------------------------- | ---------------------- | ----------------------- |
| Validation on every keystroke             | ✅ Natural             | ❌ Requires ref polling |
| Instant feedback (format, disable submit) | ✅                     | ❌                      |
| File inputs                               | ❌ Can't control value | ✅ Must use ref         |
| Simple forms, third-party integrations    | ❌ More boilerplate    | ✅ Less code            |

Most React forms use controlled components. Libraries like React Hook Form take a hybrid approach (uncontrolled under the hood for performance, controlled-like API for validation).

## 🧠 Question 11

**ID**: react-011  
**Title**: What is a React Fragment and when should you use it?  
**Difficulty**: Easy  
**Category**: JSX & Rendering

### Answer 📄

A Fragment lets a component return multiple elements without adding an extra DOM node as a wrapper.

```jsx
// Without Fragment — adds an unnecessary <div>
function Columns() {
  return (
    <div>
      <td>Name</td>
      <td>Age</td>
    </div>
  ); // invalid HTML — <div> inside <tr>
}

// With Fragment — no extra DOM node
function Columns() {
  return (
    <>
      <td>Name</td>
      <td>Age</td>
    </>
  );
}
```

**Two syntaxes:**

```jsx
// Shorthand — cannot accept props
<>...</>;

// Explicit — required when you need a key (e.g., mapping a list)
function List({ items }) {
  return items.map((item) => (
    <React.Fragment key={item.id}>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </React.Fragment>
  ));
}
```

**Use cases:**

- Returning multiple table cells (`<td>`) or rows (`<tr>`) from a component.
- Grouping elements returned from a component without polluting the DOM.
- Rendering a list where each item produces multiple sibling elements.

Fragments produce no DOM output, so they have no impact on styling or layout.

## 🧠 Question 12

**ID**: react-012  
**Title**: What is the difference between class components and functional components?  
**Difficulty**: Easy  
**Category**: Components

### Answer 📄

Both types can produce the same output, but they differ significantly in syntax, API, and how they manage state and lifecycle.

**Class components** use ES6 classes, have `this`, lifecycle methods, and `this.state`:

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

**Functional components** use hooks:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  });

  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

**Key differences:**

|                       | Class Components               | Functional Components             |
| --------------------- | ------------------------------ | --------------------------------- |
| State                 | `this.state` + `this.setState` | `useState`                        |
| Lifecycle             | `componentDidMount`, etc.      | `useEffect`                       |
| `this` binding        | Required                       | Not needed                        |
| Code reuse            | Mixins (problematic)           | Custom hooks (clean)              |
| Error boundaries      | Supported                      | Not yet (as of React 18)          |
| React future features | Not prioritized                | All new features target functions |

Class components are fully supported but are considered legacy. All new React APIs (Concurrent Mode, Server Components) are designed around functions.

## 🧠 Question 13

**ID**: react-013  
**Title**: What is reconciliation in React?  
**Difficulty**: Medium  
**Category**: Rendering Behavior

### Answer 📄

Reconciliation is the process React uses to determine what changed in the UI between renders and update the DOM accordingly.

When state or props change, React calls the component's render function and gets a new virtual DOM tree. It then **diffs** this new tree against the previous one using a heuristic algorithm with two key assumptions:

1. **Different element types produce different trees.** If the root type changes (e.g., `<div>` → `<span>`), React tears down the entire old subtree and builds a new one from scratch — including unmounting all child components.

2. **`key` identifies stable elements across renders.** When diffing lists, React uses the `key` prop to match elements between renders. Elements with the same key are treated as the same element (updated in place); missing/new keys trigger unmount/mount.

```jsx
// React assumes the root element changed — unmounts Foo, mounts Bar
{
  condition ? <Foo /> : <Bar />;
}

// React sees same root type — updates Foo's props (more efficient)
{
  condition ? <Foo color="red" /> : <Foo color="blue" />;
}
```

**Why this matters for performance:** React's reconciler avoids expensive full-tree comparisons by applying these heuristics. The result is O(n) tree diffing rather than the naive O(n³) algorithm.

The reconciler is separate from the renderer. React DOM, React Native, and React Three Fiber all share the same reconciler but target different output environments.

## 🧠 Question 14

**ID**: react-014  
**Title**: What is prop drilling and how do you solve it?  
**Difficulty**: Easy  
**Category**: Props & State

### Answer 📄

Prop drilling occurs when data must be passed through several layers of intermediate components that do not need the data themselves — they only pass it further down.

```jsx
// Prop drilling — theme must be threaded through App → Layout → Sidebar → Button
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

**Problems it causes:**

- Intermediate components become tightly coupled to data they don't use.
- Refactoring is painful — adding a prop requires updating every layer.
- Components are harder to reuse in isolation.

**Solutions:**

1. **Context API** — provide data at a high level and consume it anywhere in the tree without threading:

```jsx
const ThemeContext = createContext('light');
// Wrap the tree: <ThemeContext.Provider value={theme}>
// Consume anywhere: const theme = useContext(ThemeContext);
```

2. **State management libraries** (Zustand, Redux, Jotai) — global store accessible from any component.

3. **Component composition** — pass components as children or props to avoid drilling data:

```jsx
function Layout({ children }) {
  return <div>{children}</div>;
}
// The parent controls what goes inside, so no drilling needed
```

## 🧠 Question 15

**ID**: react-015  
**Title**: What is the `StrictMode` component and what does it do?  
**Difficulty**: Medium  
**Category**: React Basics

### Answer 📄

`<React.StrictMode>` is a development-only wrapper that activates additional warnings and behaviors to help you identify potential issues in your application.

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

**What StrictMode does (development only — no production impact):**

1. **Double-invokes render functions, state initializers, and reducers** — to detect side effects in functions that should be pure. If your component has accidental side effects (e.g., incrementing a counter in render), they become visible.

2. **Mounts → unmounts → remounts every component once** (React 18+) — to verify that effects have proper cleanup. This simulates what happens when components are preserved/restored (e.g., navigating back in a React Native screen or future tab-suspend behavior).

3. **Warns about deprecated APIs** — legacy lifecycle methods (`componentWillMount`, etc.), legacy string refs, `findDOMNode`, etc.

4. **Detects accidental mutations of state** — helps surface bugs where state is mutated directly.

StrictMode applies to the component subtree it wraps, so you can enable it selectively for specific parts of the app.

## 🧠 Question 16

**ID**: react-016  
**Title**: What is `React.memo` and when does it help?  
**Difficulty**: Medium  
**Category**: Performance Optimization

### Answer 📄

`React.memo` is a higher-order component that memoizes a functional component's render output. If the component's props have not changed (using shallow equality), React skips re-rendering and reuses the last rendered output.

```jsx
const UserCard = React.memo(function UserCard({ name, age }) {
  console.log('rendering UserCard');
  return (
    <div>
      {name} — {age}
    </div>
  );
});

// If parent re-renders but name and age haven't changed,
// UserCard is NOT re-rendered.
```

**When it helps:**

- The parent re-renders frequently (e.g., it manages a fast-changing state that the child doesn't use).
- The component is expensive to render (complex computations or many child nodes).
- The component receives stable props (primitives or memoized objects/functions).

**When it does NOT help (or hurts):**

- Props change on every render anyway — the shallow comparison adds overhead with no benefit.
- Props are objects or functions created inline in the parent — a new reference fails the equality check:

```jsx
// This breaks memo — new object reference on every parent render
<UserCard style={{ color: 'red' }} onClick={() => doSomething()} />;

// Fix: memoize objects and functions in the parent
const style = useMemo(() => ({ color: 'red' }), []);
const handleClick = useCallback(() => doSomething(), []);
<UserCard style={style} onClick={handleClick} />;
```

**Custom comparison** — pass a second argument for fine-grained control:

```jsx
React.memo(MyComponent, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id; // true = skip re-render
});
```

## 🧠 Question 17

**ID**: react-017  
**Title**: What is the `useEffect` hook and how does the dependency array work?  
**Difficulty**: Medium  
**Category**: Effects & Lifecycle

### Answer 📄

`useEffect` lets you synchronize a component with an external system (DOM API, network request, subscription, timer) after React has committed the render to the DOM.

```jsx
useEffect(() => {
  // Side effect — runs after every render by default
  document.title = `You clicked ${count} times`;
});
```

**Dependency array controls when the effect runs:**

```jsx
// No dependency array — runs after EVERY render
useEffect(() => { ... });

// Empty array — runs ONCE after the initial mount only
useEffect(() => { ... }, []);

// With dependencies — runs after mount AND whenever count or userId changes
useEffect(() => {
  fetchUser(userId);
}, [userId]);
```

**Cleanup function** — returned from the effect. Runs before the effect re-runs and when the component unmounts:

```jsx
useEffect(() => {
  const subscription = subscribe(userId, onMessage);
  return () => subscription.unsubscribe(); // cleanup
}, [userId]);
```

**React 18 + StrictMode** — effects are mounted, cleaned up, and remounted once in development to surface cleanup bugs. This is intentional.

**Rules:**

- Never conditionally call `useEffect` — hooks must be called in the same order every render.
- Include all values read inside the effect in the dependency array (enforced by the `react-hooks/exhaustive-deps` ESLint rule).
- Do not use `useEffect` for event handlers — those belong directly on elements.

## 🧠 Question 18

**ID**: react-018  
**Title**: What is `useState` and how does state updating work?  
**Difficulty**: Easy  
**Category**: Hooks

### Answer 📄

`useState` is the fundamental hook for adding local state to a functional component. It returns a pair: the current state value and a setter function.

```jsx
const [state, setState] = useState(initialValue);
```

**State updates are asynchronous and batched** — calling `setState` does not immediately change `state`. React schedules a re-render and applies all state updates from the same event handler in a single batch:

```jsx
function handleClick() {
  setCount((c) => c + 1);
  setCount((c) => c + 1);
  // React batches these — count increases by 2 after one re-render
}
```

**Functional update form** — pass a function when the new value depends on the previous:

```jsx
setState((prev) => ({ ...prev, name: 'Alice' }));
```

Always use this form when updating inside async callbacks, `useEffect`, or event handlers where the state value may be stale.

**State initialization** — for expensive computations, pass a function to avoid running it on every render:

```jsx
// Bad — runs expensiveCalc() on every render even though only used once
const [value, setValue] = useState(expensiveCalc());

// Good — runs once on initial mount only
const [value, setValue] = useState(() => expensiveCalc());
```

**Objects and arrays** — React does not merge object state automatically (unlike `this.setState` in class components). You must spread manually:

```jsx
setState((prev) => ({ ...prev, age: 31 })); // correct
setState({ age: 31 }); // wrong — discards other fields
```

## 🧠 Question 19

**ID**: react-019  
**Title**: What is `useRef` and when should you use it?  
**Difficulty**: Medium  
**Category**: Hooks

### Answer 📄

`useRef` returns a mutable `ref` object with a `.current` property that persists across renders without triggering a re-render when changed. It has two primary use cases.

**1. Accessing DOM elements directly:**

```jsx
function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} />;
}
```

**2. Storing mutable values that should NOT trigger re-renders:**

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

**Key characteristics:**

- Changing `ref.current` does **not** trigger a re-render — unlike `useState`.
- The ref object is the same object across all renders (referentially stable).
- Useful for: storing previous values, animation frame IDs, WebSocket instances, canvas contexts.

**`useRef` vs `useState`:**

|                                | `useRef`                    | `useState` |
| ------------------------------ | --------------------------- | ---------- |
| Triggers re-render?            | No                          | Yes        |
| Value persists across renders? | Yes                         | Yes        |
| Access                         | `.current`                  | Direct     |
| Use for                        | DOM access, mutable storage | UI state   |

## 🧠 Question 20

**ID**: react-020  
**Title**: What is `useMemo` and when should you use it?  
**Difficulty**: Medium  
**Category**: Performance Optimization

### Answer 📄

`useMemo` memoizes the result of an expensive computation, recomputing it only when one of its dependencies changes.

```jsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

React skips the computation on re-renders where `a` and `b` have not changed, returning the cached result instead.

**When to use `useMemo`:**

1. **Expensive computations** — sorting, filtering, or transforming large datasets:

```jsx
const sortedUsers = useMemo(
  () => [...users].sort((a, b) => a.name.localeCompare(b.name)),
  [users],
);
```

2. **Stable object/array references for child components wrapped in `React.memo`** or used in `useEffect` dependency arrays:

```jsx
const config = useMemo(() => ({ theme, locale }), [theme, locale]);
// config reference is stable — won't re-trigger effects or memo checks
```

**When NOT to use `useMemo`:**

- For cheap calculations — the memoization overhead can exceed the savings.
- When dependencies change on every render anyway — the cache is never used.
- As a premature optimization — profile first.

**`useMemo` vs `useCallback`:**

```jsx
useMemo(() => fn(), [deps]); // memoizes the RETURN VALUE of fn
useCallback(fn, [deps]); // memoizes the FUNCTION fn itself
```

React may choose to discard cached `useMemo` values (e.g., under memory pressure) — do not rely on `useMemo` for correctness, only performance.

## 🧠 Question 21

**ID**: react-021  
**Title**: What is `useCallback` and when should you use it?  
**Difficulty**: Medium  
**Category**: Performance Optimization

### Answer 📄

`useCallback` returns a memoized version of a callback function. The function identity is preserved across renders as long as its dependencies do not change.

```jsx
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

Without `useCallback`, a new function reference is created on every render, which can cause problems when passed to:

- Child components wrapped in `React.memo` (breaks the shallow prop comparison).
- `useEffect` dependency arrays (triggers the effect unnecessarily).

**Practical example:**

```jsx
const MemoizedChild = React.memo(function Child({ onAction }) {
  console.log('Child rendered');
  return <button onClick={onAction}>Action</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  // Without useCallback: new function on every render → Child always re-renders
  const handleAction = useCallback(() => {
    console.log('action');
  }, []); // stable reference — Child only renders once

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <MemoizedChild onAction={handleAction} />
    </>
  );
}
```

**`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.**

**When NOT to use it:**

- When the child isn't wrapped in `React.memo` — no benefit.
- When the function is not passed to anything that depends on referential stability.
- Premature optimization — profile before applying.

## 🧠 Question 22

**ID**: react-022  
**Title**: What are the rules of hooks?  
**Difficulty**: Medium  
**Category**: Hooks

### Answer 📄

React enforces two fundamental rules for hooks to ensure they work correctly.

**Rule 1: Only call hooks at the top level.**

Never call hooks inside conditionals, loops, or nested functions. React relies on the order of hook calls being the same on every render to correctly associate each hook with its state slot.

```jsx
// ❌ Wrong — hook inside a condition
function Component({ isLoggedIn }) {
  if (isLoggedIn) {
    const [user, setUser] = useState(null); // breaks hook order
  }
}

// ✅ Correct — condition inside the hook's usage
function Component({ isLoggedIn }) {
  const [user, setUser] = useState(null);
  if (!isLoggedIn) return null;
  // use user...
}
```

**Rule 2: Only call hooks from React functions.**

Hooks must be called from:

- Functional components
- Custom hooks

Never from regular JavaScript functions, class components, or event handlers directly.

**Why these rules exist:**

React internally maintains a linked list of hook states for each component, indexed by call order. If a hook is conditionally called, the order changes between renders, causing React to read the wrong state slot — leading to bugs that are very hard to debug.

The `eslint-plugin-react-hooks` package enforces both rules automatically during development.

## 🧠 Question 23

**ID**: react-023  
**Title**: What are custom hooks and how do you write them?  
**Difficulty**: Medium  
**Category**: Hooks

### Answer 📄

A custom hook is a JavaScript function whose name starts with `use` that can call other hooks. Custom hooks are the primary mechanism for extracting and sharing stateful logic between components — replacing mixins and render props for this purpose.

```jsx
// useLocalStorage — persists state to localStorage
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

// Usage — same API as useState
function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  return (
    <button onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
      {theme}
    </button>
  );
}
```

**Best practices:**

- Always prefix with `use` — this is what allows the ESLint hook rules to lint them correctly.
- Return values that mirror the pattern of the hooks they wrap (tuple `[value, setter]` or an object).
- A custom hook should have a single, focused responsibility.
- Accept inputs as arguments instead of hardcoding values to make the hook reusable.
- Keep hook logic independent of rendering (no JSX inside hooks).

## 🧠 Question 24

**ID**: react-024  
**Title**: What is the Context API and how do you use it?  
**Difficulty**: Medium  
**Category**: Context API

### Answer 📄

The Context API provides a way to pass data through the component tree without prop drilling. It creates a "broadcast channel" that any descendant component can subscribe to.

**Creating and providing context:**

```jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light'); // 'light' is the default value

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

**Consuming context with `useContext`:**

```jsx
function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
      Current: {theme}
    </button>
  );
}

// In the app
function App() {
  return (
    <ThemeProvider>
      <ThemeButton />
    </ThemeProvider>
  );
}
```

**Performance consideration** — every consumer of a context re-renders when the context value changes. If the context value is an object created inline, it changes on every provider re-render:

```jsx
// Bad — new object on every render → all consumers re-render
<Context.Provider value={{ theme, setTheme }}>

// Better — memoize the value
const value = useMemo(() => ({ theme, setTheme }), [theme]);
<Context.Provider value={value}>
```

For large applications with frequently changing state, prefer a dedicated state management library over Context for performance-sensitive data.

## 🧠 Question 25

**ID**: react-025  
**Title**: What is `useReducer` and when should you use it instead of `useState`?  
**Difficulty**: Medium  
**Category**: Hooks

### Answer 📄

`useReducer` is an alternative to `useState` for managing complex state logic. It is modelled after the Redux pattern: a reducer function receives the current state and an action and returns the next state.

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

**When to prefer `useReducer` over `useState`:**

- State has multiple sub-values that change together.
- Next state depends on the previous state in complex ways.
- The update logic is complex enough that it benefits from a pure, testable reducer function.
- You want to centralize all state transitions in one place.
- You're passing `dispatch` down to children and want action-based updates to stay explicit and centralized.

**`useReducer` vs Redux:** `useReducer` is local to the component (or shared via Context). Redux is a global store with middleware, DevTools, and time-travel debugging.

## 🧠 Question 26

**ID**: react-026  
**Title**: What is `useLayoutEffect` and how does it differ from `useEffect`?  
**Difficulty**: Hard  
**Category**: Effects & Lifecycle

### Answer 📄

Both hooks take the same signature, but they fire at different times in the rendering cycle.

**`useEffect`** — runs asynchronously **after** the browser has painted the screen. The component renders, the browser updates the visual output, and then the effect runs.

**`useLayoutEffect`** — runs synchronously **after** React has computed the DOM mutations but **before** the browser paints. It blocks the paint until the effect finishes.

```
React renders → React commits DOM mutations
  → useLayoutEffect runs (synchronously)
  → Browser paints
  → useEffect runs (asynchronously)
```

**When to use `useLayoutEffect`:**

- Reading DOM measurements (scroll position, element dimensions) before the user sees the screen, to avoid a visible flicker or "flash of wrong content":

```jsx
function Tooltip({ targetRef, content }) {
  const tooltipRef = useRef(null);

  useLayoutEffect(() => {
    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current;
    // Position tooltip before the browser paints — no flicker
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

**When to stick with `useEffect`:**

- Anything that doesn't need to block painting: data fetching, subscriptions, analytics, logging.

**Server-side rendering caveat:** `useLayoutEffect` does not run on the server (there is no DOM), which causes a warning. Use `useEffect` for SSR-compatible components, or conditionally guard with `typeof window !== 'undefined'`.

## 🧠 Question 27

**ID**: react-027  
**Title**: What are Error Boundaries in React?  
**Difficulty**: Medium  
**Category**: Components

### Answer 📄

An Error Boundary is a class component that catches JavaScript errors anywhere in its child component tree and displays a fallback UI instead of crashing the whole application.

Error boundaries catch errors during:

- Rendering
- Lifecycle methods
- Constructors of child components

They do **not** catch errors in:

- Event handlers (use try/catch)
- Asynchronous code (`setTimeout`, promises)
- Server-side rendering
- Errors in the error boundary itself

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to error reporting service
    logError(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary fallback={<ErrorPage />}>
  <Dashboard />
</ErrorBoundary>;
```

Error boundaries themselves are still class components in React. In function-component-heavy codebases, many teams use the `react-error-boundary` package to get a reusable wrapper and hooks-friendly integration.

Wrap distinct sections of the UI in separate Error Boundaries so a crash in one section does not take down the entire application.

## 🧠 Question 28

**ID**: react-028  
**Title**: What are Portals in React?  
**Difficulty**: Medium  
**Category**: Components

### Answer 📄

A Portal renders a component's children into a different DOM node than the component's parent — while keeping the component in its normal position in the React component tree.

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
    document.body, // render into document.body, not the parent DOM node
  );
}
```

**Why Portals exist:**

CSS properties like `overflow: hidden`, `z-index`, and `transform` on ancestor elements can clip or incorrectly stack UI that needs to visually "escape" the parent — modals, tooltips, dropdowns, and notifications.

**Key behaviors:**

- **React tree, not DOM tree** — event bubbling follows the React component hierarchy, not the DOM hierarchy. A click inside a portal bubbles up through React ancestors even though the DOM ancestors are different.
- **Context works** — the portal component can still consume context from its React parent.
- **Lifecycle is tied to the React parent** — when the parent unmounts, the portal content is also cleaned up.

```jsx
// Portal content is rendered in document.body in the DOM
// but event bubbling goes through <Page> → <App> in React
function App() {
  return (
    <Page>
      <Modal>
        {' '}
        {/* React parent is Page, DOM parent is body */}
        <button onClick={handleClose}>Close</button>
      </Modal>
    </Page>
  );
}
```

## 🧠 Question 29

**ID**: react-029  
**Title**: What is `useImperativeHandle` and when do you need `forwardRef`?  
**Difficulty**: Hard  
**Category**: Hooks

### Answer 📄

`forwardRef` is a wrapper that lets a parent component pass a `ref` through to a child component's DOM element or a custom imperative handle.

By default, `ref` on a functional component does not work — refs can only be attached to DOM elements. `forwardRef` enables attaching refs to functional components.

```jsx
const FancyInput = forwardRef(function FancyInput(props, ref) {
  return <input ref={ref} className="fancy-input" {...props} />;
});

// Parent
function Form() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // direct DOM access
  }, []);

  return <FancyInput ref={inputRef} />;
}
```

**`useImperativeHandle`** customizes what the parent sees through the ref — instead of the raw DOM element, the parent gets a controlled API:

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
    // The raw videoRef.current (with its full DOM API) is NOT exposed
  }));

  return <video ref={videoRef} src={props.src} />;
});

// Parent only sees { play, pause, seek }
playerRef.current.play();
```

**When to use:** use sparingly. Exposing an imperative API is generally an anti-pattern in React's declarative model. Prefer passing state and callbacks via props. Use `useImperativeHandle` when the parent truly needs to trigger actions imperatively — focus management, media playback, animations.

## 🧠 Question 30

**ID**: react-030  
**Title**: What is `React.lazy` and how does it work with `Suspense`?  
**Difficulty**: Medium  
**Category**: Performance Optimization

### Answer 📄

`React.lazy` enables code splitting at the component level. It wraps a dynamic `import()` and returns a lazy component that React loads only when it is first rendered.

```jsx
import { lazy, Suspense } from 'react';

// The component bundle is only downloaded when Dashboard is rendered
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

**How it works:**

1. `React.lazy(() => import('./Dashboard'))` creates a component that holds a Promise.
2. When React tries to render the lazy component for the first time, it reads the Promise.
3. If the Promise is pending, React "throws" the Promise — `<Suspense>` catches it and shows the fallback.
4. Once the Promise resolves (chunk downloaded), React re-renders the component.

**Requirements:**

- The dynamic import must resolve to a module with a **default export** that is a React component.
- A `<Suspense>` boundary must exist somewhere above the lazy component in the tree.

**Combining with React Router** for route-level splitting:

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

## 🧠 Question 31

**ID**: react-031  
**Title**: How does React batch state updates?  
**Difficulty**: Hard  
**Category**: Rendering Behavior

### Answer 📄

Batching is React's optimization of grouping multiple state updates from the same event into a single re-render.

**React 17 and earlier:** only batched updates inside React event handlers. Updates inside `setTimeout`, `Promise.then`, or native event listeners were NOT batched — each triggered a separate re-render.

**React 18:** introduced **Automatic Batching** — ALL state updates, regardless of where they originate, are batched by default:

```jsx
// React 18 — all three updates batched into ONE re-render
setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  setData((d) => [...d, 1]);
  // Only ONE re-render happens
}, 1000);

// Also batched inside Promise.then, native event listeners, etc.
fetch('/api').then(() => {
  setLoading(false);
  setData(result);
  // ONE re-render
});
```

**Opting out of batching with `flushSync`:**

```jsx
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount((c) => c + 1); // triggers immediate re-render
  });
  // DOM is updated here — useful for reading DOM measurements between updates
  flushSync(() => {
    setFlag((f) => !f);
  });
}
```

Use `flushSync` sparingly — it forces synchronous rendering which reduces performance and can cause issues with Concurrent Mode features.

## 🧠 Question 32

**ID**: react-032  
**Title**: What is `useTransition` and when should you use it?  
**Difficulty**: Hard  
**Category**: Concurrent React

### Answer 📄

`useTransition` is a Concurrent React hook that marks a state update as "non-urgent" (a transition). React keeps the UI responsive during the transition, deferring the expensive update if a higher-priority update (like a keystroke) comes in.

```jsx
import { useTransition, useState } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    setQuery(e.target.value); // urgent — updates input immediately

    startTransition(() => {
      // Non-urgent — React may defer this and keep the input responsive
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

**How it works internally:**

- React renders the transition update at a lower priority.
- If a new urgent update (e.g., another keystroke) arrives before the transition finishes, React discards the in-progress transition render and starts fresh.
- `isPending` is `true` while the transition is in progress — use it to show loading indicators.

**`useTransition` vs `useDeferredValue`:**

- `useTransition` wraps a state setter — you control which update is deferred.
- `useDeferredValue` wraps a value — useful when you receive the value from a prop or another component and can't control the update timing.

## 🧠 Question 33

**ID**: react-033  
**Title**: What is `useDeferredValue` and how does it differ from debouncing?  
**Difficulty**: Hard  
**Category**: Concurrent React

### Answer 📄

`useDeferredValue` accepts a value and returns a deferred version of it. During a re-render, if there is a higher-priority update pending, the deferred value lags behind — React reuses the old value to keep the UI responsive and re-renders with the new value when the browser is idle.

```jsx
import { useDeferredValue, memo } from 'react';

function SearchPage({ query }) {
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <p>Showing results for: {query}</p> {/* always current */}
      <Results query={deferredQuery} /> {/* may lag behind */}
    </>
  );
}

// Wrap the expensive component in memo so it only re-renders
// when deferredQuery actually changes
const Results = memo(function Results({ query }) {
  // Expensive computation / rendering
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

**Difference from debouncing:**

- **Debouncing** delays the update by a fixed timer — always introduces latency, even on fast devices.
- **`useDeferredValue`** is adaptive — on fast devices with no competing updates, it renders immediately. The deferral only kicks in when there is contention.

**Difference from `useTransition`:**

- `useTransition` wraps the state setter — use when you control where the state update happens.
- `useDeferredValue` wraps the received value — use when you receive a value as a prop or from a context and cannot control when it updates.

## 🧠 Question 34

**ID**: react-034  
**Title**: What are React Server Components?  
**Difficulty**: Hard  
**Category**: Server Components

### Answer 📄

React Server Components (RSC) are components that render exclusively on the server and are never sent to the client as JavaScript. They can directly access server-side resources (databases, file systems, internal APIs) without API round trips.

**Key properties:**

- Zero JavaScript bundle impact — their code never reaches the browser.
- Can use `async/await` directly in the component body.
- Cannot use state (`useState`), effects (`useEffect`), or browser-only APIs.
- Cannot handle user interactions directly.

```jsx
// app/users/page.jsx (Next.js App Router)
// This component runs ONLY on the server — no JS sent to client

async function UsersPage() {
  // Direct database access — no API fetch needed
  const users = await db.query('SELECT * FROM users');

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <UserCard user={user} /> {/* also a server component */}
          <InteractiveButton userId={user.id} /> {/* client component */}
        </li>
      ))}
    </ul>
  );
}
```

**Server Components vs Client Components:**

|                          | Server Components | Client Components         |
| ------------------------ | ----------------- | ------------------------- |
| Renders on               | Server only       | Server (initial) + Client |
| Bundle size              | Zero              | Added to JS bundle        |
| State/Effects            | ❌                | ✅                        |
| Direct DB/FS access      | ✅                | ❌                        |
| `async/await` in body    | ✅                | ❌                        |
| `"use client"` directive | Not needed        | Required                  |

**The interleaving model** — server and client components can be nested. A server component can import client components, but a client component cannot import a server component (it can receive server components as children via props).

## 🧠 Question 35

**ID**: react-035  
**Title**: What is hydration in React SSR and what causes hydration mismatches?  
**Difficulty**: Hard  
**Category**: SSR / Hydration

### Answer 📄

**Server-Side Rendering (SSR)** generates the full HTML on the server and sends it to the browser. The browser can display it immediately without waiting for JavaScript.

**Hydration** is the process where React "takes over" the server-rendered HTML on the client — attaching event listeners and making the static HTML interactive. React re-renders the component tree and reconciles it with the existing DOM instead of creating nodes from scratch.

```jsx
// Server: renders to HTML string
// Client: hydrates the existing DOM
import { hydrateRoot } from 'react-dom/client';

hydrateRoot(document.getElementById('root'), <App />);
```

**Hydration mismatches** occur when the HTML the server produces differs from what React renders on the client. React logs a warning and falls back to client-side re-rendering for the mismatched subtree.

**Common causes:**

1. **Non-deterministic rendering** — `Date.now()`, `Math.random()`, `new Date()` produce different values server vs client.
2. **Browser-only APIs** — `window`, `localStorage`, `navigator` used during render (they don't exist on the server).
3. **Conditional rendering based on `typeof window`** — renders different content server vs client.
4. **Invalid HTML** — a `<p>` inside another `<p>` which browsers auto-correct differently.
5. **Third-party browser extensions** — inject DOM nodes that React doesn't expect.

**Fixes:**

```jsx
// Guard browser APIs with useEffect or client-only rendering
const [isMounted, setIsMounted] = useState(false);
useEffect(() => setIsMounted(true), []);

return isMounted ? <ClientOnlyComponent /> : null;

// Or use suppressHydrationWarning for intentional differences
<time suppressHydrationWarning>{new Date().toLocaleString()}</time>;
```

## 🧠 Question 36

**ID**: react-036  
**Title**: What is React Fiber?  
**Difficulty**: Hard  
**Category**: React Internals

### Answer 📄

React Fiber is the complete rewrite of React's core reconciliation algorithm, introduced in React 16. It replaced the old synchronous "stack reconciler" with an incremental, interruptible architecture.

**The problem with the old reconciler:**

The original React reconciler used a recursive tree traversal that could not be paused. Once React started rendering a large tree, it had to finish — blocking the main thread and causing dropped frames and unresponsive UI.

**What Fiber enables:**

1. **Incremental rendering** — break rendering work into small units ("fibers"). React can pause after each unit, yield to the browser (paint, handle events), and resume.
2. **Priority scheduling** — assign different priorities to different updates. A typing animation is higher priority than a background data refetch.
3. **Concurrent rendering** — work on multiple versions of the UI simultaneously (Concurrent Mode).
4. **Suspense** — "pause" rendering when data is not ready and resume when it is.

**What a Fiber is:**

A Fiber is a JavaScript object representing a unit of work for one component instance. It contains:

- Component type, props, and state
- References to parent, sibling, and child fibers (a linked list, not a tree)
- Effect flags describing what DOM mutations to make

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

React maintains two Fiber trees: the **current tree** (what is on screen) and the **work-in-progress tree** (being built). When work completes, React swaps them — this is the "double buffering" commit.

## 🧠 Question 37

**ID**: react-037  
**Title**: What is the difference between the render phase and the commit phase in React?  
**Difficulty**: Hard  
**Category**: React Internals

### Answer 📄

React's update cycle is divided into two distinct phases with different characteristics.

**Render Phase (Reconciliation)**

- React calls component functions and builds a new virtual DOM tree.
- React diffs the new tree against the current tree to determine what changed.
- **Asynchronous and interruptible** — React can pause, abort, or restart this work. It may call component functions multiple times (this is why component functions must be pure — no side effects in render).
- No DOM mutations happen here.
- `useState`, `useMemo`, `useReducer`, and `useCallback` operate here.

**Commit Phase**

- React applies the computed changes to the real DOM.
- **Synchronous and uninterruptible** — React processes all mutations in one shot to avoid partial UI states.
- Three sub-phases:
  1. **Before mutation** — `getSnapshotBeforeUpdate` (class), reads DOM before changes.
  2. **Mutation** — insert, update, and delete DOM nodes.
  3. **Layout** — `useLayoutEffect` and `componentDidMount/Update` run synchronously here.
- After the browser paints, `useEffect` cleanup and setup run.

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

**Why this matters:** Side effects that read or write the DOM must go in `useLayoutEffect` or `useEffect`, not in the component body — the render phase may be called multiple times before any commit occurs.

## 🧠 Question 38

**ID**: react-038  
**Title**: What is Concurrent React and what does it enable?  
**Difficulty**: Hard  
**Category**: Concurrent React

### Answer 📄

Concurrent React is a behind-the-scenes change to how React renders component trees, introduced as stable in React 18. It makes React's rendering interruptible, allowing it to work on multiple tasks concurrently and prioritize the most important work.

**The core capability:** React can now start rendering a new tree, pause partway through to handle a higher-priority update (like a keystroke), discard the in-progress work, and restart.

**What it enables:**

1. **`useTransition` / `startTransition`** — mark updates as low-priority so React keeps the UI responsive during heavy renders.

2. **`useDeferredValue`** — defer re-rendering a subtree until the browser is free, similar to debouncing but adaptive.

3. **Automatic batching** — all state updates are batched by default, not just those in event handlers.

4. **Streaming SSR** — React can stream HTML progressively from the server, flushing content as it becomes ready.

5. **Suspense for data fetching** — React can suspend a component, show a fallback, and seamlessly reveal the component when its data is ready.

**Opting in to Concurrent Mode:**

```jsx
// React 18 — concurrent rendering is enabled by default with createRoot
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')).render(<App />);

// Legacy mode — no concurrent features
ReactDOM.render(<App />, document.getElementById('root'));
```

**Important:** concurrent rendering is an opt-in architecture change. Existing apps using `ReactDOM.render` continue to work in legacy mode without concurrent features.

## 🧠 Question 39

**ID**: react-039  
**Title**: What is `Suspense` in React and how does it work?  
**Difficulty**: Hard  
**Category**: Concurrent React

### Answer 📄

`<Suspense>` is a built-in React component that lets you "wait" for something (a lazy-loaded component, async data) and display a fallback UI while waiting.

```jsx
<Suspense fallback={<LoadingSpinner />}>
  <LazyComponent />
</Suspense>
```

**The mechanism — throwing a Promise:**

When a component is not ready to render (its data or code is still loading), it throws a Promise. React's Suspense boundary catches the thrown Promise, shows the `fallback`, and re-renders the component when the Promise resolves.

```jsx
// Simplified internal mechanism
function LazyComponent() {
  const resource = cache.read(); // throws a Promise if loading
  return <div>{resource.data}</div>;
}
```

**Use cases:**

1. **Code splitting** with `React.lazy`:

```jsx
const Chart = lazy(() => import('./Chart'));
<Suspense fallback={<Spinner />}>
  <Chart />
</Suspense>;
```

2. **Data fetching** with frameworks (Next.js, Remix) or libraries (TanStack Query with Suspense mode):

```jsx
// Next.js Server Component — async component suspends automatically
async function UserProfile({ id }) {
  const user = await fetchUser(id);
  return <div>{user.name}</div>;
}
```

**Nested Suspense boundaries** handle loading states independently:

```jsx
<Suspense fallback={<PageSkeleton />}>
  <Header />
  <Suspense fallback={<FeedSkeleton />}>
    <NewsFeed />
  </Suspense>
</Suspense>
```

The inner boundary shows `<FeedSkeleton />` while the feed loads, while the header is already visible.

## 🧠 Question 40

**ID**: react-040  
**Title**: What is the `key` prop and what happens when you use index as a key?  
**Difficulty**: Medium  
**Category**: JSX & Rendering

### Answer 📄

The `key` prop is a special hint React uses during list reconciliation to identify which items changed, were added, or were removed between renders.

**Why index as a key is problematic:**

When you use array index as the key, React maps each index to a component. If the array is reordered, filtered, or items are prepended, the indices shift — React thinks the element at index 0 is the "same" element even though it's now a different item.

This causes:

- **Incorrect state** — a controlled input at index 0 keeps its typed value even though a different item is now at that position.
- **Wrong animations** — transition effects apply to the wrong elements.
- **Stale component state** — `useEffect` cleanup doesn't run between "different" items that happen to share an index.

```jsx
// Bug demonstration
const [items, setItems] = useState(['Alice', 'Bob', 'Carol']);

// After prepending 'Zara':
// Index 0 was 'Alice', now it's 'Zara' — React thinks it just updated props
// React does NOT unmount/remount — old component instance reused
{
  items.map((name, index) => (
    <input key={index} defaultValue={name} /> // will show wrong values
  ));
}

// Fix — use stable IDs
{
  items.map((item) => <input key={item.id} defaultValue={item.name} />);
}
```

**When index as key is acceptable:**

- The list is static and never reordered.
- Items are never added to or removed from the middle of the list.
- No item has stateful children (inputs, animations).

## 🧠 Question 41

**ID**: react-041  
**Title**: What is `useId` and when do you need it?  
**Difficulty**: Medium  
**Category**: Hooks

### Answer 📄

`useId` (React 18) generates a unique, stable ID that is consistent between server and client renders. It solves the problem of generating IDs for accessibility attributes (`htmlFor`, `aria-describedby`, `aria-labelledby`) in SSR-safe way.

```jsx
import { useId } from 'react';

function PasswordField() {
  const id = useId(); // e.g., ":r3:"

  return (
    <div>
      <label htmlFor={id}>Password</label>
      <input id={id} type="password" aria-describedby={`${id}-hint`} />
      <p id={`${id}-hint`}>Must be at least 8 characters.</p>
    </div>
  );
}
```

**Why not use `Math.random()` or a counter?**

- `Math.random()` produces a different value on every render — including between server and client — causing a hydration mismatch.
- A module-level counter increments differently on server and client (server renders multiple requests; client renders only once per session).

`useId` generates IDs deterministically based on the component's position in the React tree, which is identical on server and client.

**Important:** do not use `useId` as a list key — it generates one ID per hook call per component instance, not per list item.

## 🧠 Question 42

**ID**: react-042  
**Title**: What is `useSyncExternalStore` and when should you use it?  
**Difficulty**: Hard  
**Category**: Hooks

### Answer 📄

`useSyncExternalStore` (React 18) is the recommended hook for subscribing to external stores — any mutable data source outside of React's state system. It ensures consistency in Concurrent Mode where React may render the same component multiple times before committing.

```jsx
import { useSyncExternalStore } from 'react';

// Subscribing to the browser's online status
function useOnlineStatus() {
  return useSyncExternalStore(
    // subscribe: called when React needs to subscribe
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    // getSnapshot: returns current value (must be pure, fast, and return same ref if unchanged)
    () => navigator.onLine,
    // getServerSnapshot: returns the server-side value for SSR
    () => true,
  );
}

function Status() {
  const isOnline = useOnlineStatus();
  return <p>{isOnline ? '🟢 Online' : '🔴 Offline'}</p>;
}
```

**Why not just `useEffect` + `useState`?**

In Concurrent Mode, React may render a component multiple times before committing. Between renders, an external store could change — causing a "tearing" inconsistency where different parts of the UI show different values from the same store. `useSyncExternalStore` prevents this by synchronizing reads.

All major state management libraries (Zustand, Redux, Valtio) use `useSyncExternalStore` internally.

## 🧠 Question 43

**ID**: react-043  
**Title**: What is `useInsertionEffect` and when is it used?  
**Difficulty**: Hard  
**Category**: Hooks

### Answer 📄

`useInsertionEffect` fires synchronously before React makes any DOM mutations. It was introduced in React 18 specifically for CSS-in-JS library authors who need to inject styles into the DOM before any layout reads happen.

```jsx
// Intended for CSS-in-JS libraries — not for general application code
useInsertionEffect(() => {
  const styleElement = document.createElement('style');
  styleElement.textContent = `.btn-${hash} { color: red; }`;
  document.head.appendChild(styleElement);
  return () => document.head.removeChild(styleElement);
}, [hash]);
```

**Execution order:**

```
React computes DOM mutations (render phase complete)
  → useInsertionEffect (CSS injected — no layout yet)
  → React applies DOM mutations (commit mutation phase)
  → useLayoutEffect (layout can be read)
  → Browser paints
  → useEffect
```

**Why it exists:** CSS-in-JS libraries (styled-components, Emotion) need to inject styles before `useLayoutEffect` runs — because `useLayoutEffect` reads layout metrics (like `getBoundingClientRect`), and those metrics must reflect the correct styles. Without `useInsertionEffect`, libraries had to use `useLayoutEffect`, which caused bugs when styles were not yet injected.

**Application developers should never use `useInsertionEffect` directly.** It is exclusively for CSS-in-JS library internals.

## 🧠 Question 44

**ID**: react-044  
**Title**: What is `useDebugValue` and how is it used?  
**Difficulty**: Easy  
**Category**: Hooks

### Answer 📄

`useDebugValue` adds a label to a custom hook that is visible in React DevTools. It is useful for libraries and shared custom hooks to make them easier to inspect during debugging.

```jsx
function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);

  // Shows "Online: true" or "Online: false" in React DevTools
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}
```

**Deferred formatting** — pass a second argument (a format function) if generating the debug value is expensive. React calls it only when DevTools are open:

```jsx
function useUser(id) {
  const user = fetchUserFromCache(id);

  // Format function is only called when DevTools inspects this hook
  useDebugValue(user, (u) => `${u.name} (${u.role})`);

  return user;
}
```

**Guidelines:**

- Only add `useDebugValue` to custom hooks that are shared across many components.
- Do not add it to every hook — the overhead adds up and the DevTools panel becomes noisy.
- It has no effect in production builds.

## 🧠 Question 45

**ID**: react-045  
**Title**: What is the difference between `createElement` and JSX?  
**Difficulty**: Easy  
**Category**: JSX & Rendering

### Answer 📄

JSX is syntactic sugar for `React.createElement` (or the JSX transform's `jsx` function). They produce identical output.

```jsx
// JSX
const element = (
  <div className="container">
    <h1>Hello</h1>
    <p>{message}</p>
  </div>
);

// Equivalent without JSX — verbose but identical result
const element = React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, 'Hello'),
  React.createElement('p', null, message),
);
```

Both produce the same React element object:

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

**The new JSX transform (React 17+):**

The automatic JSX runtime (`react/jsx-runtime`) was introduced to avoid importing React in every file. The transpiler inserts the import automatically.

```jsx
// Before React 17 — required manual import
import React from 'react';

// React 17+ with automatic transform — no manual import needed
// Transpiler injects: import { jsx as _jsx } from 'react/jsx-runtime';
```

You would write `React.createElement` directly only when:

- Dynamically creating elements where the type is determined at runtime.
- Working in an environment that does not support JSX.
- Building low-level utilities or renderers.

## 🧠 Question 46

**ID**: react-046  
**Title**: What is the `children` prop and what patterns can you use with it?  
**Difficulty**: Easy  
**Category**: Components

### Answer 📄

`children` is a built-in React prop that contains the content placed between a component's opening and closing tags. It can be a single element, multiple elements, a string, a function, or any renderable value.

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

**Common patterns:**

**Layout / wrapper components:**

```jsx
<Layout>
  <Sidebar />
  <MainContent />
</Layout>
```

**Render props** (passing a function as `children`):

```jsx
<DataFetcher url="/api/users">
  {({ data, loading }) => (loading ? <Spinner /> : <UserList users={data} />)}
</DataFetcher>;

// The component calls children as a function
function DataFetcher({ url, children }) {
  const { data, loading } = useFetch(url);
  return children({ data, loading });
}
```

**`React.Children` utilities** for inspecting/transforming children:

```jsx
React.Children.count(children);
React.Children.map(children, (child) => cloneElement(child, { theme }));
React.Children.toArray(children).filter(Boolean);
```

**Named slots via additional props** — for multiple content areas:

```jsx
<Modal header={<h2>Title</h2>} footer={<Button>Close</Button>}>
  <p>Modal body content</p>
</Modal>
```

## 🧠 Question 47

**ID**: react-047  
**Title**: What are Higher-Order Components (HOCs) and when are they used?  
**Difficulty**: Medium  
**Category**: Architecture & Patterns

### Answer 📄

A Higher-Order Component is a function that takes a component and returns a new enhanced component. It is a pattern for reusing component logic — a form of composition rather than inheritance.

```jsx
// withAuth — a HOC that redirects unauthenticated users
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <WrappedComponent {...props} user={user} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

**Common HOC use cases:**

- Authentication / authorization checks
- Logging and analytics
- Injecting data or context into components
- Adding error boundary behavior

**Conventions for HOC authorship:**

- Pass through all unrelated props with `{...props}`.
- Set a meaningful `displayName` for debugging: `AuthenticatedComponent.displayName = \`withAuth(${WrappedComponent.displayName})\``.
- Do not mutate the wrapped component — return a new component.
- Do not define HOCs inside other components — they recreate the inner component on every render.

**HOCs vs Custom Hooks:**

In modern React, custom hooks have replaced most HOC use cases. Hooks are simpler, don't add components to the tree, and don't have prop name collision issues. HOCs are still useful for class component integration and adding JSX-level wrappers (like error boundaries or context providers).

## 🧠 Question 48

**ID**: react-048  
**Title**: What is the render prop pattern?  
**Difficulty**: Medium  
**Category**: Architecture & Patterns

### Answer 📄

The render prop pattern is a technique where a component accepts a function as a prop (or as `children`) and calls it to delegate rendering responsibility. This enables sharing logic between components without HOCs or code duplication.

```jsx
// Mouse tracker using render props
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

// Consumer decides what to render with the position data
<MouseTracker render={({ x, y }) => (
  <div>Mouse at ({x}, {y})</div>
)} />

// Same component, different rendering
<MouseTracker render={({ x, y }) => (
  <Circle cx={x} cy={y} r={10} />
)} />
```

**`children` as render prop** (same pattern, different syntax):

```jsx
<MouseTracker>
  {({ x, y }) => <div>({x}, {y})</div>}
</MouseTracker>

// Implementation reads children as a function
function MouseTracker({ children }) {
  // ...
  return <div onMouseMove={...}>{children(position)}</div>;
}
```

**Render props vs Custom Hooks:**

Custom hooks have largely superseded render props for logic sharing. The hook version is cleaner (no extra components in the tree, no prop passing). However, render props remain useful when the shared behavior is inherently about rendering (like virtualized lists that must control how each row renders).

## 🧠 Question 49

**ID**: react-049  
**Title**: What is state colocation and why does it matter?  
**Difficulty**: Medium  
**Category**: Architecture & Patterns

### Answer 📄

State colocation is the principle of keeping state as close as possible to the components that use it — not lifting it higher than necessary.

**Why it matters:**

When state lives too high in the tree, every state change re-renders the entire subtree below it, even components that don't care about that state:

```jsx
// Bad — search state lives in App, causes full-tree re-renders
function App() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <>
      <Header /> {/* re-renders every keystroke */}
      <Sidebar /> {/* re-renders every keystroke */}
      <SearchBox query={searchQuery} onChange={setSearchQuery} />
      <Results query={searchQuery} />
    </>
  );
}

// Good — search state colocated in its owner
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
      <Header /> {/* no longer re-renders on search input */}
      <Sidebar /> {/* no longer re-renders on search input */}
      <SearchSection />
    </>
  );
}
```

**The colocation principle:** state should live at the lowest common ancestor of all components that need it.

**When to lift state:** only when sibling components need to share the same state. Even then, lift only as high as necessary, not all the way to the root.

State colocation naturally reduces re-renders without needing `React.memo`, `useMemo`, or complex state management tools.

## 🧠 Question 50

**ID**: react-050  
**Title**: What is the compound component pattern?  
**Difficulty**: Hard  
**Category**: Architecture & Patterns

### Answer 📄

The compound component pattern is a way to design components that work together by sharing implicit state through Context, while giving the consumer control over rendering and composition.

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

// Attach sub-components as properties
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

// Consumer has full control over layout and composition
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

**Benefits over a monolithic component:** the consumer can reorder, insert, or omit sub-components freely. The shared state is hidden from the consumer but accessible to all sub-components.

## 🧠 Question 51

**ID**: react-051  
**Title**: How does `useEffect` cleanup work and why is it important?  
**Difficulty**: Medium  
**Category**: Effects & Lifecycle

### Answer 📄

The function returned from `useEffect` is the cleanup function. React runs it before the effect re-runs (when dependencies change) and when the component unmounts.

Without proper cleanup, effects can cause:

- **Memory leaks** — event listeners, timers, or subscriptions that accumulate.
- **State updates on unmounted components** — calling `setState` after unmount logs a React warning.
- **Stale closures acting on outdated data** — an old subscription still trying to update state with stale values.

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false; // flag to prevent stale updates
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
      controller.abort(); // cancel in-flight request
    };
  }, [userId]); // re-runs when userId changes → cleanup cancels previous request

  return user ? <div>{user.name}</div> : <Spinner />;
}
```

**React 18 + StrictMode** double-invokes effects (mount → cleanup → mount) in development to surface missing cleanup. If your app breaks in StrictMode, the effect is missing a cleanup.

## 🧠 Question 52

**ID**: react-052  
**Title**: What is lifting state up in React?  
**Difficulty**: Easy  
**Category**: Props & State

### Answer 📄

Lifting state up means moving state from a child component to the nearest common ancestor when two or more sibling components need to share or synchronize that state.

```jsx
// Problem — each Thermometer has its own state, they can't sync
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

// Solution — lift state to the parent
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

**When to lift state:**

- Two siblings need to read or sync the same value.
- A parent needs to react to a child's state change.
- The state controls visibility or behavior of multiple unrelated components.

**Downside of lifting:** the ancestor re-renders whenever the state changes, potentially re-rendering unrelated sibling components. Mitigate with `React.memo` or state colocation.

## 🧠 Question 53

**ID**: react-053  
**Title**: What is React's reconciliation diffing algorithm in detail?  
**Difficulty**: Hard  
**Category**: React Internals

### Answer 📄

React's diffing algorithm compares two virtual DOM trees using heuristics to achieve O(n) complexity rather than the theoretical O(n³) of a full tree comparison.

**Three core heuristics:**

**1. Elements of different types produce entirely different trees.**

If the type changes at a position (e.g., `<div>` → `<span>`, or `<Counter>` → `<Timer>`), React unmounts the old subtree completely (including all children and their state), then mounts the new subtree from scratch.

```jsx
// React unmounts Counter and mounts Timer — no state is preserved
{
  isTimer ? <Timer /> : <Counter />;
}
```

**2. The `key` prop stabilizes element identity across renders.**

In lists, React uses `key` to match elements between renders. Elements with matching keys are updated in place (props updated, instance preserved). Elements without a matching key are unmounted; new keys are mounted.

**3. Same type elements are updated in place.**

If the element type is the same, React keeps the existing DOM node and updates only changed attributes/props:

```jsx
// React updates only the className attribute — no DOM node recreation
// Before: <div className="old" />
// After:  <div className="new" />
```

For component elements of the same type, React reuses the instance and updates props, then calls the render function to get the next virtual DOM.

**Why recursive diffing stops early:** React never compares nodes across sibling positions or across levels. Each position in the tree is compared only with the corresponding position in the new tree, keeping the algorithm linear.

## 🧠 Question 54

**ID**: react-054  
**Title**: What is `React.cloneElement` and when is it used?  
**Difficulty**: Medium  
**Category**: Components

### Answer 📄

`React.cloneElement` creates a copy of a React element with optionally modified props and children. It is used to inject additional props into children elements that the parent does not control.

```jsx
React.cloneElement(element, [newProps], [...newChildren]);
```

**Example — a `RadioGroup` that injects `name` into its `Radio` children:**

```jsx
function RadioGroup({ name, children }) {
  return (
    <div>
      {React.Children.map(
        children,
        (child) => React.cloneElement(child, { name }), // inject 'name' prop
      )}
    </div>
  );
}

// Usage — Radio components receive name="gender" automatically
<RadioGroup name="gender">
  <Radio value="male">Male</Radio>
  <Radio value="female">Female</Radio>
</RadioGroup>;
```

**Common use cases:**

- Injecting shared props into children from a container (group name, theme, variant).
- Wrapping children with additional event handlers or refs.
- Tooltip/overlay libraries that wrap any passed element.

**Modern alternatives:**

`cloneElement` is considered somewhat of an anti-pattern in modern React because it creates implicit coupling between parent and child. Prefer:

- **Context API** — for injecting data into an arbitrary subtree.
- **Compound components** — for structured parent-child relationships.
- **Render props or `children` as function** — for maximum flexibility.

`cloneElement` is still useful for low-level UI primitives where you need to add props to arbitrary elements without requiring them to consume context.

## 🧠 Question 55

**ID**: react-055  
**Title**: How do you handle forms in React with validation?  
**Difficulty**: Medium  
**Category**: Forms & Events

### Answer 📄

Form handling in React typically means controlled components — keeping all form values in state and validating on change or submit.

**Basic controlled form with validation:**

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
    // Clear error on change
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

**Form libraries** abstract validation, dirty state, and submission:

- **React Hook Form** — uncontrolled approach with a register pattern; minimal re-renders; schema validation via Zod or Yup.
- **Formik** — fully controlled; higher re-render count but thorough API.
- **Remix forms / Server Actions** — form submission handled server-side; no client-side state needed for basic forms.

## 🧠 Question 56

**ID**: react-056  
**Title**: What is `forwardRef` in React?  
**Difficulty**: Medium  
**Category**: Hooks

### Answer 📄

`forwardRef` is a React API that allows a parent component to pass a `ref` through to a DOM element or component instance inside a child component.

By default, `ref` cannot be placed on functional components — the ref would not be forwarded to anything inside the component. `forwardRef` explicitly opts the component into accepting and forwarding a ref.

```jsx
import { forwardRef, useRef } from 'react';

const Input = forwardRef(function Input({ label, ...props }, ref) {
  return (
    <div>
      <label>{label}</label>
      <input ref={ref} {...props} /> {/* ref forwarded to the DOM input */}
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

**With TypeScript:**

```tsx
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, ...props },
  ref,
) {
  return <input ref={ref} {...props} />;
});
```

**React 19 changes:** In React 19, `ref` is available as a regular prop in function components, so new components often won't need `forwardRef`. `forwardRef` still matters when supporting older React versions, and refs to class components still point to the instance rather than becoming a regular prop.

```jsx
// React 19 — no forwardRef needed
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}
```

## 🧠 Question 57

**ID**: react-057  
**Title**: What is the React profiler and how do you use it to find performance issues?  
**Difficulty**: Medium  
**Category**: Performance Optimization

### Answer 📄

React provides two ways to profile component rendering performance.

**React DevTools Profiler** — a browser extension tab that records all renders and their causes during an interaction.

To use it:

1. Open React DevTools → Profiler tab.
2. Click Record.
3. Interact with the application (click, type, navigate).
4. Stop recording.
5. Inspect the flame graph — each bar is a component render. Width = render duration. Click a component to see why it rendered.

**Common findings:**

- A component renders frequently without its props changing → apply `React.memo`.
- A component renders because its parent does → check if parent state change is necessary.
- Many small renders coalesce into one → batching is working correctly.
- A single render is extremely long → the component's logic is expensive → `useMemo` or virtualization.

**`React.Profiler` API** — for programmatic measurement in production:

```jsx
import { Profiler } from 'react';

function onRender(id, phase, actualDuration) {
  // id: the "id" prop of the Profiler tree that just committed
  // phase: "mount" or "update"
  // actualDuration: time to render (ms)
  if (actualDuration > 16) {
    reportSlowRender(id, actualDuration);
  }
}

<Profiler id="Dashboard" onRender={onRender}>
  <Dashboard />
</Profiler>;
```

The `Profiler` component has a small but non-zero overhead — use it selectively and consider stripping it from production builds.

## 🧠 Question 58

**ID**: react-058  
**Title**: What is windowing (virtualization) and when do you need it in React?  
**Difficulty**: Medium  
**Category**: Performance Optimization

### Answer 📄

Windowing (also called virtualization) is a technique that renders only the visible portion of a large list. Instead of creating thousands of DOM nodes, only the items currently in the viewport (plus a small buffer) are rendered. As the user scrolls, items enter and leave the rendered set.

**When to use it:**

- Lists with hundreds or thousands of items where full rendering causes:
  - Long initial render time
  - Excessive memory usage
  - Laggy scrolling (dropped frames)

**Libraries:**

- **`react-window`** (lightweight, minimal API) — `FixedSizeList`, `VariableSizeList`, `FixedSizeGrid`
- **`react-virtual` / `@tanstack/virtual`** (headless, framework-agnostic)
- **`react-virtuoso`** (full-featured, supports variable heights, infinite scroll, grouping)

```jsx
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {/* style contains top/height positioning */}
      <UserCard user={items[index]} />
    </div>
  );

  return (
    <FixedSizeList
      height={600} // visible height of the list container
      itemCount={items.length}
      itemSize={72} // height of each row in px
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

**Trade-offs:**

- Items outside the viewport are unmounted (lose state) and remounted on scroll.
- Accessibility can be affected (screen readers may not see off-screen items).
- Keyboard navigation requires additional handling.

For simple cases with a few hundred items, `React.memo` + `useMemo` filtering is usually sufficient before reaching for virtualization.

## 🧠 Question 59

**ID**: react-059  
**Title**: What are the differences between React 17 and React 18?  
**Difficulty**: Medium  
**Category**: React Basics

### Answer 📄

React 18 introduced several significant features and changes.

**New Root API:**

```jsx
// React 17 — legacy mode, no concurrent features
ReactDOM.render(<App />, document.getElementById('root'));

// React 18 — enables concurrent features
const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

**Automatic Batching:**

React 17 only batched state updates inside React event handlers. React 18 batches ALL updates everywhere — `setTimeout`, `Promise.then`, native listeners — by default.

**Concurrent Features (stable):**

- `useTransition` and `startTransition` — mark updates as non-urgent.
- `useDeferredValue` — defer re-rendering of a subtree.
- `useId` — stable IDs for SSR.
- `useSyncExternalStore` — safe external store subscriptions.
- `useInsertionEffect` — CSS-in-JS library hook.

**Streaming SSR with Suspense:**

React 18 supports `renderToPipeableStream` (Node.js) and `renderToReadableStream` (Edge), enabling progressive HTML streaming with Suspense-based loading states.

**StrictMode double effects:**

React 18 StrictMode now mounts → unmounts → remounts effects in development to surface cleanup bugs.

**React 18 dropped support for IE11.**

## 🧠 Question 60

**ID**: react-060  
**Title**: What is `startTransition` and how is it different from `useTransition`?  
**Difficulty**: Medium  
**Category**: Concurrent React

### Answer 📄

Both `startTransition` and `useTransition` mark state updates as non-urgent transitions, but they are used in different contexts.

**`startTransition`** — a standalone function imported from React. Use it when you don't need to track the pending state:

```jsx
import { startTransition } from 'react';

function handleSearch(query) {
  startTransition(() => {
    setSearchResults(search(query)); // non-urgent
  });
}
```

**`useTransition`** — a hook that also returns an `isPending` boolean so you can show a loading indicator during the transition:

```jsx
import { useTransition } from 'react';

function SearchBox() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  function handleChange(e) {
    setQuery(e.target.value); // urgent — instant

    startTransition(() => {
      setResults(search(e.target.value)); // non-urgent
    });
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />} {/* only available with useTransition */}
      <ResultsList results={results} />
    </>
  );
}
```

**When React handles transitions:**

- Urgent updates (input typing, clicking) render immediately.
- Transition updates render at lower priority — they can be interrupted if a new urgent update arrives.
- If the user types again before the transition finishes, React discards the in-progress transition render and starts fresh.

Use `startTransition` when you don't need `isPending`; use `useTransition` when you need to show a loading state during the transition.

## 🧠 Question 61

**ID**: react-061  
**Title**: How does React's synthetic event system work?  
**Difficulty**: Medium  
**Category**: React Internals

### Answer 📄

React wraps native browser events in a `SyntheticEvent` object to normalize cross-browser inconsistencies. All synthetic events share the same interface regardless of the browser.

**Event Delegation:**

React does not attach event listeners to individual DOM nodes. Instead, it attaches a single listener at the root container (`#root`). When an event bubbles up to the root, React determines which component handler to call. This is called **event delegation**.

In React 16 and earlier, events were delegated to `document`. React 17 changed this to the root DOM container, which makes it easier to embed React inside non-React apps.

```jsx
// React attaches one listener to #root — not to each button
function App() {
  return (
    <div>
      <button onClick={() => console.log('clicked')}>Click me</button>
    </div>
  );
}
```

**Event Pooling (React 16 and earlier — removed in React 17):**

React 16 reused `SyntheticEvent` objects across events for performance. After the event handler returned, the event's properties were nullified. You had to call `e.persist()` to hold a reference asynchronously.

React 17 removed event pooling — `SyntheticEvent` objects are no longer reused, so you can safely access event properties in `setTimeout` or `Promise.then` without `e.persist()`.

**Stopping propagation:**

```jsx
function Parent() {
  return (
    <div onClick={() => console.log('parent')}>
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevents parent handler from firing
          console.log('child');
        }}
      >
        Click
      </button>
    </div>
  );
}
```

**Accessing the native event:**

```jsx
function handleClick(e) {
  console.log(e.nativeEvent); // the underlying browser Event object
}
```

**Capture phase:**

Use `onClickCapture` instead of `onClick` to handle events in the capture phase (top-down) rather than the bubble phase (bottom-up).

## 🧠 Question 62

**ID**: react-062  
**Title**: What is `flushSync` and when do you need it?  
**Difficulty**: Hard  
**Category**: Concurrent React

### Answer 📄

`flushSync` forces React to flush all pending state updates **synchronously** inside the provided callback, bypassing the normal async/batched rendering pipeline.

```jsx
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount((c) => c + 1);
  });
  // The DOM is guaranteed to be updated here
  console.log(document.getElementById('counter').textContent); // new value

  flushSync(() => {
    setFlag(true);
  });
  // DOM updated again
}
```

**Why it exists:**

React 18 batches all state updates by default — even inside `setTimeout` and Promises. Most of the time this is optimal. But some scenarios require the DOM to be updated immediately before execution continues:

- **Measuring the DOM** right after a state update (you need the new layout)
- **Third-party library integration** that reads the DOM after a React state change
- **Imperative scroll/animation** operations that depend on freshly updated DOM positions

**Caveats:**

- `flushSync` hurts performance — it forces a full synchronous render and commit
- Calling `flushSync` inside a React lifecycle or render can cause issues
- It should be a last resort — most use cases can be solved with `useLayoutEffect`

```jsx
// Preferred alternative: useLayoutEffect for DOM measurements
useLayoutEffect(() => {
  const height = elementRef.current.offsetHeight;
  setContainerHeight(height);
}, [dependency]);
```

## 🧠 Question 63

**ID**: react-063  
**Title**: What is the `use()` hook in React 19?  
**Difficulty**: Medium  
**Category**: Concurrent React

### Answer 📄

`use()` is a React 19 API that lets you read the value of a resource — a **Promise** or a **Context** — inside a component render. Unlike traditional hooks, `use()` can be called conditionally.

**Reading a Promise:**

```jsx
import { use, Suspense } from 'react';

function UserProfile({ userPromise }) {
  const user = use(userPromise); // suspends until the Promise resolves
  return <h1>{user.name}</h1>;
}

function App() {
  const userPromise = fetchUser(1); // created outside the component
  return (
    <Suspense fallback={<Spinner />}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}
```

If the Promise is pending, `use()` suspends the component. If the Promise rejects, the error propagates to the nearest `ErrorBoundary`.

**Reading Context conditionally:**

Unlike `useContext`, `use(Context)` can be called inside conditions and loops:

```jsx
function Component({ show }) {
  if (!show) return null;
  const theme = use(ThemeContext); // valid — called conditionally
  return <div style={{ color: theme.color }}>Hello</div>;
}
```

**Key rules:**

- The Promise must be **created outside** the component — creating a new Promise every render causes infinite suspension
- `use()` is not a traditional hook and does not need to follow the Rules of Hooks
- Works in both Client and Server Components

## 🧠 Question 64

**ID**: react-064  
**Title**: What is `useOptimistic` in React 19?  
**Difficulty**: Medium  
**Category**: Concurrent React

### Answer 📄

`useOptimistic` lets you show a speculative (optimistic) UI state while an async operation is in flight, then automatically reverts to the real state when the operation settles.

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
    addOptimisticMessage(text); // update UI immediately
    await sendMessage(text); // actual server call
    // on success: real messages prop updates, replaces optimistic state
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

**Signature:**

```jsx
const [optimisticState, addOptimistic] = useOptimistic(
  state, // current real state
  updateFn, // (currentState, optimisticValue) => newOptimisticState
);
```

**Behavior:**

- While the async action is running, `optimisticState` returns the result of `updateFn`
- When the action settles, React discards the optimistic state and uses the updated real state
- Multiple optimistic updates can be queued and are applied sequentially

## 🧠 Question 65

**ID**: react-065  
**Title**: What is `useActionState` in React 19?  
**Difficulty**: Medium  
**Category**: Concurrent React

### Answer 📄

`useActionState` manages the state that results from a form action. It pairs with Server Actions or async functions to track the result and pending status of form submissions. It was previously called `useFormState` in React's canary channel.

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

**Signature:**

```jsx
const [state, formAction, isPending] = useActionState(action, initialState);
```

- `action`: async function receiving `(previousState, formData)` — can be a Server Action
- `initialState`: the state value before the first submission
- `state`: the return value of the last action invocation
- `formAction`: the wrapped action to pass to `<form action={...}>`
- `isPending`: `true` while the action is in flight

**Key points:**

- The action receives the **previous state** as its first argument (unlike a plain form action)
- Works progressively — the form can be submitted without JavaScript when using a Server Action
- Replaces the old pattern of managing loading/error state manually with `useState` + `useEffect`

## 🧠 Question 66

**ID**: react-066  
**Title**: What are React Server Actions?  
**Difficulty**: Hard  
**Category**: Server Components

### Answer 📄

Server Actions are async functions that run **on the server** but can be called directly from client-side event handlers or form actions. They are a stable React 19 feature, primarily used in frameworks like Next.js App Router.

**Defining a Server Action:**

```js
// actions.js — 'use server' marks this as a server-only module
'use server';

export async function saveUser(formData) {
  const name = formData.get('name');
  await db.users.create({ name }); // direct database access — runs on server only
  revalidatePath('/users');
}
```

**Using in a Server Component (progressive enhancement):**

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

**Using from a Client Component:**

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

**How they work under the hood:**

- The framework compiles Server Actions into HTTP POST endpoint handlers
- Calling a Server Action from the client sends a POST request to the server
- The response is used to update UI state (via `useActionState` or `useOptimistic`)
- They work without JavaScript — the browser can submit the form natively (progressive enhancement)

**Security:**

- Server Actions run in a trusted server environment — you can query databases and access secrets
- Inputs from the client must still be validated and sanitized — the client can send arbitrary `FormData`

## 🧠 Question 67

**ID**: react-067  
**Title**: What is `useFormStatus` in React 19?  
**Difficulty**: Medium  
**Category**: Concurrent React

### Answer 📄

`useFormStatus` reads the submission status of the **parent `<form>`** element. It allows deeply nested components — like a submit button — to know whether the form is currently submitting, without prop drilling.

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
      <SubmitButton /> {/* reads parent form status automatically */}
    </form>
  );
}
```

**What `useFormStatus` returns:**

```ts
{
  pending: boolean; // true while the form action is running
  data: FormData | null; // the FormData being submitted
  method: string | null; // 'get' or 'post'
  action: string | Function | null; // the form's action
}
```

**Critical constraint:**

`useFormStatus` must be used **inside a child component** of the `<form>`. It does not work in the same component that renders the `<form>`.

```jsx
// WRONG — useFormStatus is in the same component as the form
function Form() {
  const { pending } = useFormStatus(); // always returns { pending: false }
  return <form action={action}>...</form>;
}

// CORRECT — useFormStatus is in a child component
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>Submit</button>;
}
```

## 🧠 Question 68

**ID**: react-068  
**Title**: What are the ref improvements in React 19?  
**Difficulty**: Easy  
**Category**: React Basics

### Answer 📄

React 19 introduced two significant improvements to refs:

**1. Refs as props — no more `forwardRef`:**

In React 18 and earlier, passing a ref to a custom component required wrapping it in `React.forwardRef()`:

```jsx
// React 18 — verbose wrapper required
const Input = React.forwardRef((props, ref) => <input ref={ref} {...props} />);

<Input ref={inputRef} />;
```

In React 19, `ref` is passed as a regular prop — no `forwardRef` needed:

```jsx
// React 19 — clean and simple
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

<Input ref={inputRef} />;
```

**2. Ref cleanup functions:**

In React 19, a ref callback can return a cleanup function, similar to `useEffect`. React calls the cleanup when the component unmounts or when the ref changes:

```jsx
function Component() {
  return (
    <div
      ref={(node) => {
        if (!node) return;

        const observer = new ResizeObserver(handleResize);
        observer.observe(node);

        // cleanup: returned function runs on unmount or ref change
        return () => observer.disconnect();
      }}
    />
  );
}
```

Previously you had to manually check for `null` inside the ref callback (React calls it with `null` on unmount). The cleanup function pattern is cleaner and more explicit.

## 🧠 Question 69

**ID**: react-069  
**Title**: How does `Suspense` work for data fetching and how does it integrate with frameworks?  
**Difficulty**: Hard  
**Category**: Concurrent React

### Answer 📄

`Suspense` for data fetching works by components **throwing a Promise** when data is not yet available. React catches the thrown Promise, renders the fallback UI, and re-renders the component once the Promise resolves.

**The underlying mechanism (what libraries implement):**

```jsx
// Simplified version of what TanStack Query does internally
const cache = {};

function fetchUser(id) {
  if (cache[id]?.status === 'success') return cache[id].data;
  if (cache[id]?.status === 'pending') throw cache[id].promise; // suspend
  if (cache[id]?.status === 'error') throw cache[id].error;

  const promise = fetch(`/api/users/${id}`)
    .then((r) => r.json())
    .then((data) => {
      cache[id] = { status: 'success', data };
    });

  cache[id] = { status: 'pending', promise };
  throw promise; // suspend
}

function UserProfile({ id }) {
  const user = fetchUser(id); // suspends if data is not ready
  return <h1>{user.name}</h1>;
}
```

**Framework integration:**

- **Next.js App Router**: Server Components support `async/await` natively. Awaiting inside a Server Component triggers Suspense automatically.
- **TanStack Query**: `useSuspenseQuery` integrates with Suspense — it throws while loading and throws on error.

```jsx
import { useSuspenseQuery } from '@tanstack/react-query';

function UserProfile({ id }) {
  const { data } = useSuspenseQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
  });
  return <h1>{data.name}</h1>; // no loading check needed — Suspense handles it
}

// Usage — boundaries handle loading and error states
<Suspense fallback={<Spinner />}>
  <ErrorBoundary fallback={<ErrorUI />}>
    <UserProfile id={1} />
  </ErrorBoundary>
</Suspense>;
```

**Benefits:**

- Components only describe the success state — loading and error are handled at the boundary level
- Multiple suspended components inside the same `Suspense` boundary are waited on together
- React can abort and retry suspended renders during concurrent mode

## 🧠 Question 70

**ID**: react-070  
**Title**: How does error handling work with Suspense and Error Boundaries?  
**Difficulty**: Hard  
**Category**: React Internals

### Answer 📄

`Suspense` and `ErrorBoundary` work as a pair: Suspense handles the **loading** state, ErrorBoundary handles the **error** state.

```jsx
<ErrorBoundary fallback={<ErrorUI />}>
  <Suspense fallback={<Spinner />}>
    <DataComponent /> {/* can suspend or throw */}
  </Suspense>
</ErrorBoundary>
```

**How errors propagate:**

1. `DataComponent` throws a Promise → Suspense catches it → shows `<Spinner />`
2. The Promise rejects (or the component throws an `Error`) → ErrorBoundary catches it → shows `<ErrorUI />`
3. On success → Suspense removes the fallback and renders `DataComponent` with real data

**Implementing an ErrorBoundary (must be a class component):**

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

**Resetting an ErrorBoundary:**

```jsx
// react-error-boundary library (recommended)
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

**Errors in `useEffect` and event handlers:**

ErrorBoundaries only catch errors thrown **during rendering**. Errors in `useEffect` or event handlers must be caught manually and re-thrown into the render cycle:

```jsx
function Component() {
  const [error, setError] = useState(null);
  if (error) throw error; // re-throw into render — ErrorBoundary catches it

  useEffect(() => {
    fetchData().catch(setError);
  }, []);
}
```

## 🧠 Question 71

**ID**: react-071  
**Title**: What is `React.cache()` in React 19?  
**Difficulty**: Hard  
**Category**: Server Components

### Answer 📄

`React.cache()` memoizes the result of a function call **per server request**. It is designed for React Server Components to deduplicate expensive operations — like database queries — within a single render pass.

```jsx
import { cache } from 'react';

// Both components call getUser(id), but only ONE DB query runs per request
export const getUser = cache(async (id) => {
  return await db.users.findById(id);
});

async function UserProfile({ id }) {
  const user = await getUser(id);
  return <h2>{user.name}</h2>;
}

async function UserAvatar({ id }) {
  const user = await getUser(id); // cache hit — no second DB query
  return <img src={user.avatarUrl} />;
}
```

**Comparison with `useMemo`:**

|               | `React.cache()`     | `useMemo`              |
| ------------- | ------------------- | ---------------------- |
| Where         | Server Components   | Client Components      |
| Cache scope   | Per server request  | Per component instance |
| Cache key     | Function arguments  | Dependency array       |
| Async support | Yes                 | No                     |
| Persistence   | Cleared per request | Lives with component   |

**Key characteristics:**

- Cache is scoped to a single server request — no data leaks between users
- Works with async functions (unlike `useMemo`)
- Must be called at the module level, not inside a component
- Not available on the client — use `useMemo` or TanStack Query for client-side caching

## 🧠 Question 72

**ID**: react-072  
**Title**: What is lazy initialization in `useState`?  
**Difficulty**: Medium  
**Category**: Hooks

### Answer 📄

`useState` accepts either a direct value or an **initializer function**. When you pass a function, React calls it only **once** (on the initial mount) to compute the initial state — this is called lazy initialization.

```jsx
// Non-lazy: expensiveComputation() runs on EVERY render (result is ignored after mount)
const [state, setState] = useState(expensiveComputation());

// Lazy: expensiveComputation() runs only ONCE on mount
const [state, setState] = useState(() => expensiveComputation());
```

**When to use it:**

- Reading from `localStorage` or `sessionStorage`
- Computing initial state from expensive calculations
- Parsing URL parameters or serialized data

```jsx
function Component() {
  const [filters, setFilters] = useState(() => {
    // Only runs once — not on every re-render
    const saved = localStorage.getItem('filters');
    return saved ? JSON.parse(saved) : defaultFilters;
  });
}
```

**Why it matters:**

React ignores the initial state value after the first render. But without the function form, the expression still _evaluates_ on every render — it's just discarded. For expensive operations, this wasted computation adds up across many re-renders.

```jsx
// Each re-render parses the JSON (wasteful — result is thrown away after mount)
const [data, setData] = useState(JSON.parse(heavyJsonString));

// Parses JSON only once (efficient)
const [data, setData] = useState(() => JSON.parse(heavyJsonString));
```

The same pattern applies to `useReducer`:

```jsx
const [state, dispatch] = useReducer(reducer, arg, initFn);
// initFn(arg) is called once to compute the initial state
```

## 🧠 Question 73

**ID**: react-073  
**Title**: How do you prevent memory leaks in React components?  
**Difficulty**: Medium  
**Category**: Effects & Lifecycle

### Answer 📄

Memory leaks in React typically occur when a component sets state after it has unmounted. The fix in every case is a proper cleanup function inside `useEffect`.

**1. Async fetch operations:**

```jsx
// Problematic — setState may be called after unmount
useEffect(() => {
  fetch('/api/data')
    .then((r) => r.json())
    .then((data) => setData(data)); // runs even if component unmounted
}, []);

// Fixed — AbortController cancels the in-flight request on cleanup
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/data', { signal: controller.signal })
    .then((r) => r.json())
    .then((data) => setData(data))
    .catch((err) => {
      if (err.name === 'AbortError') return; // ignore intentional cancellation
    });

  return () => controller.abort();
}, []);
```

**2. Event listeners:**

```jsx
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

**3. Intervals and timeouts:**

```jsx
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);
```

**4. Subscriptions (WebSocket, observables, stores):**

```jsx
useEffect(() => {
  const subscription = eventBus.subscribe(topic, handleMessage);
  return () => subscription.unsubscribe();
}, [topic]);
```

**The rule:** every `useEffect` that sets up something persistent — a network request, event listener, timer, or subscription — must return a cleanup function that tears it down.

React 18 StrictMode deliberately mounts → unmounts → remounts effects in development to expose missing cleanup functions early.

## 🧠 Question 74

**ID**: react-074  
**Title**: What is `React.Children` and when do you use it?  
**Difficulty**: Medium  
**Category**: Architecture & Patterns

### Answer 📄

`React.Children` is a utility for safely working with the `children` prop. The `children` prop can be a single element, an array, `null`, `undefined`, a string, or a number — `React.Children` normalizes all of these.

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

**Available methods:**

- `React.Children.map(children, fn)` — like `Array.map`, handles `null`/`undefined`
- `React.Children.forEach(children, fn)` — like `Array.forEach`
- `React.Children.count(children)` — total number of children
- `React.Children.only(children)` — asserts exactly one child, throws otherwise
- `React.Children.toArray(children)` — converts children to a flat array with stable keys

**When to use it:**

- Building layout components that need to iterate over or count children
- Adding a wrapper element around each child
- Filtering or selecting specific children by type

**Modern alternative:**

The React team now recommends passing render props or arrays of objects instead of relying on `React.Children`, because:

- It breaks when children are wrapped in a `Fragment`
- It doesn't compose well with components that return arrays
- `React.cloneElement` (often paired with `React.Children`) is considered an escape hatch

```jsx
// Modern preferred pattern — explicit slots via props
function Tabs({ tabs }) {
  return tabs.map((tab) => <TabPanel key={tab.id} {...tab} />);
}
```

## 🧠 Question 75

**ID**: react-075  
**Title**: What is `displayName` in React and why does it matter?  
**Difficulty**: Easy  
**Category**: React Basics

### Answer 📄

`displayName` is a string property you set on a component to control how it appears in React DevTools, error messages, and stack traces.

**Why it's needed:**

In production builds, function names are minified (`a`, `b`, `c`). Even in development, anonymous arrow functions lose their names. `displayName` provides a stable, human-readable label.

**Setting it on an HOC:**

```jsx
function withAuth(Component) {
  function WithAuth(props) {
    const user = useAuth();
    if (!user) return <Redirect to="/login" />;
    return <Component {...props} />;
  }

  // DevTools shows "withAuth(Button)" instead of "WithAuth" or "Component"
  WithAuth.displayName = `withAuth(${Component.displayName ?? Component.name})`;
  return WithAuth;
}
```

**Setting it on Context:**

```jsx
const ThemeContext = React.createContext(null);
ThemeContext.displayName = 'ThemeContext'; // DevTools shows meaningful name
```

**Named vs anonymous functions:**

```jsx
// Anonymous — DevTools may show "Component"
const MyList = memo(({ items }) => <ul>{...}</ul>);

// Named — DevTools shows "memo(MyList)"
const MyList = memo(function MyList({ items }) {
  return <ul>{...}</ul>;
});
```

**Who sets it automatically:**

Libraries like `styled-components`, `Apollo Client`, and `react-query` set `displayName` on their generated components automatically, which is why they tend to have readable DevTools output without any manual work.

## 🧠 Question 76

**ID**: react-076  
**Title**: How do you test React components with React Testing Library?  
**Difficulty**: Medium  
**Category**: React Basics

### Answer 📄

React Testing Library (RTL) is the standard for testing React components. Its philosophy: **test behavior from the user's perspective, not implementation details**.

**Basic test:**

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

**Query priority (RTL recommendation — use in this order):**

1. `getByRole` — most accessible; tests what users and screen readers see
2. `getByLabelText` — for form inputs with labels
3. `getByPlaceholderText` — fallback for inputs without labels
4. `getByText` — for non-interactive content
5. `getByTestId` — last resort (couples tests to implementation)

**Async testing:**

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

**What NOT to test:**

- Internal state values (`component.state`)
- Component method calls
- Implementation details that have no effect on user experience

## 🧠 Question 77

**ID**: react-077  
**Title**: How do you test custom hooks in React?  
**Difficulty**: Medium  
**Category**: Hooks

### Answer 📄

Custom hooks cannot be called outside a React component. The `renderHook` utility from `@testing-library/react` provides a minimal component wrapper to test hooks in isolation.

```jsx
// Hook under test
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

**Testing with different props (rerender):**

```jsx
test('resets to new initial value on rerender', () => {
  const { result, rerender } = renderHook(
    ({ initial }) => useCounter(initial),
    { initialProps: { initial: 0 } },
  );

  expect(result.current.count).toBe(0);

  rerender({ initial: 100 });
  // note: count does not reset — initialValue only applies on first mount
});
```

**Testing hooks that require context:**

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

Always wrap state-changing calls in `act()` to flush React's update queue before asserting.

## 🧠 Question 78

**ID**: react-078  
**Title**: What is `act()` in React testing and why is it necessary?  
**Difficulty**: Medium  
**Category**: React Internals

### Answer 📄

`act()` is a testing utility that ensures all state updates, effects, and re-renders triggered by a piece of code have been **fully processed** before you make assertions.

**Why it's needed:**

React batches state updates and processes effects asynchronously. Without `act()`, you assert against a stale UI — the component hasn't re-rendered yet.

```jsx
// Without act() — stale assertion (may fail)
test('broken test', () => {
  render(<Counter />);
  screen.getByRole('button').click(); // triggers state update
  // React hasn't re-rendered yet
  expect(screen.getByText('Count: 1')).toBeInTheDocument(); // might fail
});

// With act() — React flushes all updates before assertion
test('correct test', () => {
  render(<Counter />);

  act(() => {
    screen.getByRole('button').click();
  });

  expect(screen.getByText('Count: 1')).toBeInTheDocument(); // passes
});
```

**React Testing Library handles `act()` automatically:**

RTL's `fireEvent`, `userEvent`, `render`, and `waitFor` all wrap their operations in `act()` internally. You rarely need to call `act()` directly when using RTL.

**Async `act()`:**

```jsx
test('loads data', async () => {
  render(<DataComponent />);

  await act(async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Load' }));
  });

  expect(screen.getByText('Loaded Data')).toBeInTheDocument();
});
```

**`act()` warnings:**

If you see `Warning: An update to Component inside a test was not wrapped in act(...)`, a state update happened outside of `act()` — typically from an async operation that resolved after the test ended. Fix by awaiting all async operations within `act()` or using `waitFor`.

## 🧠 Question 79

**ID**: react-079  
**Title**: Why does `useContext` cause unnecessary re-renders and how do you solve it?  
**Difficulty**: Hard  
**Category**: Performance Optimization

### Answer 📄

`useContext` subscribes a component to the **entire** context value. Whenever any part of that value changes, every component consuming that context re-renders — even if it only uses one field.

```jsx
const AppContext = createContext({
  user: null,
  theme: 'light',
  language: 'en',
});

// This re-renders on EVERY AppContext change — even theme or language changes
function Avatar() {
  const { user } = useContext(AppContext);
  return <img src={user.avatar} />;
}
```

**Solutions:**

**1. Split contexts by update frequency (recommended):**

```jsx
const UserContext = createContext(null);
const ThemeContext = createContext('light');

// Avatar only re-renders when UserContext changes
function Avatar() {
  const user = useContext(UserContext);
  return <img src={user.avatar} />;
}
```

**2. Memoize the context value:**

```jsx
function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  // Without useMemo: new object reference on every render triggers all consumers
  const value = useMemo(
    () => ({ user, theme, setUser, setTheme }),
    [user, theme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
```

**3. Wrap consumers in `React.memo`:**

```jsx
const Avatar = React.memo(function Avatar({ user }) {
  return <img src={user.avatar} />;
});

function AvatarConnected() {
  const { user } = useContext(AppContext);
  return <Avatar user={user} />; // Avatar only re-renders if user reference changes
}
```

**4. Context selectors (`use-context-selector` library):**

```jsx
import { createContext, useContextSelector } from 'use-context-selector';

function Avatar() {
  const user = useContextSelector(AppContext, (ctx) => ctx.user);
  // Only re-renders when ctx.user changes
  return <img src={user.avatar} />;
}
```

**React's current stance:**

React does not have a built-in context selector API. The recommended approach is to split contexts by domain. An official selector API has been discussed but has not been released.

## 🧠 Question 80

**ID**: react-080  
**Title**: What is the `key` prop trick for resetting component state?  
**Difficulty**: Medium  
**Category**: Rendering Behavior

### Answer 📄

Changing a component's `key` prop forces React to **unmount the old instance and mount a completely fresh one** — including resetting all internal state. This is intentional and sometimes the most elegant solution to a state synchronization problem.

```jsx
function ParentForm({ userId }) {
  return (
    // When userId changes, React destroys the old Form and creates a new one
    // All useState inside Form resets to initial values automatically
    <Form key={userId} userId={userId} />
  );
}
```

**The problem it solves:**

When the same component type renders with different data, React reuses the existing instance and only updates props. State initialized in `useState` does **not** reset unless you handle it explicitly.

```jsx
// Problem: switching users doesn't reset the form's draft state
function UserForm({ userId }) {
  const [name, setName] = useState(''); // persists across userId changes
}

// Solution 1: key prop (simplest)
<UserForm key={userId} userId={userId} />;

// Solution 2: useEffect to reset (verbose — must list every state piece)
useEffect(() => {
  setName('');
  setEmail('');
  // ...reset all fields
}, [userId]);
```

**Practical examples:**

```jsx
// Reset a timer when the exercise changes
<Timer key={currentExercise.id} duration={currentExercise.duration} />

// Reset a rich text editor when the document changes
<Editor key={documentId} initialContent={document.content} />

// Force re-trigger of an animation
<AnimatedBanner key={animationTrigger} message={message} />
```

**Important:** the component being keyed must fully initialize its state from props (or from an initializer function), since all internal state resets to the values passed to `useState` on the fresh mount.

## 🧠 Question 81

**ID**: react-081  
**Title**: What is the headless component pattern?  
**Difficulty**: Medium  
**Category**: Architecture & Patterns

### Answer 📄

A headless component separates **logic and state** from **UI markup**. The component provides behavior (accessibility, keyboard interaction, state management) but renders nothing itself — the consumer provides all the markup.

```jsx
// Headless toggle hook — pure logic, no UI
function useToggle(initialState = false) {
  const [on, setOn] = useState(initialState);
  const toggle = useCallback(() => setOn((v) => !v), []);
  const setToggle = useCallback((v) => setOn(Boolean(v)), []);
  return { on, toggle, setToggle };
}

// Consumer 1 — checkbox UI
function FeatureFlag({ label }) {
  const { on, toggle } = useToggle();
  return (
    <label>
      <input type="checkbox" checked={on} onChange={toggle} />
      {label}
    </label>
  );
}

// Consumer 2 — switch UI (same logic, different UI)
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

**Where you see headless components in the wild:**

- **Radix UI** — `<DropdownMenu.Root>`, `<Dialog.Root>`, `<Popover.Root>`: unstyled, fully accessible primitives
- **react-aria** (Adobe) — hooks like `useButton`, `useCheckbox`, `useSelect` with full ARIA handling
- **Downshift** — headless autocomplete/combobox
- **TanStack Table** — headless table with sorting, filtering, pagination

**Why it matters:**

- The same logic can power many visual variants
- Logic is tested independently of markup
- Design systems can build on top of headless primitives without fighting opinionated styles

## 🧠 Question 82

**ID**: react-082  
**Title**: What is the Provider pattern in React?  
**Difficulty**: Medium  
**Category**: Architecture & Patterns

### Answer 📄

The Provider pattern uses React Context to inject dependencies, configuration, or shared state into a component subtree — without prop drilling. It is React's approach to dependency injection.

```jsx
// Define context + hook with a guard
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

// Root — wrap once
function App() {
  return (
    <ConfigProvider config={{ apiUrl: 'https://api.example.com', env: 'prod' }}>
      <Router />
    </ConfigProvider>
  );
}

// Any nested component — no prop drilling
function UserService() {
  const { apiUrl } = useConfig();
  // ...
}
```

**Composing multiple providers:**

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

**Best practices:**

- Always export a custom hook (not the raw Context) — the hook enforces the guard and hides the Context implementation
- Memoize the provider value to prevent unnecessary re-renders of all consumers
- Split providers by domain (Auth, Theme, Config) rather than one giant global provider

## 🧠 Question 83

**ID**: react-083  
**Title**: What are Presentational and Container components?  
**Difficulty**: Easy  
**Category**: Architecture & Patterns

### Answer 📄

The Presentational/Container pattern (popularized by Dan Abramov in 2015) splits components into two categories:

|              | Presentational  | Container                    |
| ------------ | --------------- | ---------------------------- |
| Concern      | How things look | How things work              |
| Data source  | Props only      | State, Context, or stores    |
| Side effects | None            | Data fetching, subscriptions |
| Reusability  | High            | Low                          |

```jsx
// Presentational — pure UI, stateless
function UserCard({ name, avatar, onFollow }) {
  return (
    <div className="card">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <button onClick={onFollow}>Follow</button>
    </div>
  );
}

// Container — data fetching and logic
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

**Modern perspective:**

Dan Abramov himself later noted he no longer recommends the pattern as a strict rule. Custom hooks now cleanly separate logic from presentation without needing to split into two component files.

```jsx
// Modern — hook extracts the "container" logic
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

The key insight — separating concerns — remains valid; the mechanism (two component files vs. hooks) has evolved.

## 🧠 Question 84

**ID**: react-084  
**Title**: What is feature-based folder structure in React?  
**Difficulty**: Easy  
**Category**: Architecture & Patterns

### Answer 📄

Feature-based (domain-based) folder structure organizes code **by feature** rather than by technical type. This scales significantly better than a type-based structure as projects grow.

**Type-based (doesn't scale):**

```text
src/
  components/    ← hundreds of files mixed together
  hooks/
  utils/
  services/
  types/
```

**Feature-based (scales well):**

```
src/
  features/
    auth/
      components/     LoginForm.tsx, AuthGuard.tsx
      hooks/          useAuth.ts, useSession.ts
      api/            auth.api.ts
      types.ts
      index.ts        ← public API of this feature
    products/
      components/     ProductCard.tsx, ProductList.tsx
      hooks/          useProducts.ts, useCart.ts
      api/            products.api.ts
      types.ts
      index.ts
    orders/
      ...
  shared/
    components/       Button, Input, Modal (reusable UI)
    hooks/            useDebounce, useLocalStorage
    utils/            format, validate
    types/            common types
  app/
    App.tsx
    router.tsx
    store.ts
```

**The `index.ts` as public API:**

Each feature exports only what other features need to know about:

```ts
// features/auth/index.ts
export { AuthProvider, AuthGuard } from './components';
export { useAuth } from './hooks/useAuth';
export type { User, AuthState } from './types';
// Internal implementation details are NOT exported
```

**Benefits over type-based:**

- All code related to a feature lives together → easier to navigate
- Features can be deleted or extracted as a unit
- Scales to large teams — teams own features, not file types

## 🧠 Question 85

**ID**: react-085  
**Title**: What are barrel files and what are their trade-offs?  
**Difficulty**: Medium  
**Category**: Architecture & Patterns

### Answer 📄

A barrel file is an `index.ts` (or `index.js`) that re-exports from other modules, creating a single entry point for a folder.

```ts
// components/index.ts — barrel file
export { Button } from './Button';
export { Input } from './Input';
export { Modal } from './Modal';

// Consumer — clean import
import { Button, Modal } from '@/components';
// vs without barrel:
import { Button } from '@/components/Button/Button';
```

**Benefits:**

- Cleaner import paths for consumers
- Ability to control the public API of a module
- Easy refactoring — move internals without changing consumer imports

**Trade-offs and pitfalls:**

**1. Tree shaking issues:**
Bundlers may import the entire barrel even if you only use one export, if the barrel is seen as having side effects.

Fix: set `"sideEffects": false` in `package.json`, or use direct path imports for production bundles.

**2. Slow dev server startup (Vite/ESBuild):**
Deep barrel chains force the bundler to process many files on startup. Vite specifically warns about this pattern.

**3. Circular dependency risk:**
If `ModuleA` is in a barrel that `ModuleA` also imports from, you get circular dependency errors.

**Best practice:** Use barrel files at the feature level (one per feature) rather than creating deep barrel chains.

## 🧠 Question 86

**ID**: react-086  
**Title**: Why does React favor composition over inheritance?  
**Difficulty**: Easy  
**Category**: Architecture & Patterns

### Answer 📄

React's component model is built entirely on **composition** — combining smaller components — rather than class inheritance hierarchies.

**Why inheritance fails for UI:**

```jsx
// If React used inheritance, you could only extend one class
class FancyBorderedDialog extends BorderedBox { ... }
// Problem: UI needs to combine many concerns, not just extend one
```

**How React achieves the same goals with composition:**

```jsx
// Children prop — structural composition
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

// Hooks — logic composition (modern approach)
function UserDashboard() {
  const user = useAuth();
  const theme = useTheme();
  const { data } = useUserData();
  // ...
}
```

**React's official guidance:**

> "If you want to reuse non-UI functionality between components, extract it into a separate JavaScript module."

Custom hooks are the primary mechanism for sharing logic. They compose naturally — a hook can call other hooks — without the complexity of class hierarchies.

## 🧠 Question 87

**ID**: react-087  
**Title**: How do you choose between local state, lifted state, Context, and external stores?  
**Difficulty**: Medium  
**Category**: Architecture & Patterns

### Answer 📄

State placement is one of the most impactful architectural decisions in React. Use the simplest solution that satisfies the actual requirements.

**Decision framework:**

```
Is the state used by only one component?
  └─ YES → Local state (useState)

Is the state used by a few closely related components?
  └─ YES → Lift state to the nearest common ancestor

Is the state needed across many components far apart in the tree?
  ├─ Global UI state (theme, locale, auth user) → Context API
  └─ Frequently updated or complex state?
      ├─ Server state (data from APIs) → TanStack Query / SWR
      └─ Complex client state → Zustand / Redux Toolkit
```

**In practice:**

```jsx
// 1. Local state
const [isOpen, setIsOpen] = useState(false);

// 2. Lifted state
function Parent() {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <List onSelect={setSelected} />
      <Detail item={selected} />
    </>
  );
}

// 3. Context — read-heavy, rarely changes
const user = useContext(AuthContext);

// 4. TanStack Query — server data with caching
const { data: products } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
});

// 5. Zustand — shared UI state mutated from many places
const count = useStore((state) => state.count);
```

**Common mistakes:**

- Putting everything in a global store (over-engineering)
- Using Context for frequently updated state (causes excessive re-renders)
- Not using TanStack Query/SWR for server data (reinventing caching/loading/error handling)

## 🧠 Question 88

**ID**: react-088  
**Title**: What is Zustand and how does it work?  
**Difficulty**: Medium  
**Category**: State Management

### Answer 📄

Zustand is a minimal, fast, and scalable state management library. It uses a single store (plain JavaScript object) with actions defined alongside state, and React hooks for subscription.

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

**Using in components — subscribe to slices:**

```jsx
// Only re-renders when items.length changes
const itemCount = useCartStore((state) => state.items.length);

// Only re-renders when total changes
const total = useCartStore((state) => state.total);

// Actions are stable references — no re-render concern
const addItem = useCartStore((state) => state.addItem);
```

**Middleware:**

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

**Why Zustand over Redux:**

- Zero boilerplate — no actions, reducers, or dispatchers
- No Provider wrapper needed (store lives outside React)
- Selector-based subscriptions prevent unnecessary re-renders
- Async actions are plain async functions inside the store

## 🧠 Question 89

**ID**: react-089  
**Title**: What is Redux Toolkit and how does it modernize Redux?  
**Difficulty**: Medium  
**Category**: State Management

### Answer 📄

Redux Toolkit (RTK) is the official, opinionated way to write Redux code. It eliminates the boilerplate of vanilla Redux while keeping its predictable state container and DevTools.

**`createSlice` — combines action creators + reducer:**

```js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    }, // Immer allows direct "mutations"
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

**`createAsyncThunk` — async actions:**

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

**RTK Query — built-in data fetching:**

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

**RTK vs Zustand:**

RTK shines for large teams needing strict patterns and time-travel debugging. Zustand is better for small-medium apps that want minimal boilerplate.

## 🧠 Question 90

**ID**: react-090  
**Title**: What is TanStack Query and how does it manage server state?  
**Difficulty**: Medium  
**Category**: State Management

### Answer 📄

TanStack Query (formerly React Query) manages **server state** — data fetched from APIs. It handles caching, background refetching, deduplication, loading/error states, and cache invalidation automatically.

```jsx
// Reading data
function UserProfile({ id }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    staleTime: 5 * 60 * 1000, // data is fresh for 5 minutes
  });

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage error={error} />;
  return <div>{data.name}</div>;
}

// Mutations (writes)
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

**Why server state needs its own library:**

Server state is fundamentally different from client state — it lives remotely, can become stale, requires async fetching, and may be needed by multiple components simultaneously. TanStack Query provides:

- **Deduplication**: multiple `useQuery` calls with the same key share one network request
- **Background refetch**: queries refetch when the browser tab regains focus
- **Stale-while-revalidate**: shows cached data immediately, fetches fresh data in the background

## 🧠 Question 91

**ID**: react-091  
**Title**: How do you implement optimistic updates with TanStack Query?  
**Difficulty**: Hard  
**Category**: State Management

### Answer 📄

Optimistic updates show the expected result of a mutation immediately before the server confirms it. TanStack Query supports this via `onMutate`, `onError`, and `onSettled`.

```jsx
const toggleTodo = useMutation({
  mutationFn: ({ id, completed }) => updateTodo(id, { completed }),

  // 1. Optimistically update the cache
  onMutate: async ({ id, completed }) => {
    await queryClient.cancelQueries({ queryKey: ['todos'] });
    const previousTodos = queryClient.getQueryData(['todos']);

    queryClient.setQueryData(['todos'], (old) =>
      old.map((todo) => (todo.id === id ? { ...todo, completed } : todo)),
    );

    return { previousTodos }; // snapshot for rollback
  },

  // 2. On error, roll back
  onError: (err, variables, context) => {
    queryClient.setQueryData(['todos'], context.previousTodos);
  },

  // 3. On settle, sync with server truth
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});
```

**The three-phase pattern:**

1. `onMutate` — apply optimistic update + save rollback snapshot
2. `onError` — restore rollback snapshot
3. `onSettled` — always invalidate (runs after `onSuccess` or `onError`)

**When to use:** Actions that almost always succeed (toggling, liking, reordering). Not ideal for frequently-failing operations (payments, complex validation).

## 🧠 Question 92

**ID**: react-092  
**Title**: How do you build a multi-step form in React?  
**Difficulty**: Medium  
**Category**: Architecture & Patterns

### Answer 📄

Multi-step forms require managing: current step, shared data across steps, per-step validation, and navigation. `useReducer` works well as a mini state machine.

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

**Considerations:**

- Validate each step before allowing forward navigation
- Save progress in `sessionStorage` to survive page refreshes
- Sync the current step with the URL for shareable deep links

## 🧠 Question 93

**ID**: react-093  
**Title**: What is the polymorphic component pattern ("as" prop)?  
**Difficulty**: Medium  
**Category**: Architecture & Patterns

### Answer 📄

A polymorphic component renders as different HTML elements or custom components depending on the `as` prop, while keeping its own styles and behavior.

```tsx
// JavaScript version
function Text({ as: Component = 'p', children, ...props }) {
  return <Component {...props}>{children}</Component>;
}

<Text>Paragraph</Text>                    // renders <p>
<Text as="h1">Heading</Text>             // renders <h1>
<Text as={Link} to="/about">Link</Text>  // renders <Link>
```

**TypeScript — fully typed polymorphic component:**

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

// TypeScript knows href is valid because as="a"
<Text as="a" href="/home">Go home</Text>

// TypeScript error — href is not valid for "p"
<Text href="/home">Wrong</Text>
```

**Common use cases:** `Button` that can be `<button>` or `<a>` or `<Link>`, `Text` that can be any heading level, `Card` that can be `<div>` or `<article>`.

**Alternative:** `@radix-ui/react-slot` provides the `asChild` prop, a cleaner alternative that avoids complex TypeScript generics.

## 🧠 Question 94

**ID**: react-094  
**Title**: What is the slot pattern in React?  
**Difficulty**: Medium  
**Category**: Architecture & Patterns

### Answer 📄

The slot pattern allows parent components to inject content into named areas of a child component — similar to slots in Vue or Web Components.

**Named props approach (most common):**

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

**Radix UI `asChild` pattern (behavioral slots):**

```jsx
// asChild renders the component's behavior onto the consumer's element
<Dialog.Trigger asChild>
  <MyCustomButton>Open Dialog</MyCustomButton>
  {/* MyCustomButton now has Dialog's trigger ARIA + onClick behavior */}
</Dialog.Trigger>
```

**When to use:** Layout and shell components that accept structured content from consumers without dictating the content's implementation.

## 🧠 Question 95

**ID**: react-095  
**Title**: How do you handle accessibility (a11y) in React?  
**Difficulty**: Medium  
**Category**: Architecture & Patterns

### Answer 📄

Accessibility in React follows HTML/ARIA standards but requires extra attention because dynamic rendering can break native browser behaviors.

**Semantic HTML first:**

```jsx
// Wrong — div has no keyboard access, no role for screen readers
<div onClick={handleSubmit}>Submit</div>

// Correct — button is keyboard accessible and has implicit role="button"
<button onClick={handleSubmit}>Submit</button>
```

**ARIA attributes for custom widgets:**

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

**Focus management for modals:**

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

**Keyboard navigation:** All interactive elements must be reachable via `Tab`. Handle `Enter`, `Space`, `Escape`, and arrow keys where applicable.

**Tooling:**

- `eslint-plugin-jsx-a11y` — catches common a11y mistakes at lint time
- `@axe-core/react` — runtime accessibility audit in development
- `react-aria` (Adobe) — complete headless accessibility primitives

## 🧠 Question 96

**ID**: react-096  
**Title**: How do you implement internationalization (i18n) in React?  
**Difficulty**: Medium  
**Category**: Architecture & Patterns

### Answer 📄

Internationalization handles translation, locale-specific formatting, and RTL layout. The standard library is **react-i18next**.

**Setup and usage:**

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
      {/* 'rtl' for Arabic/Persian */}
      <h1>{t('greeting', { name: user.name })}</h1>
      <p>{t('items', { count: user.cartCount })}</p>{' '}
      {/* automatic pluralization */}
      <button onClick={() => i18n.changeLanguage('fa')}>فارسی</button>
    </header>
  );
}
```

**Date and number formatting with `Intl`:**

```js
// Built into all modern browsers — no extra library needed
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

**RTL support:**

```js
document.documentElement.dir = i18n.dir(); // 'rtl' or 'ltr'
document.documentElement.lang = i18n.language;
// In CSS: use logical properties (margin-inline-start instead of margin-left)
```

## 🧠 Question 97

**ID**: react-097  
**Title**: What is a design system in the context of React component libraries?  
**Difficulty**: Medium  
**Category**: Architecture & Patterns

### Answer 📄

A design system is a collection of reusable components, design tokens (colors, spacing, typography), and usage guidelines that ensure visual and behavioral consistency.

**Design tokens — the foundation:**

```css
:root {
  --color-primary-500: #3b82f6;
  --spacing-4: 1rem;
  --radius-md: 0.375rem;
}
```

**Component variants with CVA (class-variance-authority):**

```tsx
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center rounded font-medium focus-visible:outline-none', // base
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

**Popular design systems built with React:**

- **shadcn/ui** — copy-paste components (Radix UI + Tailwind)
- **Radix UI** — headless accessible primitives
- **MUI (Material UI)** — complete opinionated system
- **Chakra UI** — accessible, themeable components

## 🧠 Question 98

**ID**: react-098  
**Title**: What is a good testing strategy for a React application?  
**Difficulty**: Medium  
**Category**: Architecture & Patterns

### Answer 📄

A balanced React testing strategy follows the **testing pyramid** — many unit tests, fewer integration tests, fewest E2E tests.

```
┌──────────────────────────┐
│    E2E Tests (few)       │  Playwright, Cypress
│  Integration Tests (some)│  RTL + MSW
│  Unit Tests (many)       │  Vitest, Jest
└──────────────────────────┘
```

**Unit tests — hooks and utilities:**

```jsx
test('useCounter increments', () => {
  const { result } = renderHook(() => useCounter(0));
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});
```

**Integration tests — components with mocked APIs (MSW):**

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

**E2E tests — critical flows:**

```js
test('user can sign in', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name=email]', 'user@example.com');
  await page.fill('[name=password]', 'password');
  await page.click('button[type=submit]');
  await expect(page).toHaveURL('/dashboard');
});
```

**Priority:** Unit-test all hooks and utilities → Integration-test all user-facing features → E2E only the most critical paths (sign up, checkout, core workflow).

## 🧠 Question 99

**ID**: react-099  
**Title**: How do you design a good component API in React?  
**Difficulty**: Medium  
**Category**: Architecture & Patterns

### Answer 📄

A well-designed component API is easy to use correctly and hard to misuse.

**1. Sensible defaults:**

```jsx
// Bad — requires 5 props just to render a default button
<Button variant="solid" colorScheme="blue" size="md" type="button" isDisabled={false}>Click</Button>

// Good — works out of the box
<Button>Click</Button>
<Button variant="outline">Click</Button>
```

**2. Discriminated state over boolean combinations:**

```jsx
// Bad — allows impossible combinations: loading AND error AND disabled
<Button isLoading isDisabled isError />

// Better — mutually exclusive via union type
<Button status="loading" />  // status: 'idle' | 'loading' | 'success' | 'error'
```

**3. Event callbacks named `onX`:**

```jsx
<Select onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
```

**4. Spread `...props` for extensibility:**

```jsx
function Card({ title, children, className, ...props }) {
  return (
    <div className={`card ${className ?? ''}`} {...props}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
// Consumer can add data-testid, aria-*, onClick, etc.
```

**5. Composition over configuration:**

```jsx
// Bad — 15 props to configure every aspect
<Button leftIcon={<SearchIcon />} rightIcon={<ArrowIcon />} iconSpacing={2} />

// Good — children handles composition
<Button><SearchIcon /> Search <ArrowIcon /></Button>
```

**6. Data and handler separation:**

```jsx
// Good — parent provides data, component handles presentation
<ProductList products={products} onProductClick={handleClick} />
```

This pattern keeps data presentation and event response cleaner.

## 🧠 Question 100

**ID**: react-100  
**Title**: What is micro-frontend architecture with React?  
**Difficulty**: Hard  
**Category**: Architecture & Patterns

### Answer 📄

Micro-frontends apply microservices principles to the frontend: breaking a large application into independently developed, deployed, and scaled frontend slices.

**Integration approaches:**

**1. Build-time — npm packages:**

```jsx
// Team A publishes their feature
import { CheckoutWidget } from '@company/checkout-widget';
```

Simple but requires coordinated releases; all teams share the same React version.

**2. Runtime — Module Federation (Webpack 5):**

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

**Key challenges:**

- **Shared dependencies**: use `singleton: true` to ensure one React instance
- **Shared state**: use URL params, `localStorage`, or `postMessage`
- **Design consistency**: shared design system package
- **Performance**: each micro-frontend adds bundle overhead

**When to use:** Large organizations with multiple teams shipping independently. For most projects, a well-structured monolith is simpler and faster.

## 🧠 Question 101

**ID**: react-101  
**Title**: How does code splitting work in React beyond basic `React.lazy`?  
**Difficulty**: Medium  
**Category**: Performance Optimization

### Answer 📄

Code splitting breaks a bundle into smaller chunks loaded on demand. `React.lazy` is the entry point, but real-world usage requires handling named exports, preloading, and error recovery.

**Named exports (React.lazy requires default exports):**

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

**Route-based splitting (most impactful):**

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

**Preloading on hover (eliminates loading delay):**

```jsx
const AdminPanel = lazy(() => import('./AdminPanel'));

function NavItem() {
  const preload = () => import('./AdminPanel'); // starts download before click

  return (
    <Link to="/admin" onMouseEnter={preload} onFocus={preload}>
      Admin
    </Link>
  );
}
```

**Handling chunk load failures:**

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

**What to split:** routes (always), modal/drawer content, complex editors or charts (Monaco, Chart.js), admin sections.

## 🧠 Question 102

**ID**: react-102  
**Title**: How do you analyze and reduce a React app's bundle size?  
**Difficulty**: Medium  
**Category**: Performance Optimization

### Answer 📄

Bundle bloat is one of the most impactful performance problems. The workflow: measure → identify → fix → verify.

**Step 1 — Visualize:**

```bash
npx vite-bundle-visualizer          # Vite
npx webpack-bundle-analyzer         # Webpack
npx source-map-explorer dist/**/*.js # universal
```

**Step 2 — Common culprits and fixes:**

**Large date libraries:**

```js
// moment.js — 67kB gzipped, includes all locales
import moment from 'moment';

// date-fns — tree-shakeable, import only what you use (~5kB total)
import { format, parseISO } from 'date-fns';
```

**Full library imports:**

```js
// Bad — imports all of lodash (~70kB)
import _ from 'lodash';

// Good — import only the function
import groupBy from 'lodash/groupBy';
```

**Unoptimized icon libraries:**

```js
// Safe — explicit path import, always tree-shakeable
import FiSearch from 'react-icons/fi/FiSearch';
```

**Step 3 — Check new packages before installing:**

Check `bundlephobia.com` before adding any new npm package. Many packages have lighter alternatives.

**Step 4 — Verify with Lighthouse:**

After optimization, measure FCP and TBT in Lighthouse to confirm user-visible improvement.

## 🧠 Question 103

**ID**: react-103  
**Title**: How do Core Web Vitals apply to React applications?  
**Difficulty**: Hard  
**Category**: Performance Optimization

### Answer 📄

Core Web Vitals (CWV) are Google's metrics for user experience. React apps have specific patterns that affect each one.

**LCP — Largest Contentful Paint (target: < 2.5s):**

```jsx
// Never lazy-load the LCP element
<img
  src={hero}
  loading="eager"
  fetchpriority="high"
  width={1200}
  height={600}
/>

// Route-based code splitting reduces JS that blocks first render
```

Code splitting at the route level also helps ensure that less JavaScript blocks the initial render.

**INP — Interaction to Next Paint (target: < 200ms):**

```jsx
// Problem: 300ms synchronous computation blocks the thread
function handleSearch(query) {
  const results = searchAllItems(query);
  setResults(results);
}

// Fix: useTransition keeps UI responsive
function handleSearch(query) {
  setInputValue(query); // urgent — instant
  startTransition(() => {
    setResults(searchAllItems(query)); // deferred
  });
}
```

**CLS — Cumulative Layout Shift (target: < 0.1):**

```jsx
// Problem: content shifts when data loads
{isLoading ? null : <UserCard user={user} />}

// Fix: skeleton that matches the final element's size
{isLoading ? <UserCardSkeleton /> : <UserCard user={user} />}

// Problem: image without dimensions
<img src={avatar} />

// Fix: explicit dimensions prevent layout shift
<img src={avatar} width={48} height={48} />
```

**Measuring in production:**

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

## 🧠 Question 104

**ID**: react-104  
**Title**: What are the pitfalls of `React.memo` and how do you use its comparison function?  
**Difficulty**: Hard  
**Category**: Performance Optimization

### Answer 📄

`React.memo` prevents re-rendering when props haven't changed (shallow equality). But several common patterns silently break it.

**Pitfall — inline objects and functions create new references every render:**

```jsx
// BROKEN — new object and function every render; memo never skips
function Parent() {
  return (
    <MemoizedChild
      style={{ color: 'red' }} // new reference every render
      onClick={() => doSomething()} // new reference every render
    />
  );
}

// FIXED — stable references via useMemo and useCallback
function Parent() {
  const style = useMemo(() => ({ color: 'red' }), []);
  const onClick = useCallback(() => doSomething(), []);
  return <MemoizedChild style={style} onClick={onClick} />;
}
```

**Custom comparison function:**

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

**When `React.memo` makes things WORSE:**

- Component renders cheaply — comparison overhead exceeds the saving
- Props change on nearly every render — memo never prevents re-renders
- Component has many props — comparison cost grows linearly

**When it genuinely helps:**

- Expensive list items where parent re-renders frequently
- Pure display components with stable prop values

**Always verify with the React Profiler** before and after — don't add `memo` speculatively.

## 🧠 Question 105

**ID**: react-105  
**Title**: How do you implement debounce and throttle in React hooks?  
**Difficulty**: Medium  
**Category**: Performance Optimization

### Answer 📄

Debounce delays execution until after a pause; throttle limits execution to once per interval.

**`useDebounce` — debounce a value:**

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

**`useDebouncedCallback` — debounce a function (avoids stale closures):**

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

**`useThrottle` — throttle a value:**

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

**Stale closure pitfall:** When debouncing a callback via `useCallback`, use a `ref` to always call the latest version of the callback (as shown in `useDebouncedCallback`).

## 🧠 Question 106

**ID**: react-106  
**Title**: How do you implement infinite scroll in React?  
**Difficulty**: Medium  
**Category**: Performance Optimization

### Answer 📄

Infinite scroll loads more content as the user scrolls near the bottom. The modern approach uses `IntersectionObserver` to detect when a sentinel element enters the viewport.

**Manual implementation:**

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

**With TanStack Query (recommended):**

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

**Infinite scroll vs pagination:** Use infinite scroll for feeds and exploratory browsing. Use pagination when users need to navigate to a specific page, share a URL to a position, or when new items appear at the top.

## 🧠 Question 107

**ID**: react-107  
**Title**: How do you use the React Profiler to find performance bottlenecks?  
**Difficulty**: Medium  
**Category**: Performance Optimization

### Answer 📄

The React Profiler (in React DevTools) records renders and shows which components rendered, how long they took, and why.

**Using DevTools Profiler:**

1. Open React DevTools → **Profiler** tab
2. Click **Record** (⏺)
3. Perform the slow interaction
4. Click **Stop** and analyze

**Reading the flame chart:**

- **Width** = time spent rendering (wider = slower)
- **Color** = gray (did not render this commit), yellow/orange (rendered — darker = slower)
- **Hover** = shows exact render time and which prop/state triggered it

**The `Profiler` component API:**

```jsx
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration, baseDuration) {
  // baseDuration = estimated time without memoization
  // If actualDuration << baseDuration, memoization is working
  if (actualDuration > 16)
    console.warn(`${id} slow: ${actualDuration.toFixed(2)}ms`);
}

<Profiler id="ProductList" onRender={onRenderCallback}>
  <ProductList />
</Profiler>;
```

**Common findings and fixes:**

| Finding                                   | Fix                                           |
| ----------------------------------------- | --------------------------------------------- |
| Component renders on every parent render  | `React.memo`                                  |
| Object/function props change every render | `useMemo` / `useCallback`                     |
| Many list items re-render on one change   | Virtualization + stable keys                  |
| Context consumer re-renders unnecessarily | Split contexts                                |
| High `actualDuration`, low `baseDuration` | Memoization working; base computation is slow |

**Tip:** Enable "Record why each component rendered" in Profiler settings — it shows exactly which prop or state triggered each render.

## 🧠 Question 108

**ID**: react-108  
**Title**: What are the performance trade-offs of CSS-in-JS vs CSS Modules?  
**Difficulty**: Medium  
**Category**: Performance Optimization

### Answer 📄

CSS-in-JS and CSS Modules represent two fundamentally different styling approaches with distinct performance profiles.

**Runtime CSS-in-JS (styled-components, Emotion):**

```jsx
const Button = styled.button`
  background: ${(props) => (props.primary ? '#3b82f6' : '#e5e7eb')};
`;
```

On every render, the library: interpolates the template literal, hashes it to a class name, checks if the class already exists in the stylesheet, and injects a `<style>` tag if not. This adds ~4-8ms of JavaScript execution per render for complex components, plus ~30kB bundle overhead.

**Zero-runtime CSS-in-JS (vanilla-extract, linaria):**

```js
import { style } from '@vanilla-extract/css';

export const button = style({ background: '#3b82f6' }); // extracted at build time
```

No runtime cost — produces a plain CSS file and class names.

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

Zero runtime cost, fully static, excellent tree-shaking, no SSR style flash.

**Recommendation:**

| Concern                      | Winner                      |
| ---------------------------- | --------------------------- |
| Runtime performance          | CSS Modules or zero-runtime |
| Dynamic styles (props-based) | Runtime CSS-in-JS           |
| SSR compatibility            | CSS Modules                 |
| Bundle size                  | CSS Modules                 |

For performance-sensitive apps: CSS Modules + Tailwind or vanilla-extract.

## 🧠 Question 109

**ID**: react-109  
**Title**: How do you optimize images in a React application?  
**Difficulty**: Easy  
**Category**: Performance Optimization

### Answer 📄

Images are often the largest assets and a primary cause of poor LCP and CLS scores.

**1. Lazy loading:**

```jsx
<img src={product.image} alt={product.name} loading="lazy" />
// Never lazy-load the LCP (above-fold) image
<img src={hero} alt="Hero" loading="eager" fetchpriority="high" />
```

**2. Explicit dimensions to prevent CLS:**

```jsx
// Without dimensions: browser doesn't reserve space → layout shift
// With dimensions: browser reserves correct space immediately
<img src={avatar} alt="User" width={48} height={48} />
```

**3. Modern formats:**

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

**5. Blur placeholder (LQIP):**

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

**Next.js:** The `<Image>` component handles all of the above automatically.

## 🧠 Question 110

**ID**: react-110  
**Title**: How does Streaming SSR work in React 18?  
**Difficulty**: Hard  
**Category**: SSR / Hydration

### Answer 📄

Traditional SSR generates a complete HTML string before sending anything to the client. Streaming SSR (React 18) sends HTML progressively as parts of the page become ready.

**Traditional SSR:** Server renders everything (2000ms) → sends full HTML → client hydrates.

**Streaming SSR:** Server sends shell (50ms) → streams content chunks as data resolves → client hydrates incrementally.

**`renderToPipeableStream` (Node.js):**

```jsx
import { renderToPipeableStream } from 'react-dom/server';

function handler(req, res) {
  const { pipe, abort } = renderToPipeableStream(<App />, {
    bootstrapScripts: ['/static/js/main.js'],

    onShellReady() {
      res.setHeader('Content-Type', 'text/html');
      pipe(res); // start streaming immediately
    },

    onShellError(error) {
      res.status(500).send('<h1>Something went wrong</h1>');
    },
  });

  setTimeout(abort, 10000); // abort slow renders
}
```

**Suspense as streaming boundaries:**

```jsx
function App() {
  return (
    <html>
      <body>
        <Header /> {/* sent in shell — immediately */}
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductList /> {/* streamed when DB query resolves */}
        </Suspense>
        <Suspense fallback={<ReviewsSkeleton />}>
          <Reviews /> {/* streamed independently */}
        </Suspense>
      </body>
    </html>
  );
}
```

**Selective hydration:** React 18 doesn't hydrate the entire page at once. If a user clicks an element before its Suspense boundary is hydrated, React prioritizes hydrating that boundary first.

## 🧠 Question 111

**ID**: react-111  
**Title**: What is tree shaking and how do you ensure it works in a React project?  
**Difficulty**: Medium  
**Category**: Performance Optimization

### Answer 📄

Tree shaking eliminates dead code (unused exports) from the final bundle. Bundlers perform it automatically for ES modules — but common patterns break it.

**ES modules enable static analysis:**

```js
// CommonJS — tree shaking impossible (dynamic, runtime)
const { format } = require('date-fns'); // entire library included

// ESM — static imports allow dead code elimination
import { format } from 'date-fns'; // only `format` and its deps
```

**What breaks tree shaking:**

**1. Missing `sideEffects` declaration:**

```json
// package.json
{ "sideEffects": false }  // tells bundler: all files are side-effect free
// or specify which files have side effects:
{ "sideEffects": ["./src/polyfills.js", "*.css"] }
```

**2. Deep barrel chains with side effects:**

```js
// Risky: if any re-exported module has side effects, the whole barrel is kept
export * from './Button';
export * from './Modal'; // if Modal imports a side-effectful CSS file
```

**3. Libraries using `require()` conditionally:**

Runtime requires prevent static analysis. Prefer ESM-only packages.

**Verifying tree shaking:**

```bash
npx vite-bundle-visualizer
```

If you see a large library that you are only consuming a small portion of, tree shaking probably didn't work properly.

**Practical example:**

```js
// react-icons — correctly tree-shakeable
import { FiSearch } from 'react-icons/fi'; // only FiSearch in bundle
```

## 🧠 Question 112

**ID**: react-112  
**Title**: How do you optimize animation performance in React?  
**Difficulty**: Medium  
**Category**: Performance Optimization

### Answer 📄

Animations that trigger layout recalculation on every frame cause visible jank. The solution: only animate GPU-composited properties.

**GPU-composited properties (animate these — 60fps):**

```css
/* Only transform and opacity can be animated without layout/paint */
transform: translateX(100px) scale(1.1);
opacity: 0.5;
```

**Properties to avoid animating (cause reflow):**

```css
/* These recalculate layout on every frame */
width, height, top, left, margin, padding
```

**CSS transitions (simplest, best performance):**

```jsx
function AnimatedCard({ isVisible }) {
  return (
    <div
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        opacity: isVisible ? 1 : 0,
        transition: 'transform 300ms ease, opacity 300ms ease',
        willChange: 'transform, opacity', // browser creates a new compositor layer
      }}
    >
      Content
    </div>
  );
}
```

**Framer Motion for declarative animations:**

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

**Avoiding layout thrashing:**

```js
// Bad — read/write interleaved forces multiple reflows
elements.forEach((el) => {
  const h = el.offsetHeight; // read (forces layout)
  el.style.height = h * 2 + 'px'; // write (invalidates layout)
});

// Good — batch all reads then all writes
const heights = elements.map((el) => el.offsetHeight);
elements.forEach((el, i) => {
  el.style.height = heights[i] * 2 + 'px';
});
```

## 🧠 Question 113

**ID**: react-113  
**Title**: What is partial hydration and the islands architecture?  
**Difficulty**: Hard  
**Category**: SSR / Hydration

### Answer 📄

Traditional React SSR hydrates the **entire page** as one application — even static content. Partial hydration only hydrates truly interactive components.

**The problem with full hydration:**

```text
Server: renders 10,000 words + 3 interactive buttons
Client: downloads JS for ALL of it → hydrates everything including static text
(wasted work — static text never needs JavaScript)
```

**Islands Architecture:**

```text
Page = 🌊 Static HTML ocean
     + 🏝 Island (shopping cart — interactive, hydrated)
     + 🏝 Island (search bar — interactive, hydrated)
     + 🌊 Static HTML (rest — NO JavaScript needed)
```

**React Server Components as partial hydration:**

```jsx
// Server Component — rendered to HTML, NO JS sent to client
async function BlogPost({ id }) {
  const post = await db.posts.findById(id);
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p> {/* static — zero JS hydration */}
      <CommentSection postId={id} /> {/* 'use client' — this IS hydrated */}
    </article>
  );
}

('use client');
function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  // ...interactive — this is the "island"
}
```

**Why it matters:** A content-heavy page may need < 10KB of JavaScript instead of 200KB+ when using partial hydration. First Contentful Paint and Time to Interactive improve dramatically.

## 🧠 Question 114

**ID**: react-114  
**Title**: How do you handle long tasks and keep React apps responsive?  
**Difficulty**: Hard  
**Category**: Performance Optimization

### Answer 📄

A long task is any JavaScript execution that takes more than 50ms. It blocks the browser from responding to user input, causing visible jank.

**Identifying long tasks:**

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.warn(`Long task: ${entry.duration.toFixed(0)}ms`);
  });
});
observer.observe({ entryTypes: ['longtask'] });
```

**Strategy 1 — `useTransition` (React-managed deferral):**

```jsx
function handleSearch(query) {
  setInputValue(query); // urgent — instant feedback
  startTransition(() => {
    setResults(heavySearch(query)); // deferred — can be interrupted
  });
}
```

**Strategy 2 — Chunked processing (yield to browser between chunks):**

```js
async function processItems(items, CHUNK = 100) {
  const results = [];
  for (let i = 0; i < items.length; i += CHUNK) {
    results.push(...items.slice(i, i + CHUNK).map(expensiveTransform));
    await new Promise((resolve) => setTimeout(resolve, 0)); // yield
  }
  return results;
}
```

**Strategy 3 — Web Workers (move computation off the main thread):**

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

**Decision framework:**

- < 50ms: no action needed
- 50–200ms, React state: `useTransition`
- 50–200ms, data processing: chunk with `setTimeout`
- > 200ms, pure computation: Web Worker

## 🧠 Question 115

**ID**: react-115  
**Title**: How do you monitor React application performance in production?  
**Difficulty**: Medium  
**Category**: Performance Optimization

### Answer 📄

Development tools only show performance in controlled conditions. Production monitoring captures real-user metrics from actual devices and networks.

**Core Web Vitals in production:**

```jsx
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  navigator.sendBeacon(
    '/analytics',
    JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating, // 'good' | 'needs-improvement' | 'poor'
      url: window.location.href,
    }),
  );
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
```

**Error monitoring with Sentry:**

```jsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'your-dsn',
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 0.1, // sample 10% of transactions
});

const App = Sentry.withErrorBoundary(AppRoot, { fallback: <ErrorPage /> });
```

**React Profiler API for production measurement:**

```jsx
function onRender(id, phase, actualDuration) {
  if (actualDuration > 16) {
    // slower than one 60fps frame
    logSlowRender({ component: id, duration: actualDuration, phase });
  }
}

<Profiler id="CheckoutForm" onRender={onRender}>
  <CheckoutForm />
</Profiler>;
```

**Custom performance marks:**

```js
performance.mark('cart-open-start');
openCart();
performance.mark('cart-open-end');
performance.measure('cart-open', 'cart-open-start', 'cart-open-end');

const [m] = performance.getEntriesByName('cart-open');
sendToAnalytics({ name: 'cart-open', value: m.duration });
```

## 🧠 Question 116

**ID**: react-116  
**Title**: What is the complete checklist for avoiding unnecessary re-renders in React?  
**Difficulty**: Hard  
**Category**: Performance Optimization

### Answer 📄

**1. Stable prop references — useMemo for objects/arrays:**

```jsx
const config = useMemo(() => ({ sortBy: 'name' }), []);
<List config={config} />;
```

**2. Stable callback references — useCallback:**

```jsx
const handleClick = useCallback(() => doSomething(id), [id]);
<Button onClick={handleClick} />;
```

**3. React.memo for expensive pure components:**

```jsx
const ExpensiveList = React.memo(({ items }) =>
  items.map((i) => <Row key={i.id} item={i} />),
);
```

**4. Split Context by update frequency:**

```jsx
<UserContext.Provider>   {/* changes rarely */}
  <ThemeContext.Provider>  {/* changes on toggle */}
    <CartContext.Provider> {/* changes often */}
```

**5. Pass children as JSX (not created inside the component):**

```jsx
// Child doesn't re-render when Parent's unrelated state changes
function App() {
  return (
    <Parent>
      <Child />
    </Parent>
  );
}
```

**6. useMemo for derived state:**

```jsx
const sorted = useMemo(() => [...items].sort(compareFn), [items]);
```

**7. Define helper components outside the render scope:**

```jsx
// Row defined outside List — stable component type
const Row = ({ item }) => <div>{item.name}</div>;
function List({ items }) {
  return items.map((i) => <Row key={i.id} item={i} />);
}
```

**8. Zustand selectors — subscribe to slices:**

```jsx
const count = useStore((state) => state.count); // not the whole store
```

**9. Virtualize long lists:**

Use `react-window` or `react-virtual` — only render visible items.

**10. Use stable unique keys:**

Never use array index as key for lists that can reorder or filter.

**11. Avoid state in render:**

Don't derive new values inline — memoize them.

**12. Prefer composition over context for frequently-updated state:**

Pass data through props or render props for subtrees that update often.

## 🧠 Question 117

**ID**: react-117  
**Title**: How do you use TypeScript with React for advanced type safety?  
**Difficulty**: Medium  
**Category**: Architecture & Patterns

### Answer 📄

**Component props — extending native HTML attributes:**

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

**Event handler types:**

```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {};
const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {};
```

**Generic components:**

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

// TypeScript infers T as User
<Select
  options={users}
  value={selected}
  onChange={setSelected}
  getLabel={(u) => u.name}
/>;
```

**Discriminated unions for variant-driven components:**

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
        <button onClick={props.onRetry}>Retry</button> // TypeScript knows onRetry exists here
      )}
    </div>
  );
}
```

**`ComponentPropsWithoutRef` for wrapper components:**

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

## 🧠 Question 118

**ID**: react-118  
**Title**: What are the key differences between React DOM and React Native?  
**Difficulty**: Easy  
**Category**: React Basics

### Answer 📄

React DOM and React Native share the **same React reconciler** — same component model, same hooks, same rendering concepts — but use different **renderers** targeting different platforms.

**Core differences:**

|            | React DOM                    | React Native                          |
| ---------- | ---------------------------- | ------------------------------------- |
| Target     | Browser DOM                  | iOS / Android native views            |
| Styling    | CSS (classes, inline style)  | StyleSheet API (JS objects, no units) |
| Layout     | CSS Flexbox + Grid           | Flexbox only                          |
| Components | `<div>`, `<span>`, `<input>` | `<View>`, `<Text>`, `<TextInput>`     |
| Events     | `onClick`, `onChange`        | `onPress`, `onChangeText`             |
| Navigation | React Router                 | React Navigation                      |

**Styling differences:**

```jsx
// React DOM
<div style={{ backgroundColor: 'blue', fontSize: 16 }}>Hello</div>;

// React Native — no CSS, no units, flexbox default
import { View, Text, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'blue' },
  text: { fontSize: 16, color: 'white' },
});
<View style={styles.container}>
  <Text style={styles.text}>Hello</Text>
</View>;
```

**Platform-specific code:**

```jsx
import { Platform } from 'react-native';
const shadow = Platform.select({
  ios: { shadowColor: '#000', shadowOpacity: 0.2 },
  android: { elevation: 4 },
});
```

**What transfers between platforms:**

- Custom hooks (pure logic, no platform-specific APIs)
- Business logic utilities
- TypeScript types and interfaces
- `react-native-web` renders React Native components in the browser

## 🧠 Question 119

**ID**: react-119  
**Title**: What does `StrictMode` actually do in React 18 and why do effects run twice?  
**Difficulty**: Medium  
**Category**: React Internals

### Answer 📄

`StrictMode` is a development-only tool that catches bugs early by intentionally invoking certain functions multiple times. In React 18 it introduces **double-invocation of effects**.

**What StrictMode does in React 18:**

1. **Renders components twice** — detects side effects in render
2. **Mounts effects twice** (mount → cleanup → mount) — detects missing cleanup functions _(new in React 18)_
3. Warns about deprecated APIs
4. Warns about state updates in unexpected lifecycle positions

**Why effects fire twice:**

React 18 is designed for Concurrent Mode, where components may mount, unmount, and remount without user-visible change (for features like the upcoming `<Activity>` component). StrictMode simulates this to surface cleanup issues early.

```jsx
useEffect(() => {
  const ws = new WebSocket(url);
  ws.onmessage = handleMessage;
  console.log('connected'); // logs TWICE in dev StrictMode

  return () => {
    ws.close();
    console.log('disconnected'); // logs ONCE (cleanup of first mount)
  };
}, [url]);
```

**What double-invocation catches:**

```jsx
// Bug: WebSocket opened twice, second connection leaks
useEffect(() => {
  const ws = new WebSocket(url);
  ws.onmessage = handleMessage;
  // Missing: return () => ws.close();
}, [url]);
```

**What double-invocation is NOT:**

- Does not happen in production
- Does not affect renders visible to users
- Does not mean your component mounts twice for the user

**Best practice:** if double-invocation breaks your effect, you have a missing cleanup function — fix it, don't disable `StrictMode`.

## 🧠 Question 120

**ID**: react-120  
**Title**: What are React's priority lanes and how does the concurrent scheduler work?  
**Difficulty**: Hard  
**Category**: React Internals

### Answer 📄

React's concurrent scheduler uses a **lanes model** to assign priority to every update. Higher-priority updates interrupt lower-priority ones to keep the UI responsive.

**Priority lanes (highest to lowest):**

```
SyncLane              — synchronous (flushSync, legacy mode)
InputContinuousLane   — continuous input (typing, dragging)
DefaultLane           — normal updates (setState in event handlers)
TransitionLane        — useTransition / startTransition updates
IdleLane              — offscreen, prefetching
```

**How lanes flow from user events:**

```jsx
function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    setQuery(e.target.value); // → InputContinuousLane (high priority)
    startTransition(() => {
      setResults(search(e.target.value)); // → TransitionLane (low priority)
    });
  }
}
```

**How the scheduler works:**

1. Every state update is tagged with a lane
2. The scheduler processes the **highest-priority lane first**
3. If a higher-priority update arrives during a lower-priority render, React **suspends the current work**, processes the urgent update, then **resumes or discards** the low-priority work
4. **Time slicing**: React breaks long renders into ~5ms chunks, yielding to the browser between chunks to allow input handling

**The work loop (simplified):**

```js
while (workInProgress !== null) {
  if (shouldYieldToHost()) break; // yield every ~5ms
  performUnitOfWork(workInProgress);
}
// Schedule the remaining work for the next frame
```

**Why this matters for applications:**

Understanding lanes explains why `useTransition` works: wrapping an update in `startTransition` moves it from `DefaultLane` to `TransitionLane`, allowing React to interrupt it when the user types again — discarding the in-progress render and starting fresh with the new input value.

## 🧠 Question 121

**ID**: react-121  
**Title**: What is a stale closure in React and how does it cause bugs in `useEffect`?  
**Difficulty**: Medium  
**Category**: Edge Cases & Pitfalls

### Answer 📄

A stale closure occurs when a function captures a variable from its surrounding scope at creation time, but that variable later changes — leaving the function referencing an outdated value.

In React, this most commonly appears inside `useEffect` when the dependency array is incomplete:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(count); // always logs 0 — stale closure!
      setCount(count + 1); // always sets 1, never increments
    }, 1000);
    return () => clearInterval(id);
  }, []); // count is captured once at mount
}
```

**Why it happens:** The effect closes over `count` when it runs. Because `[]` means "run once", the closure is never re-created and `count` remains `0` forever.

**Fix 1 — functional update form** (best when you only need the previous value):

```jsx
setCount((prev) => prev + 1); // no closure over count needed
```

**Fix 2 — add the dependency** (re-creates interval on each change):

```jsx
useEffect(() => {
  const id = setInterval(() => setCount(count + 1), 1000);
  return () => clearInterval(id); // cleanup the old one
}, [count]);
```

**Fix 3 — ref to hold the latest value** (for callbacks that must not re-subscribe):

```jsx
const countRef = useRef(count);
useEffect(() => {
  countRef.current = count;
}); // keep ref current

useEffect(() => {
  const id = setInterval(() => setCount(countRef.current + 1), 1000);
  return () => clearInterval(id);
}, []);
```

The `exhaustive-deps` ESLint rule catches most stale closure bugs at authoring time.

## 🧠 Question 122

**ID**: react-122  
**Title**: What causes infinite re-render loops in React and how do you fix them?  
**Difficulty**: Medium  
**Category**: Edge Cases & Pitfalls

### Answer 📄

An infinite loop occurs when a render triggers a state update, which triggers another render, endlessly.

**Cause 1 — setState called unconditionally during render:**

```jsx
function Bad() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // runs every render → triggers render → repeat
}
```

Fix: move state updates into event handlers or effects.

**Cause 2 — useEffect with a missing or unstable dependency:**

```jsx
useEffect(() => {
  setData(transform(data)); // setData → re-render → same effect runs again
}, [data]); // data is recreated every render if it is an object/array
```

Fix: memoize the dependency with `useMemo`, or use the functional update form.

**Cause 3 — object/array created inline as a dependency:**

```jsx
useEffect(() => {
  fetchUser(options);
}, [{ id: 1 }]); // new object reference every render → effect always re-runs
```

Fix: move the object outside the component, or `useMemo` it inside.

**Cause 4 — parent and child updating each other:**

```jsx
// Parent passes onChildChange; child calls it on render → parent updates state
// → child re-renders → calls onChildChange again
```

Fix: memoize callbacks with `useCallback`, or restructure data flow to be unidirectional.

**Debugging tip:** React DevTools Profiler shows which component is re-rendering and the reason. `console.count('render')` inside the component makes infinite loops immediately visible.

## 🧠 Question 123

**ID**: react-123  
**Title**: Why do object and array literals in JSX cause unnecessary re-renders?  
**Difficulty**: Easy  
**Category**: Edge Cases & Pitfalls

### Answer 📄

In JavaScript, object and array literals create a **new reference** every time they are evaluated. When you write them directly inside JSX, they are recreated on every render, so React's reference equality check (`===`) always sees them as changed.

**The problem:**

```jsx
function Parent() {
  return <Child style={{ color: 'red' }} />;
  // { color: 'red' } is a NEW object on every Parent render
}

const Child = React.memo(({ style }) => <div style={style} />);
// React.memo checks: prevStyle === nextStyle → false every time → re-renders anyway
```

**Same issue with arrays and callbacks:**

```jsx
<List items={[1, 2, 3]} /> // new array every render
<Button onClick={() => doSomething()} /> // new function every render
```

**Fixes:**

```jsx
// 1. Move stable values outside the component
const STYLE = { color: 'red' };
function Parent() {
  return <Child style={STYLE} />;
}

// 2. useMemo for computed objects
const options = useMemo(() => ({ filter, page }), [filter, page]);

// 3. useCallback for event handlers
const handleClick = useCallback(() => doSomething(id), [id]);
```

This issue only matters for children wrapped in `React.memo` or values used in `useEffect` / `useMemo` dependency arrays. For plain components without memoization, the new reference is harmless — the real cost is breaking memoization that was intended to skip re-renders.

## 🧠 Question 124

**ID**: react-124  
**Title**: What happens when you update state inside a render function?  
**Difficulty**: Easy  
**Category**: Edge Cases & Pitfalls

### Answer 📄

Calling `setState` directly during the render body (outside any event handler or effect) causes React to immediately schedule a new render, creating an infinite loop and crashing the app.

**Unconditional update — always wrong:**

```jsx
function Bad() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // triggers re-render → setCount again → infinite loop
  return <div>{count}</div>;
}
```

**The one legitimate pattern — conditional update during render:**

React explicitly supports a conditional `setState` during render as a replacement for the class-based `getDerivedStateFromProps`. React detects the synchronous update, re-renders the component immediately (without painting the intermediate state), and only allows this once per render cycle:

```jsx
function List({ items }) {
  const [prevItems, setPrevItems] = useState(items);
  const [selection, setSelection] = useState(null);

  // Allowed: conditional, based on a prop change, runs synchronously
  if (items !== prevItems) {
    setPrevItems(items);
    setSelection(null); // reset derived state when items change
  }

  return <ul>{/* ... */}</ul>;
}
```

React allows this pattern only when the update is **conditional** and based on a **prop or previous state**. Even then, the React team recommends `useMemo` for derived values or `key`-based resets as cleaner alternatives.

## 🧠 Question 125

**ID**: react-125  
**Title**: How do race conditions occur in `useEffect` data fetching and how do you prevent them?  
**Difficulty**: Hard  
**Category**: Edge Cases & Pitfalls

### Answer 📄

A race condition in data fetching occurs when multiple async requests are in-flight simultaneously and an older, slower response overwrites a newer, faster one.

**The scenario:**

```jsx
useEffect(() => {
  fetch(`/api/user/${userId}`)
    .then((res) => res.json())
    .then((data) => setUser(data)); // whichever response arrives last wins
}, [userId]);
// User clicks: id=1 (slow) → id=2 (fast) → id=2's result is shown
// → id=1 response arrives late and OVERWRITES with stale data
```

**Fix 1 — boolean ignore flag (simple, no extra APIs):**

```jsx
useEffect(() => {
  let cancelled = false;

  fetch(`/api/user/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      if (!cancelled) setUser(data); // discard if effect re-ran
    });

  return () => {
    cancelled = true;
  }; // cleanup: mark previous effect stale
}, [userId]);
```

**Fix 2 — AbortController (cancels the network request itself):**

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/user/${userId}`, { signal: controller.signal })
    .then((res) => res.json())
    .then((data) => setUser(data))
    .catch((err) => {
      if (err.name !== 'AbortError') throw err; // ignore intentional aborts
    });

  return () => controller.abort();
}, [userId]);
```

**Fix 3 — use a data-fetching library:** TanStack Query, SWR, and React's `use()` hook all handle race conditions automatically. This is the recommended production approach.

**React StrictMode** deliberately runs effects twice in development, which immediately exposes race conditions by triggering cleanup before the first response arrives.

## 🧠 Question 126

**ID**: react-126  
**Title**: What are common mistakes when updating objects and arrays in React state?  
**Difficulty**: Easy  
**Category**: Edge Cases & Pitfalls

### Answer 📄

React state updates must be **immutable** — you never mutate the existing state object directly. Mutations do not trigger re-renders because React compares state by reference, and a mutated object has the same reference as before.

**Mutation (wrong):**

```jsx
// Objects
const [user, setUser] = useState({ name: 'Ali', age: 25 });
user.age = 26; // mutates existing object — React sees no change
setUser(user); // same reference → no re-render

// Arrays
const [items, setItems] = useState([1, 2, 3]);
items.push(4); // mutates in place
setItems(items); // same reference → no re-render
```

**Correct immutable patterns:**

```jsx
// Update an object field
setUser((prev) => ({ ...prev, age: 26 }));

// Add to an array
setItems((prev) => [...prev, 4]);

// Remove from an array
setItems((prev) => prev.filter((item) => item !== 2));

// Update an item in an array
setItems((prev) =>
  prev.map((item) => (item.id === id ? { ...item, done: true } : item)),
);

// Nested object update
setState((prev) => ({
  ...prev,
  address: { ...prev.address, city: 'Tehran' },
}));
```

**For deep nesting**, the Immer library (used by Redux Toolkit) lets you write mutating-style code that is internally converted to immutable updates:

```jsx
import produce from 'immer';

setState(
  produce((draft) => {
    draft.user.address.city = 'Tehran'; // safe — Immer handles immutability
  }),
);
```

## 🧠 Question 127

**ID**: react-127  
**Title**: How does reading stale state inside async callbacks lead to bugs?  
**Difficulty**: Medium  
**Category**: Edge Cases & Pitfalls

### Answer 📄

Async callbacks — Promises, `setTimeout`, event listeners — capture the state value that existed **when the callback was created**, not when it runs. If state changes before the callback executes, it reads the old (stale) value.

**Classic bug with setTimeout:**

```jsx
function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setTimeout(() => {
      // count is captured at click time, e.g. count = 3
      alert(`Count is: ${count}`); // shows 3 even if count is now 10
    }, 3000);
  }
}
```

**Classic bug with async/await:**

```jsx
async function handleSubmit() {
  const result = await saveToServer(formData);
  // by the time await resolves, `user` state may have changed
  console.log(user.id); // potentially stale user
}
```

**Fix 1 — functional setState (for updates only):**

```jsx
setTimeout(() => {
  setCount((prev) => prev + 1); // always uses current state, not captured value
}, 1000);
```

**Fix 2 — ref to hold the latest value:**

```jsx
const countRef = useRef(count);
useEffect(() => {
  countRef.current = count;
}); // keep ref current

setTimeout(() => {
  console.log(countRef.current); // always fresh
}, 3000);
```

**Fix 3 — read state at action time, pass as argument** rather than reading inside the async gap.

Refs are the standard escape hatch when you need the latest value inside a long-lived callback without re-subscribing it.

## 🧠 Question 128

**ID**: react-128  
**Title**: What is the `exhaustive-deps` ESLint rule and when (if ever) should you suppress it?  
**Difficulty**: Medium  
**Category**: Edge Cases & Pitfalls

### Answer 📄

`exhaustive-deps` is a rule from `eslint-plugin-react-hooks` that warns when a `useEffect`, `useMemo`, or `useCallback` dependency array is missing values that are referenced inside the callback.

**What it catches:**

```jsx
const [userId, setUserId] = useState(1);

useEffect(() => {
  fetchUser(userId); // userId used here
}, []);
// Warning: React Hook useEffect has a missing dependency: 'userId'
```

The rule enforces the fundamental contract: every reactive value used inside an effect must be listed as a dependency so the effect re-runs when that value changes. Missing deps = stale closures.

**Fixing violations — prefer restructuring over suppression:**

```jsx
// Wrong fix: suppress the warning
// eslint-disable-next-line react-hooks/exhaustive-deps

// Right fix 1: add the dependency
useEffect(() => {
  fetchUser(userId);
}, [userId]);

// Right fix 2: move the function inside the effect
useEffect(() => {
  function load() {
    fetchUser(userId);
  }
  load();
}, [userId]);

// Right fix 3: wrap the function in useCallback
const loadUser = useCallback(() => fetchUser(userId), [userId]);
useEffect(() => {
  loadUser();
}, [loadUser]);
```

**When suppression is genuinely legitimate (rare):**

- You intentionally run the effect only on mount and the referenced value is provably stable (e.g., a ref, a dispatch function from `useReducer`, or a value from outside React)
- Integrating with a third-party library that must only be initialized once
- You have verified through reasoning that re-running would be harmful and cleanup handles the staleness

Even in these cases, add a comment explaining why:

```jsx
useEffect(() => {
  analytics.init(config); // config is module-level constant, safe to omit
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

Suppressing without understanding the warning is how stale closure bugs are introduced silently.

## 🧠 Question 129

**ID**: react-129  
**Title**: How do you split and compose multiple Context providers to avoid unnecessary re-renders?  
**Difficulty**: Medium  
**Category**: Context API

### Answer 📄

Every consumer of a context re-renders whenever that context's **value reference changes**. Putting unrelated state into a single large context means a theme change triggers re-renders in components that only care about the user, and vice versa.

**Anti-pattern — one giant context:**

```jsx
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [cart, setCart] = useState([]);

  // Any state change recreates this object → ALL consumers re-render
  return (
    <AppContext.Provider
      value={{ user, theme, cart, setUser, setTheme, setCart }}
    >
      {children}
    </AppContext.Provider>
  );
}
```

**Correct pattern — one context per concern:**

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

**Composer utility to keep nesting clean:**

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

**Additionally — split state from dispatch:**

```jsx
const CartStateContext = createContext(); // changes often → only cart UI re-renders
const CartDispatchContext = createContext(); // stable → action creators never re-render

// dispatch from useReducer is stable across renders — safe to put in its own context
```

This is the single most impactful optimization for Context-heavy applications.

## 🧠 Question 130

**ID**: react-130  
**Title**: How do you combine `useContext` and `useReducer` as a lightweight global state solution?  
**Difficulty**: Medium  
**Category**: Context API

### Answer 📄

Pairing `useReducer` with Context gives you a Redux-like pattern — centralized state, a pure reducer, and dispatchable actions — without any external library.

**Setup:**

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

**Usage:**

```jsx
function CartSummary() {
  const { items } = useCartState(); // re-renders only when state changes
  return <span>{items.length} items</span>;
}

function AddToCartButton({ product }) {
  const dispatch = useCartDispatch(); // never re-renders — dispatch is stable
  return (
    <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}>
      Add to cart
    </button>
  );
}
```

**When to use vs. external libraries:**

- ✅ Use for medium-complexity apps, teams avoiding extra dependencies, state that does not need DevTools or middleware
- ✅ Reach for Zustand / Redux Toolkit for large apps, time-travel debugging, complex async flows, persistence middleware

## 🧠 Question 131

**ID**: react-131  
**Title**: What are context selectors and why does React not have them natively?  
**Difficulty**: Hard  
**Category**: Context API

### Answer 📄

A **context selector** lets a component subscribe to only a specific slice of a context value, re-rendering only when that slice changes — similar to how Redux's `useSelector` works.

**The native problem:**

```jsx
const store = createContext({ user: null, theme: 'light', cart: [] });

function UserAvatar() {
  const { user } = useContext(store);
  // Re-renders whenever theme OR cart changes — even though user did not
}
```

React's `useContext` uses reference equality on the **entire context value**. There is no built-in way to subscribe to part of it.

**Why React does not include it natively:**

Implementing selectors requires either a subscription model (each consumer registers a selector and is notified individually) or memoization inside the context mechanism. React's model intentionally keeps Context simple — the team recommends solving the problem through context splitting rather than selectors.

**Library solution:**

```jsx
// use-context-selector (community library)
import { createContext, useContextSelector } from 'use-context-selector';

const StoreContext = createContext(null);

function UserAvatar() {
  const user = useContextSelector(StoreContext, (ctx) => ctx.user);
  return <img src={user.avatar} />;
  // Only re-renders when context.user changes
}
```

**React's recommended workarounds:**

1. **Split contexts** — separate `UserContext`, `ThemeContext`, `CartContext` (most idiomatic)
2. **Memoize children** — `React.memo` on consumers so they skip re-renders when their derived props have not changed
3. **Use Zustand** — its subscription model is selector-based by design

For truly granular subscriptions across a large app, Zustand or Jotai is the pragmatic answer over fighting Context's limitations.

## 🧠 Question 132

**ID**: react-132  
**Title**: How do you test a component that consumes a React Context?  
**Difficulty**: Medium  
**Category**: Context API

### Answer 📄

Components that call `useContext` need to be rendered inside the corresponding Provider. The standard approach is a custom `render` helper that wraps every test with all required providers.

**Basic approach — wrap in Provider directly:**

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

**Custom render helper (recommended for larger projects):**

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
export { customRender as render }; // override default render
```

**Usage in tests:**

```jsx
import { render, screen } from './test-utils'; // custom render

test('CartSummary shows 0 items initially', () => {
  render(<CartSummary />); // automatically wrapped in providers
  expect(screen.getByText('0 items')).toBeInTheDocument();
});
```

**Testing with a specific initial state** — pass a pre-seeded Provider:

```jsx
render(
  <CartProvider initialState={{ items: [{ id: 1, name: 'Widget' }] }}>
    <CartSummary />
  </CartProvider>,
);
// requires CartProvider to accept an initialState prop
```

Adding an `initialState` prop to your Provider from the start is a low-cost change that makes testing significantly cleaner.

## 🧠 Question 133

**ID**: react-133  
**Title**: How does React Hook Form work and why does it outperform controlled components?  
**Difficulty**: Medium  
**Category**: Forms & Events

### Answer 📄

React Hook Form (RHF) manages form state using **uncontrolled inputs** with refs internally, avoiding the re-render-per-keystroke that controlled components (`useState` per field) produce.

**Controlled component — re-renders on every keystroke:**

```jsx
function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // Every keystroke calls setState → re-renders the whole form
  return (
    <form>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
    </form>
  );
}
```

**React Hook Form — re-renders only on submit or error change:**

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
          pattern: { value: /^\S+@\S+$/, message: 'Invalid email' },
        })}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

**How `register` works:** it returns `{ name, ref, onChange, onBlur }` spread onto the native input. RHF reads values via refs at submit time rather than tracking each keystroke in React state.

**Performance comparison:**

- Controlled: one re-render per keystroke × number of fields
- RHF: ~0 re-renders during typing, 1 re-render on validation error change

**Integration with schema validation (Zod):**

```jsx
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });
```

## 🧠 Question 134

**ID**: react-134  
**Title**: How do you handle dynamic form fields (add/remove rows) in React?  
**Difficulty**: Medium  
**Category**: Forms & Events

### Answer 📄

Dynamic forms require managing an array in state where each entry maps to a form row. The key challenge is maintaining stable identity (keys) so React does not reuse the wrong DOM elements when rows are removed.

**Manual approach with useState:**

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
          {/* stable key — never use array index */}
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

**With React Hook Form — `useFieldArray`:**

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
          {/* RHF generates stable IDs automatically */}
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

`useFieldArray` handles key generation, re-ordering, and keeps validation state aligned with the correct fields automatically.

**Critical rule:** always use a stable unique ID (not array index) as the `key`. Index keys cause React to reuse the wrong input DOM nodes when rows are removed from the middle.

## 🧠 Question 135

**ID**: react-135  
**Title**: How do you handle file uploads in React?  
**Difficulty**: Medium  
**Category**: Forms & Events

### Answer 📄

File inputs are inherently uncontrolled — you cannot set `value` on a file input for security reasons. React handles them via the `onChange` event which exposes the selected files through `event.target.files`.

**Basic single file upload:**

```jsx
function FileUpload() {
  const [preview, setPreview] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Create a local preview URL
    setPreview(URL.createObjectURL(file));

    // Upload to server via FormData
    const formData = new FormData();
    formData.append('file', file);
    fetch('/api/upload', { method: 'POST', body: formData });
  }

  // Revoke the object URL on cleanup to avoid memory leaks
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

**Multiple files:**

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

**Drag-and-drop upload:**

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

**With React Hook Form:**

```jsx
const { register } = useForm();
// Spread register onto the input — access the FileList via getValues()
<input type="file" {...register('avatar')} />;
// const file = getValues('avatar')?.[0];
```

Always revoke object URLs created with `URL.createObjectURL` in a cleanup function to prevent memory leaks in long-running sessions.

## 🧠 Question 136

**ID**: react-136  
**Title**: How do you cancel a fetch request when a component unmounts using `AbortController`?  
**Difficulty**: Medium  
**Category**: Effects & Lifecycle

### Answer 📄

When a component unmounts while a `fetch` is still in-flight, the request completes and tries to call `setState` on an unmounted component. Modern React does not crash on this, but it wastes resources and can cause incorrect state updates if the component remounts quickly. `AbortController` lets you cancel the network request itself in the cleanup function.

**Pattern:**

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUser() {
      try {
        const res = await fetch(`/api/users/${userId}`, {
          signal: controller.signal, // attach the abort signal
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        if (err.name === 'AbortError') return; // ignore intentional abort
        setError(err.message);
      }
    }

    loadUser();
    return () => controller.abort(); // cancel on unmount or userId change
  }, [userId]);

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}
```

**What happens on abort:** `fetch` rejects its Promise with an `AbortError`. The guard `if (err.name === 'AbortError') return` ensures deliberate cancellation is not treated as a real error.

**React StrictMode** mounts → unmounts → mounts in development, so the first fetch is aborted immediately. This is intentional — it verifies your cleanup is correct.

**Alternative — boolean cancelled flag** (for environments that do not support AbortController):

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

`AbortController` is preferred because it actually cancels the network request, saving bandwidth and server resources — not just the state update.

## 🧠 Question 137

**ID**: react-137  
**Title**: What is the synchronization mental model for `useEffect` and how is it different from lifecycle thinking?  
**Difficulty**: Medium  
**Category**: Effects & Lifecycle

### Answer 📄

The **lifecycle mental model** asks _"When should I run this code?"_ — leading to thinking in terms of mount, update, and unmount events.

The **synchronization mental model** asks _"What external system does this component need to stay in sync with?"_ — this is the model React's documentation teaches and what `useEffect` is designed around.

**Lifecycle thinking (leads to bugs):**

```jsx
useEffect(() => {
  // "I want this to run on mount"
  subscribeToChat(roomId);
  return () => unsubscribeFromChat(roomId);
}, []); // if roomId changes, the subscription is never updated
```

**Synchronization thinking (correct):**

```jsx
useEffect(() => {
  // "The component must always be subscribed to the current roomId"
  subscribeToChat(roomId);
  return () => unsubscribeFromChat(roomId); // undo the previous sync
}, [roomId]); // re-sync whenever roomId changes
```

**The mental model in three questions:**

1. **What external system is being synchronized?** (WebSocket, timer, document title, localStorage)
2. **What values determine the sync state?** → those are your dependencies
3. **How do you undo the sync?** → that is your cleanup function

**Mapping between models:**

| Lifecycle thinking      | Synchronization thinking                 |
| ----------------------- | ---------------------------------------- |
| "Run on mount"          | "Sync with [] — nothing external varies" |
| "Run when prop changes" | "Re-sync when this dependency changes"   |
| "Run on unmount"        | "Cleanup function stops the sync"        |

Every `useEffect` should be readable as: _"Keep [external system] synchronized with [these values]."_ If you cannot phrase it that way, the code may belong in an event handler instead.

## 🧠 Question 138

**ID**: react-138  
**Title**: How do you migrate class component lifecycle methods to hooks?  
**Difficulty**: Easy  
**Category**: Effects & Lifecycle

### Answer 📄

Each class lifecycle method has a functional equivalent, though the mental model shifts from event-based to synchronization-based.

**`componentDidMount` → `useEffect` with `[]`:**

```jsx
// Class
componentDidMount() {
  this.subscription = subscribe(this.props.id);
}

// Hooks
useEffect(() => {
  const sub = subscribe(id);
  return () => sub.unsubscribe(); // cleanup added naturally
}, []);
```

**`componentDidUpdate` → `useEffect` with dependencies:**

```jsx
// Class
componentDidUpdate(prevProps) {
  if (prevProps.id !== this.props.id) {
    this.refetch(this.props.id);
  }
}

// Hooks — the condition is implicit in the dependency array
useEffect(() => {
  refetch(id);
}, [id]); // only runs when id changes
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
  return () => sub.remove(); // runs on unmount and before each re-run
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
  (prev, next) => prev.id === next.id // optional custom comparison
);
```

**`getDerivedStateFromProps` → conditional setState during render:**

```jsx
const [prevProp, setPrevProp] = useState(prop);
if (prevProp !== prop) {
  setPrevProp(prop);
  setDerivedState(compute(prop)); // runs synchronously before paint
}
```

**`getSnapshotBeforeUpdate` → `useLayoutEffect` with a ref:**

```jsx
const snapshot = useRef(null);
useLayoutEffect(() => {
  snapshot.current = listRef.current.scrollTop; // read before DOM changes apply
});
```

## 🧠 Question 139

**ID**: react-139  
**Title**: What are the rules of the Client/Server boundary and the `"use client"` directive?  
**Difficulty**: Medium  
**Category**: Server Components

### Answer 📄

In React's Server Components model, **all components are Server Components by default**. Adding `"use client"` at the top of a file marks it — and everything imported from it — as a Client Component that is included in the JavaScript bundle sent to the browser.

**Rules of the boundary:**

```jsx
// ServerComponent.jsx — no directive needed, runs only on server
async function ServerComponent() {
  const data = await db.query('SELECT * FROM products'); // server-only API ✅
  return <ClientComponent items={data} />;
}
```

```jsx
'use client'; // marks this file and all its imports as client-side

import { useState } from 'react'; // hooks are allowed ✅

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

**What Server Components CAN do (Client Components CANNOT):**

- `async/await` at the component level
- Direct database, filesystem, or server-only API access
- Import server-only packages (zero bundle impact)
- Access secrets and environment variables safely

**What Client Components CAN do (Server Components CANNOT):**

- Use hooks (`useState`, `useEffect`, `useRef`, etc.)
- Use browser APIs (`window`, `document`, `localStorage`)
- Attach event handlers

**Passing data across the boundary — only serializable props:**

```jsx
// ✅ Works — strings, numbers, plain objects, arrays
<ClientComponent title="Hello" count={42} items={[1, 2, 3]} />

// ❌ Fails — functions are not serializable
<ClientComponent onClick={() => console.log('hi')} />
```

**The children composition pattern:**

```jsx
// ServerPage.jsx
export default async function ServerPage() {
  const data = await fetchData();
  return (
    <ClientWrapper>
      {/* Client Component */}
      <ServerList items={data} /> {/* Server Component as children ✅ */}
    </ClientWrapper>
  );
}
```

Server Components passed as `children` to a Client Component are rendered on the server and sent as pre-rendered RSC payload — they are not re-rendered on the client when the Client Component re-renders.

## 🧠 Question 140

**ID**: react-140  
**Title**: How do React Server Components handle data fetching compared to client components?  
**Difficulty**: Medium  
**Category**: Server Components

### Answer 📄

Server Components can fetch data **directly and asynchronously** at the component level — no `useEffect`, no loading state boilerplate, and no client-side hydration overhead for the data itself.

**Client component data fetching (before RSC):**

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
// Drawbacks: adds JS bundle, causes loading flash, client-server waterfall
```

**Server Component data fetching:**

```jsx
// No "use client" — this is a Server Component
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
// Zero client JS for fetching, no loading state, no waterfall
```

**Parallel fetching inside a Server Component:**

```jsx
async function Dashboard() {
  // All three run in parallel — no waterfall
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

**Key differences:**

|                      | Client Components        | Server Components            |
| -------------------- | ------------------------ | ---------------------------- |
| Where data fetches   | Browser (after JS loads) | Server (before HTML is sent) |
| Loading state needed | Yes                      | No (or via Suspense)         |
| Secrets/tokens safe  | No                       | Yes                          |
| Adds to JS bundle    | Yes                      | No                           |
| Can use hooks        | Yes                      | No                           |
| Direct DB access     | No                       | Yes                          |

**Caching in Next.js:** `fetch` in Server Components is extended with automatic caching, request deduplication across the same render, and revalidation via `next: { revalidate: 60 }`.

## 🧠 Question 141

**ID**: react-141  
**Title**: How do you pass data from a Server Component to a Client Component?  
**Difficulty**: Medium  
**Category**: Server Components

### Answer 📄

The only way to pass data from a Server Component to a Client Component is through **props** — and those props must be **serializable** because they cross the server/client boundary via a JSON-like wire format.

**Serializable (safe to pass as props):**

- Strings, numbers, booleans, `null`, `undefined`
- Plain objects and arrays containing the above
- `Date` objects (serialized to ISO string by most frameworks)

**Not serializable (cannot be passed as props):**

- Functions
- Class instances
- `Map`, `Set`, `Symbol`, `RegExp`
- React elements created on the server that contain event handlers

**Correct pattern:**

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
      // onBuy={handleBuy}     // ❌ function — not serializable
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

**The children composition pattern — passing Server Components into Client Components:**

```jsx
// layout.jsx — Server Component
export default async function Layout() {
  const nav = await fetchNavItems();
  return (
    <ClientShell>
      {/* Client Component */}
      <ServerNav items={nav} /> {/* Server Component passed as children ✅ */}
    </ClientShell>
  );
}
```

`ServerNav` is rendered on the server and passed to `ClientShell` as an already-computed React element in the RSC payload. When `ClientShell` re-renders on the client (e.g., due to state change), `ServerNav` does not re-render — it remains the static output from the server.

## 🧠 Question 142

**ID**: react-142  
**Title**: What is the difference between server state and client state, and which tools handle each?  
**Difficulty**: Medium  
**Category**: State Management

### Answer 📄

**Client state** is data that originates in and is owned by the browser: UI state like modal open/closed, selected tab, form input values, or theme preference. It is synchronous, always available, and your app controls it entirely.

**Server state** is data that lives on a remote server: users, products, orders, messages. It is asynchronous, can become stale, may change without your app's knowledge, and requires network requests to read or write.

**Why the distinction matters:**

Managing server state with `useState` + `useEffect` means manually implementing caching, request deduplication, background refetching, cache invalidation, loading/error states, optimistic updates, and pagination — all problems that dedicated libraries solve out of the box.

| Concern             | Client State   | Server State             |
| ------------------- | -------------- | ------------------------ |
| Source of truth     | Browser memory | Remote server / database |
| Async?              | No             | Yes                      |
| Can go stale?       | No             | Yes                      |
| Needs caching?      | No             | Yes                      |
| Shared across tabs? | No (usually)   | Yes                      |

**Tools for each:**

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
  staleTime: 60_000, // treat as fresh for 60s before background refetch
});

const { data } = useSWR('/api/user', fetcher); // SWR — simpler alternative
```

**The rule of thumb:** if the data exists on a server and could change without your app's knowledge, it is server state. Use `useState` only for data your app owns and mutates locally.

## 🧠 Question 143

**ID**: react-143  
**Title**: What is normalized state and why does it matter in large React applications?  
**Difficulty**: Hard  
**Category**: State Management

### Answer 📄

Normalized state stores each entity **once** in a flat lookup table keyed by ID, with relationships expressed as arrays of IDs rather than nested objects. It applies the relational database model to frontend state.

**Unnormalized (nested) state — problems:**

```js
const state = {
  posts: [
    {
      id: 1,
      title: 'Hello',
      author: { id: 42, name: 'Ali' }, // duplicated in every post
      comments: [{ id: 101, text: 'Great!', author: { id: 42, name: 'Ali' } }],
    },
    {
      id: 2,
      title: 'World',
      author: { id: 42, name: 'Ali' }, // same author — duplicated again
    },
  ],
};
// To update Ali's name: must find and patch every nested occurrence
```

**Normalized state — each entity exists exactly once:**

```js
const state = {
  users: { 42: { id: 42, name: 'Ali' } },
  posts: {
    1: { id: 1, title: 'Hello', authorId: 42, commentIds: [101] },
    2: { id: 2, title: 'World', authorId: 42 },
  },
  comments: { 101: { id: 101, text: 'Great!', authorId: 42 } },
  postIds: [1, 2], // ordered list for rendering
};
// To update Ali's name: update users[42].name — one operation, instantly consistent
```

**Benefits:**

- **Single source of truth** — one update propagates everywhere
- **O(1) lookups** by ID instead of O(n) array searches
- **No duplication** — data stays consistent across the UI

**Implementation with Redux Toolkit's `createEntityAdapter`:**

```js
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter();
// Auto-generates: selectAll, selectById, selectIds, addOne, updateOne, removeOne…

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

**When it matters most:** apps with many entity types, real-time WebSocket updates, shared data (the same entity appearing in many places), and complex relationships. For simple CRUD UIs, the overhead of normalization may outweigh the benefits.

## 🧠 Question 144

**ID**: react-144  
**Title**: How does Jotai's atomic model differ from Redux and Zustand?  
**Difficulty**: Medium  
**Category**: State Management

### Answer 📄

Jotai uses an **atomic** model where state is split into small, independent units called atoms. Components subscribe to individual atoms rather than a global store, and derived state is expressed as computed atoms — a bottom-up composition model.

**Jotai — atomic, bottom-up:**

```jsx
import { atom, useAtom } from 'jotai';

const countAtom = atom(0);
const userAtom = atom(null);

// Derived atom — computed automatically from other atoms
const doubleCountAtom = atom((get) => get(countAtom) * 2);

// Async atom — suspends the component until resolved
const userDataAtom = atom(async (get) => {
  const user = get(userAtom);
  return user ? await fetchUser(user.id) : null;
});

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  // Only re-renders when countAtom changes — not when userAtom changes
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

**Redux Toolkit — centralized, top-down:**

```js
// One store with a root reducer combining slices
const store = configureStore({
  reducer: { counter: counterReducer, user: userReducer },
});
const count = useSelector((state) => state.counter.value); // memoized selector
```

**Zustand — store-based, minimal:**

```js
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
const count = useStore((state) => state.count); // selector-based subscription
```

**Comparison:**

|               | Jotai                                  | Redux Toolkit                                    | Zustand                                |
| ------------- | -------------------------------------- | ------------------------------------------------ | -------------------------------------- |
| Model         | Atoms (bottom-up)                      | Single store (top-down)                          | Store per concern                      |
| Boilerplate   | Minimal                                | Moderate                                         | Minimal                                |
| DevTools      | Limited                                | Excellent                                        | Good                                   |
| Derived state | Computed atoms                         | Reselect selectors                               | Computed in selectors                  |
| Async state   | Async atoms (+ Suspense)               | RTK Query / thunks                               | External or middleware                 |
| Best for      | Granular, component-local shared state | Large teams, complex apps, time-travel debugging | Simple global state, small–medium apps |

Jotai feels like `useState` that can be shared across components — the right fit when you want cross-component reactivity without the ceremony of a global store.

## 🧠 Question 145

**ID**: react-145  
**Title**: How are React hooks implemented internally using a linked list?  
**Difficulty**: Hard  
**Category**: React Internals

### Answer 📄

React stores each component's hook state in a **linked list** of hook objects attached to the component's Fiber node (`fiber.memoizedState`). The position of each hook in the list is its sole identity — React has no names or keys for hooks.

**Hook object structure (simplified):**

```js
{
  memoizedState: <current value>,   // the actual state / ref / memo value
  queue: <update queue>,            // pending state updates (for useState)
  next: <pointer to next hook>      // linked list pointer
}
```

**First render (mount) — React creates nodes and links them:**

```jsx
function Counter() {
  const [count, setCount] = useState(0); // node 1: { memoizedState: 0, next → }
  const [name, setName] = useState('Ali'); // node 2: { memoizedState: 'Ali', next → }
  const ref = useRef(null); // node 3: { memoizedState: {current:null}, next: null }
}
// fiber.memoizedState → node1 → node2 → node3
```

**Re-renders — React walks the existing list in order:**

```js
// Pseudocode of useState during re-render
function useState(initialValue) {
  const hook = currentHook; // read the current node
  currentHook = currentHook.next; // advance the pointer

  // Apply any queued updates
  const pending = hook.queue.pending;
  if (pending) {
    hook.memoizedState = pending.action(hook.memoizedState);
  }

  return [hook.memoizedState, hook.queue.dispatch];
}
```

**Why call order is the only identity:**

React uses position in the linked list, not names or keys. Each render must call the hooks in exactly the same order so each call aligns with its node. If a hook is skipped (conditional) or added (loop), every subsequent hook reads the wrong node — state is completely misaligned.

`useEffect`, `useMemo`, and `useCallback` follow the same pattern, each storing their value, dependency array, and cleanup function in their own node in the same linked list.

## 🧠 Question 146

**ID**: react-146  
**Title**: Why must hooks be called in the same order every render — what breaks internally if you don't?  
**Difficulty**: Hard  
**Category**: React Internals

### Answer 📄

The Rules of Hooks — no hooks inside conditions, loops, or nested functions — exist because React identifies each hook call by its **position** in the linked list. Changing the call order breaks the mapping between hook invocations and their stored state.

**What breaks with a conditional hook:**

```jsx
function UserProfile({ isLoggedIn }) {
  if (isLoggedIn) {
    const [name, setName] = useState(''); // Hook 1 — only when logged in
  }
  const [age, setAge] = useState(0); // Hook 2 when logged in, Hook 1 when not
  const ref = useRef(null); // Hook 3 when logged in, Hook 2 when not
}
```

**First render (isLoggedIn = true) — list has 3 nodes:**

```
node1 = { memoizedState: '' }   ← name
node2 = { memoizedState: 0 }    ← age
node3 = { memoizedState: {current:null} } ← ref
```

**Re-render (isLoggedIn = false) — only 2 hook calls, but list still has 3 nodes:**

```
Call 1 (useState 0) reads node1 → gets '' (name's value) ← WRONG
Call 2 (useRef)     reads node2 → gets 0  (age's value)  ← WRONG
node3 is never read — ref is orphaned
```

React reads the wrong stored value for every hook after the skipped one. State is completely corrupted.

**React's detection:** In development, React counts the hooks called per render. If the count changes, it throws:

```
React has detected a change in the order of Hooks called by UserProfile.
```

**The correct pattern — move the condition inside the hook:**

```jsx
function UserProfile({ isLoggedIn }) {
  const [name, setName] = useState(''); // always called — node 1
  const [age, setAge] = useState(0); // always called — node 2
  const ref = useRef(null); // always called — node 3

  useEffect(() => {
    if (isLoggedIn) loadUserData(); // condition lives inside the effect
  }, [isLoggedIn]);
}
```

## 🧠 Question 147

**ID**: react-147  
**Title**: How does Suspense work internally — what is the "throw a Promise" mechanism?  
**Difficulty**: Hard  
**Category**: React Internals

### Answer 📄

Suspense works through a protocol where a component signals "I am not ready yet" by **throwing a Promise** (or any thenable). React catches this throw at the nearest `<Suspense>` boundary, renders the fallback, and re-renders the component when the Promise resolves.

**The protocol (simplified cache):**

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

**Component using the resource:**

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

**What React does internally:**

1. Begins rendering `UserCard`
2. `userResource.read()` throws a Promise
3. React catches the throw inside its render loop (try/catch)
4. Traverses up the fiber tree to find the nearest `<Suspense>` boundary
5. Renders the `fallback` prop in place of the boundary's subtree
6. Attaches `.then()` to the caught Promise
7. When the Promise resolves, React re-renders `UserCard` from the boundary
8. `read()` now returns data → render succeeds

**React 19's `use()` hook** is the official API for reading Promises in render — you no longer need a custom cache wrapper:

```jsx
import { use } from 'react';

function UserCard({ userPromise }) {
  const user = use(userPromise); // suspends if not resolved
  return <div>{user.name}</div>;
}
```

**Always pair `<Suspense>` with an `<ErrorBoundary>`** above it — if the Promise rejects, the error propagates to the nearest Error Boundary, not the Suspense boundary.

## 🧠 Question 148

**ID**: react-148  
**Title**: How would you build a minimal React renderer from scratch?  
**Difficulty**: Hard  
**Category**: React Internals

### Answer 📄

Building a minimal renderer demonstrates how `createElement`, reconciliation, and the commit phase work together. The key insight is that `React.createElement` just produces a plain JavaScript object tree — the renderer's job is to turn that tree into real DOM.

**Step 1 — createElement (produces the VDOM tree):**

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

**Step 2 — createDom (creates a real DOM node from a fiber):**

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

**Step 3 — reconcileChildren (diff old tree vs new tree, tag each fiber):**

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
    // attach to fiber tree (child / sibling links omitted for brevity)
  });
}
```

**Step 4 — commitWork (apply DOM mutations atomically):**

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

**The two-phase model:**

| Render phase                         | Commit phase                             |
| ------------------------------------ | ---------------------------------------- |
| Pure, interruptible                  | Side-effectful, synchronous              |
| Builds work-in-progress fiber tree   | Applies all DOM mutations at once        |
| No DOM mutations                     | Runs `useLayoutEffect` cleanup and setup |
| Can be paused / resumed (Concurrent) | Cannot be interrupted                    |

**Takeaway:** React separates computation (render phase) from side effects (commit phase) so that the render phase can be safely interrupted by higher-priority updates. Libraries like `react-three-fiber`, `react-pdf`, and `ink` use React's `react-reconciler` package to target non-DOM environments using this exact same extension point.

## 🧠 Question 149

**ID**: react-149  
**Title**: What triggers a re-render in React, and how can you prevent unnecessary ones?  
**Difficulty**: Medium  
**Category**: Rendering Behavior

### Answer 📄

A React component re-renders when any of these occur:

**1. Its own state changes** (`useState`, `useReducer`)

```jsx
const [count, setCount] = useState(0);
setCount(1); // triggers re-render
```

**2. Its parent re-renders**
By default, whenever a parent re-renders, ALL its children re-render — even if props haven't changed. This is the most common source of unnecessary re-renders.

**3. A consumed Context value changes**
Every component that calls `useContext(Ctx)` re-renders when the context value changes — even if the specific slice it uses didn't change.

**4. `key` prop changes**
React unmounts and remounts the component entirely.

**Preventing unnecessary re-renders:**

| Tool                    | What it prevents                                 |
| ----------------------- | ------------------------------------------------ |
| `React.memo(Comp)`      | Re-render when parent re-renders with same props |
| `useMemo(fn, deps)`     | Recomputing expensive derived values             |
| `useCallback(fn, deps)` | Recreating function references passed as props   |
| Context splitting       | Consumers re-rendering on unrelated changes      |
| State co-location       | Pushing state down to minimize re-render scope   |

**The golden rule:** Profile before optimizing. `React.memo` has overhead and can cause bugs if comparisons are wrong. Use React DevTools Profiler to identify actual bottlenecks.

```jsx
// memo only helps if props are referentially stable
const Child = React.memo(({ onClick }) => (
  <button onClick={onClick}>Click</button>
));

function Parent() {
  // Without useCallback, onClick is a new function every render → memo is bypassed
  const onClick = useCallback(() => console.log('click'), []);
  return <Child onClick={onClick} />;
}
```

## 🧠 Question 150

**ID**: react-150  
**Title**: Walk through the React rendering pipeline from state change to painted pixels.  
**Difficulty**: Medium  
**Category**: Rendering Behavior

### Answer 📄

React's rendering pipeline has three distinct phases:

**Phase 1 — Trigger**
Something schedules a render: `setState`, `dispatch`, or the root `ReactDOM.createRoot().render()`. React does NOT immediately render — it schedules work via its internal scheduler.

**Phase 2 — Render (pure, interruptible)**
React calls your component functions to produce a new React element tree (virtual DOM). No DOM mutations happen here.

```jsx
// React calls this and collects the output
function Counter({ count }) {
  return <div>{count}</div>; // React element, not a real DOM node
}
```

In Concurrent Mode, this phase can be **paused and resumed** if a higher-priority update arrives. Components must be pure (no side effects in render) for this to be safe.

**Phase 3 — Commit (side-effectful, synchronous)**
React diffs the new element tree against the previous one and applies changes in three sub-phases:

1. **beforeMutation**: reads DOM (getSnapshotBeforeUpdate), schedules `useLayoutEffect` cleanup
2. **mutation**: applies DOM insertions, updates, deletions
3. **layout**: runs `useLayoutEffect` synchronously after DOM mutations
4. **passive effects**: schedules `useEffect` to run asynchronously after paint

```text
Trigger → Render (pure) → Reconcile (diff) → Commit (DOM) → Paint → useEffect
                                                   ↑
                                            useLayoutEffect (sync, before paint)
```

**Key insight:** `useLayoutEffect` runs before the browser paints. `useEffect` runs after paint. This is why reading DOM measurements in `useLayoutEffect` avoids visual flicker.

**`flushSync`** forces a synchronous commit, bypassing batching — useful for third-party DOM integrations but should be rare.

## 🧠 Question 151

**ID**: react-151  
**Title**: How does React 18's concurrent scheduler work and what are priority lanes?  
**Difficulty**: Hard  
**Category**: Rendering Behavior

### Answer 📄

React 18's Concurrent Mode makes rendering interruptible by assigning work to **priority lanes**. The scheduler processes higher-priority lanes first and can pause lower-priority work.

**Lane priorities (high to low):**

| Lane                | Examples          | Behavior                        |
| ------------------- | ----------------- | ------------------------------- |
| SyncLane            | `flushSync`       | Synchronous, never interrupted  |
| InputContinuousLane | Scroll, drag      | Runs next available frame       |
| DefaultLane         | Normal `setState` | Batched, ~5s deadline           |
| TransitionLane      | `startTransition` | Can be interrupted, no deadline |
| IdleLane            | Off-screen prep   | Only when idle                  |

**How `startTransition` uses lanes:**

```jsx
import { startTransition, useState } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  function handleChange(e) {
    setQuery(e.target.value); // DefaultLane — updates input immediately

    startTransition(() => {
      setResults(search(e.target.value)); // TransitionLane — can be interrupted
    });
  }
}
```

**How interruptibility works:**

1. React starts rendering the transition (re-rendering 1,000 list items)
2. User types another character → new DefaultLane update arrives
3. React **abandons** the in-progress transition render
4. React processes the keypress update immediately
5. React restarts the transition render with the latest state

**`useDeferredValue`** creates a lagging copy of a value assigned to a lower lane:

```jsx
const deferredQuery = useDeferredValue(query); // updates after urgent work settles
```

**`useTransition` vs `useDeferredValue`:**

- `useTransition` — wrap the state _setter_ to mark it as low-priority
- `useDeferredValue` — wrap the _value_ consumed by an expensive component

The scheduler uses `MessageChannel` (not `setTimeout`) for sub-millisecond scheduling precision.

## 🧠 Question 152

**ID**: react-152  
**Title**: Why does React.StrictMode call render and effect functions twice in development?  
**Difficulty**: Medium  
**Category**: Rendering Behavior

### Answer 📄

React StrictMode intentionally invokes certain functions **twice** in development (not production) to expose latent bugs caused by impure functions or effects that don't clean up properly.

**What gets double-invoked:**

- Component render functions (the function body itself)
- `useState` and `useReducer` initializer functions
- `useMemo` computations
- `useEffect` — cleanup runs, then the effect runs again (mount → unmount → remount)

**What this catches:**

**1. Impure render functions:**

```jsx
// Bug revealed by StrictMode double-render:
function Counter() {
  const [items, setItems] = useState([]);

  function addItem() {
    items.push('new'); // MUTATION — first render mutates, second render sees already-mutated array
    setItems(items);
  }

  return <button onClick={addItem}>Add</button>;
}
```

**2. Effects that don't clean up properly:**

```jsx
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id); // StrictMode verifies cleanup actually works
}, []);
// In dev: setup → cleanup → setup (verifies cleanup)
// In prod: setup once
```

**This is intentional, not a bug.** It simulates future React features (e.g., offscreen rendering, fast refresh) that may remount components at will.

**Workaround for true one-time initialization:**

```jsx
// Module-level flag — runs once regardless of StrictMode
let initialized = false;

useEffect(() => {
  if (initialized) return;
  initialized = true;
  analytics.init();
}, []);
```

Use sparingly — if you need this pattern, it often signals the initialization should be outside React entirely (a module singleton).

## 🧠 Question 153

**ID**: react-153  
**Title**: What is the `useId` hook and how does it solve SSR hydration mismatches?  
**Difficulty**: Medium  
**Category**: SSR / Hydration

### Answer 📄

`useId` (React 18) generates a **stable, unique ID** that is consistent between the server render and client hydration — solving a class of hydration mismatch bugs caused by randomly generated IDs.

**The problem:**

```jsx
// BROKEN in SSR
function FormField({ label }) {
  const id = Math.random().toString(36).slice(2); // different every render!
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </>
  );
}
// Server renders: id="xk3m2"
// Client renders: id="ab9p1" → hydration mismatch warning
```

The server and client generate different IDs and a hydration mismatch occurs.

**The fix with `useId`:**

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

**How it works:** React generates IDs deterministically based on the component's position in the tree. The same component tree structure on server and client produces identical IDs.

**Multiple IDs from one `useId` call:**

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

**When NOT to use `useId`:**

- List item `key` props → use stable data IDs from your backend
- CSS class names → use CSS modules or static strings
- Anything that must be human-readable in the DOM

**`suppressHydrationWarning`** is the last-resort escape hatch for elements that intentionally differ between server and client (e.g., timestamps, user locale data):

```jsx
<time suppressHydrationWarning>{new Date().toLocaleString()}</time>
```

Use sparingly — it silences the warning but does not fix the underlying mismatch. React still re-renders the element on the client.

## 🧠 Question 154

**ID**: react-154  
**Title**: What are the data fetching strategies in Next.js App Router and when do you use each?  
**Difficulty**: Hard  
**Category**: SSR / Hydration

### Answer 📄

Next.js App Router (built on React Server Components) unifies all data fetching through the native `fetch` API extended with cache directives:

**Static — build time (SSG equivalent):**

```jsx
async function Page() {
  // Cached indefinitely — fetched once at build time
  const data = await fetch('https://api.example.com/posts', {
    cache: 'force-cache', // default in App Router
  });
  return <Posts data={await data.json()} />;
}
```

**Dynamic — per request (SSR equivalent):**

```jsx
async function Page() {
  // Never cached — fresh data on every request
  const data = await fetch('https://api.example.com/user', {
    cache: 'no-store',
  });
  return <Profile data={await data.json()} />;
}
```

**ISR — time-based revalidation:**

```jsx
async function Page() {
  const data = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 }, // re-fetch at most once per 60 seconds
  });
  return <Posts data={await data.json()} />;
}
```

**On-demand revalidation (after mutations):**

```jsx
// In a Server Action or Route Handler:
import { revalidatePath, revalidateTag } from 'next/cache';

revalidatePath('/blog'); // invalidate by path
revalidateTag('posts'); // invalidate by tag
// Tag usage: fetch('...', { next: { tags: ['posts'] } })
```

**Decision tree:**

```
Data same for all users, changes rarely?  → force-cache (static)
Data changes on a schedule?               → revalidate: N (ISR)
Data changes after a user action?         → revalidateTag (on-demand)
Data is user-specific or real-time?       → no-store (dynamic SSR)
Data only needed client-side?             → SWR / TanStack Query
```

**`generateStaticParams`** — pre-renders dynamic routes at build time:

```jsx
// app/blog/[slug]/page.jsx
export async function generateStaticParams() {
  const posts = await fetchAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}
```

**Automatic deduplication:** Multiple server components fetching the same URL in the same render only trigger one network request — React deduplicates `fetch` calls automatically.

## 🧠 Question 155

**ID**: react-155  
**Title**: How do you safely use browser-only APIs (window, localStorage, document) in an SSR app?  
**Difficulty**: Medium  
**Category**: SSR / Hydration

### Answer 📄

Browser globals (`window`, `document`, `localStorage`, `navigator`) do not exist in Node.js. Accessing them during SSR throws a `ReferenceError` and breaks server rendering. The core rule: **browser-only code must run only after hydration**.

**Pattern 1 — `useEffect` (safest, most common):**

```jsx
function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Runs only on the client, after hydration
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next); // safe inside event handler too
  };

  return <button onClick={toggle}>{theme}</button>;
}
```

**Pattern 2 — `typeof window` guard (for utility functions):**

```jsx
function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'; // server
  return localStorage.getItem('theme') ?? 'light'; // client
}
```

**Pattern 3 — `dynamic` import with `ssr: false` (Next.js):**

```jsx
import dynamic from 'next/dynamic';

// Component never rendered on the server
const Map = dynamic(() => import('./Map'), { ssr: false });
```

Use for components that fundamentally cannot run server-side (WebGL, browser extension APIs, third-party widgets).

**Pattern 4 — `useSyncExternalStore` with a server snapshot:**

```jsx
function useWindowSize() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener('resize', cb);
      return () => window.removeEventListener('resize', cb);
    },
    () => ({ width: window.innerWidth, height: window.innerHeight }), // client
    () => ({ width: 0, height: 0 }), // server snapshot — prevents mismatch
  );
}
```

The third argument (server snapshot) is what React uses during SSR and the initial hydration render, preventing mismatches.

**Common mistake — `useState` initialized with a browser value:**

```jsx
// BROKEN: runs on server, ReferenceError
const [width, setWidth] = useState(window.innerWidth);

// FIXED: lazy initializer — only runs on the client
const [width, setWidth] = useState(() =>
  typeof window !== 'undefined' ? window.innerWidth : 0,
);
```

## 🧠 Question 156

**ID**: react-156  
**Title**: How does selective hydration work with Suspense in React 18?  
**Difficulty**: Hard  
**Category**: SSR / Hydration

### Answer 📄

React 18's selective hydration allows different parts of the page to hydrate **independently and in priority order**, rather than waiting for the entire JS bundle before anything becomes interactive.

**The problem with React 17 SSR:**

```
Server → sends complete HTML
Client → downloads ALL JS → hydrates EVERYTHING at once → page becomes interactive
(blocking: if JS is large, nothing is interactive until it's all done)
```

**React 18 with Suspense boundaries:**

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

Each `<Suspense>` boundary becomes an **independent hydration unit**. React streams each section's HTML as its data resolves and hydrates each section as its JS chunk loads — without blocking other sections.

**User-interaction priority boost:**
If a user clicks on a section that hasn't hydrated yet, React immediately prioritizes it:

```
User clicks Comments (not yet hydrated)
→ React pauses hydrating Main
→ Synchronously hydrates Comments first
→ Click event fires immediately
→ React resumes hydrating Main
```

**The server API:**

```jsx
// Node.js server
import { renderToPipeableStream } from 'react-dom/server';

const { pipe } = renderToPipeableStream(<App />, {
  bootstrapScripts: ['/main.js'],
  onShellReady() {
    res.statusCode = 200;
    pipe(res); // starts streaming immediately, without waiting for all data
  },
});
```

**Three problems solved by React 18 streaming + selective hydration:**

| Problem                             | React 17 SSR     | React 18                          |
| ----------------------------------- | ---------------- | --------------------------------- |
| Must fetch all data before HTML     | ✗ wait for all   | ✓ streams as data resolves        |
| Must load all JS before hydrating   | ✗ all-or-nothing | ✓ hydrates sections independently |
| Must hydrate all before interactive | ✗ blocking       | ✓ prioritizes interacted sections |

In Next.js App Router, this is automatic — every `<Suspense>` boundary is a streaming boundary and selective hydration is enabled by default.

## 🧠 Question 157

**ID**: react-157  
**Title**: How do you handle authentication in SSR — cookie-based auth and middleware patterns?  
**Difficulty**: Hard  
**Category**: SSR / Hydration

### Answer 📄

Authentication in SSR requires reading credentials on the server to render personalized content while keeping tokens secure.

**Why cookies, not localStorage:**
`localStorage` is browser-only and unavailable during SSR. `httpOnly` cookies are sent with every HTTP request (including SSR), making them the standard for SSR authentication.

**Next.js App Router — reading cookies in Server Components:**

```jsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) redirect('/login');

  const user = await validateToken(token); // server-side validation
  return <Dashboard user={user} />;
}
```

**Next.js Middleware — protecting routes at the edge:**

```jsx
// middleware.ts — runs before every request, at the CDN edge
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

**Secure cookie settings:**

| Flag                         | Purpose                                |
| ---------------------------- | -------------------------------------- |
| `httpOnly`                   | JS cannot read it → XSS resistant      |
| `Secure`                     | Only sent over HTTPS                   |
| `SameSite=Lax`               | CSRF protection for most cases         |
| Short expiry + refresh token | Limits blast radius if token is stolen |

**Avoiding hydration mismatches with auth state:**

```jsx
// PROBLEM: server renders unauthenticated, client reads token → mismatch
function Header() {
  const user = getClientSideUser(); // reads from localStorage — not available on server
  return <div>{user ? user.name : 'Guest'}</div>;
}

// SOLUTION: pass user from server down as props — consistent on both sides
async function Layout({ children }) {
  const user = await getServerUser(); // reads from httpOnly cookie on server
  return (
    <>
      <Header user={user} /> {/* same value on server and client */}
      {children}
    </>
  );
}
```

**Token refresh:** Implement refresh logic in middleware so the cookie is updated before server components even run — keeping auth state fresh without client round-trips.
