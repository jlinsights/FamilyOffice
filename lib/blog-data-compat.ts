/**
 * Backward Compatibility Layer for Blog Data
 * 
 * This file maintains compatibility with existing imports while
 * enabling gradual migration to code-split structure.
 * 
 * New code should import from '@/lib/blog-data' (this file uses new structure)
 * Legacy imports will continue to work during migration period.
 */

// Re-export categories (small, can stay in main bundle)
export { blogCategories } from './blog-data';

// For backward compatibility, re-export the old blogPosts object
// This loads ALL posts, so it's what we want to migrate away from
import { blogPosts as legacyBlogPosts } from './blog-data.legacy';

/**
 * @deprecated Use getBlogPost(slug) for individual posts or blogPostsMeta for listing
 * This exports the full blog posts object for backward compatibility
 */
export const blogPosts = legacyBlogPosts;

// Export new optimized functions
export {
    getAllBlogPostsMeta,
    getBlogPost,
    getBlogPostsByCategory,
    getFeaturedPosts,
    type BlogPostMeta
} from './blog-data';

