// ARRAY
let coffeeMenu = ["Espresso", "Cappuccino", "Cafe Latte", "Cold Coffee"];

// OBJECTS
let coffeeDetails = {
    "Espresso": 120,
    "Cappuccino": 160,
    "Cafe Latte": 170,
    "Cold Coffee": 180
};

// FUNCTION
function calculateOrder() {

    // STRING OPERATION
    let customerName = document.getElementById("customerName").value;

    customerName = customerName.trim();

    if (customerName === "") {
        document.getElementById("result").innerHTML =
            "Please enter your name.";
        return;
    }

    // GETTING VALUES
    let selectedCoffee = document.getElementById("coffee").value;
    let quantity = Number(document.getElementById("quantity").value);

    // OBJECT PROPERTY
    let price = coffeeDetails[selectedCoffee];

    // CALCULATION
    let total = price * quantity;

    // STRING OPERATION
    let formattedName =
        customerName.charAt(0).toUpperCase() +
        customerName.slice(1).toLowerCase();

    // STRING CONCATENATION
    let message =
        "Hello <b>" + formattedName + "</b>!<br><br>" +
        "Coffee: <b>" + selectedCoffee + "</b><br>" +
        "Price per cup: <b>₹" + price + "</b><br>" +
        "Quantity: <b>" + quantity + "</b><br>" +
        "Total Amount: <b>₹" + total + "</b>";

    document.getElementById("result").innerHTML = message;
}


// FUNCTION TO DISPLAY ARRAY
function displayMenu() {

    let menuText = "";

    for (let i = 0; i < coffeeMenu.length; i++) {
        menuText += (i + 1) + ". " + coffeeMenu[i] + "<br>";
    }

    document.getElementById("menu").innerHTML = menuText;
}


// CALLING FUNCTION
displayMenu();