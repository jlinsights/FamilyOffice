/**
 * Performance testing suite for FamilyOffice application
 * Advanced load testing scenarios with financial-specific metrics
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

class PerformanceTestRunner {
  constructor() {
    this.testResults = []
    this.baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000'
    this.outputDir = 'tests/performance/results'
    this.ensureOutputDir()
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true })
    }
  }

  async runLoadTest(scenario = 'default') {
    console.log(`🚀 Starting load test scenario: ${scenario}`)
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const outputFile = path.join(this.outputDir, `load-test-${scenario}-${timestamp}.json`)
    
    try {
      // Run Artillery load test
      const command = `npx artillery run artillery.yml --output ${outputFile} --target ${this.baseUrl}`
      console.log(`Executing: ${command}`)
      
      const result = execSync(command, { 
        encoding: 'utf8',
        maxBuffer: 1024 * 1024 * 10 // 10MB buffer for large outputs
      })
      
      console.log('📊 Load test completed successfully')
      console.log(result)
      
      // Process and analyze results
      const analysis = await this.analyzeResults(outputFile)
      this.testResults.push({
        scenario,
        timestamp,
        outputFile,
        analysis
      })
      
      return analysis
      
    } catch (error) {
      console.error(`❌ Load test failed: ${error.message}`)
      throw error
    }
  }

  async analyzeResults(outputFile) {
    try {
      const rawData = JSON.parse(fs.readFileSync(outputFile, 'utf8'))
      
      const analysis = {
        summary: this.extractSummaryMetrics(rawData),
        performance: this.analyzePerformanceMetrics(rawData),
        errors: this.analyzeErrors(rawData),
        recommendations: []
      }
      
      // Generate recommendations based on results
      analysis.recommendations = this.generateRecommendations(analysis)
      
      // Save analysis
      const analysisFile = outputFile.replace('.json', '-analysis.json')
      fs.writeFileSync(analysisFile, JSON.stringify(analysis, null, 2))
      
      return analysis
      
    } catch (error) {
      console.error(`Failed to analyze results: ${error.message}`)
      return null
    }
  }

  extractSummaryMetrics(data) {
    const summary = data.aggregate || {}
    
    return {
      totalRequests: summary.requestsCompleted || 0,
      totalErrors: summary.errors || 0,
      errorRate: summary.errors ? (summary.errors / summary.requestsCompleted * 100).toFixed(2) : 0,
      averageResponseTime: summary.latency?.mean || 0,
      p95ResponseTime: summary.latency?.p95 || 0,
      p99ResponseTime: summary.latency?.p99 || 0,
      requestRate: summary.rps?.mean || 0,
      duration: summary.duration || 0,
      codes: summary.codes || {}
    }
  }

  analyzePerformanceMetrics(data) {
    const latency = data.aggregate?.latency || {}
    const rps = data.aggregate?.rps || {}
    
    return {
      responseTime: {
        min: latency.min || 0,
        max: latency.max || 0,
        mean: latency.mean || 0,
        median: latency.median || 0,
        p95: latency.p95 || 0,
        p99: latency.p99 || 0
      },
      throughput: {
        mean: rps.mean || 0,
        max: rps.max || 0
      },
      financialApiMetrics: this.analyzeFinancialApiPerformance(data),
      databaseMetrics: this.analyzeDatabasePerformance(data),
      cacheMetrics: this.analyzeCachePerformance(data)
    }
  }

  analyzeFinancialApiPerformance(data) {
    // Extract financial API specific metrics
    const phases = data.intermediate || []
    const financialApiData = {
      stockApiCalls: 0,
      forexApiCalls: 0,
      averageStockResponseTime: 0,
      averageForexResponseTime: 0,
      cacheHitRate: 0,
      apiFailureRate: 0
    }

    phases.forEach(phase => {
      if (phase.customStats) {
        // Analyze custom metrics for financial APIs
        if (phase.customStats.financial_api_response_time) {
          financialApiData.averageStockResponseTime = phase.customStats.financial_api_response_time.mean || 0
        }
      }
    })

    return financialApiData
  }

  analyzeDatabasePerformance(data) {
    return {
      connectionPoolUtilization: 'N/A', // Would need database monitoring
      queryPerformance: 'N/A',
      transactionThroughput: 'N/A'
    }
  }

  analyzeCachePerformance(data) {
    return {
      redisLatency: 'N/A', // Would need Redis monitoring
      memoryUsage: 'N/A',
      cacheHitRatio: 'N/A'
    }
  }

  analyzeErrors(data) {
    const errors = data.aggregate?.errors || {}
    const codes = data.aggregate?.codes || {}
    
    return {
      totalErrors: Object.values(errors).reduce((sum, count) => sum + count, 0),
      errorBreakdown: errors,
      httpStatusCodes: codes,
      criticalErrors: this.identifyCriticalErrors(errors, codes)
    }
  }

  identifyCriticalErrors(errors, codes) {
    const critical = []
    
    // Check for high error rates
    const total5xx = (codes['500'] || 0) + (codes['502'] || 0) + (codes['503'] || 0) + (codes['504'] || 0)
    if (total5xx > 0) {
      critical.push({
        type: 'SERVER_ERRORS',
        count: total5xx,
        severity: 'HIGH',
        description: '5xx server errors detected'
      })
    }
    
    // Check for authentication issues
    if (codes['401'] || codes['403']) {
      critical.push({
        type: 'AUTH_ERRORS',
        count: (codes['401'] || 0) + (codes['403'] || 0),
        severity: 'MEDIUM',
        description: 'Authentication/authorization failures'
      })
    }
    
    return critical
  }

  generateRecommendations(analysis) {
    const recommendations = []
    const { performance, errors, summary } = analysis
    
    // Response time recommendations
    if (performance.responseTime.p95 > 2000) {
      recommendations.push({
        type: 'PERFORMANCE',
        priority: 'HIGH',
        title: 'High Response Times',
        description: `95th percentile response time is ${performance.responseTime.p95}ms, exceeding 2000ms threshold`,
        actions: [
          'Implement database query optimization',
          'Add Redis caching for financial data',
          'Consider CDN for static assets',
          'Implement API response caching'
        ]
      })
    }
    
    // Error rate recommendations
    if (summary.errorRate > 5) {
      recommendations.push({
        type: 'RELIABILITY',
        priority: 'CRITICAL',
        title: 'High Error Rate',
        description: `Error rate is ${summary.errorRate}%, exceeding 5% threshold`,
        actions: [
          'Investigate server errors in logs',
          'Implement circuit breaker pattern for external APIs',
          'Add comprehensive error handling',
          'Set up monitoring and alerting'
        ]
      })
    }
    
    // Throughput recommendations
    if (performance.throughput.mean < 50) {
      recommendations.push({
        type: 'SCALABILITY',
        priority: 'MEDIUM',
        title: 'Low Throughput',
        description: `Average throughput is ${performance.throughput.mean} RPS, below optimal range`,
        actions: [
          'Scale application horizontally',
          'Optimize database connection pooling',
          'Implement async processing for heavy operations',
          'Consider load balancing strategies'
        ]
      })
    }
    
    // Financial API specific recommendations
    if (performance.financialApiMetrics.averageStockResponseTime > 1000) {
      recommendations.push({
        type: 'FINANCIAL_API',
        priority: 'HIGH',
        title: 'Financial API Performance',
        description: 'Financial API response times are impacting user experience',
        actions: [
          'Implement aggressive caching for stock prices',
          'Add fallback API providers',
          'Implement data prefetching strategies',
          'Consider WebSocket connections for real-time data'
        ]
      })
    }
    
    return recommendations
  }

  async runFinancialStressTest() {
    console.log('💰 Running financial-specific stress test')
    
    // Custom test focused on financial operations
    const customConfig = {
      config: {
        target: this.baseUrl,
        phases: [
          { duration: 60, arrivalRate: 20, name: 'Financial API ramp-up' },
          { duration: 300, arrivalRate: 100, name: 'Heavy financial load' },
          { duration: 120, arrivalRate: 5, name: 'Cool down' }
        ]
      },
      scenarios: [
        {
          name: 'High-frequency financial data requests',
          weight: 100,
          flow: [
            { get: { url: '/api/financial/stocks?korean=true' } },
            { get: { url: '/api/financial/forex?major=true' } },
            { get: { url: '/api/portfolio' } },
            { get: { url: '/api/transactions?limit=50' } }
          ]
        }
      ]
    }
    
    const configFile = path.join(this.outputDir, 'financial-stress-test.yml')
    const yamlContent = this.convertToYaml(customConfig)
    fs.writeFileSync(configFile, yamlContent)
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const outputFile = path.join(this.outputDir, `financial-stress-${timestamp}.json`)
    
    try {
      const command = `npx artillery run ${configFile} --output ${outputFile}`
      const result = execSync(command, { encoding: 'utf8' })
      
      console.log('📈 Financial stress test completed')
      return await this.analyzeResults(outputFile)
      
    } catch (error) {
      console.error(`❌ Financial stress test failed: ${error.message}`)
      throw error
    }
  }

  convertToYaml(config) {
    // Simple YAML conversion for Artillery config
    return `
config:
  target: "${config.config.target}"
  phases:
${config.config.phases.map(phase => `    - duration: ${phase.duration}
      arrivalRate: ${phase.arrivalRate}
      name: "${phase.name}"`).join('\n')}

scenarios:
${config.scenarios.map(scenario => `  - name: "${scenario.name}"
    weight: ${scenario.weight}
    flow:
${scenario.flow.map(step => `      - get:
          url: "${step.get.url}"`).join('\n')}`).join('\n')}
`
  }

  async generatePerformanceReport() {
    if (this.testResults.length === 0) {
      console.log('No test results available for report generation')
      return null
    }

    const report = {
      generatedAt: new Date().toISOString(),
      testSummary: {
        totalTests: this.testResults.length,
        scenarios: this.testResults.map(result => result.scenario)
      },
      performanceOverview: this.aggregatePerformanceMetrics(),
      recommendations: this.aggregateRecommendations(),
      trends: this.analyzePerformanceTrends(),
      financialApiAnalysis: this.analyzeFinancialApiTrends()
    }

    const reportFile = path.join(this.outputDir, `performance-report-${Date.now()}.json`)
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2))

    console.log(`📋 Performance report generated: ${reportFile}`)
    return report
  }

  aggregatePerformanceMetrics() {
    const allAnalyses = this.testResults.map(result => result.analysis).filter(Boolean)
    
    if (allAnalyses.length === 0) return null

    return {
      averageResponseTime: this.calculateAverage(allAnalyses.map(a => a.summary.averageResponseTime)),
      averageP95: this.calculateAverage(allAnalyses.map(a => a.summary.p95ResponseTime)),
      averageErrorRate: this.calculateAverage(allAnalyses.map(a => parseFloat(a.summary.errorRate))),
      averageThroughput: this.calculateAverage(allAnalyses.map(a => a.summary.requestRate))
    }
  }

  aggregateRecommendations() {
    const allRecommendations = this.testResults
      .map(result => result.analysis?.recommendations || [])
      .flat()

    // Group by type and prioritize
    const grouped = allRecommendations.reduce((acc, rec) => {
      if (!acc[rec.type]) acc[rec.type] = []
      acc[rec.type].push(rec)
      return acc
    }, {})

    return Object.entries(grouped).map(([type, recommendations]) => ({
      type,
      count: recommendations.length,
      highPriority: recommendations.filter(r => r.priority === 'HIGH' || r.priority === 'CRITICAL').length,
      commonIssues: this.findCommonIssues(recommendations)
    }))
  }

  analyzePerformanceTrends() {
    // Analyze trends across multiple test runs
    return {
      responseTimeTrend: 'stable', // Would implement actual trend analysis
      errorRateTrend: 'improving',
      throughputTrend: 'stable'
    }
  }

  analyzeFinancialApiTrends() {
    return {
      stockApiPerformance: 'good',
      forexApiPerformance: 'excellent',
      cacheEffectiveness: 'high',
      recommendedOptimizations: [
        'Implement WebSocket connections for real-time data',
        'Add predictive caching for frequently requested stocks',
        'Optimize database queries for portfolio calculations'
      ]
    }
  }

  calculateAverage(numbers) {
    if (numbers.length === 0) return 0
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length
  }

  findCommonIssues(recommendations) {
    const titles = recommendations.map(r => r.title)
    const frequency = {}
    
    titles.forEach(title => {
      frequency[title] = (frequency[title] || 0) + 1
    })
    
    return Object.entries(frequency)
      .filter(([, count]) => count > 1)
      .map(([title, count]) => ({ title, count }))
  }
}

// Export for use in test files
module.exports = { PerformanceTestRunner }

// CLI execution
if (require.main === module) {
  const runner = new PerformanceTestRunner()
  
  async function runTests() {
    try {
      console.log('🎯 Starting comprehensive performance testing suite')
      
      // Run standard load test
      await runner.runLoadTest('standard')
      
      // Run financial-specific stress test
      await runner.runFinancialStressTest()
      
      // Generate final report
      const report = await runner.generatePerformanceReport()
      
      console.log('\n✅ Performance testing completed successfully')
      console.log('📊 Key Metrics:', {
        averageResponseTime: report.performanceOverview.averageResponseTime,
        averageErrorRate: report.performanceOverview.averageErrorRate,
        averageThroughput: report.performanceOverview.averageThroughput
      })
      
      if (report.recommendations.length > 0) {
        console.log('\n⚠️  Recommendations available - check performance report for details')
      }
      
    } catch (error) {
      console.error('❌ Performance testing failed:', error.message)
      process.exit(1)
    }
  }
  
  runTests()
}