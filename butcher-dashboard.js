// File: butcher-dashboard.js

document.addEventListener("DOMContentLoaded", () => {
  const butcherInfo = JSON.parse(localStorage.getItem("butcherLoggedIn"));
  const orderList = document.getElementById("order-list");
  const greeting = document.getElementById("butcher-greeting");

  if (!butcherInfo) {
    alert("Please login first.");
    window.location.href = "butcher-login.html";
    return;
  }

  // Show greeting
  greeting.textContent = `Welcome, ${butcherInfo.name}`;

  // Get orders placed for this butcher
  const orders = JSON.parse(localStorage.getItem(`orders-${butcherInfo.mobile}`) || "[]");

  if (orders.length === 0) {
    orderList.innerHTML = `<p class="text-gray-600">You have no orders yet.</p>`;
    return;
  }

  orders.forEach((order, index) => {
    const div = document.createElement("div");
    div.className = "border p-4 rounded bg-white shadow mb-4";

    let itemsHTML = "";
    order.items.forEach(item => {
      itemsHTML += `<li>${item.name} - ${item.qty}kg - ₹${item.price * item.qty}</li>`;
    });

    div.innerHTML = `
      <h3 class="text-lg font-bold mb-2">Order #${index + 1}</h3>
      <p><strong>Customer:</strong> ${order.customerName}</p>
      <p><strong>Phone:</strong> ${order.phone}</p>
      <p><strong>Address:</strong> ${order.address}</p>
      <p><strong>Items:</strong></p>
      <ul class="list-disc list-inside mb-2">${itemsHTML}</ul>
    `;

    orderList.appendChild(div);
  });
});
