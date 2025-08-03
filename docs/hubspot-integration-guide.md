# HubSpot 통합 가이드

## 개요

FamilyOffice 프로젝트에 HubSpot 폼 통합이 완료되었습니다. 이 통합은 다음과 같은 기능을 제공합니다:

- **이메일 도메인 차단**: 특정 이메일 도메인을 차단하여 스팸 방지
- **체크박스 유효성 검사**: 필수 체크박스 그룹의 최소 선택 검증
- **자동 폼 데이터 업데이트**: HubSpot 추적 정보 자동 추가
- **실시간 유효성 검사**: 사용자 입력 시 실시간 피드백

## 주요 기능

### 1. 이메일 도메인 차단

차단된 도메인 목록은 외부 API에서 동적으로 로드됩니다:

```typescript
// 차단된 도메인 목록 로드
const response = await fetch(
  'https://hubspotonwebflow.com/assets/js/blockedDomains.json'
);
const blockedDomains = await response.json();
```

**특징:**

- 실시간 도메인 차단 목록 업데이트
- 추가 차단 도메인 설정 가능
- 차단된 도메인 입력 시 제출 버튼 비활성화
- 사용자 친화적인 경고 메시지 표시

### 2. 체크박스 유효성 검사

같은 이름의 체크박스 그룹에 대해 최소 하나 선택 검증:

```typescript
// 체크박스 그룹 유효성 검사
const checkboxes = form.querySelectorAll('input[type="checkbox"][required]');
// 최소 하나 선택 검증 로직
```

**특징:**

- 동일한 name 속성을 가진 체크박스 그룹 처리
- 최소 하나 선택 필수 검증
- 실시간 유효성 상태 업데이트
- 사용자 친화적인 오류 메시지

### 3. 자동 폼 데이터 업데이트

HubSpot 추적 정보를 자동으로 폼에 추가:

```typescript
// HubSpot 추적 정보 자동 추가
formData.set('hutk', hubspotCookie);
formData.set('pageUri', window.location.href);
formData.set('pageName', document.title);
formData.set('pageId', window.location.pathname);
```

**추가되는 정보:**

- `hutk`: HubSpot 추적 쿠키
- `pageUri`: 현재 페이지 URL
- `pageName`: 페이지 제목
- `pageId`: 페이지 경로

## 사용 방법

### 1. 기본 HubSpot 폼 사용

```tsx
import { HubSpotContactForm } from '@/components/forms/hubspot-contact-form';

export default function ContactPage() {
  return (
    <div>
      <h1>문의하기</h1>
      <HubSpotContactForm
        formId="your-hubspot-form-id"
        className="max-w-md mx-auto"
      />
    </div>
  );
}
```

### 2. HubSpot API 폼 사용

```tsx
import { HubSpotApiContactForm } from '@/components/forms/hubspot-contact-form';

export default function ContactPage() {
  return (
    <div>
      <h1>문의하기</h1>
      <HubSpotApiContactForm
        formId="your-hubspot-form-id"
        className="max-w-md mx-auto"
      />
    </div>
  );
}
```

### 3. 커스텀 폼 생성

```tsx
import { HubSpotForm, HubSpotField } from '@/components/hubspot-integration';

export function CustomContactForm() {
  return (
    <HubSpotForm>
      <form action="your-hubspot-endpoint" method="POST">
        <HubSpotField fieldName="firstname" required>
          <input type="text" name="firstname" required />
        </HubSpotField>

        <HubSpotField fieldName="email" type="email" required>
          <input type="email" name="email" required />
        </HubSpotField>

        <button type="submit">제출</button>
      </form>
    </HubSpotForm>
  );
}
```

## 컴포넌트 API

### HubSpotForm

HubSpot 폼을 감싸는 컨테이너 컴포넌트.

**Props:**

- `children`: React 노드
- `className`: CSS 클래스명 (선택사항)

### HubSpotApiForm

HubSpot API를 사용하는 폼을 감싸는 컨테이너 컴포넌트.

**Props:**

- `children`: React 노드
- `className`: CSS 클래스명 (선택사항)
- `formUrl`: HubSpot API 엔드포인트 URL

### HubSpotField

HubSpot 필드 매핑을 위한 래퍼 컴포넌트.

**Props:**

- `children`: React 노드 (input, textarea, select 등)
- `fieldName`: HubSpot 필드명
- `type`: 필드 타입 ('text', 'email', 'tel', 'textarea', 'checkbox', 'radio', 'file')
- `required`: 필수 여부 (기본값: false)
- `placeholder`: 플레이스홀더 텍스트
- `className`: CSS 클래스명

