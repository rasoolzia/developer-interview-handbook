---
topic: vue
language: en
version: 3.6
---

# Vue.js Interview Questions

## Available Categories

- Vue Basics
- Reactivity System
- Components
- Composition API
- Directives
- Lifecycle
- State Management
- Routing
- Performance
- Rendering & Internals
- SSR / Hydration
- Advanced Patterns

## Difficulty Levels

- Easy
- Medium
- Hard

## 🧠 Question 1

**ID**: vue-001  
**Title**: What is Vue.js and what problem does it solve?  
**Difficulty**: Easy  
**Category**: Vue Basics

### Answer 📄

Vue.js is a progressive JavaScript framework used for building user interfaces and single-page applications.

It focuses on the **view layer** and allows developers to build interactive interfaces using a component-based architecture.

Vue solves several common frontend problems:

- Managing complex UI state
- Updating the DOM efficiently
- Organizing UI logic into reusable components
- Simplifying reactive data updates

Vue uses a **reactive data-binding system** and a **virtual DOM** to update the interface efficiently when application state changes.

Because it is progressive, Vue can be used gradually, from small interactive widgets to full single-page applications.

## 🧠 Question 2

**ID**: vue-002  
**Title**: What are the core features of Vue.js?  
**Difficulty**: Easy  
**Category**: Vue Basics

### Answer 📄

Vue.js provides several core features that make it suitable for building modern web applications.

Key features include:

- **Reactive data binding**
- **Component-based architecture**
- **Virtual DOM rendering**
- **Computed properties**
- **Watchers**
- **Directives such as v-if, v-for, and v-bind**
- **Vue Router for routing**
- **State management via Pinia or Vuex**

These features help developers build scalable and maintainable front-end applications.

## 🧠 Question 3

**ID**: vue-003  
**Title**: How does Vue differ from React and Angular?  
**Difficulty**: Easy  
**Category**: Vue Basics

### Answer 📄

Vue, React, and Angular are popular tools for building modern web applications, but they differ in design philosophy and complexity.

Vue focuses on simplicity and gradual adoption. It provides an approachable API and built-in solutions for common tasks.

React is primarily a UI library focused on building component-based interfaces. It relies heavily on the surrounding ecosystem for routing and state management.

Angular is a full framework with many built-in features such as dependency injection, form management, and strong TypeScript integration.

In general:

- Vue emphasizes simplicity and developer experience
- React emphasizes flexibility
- Angular emphasizes structure and enterprise-level tooling

## 🧠 Question 4

**ID**: vue-004  
**Title**: What is the Vue instance?  
**Difficulty**: Easy  
**Category**: Vue Basics

### Answer 📄

A Vue instance represents the root of a Vue application.

In Vue 3, applications are created using the `createApp` function. The Vue instance manages the component tree, reactive state, and rendering process.

It acts as the entry point that connects the application logic with the DOM.

A Vue instance typically:

- Holds the root component
- Mounts the application to a DOM element
- Manages lifecycle hooks
- Initializes the reactivity system

Example:

```js
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');
```

## 🧠 Question 5

**ID**: vue-005  
**Title**: What is the difference between Vue 2 and Vue 3?  
**Difficulty**: Easy  
**Category**: Vue Basics

### Answer 📄

Vue 3 introduced several improvements over Vue 2.

Major differences include:

- The **Composition API** for better logic reuse
- A **new reactivity system based on Proxy**
- **Improved TypeScript support**
- **Better performance and smaller bundle sizes**
- **Fragment support for multiple root elements**
- **Teleport and Suspense components**

Vue 3 provides a more flexible and scalable architecture compared to Vue 2.

## 🧠 Question 6

**ID**: vue-006  
**Title**: What is Vue reactivity and why is it important?  
**Difficulty**: Easy  
**Category**: Reactivity System

### Answer 📄

Vue's reactivity system automatically tracks dependencies between data and the UI.

When reactive data changes, Vue automatically updates the parts of the DOM that depend on that data.

This eliminates the need to manually manipulate the DOM.

Reactivity allows developers to focus on application logic while Vue efficiently handles UI updates.

In Vue 3, this system is implemented using JavaScript Proxy objects.

## 🧠 Question 7

**ID**: vue-007  
**Title**: How does Vue track reactive dependencies?  
**Difficulty**: Medium  
**Category**: Reactivity System

### Answer 📄

Vue tracks reactive dependencies using a dependency tracking system.

When reactive data is accessed during rendering, Vue records that dependency. If the data changes later, Vue knows which components need to be updated.

In Vue 3, this system works using:

- **track()** to record dependencies
- **trigger()** to notify updates

This mechanism ensures that only the necessary parts of the UI are re-rendered.

## 🧠 Question 8

**ID**: vue-008  
**Title**: What are `ref` and `reactive` in Vue 3?  
**Difficulty**: Easy  
**Category**: Reactivity System

### Answer 📄

`ref` and `reactive` are APIs used to create reactive state in Vue 3.

`ref` is used for primitive values or single reactive references.

`reactive` is used for reactive objects.

Both APIs allow Vue to track changes and update the UI automatically.

They are typically used inside the Composition API.

Example:

```js
import { ref, reactive } from 'vue';

const count = ref(0);

const user = reactive({
  name: 'Rasool',
  age: 27,
});

count.value++;
user.age++;
```

## 🧠 Question 9

**ID**: vue-009  
**Title**: What is the difference between `ref` and `reactive`?  
**Difficulty**: Medium  
**Category**: Reactivity System

### Answer 📄

The main difference between `ref` and `reactive` is how they store and access reactive data.

`ref` wraps a value inside an object with a `.value` property.

`reactive` directly converts an object into a reactive proxy.

In general:

- `ref` works best for primitives
- `reactive` works best for objects

Both integrate with Vue's dependency tracking system.

Example:

```js
import { ref, reactive } from 'vue';

// ref — access via .value
const count = ref(0);
count.value++;

// reactive — no .value needed
const user = reactive({ name: 'Rasool', age: 27 });
user.age++;

// Warning: destructuring reactive loses reactivity
const { age } = user; // NOT reactive
```

## 🧠 Question 10

**ID**: vue-010  
**Title**: What are computed properties and how do they differ from methods?  
**Difficulty**: Easy  
**Category**: Reactivity System

### Answer 📄

Computed properties are reactive values that are derived from other reactive data.

They automatically update when their dependencies change.

Unlike methods, computed properties are **cached** based on their dependencies. This means they only re-evaluate when necessary.

Methods execute every time they are called, while computed properties only recompute when their dependencies change.

Example:

```js
import { computed, ref } from 'vue';

const price = ref(100);

const tax = computed(() => {
  return price.value * 0.2;
});
```

## 🧠 Question 11

**ID**: vue-011  
**Title**: What are Vue components and why are they important?  
**Difficulty**: Easy  
**Category**: Components

### Answer 📄

Components are reusable building blocks in Vue applications.

Each component encapsulates its own:

- Template
- Logic
- Styles
- State

This modular architecture allows large applications to be broken into smaller, manageable pieces.

Components improve code reusability, maintainability, and scalability.

Example:

```vue
<!-- UserCard.vue -->
<script setup>
defineProps({ name: String, role: String });
</script>

<template>
  <div class="card">
    <h2>{{ name }}</h2>
    <p>{{ role }}</p>
  </div>
</template>
```

## 🧠 Question 12

**ID**: vue-012  
**Title**: How do props work in Vue?  
**Difficulty**: Easy  
**Category**: Components

### Answer 📄

Props are used to pass data from a parent component to a child component.

They allow components to receive external data while remaining reusable and independent.

Props are declared in the child component and passed via HTML attributes in the parent component.

Vue enforces **one-way data flow**, meaning props flow from parent to child only.

Example:

```vue
<!-- Parent -->
<UserCard name="Rasool" />
```

```vue
<!-- Child -->
<script setup>
defineProps({
  name: String,
});
</script>
```

## 🧠 Question 13

**ID**: vue-013  
**Title**: What is prop validation in Vue?  
**Difficulty**: Medium  
**Category**: Components

### Answer 📄

Prop validation allows developers to specify the expected type and constraints for props.

Vue can check whether the passed value matches the declared type.

Validation options include:

- Type checking
- Required props
- Default values
- Custom validation functions

This improves reliability and prevents incorrect data from being passed into components.

Example:

```js
defineProps({
  title: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0,
  },
});
```

## 🧠 Question 14

**ID**: vue-014  
**Title**: What are slots in Vue and why are they useful?  
**Difficulty**: Medium  
**Category**: Components

### Answer 📄

Slots allow parent components to pass template content into child components.

They make components more flexible by allowing dynamic content insertion.

Slots are commonly used for building reusable layout components such as modals, cards, or layout wrappers.

Vue supports default slots, named slots, and scoped slots.

Example:

```vue
<!-- Parent -->
<Card>
  <p>This content is passed from the parent.</p>
</Card>
```

```vue
<!-- Card.vue -->
<template>
  <div class="card">
    <slot></slot>
  </div>
</template>
```

## 🧠 Question 15

**ID**: vue-015  
**Title**: What are scoped slots and how do they differ from regular slots?  
**Difficulty**: Medium  
**Category**: Components

### Answer 📄

Scoped slots allow child components to pass data back to the slot content defined by the parent.

This allows the parent to control rendering while still accessing data from the child component.

They are useful when building reusable components that expose internal state to the slot template.

## 🧠 Question 16

**ID**: vue-016  
**Title**: What is the Composition API in Vue and why was it introduced?  
**Difficulty**: Medium  
**Category**: Composition API

### Answer 📄

The Composition API is a set of APIs introduced in Vue 3 that allows developers to organize component logic by feature rather than by option type.

In the Options API, logic is split across options such as data, methods, computed, and watch. This can make large components difficult to maintain.

The Composition API solves this problem by allowing related logic to be grouped together inside the `setup()` function.

Benefits include:

- Better logic reuse
- Improved code organization
- Easier TypeScript integration
- More scalable architecture for large applications

## 🧠 Question 17

**ID**: vue-017  
**Title**: What is the `setup()` function in Vue?  
**Difficulty**: Medium  
**Category**: Composition API

### Answer 📄

The `setup()` function is the entry point for using the Composition API inside a Vue component.

It runs before the component is created and is responsible for initializing reactive state, computed values, and functions used by the component.

Everything returned from `setup()` becomes available inside the component's template.

The `setup()` function receives two arguments:

- `props`
- `context`

It is commonly used to define component logic in Vue 3 applications.

Example (Q16–Q17):

```js
//Composition API with setup()

import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);

    const increment = () => {
      count.value++;
    };

    return { count, increment };
  },
};
```

## 🧠 Question 18

**ID**: vue-018  
**Title**: What is a composable in Vue?  
**Difficulty**: Medium  
**Category**: Composition API

### Answer 📄

A composable is a reusable function that encapsulates stateful logic using the Composition API.

Composable functions allow developers to extract logic from components and reuse it across multiple components.

They typically follow the naming convention `useSomething`.

Examples include:

- `useMouse`
- `useFetch`
- `useAuth`

Composable functions improve modularity and code reuse in Vue applications.

Example:

```js
import { ref } from 'vue';

export function useCounter() {
  const count = ref(0);

  const increment = () => {
    count.value++;
  };

  return { count, increment };
}
```

## 🧠 Question 19

**ID**: vue-019  
**Title**: What is the difference between `watch` and `watchEffect`?  
**Difficulty**: Medium  
**Category**: Reactivity System

### Answer 📄

Both `watch` and `watchEffect` are used to react to reactive state changes.

`watch` tracks specific reactive sources and only runs when those sources change.

`watchEffect` automatically tracks all reactive dependencies used inside its callback.

Key differences:

- `watch` requires explicit dependency declaration
- `watchEffect` automatically tracks dependencies
- `watch` provides more control over when updates occur

`watchEffect` is often used for simple reactive side effects.

Example:

```js
//watch vs watchEffect

import { ref, watch, watchEffect } from 'vue';

const count = ref(0);

watch(count, (newValue) => {
  console.log('watch:', newValue);
});

watchEffect(() => {
  console.log('watchEffect:', count.value);
});
```

## 🧠 Question 20

**ID**: vue-020  
**Title**: What are lifecycle hooks in Vue?  
**Difficulty**: Easy  
**Category**: Lifecycle

### Answer 📄

Lifecycle hooks are functions that allow developers to run code at specific stages of a component's lifecycle.

Common lifecycle stages include:

- Component creation
- DOM mounting
- Updates
- Component destruction

Vue provides lifecycle hooks such as:

- `onMounted`
- `onUpdated`
- `onUnmounted`

These hooks allow developers to perform tasks such as data fetching, DOM interaction, or cleanup.

## 🧠 Question 21

**ID**: vue-021  
**Title**: What are the most common lifecycle hooks in Vue 3?  
**Difficulty**: Easy  
**Category**: Lifecycle

### Answer 📄

Vue 3 provides several lifecycle hooks that allow developers to respond to component lifecycle events.

Common hooks include:

- `onBeforeMount`
- `onMounted`
- `onBeforeUpdate`
- `onUpdated`
- `onBeforeUnmount`
- `onUnmounted`

These hooks help manage side effects such as API requests, DOM manipulation, and cleanup operations.

## 🧠 Question 22

**ID**: vue-022  
**Title**: What is `v-if` and how does it differ from `v-show`?  
**Difficulty**: Easy  
**Category**: Directives

### Answer 📄

Both `v-if` and `v-show` are directives used for conditional rendering.

`v-if` conditionally renders elements in the DOM. If the condition is false, the element is not rendered.

`v-show` always renders the element but toggles its visibility using CSS.

In general:

- `v-if` is better for rarely changing conditions
- `v-show` is better for frequently toggled elements

Example:

```vue
<!-- v-if vs v-show -->

<p v-if="isVisible">Visible with v-if</p>

<p v-show="isVisible">Visible with v-show</p>
```

## 🧠 Question 23

**ID**: vue-023  
**Title**: What is `v-for` and how does Vue track list updates?  
**Difficulty**: Medium  
**Category**: Directives

### Answer 📄

`v-for` is a directive used to render lists of items.

Vue requires a `key` attribute when rendering lists so it can efficiently track changes.

The `key` helps Vue identify which items have been added, removed, or reordered.

