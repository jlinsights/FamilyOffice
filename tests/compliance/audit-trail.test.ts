/**
 * Compliance and audit trail testing
 * Ensures regulatory compliance and proper audit logging
 */
import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { FINANCIAL_SCENARIOS } from '../fixtures/financial-scenarios';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  oldValues?: any;
  newValues?: any;
  ipAddress: string;
  userAgent: string;
  sessionId: string;
  compliance?: {
    regulation: string;
    requirement: string;
    status: 'COMPLIANT' | 'NON_COMPLIANT' | 'PENDING_REVIEW';
  };
}

interface ComplianceRule {
  id: string;
  name: string;
  description: string;
  regulation: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  checkFunction: (data: any) => ComplianceResult;
}

interface ComplianceResult {
  compliant: boolean;
  violations: string[];
  recommendations: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

class ComplianceTestSuite {
  private auditLogs: AuditLogEntry[] = [];
  private complianceRules: ComplianceRule[] = [];

  constructor() {
    this.initializeComplianceRules();
  }

  private initializeComplianceRules(): void {
    this.complianceRules = [
      // Korean Financial Investment Services and Capital Markets Act
      {
        id: 'FSCMA-001',
        name: 'Large Transaction Reporting',
        description:
          'Transactions over 5 billion KRW must be reported within 24 hours',
        regulation: 'Korean FSCMA',
        severity: 'CRITICAL',
        checkFunction: transaction => {
          const violations: any[] = [];
          const recommendations: any[] = [];

          if (
            transaction.currency === 'KRW' &&
            transaction.shares * transaction.price > 5000000000
          ) {
            const timeSinceTransaction =
              Date.now() - new Date(transaction.timestamp).getTime();
            const hoursElapsed = timeSinceTransaction / (1000 * 60 * 60);

            if (hoursElapsed > 24) {
              violations.push(
                `Large transaction not reported within 24 hours: ${hoursElapsed.toFixed(1)} hours elapsed`
              );
            }
          }

          return {
            compliant: violations.length === 0,
            violations,
            recommendations,
            riskLevel: violations.length > 0 ? 'CRITICAL' : 'LOW',
          };
        },
      },

      // US Securities Exchange Act Rule 13d
      {
        id: 'SEC-13D',
        name: 'Beneficial Ownership Disclosure',
        description:
          'Ownership of 5% or more of a class of securities must be disclosed',
        regulation: 'US SEC Rule 13d',
        severity: 'HIGH',
        checkFunction: portfolio => {
          const violations: any[] = [];
          const recommendations: any[] = [];

          portfolio.positions?.forEach((position: any) => {
            // Mock check - in real implementation would check against total shares outstanding
            const mockSharesOutstanding = 10000000; // 10M shares
            const ownershipPercentage =
              (position.shares / mockSharesOutstanding) * 100;

            if (ownershipPercentage >= 5 && !portfolio.hasDisclosureFilings) {
              violations.push(
                `${position.symbol}: ${ownershipPercentage.toFixed(2)}% ownership requires 13D filing`
              );
              recommendations.push(
                `File Schedule 13D for ${position.symbol} within 10 days`
              );
            }
          });

          return {
            compliant: violations.length === 0,
            violations,
            recommendations,
            riskLevel: violations.length > 0 ? 'HIGH' : 'LOW',
          };
        },
      },

      // Anti-Money Laundering (AML)
      {
        id: 'AML-001',
        name: 'Suspicious Transaction Monitoring',
        description: 'Monitor for patterns indicative of money laundering',
        regulation: 'AML/KYC',
        severity: 'CRITICAL',
        checkFunction: transactions => {
          const violations: any[] = [];
          const recommendations: any[] = [];

          if (Array.isArray(transactions)) {
            // Check for structuring (multiple transactions just under reporting threshold)
            const recentTransactions = transactions.filter((txn: any) => {
              const daysSince =
                (Date.now() - new Date(txn.timestamp).getTime()) /
                (1000 * 60 * 60 * 24);
              return daysSince <= 7; // Last 7 days
            });

            const largeTransactions = recentTransactions.filter((txn: any) => {
              const value = txn.shares * txn.price;
              return value > 9000 && value < 10000; // Just under $10K threshold
            });

            if (largeTransactions.length >= 3) {
              violations.push(
                `Potential structuring detected: ${largeTransactions.length} transactions just under $10K threshold`
              );
              recommendations.push('File Suspicious Activity Report (SAR)');
            }

            // Check for rapid buy/sell patterns
            const symbols = new Set(transactions.map((txn: any) => txn.symbol));
            symbols.forEach(symbol => {
              const symbolTxns = transactions.filter(
                (txn: any) => txn.symbol === symbol
              );
              const buys = symbolTxns.filter(
                (txn: any) => txn.type === 'BUY'
              ).length;
              const sells = symbolTxns.filter(
                (txn: any) => txn.type === 'SELL'
              ).length;

              if (buys > 10 && sells > 10) {
                violations.push(
                  `High frequency trading pattern in ${symbol}: ${buys} buys, ${sells} sells`
                );
                recommendations.push(
                  `Review trading pattern for ${symbol} for potential wash trading`
                );
              }
            });
          }

          return {
            compliant: violations.length === 0,
            violations,
            recommendations,
            riskLevel: violations.length > 0 ? 'CRITICAL' : 'LOW',
          };
        },
      },

      // GDPR Data Protection
      {
        id: 'GDPR-001',
        name: 'Personal Data Retention',
        description: 'Personal data must not be retained longer than necessary',
        regulation: 'EU GDPR',
        severity: 'HIGH',
        checkFunction: userData => {
          const violations: any[] = [];
          const recommendations: any[] = [];

          if (userData.lastLoginDate) {
            const daysSinceLogin =
              (Date.now() - new Date(userData.lastLoginDate).getTime()) /
              (1000 * 60 * 60 * 24);

            if (daysSinceLogin > 1095) {
              // 3 years
              violations.push(
                `User data retained for ${Math.floor(daysSinceLogin)} days without activity`
              );
              recommendations.push(
                'Consider data anonymization or deletion for inactive users'
              );
            }
          }

          return {
            compliant: violations.length === 0,
            violations,
            recommendations,
            riskLevel: violations.length > 0 ? 'MEDIUM' : 'LOW',
          };
        },
      },

      // Fiduciary Duty
      {
        id: 'FIDUCIARY-001',
        name: 'Best Execution',
        description: 'Ensure best execution for client orders',
        regulation: 'Fiduciary Duty',
        severity: 'HIGH',
        checkFunction: execution => {
          const violations: any[] = [];
          const recommendations: any[] = [];

          if (execution.executedPrice && execution.benchmarkPrice) {
            const priceDeviation =
              Math.abs(execution.executedPrice - execution.benchmarkPrice) /
              execution.benchmarkPrice;

            if (priceDeviation > 0.05) {
              // 5% deviation
              violations.push(
                `Execution price deviated ${(priceDeviation * 100).toFixed(2)}% from benchmark`
              );
              recommendations.push(
                'Review execution venues and routing algorithms'
              );
            }
          }

          if (execution.executionTime > 60000) {
            // 1 minute
            violations.push(`Slow execution: ${execution.executionTime}ms`);
            recommendations.push('Optimize order routing for faster execution');
          }

          return {
            compliant: violations.length === 0,
            violations,
            recommendations,
            riskLevel: violations.length > 0 ? 'HIGH' : 'LOW',
          };
        },
      },
    ];
  }

