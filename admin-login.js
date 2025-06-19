// File: admin-login.js

document.getElementById("admin-login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("admin-username").value.trim();
  const password = document.getElementById("admin-password").value.trim();

  // ✅ Your custom admin credentials
  if (username === "admin" && password === "flesh123") {
    // Save login session in localStorage
    localStorage.setItem("adminLoggedIn", "true");
    // Redirect to the admin dashboard
    window.location.href = "admin-dashboard.html"; // ✅ Match the correct file name
  } else {
    // Show error message
    document.getElementById("admin-login-error").classList.remove("hidden");
  }
});