This allows Vue to update the DOM efficiently using the virtual DOM diffing algorithm.

Example:

```vue
<ul>
  <li v-for="user in users" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```

## 🧠 Question 24

**ID**: vue-024  
**Title**: What is `v-model` and how does it work internally?  
**Difficulty**: Medium  
**Category**: Components

### Answer 📄

`v-model` is a directive used to create two-way data binding between form inputs and reactive state.

Internally, `v-model` combines:

- `v-bind:value`
- `v-on:input`

When the input changes, Vue updates the bound state. When the state changes, the input value updates automatically.

In Vue 3, `v-model` also supports custom arguments and multiple bindings.

Example:

```vue
<input v-model="username" />
```

```js
const username = ref('');
```

## 🧠 Question 25

**ID**: vue-025  
**Title**: What are custom directives in Vue?  
**Difficulty**: Medium  
**Category**: Directives

### Answer 📄

Custom directives allow developers to create reusable DOM manipulation logic.

They are useful for low-level DOM operations such as:

- Focus management
- Lazy loading images
- Detecting element visibility

Custom directives provide lifecycle hooks similar to components and can be registered globally or locally.

Example:

```js
// Register globally
app.directive('focus', {
  mounted(el) {
    el.focus();
  },
});
```

```vue
<!-- Usage in template -->
<input v-focus />
```

## 🧠 Question 26

**ID**: vue-026  
**Title**: What is `provide` and `inject` in Vue?  
**Difficulty**: Medium  
**Category**: Advanced Patterns

### Answer 📄

`provide` and `inject` allow components to share data across the component tree without passing props through every intermediate component.

A parent component can provide values, and any descendant component can inject those values.

This pattern is commonly used for dependency injection and shared services.

Example:

```js
// Parent
import { provide } from 'vue';

provide('theme', 'dark');
```

```js
// Child
import { inject } from 'vue';

const theme = inject('theme');
```

## 🧠 Question 27

**ID**: vue-027  
**Title**: What are dynamic components in Vue?  
**Difficulty**: Medium  
**Category**: Components

### Answer 📄

Dynamic components allow Vue applications to switch between different components at runtime.

This is achieved using the `<component>` element with the `:is` attribute.

Dynamic components are useful for building tab interfaces, dashboards, or conditional component rendering.

Example:

```vue
<component :is="currentComponent"></component>
```

## 🧠 Question 28

**ID**: vue-028  
**Title**: What is the `<KeepAlive>` component in Vue?  
**Difficulty**: Medium  
**Category**: Components

### Answer 📄

`<KeepAlive>` is a built-in component that caches inactive components instead of destroying them.

When a cached component is reactivated, its state is preserved.

This improves performance and user experience when switching between dynamic components.

Example:

```vue
<KeepAlive>
  <component :is="currentComponent" />
</KeepAlive>
```

## 🧠 Question 29

**ID**: vue-029  
**Title**: What is Teleport in Vue?  
**Difficulty**: Medium  
**Category**: Components

### Answer 📄

Teleport is a Vue feature that allows a component to render part of its template outside of its normal DOM hierarchy.

It is useful for UI elements such as:

- Modals
- Tooltips
- Notifications

Teleport ensures these elements are rendered in the correct place in the DOM while still being managed by Vue.

Example:

```vue
<Teleport to="body">
  <div class="modal">Modal Content</div>
</Teleport>
```

## 🧠 Question 30

**ID**: vue-030  
**Title**: What is Suspense in Vue?  
**Difficulty**: Hard  
**Category**: Components

### Answer 📄

Suspense is a Vue component used to handle asynchronous components or data dependencies.

It allows developers to define a fallback UI that is displayed while async operations are pending.

Suspense improves user experience by handling loading states in a structured way.

## 🧠 Question 31

**ID**: vue-031  
**Title**: What is `<script setup>` in Vue 3?  
**Difficulty**: Medium  
**Category**: Composition API

### Answer 📄

`<script setup>` is a compile-time syntax introduced in Vue 3 that simplifies the use of the Composition API.

It removes the need to explicitly return values from the `setup()` function.

All variables declared inside `<script setup>` are automatically exposed to the template.

Benefits include:

- Less boilerplate
- Better TypeScript support
- Improved readability
- Faster compilation

Example:

```vue
<script setup>
import { ref } from 'vue';

const count = ref(0);

function increment() {
  count.value++;
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

## 🧠 Question 32

**ID**: vue-032  
**Title**: What are `toRef()` and `toRefs()` and when should you use them?  
**Difficulty**: Medium  
**Category**: Reactivity System

### Answer 📄

`toRef()` creates a ref that is linked to a specific property of a reactive object.

`toRefs()` converts all properties of a reactive object into individual refs.

Both utilities are useful when you need to destructure a reactive object while preserving reactivity.

Without `toRefs()`, destructuring a `reactive` object breaks the reactive connection.

Key differences:

- `toRef()` targets a single property
- `toRefs()` converts all properties at once
- Both keep the link to the original reactive object

Example:

```js
import { reactive, toRef, toRefs } from 'vue';

const state = reactive({ name: 'Rasool', age: 27 });

// toRef — single property stays reactive
const age = toRef(state, 'age');
age.value++; // updates state.age

// toRefs — destructure without losing reactivity
const { name, age: ageRef } = toRefs(state);
name.value = 'Ali'; // updates state.name
```

## 🧠 Question 33

**ID**: vue-033  
**Title**: What is the purpose of `computed()` in Vue?  
**Difficulty**: Easy  
**Category**: Reactivity System

### Answer 📄

`computed()` creates a reactive value that is derived from other reactive state.

Computed properties are cached and only recomputed when their dependencies change.

This improves performance and keeps templates clean.

Computed values are commonly used for derived state such as filtered lists or formatted values.

Example:

```js
import { ref, computed } from 'vue';

const price = ref(100);

const discountedPrice = computed(() => price.value * 0.9);
```

## 🧠 Question 34

**ID**: vue-034  
**Title**: What is `defineEmits()` and how do you emit custom events in Vue 3?  
**Difficulty**: Medium  
**Category**: Components

### Answer 📄

`defineEmits()` is a compiler macro used in `<script setup>` to declare the events a component can emit.

It makes the component's event API explicit and enables type-safe event emission.

Without `defineEmits()`, emitting events still works but loses type-checking and IDE support.

Key benefits:

- Documents which events a component emits
- Enables TypeScript validation of event names and payloads
- Required in `<script setup>` since the `$emit` instance method is not available

Example:

```vue
<script setup>
const emit = defineEmits(['update:count', 'submit']);

function handleClick() {
  emit('update:count', 42);
}
</script>

<template>
  <button @click="handleClick">Click me</button>
</template>
```

## 🧠 Question 35

**ID**: vue-035  
**Title**: What is the Virtual DOM and how does Vue use it?  
**Difficulty**: Medium  
**Category**: Rendering & Internals

### Answer 📄

The Virtual DOM is an in-memory representation of the real DOM.

Vue updates the Virtual DOM first when state changes.

It then compares the new Virtual DOM with the previous one using a diffing algorithm.

Finally, Vue applies the minimal set of changes to the real DOM.

This process improves performance by avoiding unnecessary DOM updates.

## 🧠 Question 36

**ID**: vue-036  
**Title**: What is Vue Router and how do you set up routing in a Vue application?  
**Difficulty**: Medium  
**Category**: Routing

### Answer 📄

Vue Router is the official routing library for Vue applications.

It enables navigation between views without full page reloads, which is essential for single-page applications.

Core concepts include:

- **Routes** map URL paths to components
- **`<RouterView>`** renders the matched component for the current URL
- **`<RouterLink>`** creates declarative navigation links

Example:

```js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
  ],
});

export default router;
```

```vue
<!-- App.vue -->
<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <RouterView />
</template>
```

## 🧠 Question 37

**ID**: vue-037  
**Title**: What are render functions in Vue?  
**Difficulty**: Hard  
**Category**: Rendering & Internals

### Answer 📄

Render functions allow developers to define how a component renders using JavaScript instead of templates.

They provide full programmatic control over the rendering process.

Render functions are rarely used in typical applications but are useful when building:

- UI libraries
- highly dynamic components
- advanced rendering logic

Example:

```js
import { h } from 'vue';

export default {
  render() {
    return h('div', { class: 'container' }, [
      h('h1', 'Hello from render function'),
      h('p', 'This is rendered without a template.'),
    ]);
  },
};
```

## 🧠 Question 38

**ID**: vue-038  
**Title**: What are navigation guards in Vue Router?  
**Difficulty**: Medium  
**Category**: Routing

### Answer 📄

Navigation guards are hooks that allow you to control or cancel route navigation in Vue Router.

They are commonly used for:

- Authentication checks before accessing protected routes
- Redirecting unauthenticated users to a login page
- Preventing navigation when there are unsaved changes

Vue Router provides three types of guards:

- **Global guards** — `router.beforeEach`, `router.afterEach`
- **Per-route guards** — defined in the route config
- **In-component guards** — `onBeforeRouteLeave`, `onBeforeRouteUpdate`

Example:

```js
// Global navigation guard
router.beforeEach((to, from) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { path: '/login' };
  }
});
```

## 🧠 Question 39

**ID**: vue-039  
**Title**: How does `v-model` work on custom components in Vue 3?  
**Difficulty**: Medium  
**Category**: Components

### Answer 📄

In Vue 3, using `v-model` on a custom component expands to a `modelValue` prop and an `update:modelValue` emit.

This allows custom components to support two-way data binding with a clean, readable API.

Vue 3 also supports multiple `v-model` bindings on a single component using named arguments such as `v-model:title` or `v-model:count`.

Example:

```vue
<!-- Parent -->
<CustomInput v-model="username" />
```

```vue
<!-- CustomInput.vue -->
<script setup>
defineProps({ modelValue: String });
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

## 🧠 Question 40

**ID**: vue-040  
**Title**: What is the purpose of the `key` attribute in Vue lists?  
**Difficulty**: Easy  
**Category**: Rendering & Internals

### Answer 📄

The `key` attribute helps Vue track elements when rendering lists.

It allows the virtual DOM diffing algorithm to correctly identify which items have changed.

Using unique keys improves performance and prevents unexpected UI behavior.

Example:

```vue
<ul>
  <li v-for="item in items" :key="item.id">
    {{ item.name }}
  </li>
</ul>
```

## 🧠 Question 41

**ID**: vue-041  
**Title**: What are async components in Vue?  
**Difficulty**: Medium  
**Category**: Performance

### Answer 📄

Async components allow components to be loaded lazily.

Instead of loading all components during the initial bundle, Vue loads them only when needed.

This improves application performance and reduces bundle size.

Example:

```js
import { defineAsyncComponent } from 'vue';

const AsyncComponent = defineAsyncComponent(
  () => import('./HeavyComponent.vue'),
);
```

## 🧠 Question 42

**ID**: vue-042  
**Title**: What is code splitting in Vue applications?  
**Difficulty**: Medium  
**Category**: Performance

### Answer 📄

Code splitting is a technique that divides the application bundle into smaller chunks.

These chunks are loaded on demand when users navigate through the application.

Vue applications commonly use dynamic imports to achieve code splitting.

This improves load time and performance.

## 🧠 Question 43

**ID**: vue-043  
**Title**: What is Pinia and why is it used in Vue applications?  
**Difficulty**: Medium  
**Category**: State Management

### Answer 📄

Pinia is the official state management library for Vue.

It replaces Vuex in modern Vue applications.

Pinia provides:

- a simpler API
- better TypeScript support
- modular store architecture
- improved developer experience

### Example (Q43): Pinia Store

```js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

## 🧠 Question 44

**ID**: vue-044  
**Title**: What is server-side rendering (SSR) in Vue?  
**Difficulty**: Hard  
**Category**: Rendering & Internals

### Answer 📄

Server-side rendering means rendering Vue components on the server instead of the browser.

The server sends a fully rendered HTML page to the client.

Benefits include:

- improved SEO
- faster initial load time
- better performance for slow devices

## 🧠 Question 45

**ID**: vue-045  
**Title**: What is hydration in Vue SSR?  
**Difficulty**: Hard  
**Category**: Rendering & Internals

### Answer 📄

Hydration is the process where Vue attaches event listeners and reactive behavior to server-rendered HTML.

After the browser receives the HTML from the server, Vue reuses that markup instead of recreating it.

This allows the application to become fully interactive while avoiding unnecessary DOM rendering.

## 🧠 Question 46

**ID**: vue-046  
**Title**: What is the `<Transition>` component and how does it work in Vue?  
**Difficulty**: Medium  
**Category**: Advanced Patterns

### Answer 📄

The `<Transition>` component applies CSS transitions or JavaScript animations when an element is inserted into or removed from the DOM.

Vue automatically adds and removes CSS classes at specific stages of the transition lifecycle.

The six transition classes are:

- `v-enter-from`, `v-enter-active`, `v-enter-to` — for entering
- `v-leave-from`, `v-leave-active`, `v-leave-to` — for leaving

`<TransitionGroup>` handles transitions for lists rendered with `v-for`.

Example:

```vue
<Transition name="fade">
  <p v-if="isVisible">Hello</p>
</Transition>
```

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

## 🧠 Question 47

**ID**: vue-047  
**Title**: How does Vue handle errors and what is `onErrorCaptured`?  
**Difficulty**: Hard  
**Category**: Advanced Patterns

### Answer 📄

Vue provides several mechanisms for handling errors in components.

`onErrorCaptured` is a lifecycle hook that catches errors thrown by descendant components.

It allows you to implement component-level error boundaries and display fallback UI.

For global error handling, Vue provides `app.config.errorHandler`, which catches any unhandled error in the entire application.

Example:

```js
import { onErrorCaptured, ref } from 'vue';

const hasError = ref(false);
const errorMessage = ref('');

onErrorCaptured((err) => {
  hasError.value = true;
  errorMessage.value = err.message;
  return false; // prevent the error from propagating further
});
```

```js
// Global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err);
};
```

## 🧠 Question 48

**ID**: vue-048  
**Title**: What are `shallowRef()` and `shallowReactive()` in Vue?  
**Difficulty**: Hard  
**Category**: Reactivity System

### Answer 📄

`shallowRef()` and `shallowReactive()` are performance-focused alternatives to `ref()` and `reactive()`.

`shallowRef()` only makes the top-level `.value` reactive. Nested objects inside are not tracked.

`shallowReactive()` only makes the direct properties of an object reactive. Nested properties are not tracked.

These are useful when working with large data structures or external libraries where deep reactivity would cause unnecessary overhead.

Example:

```js
import { shallowRef, shallowReactive } from 'vue';

