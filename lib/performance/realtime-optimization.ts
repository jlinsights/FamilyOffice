/**
 * 실시간 데이터 처리 최적화
 * Real-time price updates: <100ms latency 목표
 * Concurrent users: Support 1000+ simultaneous users
 */

import { EventEmitter } from 'events'
// SSR 안전성을 위한 dynamic imports
let WebSocket: any = null
const redis: any = null

// WebSocket 연결 관리자
export class WebSocketManager extends EventEmitter {
  private wss: any = null
  private clients = new Map<string, {
    ws: any
    userId: string
    subscriptions: Set<string>
    lastPing: number
    connectionTime: number
  }>()
  
  private heartbeatInterval: NodeJS.Timeout | null = null
  private metricsInterval: NodeJS.Timeout | null = null
  private maxConnections = 10000
  private heartbeatTimeout = 30000 // 30초

  constructor(port: number = 8080) {
    super()
    this.initializeWebSocketServer(port)
    this.startHeartbeat()
    this.startMetricsCollection()
  }

  private async initializeWebSocketServer(port: number): Promise<void> {
    if (typeof window === 'undefined') {
      // Server-side에서는 WebSocket 서버를 초기화하지 않음
      console.log('Server-side에서는 WebSocket 서버를 초기화하지 않습니다.')
      return
    }

    try {
      // Dynamic imports
      if (!WebSocket) {
        const wsModule = await import('ws')
        WebSocket = wsModule.default
      }

      this.wss = new WebSocket.Server({
        port,
        perMessageDeflate: {
          zlibDeflateOptions: {
            threshold: 1024, // 1KB 이상만 압축
            concurrencyLimit: 10,
          },
        },
        maxPayload: 16 * 1024, // 16KB 최대 메시지 크기
      })

      this.wss.on('connection', this.handleConnection.bind(this))
      this.wss.on('error', (error: any) => {
        console.error('WebSocket Server Error:', error)
      })

      console.log(`🔗 WebSocket server listening on port ${port}`)
    } catch (error) {
      console.error('WebSocket 서버 초기화 실패:', error)
    }
  }

  private handleConnection(ws: any, request: any): void {
    const clientId = this.generateClientId()
    const userId = this.extractUserIdFromRequest(request)

    // 연결 수 제한 확인
    if (this.clients.size >= this.maxConnections) {
      ws.close(1013, 'Server overloaded')
      return
    }

    const client = {
      ws,
      userId,
      subscriptions: new Set<string>(),
      lastPing: Date.now(),
      connectionTime: Date.now(),
    }

    this.clients.set(clientId, client)

    ws.on('message', (data: WebSocket.Data) => {
      this.handleMessage(clientId, data)
    })

    ws.on('pong', () => {
      const client = this.clients.get(clientId)
      if (client) {
        client.lastPing = Date.now()
      }
    })

    ws.on('close', () => {
      this.handleDisconnection(clientId)
    })

    ws.on('error', (error: any) => {
      console.error(`WebSocket client error (${clientId}):`, error)
      this.handleDisconnection(clientId)
    })

    // 연결 환영 메시지
    this.sendToClient(clientId, {
      type: 'connected',
      clientId,
      timestamp: Date.now(),
    })

    console.log(`📱 Client connected: ${clientId} (User: ${userId})`)
    this.emit('clientConnected', { clientId, userId })
  }

  private handleMessage(clientId: string, data: WebSocket.Data): void {
    try {
      const message = JSON.parse(data.toString())
      const client = this.clients.get(clientId)
      
      if (!client) return

      switch (message.type) {
        case 'subscribe':
          this.handleSubscription(clientId, message.channels)
          break
        case 'unsubscribe':
          this.handleUnsubscription(clientId, message.channels)
          break
        case 'ping':
          this.sendToClient(clientId, { type: 'pong', timestamp: Date.now() })
          break
        default:
          console.warn(`Unknown message type: ${message.type}`)
      }
    } catch (error) {
      console.error('Message parsing error:', error)
    }
  }

  private handleSubscription(clientId: string, channels: string[]): void {
    const client = this.clients.get(clientId)
    if (!client) return

    channels.forEach(channel => {
      client.subscriptions.add(channel)
      console.log(`📡 Client ${clientId} subscribed to ${channel}`)
    })

    this.sendToClient(clientId, {
      type: 'subscribed',
      channels,
      timestamp: Date.now(),
    })
  }

