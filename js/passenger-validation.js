// JavaScript module: 06 Passenger Validation
const counters = document.querySelectorAll('.counter');
const adultInput = document.querySelector('[data-passenger="adult"]');
const childInput = document.querySelector('[data-passenger="child"]');
const infantInput = document.querySelector('[data-passenger="infant"]');
const searchButton = document.querySelector('.search-button');
const errorMessage = document.createElement('div');
errorMessage.className = 'error-message';

const passengerFieldGroup = document.querySelector('.field-group.passengers');
if (passengerFieldGroup) {
  passengerFieldGroup.appendChild(errorMessage);
}

function validatePassengers() {
  const adults = parseInt(adultInput.value) || 0;
  const children = parseInt(childInput.value) || 0;
  const infants = parseInt(infantInput.value) || 0;
  const total = adults + children + infants;

  errorMessage.textContent = '';
  errorMessage.style.display = 'none';
  searchButton.disabled = false;

  if (total > 9) {
    errorMessage.textContent = 'Total passengers cannot exceed 9';
    errorMessage.style.display = 'block';
    searchButton.disabled = true;
    return false;
  }

  if (infants > adults) {
    errorMessage.textContent = 'Number of infants cannot exceed number of adults';
    errorMessage.style.display = 'block';
    searchButton.disabled = true;
    return false;
  }

  if (adults === 0 && (children > 0 || infants > 0)) {
    errorMessage.textContent = 'Children and infants cannot travel without an adult';
    errorMessage.style.display = 'block';
    searchButton.disabled = true;
    return false;
  }

  return true;
}

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
