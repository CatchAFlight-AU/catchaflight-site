// Modal functionality
const modal = document.getElementById("bookingModal");
const span = document.getElementsByClassName("close")[0];

function showBookingModal(fareType) {
    document.getElementById("fareType").textContent = fareType;
    document.getElementById("formFareType").value = fareType;
    modal.style.display = "block";
    setTimeout(() => document.querySelector("#callback-form input").focus(), 100);
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Formspree submission
document.getElementById("callback-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert(`Thank you, ${this.name.value}! We'll call you shortly about JetBlue ${this.fare_type.value}.`);
            this.reset();
            modal.style.display = "none";
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        alert('Sorry, we couldn\'t process your request. Please call us directly at 1-800-555-1234.');
    })
    .finally(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    });
});