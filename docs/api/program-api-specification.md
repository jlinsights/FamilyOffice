# 프로그램 관리 시스템 API 명세서

## 📋 개요

FamilyOffice 프로그램 관리 시스템의 RESTful API 명세서입니다. Next.js API Routes를 기반으로 구현됩니다.

## 🔑 인증

모든 API는 Clerk JWT 토큰을 사용한 Bearer 인증을 사용합니다.

```typescript
headers: {
  'Authorization': 'Bearer <jwt_token>',
  'Content-Type': 'application/json'
}
```

## 📊 응답 형식

### 성공 응답
```typescript
{
  success: true,
  data: any,
  message?: string,
  pagination?: {
    page: number,
    limit: number,
    total: number,
    totalPages: number
  }
}
```

### 에러 응답
```typescript
{
  success: false,
  error: {
    code: string,
    message: string,
    details?: any
  }
}
```

## 🏗️ API 엔드포인트

### 1. 프로그램 관리 API

#### GET `/api/programs`
프로그램 목록 조회

**Query Parameters:**
```typescript
{
  page?: number = 1,
  limit?: number = 10,
  category?: 'ceo_education' | 'asset_management' | 'networking' | 'cultural' | 'investment',
  status?: 'published' | 'registration_open' | 'full' | 'in_progress' | 'completed',
  search?: string,
  sort?: 'created_at' | 'start_date' | 'title' | 'popularity',
  order?: 'asc' | 'desc'
}
```

**응답:**
```typescript
{
  success: true,
  data: Program[],
  pagination: PaginationInfo
}
```

**구현 파일:** `/app/api/programs/route.ts`

---

#### GET `/api/programs/[id]`
특정 프로그램 상세 조회

**Path Parameters:**
- `id`: 프로그램 UUID

**응답:**
```typescript
{
  success: true,
  data: ProgramDetail
}
```

**구현 파일:** `/app/api/programs/[id]/route.ts`

---

#### POST `/api/programs`
새 프로그램 생성 (관리자 전용)

**요청 본문:**
```typescript
{
  title: string,
  slug: string,
  category: ProgramCategory,
  description: string,
  summary?: string,
  targetAudience: string,
  capacity: number,
  frequency?: string,
  duration?: number,
  price?: number,
  requirements?: string[],
  benefits?: string[],
  featuredImage?: string,
  galleryImages?: string[],
  tags?: string[],
  schedules?: ProgramScheduleInput[]
}
```

**응답:**
```typescript
{
  success: true,
  data: Program,
  message: "프로그램이 성공적으로 생성되었습니다."
}
```

---

#### PUT `/api/programs/[id]`
프로그램 정보 수정 (관리자 전용)

**요청 본문:** POST와 동일

**응답:**
```typescript
{
  success: true,
  data: Program,
  message: "프로그램이 성공적으로 수정되었습니다."
}
```

---

#### DELETE `/api/programs/[id]`
프로그램 삭제 (관리자 전용)

**응답:**
```typescript
{
  success: true,
  message: "프로그램이 성공적으로 삭제되었습니다."
}
```

---

### 2. 등록 관리 API

#### GET `/api/registrations`
사용자 등록 목록 조회

**Query Parameters:**
```typescript
{
  page?: number = 1,
  limit?: number = 10,
  status?: RegistrationStatus,
  programId?: string,
  userId?: string // 관리자만 사용 가능
}
```

**응답:**
```typescript
{
  success: true,
  data: Registration[],
  pagination: PaginationInfo
}
```

**구현 파일:** `/app/api/registrations/route.ts`

---

#### POST `/api/registrations`
프로그램 등록 신청

**요청 본문:**
```typescript
{
  programId: string,
  applicationNotes?: string,
  specialRequirements?: string
}
```

**응답:**
```typescript
{
  success: true,
  data: Registration,
  message: "프로그램 등록 신청이 완료되었습니다."
}
```

---

#### GET `/api/registrations/[id]`
특정 등록 정보 조회

**응답:**
```typescript
{
  success: true,
  data: RegistrationDetail
}
```

---

