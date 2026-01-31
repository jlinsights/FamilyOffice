/**
 * Centralized exports for all components
 * Maintains backward compatibility with existing import paths
 */

// Re-export UI components (shadcn/ui)
export * from './ui';

// Re-export layout components
export { Header } from './layout/header/Header';
export { Footer } from './layout/footer/Footer';

// Re-export feature components
export {
  SafeSignInButton,
  SafeUserButton,
} from './features/auth/safe-clerk-components';

// Re-export business logic components
export { ClientWrapper } from './client-wrapper';
export { Logo } from './logo';

// Re-export theme components
export { ThemeToggle, ThemeProvider } from './theme/theme-provider';

// Re-export hooks
export * from './hooks';

// Re-export utilities
export * from './utils';

// Re-export types
export * from './types';

// Re-export providers
export * from './providers';

// Re-export pages
export * from './pages';
