const flexibilityInput = document.querySelector('.flexibility-input');
const flexibilityLabel = document.querySelector('.flexibility-label');
const flexibilityMinus = flexibilityInput?.parentElement.querySelector('.minus');
const flexibilityPlus = flexibilityInput?.parentElement.querySelector('.plus');

const flexibilityLabels = ['No flexibility', '±1 day'];

function updateFlexibilityLabel() {
  const value = parseInt(flexibilityInput.value);
  flexibilityLabel.textContent = flexibilityLabels[value];
}

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

if (flexibilityInput) updateFlexibilityLabel();
