# 금융 데이터 API 통합 시스템

FamilyOffice 프로젝트에 실시간 주식/환율 데이터를 제공하는 통합 시스템입니다.

## 🚀 주요 기능

### 데이터 제공
- **실시간 주식 데이터**: Yahoo Finance + Alpha Vantage API
- **환율 정보**: 주요 통화쌍 실시간 환율
- **시장 지수**: 코스피, S&P 500, 나스닥 등
- **한국 주식 특화**: 삼성전자, SK하이닉스, NAVER 등

### 고급 기능
- **이중 Failover**: Yahoo Finance ↔ Alpha Vantage 자동 전환
- **다층 캐싱**: Redis + 메모리 캐시 조합
- **오류 처리**: 구조화된 로깅 및 알림 시스템
- **성능 최적화**: 응답 시간 모니터링 및 캐시 최적화

## 📁 프로젝트 구조

```
lib/financial/
├── types/financial.ts       # TypeScript 타입 정의
├── yahoo-finance.ts         # Yahoo Finance API 클라이언트
├── alpha-vantage.ts         # Alpha Vantage API 클라이언트
├── cache.ts                 # Redis + 메모리 캐싱
├── financial-service.ts     # 통합 서비스 (Failover 로직)
├── error-handler.ts         # 오류 처리 및 로깅
└── index.ts                 # 메인 export 파일

app/api/financial/
├── stocks/route.ts          # 주식 데이터 API
├── forex/route.ts           # 환율 데이터 API
└── status/route.ts          # 서비스 상태 API

components/financial/
├── stock-card.tsx           # 주식 정보 카드
├── forex-card.tsx           # 환율 정보 카드
└── financial-dashboard.tsx  # 통합 대시보드
```

## 🔧 설치 및 설정

### 1. 의존성 설치
```bash
npm install axios redis ioredis node-cache yahoo-finance2
```

### 2. 환경 변수 설정
`.env.local` 파일에 다음 설정을 추가하세요:

```bash
# Alpha Vantage API (필수)
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key

# Yahoo Finance API (선택사항 - 대부분 무료)
YAHOO_FINANCE_API_KEY=your_yahoo_finance_api_key

# Redis 설정 (선택사항 - 메모리 캐시만으로도 동작)
REDIS_URL=redis://localhost:6379
# 또는 개별 설정
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
```

### 3. API 키 발급

