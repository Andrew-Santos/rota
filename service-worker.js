const CACHE_NAME = 'offline-cache-v1'; // Nome do cache
const ASSETS = [
    './', // Cache o HTML
    './index.html',
    './style.css',
    './script.js',
    './marker_blue.png',
    './marker_green.png',
    './marker_red.png',
    'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js',
    '/offline.html', // Página offline
];

// Instalar o Service Worker e cache dos recursos
self.addEventListener('install', (event) => {
    console.log('Service Worker instalado');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Ativar o Service Worker e limpar caches antigos
self.addEventListener('activate', (event) => {
    console.log('Service Worker ativado');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptar as requisições e fornecer respostas do cache ou da rede
self.addEventListener('fetch', (event) => {
    // Verificar se o navegador está online
    if (navigator.onLine) {
        // Se estiver online, tenta buscar os dados na rede
        event.respondWith(
            fetch(event.request).then((response) => {
                // Armazene a resposta em cache para o futuro
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, response.clone());
                });
                return response;
            }).catch(() => {
                // Se a rede não estiver disponível, use o cache
                return caches.match(event.request);
            })
        );
    } else {
        // Se estiver offline, use os dados do cache
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || caches.match('/offline.html');
            })
        );
    }
});
