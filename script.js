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
         {coords: "-10.699525, -40.202888", name: "Aldo Alipio De Andrade", whatsapp: "5574999212640", color: 'green'},
         {coords: "-10.7110838,-40.1645099", name: "Amos Dos Santos Silva", whatsapp: "5574999449893", color: 'green'},
         {coords: "-10.654979, -40.221685", name: "Catiane Oliveira Dos Santos", whatsapp: "5574999391769", color: 'green'},
         {coords: "-10.6505043,-40.2729803", name: "Jose De Jesus Claudio Pio", whatsapp: "5574991543777", color: 'green'},
         {coords: "-10.6505806,-40.2714501", name: "Samire Januario Dos Santos", whatsapp: "5574998029072", color: 'green'},
         {coords: "-10.6272639,-40.2674565", name: "Sandro Alberto Dias Pio", whatsapp: "5574999521532", color: 'green'},
         {coords: "-10.677781, -40.184684", name: "Tatiane Pires Da Silva Souza", whatsapp: "5574999532290", color: 'green'},
         {coords: "-11.081095, -40.078145", name: "Valdira Lima Dos Santos", whatsapp: "5574981478985", color: 'green'},
         {coords: "-10.661935, -40.139032", name: "Aldione Pereira Lopes", whatsapp: "5574999285354", color: 'green'},
         {coords: "-10.797732, -40.045934", name: "Alzina Alves Dos Santos", whatsapp: "5574999491790", color: 'green'},
         {coords: "-10.868275,-40.130455", name: "Devaneide De Jesus Ferreira", whatsapp: "5574981100732", color: 'green'},
         {coords: "-11.080261, -40.078164", name: "Edleusa Caraiba De Almeida", whatsapp: "5574981290768", color: 'green'},
         {coords: "-10.7573194,-40.0798433", name: "Elioneide Dos Santos De Jesus", whatsapp: "5574999873340", color: 'green'},
         {coords: "-10.710065,-40.025229", name: "Elissandra Cordeiro Da Silva", whatsapp: "5574999127567", color: 'green'},
         {coords: "-10.946660, -40.210356", name: "Janaine Dos Santos Pereira", whatsapp: "5574999949871", color: 'green'},
         {coords: "-10.7106696,-40.0246828", name: "Jesival Cordeiro Da Silva", whatsapp: "5574999421534", color: 'green'},
         {coords: "-10.699525, -40.202888", name: "Lucicleide Felix De Andrade", whatsapp: "5574999212640", color: 'green'},
         {coords: "-10.7167919,-40.0749984", name: "Manoel Messias Machado Da Silva", whatsapp: "5574999225934", color: 'green'},
         {coords: "-10.862159, -40.130448", name: "Maria Das Dores Da Silva Guimaraes", whatsapp: "5574981370428", color: 'green'},
         {coords: "-10.69311, -40.10422", name: "Maria Moura Ribeiro Da Silva", whatsapp: "5574998034364", color: 'red'},
         {coords: "-10.693110, -40.104226", name: "Raimundo Ferreira Da Silva", whatsapp: "5574999129258", color: 'red'},
         {coords: "-10.718781, -40.064879", name: "Rosangela Barbosa De Sousa", whatsapp: "5574999678416", color: 'green'},
         {coords: "-10.868114,-40.131019", name: "Sebastiana De Araujo", whatsapp: "5574981482219", color: 'green'},
         {coords: "-10.6240442,-40.0171033", name: "Suele Soares Dos Santos", whatsapp: "5574999886940", color: 'green'},
         {coords: "-10.740158, -40.138907", name: "Valdeci Vieira De Santana", whatsapp: "5574999823386", color: 'red'},
         {coords: "-10.7094555,-40.0258954", name: "Vanuzia Pereira Dos Santos", whatsapp: "5574999885096", color: 'green'},
         {coords: "-10.7114154,-40.0291343", name: "Zenilton Goncalves Da Silva", whatsapp: "5574999749819", color: 'green'},

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
