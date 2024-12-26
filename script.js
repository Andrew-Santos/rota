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
         {coords: "-9.435848, -39.780632", name: "Abenildo De Oliveira Santos", whatsapp: "5574999680796", color: 'blue'},
         {coords: "-8.710860, -39.441042", name: "Adriana Dos Santos", whatsapp: "5587991251361", color: 'green'},
         {coords: "-8.6105364,-39.5198674", name: "Adriano Barbosa Pereira", whatsapp: "5587988010342", color: 'green'},
         {coords: "-8.650873, -39.592239", name: "Alessandra Alves Da Silva", whatsapp: "5587996363019", color: 'green'},
         {coords: "-8.692599464057395,-39.43263466155796", name: "Ana Karoline Do Nascimento", whatsapp: "5587981786565", color: 'blue'},
         {coords: "-8.805113, -39.728401", name: "Antonia Maria Da Costa", whatsapp: "5587991924444", color: 'green'},
         {coords: "-8.9993854,-39.905514", name: "Antonio Pereira Lima", whatsapp: "5574999442239", color: 'green'},
         {coords: "-9.411032, -39.470468", name: "Assis Pereira De Araujo", whatsapp: "5574999679174", color: 'green'},
         {coords: "-8.692290, -39.685729", name: "Benedita Marinho Da Cruz", whatsapp: "5587992015155", color: 'green'},
         {coords: "-9.4582044,-39.425079", name: "Cleuza Santos Franca", whatsapp: "5574999430094", color: 'green'},
         {coords: "-8.897835, -39.772132", name: "Daniela Da Cruz Silva", whatsapp: "5574988193459", color: 'blue'},
         {coords: "-8.5689967,-39.4524725", name: "Dejalma Alves Da Silva", whatsapp: "5587988481560", color: 'green'},
         {coords: "-8.567582, -39.453326", name: "Dejanira Sirila Da Silva Barbosa", whatsapp: "5587999175116", color: 'green'},
         {coords: "-8.684684684684685,-39.44323593565295", name: "Edicleide Freire", whatsapp: "5574981017543", color: 'green'},
         {coords: "-8.5635747,-39.2945753", name: "Edinaldo Alves Da Silva", whatsapp: "5587991724001", color: 'blue'},
         {coords: "-8.8678483,-39.7754617", name: "Edvania Da Silva Santos", whatsapp: "5587991623261", color: 'green'},
         {coords: "-8.6917376,-39.4348847", name: "Elenice Pereira Fatum", whatsapp: "5574991244603", color: 'green'},
         {coords: "-8.570623640665495,-39.454262179416745", name: "Elisabeth Nazario Da Silva", whatsapp: "5587996034855", color: 'green'},
         {coords: "-8.771226,-39.6635946", name: "Elizete Pereira Da Silva", whatsapp: "5574988561263", color: 'green'},
         {coords: "-8.998487, -39.905249", name: "Evania Cristina Ferreira Ramos", whatsapp: "5574999644152", color: 'green'},
         {coords: "-8.6731341,-39.4439621", name: "Fatima Mayraelen Freire Da Silva", whatsapp: "5587991812651", color: 'green'},
         {coords: "-8.992703, -39.907127", name: "Francisco De Assis Borges", whatsapp: "5574998123314", color: 'blue'},
         {coords: "-8.999500, -39.906500", name: "Gessica Maria Da Cruz Marinho", whatsapp: "5574991416120", color: 'green'},
         {coords: "-8.661698, -39.615757", name: "Ildenice Menezes Silva Xavier", whatsapp: "5587981116598", color: 'green'},
         {coords: "-8.674439, -39.442776", name: "Jaciene Maria Dos Santos", whatsapp: "5587996253953", color: 'green'},
         {coords: "-8.9918883,-39.9008604", name: "Jacira Maria Dos Santos", whatsapp: "5574981239564", color: 'green'},
         {coords: "-8.6655886,-39.6787854", name: "Jackson Nunes De Souza", whatsapp: "5587991764830", color: 'green'},
         {coords: "-8.776605, -39.669979", name: "Jakeline Da Conceicao Cruz", whatsapp: "5587991637513", color: 'green'},
         {coords: "-8.819291, -39.776478", name: "Jilma Da Silva Romualdo", whatsapp: "5587991808401", color: 'blue'},
         {coords: "-8.6993283,-39.510676", name: "Jivaldo Dias Dos Santos", whatsapp: "5587999065172", color: 'green'},
         {coords: "-8.9974692,-39.9034064", name: "Joao Adriano Da Silva Ferreira", whatsapp: "5574999342025", color: 'green'},
         {coords: "-8.994629, -39.906237", name: "Joao De Deus Dos Santos", whatsapp: "5571999796130", color: 'blue'},
         {coords: "-9.4122783,-39.4747083", name: "Jorge Reis Dos Santos", whatsapp: "5574999128714", color: 'green'},
         {coords: "-8.775782, -39.665256", name: "Jose Nilton Alves Maciel", whatsapp: "5574981094170", color: 'green'},
         {coords: "-8.798411, -39.684845", name: "Jose Roberto Alves Da Silva", whatsapp: "5574981232933", color: 'green'},
         {coords: "-8.691906, -39.686130", name: "Josete Marinho Da Cruz", whatsapp: "5587991731295", color: 'green'},
         {coords: "-9.146513, -39.593613", name: "Josinaide Siqueira De Sena Jesus", whatsapp: "5574981491689", color: 'green'},
         {coords: "-8.644028, -39.576403", name: "Laecio Da Silva Goncalves", whatsapp: "5587991313338", color: 'green'},
         {coords: "-9.447012, -39.586324", name: "Leunice Mesquita Franca", whatsapp: "5574999016899", color: 'green'},
         {coords: "-8.997501, -39.905846", name: "Lucia Alves Dos Santos", whatsapp: "5574981335232", color: 'green'},
         {coords: "-8.925036, -39.868862", name: "Luciana De Vasconcelos Ribeiro", whatsapp: "5571996004223", color: 'green'},
         {coords: "-8.993144, -39.899141", name: "Lucineide Francisca Dos Santos", whatsapp: "5574999223514", color: 'blue'},
         {coords: "-9.4111503,-39.4704699", name: "Lucio Carlos Pereira De Araujo", whatsapp: "5574999306328", color: 'green'},
         {coords: "-8.7984569,-39.6545015", name: "Lucivan Gomes Da Silva", whatsapp: "5574981317148", color: 'green'},
         {coords: "-9.0016915,-39.9036184", name: "Marcia Gomes Do Nascimento Andrade", whatsapp: "5574991168254", color: 'blue'},
         {coords: "-8.5467341,-39.3598129", name: "Maria Aparecida Barbalho Dos Santos", whatsapp: "5587988141369", color: 'green'},
         {coords: "-8.6654271,-39.4274881", name: "Maria Aparecida Pereira Dos Santos", whatsapp: "5587991933247", color: 'blue'},
         {coords: "-9.1433748,-39.5467818", name: "Maria Barbosa Da Silva", whatsapp: "5574999798452", color: 'green'},
         {coords: "-8.996548, -39.907441", name: "Maria Da Mota Lopes", whatsapp: "5574999334128", color: 'green'},
         {coords: "-8.777306, -39.664621", name: "Maria Das Dores Araujo Feitosa", whatsapp: "5574988461083", color: 'green'},
         {coords: "-8.701033, -39.519937", name: "Maria Das Dores Dias Caldas", whatsapp: "5587999608234", color: 'green'},
         {coords: "-8.6748603,-39.4439624", name: "Maria Das Gracas Freire", whatsapp: "5587996369640", color: 'green'},
         {coords: "-8.9943026,-39.9093086", name: "Maria De Lourdes Leitao Gomes", whatsapp: "5551980405037", color: 'green'},
         {coords: "-8.641591, -39.574687", name: "Maria Eliene Da Silva Bispo", whatsapp: "5587999690681", color: 'blue'},
         {coords: "-8.998900, -39.907139", name: "Maria Gorete Torquatro Dos Santos", whatsapp: "5574999352616", color: 'blue'},
         {coords: "-8.864250, -39.697585", name: "Maria Jose Gomes De Oliveira", whatsapp: "5574981564422", color: 'green'},
         {coords: "-8.805460, -39.755097", name: "Maria Lenilda Da Conceicao Santos", whatsapp: "55", color: 'red'},
         {coords: "-8.805636, -39.755600", name: "Maria Solange Da Conceicao Santos", whatsapp: "5587991338709", color: 'blue'},
         {coords: "-9.411425, -39.471948", name: "Maricilda Silva Fonseca", whatsapp: "5574999000065", color: 'green'},
         {coords: "-9.414704, -39.471198", name: "Mauricelia Fonseca De Souza", whatsapp: "5574999896782", color: 'green'},
         {coords: "-9.002638, -39.903327", name: "Mayara Raquel Brito De Oliveira", whatsapp: "5574999552941", color: 'green'},
         {coords: "-8.6624521,-39.6134007", name: "Mikaelle De Lima Silva", whatsapp: "5587999094650", color: 'green'},
         {coords: "-8.6734161,-39.443487", name: "Mikaely Katiney Freire Sa", whatsapp: "5575988924566", color: 'green'},
         {coords: "-8.795593, -39.677313", name: "Milton Oliveira Dos Santos", whatsapp: "5574999777320", color: 'green'},
         {coords: "-8.664990, -39.679965", name: "Noe Freires Pereira", whatsapp: "5587991526381", color: 'blue'},
         {coords: "-8.8718087,-39.8800153", name: "Odimar Dias Da Silva", whatsapp: "5574999379542", color: 'green'},
         {coords: "-8.697659, -39.475387", name: "Olivia Maria De Sousa Santos", whatsapp: "5587996258578", color: 'green'},
         {coords: "-8.568515,-39.455508", name: "Otacilio Conceicao Soares", whatsapp: "5587998069654", color: 'green'},
         {coords: "-8.782540139219746,-39.572908940288876", name: "Paulo Da Costa Souza", whatsapp: "5574981191321", color: 'green'},
         {coords: "-8.626391, -39.551469", name: "Raniele Dias Da Silva", whatsapp: "5587999040603", color: 'green'},
         {coords: "-8.999620,-39.9054780", name: "Raulino Da Silva Santos", whatsapp: "5575999019567", color: 'green'},
         {coords: "-8.9942275,-39.9086987", name: "Regina Dias Da Silva", whatsapp: "5551980405037", color: 'green'},
         {coords: "-8.776870, -39.664198", name: "Reginaldo Da Silva Feitosa", whatsapp: "5574988430097", color: 'green'},
         {coords: "-8.778224154383668,-39.66795790944217", name: "Roberlaine De Souza Castro Mendonca", whatsapp: "5574981209840", color: 'green'},
         {coords: "-8.658748, -39.469559", name: "Romildo Jose Da Silva", whatsapp: "5587991804772", color: 'green'},
         {coords: "-8.731882, -39.673688", name: "Sileide Dias De Souza", whatsapp: "5587992032965", color: 'green'},
         {coords: "-9.414052, -39.473435", name: "Silvana Santana De Matos", whatsapp: "5574999502060", color: 'green'},
         {coords: "-8.6940835,-39.4458778", name: "Silvaneide Barbosa Rodrigues", whatsapp: "5587999078624", color: 'green'},
         {coords: "-8.700170, -39.577048", name: "Silvia Dias Menezes Feitosa", whatsapp: "5587996370414", color: 'green'},
         {coords: "-8.750805, -39.607176", name: "Taina Lopes Maciel", whatsapp: "5587988064384", color: 'green'},
         {coords: "-9.4121967,-39.474755", name: "Tamires Dos Santos Silva", whatsapp: "5574999728173", color: 'green'},
         {coords: "-8.993730, -39.906689", name: "Tatiane Alves De Menezes", whatsapp: "5574999422084", color: 'green'},
         {coords: "-8.774773,-39.664735", name: "Veranice Pereira Cafe Dias", whatsapp: "5574988238097", color: 'green'},
         {coords: "-8.997179, -39.907268", name: "Veronica Leite Alves", whatsapp: "5574999804845", color: 'green'},


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
