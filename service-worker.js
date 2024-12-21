const CACHE_NAME = 'map-cache-v1';
const URLS_TO_CACHE = [
    '/', // Página inicial
    '/index.html',
    '/styles.css', // Substitua pelo nome do arquivo CSS do seu projeto
    '/script.js',  // Substitua pelo nome do arquivo JavaScript principal
    '/marker_blue.png', // Ícones utilizados
    '/marker_green.png',
    '/marker_red.png',
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css',
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js',
];

// Instalando o Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

// Respondendo com cache ou rede
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Atualizando o cache quando necessário
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
