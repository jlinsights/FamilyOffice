/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to login with email and password
     */
    login(email?: string, password?: string): Chainable<void>
    
    /**
     * Custom command to login as admin user
     */
    loginAsAdmin(): Chainable<void>
    
    /**
     * Custom command to logout current user
     */
    logout(): Chainable<void>
    
    /**
     * Custom command to start performance monitoring
     */
    startPerformanceMonitoring(testName: string): Chainable<void>
    
    /**
     * Custom command to end performance monitoring
     */
    endPerformanceMonitoring(): Chainable<void>
    
    /**
     * Custom command to check accessibility
     */
    checkA11y(context?: string, options?: any): Chainable<void>
    
    /**
     * Custom command to wait for API response
     */
    waitForApiResponse(alias: string, timeout?: number): Chainable<void>
    
    /**
     * Custom command to mock financial data
     */
    mockFinancialData(type: string, data?: any): Chainable<void>
    
    /**
     * Custom command to validate financial calculations
     */
    validateCalculations(expected: number, actual: string): Chainable<void>
  }
}