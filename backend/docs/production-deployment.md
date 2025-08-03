# Production Deployment Guide

## 🏗️ 인프라 요구사항

### 최소 사양

- **CPU**: 8 코어 이상
- **메모리**: 32GB RAM 이상
- **스토리지**: 500GB SSD 이상
- **네트워크**: 1Gbps 이상

### 권장 사양

- **CPU**: 16 코어 이상
- **메모리**: 64GB RAM 이상
- **스토리지**: 1TB NVMe SSD
- **네트워크**: 10Gbps

## 🔒 보안 설정

### 네트워크 보안

```bash
# 방화벽 설정
sudo ufw enable
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 5432/tcp  # PostgreSQL (내부 네트워크만)
sudo ufw allow 6379/tcp  # Redis (내부 네트워크만)
```

### SSL/TLS 인증서

```bash
# Let's Encrypt 인증서 발급
sudo certbot --nginx -d api.familyoffice.com
sudo certbot --nginx -d admin.familyoffice.com
```

### 데이터베이스 보안

```sql
-- PostgreSQL 보안 설정
ALTER SYSTEM SET ssl = on;
ALTER SYSTEM SET ssl_ciphers = 'HIGH:MEDIUM:+3DES:!aNULL';
ALTER SYSTEM SET password_encryption = 'scram-sha-256';
```

## 🐳 Docker 프로덕션 설정

