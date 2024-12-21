let map;
let markersGroup;
let userMarker;

// Inicializa o mapa e verifica conectividade
function initializeMap() {
    map = L.map('map');

    // Verifica conectividade e escolhe a fonte dos tiles
    const tileLayer = navigator.onLine 
        ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' 
        : './tiles/{z}/{x}/{y}.png';

    // Configura a camada de tiles
    L.tileLayer(tileLayer, {
        maxZoom: 18,
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Inicializa o grupo de marcadores
    markersGroup = L.featureGroup().addTo(map);
}

// Adiciona um marcador ao grupo
function addCustomMarker(lat, lng, popupText, whatsappNumber, iconUrl) {
    const googleMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    const popupContent = `
        <div>
            <p><strong>${popupText}</strong></p>
            <p>${lat.toFixed(6)}, ${lng.toFixed(6)}</p>
            <div class="navigation-links">
                <a href="${googleMapsLink}" target="_blank">Abrir no Google Maps</a>
            </div>
            <a href="${whatsappLink}" target="_blank" class="whatsapp-link" title="Enviar pelo WhatsApp">${whatsappNumber} 
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png" alt="WhatsApp" width="20" height="20">
            </a>
        </div>
    `;

    const icon = L.icon({
        iconUrl: iconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [0, -41]
    });

    const marker = L.marker([lat, lng], { icon: icon }).bindPopup(popupContent);
    markersGroup.addLayer(marker);
}

// Processa coordenadas de string para objeto
function parseCoordinates(coordString) {
    const [lat, lng] = coordString.split(',').map(Number);
    return { lat, lng };
}

// Carrega marcadores de um array
function loadMarkers() {
    const locations = [
        { coords: "-10.7455323,-40.133743", name: "Adeilda Ferreira Silva", whatsapp: "5574999692974", color: 'green' },
        { coords: "-10.7426642,-40.1266351", name: "Aldione Pereira Lopes", whatsapp: "5574999285354", color: 'green' },
        // Outros marcadores...
    ];

    locations.forEach(location => {
        const { lat, lng } = parseCoordinates(location.coords);
        let iconUrl;
        switch (location.color) {
            case 'green': iconUrl = 'marker_green.png'; break;
            case 'blue': iconUrl = 'marker_blue.png'; break;
            case 'red': iconUrl = 'marker_red.png'; break;
            default: iconUrl = 'marker_blue.png';
        }
        addCustomMarker(lat, lng, location.name, location.whatsapp, iconUrl);
    });
}

// Ajusta a visão do mapa
function adjustMapView() {
    if (markersGroup.getBounds().isValid()) {
        map.fitBounds(markersGroup.getBounds());
    }
}

// Atualiza a posição do marcador do usuário
function updateUserLocation(lat, lng) {
    if (userMarker) {
        userMarker.setLatLng([lat, lng]);
    } else {
        const customIcon = L.divIcon({
            className: 'current-location-marker',
            iconSize: [20, 20]
        });

        userMarker = L.marker([lat, lng], { icon: customIcon })
            .addTo(markersGroup)
            .bindPopup("Você está aqui.")
            .openPopup();
    }
}

// Inicializa o mapa com localização do usuário
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;

            initializeMap();
            updateUserLocation(latitude, longitude);
            loadMarkers();
            adjustMapView();

            navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    updateUserLocation(latitude, longitude);
                },
                (error) => console.error("Erro ao obter localização em tempo real:", error),
                { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
            );
        },
        (error) => {
            console.error("Erro ao obter localização atual:", error);
            initializeMap();
            loadMarkers();
            adjustMapView();
        }
    );
} else {
    alert("Geolocalização não é suportada pelo navegador.");
    initializeMap();
    loadMarkers();
    adjustMapView();
}
