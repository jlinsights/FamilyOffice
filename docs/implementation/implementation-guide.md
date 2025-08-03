# 프로그램 관리 시스템 구현 가이드

## 🚀 구현 로드맵

### Phase 1: 기본 인프라 구축 (2주)

#### Week 1: 데이터베이스 및 기본 API

```bash
# 1. 데이터베이스 스키마 구축
# Supabase에서 program-schema.sql 실행

# 2. 기본 타입 정의
touch types/program.ts
touch types/registration.ts
touch types/api.ts

# 3. 기본 API 라우트 생성
mkdir app/api/programs
touch app/api/programs/route.ts
mkdir app/api/registrations
touch app/api/registrations/route.ts
```

#### Week 2: 기본 UI 컴포넌트

```bash
# 1. 프로그램 관련 컴포넌트
mkdir components/program
touch components/program/ProgramCard.tsx
touch components/program/ProgramList.tsx
touch components/program/ProgramDetail.tsx

# 2. 폼 컴포넌트
mkdir components/forms
touch components/forms/RegistrationForm.tsx
touch components/forms/ProgramSearchForm.tsx

# 3. 기본 페이지 구조
touch app/programs/page.tsx
mkdir app/programs/[id]
touch app/programs/[id]/page.tsx
```

### Phase 2: 핵심 기능 구현 (3주)

#### Week 3-4: 프로그램 관리

- [x] 프로그램 CRUD API 구현
- [x] 프로그램 목록/상세 페이지
- [x] 검색 및 필터링 기능
- [x] 카테고리별 프로그램 분류

#### Week 5: 등록 시스템

- [ ] 사용자 등록 신청 API
- [ ] 관리자 승인/거부 시스템
- [ ] 이메일 알림 시스템
- [ ] 대기열 관리

### Phase 3: 고도화 기능 (2주)

#### Week 6: 관리자 도구

- [ ] 관리자 대시보드
- [ ] 참가자 관리 시스템
- [ ] 통계 및 분석 도구
- [ ] 일정 관리 시스템

#### Week 7: 최적화 및 테스트

- [ ] 성능 최적화
- [ ] 테스트 코드 작성
- [ ] 접근성 개선
- [ ] 모바일 최적화

## 📁 파일 구조

