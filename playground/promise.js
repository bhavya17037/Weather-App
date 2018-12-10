var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === "number" && typeof b === "number") {
        resolve(a + b);
      } else {
        reject("a or b is not a number!");
      }
    }, 1500);
  });
};

asyncAdd(10, 15)
  .then(result => {
    console.log(`Sum = ${result}`);
    // Callback chaining
    return asyncAdd("haha", result);
  }) // This another then is for the chained promise
  .then(result => {
    console.log(`New sum = ${result}`);
  })
  .catch(errorMessage => {
    console.log(errorMessage);
  });

// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     //resolve("Hey, it worked.");
//     reject("Unable to fulfill promise.");
//   }, 2500);
// });

// somePromise.then(
//   result => {
//     console.log("Success: ", result);
//   },
//   result => {
//     console.log("Failure: ", result);
//   }
// );
