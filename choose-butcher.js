// File: choose-butcher.js

const butcherListEl = document.getElementById("butcher-list");
const productSection = document.getElementById("product-section");
const selectedButcherName = document.getElementById("selected-butcher-name");
const productListEl = document.getElementById("product-list");

const butchers = []; // collect butcher names from localStorage

// Look through localStorage keys
for (let key in localStorage) {
  if (key.startsWith("products-")) {
    const name = key.split("products-")[1];
    if (!butchers.includes(name)) {
      butchers.push(name);
    }
  }
}

// Show list of butchers
butchers.forEach(name => {
  const div = document.createElement("div");
  div.className = "border p-4 rounded shadow flex justify-between items-center";

  div.innerHTML = `
    <div>
      <h3 class="text-lg font-semibold">${name}</h3>
      <p class="text-gray-600">Shop: ${getShopLocation(name)}</p>
    </div>
    <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onclick="viewProducts('${name}')">View Products</button>
  `;

  butcherListEl.appendChild(div);
});

// Helper: get butcher location
function getShopLocation(name) {
  const stored = localStorage.getItem("butcher");
  if (stored) {
    const current = JSON.parse(stored);
    if (current.name === name) return current.location;
  }

  return "Unknown Location";
}

// Show products of selected butcher
function viewProducts(name) {
  const products = JSON.parse(localStorage.getItem(`products-${name}`)) || [];
  selectedButcherName.textContent = `Products from ${name}`;
  productListEl.innerHTML = "";
  productSection.style.display = "block";

  if (products.length === 0) {
    productListEl.innerHTML = `<p class="text-gray-600 col-span-2">No products available.</p>`;
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "border p-4 rounded shadow";

    card.innerHTML = `
      <h4 class="text-lg font-semibold">${product.meatName}</h4>
      <p class="text-gray-600">₹${product.meatPrice}/kg</p>
    `;

    productListEl.appendChild(card);
  });
}
