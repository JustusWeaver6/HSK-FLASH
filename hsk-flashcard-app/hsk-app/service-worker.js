const CACHE = 'hsk-flash-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './support.js',
  './hsk-vocab.js',
  './android-frame.jsx',
  './manifest.json',
  './_ds/modernist-b891bd2f-bd25-4c72-95c3-b2cc0b970123/styles.css',
  './_ds/modernist-b891bd2f-bd25-4c72-95c3-b2cc0b970123/_ds_bundle.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first for same-origin app files (so edits show up), cache-first fallback offline.
// CDN requests (React/Babel from unpkg) pass through to the network/browser cache as-is.
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return res;
      })
      .catch(() => caches.match(event.request).then((r) => r || caches.match('./index.html')))
  );
});
