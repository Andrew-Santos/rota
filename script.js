// Verifica se o navegador suporta Service Workers
if ('serviceWorker' in navigator) {
    // Registra o Service Worker para '/service-worker.js'
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker registrado com sucesso.'))
        .catch(err => console.error('Erro ao registrar o Service Worker:', err));
}

// Verifica novamente para registrar outro Service Worker
if ('serviceWorker' in navigator) {
    // Registra o Service Worker para '/sw.js'
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log("Service Worker registrado com sucesso."))
        .catch(error => console.error("Falha ao registrar o Service Worker:", error));
}

// Declaração de variáveis principais para o mapa e marcadores
let map; // Referência ao mapa Leaflet
let markersGroup; // Grupo de marcadores do Leaflet
let userMarker; // Marcador da localização do usuário

/**
 * Atualiza a posição do usuário no mapa.
 * @param {number} lat Latitude do usuário
 * @param {number} lng Longitude do usuário
 */
function updateUserLocation(lat, lng) {
    if (userMarker) {
        // Se o marcador do usuário já existe, atualiza sua posição
        userMarker.setLatLng([lat, lng]);
    } else {
        // Cria um novo marcador para a posição do usuário
        const customIcon = L.divIcon({
            className: 'current-location-marker', // Classe CSS personalizada
            iconSize: [20, 20]
        });
        userMarker = L.marker([lat, lng], { icon: customIcon })
            .addTo(map) // Adiciona ao mapa
            .bindPopup("Você está aqui.") // Popup informativo
            .openPopup(); // Abre o popup automaticamente
    }
    // Centraliza o mapa na posição do usuário com um zoom de 15
    map.setView([lat, lng], 15);
}

// Monitora a localização do usuário em tempo real
navigator.geolocation.watchPosition(
    (position) => {
        const { latitude, longitude } = position.coords;
        updateUserLocation(latitude, longitude); // Atualiza a localização no mapa
    },
    (error) => {
        console.error("Erro ao obter localização:", error);
    },
    {
        enableHighAccuracy: true, // Usa alta precisão para obter a localização
        maximumAge: 10000, // Cache da localização por no máximo 10 segundos
        timeout: 5000 // Tempo máximo para obter a localização
    }
);

/**
 * Inicializa o mapa.
 */
function initializeMap() {
    // Cria o mapa e associa ao elemento HTML com id 'map'
    map = L.map('map');

    // Adiciona uma camada de tiles do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18, // Zoom máximo permitido
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Inicializa o grupo de marcadores e adiciona ao mapa
    markersGroup = L.featureGroup().addTo(map);
}

/**
 * Adiciona um marcador personalizado ao mapa.
 * @param {number} lat Latitude do marcador
 * @param {number} lng Longitude do marcador
 * @param {string} popupText Texto do popup
 * @param {string} whatsappNumber Número do WhatsApp
 * @param {string} iconUrl URL do ícone do marcador
 */
function addCustomMarker(lat, lng, popupText, whatsappNumber, iconUrl) {
    // Links para navegação no Google Maps e WhatsApp
    const googleMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    // Conteúdo do popup associado ao marcador
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

    // Ícone personalizado para o marcador
    const icon = L.icon({
        iconUrl: iconUrl, // URL do ícone
        iconSize: [25, 41], // Tamanho do ícone
        iconAnchor: [12, 41], // Âncora do ícone
        popupAnchor: [0, -41] // Posição do popup em relação ao marcador
    });

    // Cria o marcador e associa ao grupo de marcadores
    const marker = L.marker([lat, lng], { icon: icon }).bindPopup(popupContent);
    markersGroup.addLayer(marker);
}

/**
 * Processa uma string de coordenadas e retorna como um objeto.
 * @param {string} coordString String de coordenadas no formato "lat,lng"
 * @returns {Object} Objeto com latitude e longitude
 */
function parseCoordinates(coordString) {
    const [lat, lng] = coordString.split(',').map(Number);
    return { lat, lng };
}

/**
 * Carrega marcadores de um array de locais.
 */