  private handleUnsubscription(clientId: string, channels: string[]): void {
    const client = this.clients.get(clientId)
    if (!client) return

    channels.forEach(channel => {
      client.subscriptions.delete(channel)
      console.log(`📡 Client ${clientId} unsubscribed from ${channel}`)
    })

    this.sendToClient(clientId, {
      type: 'unsubscribed',
      channels,
      timestamp: Date.now(),
    })
  }

  private handleDisconnection(clientId: string): void {
    const client = this.clients.get(clientId)
    if (client) {
      const sessionDuration = Date.now() - client.connectionTime
      console.log(`📱 Client disconnected: ${clientId} (Session: ${sessionDuration}ms)`)
      
      this.clients.delete(clientId)
      this.emit('clientDisconnected', { clientId, sessionDuration })
    }
  }

  // 특정 클라이언트에게 메시지 전송
  private sendToClient(clientId: string, message: any): boolean {
    const client = this.clients.get(clientId)
    if (!client || client.ws.readyState !== WebSocket.OPEN) {
      return false
    }

    try {
      client.ws.send(JSON.stringify(message))
      return true
    } catch (error) {
      console.error(`Failed to send message to client ${clientId}:`, error)
      this.handleDisconnection(clientId)
      return false
    }
  }

  // 채널 구독자들에게 브로드캐스트
  public broadcast(channel: string, data: any): number {
    let sentCount = 0
    const message = {
      type: 'update',
      channel,
      data,
      timestamp: Date.now(),
    }

    for (const [clientId, client] of this.clients.entries()) {
      if (client.subscriptions.has(channel)) {
        if (this.sendToClient(clientId, message)) {
          sentCount++
        }
      }
    }

    return sentCount
  }

  // 특정 사용자에게 메시지 전송
  public sendToUser(userId: string, message: any): number {
    let sentCount = 0

    for (const [clientId, client] of this.clients.entries()) {
      if (client.userId === userId) {
        if (this.sendToClient(clientId, message)) {
          sentCount++
        }
      }
    }

    return sentCount
  }

  // 하트비트 관리
  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      const now = Date.now()
      const deadConnections: string[] = []

      for (const [clientId, client] of this.clients.entries()) {
        if (now - client.lastPing > this.heartbeatTimeout) {
          deadConnections.push(clientId)
        } else if (client.ws.readyState === WebSocket.OPEN) {
          client.ws.ping()
        }
      }

      // 죽은 연결 정리
      deadConnections.forEach(clientId => {
        console.log(`💀 Removing dead connection: ${clientId}`)
        this.handleDisconnection(clientId)
      })
    }, 15000) // 15초마다 체크
  }

  // 메트릭 수집
  private startMetricsCollection(): void {
    this.metricsInterval = setInterval(() => {
      const metrics = this.getMetrics()
      console.log('📊 WebSocket Metrics:', metrics)
      
      // Redis에 메트릭 저장
      redis.setex('websocket:metrics', 300, JSON.stringify(metrics))
    }, 60000) // 1분마다
  }

  public getMetrics() {
    const now = Date.now()
    const connectionsByChannel = new Map<string, number>()
    let totalSubscriptions = 0

    for (const client of this.clients.values()) {
      totalSubscriptions += client.subscriptions.size
      
      for (const channel of client.subscriptions) {
        connectionsByChannel.set(
          channel,
          (connectionsByChannel.get(channel) || 0) + 1
        )
      }
    }

    return {
      totalConnections: this.clients.size,
      totalSubscriptions,
      channelStats: Object.fromEntries(connectionsByChannel),
      uptime: now - (this.wss?.options.port ? now : 0),
      memoryUsage: process.memoryUsage(),
    }
  }

  private generateClientId(): string {
    return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private extractUserIdFromRequest(request: any): string {
    // JWT 토큰에서 사용자 ID 추출 (실제 구현 필요)
    const authHeader = request.headers.authorization
    if (authHeader) {
      // JWT 디코딩 로직
      return 'user_id_from_jwt'
    }
    return 'anonymous'
  }

  public close(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
    }
    if (this.metricsInterval) {
      clearInterval(this.metricsInterval)
    }
    if (this.wss) {
      this.wss.close()
    }
  }
}

