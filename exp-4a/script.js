// Coffee Menu Object
const COFFEE_MENU = {
    espresso: { name: "Espresso", price: 120 },
    cappuccino: { name: "Cappuccino", price: 160 },
    latte: { name: "Cafe Latte", price: 170 },
    coldCoffee: { name: "Cold Coffee", price: 180 }
};


// Custom Error Class
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}


// Coffee Order Class
class CoffeeOrder {
    constructor(details) {
        this.name = details.name.trim();
        this.email = details.email.trim();
        this.phone = details.phone.trim();
        this.coffee = details.coffee;
        this.quantity = Number(details.quantity);
        this.orderType = details.orderType;
    }

    // Input Validation
    validate() {

        if (this.name.length < 2) {
            throw new ValidationError(
                "Please enter a name with at least 2 characters.",
                "customerName"
            );
        }

        if (!/^[A-Za-z][A-Za-z .'-]*$/.test(this.name)) {
            throw new ValidationError(
                "Name should contain only letters and valid name characters.",
                "customerName"
            );
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
            throw new ValidationError(
                "Please enter a valid email address.",
                "email"
            );
        }

        const digits = this.phone.replace(/\D/g, "");

        if (
            !(
                digits.length === 10 ||
                (digits.length === 12 && digits.startsWith("91"))
            )
        ) {
            throw new ValidationError(
                "Enter a valid 10-digit mobile number, optionally with +91.",
                "phone"
            );
        }

        if (!Object.prototype.hasOwnProperty.call(
            COFFEE_MENU, this.coffee
        )) {
            throw new ValidationError(
                "Please select a coffee from the menu.",
                "coffee"
            );
        }

        if (
            !Number.isInteger(this.quantity) ||
            this.quantity < 1 ||
            this.quantity > 10
        ) {
            throw new ValidationError(
                "Quantity must be a whole number between 1 and 10.",
                "quantity"
            );
        }

        if (!["pickup", "dine-in"].includes(this.orderType)) {
            throw new ValidationError(
                "Please select a valid order type.",
                "orderType"
            );
        }

        return true;
    }

    // Calculate Order Total
    get total() {
        return COFFEE_MENU[this.coffee].price * this.quantity;
    }
}


// Getting HTML Elements
const form = document.getElementById("orderForm");
const result = document.getElementById("orderResult");
const estimate = document.getElementById("estimate");


// Clear Error for a Particular Field
function clearFieldError(field) {
    field.classList.remove("invalid");
    field.removeAttribute("aria-invalid");

    const errorMessage = document.getElementById(
        field.id + "Error"
    );

    if (errorMessage) {
        errorMessage.textContent = "";
    }
}


// Clear All Validation Errors
function clearAllErrors() {
    form.querySelectorAll(".field-error").forEach(function (element) {
        element.textContent = "";
    });

    form.querySelectorAll("input, select").forEach(function (field) {
        field.classList.remove("invalid");
        field.removeAttribute("aria-invalid");
    });
}


// Display a Validation Error
function showValidationError(error) {
    const field = document.getElementById(error.field);
    const errorMessage = document.getElementById(error.field + "Error");

    if (field && errorMessage) {
        field.classList.add("invalid");
        field.setAttribute("aria-invalid", "true");
        errorMessage.textContent = error.message;
        field.focus();
    }
}


// Update Estimated Price
function updateEstimate() {
    const coffee = document.getElementById("coffee").value;
    const quantity = Number(
        document.getElementById("quantity").value
    );

    if (
        !Object.prototype.hasOwnProperty.call(COFFEE_MENU, coffee) ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 10
    ) {
        estimate.textContent = "Choose coffee and quantity";
        return;
    }

    const total = COFFEE_MENU[coffee].price * quantity;
    estimate.textContent = "₹" + total;
}


// INPUT EVENT
form.addEventListener("input", function (event) {
    if (event.target.matches("input, textarea")) {
        clearFieldError(event.target);
    }

    updateEstimate();
});


// CHANGE EVENT
form.addEventListener("change", function (event) {
    if (event.target.matches("select")) {
        clearFieldError(event.target);
    }

    updateEstimate();
});


// SUBMIT EVENT AND EXCEPTION HANDLING
form.addEventListener("submit", function (event) {

    event.preventDefault();
    clearAllErrors();

    try {

        // Create an object of the CoffeeOrder class
        const order = new CoffeeOrder({
            name: document.getElementById("customerName").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            coffee: document.getElementById("coffee").value,
            quantity: document.getElementById("quantity").value,
            orderType: document.getElementById("orderType").value
        });

        // Validate the input
        order.validate();

        // Display the order summary
        result.className = "result-panel result-panel--success";

        result.textContent = [
            "Order Details Validated Successfully!",
            "",
            "Customer: " + order.name,
            "Email: " + order.email,
            "Phone: " + order.phone,
            "Coffee: " + COFFEE_MENU[order.coffee].name,
            "Quantity: " + order.quantity,
            "Order Type: " +
                (order.orderType === "pickup" ? "Takeaway" : "Dine In"),
            "Total Amount: ₹" + order.total,
            "",
            "This is a preview only. No order has been sent."
        ].join("\n");

    } catch (error) {

        // Handle Validation Errors
        if (error instanceof ValidationError) {
            showValidationError(error);

            result.className = "result-panel result-panel--error";
            result.textContent =
                "Please correct the highlighted field and try again.";

        } else {

            // Handle Unexpected Errors
            console.error("Unexpected error:", error);

            result.className = "result-panel result-panel--error";
            result.textContent =
                "Something went wrong. Please try again.";
        }
    }
});


// RESET EVENT
form.addEventListener("reset", function () {

    clearAllErrors();

    window.setTimeout(function () {
        result.className = "result-panel";
        result.textContent =
            "Your validated order preview will appear here.";

        updateEstimate();
    }, 0);
});


// Initial Price Estimate
updateEstimate();