## 설정 및 구성

### 1. 환경 변수 설정

```bash
# HubSpot 설정
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your-portal-id
HUBSPOT_CLIENT_ID=your-client-id
HUBSPOT_CLIENT_SECRET=your-client-secret
```

### 2. 차단 도메인 관리

차단된 도메인은 외부 API에서 관리됩니다:

```json
{
  "blockedDomains": ["10minutemail.com", "tempmail.org", "guerrillamail.com"]
}
```

### 3. 블록리스트 설정

각 폼별로 추가 차단 도메인을 설정할 수 있습니다:

```json
{
  "enabled": true,
  "additionalBlockedDomains": ["custom-blocked-domain.com"]
}
```

## 오류 처리

### 1. 네트워크 오류

```typescript
try {
  const response = await fetch(
    'https://hubspotonwebflow.com/assets/js/blockedDomains.json'
  );
  const data = await response.json();
} catch (error) {
  console.error('Error loading blocked domains:', error);
  // 기본 차단 목록 사용
}
```

### 2. 폼 제출 오류

```typescript
try {
  const response = await fetch(form.action, {
    method: form.method,
    body: formData,
  });
  const data = await response.json();
} catch (error) {
  console.error('Form submission error:', error);
  // 사용자에게 오류 메시지 표시
}
```

## 성능 최적화

### 1. 지연 로딩

HubSpot 스크립트는 `afterInteractive` 전략으로 로드됩니다:

```tsx
<Script
  id="hs-script-loader"
  strategy="afterInteractive"
  src="https://js.hs-scripts.com/24900000.js"
/>
```

### 2. 조건부 로딩

필요한 페이지에서만 HubSpot 통합을 로드:

```tsx
// 특정 페이지에서만 HubSpot 통합 로드
if (pageNeedsHubSpot) {
  import('@/lib/hubspot-integration');
}
```

## 보안 고려사항

### 1. CSRF 보호

HubSpot 폼은 자체 CSRF 보호를 제공합니다.

### 2. 데이터 검증

클라이언트 측과 서버 측 모두에서 데이터 검증을 수행합니다.

### 3. 개인정보 보호

개인정보 처리방침 동의를 필수로 설정합니다.

## 모니터링 및 로깅

### 1. 오류 로깅

```typescript
// HubSpot 통합 오류 로깅
console.error('HubSpot integration error:', error);
```

### 2. 성능 모니터링

```typescript
// 폼 제출 성능 측정
const startTime = performance.now();
// 폼 제출 로직
const endTime = performance.now();
console.log(`Form submission took ${endTime - startTime}ms`);
```

## 테스트

### 1. 단위 테스트

```typescript
// HubSpot 통합 테스트
describe('HubSpot Integration', () => {
  it('should block email domains', () => {
    // 테스트 로직
  });

  it('should validate checkboxes', () => {
    // 테스트 로직
  });
});
```

### 2. 통합 테스트

```typescript
// 폼 제출 통합 테스트
describe('Form Submission', () => {
  it('should submit form to HubSpot', async () => {
    // 테스트 로직
  });
});
```

## 트러블슈팅

### 1. 일반적인 문제

**문제**: HubSpot 스크립트가 로드되지 않음
**해결**: 네트워크 연결 확인, 스크립트 URL 검증

**문제**: 폼 제출이 실패함
**해결**: HubSpot 포털 ID, 폼 ID 확인

**문제**: 이메일 도메인 차단이 작동하지 않음
**해결**: 차단 도메인 API 응답 확인

### 2. 디버깅

```typescript
// 디버깅을 위한 로그 추가
console.log('Blocked domains:', blockedDomains);
console.log('Form data:', formData);
console.log('HubSpot response:', response);
```

## 업데이트 및 유지보수

### 1. 정기 업데이트

- HubSpot API 변경사항 모니터링
- 차단 도메인 목록 정기 업데이트
- 보안 패치 적용

### 2. 성능 모니터링

- 폼 제출 성능 측정
- 사용자 경험 지표 추적
- 오류율 모니터링

## 결론

HubSpot 통합은 FamilyOffice 프로젝트의 리드 생성 및 고객 관리 기능을 강화합니다. 이메일 도메인 차단, 체크박스 유효성 검사, 자동 데이터 업데이트 등의 기능을 통해 사용자 경험을 개선하고 스팸을 방지합니다.

정기적인 모니터링과 업데이트를 통해 안정적이고 효율적인 HubSpot 통합을 유지할 수 있습니다.
