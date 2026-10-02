// Service Worker - OFFLINE + CACHE
const CACHE_NAME='telbaza-v1';
const urlsToCache=['/','index.html'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(urlsToCache)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    if(!res||res.status!==200)return res;
    const cache_res=res.clone();
    caches.open(CACHE_NAME).then(c=>c.put(e.request,cache_res));
    return res;
  }).catch(()=>caches.match('index.html'))));
});
