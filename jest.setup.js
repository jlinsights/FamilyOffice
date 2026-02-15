import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    };
  },
}));

// Mock Clerk
jest.mock('@clerk/nextjs', () => ({
  useUser: () => ({
    user: {
      id: 'test-user-id',
      firstName: 'Test',
      lastName: 'User',
      emailAddresses: [{ emailAddress: 'test@example.com' }],
    },
    isLoaded: true,
  }),
  useAuth: () => ({
    userId: 'test-user-id',
    isLoaded: true,
    isSignedIn: true,
  }),
  currentUser: () =>
    Promise.resolve({
      id: 'test-user-id',
      firstName: 'Test',
      lastName: 'User',
      emailAddresses: [{ emailAddress: 'test@example.com' }],
    }),
}));

// Mock environment variables
process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'test-key';
process.env.CLERK_SECRET_KEY = 'test-secret';

// Mock Supabase environment variables for integration tests
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test-project.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY =
  'test-anon-key-for-integration-tests';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key-for-admin-tests';

// Mock IntersectionObserver for components that use it
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  disconnect() {}
  observe(target) {
    // Immediately trigger the callback with isIntersecting: true
    // to simulate the element being visible
    this.callback([
      {
        isIntersecting: true,
        target,
        intersectionRatio: 1,
        boundingClientRect: target.getBoundingClientRect?.() || {},
        intersectionRect: {},
        rootBounds: {},
        time: Date.now(),
      },
    ]);
  }
  takeRecords() {
    return [];
  }
  unobserve() {}
};

// Mock Supabase client for integration tests
jest.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      signInWithOAuth: async () => ({
        data: {
          url: 'https://kauth.kakao.com/oauth/authorize?client_id=test&redirect_uri=https://familyoffices.vip/auth/callback&state=1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          provider: 'kakao',
        },
        error: null,
      }),
      refreshSession: async () => ({
        data: {
          session: {
            user: { id: 'test-user-id' },
            access_token: 'test-access-token',
            expires_at: Date.now() + 3600000,
          },
        },
        error: null,
      }),
      onAuthStateChange: callback => {
        return {
          data: { subscription: { unsubscribe: () => {} } },
        };
      },
      getSession: async () => ({
        data: {
          session: {
            user: { id: 'test-user-id' },
            access_token: 'test-access-token',
            expires_at: Date.now() + 3600000,
          },
        },
        error: null,
      }),
      getUser: async () => ({
        data: {
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
          },
        },
        error: null,
      }),
      signOut: async () => ({
        error: null,
      }),
    },
    from: table => {
      const chain = {
        select: () => chain,
        insert: () => chain,
        update: () => chain,
        delete: () => chain,
        eq: () => chain,
        single: async () => ({
          data: {
            id: 'test-user-id',
            email: 'test@example.com',
            name: '테스트사용자',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          error: null,
        }),
      };
      return chain;
    },
  }),
}));

// Mock Supabase Admin Client
jest.mock('@/lib/supabase/admin-client', () => ({
  createAdminClient: () => ({
    auth: {
      signInWithOAuth: async () => ({
        data: {
          url: 'https://kauth.kakao.com/oauth/authorize?client_id=test&redirect_uri=https://familyoffices.vip/auth/callback&state=1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          provider: 'kakao',
        },
        error: null,
      }),
      refreshSession: async () => ({
        data: {
          session: {
            user: { id: 'test-user-id' },
            access_token: 'test-access-token',
            expires_at: Date.now() + 3600000,
          },
        },
        error: null,
      }),
      onAuthStateChange: callback => {
        return {
          data: { subscription: { unsubscribe: () => {} } },
        };
      },
      getSession: async () => ({
        data: {
          session: {
            user: { id: 'test-user-id' },
            access_token: 'test-access-token',
            expires_at: Date.now() + 3600000,
          },
        },
        error: null,
      }),
      getUser: async () => ({
        data: {
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
          },
        },
        error: null,
      }),
      signOut: async () => ({
        error: null,
      }),
    },
    from: table => {
      const chain = {
        select: () => chain,
        insert: () => chain,
        update: () => chain,
        delete: () => chain,
        eq: () => chain,
        single: async () => ({
          data: null, // For getUserByClerkId to return null when user doesn't exist
          error: null,
        }),
      };
      return chain;
    },
  }),
}));

