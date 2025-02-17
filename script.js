if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker registrado com sucesso.'))
        .catch(err => console.error('Erro ao registrar o Service Worker:', err));
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(() => {
        console.log("Service Worker registrado com sucesso.");
    }).catch(error => {
        console.error("Falha ao registrar o Service Worker:", error);
    });
}



let map;
let markersGroup;
let userMarker;

function updateUserLocation(lat, lng) {
    if (userMarker) {
        userMarker.setLatLng([lat, lng]); // Atualiza o marcador existente
    } else {
        const customIcon = L.divIcon({
            className: 'current-location-marker',
            iconSize: [20, 20]
        });
        userMarker = L.marker([lat, lng], { icon: customIcon })
            .addTo(map)
            .bindPopup("Você está aqui.")
            .openPopup();
    }
    map.setView([lat, lng], 15); // Centraliza no marcador
}

// Observe a localização do usuário em tempo real
navigator.geolocation.watchPosition(
    (position) => {
        const { latitude, longitude } = position.coords;
        updateUserLocation(latitude, longitude);
    },
    (error) => {
        console.error("Erro ao obter localização:", error);
    },
    { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
);

// Função para inicializar o mapa
function initializeMap() {
    map = L.map('map');

    // Camada de tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Inicializar o grupo de marcadores
    markersGroup = L.featureGroup().addTo(map);
}

// Função para adicionar marcador ao grupo
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
    markersGroup.addLayer(marker); // Adiciona o marcador ao grupo
}

// Função para processar as coordenadas
function parseCoordinates(coordString) {
    const [lat, lng] = coordString.split(',').map(Number);
    return { lat, lng };
}

// Carregar marcadores do array
function loadMarkers() {
    const locations = [
        
         {coords: "-11.404147, -38.254300", name: "Albertina Santana Do Nascimento", whatsapp: "5575999200083", color: 'green'},
         {coords: "-11.406436, -38.170513", name: "Iara Crispim De Santana", whatsapp: "5575999371613", color: 'green'},
         {coords: "-11.4111188,-38.1751998", name: "Rosilene De Souza Santana", whatsapp: "5575997019398", color: 'green'},
         {coords: "-11.432682, -38.244623", name: "Rodrigo Souza Dos Reis", whatsapp: "5575997154296", color: 'green'},
         {coords: "-11.4451983,-38.213675", name: "Jose Anildo De Souza Jesus", whatsapp: "5575999253417", color: 'green'},
         {coords: "-11.447317, -38.215567", name: "Maria Pereira De Souza", whatsapp: "5575998795817", color: 'green'},
         {coords: "-11.4671998,-38.1427117", name: "Mariane Rodrigues De Carvalho", whatsapp: "5575997040995", color: 'green'},
         {coords: "-11.470030, -38.141071", name: "Josefa Maria Francisca Dos Santos", whatsapp: "5575991436538", color: 'green'},
         {coords: "-11.478733, -38.201460", name: "Josefa Maria Mendes De Araujo", whatsapp: "5571999869043", color: 'green'},
         {coords: "-11.504669, -38.155945", name: "Cristina Damiana Dantas Da Silva", whatsapp: "5575997095764", color: 'green'},
         {coords: "-11.512992, -38.151506", name: "Ivanira De Souza Monte", whatsapp: "5575998283775", color: 'green'},
         {coords: "-11.513124, -38.150485", name: "Maria Elizabete Paulo Dos Santos", whatsapp: "5575999448124", color: 'green'},
         {coords: "-11.518164, -38.156283", name: "Damiao Morais Da Silva", whatsapp: "5575998331134", color: 'green'},
         {coords: "-11.530587, -38.139527", name: "Cristiane Oliveira Da Paixao", whatsapp: "5575999650224", color: 'green'},
         {coords: "-11.612222,-38.2193925", name: "Elenilda Maria De Souza", whatsapp: "5575999848734", color: 'green'},
         {coords: "-11.651715, -38.063605", name: "Geovana De Souza Anjinho", whatsapp: "5575999014763", color: 'green'},
         {coords: "-11.652791, -38.149528", name: "Francisco Goncalves Dantas", whatsapp: "5575999506787", color: 'green'},
         {coords: "-11.656149, -38.073331", name: "Antonio Cesar Pereira Santos", whatsapp: "5575999613757", color: 'green'},
         {coords: "-11.659697, -38.272396", name: "Josival Rodrigues Da Silva", whatsapp: "5511948850887", color: 'green'},
         {coords: "-11.666497, -38.085366", name: "Andrea Conceicao De Jesus", whatsapp: "5575999117361", color: 'green'},
         {coords: "-11.700743, -38.267406", name: "Jose Roberto Dos Santos", whatsapp: "5575991226123", color: 'green'},
         {coords: "-11.716635, -38.227237", name: "Maria Do Carmo Dos Santos", whatsapp: "5575998457619", color: 'green'},
         {coords: "-11.734710, -38.161572", name: "Jose Carlos Da Silva", whatsapp: "5575991328174", color: 'green'},
         {coords: "-11.753687, -38.152508", name: "Amanda De Oliveira Vasconcelos", whatsapp: "5575991872876", color: 'green'},
         {coords: "-11.815927, -38.272162", name: "Adenise Conceicao Da Silva", whatsapp: "5575998033786", color: 'green'},
         {coords: "-11.961993,-40.170555", name: "Leila Oliveira De Souza", whatsapp: "5574999781247", color: 'green'},

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

// Inicializar e ajustar o mapa
function adjustMapView() {
    if (markersGroup.getBounds().isValid()) {
        map.fitBounds(markersGroup.getBounds());
    }
}

// Função para atualizar a posição do marcador do usuário em tempo real
function updateUserLocation(lat, lng) {
    if (userMarker) {
        // Se o marcador já existe, apenas atualiza a posição
        userMarker.setLatLng([lat, lng]);
    } else {
        // Caso contrário, cria um novo marcador para a localização
        const customIcon = L.divIcon({
            className: 'current-location-marker',
            iconSize: [20, 20]
        });

        userMarker = L.marker([lat, lng], { icon: customIcon })
            .addTo(markersGroup)
            .bindPopup("Você está aqui.")
            .openPopup();
    }
    // Ajusta a visão do mapa para o marcador
    // map.setView([lat, lng], 15); 
}

// Tentar obter localização atual e ativar a atualização em tempo real
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;

            initializeMap();

            // Adicionar marcador de localização atual
            updateUserLocation(latitude, longitude);

            // Carregar marcadores do array
            loadMarkers();

            // Ajustar visão geral
            adjustMapView();

            // Iniciar atualização em tempo real
            navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    updateUserLocation(latitude, longitude);
                },
                (error) => {
                    console.error("Erro ao obter localização em tempo real:", error);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 10000,
                    timeout: 5000
                }
            );
        },
        (error) => {
            console.error("Erro ao obter localização atual:", error);

            initializeMap();

            // Carregar marcadores do array
            loadMarkers();

            // Ajustar visão geral
            adjustMapView();
        }
    );
} else {
    alert("Geolocalização não é suportada pelo navegador.");
    initializeMap();
    loadMarkers();
    adjustMapView();
}
