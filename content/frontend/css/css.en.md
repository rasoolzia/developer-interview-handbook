---
topic: css
language: en
version: 1.6
---

# CSS Interview Questions

## Available Categories

- Fundamentals
- Layout
- Selectors & Specificity
- Responsive Design
- Performance
- Architecture

## Difficulty Levels

- Easy
- Medium
- Hard

## 🧠 Question 1

**ID**: css-001  
**Title**: What is the CSS box model and what are its components?  
**Difficulty**: Easy  
**Category**: Fundamentals

### Answer 📄

The CSS box model describes how elements are structured and spaced in the layout.

Each element is represented as a rectangular box consisting of:

1. **Content** – The actual text or media
2. **Padding** – Space between content and border
3. **Border** – Surrounds padding and content
4. **Margin** – Space outside the border

By default, `width` and `height` apply only to the content box.

Using:

```css
box-sizing: border-box;
```

Changes the calculation so padding and border are included in the declared width and height.

Understanding the box model is essential for layout control.

## 🧠 Question 2

**ID**: css-002  
**Title**: What is the difference between `block`, `inline`, and `inline-block` display values?  
**Difficulty**: Easy  
**Category**: Layout

### Answer 📄

### `block`

- Takes full width available
- Starts on a new line
- Can set width and height

Examples: `div`, `p`, `section`

### `inline`

- Takes only as much width as content
- Does not start on a new line
- Cannot set width and height

Examples: `span`, `a`, `strong`

### `inline-block`

- Does not start on a new line
- Can set width and height
- Respects padding and margin

Used when elements need inline positioning but block behavior.

Example:

```css
.block-el {
  display: block;
} /* full width, new line */
.inline-el {
  display: inline;
} /* width from content, no w/h */
.inblock-el {
  display: inline-block;
} /* inline flow + w/h settable */
```

## 🧠 Question 3

**ID**: css-003  
**Title**: What is specificity in CSS and how is it calculated?  
**Difficulty**: Medium  
**Category**: Fundamentals

### Answer 📄

Specificity determines which CSS rule is applied when multiple rules target the same element.

Specificity hierarchy:

1.  Inline styles
2.  IDs
3.  Classes, attributes, pseudo-classes
4.  Elements and pseudo-elements

Example:

```css
#main {
  color: red;
}
.container p {
  color: blue;
}
```

The ID selector wins because it has higher specificity.
Specificity is calculated as a four-part value:
Inline → IDs → Classes → Elements
Higher value wins. If equal, the later rule in the stylesheet applies.

## 🧠 Question 4

**ID**: css-004  
**Title**: What is the difference between `position: relative`, `absolute`, `fixed`, and `sticky`?  
**Difficulty**: Medium  
**Category**: Layout

### Answer 📄

### `relative`

- Positioned relative to its normal position
- Remains in document flow

### `absolute`

- Removed from document flow
- Positioned relative to the nearest positioned ancestor

### `fixed`

- Positioned relative to the viewport
- Does not move during scrolling

### `sticky`

- Behaves like `relative` until a threshold
- Then behaves like `fixed` within its container

Positioning controls element layering and layout behavior.

Example:

```css
.parent {
  position: relative;
}

.rel {
  position: relative;
  top: 10px;
} /* shifts from normal pos */
.abs {
  position: absolute;
  top: 0;
  right: 0;
} /* anchors to .parent */
.fix {
  position: fixed;
  bottom: 20px;
  right: 20px;
} /* anchors to viewport */
.stic {
  position: sticky;
  top: 0;
} /* sticks on scroll */
```

## 🧠 Question 5

**ID**: css-005  
**Title**: What is the difference between Flexbox and Grid?  
**Difficulty**: Medium  
**Category**: Layout

### Answer 📄

Flexbox and Grid are layout systems but solve different problems.

### Flexbox

- One-dimensional layout
- Controls layout in a row OR column
- Best for alignment and distribution of items

