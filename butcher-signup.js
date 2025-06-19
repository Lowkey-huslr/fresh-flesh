// File: butcher-signup.js

document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("signup-name").value.trim();
  const mobile = document.getElementById("signup-mobile").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  const butchers = JSON.parse(localStorage.getItem("butchers") || "[]");

  const alreadyExists = butchers.find(b => b.mobile === mobile);

  if (alreadyExists) {
    alert("❌ Butcher already registered with this number.");
    return;
  }

  butchers.push({ name, mobile, password });
  localStorage.setItem("butchers", JSON.stringify(butchers));

  alert("✅ Sign up successful! You can now login.");
  window.location.href = "butcher-login.html";
});
