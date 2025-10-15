// JavaScript module: 07 Load More Deals

function initializeLoadMore() {
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

      if (document.querySelectorAll(".popular-deals .deal-card.hidden").length === 0) {
        loadMoreButton.style.display = "none";
      }
    });
  }

  const domesticLoadMoreButton = document.querySelector(".domestic-load-more");
  const hiddenDomesticDeals = document.querySelectorAll(".domestic-deals .deal-card.hidden");

  if (domesticLoadMoreButton) {
    domesticLoadMoreButton.addEventListener("click", function () {
      let count = 0;
      hiddenDomesticDeals.forEach(deal => {
        if (count < 3 && deal.classList.contains("hidden")) {
          deal.classList.remove("hidden");
          count++;
        }
      });

      if (document.querySelectorAll(".domestic-deals .deal-card.hidden").length === 0) {
        domesticLoadMoreButton.style.display = "none";
      }
    });
  }
}

// ✅ Actually run the function when DOM is ready
document.addEventListener("DOMContentLoaded", initializeLoadMore);
