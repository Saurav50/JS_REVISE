# useReducer Hook

# **How Does `useReducer` Compare to the `useState` Hook?**

- They both involve a current state value, and have a function that triggers a state update and an initial state value passed as an argument.
- The `useReducer` is an alternative to the `useState` hook for managing state in functional components. The `useReducer` hook is better suited for managing complex state logic while `useState` is best for simple state changes.

When the state logic becomes too complicated or when you need to handle state changes in a more predictable and manageable way, the `useReducer` hook is your best bet.

# **What is `useReducer`?**

A `useReducer` is a hook in React that allows you add a `reducer` to your component. It takes in the reducer function and an `initialState` as arguments. The `useReducer` also returns an array of the current `state` and a `dispatch` function.

```
const [state, dispatch] = useReducer(reducer, initialState);

```

Let's familiarize ourselves with what the parameters mean:

- `state`: represents the current value and is set to the `initialState` value during the initial render.
- `dispatch`: is a function that updates the state value and always triggers a re-render, just like the updater function in `useState`.
- `reducer`: is a function that houses all the logic of how the state gets updated. It takes state and action as arguments and returns the next state.
- `initialState`: houses the initial value and can be of any type.

# **Deep dive into `useReducer`**

Having seen the parts that makes up a useReducer hook, it is time to take a closer look into how it operates.

To use useReducer in your React app, call it at the top level of your component.

```
import { useReducer } from "react";

```

We can now use the useReducer hook in our component.

```
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
  )
 }

```

To see our `useReducer` hook in action, we will build a very simple counter app that increments by 1 when an increment button is clicked and decrements by 1 when a decrement button is clicked.

Firstly, let us take a closer look at the important `reducer` function. This function determines how the state gets updated and contains all the logic through which the next state will be calculated.

Basically, reducers house the logic that is usually placed inside of an event handler when using `useState`. This makes it easier to read and debug when you are not getting desired results. A quick look at the reducer function can save you the stress.

The reducer function is always declared outside of your component and takes in a current `state` and `action` as arguments.

```
function reducer(state, action) {
}

```

An `action` is an object that typically has a `type` property which identifies a specific action. Actions describe what happens and contains information necessary for the reducer to update the state.

Conditional statements are used to check the action types and perform a specified operation that would return a new state value. Conditional statements like `if` and `switch` can be used in reducers.

### **Dispatch Function**

This is a function returned by the `useReducer` hook and is responsible for updating state to a new value. The dispatch function takes the action as its only argument.

We can place the dispatch function inside an event handler function. Remember, actions come with a type property so we have to specify when we call the dispatch function. For our counter app, we have two event handlers that increase and decrease the count.

```
function handleIncrement() {
    dispatch({ type: "increment" });
  }

  function handleDecrement() {
    dispatch({ type: "decrement" });
  }

```

Now, we'll go back to our reducer function and use the `switch` condition to evaluate the `action.type` expression.

```
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    default:
      return "Unrecognized command";
  }
}

```

In the above code,

- The `reducer` function takes both the state and action as an argument.
- We conditionally check for a specific case of the `action.type` expression string.
- If true, a shallow copy of the state is taken by the use of the spread operator and the count value in state is evaluated.
- A new state is returned after evaluation has been completed.
- The `default` serves a fallback when no matching case is found.

The entire logic of our counter app has been done. We can now return our JSX with the state of `count` to be displayed on the user interface and the handler functions passed to the `onClick` event handler for the buttons.

```
return (
    <>
      <h1>Count:{state.count}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </>
  );

```

Our counter app is set and the `count` state will be updated accordingly when the buttons are clicked.

# **What Happens Behind the Hood?**

The action of clicking the button triggers a `dispatch` function that sends an information of `type` to the reducer function. The dispatching (clicking of the button) causes a re-render of the component. The reducer function conditionally matches the case with the type from the action object and updates the state accordingly after evaluation has taken place.

**NOTE**: At dispatch, the reducer function still holds the old value. This means that the dispatch function only updates the state variable for the next render. To check this out, we can log the `state` and `action` arguments to the console before the switch statement:

```
function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    default:
      return "Unrecognized command";
  }
  }

```

After clicking the increment button to increase the count twice, here is what is logged to the console:

![https://www.freecodecamp.org/news/content/images/2024/05/Capture.PNG](https://www.freecodecamp.org/news/content/images/2024/05/Capture.PNG)

*state and action type logged to the console*

The above image shows that, at the first click, there was an action type of `increment` made and the initial state value was 0. At the second click, the state value updated to 1, and was displayed as the current count state. I hope you get it now.

Enough of the code gibberish, let's look at a real-world example of the reducer function.