import { useSafeAuthContext } from '@/components/auth/safe-auth-provider';

export function useSafeAuth() {
  const { auth } = useSafeAuthContext();
  return auth;
}

export function useSafeUser() {
  const { user } = useSafeAuthContext();
  return user;
}
