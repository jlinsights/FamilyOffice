/**
 * /admin/consultations 서버 페이지가 관리자 확인 없이 service role 로 상담 신청 전체를 읽지 않는지 확인한다.
 * 미들웨어는 로그인만 요구하므로, 누구나 가입한 계정으로도 이 페이지에 닿는다.
 */
const mockCheckAdmin = jest.fn<Promise<boolean>, []>();
const mockCreateAdminClient = jest.fn();
const mockRedirect = jest.fn((url: string) => {
  throw new Error(`NEXT_REDIRECT:${url}`);
});

jest.mock('next/navigation', () => ({
  redirect: (url: string) => mockRedirect(url),
}));

jest.mock('@/lib/admin-permissions', () => ({
  checkAdminPermissions: () => mockCheckAdmin(),
}));

jest.mock('@/lib/supabase/admin-client', () => ({
  createAdminClient: () => mockCreateAdminClient(),
}));

jest.mock('@/components/header', () => ({ Header: () => null }));
jest.mock('@/components/footer', () => ({ Footer: () => null }));

import ConsultationsPage from '@/app/admin/consultations/page';

describe('/admin/consultations 관리자 확인', () => {
  const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role-dummy';
    mockCheckAdmin.mockReset();
    mockCreateAdminClient.mockReset();
    mockRedirect.mockImplementation((url: string) => {
      throw new Error(`NEXT_REDIRECT:${url}`);
    });
    mockCreateAdminClient.mockImplementation(() => ({
      from: () => ({
        select: () => ({
          order: async () => ({ data: [], error: null }),
        }),
      }),
    }));
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
    process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
  });

  it('관리자가 아니면 DB 를 읽지 않고 홈으로 보낸다', async () => {
    mockCheckAdmin.mockResolvedValue(false);

    await expect(ConsultationsPage()).rejects.toThrow('NEXT_REDIRECT:/');
    expect(mockCreateAdminClient).not.toHaveBeenCalled();
  });

  it('권한 확인이 예외를 던져도 DB 를 읽지 않는다', async () => {
    mockCheckAdmin.mockRejectedValue(new Error('clerk down'));

    await expect(ConsultationsPage()).rejects.toThrow('NEXT_REDIRECT:/');
    expect(mockCreateAdminClient).not.toHaveBeenCalled();
  });

  it('관리자면 상담 신청 목록을 읽는다', async () => {
    mockCheckAdmin.mockResolvedValue(true);

    await ConsultationsPage();

    expect(mockRedirect).not.toHaveBeenCalled();
    expect(mockCreateAdminClient).toHaveBeenCalledTimes(1);
  });
});
