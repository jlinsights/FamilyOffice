'use client';

import { SignInButton, UserButton } from '@clerk/nextjs';

function isBypassMode() {
  return (
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith('pk_live_')
  );
}

export function SafeUserButton(props: React.ComponentProps<typeof UserButton>) {
  if (isBypassMode()) {
    // Render a placeholder or null to avoid crashing
    return <div className="h-9 w-9 rounded-full bg-muted border border-border" title="Auth Bypass Mode (User)" />;
  }

  return <UserButton {...props} />;
}

export function SafeSignInButton({ children, ...props }: React.ComponentProps<typeof SignInButton>) {
  if (isBypassMode()) {
    // Return a dummy button wrapper that alerts user
    return (
      <div 
        onClick={() => alert('Authentication is disabled in development mode because production keys are detected.')}
        className="cursor-not-allowed opacity-80"
        title="Auth Disabled (Dev Mode)"
      >
        {children}
      </div>
    );
  }

  return <SignInButton {...props}>{children}</SignInButton>;
}