// Mock Request and Response globals for Next.js server components
if (typeof Request === 'undefined') {
  global.Request = class Request {
    constructor(input, init = {}) {
      const url = typeof input === 'string' ? input : input?.url || '';
      const method = init?.method || 'GET';
      const headers = new Headers(init?.headers || {});
      const body = init?.body;

      // Use Object.defineProperty for read-only properties to match native Request
      Object.defineProperty(this, 'url', {
        value: url,
        writable: false,
        enumerable: true,
        configurable: true,
      });

      Object.defineProperty(this, 'method', {
        value: method,
        writable: false,
        enumerable: true,
        configurable: true,
      });

      Object.defineProperty(this, 'headers', {
        value: headers,
        writable: false,
        enumerable: true,
        configurable: true,
      });

      Object.defineProperty(this, 'body', {
        value: body,
        writable: false,
        enumerable: true,
        configurable: true,
      });

      // Other optional properties
      this.signal = init?.signal;
      this.cache = init?.cache;
      this.credentials = init?.credentials || 'same-origin';
      this.mode = init?.mode || 'cors';
      this.redirect = init?.redirect || 'follow';
      this.referrer = init?.referrer || 'about:client';
      this.referrerPolicy = init?.referrerPolicy || '';
      this.integrity = init?.integrity || '';
      this.keepalive = init?.keepalive || false;
    }

    clone() {
      return new Request(this.url, {
        method: this.method,
        headers: this.headers,
        body: this.body,
        signal: this.signal,
        cache: this.cache,
        credentials: this.credentials,
        mode: this.mode,
        redirect: this.redirect,
        referrer: this.referrer,
        referrerPolicy: this.referrerPolicy,
        integrity: this.integrity,
        keepalive: this.keepalive,
      });
    }

    async json() {
      return JSON.parse(this.body || '{}');
    }

    async text() {
      return this.body || '';
    }

    async arrayBuffer() {
      return new ArrayBuffer(0);
    }

    async blob() {
      return new Blob([this.body || '']);
    }

    async formData() {
      return new FormData();
    }
  };
}

if (typeof Response === 'undefined') {
  global.Response = class Response {
    constructor(body, init = {}) {
      this.body = body;
      this.status = init.status || 200;
      this.statusText = init.statusText || 'OK';
      this.headers = new Map(
        Object.entries(init.headers || {}).map(([key, value]) => [
          key.toLowerCase(),
          value,
        ])
      );
      this.ok = this.status >= 200 && this.status < 300;
      this.redirected = false;
      this.type = 'basic';
      this.url = '';
    }

    clone() {
      return new Response(this.body, {
        status: this.status,
        statusText: this.statusText,
        headers: Object.fromEntries(this.headers),
      });
    }

    async json() {
      return JSON.parse(this.body || '{}');
    }

    async text() {
      return this.body || '';
    }

    async arrayBuffer() {
      return new ArrayBuffer(0);
    }

    async blob() {
      return new Blob([this.body || '']);
    }

    async formData() {
      return new FormData();
    }

    static json(data, init = {}) {
      return new Response(JSON.stringify(data), {
        ...init,
        headers: {
          ...init.headers,
          'content-type': 'application/json',
        },
      });
    }

    static redirect(url, status = 302) {
      return new Response(null, {
        status,
        headers: { location: url },
      });
    }

    static error() {
      const response = new Response(null, { status: 0, statusText: '' });
      response.ok = false;
      response.type = 'error';
      return response;
    }
  };
}

// Mock Headers global if needed
if (typeof Headers === 'undefined') {
  global.Headers = class Headers extends Map {
    constructor(init) {
      super();
      if (init) {
        if (init instanceof Headers || init instanceof Map) {
          for (const [key, value] of init) {
            this.set(key.toLowerCase(), value);
          }
        } else if (typeof init === 'object') {
          for (const [key, value] of Object.entries(init)) {
            this.set(key.toLowerCase(), value);
          }
        }
      }
    }

    append(key, value) {
      const existing = this.get(key.toLowerCase());
      if (existing) {
        this.set(key.toLowerCase(), `${existing}, ${value}`);
      } else {
        this.set(key.toLowerCase(), value);
      }
    }

    get(key) {
      return super.get(key.toLowerCase());
    }

    has(key) {
      return super.has(key.toLowerCase());
    }

    set(key, value) {
      super.set(key.toLowerCase(), String(value));
    }

    delete(key) {
      super.delete(key.toLowerCase());
    }
  };
}
