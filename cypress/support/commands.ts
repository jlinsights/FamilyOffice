/**
 * Custom Cypress commands for financial application testing
 */

// Authentication commands
Cypress.Commands.add('login', (email?: string, password?: string) => {
  const testEmail = email || Cypress.env('TEST_USER_EMAIL');
  const testPassword = password || Cypress.env('TEST_USER_PASSWORD');

  cy.visit('/login');
  cy.get('[data-cy=email-input]').type(testEmail);
  cy.get('[data-cy=password-input]').type(testPassword);
  cy.get('[data-cy=login-button]').click();

  // Wait for successful login
  cy.url().should('not.include', '/login');
  cy.getCookie('auth-token').should('exist');
});

Cypress.Commands.add('loginAsAdmin', () => {
  const adminEmail = Cypress.env('TEST_ADMIN_EMAIL');
  const adminPassword = Cypress.env('TEST_ADMIN_PASSWORD');

  cy.login(adminEmail, adminPassword);
  cy.url().should('include', '/admin');
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-cy=user-menu]').click();
  cy.get('[data-cy=logout-button]').click();
  cy.url().should('include', '/login');
  cy.getCookie('auth-token').should('not.exist');
});

// Navigation commands
Cypress.Commands.add('navigateToPortfolio', () => {
  cy.get('[data-cy=navigation-menu]').within(() => {
    cy.get('[data-cy=portfolio-link]').click();
  });
  cy.url().should('include', '/portfolio');
  cy.get('[data-cy=portfolio-page]').should('be.visible');
});

Cypress.Commands.add('navigateToTransactions', () => {
  cy.get('[data-cy=navigation-menu]').within(() => {
    cy.get('[data-cy=transactions-link]').click();
  });
  cy.url().should('include', '/transactions');
  cy.get('[data-cy=transactions-page]').should('be.visible');
});

Cypress.Commands.add('navigateToReports', () => {
  cy.get('[data-cy=navigation-menu]').within(() => {
    cy.get('[data-cy=reports-link]').click();
  });
  cy.url().should('include', '/reports');
  cy.get('[data-cy=reports-page]').should('be.visible');
});

// Portfolio management commands
Cypress.Commands.add(
  'createPortfolio',
  (portfolioData: {
    name: string;
    description?: string;
    initialCash?: number;
  }) => {
    cy.get('[data-cy=create-portfolio-button]').click();
    cy.get('[data-cy=portfolio-modal]').should('be.visible');

    cy.get('[data-cy=portfolio-name-input]').type(portfolioData.name);

    if (portfolioData.description) {
      cy.get('[data-cy=portfolio-description-input]').type(
        portfolioData.description
      );
    }

    if (portfolioData.initialCash) {
      cy.get('[data-cy=initial-cash-input]')
        .clear()
        .type(portfolioData.initialCash.toString());
    }

    cy.get('[data-cy=create-portfolio-submit]').click();
    cy.get('[data-cy=portfolio-modal]').should('not.exist');

    // Verify portfolio was created
    cy.get('[data-cy=portfolio-list]').should(
      'contain.text',
      portfolioData.name
    );
  }
);

Cypress.Commands.add(
  'addPosition',
  (positionData: { symbol: string; shares: number; price: number }) => {
    cy.get('[data-cy=add-position-button]').click();
    cy.get('[data-cy=position-modal]').should('be.visible');

    // Search and select symbol
    cy.get('[data-cy=symbol-search-input]').type(positionData.symbol);
    cy.get('[data-cy=symbol-search-results]').should('be.visible');
    cy.get(`[data-cy=symbol-option-${positionData.symbol}]`).click();

    // Enter transaction details
    cy.get('[data-cy=shares-input]').type(positionData.shares.toString());
    cy.get('[data-cy=price-input]').type(positionData.price.toString());

    // Submit
    cy.get('[data-cy=add-position-submit]').click();
    cy.get('[data-cy=position-modal]').should('not.exist');

    // Verify position was added
    cy.get('[data-cy=positions-table]').should(
      'contain.text',
      positionData.symbol
    );
  }
);