```
FamilyOffice/
├── app/
│   ├── api/
│   │   ├── programs/
│   │   │   ├── route.ts                    # GET, POST /api/programs
│   │   │   ├── [id]/
│   │   │   │   ├── route.ts               # GET, PUT, DELETE /api/programs/[id]
│   │   │   │   ├── schedules/
│   │   │   │   │   └── route.ts           # 프로그램 일정 API
│   │   │   │   └── registrations/
│   │   │   │       └── route.ts           # 프로그램별 등록 현황
│   │   │   └── categories/
│   │   │       └── [category]/
│   │   │           └── route.ts           # 카테고리별 프로그램
│   │   ├── registrations/
│   │   │   ├── route.ts                   # GET, POST /api/registrations
│   │   │   └── [id]/
│   │   │       ├── route.ts               # 등록 상세/수정/삭제
│   │   │       └── attendance/
│   │   │           └── route.ts           # 출석 관리
│   │   ├── admin/
│   │   │   ├── dashboard/
│   │   │   │   └── route.ts               # 대시보드 데이터
│   │   │   ├── programs/
│   │   │   │   └── route.ts               # 관리자 프로그램 관리
│   │   │   └── registrations/
│   │   │       ├── route.ts               # 등록 승인/거부
│   │   │       └── bulk/
│   │   │           └── route.ts           # 대량 처리
│   │   ├── users/
│   │   │   ├── profile/
│   │   │   │   └── route.ts               # 사용자 프로필
│   │   │   └── registrations/
│   │   │       └── route.ts               # 사용자 등록 목록
│   │   └── notifications/
│   │       ├── route.ts                   # 알림 목록
│   │       └── [id]/
│   │           └── read/
│   │               └── route.ts           # 알림 읽음 처리
│   ├── programs/
│   │   ├── page.tsx                       # 프로그램 목록 페이지
│   │   ├── [id]/
│   │   │   ├── page.tsx                   # 프로그램 상세 페이지
│   │   │   └── register/
│   │   │       └── page.tsx               # 등록 신청 페이지
│   │   └── category/
│   │       └── [category]/
│   │           └── page.tsx               # 카테고리별 프로그램
│   ├── admin/
│   │   ├── programs/
│   │   │   ├── page.tsx                   # 프로그램 관리
│   │   │   ├── new/
│   │   │   │   └── page.tsx               # 프로그램 생성
│   │   │   └── [id]/
│   │   │       ├── edit/
│   │   │       │   └── page.tsx           # 프로그램 수정
│   │   │       └── registrations/
│   │   │           └── page.tsx           # 등록자 관리
│   │   ├── registrations/
│   │   │   └── page.tsx                   # 등록 관리
│   │   └── dashboard/
│   │       └── page.tsx                   # 관리자 대시보드
│   └── my/
│       ├── programs/
│       │   └── page.tsx                   # 내 프로그램
│       └── profile/
│           └── page.tsx                   # 프로필 관리
├── components/
│   ├── program/
│   │   ├── ProgramCard.tsx                # 프로그램 카드
│   │   ├── ProgramList.tsx                # 프로그램 목록
│   │   ├── ProgramDetail.tsx              # 프로그램 상세
│   │   ├── ProgramSchedule.tsx            # 일정 표시
│   │   ├── ProgramStats.tsx               # 통계 표시
│   │   └── CategoryFilter.tsx             # 카테고리 필터
│   ├── registration/
│   │   ├── RegistrationForm.tsx           # 등록 폼
│   │   ├── RegistrationStatus.tsx         # 등록 상태
│   │   ├── RegistrationList.tsx           # 등록 목록
│   │   └── AttendanceTracker.tsx          # 출석 추적
│   ├── admin/
│   │   ├── ProgramManager.tsx             # 프로그램 관리
│   │   ├── RegistrationManager.tsx        # 등록 관리
│   │   ├── Dashboard.tsx                  # 대시보드
│   │   └── Analytics.tsx                  # 분석 도구
│   ├── forms/
│   │   ├── ProgramCreateForm.tsx          # 프로그램 생성 폼
│   │   ├── ProgramEditForm.tsx            # 프로그램 수정 폼
│   │   ├── RegistrationForm.tsx           # 등록 신청 폼
│   │   └── SearchForm.tsx                 # 검색 폼
│   └── ui/
│       ├── SearchInput.tsx                # 검색 입력
│       ├── FilterDropdown.tsx             # 필터 드롭다운
│       ├── StatusBadge.tsx                # 상태 배지
│       └── LoadingSpinner.tsx             # 로딩 스피너
├── lib/
│   ├── api/
│   │   ├── programs.ts                    # 프로그램 API 클라이언트
│   │   ├── registrations.ts               # 등록 API 클라이언트
│   │   ├── users.ts                       # 사용자 API 클라이언트
│   │   └── admin.ts                       # 관리자 API 클라이언트
│   ├── hooks/
│   │   ├── usePrograms.ts                 # 프로그램 상태 관리
│   │   ├── useRegistration.ts             # 등록 상태 관리
│   │   ├── useAuth.ts                     # 인증 상태 관리
│   │   └── useAdmin.ts                    # 관리자 기능
│   ├── validations/
│   │   ├── program.ts                     # 프로그램 검증 스키마
│   │   ├── registration.ts                # 등록 검증 스키마
│   │   └── user.ts                        # 사용자 검증 스키마
│   └── utils/
│       ├── program-helpers.ts             # 프로그램 유틸리티
│       ├── date-helpers.ts                # 날짜 유틸리티
│       └── formatting.ts                  # 포맷팅 유틸리티
├── types/
│   ├── program.ts                         # 프로그램 타입 정의
│   ├── registration.ts                    # 등록 타입 정의
│   ├── user.ts                           # 사용자 타입 정의
│   └── api.ts                            # API 응답 타입
└── docs/
    ├── architecture/                      # 아키텍처 문서
    ├── api/                              # API 명세서
    ├── components/                       # 컴포넌트 문서
    └── implementation/                   # 구현 가이드
```

## 🔧 개발 환경 설정

### 1. 의존성 설치

