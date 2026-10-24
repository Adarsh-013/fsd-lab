// Get the form and result elements
const form = document.getElementById("membershipForm");
const result = document.getElementById("result");


// Display an error message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + "Error");

    field.classList.add("invalid");
    field.setAttribute("aria-invalid", "true");
    error.textContent = message;
}


// Clear an individual field's error
function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + "Error");

    field.classList.remove("invalid");
    field.removeAttribute("aria-invalid");
    error.textContent = "";
}


// Clear all errors
function clearAllErrors() {
    const fields = [
        "fullName",
        "email",
        "phone",
        "coffee",
        "password",
        "confirmPassword",
        "terms"
    ];

    fields.forEach(function (fieldId) {
        clearError(fieldId);
    });
}


// Validate the form
function validateForm() {
    clearAllErrors();

    let isValid = true;

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const coffee = document.getElementById("coffee").value;
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms").checked;

    // Name Validation
    if (name.length < 2 || !/^[A-Za-z][A-Za-z .'-]*$/.test(name)) {
        showError(
            "fullName",
            "Enter a valid name with at least 2 characters."
        );
        isValid = false;
    }

    // Email Validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        showError(
            "email",
            "Enter a valid email address."
        );
        isValid = false;
    }

    // Indian Mobile Number Validation
    if (!/^[6-9]\d{9}$/.test(phone)) {
        showError(
            "phone",
            "Enter a valid 10-digit Indian mobile number."
        );
        isValid = false;
    }

    // Coffee Selection Validation
    if (coffee === "") {
        showError(
            "coffee",
            "Please select your favourite coffee."
        );
        isValid = false;
    }

    // Password Validation
    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordPattern.test(password)) {
        showError(
            "password",
            "Use at least 8 characters, including uppercase, lowercase and a number."
        );
        isValid = false;
    }

    // Confirm Password Validation
    if (confirmPassword === "" || password !== confirmPassword) {
        showError(
            "confirmPassword",
            "Passwords are empty or do not match."
        );
        isValid = false;
    }

    // Terms and Conditions Validation
    if (!terms) {
        showError(
            "terms",
            "Please accept the terms and conditions."
        );
        isValid = false;
    }

    return isValid;
}


// Submit Event
form.addEventListener("submit", function (event) {
    event.preventDefault();

    result.className = "result";

    if (validateForm()) {
        const name = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const coffee = document.getElementById("coffee").value;

        result.className = "result success";

        result.textContent =
            "Validation Successful!\n\n" +
            "Welcome to Urban Brew, " + name + "!\n" +
            "Email: " + email + "\n" +
            "Favourite Coffee: " + coffee + "\n\n" +
            "All form inputs have passed validation.";
    } else {
        result.className = "result failure";
        result.textContent =
            "Validation Failed!\nPlease correct the errors shown above.";

        const firstInvalid = form.querySelector(".invalid");

        if (firstInvalid) {
            firstInvalid.focus();
        }
    }
});


// Input Event: Clear errors as the user edits fields
form.addEventListener("input", function (event) {
    const field = event.target;

    if (field.id && document.getElementById(field.id + "Error")) {
        clearError(field.id);
    }

    result.className = "result";
    result.textContent = "Update your details and validate the form again.";
});


// Change Event: Handle dropdowns and the terms checkbox
form.addEventListener("change", function (event) {
    const field = event.target;

    if (field.id && document.getElementById(field.id + "Error")) {
        clearError(field.id);
    }
});


// Reset Event
form.addEventListener("reset", function () {
    window.setTimeout(function () {
        clearAllErrors();

        result.className = "result";
        result.textContent =
            "Your registration status will appear here.";
    }, 0);
});