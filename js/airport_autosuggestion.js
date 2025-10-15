document.addEventListener('DOMContentLoaded', () => {
    const originInput = document.getElementById('origin-input');
    const destinationInput = document.getElementById('destination-input');
    const originSuggestions = document.getElementById('origin-suggestions');
    const destinationSuggestions = document.getElementById('destination-suggestions');

    let airports = [];

    fetch('data/airport.json')
        .then(res => res.json())
        .then(data => {
            airports = data;
        })
        .catch(err => console.error('Error loading airport data:', err));

    function showSuggestions(input, listElement) {
        const value = input.value.trim().toLowerCase();
        listElement.innerHTML = '';
        if (!value || value.length < 2) return;

        const matches = airports.filter(airport =>
            airport.code.toLowerCase().includes(value) ||
            airport.city.toLowerCase().includes(value) ||
            airport.name.toLowerCase().includes(value)
        ).slice(0, 8);

        matches.forEach(airport => {
            const item = document.createElement('div');
            item.classList.add('suggestion-item');
            item.textContent = `${airport.code} - ${airport.city}, ${airport.country}`;
            item.addEventListener('click', () => {
                input.value = airport.code;
                listElement.innerHTML = '';
            });
            listElement.appendChild(item);
        });
    }

    originInput.addEventListener('input', () => showSuggestions(originInput, originSuggestions));
    destinationInput.addEventListener('input', () => showSuggestions(destinationInput, destinationSuggestions));

    document.addEventListener('click', (e) => {
        if (!originSuggestions.contains(e.target)) originSuggestions.innerHTML = '';
        if (!destinationSuggestions.contains(e.target)) destinationSuggestions.innerHTML = '';
    });
});
