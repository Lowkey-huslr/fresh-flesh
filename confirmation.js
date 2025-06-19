// File: confirmation.js

const order = JSON.parse(localStorage.getItem("lastOrder"));
const container = document.getElementById("order-summary");

if (!order) {
  container.innerHTML = "<p class='text-gray-600'>No order details available.</p>";
} else {
  const itemsList = order.items.map(item =>
    `<li>${item.name} - ${item.qty}kg @ ₹${item.price}/kg = ₹${(item.qty * item.price).toFixed(2)}</li>`
  ).join("");

  container.innerHTML = `
    <p><strong>Customer Name:</strong> ${order.customerName}</p>
    <p><strong>Phone:</strong> +91 ${order.phone}</p>
    <p><strong>Delivery Address:</strong> ${order.address}</p>
    <p><strong>Butcher Mobile:</strong> ${order.butcherMobile}</p>
    <p><strong>Payment Method:</strong> ${order.paymentMethod || 'Not specified'}</p>
    <p><strong>Items Ordered:</strong></p>
    <ul class="list-disc ml-6">${itemsList}</ul>
  `;

  const message = `Hi ${order.customerName}, your Fresh Flesh order is confirmed! Butcher: ${order.butcherMobile}, Items: ${order.items.length}, Payment: ${order.paymentMethod || "N/A"}`;

  // Send SMS using backend API
  fetch("http://localhost:5000/api/send-sms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      number: "91" + order.phone,
      message
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        console.log("✅ SMS sent to customer.");
      } else {
        console.warn("⚠️ SMS sending failed:", data.error);
      }
    })
    .catch(err => {
      console.error("Error while sending SMS:", err);
    });
}
