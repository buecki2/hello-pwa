const CACHE_NAME = 'hello-pwa-v24';
const FILES_TO_CACHE = ['./', './icon-192.png', './icon-512.png', 
  './auth.js', './manifest.json', '.api.js',
  './index.html', './login.js',
  './app.html', './app.js',   
  './add-thing.html', './add-thing.js',
  './add-user.html', './add-user.js',
  './style.css'
  ];

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
