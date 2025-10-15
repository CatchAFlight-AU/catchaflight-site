// JavaScript module: 04 Alternating Text

function initializeAlternatingText() {
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

  if ("PerformanceObserver" in window) {
    const po = new PerformanceObserver((entryList, observer) => {
      const entries = entryList.getEntries();
      for (const entry of entries) {
        if (entry.entryType === "largest-contentful-paint") {
          startAlternatingText();
          observer.disconnect();
          break;
        }
      }
    });
    po.observe({ type: "largest-contentful-paint", buffered: true });
  } else {
    window.addEventListener("load", () => {
      setTimeout(startAlternatingText, 1000);
    });
  }
}

// ✅ Call on DOM ready
document.addEventListener("DOMContentLoaded", initializeAlternatingText);