const state = shallowRef({ nested: { count: 0 } });

// Triggers reactivity (replaces top-level value)
state.value = { nested: { count: 1 } };

// Does NOT trigger reactivity (mutates nested property)
state.value.nested.count = 2;

// shallowReactive
const form = shallowReactive({ user: { name: 'Rasool' } });
form.user = { name: 'Ali' }; // triggers reactivity
form.user.name = 'Ali'; // does NOT trigger reactivity
```

## 🧠 Question 49

**ID**: vue-049  
**Title**: What is `defineExpose()` in Vue 3 and why is it needed?  
**Difficulty**: Medium  
**Category**: Composition API

### Answer 📄

By default, components using `<script setup>` do not expose any internal state or methods to their parent components.

`defineExpose()` explicitly declares what a child component exposes to parent components through template refs.

This follows the principle of encapsulation — only the intended parts of the component API are accessible from outside.

Example:

```vue
<!-- Child.vue -->
<script setup>
import { ref } from 'vue';

const count = ref(0);

function reset() {
  count.value = 0;
}

defineExpose({ count, reset });
</script>
```

```vue
<!-- Parent.vue -->
<script setup>
import { ref } from 'vue';
import Child from './Child.vue';

const childRef = ref(null);

function resetChild() {
  childRef.value.reset();
}
</script>

<template>
  <Child ref="childRef" />
  <button @click="resetChild">Reset</button>
</template>
```

## 🧠 Question 50

**ID**: vue-050  
**Title**: What is programmatic navigation in Vue Router?  
**Difficulty**: Medium  
**Category**: Routing

### Answer 📄

Programmatic navigation allows you to change routes using JavaScript instead of `<RouterLink>`.

This is useful for redirecting after form submission, login, or any conditional navigation logic.

Vue Router provides two main methods:

- `router.push()` — navigates to a new route and adds an entry to the browser history
- `router.replace()` — navigates to a new route but replaces the current history entry

You can pass a path string or a route location object with a name, params, or query.

Example:

```js
import { useRouter } from 'vue-router';

const router = useRouter();

// Navigate by path
router.push('/dashboard');

// Navigate by named route with params
router.push({ name: 'Profile', params: { id: 42 } });

// Navigate with query string
router.push({ path: '/search', query: { q: 'vue' } });

// Replace current route (no new history entry)
router.replace('/login');
```

## 🧠 Question 51

**ID**: vue-051  
**Title**: What is `nextTick()` and why is it needed in Vue?  
**Difficulty**: Medium  
**Category**: Reactivity System

### Answer 📄

`nextTick()` returns a promise that resolves after Vue has finished flushing all pending DOM updates.

Vue batches DOM updates asynchronously to improve performance. When you change reactive state, the DOM is not updated immediately — it is scheduled for the next microtask tick.

`nextTick()` allows you to wait for the DOM to reflect the latest state before reading it or interacting with it.

Common use cases:

- Reading updated DOM measurements after a state change
- Accessing a newly rendered element via a template ref
- Running assertions in unit tests after triggering reactive state changes

Example:

```js
import { nextTick, ref } from 'vue';

const message = ref('');

async function updateMessage() {
  message.value = 'Updated';

  // DOM is NOT yet updated here
  await nextTick();
  // DOM is now updated
  console.log(document.getElementById('msg').textContent); // 'Updated'
}
```

## 🧠 Question 52

**ID**: vue-052  
**Title**: What are the `deep`, `immediate`, and `flush` options in `watch`?  
**Difficulty**: Medium  
**Category**: Reactivity System

### Answer 📄

The `watch` function accepts an options object that controls how the watcher behaves.

- **`deep: true`** — watches nested properties inside objects or arrays. Without it, only the top-level reference is tracked and nested mutations are ignored.
- **`immediate: true`** — runs the callback immediately when the watcher is created, instead of waiting for the first change.
- **`flush: 'post'`** — defers the callback until after Vue has updated the DOM, allowing access to the updated DOM inside the callback. The default is `'pre'`.

Example:

```js
import { ref, watch } from 'vue';

const user = ref({ name: 'Rasool', age: 27 });

watch(
  user,
  (newValue) => {
    console.log('user changed:', newValue.name);
  },
  {
    deep: true, // detect nested property changes
    immediate: true, // run on component mount
    flush: 'post', // run after DOM updates
  },
);
```

## 🧠 Question 53

**ID**: vue-053  
**Title**: What are `markRaw()` and `toRaw()` and when should you use them?  
**Difficulty**: Hard  
**Category**: Reactivity System

### Answer 📄

`markRaw()` marks an object so it is never converted into a reactive proxy, even if it is placed inside a reactive container.

`toRaw()` returns the original plain JavaScript object from a reactive proxy.

Both are important for performance and compatibility with third-party libraries that break when wrapped in a Vue Proxy.

When to use:

- `markRaw()` — for objects that should never be reactive, such as chart instances, WebGL contexts, or large data structures.
- `toRaw()` — when you need the original object for external APIs, comparisons, or serialization.

Example:

```js
import { reactive, markRaw, toRaw } from 'vue';

class ChartInstance {}

// markRaw — prevent reactivity on a third-party instance
const chart = markRaw(new ChartInstance());
const state = reactive({ chart }); // chart is stored but never proxied

// toRaw — extract the original object from a reactive proxy
const user = reactive({ name: 'Rasool' });
const raw = toRaw(user); // plain JS object
console.log(raw === user); // false — proxy !== original
```

## 🧠 Question 54

**ID**: vue-054  
**Title**: What is `readonly()` in Vue and when should you use it?  
**Difficulty**: Medium  
**Category**: Reactivity System

### Answer 📄

`readonly()` wraps a reactive object and prevents any mutation of it.

Attempting to modify a readonly object logs a warning in development mode and silently fails in production.

It is commonly used to:

- Expose shared state to child components without allowing mutation
- Enforce immutability when using `provide` / `inject`
- Protect store state that should only be modified through defined actions

Example:

```js
import { reactive, readonly, provide } from 'vue';

const state = reactive({ count: 0 });

// Expose a readonly version to descendants
provide('appState', readonly(state));

// Somewhere in a child component:
// appState.count++ // Warning: Set operation on key "count" failed — target is readonly
```

## 🧠 Question 55

**ID**: vue-055  
**Title**: What is the Vue plugin system and how do you create a plugin?  
**Difficulty**: Medium  
**Category**: Advanced Patterns

### Answer 📄

Vue plugins extend the application with reusable, application-level functionality.

A plugin is an object with an `install(app, options)` method, or simply a function with the same signature.

Plugins can:

- Register global components and directives
- Add properties to `app.config.globalProperties`
- Provide application-level values via `app.provide()`
- Install third-party libraries

Example:

```js
// myPlugin.js
export const myPlugin = {
  install(app, options) {
    // Global property accessible as this.$translate in Options API
    app.config.globalProperties.$translate = (key) =>
      options.translations[key] ?? key;

    // Global provide for Composition API
    app.provide('translations', options.translations);

    // Register a global component
    app.component('AppIcon', AppIcon);
  },
};

// main.js
app.use(myPlugin, {
  translations: { welcome: 'Welcome' },
});
```

## 🧠 Question 56

**ID**: vue-056  
**Title**: What is `effectScope()` and when is it useful?  
**Difficulty**: Hard  
**Category**: Reactivity System

### Answer 📄

`effectScope()` creates a scope that captures all reactive effects — computed properties, watchers, and watchEffect calls — created inside it.

All effects within the scope can be stopped simultaneously by calling `scope.stop()`.

This is particularly useful for:

- Vue library authors building composables that create multiple effects
- Dynamically creating and cleaning up groups of reactive effects
- Replacing manual cleanup of multiple independent `watch` calls

Example:

```js
import { effectScope, ref, watch, computed } from 'vue';

const scope = effectScope();

scope.run(() => {
  const count = ref(0);
  const doubled = computed(() => count.value * 2);

  watch(count, (val) => {
    console.log('count:', val);
  });
});

// Dispose all effects inside the scope at once
scope.stop();
```

## 🧠 Question 57

**ID**: vue-057  
**Title**: What are `:deep()`, `:slotted()`, and `:global()` in scoped styles?  
**Difficulty**: Medium  
**Category**: Components

### Answer 📄

When using `<style scoped>`, Vue adds a unique data attribute to all elements so that styles only apply within the current component.

This creates challenges when styling child components or slot content from a parent.

- **`:deep(selector)`** — penetrates the scope boundary to style elements inside child components.
- **`:slotted(selector)`** — targets elements passed into the component via slots.
- **`:global(selector)`** — applies a style globally without any scope attribute, as if placed in a non-scoped style block.

Example:

```vue
<style scoped>
/* Style an element inside a child component */
.wrapper :deep(.child-input) {
  border: 1px solid blue;
}

/* Style content passed via slots */
:slotted(p) {
  font-weight: bold;
}

/* Apply a truly global rule from a scoped block */
:global(.modal-open) {
  overflow: hidden;
}
</style>
```

## 🧠 Question 58

**ID**: vue-058  
**Title**: How do you lazy-load routes in Vue Router for code splitting?  
**Difficulty**: Medium  
**Category**: Routing

### Answer 📄

Lazy-loading routes means each route's component is loaded only when the user navigates to it, instead of including everything in the initial bundle.

This is implemented using dynamic imports: `() => import('./views/Page.vue')`.

Vite and webpack automatically create separate code chunks for each lazy-loaded route, significantly reducing the initial JavaScript payload.

You can also group routes into the same chunk using the webpackChunkName comment or Vite's `rollupOptions`.

Example:

```js
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/admin',
      // loaded only when the user visits /admin
      component: () => import('./views/Admin.vue'),
    },
    {
      path: '/settings',
      // Group into a named chunk
      component: () =>
        import(/* webpackChunkName: "settings" */ './views/Settings.vue'),
    },
  ],
});
```

## 🧠 Question 59

**ID**: vue-059  
**Title**: What are functional components in Vue 3 and when should you use them?  
**Difficulty**: Hard  
**Category**: Performance

### Answer 📄

Functional components are stateless components that render without a component instance.

They are defined as plain JavaScript functions that accept props and a context object containing `slots`, `attrs`, and `emit`.

Because they skip instance creation, they have no lifecycle hooks, no reactive data, and no `this` context.

Functional components are more performant than stateful components for simple rendering logic, but the difference is small in Vue 3 compared to Vue 2.

Use them for purely presentational components that only transform props into a rendered output.

Example:

```js
import { h } from 'vue';

// Functional component as a plain function
const Badge = (props, { slots }) => {
  return h('span', { class: `badge badge-${props.type}` }, slots.default?.());
};

Badge.props = ['type'];
```

## 🧠 Question 60

**ID**: vue-060  
**Title**: What are `useAttrs()` and `useSlots()` in the Composition API?  
**Difficulty**: Medium  
**Category**: Composition API

### Answer 📄

`useAttrs()` returns the non-prop attributes passed to the component — anything not declared as a prop, including `class`, `style`, and event listeners.

`useSlots()` returns the slot functions available to the component.

Both are useful when building transparent wrapper components that need to forward attributes and slots to an inner element.

By default in `<script setup>`, attributes are not automatically applied to the root element unless `inheritAttrs: false` is set. Using `v-bind="attrs"` makes forwarding explicit.

Example:

```vue
<script setup>
import { useAttrs, useSlots } from 'vue';

const attrs = useAttrs();
const slots = useSlots();
</script>

<template>
  <!-- Forward all non-prop attributes to the inner element -->
  <div class="input-wrapper">
    <input v-bind="attrs" />
  </div>
</template>
```

## 🧠 Question 61

**ID**: vue-061  
**Title**: How do you clean up side effects inside `watchEffect`?  
**Difficulty**: Hard  
**Category**: Reactivity System

### Answer 📄

`watchEffect` passes an `onCleanup` function to its callback that lets you cancel or clean up the previous side effect before the effect runs again.

This is critical when performing async operations such as HTTP requests — without cleanup, a previous request could resolve after a newer one, causing a race condition.

`onCleanup` runs before the next execution of the effect and when the component is unmounted.

Example:

```js
import { ref, watchEffect } from 'vue';

const userId = ref(1);