#### PUT `/api/registrations/[id]`
등록 상태 변경 (관리자 전용)

**요청 본문:**
```typescript
{
  status: RegistrationStatus,
  adminNotes?: string
}
```

**응답:**
```typescript
{
  success: true,
  data: Registration,
  message: "등록 상태가 변경되었습니다."
}
```

---

#### DELETE `/api/registrations/[id]`
등록 취소

**응답:**
```typescript
{
  success: true,
  message: "등록이 취소되었습니다."
}
```

---

### 3. 일정 관리 API

#### GET `/api/programs/[id]/schedules`
프로그램 일정 목록 조회

**응답:**
```typescript
{
  success: true,
  data: ProgramSchedule[]
}
```

**구현 파일:** `/app/api/programs/[id]/schedules/route.ts`

---

#### POST `/api/programs/[id]/schedules`
새 일정 추가 (관리자 전용)

**요청 본문:**
```typescript
{
  sessionNumber: number,
  title?: string,
  description?: string,
  startTime: string, // ISO 8601 format
  endTime: string,
  locationId?: string,
  instructorId?: string,
  maxCapacity?: number,
  isMandatory?: boolean,
  materials?: string[]
}
```

---

### 4. 참석 관리 API

#### GET `/api/registrations/[id]/attendance`
참석 기록 조회

**응답:**
```typescript
{
  success: true,
  data: SessionAttendance[]
}
```

---

#### POST `/api/schedules/[scheduleId]/attendance`
참석 체크인 (관리자 전용)

**요청 본문:**
```typescript
{
  registrationId: string,
  status: AttendanceStatus,
  notes?: string
}
```

---

### 5. 사용자 관리 API

#### GET `/api/users/profile`
사용자 프로필 조회

**응답:**
```typescript
{
  success: true,
  data: UserProfile
}
```

**구현 파일:** `/app/api/users/profile/route.ts`

---

#### PUT `/api/users/profile`
사용자 프로필 수정

**요청 본문:**
```typescript
{
  name?: string,
  phone?: string,
  company?: string,
  position?: string,
  preferences?: Record<string, any>
}
```

---

#### GET `/api/users/registrations`
사용자의 등록 목록 조회

**응답:**
```typescript
{
  success: true,
  data: UserRegistration[]
}
```

---

### 6. 관리자 API

#### GET `/api/admin/dashboard`
관리자 대시보드 데이터

**응답:**
```typescript
{
  success: true,
  data: {
    totalPrograms: number,
    totalRegistrations: number,
    totalUsers: number,
    recentRegistrations: Registration[],
    popularPrograms: Program[],
    revenueStats: RevenueStats
  }
}
```

**구현 파일:** `/app/api/admin/dashboard/route.ts`

---

#### GET `/api/admin/programs`
관리자용 프로그램 관리 (모든 상태 포함)

**Query Parameters:**
```typescript
{
  page?: number,
  limit?: number,
  status?: ProgramStatus,
  category?: ProgramCategory,
  search?: string
}
```

---

#### GET `/api/admin/registrations`
관리자용 등록 관리

**Query Parameters:**
```typescript
{
  page?: number,
  limit?: number,
  status?: RegistrationStatus,
  programId?: string,
  startDate?: string,
  endDate?: string
}
```

---

#### PUT `/api/admin/registrations/bulk`
대량 등록 상태 변경

**요청 본문:**
```typescript
{
  registrationIds: string[],
  status: RegistrationStatus,
  adminNotes?: string
}
```

---

### 7. 통계 및 분석 API

#### GET `/api/analytics/programs/[id]`
프로그램별 분석 데이터

**Query Parameters:**
```typescript
{
  startDate?: string,
  endDate?: string,
  metrics?: string[] // ['views', 'registrations', 'revenue']
}
```

**응답:**
```typescript
{
  success: true,
  data: {
    pageViews: number,
    totalRegistrations: number,
    approvedRegistrations: number,
    revenue: number,
    attendanceRate: number,
    satisfactionScore: number,
    dailyStats: DailyStats[]
  }
}
```

---

