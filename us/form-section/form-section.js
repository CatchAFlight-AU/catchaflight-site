document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Form script loaded");

  const form = document.getElementById("flight-form");
  const nextBtn1 = document.getElementById("next-step-1");
  const nextBtn2 = document.getElementById("next-step-2");

  function addSafeListener(element, event, handler) {
    if (element) element.addEventListener(event, handler);
  }

  // Step 1 → Step 2
  addSafeListener(nextBtn1, "click", (e) => {
    e.preventDefault();

    const from = document.querySelector('[data-airport="from"]')?.value.trim();
    const to = document.querySelector('[data-airport="to"]')?.value.trim();
    const adults = +document.getElementById("adults").value || 0;
    const children = +document.getElementById("children").value || 0;
    const infants = +document.getElementById("infants").value || 0;

    if (!from || !to) {
      alert("Please enter both origin and destination airports.");
      return;
    }

    if (adults + children + infants > 9) {
      alert("Total passengers cannot exceed 9.");
      return;
    }

    document.getElementById("step-1").style.display = "none";
    document.getElementById("step-2").style.display = "block";
  });

  // Step 2 → Step 3
  addSafeListener(nextBtn2, "click", (e) => {
    e.preventDefault();

    const departDate = document.getElementById("depart-date").value;
    const returnDate = document.getElementById("return-date").value;
    const tripType = document.getElementById("trip-type").value;

    if (!departDate) {
      alert("Please select your departure date.");
      return;
    }

    if (tripType === "round" && !returnDate) {
      alert("Please select your return date.");
      return;
    }

    document.getElementById("step-2").style.display = "none";
    document.getElementById("step-3").style.display = "block";
  });

  // Final Submit
  addSafeListener(form, "submit", (e) => {
    const name = document.getElementById("contact-name").value.trim();
    const phone = document.getElementById("contact-phone").value.trim();
    const email = document.getElementById("contact-email").value.trim();

    if (!name || !phone || !email) {
      alert("Please fill in all contact details.");
      e.preventDefault();
      return;
    }

    const fromIATA = document.querySelector('[data-airport="from"]')?.dataset.iata || "";
    const toIATA = document.querySelector('[data-airport="to"]')?.dataset.iata || "";

    document.getElementById("from-iata").value = fromIATA;
    document.getElementById("to-iata").value = toIATA;

    console.log("Form submitting with:");
    console.log("From IATA:", fromIATA, "To IATA:", toIATA);
    console.log("Name:", name, "Phone:", phone, "Email:", email);
  });
});