watchEffect((onCleanup) => {
  const controller = new AbortController();

  fetch(`/api/users/${userId.value}`, {
    signal: controller.signal,
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => {
      if (err.name !== 'AbortError') console.error(err);
    });

  onCleanup(() => {
    controller.abort(); // cancel in-flight request when userId changes
  });
});
```

## 🧠 Question 62

**ID**: vue-062  
**Title**: What are named views in Vue Router?  
**Difficulty**: Medium  
**Category**: Routing

### Answer 📄

Named views allow multiple `<RouterView>` components to be rendered simultaneously on the same route, each displaying a different component.

This is useful for complex layouts where different parts of the page — such as a sidebar, header, and main content — are each controlled by a separate component.

Each `<RouterView>` is given a `name` attribute, and the route config maps component names to those view names using the `components` (plural) option.

Example:

```js
const router = createRouter({
  routes: [
    {
      path: '/dashboard',
      components: {
        default: DashboardMain,
        sidebar: DashboardSidebar,
        header: DashboardHeader,
      },
    },
  ],
});
```

```vue
<!-- App.vue -->
<template>
  <RouterView name="header" />
  <div class="layout">
    <RouterView name="sidebar" />
    <RouterView />
    <!-- default -->
  </div>
</template>
```

## 🧠 Question 63

**ID**: vue-063  
**Title**: How does `app.provide()` differ from component-level `provide`?  
**Difficulty**: Medium  
**Category**: Advanced Patterns

### Answer 📄

`app.provide()` registers a value at the application level, making it injectable in any component anywhere in the application tree.

Component-level `provide` (inside a component's `setup`) only makes the value available to descendant components in that specific subtree.

`app.provide()` is the recommended way to share global services such as API clients, configuration objects, authentication state, or internationalization helpers.

Example:

```js
// main.js
const app = createApp(App);

app.provide('apiBase', 'https://api.example.com');
app.provide('featureFlags', { darkMode: true, betaFeatures: false });

app.mount('#app');
```

```js
// Any component in the application
import { inject } from 'vue';

const apiBase = inject('apiBase');
const flags = inject('featureFlags');
```

## 🧠 Question 64

**ID**: vue-064  
**Title**: How does Vue 3's reactivity system work internally using JavaScript Proxy?  
**Difficulty**: Hard  
**Category**: Reactivity System

### Answer 📄

Vue 3 replaced Vue 2's `Object.defineProperty`-based reactivity with JavaScript `Proxy`.

When you call `reactive(obj)`, Vue wraps the object in a `Proxy` that intercepts property access and mutation.

During a `get`, Vue calls `track()` to record which reactive effect is currently executing and depends on that property.

During a `set`, Vue calls `trigger()` to notify all recorded effects that depend on the changed property, causing them to re-run.

This approach has key advantages over Vue 2:

- Detects property additions and deletions without special APIs
- Handles arrays natively without wrapping mutation methods
- Supports `Map`, `Set`, `WeakMap`, and `WeakSet`

Example (simplified internals):

```js
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key); // record which effect is reading this
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      trigger(target, key); // notify effects that depend on this key
      return result;
    },
  });
}
```

## 🧠 Question 65

**ID**: vue-065  
**Title**: What are recursive components in Vue and how do you implement them?  
**Difficulty**: Hard  
**Category**: Components

### Answer 📄

A recursive component is a component that renders itself within its own template.

This is essential for rendering tree-structured data such as file explorers, nested menus, comment threads, or organizational charts.

In Vue 3 with `<script setup>`, a component can reference itself by its filename automatically. In the Options API, a `name` option is required.

A base case (typically an empty `children` array or null check) must always be included to prevent infinite recursion.

Example:

```vue
<!-- TreeNode.vue -->
<script setup>
defineProps({
  node: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <li>
    <span>{{ node.label }}</span>
    <ul v-if="node.children?.length">
      <!-- Recursively renders itself for each child -->
      <TreeNode v-for="child in node.children" :key="child.id" :node="child" />
    </ul>
  </li>
</template>
```

## 🧠 Question 66

**ID**: vue-066  
**Title**: What is the difference between `created`, `onBeforeMount`, and `mounted` lifecycle hooks?  
**Difficulty**: Medium  
**Category**: Lifecycle

### Answer 📄

These three hooks fire at different stages of a component's initialization.

**`created`** (Options API) / no direct equivalent in Composition API — the `setup()` function itself runs at this stage. The reactive data is initialized, computed properties and watchers are set up, but the component has not yet been added to the DOM.

**`onBeforeMount`** runs after the render function is compiled and about to execute for the first time, but before the component's DOM nodes are inserted into the document.

**`mounted`** / **`onMounted`** runs after the component's DOM has been created and inserted. This is the correct place to access the real DOM, start subscriptions, measure elements, or initialize third-party libraries that require a DOM node.

```vue
<script setup>
import { onBeforeMount, onMounted } from 'vue';

console.log('setup (= created): DOM not yet available');

onBeforeMount(() => {
  console.log('onBeforeMount: about to render');
});

onMounted(() => {
  console.log('onMounted: DOM is ready');
});
</script>
```

## 🧠 Question 67

**ID**: vue-067  
**Title**: What happens internally when a Vue 3 component mounts?  
**Difficulty**: Hard  
**Category**: Rendering & Internals

### Answer 📄

When a Vue 3 component mounts, the runtime goes through a well-defined sequence:

1. **Component instance is created** — reactive state, computed properties, and watchers are initialized.
2. **`setup()` runs** — the Composition API entry point. Props are resolved, `provide`/`inject` chains are connected.
3. **Render function is compiled** (if using SFC templates, this is done at build time by the Vue compiler).
4. **`onBeforeMount` hooks fire**.
5. **Render effect runs** — the render function executes, producing a virtual DOM tree. During this execution, reactive dependencies are tracked.
6. **Virtual DOM is patched into the real DOM** — Vue's runtime-dom module converts the vnode tree into actual DOM nodes.
7. **`onMounted` hooks fire** — child hooks fire before parent hooks (bottom-up).

After mounting, any reactive dependency change triggers the component's render effect to re-run (producing a new vnode tree), which Vue diffs against the previous tree and patches only the changed DOM nodes.

## 🧠 Question 68

**ID**: vue-068  
**Title**: What are the key differences between Vuex and Pinia?  
**Difficulty**: Medium  
**Category**: State Management

### Answer 📄

Pinia is the official recommended state management library for Vue 3, effectively replacing Vuex.

Key differences:

| Feature         | Vuex                     | Pinia                                    |
| --------------- | ------------------------ | ---------------------------------------- |
| Mutations       | Required to change state | Removed — state is changed directly      |
| Modules         | Nested, verbose setup    | Each store is a flat, independent module |
| TypeScript      | Requires boilerplate     | First-class TypeScript support           |
| Devtools        | Supported                | Supported with better DX                 |
| Bundle size     | Larger                   | Much smaller (~1KB)                      |
| Composition API | Limited support          | Native support with `setup()` stores     |

In Pinia you can use either the Options-style or the setup-style store:

```js
// Pinia - Options store
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});

// Pinia - Setup store (Composition API style)
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const double = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  return { count, double, increment };
});
```

## 🧠 Question 69

**ID**: vue-069  
**Title**: How do dynamic route parameters work in Vue Router?  
**Difficulty**: Medium  
**Category**: Routing

### Answer 📄

Dynamic route segments are defined using a colon prefix in the route path. They match any value at that position and expose the matched value via `route.params`.

```js
const routes = [
  { path: '/users/:id', component: UserProfile },
  { path: '/posts/:category/:slug', component: BlogPost },
];
```

Inside a component you access them with `useRoute()`:

```vue
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const userId = route.params.id; // e.g., "42"
</script>
```

**Reacting to param changes** — when navigating between the same route with different params (e.g., `/users/1` → `/users/2`), the component is reused. Use `watch` or `watchEffect` to react:

```js
watch(
  () => route.params.id,
  (newId) => {
    fetchUser(newId);
  },
);
```

**Optional params** use `?` and **multiple matches** use `*` or `+`:

```js
{
  path: '/files/:path*';
} // matches /files/a/b/c
```

## 🧠 Question 70

**ID**: vue-070  
**Title**: What is the difference between route params and query params in Vue Router?  
**Difficulty**: Easy  
**Category**: Routing

### Answer 📄

**Route params** are part of the URL path defined with `:paramName`. They are required by the route pattern and change which route matches.

**Query params** appear after the `?` in the URL and are optional key-value pairs. They do not affect route matching.

```js
// URL: /search?q=vue&page=2
const route = useRoute();
route.params.id; // path param — defined in route definition
route.query.q; // 'vue'
route.query.page; // '2'
```

Programmatic navigation with both:

```js
router.push({
  path: '/users/42',
  query: { tab: 'posts', sort: 'recent' },
});
// → /users/42?tab=posts&sort=recent
```

Use params for resource identity (user ID, article slug) and query params for UI state (filters, pagination, sorting).

## 🧠 Question 71

**ID**: vue-071  
**Title**: How does Vue compile `.vue` templates into render functions?  
**Difficulty**: Hard  
**Category**: Rendering & Internals

### Answer 📄

Vue's template compiler (`@vue/compiler-dom`) transforms `.vue` template strings into JavaScript render functions at build time (via `@vitejs/plugin-vue` or `vue-loader`).

The compilation pipeline has three stages:

1. **Parse** — the template HTML is parsed into an Abstract Syntax Tree (AST).
2. **Transform** — the AST is traversed and optimized. Vue applies transforms for directives (`v-if`, `v-for`), event handlers, slot compilation, and marks static subtrees with `hoistStatic` flags so they are created once outside the render function.
3. **Generate (Code generation)** — the optimized AST is converted into a JavaScript function string.

A simple template like:

```html
<div class="hello">{{ msg }}</div>
```

Compiles to roughly:

```js
import {
  createElementVNode as _createElementVNode,
  toDisplayString as _toDisplayString,
} from 'vue';

function render(_ctx) {
  return _createElementVNode(
    'div',
    { class: 'hello' },
    _toDisplayString(_ctx.msg),
  );
}
```

Static nodes are hoisted above the function so they are only created once, avoiding unnecessary allocations on re-renders. Dynamic nodes are tracked using patch flags (bitwise integers) that tell the runtime exactly what changed.

## 🧠 Question 72

**ID**: vue-072  
**Title**: How does the Vue scheduler batch and defer reactive updates?  
**Difficulty**: Hard  
**Category**: Reactivity System

### Answer 📄

Vue does not update the DOM synchronously when reactive state changes. Instead, it queues the component's re-render and flushes the queue asynchronously in a microtask (using `Promise.then`).

This means multiple synchronous state changes within one task only cause one re-render:

```js
const count = ref(0);

count.value++;
count.value++;
count.value++;
// DOM is updated once, not three times
```

Vue maintains a job queue. When a reactive effect is triggered, Vue calls `queueJob(effect)`. Duplicate jobs (same component render effect) are deduplicated using their internal `id`. After all synchronous code finishes, the microtask runs `flushJobs()`, sorting jobs by their `id` (parent components render before children) and executing them in order.

`nextTick()` returns a promise that resolves after the current flush cycle:

```js
import { nextTick, ref } from 'vue';

const msg = ref('hello');
msg.value = 'world';

await nextTick();
// DOM now reflects 'world'
```

Pre-flush watchers (using `flush: 'pre'`, the default for `watch`) run before the component re-renders. Post-flush watchers (`flush: 'post'`) run after.

## 🧠 Question 73

**ID**: vue-073  
**Title**: How does Vue 3's effect tracking work internally (activeEffect and dependency sets)?  
**Difficulty**: Hard  
**Category**: Reactivity System

### Answer 📄

Vue 3's reactivity is built on two concepts: **effects** (functions that should re-run when dependencies change) and **dependency sets** (sets of effects that read a reactive property).

Internally Vue maintains a global `activeEffect` variable that points to the effect currently executing. During a reactive getter (`get` Proxy trap), Vue's `track()` function:

1. Reads `activeEffect` — if null, nothing is tracked.
2. Looks up (or creates) a `WeakMap<target, Map<key, Set<effect>>>` structure.
3. Adds `activeEffect` to the `Set` for that `target.key` pair.

During a reactive setter (`set` Proxy trap), Vue's `trigger()` function:

1. Looks up the dependency set for `target.key`.
2. Schedules all effects in that set to re-run via the Vue scheduler.

```js
// Simplified pseudocode
let activeEffect = null;
const targetMap = new WeakMap();

function track(target, key) {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) targetMap.set(target, (depsMap = new Map()));
  let dep = depsMap.get(key);
  if (!dep) depsMap.set(key, (dep = new Set()));
  dep.add(activeEffect);
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  depsMap.get(key)?.forEach((effect) => effect());
}
```

Using a `WeakMap` means the dependency map for an object is garbage-collected when the object itself is.

## 🧠 Question 74

**ID**: vue-074  
**Title**: What is the difference between Client-Side Rendering (CSR) and Server-Side Rendering (SSR) in Vue?  
**Difficulty**: Medium  
**Category**: SSR / Hydration

### Answer 📄

**CSR (Client-Side Rendering)** — the server sends a minimal HTML shell (often just `<div id="app"></div>`) and a JavaScript bundle. The browser downloads the JS, runs Vue, and builds the DOM entirely on the client. Time to First Byte is fast, but the page is blank until JS is parsed and executed (slow Time to Interactive on slow networks).

**SSR (Server-Side Rendering)** — Vue renders the component tree to an HTML string on the server. The browser receives fully-formed HTML immediately (fast First Contentful Paint). After the JS bundle loads, Vue **hydrates** the existing DOM — attaching event listeners and making it interactive without re-rendering.

|             | CSR                  | SSR                     |
| ----------- | -------------------- | ----------------------- |
| First paint | Slow (blank page)    | Fast (HTML ready)       |
| SEO         | Requires extra setup | Excellent               |
| Server load | Low                  | Higher                  |
| Complexity  | Simpler              | Requires Node.js server |

Vue's official SSR solution is **Nuxt.js**, which abstracts the server setup, file-based routing, and hydration strategy (including partial hydration and streaming).

For non-Node SSR, `vue/server-renderer` can output HTML strings from any server environment.

## 🧠 Question 75

**ID**: vue-075  
**Title**: What are advanced patterns for `provide` / `inject` — Symbol keys, reactive injection, and defaults?  
**Difficulty**: Hard  
**Category**: Advanced Patterns

### Answer 📄

`provide` / `inject` is Vue's dependency injection system for sharing data across a component tree without prop drilling.

**Symbol keys** prevent accidental key collisions across libraries or large codebases. Export the Symbol from a shared file:

```js
// keys.js
export const USER_KEY = Symbol('user');
```

```js
// Provider component
import { provide, ref } from 'vue';
import { USER_KEY } from './keys';

const user = ref({ name: 'Alice' });
provide(USER_KEY, user);
```

```js
// Descendant component
import { inject } from 'vue';
import { USER_KEY } from './keys';

const user = inject(USER_KEY); // fully typed if using TypeScript
```

**Reactive injection** — providing a `ref` or `reactive` value keeps the injected value live. The consumer sees changes automatically:

```js
// In provider
const theme = ref('light');
provide('theme', theme); // provide the ref itself, not theme.value