#### GET `/api/analytics/overview`
전체 통계 개요

**응답:**
```typescript
{
  success: true,
  data: {
    totalPrograms: number,
    totalRegistrations: number,
    totalRevenue: number,
    averageAttendance: number,
    topPrograms: Program[],
    registrationTrends: TrendData[]
  }
}
```

---

### 8. 알림 API

#### GET `/api/notifications`
사용자 알림 목록

**Query Parameters:**
```typescript
{
  page?: number,
  limit?: number,
  unreadOnly?: boolean
}
```

**응답:**
```typescript
{
  success: true,
  data: Notification[],
  pagination: PaginationInfo
}
```

---

#### PUT `/api/notifications/[id]/read`
알림 읽음 처리

**응답:**
```typescript
{
  success: true,
  message: "알림이 읽음 처리되었습니다."
}
```

---

#### PUT `/api/notifications/read-all`
모든 알림 읽음 처리

---

### 9. 파일 업로드 API

#### POST `/api/upload`
파일 업로드 (이미지, 문서)

**요청:** `multipart/form-data`
```typescript
{
  file: File,
  type: 'image' | 'document' | 'video',
  programId?: string
}
```

**응답:**
```typescript
{
  success: true,
  data: {
    url: string,
    filename: string,
    size: number,
    type: string
  }
}
```

---

### 10. 검색 API

#### GET `/api/search`
통합 검색

**Query Parameters:**
```typescript
{
  q: string, // 검색어
  type?: 'programs' | 'users' | 'all',
  category?: ProgramCategory,
  limit?: number
}
```

**응답:**
```typescript
{
  success: true,
  data: {
    programs: Program[],
    users: UserProfile[], // 관리자만
    total: number
  }
}
```

---

## 🔒 권한 매트릭스

| 엔드포인트 | 게스트 | 회원 | VIP | 관리자 |
|------------|--------|------|-----|--------|
| GET /programs | ✓ | ✓ | ✓ | ✓ |
| POST /programs | - | - | - | ✓ |
| POST /registrations | - | ✓ | ✓ | ✓ |
| GET /admin/* | - | - | - | ✓ |
| PUT /registrations/status | - | - | - | ✓ |

## 📝 에러 코드

### 일반 에러
- `AUTH_001`: 인증 토큰이 없음
- `AUTH_002`: 유효하지 않은 토큰
- `AUTH_003`: 권한 없음
- `VALID_001`: 유효성 검증 실패
- `RATE_001`: 요청 한도 초과

### 프로그램 관련 에러
- `PROG_001`: 프로그램을 찾을 수 없음
- `PROG_002`: 프로그램 등록 마감
- `PROG_003`: 중복 등록
- `PROG_004`: 참가 자격 미달

### 등록 관련 에러
- `REG_001`: 등록을 찾을 수 없음
- `REG_002`: 이미 등록됨
- `REG_003`: 등록 기간 종료
- `REG_004`: 정원 초과

## 🧪 테스트 예시

### 프로그램 목록 조회
```bash
curl -X GET "https://familyoffice.com/api/programs?category=ceo_education&limit=5" \
  -H "Authorization: Bearer <token>"
```

### 프로그램 등록
```bash
curl -X POST "https://familyoffice.com/api/registrations" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "programId": "uuid-here",
    "applicationNotes": "CEO 과정에 관심이 있습니다."
  }'
```

## 📊 성능 고려사항

### 캐싱 전략
- 프로그램 목록: 5분 캐시
- 프로그램 상세: 10분 캐시
- 사용자 등록 정보: 캐시 없음
- 통계 데이터: 1시간 캐시

### Rate Limiting
- 일반 사용자: 100 req/min
- VIP 사용자: 200 req/min
- 관리자: 500 req/min

### 페이지네이션
- 기본 페이지 크기: 10
- 최대 페이지 크기: 100
- 오프셋 기반 페이지네이션 사용

## 🔄 버전 관리

현재 버전: `v1`
- 호환성: 3개월 유지
- 변경 사항: CHANGELOG.md 참조
- 마이그레이션: 별도 가이드 제공