Used for:

- Navigation bars
- Centering content
- Small component layouts

### Grid

- Two-dimensional layout
- Controls rows AND columns simultaneously
- Designed for full page layouts

Used for:

- Complex page structures
- Responsive grids
- Layout systems

**Flexbox is content-first.**
**Grid is layout-first.**

Example:

```css
/* Flexbox: one axis */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Grid: two axes */
.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
}
```

## 🧠 Question 6

**ID**: css-006  
**Title**: What is the CSS cascade and how does the browser decide which rule to apply?  
**Difficulty**: Medium  
**Category**: Fundamentals

### Answer 📄

The CSS cascade is the algorithm used to determine which style rule applies when multiple rules target the same element.

The browser resolves conflicts in this order:

1. **Origin** (user agent, user styles, author styles)
2. **Importance** (`!important`)
3. **Specificity**
4. **Source order** (last declared wins)

Understanding the cascade is essential for debugging unexpected styling behavior.

## 🧠 Question 7

**ID**: css-007  
**Title**: What is a stacking context and how is it created?  
**Difficulty**: Hard  
**Category**: Layout

### Answer 📄

A stacking context controls how elements are layered along the z-axis.

A new stacking context is created when:

- An element has `position` other than static AND `z-index` is set
- `opacity` is less than 1
- `transform` is applied
- `filter`, `perspective`, `will-change`, etc. are used

Elements inside a stacking context are layered independently of elements outside it.

Understanding stacking context is crucial for solving z-index issues.

Example:

```css
/* Creates a new stacking context */
.modal {
  position: fixed;
  z-index: 100;
  opacity: 0.99; /* also triggers stacking context */
}

/* Children are layered WITHIN .modal's context */
.modal .overlay {
  z-index: 1;
}
.modal .content {
  z-index: 2;
}
/* .content appears above .overlay, but both are contained within .modal */
```

## 🧠 Question 8

**ID**: css-008  
**Title**: What is the difference between `overflow: hidden`, `auto`, and `scroll`?  
**Difficulty**: Medium  
**Category**: Layout

### Answer 📄

The `overflow` property controls what happens when content exceeds its container.

- `hidden` → Content is clipped, no scrollbars
- `auto` → Scrollbars appear only if needed
- `scroll` → Scrollbars always visible

Overflow can also create a new block formatting context (BFC), affecting layout behavior.

## 🧠 Question 9

**ID**: css-009  
**Title**: What is a Block Formatting Context (BFC) and why is it useful?  
**Difficulty**: Hard  
**Category**: Layout

### Answer 📄

A Block Formatting Context (BFC) is a layout mechanism that controls how block elements interact.

A BFC is created when:

- `overflow` is not visible
- `display: flow-root`
- `float` is used
- `position: absolute` or `fixed`

Benefits:

- Prevents margin collapsing
- Contains floating elements
- Creates isolated layout environments

BFC is often used to fix layout bugs involving floats or collapsing margins.

## 🧠 Question 10

**ID**: css-010  
**Title**: What is margin collapsing and when does it occur?  
**Difficulty**: Medium  
**Category**: Layout

### Answer 📄

Margin collapsing occurs when vertical margins of adjacent block elements combine into a single margin.

It happens when:

- Two sibling block elements have vertical margins
- A parent and its first/last child both have vertical margins

The resulting margin equals the larger of the two, not their sum.

Margin collapsing between adjacent siblings does not occur inside flex or grid containers (they establish new formatting contexts).

Example:

```css
/* Sibling collapse: result is 30px, not 50px */
.box-a {
  margin-bottom: 30px;
}
.box-b {
  margin-top: 20px;
}

/* Parent-child collapse: child margin bleeds out */
.parent {
  /* no padding, no border, no BFC */
}
.child {
  margin-top: 40px;
} /* shifts .parent, not .child */

/* Fix: establish BFC to prevent collapse */
.parent {
  overflow: hidden;
}
```