// In consumer
const theme = inject('theme'); // theme is a Ref<string>
```

**Default values** — the second argument to `inject` is a fallback used when no provider is found:

```js
const theme = inject('theme', ref('light'));
// Or a factory function for expensive defaults:
const config = inject('config', () => ({ debug: false }), true);
```

**Read-only injection** — wrap with `readonly()` before providing to prevent consumers from mutating the value.

## 🧠 Question 76

**ID**: vue-076  
**Title**: What is the Vue rendering pipeline from state change to DOM update?  
**Difficulty**: Hard  
**Category**: Rendering & Internals

### Answer 📄

When reactive state changes, Vue's rendering pipeline follows these steps:

1. **Trigger** — a reactive setter calls `trigger()`, scheduling the component's render effect in the job queue.
2. **Scheduler flush** — on the next microtask, `flushJobs()` runs, processing queued render effects in parent-first order.
3. **Re-render** — the component's render function runs, accessing reactive state (which is tracked) and producing a new **virtual DOM (vnode) tree**.
4. **Diff (patch)** — Vue compares the new vnode tree to the previous tree. Using **patch flags** set by the compiler, Vue knows exactly which nodes and attributes are dynamic, skipping static parts entirely.
5. **DOM update** — only the nodes that changed are updated in the real DOM via the runtime-dom module.
6. **Post-flush hooks** — `onUpdated` hooks fire, and `watchEffect` / `watch` post-flush callbacks run.

The compiler's static hoisting and patch flags are critical for performance — they allow the runtime to skip large subtrees that didn't change, making Vue updates sub-linear relative to tree size.

## 🧠 Question 77

**ID**: vue-077  
**Title**: What are the different component communication patterns in Vue?  
**Difficulty**: Medium  
**Category**: Components

### Answer 📄

Vue provides several mechanisms for components to communicate:

**1. Props (parent → child)** — the standard way to pass data down:

```js
defineProps({ title: String, count: Number });
```

**2. Emits (child → parent)** — the child fires events the parent listens to:

```js
const emit = defineEmits(['update:modelValue', 'close']);
emit('close');
```

**3. v-model** — two-way binding shorthand using props + emits:

```html
<MyInput v-model="text" />
<!-- expands to: :modelValue="text" @update:modelValue="text = $event" -->
```

**4. provide / inject** — ancestor → any descendant, bypasses intermediate components.

**5. Pinia / Vuex** — cross-component state in a centralized store.

**6. Template refs + defineExpose** — parent directly calls methods or reads state from a child:

```js
// Child exposes
defineExpose({ reset, validate });
// Parent
const formRef = ref(null);
formRef.value.validate();
```

**7. Event bus** — using a tiny mitt instance for truly decoupled communication between unrelated components. Use sparingly.

## 🧠 Question 78

**ID**: vue-078  
**Title**: What is `<Teleport>` and when should you use it?  
**Difficulty**: Medium  
**Category**: Advanced Patterns

### Answer 📄

`<Teleport>` renders its slot content into a different DOM node than where the component logically lives in the component tree.

This is essential for modals, tooltips, dropdowns, and notifications — UI that must escape CSS `overflow: hidden` or `z-index` stacking contexts imposed by parent elements.

```vue
<template>
  <button @click="open = true">Open Modal</button>

  <Teleport to="body">
    <div v-if="open" class="modal-overlay">
      <div class="modal">
        <p>Modal content</p>
        <button @click="open = false">Close</button>
      </div>
    </div>
  </Teleport>
</template>
```

The `to` attribute accepts a CSS selector or an actual DOM element. The teleported content remains part of the component's logical tree — it inherits `provide`/`inject` from its parent component, and its event handlers work normally.

`disabled` prop lets you conditionally disable teleporting:

```vue
<Teleport to="body" :disabled="isMobile">...</Teleport>
```

Multiple teleports can target the same container and are appended in order.

## 🧠 Question 79

**ID**: vue-079  
**Title**: What is `<Suspense>` and how does it handle async components?  
**Difficulty**: Hard  
**Category**: Advanced Patterns

### Answer 📄

`<Suspense>` is a built-in Vue component that coordinates the loading state of multiple async operations in its component subtree, showing fallback content until all async dependencies resolve.

It has two named slots:

- `#default` — the actual content (may contain async components or components with async `setup()`)
- `#fallback` — shown while any default-slot component is still loading

```vue
<Suspense>
  <template #default>
    <AsyncDashboard />  <!-- has async setup() -->
  </template>
  <template #fallback>
    <LoadingSpinner />
  </template>
</Suspense>
```

An async `setup()` is a component whose `setup` function is `async` or returns a Promise:

```vue
<script setup>
const data = await fetch('/api/dashboard').then((r) => r.json());
</script>
```

`<Suspense>` emits `@pending`, `@resolve`, and `@fallback` events for fine-grained control.

**Nesting**: child `<Suspense>` boundaries handle their own loading independently.

**Note**: `<Suspense>` is still experimental in some configurations and works best when combined with SSR streaming in frameworks like Nuxt 3.

## 🧠 Question 80

**ID**: vue-080  
**Title**: What are `v-model` modifiers and how do you create custom ones?  
**Difficulty**: Medium  
**Category**: Directives

### Answer 📄

Vue provides built-in `v-model` modifiers that transform the bound value:

- `.trim` — strips leading/trailing whitespace from strings
- `.number` — converts the input value to a number using `parseFloat`
- `.lazy` — syncs the value on `change` event instead of `input`

```html
<input v-model.trim.lazy="username" />
```

**Custom modifiers** — when using `v-model` on a custom component, modifiers are passed as a `modelModifiers` prop (or `[propName]Modifiers` for named v-models):

```vue
<!-- Parent -->
<MyInput v-model.capitalize="text" />
```

```vue
<!-- MyInput.vue -->
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) },
});
const emit = defineEmits(['update:modelValue']);

function handleInput(e) {
  let value = e.target.value;
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1);
  }
  emit('update:modelValue', value);
}
</script>

<template>
  <input :value="modelValue" @input="handleInput" />
</template>
```

## 🧠 Question 81

**ID**: vue-081  
**Title**: What is `<TransitionGroup>` and how does it differ from `<Transition>`?  
**Difficulty**: Medium  
**Category**: Advanced Patterns

### Answer 📄

`<Transition>` animates a single element or component entering and leaving the DOM.

`<TransitionGroup>` animates a **list of elements** — it handles multiple items adding, removing, and reordering simultaneously, and supports the FLIP animation technique via the `v-move` class.

Key differences:

- `<TransitionGroup>` renders a real wrapper element by default (use `tag` prop or `tag=""` for fragment mode in Vue 3.1+).
- Items must have a unique `key` for the FLIP calculations to work.
- Supports `v-move` class applied to items that are repositioning (not just entering/leaving).

```vue
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item.id">
    {{ item.text }}
  </li>
</TransitionGroup>
```

```css
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
/* FLIP move transition */
.list-move {
  transition: transform 0.3s ease;
}
```

## 🧠 Question 82

**ID**: vue-082  
**Title**: How do you use Vue 3 with TypeScript for props and emits?  
**Difficulty**: Medium  
**Category**: Composition API

### Answer 📄

Vue 3 has first-class TypeScript support. In `<script setup>` you can type props and emits using generic type arguments passed to the macros.

**Typed props with `defineProps`:**

```vue
<script setup lang="ts">
interface Props {
  title: string;
  count?: number;
  items: string[];
}

const props = defineProps<Props>();
</script>
```

**Default values for typed props** use `withDefaults`:

```ts
const props = withDefaults(defineProps<Props>(), {
  count: 0,
  items: () => [],
});
```

**Typed emits with `defineEmits`:**

```ts
const emit = defineEmits<{
  change: [value: string];
  submit: [id: number, data: Record<string, unknown>];
  close: [];
}>();

emit('change', 'new value');
```

This syntax (added in Vue 3.3) uses a type with labeled tuple members instead of function overloads, providing better IDE autocomplete for emit arguments.

## 🧠 Question 83

**ID**: vue-083  
**Title**: What are composables in Vue 3 and what are best practices for writing them?  
**Difficulty**: Medium  
**Category**: Composition API

### Answer 📄

Composables are functions that encapsulate and reuse stateful logic using the Composition API. They are the Vue 3 equivalent of React hooks and replace Vue 2's mixins.

A composable:

- Has a `use` prefix by convention (`useFetch`, `useMousePosition`)
- Can use `ref`, `reactive`, `computed`, `watch`, `onMounted`, etc.
- Returns reactive state and/or functions

```js
// useFetch.js
import { ref, watchEffect } from 'vue';

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  watchEffect(async (onCleanup) => {
    const controller = new AbortController();
    onCleanup(() => controller.abort());

    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(url.value ?? url, { signal: controller.signal });
      data.value = await res.json();
    } catch (e) {
      if (e.name !== 'AbortError') error.value = e;
    } finally {
      loading.value = false;
    }
  });

  return { data, error, loading };
}
```

**Best practices:**

- Accept refs as arguments to keep the composable reactive to changing inputs
- Clean up side effects (timers, subscriptions) with `onUnmounted` or `onCleanup`
- Return plain reactive references — don't destructure internal state before returning
- Composables should only be called inside `setup()` or another composable

## 🧠 Question 84

**ID**: vue-084  
**Title**: What are template refs and how do you use them in Composition API?  
**Difficulty**: Easy  
**Category**: Composition API

### Answer 📄

Template refs give direct access to a DOM element or child component instance after the component is mounted.

In `<script setup>`, declare a `ref` with the same name as the `ref` attribute on the element:

```vue
<script setup>
import { ref, onMounted } from 'vue';

const inputEl = ref(null);

onMounted(() => {
  inputEl.value.focus(); // access the real DOM element
});
</script>

<template>
  <input ref="inputEl" type="text" />
</template>
```

For a **child component**, the ref points to the child's public interface. In `<script setup>` components, you must use `defineExpose` for the parent to access anything:

```vue
<!-- Child.vue -->
<script setup>
const count = ref(0);
defineExpose({ count });
</script>
```

```vue
<!-- Parent.vue -->
<script setup>
const childRef = ref(null);
// After mount: childRef.value.count is accessible
</script>
<template>
  <Child ref="childRef" />
</template>
```

**`v-for` with refs** — a ref on a `v-for` element populates with an array of DOM nodes after mount.

## 🧠 Question 85

**ID**: vue-085  
**Title**: What is the `watch` flush option and when does each flush timing run?  
**Difficulty**: Hard  
**Category**: Reactivity System

### Answer 📄

The `flush` option in `watch` and `watchEffect` controls when the callback runs relative to Vue's component update cycle.

**`flush: 'pre'` (default for `watch`)** — the callback runs before the component re-renders. Useful when you need to read or modify state that will then be reflected in the current render.

**`flush: 'post'` (default for `watchEffect` when using `watchPostEffect`)** — runs after the component has re-rendered and the DOM has been updated. Use this when the callback needs to access the updated DOM.

**`flush: 'sync'`** — runs synchronously, immediately when the reactive dependency changes. Bypasses the scheduler entirely. Use with extreme caution — can cause performance issues and multiple synchronous updates.

```js
import { watch, watchEffect, watchPostEffect, watchSyncEffect } from 'vue';

// Runs before component update (pre is default for watch)
watch(source, callback, { flush: 'pre' });

// Runs after component update — can access updated DOM
watch(source, callback, { flush: 'post' });

// Convenience aliases
watchPostEffect(() => {
  /* post-flush */
});
watchSyncEffect(() => {
  /* sync */
});
```

## 🧠 Question 86

**ID**: vue-086  
**Title**: What is `defineOptions` and what problems does it solve?  
**Difficulty**: Medium  
**Category**: Composition API

### Answer 📄

`defineOptions` is a compiler macro (added in Vue 3.3) that lets you declare component options — such as `name`, `inheritAttrs`, or custom options — inside `<script setup>` without needing a separate `<script>` block.

Before `defineOptions`, if you needed to set `inheritAttrs: false` alongside `<script setup>`, you had to use two script blocks:

```vue
<!-- Old approach — required two <script> blocks -->
<script>
export default { inheritAttrs: false, name: 'MyWrapper' };
</script>
<script setup>
// ...
</script>
```

With `defineOptions`:

```vue
<script setup>
defineOptions({
  name: 'MyWrapper',
  inheritAttrs: false,
});

import { useAttrs } from 'vue';
const attrs = useAttrs();
</script>

<template>
  <div class="wrapper" v-bind="attrs">
    <slot />
  </div>
</template>
```

It cannot declare `props`, `emits`, `expose`, or `setup` — those remain handled by their own macros.

## 🧠 Question 87

**ID**: vue-087  
**Title**: What causes hydration mismatches in Vue SSR and how do you fix them?  
**Difficulty**: Hard  
**Category**: SSR / Hydration

### Answer 📄

A hydration mismatch occurs when the HTML rendered on the server differs from what Vue would render on the client. Vue logs a warning and falls back to client-side rendering for the mismatched subtree.

**Common causes:**

1. **Non-deterministic rendering** — using `Math.random()`, `Date.now()`, or `uuid()` directly in templates without seeding consistently.
2. **Browser-only APIs** — checking `window`, `localStorage`, or `document` in `setup()` without guarding with `onMounted` or `import.meta.client`.
3. **Invalid HTML structure** — e.g., a `<p>` inside another `<p>`, which browsers silently fix.
4. **User agent based differences** — rendering different content based on the HTTP `User-Agent` header.

**Fixes:**

```vue
<script setup>
import { ref, onMounted } from 'vue';

const isClient = ref(false);
onMounted(() => {
  isClient.value = true;
});
</script>

<template>
  <!-- Only renders on client, no mismatch -->
  <ClientOnly>
    <DatePicker />
  </ClientOnly>

  <!-- Or guard manually -->
  <div v-if="isClient">{{ new Date().toLocaleString() }}</div>
</template>
```

Use `v-if="false"` with a `<ClientOnly>` wrapper (available in Nuxt) or the `suppressHydrationWarning` attribute for intentional differences.

## 🧠 Question 88

**ID**: vue-088  
**Title**: How does Vue handle array mutation reactivity?  
**Difficulty**: Medium  
**Category**: Reactivity System

### Answer 📄

Vue 3's `reactive()` uses Proxy to intercept all property accesses including array index reads and length changes — so array mutations are reactive without any special wrapping.

Both indexed access and mutation methods trigger reactive updates:

```js
import { reactive } from 'vue';

const list = reactive(['a', 'b', 'c']);

list.push('d'); // triggers update
list[0] = 'z'; // triggers update
list.length = 1; // triggers update
list.sort(); // triggers update
list.splice(1, 1); // triggers update
```

This differs from Vue 2, where only specific mutation methods (`push`, `pop`, `splice`, etc.) were intercepted, and direct index assignment (`arr[0] = 'x'`) did not trigger updates.

For `ref` arrays:

```js
const items = ref(['a', 'b', 'c']);
items.value.push('d'); // reactive
items.value = [...items.value, 'e']; // also reactive — replaces the whole array
```

