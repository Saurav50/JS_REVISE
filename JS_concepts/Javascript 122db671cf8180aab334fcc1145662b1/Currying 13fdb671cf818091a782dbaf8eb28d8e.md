# Currying

Currying is a functional programming technique where a function with multiple arguments is transformed into a series of functions, each taking a single argument.

Instead of taking all arguments at once, the curried function takes the first argument, returns a new function that takes the next argument, and so on until all arguments are provided. The final function then returns the result.

### Traditional Approach

Suppose you are fetching data from multiple APIs, and you need all the results to compute a final value.

```jsx

async function fetchData() {
    const api1Data = await fetch('/api1').then(res => res.json());
    const api2Data = await fetch('/api2').then(res => res.json());
    const api3Data = await fetch('/api3').then(res => res.json());

    return compute(api1Data, api2Data, api3Data);

function compute(a, b, c) {
    return a + b + c; // Example computation
}

```

Here, you need to call `compute` only after all three pieces of data are available. Currying provides a cleaner and more modular approach to handle such scenarios.

---

### Currying for Partial Data Availability

Using currying, you can break the `compute` function into smaller steps that can process each API's data as it becomes available:

```jsx
javascript
Copy code
const compute = (a) => (b) => (c) => a + b + c;

// Example usage with asynchronous data
async function fetchData() {
    const api1Data = await fetch('/api1').then(res => res.json());
    const partialCompute = compute(api1Data);

    const api2Data = await fetch('/api2').then(res => res.json());
    const morePartialCompute = partialCompute(api2Data);

    const api3Data = await fetch('/api3').then(res => res.json());
    const result = morePartialCompute(api3Data);

    console.log(result);
}

```

Here:

1. After fetching `api1Data`, you partially apply the `compute` function.
2. Once `api2Data` is available, you further apply it.
3. Finally, when `api3Data` is fetched, you call the final function to get the result.

# Why is Currying useful in JavaScript?

Currying offers several advantages, especially when working with functional programming patterns:

- It helps us to create a higher-order function
- It reduces the chances of error in our function by dividing it into multiple smaller functions that can handle one responsibility.
- It is very useful in building modular and reusable code
- It helps us to avoid passing the same variable multiple times
- It makes the code more readable