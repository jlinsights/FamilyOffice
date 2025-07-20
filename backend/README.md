# Family Office Backend System

엔터프라이즈급 패밀리 오피스 자산 관리 백엔드 시스템입니다.

## 🏗️ 시스템 아키텍처

### 마이크로서비스 구성
- **Portfolio Management Service** (포트 3001): 자산 배분, 리밸런싱, 성과 계산
- **Transaction Processing Service** (포트 3002): 거래 실행, 정산 추적, 기업 행동
- **Reporting Engine** (포트 3003): 맞춤형 보고서 생성, 스케줄링, 데이터 내보내기
- **User Management Service** (포트 3004): 역할 기반 접근, 가족 구성원 권한, 어드바이저 접근
- **Integration Hub** (포트 3005): 외부 API 관리, 데이터 동기화, 웹훅 처리

### 기술 스택
- **Runtime**: Node.js 18+ / TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL 15 (시계열 데이터 지원)
- **Cache**: Redis 7
- **Message Queue**: BullMQ
- **Monitoring**: Prometheus + Grafana
- **Containerization**: Docker + Kubernetes
- **Security**: JWT, bcrypt, helmet, rate limiting

## 🚀 빠른 시작

### 개발 환경 설정

1. **의존성 설치**
```bash
# 루트 디렉토리에서
cd backend
npm install

# 각 서비스별 의존성 설치
cd services/portfolio-service && npm install
cd ../transaction-service && npm install
cd ../reporting-service && npm install
cd ../user-service && npm install
cd ../integration-hub && npm install
```

2. **환경 변수 설정**
```bash
# .env 파일 생성
cp .env.example .env

# 환경 변수 편집
DB_HOST=localhost
DB_PORT=5432
DB_NAME=familyoffice
DB_USER=postgres
DB_PASSWORD=password
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-secret-key
```

3. **Docker Compose로 실행**
```bash
cd docker
docker-compose up -d
```

4. **개별 서비스 개발 모드 실행**
```bash
# 포트폴리오 서비스
cd services/portfolio-service
npm run dev

# 트랜잭션 서비스
cd ../transaction-service
npm run dev

# 리포팅 서비스
cd ../reporting-service
npm run dev

# 사용자 관리 서비스
cd ../user-service
npm run dev

# 통합 허브 서비스
cd ../integration-hub
npm run dev
```

## 📊 API 엔드포인트

### Portfolio Management Service (포트 3001)
```
GET    /api/v1/portfolios          # 포트폴리오 목록 조회
POST   /api/v1/portfolios          # 포트폴리오 생성
GET    /api/v1/portfolios/:id      # 포트폴리오 상세 조회
PUT    /api/v1/portfolios/:id      # 포트폴리오 수정
DELETE /api/v1/portfolios/:id      # 포트폴리오 삭제
GET    /api/v1/portfolios/:id/performance  # 성과 분석
POST   /api/v1/portfolios/:id/rebalance    # 리밸런싱 실행
```

### Transaction Processing Service (포트 3002)
```
GET    /api/v1/transactions        # 거래 목록 조회
POST   /api/v1/transactions        # 거래 생성
GET    /api/v1/transactions/:id    # 거래 상세 조회
PUT    /api/v1/transactions/:id    # 거래 수정
DELETE /api/v1/transactions/:id    # 거래 삭제
POST   /api/v1/transactions/batch  # 배치 거래 처리
GET    /api/v1/transactions/settlement  # 정산 상태 조회
```

### Reporting Engine (포트 3003)
```
GET    /api/v1/reports             # 보고서 목록 조회
POST   /api/v1/reports             # 보고서 생성
GET    /api/v1/reports/:id         # 보고서 상세 조회
PUT    /api/v1/reports/:id         # 보고서 수정
DELETE /api/v1/reports/:id         # 보고서 삭제
POST   /api/v1/reports/:id/schedule # 보고서 스케줄링
GET    /api/v1/reports/:id/export  # 보고서 내보내기
```

