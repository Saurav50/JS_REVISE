# useMemo Hook

`useMemo` is a hook in React that helps optimize performance by memorizing the result of a computation, preventing unnecessary recalculations on every render. It is typically used to memoize expensive calculations or avoid unnecessary re-renders of components that depend on specific values.

In this example, let's break down how `useMemo` is being used and explore its purpose in detail.

### Key Concepts:

1. **Memoization**: Memoization is a technique that stores the result of an expensive function call and returns the cached result when the same inputs occur again. This is especially useful when the computation is slow or expensive.
2. **Referential Equality**: `useMemo` ensures that the memoized value does not change unless its dependencies change. It returns the same reference for the value unless one of its dependencies has changed, which helps prevent unnecessary re-renders of components.

---

### Example Code Breakdown

```jsx

import React, { useState, useMemo } from "react";
import { useEffect } from "react";

const MemoExample = () => {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  // Use useMemo to avoid unnecessary re-computation of slowFunction
  const doubleNumber = useMemo(() => slowFunction(number), [number]);

  // demo of referential equality
  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? "black" : "white",
      color: dark ? "white" : "black",
    };
  }, [dark]);

  useEffect(() => {
    console.log("theme changed");
  }, [themeStyles]);

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value, 10) || 0)}
      />
      <button onClick={() => setDark((prevDark) => !prevDark)}>
        Change Theme
      </button>
      <div style={themeStyles}>{doubleNumber}</div>
    </div>
  );

  function slowFunction(num) {
    console.log("Calling Slow Function");
    for (let i = 0; i <= 1000000000; i++) {} // Simulates a slow calculation
    return num * 2;
  }
};

export default MemoExample;

```

### Detailed Explanation

### 1. **State Variables**:

- `number`: This state holds the number that is being input by the user.
- `dark`: This state toggles the theme between light and dark.

### 2. **Using `useMemo` for `doubleNumber`**:

```
js
Copy code
const doubleNumber = useMemo(() => slowFunction(number), [number]);

```

- **Purpose**: `useMemo` is used to memoize the result of `slowFunction(number)`, which simulates a time-consuming operation.
- **How it works**:
    - `slowFunction(number)` is only called when the `number` state changes. React will **not** call `slowFunction` again if the `number` hasn't changed between renders.
    - If `number` changes, `slowFunction` will be re-executed, and the memoized value will be updated. If `number` stays the same, React will return the previously memoized result.
- **Benefit**: This optimization ensures that `slowFunction` is not re-executed unnecessarily, improving performance when the component re-renders multiple times.

### 3. **Using `useMemo` for `themeStyles`**:

```

const themeStyles = useMemo(() => {
  return {
    backgroundColor: dark ? "black" : "white",
    color: dark ? "white" : "black",
  };
}, [dark]);

```

- **Purpose**: `useMemo` is also used to memoize the `themeStyles` object, which determines the theme (light or dark) of the app.
- **How it works**:
    - The `themeStyles` object is recalculated only when the `dark` state changes. If `dark` remains unchanged, React will return the same reference of the `themeStyles` object.
    - Since objects in JavaScript are reference types, this memoization avoids unnecessary re-renders of the component when the theme doesn't change.
- **Benefit**: Avoids creating a new `themeStyles` object on every render, which helps React avoid unnecessary re-renders of the component or child components that depend on this object.

### 4. **`useEffect` Hook**:

```

useEffect(() => {
  console.log("theme changed");
}, [themeStyles]);

```

- **Purpose**: This hook is used to log "theme changed" to the console every time the theme (represented by `themeStyles`) changes.
- **How it works**:
    - The `useEffect` hook only runs when `themeStyles` changes, thanks to the dependency array `[themeStyles]`.
    - This ensures that logging happens only when the theme actually changes, and not on every re-render.

---

### When to Use `useMemo`:

`useMemo` is best used in the following scenarios:

- **Expensive computations**: When you have functions that perform heavy calculations (like sorting large lists, filtering, or processing large datasets), use `useMemo` to avoid recalculating the result on every render.
- **Referential equality**: When you need to pass objects or functions to child components, but you want to ensure that they don’t get re-created unless necessary. This prevents unnecessary re-renders of the child components.

### Common Pitfalls to Avoid:

1. **Premature Optimization**: Don't use `useMemo` prematurely for simple calculations. React's default behavior (without memoization) is often sufficient and performs well. Only use `useMemo` when you notice performance issues due to expensive computations.
2. **Dependencies**: Ensure that all necessary dependencies are listed in the dependency array to avoid stale values. In the example, `[number]` for `doubleNumber` and `[dark]` for `themeStyles` are correct because they indicate the values that trigger recalculation.

---

### Conclusion:

- **Memoization with `useMemo`** optimizes performance by caching expensive computations and ensuring that functions are only called when necessary.
- By controlling **referential equality** for objects and values, `useMemo` prevents unnecessary re-renders, especially when those values are passed as props to child components.
- Use `useMemo` when you notice performance issues with expensive calculations or when creating new objects on every render causes unnecessary re-renders.

In the example provided, `useMemo` efficiently handles the memoization of both slow computations (`slowFunction`) and dynamically changing objects (`themeStyles`), improving performance and ensuring the app remains responsive.