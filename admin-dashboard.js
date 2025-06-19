// File: admin-dashboard.js

if (localStorage.getItem("adminLoggedIn") !== "true") {
  window.location.href = "admin-login.html";
}

const butchers = JSON.parse(localStorage.getItem("butchers") || "[]");
const summaryContainer = document.getElementById("butcher-sales");

butchers.forEach(butcher => {
  const orders = JSON.parse(localStorage.getItem(`orders-${butcher.mobile}`) || "[]");

  let totalOrders = orders.length;
  let totalQty = 0;

  orders.forEach(order => {
    order.items.forEach(item => {
      totalQty += parseFloat(item.qty);
    });
  });

  const div = document.createElement("div");
  div.className = "bg-white p-4 rounded shadow";

  div.innerHTML = `
    <h3 class="text-lg font-semibold mb-2">${butcher.name} (${butcher.mobile})</h3>
    <p>📦 Total Orders: <strong>${totalOrders}</strong></p>
    <p>🍖 Total Meat Sold: <strong>${totalQty} kg</strong></p>
  `;

  summaryContainer.appendChild(div);
});

// Logout
function logout() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin-login.html";
}
