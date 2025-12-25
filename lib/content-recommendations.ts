import { RSSItem } from '@/lib/rss-aggregator';

/**
 * Strategy pattern for content recommendations
 */
export interface RecommendationStrategy {
  calculateSimilarity(item1: RSSItem, item2: RSSItem): number;
  getRecommendations(
    currentItem: RSSItem,
    allItems: RSSItem[],
    limit?: number
  ): RSSItem[];
}

/**
 * Rule-based recommendation engine
 * Uses category, tags, and source to calculate content similarity
 */
export class RuleBasedRecommendation implements RecommendationStrategy {
  /**
   * Calculate similarity score between two content items
   * @returns Score from 0-100
   */
  calculateSimilarity(item1: RSSItem, item2: RSSItem): number {
    let score = 0;

    // Same category: +50 points
    if (item1.category && item2.category && item1.category === item2.category) {
      score += 50;
    }

    // Shared tags: +20 points per tag
    if (item1.tags && item2.tags) {
      const sharedTags = item1.tags.filter(tag =>
        item2.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
      );
      score += sharedTags.length * 20;
    }

    // Same source: +10 points
    if (item1.source === item2.source) {
      score += 10;
    }

    // Recency bonus: newer content gets slight boost
    if (item2.publishedAt) {
      const daysSince =
        (Date.now() - new Date(item2.publishedAt).getTime()) /
        (1000 * 60 * 60 * 24);
      if (daysSince < 30) {
        score += Math.max(0, 5 - Math.floor(daysSince / 7)); // 5 points if < 7 days, decreasing weekly
      }
    }

    return Math.min(score, 100); // Cap at 100
  }

  /**
   * Get recommended content items
   */
  getRecommendations(
    currentItem: RSSItem,
    allItems: RSSItem[],
    limit = 3
  ): RSSItem[] {
    return allItems
      .filter(item => item.id !== currentItem.id) // Exclude current item
      .map(item => ({
        item,
        score: this.calculateSimilarity(currentItem, item),
      }))
      .filter(r => r.score > 0) // Only include items with some similarity
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .slice(0, limit)
      .map(r => r.item);
  }
}

/**
 * Get recommendations for a content item
 * @param currentItem The current content item
 * @param allItems All available content items
 * @param limit Number of recommendations to return (default: 3)
 * @returns Array of recommended items
 */
export function getRecommendations(
  currentItem: RSSItem,
  allItems: RSSItem[],
  limit = 3
): RSSItem[] {
  const recommender = new RuleBasedRecommendation();
  return recommender.getRecommendations(currentItem, allItems, limit);
}
