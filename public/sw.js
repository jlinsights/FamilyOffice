const CACHE_NAME = 'familyoffice-s-v1'
const STATIC_CACHE_NAME = 'familyoffice-s-static-v1'
const DYNAMIC_CACHE_NAME = 'familyoffice-s-dynamic-v1'

// Cache static assets
const STATIC_ASSETS = [
  '/',
  '/about',
  '/services',
  '/program',
  '/contact',
  '/manifest.json',
  '/favicon.ico',
  '/icon-192x192.png',
  '/icon-512x512.png',
]

// Cache API endpoints
const API_CACHE_PATTERNS = [
  '/api/contact',
  '/api/consultation',
]

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service worker installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('Static assets cached')
        return self.skipWaiting()
      })
      .catch(error => {
        console.error('Error caching static assets:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service worker activating...')
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Old caches cleaned up')
        return self.clients.claim()
      })
      .catch(error => {
        console.error('Error cleaning up caches:', error)
      })
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Handle static assets
  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          return response || fetch(request)
        })
    )
    return
  }
  
  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful API responses
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(DYNAMIC_CACHE_NAME)
              .then(cache => {
                cache.put(request, responseClone)
              })
          }
          return response
        })
        .catch(() => {
          // Fallback to cache for API requests
          return caches.match(request)
        })
    )
    return
  }
  
  // Handle Next.js static files
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.open(STATIC_CACHE_NAME)
        .then(cache => {
          return cache.match(request)
            .then(response => {
              if (response) {
                return response
              }
              return fetch(request)
                .then(fetchResponse => {
                  cache.put(request, fetchResponse.clone())
                  return fetchResponse
                })
            })
        })
    )
    return
  }
  
  // Handle page requests with network first, cache fallback
  event.respondWith(
    fetch(request)
      .then(response => {
        // Cache successful page responses
        if (response.status === 200) {
          const responseClone = response.clone()
          caches.open(DYNAMIC_CACHE_NAME)
            .then(cache => {
              cache.put(request, responseClone)
            })
        }
        return response
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(request)
          .then(response => {
            if (response) {
              return response
            }
            
            // If no cache, return offline page
            if (request.headers.get('accept').includes('text/html')) {
              return caches.match('/offline.html')
            }
            
            return new Response('Network error', { status: 503 })
          })
      })
  )
})

// Background sync
self.addEventListener('sync', event => {
  console.log('Background sync event:', event.tag)
  
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForms())
  }
  
  if (event.tag === 'consultation-form-sync') {
    event.waitUntil(syncConsultationForms())
  }
})

// Sync contact forms
async function syncContactForms() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME)
    const requests = await cache.keys()
    
    const contactRequests = requests.filter(request => 
      request.url.includes('/api/contact') && request.method === 'POST'
    )
    
    for (const request of contactRequests) {
      try {
        await fetch(request)
        await cache.delete(request)
        console.log('Contact form synced successfully')
      } catch (error) {
        console.error('Failed to sync contact form:', error)
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error)
  }
}

// Sync consultation forms
async function syncConsultationForms() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME)
    const requests = await cache.keys()
    
    const consultationRequests = requests.filter(request => 
      request.url.includes('/api/consultation') && request.method === 'POST'
    )
    
    for (const request of consultationRequests) {
      try {
        await fetch(request)
        await cache.delete(request)
        console.log('Consultation form synced successfully')
      } catch (error) {
        console.error('Failed to sync consultation form:', error)
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error)
  }
}

// Push notifications
self.addEventListener('push', event => {
  console.log('Push notification received:', event)
  
  if (event.data) {
    const data = event.data.json()
    
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: data.tag || 'notification',
      data: data.data || {},
      actions: data.actions || [],
      requireInteraction: data.requireInteraction || false,
      silent: data.silent || false,
    }
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }
})

// Notification click
self.addEventListener('notificationclick', event => {
  console.log('Notification clicked:', event)
  
  event.notification.close()
  
  const url = event.notification.data.url || '/'
  
  event.waitUntil(
    clients.openWindow(url)
  )
})

// Message handling
self.addEventListener('message', event => {
  console.log('Message received:', event.data)
  
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(DYNAMIC_CACHE_NAME)
        .then(cache => {
          return cache.addAll(event.data.urls)
        })
    )
  }
})

console.log('Service worker loaded')