// Transaction commands
Cypress.Commands.add(
  'executeTransaction',
  (transactionData: {
    type: 'BUY' | 'SELL';
    symbol: string;
    shares: number;
    price?: number;
    orderType?: 'MARKET' | 'LIMIT';
  }) => {
    cy.get('[data-cy=new-transaction-button]').click();
    cy.get('[data-cy=transaction-modal]').should('be.visible');

    // Select transaction type
    cy.get(
      `[data-cy=transaction-type-${transactionData.type.toLowerCase()}]`
    ).click();

    // Search and select symbol
    cy.get('[data-cy=symbol-search-input]').type(transactionData.symbol);
    cy.get(`[data-cy=symbol-option-${transactionData.symbol}]`).click();

    // Enter shares
    cy.get('[data-cy=shares-input]').type(transactionData.shares.toString());

    // Select order type and enter price if LIMIT order
    if (transactionData.orderType === 'LIMIT' && transactionData.price) {
      cy.get('[data-cy=order-type-limit]').click();
      cy.get('[data-cy=limit-price-input]').type(
        transactionData.price.toString()
      );
    } else {
      cy.get('[data-cy=order-type-market]').click();
    }

    // Submit transaction
    cy.get('[data-cy=submit-transaction]').click();
    cy.get('[data-cy=transaction-confirmation]').should('be.visible');
    cy.get('[data-cy=confirm-transaction]').click();

    cy.get('[data-cy=transaction-modal]').should('not.exist');

    // Wait for transaction to be processed
    cy.get('[data-cy=transaction-status]').should('contain.text', 'Completed');
  }
);

// Report generation commands
Cypress.Commands.add(
  'generatePerformanceReport',
  (reportConfig: {
    startDate: string;
    endDate: string;
    portfolios?: string[];
    includeDetails?: boolean;
  }) => {
    cy.get('[data-cy=generate-report-button]').click();
    cy.get('[data-cy=report-config-modal]').should('be.visible');

    // Set date range
    cy.get('[data-cy=start-date-input]').type(reportConfig.startDate);
    cy.get('[data-cy=end-date-input]').type(reportConfig.endDate);

    // Select portfolios if specified
    if (reportConfig.portfolios) {
      reportConfig.portfolios.forEach(portfolio => {
        cy.get(`[data-cy=portfolio-checkbox-${portfolio}]`).check();
      });
    }

    // Toggle detailed view if requested
    if (reportConfig.includeDetails) {
      cy.get('[data-cy=include-details-toggle]').check();
    }

    // Generate report
    cy.get('[data-cy=generate-report-submit]').click();

    // Wait for report generation
    cy.get('[data-cy=report-progress]').should('be.visible');
    cy.get('[data-cy=report-completed]', { timeout: 30000 }).should(
      'be.visible'
    );

    // Verify report content
    cy.get('[data-cy=report-content]').should('be.visible');
    cy.get('[data-cy=report-summary]').should(
      'contain.text',
      'Performance Summary'
    );
  }
);

// Tax calculation commands
Cypress.Commands.add('calculateTaxLiability', (taxYear: number) => {
  cy.get('[data-cy=tax-calculator-button]').click();
  cy.get('[data-cy=tax-calculator-modal]').should('be.visible');

  // Select tax year
  cy.get('[data-cy=tax-year-select]').select(taxYear.toString());

  // Start calculation
  cy.get('[data-cy=calculate-tax-button]').click();

  // Wait for calculation to complete
  cy.get('[data-cy=tax-calculation-progress]').should('be.visible');
  cy.get('[data-cy=tax-calculation-completed]', { timeout: 20000 }).should(
    'be.visible'
  );

  // Verify tax calculation results
  cy.get('[data-cy=tax-summary]').should('be.visible');
  cy.get('[data-cy=capital-gains-tax]').should('contain.text', /\$[\d,]+/);
  cy.get('[data-cy=dividend-tax]').should('contain.text', /\$[\d,]+/);
  cy.get('[data-cy=total-tax-liability]').should('contain.text', /\$[\d,]+/);
});

