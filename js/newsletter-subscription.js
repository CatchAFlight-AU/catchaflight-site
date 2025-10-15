// JavaScript module: 08 Newsletter Subscription
function initializeNewsletterForm() {
  const newsletterForm = document.querySelector(".newsletter-form");

  if (!newsletterForm) return;

  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailInput = newsletterForm.querySelector("input[type='email']");
    const email = emailInput.value.trim();

    if (!validateEmail(email)) {
      alert("❌ Please enter a valid email address.");
      return;
    }

    const submitButton = newsletterForm.querySelector("button");
    submitButton.disabled = true;
    submitButton.textContent = "Subscribing...";

    fetch("https://formsubmit.co/support@catchaflight.com.au", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email })
    })
      .then(response => {
        if (!response.ok) throw new Error("Subscription failed. Please try again.");
        alert("✅ Subscription successful! Thank you for signing up.");
        emailInput.value = "";
      })
      .catch(error => alert(error.message))
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = "Subscribe";
      });
  });

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  initializeNewsletterForm();
});
