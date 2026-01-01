'use client';

import { ErrorBoundary } from '@/components/error-boundary';
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

function isBypassMode() {
  return (
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith('pk_live_')
  );
}

export function SafeSignUpButton({ children, ...props }: React.ComponentProps<typeof SignUpButton>) {
  if (isBypassMode()) {
    return (
      <span 
        onClick={() => alert('Authentication is disabled in development mode because production keys are detected.')}
        className="cursor-not-allowed opacity-80 block"
        title="Auth Disabled (Dev Mode)"
      >
        {children}
      </span>
    );
  }

  return (
    <ErrorBoundary fallback={({}) => <span title="Auth Error">{children}</span>}>
      <SignUpButton {...props}>{children}</SignUpButton>
    </ErrorBoundary>
  );
}

export function SafeUserButton(props: React.ComponentProps<typeof UserButton>) {
  if (isBypassMode()) {
    // Render a placeholder or null to avoid crashing
    return <div className="h-9 w-9 rounded-full bg-muted border border-border" title="Auth Bypass Mode (User)" />;
  }

  return (
    <ErrorBoundary fallback={({}) => <div className="h-9 w-9 rounded-full bg-muted border border-border" title="Auth Error" />}>
      <UserButton {...props} />
    </ErrorBoundary>
  );
}

export function SafeSignInButton({ children, ...props }: React.ComponentProps<typeof SignInButton>) {
  if (isBypassMode()) {
    // Return a dummy button wrapper that alerts user
    return (
      <span 
        onClick={() => alert('Authentication is disabled in development mode because production keys are detected.')}
        className="cursor-not-allowed opacity-80"
        title="Auth Disabled (Dev Mode)"
      >
        {children}
      </span>
    );
  }

  return (
    <ErrorBoundary fallback={({}) => <span title="Auth Error">{children}</span>}>
      <SignInButton {...props}>{children}</SignInButton>
    </ErrorBoundary>
  );
}
