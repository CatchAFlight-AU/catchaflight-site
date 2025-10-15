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

      // Handle mobile dropdowns - FIXED: Only prevent default on dropdown toggle, not on links inside
dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('a');
    
    if (window.innerWidth <= 768) {
      // Only add click handler to the main dropdown link, not the entire dropdown
      dropdownLink.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
      });
    }
  });
  

      console.log("✅ Navigation initialized successfully!");
  }, 150);
});

//trip type functionality
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
//Enhanced Date picket functionality
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Initializing Enhanced Date Picker...");

  setTimeout(() => {
      const departingInput = document.querySelector(".dates .form-field:first-child input[type='date']");
      const returningInput = document.querySelector(".dates .form-field:last-child input[type='date']");

      console.log("🟢 departingInput:", departingInput);
      console.log("🟢 returningInput:", returningInput);

      if (!departingInput || !returningInput) {
          console.error("❌ Date picker elements not found! Retrying...");
          setTimeout(() => document.dispatchEvent(new Event("DOMContentLoaded")), 100);
          return;
      }

      // 🔥 **Set Initial Dates**
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);

      // 🔥 **Format Dates as YYYY-MM-DD**
      const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
      };

      // ✅ **Set Default Values**
      departingInput.min = formatDate(today);
      departingInput.value = formatDate(tomorrow);
      returningInput.value = formatDate(nextWeek);
      returningInput.min = formatDate(tomorrow);

      console.log(`📅 Setting Departing Date: ${departingInput.value}`);
      console.log(`📅 Setting Returning Date: ${returningInput.value}`);

      // 🛠 **Update return date constraints when departure date changes**
      departingInput.addEventListener("change", () => {
          const selectedDeparture = new Date(departingInput.value);
          const minReturn = new Date(selectedDeparture);
          minReturn.setDate(selectedDeparture.getDate() + 1);

          returningInput.min = formatDate(minReturn);

          // If the return date is before the new departure date, update it
          if (new Date(returningInput.value) < selectedDeparture) {
              returningInput.value = formatDate(minReturn);
              console.log(`⚠️ Adjusted Returning Date to: ${returningInput.value}`);
          }
      });

      console.log("✅ Enhanced Date Picker Initialized Successfully!");
  }, 150);
});
// Format dates as YYYY-MM-DD
// ✅ Function to format dates as YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits for month
  const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits for day
  return `${year}-${month}-${day}`;
};

// ✅ Example Usage:
const today = new Date();
console.log(`📅 Formatted Today: ${formatDate(today)}`);  // Should print something like "2025-02-27"

// ✅ Function to programmatically open the date picker
const openDatePicker = (input) => {
  const event = new MouseEvent("mousedown", {
      view: window,
      bubbles: true,
      cancelable: true
  });
  input.dispatchEvent(event);
};

// ✅ Add click handlers to date pickers
const departingWrapper = document.querySelector('.dates .form-field:first-child .input-wrapper');
const returningWrapper = document.querySelector('.dates .form-field:last-child .input-wrapper');
const departingInput = departingWrapper.querySelector("input[type='date']");
const returningInput = returningWrapper.querySelector("input[type='date']");

// ✅ Event listener to open departure date picker
departingWrapper.addEventListener("click", (e) => {
  if (e.target !== departingInput) {
      e.preventDefault();
      openDatePicker(departingInput);
  }
});

// ✅ Event listener to open return date picker (only if round trip is selected)
returningWrapper.addEventListener("click", (e) => {
  if (e.target !== returningInput && tripSelect.value !== "one-way") {
      e.preventDefault();
      openDatePicker(returningInput);
  }
});
const alternatingText = document.querySelector(".alternating-text");
const fallbackText = document.querySelector(".fallback-text");

const words = ["Flight", "Deal"];
const colors = ["#ff8709", "#0397cf"];
let currentIndex = 0;

const updateAlternatingText = () => {
    if (!alternatingText) return;
    alternatingText.textContent = words[currentIndex];
    alternatingText.style.color = colors[currentIndex];
    alternatingText.classList.add("fade-once");
    setTimeout(() => alternatingText.classList.remove("fade-once"), 3000);
    currentIndex = currentIndex === 0 ? 1 : 0;
};

const startAlternatingText = () => {
    if (fallbackText) fallbackText.style.display = "none";
    if (alternatingText) alternatingText.style.display = "inline";
    updateAlternatingText();
    setInterval(updateAlternatingText, 3000);
};

if ('PerformanceObserver' in window) {
    const po = new PerformanceObserver((entryList, observer) => {
        const entries = entryList.getEntries();
        for (const entry of entries) {
            if (entry.entryType === 'largest-contentful-paint') {
                startAlternatingText();
                observer.disconnect();
                break;
            }
        }
    });
    po.observe({ type: 'largest-contentful-paint', buffered: true });
} else {
    window.addEventListener("load", () => {
        setTimeout(startAlternatingText, 1000);
    });
}


