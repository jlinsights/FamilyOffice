/**
 * End-to-end tests for transaction workflows
 * Tests complete trading lifecycle and data integrity
 */

describe('Transaction Management Workflow', () => {
  beforeEach(() => {
    cy.login();

    // Set up test portfolio data
    cy.task('generatePortfolioData', {
      userId: 'test-user',
      totalValue: 10000000,
      positionCount: 3,
    }).then(portfolioData => {
      cy.window().then(win => {
        win.localStorage.setItem(
          'test-portfolio-data',
          JSON.stringify(portfolioData)
        );
      });
    });
  });

  describe('Stock Trading Transactions', () => {
    it('should execute a buy order successfully', () => {
      cy.startPerformanceMonitoring('buy-transaction');

      cy.navigateToPortfolio();
      cy.waitForDataLoad();

      // Get initial portfolio value
      cy.get('[data-cy=total-portfolio-value]')
        .invoke('text')
        .as('initialValue');

      // Execute buy transaction
      cy.executeTransaction({
        type: 'BUY',
        symbol: 'AAPL',
        shares: 10,
        price: 185.5,
        orderType: 'LIMIT',
      });

      cy.endPerformanceMonitoring('buy-transaction', 5000);

      // Verify transaction appears in history
      cy.navigateToTransactions();
      cy.validateTransactionHistory(1);

      cy.get('[data-cy=transaction-row]')
        .first()
        .within(() => {
          cy.get('[data-cy=transaction-type]').should('contain.text', 'BUY');
          cy.get('[data-cy=transaction-symbol]').should('contain.text', 'AAPL');
          cy.get('[data-cy=transaction-shares]').should('contain.text', '10');
          cy.get('[data-cy=transaction-price]').should(
            'contain.text',
            '$185.50'
          );
          cy.get('[data-cy=transaction-status]').should(
            'contain.text',
            'Completed'
          );
        });

      // Verify portfolio has been updated
      cy.navigateToPortfolio();
      cy.get('[data-cy=position-AAPL]').should('be.visible');
      cy.get('[data-cy=position-AAPL]').within(() => {
        cy.get('[data-cy=position-shares]').should('contain.text', '10');
      });
    });

    it('should execute a sell order with sufficient shares', () => {
      // First add some shares to sell
      cy.addPosition({
        symbol: 'TSLA',
        shares: 50,
        price: 250,
      });

      cy.startPerformanceMonitoring('sell-transaction');

      // Execute sell transaction
      cy.executeTransaction({
        type: 'SELL',
        symbol: 'TSLA',
        shares: 25,
        orderType: 'MARKET',
      });

      cy.endPerformanceMonitoring('sell-transaction', 5000);

      // Verify transaction
      cy.navigateToTransactions();
      cy.get('[data-cy=transaction-row]')
        .first()
        .within(() => {
          cy.get('[data-cy=transaction-type]').should('contain.text', 'SELL');
          cy.get('[data-cy=transaction-symbol]').should('contain.text', 'TSLA');
          cy.get('[data-cy=transaction-shares]').should('contain.text', '25');
          cy.get('[data-cy=transaction-status]').should(
            'contain.text',
            'Completed'
          );
        });

      // Verify position has been reduced
      cy.navigateToPortfolio();
      cy.get('[data-cy=position-TSLA]').within(() => {
        cy.get('[data-cy=position-shares]').should('contain.text', '25');
      });
    });

    it('should prevent selling more shares than owned', () => {
      cy.addPosition({
        symbol: 'MSFT',
        shares: 10,
        price: 300,
      });

      cy.get('[data-cy=new-transaction-button]').click();
      cy.get('[data-cy=transaction-modal]').should('be.visible');

      // Try to sell more than owned
      cy.get('[data-cy=transaction-type-sell]').click();
      cy.get('[data-cy=symbol-search-input]').type('MSFT');
      cy.get('[data-cy=symbol-option-MSFT]').click();
      cy.get('[data-cy=shares-input]').type('50'); // More than the 10 owned

      cy.get('[data-cy=submit-transaction]').click();

      // Should show validation error
      cy.get('[data-cy=validation-error]').should('be.visible');
      cy.get('[data-cy=validation-error]').should(
        'contain.text',
        'Insufficient shares'
      );

      // Fix the shares amount
      cy.get('[data-cy=shares-input]').clear().type('5');
      cy.get('[data-cy=submit-transaction]').click();

      // Should proceed successfully
      cy.get('[data-cy=transaction-confirmation]').should('be.visible');
    });

    it('should handle limit order price validation', () => {
      cy.get('[data-cy=new-transaction-button]').click();
      cy.get('[data-cy=transaction-modal]').should('be.visible');

      cy.get('[data-cy=transaction-type-buy]').click();
      cy.get('[data-cy=symbol-search-input]').type('AAPL');
      cy.get('[data-cy=symbol-option-AAPL]').click();
      cy.get('[data-cy=shares-input]').type('10');

      // Select limit order
      cy.get('[data-cy=order-type-limit]').click();

      // Try invalid price
      cy.get('[data-cy=limit-price-input]').type('0');
      cy.get('[data-cy=submit-transaction]').click();

      cy.get('[data-cy=validation-error]').should(
        'contain.text',
        'Price must be greater than 0'
      );

      // Try extremely high price
      cy.get('[data-cy=limit-price-input]').clear().type('999999');
      cy.get('[data-cy=submit-transaction]').click();

      cy.get('[data-cy=price-warning]').should('be.visible');
      cy.get('[data-cy=price-warning]').should(
        'contain.text',
        'Price is significantly above market'
      );

      // Set reasonable price
      cy.get('[data-cy=limit-price-input]').clear().type('185');
      cy.get('[data-cy=submit-transaction]').click();

      cy.get('[data-cy=transaction-confirmation]').should('be.visible');
    });
  });

  describe('Korean Stock Trading', () => {
    it('should handle Korean stock transactions with proper formatting', () => {
      cy.executeTransaction({
        type: 'BUY',
        symbol: '005930.KS',
        shares: 100,
        price: 75000,
        orderType: 'LIMIT',
      });

      // Verify Korean formatting in transaction history
      cy.navigateToTransactions();
      cy.get('[data-cy=transaction-row]')
        .first()
        .within(() => {
          cy.get('[data-cy=transaction-symbol]').should(
            'contain.text',
            '005930.KS'
          );
          cy.get('[data-cy=transaction-price]').should(
            'contain.text',
            '₩75,000'
          );
          cy.get('[data-cy=transaction-amount]').should(
            'contain.text',
            '₩7,500,000'
          );
        });

      // Verify Korean stock details
      cy.get('[data-cy=transaction-details-button]').first().click();
      cy.get('[data-cy=transaction-details-modal]').should('be.visible');

      cy.get('[data-cy=stock-name]').should('contain.text', '삼성전자');
      cy.get('[data-cy=market]').should('contain.text', 'KOSPI');
      cy.get('[data-cy=currency]').should('contain.text', 'KRW');
      cy.get('[data-cy=trading-fees]').should('contain.text', '₩');
    });

    it('should handle market hours validation for Korean stocks', () => {
      // Set time outside Korean market hours
      cy.clock(new Date('2024-01-15T05:00:00Z')); // 2 PM KST (outside market hours)

      cy.get('[data-cy=new-transaction-button]').click();
      cy.get('[data-cy=symbol-search-input]').type('035420.KS'); // NAVER
      cy.get('[data-cy=symbol-option-035420.KS]').click();

      // Should show market hours warning
      cy.get('[data-cy=market-hours-warning]').should('be.visible');
      cy.get('[data-cy=market-hours-warning]').should(
        'contain.text',
        'Korean market is currently closed'
      );

      // Should still allow order placement (as pending)
      cy.get('[data-cy=shares-input]').type('10');
      cy.get('[data-cy=order-type-market]').click();
      cy.get('[data-cy=submit-transaction]').click();

      cy.get('[data-cy=pending-order-notice]').should('be.visible');
      cy.get('[data-cy=confirm-transaction]').click();

      // Verify order is marked as pending
      cy.navigateToTransactions();
      cy.get('[data-cy=transaction-status]')
        .first()
        .should('contain.text', 'Pending');
    });
  });

  describe('Transaction History and Search', () => {
    beforeEach(() => {
      // Generate test transaction history
      cy.task('generateTransactionData', {
        portfolioId: 'test-portfolio',
        transactionCount: 20,
        dateRange: {
          start: '2024-01-01',
          end: '2024-12-31',
        },
      }).then(transactions => {
        cy.window().then(win => {
          win.localStorage.setItem(
            'test-transactions',
            JSON.stringify(transactions)
          );
        });
      });
    });

    it('should display paginated transaction history', () => {
      cy.navigateToTransactions();
      cy.waitForDataLoad();

      // Should show transactions with pagination
      cy.get('[data-cy=transaction-row]').should('have.length.at.least', 10);
      cy.get('[data-cy=pagination]').should('be.visible');
      cy.get('[data-cy=total-transactions]').should('contain.text', '20');

      // Test pagination navigation
      cy.get('[data-cy=next-page]').click();
      cy.get('[data-cy=current-page]').should('contain.text', '2');

      cy.get('[data-cy=previous-page]').click();
      cy.get('[data-cy=current-page]').should('contain.text', '1');
    });

    it('should filter transactions by type', () => {
      cy.navigateToTransactions();
      cy.waitForDataLoad();

      // Filter by BUY transactions
      cy.get('[data-cy=transaction-type-filter]').select('BUY');
      cy.get('[data-cy=apply-filters]').click();

      cy.get('[data-cy=transaction-row]').each($row => {
        cy.wrap($row).within(() => {
          cy.get('[data-cy=transaction-type]').should('contain.text', 'BUY');
        });
      });

      // Filter by SELL transactions
      cy.get('[data-cy=transaction-type-filter]').select('SELL');
      cy.get('[data-cy=apply-filters]').click();

      cy.get('[data-cy=transaction-row]').each($row => {
        cy.wrap($row).within(() => {
          cy.get('[data-cy=transaction-type]').should('contain.text', 'SELL');
        });
      });
    });

    it('should filter transactions by date range', () => {
      cy.navigateToTransactions();
      cy.waitForDataLoad();

      // Set date filter
      cy.get('[data-cy=date-from-filter]').type('2024-06-01');
      cy.get('[data-cy=date-to-filter]').type('2024-08-31');
      cy.get('[data-cy=apply-filters]').click();

      // Verify all transactions are within date range
      cy.get('[data-cy=transaction-row]').each($row => {
        cy.wrap($row).within(() => {
          cy.get('[data-cy=transaction-date]')
            .invoke('text')
            .then(dateText => {
              const transactionDate = new Date(dateText);
              const startDate = new Date('2024-06-01');
              const endDate = new Date('2024-08-31');

              expect(transactionDate).to.be.at.least(startDate);
              expect(transactionDate).to.be.at.most(endDate);
            });
        });
      });
    });

    it('should search transactions by symbol', () => {
      cy.navigateToTransactions();
      cy.waitForDataLoad();

      // Search for AAPL transactions
      cy.get('[data-cy=symbol-search]').type('AAPL');
      cy.get('[data-cy=search-button]').click();

      cy.get('[data-cy=transaction-row]').each($row => {
        cy.wrap($row).within(() => {
          cy.get('[data-cy=transaction-symbol]').should('contain.text', 'AAPL');
        });
      });

      // Clear search
      cy.get('[data-cy=clear-search]').click();
      cy.get('[data-cy=symbol-search]').should('have.value', '');
    });

    it('should export transaction history', () => {
      cy.navigateToTransactions();
      cy.waitForDataLoad();

      // Test CSV export
      cy.get('[data-cy=export-transactions]').click();
      cy.get('[data-cy=export-format-csv]').click();
      cy.get('[data-cy=confirm-export]').click();

      // Should trigger download
      cy.get('[data-cy=export-status]').should(
        'contain.text',
        'Export completed'
      );

      // Test Excel export
      cy.get('[data-cy=export-transactions]').click();
      cy.get('[data-cy=export-format-excel]').click();
      cy.get('[data-cy=confirm-export]').click();

      cy.get('[data-cy=export-status]').should(
        'contain.text',
        'Export completed'
      );
    });
  });

  describe('Transaction Reconciliation', () => {
    it('should detect and flag reconciliation discrepancies', () => {
      cy.navigateToTransactions();
      cy.get('[data-cy=reconciliation-tab]').click();

      // Upload broker statement for reconciliation
      cy.get('[data-cy=upload-statement]').click();
      cy.get('[data-cy=file-input]').selectFile(
        'cypress/fixtures/broker-statement.csv'
      );
      cy.get('[data-cy=upload-button]').click();

      // Wait for reconciliation process
      cy.get('[data-cy=reconciliation-progress]').should('be.visible');
      cy.get('[data-cy=reconciliation-completed]', { timeout: 20000 }).should(
        'be.visible'
      );

      // Check reconciliation results
      cy.get('[data-cy=reconciliation-summary]').should('be.visible');
      cy.get('[data-cy=matched-transactions]').should('contain.text', /\d+/);
      cy.get('[data-cy=unmatched-transactions]').should('contain.text', /\d+/);

      // Review discrepancies
      if (
        cy
          .get('[data-cy=discrepancy-count]')
          .invoke('text')
          .then(text => parseInt(text) > 0)
      ) {
        cy.get('[data-cy=view-discrepancies]').click();
        cy.get('[data-cy=discrepancy-list]').should('be.visible');

        cy.get('[data-cy=discrepancy-item]')
          .first()
          .within(() => {
            cy.get('[data-cy=discrepancy-type]').should('not.be.empty');
            cy.get('[data-cy=discrepancy-amount]').should('not.be.empty');
            cy.get('[data-cy=resolve-discrepancy]').should('be.visible');
          });
      }
    });

    it('should handle manual transaction adjustments', () => {
      cy.navigateToTransactions();

      // Select transaction to adjust
      cy.get('[data-cy=transaction-row]')
        .first()
        .within(() => {
          cy.get('[data-cy=transaction-actions]').click();
          cy.get('[data-cy=adjust-transaction]').click();
        });

      cy.get('[data-cy=adjustment-modal]').should('be.visible');

      // Make adjustment
      cy.get('[data-cy=adjustment-reason]').select('Price Correction');
      cy.get('[data-cy=adjusted-price]').clear().type('180.25');
      cy.get('[data-cy=adjustment-notes]').type(
        'Corrected price due to broker error'
      );

      cy.get('[data-cy=submit-adjustment]').click();

      // Verify adjustment is recorded
      cy.get('[data-cy=adjustment-confirmation]').should('be.visible');
      cy.get('[data-cy=audit-trail]').should(
        'contain.text',
        'Transaction adjusted'
      );

      // Check transaction shows adjustment
      cy.get('[data-cy=transaction-row]')
        .first()
        .within(() => {
          cy.get('[data-cy=adjustment-indicator]').should('be.visible');
          cy.get('[data-cy=original-price]').should('be.visible');
          cy.get('[data-cy=adjusted-price]').should('contain.text', '$180.25');
        });
    });
  });

  describe('Trading Fees and Tax Calculations', () => {
    it('should calculate and display trading fees accurately', () => {
      cy.executeTransaction({
        type: 'BUY',
        symbol: '005930.KS',
        shares: 1000,
        price: 75000,
        orderType: 'MARKET',
      });

      // Check transaction details for fees
      cy.navigateToTransactions();
      cy.get('[data-cy=transaction-row]')
        .first()
        .within(() => {
          cy.get('[data-cy=transaction-details-button]').click();
        });

      cy.get('[data-cy=transaction-details-modal]').should('be.visible');

      // Verify fee calculations
      cy.get('[data-cy=trading-fee]').should('contain.text', '₩'); // Korean brokerage fee
      cy.get('[data-cy=exchange-fee]').should('contain.text', '₩'); // Exchange fee
      cy.get('[data-cy=tax-fee]').should('contain.text', '₩'); // Transaction tax
      cy.get('[data-cy=total-fees]').should('contain.text', '₩');

      // Verify fee percentage is reasonable
      cy.get('[data-cy=fee-percentage]')
        .invoke('text')
        .then(feeText => {
          const feePercent = parseFloat(feeText.replace('%', ''));
          expect(feePercent).to.be.at.most(1.0); // Should be less than 1%
        });
    });

    it('should track tax implications of transactions', () => {
      // Execute multiple transactions to create tax scenarios
      cy.executeTransaction({
        type: 'BUY',
        symbol: 'AAPL',
        shares: 100,
        price: 150,
        orderType: 'MARKET',
      });

      // Wait and sell for capital gain
      cy.wait(1000);
      cy.executeTransaction({
        type: 'SELL',
        symbol: 'AAPL',
        shares: 100,
        price: 180,
        orderType: 'MARKET',
      });

      // Check tax implications
      cy.navigateToTransactions();
      cy.get('[data-cy=tax-summary-tab]').click();

      cy.get('[data-cy=capital-gains-summary]').should('be.visible');
      cy.get('[data-cy=short-term-gains]').should('contain.text', /\$[\d,]+/);
      cy.get('[data-cy=long-term-gains]').should('contain.text', /\$[\d,]+/);
      cy.get('[data-cy=estimated-tax]').should('contain.text', /\$[\d,]+/);

      // Check individual transaction tax implications
      cy.get('[data-cy=transaction-with-tax]')
        .first()
        .within(() => {
          cy.get('[data-cy=tax-impact]').should('be.visible');
          cy.get('[data-cy=holding-period]').should('contain.text', /\d+ days/);
          cy.get('[data-cy=gain-loss]').should('contain.text', /[+-]\$[\d,]+/);
        });
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle market volatility and price gaps', () => {
      // Simulate volatile market conditions
      cy.intercept('GET', '/api/financial/stocks/TSLA', {
        statusCode: 200,
        body: {
          symbol: 'TSLA',
          price: 300,
          volatility: 0.85, // High volatility
          priceChange: -25.5,
          changePercent: -7.84,
        },
      }).as('getVolatileStock');

      cy.get('[data-cy=new-transaction-button]').click();
      cy.get('[data-cy=symbol-search-input]').type('TSLA');
      cy.wait('@getVolatileStock');

      // Should show volatility warning
      cy.get('[data-cy=volatility-warning]').should('be.visible');
      cy.get('[data-cy=volatility-warning]').should(
        'contain.text',
        'High volatility detected'
      );

      // Should show recent price movement
      cy.get('[data-cy=recent-price-change]').should('contain.text', '-7.84%');

      // User can proceed with warning acknowledgment
      cy.get('[data-cy=acknowledge-volatility]').check();
      cy.get('[data-cy=shares-input]').type('10');
      cy.get('[data-cy=submit-transaction]').should('not.be.disabled');
    });

    it('should handle network failures gracefully', () => {
      // Simulate network failure during transaction
      cy.intercept('POST', '/api/transactions', {
        statusCode: 500,
        body: { error: 'Network error' },
      }).as('failedTransaction');

      cy.get('[data-cy=new-transaction-button]').click();
      cy.get('[data-cy=symbol-search-input]').type('AAPL');
      cy.get('[data-cy=symbol-option-AAPL]').click();
      cy.get('[data-cy=shares-input]').type('10');
      cy.get('[data-cy=submit-transaction]').click();
      cy.get('[data-cy=confirm-transaction]').click();

      cy.wait('@failedTransaction');

      // Should show error message
      cy.get('[data-cy=transaction-error]').should('be.visible');
      cy.get('[data-cy=transaction-error]').should(
        'contain.text',
        'Transaction failed'
      );

      // Should offer retry option
      cy.get('[data-cy=retry-transaction]').should('be.visible');

      // Mock successful retry
      cy.intercept('POST', '/api/transactions', {
        statusCode: 200,
        body: { success: true, transactionId: 'txn-retry-123' },
      }).as('successfulRetry');

      cy.get('[data-cy=retry-transaction]').click();
      cy.wait('@successfulRetry');

      cy.get('[data-cy=transaction-success]').should('be.visible');
    });

    it('should handle concurrent transaction conflicts', () => {
      // Simulate position being sold by another session
      cy.addPosition({
        symbol: 'NVDA',
        shares: 100,
        price: 400,
      });

      // Start selling 60 shares
      cy.get('[data-cy=new-transaction-button]').click();
      cy.get('[data-cy=transaction-type-sell]').click();
      cy.get('[data-cy=symbol-search-input]').type('NVDA');
      cy.get('[data-cy=symbol-option-NVDA]').click();
      cy.get('[data-cy=shares-input]').type('60');

      // Simulate another session selling 50 shares
      cy.window().then(win => {
        const currentPosition = { symbol: 'NVDA', shares: 50 }; // Reduced by other session
        win.localStorage.setItem(
          'updated-position-NVDA',
          JSON.stringify(currentPosition)
        );
      });

      cy.get('[data-cy=submit-transaction]').click();

      // Should detect insufficient shares
      cy.get('[data-cy=concurrent-modification-error]').should('be.visible');
      cy.get('[data-cy=concurrent-modification-error]').should(
        'contain.text',
        'Position has been modified'
      );

      // Should offer to refresh and adjust
      cy.get('[data-cy=refresh-position]').click();
      cy.get('[data-cy=available-shares]').should('contain.text', '50');

      // Adjust transaction amount
      cy.get('[data-cy=shares-input]').clear().type('40');
      cy.get('[data-cy=submit-transaction]').click();

      cy.get('[data-cy=transaction-confirmation]').should('be.visible');
    });
  });
});
