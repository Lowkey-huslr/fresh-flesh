// File: butcher.js

let generatedOTP = "";
let butcherMobile = "";

// Step 1: Send OTP
function sendOTP() {
  const mobile = "+91" + document.getElementById("mobile").value.trim();


  // Validate format: must start with +91 followed by 10 digits
  if (!/^\+91\d{10}$/.test(mobile)) {
    alert("Please enter a valid mobile number in +91XXXXXXXXXX format.");
    return;
  }

  generatedOTP = generateOTP();
  butcherMobile = mobile;

  document.getElementById("step-1").classList.add("hidden");
  document.getElementById("step-2").classList.remove("hidden");
  document.getElementById("display-otp").textContent = generatedOTP;
}

// Step 2: Verify OTP
function verifyOTP() {
  const userInput = document.getElementById("otp-input").value.trim();

  if (userInput === generatedOTP) {
    document.getElementById("step-2").classList.add("hidden");
    document.getElementById("step-3").classList.remove("hidden");
  } else {
    alert("❌ Incorrect OTP. Please try again.");
  }
}

// Resend OTP
function resendOTP() {
  generatedOTP = generateOTP();
  document.getElementById("display-otp").textContent = generatedOTP;
  alert("🔄 New OTP generated.");
}

// Generate a 4-digit OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Step 3: Complete Registration
function completeRegistration() {
  const name = document.getElementById("butcher-name").value.trim();
  const password = document.getElementById("butcher-password").value.trim();

  if (!name || !password) {
    alert("Please enter shop name and password.");
    return;
  }

  const butchers = JSON.parse(localStorage.getItem("butchers") || "[]");

  const exists = butchers.find(b => b.mobile === butcherMobile);
  if (exists) {
    alert("Mobile number already registered. Try logging in.");
    return;
  }

  butchers.push({ mobile: butcherMobile, name, password });
  localStorage.setItem("butchers", JSON.stringify(butchers));

  localStorage.setItem("butcherLoggedIn", JSON.stringify({ mobile: butcherMobile, name }));

  document.getElementById("step-3").classList.add("hidden");
  document.getElementById("success-msg").classList.remove("hidden");

  setTimeout(() => {
    window.location.href = "butcher-dashboard.html";
  }, 1500);
}
