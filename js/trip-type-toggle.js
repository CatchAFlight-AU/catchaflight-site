// JavaScript module: 02 Trip Type Toggle
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Initializing Trip Type Functionality...");

  setTimeout(() => {
    const tripSelect = document.querySelector(".trip-select");
    const returningField = document.querySelector(".dates .form-field:last-child");

    console.log("🟢 tripSelect:", tripSelect);
    console.log("🟢 returningField:", returningField);

    if (!tripSelect || !returningField) {
      console.error("❌ Trip type elements not found! Retrying...");
      setTimeout(() => document.dispatchEvent(new Event("DOMContentLoaded")), 100);
      return;
    }

    // ✅ Toggle return date visibility based on trip type
    tripSelect.addEventListener("change", () => {
      if (tripSelect.value === "one-way") {
        returningField.style.display = "none";
        console.log("✅ One-Way selected → Hiding return date.");
      } else {
        returningField.style.display = "block";
        console.log("✅ Round-Trip selected → Showing return date.");
      }
    });

    console.log("✅ Trip Type Functionality Initialized Successfully!");
  }, 150);
});
