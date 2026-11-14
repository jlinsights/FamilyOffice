/**
 * 관리자 Server Action 이 관리자 확인 없이 service role 로 DB 를 읽지 않는지 확인한다.
 * app/admin/actions.ts 는 RLS 를 우회하는 createAdminClient() 를 쓰므로,
 * 호출자 확인이 빠지면 로그인하지 않은 누구나 상담·구조점검 신청자의 이름·이메일·전화번호를 받는다.
 */
const mockCheckAdmin = jest.fn<Promise<boolean>, []>();
const mockCreateAdminClient = jest.fn();

jest.mock('@/lib/admin-permissions', () => ({
  checkAdminPermissions: () => mockCheckAdmin(),
}));

jest.mock('@/lib/supabase/admin-client', () => ({
  createAdminClient: () => mockCreateAdminClient(),
}));

import { getAdminStats, getStructureCheckRequests } from '@/app/admin/actions';

function fakeSupabase() {
  const result = { data: [], count: 0, error: null };
  const query: Record<string, unknown> = {};
  for (const method of ['select', 'order', 'gte', 'eq', 'in']) {
    query[method] = () => query;
  }
  query.then = (resolve: (value: typeof result) => unknown) => resolve(result);
  return { from: () => query };
}

describe('관리자 Server Action 권한 확인', () => {
  beforeEach(() => {
    mockCheckAdmin.mockReset();
    mockCreateAdminClient.mockReset();
    mockCreateAdminClient.mockImplementation(fakeSupabase);
  });

  it.each([
    ['getStructureCheckRequests', getStructureCheckRequests],
    ['getAdminStats', getAdminStats],
  ])(
    '%s 는 관리자가 아니면 DB 를 읽지 않고 거절한다',
    async (_name, action) => {
      mockCheckAdmin.mockResolvedValue(false);

      const result = await action();

      expect(result.data).toBeNull();
      expect(result.error).toBe('Unauthorized');
      expect(mockCreateAdminClient).not.toHaveBeenCalled();
    }
  );

  it('관리자면 구조점검 신청 목록을 읽는다', async () => {
    mockCheckAdmin.mockResolvedValue(true);

    const result = await getStructureCheckRequests();

    expect(mockCreateAdminClient).toHaveBeenCalledTimes(1);
    expect(result.error).toBeNull();
    expect(result.data).toEqual([]);
  });

  it('권한 확인이 예외를 던지면 DB 를 읽지 않는다', async () => {
    mockCheckAdmin.mockRejectedValue(new Error('clerk down'));

    const result = await getStructureCheckRequests();

    expect(result.data).toBeNull();
    expect(mockCreateAdminClient).not.toHaveBeenCalled();
  });
});