**Replacing the array** is often the cleaner pattern when doing filtering or mapping, as it ensures Vue sees the change and properly diffs the new and old lists.

## 🧠 Question 89

**ID**: vue-089  
**Title**: What is `shallowRef` and when should you use it over `ref`?  
**Difficulty**: Medium  
**Category**: Reactivity System

### Answer 📄

`shallowRef` creates a ref where only the `.value` assignment itself is reactive — the inner object's properties are **not** made deeply reactive.

```js
import { shallowRef } from 'vue';

const state = shallowRef({ count: 0 });

state.value.count++; // does NOT trigger an update
state.value = { count: 1 }; // DOES trigger an update (replacing .value)
```

**When to use `shallowRef`:**

1. **Large data structures** — wrapping a deeply nested object with `ref` makes every property reactive, which is expensive. If you only ever replace the entire object (not mutate it), `shallowRef` avoids the cost.
2. **External/immutable data** — data from an API response that you won't mutate in place.
3. **Non-reactive objects** — objects that are not meant to be reactive but are stored for reference (e.g., a canvas context or a class instance). Use alongside `markRaw` for those.

```js
// Expensive — creates deep proxy for a 10,000-item dataset
const data = ref(largeDataset);

// Better — only the .value swap is tracked
const data = shallowRef(largeDataset);
data.value = newDataset; // triggers a re-render
```

`triggerRef(shallowRef)` forces an update even when mutating the inner object directly.

## 🧠 Question 90

**ID**: vue-090  
**Title**: What are multi-root components (fragments) in Vue 3?  
**Difficulty**: Easy  
**Category**: Components

### Answer 📄

In Vue 3, a component template can have multiple root elements — a feature called **fragments**. Vue 2 required a single root element.

```vue
<!-- Valid in Vue 3 -->
<template>
  <header>Header</header>
  <main>Content</main>
  <footer>Footer</footer>
</template>
```

**Important implication for attribute inheritance**: with multiple root elements, Vue cannot determine which element should receive inherited attributes (class, style, event listeners). Therefore attribute inheritance is **disabled by default** for multi-root components, and you must explicitly apply `$attrs` using `v-bind="$attrs"` on the intended element.

```vue
<script setup>
import { useAttrs } from 'vue';
const attrs = useAttrs();
</script>

<template>
  <header v-bind="attrs">...</header>
  <main>...</main>
</template>
```

Fragments reduce unnecessary wrapper `<div>` elements that were previously added solely to satisfy Vue 2's single-root requirement, resulting in cleaner markup.

## 🧠 Question 91

**ID**: vue-091  
**Title**: What is `app.config.errorHandler` and how do you use it for global error handling?  
**Difficulty**: Medium  
**Category**: Advanced Patterns

### Answer 📄

`app.config.errorHandler` registers a global handler that catches errors thrown during component rendering, lifecycle hooks, and event handlers that are not caught by local `onErrorCaptured` hooks.

It receives three arguments: the error, the component instance, and a string describing where the error occurred.

```js
// main.js
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.config.errorHandler = (error, instance, info) => {
  // info is a string like 'setup function', 'v-on handler', etc.
  console.error('Global Vue error:', error);
  console.log('Component:', instance?.$options.name ?? 'unknown');
  console.log('Location:', info);

  // Send to error tracking service
  Sentry.captureException(error, { extra: { info } });
};

app.mount('#app');
```

**Error propagation order:**

1. `onErrorCaptured` on parent components — can suppress by returning `false`
2. `app.config.errorHandler` — catches anything not suppressed

`app.config.warnHandler` works similarly but for Vue warnings (only active in development).

## 🧠 Question 92

**ID**: vue-092  
**Title**: What is the difference between `v-if` and `v-show` at the DOM level?  
**Difficulty**: Easy  
**Category**: Directives

### Answer 📄

`v-if` and `v-show` both conditionally display elements, but they work differently at the DOM level.

**`v-if`** — completely adds or removes the element from the DOM. When false, the element (and its component) is destroyed. When true, it is created fresh. This means lifecycle hooks (`onMounted`, `onUnmounted`) fire on each toggle.

**`v-show`** — always renders the element in the DOM, but toggles its `display` CSS property. The element is created once and never destroyed. Lifecycle hooks only fire once on initial mount.

```vue
<template>
  <!-- Element is destroyed/created on each toggle -->
  <HeavyComponent v-if="isVisible" />

  <!-- Element stays in DOM, only display:none toggles -->
  <HeavyComponent v-show="isVisible" />
</template>
```

**When to use which:**

- `v-show` is better when the condition toggles frequently and the element is expensive to re-create (e.g., a chart or rich editor).
- `v-if` is better when the element rarely toggles or when you want to avoid mounting the component entirely until needed (lazy initialization). Also use `v-if` when the element contains resources that should not exist in the DOM (e.g., media players or subscriptions).

**`v-if` has higher toggle cost; `v-show` has higher initial render cost.**

## 🧠 Question 93

**ID**: vue-093  
**Title**: How does Vue's virtual DOM diffing (patching) algorithm work?  
**Difficulty**: Hard  
**Category**: Rendering & Internals

### Answer 📄

Vue's patch algorithm compares two vnode trees and produces the minimal set of DOM operations needed to update the real DOM.

**Key strategies:**

1. **Same-level comparison only** — Vue never compares nodes across different levels. If a node's type changes (e.g., `<div>` → `<span>`), the old subtree is destroyed and a new one created.

2. **Keyed lists** — when reconciling children with `key` attributes, Vue builds a key-to-index map and uses the **longest increasing subsequence (LIS)** algorithm to determine the minimum moves needed to reorder DOM nodes.

3. **Patch flags (compiler optimization)** — the Vue template compiler annotates vnodes with bitwise patch flags indicating exactly what is dynamic (text content, class, style, props, etc.). The runtime uses these flags to skip static checks entirely.

```js
// Compiler output for <div class="static" :title="title">{{ msg }}</div>
createElementVNode(
  'div',
  { class: 'static', title: title },
  msg,
  PatchFlags.CLASS | PatchFlags.TEXT, // only check class and text
);
```

4. **Block tree** — the compiler groups dynamic nodes into "blocks". During patching, Vue only walks the flat list of dynamic nodes within a block, skipping all static structure.

The result is that Vue's runtime patch is much faster than a naive tree diff because the compiler has already done the heavy lifting at build time.

## 🧠 Question 94

**ID**: vue-094  
**Title**: What is the `Options API` vs `Composition API` and when should you choose each?  
**Difficulty**: Easy  
**Category**: Vue Basics

### Answer 📄

Vue 3 supports two ways of writing component logic.

**Options API** organizes code by option type — `data`, `computed`, `methods`, `watch`, `lifecycle hooks`. It is approachable for beginners and aligns with Vue 2.

```js
export default {
  data() {
    return { count: 0 };
  },
  computed: {
    double() {
      return this.count * 2;
    },
  },
  methods: {
    increment() {
      this.count++;
    },
  },
};
```

**Composition API** organizes code by logical concern. Related logic (state, computed, watchers) for one feature lives together rather than being split across options.

```vue
<script setup>
import { ref, computed } from 'vue';

const count = ref(0);
const double = computed(() => count.value * 2);
function increment() {
  count.value++;
}
</script>
```

**When to choose:**

|                  | Options API                 | Composition API            |
| ---------------- | --------------------------- | -------------------------- |
| New to Vue       | More approachable           | Steeper learning curve     |
| Large components | Code spread across sections | Logic grouped by feature   |
| Logic reuse      | Mixins (problematic)        | Composables (clean)        |
| TypeScript       | More inference issues       | Excellent type inference   |
| Team familiarity | Vue 2 teams                 | Preferred for new projects |

Both APIs are fully supported in Vue 3 and can be mixed within the same project.

## 🧠 Question 95

**ID**: vue-095  
**Title**: How do you implement route-level code splitting with dynamic imports in Vue Router?  
**Difficulty**: Medium  
**Category**: Routing

### Answer 📄

Route-level code splitting delays loading a route's component bundle until the user navigates to that route, reducing the initial JavaScript payload.

Use a dynamic `import()` function as the component value in the route definition:

```js
const router = createRouter({
  routes: [
    {
      path: '/',
      component: () => import('./views/HomeView.vue'),
    },
    {
      path: '/dashboard',
      component: () => import('./views/DashboardView.vue'),
    },
    {
      path: '/admin',
      // Webpack/Vite magic comment to name the chunk
      component: () =>
        import(/* webpackChunkName: "admin" */ './views/AdminView.vue'),
    },
  ],
});
```

Vite and Webpack both understand dynamic `import()` and produce separate JavaScript chunks for each route automatically.

**Grouping related routes into one chunk:**

```js
// In Vite — use the same rollupOptions chunk
component: () => import('./views/admin/Dashboard.vue'),
component: () => import('./views/admin/Users.vue'),
// Use vite.config.js rollupOptions.output.manualChunks to group
```

**Prefetching** — add `/* @vite-prefetch */` or configure `prefetch` in the router to proactively load chunks for likely-next routes.

## 🧠 Question 96

**ID**: vue-096  
**Title**: What is a computed setter in Vue and when would you use one?  
**Difficulty**: Medium  
**Category**: Reactivity System

### Answer 📄

Computed properties are read-only by default. A computed setter is a writable computed that updates underlying reactive state when assigned.

```vue
<script setup>
import { ref, computed } from 'vue';

const firstName = ref('Alice');
const lastName = ref('Smith');

const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`;
  },
  set(newValue) {
    const parts = newValue.split(' ');
    firstName.value = parts[0];
    lastName.value = parts[1] ?? '';
  },
});
</script>
```

Now `fullName.value = 'Bob Jones'` will update both `firstName` and `lastName`.

**Common use cases:**

- Two-way binding for a value derived from multiple sources
- Building a local writable computed for a prop using `v-model` without emitting directly

```js
// Writable computed for a prop (common pattern)
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
```

## 🧠 Question 97

**ID**: vue-097  
**Title**: How does `<KeepAlive>` work and what lifecycle hooks does it add?  
**Difficulty**: Medium  
**Category**: Performance

### Answer 📄

`<KeepAlive>` caches inactive component instances instead of destroying them when they are toggled out of the DOM. This preserves component state and avoids expensive re-initialization.

```vue
<template>
  <KeepAlive>
    <component :is="activeTab" />
  </KeepAlive>
</template>
```

**Additional lifecycle hooks** — components inside `<KeepAlive>` gain two hooks:

- `onActivated` — fires when the component is inserted into the DOM from the cache (equivalent of `onMounted` for cached components)
- `onDeactivated` — fires when the component is removed and placed in the cache (equivalent of `onUnmounted`)

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue';

onActivated(() => {
  console.log('Component activated (came from cache)');
  startPolling();
});

onDeactivated(() => {
  console.log('Component deactivated (went to cache)');
  stopPolling();
});
</script>
```

**Fine-grained control:**

- `include` — only cache components with matching names
- `exclude` — exclude specific components
- `max` — LRU cache limit, evicts least recently used

```vue
<KeepAlive :include="['TabA', 'TabB']" :max="5">
  <component :is="currentTab" />
</KeepAlive>
```

## 🧠 Question 98

**ID**: vue-098  
**Title**: What is `onServerPrefetch` and how is it used in Vue SSR?  
**Difficulty**: Hard  
**Category**: SSR / Hydration

### Answer 📄

`onServerPrefetch` is a lifecycle hook that only runs on the server during SSR. It tells Vue to wait for its async callback to resolve before serializing the component's HTML, ensuring that async data fetched inside it is available on first render.

```vue
<script setup>
import { ref, onServerPrefetch } from 'vue';
import { useStore } from './store';

const store = useStore();
const posts = ref([]);

onServerPrefetch(async () => {
  posts.value = await fetchPosts(); // runs on server, blocks HTML generation
});
</script>

<template>
  <ul>
    <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
  </ul>
</template>
```

On the client, `onServerPrefetch` is ignored. The client receives the server-rendered HTML with data already populated and hydrates it without re-fetching.

This is the Vue primitive behind Nuxt 3's `useAsyncData` and `useFetch` composables, which abstract the pattern with automatic serialization of fetched state into the HTML payload (via `<script type="application/json">` or similar) so the client never re-fetches.

## 🧠 Question 99

**ID**: vue-099  
**Title**: How do you test Vue components with Vue Test Utils?  
**Difficulty**: Medium  
**Category**: Advanced Patterns

### Answer 📄

Vue Test Utils (`@vue/test-utils`) is the official testing library for Vue components. It integrates with Vitest or Jest.

**Basic mounting:**

```js
import { mount } from '@vue/test-utils';
import MyButton from './MyButton.vue';

test('renders slot content', () => {
  const wrapper = mount(MyButton, {
    slots: { default: 'Click me' },
  });
  expect(wrapper.text()).toBe('Click me');
});
```

**Triggering events and testing reactive updates:**

```js
test('increments count on click', async () => {
  const wrapper = mount(Counter);
  expect(wrapper.find('.count').text()).toBe('0');

  await wrapper.find('button').trigger('click');

  expect(wrapper.find('.count').text()).toBe('1');
});
```

**Stubbing child components:**

```js
const wrapper = mount(ParentComponent, {
  global: {
    stubs: { ChildComponent: true },
  },
});
```

**Testing props and emits:**

```js
const wrapper = mount(MyInput, {
  props: { modelValue: 'hello' },
});
await wrapper.find('input').setValue('world');
expect(wrapper.emitted('update:modelValue')).toEqual([['world']]);
```

Use `flushPromises()` from `@vue/test-utils` to wait for async operations before asserting.

## 🧠 Question 100

**ID**: vue-100  
**Title**: What strategies can you use to optimize a Vue application's performance?  
**Difficulty**: Hard  
**Category**: Performance

### Answer 📄

Vue applications can suffer from unnecessary re-renders, large bundle sizes, and slow initial loads. A systematic approach covers several layers.

**Reducing re-renders:**

- Use `v-memo` to skip re-rendering a subtree unless specific dependencies change
- Wrap expensive child components in `shallowRef` so parent re-renders don't propagate
- Use `markRaw` for non-reactive objects stored in reactive state
- `<KeepAlive>` to preserve component state across route changes

**Bundle size:**

