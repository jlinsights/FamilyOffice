'use client';

import React, { createContext, useContext } from 'react';
import { ClerkProvider, useAuth, useUser } from '@clerk/nextjs';

// --- Types ---
interface SafeAuthState {
  isLoaded: boolean;
  isSignedIn: boolean | undefined;
  userId: string | null | undefined;
  sessionId: string | null | undefined;
  orgId: string | null | undefined;
  orgRole: string | null | undefined;
  orgSlug: string | null | undefined;
  signOut: () => Promise<void>;
  getToken: () => Promise<string | null>;
  has: (args: any) => boolean;
}

interface SafeUserState {
  isLoaded: boolean;
  isSignedIn: boolean | undefined;
  user: any | null | undefined; // Using any for Clerk User resource complex type for simplicity in safe layer
}

interface SafeAuthContextValue {
  auth: SafeAuthState;
  user: SafeUserState;
}

// --- Context ---
const SafeAuthContext = createContext<SafeAuthContextValue | null>(null);

// --- Mock Data for Bypass Mode ---
const MOCK_AUTH: SafeAuthState = {
  isLoaded: true,
  isSignedIn: false,
  userId: null,
  sessionId: null,
  orgId: null,
  orgRole: null,
  orgSlug: null,
  signOut: async () => {},
  getToken: async () => null,
  has: () => false,
};

const MOCK_USER: SafeUserState = {
  isLoaded: true,
  isSignedIn: false,
  user: null,
};

// --- Clerk Bridge Component ---
// This component sits INSIDE ClerkProvider and extracts values to pass to SafeAuthContext
function ClerkBridge({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();

  const safeAuth: SafeAuthState = {
    ...auth,
    // Ensure methods are preserved
    signOut: auth.signOut,
    getToken: auth.getToken,
    has: auth.has || ((_args: any) => false), // Fallback if undefined
  };

  const safeUser: SafeUserState = {
    isLoaded,
    isSignedIn,
    user,
  };

  return (
    <SafeAuthContext.Provider value={{ auth: safeAuth, user: safeUser }}>
      {children}
    </SafeAuthContext.Provider>
  );
}

// --- Main Provider ---
export function SafeAuthProvider({ children }: { children: React.ReactNode }) {
  // Only use MOCK mode if keys are completely missing
  const isMissingKeys = !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (isMissingKeys) {
    return (
      <SafeAuthContext.Provider value={{ auth: MOCK_AUTH, user: MOCK_USER }}>
        {children}
      </SafeAuthContext.Provider>
    );
  }

  // Always use ClerkProvider when keys are available (regardless of dev/prod)
  return (
    <ClerkProvider>
      <ClerkBridge>{children}</ClerkBridge>
    </ClerkProvider>
  );
}

// --- Hook for internal consumption (if needed, but prefer usage via use-safe-auth.ts) ---
export function useSafeAuthContext() {
  const context = useContext(SafeAuthContext);
  if (!context) {
    throw new Error(
      'useSafeAuthContext must be used within a SafeAuthProvider'
    );
  }
  return context;
}