```bash
# 기존 프로젝트에 추가 패키지 설치
npm install @hookform/resolvers react-hook-form zod
npm install @tanstack/react-query
npm install date-fns
npm install react-window react-window-infinite-loader
npm install @types/react-window -D
```

### 2. 환경 변수 설정

```bash
# .env.local에 추가
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# 이메일 서비스 (선택)
RESEND_API_KEY=your_resend_key
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
```

### 3. Supabase 설정

```sql
-- 1. program-schema.sql 실행
-- 2. RLS 정책 활성화
-- 3. Clerk 웹훅 설정을 통한 사용자 동기화
```

## 📝 구현 단계별 가이드

### Step 1: 기본 타입 정의

```typescript
// types/program.ts
export interface Program {
  id: string;
  title: string;
  slug: string;
  category: ProgramCategory;
  description: string;
  summary: string;
  targetAudience: string;
  capacity: number;
  frequency?: string;
  duration?: number;
  price: number;
  currency: string;
  status: ProgramStatus;
  requirements: string[];
  benefits: string[];
  featuredImage?: string;
  galleryImages: string[];
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  autoApprove: boolean;
  requireApproval: boolean;
  allowWaitlist: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;

  // 관계형 데이터
  schedules?: ProgramSchedule[];
  instructors?: Instructor[];
  registrations?: Registration[];

  // 계산된 필드
  totalRegistrations?: number;
  approvedRegistrations?: number;
  pendingRegistrations?: number;
  nextSessionDate?: string;
  totalSessions?: number;
}

export type ProgramCategory =
  | 'ceo_education'
  | 'asset_management'
  | 'networking'
  | 'cultural'
  | 'investment';

export type ProgramStatus =
  | 'draft'
  | 'published'
  | 'registration_open'
  | 'full'
  | 'in_progress'
  | 'completed'
  | 'cancelled';
```

### Step 2: API 클라이언트 구현

