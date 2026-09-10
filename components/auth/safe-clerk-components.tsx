'use client';

import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

function isClerkUnavailable() {
  return !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
}

function isBypassMode() {
  return (
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith('pk_live_')
  );
}

export function SafeSignUpButton({
  children,
  ...props
}: React.ComponentProps<typeof SignUpButton>) {
  if (isClerkUnavailable()) {
    return <>{children}</>;
  }

  if (isBypassMode()) {
    return (
      <span
        onClick={() =>
          alert(
            'Authentication is disabled in development mode because production keys are detected.'
          )
        }
        className="cursor-not-allowed opacity-80 block"
        title="Auth Disabled (Dev Mode)"
      >
        {children}
      </span>
    );
  }

  return <SignUpButton {...props}>{children}</SignUpButton>;
}

export function SafeUserButton(props: React.ComponentProps<typeof UserButton>) {
  if (isClerkUnavailable() || isBypassMode()) {
    return (
      <div
        className="h-9 w-9 rounded-full bg-muted border border-border"
        title="Auth Bypass Mode (User)"
      />
    );
  }

  return <UserButton {...props} />;
}

export function SafeSignInButton({
  children,
  ...props
}: React.ComponentProps<typeof SignInButton>) {
  if (isClerkUnavailable()) {
    return <>{children}</>;
  }

  if (isBypassMode()) {
    return (
      <span
        onClick={() =>
          alert(
            'Authentication is disabled in development mode because production keys are detected.'
          )
        }
        className="cursor-not-allowed opacity-80"
        title="Auth Disabled (Dev Mode)"
      >
        {children}
      </span>
    );
  }

  return <SignInButton {...props}>{children}</SignInButton>;
}
