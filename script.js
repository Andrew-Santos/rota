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
         {coords: "-10.015900, -39.500813", name: "Indriane Souza Silva", whatsapp: "5511986345601", color: 'green'},
         {coords: "-10.0174785,-39.498699", name: "Edneide Cardoso Da Silva", whatsapp: "5574998089249", color: 'green'},
         {coords: "-10.079764, -39.551728", name: "Marluce Da Silva", whatsapp: "5574998096841", color: 'green'},
         {coords: "-10.093873, -39.631299", name: "Mariel Rodrigues Cardoso", whatsapp: "5574999509231", color: 'green'},
         {coords: "-10.228394, -39.376250", name: "Ana Lucia Da Silva Santos", whatsapp: "5575997058510", color: 'green'},
         {coords: "-10.289240,-39.539910", name: "Maria Das Gracas Ribeiro", whatsapp: "5575991693061", color: 'green'},
         {coords: "-10.439745, -39.331959", name: "Marilda Cardoso Batista", whatsapp: "5575992181642", color: 'green'},
         {coords: "-10.510550,-39.202200", name: "Ivan De Jesus Souza", whatsapp: "5574999033237", color: 'green'},
         {coords: "-10.547687, -39.339912", name: "Alberto Jeremias Dos Santos", whatsapp: "5575999090484", color: 'green'},
         {coords: "-10.563999, -39.253835", name: "Maria Jose Matos De Souza", whatsapp: "5575998969370", color: 'green'},
         {coords: "-9.629348, -39.362435", name: "Jocilene Dias Cardoso", whatsapp: "5575999340808", color: 'green'},
         {coords: "-9.682930,-39.207470", name: "Manoel Gomes De Andrade", whatsapp: "5574999390102", color: 'green'},
         {coords: "-9.764406, -39.650505", name: "Tereza Barbosa De Almeida", whatsapp: "5574999833622", color: 'green'},
         {coords: "-9.810822, -39.488867", name: "Josilda Cardoso Da Silva", whatsapp: "5574999800267", color: 'green'},
         {coords: "-9.815251, -39.472195", name: "Ediane Calixto De Sena", whatsapp: "5574999110469", color: 'green'},
         {coords: "-9.8344699,-39.4880034", name: "Gilvaneide Santos Silva", whatsapp: "5574999954891", color: 'green'},
         {coords: "-9.884680, -39.591161", name: "Lourival De Souza Loiola", whatsapp: "5574999965564", color: 'green'},
         {coords: "-9.9882876,-39.5132807", name: "Diego Aleixo Da Silva", whatsapp: "5574998115205", color: 'green'},

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
