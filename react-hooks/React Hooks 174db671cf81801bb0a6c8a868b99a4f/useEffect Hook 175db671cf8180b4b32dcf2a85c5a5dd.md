# useEffect Hook

**1. What is `useEffect`?**

`useEffect` is a React Hook that lets you perform side effects in function components. It replaces lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in class components.

```jsx

import React, { useEffect } from 'react';

useEffect(() => {
  // Code for side effect
});

```

---

### **2. Syntax**

```jsx

useEffect(effectFunction, dependencies);

```

### **Parameters:**

1. **effectFunction (required)**:
    - A function containing the code for the side effect.
    - Can optionally return a cleanup function.
2. **dependencies (optional)**:
    - An array of dependencies that determine when the effect runs.
    - If omitted, the effect runs after every render.

---

### **3. Common Use Cases**

- **Data fetching:**
    
    ```jsx
    
    useEffect(() => {
      fetch('https://api.example.com/data')
        .then((response) => response.json())
        .then((data) => console.log(data));
    }, []); // Empty array ensures it runs only once (on mount).
    
    ```
    
- **Subscribing to events:**
    
    ```jsx
    
    useEffect(() => {
      const handleResize = () => console.log(window.innerWidth);
      window.addEventListener('resize', handleResize);
    
      return () => window.removeEventListener('resize', handleResize); // Cleanup
    }, []);
    
    ```
    
- **Updating the document title:**
    
    ```jsx
    
    useEffect(() => {
      document.title = `You clicked ${count} times`;
    }, [count]); // Re-run when `count` changes
    
    ```
    

---

### **4. How it Works**

- React runs the `effectFunction` after rendering the component.
- If the component is updated and the dependencies change, React re-runs the effect.
- If a cleanup function is returned, React runs the cleanup function before the next effect or when the component unmounts

---

### **5. Dependencies Array**

The second argument, the **dependencies array**, determines when the effect runs:

- **No dependencies (`[]`)**: Runs the effect once after the initial render.
    
    ```jsx
    
    useEffect(() => {
      console.log('Runs only once');
    }, []);
    
    ```
    
- **Specific dependencies**: Runs the effect whenever one of the dependencies changes.
    
    ```jsx
    
    useEffect(() => {
      console.log('Runs when `count` changes');
    }, [count]);
    
    ```
    
- **No array**: Runs the effect after every render.

```jsx

useEffect(() => {
  console.log('Runs after every render');
});

```

- Useful for scenarios where you need to perform an action regardless of the reason for the render.
- Be cautious with intensive or side-effect-heavy operations.

### **Common Dependency Issues**

- Always include all external variables used inside the effect in the dependencies array.
- Rely on linters (e.g., ESLint) to avoid missing dependencies.

---

### **6. Cleanup Function**

The `effectFunction` can return a cleanup function to handle side effects like unsubscribing from events or canceling timers.

### Example:

```jsx

useEffect(() => {
  const timer = setInterval(() => {
    console.log('Timer running');
  }, 1000);

  return () => clearInterval(timer); // Cleanup
}, []);

```

---

### **7. Combining Multiple `useEffect` Hooks**

You can use multiple `useEffect` hooks for different concerns:

```jsx

useEffect(() => {
  console.log('Effect 1');
}, [dependency1]);

useEffect(() => {
  console.log('Effect 2');
}, [dependency2]);

```

---

### **8. Lifecycle Comparison**

| Lifecycle Method | Equivalent `useEffect` |
| --- | --- |
| `componentDidMount` | `useEffect(() => {...}, [])` |
| `componentDidUpdate` | `useEffect(() => {...}, [dependencies])` |
| `componentWillUnmount` | Cleanup function: `return () => {...}` in effect |

---

### **9. Common Patterns**

### **1. Fetching Data**

```jsx

useEffect(() => {
  async function fetchData() {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  }
  fetchData();
}, []);

```

### **2. Event Listeners**

```jsx

useEffect(() => {
  const onScroll = () => console.log('Scrolled');
  window.addEventListener('scroll', onScroll);

  return () => window.removeEventListener('scroll', onScroll); // Cleanup
}, []);

```

### **3. Timer Example**

```jsx

useEffect(() => {
  const interval = setInterval(() => console.log('Tick'), 1000);
  return () => clearInterval(interval); // Cleanup
}, []);

```

### **4. Synchronizing State**

```jsx

useEffect(() => {
  localStorage.setItem('count', count);
}, [count]); // Synchronize whenever count changes

```

---

### **10. Potential Pitfalls**

1. **Infinite Loops**:
    - Missing dependencies or incorrect logic can cause infinite re-renders.
    
    ```jsx
    
    useEffect(() => {
      setState(newValue); // Will cause an infinite loop if no dependencies
    }); // Avoid missing dependencies
    
    ```
    
2. **Stale Closures**:
    - If you use state or props inside `useEffect`, ensure you include them in the dependencies array.
    
    ```jsx
    
    useEffect(() => {
      console.log(count); // If `count` changes, add it as a dependency
    }, []);
    
    ```
    
3. **Overuse of Cleanup**:
    - Be cautious when cleaning up; ensure cleanup logic doesn't unintentionally affect other parts of the app.
4. **Memory Leaks**:
    - Always clean up subscriptions, listeners, or intervals in the cleanup function.

---

### **11. Advanced Patterns**

### **1. Conditional Effects**

Run effects conditionally:

```jsx

useEffect(() => {
  if (shouldRun) {
    console.log('Running effect');
  }
}, [shouldRun]);

```

### **2. Debounced Effects**

Delay execution for performance optimization:

```jsx

useEffect(() => {
  const handler = setTimeout(() => {
    console.log(inputValue);
  }, 300);

  return () => clearTimeout(handler);
}, [inputValue]);

```

---

### **12. Debugging `useEffect`**

- Use console logs to inspect when effects are triggered.
- Tools like React DevTools can show how state and props are changing.

---

### **13. Conclusion**

- `useEffect` is a powerful tool for managing side effects in React components.
- Always follow best practices: use the dependency array correctly, avoid direct mutations, and clean up when necessary.
- By mastering `useEffect`, you can handle complex side effects efficiently in functional components.