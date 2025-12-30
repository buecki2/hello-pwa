const CACHE_NAME = 'hello-pwa-v15';
const FILES_TO_CACHE = ['./', './index.html', './app.html', './app.js', './login.js', 'auth.js', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', evt => {
  const url = new URL(evt.request.url);

  if (
    url.origin === 'https://script.google.com' ||
    url.origin === 'https://accounts.google.com'
  ) {
    return;
  }

  evt.respondWith(
    caches.match(evt.request).then(cached => {
      return cached || fetch(evt.request);
    })
  );
});

// Activate event (delete old caches)
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME) // keep only current cache
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // take control of all clients immediately
});
