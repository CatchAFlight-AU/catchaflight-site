function handleEnquirySubmit() {
  const enquiryButton = document.getElementById("submit-enquiry-btn");
  const form = document.getElementById("search-form");

  if (!enquiryButton || !form) return;

  enquiryButton.addEventListener("click", (e) => {
    e.preventDefault();

    // Validate passenger logic first
    if (typeof validatePassengers === "function" && !validatePassengers()) return;

    // Get form field values
    const nameInput = form.querySelector('input[name="name"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    const emailInput = form.querySelector('input[name="email"]');

    const name = nameInput?.value.trim();
    const phone = phoneInput?.value.trim();
    const email = emailInput?.value.trim();

    // Basic validation
    if (!name || !phone || !email) {
      alert("⚠️ Please fill in all required fields: Name, Phone, and Email.");
      return;
    }

    // Optional: Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("⚠️ Please enter a valid email address.");
      return;
    }

    // Optional: Phone format check (basic)
    const phonePattern = /^[0-9+\-\s()]{6,}$/;
    if (!phonePattern.test(phone)) {
      alert("⚠️ Please enter a valid phone number.");
      return;
    }

    const formData = new FormData(form);

    enquiryButton.disabled = true;
    enquiryButton.textContent = "Submitting...";

    fetch("https://formspree.io/f/xldnlwav", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "https://www.catchaflight.com.au/thankyou.html";
        } else {
          alert("❌ Submission failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("❌ Form submission error:", error);
        alert("❌ Something went wrong. Please try again.");
      })
      .finally(() => {
        enquiryButton.disabled = false;
        enquiryButton.textContent = "Submit Enquiry";
      });
  });
}

document.addEventListener("DOMContentLoaded", handleEnquirySubmit);