// JavaScript module: 09 Contact Form

function initializeContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("✅ Thank you! Your message has been sent.");
  });
}

// ✅ Initialize after DOM is loaded
document.addEventListener("DOMContentLoaded", initializeContactForm);
