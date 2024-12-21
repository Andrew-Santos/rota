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
         {coords: "-10.7455323,-40.133743", name: "Adeilda Ferreira Silva", whatsapp: "5574999692974", color: 'green'},
         {coords: "-10.7426642,-40.1266351", name: "Aldione Pereira Lopes", whatsapp: "5574999285354", color: 'green'},
         {coords: "-10.699525, -40.202888", name: "Aldo Alipio De Andrade", whatsapp: "5574999212640", color: 'green'},
         {coords: "-10.797732, -40.045934", name: "Alzina Alves Dos Santos", whatsapp: "5574999491790", color: 'green'},
         {coords: "-10.7110838,-40.1645099", name: "Amos Dos Santos Silva", whatsapp: "5574999449893", color: 'green'},
         {coords: "-10.654979, -40.221685", name: "Catiane Oliveira Dos Santos", whatsapp: "5574999391769", color: 'green'},
         {coords: "-10.7144355,-40.0757781", name: "Daniel De Jesus Silva", whatsapp: "5574999998924", color: 'green'},
         {coords: "-10.7356367341432,-40.02884821037171", name: "Dasdina Peixe Da Silva", whatsapp: "5574999976260", color: 'green'},
         {coords: "-10.8404017,-40.1122028", name: "Edina Luciana Dos Santos", whatsapp: "557499891341", color: 'green'},
         {coords: "-10.7573194,-40.0798433", name: "Elioneide Dos Santos De Jesus", whatsapp: "5574999873340", color: 'green'},
         {coords: "-10.8400156,-40.1115611", name: "Gisele Santos De Carvalho", whatsapp: "5574981185919", color: 'green'},
         {coords: "-10.7437109,-40.128308", name: "Jailma Anacleto Da Silva", whatsapp: "5574999249307", color: 'green'},
         {coords: "-10.762375,-40.148235", name: "Jean Santos Da Silva", whatsapp: "5574999411784", color: 'green'},
         {coords: "-10.6505043,-40.2729803", name: "Jose De Jesus Claudio Pio", whatsapp: "5574991543777", color: 'green'},
         {coords: "-10.699525, -40.202888", name: "Lucicleide Felix De Andrade", whatsapp: "5574999212640", color: 'green'},
         {coords: "-10.736903, -40.123718", name: "Maria De Jesus Barboza", whatsapp: "5562998651713", color: 'green'},
         {coords: "-10.7483204,-40.1332201", name: "Micilene Viana Da Silva Barreto", whatsapp: "5574999105913", color: 'green'},
         {coords: "-10.697112,-40.086805", name: "Miguel Dias Dos Santos", whatsapp: "5574999070528", color: 'green'},
         {coords: "-10.7110053,-40.1262819", name: "Ozania Silva Costa Da Silva", whatsapp: "5574999585781", color: 'green'},
         {coords: "-10.711641,-40.1261426", name: "Rogesemi Mendes Da Silva", whatsapp: "5574998174242", color: 'green'},
         {coords: "-10.6505806,-40.2714501", name: "Samire Januario Dos Santos", whatsapp: "5574998029072", color: 'green'},
         {coords: "-10.6240442,-40.0171033", name: "Suele Soares Dos Santos", whatsapp: "5574999886940", color: 'green'},
         {coords: "-10.718211,-40.088367", name: "Tamires Do Nascimento Cruz", whatsapp: "5574998061636", color: 'green'},
         {coords: "-10.7506849,-40.12249", name: "Vera Bina Da Silva", whatsapp: "557481295534", color: 'green'},
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
