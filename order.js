// File: order.js

const butcherSelect = document.getElementById("butcher-select");
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");

let selectedButcher = null;
let cart = [];

// Load butchers from localStorage
const butchers = JSON.parse(localStorage.getItem("butchers") || "[]");

butchers.forEach(b => {
  const option = document.createElement("option");
  option.value = b.mobile;
  option.textContent = b.name;
  butcherSelect.appendChild(option);
});

// When butcher is selected
butcherSelect.addEventListener("change", () => {
  selectedButcher = butcherSelect.value;
  loadProducts();
  cart = [];
  updateCartUI();
});

// Load products for selected butcher
function loadProducts() {
  const products = JSON.parse(localStorage.getItem(`products-${selectedButcher}`) || "[]");
  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML = `<p class="text-gray-500 col-span-3">No products available.</p>`;
    return;
  }

  products.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "border p-4 rounded shadow";

    card.innerHTML = `
      <h3 class="text-lg font-semibold">${p.meatName}</h3>
      <p class="text-gray-600">₹${p.meatPrice}/kg</p>
      <input type="number" id="qty-${i}" placeholder="Qty (kg)"
             class="w-full border px-2 py-1 rounded mt-2 mb-2" min="0.25" step="0.25" />
      <button onclick="addToCart('${p.meatName}', ${p.meatPrice}, ${i})"
              class="w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700">
        Add to Cart
      </button>
    `;

    productList.appendChild(card);
  });
}

// Add item to cart
function addToCart(name, price, index) {
  const qty = parseFloat(document.getElementById(`qty-${index}`).value);
  if (!qty || qty <= 0) return alert("Enter valid quantity (min 0.25 kg)");

  cart.push({ name, price, qty });
  updateCartUI();
}

// Update cart UI
function updateCartUI() {
  cartList.innerHTML = "";
  if (cart.length === 0) {
    cartList.innerHTML = `<li class="text-gray-600">Cart is empty.</li>`;
    return;
  }

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.qty}kg - ₹${(item.qty * item.price).toFixed(2)}`;
    cartList.appendChild(li);
  });
}

// Place order (proceed to payment)
function placeOrder() {
  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const address = document.getElementById("delivery-address").value.trim();

  if (!selectedButcher) return alert("Please select a butcher.");
  if (!name || !address || !phone) return alert("Please fill in all fields.");
  if (!/^\d{10}$/.test(phone)) return alert("Please enter a valid 10-digit phone number.");
  if (cart.length === 0) return alert("Your cart is empty.");

  const order = {
    customerName: name,
    phone,
    address,
    items: cart,
    butcherMobile: selectedButcher
  };

  // Save order temporarily for payment and confirmation
  localStorage.setItem("pendingOrder", JSON.stringify(order));

  // Redirect to payment
  window.location.href = "payment.html";
}