// ✅ Airport Auto-Populate Functionality with Keyboard Navigation
const fromInput = document.querySelector('[data-airport="from"]');
const toInput = document.querySelector('[data-airport="to"]');

// ✅ Cache for airport data
let airportsData = null;

// ✅ Fetch airport data from an external source
async function fetchAirports() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/algolia/datasets/master/airports/airports.json");
        airportsData = await response.json();
        console.log("✅ Airports Data Loaded");
    } catch (error) {
        console.error("❌ Error Fetching Airports:", error);
        airportsData = [];
    }
}

// ✅ Call fetch function to load airports
fetchAirports();

// ✅ Function to create autocomplete dropdown with keyboard support
function createAutocomplete(input) {
    if (!input) return;

    const dropdown = document.createElement("div");
    dropdown.className = "autocomplete-dropdown";
    input.parentNode.appendChild(dropdown);

    let currentFocus = -1; // Tracks the selected suggestion index

    input.addEventListener("input", async () => {
        if (!airportsData) await fetchAirports(); // Fetch data if not already loaded

        const value = input.value.trim().toLowerCase();
        dropdown.innerHTML = "";
        currentFocus = -1; // Reset selection index

        if (value.length < 2) {
            dropdown.style.display = "none";
            return;
        }

        const results = airportsData
            .filter(airport =>
                airport.iata_code.toLowerCase().includes(value) ||
                airport.city.toLowerCase().includes(value) ||
                airport.name.toLowerCase().includes(value)
            )
            .slice(0, 5);

        results.forEach((airport, index) => {
            const item = document.createElement("div");
            item.className = "autocomplete-item";
            item.innerHTML = `<strong>${airport.iata_code}</strong> - ${airport.city}, ${airport.country}`;
            item.setAttribute("data-index", index);
            item.addEventListener("click", () => selectAirport(input, airport));
            dropdown.appendChild(item);
        });

        dropdown.style.display = results.length ? "block" : "none";
    });

    // ✅ Function to select an airport
    function selectAirport(input, airport) {
        input.value = `${airport.city} (${airport.iata_code})`;
        input.setAttribute("data-iata", airport.iata_code);
        dropdown.style.display = "none";
        currentFocus = -1;
    }

    // ✅ Function to add 'active' class to selected item
    function addActive() {
        const items = dropdown.getElementsByClassName("autocomplete-item");
        if (!items.length) return;
        removeActive();
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = items.length - 1;
        items[currentFocus].classList.add("active");
    }

    // ✅ Function to remove 'active' class from all items
    function removeActive() {
        const items = dropdown.getElementsByClassName("autocomplete-item");
        for (let item of items) {
            item.classList.remove("active");
        }
    }

    // ✅ Keyboard event listener for navigation
    input.addEventListener("keydown", (e) => {
        const items = dropdown.getElementsByClassName("autocomplete-item");

        if (dropdown.style.display === "block") {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                currentFocus++;
                addActive();
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                currentFocus--;
                addActive();
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (currentFocus > -1 && items[currentFocus]) {
                    selectAirport(input, airportsData.filter(airport =>
                        airport.iata_code.toLowerCase().includes(input.value.trim().toLowerCase()) ||
                        airport.city.toLowerCase().includes(input.value.trim().toLowerCase()) ||
                        airport.name.toLowerCase().includes(input.value.trim().toLowerCase())
                    )[currentFocus]);
                }
            } else if (e.key === "Escape") {
                dropdown.style.display = "none";
                currentFocus = -1;
            }
        }
    });

    // ✅ Hide dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = "none";
            currentFocus = -1;
        }
    });
}

// ✅ Apply autocomplete to both "from" and "to" fields
if (fromInput) createAutocomplete(fromInput);
if (toInput) createAutocomplete(toInput);

// ✅ Passenger Counter Functionality
const counters = document.querySelectorAll('.counter');
const adultInput = document.querySelector('[data-passenger="adult"]');
const childInput = document.querySelector('[data-passenger="child"]');
const infantInput = document.querySelector('[data-passenger="infant"]');
const searchButton = document.querySelector('.search-button');
const errorMessage = document.createElement('div');
errorMessage.className = 'error-message';

// ✅ Ensure the passengers field exists before appending the error message
const passengerFieldGroup = document.querySelector('.field-group.passengers');
if (passengerFieldGroup) {
    passengerFieldGroup.appendChild(errorMessage);
}

