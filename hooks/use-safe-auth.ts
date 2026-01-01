import { useAuth, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

// Shared bypass check
const isBypassMode =
  typeof window !== 'undefined' &&
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith('pk_live_');

export function useSafeAuth() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const auth = useAuth();
    
    // If we are in bypass mode, we might still want to return a safe mocked state
    if (isBypassMode) {
      return {
        isLoaded: true,
        isSignedIn: false,
        userId: null,
        sessionId: null,
        actor: null,
        orgId: null,
        orgRole: null,
        orgSlug: null,
        has: () => false,
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
      actor: null,
      orgId: null,
      orgRole: null,
      orgSlug: null,
      has: () => false,
      signOut: async () => {},
      getToken: async () => null,
    };
  }
}

export function useSafeUser() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const user = useUser();

    if (isBypassMode) {
      return {
        isLoaded: true,
        isSignedIn: false,
        user: null,
      };
    }

    return user;
  } catch (error) {
    return {
      isLoaded: true,
      isSignedIn: false,
      user: null,
    };
  }
}
