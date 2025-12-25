# Newsletter Synchronization System

자동 뉴스레터 동기화 시스템 설정 및 운영 가이드

## 시스템 개요

매주 화요일 오전 9:30 AM (KST)과 금요일 오전 7:30 AM (KST)에 Beehiiv에서 발행되는 뉴스레터를 자동으로 동기화하는 시스템입니다.

### 핵심 기능

- ✅ **자동 동기화**: Vercel Cron Jobs를 이용한 스케줄링
- ✅ **이중 데이터 소스**: Beehiiv API + 정적 데이터 fallback
- ✅ **보안 인증**: CRON_SECRET을 이용한 엔드포인트 보호
- ✅ **오류 복구**: API 실패 시 정적 데이터로 자동 전환
- ✅ **실시간 업데이트**: 클라이언트 측 자동 데이터 갱신

## 시스템 아키텍처

```
Vercel Cron Job (Tue 9:30 AM KST, Fri 7:30 AM KST)
    ↓
/api/cron/sync-newsletter
    ↓
Beehiiv API → 데이터 변환 → 캐시/로그 업데이트
    ↓ (실패 시)
정적 데이터 (/lib/newsletter/data.ts)
    ↓
클라이언트 (/insights/weekly-brief)
```

## 파일 구조

```
📁 Newsletter Sync System
├── 📄 vercel.json                    # Cron 스케줄 설정
├── 📄 app/api/cron/sync-newsletter/  # 동기화 엔드포인트
├── 📄 app/api/newsletter/posts/      # 데이터 제공 API
├── 📄 lib/beehiiv/client.ts          # Beehiiv API 클라이언트
├── 📄 lib/newsletter/data.ts         # 정적 데이터 (fallback)
├── 📄 app/insights/weekly-brief/     # 뉴스레터 표시 페이지
└── 📄 scripts/test-cron.js           # 테스트 스크립트
```

## 환경 변수 설정

### 필수 환경 변수

```bash
# Beehiiv Newsletter API
BEEHIIV_API_KEY=your_beehiiv_api_key_here
BEEHIIV_PUBLICATION_ID=pub_your_publication_id_here

# Cron Job 보안
CRON_SECRET=your_secure_cron_secret_here
```

### 선택적 환경 변수

```bash
# Beehiiv Webhook (향후 확장용)
BEEHIIV_WEBHOOK_SECRET=your_webhook_secret_here
```

## Vercel 배포 설정

### 1. 환경 변수 설정 (Vercel Dashboard)

```
BEEHIIV_API_KEY → Production 환경에 설정
BEEHIIV_PUBLICATION_ID → Production 환경에 설정
CRON_SECRET → Production 환경에 설정
```

### 2. Cron Job 확인

`vercel.json`에서 설정된 스케줄:

```json
{
  "crons": [
    {
      "path": "/api/cron/sync-newsletter",
      "schedule": "30 7 * * 1,5"
    }
  ]
}
```

**스케줄 해석**:

- `30 7 * * 2,5` = 매주 화요일(2)과 금요일(5) 오전 7:30 (UTC)
- KST 기준: 오후 4:30 (UTC+9)
- **조정 필요**:
  - 화요일 오전 9:30 KST = 화요일 오전 0:30 UTC = `30 0 * * 2`
  - 금요일 오전 7:30 KST = 목요일 오후 10:30 UTC = `30 22 * * 4`

### 3. Cron 스케줄 수정 (KST 기준)

화요일 오전 9:30 KST, 금요일 오전 7:30 KST에 실행하려면:

```json
{
  "crons": [
    {
      "path": "/api/cron/sync-newsletter",
      "schedule": "30 0 * * 2"
    },
    {
      "path": "/api/cron/sync-newsletter",
      "schedule": "30 22 * * 4"
    }
  ]
}
```

## API 엔드포인트

### 1. Cron 동기화 엔드포인트

**GET/POST** `/api/cron/sync-newsletter`

**요청 헤더**:

```
Authorization: Bearer ${CRON_SECRET}
```

**응답**:

```json
{
  "success": true,
  "message": "Newsletter sync completed",
  "synced": true,
  "postsCount": 3,
  "timestamp": "2025-01-20T07:30:00.000Z"
}
```

### 2. 뉴스레터 데이터 API

**GET** `/api/newsletter/posts?limit=4`

**응답**:

```json
{
  "success": true,
  "posts": [
    {
      "issueNumber": "#52",
      "date": "2025.08.19",
      "title": "병원장님 필독: 성공하는 MSO의 3가지 조건",
      "excerpt": "MSO 설립시 반드시 고려해야 할 세무, 승계 계획...",
      "readTime": "5분",
      "categories": ["의료법인", "절세전략", "병원경영"],
      "url": "https://newsletter.familyoffices.vip/p/hospital-mso-guide"
    }
  ],
  "total": 3,
  "source": "static"
}
```