// ✅ Function to validate passenger count rules
function validatePassengers() {
    const adults = parseInt(adultInput.value) || 0;
    const children = parseInt(childInput.value) || 0;
    const infants = parseInt(infantInput.value) || 0;
    const total = adults + children + infants;

    // ✅ Reset error message and enable search button
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
    searchButton.disabled = false;

    // ❌ If total passengers exceed 9
    if (total > 9) {
        errorMessage.textContent = 'Total passengers cannot exceed 9';
        errorMessage.style.display = 'block';
        searchButton.disabled = true;
        return false;
    }

    // ❌ If infants outnumber adults
    if (infants > adults) {
        errorMessage.textContent = 'Number of infants cannot exceed number of adults';
        errorMessage.style.display = 'block';
        searchButton.disabled = true;
        return false;
    }

    // ❌ If no adult is present, but children or infants exist
    if (adults === 0 && (children > 0 || infants > 0)) {
        errorMessage.textContent = 'Children and infants cannot travel without an adult';
        errorMessage.style.display = 'block';
        searchButton.disabled = true;
        return false;
    }

    return true; // ✅ Valid passengers count
}

// ✅ Attach event listeners for passenger count buttons
counters.forEach(counter => {
    const minusBtn = counter.querySelector('.minus');
    const plusBtn = counter.querySelector('.plus');
    const input = counter.querySelector('input');

    minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(input.value);
        if (currentValue > parseInt(input.min)) {
            input.value = currentValue - 1;
            validatePassengers();
        }
    });

    plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(input.value);
        if (currentValue < parseInt(input.max)) {
            input.value = currentValue + 1;
            validatePassengers();
        }
    });

    // ✅ Prevent manual input of invalid values
    input.addEventListener('change', () => {
        const value = parseInt(input.value);
        const min = parseInt(input.min);
        const max = parseInt(input.max);
        
        if (value < min) input.value = min;
        if (value > max) input.value = max;
        if (isNaN(value)) input.value = min;
        validatePassengers();
    });
});

// ✅ Flexibility Counter Functionality
const flexibilityInput = document.querySelector('.flexibility-input');
const flexibilityLabel = document.querySelector('.flexibility-label');
const flexibilityMinus = flexibilityInput?.parentElement.querySelector('.minus');
const flexibilityPlus = flexibilityInput?.parentElement.querySelector('.plus');

const flexibilityLabels = ['No flexibility', '±1 day'];

// ✅ Function to update flexibility label
function updateFlexibilityLabel() {
    const value = parseInt(flexibilityInput.value);
    flexibilityLabel.textContent = flexibilityLabels[value];
}

// ✅ Attach event listeners for flexibility buttons (if they exist)
if (flexibilityMinus && flexibilityPlus) {
    flexibilityMinus.addEventListener('click', () => {
        const currentValue = parseInt(flexibilityInput.value);
        if (currentValue > 0) {
            flexibilityInput.value = currentValue - 1;
            updateFlexibilityLabel();
        }
    });

    flexibilityPlus.addEventListener('click', () => {
        const currentValue = parseInt(flexibilityInput.value);
        if (currentValue < 1) {
            flexibilityInput.value = currentValue + 1;
            updateFlexibilityLabel();
        }
    });
}

// ✅ Initial call to set flexibility label
if (flexibilityInput) updateFlexibilityLabel();
// ✅ Ensure tripSelect exists before using it
const tripSelect = document.querySelector(".trip-select");
if (!tripSelect) {
    console.error("❌ tripSelect NOT found! Ensure it exists in your HTML.");
}

// ✅ Ensure classSelect exists before using it
const classSelect = document.querySelector(".class-select");
if (!classSelect) {
    console.error("❌ classSelect NOT found! Ensure it exists in your HTML.");
}

