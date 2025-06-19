// File: payment.js

function placeOrder(paymentMethod) {
  const orderData = JSON.parse(localStorage.getItem("pendingOrder"));

  if (!orderData) {
    alert("No order found.");
    return;
  }

  orderData.paymentMethod = paymentMethod;

  const butcherKey = `orders-${orderData.butcherMobile}`;
  const existingOrders = JSON.parse(localStorage.getItem(butcherKey) || "[]");
  existingOrders.push(orderData);
  localStorage.setItem(butcherKey, JSON.stringify(existingOrders));

  // Save last order for confirmation
  localStorage.setItem("lastOrder", JSON.stringify(orderData));

  // Clear cart and pending
  localStorage.removeItem("cart");
  localStorage.removeItem("pendingOrder");

  window.location.href = "confirmation.html";
}


function payCOD() {
  placeOrder("Cash on Delivery");
}

function confirmUPI() {
  placeOrder("Paid via UPI");
}
