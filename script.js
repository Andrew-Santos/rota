let map;
let markersGroup;
let userMarker;

// Verifica a conectividade com a internet
function isOnline() {
    return window.navigator.onLine;
}

// Inicializa o mapa
function initializeMap() {
    map = L.map('map');
    const tileLayerURL = isOnline()
        ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        : './tiles/{z}/{x}/{y}.png'; // Fallback para tiles locais

    L.tileLayer(tileLayerURL, {
        maxZoom: 18,
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    markersGroup = L.featureGroup().addTo(map);
}

// Adiciona marcadores personalizados
function addCustomMarker(lat, lng, popupText, whatsappNumber, iconUrl) {
    const popupContent = `
        <div>
            <p><strong>${popupText}</strong></p>
            <p>${lat.toFixed(6)}, ${lng.toFixed(6)}</p>
            <a href="https://wa.me/${whatsappNumber}" target="_blank">WhatsApp: ${whatsappNumber}</a>
        </div>
    `;

    const icon = L.icon({
        iconUrl: iconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });

    const marker = L.marker([lat, lng], { icon }).bindPopup(popupContent);
    markersGroup.addLayer(marker);
}

// Carrega os marcadores
function loadMarkers() {
    const locations = [
        { coords: "-10.7455323,-40.133743", name: "Adeilda Ferreira Silva", whatsapp: "5574999692974", color: 'green' },
        { coords: "-10.7426642,-40.1266351", name: "Aldione Pereira Lopes", whatsapp: "5574999285354", color: 'green' },
        // Adicione mais marcadores aqui
    ];

    locations.forEach(location => {
        const [lat, lng] = location.coords.split(',').map(Number);
        const iconUrl = `marker_${location.color}.png`;
        addCustomMarker(lat, lng, location.name, location.whatsapp, iconUrl);
    });
}

// Ajusta a visão do mapa
function adjustMapView() {
    if (markersGroup.getBounds().isValid()) {
        map.fitBounds(markersGroup.getBounds());
    }
}

// Atualiza a localização do usuário
function updateUserLocation(lat, lng) {
    if (!userMarker) {
        userMarker = L.marker([lat, lng], { icon: L.divIcon({ className: 'current-location-marker' }) });
        userMarker.addTo(map).bindPopup('Você está aqui.').openPopup();
    } else {
        userMarker.setLatLng([lat, lng]);
    }
}

// Inicializa a aplicação
function initApp() {
    initializeMap();
    loadMarkers();
    adjustMapView();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                updateUserLocation(latitude, longitude);
            },
            (err) => console.error('Erro ao obter localização:', err),
            { enableHighAccuracy: true }
        );
    }
}

// Registra o Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(() => console.log('Service Worker registrado com sucesso.'))
        .catch((err) => console.error('Erro ao registrar o Service Worker:', err));
}

initApp();
