// File: butcher-login.js

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const mobile = document.getElementById("login-mobile").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const butchers = JSON.parse(localStorage.getItem("butchers") || "[]");

  const found = butchers.find(b => b.mobile === mobile && b.password === password);

  if (found) {
    localStorage.setItem("butcherLoggedIn", JSON.stringify({
      mobile: found.mobile,
      name: found.name
    }));
    window.location.href = "butcher-dashboard.html";
  } else {
    document.getElementById("login-error").classList.remove("hidden");
  }
});
