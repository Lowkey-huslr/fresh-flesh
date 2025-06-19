// File: order.js

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://freshflesh-backend.onrender.com/api/products")
    .then((res) => res.json())
    .then((meats) => {
      const container = document.getElementById("meat-list");
      meats.forEach((meat) => {
        const card = document.createElement("div");
        card.className = "bg-white p-4 rounded shadow-md";

        card.innerHTML = `
          <h3 class="text-xl font-semibold">${meat.name}</h3>
          <p class="text-gray-700">₹${meat.price}/kg</p>
          <input type="number" step="0.25" min="0.25" placeholder="Quantity (kg)" class="quantity-input border px-2 py-1 mt-2 w-full" id="qty-${meat.id}">
          <button onclick="addToCart(${meat.id}, '${meat.name}', ${meat.price})" class="bg-green-600 text-white px-4 py-2 mt-2 rounded w-full hover:bg-green-700">Add to Cart</button>
        `;
        container.appendChild(card);
      });
    });
});

function addToCart(id, name, price) {
  const qtyInput = document.getElementById(`qty-${id}`);
  const quantity = parseFloat(qtyInput.value);

  if (!quantity || quantity <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  cart.push({ id, name, price, quantity });
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(`${name} added to cart!`);
  window.location.href = "cart.html";
}
