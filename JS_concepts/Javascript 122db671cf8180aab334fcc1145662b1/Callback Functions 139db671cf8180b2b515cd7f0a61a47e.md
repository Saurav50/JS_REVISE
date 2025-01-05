# Callback Functions

```jsx
function attachEventListeners() {
  let count = 0;

  function handleClick() {
    console.log("Button Clicked", ++count);
  }

  document.getElementById("clickMe").addEventListener("click", handleClick);

  // Example of removing the event listener
  return function removeEventListeners() {
    document.getElementById("clickMe").removeEventListener("click", handleClick);
    console.log("Event listener removed");
  };
}

const removeListeners = attachEventListeners();

// Call removeListeners() when you want to remove the event listener and allow garbage collection
// removeListeners();

```

### Explanation

1. **Scope and Closures**: The `handleClick` function has access to `count` because of closure. Even after `attachEventListeners` finishes executing, `handleClick` still has access to the `count` variable.
2. **Garbage Collection**: When you attach an event listener, a reference to the function (like `handleClick`) is maintained in memory. If you don’t remove it, it can prevent garbage collection of the element and any variables captured in the closure (like `count`), leading to potential memory leaks.
3. **Removing Event Listeners**: The `removeEventListeners` function returned by `attachEventListeners` will remove the event listener and allow the memory to be freed when no longer in use.

---

---

Things learned:
1. Function that is passed on as argument to another function is called callback function.
2. setTimeout helps turn JS which is sinhlethreaded and synchronous into asynchronous.
3. Event listeners can also invoke closures with scope.
4. Event listeners consume a lot of memory which can potentially slow down the website therefore it is good practice to remove if it is not used.

**Show less**