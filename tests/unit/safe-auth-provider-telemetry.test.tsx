/**
 * Clerk 텔레메트리(clerk-telemetry.com 전송)를 끄는지 확인한다.
 * 운영 CSP 가 clerk-telemetry.com 을 허용하지 않아 매 방문마다 CSP 위반이 찍혔다.
 */
import React from 'react';
import { render } from '@testing-library/react';

const providerProps: Array<Record<string, unknown>> = [];

jest.mock('@clerk/nextjs', () => ({
  ClerkProvider: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => {
    providerProps.push(props);
    return <>{children}</>;
  },
  useAuth: () => ({ isLoaded: true, isSignedIn: false, userId: null }),
  useUser: () => ({ isLoaded: true, isSignedIn: false, user: null }),
}));

describe('SafeAuthProvider Clerk 텔레메트리', () => {
  const originalKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  beforeEach(() => {
    providerProps.length = 0;
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_dummy';
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = originalKey;
  });

  it('ClerkProvider 에 telemetry={false} 를 넘긴다', () => {
    jest.isolateModules(() => {
      const {
        SafeAuthProvider,
      } = require('@/components/auth/safe-auth-provider');
      render(
        <SafeAuthProvider>
          <span>child</span>
        </SafeAuthProvider>
      );
    });

    expect(providerProps).toHaveLength(1);
    expect(providerProps[0]).toMatchObject({ telemetry: false });
  });
});
