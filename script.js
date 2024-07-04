var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Fetch location data from the server
fetch('/api/locations')
    .then(response => response.json())
    .then(data => {
        data.forEach(location => {
            L.marker([location.latitude, location.longitude]).addTo(map)
                .bindPopup(`<b>${location.name}</b><br>${location.description}`);
        });
    })
    .catch(error => console.error('Error fetching locations:', error));
