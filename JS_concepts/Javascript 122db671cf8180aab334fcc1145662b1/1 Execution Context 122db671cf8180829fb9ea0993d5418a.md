# 1. Execution Context

![image.png](1%20Execution%20Context%20122db671cf8180829fb9ea0993d5418a/image.png)

### Execution Context Phases

Each execution context goes through two phases:

1. **Memory Creation Phase:**
    - In this phase, JavaScript sets up the scope chain, creates the variable object, and determines the value of `this`.
    - Variables are "hoisted," meaning variable and function declarations are moved to the top of the context.
2. **Execution Phase:**
    - Code is executed line by line.
    - Variable assignments and function invocations are performed.

### The Call Stack

JavaScript is single-threaded, meaning it executes code in a specific order, using a **call stack** to keep track of the execution contexts. When a function is called, its execution context is pushed onto the stack, and once the function completes, it is popped off the stack.