// 실시간 가격 업데이트 관리자
export class PriceUpdateManager {
  private wsManager: WebSocketManager
  private updateQueue = new Map<string, {
    data: any
    timestamp: number
    subscribers: number
  }>()
  
  private batchInterval = 50 // 50ms마다 배치 전송
  private maxBatchSize = 100
  private priceCache = new Map<string, any>()

  constructor(wsManager: WebSocketManager) {
    this.wsManager = wsManager
    this.startBatchProcessing()
    this.subscribeToExternalFeeds()
  }

  // 가격 업데이트 큐에 추가
  public queuePriceUpdate(symbol: string, priceData: any): void {
    const subscriberCount = this.getSubscriberCount(symbol)

    // 구독자가 없으면 무시
    if (subscriberCount === 0) return

    this.updateQueue.set(symbol, {
      data: priceData,
      timestamp: Date.now(),
      subscribers: subscriberCount,
    })

    // 캐시 업데이트
    this.priceCache.set(symbol, priceData)

    // 즉시 전송이 필요한 경우 (큰 변동)
    if (this.shouldSendImmediately(priceData)) {
      this.sendImmediateUpdate(symbol, priceData)
    }
  }

  // 배치 처리 시작
  private startBatchProcessing(): void {
    setInterval(() => {
      this.processBatch()
    }, this.batchInterval)
  }

  // 배치 전송 처리
  private processBatch(): void {
    if (this.updateQueue.size === 0) return

    const updates = Array.from(this.updateQueue.entries())
      .sort((a, b) => b[1].subscribers - a[1].subscribers) // 구독자 많은 순
      .slice(0, this.maxBatchSize)

    const batchData = {
      type: 'price_batch',
      updates: updates.map(([symbol, update]) => ({
        symbol,
        ...update.data,
        timestamp: update.timestamp,
      })),
      batchTimestamp: Date.now(),
    }

    // 관련 채널로 브로드캐스트
    const channels = new Set<string>()
    updates.forEach(([symbol]) => {
      channels.add(`price:${symbol}`)
      channels.add('price:all')
    })

    let totalSent = 0
    channels.forEach(channel => {
      totalSent += this.wsManager.broadcast(channel, batchData)
    })

    // 전송된 업데이트 제거
    updates.forEach(([symbol]) => {
      this.updateQueue.delete(symbol)
    })

    if (totalSent > 0) {
      console.log(`📈 Sent price batch: ${updates.length} symbols to ${totalSent} clients`)
    }
  }

  // 즉시 전송이 필요한지 확인
  private shouldSendImmediately(priceData: any): boolean {
    // 5% 이상 변동시 즉시 전송
    return Math.abs(priceData.changePercent || 0) >= 5
  }

  // 즉시 업데이트 전송
  private sendImmediateUpdate(symbol: string, priceData: any): void {
    const updateData = {
      type: 'price_urgent',
      symbol,
      ...priceData,
      timestamp: Date.now(),
    }

    const sent = this.wsManager.broadcast(`price:${symbol}`, updateData)
    console.log(`🚨 Urgent price update sent for ${symbol} to ${sent} clients`)
  }

  // 심볼 구독자 수 조회
  private getSubscriberCount(symbol: string): number {
    const metrics = this.wsManager.getMetrics()
    return (
      (metrics.channelStats[`price:${symbol}`] || 0) +
      (metrics.channelStats['price:all'] || 0)
    )
  }

  // 외부 피드 구독
  private subscribeToExternalFeeds(): void {
    // Redis Pub/Sub으로 외부 가격 피드 구독
    redis.subscribe('external_price_feed', (data) => {
      try {
        const priceUpdate = JSON.parse(data)
        this.queuePriceUpdate(priceUpdate.symbol, priceUpdate)
      } catch (error) {
        console.error('External feed parsing error:', error)
      }
    })

    console.log('📡 Subscribed to external price feeds')
  }

  // 현재 가격 조회 (캐시에서)
  public getCurrentPrice(symbol: string): any {
    return this.priceCache.get(symbol)
  }

