# Debouncing

Debouncing is **a programming technique that delays the execution of a function until a certain amount of time has passed since the last time it was called**.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="script.js"></script>
  </head>
  <body>
    <!-- Search Bar -->
    <div style="text-align: center; margin-top: 20px">
      <input
        type="text"
        id="searchBar"
        placeholder="Search..."
        style="width: 50%; padding: 10px; font-size: 16px"
        onkeyup="debouncedSearch(event)"
      />
    </div>
  </body>
</html>

```

```jsx
function handleSearch(e) {
  console.log(e);
}

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const debouncedSearch = debounce(handleSearch, 500);

```