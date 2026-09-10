export function isClerkAvailable() {
  return !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
}

export function isClerkBypassMode() {
  if (!isClerkAvailable()) return true;

  return (
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith('pk_live_')
  );
}
