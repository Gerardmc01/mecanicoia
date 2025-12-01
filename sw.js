// Service Worker para Mecánico IA 24/7
// Hace que la web funcione offline y cargue más rápido

const CACHE_NAME = 'mecanico-ia-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/garage.html',
    '/blog.html',
    '/styles.css',
    '/garage-styles.css',
    '/app.js',
    '/data.js'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('✅ Caché abierta');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activación y limpieza de cachés antiguas
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Eliminando caché antigua:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Intercepción de peticiones (estrategia: Network First, fallback a Cache)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Si la petición es exitosa, guardarla en caché
                if (response && response.status === 200) {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return response;
            })
            .catch(() => {
                // Si falla la red, intentar servir desde caché
                return caches.match(event.request);
            })
    );
});
