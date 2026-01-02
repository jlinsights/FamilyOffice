/**
 * Legacy Blog Data Module
 * Stub implementation for backward compatibility
 */

export interface LegacyBlogPost {
  id: string;
  title: string;
  slug: string;
}

export const legacyBlogPosts: LegacyBlogPost[] = [];

// Re-export as blogPosts for backward compatibility
export const blogPosts = legacyBlogPosts;