## 🧠 Question 11

**ID**: css-011  
**Title**: What is the difference between `em`, `rem`, `%`, `vh`, and `vw` units?  
**Difficulty**: Medium  
**Category**: Fundamentals

### Answer 📄

CSS provides multiple relative units.

- `em` → Relative to the font-size of the parent
- `rem` → Relative to the root (`html`) font-size
- `%` → Relative to the parent element
- `vh` → 1% of viewport height
- `vw` → 1% of viewport width

Use `rem` for consistent scaling across components.
Use viewport units for responsive layouts.

## 🧠 Question 12

**ID**: css-012  
**Title**: What is the difference between `min-width`, `max-width`, and `width`?  
**Difficulty**: Medium  
**Category**: Layout

### Answer 📄

- `width` sets the base width of an element
- `min-width` defines the minimum allowed width
- `max-width` defines the maximum allowed width

If constraints conflict:

- `min-width` overrides `max-width`
- `min-width` can override `width`

These properties are essential for responsive design.

## 🧠 Question 13

**ID**: css-013  
**Title**: What is the difference between `reflow` (layout) and `repaint` in CSS rendering?  
**Difficulty**: Hard  
**Category**: Performance

### Answer 📄

When styles change, the browser may trigger:

### Reflow (Layout)

- Recalculates element positions and dimensions
- More expensive
- Triggered by changes to layout-affecting properties (width, height, position)

### Repaint

- Updates visual appearance without changing layout
- Less expensive
- Triggered by changes like color or background

Frequent reflows can significantly hurt performance.  
Optimizing CSS includes minimizing layout-triggering changes.  
Modern browsers optimize repaints heavily, but reflows often trigger layout thrashing if overdone in loops.

## 🧠 Question 14

**ID**: css-014  
**Title**: What are CSS Custom Properties (CSS Variables) and what are their advantages?  
**Difficulty**: Medium  
**Category**: Fundamentals

### Answer 📄

CSS Custom Properties allow you to store and reuse values throughout your stylesheet.

Syntax:

```css
:root {
  --primary-color: #3498db;
  --spacing: 16px;
}

.button {
  background: var(--primary-color);
  padding: var(--spacing);
}
```

Advantages:

- Can be changed dynamically with JavaScript
- Inherit through the cascade
- Scoped to elements (unlike preprocessor variables)
- Enable theming and dynamic styling

Unlike Sass/Less variables, CSS variables are evaluated at runtime.

## 🧠 Question 15

**ID**: css-015  
**Title**: What are CSS logical properties and why are they important?  
**Difficulty**: Medium  
**Category**: Responsive Design

### Answer 📄

Logical properties allow layout control based on writing direction rather than physical direction.

Instead of:

```css
margin-left
padding-right
```

Use:

```css
margin-inline-start
padding-inline-end
```

Benefits:

- Better internationalization (RTL/LTR support)
- More adaptable layouts
- Cleaner responsive design

Logical properties make layouts direction-aware.

## 🧠 Question 16

**ID**: css-016  
**Title**: What are CSS cascade layers (`@layer`) and why were they introduced?  
**Difficulty**: Hard  
**Category**: Architecture

### Answer 📄

Cascade layers allow developers to control the cascade order explicitly.

Example:

```css
@layer base, components, utilities;
```

Styles inside layers follow the declared layer order, regardless of specificity.

Benefits:

- Prevents specificity wars
- Better control over large codebases
- Improves CSS architecture

Cascade layers provide structured style prioritization.

## 🧠 Question 17

**ID**: css-017  
**Title**: What are container queries and how do they differ from media queries?  
**Difficulty**: Hard  
**Category**: Responsive Design

### Answer 📄

Media queries respond to the viewport size.

Container queries respond to the size of a parent container.

Example:

```css
@container (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}
```

> **_NOTE:_** The parent must have container-type: inline-size (or size) to enable container queries.

