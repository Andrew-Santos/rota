function initMap() {
    // Coordenadas iniciais para centralizar o mapa
    const centerCoord = { lat: -15.7942, lng: -47.8822 }; // Brasília, Brasil

    // Criação do mapa centralizado
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: centerCoord,
    });

    // Lista de coordenadas para adicionar no mapa
    const locations = [
        { lat: -23.5505, lng: -46.6333, title: "São Paulo" },
        { lat: -22.9068, lng: -43.1729, title: "Rio de Janeiro" },
        { lat: -19.9167, lng: -43.9345, title: "Belo Horizonte" },
        { lat: -15.7801, lng: -47.9292, title: "Brasília" },
    ];

    // Loop para adicionar marcadores no mapa
    locations.forEach((location) => {
        new google.maps.Marker({
            position: location,
            map: map,
            title: location.title,
        });
    });
}

// Inicia o mapa ao carregar a página
window.onload = initMap;
