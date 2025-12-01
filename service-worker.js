const CACHE_NAME = 'hello-pwa-v1';
const FILES_TO_CACHE = ['./', './index.html', './main.js', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cached => cached || fetch(evt.request))
  );
});
