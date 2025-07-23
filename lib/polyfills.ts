// Polyfill for environments where `self` is undefined (e.g., Node.js during
// Next.js server-side rendering). Some third-party libraries assume the
// existence of the global `self` object. We simply alias it to `globalThis`.

if (typeof globalThis.self === 'undefined') {
  // eslint-disable-next-line no-global-assign
  // @ts-expect-error – allow write to global
  globalThis.self = globalThis as unknown as typeof globalThis & { self: typeof globalThis }
} 