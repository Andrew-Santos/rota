L.Routing.control({
    waypoints: [
        L.latLng(-23.55052, -46.633308), // São Paulo
        L.latLng(-22.971964, -46.997955), // Campinas (exemplo)
        L.latLng(-22.906847, -43.172896) // Rio de Janeiro
    ],
    routeWhileDragging: true
}).addTo(map);
