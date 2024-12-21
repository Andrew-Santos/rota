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
        https://wa.me/5574999285354?text=Ol%C3%A1%2C%20*Aldione Pereira Lopes*%20CPF%3A%20XXX.XXX.XXX-44.%20Sou%20o%20instalador%20da%20sua%20antena%20digital%2C%20preciso%20que%20me%20envie%20sua%20*LOCALIZA%C3%87%C3%83O*%20clicando%20no%20link%20abaixo%3A%0A%0Ahttps%3A%2F%2Fandrew-santos.github.io%2Flocal%2F%0A%0AProtocolo%3A 2026166238
        https://wa.me/5574999998924?text=Ol%C3%A1%2C%20*Daniel De Jesus Silva*%20CPF%3A%20XXX.XXX.XXX-39.%20Sou%20o%20instalador%20da%20sua%20antena%20digital%2C%20preciso%20que%20me%20envie%20sua%20*LOCALIZA%C3%87%C3%83O*%20clicando%20no%20link%20abaixo%3A%0A%0Ahttps%3A%2F%2Fandrew-santos.github.io%2Flocal%2F%0A%0AProtocolo%3A 2026144048
        https://wa.me/5574999873340?text=Ol%C3%A1%2C%20*Elioneide Dos Santos De Jesus*%20CPF%3A%20XXX.XXX.XXX-06.%20Sou%20o%20instalador%20da%20sua%20antena%20digital%2C%20preciso%20que%20me%20envie%20sua%20*LOCALIZA%C3%87%C3%83O*%20clicando%20no%20link%20abaixo%3A%0A%0Ahttps%3A%2F%2Fandrew-santos.github.io%2Flocal%2F%0A%0AProtocolo%3A 2026197047
        https://wa.me/5574999249307?text=Ol%C3%A1%2C%20*Jailma Anacleto Da Silva*%20CPF%3A%20XXX.XXX.XXX-89.%20Sou%20o%20instalador%20da%20sua%20antena%20digital%2C%20preciso%20que%20me%20envie%20sua%20*LOCALIZA%C3%87%C3%83O*%20clicando%20no%20link%20abaixo%3A%0A%0Ahttps%3A%2F%2Fandrew-santos.github.io%2Flocal%2F%0A%0AProtocolo%3A 2026218801
        https://wa.me/5574991543777?text=Ol%C3%A1%2C%20*Jose De Jesus Claudio Pio*%20CPF%3A%20XXX.XXX.XXX-97.%20Sou%20o%20instalador%20da%20sua%20antena%20digital%2C%20preciso%20que%20me%20envie%20sua%20*LOCALIZA%C3%87%C3%83O*%20clicando%20no%20link%20abaixo%3A%0A%0Ahttps%3A%2F%2Fandrew-santos.github.io%2Flocal%2F%0A%0AProtocolo%3A 2026215116
        https://wa.me/5574999585781?text=Ol%C3%A1%2C%20*Ozania Silva Costa Da Silva*%20CPF%3A%20XXX.XXX.XXX-81.%20Sou%20o%20instalador%20da%20sua%20antena%20digital%2C%20preciso%20que%20me%20envie%20sua%20*LOCALIZA%C3%87%C3%83O*%20clicando%20no%20link%20abaixo%3A%0A%0Ahttps%3A%2F%2Fandrew-santos.github.io%2Flocal%2F%0A%0AProtocolo%3A 2026207681
        https://wa.me/5574999886940?text=Ol%C3%A1%2C%20*Suele Soares Dos Santos*%20CPF%3A%20XXX.XXX.XXX-69.%20Sou%20o%20instalador%20da%20sua%20antena%20digital%2C%20preciso%20que%20me%20envie%20sua%20*LOCALIZA%C3%87%C3%83O*%20clicando%20no%20link%20abaixo%3A%0A%0Ahttps%3A%2F%2Fandrew-santos.github.io%2Flocal%2F%0A%0AProtocolo%3A 2026158319
        https://wa.me/5574998061636?text=Ol%C3%A1%2C%20*Tamires Do Nascimento Cruz*%20CPF%3A%20XXX.XXX.XXX-70.%20Sou%20o%20instalador%20da%20sua%20antena%20digital%2C%20preciso%20que%20me%20envie%20sua%20*LOCALIZA%C3%87%C3%83O*%20clicando%20no%20link%20abaixo%3A%0A%0Ahttps%3A%2F%2Fandrew-santos.github.io%2Flocal%2F%0A%0AProtocolo%3A 2026157332

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
