// Callback Function Example

function greet(name, callback) {
    console.log("Hello, " + name + "!");
    callback();
}

function displayWelcome() {
    console.log("Welcome to Urban Brew Cafe.");
    console.log("Enjoy learning Node.js!");
}

// Passing displayWelcome as a callback
greet("Coffee Lover", displayWelcome);