### 프로덕션 Docker Compose

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  # 데이터베이스
  postgres:
    image: postgres:15-alpine
    container_name: family-office-postgres
    environment:
      POSTGRES_DB: familyoffice
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-scripts:/docker-entrypoint-initdb.d
    networks:
      - family-office-network
    restart: unless-stopped

  # Redis
  redis:
    image: redis:7-alpine
    container_name: family-office-redis
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - family-office-network
    restart: unless-stopped

  # 서비스들
  portfolio-service:
    build:
      context: ./services/portfolio-service
      dockerfile: Dockerfile
    container_name: family-office-portfolio
    environment:
      NODE_ENV: production
      PORT: 3001
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: familyoffice
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      REDIS_HOST: redis
      REDIS_PORT: 6379
      REDIS_PASSWORD: ${REDIS_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
    ports:
      - '3001:3001'
    networks:
      - family-office-network
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  transaction-service:
    build:
      context: ./services/transaction-service
      dockerfile: Dockerfile
    container_name: family-office-transaction
    environment:
      NODE_ENV: production
      PORT: 3002
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: familyoffice
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      REDIS_HOST: redis
      REDIS_PORT: 6379
      REDIS_PASSWORD: ${REDIS_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
    ports:
      - '3002:3002'
    networks:
      - family-office-network
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  reporting-service:
    build:
      context: ./services/reporting-service
      dockerfile: Dockerfile
    container_name: family-office-reporting
    environment:
      NODE_ENV: production
      PORT: 3003
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: familyoffice
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      REDIS_HOST: redis
      REDIS_PORT: 6379
      REDIS_PASSWORD: ${REDIS_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
    ports:
      - '3003:3003'
    networks:
      - family-office-network
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  user-service:
    build:
      context: ./services/user-service
      dockerfile: Dockerfile
    container_name: family-office-user
    environment:
      NODE_ENV: production
      PORT: 3004
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: familyoffice
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      REDIS_HOST: redis
      REDIS_PORT: 6379
      REDIS_PASSWORD: ${REDIS_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
    ports:
      - '3004:3004'
    networks:
      - family-office-network
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  integration-hub:
    build:
      context: ./services/integration-hub
      dockerfile: Dockerfile
    container_name: family-office-integration
    environment:
      NODE_ENV: production
      PORT: 3005
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: familyoffice
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      REDIS_HOST: redis
      REDIS_PORT: 6379
      REDIS_PASSWORD: ${REDIS_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
    ports:
      - '3005:3005'
    networks:
      - family-office-network
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  # API Gateway
  nginx:
    image: nginx:alpine
    container_name: family-office-nginx
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
      - ./logs/nginx:/var/log/nginx
    networks:
      - family-office-network
    depends_on:
      - portfolio-service
      - transaction-service
      - reporting-service
      - user-service
      - integration-hub
    restart: unless-stopped

  # 모니터링
  prometheus:
    image: prom/prometheus:latest
    container_name: family-office-prometheus
    ports:
      - '9090:9090'
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    networks:
      - family-office-network
    restart: unless-stopped

  grafana:
    image: grafana/grafana:latest
    container_name: family-office-grafana
    ports:
      - '3000:3000'
    environment:
      GF_SECURITY_ADMIN_PASSWORD: ${GRAFANA_PASSWORD}
    volumes:
      - grafana_data:/var/lib/grafana
      - ./monitoring/grafana/dashboards:/etc/grafana/provisioning/dashboards
      - ./monitoring/grafana/datasources:/etc/grafana/provisioning/datasources
    networks:
      - family-office-network
    depends_on:
      - prometheus
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
  prometheus_data:
  grafana_data:

networks:
  family-office-network:
    driver: bridge
```

## ☸️ Kubernetes 배포

### 네임스페이스 생성

```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: family-office
  labels:
    name: family-office
```

### ConfigMap 설정

```yaml
# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: family-office-config
  namespace: family-office
data:
  NODE_ENV: 'production'
  DB_HOST: 'postgres-service'
  DB_PORT: '5432'
  DB_NAME: 'familyoffice'
  REDIS_HOST: 'redis-service'
  REDIS_PORT: '6379'
  JWT_SECRET: 'your-jwt-secret'
  JWT_EXPIRES_IN: '24h'
  REFRESH_TOKEN_SECRET: 'your-refresh-secret'
  REFRESH_TOKEN_EXPIRES_IN: '7d'
```

### Secret 설정

```yaml
# k8s/secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: family-office-secrets
  namespace: family-office
type: Opaque
data:
  DB_USER: ZmFtaWx5b2ZmaWNl # base64 encoded
  DB_PASSWORD: cGFzc3dvcmQ= # base64 encoded
  REDIS_PASSWORD: cmVkaXNwYXNzd29yZA== # base64 encoded
  JWT_SECRET: eW91ci1qd3Qtc2VjcmV0 # base64 encoded
  REFRESH_TOKEN_SECRET: eW91ci1yZWZyZXNoLXNlY3JldA== # base64 encoded
```

### PersistentVolume 설정

```yaml
# k8s/persistent-volume.yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: postgres-pv
  namespace: family-office
spec:
  capacity:
    storage: 100Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /data/postgres
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
  namespace: family-office
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 100Gi
```

### 서비스 배포

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: portfolio-service
  namespace: family-office
spec:
  replicas: 3
  selector:
    matchLabels:
      app: portfolio-service
  template:
    metadata:
      labels:
        app: portfolio-service
    spec:
      containers:
        - name: portfolio-service
          image: family-office/portfolio-service:latest
          ports:
            - containerPort: 3001
          env:
            - name: NODE_ENV
              valueFrom:
                configMapKeyRef:
                  name: family-office-config
                  key: NODE_ENV
            - name: DB_HOST
              valueFrom:
                configMapKeyRef:
                  name: family-office-config
                  key: DB_HOST
            - name: DB_USER
              valueFrom:
                secretKeyRef:
                  name: family-office-secrets
                  key: DB_USER
          resources:
            requests:
              memory: '512Mi'
              cpu: '250m'
            limits:
              memory: '1Gi'
              cpu: '500m'
          livenessProbe:
            httpGet:
              path: /health
              port: 3001
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /health
              port: 3001
            initialDelaySeconds: 5
            periodSeconds: 5
```

### Ingress 설정

```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: family-office-ingress
  namespace: family-office
  annotations:
    kubernetes.io/ingress.class: 'nginx'
    cert-manager.io/cluster-issuer: 'letsencrypt-prod'
    nginx.ingress.kubernetes.io/ssl-redirect: 'true'
    nginx.ingress.kubernetes.io/rate-limit: '100'
spec:
  tls:
    - hosts:
        - api.familyoffice.com
      secretName: family-office-tls
  rules:
    - host: api.familyoffice.com
      http:
        paths:
          - path: /portfolio
            pathType: Prefix
            backend:
              service:
                name: portfolio-service
                port:
                  number: 3001
          - path: /transaction
            pathType: Prefix
            backend:
              service:
                name: transaction-service
                port:
                  number: 3002
          - path: /reporting
            pathType: Prefix
            backend:
              service:
                name: reporting-service
                port:
                  number: 3003
          - path: /user
            pathType: Prefix
            backend:
              service:
                name: user-service
                port:
                  number: 3004
          - path: /integration
            pathType: Prefix
            backend:
              service:
                name: integration-hub
                port:
                  number: 3005
```

## 📊 모니터링 설정

### Prometheus 설정

```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s

rule_files:
  - 'alert.rules'

alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - alertmanager:9093

scrape_configs:
  - job_name: 'portfolio-service'
    static_configs:
      - targets: ['portfolio-service:3001']
    metrics_path: '/metrics'

  - job_name: 'transaction-service'
    static_configs:
      - targets: ['transaction-service:3002']
    metrics_path: '/metrics'

  - job_name: 'reporting-service'
    static_configs:
      - targets: ['reporting-service:3003']
    metrics_path: '/metrics'

  - job_name: 'user-service'
    static_configs:
      - targets: ['user-service:3004']
    metrics_path: '/metrics'

  - job_name: 'integration-hub'
    static_configs:
      - targets: ['integration-hub:3005']
    metrics_path: '/metrics'
```

### Grafana 대시보드

```json
// monitoring/grafana/dashboards/family-office-dashboard.json
{
  "dashboard": {
    "id": null,
    "title": "Family Office Services Dashboard",
    "tags": ["family-office"],
    "timezone": "browser",
    "panels": [
      {
        "id": 1,
        "title": "Service Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_request_duration_seconds_sum[5m])",
            "legendFormat": "{{service}}"
          }
        ]
      },
      {
        "id": 2,
        "title": "Error Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~\"5..\"}[5m])",
            "legendFormat": "{{service}}"
          }
        ]
      },
      {
        "id": 3,
        "title": "Database Connections",
        "type": "graph",
        "targets": [
          {
            "expr": "pg_stat_database_numbackends",
            "legendFormat": "{{datname}}"
          }
        ]
      }
    ]
  }
}
```

## 🔄 CI/CD 파이프라인

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd backend
          npm install
      - name: Run tests
        run: |
          cd backend
          npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker images
        run: |
          cd backend
          docker build -t family-office/portfolio-service:latest ./services/portfolio-service
          docker build -t family-office/transaction-service:latest ./services/transaction-service
          docker build -t family-office/reporting-service:latest ./services/reporting-service
          docker build -t family-office/user-service:latest ./services/user-service
          docker build -t family-office/integration-hub:latest ./services/integration-hub

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Kubernetes
        run: |
          kubectl apply -f k8s/namespace.yaml
          kubectl apply -f k8s/configmap.yaml
          kubectl apply -f k8s/secret.yaml
          kubectl apply -f k8s/persistent-volume.yaml
          kubectl apply -f k8s/deployment.yaml
          kubectl apply -f k8s/ingress.yaml
```

## 💾 백업 및 재해 복구

### 데이터베이스 백업

```bash
#!/bin/bash
# scripts/backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_NAME="familyoffice"

# PostgreSQL 백업
pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME > $BACKUP_DIR/postgres_$DATE.sql

# Redis 백업
redis-cli -h $REDIS_HOST -a $REDIS_PASSWORD BGSAVE

# 파일 압축
tar -czf $BACKUP_DIR/family-office-backup_$DATE.tar.gz \
  $BACKUP_DIR/postgres_$DATE.sql \
  /var/lib/redis/dump.rdb

# S3 업로드 (선택사항)
aws s3 cp $BACKUP_DIR/family-office-backup_$DATE.tar.gz \
  s3://family-office-backups/

# 오래된 백업 삭제 (30일)
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
```

### 재해 복구 계획

```bash
#!/bin/bash
# scripts/disaster-recovery.sh

# 1. 새 서버 설정
echo "Setting up new server..."

# 2. 데이터베이스 복원
echo "Restoring database..."
psql -h $DB_HOST -U $DB_USER -d $DB_NAME < $BACKUP_FILE

# 3. Redis 복원
echo "Restoring Redis..."
redis-cli -h $REDIS_HOST -a $REDIS_PASSWORD FLUSHALL
redis-cli -h $REDIS_HOST -a $REDIS_PASSWORD RESTORE

# 4. 서비스 재시작
echo "Restarting services..."
kubectl rollout restart deployment/portfolio-service
kubectl rollout restart deployment/transaction-service
kubectl rollout restart deployment/reporting-service
kubectl rollout restart deployment/user-service
kubectl rollout restart deployment/integration-hub

# 5. 헬스 체크
echo "Health check..."
kubectl get pods -n family-office
```

## ⚡ 성능 튜닝

### PostgreSQL 최적화

```sql
-- postgresql.conf 최적화
shared_buffers = 256MB
effective_cache_size = 1GB
work_mem = 4MB
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100
random_page_cost = 1.1
effective_io_concurrency = 200
```

### Redis 최적화

```bash
# redis.conf 최적화
maxmemory 2gb
maxmemory-policy allkeys-lru
save 900 1
save 300 10
save 60 10000
```

### Node.js 최적화

```javascript
// PM2 설정
module.exports = {
  apps: [
    {
      name: 'portfolio-service',
      script: 'dist/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024',
    },
  ],
};
```

## 🔍 보안 감사 체크리스트

### 네트워크 보안

- [ ] 방화벽 설정 완료
- [ ] SSL/TLS 인증서 설치
- [ ] VPN 접근 설정
- [ ] 네트워크 분리 (DMZ)

### 애플리케이션 보안

- [ ] 입력값 검증
- [ ] SQL 인젝션 방지
- [ ] XSS 방지
- [ ] CSRF 토큰 사용
- [ ] Rate limiting 설정
- [ ] 로그 모니터링

### 데이터 보안

- [ ] 데이터 암호화 (저장/전송)
- [ ] 백업 암호화
- [ ] 접근 로그 기록
- [ ] 정기 보안 스캔

### 운영 보안

- [ ] 정기 패치 업데이트
- [ ] 보안 모니터링
- [ ] 인시던트 대응 계획
- [ ] 직원 보안 교육

## 📞 지원 및 연락처

### 기술 지원

- **이메일**: tech-support@familyoffice.com
- **전화**: +82-2-1234-5678
- **긴급 연락처**: +82-10-1234-5678

### 문서 및 리소스

- **API 문서**: https://api.familyoffice.com/docs
- **모니터링**: https://grafana.familyoffice.com
- **로그**: https://logs.familyoffice.com

### 문제 해결

```bash
# 서비스 상태 확인
kubectl get pods -n family-office

# 로그 확인
kubectl logs -f deployment/portfolio-service -n family-office

# 메트릭 확인
curl http://localhost:9090/metrics

# 헬스 체크
curl http://localhost:3001/health
```
