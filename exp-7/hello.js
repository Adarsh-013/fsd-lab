// Welcome Message
console.log("==================================");
console.log("Welcome to Urban Brew Cafe!");
console.log("Welcome to Node.js");
console.log("==================================");

// Node.js Runtime Information
console.log("\nNode.js Version:", process.version);
console.log("Operating System:", process.platform);

// Coffee Menu
const coffeeMenu = [
    { name: "Espresso", price: 120 },
    { name: "Cappuccino", price: 160 },
    { name: "Cafe Latte", price: 170 },
    { name: "Cold Coffee", price: 180 }
];

// Display Menu
console.log("\nUrban Brew Coffee Menu:");

coffeeMenu.forEach((coffee, index) => {
    console.log(
        `${index + 1}. ${coffee.name} - Rs. ${coffee.price}`
    );
});

console.log("\nNode.js program executed successfully.");