const CACHE_NAME = 'map-cache-v1';
const urlsToCache = [
    '/', // Página principal
    '/marker_green.png',
    '/marker_blue.png',
    '/marker_red.png',
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' // Cache dos tiles do mapa
];

// xyzInstalar o Service Worker e armazenar arquivos no cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Cache aberto');
            return cache.addAll(urlsToCache);
        })
    );
});

// Responder com os dados do cache ou buscar da rede
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Retorna o cache ou faz uma nova requisição
            return response || fetch(event.request).then(fetchResponse => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        }).catch(() => {
            // Fallback para quando a rede falha e o cache não possui o recurso
            if (event.request.destination === 'image') {
                return caches.match('/fallback-image.png'); // Imagem de fallback opcional
            }
        })
    );
});

// Remover caches antigos durante a ativação
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
