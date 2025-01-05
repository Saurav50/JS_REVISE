# Throttling

**Throttling** in JavaScript is a technique used to limit the frequency at which a function is executed. It ensures that a function is called at most once in a specified time period, even if it is triggered multiple times within that period. This is particularly useful for performance optimization in scenarios where events like resizing, scrolling, or clicking are triggered repeatedly.

### How Throttling Works

Throttling works by:

1. Ignoring repeated function calls within a specified timeframe.
2. Ensuring that the function is executed at consistent intervals.

### Use Case Examples

- Handling **scroll** or **resize** events to avoid excessive function calls.
- **API rate limiting** to prevent exceeding request quotas.
- **Button click events** to prevent multiple form submissions.

```jsx
function throttle(func, delay) {
    let lastCall = 0;

    return function (...args) {
        const now = new Date().getTime();

        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

// Scroll handler
function onScroll() {
    console.log("Scroll event at:", new Date().toISOString());
}

// Throttled scroll handler
const throttledScroll = throttle(onScroll, 200); // Limit to once every 200ms

// Attach to scroll event
window.addEventListener("scroll", throttledScroll);

```