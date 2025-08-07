// Ensure `self` exists in Node (Next.js server runtime)
// Some third-party libs assume `self` is defined even on SSR.
// This file MUST be imported before any vendor code executes.

// @ts-ignore
if (typeof globalThis.self === 'undefined') {
  // @ts-ignore
  globalThis.self = globalThis;
}

export {};
