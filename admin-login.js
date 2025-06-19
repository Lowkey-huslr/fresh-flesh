// File: admin-login.js

document.getElementById("admin-login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("admin-username").value.trim();
  const password = document.getElementById("admin-password").value.trim();

  // Hardcoded admin credentials
  if (username === "admin" && password === "flesh123") {
    localStorage.setItem("adminLoggedIn", "true");
    window.location.href = "admin-dashboard.html";
  } else {
    document.getElementById("admin-error").classList.remove("hidden");
  }
});
