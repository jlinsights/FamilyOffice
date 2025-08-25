import { createUserProfile, syncUserToSupabase, validateUserData } from '@/lib/user-sync';

// Mock Supabase client
const mockSupabase = {
  from: jest.fn(() => ({
    upsert: jest.fn(),
    select: jest.fn(),
    eq: jest.fn(),
    single: jest.fn()
  })),
  auth: {
    getUser: jest.fn()
  }
};

jest.mock('@/lib/supabase/client', () => ({
  createClient: () => mockSupabase
}));

describe('User Synchronization', () => {
  const mockUser = {
    id: 'user_123',
    email: 'test@example.com',
    firstName: '홍',
    lastName: '길동',
    phoneNumber: '010-1234-5678',
    company: '테스트 기업',
    position: 'CEO',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUserData', () => {
    it('validates correct user data', () => {
      const result = validateUserData(mockUser);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('detects missing required fields', () => {
      const invalidUser = {
        ...mockUser,
        email: '',
        firstName: ''
      };
      
      const result = validateUserData(invalidUser);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('이메일은 필수입니다');
      expect(result.errors).toContain('이름은 필수입니다');
    });

    it('validates email format', () => {
      const invalidEmailUser = {
        ...mockUser,
        email: 'invalid-email'
      };
      
      const result = validateUserData(invalidEmailUser);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('올바른 이메일 형식이 아닙니다');
    });

    it('validates phone number format', () => {
      const invalidPhoneUser = {
        ...mockUser,
        phoneNumber: '123-456-789'
      };
      
      const result = validateUserData(invalidPhoneUser);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('올바른 전화번호 형식이 아닙니다');
    });

    it('accepts Korean phone number formats', () => {
      const validPhoneNumbers = [
        '010-1234-5678',
        '02-1234-5678',
        '031-123-4567',
        '01012345678'
      ];
      
      validPhoneNumbers.forEach(phone => {
        const userWithPhone = { ...mockUser, phoneNumber: phone };
        const result = validateUserData(userWithPhone);
        expect(result.isValid).toBe(true);
      });
    });
  });

  describe('createUserProfile', () => {
    it('creates user profile with correct data structure', () => {
      const profile = createUserProfile(mockUser);
      
      expect(profile).toMatchObject({
        clerk_id: mockUser.id,
        email: mockUser.email,
        first_name: mockUser.firstName,
        last_name: mockUser.lastName,
        full_name: `${mockUser.lastName}${mockUser.firstName}`,
        phone_number: mockUser.phoneNumber,
        company: mockUser.company,
        position: mockUser.position,
        created_at: expect.any(String),
        updated_at: expect.any(String)
      });
    });

    it('handles missing optional fields gracefully', () => {
      const minimalUser = {
        id: 'user_123',
        email: 'test@example.com',
        firstName: '홍',
        lastName: '길동'
      };
      
      const profile = createUserProfile(minimalUser);
      
      expect(profile.phone_number).toBeNull();
      expect(profile.company).toBeNull();
      expect(profile.position).toBeNull();
    });

    it('formats Korean names correctly', () => {
      const koreanUser = {
        ...mockUser,
        firstName: '민수',
        lastName: '김'
      };
      
      const profile = createUserProfile(koreanUser);
      
      expect(profile.full_name).toBe('김민수');
    });
  });

  describe('syncUserToSupabase', () => {
    it('successfully syncs user to Supabase', async () => {
      const mockUpsert = jest.fn().mockResolvedValue({
        data: { id: 1, ...mockUser },
        error: null
      });
      
      mockSupabase.from.mockReturnValue({
        upsert: mockUpsert,
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: 1, ...mockUser },
          error: null
        })
      });

      const result = await syncUserToSupabase(mockUser);
      
      expect(result.success).toBe(true);
      expect(result.user).toBeDefined();
      expect(mockUpsert).toHaveBeenCalledWith(
        expect.objectContaining({
          clerk_id: mockUser.id,
          email: mockUser.email
        })
      );
    });

    it('handles Supabase errors gracefully', async () => {
      const mockUpsert = jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'Database connection failed' }
      });
      
      mockSupabase.from.mockReturnValue({
        upsert: mockUpsert
      });

      const result = await syncUserToSupabase(mockUser);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Database connection failed');
    });

    it('retries failed operations', async () => {
      const mockUpsert = jest.fn()
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          data: { id: 1, ...mockUser },
          error: null
        });
      
      mockSupabase.from.mockReturnValue({
        upsert: mockUpsert,
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: 1, ...mockUser },
          error: null
        })
      });

      const result = await syncUserToSupabase(mockUser);
      
      expect(result.success).toBe(true);
      expect(mockUpsert).toHaveBeenCalledTimes(2);
    });

    it('updates existing user profile', async () => {
      const updatedUser = {
        ...mockUser,
        firstName: '영희',
        updatedAt: new Date('2024-01-02')
      };
      
      const mockUpsert = jest.fn().mockResolvedValue({
        data: { id: 1, ...updatedUser },
        error: null
      });
      
      mockSupabase.from.mockReturnValue({
        upsert: mockUpsert,
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { id: 1, ...updatedUser },
          error: null
        })
      });

      const result = await syncUserToSupabase(updatedUser);
      
      expect(result.success).toBe(true);
      expect(result.user.first_name).toBe('영희');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('handles network timeouts', async () => {
      const mockUpsert = jest.fn().mockRejectedValue(
        new Error('Request timeout')
      );
      
      mockSupabase.from.mockReturnValue({
        upsert: mockUpsert
      });

      const result = await syncUserToSupabase(mockUser);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Request timeout');
    });

    it('handles malformed user data', async () => {
      const malformedUser = {
        id: null,
        email: 'invalid-email',
        firstName: 123,
        lastName: {}
      };
      
      const result = await syncUserToSupabase(malformedUser as any);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('사용자 데이터가 올바르지 않습니다');
    });

    it('handles empty user object', async () => {
      const result = await syncUserToSupabase({} as any);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('사용자 데이터가 비어있습니다');
    });
  });

  describe('Data Validation Rules', () => {
    it('enforces minimum name length', () => {
      const shortNameUser = {
        ...mockUser,
        firstName: 'A',
        lastName: 'B'
      };
      
      const result = validateUserData(shortNameUser);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('이름은 2자 이상이어야 합니다');
    });

    it('enforces maximum name length', () => {
      const longNameUser = {
        ...mockUser,
        firstName: 'A'.repeat(51),
        lastName: 'B'.repeat(51)
      };
      
      const result = validateUserData(longNameUser);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('이름은 50자 이하여야 합니다');
    });

    it('validates company name length', () => {
      const longCompanyUser = {
        ...mockUser,
        company: 'A'.repeat(101)
      };
      
      const result = validateUserData(longCompanyUser);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('회사명은 100자 이하여야 합니다');
    });
  });
});
