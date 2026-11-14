/**
 * Vercel Preview 에서 관리자 확인을 건너뛰지 않는지 확인한다.
 * Preview 주소는 공개될 수 있으므로, 우회가 남아 있으면 Preview 에 service role 키가
 * 들어가는 순간 누구나 관리자 데이터를 읽는다.
 */
const mockAuth = jest.fn();
const mockCurrentUser = jest.fn();

jest.mock('@clerk/nextjs/server', () => ({
  auth: () => mockAuth(),
  currentUser: () => mockCurrentUser(),
}));

import {
  checkAdminPermissions,
  requireAdminPermissions,
} from '@/lib/admin-permissions';

describe('관리자 권한 확인 — Vercel Preview', () => {
  const env = process.env as Record<string, string | undefined>;
  const originalNodeEnv = env.NODE_ENV;
  const originalVercelEnv = process.env.VERCEL_ENV;
  const originalAdminEmails = process.env.ADMIN_EMAILS;

  beforeEach(() => {
    // Vercel Preview 는 NODE_ENV=production + VERCEL_ENV=preview 로 돈다
    env.NODE_ENV = 'production';
    process.env.VERCEL_ENV = 'preview';
    process.env.ADMIN_EMAILS = 'admin@familyoffices.vip';
    mockAuth.mockReset();
    mockCurrentUser.mockReset();
  });

  afterEach(() => {
    env.NODE_ENV = originalNodeEnv;
    process.env.VERCEL_ENV = originalVercelEnv;
    process.env.ADMIN_EMAILS = originalAdminEmails;
  });

  it('로그인하지 않은 방문자는 관리자가 아니다', async () => {
    mockAuth.mockResolvedValue({ userId: null });

    await expect(checkAdminPermissions()).resolves.toBe(false);
  });

  it('관리자 목록에 없는 사용자는 관리자가 아니다', async () => {
    mockAuth.mockResolvedValue({ userId: 'user_1' });
    mockCurrentUser.mockResolvedValue({
      emailAddresses: [{ emailAddress: 'someone@example.com' }],
    });

    await expect(checkAdminPermissions()).resolves.toBe(false);
  });

  it('관리자 목록에 있는 사용자는 관리자다', async () => {
    mockAuth.mockResolvedValue({ userId: 'user_2' });
    mockCurrentUser.mockResolvedValue({
      emailAddresses: [{ emailAddress: 'admin@familyoffices.vip' }],
    });

    await expect(checkAdminPermissions()).resolves.toBe(true);
  });

  it('requireAdminPermissions 도 로그인하지 않은 방문자를 막는다', async () => {
    mockAuth.mockResolvedValue({ userId: null });

    await expect(requireAdminPermissions()).rejects.toThrow();
  });
});
