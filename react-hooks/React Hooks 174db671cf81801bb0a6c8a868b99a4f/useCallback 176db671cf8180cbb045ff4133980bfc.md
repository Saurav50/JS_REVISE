# useCallback

### What is `useCallback`?

`useCallback` is a React Hook that allows you to memoize a function. It returns a memoized version of the callback function, ensuring that the function reference remains the same across renders unless its dependencies change.

This hook is particularly useful when passing callback functions to child components to avoid unnecessary re-renders or when using these callbacks in performance-sensitive operations like event handlers, `useEffect`, or `React.memo`.

---

### Syntax

```jsx

const memoizedCallback = useCallback(callback, dependencies);

```

- **`callback`**: The function you want to memoize.
- **`dependencies`**: An array of values that the callback depends on. The memoized function will update if any of these values change.

---

### Why Use `useCallback`?

1. **Preventing Re-Creation of Functions**:
    - In React, functions are re-created on every render. If a function is passed to a child component, it might cause unnecessary re-renders even if the function logic hasn’t changed.
2. **Optimization with `React.memo`**:
    - When passing functions as props to `React.memo`wrapped components, the child will only re-render if the function reference changes. `useCallback` ensures the function reference remains stable unless dependencies change.
3. **Performance Optimization**:
    - Useful in complex components with frequent re-renders, especially when dealing with expensive operations or large datasets.

---

### Key Features

1. **Memoization**:
    - `useCallback` ensures the same function reference is reused between renders unless dependencies change.
2. **Dependency Array**:
    - The dependency array determines when the function should be re-created.

---

### 

//Parent

```jsx
import React, { useState, useCallback } from "react";
import Child from "./Child";

const Parent = () => {
  const [number, setNumber] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const generateConsecutiveNumbers = () => {
    const start = parseInt(number, 10);
    return [start, start + 1, start + 2];
  };

  const handleInputChange = (e) => {
    setNumber(e.target.value);
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <div
      style={{
        backgroundColor: isDarkTheme ? "#333" : "#fff",
        color: isDarkTheme ? "#fff" : "#000",
        padding: "20px",
        minHeight: "100vh",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <h1>Generate Consecutive Numbers</h1>
      <button onClick={toggleTheme}>
        Toggle Theme to {isDarkTheme ? "Light" : "Dark"}
      </button>
      <input
        type="number"
        value={number}
        onChange={handleInputChange}
        placeholder="Enter a number"
        style={{
          marginTop: "10px",
          padding: "5px",
          border: isDarkTheme ? "1px solid #fff" : "1px solid #000",
          backgroundColor: isDarkTheme ? "#555" : "#fff",
          color: isDarkTheme ? "#fff" : "#000",
        }}
      />
      <Child generateNumbers={generateConsecutiveNumbers} />
    </div>
  );
};

export default Parent;

```

//child

```jsx
import React, { useEffect } from "react";

const Child = React.memo(({ generateNumbers }) => {
  const consecutiveNumbers = generateNumbers();
  useEffect(() => {
    console.log("child rendered");
  });
  return (
    <div>
      <h2>Generated Numbers:</h2>
      <p>{consecutiveNumbers.join(", ")}</p>
    </div>
  );
});

export default Child;

```