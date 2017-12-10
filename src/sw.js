var CACHE = 'cache-and-update';

var cacheFiles = [
    './',
    './js/practice-concat.js?v=0.1',
    './views/partials/practice/analysis.html?v=0.1',
    './views/partials/practice/bookmarks.html?v=0.1',
    './views/partials/practice/chapterAnalysis.html?v=0.1',
    './views/partials/practice/listview.html?v=0.1',
    './views/partials/practice/question.html?v=0.1'
];

self.addEventListener('install', function(evt) {
    console.log('The service worker is being installed.');
    evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
    console.log('The service worker is serving the asset.');
    evt.respondWith(fromCache(evt.request));
    evt.waitUntil(update(evt.request));
});

function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll(cacheFiles);
    });
}

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}

function update(request) {
    return caches.open(CACHE).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
}