```typescript
// lib/api/programs.ts
import { createClient } from '@/lib/supabase/client';

export class ProgramsAPI {
  private supabase = createClient();

  async list(params: {
    page?: number;
    limit?: number;
    category?: ProgramCategory;
    status?: ProgramStatus;
    search?: string;
    sort?: string;
    order?: 'asc' | 'desc';
  }) {
    let query = this.supabase.from('program_details').select('*');

    // 필터 적용
    if (params.category) {
      query = query.eq('category', params.category);
    }

    if (params.status) {
      query = query.eq('status', params.status);
    } else {
      // 기본적으로 공개된 프로그램만 조회
      query = query.in('status', [
        'published',
        'registration_open',
        'full',
        'in_progress',
      ]);
    }

    if (params.search) {
      query = query.or(
        `title.ilike.%${params.search}%,description.ilike.%${params.search}%`
      );
    }

    // 정렬
    const sortField = params.sort || 'created_at';
    const sortOrder = params.order || 'desc';
    query = query.order(sortField, { ascending: sortOrder === 'asc' });

    // 페이지네이션
    const page = params.page || 1;
    const limit = params.limit || 10;
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data: data as Program[],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
        hasMore: (count || 0) > page * limit,
      },
    };
  }

  async getById(id: string) {
    const { data, error } = await this.supabase
      .from('program_details')
      .select(
        `
        *,
        schedules:program_schedules(*),
        instructors:program_instructors(
          role,
          instructor:instructors(*)
        )
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Program;
  }

  async create(program: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await this.supabase
      .from('programs')
      .insert(program)
      .select()
      .single();

    if (error) throw error;
    return data as Program;
  }

  async update(id: string, updates: Partial<Program>) {
    const { data, error } = await this.supabase
      .from('programs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Program;
  }

  async delete(id: string) {
    const { error } = await this.supabase
      .from('programs')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

export const programsAPI = new ProgramsAPI();
```

### Step 3: React Hook 구현

```typescript
// hooks/usePrograms.ts
import { useState, useEffect, useCallback } from 'react';

import { programsAPI } from '@/lib/api/programs';

import { Program, ProgramCategory, ProgramStatus } from '@/types/program';

interface UseProgramsParams {
  category?: ProgramCategory;
  status?: ProgramStatus;
  search?: string;
  autoFetch?: boolean;
}

export function usePrograms(params: UseProgramsParams = {}) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchPrograms = useCallback(
    async (reset = false) => {
      try {
        setLoading(true);
        setError(null);

        const response = await programsAPI.list({
          ...params,
          page: reset ? 1 : page,
          limit: 10,
        });

        if (reset) {
          setPrograms(response.data);
          setPage(1);
        } else {
          setPrograms(prev => [...prev, ...response.data]);
        }

        setHasMore(response.pagination.hasMore);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : '프로그램을 불러오는 중 오류가 발생했습니다.'
        );
      } finally {
        setLoading(false);
      }
    },
    [params, page]
  );

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  const refresh = useCallback(() => {
    setPage(1);
    fetchPrograms(true);
  }, [fetchPrograms]);

  // 필터 변경시 리셋
  useEffect(() => {
    if (params.autoFetch !== false) {
      refresh();
    }
  }, [params.category, params.status, params.search]);

  // 페이지 변경시 추가 로딩
  useEffect(() => {
    if (page > 1) {
      fetchPrograms();
    }
  }, [page]);

  return {
    programs,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    fetchPrograms,
  };
}
```

### Step 4: 기본 컴포넌트 구현

```typescript
// components/program/ProgramCard.tsx
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Program } from '@/types/program'
import { Users, Calendar, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProgramCardProps {
  program: Program
  variant?: 'default' | 'compact' | 'featured'
  showRegistrationButton?: boolean
  className?: string
}

export function ProgramCard({
  program,
  variant = 'default',
  showRegistrationButton = true,
  className
}: ProgramCardProps) {
  const isRegistrationOpen = program.status === 'registration_open'
  const isFull = (program.approvedRegistrations || 0) >= program.capacity

  return (
    <Card className={`program-card ${variant} ${className}`}>
      {/* 프로그램 이미지 */}
      {program.featuredImage && (
        <div className="program-image">
          <Image
            src={program.featuredImage}
            alt={program.title}
            fill
            className="object-cover"
          />
          <div className="status-badge">
            <Badge variant={getStatusVariant(program.status)}>
              {getStatusText(program.status)}
            </Badge>
          </div>
        </div>
      )}

      <CardContent className="program-content">
        {/* 카테고리 */}
        <div className="program-category">
          <Badge variant="outline">
            {getCategoryText(program.category)}
          </Badge>
        </div>

        {/* 제목 */}
        <h3 className="program-title">
          <Link href={`/programs/${program.id}`}>
            {program.title}
          </Link>
        </h3>

        {/* 요약 */}
        <p className="program-summary">{program.summary}</p>

        {/* 메타 정보 */}
        <div className="program-meta">
          <div className="program-capacity">
            <Users className="h-4 w-4" />
            <span>{program.approvedRegistrations || 0}/{program.capacity}</span>
          </div>

          {program.duration && (
            <div className="program-duration">
              <Clock className="h-4 w-4" />
              <span>{program.duration}분</span>
            </div>
          )}

          <div className="program-price">
            {program.price > 0 ? (
              <span>{formatPrice(program.price)}</span>
            ) : (
              <span>무료</span>
            )}
          </div>
        </div>

        {/* 다음 일정 */}
        {program.nextSessionDate && (
          <div className="next-session">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(program.nextSessionDate)}</span>
          </div>
        )}

        {/* 등록 버튼 */}
        {showRegistrationButton && (
          <Button
            asChild
            disabled={!isRegistrationOpen || isFull}
            className="w-full"
          >
            <Link href={`/programs/${program.id}/register`}>
              {getRegistrationButtonText(program)}
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// 유틸리티 함수들
function getStatusVariant(status: Program['status']): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'registration_open': return 'default'
    case 'full': return 'secondary'
    case 'cancelled': return 'destructive'
    default: return 'outline'
  }
}

function getStatusText(status: Program['status']): string {
  const statusMap = {
    draft: '임시저장',
    published: '게시됨',
    registration_open: '등록 가능',
    full: '정원 마감',
    in_progress: '진행 중',
    completed: '완료',
    cancelled: '취소됨'
  }
  return statusMap[status] || status
}

function getCategoryText(category: Program['category']): string {
  const categoryMap = {
    ceo_education: 'CEO 교육',
    asset_management: '자산 관리',
    networking: '네트워킹',
    cultural: '문화',
    investment: '투자'
  }
  return categoryMap[category] || category
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(price)
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short'
  }).format(new Date(dateString))
}

