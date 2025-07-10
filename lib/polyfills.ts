// Polyfill for environments where `self` is undefined (e.g., Node.js during
// Next.js server-side rendering). Some third-party libraries assume the
// existence of the global `self` object. We simply alias it to `globalThis`.

// @ts-ignore – we intentionally modify the global object
if (typeof globalThis.self === 'undefined') {
  // eslint-disable-next-line no-global-assign
  // @ts-ignore – allow write to global
  globalThis.self = globalThis as unknown as typeof globalThis & { self: typeof globalThis }
} 