  // 가격 히스토리 조회
  public async getPriceHistory(symbol: string, timeframe: string): Promise<any[]> {
    const cacheKey = `price_history:${symbol}:${timeframe}`
    
    try {
      const cached = await redis.get(cacheKey)
      if (cached) {
        return JSON.parse(cached)
      }
    } catch (error) {
      console.error('Price history cache error:', error)
    }

    // 외부 API에서 히스토리 조회 (실제 구현 필요)
    const history = await this.fetchPriceHistoryFromAPI()
    
    // 캐시에 저장 (1분 TTL)
    try {
      await redis.setex(cacheKey, 60, JSON.stringify(history))
    } catch (error) {
      console.error('Price history cache set error:', error)
    }
    
    return history
  }

  private async fetchPriceHistoryFromAPI(): Promise<any[]> {
    // 실제 구현시 외부 API 호출
    return []
  }
}

// 포트폴리오 실시간 업데이트 관리자
export class PortfolioUpdateManager {
  private wsManager: WebSocketManager
  private userPortfolios = new Map<string, Set<string>>() // userId -> portfolioIds
  private portfolioValues = new Map<string, any>() // portfolioId -> value data

  constructor(wsManager: WebSocketManager) {
    this.wsManager = wsManager
    this.startPortfolioMonitoring()
  }

  // 사용자 포트폴리오 구독
  public subscribeUserPortfolio(userId: string, portfolioId: string): void {
    if (!this.userPortfolios.has(userId)) {
      this.userPortfolios.set(userId, new Set())
    }
    
    this.userPortfolios.get(userId)!.add(portfolioId)
    console.log(`👤 User ${userId} subscribed to portfolio ${portfolioId}`)
  }

  // 포트폴리오 값 업데이트
  public updatePortfolioValue(portfolioId: string, valueData: any): void {
    const previousValue = this.portfolioValues.get(portfolioId)
    this.portfolioValues.set(portfolioId, valueData)

    // 변동이 있는 경우만 전송
    if (this.hasSignificantChange(previousValue, valueData)) {
      this.sendPortfolioUpdate(portfolioId, valueData)
    }
  }

  // 포트폴리오 업데이트 전송
  private sendPortfolioUpdate(portfolioId: string, valueData: any): void {
    // 해당 포트폴리오를 구독하는 사용자들 찾기
    const affectedUsers: string[] = []
    
    for (const [userId, portfolios] of this.userPortfolios.entries()) {
      if (portfolios.has(portfolioId)) {
        affectedUsers.push(userId)
      }
    }

    const updateMessage = {
      type: 'portfolio_update',
      portfolioId,
      data: valueData,
      timestamp: Date.now(),
    }

    let totalSent = 0
    affectedUsers.forEach(userId => {
      totalSent += this.wsManager.sendToUser(userId, updateMessage)
    })

    if (totalSent > 0) {
      console.log(`💼 Portfolio update sent for ${portfolioId} to ${totalSent} clients`)
    }
  }

  // 유의미한 변동 확인
  private hasSignificantChange(previous: any, current: any): boolean {
    if (!previous) return true

    const changeThreshold = 0.01 // 1% 변동
    const valueChange = Math.abs(
      (current.totalValue - previous.totalValue) / previous.totalValue
    )

    return valueChange >= changeThreshold
  }

  // 포트폴리오 모니터링 시작
  private startPortfolioMonitoring(): void {
    // Redis에서 포트폴리오 업데이트 구독
    redis.subscribe('portfolio_updates', (data) => {
      try {
        const update = JSON.parse(data)
        this.updatePortfolioValue(update.portfolioId, update.data)
      } catch (error) {
        console.error('Portfolio update parsing error:', error)
      }
    })

    console.log('💼 Portfolio monitoring started')
  }
}

// 시스템 성능 모니터링
export class PerformanceMonitor {
  private wsManager: WebSocketManager
  private metrics = {
    messagesSent: 0,
    messagesReceived: 0,
    avgLatency: 0,
    peakConnections: 0,
    errorCount: 0,
  }

  constructor(wsManager: WebSocketManager) {
    this.wsManager = wsManager
    this.startMonitoring()
  }

