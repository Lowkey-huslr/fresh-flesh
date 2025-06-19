// File: customer-login.js

function customerLogin() {
  const mobile = document.getElementById("customer-mobile").value.trim();
  
  if (!/^\d{10}$/.test(mobile)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  // Save to localStorage
  localStorage.setItem("customerLoggedIn", "+91" + mobile);
  
  // Redirect
  window.location.href = "customer-orders.html";
}
