const checkoutBtn = document.getElementById("checkoutBtn");
const seatElements = document.querySelectorAll(".seat");
const billSeats = document.getElementById("billSeats");
const billSubtotal = document.getElementById("billSubtotal");
const billTax = document.getElementById("billTax");
const billTotal = document.getElementById("billTotal");
const confirmBooking = document.getElementById("confirmBooking");

// New: Date & Time elements
const billDate = document.getElementById("billDate");
const billTime = document.getElementById("billTime");

let selectedSeats = [];

// Handle seat click
seatElements.forEach(seat => {
  seat.addEventListener("click", () => {
    if (seat.classList.contains("booked")) return;

    seat.classList.toggle("selected");
    const seatName = seat.getAttribute("data-seat");
    const seatPrice = parseInt(seat.getAttribute("data-price")) || 0;

    if (seat.classList.contains("selected")) {
      selectedSeats.push({ name: seatName, price: seatPrice });
    } else {
      selectedSeats = selectedSeats.filter(s => s.name !== seatName);
    }

    updateBill(); // 🔥 Update bill instantly
  });
});

// Update bill dynamically
function updateBill() {
  billSeats.innerHTML = "";
  let subtotal = 0;

  selectedSeats.forEach(s => {
    subtotal += s.price;
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.innerHTML = `${s.name} <span>₹${s.price}</span>`;
    billSeats.appendChild(li);
  });

  let tax = Math.round(subtotal * 0.18);
  let total = subtotal + tax;

  billSubtotal.textContent = `₹${subtotal}`;
  billTax.textContent = `₹${tax}`;
  billTotal.textContent = `₹${total}`;

  // ✅ Add current date & time
  const now = new Date();
  billDate.textContent = now.toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });
  billTime.textContent = now.toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  });
}

// Checkout button → open offcanvas
checkoutBtn.addEventListener("click", () => {
  if (selectedSeats.length === 0) {
    alert("⚠️ Please select at least one seat!");
    return;
  }

  const offcanvas = new bootstrap.Offcanvas(document.getElementById("billOffcanvas"));
  offcanvas.show();

  updateBill(); // 🔥 Update date & time also when checkout
});

// Confirm booking
confirmBooking.addEventListener("click", () => {
  alert("✅ Booking Confirmed! Enjoy your movie 🍿🎬");

  // Reset seats
  selectedSeats = [];
  seatElements.forEach(seat => seat.classList.remove("selected"));
  updateBill();

  const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("billOffcanvas"));
  offcanvas.hide();
});
