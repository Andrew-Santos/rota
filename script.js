let map;
let markersGroup;
let userMarker;

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
        {coords: "-11.076811, -38.644735", name: "Maria Giceli Da Conceicao", whatsapp: "5575992187075", color: 'green'},
        {coords: "-11.1027204,-38.7197327", name: "Jamile Miranda Do Nascimento", whatsapp: "5575991751825", color: 'green'},
        {coords: "-11.0623999,-38.8958385", name: "Maria Helena Souza Santos", whatsapp: "5575991621250", color: 'green'},
        {coords: "-10.9331603,-39.0353859", name: "Dara Santos Cosme", whatsapp: "5575992710137", color: 'green'},
        {coords: "-11.0156083,-38.98899", name: "Luciana Jesus Da Silva", whatsapp: "5575992649795", color: 'green'},
        {coords: "-10.9370599,-39.0467457", name: "Erica Matos Soares", whatsapp: "5575992102291", color: 'green'},
        {coords: "-10.9811224,-38.9321474", name: "Ivana Jesus Silva", whatsapp: "5575991170426", color: 'green'},
        {coords: "-11.0123388,-38.7569144", name: "Veronica Andrade Lima", whatsapp: "5575991750022", color: 'green'},
        {coords: "-10.8529043,-38.8895005", name: "Vanusa Jesus Pereira", whatsapp: "5575992883012", color: 'green'},
        {coords: "-10.9970314,-38.7632259", name: "Adriana Gonsalves Da Cruz", whatsapp: "5575991089145", color: 'green'},
        {coords: "-11.0633167,-38.7723733", name: "Gilmara Farias De Souza", whatsapp: "5575992938894", color: 'green'},
        {coords: "-11.0641497,-38.663744", name: "Maria Jose Santos De Jesus", whatsapp: "5575991700463", color: 'green'},
        {coords: "-11.1172724,-38.8060512", name: "Marinalva Sousa Santana", whatsapp: "5575992078857", color: 'green'},
        {coords: "-10.7409828,-38.8341876", name: "Josinete Andrade Silva", whatsapp: "5575991041586", color: 'green'},
        {coords: "-11.05971518298199,-38.91728298433505", name: "Juarez Carmo Matos", whatsapp: "5575992091146", color: 'green'},
        {coords: "-11.140223, -38.908538", name: "Valquiria De Jesus Lima", whatsapp: "5575991007497", color: 'green'},

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
    //map.setView([lat, lng], 15); // Ajusta a visão do mapa para o marcador
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