function loadMarkers() {
    const locations = [
         {coords: "-11.254485, -39.375203", name: "Carmem Araujo Gomes Oliveira", whatsapp: "55", color: 'blue'},
         {coords: "-10.9769493,-39.6264144", name: "Cristiana Carneiro Dos Santos", whatsapp: "5575999618633", color: 'blue'},
         {coords: "-11.242700, -39.372636", name: "Edmilson De Jesus Santos", whatsapp: "5575992910202", color: 'blue'},
         {coords: "-10.988955, -39.622924", name: "Graciene Batista Da Silva", whatsapp: "5575999857443", color: 'blue'},
         {coords: "-10.968693, -39.628649", name: "Jailson De Paula", whatsapp: "5555997097529", color: 'blue'},
         {coords: "-10.977104, -39.631960", name: "Jose De Jesus Carneiro", whatsapp: "5575998790112", color: 'blue'},
         {coords: "-10.831381, -39.653696", name: "Joziene Nunes Bispo Da Silva", whatsapp: "5575997140637", color: 'blue'},
         {coords: "-11.1358760, -39.3053640", name: "Lucimario Do Carmo Araujo", whatsapp: "5575983707040", color: 'green'},
         {coords: "-11.153153, -39.245713", name: "Luzivan De Carvalho Abreu", whatsapp: "5575982350786", color: 'green'},
         {coords: "-11.106075, -39.444268", name: "Maria Madalena De Jesus Silva", whatsapp: "5575991432582", color: 'green'},
         {coords: "-11.257120,-39.811741", name: "Adaleia Borges Silva", whatsapp: "5574999564897", color: 'green'},
         {coords: "-11.2718752,-39.3698424", name: "Adna Da Silva Santos", whatsapp: "5575998085804", color: 'green'},
         {coords: "-10.986527, -39.622247", name: "Adrielle Ferreira Bispo Santos", whatsapp: "5575998959230", color: 'green'},
         {coords: "-10.9683121,-39.6283145", name: "Adrielly Reis Santos Da Silva", whatsapp: "5575999533105", color: 'green'},
         {coords: "-11.0933184,-39.5278835", name: "Alcione Joana De Jesus Capistrano", whatsapp: "5512996838359", color: 'green'},
         {coords: "-10.842100,-39.624981", name: "Allane Nunes De Souza", whatsapp: "5575998972319", color: 'green'},
         {coords: "-11.006951,-39.743408", name: "Almir Oliveira Das Virgens", whatsapp: "5575999914305", color: 'green'},
         {coords: "-11.256343,-39.371002", name: "Amanda Uiara Goncalves Lopes Dias", whatsapp: "5575992698754", color: 'green'},
         {coords: "-10.81566,-39.6523867", name: "Andre De Souza Ferreira", whatsapp: "5574999477948", color: 'green'},
         {coords: "-11.2533217,-39.3710911", name: "Angela Dos Santos Brito", whatsapp: "5575991190355", color: 'green'},
         {coords: "-10.9758354,-39.6342023", name: "Antonio Cordeiro Da Silva", whatsapp: "5575998139500", color: 'green'},
         {coords: "-11.260253,-39.774521", name: "Antonio Nascimento Pastor Santana", whatsapp: "5574998112314", color: 'green'},
         {coords: "-10.91891891891892,-39.56308827983786", name: "Camila Dos Santos Da Silva", whatsapp: "5575997120837", color: 'green'},
         {coords: "-10.970373, -39.630278", name: "Carmelita Francisca Dos Santos", whatsapp: "5575999166319", color: 'green'},
         {coords: "-10.9772438,-39.6270861", name: "Carmosina Santos Souza", whatsapp: "5575999647821", color: 'green'},
         {coords: "-11.2412279,-39.738549", name: "Celia Lima Dias", whatsapp: "5575999203681", color: 'green'},
         {coords: "-11.2833652,-39.3561895", name: "Cidalia Dantas Dos Santos Mota", whatsapp: "5575999429554", color: 'green'},
         {coords: "-10.918727,-39.9304977", name: "Cidelcina Rosa De Oliveira", whatsapp: "5511913493349", color: 'green'},
         {coords: "-11.3174293,-39.8580114", name: "Damascena De Almeida Costa", whatsapp: "5575991293295", color: 'green'},
         {coords: "-11.2006794,-39.2855037", name: "Damiana Pereira De Oliveira", whatsapp: "5575983610607", color: 'green'},
         {coords: "-11.161091, -39.312440", name: "Djeane Carmo De Matos", whatsapp: "5575981917209", color: 'green'},
         {coords: "-10.9728866,-39.6224514", name: "Edinalva Oliveira", whatsapp: "5575998146608", color: 'green'},
         {coords: "-11.275977, -39.781758", name: "Edinare Costa De Matos", whatsapp: "5575998876652", color: 'green'},
         {coords: "-11.2574518,-39.8371251", name: "Edivania Silva De Jesus", whatsapp: "5575999686020", color: 'green'},
         {coords: "-11.2437367,-39.3780225", name: "Edmunda De Matos Oliveira", whatsapp: "5575991906115", color: 'green'},
         {coords: "-10.9859806,-39.6220205", name: "Edna De Jesus Almeida", whatsapp: "5575999820408", color: 'green'},
         {coords: "-10.9807991,-39.6278192", name: "Eliene Do Carmo Oliveira", whatsapp: "557599917730", color: 'green'},
         {coords: "-10.9763441,-39.634573", name: "Eliene Pereira Da Costa Cordeiro", whatsapp: "5575999560279", color: 'green'},
         {coords: "-11.28691439917487,-39.351936179194375", name: "Estefani Souza Dias Santos", whatsapp: "5575988790286", color: 'green'},
         {coords: "-11.174900,-39.341808", name: "Fabiana Nascimento Oliveira", whatsapp: "5575999775040", color: 'green'},
         {coords: "-10.8459465,-39.6346048", name: "Fredson Da Silva Nunes", whatsapp: "5575999268105", color: 'green'},
         {coords: "-11.1823239,-39.3068445", name: "Geiziane Do Nascimento De Santana", whatsapp: "5575992516795", color: 'green'},
         {coords: "-11.256270,-39.812019", name: "Genilda De Santana Medrado", whatsapp: "5574999833502", color: 'green'},
         {coords: "-11.1198607,-39.2645315", name: "Genilda Do Carmo Santos", whatsapp: "5575981102149", color: 'green'},
         {coords: "-11.161215,-39.323895", name: "Genivaldo Da Conceicao", whatsapp: "5575981795315", color: 'green'},
         {coords: "-10.974906, -39.682952", name: "Genivaldo De Jesus Silva", whatsapp: "5575997145585", color: 'green'},
         {coords: "-10.975220, -39.683173", name: "Geovanicia De Jesus Costa Silva", whatsapp: "5575997145585", color: 'green'},
         {coords: "-11.092609,-39.528561", name: "Gilzana Pereira Da Silva", whatsapp: "5575999237449", color: 'green'},
         {coords: "-11.075162,-39.534134", name: "Girlei Santos Costa", whatsapp: "5534997281835", color: 'green'},
         {coords: "-11.269087, -39.371697", name: "Givalda De Souza Reis", whatsapp: "5575982498606", color: 'green'},
         {coords: "-10.915860, -39.931416", name: "Gracindo Evangelista De Oliveira", whatsapp: "5574981240374", color: 'green'},
         {coords: "-10.918187,-39.933449", name: "Hamilton De Souza", whatsapp: "5511978387908", color: 'green'},
         {coords: "-10.9795201,-39.6201741", name: "Idailsa De Sena Suzart", whatsapp: "5575998486774", color: 'green'},
         {coords: "-11.296482, -39.809519", name: "Isabel Gomes Borges", whatsapp: "5575991603526", color: 'green'},
         {coords: "-11.2566076,-39.3713114", name: "Jailson Cardoso Do Carmo", whatsapp: "5575988335084", color: 'green'},
         {coords: "-11.2571364,-39.8153121", name: "Jeadson De Jesus Santos", whatsapp: "5575987070053", color: 'green'},
         {coords: "-10.9634368,-39.6364836", name: "Joana Dos Santos Souza Pereira", whatsapp: "5575997001221", color: 'green'},
         {coords: "-10.802460, -39.648735", name: "Jonas Lopes De Oliveira", whatsapp: "5575999455527", color: 'green'},
         {coords: "-11.2031002,-39.3780844", name: "Jose Carlos Souza Sant Ana", whatsapp: "5575998571860", color: 'green'},
         {coords: "-11.161532,-39.312881", name: "Jose Lino Souza Carneiro", whatsapp: "5575983477711", color: 'green'},
         {coords: "-11.217154, -39.340405", name: "Jose Maria Oliveira Dos Reis", whatsapp: "557582838096", color: 'green'},
         {coords: "-11.2332483,-39.5686933", name: "Jose Ramos Da Silva", whatsapp: "5575998560410", color: 'green'},
         {coords: "-10.9831644,-39.6697828", name: "Jose Villas Boas Da Silva", whatsapp: "5575999800176", color: 'green'},
         {coords: "-11.2884814,-39.3526481", name: "Joseane De Oliveira Marco", whatsapp: "5575981885613", color: 'green'},
         {coords: "-11.266559,-39.374016", name: "Josefa De Jesus Santos", whatsapp: "5575981017130", color: 'green'},
         {coords: "-11.2617704,-39.3780152", name: "Joselice Santos Da Anunciacao", whatsapp: "5575988670826", color: 'green'},
         {coords: "-10.9770366,-39.6221389", name: "Joselita Barbosa", whatsapp: "5575999484520", color: 'green'},
         {coords: "-11.333286,-39.303627", name: "Josielson Dos Santos Silva", whatsapp: "5575983297070", color: 'green'},
         {coords: "-11.052970,-39.858280", name: "Joziane Da Cunha Dias", whatsapp: "5574991366083", color: 'green'},
         {coords: "-10.9867383,-39.7807622", name: "Juciara Dos Santos Brito", whatsapp: "5575999616611", color: 'green'},
         {coords: "-10.986913, -39.669618", name: "Jussaria De Jesus Silva", whatsapp: "5575997013683", color: 'green'},
         {coords: "-10.9753997,-39.6217013", name: "Kleidiane Dias De Jesus", whatsapp: "5575998554372", color: 'green'},
         {coords: "-11.2434892,-39.2649732", name: "Laiane Dos Santos Reis", whatsapp: "5575982121280", color: 'green'},
         {coords: "-11.2442001,-39.37716813", name: "Laurinete De Jesus Santos", whatsapp: "5575982864018", color: 'green'},
         {coords: "-10.9555379,-39.6630887", name: "Leidiane Barbosa Da Silva Costa", whatsapp: "5511973763634", color: 'green'},
         {coords: "-10.9188498,-39.9301925", name: "Leidiane Rosa De Oliveira Soares", whatsapp: "557597053963", color: 'green'},
         {coords: "-10.963561,-39.883690", name: "Lidio De Jesus Santiago", whatsapp: "5574999882138", color: 'green'},
         {coords: "-10.915193, -39.931519", name: "Luciane Da Costa Bonfim", whatsapp: "5574981240374", color: 'green'},
         {coords: "-11.161253, -39.311616", name: "Lucimaria De Jesus Reis", whatsapp: "5575998575686", color: 'green'},
         {coords: "-10.897145,-39.571651", name: "Lusineide De Souza Marcenio", whatsapp: "5575998049622", color: 'green'},
         {coords: "-11.20259855530691,-39.326550881941905", name: "Luzivania Souza Vitorio", whatsapp: "5575992722056", color: 'green'},
         {coords: "-10.9862815,-39.7748422", name: "Magali De Medeiros", whatsapp: "5575999045426", color: 'green'},
         {coords: "-11.3154703,-39.3251205", name: "Maiane Da Silva Reis", whatsapp: "5575981942395", color: 'green'},
         {coords: "-11.162023,-39.311535", name: "Maria Da Paz Brito Dos Reis", whatsapp: "5575998561852", color: 'green'},
         {coords: "-11.095604353359134,-39.440811461678365", name: "Maria Das Dores Santos Cruz", whatsapp: "5575999516455", color: 'green'},
         {coords: "-11.305619,-39.2842299", name: "Maria Eunice Souza De Jesus Cunha", whatsapp: "5575998779355", color: 'green'},
         {coords: "-10.973727,-39.6224916", name: "Maria Jose Pereira Dos Santos", whatsapp: "5575999176793", color: 'green'},
         {coords: "-11.052864, -39.858203", name: "Maria Marcia Ferreira De Andrade", whatsapp: "5575998963535", color:'red'},
         {coords: "-10.976299, -39.623062", name: "Maria Raimunda Santos Silva", whatsapp: "5575998514875", color: 'green'},
         {coords: "-10.914920, -39.931391", name: "Maria Ridalia Dos Santos Andrade", whatsapp: "557499817992", color: 'green'},
         {coords: "-11.250632,-39.375927", name: "Maricleide Santos Sena", whatsapp: "5575992328086", color: 'green'},
         {coords: "-10.9768487,-39.6238212", name: "Marivalda Maria Cirino Dos Santos", whatsapp: "5575998473569", color: 'green'},
         {coords: "-11.103273, -39.256277", name: "Mauro Dos Santos Cruz", whatsapp: "5575983731644", color: 'green'},
         {coords: "-11.2384402,-39.7382403", name: "Mayami De Aquino Souza Queiroz", whatsapp: "5511937122018", color: 'green'},
         {coords: "-11.150299,-39.318110", name: "Miles Santos Do Carmo", whatsapp: "5575982616029", color: 'green'},
         {coords: "-10.976011, -39.630486", name: "Nilda Rosa Do Nascimento", whatsapp: "557599010047", color: 'green'},
         {coords: "-10.830915,-39.652401", name: "Noeci Neres Dos Santos", whatsapp: "5575997055503", color: 'green'},
         {coords: "-11.2431307,-39.3691133", name: "Olival Cardoso Dos Santos", whatsapp: "5575982371325", color: 'green'},
         {coords: "-11.224267,-39.3367604", name: "Queliane Dos Santos", whatsapp: "5575988811333", color: 'green'},
         {coords: "-11.3187571,-39.8576534", name: "Railda Dos Santos Goes", whatsapp: "5575991736599", color: 'green'},
         {coords: "-11.1632154,-39.3149028", name: "Raimunda Reis Do Carmo", whatsapp: "5575998854057", color: 'green'},
         {coords: "-11.26059717761126,-39.373106194068264", name: "Raimundo Nonato De Jesus Oliveira", whatsapp: "5575981114371", color: 'green'},
         {coords: "-10.976083, -39.620846", name: "Rian Oliveira Da Silva", whatsapp: "5575998059192", color: 'green'},
         {coords: "-11.3202234,-39.3159772", name: "Rita De Jesus Santos", whatsapp: "557582399380", color: 'green'},
         {coords: "-11.2416751,-39.7388131", name: "Rosangela Dos Santos Lima", whatsapp: "557598696361", color: 'green'},
         {coords: "-11.2429176,-39.3973851", name: "Rosangela Sousa Dos Anjos", whatsapp: "5575998240012", color: 'green'},
         {coords: "-10.9736941,-39.6227462", name: "Rosenilda Pereira Dos Santos", whatsapp: "5571996041430", color: 'green'},
         {coords: "-10.966087,-39.630207", name: "Sergio Ferreira Oliveira", whatsapp: "5575999988751", color: 'green'},
         {coords: "-11.2721739,-39.3697456", name: "Sheila De Sant Ana Nascimento", whatsapp: "5575998729080", color: 'green'},
         {coords: "-10.9798217,-39.6203198", name: "Tatiele Suzart Ferreira", whatsapp: "5575998179828", color: 'green'},
         {coords: "-11.2430255,-39.3689498", name: "Uilma Lima Das Virgens", whatsapp: "5575991634187", color: 'green'},
         {coords: "-11.269304,-39.369534", name: "Vera Lucia Dos Santos Reis", whatsapp: "5575988601824", color: 'green'},
         {coords: "-11.247736, -39.387801", name: "Veronice Dos Santos De Jesus", whatsapp: "5575981814780", color: 'green'},
         {coords: "-11.243308,-39.372330", name: "Wedson Matos Lima", whatsapp: "5575991637051", color: 'green'},

    ];

    // Adiciona cada marcador ao mapa
    locations.forEach(location => {
        const { lat, lng } = parseCoordinates(location.coords);
        addCustomMarker(lat, lng, location.name, location.whatsapp, location.color);
    });
}

// Inicializa o mapa e carrega os marcadores
initializeMap();
loadMarkers();
