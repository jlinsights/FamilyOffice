# Family Office Backend API Specification

## 개요

Family Office 자산 관리 시스템의 백엔드 API 명세서입니다. 마이크로서비스 아키텍처를 기반으로 하며, 각 서비스는 독립적으로 운영됩니다.

## 기본 정보

- **Base URL**: `https://api.familyoffice.com`
- **Content-Type**: `application/json`
- **Authentication**: Bearer Token (JWT)
- **Rate Limiting**: 100 requests per minute per IP

## 인증

### JWT 토큰 발급

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@familyoffice.com",
  "password": "password123"
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here",
    "expiresIn": 3600
  }
}
```

### 토큰 갱신

```http
POST /api/auth/refresh
Authorization: Bearer <refresh_token>
```

## 포트폴리오 관리 API

### 포트폴리오 목록 조회

```http
GET /api/portfolio
Authorization: Bearer <token>
```

**쿼리 파라미터:**
- `page`: 페이지 번호 (기본값: 1)
- `limit`: 페이지당 항목 수 (기본값: 20)
- `search`: 검색어
- `status`: 상태 필터 (active, inactive)

**응답:**
```json
{
  "success": true,
  "data": {
    "portfolios": [
      {
        "id": "portfolio-123",
        "name": "Main Portfolio",
        "description": "Primary investment portfolio",
        "currency": "USD",
        "totalValue": 1000000.00,
        "totalCost": 950000.00,
        "totalGainLoss": 50000.00,
        "totalGainLossPercent": 5.26,
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

### 포트폴리오 생성

```http
POST /api/portfolio
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Portfolio",
  "description": "Investment portfolio for 2024",
  "currency": "USD"
}
```

### 포트폴리오 상세 조회

```http
GET /api/portfolio/{portfolioId}
Authorization: Bearer <token>
```

**응답:**
```json
{
  "success": true,
  "data": {
    "portfolio": {
      "id": "portfolio-123",
      "name": "Main Portfolio",
      "description": "Primary investment portfolio",
      "currency": "USD",
      "totalValue": 1000000.00,
      "totalCost": 950000.00,
      "totalGainLoss": 50000.00,
      "totalGainLossPercent": 5.26,
      "assets": [
        {
          "id": "asset-123",
          "symbol": "AAPL",
          "name": "Apple Inc.",
          "assetType": "stock",
          "quantity": 100,
          "averagePrice": 150.00,
          "currentPrice": 155.00,
          "marketValue": 15500.00,
          "costBasis": 15000.00,
          "unrealizedGainLoss": 500.00,
          "unrealizedGainLossPercent": 3.33,
          "weight": 1.55
        }
      ],
      "performance": {
        "daily": 0.5,
        "weekly": 2.1,
        "monthly": 5.2,
        "yearly": 15.8
      },
      "allocation": {
        "stocks": 60.0,
        "bonds": 25.0,
        "cash": 10.0,
        "alternatives": 5.0
      }
    }
  }
}
```

## 트랜잭션 API

### 트랜잭션 목록 조회

```http
GET /api/transactions
Authorization: Bearer <token>
```

**쿼리 파라미터:**
- `portfolioId`: 포트폴리오 ID
- `type`: 트랜잭션 타입 (buy, sell, dividend, etc.)
- `startDate`: 시작 날짜 (YYYY-MM-DD)
- `endDate`: 종료 날짜 (YYYY-MM-DD)
- `page`: 페이지 번호
- `limit`: 페이지당 항목 수

### 트랜잭션 생성

```http
POST /api/transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "portfolioId": "portfolio-123",
  "transactionType": "buy",
  "symbol": "AAPL",
  "assetName": "Apple Inc.",
  "assetType": "stock",
  "quantity": 100,
  "price": 150.00,
  "currency": "USD",
  "transactionDate": "2024-01-15T10:30:00Z",
  "commission": 9.99,
  "fees": 0.00,
  "notes": "Regular monthly purchase"
}
```

## 리포팅 API

### 커스텀 리포트 생성

```http
POST /api/reports/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "reportType": "portfolio_performance",
  "portfolioId": "portfolio-123",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "format": "pdf",
  "includeCharts": true,
  "sections": ["overview", "performance", "allocation", "transactions"]
}
```

### 스케줄된 리포트 목록

```http
GET /api/reports/scheduled
Authorization: Bearer <token>
```

## 사용자 관리 API

### 사용자 목록 조회

```http
GET /api/users
Authorization: Bearer <token>
```

### 사용자 생성

```http
POST /api/users
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "newuser@familyoffice.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "advisor",
  "permissions": ["read_portfolio", "write_transactions"],
  "familyMemberIds": ["member-123", "member-456"]
}
```

## 통합 API

### 외부 데이터 소스 연결

```http
POST /api/integrations/connect
Authorization: Bearer <token>
Content-Type: application/json

{
  "provider": "bloomberg",
  "credentials": {
    "apiKey": "your_api_key",
    "secretKey": "your_secret_key"
  },
  "settings": {
    "syncInterval": 300,
    "dataTypes": ["prices", "news", "analytics"]
  }
}
```

## 에러 응답

모든 API는 일관된 에러 응답 형식을 사용합니다:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

## 상태 코드

- `200`: 성공
- `201`: 생성됨
- `400`: 잘못된 요청
- `401`: 인증 실패
- `403`: 권한 없음
- `404`: 리소스 없음
- `422`: 검증 실패
- `429`: 요청 한도 초과
- `500`: 서버 오류

## 웹훅

### 웹훅 등록

```http
POST /api/integrations/webhooks
Authorization: Bearer <token>
Content-Type: application/json

{
  "url": "https://your-app.com/webhook",
  "events": ["portfolio.updated", "transaction.created"],
  "secret": "webhook_secret"
}
```

### 웹훅 페이로드 예시

```json
{
  "event": "portfolio.updated",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "portfolioId": "portfolio-123",
    "changes": {
      "totalValue": {
        "old": 950000.00,
        "new": 1000000.00
      }
    }
  }
}
```

## 모니터링

### 헬스 체크

```http
GET /health
```

**응답:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "services": {
    "database": "healthy",
    "redis": "healthy",
    "external_apis": "healthy"
  }
}
```

### 메트릭

```http
GET /metrics
```

Prometheus 형식의 메트릭을 반환합니다.

## 개발 환경

### 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 테스트 실행
npm test

# 빌드
npm run build
```

### Docker 개발 환경

```bash
# 개발 환경 시작
docker-compose up -d

# 서비스 로그 확인
docker-compose logs -f portfolio-service

# 개발 환경 중지
docker-compose down
```

## 보안

### 인증 및 권한

- JWT 토큰 기반 인증
- 역할 기반 접근 제어 (RBAC)
- 다중 인증 (MFA) 지원
- 세션 관리 및 자동 로그아웃

### 데이터 보호

- 모든 데이터는 암호화되어 저장
- 전송 중 데이터는 TLS 1.3으로 보호
- 감사 로그는 모든 데이터 변경사항을 기록
- GDPR 및 기타 규정 준수

### API 보안

- Rate limiting으로 DDoS 방지
- 입력 검증 및 SQL 인젝션 방지
- CORS 정책으로 허용된 도메인만 접근 가능
- 보안 헤더 설정 (Helmet.js) 