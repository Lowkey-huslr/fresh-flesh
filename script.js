// File: script.js

document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/products")
    .then((res) => res.json())
    .then((products) => {
      const productContainer = document.getElementById("product-list");

      products.forEach((product) => {
        const div = document.createElement("div");
        div.className = "border p-4 rounded shadow mb-4 bg-white";

        div.innerHTML = `
          <h3 class="text-xl font-bold mb-2">${product.name}</h3>
          <p class="mb-2">Price: ₹${product.price}/kg</p>
          <input 
            type="number" 
            min="0.25" 
            step="0.25" 
            value="1" 
            class="quantity-input border px-2 py-1 rounded w-24"
          />
          <button 
            class="add-to-cart bg-green-600 text-white px-4 py-2 rounded ml-2 hover:bg-green-700">
            Add to Cart
          </button>
        `;

        productContainer.appendChild(div);

        const addButton = div.querySelector(".add-to-cart");
        const quantityInput = div.querySelector(".quantity-input");

        addButton.addEventListener("click", () => {
          const quantity = parseFloat(quantityInput.value);
          if (isNaN(quantity) || quantity <= 0) {
            alert("Please enter a valid quantity.");
            return;
          }

          const cart = JSON.parse(localStorage.getItem("cart") || "[]");
          cart.push({
            name: product.name,
            price: product.price,
            quantity,
          });
          localStorage.setItem("cart", JSON.stringify(cart));

          alert(`${product.name} (${quantity}kg) added to cart!`);
          // ✅ Fix: Navigate to cart page properly
          window.location.href = "cart.html";
        });
      });
    })
    .catch((err) => {
      console.error("❌ Failed to load products:", err);
    });
});