#### Alpha Vantage API
1. [Alpha Vantage](https://www.alphavantage.co/support/#api-key) 회원가입
2. 무료 API 키 발급 (일 500회 요청)
3. `ALPHA_VANTAGE_API_KEY`에 설정

#### Yahoo Finance API (선택사항)
- Yahoo Finance는 대부분 무료로 사용 가능
- 필요시 RapidAPI를 통해 확장 가능

## 📊 API 사용법

### 주식 데이터 조회

```typescript
import { getStockData, getKoreanStocks } from '@/lib/financial'

// 개별 주식 조회
const stockData = await getStockData('005930.KS') // 삼성전자
if (stockData.success) {
  console.log('삼성전자 현재가:', stockData.data.price)
}

// 한국 주요 주식 일괄 조회
const koreanStocks = await getKoreanStocks()
if (koreanStocks.success) {
  koreanStocks.data.forEach(stock => {
    console.log(`${stock.symbol}: ${stock.price}`)
  })
}
```

### 환율 데이터 조회

```typescript
import { getForexData, getMajorForexRates } from '@/lib/financial'

// 개별 환율 조회
const usdKrw = await getForexData('USD', 'KRW')
if (usdKrw.success) {
  console.log('USD/KRW 환율:', usdKrw.data.rate)
}

// 주요 환율 일괄 조회
const majorRates = await getMajorForexRates()
if (majorRates.success) {
  majorRates.data.forEach(rate => {
    console.log(`${rate.fromCurrency}/${rate.toCurrency}: ${rate.rate}`)
  })
}
```

## 🌐 REST API 엔드포인트

### 주식 데이터 API

```bash
# 개별 주식 조회
GET /api/financial/stocks?symbol=005930.KS

# 복수 주식 조회
GET /api/financial/stocks?symbols=AAPL,MSFT,GOOGL

# 한국 주요 주식 조회
GET /api/financial/stocks?korean=true

# 강제 새로고침 (캐시 무시)
GET /api/financial/stocks?symbol=AAPL&refresh=true
```

### 환율 데이터 API

```bash
# 개별 환율 조회
GET /api/financial/forex?from=USD&to=KRW

# 주요 환율 조회
GET /api/financial/forex?major=true

# 강제 새로고침
GET /api/financial/forex?from=EUR&to=KRW&refresh=true
```

### 서비스 상태 API

```bash
# 간단한 상태 조회
GET /api/financial/status

# 상세 상태 조회 (API 테스트 포함)
GET /api/financial/status?detailed=true
```

## 🎨 React 컴포넌트 사용법

### 주식 카드 컴포넌트

```tsx
import StockCard from '@/components/financial/stock-card'

export default function MyPage() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StockCard symbol="005930.KS" autoRefresh={true} />
      <StockCard symbol="AAPL" autoRefresh={true} />
      <StockCard symbol="TSLA" autoRefresh={true} />
    </div>
  )
}
```

### 환율 카드 컴포넌트

```tsx
import ForexCard from '@/components/financial/forex-card'

export default function ForexPage() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ForexCard fromCurrency="USD" toCurrency="KRW" autoRefresh={true} />
      <ForexCard fromCurrency="EUR" toCurrency="KRW" autoRefresh={true} />
    </div>
  )
}
```

### 통합 대시보드

```tsx
import FinancialDashboard from '@/components/financial/financial-dashboard'

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <FinancialDashboard 
        autoRefresh={true}
        refreshInterval={300000} // 5분
      />
    </div>
  )
}
```

## ⚡ 성능 최적화

### 캐싱 전략
- **L1 캐시**: 메모리 캐시 (5분 TTL, 매우 빠름)
- **L2 캐시**: Redis (5분 TTL, 분산 환경 지원)
- **Failover**: API 실패 시 캐시된 데이터 사용

### 캐시 설정 조정

```typescript
import { updateFinancialConfig } from '@/lib/financial'

updateFinancialConfig({
  refreshInterval: 2 * 60 * 1000,    // 2분으로 단축
  cacheTimeout: 10 * 60,             // 10분으로 연장
  maxRetries: 5,                     // 재시도 횟수 증가
  fallbackToCache: true,             // 캐시 Fallback 활성화
  enableRealtime: true               // 실시간 업데이트 활성화
})
```

### 성능 모니터링

```typescript
import { getCacheStats, getErrorStats } from '@/lib/financial'

// 캐시 성능 확인
const cacheStats = getCacheStats()
console.log('캐시 적중률:', cacheStats.memory.hitRate)

// 오류 통계 확인
const errorStats = getErrorStats()
console.log('API 오류 통계:', errorStats)
```

## 🔍 오류 처리 및 로깅

### 구조화된 로깅
모든 API 호출, 오류, 성능 메트릭이 자동으로 기록됩니다:

```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "level": "error",
  "service": "financial-api",
  "message": "금융 API 오류 발생: Rate limit exceeded",
  "errorCode": "RATE_LIMIT_EXCEEDED",
  "severity": "medium",
  "context": {
    "operation": "getStockData",
    "symbol": "AAPL",
    "duration": 1250
  }
}
```

### 오류 심각도 분류
- **LOW**: 일반적인 API 오류
- **MEDIUM**: 네트워크 오류, API 제한
- **HIGH**: 인증 오류, 설정 문제  
- **CRITICAL**: 모든 API 실패

### 수동 로깅

```typescript
import { withLogging, createTimer } from '@/lib/financial/error-handler'

// 자동 로깅이 포함된 함수 실행
const result = await withLogging('customOperation', async () => {
  // 여기에 비즈니스 로직
  return await someApiCall()
}, { symbol: 'AAPL', userId: '123' })

// 성능 타이머
const timer = createTimer()
// ... 작업 수행
timer.stop('operationName', { dataPoints: 100 })
```

## 🚨 프로덕션 고려사항

### API 제한 관리
- **Alpha Vantage**: 무료 플랜 일 500회 제한
- **Yahoo Finance**: 비공식 API로 제한 불분명
- **권장**: Alpha Vantage 유료 플랜 고려

### 확장성
- Redis 클러스터 구성으로 캐시 확장
- API 키 로테이션 시스템 구현
- CDN을 통한 정적 데이터 캐싱

### 모니터링
- 외부 로깅 서비스 연동 (DataDog, Sentry)
- 알림 시스템 구성 (Slack, PagerDuty)
- 대시보드 구성 (Grafana, New Relic)

## 🔧 트러블슈팅

### 일반적인 문제

1. **API 키 오류**
   ```bash
   Error: ALPHA_VANTAGE_API_KEY 환경변수가 설정되지 않았습니다.
   ```
   → `.env.local` 파일에 API 키 추가

2. **Redis 연결 실패**
   ```bash
   Redis 연결 오류: ECONNREFUSED
   ```
   → Redis 서버 실행 또는 환경변수 확인

3. **API 제한 초과**
   ```bash
   Alpha Vantage API Rate Limit: Thank you for using Alpha Vantage!
   ```
   → API 키 업그레이드 또는 캐시 TTL 증가

### 디버깅 모드

```typescript
// 개발 환경에서 상세 로그 활성화
if (process.env.NODE_ENV === 'development') {
  updateFinancialConfig({
    refreshInterval: 10000,  // 10초로 단축
    enableRealtime: true     // 실시간 업데이트
  })
}
```

## 📈 향후 개발 계획

- [ ] 웹소켓을 통한 실시간 데이터 스트리밍
- [ ] 포트폴리오 추적 기능
- [ ] 차트 및 기술적 분석 지표
- [ ] 알림 및 가격 알람 시스템
- [ ] 모바일 앱 지원

---

## 📞 지원

문제가 발생하거나 기능 요청이 있으시면 GitHub Issues를 통해 문의해 주세요.

**개발자**: FamilyOffice 개발팀  
**버전**: 1.0.0  
**최종 업데이트**: 2024년 1월