// Import Express
const express = require("express");

// Create Express Application
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Coffee Menu Data
const coffeeMenu = [
    { id: 1, name: "Espresso", price: 120 },
    { id: 2, name: "Cappuccino", price: 160 },
    { id: 3, name: "Cafe Latte", price: 170 },
    { id: 4, name: "Cold Coffee", price: 180 }
];

// Temporary in-memory order storage
const orders = [];
let nextOrderId = 1;


// ROUTE 1: Homepage
app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <title>Urban Brew | Express.js</title>

            <style>
                body {
                    margin: 0;
                    font-family: Arial, sans-serif;
                    background: #f5efe6;
                    color: #3e2723;
                }

                header {
                    background: #3e2723;
                    color: white;
                    text-align: center;
                    padding: 25px;
                }

                main {
                    max-width: 850px;
                    margin: 40px auto;
                    padding: 25px;
                }

                .card {
                    background: white;
                    padding: 25px;
                    margin-bottom: 20px;
                    border-radius: 10px;
                    border: 1px solid #e6d8cb;
                }

                h2 {
                    color: #6d4c41;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th, td {
                    padding: 12px;
                    text-align: left;
                    border-bottom: 1px solid #e6d8cb;
                }

                th {
                    background: #6d4c41;
                    color: white;
                }

                a {
                    color: #795548;
                }

                .status {
                    color: #287a3c;
                    font-weight: bold;
                }

                footer {
                    background: #3e2723;
                    color: white;
                    text-align: center;
                    padding: 18px;
                }
            </style>
        </head>

        <body>
            <header>
                <h1>☕ URBAN BREW</h1>
                <p>Fresh Coffee. Fresh Ideas.</p>
            </header>

            <main>
                <section class="card">
                    <h2>Welcome to Urban Brew</h2>
                    <p>
                        A simple coffee shop web application
                        powered by Node.js and Express.js.
                    </p>

                    <p class="status">
                        ✓ Express server is running successfully.
                    </p>
                </section>

                <section class="card">
                    <h2>Our Coffee Menu</h2>

                    <table>
                        <tr>
                            <th>Coffee</th>
                            <th>Price</th>
                        </tr>

                        ${coffeeMenu.map(coffee => `
                            <tr>
                                <td>${coffee.name}</td>
                                <td>₹${coffee.price}</td>
                            </tr>
                        `).join("")}
                    </table>
                </section>

                <section class="card">
                    <h2>Application Routes</h2>

                    <p>
                        <a href="/about">About Urban Brew</a>
                    </p>

                    <p>
                        <a href="/api/menu">View Coffee Menu API</a>
                    </p>

                    <p>
                        <a href="/api/orders">View Orders API</a>
                    </p>
                </section>
            </main>

            <footer>
                Urban Brew Cafe | Powered by Express.js
            </footer>
        </body>
        </html>
    `);
});


// ROUTE 2: About Page
app.get("/about", (req, res) => {
    res.send(`
        <h1>About Urban Brew</h1>
        <p>Urban Brew serves freshly prepared coffee and beverages.</p>
        <p>This webpage is delivered by an Express.js route.</p>
        <a href="/">Return to Home</a>
    `);
});


// ROUTE 3: GET Coffee Menu (REST API)
app.get("/api/menu", (req, res) => {
    res.status(200).json({
        message: "Coffee menu retrieved successfully.",
        menu: coffeeMenu
    });
});


// ROUTE 4: GET One Coffee by ID
app.get("/api/menu/:id", (req, res) => {
    const coffeeId = Number(req.params.id);

    const coffee = coffeeMenu.find(item => item.id === coffeeId);

    if (!coffee) {
        return res.status(404).json({
            error: "Coffee item not found."
        });
    }

    res.status(200).json(coffee);
});


// ROUTE 5: GET All Orders
app.get("/api/orders", (req, res) => {
    res.status(200).json({
        message: "Orders retrieved successfully.",
        orders: orders
    });
});


// ROUTE 6: POST Create an Order
app.post("/api/orders", (req, res) => {
    const { customerName, coffeeId, quantity } = req.body;

    if (typeof customerName !== "string" ||
        customerName.trim().length < 2) {
        return res.status(400).json({
            error: "Please provide a valid customer name."
        });
    }

    const coffee = coffeeMenu.find(
        item => item.id === Number(coffeeId)
    );

    if (!coffee) {
        return res.status(400).json({
            error: "Please select a valid coffee item."
        });
    }

    if (!Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 10) {
        return res.status(400).json({
            error: "Quantity must be a whole number between 1 and 10."
        });
    }

    const order = {
        id: nextOrderId++,
        customerName: customerName.trim(),
        coffee: coffee.name,
        quantity: quantity,
        total: coffee.price * quantity
    };

    orders.push(order);

    res.status(201).json({
        message: "Order created successfully.",
        order: order
    });
});


// Handle Unknown Routes
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found."
    });
});


// Start Express Server
app.listen(PORT, () => {
    console.log("==================================");
    console.log("Urban Brew Express Server");
    console.log(`Server running at http://localhost:${PORT}`);
    console.log("==================================");
});