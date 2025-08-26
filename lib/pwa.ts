// PWA (Progressive Web App) utilities
export interface PWAConfig {
  name: string;
  shortName: string;
  description: string;
  themeColor: string;
  backgroundColor: string;
  startUrl: string;
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
  orientation: 'portrait' | 'landscape' | 'any';
}

export const pwaConfig: PWAConfig = {
  name: 'FamilyOffice S - 중소중견기업 전용 자산관리',
  shortName: 'FamilyOffice S',
  description: '중소중견기업 법인 대표를 위한 프리미엄 자산관리 서비스',
  themeColor: '#1e3a8a',
  backgroundColor: '#ffffff',
  startUrl: '/',
  display: 'standalone',
  orientation: 'portrait',
};

// Service Worker registration
export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('SW registered: ', registration);

        // Update available
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                // New content available
                showUpdateAvailableNotification();
              }
            });
          }
        });
      } catch (error) {
        console.error('SW registration failed: ', error);
      }
    });
  }
}

// Show update notification
function showUpdateAvailableNotification() {
  if (typeof window !== 'undefined') {
    const shouldUpdate = window.confirm(
      '새로운 버전이 사용 가능합니다. 지금 업데이트하시겠습니까?'
    );

    if (shouldUpdate) {
      window.location.reload();
    }
  }
}

// Install prompt management
export class InstallPromptManager {
  private deferredPrompt: any = null;
  private isInstalled = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });

    // Listen for appinstalled event
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      this.hideInstallButton();
    });

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.isInstalled = true;
    }
  }

  private showInstallButton() {
    // Show install button in UI
    const installButton = document.getElementById('install-button');
    if (installButton) {
      installButton.style.display = 'block';
    }
  }

  private hideInstallButton() {
    // Hide install button in UI
    const installButton = document.getElementById('install-button');
    if (installButton) {
      installButton.style.display = 'none';
    }
  }

  async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false;
    }

    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      this.deferredPrompt = null;
      return true;
    }

    return false;
  }

  getInstallStatus(): boolean {
    return this.isInstalled;
  }
}

// Offline status management
export class OfflineManager {
  private isOnline = true;
  private callbacks: Array<(online: boolean) => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.isOnline = navigator.onLine;
      this.init();
    }
  }

  private init() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.notifyCallbacks();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.notifyCallbacks();
    });
  }

  private notifyCallbacks() {
    this.callbacks.forEach(callback => callback(this.isOnline));
  }

  onStatusChange(callback: (online: boolean) => void) {
    this.callbacks.push(callback);

    // Return unsubscribe function
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  getStatus(): boolean {
    return this.isOnline;
  }
}

// Push notification management
export class PushNotificationManager {
  private registration: ServiceWorkerRegistration | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private async init() {
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.ready;
      } catch (error) {
        console.error('Service worker not ready:', error);
      }
    }
  }

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  async subscribeToPush(vapidKey: string): Promise<PushSubscription | null> {
    if (!this.registration) {
      return null;
    }

    try {
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlB64ToUint8Array(vapidKey),
      });

      return subscription;
    } catch (error) {
      console.error('Push subscription failed:', error);
      return null;
    }
  }

  private urlB64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray as Uint8Array<ArrayBuffer>;
  }
}

// Background sync management
export class BackgroundSyncManager {
  private registration: ServiceWorkerRegistration | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private async init() {
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.ready;
      } catch (error) {
        console.error('Service worker not ready:', error);
      }
    }
  }

  async registerBackgroundSync(tag: string): Promise<boolean> {
    if (!this.registration || !('sync' in this.registration)) {
      return false;
    }

    try {
      await (this.registration as any).sync.register(tag);
      return true;
    } catch (error) {
      console.error('Background sync registration failed:', error);
      return false;
    }
  }
}

// Mobile-specific optimizations
export class MobileOptimizations {
  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    // Prevent zoom on input focus
    this.preventZoomOnInputFocus();

    // Optimize touch events
    this.optimizeTouchEvents();

    // Handle orientation changes
    this.handleOrientationChange();
  }

  private preventZoomOnInputFocus() {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      const inputs = document.querySelectorAll('input, textarea, select');

      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          viewportMeta.setAttribute(
            'content',
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
          );
        });

        input.addEventListener('blur', () => {
          viewportMeta.setAttribute(
            'content',
            'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes'
          );
        });
      });
    }
  }

  private optimizeTouchEvents() {
    // Add touch-action CSS for better touch performance
    const style = document.createElement('style');
    style.textContent = `
      * {
        touch-action: manipulation;
      }
      
      .scrollable {
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
      }
    `;
    document.head.appendChild(style);
  }

  private handleOrientationChange() {
    window.addEventListener('orientationchange', () => {
      // Prevent viewport scaling on orientation change
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta) {
        viewportMeta.setAttribute(
          'content',
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        );

        setTimeout(() => {
          viewportMeta.setAttribute(
            'content',
            'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes'
          );
        }, 500);
      }
    });
  }
}

// PWA analytics
export class PWAAnalytics {
  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    // Track PWA specific events
    this.trackDisplayMode();
    this.trackNetworkStatus();
    this.trackInstallation();
  }

  private trackDisplayMode() {
    const displayMode = window.matchMedia('(display-mode: standalone)').matches
      ? 'standalone'
      : 'browser';

    if (window.gtag) {
      window.gtag('event', 'pwa_display_mode', {
        event_category: 'PWA',
        event_label: displayMode,
      });
    }
  }

  private trackNetworkStatus() {
    const connection = (navigator as any).connection;
    if (connection) {
      if (window.gtag) {
        window.gtag('event', 'network_info', {
          event_category: 'PWA',
          custom_map: {
            effectiveType: connection.effectiveType,
            downlink: connection.downlink,
            rtt: connection.rtt,
          },
        });
      }
    }
  }

  private trackInstallation() {
    window.addEventListener('appinstalled', () => {
      if (window.gtag) {
        window.gtag('event', 'pwa_installed', {
          event_category: 'PWA',
          event_label: 'app_installed',
        });
      }
    });
  }
}

// Initialize PWA features
export function initializePWA() {
  if (typeof window !== 'undefined') {
    // Register service worker
    registerServiceWorker();

    // Initialize managers
    const installPromptManager = new InstallPromptManager();
    const offlineManager = new OfflineManager();
    const pushNotificationManager = new PushNotificationManager();
    const backgroundSyncManager = new BackgroundSyncManager();

    // Make managers available globally
    (window as any).pwaManagers = {
      installPrompt: installPromptManager,
      offline: offlineManager,
      pushNotifications: pushNotificationManager,
      backgroundSync: backgroundSyncManager,
    };

    return {
      installPrompt: installPromptManager,
      offline: offlineManager,
      pushNotifications: pushNotificationManager,
      backgroundSync: backgroundSyncManager,
    };
  }

  return null;
}
