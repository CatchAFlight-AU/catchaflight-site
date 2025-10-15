document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.routes-carousel');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const cards = document.querySelectorAll('.route-card');
    const cardWidth = cards[0].offsetWidth;
    const margin = parseInt(window.getComputedStyle(cards[0]).marginRight);
    const scrollAmount = cardWidth + margin;
    let currentPosition = 0;
    const maxPosition = -(cards.length * scrollAmount - carousel.offsetWidth);

    // Next button click
    nextBtn.addEventListener('click', function() {
        currentPosition -= scrollAmount;
        if (currentPosition < maxPosition) {
            currentPosition = 0;
        }
        carousel.scrollTo({
            left: -currentPosition,
            behavior: 'smooth'
        });
    });

    // Previous button click
    prevBtn.addEventListener('click', function() {
        currentPosition += scrollAmount;
        if (currentPosition > 0) {
            currentPosition = maxPosition + scrollAmount;
        }
        carousel.scrollTo({
            left: -currentPosition,
            behavior: 'smooth'
        });
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left (next)
            nextBtn.click();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right (previous)
            prevBtn.click();
        }
    }
});