# Async Await

1. **`async` always returns a promise**:
    - When you declare a function with `async`, it always returns a promise, even if you don’t explicitly return one. If you return a value, JavaScript automatically wraps it in a resolved promise.
2. **`await` can only be used inside an `async` function**:
    - This means that `await` is only valid within functions marked as `async`. Trying to use `await` outside an `async` function will throw a syntax error.
3. **Only place `await` in front of a promise**:
    - The `await` keyword pauses the `async` function until the promise resolves. If you `await` a non-promise, it simply converts it to a resolved promise.
4. **`await` doesn’t block the JavaScript engine**:
    - While `await` appears to make JavaScript “wait,” it actually just pauses that function. This frees up the call stack to execute other tasks, making JavaScript non-blocking and efficient.
    
    [Example ](Async%20Await%2013bdb671cf81807fb9bcc52e2364d324/Example%2013bdb671cf8180d7bee2d4328e0e3864.md)
    
5. **Error handling with `try...catch` or `.catch()`**:
    - Wrapping `await` statements in `try...catch` blocks lets you handle errors in a readable way. You can also chain `.catch()` to the end of the `async` function if preferred.

Here’s a quick example to illustrate:

```jsx
javascript
Copy code
async function fetchData() {
    try {
        let response = await fetch('https://api.example.com/data');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Alternatively
fetchData().catch(error => console.error('Error fetching data:', error));

```

This example shows `try...catch` within the `async` function and `.catch()` handling on the outside—both are valid!