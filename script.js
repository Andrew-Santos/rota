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
         {coords: "-11.961993,-40.170555", name: "Leila Oliveira De Souza", whatsapp: "5574999781247", color: 'green'},
         {coords: "-10.975909, -39.633024", name: "Nicoly Santana Brandao", whatsapp: "5575997086767", color: 'green'},
         {coords: "-11.009102, -39.656455", name: "Jose Nelson Goncalves De Jesus", whatsapp: "5575998311716", color: 'green'},
         {coords: "-11.130541, -39.722120", name: "Carla Soares Dos Santos Silva", whatsapp: "5575999983537", color: 'green'},
         {coords: "-11.043664, -39.866396", name: "Maria De Lourdes Lima Cana Brasil Souza", whatsapp: "5575999558339", color: 'green'},
         {coords: "-11.243617, -39.741302", name: "Marina Da Silva Santos Costa", whatsapp: "5597991673294", color: 'green'},
         {coords: "-11.243218, -39.744310", name: "Maria De Jesus Nascimento", whatsapp: "5575999198104", color: 'green'},
         {coords: "-10.984134, -39.625778", name: "Jackson Nunes Da Silva Matos", whatsapp: "5575999573760", color: 'green'},
         {coords: "-10.968856, -39.630020", name: "Maria Celidalva Mota Pastor", whatsapp: "5575998099126", color: 'green'},
         {coords: "-11.243124, -39.744290", name: "Adenilde Da Silva Santos", whatsapp: "5575999198104", color: 'green'},
         {coords: "-10.975215, -39.632411", name: "Fabricio Batista Dos Santos", whatsapp: "5575998579717", color: 'green'},
         {coords: "-10.974117,-39.623393", name: "Sueli Lima Da Silva", whatsapp: "5575999831482", color: 'green'},
         {coords: "-10.816289,-39.657666", name: "Maria Da Soledade De Oliveira Araujo", whatsapp: "5575999031682", color: 'green'},
         {coords: "-10.987785, -39.775607", name: "Dinair Gomes Das Virgens Silva", whatsapp: "5575999686132", color: 'green'},
         {coords: "-11.052018, -39.857750", name: "Enesia Maria Da Silva Santos", whatsapp: "5575999073361", color: 'green'},
         {coords: "-10.977593, -39.624070", name: "Cristiane Costa Vazquez Santos", whatsapp: "5575999522457", color: 'green'},
         {coords: "-10.982772, -39.621275", name: "Joana Alves Dos Santos", whatsapp: "5575999485606", color: 'green'},
         {coords: "-11.057088, -39.593601", name: "Joanice Batista Dos Santos Silva", whatsapp: "5575997156435", color: 'green'},
         {coords: "-10.974257,-39.623264", name: "Patricia Conceicao Ferreira", whatsapp: "5575999739891", color: 'green'},
         {coords: "-11.052757,-39.857875", name: "Lucicleia Rosa Evangelista Souza", whatsapp: "5575999626015", color: 'green'},
         {coords: "-10.975625,-39.620900", name: "Eleunildes Nunes Da Silva", whatsapp: "5575999803593", color: 'green'},
         {coords: "-10.975948, -39.630474", name: "Rafaela Oliveira De Jesus", whatsapp: "5575999806040", color: 'green'},
         {coords: "-11.243236, -39.744225", name: "Nailza Lopes De Souza", whatsapp: "5575999198104", color: 'green'},
         {coords: "-11.051714, -39.857818", name: "Joselita Cana Brasil De Souza", whatsapp: "5575999558339", color: 'green'},
         {coords: "-10.835474, -39.642194", name: "Adriana Da Silva Santos", whatsapp: "5575997050786", color: 'green'},
         {coords: "-10.982910, -39.625837", name: "Gleiciane Dos Santos Silva Nascimento", whatsapp: "5575999189121", color: 'green'},
         {coords: "-10.967140, -39.621390", name: "Jeane Nunes De Oliveira", whatsapp: "5575997057069", color: 'green'},
         {coords: "-10.965438, -39.625003", name: "Veronilda Ferreira Dos Santos Oliveira", whatsapp: "5575997028129", color: 'green'},
         {coords: "-10.976521, -39.638081", name: "Maria Santana Silva", whatsapp: "5575999084070", color: 'green'},
         {coords: "-10.968303, -39.622170", name: "Marcia Cristina Silva De Mattos", whatsapp: "5571997215372", color: 'green'},
         {coords: "-11.961993,-40.170555", name: "Leila Oliveira De Souza", whatsapp: "5574999781247", color: 'green'},
         {coords: "-10.975909, -39.633024", name: "Nicoly Santana Brandao", whatsapp: "5575997086767", color: 'green'},
         {coords: "-11.009102, -39.656455", name: "Jose Nelson Goncalves De Jesus", whatsapp: "5575998311716", color: 'green'},
         {coords: "-11.130541, -39.722120", name: "Carla Soares Dos Santos Silva", whatsapp: "5575999983537", color: 'green'},
         {coords: "-11.043664, -39.866396", name: "Maria De Lourdes Lima Cana Brasil Souza", whatsapp: "5575999558339", color: 'green'},
         {coords: "-11.243617, -39.741302", name: "Marina Da Silva Santos Costa", whatsapp: "5597991673294", color: 'green'},
         {coords: "-11.243218, -39.744310", name: "Maria De Jesus Nascimento", whatsapp: "5575999198104", color: 'green'},
         {coords: "-10.984134, -39.625778", name: "Jackson Nunes Da Silva Matos", whatsapp: "5575999573760", color: 'green'},
         {coords: "-10.968856, -39.630020", name: "Maria Celidalva Mota Pastor", whatsapp: "5575998099126", color: 'green'},
         {coords: "-11.243124, -39.744290", name: "Adenilde Da Silva Santos", whatsapp: "5575999198104", color: 'green'},
         {coords: "-10.975215, -39.632411", name: "Fabricio Batista Dos Santos", whatsapp: "5575998579717", color: 'green'},
         {coords: "-10.974117,-39.623393", name: "Sueli Lima Da Silva", whatsapp: "5575999831482", color: 'green'},
         {coords: "-10.816289,-39.657666", name: "Maria Da Soledade De Oliveira Araujo", whatsapp: "5575999031682", color: 'green'},
         {coords: "-10.987785, -39.775607", name: "Dinair Gomes Das Virgens Silva", whatsapp: "5575999686132", color: 'green'},
         {coords: "-11.052018, -39.857750", name: "Enesia Maria Da Silva Santos", whatsapp: "5575999073361", color: 'green'},
         {coords: "-10.977593, -39.624070", name: "Cristiane Costa Vazquez Santos", whatsapp: "5575999522457", color: 'green'},
         {coords: "-10.982772, -39.621275", name: "Joana Alves Dos Santos", whatsapp: "5575999485606", color: 'green'},
         {coords: "-11.057088, -39.593601", name: "Joanice Batista Dos Santos Silva", whatsapp: "5575997156435", color: 'green'},
         {coords: "-10.974257,-39.623264", name: "Patricia Conceicao Ferreira", whatsapp: "5575999739891", color: 'green'},
         {coords: "-11.052757,-39.857875", name: "Lucicleia Rosa Evangelista Souza", whatsapp: "5575999626015", color: 'green'},
         {coords: "-10.975625,-39.620900", name: "Eleunildes Nunes Da Silva", whatsapp: "5575999803593", color: 'green'},
         {coords: "-10.975948, -39.630474", name: "Rafaela Oliveira De Jesus", whatsapp: "5575999806040", color: 'green'},
         {coords: "-11.243236, -39.744225", name: "Nailza Lopes De Souza", whatsapp: "5575999198104", color: 'green'},
         {coords: "-11.051714, -39.857818", name: "Joselita Cana Brasil De Souza", whatsapp: "5575999558339", color: 'green'},
         {coords: "-10.835474, -39.642194", name: "Adriana Da Silva Santos", whatsapp: "5575997050786", color: 'green'},
         {coords: "-10.982910, -39.625837", name: "Gleiciane Dos Santos Silva Nascimento", whatsapp: "5575999189121", color: 'green'},
         {coords: "-10.967140, -39.621390", name: "Jeane Nunes De Oliveira", whatsapp: "5575997057069", color: 'green'},
         {coords: "-10.965438, -39.625003", name: "Veronilda Ferreira Dos Santos Oliveira", whatsapp: "5575997028129", color: 'green'},
         {coords: "-10.976521, -39.638081", name: "Maria Santana Silva", whatsapp: "5575999084070", color: 'green'},
         {coords: "-10.968303, -39.622170", name: "Marcia Cristina Silva De Mattos", whatsapp: "5571997215372", color: 'green'},

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
