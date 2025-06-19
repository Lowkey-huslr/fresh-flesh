// File: backend/server.js

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy product data
const products = [
  { id: 1, name: "Chicken", price: 250 },
  { id: 2, name: "Mutton", price: 900 },
  { id: 3, name: "Fish", price: 200 }
];

// Routes
app.get("/", (req, res) => {
  res.send("Fresh Flesh API is running!");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const sendSMS = require("./smsSender");

// ✅ New route to send SMS to customer
app.post("/api/send-sms", async (req, res) => {
  const { number, message } = req.body;

  if (!number || !message) {
    return res.status(400).json({ error: "Missing number or message" });
  }

  try {
    const response = await sendSMS(number, message);
    res.json({ success: true, data: response });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to send SMS" });
  }
});
