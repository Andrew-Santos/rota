let map;
let markersGroup;

// Função para salvar o estado do mapa no localStorage
function saveMapState() {
    const mapState = {
        center: map.getCenter(),
        zoom: map.getZoom(),
        markers: markersGroup.getLayers().map(marker => ({
            lat: marker.getLatLng().lat,
            lng: marker.getLatLng().lng,
            name: marker.options.name,
            whatsapp: marker.options.whatsapp,
            color: marker.options.color
        }))
    };
    localStorage.setItem('mapState', JSON.stringify(mapState));
}

// Função para restaurar o estado do mapa do localStorage
function restoreMapState() {
    const savedState = localStorage.getItem('mapState');
    if (savedState) {
        const { center, zoom, markers } = JSON.parse(savedState);

        map.setView([center.lat, center.lng], zoom);

        markers.forEach(({ lat, lng, name, whatsapp, color }) => {
            addCustomMarker(lat, lng, name, whatsapp, color);
        });
    }
}

// Função para inicializar o mapa
function initializeMap() {
    map = L.map('map');

    // Camada de tiles (carregamento do mapa base)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Inicializar o grupo de marcadores
    markersGroup = L.featureGroup().addTo(map);

    // Restaurar estado salvo
    restoreMapState();

    // Salvar estado ao mover ou alterar zoom
    map.on('moveend', saveMapState);
    map.on('zoomend', saveMapState);
}

// Função para adicionar marcador ao grupo
function addCustomMarker(lat, lng, name, whatsapp, color) {
    const googleMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    const whatsappLink = `https://wa.me/${whatsapp}`;

    const popupContent = `
        <div>
            <p><strong>${name}</strong></p>
            <p>${lat.toFixed(6)}, ${lng.toFixed(6)}</p>
            <div class="navigation-links">
                <a href="${googleMapsLink}" target="_blank">Abrir no Google Maps</a>
            </div>
            <a href="${whatsappLink}" target="_blank" class="whatsapp-link" title="Enviar pelo WhatsApp">${whatsapp} 
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png" alt="WhatsApp" width="20" height="20">
            </a>
        </div>
    `;

    const iconUrl = getIconUrl(color);
    const icon = L.icon({
        iconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [0, -41]
    });

    const marker = L.marker([lat, lng], {
        icon: icon,
        name,
        whatsapp,
        color
    }).bindPopup(popupContent);

    markersGroup.addLayer(marker); // Adiciona o marcador ao grupo
    saveMapState();
}

// Função para retornar o URL do ícone baseado na cor
function getIconUrl(color) {
    switch (color) {
        case 'green': return 'marker_green.png';
        case 'blue': return 'marker_blue.png';
        case 'red': return 'marker_red.png';
        default: return 'marker_blue.png';
    }
}

// Carregar marcadores do array inicial
function loadMarkers() {
    const locations = [
         {coords: "-10.7455323,-40.133743", name: "Adeilda Ferreira Silva", whatsapp: "5574999692974", color: 'green'},
         {coords: "-10.7426642,-40.1266351", name: "Aldione Pereira Lopes", whatsapp: "5574999285354", color: 'green'},
         {coords: "-10.7110838,-40.1645099", name: "Amos Dos Santos Silva", whatsapp: "5574999449893", color: 'green'},
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

    locations.forEach(({ coords, name, whatsapp, color }) => {
        const { lat, lng } = parseCoordinates(coords);
        addCustomMarker(lat, lng, name, whatsapp, color);
    });
}

// Função para processar as coordenadas
function parseCoordinates(coordString) {
    const [lat, lng] = coordString.split(',').map(Number);
    return { lat, lng };
}

// Inicializar o mapa
document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
    if (!localStorage.getItem('mapState')) {
        loadMarkers(); // Carregar marcadores iniciais se não houver estado salvo
    }
});
