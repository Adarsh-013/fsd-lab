// File System Callback Example

const fs = require("fs");

console.log("Urban Brew: Starting to read the coffee menu...");

fs.readFile("sample.txt", "utf8", (err, data) => {
    if (err) {
        console.log("Error reading file:", err.message);
        return;
    }

    console.log("\nCoffee menu loaded successfully:");
    console.log(data);

    console.log("File reading callback completed.");
});

console.log("Main program continues without waiting for the file.");