// Data validation commands
Cypress.Commands.add('waitForDataLoad', (timeout: number = 10000) => {
  cy.get('[data-cy=loading-spinner]', { timeout }).should('not.exist');
  cy.get('[data-cy=data-loaded]', { timeout }).should('be.visible');
});

Cypress.Commands.add(
  'verifyFinancialData',
  (expectedData: {
    totalValue?: string | RegExp;
    dayChange?: string | RegExp;
    positionsCount?: number;
  }) => {
    if (expectedData.totalValue) {
      cy.get('[data-cy=total-portfolio-value]').should(
        'contain.text',
        expectedData.totalValue
      );
    }

    if (expectedData.dayChange) {
      cy.get('[data-cy=daily-change]').should(
        'contain.text',
        expectedData.dayChange
      );
    }

    if (expectedData.positionsCount !== undefined) {
      cy.get('[data-cy=position-row]').should(
        'have.length',
        expectedData.positionsCount
      );
    }
  }
);

// Error handling commands
Cypress.Commands.add('handleApiError', (expectedErrorMessage?: string) => {
  cy.get('[data-cy=error-notification]').should('be.visible');

  if (expectedErrorMessage) {
    cy.get('[data-cy=error-notification]').should(
      'contain.text',
      expectedErrorMessage
    );
  }

  // Dismiss error
  cy.get('[data-cy=dismiss-error]').click();
  cy.get('[data-cy=error-notification]').should('not.exist');
});

// Real-time data commands
Cypress.Commands.add(
  'waitForRealTimeUpdate',
  (symbol: string, timeout: number = 15000) => {
    cy.get(`[data-cy=real-time-price-${symbol}]`, { timeout })
      .should('be.visible')
      .and('not.contain.text', '--');

    // Verify price updates
    cy.get(`[data-cy=price-change-indicator-${symbol}]`).should('be.visible');
  }
);

// Mobile responsive commands
Cypress.Commands.add('testMobileView', () => {
  cy.viewport('iphone-x');
  cy.get('[data-cy=mobile-menu-button]').should('be.visible');
  cy.get('[data-cy=desktop-navigation]').should('not.be.visible');
});

// TypeScript declarations
declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<void>;
      loginAsAdmin(): Chainable<void>;
      logout(): Chainable<void>;
      navigateToPortfolio(): Chainable<void>;
      navigateToTransactions(): Chainable<void>;
      navigateToReports(): Chainable<void>;
      createPortfolio(portfolioData: {
        name: string;
        description?: string;
        initialCash?: number;
      }): Chainable<void>;
      addPosition(positionData: {
        symbol: string;
        shares: number;
        price: number;
      }): Chainable<void>;
      executeTransaction(transactionData: {
        type: 'BUY' | 'SELL';
        symbol: string;
        shares: number;
        price?: number;
        orderType?: 'MARKET' | 'LIMIT';
      }): Chainable<void>;
      generatePerformanceReport(reportConfig: {
        startDate: string;
        endDate: string;
        portfolios?: string[];
        includeDetails?: boolean;
      }): Chainable<void>;
      calculateTaxLiability(taxYear: number): Chainable<void>;
      waitForDataLoad(timeout?: number): Chainable<void>;
      verifyFinancialData(expectedData: {
        totalValue?: string | RegExp;
        dayChange?: string | RegExp;
        positionsCount?: number;
      }): Chainable<void>;
      handleApiError(expectedErrorMessage?: string): Chainable<void>;
      waitForRealTimeUpdate(symbol: string, timeout?: number): Chainable<void>;
      testMobileView(): Chainable<void>;
    }
  }
}
