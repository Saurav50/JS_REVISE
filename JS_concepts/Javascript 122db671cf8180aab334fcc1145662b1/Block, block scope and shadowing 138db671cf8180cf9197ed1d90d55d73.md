# Block, block scope and shadowing

Here's an explanation of **block**, **block scope**, and **shadowing** in JavaScript:

### 1. Block

A **block** in JavaScript is a section of code enclosed in curly braces `{ }`. Blocks are commonly used to group statements, particularly in control structures like `if` statements, `for` and `while` loops, and functions. Blocks do not create their own scope for `var` variables but do for `let` and `const`.

Example:

```jsx
javascript
Copy code
{
  let x = 10; // Block-scoped variable
  const y = 20; // Block-scoped constant
  var z = 30; // Function-scoped variable
}

```

### 2. Block Scope

**Block scope** means that variables declared inside a block (`{ }`) with `let` or `const` are confined to that block. They can't be accessed from outside the block they were defined in. This feature was introduced in ES6 (ECMAScript 2015) and provides better control over variable visibility and lifecycle.

Example:

```jsx
javascript
Copy code
{
  let a = 10;
  const b = 20;
}
console.log(a); // ReferenceError: a is not defined
console.log(b); // ReferenceError: b is not defined

```

If `var` were used in place of `let` or `const`, the variable would be scoped to the function or global context, not the block.

### 3. Shadowing

**Shadowing** occurs when a variable declared within a block has the same name as a variable in an outer scope. The inner variable "shadows" the outer one, making the outer variable inaccessible within the block. Shadowing can be useful but may lead to bugs if you unintentionally use the same variable name.

Example:

```jsx
javascript
Copy code
let x = 100;

function test() {
  let x = 50; // Shadows the outer `x`
  console.log(x); // Output: 50
}

test();
console.log(x); // Output: 100

```

In this example:

- The `x` inside the `test` function is a different variable than the `x` in the outer scope.
- The outer `x` is not accessible within the block where the inner `x` is defined due to shadowing.