Container queries enable truly component-based responsive design.  
They allow components to adapt based on available space rather than screen size.

## 🧠 Question 18

**ID**: css-018  
**Title**: What is the difference between `:nth-child()` and `:nth-of-type()`?  
**Difficulty**: Medium  
**Category**: Selectors & Specificity

### Answer 📄

`:nth-child(n)` selects an element based on its position among all siblings.

`:nth-of-type(n)` selects an element based on its position among siblings of the same type.

Example:

```css
p:nth-child(2)
p:nth-of-type(2)
```

If the second child is not a `<p>`, `nth-child` will not match it, but `nth-of-type` may.

## 🧠 Question 19

**ID**: css-019  
**Title**: How does `will-change` affect performance and when should it be used?  
**Difficulty**: Hard  
**Category**: Performance

### Answer 📄

The `will-change` property informs the browser about upcoming changes.

Example:

```css
will-change: transform;
```

It allows the browser to optimize rendering (often promoting to GPU layer).

However:

- It consumes memory
- Overuse can degrade performance

Use it sparingly and remove it after the animation completes.  
Avoid applying it globally or to many elements; it can increase memory usage and hurt mobile performance.

## 🧠 Question 20

**ID**: css-020  
**Title**: What is the difference between BEM and utility-first CSS architecture?  
**Difficulty**: Medium  
**Category**: Architecture

### Answer 📄

BEM (Block Element Modifier):

- Structured naming convention
- Component-focused
- Predictable and readable class names

Utility-first (e.g., Tailwind approach):

- Small, single-purpose classes
- Styles applied directly in markup
- Less custom CSS written

BEM emphasizes semantic structure.  
Utility-first emphasizes rapid development and consistency.

Both aim to solve scalability and maintainability issues in large projects.

## 🧠 Question 21

**ID**: css-021  
**Title**: What is CSS subgrid, how does it differ from nested grids, and when should you use it?  
**Difficulty**: Hard  
**Category**: Layout

### Answer 📄

Subgrid allows a grid item to inherit and participate in its parent's grid tracks (rows/columns).

Without subgrid:

- Nested grid creates an independent grid with its own tracks

With subgrid:

```css
.grid-item {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1; /* span full parent tracks */
}
```

Differences:

- Subgrid uses parent's column/row sizes → consistent alignment
- No extra wrapper tracks

Use cases:

- Card layouts where inner content must align perfectly with outer grid
- Forms or tables inside grid items

Browser support: Good in modern browsers (2024+ full).

## 🧠 Question 22

**ID**: css-022  
**Title**: Explain scroll-snap properties and how to create a full-page carousel with pure CSS.  
**Difficulty**: Hard  
**Category**: Layout

### Answer 📄

Scroll snap forces the viewport to "snap" to specific positions after scrolling.

Key properties:

- scroll-snap-type: x mandatory (or y, both, inline, block)
- scroll-snap-align: start / center / end
- scroll-snap-stop: always (forces stop at each snap point)

Full-page carousel example:

```css
.carousel {
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  display: flex;
  scroll-behavior: smooth;
}

.slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
  height: 100vh;
}
```

Benefits: Smooth, native-feeling carousels without JavaScript.  
Pitfalls: User can still scroll freely unless combined with overscroll-behavior.

## 🧠 Question 23

**ID**: css-023  
**Title**: What is the aspect-ratio property, and how does it help prevent Cumulative Layout Shift (CLS)?  
**Difficulty**: Hard  
**Category**: Performance, Responsive Design

### Answer 📄

aspect-ratio enforces a fixed width-to-height ratio on elements (especially images/videos).

```css
img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
```

Benefits for CLS:

- Reserves space before image loads (no jump when content appears)
- Works with width: 100% or max-width
- Better than old padding-bottom hack

Modern best practice:

- Always pair with width/height attributes in HTML for fallback
- Use on placeholders or lazy-loaded media