- Route-level code splitting with dynamic `import()`
- Async components (`defineAsyncComponent`) for heavy components
- Tree-shake unused Vue features using the ESM build

**Rendering:**

- `v-show` instead of `v-if` for frequently toggling components
- Use `key` attribute correctly to help the differ reuse DOM nodes
- Avoid binding large objects as props when only a few properties are needed
- `v-once` for static content that never changes
- `v-memo` for list items with stable dependencies

**List virtualization** — for very long lists (1000+ items), use `vue-virtual-scroller` or a similar library to only render the visible items.

**Profiling:**

- Use Vue DevTools Performance tab to identify slow component renders
- Chrome Performance tab for long tasks and layout thrashing
- `app.config.performance = true` enables Vue internal timing marks in the browser DevTools

```vue
<template>
  <!-- v-memo: only re-render list item when item.id or selected changes -->
  <div
    v-for="item in list"
    :key="item.id"
    v-memo="[item.id, selected === item.id]"
  >
    {{ item.text }}
  </div>
</template>
```

## 🧠 Question 101

**ID**: vue-101  
**Title**: What is the `defineModel` macro and how does it simplify two-way binding?  
**Difficulty**: Medium  
**Category**: Composition API

### Answer 📄

`defineModel` (stable in Vue 3.4) is a compiler macro that replaces the boilerplate of manually declaring a `modelValue` prop and an `update:modelValue` emit for component `v-model`.

**Before `defineModel`:**

```vue
<script setup>
const props = defineProps({ modelValue: String });
const emit = defineEmits(['update:modelValue']);

function handleInput(e) {
  emit('update:modelValue', e.target.value);
}
</script>
<template>
  <input :value="props.modelValue" @input="handleInput" />
</template>
```

**With `defineModel`:**

```vue
<script setup>
const model = defineModel(); // returns a writable ref
</script>
<template>
  <input v-model="model" />
</template>
```

`defineModel()` returns a writable `ref` that is synced with the parent's bound value. Reading `model.value` reads the prop; writing to `model.value` emits the update event automatically.

**Named and typed models:**

```ts
// Named model — used with v-model:title
const title = defineModel<string>('title', { required: true });

// With default
const count = defineModel<number>('count', { default: 0 });
```

The parent uses these as:

```vue
<MyForm v-model:title="postTitle" v-model:count="itemCount" />
```

## 🧠 Question 102

**ID**: vue-102  
**Title**: How do multiple `v-model` bindings work on a single component?  
**Difficulty**: Medium  
**Category**: Components

### Answer 📄

Vue 3 allows multiple `v-model` bindings on the same component using named models. Each named `v-model` corresponds to a separate prop/emit pair (or a `defineModel` call).

```vue
<!-- Parent -->
<UserForm
  v-model:firstName="user.firstName"
  v-model:lastName="user.lastName"
  v-model:age="user.age"
/>
```

Using `defineModel` (Vue 3.4+):

```vue
<!-- UserForm.vue -->
<script setup>
const firstName = defineModel < string > 'firstName';
const lastName = defineModel < string > 'lastName';
const age = defineModel < number > 'age';
</script>

<template>
  <input v-model="firstName" placeholder="First name" />
  <input v-model="lastName" placeholder="Last name" />
  <input v-model.number="age" type="number" placeholder="Age" />
</template>
```

Without `defineModel`, each named model requires a separate prop and emit:

```ts
defineProps({ firstName: String, lastName: String, age: Number });
const emit = defineEmits(['update:firstName', 'update:lastName', 'update:age']);
```

Named `v-model` is ideal for form components, dialogs, and editors where a single component manages several related pieces of state that the parent needs to own.

## 🧠 Question 103

**ID**: vue-103  
**Title**: What is `customRef` and when would you use it?  
**Difficulty**: Hard  
**Category**: Reactivity System

### Answer 📄

`customRef` lets you create a reactive `ref` with full manual control over when dependency tracking happens (`track`) and when subscribers are notified (`trigger`). This is useful when you need to debounce, throttle, or validate before notifying watchers.

```js
import { customRef } from 'vue';

function useDebouncedRef(value, delay = 300) {
  let timeout;
  return customRef((track, trigger) => ({
    get() {
      track(); // register the current effect as a subscriber
      return value;
    },
    set(newValue) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        value = newValue;
        trigger(); // notify subscribers only after the debounce delay
      }, delay);
    },
  }));
}
```

```vue
<script setup>
const searchQuery = useDebouncedRef('', 400);
</script>

<template>
  <input v-model="searchQuery" placeholder="Search..." />
</template>
```

The template and watchers dependent on `searchQuery` will only update 400ms after the user stops typing, preventing excessive API calls.

Other use cases include:

- Syncing a ref with `localStorage` and only triggering on settled writes
- Clamping or rounding values on set
- Async validation before committing

## 🧠 Question 104

**ID**: vue-104  
**Title**: What is CSS `v-bind` in `<style>` blocks and how does it work?  
**Difficulty**: Medium  
**Category**: Vue Basics

### Answer 📄

Vue SFCs support binding reactive JavaScript values directly into CSS using `v-bind()` inside `<style>` blocks. This eliminates the need for inline styles or computed class objects for dynamic styling.

```vue
<script setup>
import { ref } from 'vue';

const color = ref('#42b883');
const fontSize = ref(16);
</script>

<template>
  <p class="text">Hello Vue!</p>
</template>

<style scoped>
.text {
  color: v-bind(color);
  font-size: v-bind(fontSize + 'px');
}
</style>
```

**How it works internally:** Vue uses CSS custom properties (CSS variables) under the hood. At compile time, the `v-bind()` expression is replaced with a `var(--hash-propertyName)` reference. A runtime effect updates the custom property on the component's root element whenever the reactive value changes.

This means the CSS stays declarative and scoped, while the dynamic values stay reactive. Complex expressions using object property access work too:

```vue
<script setup>
const theme = reactive({ primary: '#ff0000', radius: '8px' });
</script>

<style scoped>
.card {
  color: v-bind('theme.primary');
  border-radius: v-bind('theme.radius');
}
</style>
```

## 🧠 Question 105

**ID**: vue-105  
**Title**: What are CSS Modules in Vue SFCs?  
**Difficulty**: Medium  
**Category**: Vue Basics

### Answer 📄

CSS Modules are a CSS scoping mechanism where class names are automatically converted to unique hashed identifiers at build time, preventing global naming collisions. In Vue SFCs, add the `module` attribute to a `<style>` tag.

```vue
<template>
  <!-- $style is automatically injected in <script setup> components -->
  <div :class="$style.container">
    <p :class="[$style.text, $style.highlighted]">Hello</p>
  </div>
</template>

<style module>
.container {
  padding: 1rem;
}
.text {
  font-size: 1rem;
}
.highlighted {
  color: #42b883;
  font-weight: bold;
}
</style>
```

The generated HTML will use a hashed class like `container_3FI8Av` instead of plain `container`.

**Named CSS Modules** — multiple `<style module="name">` blocks can coexist in one SFC:

```vue
<style module="typography">
.heading {
  font-size: 2rem;
}
</style>
```

```js
// Access via useCssModule inside setup
import { useCssModule } from 'vue';
const typography = useCssModule('typography');
```

CSS Modules differ from scoped styles:

- **Scoped styles** add a `data-v-xx` attribute selector — styles still use the original class name but are made specific.
- **CSS Modules** rename the class itself — no attribute selector needed, zero specificity overhead.

## 🧠 Question 106

**ID**: vue-106  
**Title**: How does Vue's scoped CSS work internally?  
**Difficulty**: Hard  
**Category**: Rendering & Internals

### Answer 📄

When a `<style scoped>` block is present in a Vue SFC, the compiler adds a unique `data-v-xx` attribute to every element in the component's template at compile time.

The CSS selectors are then transformed to include an attribute selector targeting that unique attribute, ensuring the styles only apply to the component's own elements.

**Template compilation:**

```html
<!-- Source template -->
<div class="card"><p>Hello</p></div>

<!-- Compiled output -->
<div class="card" data-v-7ba5bd90><p data-v-7ba5bd90>Hello</p></div>
```

**CSS transformation:**

```css
/* Source */
.card {
  background: white;
}
p {
  color: black;
}

/* Compiled */
.card[data-v-7ba5bd90] {
  background: white;
}
p[data-v-7ba5bd90] {
  color: black;
}
```

**`:deep()`** removes the attribute selector from the descendant part, allowing styles to pierce into child component DOM:

```css
/* Targets .inner inside a child component */
:deep(.inner) {
  color: red;
}
/* Compiles to: */
[data-v-7ba5bd90] .inner {
  color: red;
}
```

**`:slotted()`** targets elements passed in via slots (which carry the parent's scope attribute, not the child's):

```css
:slotted(p) {
  font-style: italic;
}
```

**`:global()`** escapes scoping entirely and emits the selector without any attribute restriction.

## 🧠 Question 107

**ID**: vue-107  
**Title**: What is the `v-memo` directive and how does it optimize rendering?  
**Difficulty**: Hard  
**Category**: Performance

### Answer 📄

`v-memo` is a built-in directive that memoizes a template subtree. Vue skips re-rendering (and diffing) the subtree entirely when all values in the dependency array remain the same — using reference equality (`===`).

```vue
<template>
  <div v-for="item in list" :key="item.id" v-memo="[item.id, item.selected]">
    <!-- This entire subtree is skipped if item.id and item.selected haven't changed -->
    <span>{{ item.label }}</span>
    <HeavyChart :data="item.chartData" />
  </div>
</template>
```

**How it differs from `computed`:** `computed` memoizes a value; `v-memo` memoizes a DOM subtree — it skips vnode creation and patching for the whole block.

**Use cases:**

- Large lists where only a few items change per update
- Items that hold expensive child components but rarely update

**Empty dependency array** is equivalent to `v-once` — renders once and never updates:

```html
<StaticBanner v-memo="[]" />
```

**Important caveats:**

- Only use when profiling confirms a bottleneck — it adds comparison overhead on every render cycle.
- Avoid if every item changes on every update — the comparison cost outweighs the benefit.
- The subtree still participates in the initial render; only subsequent re-renders are skipped.

## 🧠 Question 108

**ID**: vue-108  
**Title**: What options does `defineAsyncComponent` support for loading, error, and timeout states?  
**Difficulty**: Medium  
**Category**: Components

### Answer 📄

`defineAsyncComponent` accepts either a loader function (simple form) or an options object (advanced form) that configures loading state, error fallback, delays, and timeouts.

```js
import { defineAsyncComponent } from 'vue';

const AsyncDashboard = defineAsyncComponent({
  // Required: the component loader
  loader: () => import('./Dashboard.vue'),

  // Component shown while loading
  loadingComponent: LoadingSpinner,

  // Delay before showing the loading component (default: 200ms)
  // Prevents flicker for fast loads
  delay: 200,

  // Component shown if loading fails
  errorComponent: ErrorDisplay,

  // Time after which loading is considered failed
  timeout: 5000,

  // Called when the loader promise rejects
  onError(error, retry, fail, attempts) {
    if (attempts <= 3) {
      retry(); // retry the load
    } else {
      fail(); // give up and show errorComponent
    }
  },
});
```

The `delay` option is important for UX: if the component loads in under 200ms, the loading spinner is never shown, preventing a brief flash of loading state.

`onError` receives a `retry` function that re-invokes the loader, making it possible to implement exponential backoff or conditional retries.

When used inside `<Suspense>`, the loading/error component props are ignored — `<Suspense>` takes control of the loading UI through its `#fallback` slot.

## 🧠 Question 109

**ID**: vue-109  
**Title**: What are all the lifecycle hooks available in a custom Vue directive?  
**Difficulty**: Medium  
**Category**: Directives

### Answer 📄

Custom directives in Vue 3 have access to seven lifecycle hooks that mirror the component lifecycle, letting the directive react at each stage of the element's life.

```js
const myDirective = {
  // Called once before the element is inserted into the DOM
  created(el, binding, vnode) {},

  // Called right before the element is inserted into the DOM
  beforeMount(el, binding, vnode) {},

  // Called after the element and all its children are mounted
  mounted(el, binding, vnode) {},

  // Called before the parent component re-renders
  beforeUpdate(el, binding, vnode, prevVnode) {},

  // Called after the parent component and its children re-render
  updated(el, binding, vnode, prevVnode) {},

  // Called before the parent component is unmounted
  beforeUnmount(el, binding, vnode) {},

  // Called after the parent component is unmounted — do cleanup here
  unmounted(el, binding, vnode) {},
};
```

The `binding` object contains:

- `value` — the current directive value (`v-my-dir="42"` → `42`)
- `oldValue` — previous value (only in `beforeUpdate` / `updated`)
- `arg` — argument (`v-my-dir:color` → `'color'`)
- `modifiers` — modifier object (`v-my-dir.trim` → `{ trim: true }`)
- `instance` — the component instance using the directive

**Shorthand** — if the directive only needs `mounted` and `updated`, pass a function directly:

```js
app.directive('focus', (el) => {
  el.focus();
});
```

## 🧠 Question 110

**ID**: vue-110  
**Title**: How do you use Pinia's `$patch`, `$subscribe`, and `$onAction`?  
**Difficulty**: Medium  
**Category**: State Management

### Answer 📄

These three methods on a Pinia store instance provide advanced state management capabilities.

**`$patch`** — applies multiple state changes in a single batch, triggering only one update:

```js
const store = useCounterStore();

// Object patch — merges the object into state
store.$patch({ count: 10, name: 'Alice' });

// Function patch — gives full access to state for complex mutations
store.$patch((state) => {
  state.items.push({ id: Date.now(), text: 'new item' });
  state.count++;
});
```

**`$subscribe`** — watches for any state change, similar to Vuex subscribe:

```js
store.$subscribe(
  (mutation, state) => {
    // mutation.type: 'direct' | 'patch object' | 'patch function'
    // Persist to localStorage on every change
    localStorage.setItem('counter', JSON.stringify(state));
  },
  { detached: true },
); // detached: survives component unmount
```

**`$onAction`** — intercepts actions before and after they run, useful for logging or error handling:

```js
store.$onAction(({ name, args, after, onError }) => {
  console.log(`Action "${name}" called with`, args);

  after((result) => {
    console.log(`Action "${name}" finished with`, result);
  });

  onError((error) => {
    console.error(`Action "${name}" failed:`, error);
  });
});
```

