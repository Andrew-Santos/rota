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
         {coords: "-11.2416751,-39.7388131", name: "Rosangela Dos Santos Lima", whatsapp: "5575999806040", color: red'},
         {coords: "-10.966087,-39.630207", name: "Sergio Ferreira Oliveira", whatsapp: "5575999988751", color: red'},
         {coords: "-11.2384402,-39.7382403", name: "Mayami De Aquino Souza Queiroz", whatsapp: "5575999806040", color: red'},
         {coords: "-10.9634368,-39.6364836", name: "Joana Dos Santos Souza Pereira", whatsapp: "5575997001221", color: red'},
         {coords: "-10.9728866,-39.6224514", name: "Edinalva Oliveira", whatsapp: "5575998146608", color: red'},
         {coords: "-10.91891891891892,-39.56308827983786", name: "Camila Dos Santos Da Silva", whatsapp: "5575997120837", color: red'},
         {coords: "-10.897145,-39.571651", name: "Lusineide De Souza Marcenio", whatsapp: "5575998049622", color: red'},
         {coords: "-10.963561,-39.883690", name: "Lidio De Jesus Santiago", whatsapp: "5574999882138", color: red'},
         {coords: "-10.974906, -39.682952", name: "Genivaldo De Jesus Silva", whatsapp: "5575997145585", color: red'},
         {coords: "-10.975220, -39.683173", name: "Geovanicia De Jesus Costa Silva", whatsapp: "5575997145585", color: red'},
         {coords: "-11.2412279,-39.738549", name: "Celia Lima Dias", whatsapp: "5575999203681", color: red'},
         {coords: "-11.260253,-39.774521", name: "Antonio Nascimento Pastor Santana", whatsapp: "5574998112314", color: red'},
         {coords: "-10.976011, -39.630486", name: "Nilda Rosa Do Nascimento", whatsapp: "5575999806040", color: red'},
         {coords: "-10.9831644,-39.6697828", name: "Jose Villas Boas Da Silva", whatsapp: "5575999800176", color: red'},
         {coords: "-10.986913, -39.669618", name: "Jussaria De Jesus Silva", whatsapp: "5575997013683", color: red'},
         {coords: "-11.257120,-39.811741", name: "Adaleia Borges Silva", whatsapp: "5574999564897", color: red'},
         {coords: "-10.9555379,-39.6630887", name: "Leidiane Barbosa Da Silva Costa", whatsapp: "5511941244081", color: red'},
         {coords: "-11.2571364,-39.8153121", name: "Jeadson De Jesus Santos", whatsapp: "5575987070053", color: red'},
         {coords: "-10.81566,-39.6523867", name: "Andre De Souza Ferreira", whatsapp: "5574999477948", color: red'},
         {coords: "-11.256270,-39.812019", name: "Genilda De Santana Medrado", whatsapp: "5574999833502", color: red'},
         {coords: "-10.830915,-39.652401", name: "Noeci Neres Dos Santos", whatsapp: "5575997055503", color: red'},
         {coords: "-10.970373, -39.630278", name: "Carmelita Francisca Dos Santos", whatsapp: "5575999166319", color: red'},
         {coords: "-10.9763441,-39.634573", name: "Eliene Pereira Da Costa Cordeiro", whatsapp: "5575999560279", color: red'},
         {coords: "-10.9758354,-39.6342023", name: "Antonio Cordeiro Da Silva", whatsapp: "5575998139500", color: red'},
         {coords: "-11.2574518,-39.8371251", name: "Edivania Silva De Jesus", whatsapp: "5575999686020", color: red'},
         {coords: "-10.842100,-39.624981", name: "Allane Nunes De Souza", whatsapp: "5575998972319", color: red'},
         {coords: "-10.802460, -39.648735", name: "Jonas Lopes De Oliveira", whatsapp: "5575999455527", color: red'},
         {coords: "-10.9683121,-39.6283145", name: "Adrielly Reis Santos Da Silva", whatsapp: "5575999533105", color: red'},
         {coords: "-10.8459465,-39.6346048", name: "Fredson Da Silva Nunes", whatsapp: "5575999268105", color: red'},
         {coords: "-10.9772438,-39.6270861", name: "Carmosina Santos Souza", whatsapp: "5575999647821", color: red'},
         {coords: "-11.20259855530691,-39.326550881941905", name: "Luzivania Souza Vitorio", whatsapp: "5575992722056", color: 'green'},
         {coords: "-11.296482, -39.809519", name: "Isabel Gomes Borges", whatsapp: "5575991603526", color: 'green'},
         {coords: "-11.106075, -39.444268", name: "Maria Madalena De Jesus Silva", whatsapp: "5575991432582", color: 'green'},
         {coords: "-11.2332483,-39.5686933", name: "Jose Ramos Da Silva", whatsapp: "5575998560410", color: 'green'},
         {coords: "-11.095604353359134,-39.440811461678365", name: "Maria Das Dores Santos Cruz", whatsapp: "5575999516455", color: 'green'},
         {coords: "-11.275977, -39.781758", name: "Edinare Costa De Matos", whatsapp: "5575998876652", color: 'green'},
         {coords: "-11.224267,-39.3367604", name: "Queliane Dos Santos", whatsapp: "5575988811333", color: 'green'},
         {coords: "-11.217154, -39.340405", name: "Jose Maria Oliveira Dos Reis", whatsapp: "557582838096", color: 'green'},
         {coords: "-11.2006794,-39.2855037", name: "Damiana Pereira De Oliveira", whatsapp: "5575983610607", color: 'green'},
         {coords: "-11.3187571,-39.8576534", name: "Railda Dos Santos Goes", whatsapp: "5575991736599", color: 'green'},
         {coords: "-11.3174293,-39.8580114", name: "Damascena De Almeida Costa", whatsapp: "5575991293295", color: 'green'},
         {coords: "-10.831381, -39.653696", name: "Joziene Nunes Bispo Da Silva", whatsapp: "5575997140637", color: 'blue'},
         {coords: "-10.968693, -39.628649", name: "Jailson De Paula", whatsapp: "5555997097529", color: 'blue'},
         {coords: "-10.9769493,-39.6264144", name: "Cristiana Carneiro Dos Santos", whatsapp: "5575999618633", color: 'blue'},
         {coords: "-10.977104, -39.631960", name: "Jose De Jesus Carneiro", whatsapp: "5575998790112", color: 'blue'},
         {coords: "-11.254485, -39.375203", name: "Carmem Araujo Gomes Oliveira", whatsapp: "55", color: 'blue'},

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
