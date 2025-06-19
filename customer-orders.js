// File: customer-orders.js

const customerMobile = localStorage.getItem("customerLoggedIn");
const ordersContainer = document.getElementById("orders-list");

if (!customerMobile) {
  window.location.href = "customer-login.html";
}

// Collect all orders across all butchers
let allOrders = [];

const butchers = JSON.parse(localStorage.getItem("butchers") || "[]");

butchers.forEach(butcher => {
  const orders = JSON.parse(localStorage.getItem(`orders-${butcher.mobile}`) || "[]");

  orders.forEach(order => {
    if (order.address.includes(customerMobile)) {
      allOrders.push({
        butcher: butcher.name,
        items: order.items,
        customer: order.customerName,
        address: order.address
      });
    }
  });
});

if (allOrders.length === 0) {
  ordersContainer.innerHTML = `<p class="text-gray-600">No orders found.</p>`;
} else {
  allOrders.forEach((order, index) => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded shadow";

    const itemsList = order.items.map(item =>
      `<li>${item.name} - ${item.qty}kg @ ₹${item.price} = ₹${item.qty * item.price}</li>`
    ).join("");

    div.innerHTML = `
      <h3 class="font-bold mb-2">🧾 Order #${index + 1}</h3>
      <p><strong>Butcher:</strong> ${order.butcher}</p>
      <p><strong>Customer:</strong> ${order.customer}</p>
      <p><strong>Address:</strong> ${order.address}</p>
      <ul class="list-disc pl-5 mt-2">${itemsList}</ul>
    `;

    ordersContainer.appendChild(div);
  });
}

function logout() {
  localStorage.removeItem("customerLoggedIn");
  window.location.href = "customer-login.html";
}
