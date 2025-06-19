// File: script.js

const productList = document.getElementById("product-list");

fetch("http://localhost:5000/api/products")
  .then(res => res.json())
  .then(products => {
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "border rounded-lg p-4 shadow hover:shadow-lg transition";

      card.innerHTML = `
        <img src="https://via.placeholder.com/150" alt="${product.name}" class="w-full rounded mb-4">
        <h3 class="text-lg font-semibold">${product.name}</h3>
        <p class="text-gray-600 font-medium mb-2">₹${product.price}/kg</p>
        <button class="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 add-to-cart">
          Add to Cart
        </button>
      `;

      productList.appendChild(card);

      // Add to Cart button logic
      const addButton = card.querySelector(".add-to-cart");
      addButton.addEventListener("click", () => {
        addToCart(product);
      });
    });
  })
  .catch(error => {
    console.error("Error fetching products:", error);
    productList.innerHTML = `<p class="text-red-600 text-center">Failed to load products.</p>`;
  });


// Add to Cart function using localStorage
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if item already exists
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}
