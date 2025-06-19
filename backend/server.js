// File: backend/server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to orders.json file
const ORDERS_FILE = path.join(__dirname, "orders.json");

// Dummy product list (for testing API)
const products = [
  { id: 1, name: "Chicken", price: 250 },
  { id: 2, name: "Mutton", price: 900 },
  { id: 3, name: "Fish", price: 200 },
];

// Ensure orders.json exists
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([]));
}

// Routes
app.get("/", (req, res) => {
  res.send("🐔 Fresh Flesh Backend is Live!");
});

// Product List
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Save new order
app.post("/api/orders", (req, res) => {
  const { customerName, phone, address, items } = req.body;

  if (!customerName || !phone || !address || !items || items.length === 0) {
    return res.status(400).json({ error: "Missing order details." });
  }

  const order = {
    id: Date.now(),
    customerName,
    phone,
    address,
    items,
    createdAt: new Date().toISOString(),
  };

  const orders = JSON.parse(fs.readFileSync(ORDERS_FILE));
  orders.push(order);
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));

  res.json({ success: true, order });
});

// Get all orders (admin)
app.get("/api/admin/orders", (req, res) => {
  const orders = JSON.parse(fs.readFileSync(ORDERS_FILE));
  res.json(orders);
});

// Get orders for specific phone number (butcher or customer view)
app.get("/api/orders/by-phone", (req, res) => {
  const { phone } = req.query;
  if (!phone) {
    return res.status(400).json({ error: "Phone number required" });
  }

  const orders = JSON.parse(fs.readFileSync(ORDERS_FILE));
  const filtered = orders.filter(order => order.phone === phone);
  res.json(filtered);
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