Improves Core Web Vitals significantly.

## 🧠 Question 24

**ID**: css-024  
**Title**: How do :has() pseudo-class and relational selectors change CSS architecture and component styling?  
**Difficulty**: Hard  
**Category**: Selectors & Specificity

### Answer 📄

:has() allows parent-based styling (previously impossible in pure CSS).

Examples:

```css
/* Style card only if it has a button */
.card:has(.btn) {
  border: 2px solid green;
}

/* Style parent when child is hovered */
.card:has(:hover) {
  transform: scale(1.02);
}

/* Dark mode for section with dark theme */
section:has(.dark-theme) {
  background: #111;
}
```

Impact:

- Enables component-driven styling without extra classes
- Reduces reliance on BEM modifiers or utility classes
- Improves maintainability in large apps

Browser support: Excellent in 2025+ (Chrome 105+, Safari 15.4+, Firefox 121+)

## 🧠 Question 25

**ID**: css-025  
**Title**: What is accent-color and how does it interact with form controls in modern browsers?  
**Difficulty**: Hard  
**Category**: Fundamentals, Accessibility

### Answer 📄

accent-color customizes the color of form controls' accents (checkboxes, radio buttons, range sliders, progress bars).

```css
:root {
  --accent: #6200ea;
}

input[type='checkbox'],
input[type='radio'],
input[type='range'] {
  accent-color: var(--accent);
}
```

Behavior:

- Applies to native UI parts (thumb, checkmark, track)
- Respects system preferences (light/dark mode)
- Fallback: browsers use default accent if not set

Accessibility note:

- Ensure sufficient contrast (WCAG AA)
- Test in multiple browsers (Safari partial support pre-2024)

Use for consistent branding without overriding entire control styles.

## 🧠 Question 26

**ID**: css-026  
**Title**: What is the difference between `vh`, `dvh`, `svh`, and `lvh` viewport units, and why were the new ones introduced?  
**Difficulty**: Hard  
**Category**: Responsive Design

### Answer 📄

Traditional `vh` (viewport height) is based on the large viewport size (lvh), which can cause layout jumps on mobile when the address bar hides/shows.

New units (CSS Values 4):

- `svh` (small viewport height): 1% of the smallest viewport height (when UI bars are fully visible)
- `lvh` (large viewport height): 1% of the largest viewport height (when UI bars are hidden/fullscreen)
- `dvh` (dynamic viewport height): dynamically updates between svh and lvh as UI elements change (recommended for most cases)

`vh` is now equivalent to `lvh` in modern browsers.

Use `dvh` for stable full-height layouts on mobile (e.g., hero sections) to avoid CLS.

## 🧠 Question 27

**ID**: css-027  
**Title**: Explain the differences between `opacity: 0`, `visibility: hidden`, and `display: none` in terms of layout, performance, accessibility, and interactivity.  
**Difficulty**: Hard  
**Category**: Fundamentals

### Answer 📄

These properties hide elements but behave differently:

- `opacity: 0`: Element is invisible but still takes space, remains in flow, interactive (clickable, focusable), and participates in transitions/animations. Screen readers may announce it.
- `visibility: hidden`: Element invisible, takes space, removed from tab order (not focusable/interactive), but still in DOM flow. Creates stacking context if opacity <1 not set.
- `display: none`: Element completely removed from layout (no space taken), not rendered, not interactive, not in accessibility tree (screen readers ignore it). Triggers reflow.

Use `display: none` for conditional content; `visibility: hidden` for space-reserving hides; `opacity: 0` for fade animations.

## 🧠 Question 28

**ID**: css-028  
**Title**: How do margins behave on elements with `display: inline-flex` or `display: inline-grid`, and why do vertical margins not collapse or apply as expected?  
**Difficulty**: Hard  
**Category**: Layout

### Answer 📄