## 🧠 Question 111

**ID**: vue-111  
**Title**: How can Pinia stores use other stores (store composition)?  
**Difficulty**: Medium  
**Category**: State Management

### Answer 📄

Pinia stores can freely import and use other stores inside their actions and getters. There is no module nesting — each store is independent and composable.

```js
// userStore.js
export const useUserStore = defineStore('user', {
  state: () => ({ name: '', role: 'guest' }),
});
```

```js
// cartStore.js
export const useCartStore = defineStore('cart', {
  state: () => ({ items: [] }),

  getters: {
    checkoutLabel: () => {
      const user = useUserStore();
      return user.role === 'vip' ? 'Checkout (VIP)' : 'Checkout';
    },
  },

  actions: {
    async checkout() {
      const user = useUserStore();
      if (!user.name) throw new Error('Must be logged in');
      // ...process checkout
    },
  },
});
```

**With setup stores:**

```js
export const useCartStore = defineStore('cart', () => {
  const user = useUserStore(); // reactive — reacts to user store changes
  const items = ref([]);

  const checkoutLabel = computed(() =>
    user.role === 'vip' ? 'Checkout (VIP)' : 'Checkout',
  );

  return { items, checkoutLabel };
});
```

**Important:** do not call `useOtherStore()` at the module's top level outside a store definition — Pinia must be active (mounted) before stores can be accessed.

## 🧠 Question 112

**ID**: vue-112  
**Title**: What are `isRef`, `isReactive`, `unref`, and `toValue` and when do you use them?  
**Difficulty**: Medium  
**Category**: Reactivity System

### Answer 📄

These are reactivity utility functions used primarily when writing composables or libraries that need to handle both ref and non-ref inputs.

**`isRef(val)`** — returns `true` if `val` is a `ref` or computed ref:

```js
isRef(ref(0)); // true
isRef(0); // false
```

**`isReactive(val)`** — returns `true` if `val` is a reactive proxy:

```js
isReactive(reactive({ x: 1 })); // true
isReactive({}); // false
```

**`unref(val)`** — if `val` is a ref, returns `val.value`; otherwise returns `val` as-is. Useful for writing functions that accept both refs and plain values:

```js
function double(n) {
  return unref(n) * 2; // works with ref(3) or plain 3
}
```

**`toValue(val)`** (Vue 3.3+) — extends `unref` to also call getter functions. Preferred in composables that accept `MaybeRefOrGetter<T>`:

```js
function useFeature(input) {
  // input can be a ref, a getter function, or a plain value
  watchEffect(() => {
    console.log(toValue(input));
  });
}

useFeature(ref(42)); // works
useFeature(() => props.value); // works — calls the getter
useFeature(42); // works — returns plain value
```

`toValue` is the recommended way to handle flexible reactive inputs in composables because it covers all three cases: plain value, ref, and computed/getter.

## 🧠 Question 113

**ID**: vue-113  
**Title**: What are Vue Router route meta fields and how are they used?  
**Difficulty**: Medium  
**Category**: Routing

### Answer 📄

Route meta fields are arbitrary key-value pairs attached to a route via the `meta` property. They are available on `route.meta` inside components and navigation guards, making them a clean way to attach per-route metadata without overloading the route path or component.

**Common uses:** authentication requirements, page titles, layout types, breadcrumbs.

```js
const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      title: 'Dashboard',
      layout: 'admin',
    },
  },
  {
    path: '/login',
    component: Login,
    meta: { requiresAuth: false, title: 'Sign In' },
  },
];
```

**Using meta in a global navigation guard:**

```js
router.beforeEach((to, from) => {
  document.title = to.meta.title ?? 'My App';

  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { path: '/login', query: { redirect: to.fullPath } };
  }
});
```

**TypeScript** — augment the `RouteMeta` interface for type safety:

```ts
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean;
    title?: string;
    layout?: 'default' | 'admin' | 'minimal';
  }
}
```

Child routes inherit parent `meta` fields through `route.matched` — use `to.matched.some(r => r.meta.requiresAuth)` to check any ancestor in the matched chain.

## 🧠 Question 114

**ID**: vue-114  
**Title**: How do you control scroll behavior in Vue Router?  
**Difficulty**: Medium  
**Category**: Routing

### Answer 📄

Vue Router accepts a `scrollBehavior` function in `createRouter` that controls where the page scrolls after each navigation.

```js
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 1. Restore browser's native scroll position on back/forward
    if (savedPosition) {
      return savedPosition;
    }

    // 2. Scroll to anchor hash
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }

    // 3. Scroll to top for all other navigations
    return { top: 0, left: 0, behavior: 'smooth' };
  },
});
```

**Delayed scroll** — useful when waiting for a route transition animation to finish:

```js
scrollBehavior(to, from, savedPosition) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ top: 0, behavior: 'smooth' });
    }, 400);
  });
}
```

The return value can be:

- `{ top, left }` — absolute scroll position
- `{ el, top, left }` — scroll relative to a DOM element or CSS selector
- `savedPosition` — restores the browser's native history scroll
- `false` — no scroll
- A `Promise` resolving to any of the above

## 🧠 Question 115

**ID**: vue-115  
**Title**: What is SSR streaming in Vue and how does it improve performance?  
**Difficulty**: Hard  
**Category**: SSR / Hydration

### Answer 📄

Traditional Vue SSR renders the entire component tree to a string before sending anything to the browser. Streaming SSR uses Node.js streams (or Web Streams) to send HTML incrementally as each part of the component tree finishes rendering.

```js
// Node.js — using renderToNodeStream
import { createSSRApp } from 'vue';
import { renderToNodeStream } from 'vue/server-renderer';
import App from './App.vue';

app.get('/', (req, res) => {
  const vueApp = createSSRApp(App);
  const stream = renderToNodeStream(vueApp);

  res.write('<html><body><div id="app">');
  stream.pipe(res, { end: false });
  stream.on('end', () => res.end('</div></body></html>'));
});
```

**Web Streams API** (edge runtimes — Cloudflare Workers, Deno):

```js
import { renderToWebStream } from 'vue/server-renderer';

const stream = renderToWebStream(createSSRApp(App));
return new Response(stream, {
  headers: { 'Content-Type': 'text/html' },
});
```

**Benefits of streaming:**

- **Time To First Byte (TTFB)** is dramatically reduced — the browser receives and starts parsing HTML immediately.
- The browser can begin downloading CSS and JS while the server is still rendering.
- Large pages with slow async data don't block the entire response.

**`<Suspense>` + streaming** — Vue can stream HTML up to a `<Suspense>` boundary, flush a loading state, then stream the resolved content when the async data is ready. Nuxt 3 uses this with `useAsyncData` to implement async page data fetching without blocking streaming.

## 🧠 Question 116

**ID**: vue-116  
**Title**: What is `defineCustomElement` and how does Vue support Web Components?  
**Difficulty**: Hard  
**Category**: Advanced Patterns

### Answer 📄

`defineCustomElement` converts a Vue component definition into a native Custom Element (Web Component) class that can be registered with `customElements.define` and used in any HTML page or non-Vue framework.

```js
import { defineCustomElement } from 'vue';

const MyButtonElement = defineCustomElement({
  props: { label: String },
  emits: ['click'],
  template: `<button @click="$emit('click')">{{ label }}</button>`,
  styles: [`.btn { color: var(--brand) }`], // injected into Shadow DOM
});

customElements.define('my-button', MyButtonElement);
```

```html
<!-- Used as a standard HTML custom element anywhere -->
<my-button label="Click me"></my-button>
```

**With SFCs** — use the `.ce.vue` naming convention (Vite detects it and switches to custom element mode):

```js
import MyButton from './MyButton.ce.vue';
const MyButtonElement = defineCustomElement(MyButton);
customElements.define('my-button', MyButtonElement);
```

**Key differences from regular Vue components:**

- Styles are injected into a **Shadow DOM**, providing true CSS encapsulation.
- Props are reflected from HTML attributes (strings auto-cast for declared props).
- Events become native `CustomEvent` instances dispatched on the element.
- Composition API, `inject`/`provide`, and Pinia all work within the shadow tree.

This makes Vue components reusable in non-Vue applications, design systems, or micro-frontend architectures.

## 🧠 Question 117

**ID**: vue-117  
**Title**: What is `getCurrentInstance` and when should you use it?  
**Difficulty**: Hard  
**Category**: Advanced Patterns

### Answer 📄

`getCurrentInstance` returns the internal component instance of the currently executing component during `setup()`. It exposes Vue's internal machinery and is primarily a low-level escape hatch for library authors.

```js
import { getCurrentInstance } from 'vue';

const instance = getCurrentInstance();
// instance.proxy    — the public component proxy (equivalent to `this` in Options API)
// instance.appContext — access to app.config, app.provide, etc.
// instance.emit     — emit events
// instance.props    — resolved props
// instance.slots    — slots object
// instance.uid      — unique numeric ID for this instance
```

**Legitimate use cases:**

- Writing Vue plugins or libraries that need access to the app context
- Accessing the component's `uid` for unique ID generation
- Interoperability with legacy Options API code from within a composable

**When NOT to use it:**

- For accessing props, slots, emits, or attrs — use `defineProps`, `defineEmits`, `useAttrs`, `useSlots` instead
- For programmatic access to child components — use `defineExpose` + template refs
- Outside `setup()` — `getCurrentInstance()` returns `null` outside of setup

```js
// Correct use — library code accessing app-level config
export function useGlobalConfig() {
  const instance = getCurrentInstance();
  if (!instance) throw new Error('Must be called inside setup()');
  return instance.appContext.config.globalProperties;
}
```

Always prefer the public Composition API. `getCurrentInstance` accesses internals that may change between Vue versions.

## 🧠 Question 118

**ID**: vue-118  
**Title**: What is `useTemplateRef` and how does it differ from using `ref` for template refs?  
**Difficulty**: Medium  
**Category**: Composition API

### Answer 📄

`useTemplateRef` (introduced in Vue 3.5) is the explicit API for declaring template refs, replacing the implicit name-matching convention.

**Old approach (implicit name matching):**

```vue
<script setup>
import { ref } from 'vue';

// Works because the variable name must match ref="inputEl" exactly
const inputEl = ref(null);
</script>

<template>
  <input ref="inputEl" />
</template>
```

**New approach with `useTemplateRef`:**

```vue
<script setup>
import { useTemplateRef, onMounted } from 'vue';

const inputEl = useTemplateRef('myInput'); // string ties to ref="myInput"

onMounted(() => {
  inputEl.value?.focus();
});
</script>

<template>
  <input ref="myInput" />
</template>
```

**Advantages:**

- The string key documents the binding explicitly — no silent failures from variable renaming.
- TypeScript support: `useTemplateRef<HTMLInputElement>('myInput')` gives a properly typed `Ref<HTMLInputElement | null>`.
- Works with `v-for` — the ref becomes `Ref<Element[]>` when used on a repeated element.

```ts
// Typed template ref
const tableRef = useTemplateRef<HTMLTableElement>('dataTable');
// tableRef.value is HTMLTableElement | null
```

## 🧠 Question 119

**ID**: vue-119  
**Title**: What are Vue 3.5's lazy hydration strategies?  
**Difficulty**: Hard  
**Category**: SSR / Hydration

### Answer 📄

Vue 3.5 introduced built-in lazy hydration strategies via `defineAsyncComponent` that defer client-side hydration of server-rendered components until a specific condition is met, improving Time to Interactive (TTI) for SSR applications.

Four built-in strategies are provided:

**`hydrateOnVisible`** — hydrates when the component enters the viewport (`IntersectionObserver`):

```js
import { defineAsyncComponent, hydrateOnVisible } from 'vue';

const LazyMap = defineAsyncComponent({
  loader: () => import('./HeavyMap.vue'),
  hydrate: hydrateOnVisible({ rootMargin: '200px' }),
});
```

**`hydrateOnIdle`** — hydrates when the browser is idle (`requestIdleCallback`):

```js
import { hydrateOnIdle } from 'vue';
hydrate: hydrateOnIdle(2000); // 2000ms timeout as fallback
```

**`hydrateOnInteraction`** — hydrates on a specific user interaction:

```js
import { hydrateOnInteraction } from 'vue';
hydrate: hydrateOnInteraction(['click', 'focus']);
```

**`hydrateOnMediaQuery`** — hydrates when a CSS media query matches:

```js
import { hydrateOnMediaQuery } from 'vue';
hydrate: hydrateOnMediaQuery('(max-width: 768px)');
```

**How it works:** the server renders full HTML immediately (fast FCP). On the client, hydration (attaching Vue's event listeners and reactivity to the existing DOM) is deferred until the strategy condition triggers. The component appears interactive (it's real HTML) but is not yet "owned" by Vue's runtime. This is the **islands architecture** applied at the framework level — only the parts the user actually needs get hydrated eagerly.

## 🧠 Question 120

**ID**: vue-120  
**Title**: How do you forward slots from a parent component to a deeply nested child?  
**Difficulty**: Hard  
**Category**: Components

### Answer 📄

Slot forwarding is the pattern of passing a parent's slots through an intermediate component to a child, maintaining the slot API at the top level.

**Dynamic slot forwarding** — re-expose all parent slots to a child generically:

```vue
<!-- LayoutWrapper.vue — a transparent wrapper -->
<template>
  <BaseLayout>
    <!-- Forward every slot the parent passed in, including scoped slot data -->
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </BaseLayout>
</template>
```

**How it works:**

- `v-for="(_, name) in $slots"` iterates over all slot names passed to `LayoutWrapper`.
- `#[name]="slotProps"` uses a dynamic slot name to receive scoped slot data from `BaseLayout`.
- `<slot :name="name" v-bind="slotProps" />` re-exposes those slots to `LayoutWrapper`'s consumer.

**Why this matters:**

- UI component library wrappers (e.g., a `<DataTable>` wrapper) need to expose the inner table's slots without re-declaring each one by hand.
- Slot forwarding keeps the public API clean while delegating actual rendering to a base component.

**Named slot forwarding (explicit):**

```vue
<template>
  <BaseDialog>
    <template #header>
      <slot name="header" />
    </template>
    <template #default="{ close }">
      <slot :close="close" />
    </template>
  </BaseDialog>
</template>
```
