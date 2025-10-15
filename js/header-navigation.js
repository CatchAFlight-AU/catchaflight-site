// JavaScript module: 01 Header Navigation

document.addEventListener("headerLoaded", () => {
  console.log("✅ Header is now available, initializing navigation...");

  setTimeout(() => {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const dropdowns = document.querySelectorAll(".dropdown");

    console.log("🟢 navToggle:", navToggle);
    console.log("🟢 navMenu:", navMenu);
    console.log("🟢 dropdowns:", dropdowns);

    if (!navToggle || !navMenu || dropdowns.length === 0) {
      console.error("❌ Some elements not found! Retrying...");
      setTimeout(() => document.dispatchEvent(new Event("headerLoaded")), 100);
      return;
    }

    // ✅ Toggle Navigation Menu
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
      console.log("✅ Navigation menu toggled!");
    });

    // ✅ Handle Mobile Dropdowns
    dropdowns.forEach(dropdown => {
      const dropdownLink = dropdown.querySelector('a');

      if (window.innerWidth <= 768) {
        dropdownLink.addEventListener('click', (e) => {
          e.preventDefault();
          dropdown.classList.toggle('active');
        });
      }
    });

    console.log("✅ Navigation initialized successfully!");
  }, 150);
});
