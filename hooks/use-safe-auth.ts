import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export function useSafeAuth() {
  const [isMounted, setIsMounted] = useState(false);
  const [safeAuth, setSafeAuth] = useState({
    isLoaded: false,
    isSignedIn: false,
    userId: null,
    sessionId: null,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if we are in "Bypass Mode" (Dev env + Live keys)
  const isBypassMode =
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith('pk_live_');

  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const auth = useAuth();
    
    // If we are in bypass mode, we might still want to return a safe mocked state
    // even if useAuth doesn't throw, just to be consistent.
    if (isBypassMode) {
      return {
        isLoaded: true,
        isSignedIn: false,
        userId: null,
        sessionId: null,
        signOut: async () => {},
        getToken: async () => null,
      };
    }

    return auth;
  } catch (error) {
    // If useAuth throws (e.g. no ClerkProvider), return mock state
    return {
      isLoaded: true,
      isSignedIn: false,
      userId: null,
      sessionId: null,
      signOut: async () => {},
      getToken: async () => null,
    };
  }
}
