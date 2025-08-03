# 프로그램 관리 시스템 아키텍처

## 🏗️ 시스템 개요

FamilyOffice 프로그램 관리 시스템은 VIP 고객을 위한 다양한 교육 프로그램, 네트워킹 이벤트, 투자 기회를 체계적으로 관리하는 종합 플랫폼입니다.

## 📋 핵심 기능

### 1. 프로그램 관리

- 프로그램 생성, 수정, 삭제
- 카테고리별 분류 및 필터링
- 일정 및 장소 관리
- 참가 자격 및 정원 관리

### 2. 등록 시스템

- 사용자 프로그램 신청
- 대기열 관리
- 자동 승인/거부 시스템
- 알림 및 리마인더

### 3. 사용자 관리

- VIP 등급별 권한 관리
- 참가 이력 추적
- 관심사 기반 추천

### 4. 관리자 도구

- 프로그램 운영 대시보드
- 참가자 관리
- 통계 및 분석

## 🏛️ 시스템 아키텍처

```
┌─────────────────────────────────────────────────────┐
│                   Presentation Layer                │
├─────────────────────────────────────────────────────┤
│  Web Interface (Next.JS)                          │
│  ┌─────────────┬─────────────┬─────────────────────┐ │
│  │ User Portal │ Admin Panel │ Mobile Interface    │ │
│  └─────────────┴─────────────┴─────────────────────┘ │
└─────────────────────────────────────────────────────┘
                         │
┌─────────────────────────────────────────────────────┐
│                  Application Layer                  │
├─────────────────────────────────────────────────────┤
│  API Routes & Business Logic                       │
│  ┌─────────────┬─────────────┬─────────────────────┐ │
│  │ Program API │ User API    │ Registration API    │ │
│  ├─────────────┼─────────────┼─────────────────────┤ │
│  │ Auth Service│ Email Service│ Payment Service    │ │
│  └─────────────┴─────────────┴─────────────────────┘ │
└─────────────────────────────────────────────────────┘
                         │
┌─────────────────────────────────────────────────────┐
│                    Data Layer                       │
├─────────────────────────────────────────────────────┤
│  Database & External Services                      │
│  ┌─────────────┬─────────────┬─────────────────────┐ │
│  │ Supabase DB │ File Storage│ External APIs       │ │
│  │ PostgreSQL  │ (Images)    │ (Cal.com, Email)   │ │
│  └─────────────┴─────────────┴─────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

## 🗂️ 도메인 모델

### 프로그램 도메인

```typescript
interface Program {
  id: string;
  title: string;
  category: ProgramCategory;
  description: string;
  targetAudience: string;
  capacity: number;
  frequency: string;
  duration: number;
  price: number;
  status: ProgramStatus;
  schedule: ProgramSchedule[];
  requirements: string[];
  benefits: string[];
  instructor?: Instructor;
  location: Location;
  images: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

enum ProgramCategory {
  CEO_EDUCATION = 'ceo_education',
  ASSET_MANAGEMENT = 'asset_management',
  NETWORKING = 'networking',
  CULTURAL = 'cultural',
  INVESTMENT = 'investment',
}

enum ProgramStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  REGISTRATION_OPEN = 'registration_open',
  FULL = 'full',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
```

### 등록 도메인

```typescript
interface Registration {
  id: string;
  userId: string;
  programId: string;
  status: RegistrationStatus;
  applicationDate: Date;
  approvalDate?: Date;
  attendanceStatus?: AttendanceStatus;
  paymentStatus: PaymentStatus;
  notes?: string;
  feedbackSubmitted: boolean;
}

enum RegistrationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  WAITLISTED = 'waitlisted',
  CANCELLED = 'cancelled',
}

enum AttendanceStatus {
  REGISTERED = 'registered',
  ATTENDED = 'attended',
  NO_SHOW = 'no_show',
  EXCUSED = 'excused',
}
```

## 🔄 데이터 플로우

### 1. 프로그램 등록 플로우

```
사용자 프로그램 선택
→ 자격 요건 확인
→ 등록 신청 제출
→ 관리자 승인/거부
→ 결제 처리
→ 확정 알림
→ 참가 관리
```

### 2. 프로그램 생성 플로우

```
관리자 프로그램 기획
→ 프로그램 정보 입력
→ 일정 및 장소 설정
→ 참가 조건 설정
→ 검토 및 승인
→ 게시 및 홍보
```

## 🛡️ 보안 및 권한

### 사용자 권한 매트릭스

| 기능               | 게스트 | 일반회원 | VIP | 관리자 |
| ------------------ | ------ | -------- | --- | ------ |
| 프로그램 조회      | ✓      | ✓        | ✓   | ✓      |
| 일반 프로그램 신청 | -      | ✓        | ✓   | ✓      |
| VIP 프로그램 신청  | -      | -        | ✓   | ✓      |
| 프로그램 관리      | -      | -        | -   | ✓      |
| 사용자 관리        | -      | -        | -   | ✓      |

### 보안 요구사항

- JWT 기반 인증
- RBAC (역할 기반 접근 제어)
- API Rate Limiting
- 데이터 암호화
- 감사 로그

## 📊 성능 요구사항

### 응답 시간

- 페이지 로딩: < 3초
- API 응답: < 500ms
- 검색 결과: < 1초

### 확장성

- 동시 사용자: 1,000명
- 프로그램 수: 무제한
- 연간 등록: 10,000건

### 가용성

- 99.9% 업타임
- 자동 백업 (일 1회)
- 장애 복구: < 1시간

## 🔌 외부 연동

### 필수 연동

- **Cal.com**: 일정 예약 시스템
- **이메일 서비스**: 알림 및 마케팅
- **결제 시스템**: 프로그램 참가비

### 선택적 연동

- **Zoom**: 온라인 강의
- **SMS**: 긴급 알림
- **CRM**: 고객 관리

## 📈 모니터링 및 분석

### 핵심 메트릭

- 프로그램별 등록률
- 사용자 참여도
- 취소율 및 노쇼율
- 만족도 점수

### 분석 도구

- Google Analytics
- 사용자 행동 분석
- A/B 테스트
- 성능 모니터링

## 🚀 구현 로드맵

### Phase 1: 기본 기능 (4주)

- 프로그램 CRUD
- 사용자 등록 시스템
- 기본 권한 관리

### Phase 2: 고도화 (4주)

- 결제 시스템 연동
- 알림 시스템
- 관리자 대시보드

### Phase 3: 최적화 (2주)

- 성능 개선
- 모니터링 구축
- 테스트 자동화

## 🏗️ 기술 스택

### Frontend

- **Next.js 15**: React 프레임워크
- **TypeScript**: 타입 안전성
- **Tailwind CSS**: 스타일링
- **Shadcn/ui**: 컴포넌트 라이브러리

### Backend

- **Next.js API Routes**: 서버리스 API
- **Supabase**: 데이터베이스 및 인증
- **Vercel**: 호스팅 및 배포

### 개발 도구

- **ESLint/Prettier**: 코드 품질
- **Jest**: 테스트 프레임워크
- **GitHub Actions**: CI/CD

## 📋 추가 고려사항

### 접근성

- WCAG 2.1 AA 준수
- 키보드 네비게이션
- 스크린 리더 지원

### 국제화

- 다국어 지원 준비
- 통화/날짜 형식 처리
- RTL 언어 지원 고려

### 규정 준수

- 개인정보보호법
- 전자상거래법
- 접근성 법규