`inline-flex` and `inline-grid` make the element inline-level (participates in inline formatting context) but establish an inner flex/grid formatting context.

Key behaviors:

- Horizontal margins (left/right) apply normally.
- Vertical margins (top/bottom) do not collapse with adjacent elements (like inline elements).
- Vertical margins are respected but do not affect line height or surrounding inline flow in the same way block margins do.
- No vertical margin collapsing occurs between inline-flex items and their siblings.

This is because inline-level boxes don't fully participate in block formatting contexts for vertical spacing. Use `display: flex` (block-level) if vertical margins need to behave like block elements.

## 🧠 Question 29

**ID**: css-029  
**Title**: What is the `color-mix()` function in CSS, and how can it be used for dynamic theming or accessibility?  
**Difficulty**: Hard  
**Category**: Fundamentals

### Answer 📄

`color-mix()` blends two colors in a specified color space (e.g., srgb, lch).

Syntax:

```css
color-mix(in srgb, blue 40%, white)
```

Use cases:

- Dynamic shades/tints (e.g., hover states: color-mix(in srgb, var(--primary) 80%, black))
- Accessibility: Ensure contrast by mixing with background
- Theming: Light/dark mode variants without multiple variables

Browser support: Excellent in 2025+ (Chrome 111+, Safari 16.4+, Firefox 113+). Falls back gracefully.

## 🧠 Question 30

**ID**: css-030  
**Title**: What is `@property` in CSS and how does it enable better custom property animations/transitions?  
**Difficulty**: Hard  
**Category**: Performance, Architecture

### Answer 📄

`@property` registers a custom property so the browser understands its type, allowing smooth interpolation in transitions/animations.

Example:

```css
@property --angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
```

Without registration, transitions on custom props (e.g., --hue) jump discretely. With it, they animate smoothly (e.g., hue rotation).

Use for:

- Conic gradients animation
- Complex color transitions
- Better performance than JS-driven animations

Support: Chrome/Edge 85+, Firefox 128+, Safari 16.4+.

## 🧠 Question 31

**ID**: css-031
**Title**: What is the difference between CSS transitions and CSS animations?
**Difficulty**: Medium
**Category**: Performance

### Answer 📄

Both transitions and animations change CSS property values over time, but they serve different purposes.

**Transitions**

- Triggered by a state change (e.g., `:hover`, class toggle)
- Run once, from a start state to an end state
- Defined with `transition` shorthand

**Animations (`@keyframes`)**

- Run independently (no trigger required)
- Can loop, alternate, and define multiple intermediate steps
- More control over timing and sequence

Example:

```css
/* Transition: hover triggers the change */
.button {
  background: blue;
  transition: background 0.3s ease;
}
.button:hover {
  background: darkblue;
}

/* Animation: runs automatically */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

Use transitions for simple interactive state changes; use animations for complex sequences or looping effects.

## 🧠 Question 32

**ID**: css-032  
**Title**: What is scroll-driven animation in CSS, and how does `animation-timeline: scroll()` work?  
**Difficulty**: Hard  
**Category**: Performance

### Answer 📄

Scroll-driven animations tie CSS animations to scroll position instead of time.

Key properties:

- **animation-timeline**: scroll() or scroll(root block) or named scrollers
- **animation-range**: start/end points

Example concept: Progress bar fills as user scrolls page.

Benefits: Native, GPU-accelerated, no JS overhead.

Support: Chrome/Edge 115+, Firefox partial, Safari 18+ (2025+ full).

## 🧠 Question 33

**ID**: css-033  
**Title**: Explain advanced usage of `object-fit` and `object-position` with `aspect-ratio` for responsive media without CLS.  
**Difficulty**: Hard  
**Category**: Responsive Design

### Answer 📄

`object-fit` controls how replaced elements (img, video) fit their box:

- `cover`: Crops to fill (common for heroes)
- `contain`: Scales to fit without cropping
- `fill`: Stretches (distorts)

Combined with `aspect-ratio`:

- Reserves space before load
- Prevents layout shifts

`object-position`: Aligns content inside box (e.g., top left for portraits).

This combo is essential for modern image handling without JS.

## 🧠 Question 34

**ID**: css-034  
**Title**: What are the differences between physical properties (margin-top) and logical properties (margin-block-start) in depth, including writing-mode and direction impact?  
**Difficulty**: Hard  
**Category**: Responsive Design

### Answer 📄

**Physical**: Fixed directions (top/right/bottom/left) – ignore writing-mode/direction.

**Logical**: Flow-relative (block-start/end, inline-start/end) – adapt to:

- writing-mode: vertical-rl (e.g., Japanese)
- direction: rtl

Use logical for:

- Multilingual sites
- Vertical text layouts
- Consistent padding/margin regardless of flow

Modern best practice: Prefer logical properties for future-proof CSS.

## 🧠 Question 35

**ID**: css-035  
**Title**: How can gap property be used in Flexbox and Grid, and what are browser differences in row-gap/column-gap fallback?  
**Difficulty**: Hard  
**Category**: Layout

### Answer 📄

gap (or `row-gap`/`column-gap`) adds space between items in flex/grid (no need for margins).

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

Browser notes:

- Older Safari/IE: Only `grid-gap` alias worked
- Flexbox gap support: Chrome 84+, Safari 14.1+, Firefox 63+
- In flex, gap works on row/column independently

Gap prevents double-margin issues and simplifies layouts.

### Gap Behavior Difference in Flex vs Grid

**In Flexbox:**

- `gap` adds space between items but doesn't respect `box-sizing`
- If container is `border-box`, gap can cause overflow
- Calculation: `width = content + gap` (gap is outside box-sizing)

**In Grid:**

- `gap` is part of grid track calculations
- Respects `border-box` and doesn't cause overflow
- Calculation: gap is included in available grid space

**Solution for Flexbox:**

```css
.flex-container {
  display: flex;
  gap: 20px;
  /* To prevent overflow */
  box-sizing: border-box;
  padding: 0; /* or account for gap in width calculations */
}
```

This difference is important when working with precise layouts.

## 🧠 Question 36

**ID**: css-036
**Title**: What are CSS pseudo-elements and how do `::before` and `::after` work?
**Difficulty**: Medium
**Category**: Selectors & Specificity

### Answer 📄

Pseudo-elements are keywords that let you style a specific part of an element or inject virtual content without adding markup.

`::before` and `::after` insert generated content before or after an element's actual content.

They require the `content` property to render (even if empty: `content: ""`).

Common uses:

- Decorative icons or symbols
- Clearfix for floats
- Visual separators
- Tooltip arrows

Example:

```css
.badge::before {
  content: '★ ';
  color: gold;
}

.required-field::after {
  content: ' *';
  color: red;
}

/* Clearfix using ::after */
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
```

Pseudo-elements are not part of the DOM — they cannot be selected with JavaScript.

## 🧠 Question 37

**ID**: css-037
**Title**: What are `prefers-color-scheme` and `prefers-reduced-motion` media features and why do they matter?
**Difficulty**: Medium
**Category**: Responsive Design, Accessibility

### Answer 📄

These are CSS media features that respect user system-level preferences.

**`prefers-color-scheme`**

- Detects whether the user prefers a light or dark UI
- Values: `light`, `dark`
- Enables native dark mode support without JavaScript

**`prefers-reduced-motion`**

- Detects whether the user has requested reduced animation/motion (e.g., for vestibular disorders)
- Values: `reduce`, `no-preference`
- Should disable or minimize transitions and animations

Both are essential for accessible, user-respectful design.

Example:

```css
/* Dark mode */
@media (prefers-color-scheme: dark) {
  body {
    background: #121212;
    color: #e0e0e0;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Ignoring these preferences can cause accessibility issues and negative user experience.
