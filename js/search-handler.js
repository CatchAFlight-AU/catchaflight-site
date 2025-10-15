function handleFlightSearch() {
  const buttons = document.querySelectorAll(".search-button");

  buttons.forEach(button => {
    // Skip the enquiry button
    if (button.id === "submit-enquiry-btn") return;

    button.addEventListener("click", () => {
      const fromCode = fromInput?.getAttribute("data-iata");
      const toCode = toInput?.getAttribute("data-iata");

      if (!fromCode || !toCode || !validatePassengers()) return;

      const searchUrl = new URL("https://catchaflight.golibe.com/results");
      searchUrl.searchParams.set("from", fromCode);
      searchUrl.searchParams.set("to", toCode);
      searchUrl.searchParams.set("departureDate", departingInput.value);

      if (tripSelect?.value === "round") {
        searchUrl.searchParams.set("returnDate", returningInput.value);
      }

      const classMap = {
        "economy": "ECO",
        "premium-economy": "PRE",
        "business": "BUS",
        "first": "1ST"
      };

      const selectedClass = classSelect?.value.toLowerCase() || "economy";
      searchUrl.searchParams.set("ADT", adultInput?.value || 1);
      searchUrl.searchParams.set("CHD", childInput?.value || 0);
      searchUrl.searchParams.set("INF", infantInput?.value || 0);
      searchUrl.searchParams.set("flightClass", classMap[selectedClass] || "ECO");
      searchUrl.searchParams.set("toleranceDays", flexibilityInput?.value || 0);

      window.location.href = searchUrl.toString();
    });
  });
}

document.addEventListener("DOMContentLoaded", handleFlightSearch);
