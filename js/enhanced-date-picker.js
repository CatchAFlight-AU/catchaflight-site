// JavaScript module: 03 Enhanced Date Picker
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Initializing Enhanced Date Picker...");

  setTimeout(() => {
    const departingInput = document.querySelector(".dates .form-field:first-child input[type='date']");
    const returningInput = document.querySelector(".dates .form-field:last-child input[type='date']");

    if (!departingInput || !returningInput) {
      console.error("❌ Date picker elements not found! Retrying...");
      setTimeout(() => document.dispatchEvent(new Event("DOMContentLoaded")), 100);
      return;
    }

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    departingInput.min = formatDate(today);
    departingInput.value = formatDate(tomorrow);
    returningInput.value = formatDate(nextWeek);
    returningInput.min = formatDate(tomorrow);

    departingInput.addEventListener("change", () => {
      const selectedDeparture = new Date(departingInput.value);
      const minReturn = new Date(selectedDeparture);
      minReturn.setDate(selectedDeparture.getDate() + 1);

      returningInput.min = formatDate(minReturn);

      if (new Date(returningInput.value) < selectedDeparture) {
        returningInput.value = formatDate(minReturn);
      }
    });

    console.log("✅ Enhanced Date Picker Initialized Successfully!");
  }, 150);
});
