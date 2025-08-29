import { syncCurrentUser, getUserByClerkId } from '@/lib/user-sync';

// Mock Clerk
jest.mock('@clerk/nextjs/server', () => ({
  currentUser: jest.fn()
}));

// Mock Supabase
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn()
        }))
      })),
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn()
        }))
      })),
      upsert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn()
        }))
      }))
    }))
  }))
}));

describe('User Synchronization', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('syncCurrentUser', () => {
    it('should return null when no user is logged in', async () => {
      const { currentUser } = require('@clerk/nextjs/server');
      currentUser.mockResolvedValue(null);

      const result = await syncCurrentUser();
      expect(result).toBeNull();
    });

    it('should handle sync errors gracefully', async () => {
      const { currentUser } = require('@clerk/nextjs/server');
      currentUser.mockRejectedValue(new Error('Sync failed'));

      await expect(syncCurrentUser()).rejects.toThrow('Sync failed');
    });
  });

  describe('getUserByClerkId', () => {
    it('should return null for non-existent user', async () => {
      const result = await getUserByClerkId('non-existent-id');
      expect(result).toBeNull();
    });
  });
});