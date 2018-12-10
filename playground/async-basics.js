console.log("Starting app");

// setTimeout would then define an async callback, which would get fired after 2 seconds
// This is an example of non-blocking I/O

setTimeout(() => {
  console.log("Inside callback function");
}, 2000);

setTimeout(() => {
  console.log("Second timeout");
}, 0);

console.log("Finishing app");
console.log("Finishing app");
console.log("Finishing app");
console.log("Finishing app");
console.log("Finishing app");
console.log("Finishing app");
console.log("Finishing app");