function getRegistrationButtonText(program: Program): string {
  if (program.status !== 'registration_open') {
    return '등록 불가'
  }

  if ((program.approvedRegistrations || 0) >= program.capacity) {
    return '정원 마감'
  }

  return '등록 신청'
}
```

### Step 5: API 라우트 구현

```typescript
// app/api/programs/route.ts
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

import { programsAPI } from '@/lib/api/programs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      category: searchParams.get('category') as any,
      status: searchParams.get('status') as any,
      search: searchParams.get('search') || undefined,
      sort: searchParams.get('sort') || 'created_at',
      order: (searchParams.get('order') || 'desc') as 'asc' | 'desc',
    };

    const result = await programsAPI.list(params);

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error('Programs API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: '프로그램을 불러오는 중 오류가 발생했습니다.',
        },
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'AUTH_001',
            message: '인증이 필요합니다.',
          },
        },
        { status: 401 }
      );
    }

    // 관리자 권한 확인
    const isAdmin = await checkAdminPermission(userId);
    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'AUTH_003',
            message: '관리자 권한이 필요합니다.',
          },
        },
        { status: 403 }
      );
    }

    const programData = await request.json();
    const program = await programsAPI.create(programData);

    return NextResponse.json({
      success: true,
      data: program,
      message: '프로그램이 성공적으로 생성되었습니다.',
    });
  } catch (error) {
    console.error('Program Creation Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'CREATE_ERROR',
          message: '프로그램 생성 중 오류가 발생했습니다.',
        },
      },
      { status: 500 }
    );
  }
}

async function checkAdminPermission(userId: string): Promise<boolean> {
  // 실제 구현에서는 데이터베이스에서 사용자 권한 확인
  // 현재는 하드코딩된 관리자 이메일 체크
  const adminEmails = ['jhlim725@gmail.com'];

  try {
    const user = await clerkClient.users.getUser(userId);
    return adminEmails.includes(user.emailAddresses[0]?.emailAddress || '');
  } catch {
    return false;
  }
}
```

## 🧪 테스트 전략

### 단위 테스트

```typescript
// __tests__/hooks/usePrograms.test.ts
import { renderHook, waitFor } from '@testing-library/react';

import { usePrograms } from '@/hooks/usePrograms';

jest.mock('@/lib/api/programs');

describe('usePrograms', () => {
  it('should fetch programs on mount', async () => {
    const { result } = renderHook(() => usePrograms());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.programs).toBeDefined();
  });
});
```

### 통합 테스트

```typescript
// __tests__/api/programs.test.ts
import { NextRequest } from 'next/server';

import { GET } from '@/app/api/programs/route';

describe('/api/programs', () => {
  it('should return programs list', async () => {
    const request = new NextRequest('http://localhost:3000/api/programs');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
  });
});
```

## 📚 추가 리소스

### 유용한 라이브러리

- **React Query**: 서버 상태 관리
- **React Hook Form**: 폼 관리
- **Zod**: 스키마 검증
- **date-fns**: 날짜 유틸리티
- **react-window**: 가상화
- **Framer Motion**: 애니메이션

### 성능 최적화 팁

1. **이미지 최적화**: Next.js Image 컴포넌트 사용
2. **코드 스플리팅**: 동적 import 활용
3. **메모이제이션**: React.memo, useMemo 적극 활용
4. **가상화**: 긴 목록에 react-window 사용
5. **캐싱**: SWR 또는 React Query로 데이터 캐싱

### 보안 고려사항

1. **입력 검증**: 모든 사용자 입력에 대한 검증
2. **권한 확인**: API별 적절한 권한 확인
3. **SQL 인젝션**: Supabase 쿼리 빌더 사용
4. **XSS 방지**: 사용자 입력 데이터 이스케이프
5. **CSRF 방지**: CSRF 토큰 또는 SameSite 쿠키

이 구현 가이드를 따라 단계별로 진행하면 완전한 프로그램 관리 시스템을 구축할 수 있습니다.