  logAuditEvent(event: Omit<AuditLogEntry, 'id' | 'timestamp'>): void {
    const auditEntry: AuditLogEntry = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      ...event,
    };

    this.auditLogs.push(auditEntry);
  }

  checkCompliance(data: any, ruleId?: string): ComplianceResult[] {
    const rulesToCheck = ruleId
      ? this.complianceRules.filter(rule => rule.id === ruleId)
      : this.complianceRules;

    return rulesToCheck.map(rule => {
      const result = rule.checkFunction(data);

      // Log compliance check
      this.logAuditEvent({
        userId: 'system',
        action: 'COMPLIANCE_CHECK',
        resource: 'compliance_rule',
        resourceId: rule.id,
        ipAddress: '127.0.0.1',
        userAgent: 'Compliance Test Suite',
        sessionId: 'test-session',
        compliance: {
          regulation: rule.regulation,
          requirement: rule.name,
          status: result.compliant ? 'COMPLIANT' : 'NON_COMPLIANT',
        },
      });

      return result;
    });
  }

  getAuditTrail(filters?: {
    startDate?: string;
    endDate?: string;
    userId?: string;
    action?: string;
    resource?: string;
  }): AuditLogEntry[] {
    // Deep clone to ensure immutability
    let filteredLogs = this.auditLogs.map(log => ({ ...log }));

    if (filters) {
      if (filters.startDate) {
        const startDate = filters.startDate;
        filteredLogs = filteredLogs.filter(log => log.timestamp >= startDate);
      }
      if (filters.endDate) {
        const endDate = filters.endDate;
        filteredLogs = filteredLogs.filter(log => log.timestamp <= endDate);
      }
      if (filters.userId) {
        const userId = filters.userId;
        filteredLogs = filteredLogs.filter(log => log.userId === userId);
      }
      if (filters.action) {
        const action = filters.action;
        filteredLogs = filteredLogs.filter(log => log.action === action);
      }
      if (filters.resource) {
        const resource = filters.resource;
        filteredLogs = filteredLogs.filter(log => log.resource === resource);
      }
    }

    return filteredLogs.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  generateComplianceReport(): {
    summary: any;
    violations: any[];
    recommendations: string[];
    auditStatistics: any;
  } {
    const allResults = this.auditLogs
      .filter(log => log.compliance)
      .map(log => log.compliance!);

    const violations = allResults.filter(
      result => result.status === 'NON_COMPLIANT'
    );
    const compliantCount = allResults.filter(
      result => result.status === 'COMPLIANT'
    ).length;

    const summary = {
      totalChecks: allResults.length,
      compliantChecks: compliantCount,
      violations: violations.length,
      complianceRate:
        allResults.length > 0
          ? ((compliantCount / allResults.length) * 100).toFixed(2)
          : '0.00',
    };

    const auditStatistics = {
      totalAuditEntries: this.auditLogs.length,
      uniqueUsers: new Set(this.auditLogs.map(log => log.userId)).size,
      actionBreakdown: this.auditLogs.reduce(
        (acc, log) => {
          acc[log.action] = (acc[log.action] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
      resourceBreakdown: this.auditLogs.reduce(
        (acc, log) => {
          acc[log.resource] = (acc[log.resource] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
    };

    return {
      summary,
      violations: violations.map(v => ({
        regulation: v.regulation,
        requirement: v.requirement,
        status: v.status,
      })),
      recommendations: [
        'Implement automated compliance monitoring',
        'Regular compliance training for staff',
        'Enhanced transaction monitoring systems',
        'Periodic compliance audits by external firms',
      ],
      auditStatistics,
    };
  }
}

describe('Compliance and Audit Trail Testing', () => {
  let complianceSuite: ComplianceTestSuite;

  beforeEach(() => {
    complianceSuite = new ComplianceTestSuite();
  });

  afterEach(() => {
    const report = complianceSuite.generateComplianceReport();
    if (report.violations.length > 0) {
      console.log('Compliance Violations Detected:', report.violations);
    }
  });

  describe('Audit Trail Functionality', () => {
    test('should log portfolio creation events', () => {
      const scenario = FINANCIAL_SCENARIOS.FAMILY_OFFICE_DIVERSIFIED;
      if (!scenario) throw new Error('Scenario not found');

      complianceSuite.logAuditEvent({
        userId: 'user-123',
        action: 'CREATE_PORTFOLIO',
        resource: 'portfolio',
        resourceId: 'portfolio-456',
        newValues: {
          name: scenario.name,
          initialValue: scenario.portfolioValue,
        },
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 Test Browser',
        sessionId: 'session-789',
      });

      const auditTrail = complianceSuite.getAuditTrail({
        action: 'CREATE_PORTFOLIO',
      });

      expect(auditTrail).toHaveLength(1);
      expect(auditTrail[0]?.action).toBe('CREATE_PORTFOLIO');
      expect(auditTrail[0]?.resource).toBe('portfolio');
      expect(auditTrail[0]?.userId).toBe('user-123');
    });

    test('should log transaction execution with before/after values', () => {
      const scenario = FINANCIAL_SCENARIOS.FAMILY_OFFICE_DIVERSIFIED;
      if (!scenario?.transactions?.[0])
        throw new Error('Transaction not found');
      const transaction = scenario.transactions[0];

      complianceSuite.logAuditEvent({
        userId: 'user-123',
        action: 'EXECUTE_TRANSACTION',
        resource: 'transaction',
        resourceId: transaction.id,
        oldValues: {
          status: 'PENDING',
          shares: 0,
        },
        newValues: {
          status: 'COMPLETED',
          shares: transaction.shares,
          price: transaction.price,
          total: transaction.shares * transaction.price,
        },
        ipAddress: '192.168.1.100',
        userAgent: 'Trading Platform v2.1',
        sessionId: 'session-789',
      });

      const auditTrail = complianceSuite.getAuditTrail({
        resource: 'transaction',
      });

      expect(auditTrail).toHaveLength(1);
      expect(auditTrail[0]?.oldValues?.status).toBe('PENDING');
      expect(auditTrail[0]?.newValues?.status).toBe('COMPLETED');
      expect(auditTrail[0]?.newValues?.shares).toBe(transaction.shares);
    });

    test('should filter audit logs by date range', () => {
      const now = new Date();
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

      // Log events at different times
      complianceSuite.logAuditEvent({
        userId: 'user-1',
        action: 'LOGIN',
        resource: 'session',
        resourceId: 'session-1',
        ipAddress: '192.168.1.1',
        userAgent: 'Browser',
        sessionId: 'session-1',
      });

      const filteredLogs = complianceSuite.getAuditTrail({
        startDate: yesterday.toISOString(),
        endDate: tomorrow.toISOString(),
      });

      expect(filteredLogs.length).toBeGreaterThan(0);
      filteredLogs.forEach(log => {
        expect(new Date(log.timestamp)).toBeInstanceOf(Date);
      });
    });

    test('should maintain audit log immutability', () => {
      complianceSuite.logAuditEvent({
        userId: 'user-123',
        action: 'SENSITIVE_OPERATION',
        resource: 'portfolio',
        resourceId: 'portfolio-456',
        ipAddress: '192.168.1.100',
        userAgent: 'Test',
        sessionId: 'session-789',
      });

      const auditTrail = complianceSuite.getAuditTrail();
      const originalEntry = auditTrail[0];
      if (!originalEntry) throw new Error('No audit entry found');
      const originalTimestamp = originalEntry.timestamp;

      // Attempt to modify the audit entry (should not affect original)
      originalEntry.action = 'MODIFIED_ACTION';

      const freshAuditTrail = complianceSuite.getAuditTrail();
      expect(freshAuditTrail[0]?.timestamp).toBe(originalTimestamp);
      expect(freshAuditTrail[0]?.action).toBe('SENSITIVE_OPERATION');
    });
  });

  describe('Korean Financial Compliance', () => {
    test('should detect large Korean transaction reporting requirements', () => {
      const largeKoreanTransaction = {
        symbol: '005930.KS',
        shares: 100000,
        price: 75000, // 7.5 billion KRW transaction
        currency: 'KRW',
        timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(), // 25 hours ago
      };

      const results = complianceSuite.checkCompliance(
        largeKoreanTransaction,
        'FSCMA-001'
      );

      expect(results).toHaveLength(1);
      expect(results[0]?.compliant).toBe(false);
      expect(results[0]?.violations).toEqual(
        expect.arrayContaining([
          expect.stringMatching(
            /Large transaction not reported within 24 hours/
          ),
        ])
      );
      expect(results[0]?.riskLevel).toBe('CRITICAL');
    });

    test('should pass compliance for timely reported transactions', () => {
      const timelyTransaction = {
        symbol: '035420.KS',
        shares: 50000,
        price: 200000, // 10 billion KRW transaction
        currency: 'KRW',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      };

      const results = complianceSuite.checkCompliance(
        timelyTransaction,
        'FSCMA-001'
      );

      expect(results).toHaveLength(1);
      expect(results[0]?.compliant).toBe(true);
      expect(results[0]?.violations).toHaveLength(0);
      expect(results[0]?.riskLevel).toBe('LOW');
    });
  });

  describe('US Securities Compliance', () => {
    test('should detect beneficial ownership disclosure requirements', () => {
      const portfolioWithLargePosition = {
        positions: [
          {
            symbol: 'AAPL',
            shares: 600000, // 6% of mock 10M outstanding shares
            name: 'Apple Inc.',
          },
        ],
        hasDisclosureFilings: false,
      };

      const results = complianceSuite.checkCompliance(
        portfolioWithLargePosition,
        'SEC-13D'
      );

      expect(results).toHaveLength(1);
      expect(results[0]?.compliant).toBe(false);
      expect(results[0]?.violations).toEqual(
        expect.arrayContaining([
          expect.stringMatching(/AAPL: 6\.00% ownership requires 13D filing/),
        ])
      );
      expect(results[0]?.recommendations).toEqual(
        expect.arrayContaining([
          expect.stringMatching(/File Schedule 13D for AAPL within 10 days/),
        ])
      );
    });

    test('should pass compliance for positions under 5% threshold', () => {
      const portfolioWithSmallPosition = {
        positions: [
          {
            symbol: 'MSFT',
            shares: 400000, // 4% of mock 10M outstanding shares
            name: 'Microsoft Corp.',
          },
        ],
        hasDisclosureFilings: false,
      };

      const results = complianceSuite.checkCompliance(
        portfolioWithSmallPosition,
        'SEC-13D'
      );

      expect(results).toHaveLength(1);
      expect(results[0]?.compliant).toBe(true);
      expect(results[0]?.violations).toHaveLength(0);
    });
  });

  describe('Anti-Money Laundering (AML) Compliance', () => {
    test('should detect potential structuring patterns', () => {
      const suspiciousTransactions = Array.from({ length: 5 }, (_, i) => ({
        id: `struct-${i}`,
        type: 'BUY',
        symbol: 'AAPL',
        shares: 50,
        price: 195, // $9,750 per transaction
        timestamp: new Date(Date.now() - i * 2 * 60 * 60 * 1000).toISOString(),
        currency: 'USD',
      }));

      const results = complianceSuite.checkCompliance(
        suspiciousTransactions,
        'AML-001'
      );

      expect(results).toHaveLength(1);
      expect(results[0]?.compliant).toBe(false);
      expect(results[0]?.violations).toEqual(
        expect.arrayContaining([
          expect.stringMatching(/Potential structuring detected/),
        ])
      );
      expect(results[0]?.recommendations).toEqual(
        expect.arrayContaining(['File Suspicious Activity Report (SAR)'])
      );
      expect(results[0]?.riskLevel).toBe('CRITICAL');
    });

    test('should detect high frequency trading patterns', () => {
      // Create deterministic high frequency trading pattern
      const highFrequencyTransactions = [
        // 12 BUY transactions for TSLA
        ...Array.from({ length: 12 }, (_, i) => ({
          id: `hft-buy-${i}`,
          type: 'BUY' as const,
          symbol: 'TSLA',
          shares: 100,
          price: 240 + i,
          timestamp: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
          currency: 'USD',
        })),
        // 12 SELL transactions for TSLA
        ...Array.from({ length: 12 }, (_, i) => ({
          id: `hft-sell-${i}`,
          type: 'SELL' as const,
          symbol: 'TSLA',
          shares: 100,
          price: 245 + i,
          timestamp: new Date(
            Date.now() - (i + 12) * 60 * 60 * 1000
          ).toISOString(),
          currency: 'USD',
        })),
      ];

      const results = complianceSuite.checkCompliance(
        highFrequencyTransactions,
        'AML-001'
      );

      expect(results).toHaveLength(1);
      // Should detect high frequency patterns
      const hasHighFrequencyViolation = results[0]?.violations?.some(v =>
        v.includes('High frequency trading pattern')
      );
      expect(hasHighFrequencyViolation).toBe(true);
    });

    test('should pass compliance for normal trading patterns', () => {
      const normalTransactions = [
        {
          id: 'normal-1',
          type: 'BUY',
          symbol: 'VTI',
          shares: 100,
          price: 250,
          timestamp: new Date(
            Date.now() - 7 * 24 * 60 * 60 * 1000
          ).toISOString(),
          currency: 'USD',
        },
        {
          id: 'normal-2',
          type: 'BUY',
          symbol: 'VXUS',
          shares: 200,
          price: 65,
          timestamp: new Date(
            Date.now() - 5 * 24 * 60 * 60 * 1000
          ).toISOString(),
          currency: 'USD',
        },
      ];

      const results = complianceSuite.checkCompliance(
        normalTransactions,
        'AML-001'
      );

      expect(results).toHaveLength(1);
      expect(results[0]?.compliant).toBe(true);
      expect(results[0]?.riskLevel).toBe('LOW');
    });
  });

  describe('Data Protection Compliance', () => {
    test('should detect GDPR data retention violations', () => {
      const oldUserData = {
        userId: 'user-old',
        lastLoginDate: new Date(
          Date.now() - 4 * 365 * 24 * 60 * 60 * 1000
        ).toISOString(), // 4 years ago
      };

      const results = complianceSuite.checkCompliance(oldUserData, 'GDPR-001');

      expect(results).toHaveLength(1);
      expect(results[0]?.compliant).toBe(false);
      expect(results[0]?.violations).toEqual(
        expect.arrayContaining([
          expect.stringMatching(
            /User data retained for \d+ days without activity/
          ),
        ])
      );
      expect(results[0]?.recommendations).toEqual(
        expect.arrayContaining([
          'Consider data anonymization or deletion for inactive users',
        ])
      );
    });

    test('should pass compliance for recent user activity', () => {
      const activeUserData = {
        userId: 'user-active',
        lastLoginDate: new Date(
          Date.now() - 30 * 24 * 60 * 60 * 1000
        ).toISOString(), // 30 days ago
      };

      const results = complianceSuite.checkCompliance(
        activeUserData,
        'GDPR-001'
      );

      expect(results).toHaveLength(1);
      expect(results[0]?.compliant).toBe(true);
      expect(results[0]?.riskLevel).toBe('LOW');
    });
  });

  describe('Fiduciary Duty Compliance', () => {
    test('should detect best execution violations', () => {
      const poorExecution = {
        executedPrice: 180.0,
        benchmarkPrice: 170.0, // 5.88% deviation
        executionTime: 90000, // 1.5 minutes
      };

      const results = complianceSuite.checkCompliance(
        poorExecution,
        'FIDUCIARY-001'
      );

      expect(results).toHaveLength(1);
      expect(results[0]?.compliant).toBe(false);
      expect(results[0]?.violations?.length).toBeGreaterThan(0);
      expect(results[0]?.riskLevel).toBe('HIGH');
    });

    test('should pass compliance for good execution', () => {
      const goodExecution = {
        executedPrice: 175.5,
        benchmarkPrice: 175.0, // 0.29% deviation
        executionTime: 15000, // 15 seconds
      };

      const results = complianceSuite.checkCompliance(
        goodExecution,
        'FIDUCIARY-001'
      );

      expect(results).toHaveLength(1);
      expect(results[0]?.compliant).toBe(true);
      expect(results[0]?.riskLevel).toBe('LOW');
    });
  });

  describe('Comprehensive Compliance Testing', () => {
    test('should run all compliance checks on family office scenario', () => {
      const scenario = FINANCIAL_SCENARIOS.FAMILY_OFFICE_DIVERSIFIED;

      // Check portfolio compliance
      const portfolioResults = complianceSuite.checkCompliance(scenario);
      expect(portfolioResults.length).toBeGreaterThan(0);

      // Check transaction compliance
      scenario.transactions.forEach(transaction => {
        const txnResults = complianceSuite.checkCompliance(transaction);
        expect(txnResults).toBeDefined();
      });

      // Generate comprehensive report
      const report = complianceSuite.generateComplianceReport();

      expect(report.summary.totalChecks).toBeGreaterThan(0);
      expect(report.summary.complianceRate).toMatch(/^\d+\.\d{2}$/);
      expect(report.auditStatistics.totalAuditEntries).toBeGreaterThan(0);
    });

    test('should generate compliance dashboard metrics', () => {
      // Simulate various compliance checks
      const scenarios = [
        FINANCIAL_SCENARIOS.KOREAN_CONSERVATIVE_INVESTOR,
        FINANCIAL_SCENARIOS.RETIREMENT_INCOME_FOCUSED,
        FINANCIAL_SCENARIOS.CRYPTO_HEAVY_PORTFOLIO,
      ];

      scenarios.forEach(scenario => {
        complianceSuite.checkCompliance(scenario);
        complianceSuite.checkCompliance(scenario.transactions);
      });

      const report = complianceSuite.generateComplianceReport();

      // Verify report structure
      expect(report.summary).toHaveProperty('totalChecks');
      expect(report.summary).toHaveProperty('complianceRate');
      expect(report.violations).toBeInstanceOf(Array);
      expect(report.recommendations).toBeInstanceOf(Array);
      expect(report.auditStatistics).toHaveProperty('actionBreakdown');
      expect(report.auditStatistics).toHaveProperty('resourceBreakdown');

      console.log('Compliance Dashboard Metrics:', {
        complianceRate: report.summary.complianceRate + '%',
        totalViolations: report.violations.length,
        auditEntries: report.auditStatistics.totalAuditEntries,
      });
    });
  });
});
