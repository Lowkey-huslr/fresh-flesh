// File: backend/server.js

const express = require("express");
const cors = require("cors");
const sendSMS = require("./smsSender");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy product data (used for /api/products)
const products = [
  { id: 1, name: "Chicken", price: 250 },
  { id: 2, name: "Mutton", price: 900 },
  { id: 3, name: "Fish", price: 200 }
];

// Root route
app.get("/", (req, res) => {
  res.send("🐔 Fresh Flesh API is running!");
});

// Product list endpoint
app.get("/api/products", (req, res) => {
  res.json(products);
});

// ✅ Route to send OTP using GET method
app.get("/send-otp", async (req, res) => {
  const { mobile } = req.query;

  if (!mobile || !/^91\d{10}$/.test(mobile)) {
    return res.status(400).json({ success: false, message: "Invalid or missing mobile number" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

  try {
    await sendSMS(mobile, `Your OTP is ${otp}`);
    res.json({ success: true, otp }); // You can remove otp from response in production
  } catch (err) {
    console.error("❌ SMS sending failed:", err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

// ✅ Optional: POST route to send custom message
app.post("/api/send-sms", async (req, res) => {
  const { number, message } = req.body;

  if (!number || !message) {
    return res.status(400).json({ error: "Missing number or message" });
  }

  try {
    await sendSMS(number, message);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ SMS error:", err);
    res.status(500).json({ success: false, error: "Failed to send SMS" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
