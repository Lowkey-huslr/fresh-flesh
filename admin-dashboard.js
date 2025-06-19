// File: admin-dashboard.js

function loadButchers() {
  const list = document.getElementById("butcher-list");
  list.innerHTML = "";

  const butchers = JSON.parse(localStorage.getItem("butchers") || "[]");

  if (butchers.length === 0) {
    list.innerHTML = "<p class='text-center text-gray-500'>No butchers registered yet.</p>";
    return;
  }

  butchers.forEach((b, index) => {
    const div = document.createElement("div");
    div.className = "flex justify-between items-center border p-2 rounded mb-2 bg-white";

    div.innerHTML = `
      <div>
        <p class="font-semibold">${b.name}</p>
        <p class="text-sm text-gray-600">📱 ${b.mobile}</p>
      </div>
      <button onclick="deleteButcher(${index})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
    `;

    list.appendChild(div);
  });
}

function deleteButcher(index) {
  const butchers = JSON.parse(localStorage.getItem("butchers") || "[]");

  if (confirm(`Are you sure you want to remove ${butchers[index].name}?`)) {
    butchers.splice(index, 1);
    localStorage.setItem("butchers", JSON.stringify(butchers));
    loadButchers();
  }
}

// Load butchers when admin dashboard loads
window.addEventListener("DOMContentLoaded", loadButchers);
