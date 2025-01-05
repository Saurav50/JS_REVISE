# Creating Promise

1. Promise can be created using a new Promise() constructor function.
2. This constructor function takes a callback function as argument. 
3. The callback function has 2 arguments named 'resolve' and 'reject'. Resolve and reject are the keywords provided by JS.
4. We can only resolve or reject a promise. Nothing else can be done.
5. An error can also be created using new Error('error message').
6. There is also .catch() which is used to attach a failure callback function that handles any error that pops up during the execution of promise chain.
7. .catch only handles error of .then() that are present above it. If there is any .then() below it, catch will not handle any error for that, also that ,then will get executed no matter what.
8. It can be useful in a way if we want to catch error for a particular portion of a chain.
9. We can have multiple catch based on requirement and then a general catch at the end.
10. Always remember to return a value in the promise chain for the next .then to use .
11. If it returns a value => It will be  used as an argument in next function. If it is a promise then the next .then in the promise chain is attached to the promise returned by the current callback function.

```jsx
//createOrder, proceedToPayment, showOrderSummary, updateWallet;
let cart = ["pen", "pencil", "paper"];
createOrder(cart)
  .then(function (orderId) {
    console.log("orderId:", orderId);
    return proceedToPayment(orderId);
  })
  .then(function (payementInfo) {
    console.log("paymentId:", payementInfo.paymentId);
    return showOrderSummary(payementInfo);
  })
  .then(function (orderDetail) {
    console.log(orderDetail);
  })
  .catch(function (err) {
    console.log(err);
  });

function createOrder(cart) {
  const pr = new Promise(function (resolve, reject) {
    resolve("12345");
  });
  return pr;
}
function proceedToPayment(orderId) {
  const pr = new Promise(function (resolve, reject) {
    const paymentInfo = {
      paymentId: "xyz",
      orderId: orderId,
    };
    resolve(paymentInfo);
    // reject("failed payment");
  });
  return pr;
}

function showOrderSummary(orderInfo) {
  const pr = new Promise(function (resolve, reject) {
    resolve(orderInfo);
  });
  return pr;
}

```