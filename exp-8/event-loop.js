// Node.js Event Loop Example

console.log("Start: Urban Brew order received.");

setTimeout(() => {
    console.log("Timeout 1: Preparing the coffee order.");
}, 0);

setTimeout(() => {
    console.log("Timeout 2: Coffee is ready!");
}, 1000);

console.log("End: Main program continues.");
