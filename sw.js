const CACHE_NAME = "all-nations-pro-v46-final";
const urlsToCache = ["/", "/index.html", "/manifest.json"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
  self.skipWaiting();
});
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        if(event.request.destination === 'document') return caches.match('/index.html');
      });
    })
  );
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => { if(k!==CACHE_NAME) return caches.delete(k); }))));
});
