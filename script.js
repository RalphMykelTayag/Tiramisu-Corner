// ===== Reveal Animations =====
const reveals = document.querySelectorAll(".reveal, .reveal-card");

function showVisibleElements() {
  const trigger = window.innerHeight * 0.85;

  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();

    if (document.body.scrollHeight <= window.innerHeight) {
      el.classList.add("visible");
      return;
    }

    if (rect.top < trigger) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", showVisibleElements);
window.addEventListener("load", showVisibleElements);


// ===== ORDER FORM RECEIPT SYSTEM =====
const form = document.querySelector("#orderForm");
const successOverlay = document.querySelector("#orderSuccess");
const receiptDetails = document.querySelector("#receiptDetails");

if (form && successOverlay && receiptDetails) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    // Get form data
    const data = new FormData(form);
    const name = data.get("name");
    const phone = data.get("phone");
    const flavor = data.get("flavor");
    const qty = parseInt(data.get("quantity")) || 0;
    const coffeeType = data.get("coffeeType");
    const coffeeQty = parseInt(data.get("coffeeQuantity")) || 0;
    const special = data.get("special") || "None";
    const option = data.get("option");
    const address = data.get("address") || "N/A";
    const date = data.get("date");
    const payment = data.get("payment");

    // Prices
    const prices = {
      "Classic Tiramisu": 150,
      "Chocolate Tiramisu": 160,
      "Matcha Tiramisu": 170,
      "Mango Tiramisu": 170,
      "Seasonal Specials": 180,
      "Espresso": 90,
      "Americano": 100,
      "Cappuccino": 120,
      "Caffè Latte": 120,
      "Mocha": 140,
      "Caramel Macchiato": 140,
      "Sea salt Latte": 130
    };

    // Calculate totals
    const flavorTotal = (prices[flavor] || 0) * qty;
    const coffeeTotal = (prices[coffeeType] || 0) * coffeeQty;
    const total = flavorTotal + coffeeTotal;
    const timestamp = new Date().toLocaleString();

    // Build receipt content
    receiptDetails.innerHTML = `
      <p><strong>Date & Time:</strong> ${timestamp}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Order Type:</strong> ${option}</p>
      ${option === "Delivery" ? `<p><strong>Address:</strong> ${address}</p>` : ""}
      <p><strong>Payment:</strong> ${payment}</p>
      <hr>
      <p><strong>${flavor}</strong> × ${qty} — ₱${flavorTotal.toLocaleString()}</p>
      ${coffeeType ? `<p><strong>${coffeeType}</strong> × ${coffeeQty} — ₱${coffeeTotal.toLocaleString()}</p>` : ""}
      <hr>
      <p class="total"><strong>Total:</strong> ₱${total.toLocaleString()}</p>
      ${special && special !== "None" ? `<p><strong>Special Request:</strong> ${special}</p>` : ""}
    `;

    // Show overlay
    successOverlay.classList.remove("hidden");

    // Animate checkmark
    const check = document.querySelector(".checkmark");
    if (check) check.classList.add("animate");

    // Reset form after submission
    form.reset();
  });
}

// ===== CLOSE SUCCESS POPUP =====
document.addEventListener("click", e => {
  if (e.target.id === "closeSuccess") {
    document.querySelector("#orderSuccess").classList.add("hidden");
  }
});

// ===== PRINT RECEIPT =====
document.addEventListener("click", e => {
  if (e.target.id === "printReceipt") {
    window.print();
  }
});

// ===== FOOTER YEAR =====
const yearEl = document.querySelector("#year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===== MOBILE NAV TOGGLE =====
const header = document.querySelector(".site-header .header-inner");
const nav = document.querySelector(".main-nav");

if (header && nav) {
  const btn = document.createElement("button");
  btn.className = "nav-toggle";
  btn.innerHTML = "☰";
  header.insertBefore(btn, nav);
  btn.addEventListener("click", () => nav.classList.toggle("active"));
}
