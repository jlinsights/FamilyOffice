/**
 * Cypress E2E support file
 * Custom commands and utilities for financial application testing
 */

import './commands'
import 'cypress-real-events/support'

// Global test setup
beforeEach(() => {
  // Set up viewport for consistent testing
  cy.viewport(1280, 720)
  
  // Clear local storage and cookies
  cy.clearLocalStorage()
  cy.clearCookies()
  
  // Set up common request interceptions
  cy.intercept('GET', '/api/financial/stocks/**', { fixture: 'stock-data.json' }).as('getStockData')
  cy.intercept('GET', '/api/financial/forex/**', { fixture: 'forex-data.json' }).as('getForexData')
  cy.intercept('GET', '/api/portfolio/**', { fixture: 'portfolio-data.json' }).as('getPortfolioData')
  cy.intercept('POST', '/api/transactions', { fixture: 'transaction-response.json' }).as('createTransaction')
  
  // Mock authentication state
  cy.window().then((win) => {
    win.localStorage.setItem('test-mode', 'true')
  })
})

afterEach(() => {
  // Clean up after each test
  cy.task('cleanupTestData', 'test-user-id')
  
  // Take screenshot on failure
  if (Cypress.currentTest && Cypress.currentTest.state === 'failed') {
    const testName = Cypress.currentTest.title?.replace(/\s+/g, '-').toLowerCase()
    cy.screenshot(`failed-${testName}`)
  }
})

// Global error handling
Cypress.on('uncaught:exception', (err, runnable) => {
  // Don't fail tests on certain known errors
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false
  }
  if (err.message.includes('Non-Error promise rejection captured')) {
    return false
  }
  
  // Log error for debugging
  console.error('Uncaught exception:', err)
  return true
})

// Custom assertions for financial data
chai.use((chai, utils) => {
  chai.Assertion.addMethod('financialValue', function (expected: number, tolerance: number = 0.01) {
    const actual = this._obj
    const difference = Math.abs(actual - expected)
    const percentDifference = (difference / expected) * 100
    
    this.assert(
      percentDifference <= tolerance,
      `expected #{this} to be within ${tolerance}% of #{exp}, but difference was ${percentDifference.toFixed(4)}%`,
      `expected #{this} not to be within ${tolerance}% of #{exp}`,
      expected,
      actual
    )
  })
  
  chai.Assertion.addMethod('validCurrency', function (currency: string) {
    const actual = this._obj
    const validFormats = {
      'KRW': /^₩[\d,]+$/,
      'USD': /^\$[\d,]+\.?\d{0,2}$/,
      'EUR': /^€[\d,]+\.?\d{0,2}$/
    }
    
    const format = validFormats[currency as keyof typeof validFormats]
    
    this.assert(
      format && format.test(actual),
      `expected #{this} to be a valid ${currency} currency format`,
      `expected #{this} not to be a valid ${currency} currency format`,
      format?.toString(),
      actual
    )
  })
})

// Performance monitoring
let performanceMetrics: { [key: string]: number[] } = {}

Cypress.Commands.add('startPerformanceMonitoring', (metricName: string) => {
  if (!performanceMetrics[metricName]) {
    performanceMetrics[metricName] = []
  }
  
  cy.window().then((win) => {
    win.performance.mark(`${metricName}-start`)
  })
})

Cypress.Commands.add('endPerformanceMonitoring', (metricName: string, maxDuration?: number) => {
  cy.window().then((win) => {
    win.performance.mark(`${metricName}-end`)
    win.performance.measure(metricName, `${metricName}-start`, `${metricName}-end`)
    
    const measure = win.performance.getEntriesByName(metricName)[0] as PerformanceMeasure
    const duration = measure.duration
    
    performanceMetrics[metricName].push(duration)
    
    if (maxDuration && duration > maxDuration) {
      throw new Error(`Performance metric '${metricName}' took ${duration}ms, exceeding limit of ${maxDuration}ms`)
    }
    
    cy.log(`Performance: ${metricName} took ${duration.toFixed(2)}ms`)
  })
})

// Accessibility testing
Cypress.Commands.add('checkA11y', (selector?: string, options?: any) => {
  cy.injectAxe()
  cy.checkA11y(selector, options, (violations) => {
    if (violations.length > 0) {
      cy.task('log', `Accessibility violations found: ${violations.length}`)
      violations.forEach((violation) => {
        cy.task('log', `${violation.id}: ${violation.description}`)
      })
    }
  })
})

// Financial data validation
Cypress.Commands.add('validatePortfolioData', (expectedStructure: any) => {
  cy.get('[data-cy=portfolio-summary]').should('be.visible')
  cy.get('[data-cy=total-value]').should('contain.text', expectedStructure.totalValue || /\$[\d,]+/)
  cy.get('[data-cy=day-change]').should('contain.text', /[+-]?\$[\d,]+/)
  cy.get('[data-cy=positions-count]').should('contain.text', expectedStructure.positionsCount || /\d+/)
})

Cypress.Commands.add('validateTransactionHistory', (minTransactions: number = 1) => {
  cy.get('[data-cy=transaction-history]').should('be.visible')
  cy.get('[data-cy=transaction-row]').should('have.length.at.least', minTransactions)
  
  cy.get('[data-cy=transaction-row]').each(($row) => {
    cy.wrap($row).within(() => {
      cy.get('[data-cy=transaction-date]').should('not.be.empty')
      cy.get('[data-cy=transaction-type]').should('not.be.empty')
      cy.get('[data-cy=transaction-symbol]').should('not.be.empty')
      cy.get('[data-cy=transaction-amount]').should('not.be.empty')
    })
  })
})

// Export types for TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      startPerformanceMonitoring(metricName: string): Chainable<void>
      endPerformanceMonitoring(metricName: string, maxDuration?: number): Chainable<void>
      checkA11y(selector?: string, options?: any): Chainable<void>
      validatePortfolioData(expectedStructure: any): Chainable<void>
      validateTransactionHistory(minTransactions?: number): Chainable<void>
    }
    
    interface Assertion {
      financialValue(expected: number, tolerance?: number): void
      validCurrency(currency: string): void
    }
  }
}