## 테스트 및 디버깅

### 로컬 테스트

```bash
# 1. 개발 서버 실행
npm run dev

# 2. Cron 엔드포인트 테스트
npm run test:cron

# 3. 수동 cURL 테스트
curl -X GET "http://localhost:3000/api/cron/sync-newsletter" \
  -H "Authorization: Bearer test-secret"
```

### Production 테스트

```bash
# Vercel 환경에서 수동 실행
curl -X GET "https://your-domain.com/api/cron/sync-newsletter" \
  -H "Authorization: Bearer ${CRON_SECRET}"
```

### Vercel 로그 확인

```bash
# Vercel CLI로 실시간 로그 확인
vercel logs --follow

# 특정 함수 로그
vercel logs --function=api/cron/sync-newsletter
```

## 모니터링 및 알림

### 로그 모니터링

시스템은 다음과 같은 로그를 생성합니다:

```javascript
// 성공적인 동기화
console.log(`Newsletter sync completed: ${response.data.length} posts found`);

// API 오류 (fallback 실행)
console.error('Beehiiv API error:', apiError);

// 시스템 오류
console.error('Newsletter sync error:', error);
```

### 알림 설정 (옵션)

향후 확장을 위한 알림 시스템:

1. **Slack 알림**: 동기화 성공/실패 시
2. **이메일 알림**: 연속 실패 시
3. **Vercel 알림**: Function 오류 시

## 데이터 구조

### Beehiiv API 응답 → 앱 데이터 변환

```javascript
// Beehiiv 원본 데이터
{
  "id": "post_123",
  "subject": "뉴스레터 제목",
  "preview_text": "미리보기 텍스트",
  "published_at": "2025-01-20T07:30:00Z",
  "web_url": "https://newsletter.familyoffices.vip/p/slug",
  "stats": { "email_sent": 52 },
  "tags": ["세무", "법률"]
}

// 변환된 앱 데이터
{
  "issueNumber": "#52",
  "date": "2025.01.20",
  "title": "뉴스레터 제목",
  "excerpt": "미리보기 텍스트",
  "readTime": "5분",
  "categories": ["세무", "법률"],
  "url": "https://newsletter.familyoffices.vip/p/slug"
}
```

## 문제 해결

### 자주 발생하는 문제

#### 1. Cron Job이 실행되지 않음

**원인**:

- CRON_SECRET 미설정
- Vercel 환경 변수 누락
- 잘못된 cron 스케줄

**해결**:

```bash
# Vercel 환경 변수 확인
vercel env ls

# Cron 상태 확인
vercel logs --function=api/cron/sync-newsletter
```

#### 2. Beehiiv API 오류

**원인**:

- API 키 만료
- 요청 한도 초과
- 네트워크 문제

**해결**:

- 시스템이 자동으로 정적 데이터로 fallback
- API 키 갱신 필요

#### 3. 데이터가 업데이트되지 않음

**원인**:

- 클라이언트 캐시 문제
- API 응답 오류

**해결**:

```bash
# 브라우저 캐시 클리어
# 또는 API 직접 호출로 확인
curl "https://your-domain.com/api/newsletter/posts?limit=1"
```

## 유지보수

### 정기 점검 사항

1. **월간 점검**:
   - Beehiiv API 키 상태 확인
   - Cron 실행 로그 검토
   - 데이터 품질 확인

2. **분기 점검**:
   - 정적 데이터 업데이트
   - 새로운 뉴스레터 URL 추가
   - 성능 최적화

### 데이터 업데이트

새로운 뉴스레터 추가 시 `/lib/newsletter/data.ts` 업데이트:

```javascript
export const newsletterPosts = [
  {
    issueNumber: '#53', // 새 이슈 번호
    date: '2025.08.23', // 발행일
    title: '새 뉴스레터 제목',
    excerpt: '요약 내용...',
    readTime: '5분',
    categories: ['카테고리1', '카테고리2'],
    url: 'https://newsletter.familyoffices.vip/p/new-slug',
  },
  // 기존 데이터...
];
```

## 향후 확장 계획

### Phase 1 (현재)

- ✅ 자동 동기화
- ✅ Fallback 시스템
- ✅ 기본 모니터링

### Phase 2 (계획)

- 🔄 Webhook 기반 실시간 동기화
- 🔄 데이터베이스 저장
- 🔄 구독자 통계 통합

### Phase 3 (확장)

- 🔄 AI 기반 콘텐츠 분석
- 🔄 개인화된 추천
- 🔄 고급 분석 대시보드

---

## 지원 및 문의

시스템 관련 문제나 질문이 있으시면:

1. **개발자 로그 확인**: `vercel logs`
2. **테스트 스크립트 실행**: `npm run test:cron`
3. **이슈 리포트**: GitHub Issues를 통해 문의

**마지막 업데이트**: 2025년 1월
**버전**: 1.0.0