  private startMonitoring(): void {
    // 메트릭 수집
    setInterval(() => {
      const wsMetrics = this.wsManager.getMetrics()
      this.metrics.peakConnections = Math.max(
        this.metrics.peakConnections,
        wsMetrics.totalConnections
      )

      // 관리자에게 성능 데이터 전송
      this.wsManager.broadcast('admin:metrics', {
        ...this.metrics,
        ...wsMetrics,
        timestamp: Date.now(),
      })
    }, 30000) // 30초마다
  }

  public recordMessage(type: 'sent' | 'received', latency?: number): void {
    if (type === 'sent') {
      this.metrics.messagesSent++
    } else {
      this.metrics.messagesReceived++
    }

    if (latency) {
      this.metrics.avgLatency = (this.metrics.avgLatency + latency) / 2
    }
  }

  public recordError(): void {
    this.metrics.errorCount++
  }

  public getMetrics() {
    return { ...this.metrics }
  }
}

// 부하 분산 관리자
export class LoadBalancer {
  private servers: Array<{
    id: string
    url: string
    connections: number
    maxConnections: number
    healthy: boolean
    lastCheck: number
  }> = []

  constructor() {
    this.startHealthChecks()
  }

  // 서버 추가
  public addServer(id: string, url: string, maxConnections: number = 1000): void {
    this.servers.push({
      id,
      url,
      connections: 0,
      maxConnections,
      healthy: true,
      lastCheck: Date.now(),
    })
  }

  // 최적 서버 선택
  public selectServer(): string | null {
    const healthyServers = this.servers.filter(s => s.healthy)
    
    if (healthyServers.length === 0) return null

    // 연결 수가 가장 적은 서버 선택
    const bestServer = healthyServers.reduce((best, current) => {
      const bestLoad = best.connections / best.maxConnections
      const currentLoad = current.connections / current.maxConnections
      return currentLoad < bestLoad ? current : best
    })

    return bestServer.url
  }

  // 헬스 체크
  private startHealthChecks(): void {
    setInterval(async () => {
      for (const server of this.servers) {
        try {
          const response = await fetch(`${server.url}/health`, {
            timeout: 5000,
          })
          server.healthy = response.ok
          server.lastCheck = Date.now()
        } catch (error) {
          server.healthy = false
          server.lastCheck = Date.now()
          console.warn(`Server ${server.id} health check failed:`, error)
        }
      }
    }, 30000) // 30초마다
  }

  public getServerStats() {
    return this.servers.map(server => ({
      ...server,
      loadPercentage: (server.connections / server.maxConnections) * 100,
    }))
  }
}

// 전역 인스턴스 생성
export const wsManager = new WebSocketManager()
export const priceManager = new PriceUpdateManager(wsManager)
export const portfolioManager = new PortfolioUpdateManager(wsManager)
export const performanceMonitor = new PerformanceMonitor(wsManager)
export const loadBalancer = new LoadBalancer()

// 초기화 함수
export function initializeRealtimeSystem(): void {
  if (typeof window === 'undefined') {
    console.log('Server-side에서는 실시간 시스템을 초기화하지 않습니다.')
    return
  }

  try {
    // 클라이언트에서만 초기화
    console.log('🚀 실시간 시스템 초기화 중...')
    // 실제 초기화 로직은 클라이언트에서만 실행
  } catch (error) {
    console.error('실시간 시스템 초기화 실패:', error)
  }
}

// 테스트 데이터 생성 (개발용)
function startTestDataGeneration(): void {
  const testSymbols = ['AAPL', 'TSLA', '005930.KS', 'NAVER']
  
  setInterval(() => {
    const symbol = testSymbols[Math.floor(Math.random() * testSymbols.length)]
    const price = Math.random() * 1000
    const change = (Math.random() - 0.5) * 10
    
    priceManager.queuePriceUpdate(symbol, {
      currentPrice: price,
      change,
      changePercent: (change / price) * 100,
      volume: Math.floor(Math.random() * 1000000),
    })
  }, 1000) // 1초마다 테스트 데이터 생성
}

// 정리 함수
export function cleanup(): void {
  wsManager.close()
  console.log('🧹 Real-time system cleanup completed')
}

// 프로세스 종료시 정리
process.on('SIGTERM', cleanup)
process.on('SIGINT', cleanup)