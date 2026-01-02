export function isClerkBypassMode() {
  if (typeof window === 'undefined') {
    // On server, check simply env vars
    return (
      process.env.NODE_ENV === 'development' &&
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith('pk_live_')
    );
  }

  // On client, duplicate the check or use a known flag if we had one.
  // Stateless check based on env is safest.
  return (
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith('pk_live_')
  );
}
