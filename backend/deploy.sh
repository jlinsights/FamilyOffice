#!/bin/bash

# Family Office Backend Deployment Script
# Usage: ./deploy.sh [environment] [service]

set -e

ENVIRONMENT=${1:-development}
SERVICE=${2:-all}

echo "🚀 Deploying Family Office Backend to $ENVIRONMENT environment"

# 환경 변수 설정
if [ "$ENVIRONMENT" = "production" ]; then
    export NODE_ENV=production
    export KUBECONFIG=~/.kube/config
    NAMESPACE=familyoffice
else
    export NODE_ENV=development
    NAMESPACE=familyoffice-dev
fi

# 공통 함수
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

check_prerequisites() {
    log "🔍 Checking prerequisites..."
    
    # Docker 확인
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker is not installed"
        exit 1
    fi
    
    # kubectl 확인
    if ! command -v kubectl &> /dev/null; then
        echo "❌ kubectl is not installed"
        exit 1
    fi
    
    # Helm 확인
    if ! command -v helm &> /dev/null; then
        echo "❌ Helm is not installed"
        exit 1
    fi
    
    log "✅ Prerequisites check passed"
}

build_services() {
    log "🏗️ Building services..."
    
    SERVICES=("portfolio-service" "transaction-service" "reporting-service" "user-service" "integration-hub")
    
    for service in "${SERVICES[@]}"; do
        if [ "$SERVICE" = "all" ] || [ "$SERVICE" = "$service" ]; then
            log "Building $service..."
            cd "services/$service"
            
            # TypeScript 컴파일
            npm run build
            
            # Docker 이미지 빌드
            docker build -t familyoffice/$service:latest .
            
            # 프로덕션 환경에서는 레지스트리에 푸시
            if [ "$ENVIRONMENT" = "production" ]; then
                docker tag familyoffice/$service:latest registry.familyoffice.com/$service:latest
                docker push registry.familyoffice.com/$service:latest
            fi
            
            cd ../..
        fi
    done
    
    log "✅ Services built successfully"
}

deploy_infrastructure() {
    log "🏗️ Deploying infrastructure..."
    
    # 네임스페이스 생성
    kubectl apply -f kubernetes/namespace.yaml
    
    # PostgreSQL 배포
    kubectl apply -f kubernetes/postgres-configmap.yaml
    kubectl apply -f kubernetes/postgres-secret.yaml
    kubectl apply -f kubernetes/postgres-persistent-volume.yaml
    kubectl apply -f kubernetes/postgres-deployment.yaml
    
    # Redis 배포
    kubectl apply -f kubernetes/redis-deployment.yaml
    
    # 모니터링 배포
    kubectl apply -f kubernetes/monitoring-configmap.yaml
    kubectl apply -f kubernetes/prometheus-deployment.yaml
    kubectl apply -f kubernetes/grafana-deployment.yaml
    
    log "✅ Infrastructure deployed successfully"
}

deploy_services() {
    log "🚀 Deploying services..."
    
    SERVICES=("portfolio-service" "transaction-service" "reporting-service" "user-service" "integration-hub")
    
    for service in "${SERVICES[@]}"; do
        if [ "$SERVICE" = "all" ] || [ "$SERVICE" = "$service" ]; then
            log "Deploying $service..."
            kubectl apply -f "kubernetes/${service}-deployment.yaml"
        fi
    done
    
    # Ingress 배포
    kubectl apply -f kubernetes/ingress.yaml
    
    log "✅ Services deployed successfully"
}

run_tests() {
    log "🧪 Running tests..."
    
    SERVICES=("portfolio-service" "transaction-service" "reporting-service" "user-service" "integration-hub")
    
    for service in "${SERVICES[@]}"; do
        if [ "$SERVICE" = "all" ] || [ "$SERVICE" = "$service" ]; then
            log "Testing $service..."
            cd "services/$service"
            npm test
            cd ../..
        fi
    done
    
    log "✅ Tests completed successfully"
}

health_check() {
    log "🏥 Performing health checks..."
    
    # 서비스 상태 확인
    kubectl get pods -n $NAMESPACE
    
    # 포트폴리오 서비스 헬스 체크
    kubectl port-forward service/portfolio-service 3001:3001 -n $NAMESPACE &
    PF_PID=$!
    
    sleep 5
    
    if curl -f http://localhost:3001/health; then
        log "✅ Portfolio service is healthy"
    else
        log "❌ Portfolio service health check failed"
    fi
    
    kill $PF_PID
    
    log "✅ Health checks completed"
}

main() {
    log "🎯 Starting Family Office Backend deployment"
    
    check_prerequisites
    build_services
    deploy_infrastructure
    deploy_services
    
    if [ "$ENVIRONMENT" = "development" ]; then
        run_tests
    fi
    
    health_check
    
    log "🎉 Deployment completed successfully!"
    log "📊 Dashboard: http://localhost:3000"
    log "📈 Metrics: http://localhost:9090"
    log "📋 Logs: kubectl logs -f deployment/portfolio-service -n $NAMESPACE"
}

# 스크립트 실행
main "$@" 