// Service worker: fast repeat visits and offline use of the (≈ 60 MB) planning app.
//
//  assets/**   cache first  – textures, HDR skies, models, moodboards, denoiser weights. They are
//                              large and practically immutable; a visit never re-downloads them.
//  vendor/**   stale-while-revalidate – served instantly, refreshed in the background.
//  everything  network first – HTML, app code and styles are always current when online and
//  else                       still work offline from the last visit.
//
// Replaced or regenerated asset files keep their names, so bump VERSION when files under
// assets/ change: the new worker then starts with an empty asset cache.
const VERSION = 'we13-v1';
const ASSETS = `${VERSION}-assets`, CODE = `${VERSION}-code`;

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (!k.startsWith(VERSION)) await caches.delete(k);
  await self.clients.claim();
})()));

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || req.headers.has('range')) return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  const path = url.pathname.slice(new URL(self.registration.scope).pathname.length);
  if (path.startsWith('assets/')) e.respondWith(cacheFirst(req));
  else if (path.startsWith('vendor/')) e.respondWith(staleWhileRevalidate(req, e));
  else e.respondWith(networkFirst(req));
});

async function cacheFirst(req) {
  const cache = await caches.open(ASSETS);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok && res.type === 'basic') cache.put(req, res.clone());
  return res;
}

async function staleWhileRevalidate(req, e) {
  const cache = await caches.open(CODE);
  const hit = await cache.match(req);
  const update = fetch(req).then((res) => { if (res.ok && res.type === 'basic') cache.put(req, res.clone()); return res; });
  if (hit) { e.waitUntil(update.catch(() => {})); return hit; }
  return update;
}

async function networkFirst(req) {
  const cache = await caches.open(CODE);
  try {
    const res = await fetch(req);
    if (res.ok && res.type === 'basic') cache.put(req, res.clone());
    return res;
  } catch (err) {
    const hit = await cache.match(req, { ignoreSearch: req.mode === 'navigate' });
    if (hit) return hit;
    throw err;
  }
}
