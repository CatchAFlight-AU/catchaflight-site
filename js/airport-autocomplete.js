document.addEventListener("DOMContentLoaded", () => {
  const fromInput = document.querySelector('[data-airport="from"]');
  const toInput = document.querySelector('[data-airport="to"]');
  let airportsData = [];

  async function fetchAirports() {
    try {
      const response = await fetch("/data/airports.json");
      if (!response.ok) throw new Error("Airport data not found");

      const json = await response.json();
      airportsData = json.filter(
        airport => airport.iata_code && airport.city && airport.name
      );

      console.log("✅ Airports loaded:", airportsData.length);
    } catch (error) {
      console.error("❌ Failed to load airport.json:", error);
      airportsData = [];
    }
  }

  function createAutocomplete(input) {
    if (!input) return;

    const dropdown = document.createElement("div");
    dropdown.className = "autocomplete-dropdown";
    input.parentNode.appendChild(dropdown);

    let currentFocus = -1;

    input.addEventListener("input", () => {
      const value = input.value.trim().toLowerCase();
      dropdown.innerHTML = "";
      currentFocus = -1;

      if (value.length < 2 || airportsData.length === 0) {
        dropdown.style.display = "none";
        return;
      }

      const results = airportsData
        .filter(airport => {
          const iata = airport.iata_code?.toLowerCase() || "";
          const city = airport.city?.toLowerCase() || "";
          const name = airport.name?.toLowerCase() || "";

          return (
            iata.startsWith(value) ||
            city.startsWith(value) ||
            name.startsWith(value) ||
            iata.includes(value) ||
            city.includes(value) ||
            name.includes(value)
          );
        })
        .sort((a, b) => {
          const aMatch = a.iata_code.toLowerCase().startsWith(value) ? 1 : 0;
          const bMatch = b.iata_code.toLowerCase().startsWith(value) ? 1 : 0;
          return bMatch - aMatch;
        })
        .slice(0, 5);

      results.forEach(airport => {
        const item = document.createElement("div");
        item.className = "autocomplete-item";
        item.textContent = `${airport.city} (${airport.iata_code}) - ${airport.name}`;
        item.addEventListener("click", () => {
          input.value = `${airport.city} (${airport.iata_code})`;
          input.setAttribute("data-iata", airport.iata_code);
          dropdown.style.display = "none";
        });
        dropdown.appendChild(item);
      });

      dropdown.style.display = results.length ? "block" : "none";
    });

    input.addEventListener("keydown", (e) => {
      const items = dropdown.getElementsByClassName("autocomplete-item");
      if (!items.length) return;

      if (e.key === "ArrowDown") {
        currentFocus++;
        updateActive(items);
      } else if (e.key === "ArrowUp") {
        currentFocus--;
        updateActive(items);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (currentFocus > -1 && items[currentFocus]) {
          items[currentFocus].click();
        }
      } else if (e.key === "Escape") {
        dropdown.style.display = "none";
        currentFocus = -1;
      }
    });

    function updateActive(items) {
      [...items].forEach(item => item.classList.remove("active"));
      if (currentFocus >= items.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = items.length - 1;
      items[currentFocus].classList.add("active");
    }

    document.addEventListener("click", (e) => {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = "none";
        currentFocus = -1;
      }
    });
  }

  fetchAirports().then(() => {
    createAutocomplete(fromInput);
    createAutocomplete(toInput);
  });
});
