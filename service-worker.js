const CACHE_NAME = 'map-cache-v1';
const FILES_TO_CACHE = [
    './', // Raiz do site
    './index.html', // Página principal
    './script.js', // Seu script principal
    './styles.css', // CSS (se houver)
    './tiles/{z}/{x}/{y}.png', // Tiles locais do mapa
    './marker_green.png', // Ícones de marcadores
    './marker_blue.png',
    './marker_red.png',
    'https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png' // Ícone do WhatsApp
];

// Evento de instalação (cache dos arquivos)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Pré-carregando arquivos no cache...');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Evento de ativação (limpeza de caches antigos)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Removendo cache antigo:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Evento de busca (resposta offline)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