### User Management Service (포트 3004)
```
POST   /api/v1/auth/login          # 로그인
POST   /api/v1/auth/logout         # 로그아웃
POST   /api/v1/auth/refresh        # 토큰 갱신
GET    /api/v1/users               # 사용자 목록 조회
POST   /api/v1/users               # 사용자 생성
GET    /api/v1/users/:id           # 사용자 상세 조회
PUT    /api/v1/users/:id           # 사용자 수정
DELETE /api/v1/users/:id           # 사용자 삭제
POST   /api/v1/users/:id/2fa       # 2FA 설정
GET    /api/v1/families            # 가족 그룹 조회
```

### Integration Hub (포트 3005)
```
GET    /api/v1/integrations        # 통합 목록 조회
POST   /api/v1/integrations        # 통합 생성
GET    /api/v1/integrations/:id    # 통합 상세 조회
PUT    /api/v1/integrations/:id    # 통합 수정
DELETE /api/v1/integrations/:id    # 통합 삭제
POST   /api/v1/integrations/:id/sync  # 동기화 시작
GET    /api/v1/sync-jobs/:id/status   # 동기화 상태 조회
POST   /api/v1/integrations/:id/test   # 통합 테스트
```

## 🔧 개발 가이드

### 새로운 서비스 추가

1. **서비스 디렉토리 생성**
```bash
mkdir -p services/new-service/src/{controllers,services,repositories,types}
```

2. **package.json 생성**
```bash
cd services/new-service
npm init -y
```

3. **TypeScript 설정**
```bash
cp ../portfolio-service/tsconfig.json .
```

4. **Dockerfile 생성**
```bash
cp ../portfolio-service/Dockerfile .
```

5. **Docker Compose에 추가**
```yaml
# docker/docker-compose.yml에 추가
new-service:
  build:
    context: ../services/new-service
    dockerfile: Dockerfile
  container_name: familyoffice-new-service
  environment:
    NODE_ENV: development
    PORT: 3006
    # ... 기타 환경 변수
  ports:
    - "3006:3006"
```

### 데이터베이스 마이그레이션

```bash
# 마이그레이션 파일 생성
cd shared/database/migrations
touch 001_create_portfolios.sql
touch 002_create_transactions.sql
# ...

# 마이그레이션 실행
npm run migrate
```

### 테스트 실행

```bash
# 전체 테스트
npm test

# 특정 서비스 테스트
cd services/portfolio-service
npm test

# 테스트 커버리지
npm run test:coverage
```

## 🔒 보안 기능

### 인증 및 권한
- JWT 기반 인증
- 역할 기반 접근 제어 (RBAC)
- 다중 인증 (MFA)
- 세션 관리

### 데이터 보안
- 데이터 암호화 (저장 시, 전송 시)
- 민감 정보 마스킹
- 감사 로그
- 데이터 백업 및 복구

### API 보안
- Rate limiting
- CORS 설정
- Helmet 보안 헤더
- 입력 검증 및 sanitization

## 📈 모니터링 및 로깅

### 메트릭 수집
- Prometheus 메트릭
- 커스텀 비즈니스 메트릭
- 성능 모니터링
- 에러 추적

### 로깅
- Winston 로거
- 구조화된 로그
- 로그 레벨 관리
- 로그 집계

### 대시보드
- Grafana 대시보드
- 실시간 모니터링
- 알림 설정
- 성능 분석

## 🚀 배포

### 개발 환경
```bash
docker-compose up -d
```

### 스테이징 환경
```bash
kubectl apply -f k8s/staging/
```

### 프로덕션 환경
```bash
kubectl apply -f k8s/production/
```

## 📚 문서

- [API 문서](./docs/api.md)
- [데이터베이스 스키마](./docs/database.md)
- [보안 가이드](./docs/security.md)
- [모니터링 가이드](./docs/monitoring.md)
- [배포 가이드](./docs/deployment.md)

## 🤝 기여

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📞 지원

- **이슈 리포트**: GitHub Issues
- **문서**: [Wiki](../../wiki)
- **이메일**: support@familyoffice.com

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](../../LICENSE) 파일을 참조하세요. 