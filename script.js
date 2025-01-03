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
         {coords: "-11.2434892,-39.2649732", name: "Laiane Dos Santos Reis", whatsapp: "5575982121280", color: 'green'},
         {coords: "-10.975220, -39.683173", name: "Geovanicia De Jesus Costa Silva", whatsapp: "5575997145585", color: 'green'},
         {coords: "-11.2721739,-39.3697456", name: "Sheila De Sant Ana Nascimento", whatsapp: "5575998729080", color: 'green'},
         {coords: "-11.2384402,-39.7382403", name: "Mayami De Aquino Souza Queiroz", whatsapp: "5511937122018", color: 'green'},
         {coords: "-10.966088, -39.630205", name: "Sergio Ferreira Oliveira", whatsapp: "5575999988751", color: 'green'},
         {coords: "-10.9798217,-39.6203198", name: "Tatiele Suzart Ferreira", whatsapp: "5575998179828", color: 'green'},
         {coords: "-11.006951, -39.743410", name: "Almir Oliveira Das Virgens", whatsapp: "5575999914305", color: 'green'},
         {coords: "-11.2437367,-39.3780225", name: "Edmunda De Matos Oliveira", whatsapp: "5575991906115", color: 'green'},
         {coords: "-11.2566076,-39.3713114", name: "Jailson Cardoso Do Carmo", whatsapp: "5575988335084", color: 'green'},
         {coords: "-10.9758354,-39.6342023", name: "Antonio Cordeiro Da Silva", whatsapp: "5575998139500", color: 'green'},
         {coords: "-11.260253, -39.774522", name: "Antonio Nascimento Pastor Santana", whatsapp: "5574998112314", color: 'green'},
         {coords: "-10.91891891891892,-39.56308827983786", name: "Camila Dos Santos Da Silva", whatsapp: "5575997120837", color: 'green'},
         {coords: "-10.9772438,-39.6270861", name: "Carmosina Santos Souza", whatsapp: "5575999647821", color: 'green'},
         {coords: "-11.275978, -39.781758", name: "Edinare Costa De Matos", whatsapp: "5575998876652", color: 'green'},
         {coords: "-10.9769493,-39.6264144", name: "Cristiana Carneiro Dos Santos", whatsapp: "5575999618633", color: 'green'},
         {coords: "-11.317463, -39.858055", name: "Damascena De Almeida Costa", whatsapp: "5575991293295", color: 'green'},
         {coords: "-11.2031002,-39.3780844", name: "Jose Carlos Souza Sant Ana", whatsapp: "5575998571860", color: 'green'},
         {coords: "-10.9728866,-39.6224514", name: "Edinalva Oliveira", whatsapp: "5575998146608", color: 'green'},
         {coords: "-11.2833652,-39.3561895", name: "Cidalia Dantas Dos Santos Mota", whatsapp: "5575999429554", color: 'green'},
         {coords: "-11.200722, -39.285495", name: "Damiana Pereira De Oliveira", whatsapp: "5575983610607", color: 'green'},
         {coords: "-11.174901, -39.341810", name: "Fabiana Nascimento Oliveira", whatsapp: "5575999775040", color: 'green'},
         {coords: "-11.2718752,-39.3698424", name: "Adna Da Silva Santos", whatsapp: "5575998085804", color: 'green'},
         {coords: "-11.1632154,-39.3149028", name: "Raimunda Reis Do Carmo", whatsapp: "5575998854057", color: 'green'},
         {coords: "-11.333287, -39.303625", name: "Josielson Dos Santos Silva", whatsapp: "5575983297070", color: 'green'},
         {coords: "-11.28691439917487,-39.351936179194375", name: "Estefani Souza Dias Santos", whatsapp: "5575988790286", color: 'green'},
         {coords: "-11.166050, -39.314904", name: "Jose Lino Souza Carneiro", whatsapp: "5575983477711", color: 'green'},
         {coords: "-11.095604353359134,-39.440811461678365", name: "Maria Das Dores Santos Cruz", whatsapp: "5575999516455", color: 'green'},
         {coords: "-11.1823239,-39.3068445", name: "Geiziane Do Nascimento De Santana", whatsapp: "5575992516795", color: 'green'},
         {coords: "-11.256271, -39.812020", name: "Genilda De Santana Medrado", whatsapp: "5574999833502", color: 'green'},
         {coords: "-11.1198607,-39.2645315", name: "Genilda Do Carmo Santos", whatsapp: "5575981102149", color: 'green'},
         {coords: "-10.976300, -39.623062", name: "Maria Raimunda Santos Silva", whatsapp: "5575998514875", color: 'green'},
         {coords: "-10.8459465,-39.6346048 ", name: "Fredson Da Silva Nunes", whatsapp: "5575999268105", color: 'green'},
         {coords: "-10.9795201,-39.6201741", name: "Idailsa De Sena Suzart", whatsapp: "5575998486774", color: 'green'},
         {coords: "-11.075162, -39.534135", name: "Girlei Santos Costa", whatsapp: "5534997281835", color: 'green'},
         {coords: "-10.9683121,-39.6283145", name: "Adrielly Reis Santos Da Silva", whatsapp: "5575999533105", color: 'green'},
         {coords: "-10.918187,-39.933449", name: "Hamilton De Souza", whatsapp: "5574998128334", color: 'green'},
         {coords: "-11.305619,-39.2842299", name: "Maria Eunice Souza De Jesus Cunha", whatsapp: "5575998779355", color: 'green'},
         {coords: "-10.840182, -39.625251", name: "Allane Nunes De Souza", whatsapp: "5575998972319", color: 'green'},
         {coords: "-10.802460, -39.648735", name: "Jonas Lopes De Oliveira", whatsapp: "5575999455527", color: 'green'},
         {coords: "-10.976083, -39.620844", name: "Rian Oliveira Da Silva", whatsapp: "5575998059192", color: 'green'},
         {coords: "-10.9763441,-39.634573", name: "Eliene Pereira Da Costa Cordeiro", whatsapp: "5575999560279", color: 'green'},
         {coords: "-11.269087, -39.371695", name: "Givalda De Souza Reis", whatsapp: "5575982498606", color: 'green'},
         {coords: "-11.217153, -39.340405", name: "Jose Maria Oliveira Dos Reis", whatsapp: "557582838096", color: 'green'},
         {coords: "-11.2644445,-39.6110082", name: "Jose Ramos Da Silva", whatsapp: "5575998560410", color: 'green'},
         {coords: "-11.2533217,-39.3710911", name: "Angela Dos Santos Brito", whatsapp: "5575991190355", color: 'green'},
         {coords: "-11.257504, -39.837185", name: "Edivania Silva De Jesus", whatsapp: "5575999686020", color: 'green'},
         {coords: "-11.243308, -39.372330", name: "Wedson Matos Lima", whatsapp: "5575991637051", color: 'green'},
         {coords: "-11.052970, -39.858280", name: "Joziane Da Cunha Dias", whatsapp: "5574991366083", color: 'green'},
         {coords: "-11.161215, -39.323895", name: "Genivaldo Da Conceicao", whatsapp: "5575981795315", color: 'green'},
         {coords: "-10.9753997,-39.6217013", name: "Kleidiane Dias De Jesus", whatsapp: "5575998554372", color: 'green'},
         {coords: "-11.224267,-39.3367604", name: "Queliane Dos Santos", whatsapp: "5575988811333", color: 'green'},
         {coords: "-11.2442001,-39.37716813", name: "Laurinete De Jesus Santos", whatsapp: "5575982864018", color: 'green'},
         {coords: "-10.9188498,-39.9301925", name: "Leidiane Rosa De Oliveira Soares", whatsapp: "557597053963", color: 'green'},
         {coords: "-11.20259855530691,-39.326550881941905", name: "Luzivania Souza Vitorio", whatsapp: "5575992722056", color: 'green'},
         {coords: "-11.3154703,-39.3251205", name: "Maiane Da Silva Reis", whatsapp: "5575981942395", color: 'green'},
         {coords: "-11.162022, -39.311534", name: "Maria Da Paz Brito Dos Reis", whatsapp: "5575998561852", color: 'green'},
         {coords: "-11.2617704,-39.3780152", name: "Joselice Santos Da Anunciacao", whatsapp: "5575988670826", color: 'green'},
         {coords: "-10.986269, -39.774785", name: "Andre De Souza Ferreira", whatsapp: "5574999477948", color: 'green'},
         {coords: "-11.0528643,-39.858203", name: "Maria Marcia Ferreira De Andrade", whatsapp: "5575998963535", color: 'green'},
         {coords: "-11.092609, -39.528563", name: "Gilzana Pereira Da Silva", whatsapp: "5575999237449", color: 'green'},
         {coords: "-11.2571364,-39.8153121", name: "Jeadson De Jesus Santos", whatsapp: "5575987070053", color: 'green'},
         {coords: "-10.9768487,-39.6238212", name: "Marivalda Maria Cirino Dos Santos", whatsapp: "5575998473569", color: 'green'},
         {coords: "-10.986527, -39.622247", name: "Adrielle Ferreira Bispo Santos", whatsapp: "5575998959230", color: 'green'},
         {coords: "-10.9839573,-39.6217676", name: "Edna De Jesus Almeida", whatsapp: "5575999820408", color: 'green'},
         {coords: "-11.3187571,-39.8576534", name: "Railda Dos Santos Goes", whatsapp: "5575991736599", color: 'green'},
         {coords: "-10.9807991,-39.6278192", name: "Eliene Do Carmo Oliveira", whatsapp: "557599917730", color: 'green'},
         {coords: "-10.9197391,-39.9312112", name: "Maria Ridalia Dos Santos Andrade", whatsapp: "557499817992", color: 'green'},
         {coords: "-11.2429176,-39.3973851", name: "Rosangela Sousa Dos Anjos", whatsapp: "5575998240012", color: 'green'},
         {coords: "-10.9736941,-39.6227462", name: "Rosenilda Pereira Dos Santos", whatsapp: "5571996041430", color: 'green'},
         {coords: "-11.0933184,-39.5278835", name: "Alcione Joana De Jesus Capistrano", whatsapp: "5512996838359", color: 'green'},
         {coords: "-10.9867383,-39.7807622", name: "Juciara Dos Santos Brito", whatsapp: "5575999616611", color: 'green'},
         {coords: "-11.237770, -39.738496", name: "Adaleia Borges Silva", whatsapp: "5574999564897", color: 'green'},
         {coords: "-10.9770366,-39.6221389", name: "Joselita Barbosa", whatsapp: "5575999484520", color: 'green'},
         {coords: "-11.266559, -39.374016", name: "Josefa De Jesus Santos", whatsapp: "5575981017130", color: 'green'},

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
