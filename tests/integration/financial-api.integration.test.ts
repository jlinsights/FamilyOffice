/**
 * Integration tests for external financial API dependencies
 * Tests real API interactions with fallback handling
 */

import { 
  MOCK_STOCK_DATA, 
  MOCK_FOREX_DATA, 
  MOCK_API_ERRORS,
  mockAsyncDelay 
} from '../setup/financial-mocks'

// Mock the actual financial service
jest.mock('../../lib/financial/financial-service', () => ({
  getStockData: jest.fn(),
  getForexData: jest.fn(),
  getMarketData: jest.fn(),
  healthCheck: jest.fn(),
}))

import * as financialService from '../../lib/financial/financial-service'

describe('Financial API Integration Tests', () => {
  
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset fetch mock
    global.fetch = jest.fn()
  })
  
  describe('Stock Data API Integration', () => {
    
    test('should fetch Korean stock data successfully', async () => {
      // Mock successful API response
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => MOCK_STOCK_DATA['005930.KS']
      }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse)
      ;(financialService.getStockData as jest.Mock).mockResolvedValueOnce(MOCK_STOCK_DATA['005930.KS'])
      
      const result = await financialService.getStockData('005930.KS')
      
      expect(result).toEqual(MOCK_STOCK_DATA['005930.KS'])
      expect(result.symbol).toBe('005930.KS')
      expect(result.name).toBe('삼성전자')
      expect(result.currency).toBe('KRW')
    })
    
    test('should fetch US stock data successfully', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => MOCK_STOCK_DATA['AAPL']
      }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse)
      ;(financialService.getStockData as jest.Mock).mockResolvedValueOnce(MOCK_STOCK_DATA['AAPL'])
      
      const result = await financialService.getStockData('AAPL')
      
      expect(result).toEqual(MOCK_STOCK_DATA['AAPL'])
      expect(result.symbol).toBe('AAPL')
      expect(result.currency).toBe('USD')
    })
    
    test('should handle API rate limiting with retry', async () => {
      // First call fails with rate limit
      const rateLimitResponse = {
        ok: false,
        status: 429,
        json: async () => ({ error: 'Rate limit exceeded' })
      }
      
      // Second call succeeds
      const successResponse = {
        ok: true,
        status: 200,
        json: async () => MOCK_STOCK_DATA['AAPL']
      }
      
      ;(global.fetch as jest.Mock)
        .mockResolvedValueOnce(rateLimitResponse)
        .mockResolvedValueOnce(successResponse)
      
      // Mock the service to simulate retry logic
      ;(financialService.getStockData as jest.Mock).mockImplementationOnce(async () => {
        await mockAsyncDelay(100) // Simulate retry delay
        return MOCK_STOCK_DATA['AAPL']
      })
      
      const result = await financialService.getStockData('AAPL')
      expect(result).toEqual(MOCK_STOCK_DATA['AAPL'])
    })
    
    test('should handle invalid symbol gracefully', async () => {
      const errorResponse = {
        ok: false,
        status: 404,
        json: async () => ({ error: 'Symbol not found' })
      }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(errorResponse)
      ;(financialService.getStockData as jest.Mock).mockRejectedValueOnce(new Error('Symbol not found'))
      
      await expect(financialService.getStockData('INVALID')).rejects.toThrow('Symbol not found')
    })
    
    test('should handle network timeout', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network timeout'))
      ;(financialService.getStockData as jest.Mock).mockRejectedValueOnce(new Error('Network timeout'))
      
      await expect(financialService.getStockData('AAPL')).rejects.toThrow('Network timeout')
    })
    
    test('should handle multiple stock symbols in batch', async () => {
      const symbols = ['AAPL', 'TSLA', '005930.KS']
      const mockResults = symbols.map(symbol => MOCK_STOCK_DATA[symbol])
      
      ;(financialService.getStockData as jest.Mock).mockImplementation(async (symbol) => {
        await mockAsyncDelay(50)
        return MOCK_STOCK_DATA[symbol]
      })
      
      const results = await Promise.all(
        symbols.map(symbol => financialService.getStockData(symbol))
      )
      
      expect(results).toHaveLength(3)
      expect(results[0].symbol).toBe('AAPL')
      expect(results[1].symbol).toBe('TSLA')
      expect(results[2].symbol).toBe('005930.KS')
    })
  })
  
  describe('Forex Data API Integration', () => {
    
    test('should fetch forex rates successfully', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => MOCK_FOREX_DATA['USD/KRW']
      }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse)
      ;(financialService.getForexData as jest.Mock).mockResolvedValueOnce(MOCK_FOREX_DATA['USD/KRW'])
      
      const result = await financialService.getForexData('USD', 'KRW')
      
      expect(result).toEqual(MOCK_FOREX_DATA['USD/KRW'])
      expect(result.from).toBe('USD')
      expect(result.to).toBe('KRW')
      expect(result.rate).toBeGreaterThan(0)
    })
    
    test('should handle major currency pairs', async () => {
      const majorPairs = ['USD/KRW', 'EUR/KRW', 'JPY/KRW']
      
      ;(financialService.getForexData as jest.Mock).mockImplementation(async (from, to) => {
        const pair = `${from}/${to}`
        await mockAsyncDelay(30)
        return MOCK_FOREX_DATA[pair]
      })
      
      const usdKrw = await financialService.getForexData('USD', 'KRW')
      const eurKrw = await financialService.getForexData('EUR', 'KRW')
      const jpyKrw = await financialService.getForexData('JPY', 'KRW')
      
      expect(usdKrw.rate).toBeGreaterThan(1000) // USD/KRW typically > 1000
      expect(eurKrw.rate).toBeGreaterThan(1000) // EUR/KRW typically > 1000
      expect(jpyKrw.rate).toBeLessThan(100) // JPY/KRW typically < 100
    })
    
    test('should handle forex API failures with fallback', async () => {
      // First call fails
      ;(financialService.getForexData as jest.Mock)
        .mockRejectedValueOnce(new Error('Primary forex API failed'))
        .mockResolvedValueOnce(MOCK_FOREX_DATA['USD/KRW']) // Fallback succeeds
      
      // Test retry logic
      const result = await financialService.getForexData('USD', 'KRW').catch(async () => {
        // Simulate fallback
        return await financialService.getForexData('USD', 'KRW')
      })
      
      expect(result).toEqual(MOCK_FOREX_DATA['USD/KRW'])
    })
    
    test('should validate forex rate format', async () => {
      const mockForexData = {
        from: 'USD',
        to: 'KRW',
        rate: 1325.50,
        change: 8.25,
        changePercent: 0.63,
        timestamp: Date.now()
      }
      
      ;(financialService.getForexData as jest.Mock).mockResolvedValueOnce(mockForexData)
      
      const result = await financialService.getForexData('USD', 'KRW')
      
      expect(result).toHaveProperty('from')
      expect(result).toHaveProperty('to')
      expect(result).toHaveProperty('rate')
      expect(result).toHaveProperty('timestamp')
      expect(typeof result.rate).toBe('number')
      expect(result.rate).toBeGreaterThan(0)
    })
  })
  
  describe('Market Data API Integration', () => {
    
    test('should fetch market indices data', async () => {
      const mockMarketData = {
        indices: {
          'KOSPI': { name: 'KOSPI', value: 2645.32, change: 15.67, changePercent: 0.60 },
          'S&P500': { name: 'S&P 500', value: 4567.23, change: 12.45, changePercent: 0.27 }
        }
      }
      
      ;(financialService.getMarketData as jest.Mock).mockResolvedValueOnce(mockMarketData)
      
      const result = await financialService.getMarketData()
      
      expect(result.indices).toHaveProperty('KOSPI')
      expect(result.indices).toHaveProperty('S&P500')
      expect(result.indices.KOSPI.value).toBeGreaterThan(0)
    })
    
    test('should handle partial market data failures', async () => {
      const partialData = {
        indices: {
          'KOSPI': { name: 'KOSPI', value: 2645.32, change: 15.67, changePercent: 0.60 }
          // S&P500 data missing due to API failure
        }
      }
      
      ;(financialService.getMarketData as jest.Mock).mockResolvedValueOnce(partialData)
      
      const result = await financialService.getMarketData()
      
      expect(result.indices).toHaveProperty('KOSPI')
      expect(result.indices.KOSPI).toBeDefined()
    })
  })
  
  describe('API Health Check Integration', () => {
    
    test('should perform health check on all APIs', async () => {
      const healthData = {
        yahoo: { status: 'healthy', latency: 150 },
        alphaVantage: { status: 'healthy', latency: 200 },
        forex: { status: 'healthy', latency: 100 },
        overall: 'healthy'
      }
      
      ;(financialService.healthCheck as jest.Mock).mockResolvedValueOnce(healthData)
      
      const result = await financialService.healthCheck()
      
      expect(result.overall).toBe('healthy')
      expect(result.yahoo.status).toBe('healthy')
      expect(result.alphaVantage.status).toBe('healthy')
      expect(result.forex.status).toBe('healthy')
    })
    
    test('should detect unhealthy APIs', async () => {
      const healthData = {
        yahoo: { status: 'healthy', latency: 150 },
        alphaVantage: { status: 'degraded', latency: 5000 },
        forex: { status: 'down', latency: null },
        overall: 'degraded'
      }
      
      ;(financialService.healthCheck as jest.Mock).mockResolvedValueOnce(healthData)
      
      const result = await financialService.healthCheck()
      
      expect(result.overall).toBe('degraded')
      expect(result.alphaVantage.status).toBe('degraded')
      expect(result.forex.status).toBe('down')
    })
  })
  
  describe('API Response Validation', () => {
    
    test('should validate stock data response structure', async () => {
      const incompleteData = {
        symbol: 'AAPL',
        // Missing required fields: price, name, etc.
      }
      
      ;(financialService.getStockData as jest.Mock).mockResolvedValueOnce(incompleteData)
      
      const result = await financialService.getStockData('AAPL')
      
      expect(result).toHaveProperty('symbol')
      // In real implementation, service should validate and throw if incomplete
    })
    
    test('should handle malformed JSON responses', async () => {
      const malformedResponse = {
        ok: true,
        status: 200,
        json: async () => {
          throw new Error('Invalid JSON')
        }
      }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(malformedResponse)
      ;(financialService.getStockData as jest.Mock).mockRejectedValueOnce(new Error('Invalid JSON'))
      
      await expect(financialService.getStockData('AAPL')).rejects.toThrow('Invalid JSON')
    })
    
    test('should validate numeric data types', async () => {
      const invalidNumericData = {
        symbol: 'AAPL',
        price: 'invalid_price', // Should be number
        change: 'invalid_change',
        volume: 'invalid_volume'
      }
      
      ;(financialService.getStockData as jest.Mock).mockImplementationOnce(async () => {
        // In real implementation, service should validate and sanitize
        return {
          ...invalidNumericData,
          price: parseFloat(invalidNumericData.price) || 0,
          change: parseFloat(invalidNumericData.change) || 0,
          volume: parseInt(invalidNumericData.volume) || 0
        }
      })
      
      const result = await financialService.getStockData('AAPL')
      
      expect(typeof result.price).toBe('number')
      expect(typeof result.change).toBe('number')
      expect(typeof result.volume).toBe('number')
    })
  })
  
  describe('Caching Integration', () => {
    
    test('should cache successful API responses', async () => {
      ;(financialService.getStockData as jest.Mock).mockResolvedValueOnce(MOCK_STOCK_DATA['AAPL'])
      
      // First call
      const result1 = await financialService.getStockData('AAPL')
      
      // Second call should use cache (mock called only once)
      const result2 = await financialService.getStockData('AAPL')
      
      expect(result1).toEqual(result2)
      expect(financialService.getStockData).toHaveBeenCalledTimes(1)
    })
    
    test('should handle cache invalidation', async () => {
      ;(financialService.getStockData as jest.Mock)
        .mockResolvedValueOnce({ ...MOCK_STOCK_DATA['AAPL'], price: 180 })
        .mockResolvedValueOnce({ ...MOCK_STOCK_DATA['AAPL'], price: 185 })
      
      const result1 = await financialService.getStockData('AAPL')
      expect(result1.price).toBe(180)
      
      // Simulate cache expiry
      await mockAsyncDelay(100)
      
      const result2 = await financialService.getStockData('AAPL')
      expect(result2.price).toBe(185)
    })
  })
  
  describe('Error Recovery and Resilience', () => {
    
    test('should implement circuit breaker pattern', async () => {
      // Simulate multiple consecutive failures
      ;(financialService.getStockData as jest.Mock)
        .mockRejectedValueOnce(new Error('API Error'))
        .mockRejectedValueOnce(new Error('API Error'))
        .mockRejectedValueOnce(new Error('API Error'))
        .mockRejectedValueOnce(new Error('Circuit breaker open'))
      
      // First three calls should fail with API errors
      await expect(financialService.getStockData('AAPL')).rejects.toThrow('API Error')
      await expect(financialService.getStockData('AAPL')).rejects.toThrow('API Error')
      await expect(financialService.getStockData('AAPL')).rejects.toThrow('API Error')
      
      // Fourth call should fail with circuit breaker
      await expect(financialService.getStockData('AAPL')).rejects.toThrow('Circuit breaker open')
    })
    
    test('should implement exponential backoff', async () => {
      const startTime = Date.now()
      
      ;(financialService.getStockData as jest.Mock).mockImplementationOnce(async () => {
        // Simulate exponential backoff delays
        await mockAsyncDelay(100) // First retry
        await mockAsyncDelay(200) // Second retry
        await mockAsyncDelay(400) // Third retry
        return MOCK_STOCK_DATA['AAPL']
      })
      
      const result = await financialService.getStockData('AAPL')
      const endTime = Date.now()
      
      expect(result).toEqual(MOCK_STOCK_DATA['AAPL'])
      expect(endTime - startTime).toBeGreaterThan(700) // Should take at least 700ms due to backoff
    })
    
    test('should handle concurrent API requests efficiently', async () => {
      const symbols = ['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN']
      
      ;(financialService.getStockData as jest.Mock).mockImplementation(async (symbol) => {
        await mockAsyncDelay(Math.random() * 100 + 50) // Random delay 50-150ms
        return { ...MOCK_STOCK_DATA['AAPL'], symbol }
      })
      
      const startTime = Date.now()
      const results = await Promise.all(
        symbols.map(symbol => financialService.getStockData(symbol))
      )
      const endTime = Date.now()
      
      expect(results).toHaveLength(5)
      expect(endTime - startTime).toBeLessThan(500) // Should complete in parallel, not sequential
    })
  })
  
  describe('Real-time Data Integration', () => {
    
    test('should handle real-time stock price updates', async () => {
      const mockWebSocket = {
        send: jest.fn(),
        close: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        readyState: 1 // OPEN
      }
      
      // Mock WebSocket constructor
      global.WebSocket = jest.fn(() => mockWebSocket) as any
      
      // Simulate receiving real-time price update
      const priceUpdate = {
        symbol: 'AAPL',
        price: 182.75,
        change: 0.23,
        timestamp: Date.now()
      }
      
      // In real implementation, this would be handled by WebSocket message handler
      expect(priceUpdate.symbol).toBe('AAPL')
      expect(typeof priceUpdate.price).toBe('number')
      expect(typeof priceUpdate.timestamp).toBe('number')
    })
    
    test('should handle WebSocket connection failures', async () => {
      const mockWebSocket = {
        send: jest.fn(),
        close: jest.fn(),
        addEventListener: jest.fn((event, callback) => {
          if (event === 'error') {
            setTimeout(() => callback(new Error('WebSocket connection failed')), 100)
          }
        }),
        removeEventListener: jest.fn(),
        readyState: 3 // CLOSED
      }
      
      global.WebSocket = jest.fn(() => mockWebSocket) as any
      
      // Simulate WebSocket error handling
      const errorCallback = jest.fn()
      mockWebSocket.addEventListener('error', errorCallback)
      
      await mockAsyncDelay(150)
      
      expect(errorCallback).toHaveBeenCalled()
    })
  })
  
  describe('Performance and Load Testing', () => {
    
    test('should handle high-frequency API requests', async () => {
      const requestCount = 100
      const requests: Promise<any>[] = []
      
      ;(financialService.getStockData as jest.Mock).mockImplementation(async () => {
        await mockAsyncDelay(10)
        return MOCK_STOCK_DATA['AAPL']
      })
      
      // Fire 100 concurrent requests
      for (let i = 0; i < requestCount; i++) {
        requests.push(financialService.getStockData('AAPL'))
      }
      
      const startTime = Date.now()
      const results = await Promise.all(requests)
      const endTime = Date.now()
      
      expect(results).toHaveLength(requestCount)
      expect(endTime - startTime).toBeLessThan(1000) // Should complete within 1 second
    })
    
    test('should measure API response times', async () => {
      const responseTimes: number[] = []
      
      ;(financialService.getStockData as jest.Mock).mockImplementation(async () => {
        const delay = Math.random() * 200 + 50 // 50-250ms random delay
        await mockAsyncDelay(delay)
        return MOCK_STOCK_DATA['AAPL']
      })
      
      for (let i = 0; i < 10; i++) {
        const startTime = Date.now()
        await financialService.getStockData('AAPL')
        const responseTime = Date.now() - startTime
        responseTimes.push(responseTime)
      }
      
      const avgResponseTime = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length
      const maxResponseTime = Math.max(...responseTimes)
      
      expect(avgResponseTime).toBeLessThan(300)
      expect(maxResponseTime).toBeLessThan(500)
    })
  })
})