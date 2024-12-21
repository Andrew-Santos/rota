let map;
let markersGroup;
let userMarker;

// Verificar conectividade com a internet
function isOnline() {
    return navigator.onLine;
}

// Inicializar o mapa
function initializeMap(isCached = false) {
    map = L.map('map');

    if (isCached) {
        // Camada de tiles em cache (deve ser configurada previamente)
        L.tileLayer('./tiles/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data © OpenStreetMap contributors (Cache)'
        }).addTo(map);
    } else {
        // Camada de tiles online
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        }).addTo(map);
    }

    // Inicializar o grupo de marcadores
    markersGroup = L.featureGroup().addTo(map);
}

// Adicionar marcador personalizado
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

// Processar coordenadas
function parseCoordinates(coordString) {
    const [lat, lng] = coordString.split(',').map(Number);
    return { lat, lng };
}

// Carregar marcadores do array
function loadMarkers() {
    const locations = [
         {coords: "-10.7455323,-40.133743", name: "Adeilda Ferreira Silva", whatsapp: "5574999692974", color: 'green'},
         {coords: "-10.7426642,-40.1266351", name: "Aldione Pereira Lopes", whatsapp: "5574999285354", color: 'green'},
         {coords: "-10.7144355,-40.0757781", name: "Daniel De Jesus Silva", whatsapp: "5574999998924", color: 'green'},
         {coords: "-10.757302, -40.079825", name: "Elioneide Dos Santos De Jesus", whatsapp: "5574999873340", color: 'green'},
         {coords: "-10.7437109,-40.128308", name: "Jailma Anacleto Da Silva", whatsapp: "5574999249307", color: 'green'},
         {coords: "-10.6505043,-40.2729803", name: "Jose De Jesus Claudio Pio", whatsapp: "5574991543777", color: 'green'},
         {coords: "-10.736903, -40.123718", name: "Maria De Jesus Barboza", whatsapp: "5562998651713", color: 'green'},
         {coords: "-10.7110053,-40.1262819", name: "Ozania Silva Costa Da Silva", whatsapp: "5574999585781", color: 'green'},
         {coords: "-10.6240442,-40.0171033", name: "Suele Soares Dos Santos", whatsapp: "5574999886940", color: 'green'},
         {coords: "-10.718211,-40.088367", name: "Tamires Do Nascimento Cruz", whatsapp: "5574998061636", color: 'green'},
         {coords: "-10.7160923,-40.0433762", name: "Willian Da Silva Vitor", whatsapp: "5527996144049", color: 'green'},

    ];

    locations.forEach(location => {
        const { lat, lng } = parseCoordinates(location.coords);
        let iconUrl;
        switch (location.color) {
            case 'green':
                iconUrl = 'marker_green.png';
                break;
            case 'blue':
                iconUrl = 'marker_blue.png';
                break;
            case 'red':
                iconUrl = 'marker_red.png';
                break;
            default:
                iconUrl = 'marker_blue.png';
        }
        addCustomMarker(lat, lng, location.name, location.whatsapp, iconUrl);
    });
}

// Ajustar a visão do mapa
function adjustMapView() {
    if (markersGroup.getBounds().isValid()) {
        map.fitBounds(markersGroup.getBounds());
    }
}

// Atualizar posição do marcador do usuário
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

// Inicializar e configurar o mapa
function startMap() {
    const online = isOnline();
    initializeMap(!online);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                updateUserLocation(latitude, longitude);
                loadMarkers();
                adjustMapView();

                navigator.geolocation.watchPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        updateUserLocation(latitude, longitude);
                    },
                    (error) => {
                        console.error("Erro ao obter localização em tempo real:", error);
                    },
                    { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
                );
            },
            (error) => {
                console.error("Erro ao obter localização atual:", error);
                loadMarkers();
                adjustMapView();
            }
        );
    } else {
        alert("Geolocalização não é suportada pelo navegador.");
        loadMarkers();
        adjustMapView();
    }
}

// Ouvir eventos de alteração de conectividade
window.addEventListener('online', () => {
    alert("Conexão restaurada! Atualizando mapa...");
    startMap();
});

window.addEventListener('offline', () => {
    alert("Você está offline! Usando o mapa em cache.");
    startMap();
});

// Iniciar o mapa ao carregar a página
startMap();
