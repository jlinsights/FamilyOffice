/**
 * End-to-end tests for portfolio management workflows
 * Tests complete user journey from login to portfolio analysis
 */

describe('Portfolio Management Workflow', () => {
  
  beforeEach(() => {
    cy.login()
  })
  
  describe('Portfolio Creation and Setup', () => {
    
    it('should create a new portfolio with initial positions', () => {
      cy.startPerformanceMonitoring('portfolio-creation')
      
      cy.navigateToPortfolio()
      
      // Create new portfolio
      cy.createPortfolio({
        name: 'Test Investment Portfolio',
        description: 'Portfolio for automated testing',
        initialCash: 1000000
      })
      
      cy.endPerformanceMonitoring('portfolio-creation', 5000)
      
      // Verify portfolio creation
      cy.get('[data-cy=portfolio-summary]').should('be.visible')
      cy.get('[data-cy=portfolio-name]').should('contain.text', 'Test Investment Portfolio')
      cy.get('[data-cy=cash-balance]').should('contain.text', '₩1,000,000')
      
      // Add first position - Samsung Electronics
      cy.addPosition({
        symbol: '005930.KS',
        shares: 100,
        price: 75000
      })
      
      // Add second position - Apple
      cy.addPosition({
        symbol: 'AAPL',
        shares: 50,
        price: 180
      })
      
      // Verify positions were added
      cy.validatePortfolioData({
        totalValue: /₩[\d,]+/,
        positionsCount: 2
      })
      
      cy.get('[data-cy=position-row]').should('have.length', 2)
      cy.get('[data-cy=position-symbol]').should('contain.text', '005930.KS')
      cy.get('[data-cy=position-symbol]').should('contain.text', 'AAPL')
    })
    
    it('should handle portfolio creation with validation errors', () => {
      cy.navigateToPortfolio()
      
      cy.get('[data-cy=create-portfolio-button]').click()
      cy.get('[data-cy=portfolio-modal]').should('be.visible')
      
      // Try to submit without required fields
      cy.get('[data-cy=create-portfolio-submit]').click()
      
      // Should show validation errors
      cy.get('[data-cy=validation-error]').should('be.visible')
      cy.get('[data-cy=validation-error]').should('contain.text', 'Portfolio name is required')
      
      // Fill in name with invalid characters
      cy.get('[data-cy=portfolio-name-input]').type('Test@Portfolio#$%')
      cy.get('[data-cy=create-portfolio-submit]').click()
      
      cy.get('[data-cy=validation-error]').should('contain.text', 'Portfolio name contains invalid characters')
      
      // Fix validation errors
      cy.get('[data-cy=portfolio-name-input]').clear().type('Valid Portfolio Name')
      cy.get('[data-cy=create-portfolio-submit]').click()
      
      cy.get('[data-cy=portfolio-modal]').should('not.exist')
    })
  })
  
  describe('Real-time Data Updates', () => {
    
    beforeEach(() => {
      // Set up portfolio with test data
      cy.task('generatePortfolioData', {
        userId: 'test-user',
        totalValue: 5000000,
        positionCount: 5
      }).then((portfolioData) => {
        cy.window().then((win) => {
          win.localStorage.setItem('test-portfolio-data', JSON.stringify(portfolioData))
        })
      })
      
      cy.navigateToPortfolio()
    })
    
    it('should display real-time price updates', () => {
      cy.startPerformanceMonitoring('real-time-updates')
      
      // Wait for initial data load
      cy.waitForDataLoad()
      
      // Verify real-time price displays
      cy.waitForRealTimeUpdate('005930.KS')
      cy.waitForRealTimeUpdate('AAPL')
      
      // Check that prices are updating
      cy.get('[data-cy=real-time-price-005930.KS]').should('be.visible')
      cy.get('[data-cy=price-change-indicator-005930.KS]').should('be.visible')
      
      // Verify price format
      cy.get('[data-cy=real-time-price-005930.KS]').should('match', /₩[\d,]+/)
      cy.get('[data-cy=real-time-price-AAPL]').should('match', /\$[\d,]+\.?\d{0,2}/)
      
      cy.endPerformanceMonitoring('real-time-updates', 2000)
    })
    
    it('should handle real-time connection failures gracefully', () => {
      // Simulate network disconnection
      cy.window().then((win) => {
        // Mock WebSocket connection failure
        const originalWebSocket = win.WebSocket
        win.WebSocket = function() {
          throw new Error('WebSocket connection failed')
        } as any
      })
      
      cy.navigateToPortfolio()
      
      // Should show connection error but not crash
      cy.get('[data-cy=connection-status]').should('contain.text', 'Offline')
      cy.get('[data-cy=retry-connection-button]').should('be.visible')
      
      // Should fallback to cached data
      cy.get('[data-cy=last-updated]').should('contain.text', 'Last updated:')
      cy.get('[data-cy=portfolio-summary]').should('be.visible')
    })
  })
  
  describe('Portfolio Performance Analysis', () => {
    
    it('should display comprehensive performance metrics', () => {
      cy.navigateToPortfolio()
      cy.waitForDataLoad()
      
      // Check performance summary section
      cy.get('[data-cy=performance-summary]').should('be.visible')
      
      // Verify key metrics are displayed
      cy.get('[data-cy=total-return]').should('be.visible').and('contain.text', /[+-]?\$[\d,]+/)
      cy.get('[data-cy=total-return-percent]').should('be.visible').and('contain.text', /[+-]?[\d.]+%/)
      cy.get('[data-cy=day-change]').should('be.visible').and('contain.text', /[+-]?\$[\d,]+/)
      cy.get('[data-cy=day-change-percent]').should('be.visible').and('contain.text', /[+-]?[\d.]+%/)
      
      // Check advanced metrics
      cy.get('[data-cy=show-advanced-metrics]').click()
      cy.get('[data-cy=sharpe-ratio]').should('be.visible')
      cy.get('[data-cy=volatility]').should('be.visible')
      cy.get('[data-cy=max-drawdown]').should('be.visible')
      cy.get('[data-cy=beta]').should('be.visible')
      
      // Verify metric formats
      cy.get('[data-cy=sharpe-ratio]').should('match', /\d+\.\d{2}/)
      cy.get('[data-cy=volatility]').should('match', /\d+\.\d{2}%/)
    })
    
    it('should display interactive performance charts', () => {
      cy.navigateToPortfolio()
      cy.waitForDataLoad()
      
      // Check chart container
      cy.get('[data-cy=performance-chart]').should('be.visible')
      
      // Test time range selectors
      cy.get('[data-cy=chart-timeframe-1M]').click()
      cy.get('[data-cy=performance-chart]').should('be.visible')
      cy.wait('@getPortfolioData')
      
      cy.get('[data-cy=chart-timeframe-3M]').click()
      cy.get('[data-cy=performance-chart]').should('be.visible')
      
      cy.get('[data-cy=chart-timeframe-1Y]').click()
      cy.get('[data-cy=performance-chart]').should('be.visible')
      
      // Test chart interactions
      cy.get('[data-cy=performance-chart] canvas').trigger('mouseover')
      cy.get('[data-cy=chart-tooltip]').should('be.visible')
      
      // Test chart type switching
      cy.get('[data-cy=chart-type-line]').click()
      cy.get('[data-cy=chart-type-candlestick]').click()
      cy.get('[data-cy=chart-type-area]').click()
    })
  })
  
  describe('Portfolio Allocation Management', () => {
    
    it('should display current allocation and suggest rebalancing', () => {
      cy.navigateToPortfolio()
      cy.waitForDataLoad()
      
      // Check allocation pie chart
      cy.get('[data-cy=allocation-chart]').should('be.visible')
      cy.get('[data-cy=allocation-legend]').should('be.visible')
      
      // Verify allocation percentages add up to 100%
      cy.get('[data-cy=allocation-percentage]').then(($percentages) => {
        const total = Array.from($percentages).reduce((sum, el) => {
          const value = parseFloat(el.textContent?.replace('%', '') || '0')
          return sum + value
        }, 0)
        expect(total).to.be.closeTo(100, 1) // Allow 1% tolerance for rounding
      })
      
      // Test rebalancing suggestions
      cy.get('[data-cy=rebalancing-tab]').click()
      cy.get('[data-cy=rebalancing-suggestions]').should('be.visible')
      
      // Should show positions that need rebalancing
      cy.get('[data-cy=rebalancing-action]').should('have.length.at.least', 1)
      
      cy.get('[data-cy=rebalancing-action]').first().within(() => {
        cy.get('[data-cy=current-weight]').should('contain.text', /%/)
        cy.get('[data-cy=target-weight]').should('contain.text', /%/)
        cy.get('[data-cy=recommended-action]').should('contain.text', /BUY|SELL|HOLD/)
      })
    })
    
    it('should execute rebalancing transactions', () => {
      cy.navigateToPortfolio()
      cy.waitForDataLoad()
      
      cy.get('[data-cy=rebalancing-tab]').click()
      
      // Select positions to rebalance
      cy.get('[data-cy=rebalancing-action]').first().within(() => {
        cy.get('[data-cy=select-rebalancing]').check()
      })
      
      // Execute rebalancing
      cy.get('[data-cy=execute-rebalancing]').click()
      cy.get('[data-cy=rebalancing-confirmation]').should('be.visible')
      
      // Review rebalancing transactions
      cy.get('[data-cy=rebalancing-transactions]').should('be.visible')
      cy.get('[data-cy=total-rebalancing-cost]').should('contain.text', /\$[\d,]+/)
      
      // Confirm rebalancing
      cy.get('[data-cy=confirm-rebalancing]').click()
      
      // Wait for transactions to complete
      cy.get('[data-cy=rebalancing-progress]').should('be.visible')
      cy.get('[data-cy=rebalancing-completed]', { timeout: 30000 }).should('be.visible')
      
      // Verify allocation has been updated
      cy.get('[data-cy=allocation-updated-notification]').should('be.visible')
    })
  })
  
  describe('Performance Benchmarking', () => {
    
    it('should compare portfolio performance against benchmarks', () => {
      cy.navigateToPortfolio()
      cy.waitForDataLoad()
      
      cy.get('[data-cy=benchmark-comparison-tab]').click()
      
      // Select benchmark indices
      cy.get('[data-cy=benchmark-selector]').click()
      cy.get('[data-cy=benchmark-option-KOSPI]').click()
      cy.get('[data-cy=benchmark-option-SP500]').click()
      
      // Display comparison chart
      cy.get('[data-cy=benchmark-chart]').should('be.visible')
      
      // Verify performance comparison metrics
      cy.get('[data-cy=relative-performance]').should('be.visible')
      cy.get('[data-cy=alpha]').should('contain.text', /[+-]?\d+\.\d{2}/)
      cy.get('[data-cy=beta]').should('contain.text', /\d+\.\d{2}/)
      cy.get('[data-cy=correlation]').should('contain.text', /\d+\.\d{2}/)
      
      // Test time period adjustments
      cy.get('[data-cy=comparison-period-1Y]').click()
      cy.get('[data-cy=benchmark-chart]').should('be.visible')
      
      cy.get('[data-cy=comparison-period-3Y]').click()
      cy.get('[data-cy=benchmark-chart]').should('be.visible')
    })
  })
  
  describe('Risk Analysis', () => {
    
    it('should display comprehensive risk metrics', () => {
      cy.navigateToPortfolio()
      cy.waitForDataLoad()
      
      cy.get('[data-cy=risk-analysis-tab]').click()
      
      // Check risk summary
      cy.get('[data-cy=risk-summary]').should('be.visible')
      cy.get('[data-cy=risk-score]').should('be.visible').and('contain.text', /\d+/)
      cy.get('[data-cy=risk-level]').should('contain.text', /Conservative|Moderate|Aggressive/)
      
      // Verify risk metrics
      cy.get('[data-cy=portfolio-volatility]').should('contain.text', /\d+\.\d{2}%/)
      cy.get('[data-cy=value-at-risk]').should('contain.text', /\$[\d,]+/)
      cy.get('[data-cy=max-drawdown]').should('contain.text', /\d+\.\d{2}%/)
      
      // Check sector concentration risk
      cy.get('[data-cy=sector-concentration]').should('be.visible')
      cy.get('[data-cy=concentration-warning]').should('exist')
      
      // Check currency exposure
      cy.get('[data-cy=currency-exposure]').should('be.visible')
      cy.get('[data-cy=currency-breakdown]').within(() => {
        cy.get('[data-cy=currency-KRW]').should('be.visible')
        cy.get('[data-cy=currency-USD]').should('be.visible')
      })
    })
    
    it('should provide risk management recommendations', () => {
      cy.navigateToPortfolio()
      cy.waitForDataLoad()
      
      cy.get('[data-cy=risk-analysis-tab]').click()
      
      // Check risk recommendations
      cy.get('[data-cy=risk-recommendations]').should('be.visible')
      cy.get('[data-cy=recommendation-item]').should('have.length.at.least', 1)
      
      cy.get('[data-cy=recommendation-item]').first().within(() => {
        cy.get('[data-cy=recommendation-type]').should('contain.text', /Diversification|Rebalancing|Hedging/)
        cy.get('[data-cy=recommendation-priority]').should('contain.text', /High|Medium|Low/)
        cy.get('[data-cy=recommendation-impact]').should('be.visible')
      })
      
      // Test implementing a recommendation
      cy.get('[data-cy=implement-recommendation]').first().click()
      cy.get('[data-cy=recommendation-implementation]').should('be.visible')
    })
  })
  
  describe('Mobile Responsiveness', () => {
    
    it('should work correctly on mobile devices', () => {
      cy.testMobileView()
      
      cy.navigateToPortfolio()
      cy.waitForDataLoad()
      
      // Check mobile-specific layout
      cy.get('[data-cy=mobile-portfolio-header]').should('be.visible')
      cy.get('[data-cy=mobile-summary-cards]').should('be.visible')
      
      // Test mobile navigation
      cy.get('[data-cy=mobile-menu-button]').click()
      cy.get('[data-cy=mobile-menu]').should('be.visible')
      
      // Test mobile chart interactions
      cy.get('[data-cy=mobile-chart-container]').should('be.visible')
      cy.get('[data-cy=mobile-chart]').trigger('touchstart')
      
      // Test mobile table scrolling
      cy.get('[data-cy=mobile-positions-table]').scrollTo('right')
      cy.get('[data-cy=mobile-positions-table]').scrollTo('left')
    })
  })
  
  describe('Accessibility', () => {
    
    it('should meet accessibility standards', () => {
      cy.navigateToPortfolio()
      cy.waitForDataLoad()
      
      // Check keyboard navigation
      cy.get('body').tab()
      cy.focused().should('have.attr', 'data-cy')
      
      // Continue tabbing through interactive elements
      for (let i = 0; i < 10; i++) {
        cy.focused().tab()
        cy.focused().should('be.visible')
      }
      
      // Test screen reader support
      cy.checkA11y('[data-cy=portfolio-page]', {
        rules: {
          'color-contrast': { enabled: true },
          'aria-labels': { enabled: true },
          'keyboard-navigation': { enabled: true }
        }
      })
      
      // Test focus management
      cy.get('[data-cy=portfolio-tabs]').within(() => {
        cy.get('[role=tab]').first().focus()
        cy.focused().type('{rightarrow}')
        cy.focused().should('have.attr', 'aria-selected', 'true')
      })
    })
  })
})