// ✅ Ensure the search button exists before adding event listener
if (searchButton) {
    searchButton.addEventListener("click", () => {
        console.log("🔍 Search button clicked!");

        // ✅ Get airport codes
        const fromCode = fromInput ? fromInput.getAttribute("data-iata") : null;
        const toCode = toInput ? toInput.getAttribute("data-iata") : null;

        if (!fromCode) {
            alert("❌ Please select a valid departure airport");
            fromInput?.focus();
            return;
        }

        if (!toCode) {
            alert("❌ Please select a valid arrival airport");
            toInput?.focus();
            return;
        }

        // ✅ Get passenger counts
        const adultCount = parseInt(adultInput?.value) || 0;
        const childCount = parseInt(childInput?.value) || 0;
        const infantCount = parseInt(infantInput?.value) || 0;

        // ✅ Get flexibility option
        const flexibility = parseInt(flexibilityInput?.value) || 0;

        // ✅ Ensure all fields are valid before proceeding
        if (!validatePassengers()) {
            console.log("❌ Passenger validation failed!");
            return;
        }

        console.log("✅ Passenger validation successful!");

        // ✅ Build the search URL
        const searchUrl = new URL("https://catchaflight.golibe.com/results");
        searchUrl.searchParams.set("from", fromCode);
        searchUrl.searchParams.set("to", toCode);
        searchUrl.searchParams.set("departureDate", departingInput.value);

        // ✅ Ensure `tripSelect` exists before accessing its value
        if (tripSelect && tripSelect.value === "round") {
            searchUrl.searchParams.set("returnDate", returningInput.value);
        }

        // ✅ Map flight class values
        const classMapping = {
            "economy": "ECO",
            "premium-economy": "PRE",
            "business": "BUS",
            "first": "1ST"
        };

        const selectedClass = classSelect ? classSelect.value.toLowerCase() : "economy"; // Default to economy
        const flightClass = classMapping[selectedClass] || "ECO"; // Default to economy if not found

        console.log(`🛫 Captured Flight Class: ${selectedClass}`);
        console.log(`🎟️ Mapped Flight Class Code: ${flightClass}`);

        searchUrl.searchParams.set("ADT", adultCount);
        searchUrl.searchParams.set("CHD", childCount);
        searchUrl.searchParams.set("INF", infantCount);
        searchUrl.searchParams.set("flightClass", flightClass);
        searchUrl.searchParams.set("toleranceDays", flexibility);

        console.log("🌍 Redirecting to:", searchUrl.toString());

        // ✅ Redirect the user to the search results page
        window.location.href = searchUrl.toString();
    });
} else {
    console.warn("⚠️ Search button NOT found!");
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ JavaScript Loaded for Load More Buttons");

    /* ==============================
       🔹 Load More for Popular Deals
       ============================== */
    const loadMoreButton = document.querySelector(".load-more");
  const hiddenDeals = document.querySelectorAll(".popular-deals .deal-card.hidden");

  if (loadMoreButton) {
      loadMoreButton.addEventListener("click", function () {
          let count = 0;
          hiddenDeals.forEach(deal => {
              if (count < 3 && deal.classList.contains("hidden")) {
                  deal.classList.remove("hidden");
                  count++;
              }
          });

          // If no more hidden deals remain, hide the button
          if (document.querySelectorAll(".popular-deals .deal-card.hidden").length === 0) {
              loadMoreButton.style.display = "none";
          }
      });
  }

  const domesticLoadMoreButton = document.querySelector(".domestic-load-more");
    const hiddenDomesticDeals = document.querySelectorAll(".domestic-deals .deal-card.hidden");

    if (domesticLoadMoreButton) {
        console.log("Domestic Load More button found!"); // ✅ Debug check
        
        domesticLoadMoreButton.addEventListener("click", function () {
            console.log("Domestic Load More button clicked!"); // ✅ Debug check

            let count = 0;
            hiddenDomesticDeals.forEach(deal => {
                if (count < 3 && deal.classList.contains("hidden")) {
                    deal.classList.remove("hidden");
                    count++;
                }
            });

            // If no more hidden deals remain, hide the button
            if (document.querySelectorAll(".domestic-deals .deal-card.hidden").length === 0) {
                domesticLoadMoreButton.style.display = "none";
                console.log("All domestic deals are visible, hiding the button!"); // ✅ Debug log
            }
        });
    } else {
        console.log("Domestic Load More button NOT found!"); // ❌ If button is missing
    }
  const newsletterForm = document.querySelector(".newsletter-form");

  if (!newsletterForm) {
      console.error("❌ Newsletter form not found.");
      return;
  }

  newsletterForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent page reload

      const emailInput = newsletterForm.querySelector("input[type='email']");
      const email = emailInput.value.trim();

      // Validate email
      if (!validateEmail(email)) {
          alert("❌ Please enter a valid email address.");
          return;
      }

      // Disable button to prevent multiple clicks
      const submitButton = newsletterForm.querySelector("button");
      submitButton.disabled = true;
      submitButton.textContent = "Subscribing...";

      // Send email using FormSubmit (Change YOUR_EMAIL_HERE)
      fetch("https://formsubmit.co/support@catchaflight.com.au", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email })
      })
      .then(response => {
          if (!response.ok) throw new Error("Subscription failed. Please try again.");
          alert("✅ Subscription successful! Thank you for signing up.");
          emailInput.value = ""; // Clear input field
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
  
  //contact-form on contact page
  document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Thank you! Your message has been sent.");
});



if (indexLoadMoreButton) {
    indexLoadMoreButton.addEventListener("click", function () {
        indexHiddenDeals.forEach(deal => {
            if (deal.style.display === "none" || deal.style.display === "") {
                deal.style.display = "flex";
            } else {
                deal.style.display = "none";
            }
        });

        // Toggle button text
        this.innerText = this.innerText === "Load More" ? "Show Less" : "Load More";
    });
}


});

