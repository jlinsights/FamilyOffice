# FamilyOffice Platform - Database Schema Documentation

## 🗄️ Database Overview

The FamilyOffice platform uses PostgreSQL as the primary database with Redis for caching and session management. The database is designed for high performance, security, and compliance with comprehensive audit trails.

### 🎯 Database Design Principles

- **Normalization**: Third normal form for data integrity
- **Security**: Row-level security (RLS) and encryption
- **Performance**: Optimized indexes and query patterns
- **Compliance**: Complete audit trails and data retention
- **Scalability**: Horizontal scaling and partitioning
- **Backup**: Automated backups and disaster recovery

## 🏗️ Database Architecture

### 1. Core Tables

#### Users and Authentication

```sql
-- Users table with comprehensive profile data
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    nationality VARCHAR(50),
    tax_id VARCHAR(50),
    kyc_status VARCHAR(20) DEFAULT 'pending',
    mfa_enabled BOOLEAN DEFAULT false,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,

    -- Audit fields
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    version INTEGER DEFAULT 1
);

-- User roles and permissions
CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_name VARCHAR(50) NOT NULL,
    permissions JSONB NOT NULL,
    effective_from TIMESTAMP DEFAULT NOW(),
    effective_to TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

-- Multi-factor authentication
CREATE TABLE mfa_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    device_type VARCHAR(20) NOT NULL, -- 'totp', 'sms', 'email'
    device_name VARCHAR(100) NOT NULL,
    secret_key VARCHAR(255),
    backup_codes JSONB,
    is_active BOOLEAN DEFAULT true,
    last_used TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);
```

#### Organizations and Tenants

```sql
-- Multi-tenant organizations
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'family_office', 'wealth_manager', 'consultant'
    status VARCHAR(20) DEFAULT 'active',
    address JSONB,
    contact_info JSONB,
    compliance_settings JSONB,
    subscription_tier VARCHAR(20) DEFAULT 'basic',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

-- Organization members
CREATE TABLE organization_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL, -- 'owner', 'admin', 'manager', 'viewer'
    permissions JSONB,
    status VARCHAR(20) DEFAULT 'active',
    joined_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    UNIQUE(organization_id, user_id)
);
```

### 2. Portfolio Management

#### Assets and Holdings

```sql
-- Asset definitions
CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    symbol VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'stock', 'bond', 'etf', 'mutual_fund', 'real_estate', 'private_equity'
    asset_class VARCHAR(50) NOT NULL, -- 'equity', 'fixed_income', 'real_estate', 'commodities', 'alternatives'
    currency VARCHAR(3) DEFAULT 'USD',
    exchange VARCHAR(20),
    isin VARCHAR(12),
    cusip VARCHAR(9),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

-- Portfolio holdings
CREATE TABLE holdings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
    quantity DECIMAL(20,8) NOT NULL,
    cost_basis DECIMAL(20,2),
    cost_basis_currency VARCHAR(3) DEFAULT 'USD',
    acquisition_date DATE,
    last_price DECIMAL(20,4),
    last_price_date TIMESTAMP,
    market_value DECIMAL(20,2),
    unrealized_gain_loss DECIMAL(20,2),
    weight_percentage DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

-- Portfolios
CREATE TABLE portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL, -- 'main', 'taxable', 'tax_deferred', 'charitable'
    currency VARCHAR(3) DEFAULT 'USD',
    benchmark_id UUID REFERENCES assets(id),
    target_allocation JSONB,
    risk_profile VARCHAR(20), -- 'conservative', 'moderate', 'aggressive'
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);
```

### 3. Transaction Processing

#### Transactions

```sql
-- Transaction records
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    transaction_type VARCHAR(50) NOT NULL, -- 'buy', 'sell', 'dividend', 'interest', 'fee', 'transfer'
    asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
    quantity DECIMAL(20,8),
    price DECIMAL(20,4),
    currency VARCHAR(3) DEFAULT 'USD',
    total_amount DECIMAL(20,2),
    fees DECIMAL(20,2) DEFAULT 0,
    taxes DECIMAL(20,2) DEFAULT 0,
    net_amount DECIMAL(20,2),
    trade_date DATE NOT NULL,
    settlement_date DATE,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'executed', 'cancelled', 'failed'
    execution_venue VARCHAR(100),
    order_id VARCHAR(100),
    confirmation_number VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    approved_by UUID REFERENCES users(id)
);

-- Transaction approvals
CREATE TABLE transaction_approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
    approver_id UUID REFERENCES users(id),
    approval_level INTEGER NOT NULL, -- 1, 2, 3 for multi-level approval
    status VARCHAR(20) NOT NULL, -- 'pending', 'approved', 'rejected'
    comments TEXT,
    approved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Reporting and Analytics

#### Performance Tracking

```sql
-- Performance snapshots
CREATE TABLE performance_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    snapshot_date DATE NOT NULL,
    total_value DECIMAL(20,2),
    total_cost DECIMAL(20,2),
    unrealized_gain_loss DECIMAL(20,2),
    realized_gain_loss DECIMAL(20,2),
    total_return DECIMAL(10,6),
    benchmark_return DECIMAL(10,6),
    excess_return DECIMAL(10,6),
    sharpe_ratio DECIMAL(10,6),
    volatility DECIMAL(10,6),
    max_drawdown DECIMAL(10,6),
    created_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

-- Asset allocation snapshots
CREATE TABLE allocation_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    performance_snapshot_id UUID REFERENCES performance_snapshots(id) ON DELETE CASCADE,
    asset_class VARCHAR(50) NOT NULL,
    allocation_percentage DECIMAL(5,2),
    market_value DECIMAL(20,2),
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. Compliance and Audit

#### Audit Trail

```sql
-- Comprehensive audit trail
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id),
    user_id UUID REFERENCES users(id),
    session_id VARCHAR(255),
    event_type VARCHAR(100) NOT NULL, -- 'login', 'logout', 'create', 'update', 'delete', 'export'
    entity_type VARCHAR(100) NOT NULL, -- 'user', 'portfolio', 'transaction', 'report'
    entity_id UUID,
    action VARCHAR(100) NOT NULL,
    resource VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    request_id VARCHAR(255),
    old_values JSONB,
    new_values JSONB,
    metadata JSONB,
    severity VARCHAR(20) DEFAULT 'info', -- 'info', 'warning', 'error', 'critical'
    compliance_tags TEXT[], -- ['sox', 'gdpr', 'pci']
    created_at TIMESTAMP DEFAULT NOW()
);

-- Data classification
CREATE TABLE data_classification (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name VARCHAR(100) NOT NULL,
    column_name VARCHAR(100) NOT NULL,
    classification VARCHAR(50) NOT NULL, -- 'public', 'internal', 'confidential', 'restricted'
    retention_period INTEGER, -- days
    encryption_required BOOLEAN DEFAULT false,
    access_logging BOOLEAN DEFAULT true,
    compliance_flags TEXT[], -- ['gdpr', 'sox', 'pci']
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 6. Security and Access Control

#### Row-Level Security Policies

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- User access policy
CREATE POLICY user_access_policy ON users
    FOR ALL USING (
        auth.uid() = id OR
        EXISTS (
            SELECT 1 FROM organization_members om
            WHERE om.user_id = auth.uid() AND om.status = 'active'
        )
    );

-- Organization access policy
CREATE POLICY organization_access_policy ON organizations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM organization_members om
            WHERE om.organization_id = organizations.id
            AND om.user_id = auth.uid()
            AND om.status = 'active'
        )
    );

-- Portfolio access policy
CREATE POLICY portfolio_access_policy ON portfolios
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM organization_members om
            WHERE om.organization_id = portfolios.organization_id
            AND om.user_id = auth.uid()
            AND om.status = 'active'
        )
    );
```

## 📊 Database Indexes

### 1. Performance Indexes

```sql
-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_clerk_id ON users(clerk_id);
CREATE INDEX idx_users_organization ON users(organization_id);

-- Portfolio indexes
CREATE INDEX idx_portfolios_organization ON portfolios(organization_id);
CREATE INDEX idx_portfolios_type ON portfolios(type);
CREATE INDEX idx_portfolios_status ON portfolios(status);

-- Transaction indexes
CREATE INDEX idx_transactions_organization ON transactions(organization_id);
CREATE INDEX idx_transactions_portfolio ON transactions(portfolio_id);
CREATE INDEX idx_transactions_asset ON transactions(asset_id);
CREATE INDEX idx_transactions_date ON transactions(trade_date);
CREATE INDEX idx_transactions_status ON transactions(status);

-- Performance indexes
CREATE INDEX idx_performance_portfolio_date ON performance_snapshots(portfolio_id, snapshot_date);
CREATE INDEX idx_performance_organization_date ON performance_snapshots(organization_id, snapshot_date);

-- Audit indexes
CREATE INDEX idx_audit_user_date ON audit_logs(user_id, created_at);
CREATE INDEX idx_audit_organization_date ON audit_logs(organization_id, created_at);
CREATE INDEX idx_audit_event_type ON audit_logs(event_type, created_at);
```

### 2. Composite Indexes

```sql
-- Multi-column indexes for complex queries
CREATE INDEX idx_transactions_complex ON transactions(
    organization_id,
    portfolio_id,
    trade_date DESC,
    status
);

CREATE INDEX idx_holdings_complex ON holdings(
    organization_id,
    portfolio_id,
    asset_id
);

CREATE INDEX idx_audit_complex ON audit_logs(
    organization_id,
    event_type,
    created_at DESC
);
```

## 🔐 Security Features

### 1. Data Encryption

```sql
-- Encrypt sensitive columns
ALTER TABLE users ALTER COLUMN tax_id SET ENCRYPTED;
ALTER TABLE users ALTER COLUMN phone SET ENCRYPTED;
ALTER TABLE transactions ALTER COLUMN confirmation_number SET ENCRYPTED;

-- Encrypt JSONB fields containing sensitive data
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

### 2. Data Masking

```sql
-- Create views with masked sensitive data
CREATE VIEW users_masked AS
SELECT
    id,
    email,
    first_name,
    last_name,
    CASE
        WHEN current_user = email THEN phone
        ELSE '***-***-' || RIGHT(phone, 4)
    END as phone,
    created_at,
    updated_at
FROM users;
```

## 📈 Performance Optimization

### 1. Partitioning Strategy

```sql
-- Partition large tables by date
CREATE TABLE transactions_partitioned (
    LIKE transactions INCLUDING ALL
) PARTITION BY RANGE (trade_date);

-- Create monthly partitions
CREATE TABLE transactions_2024_01 PARTITION OF transactions_partitioned
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE transactions_2024_02 PARTITION OF transactions_partitioned
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');
```

### 2. Materialized Views

```sql
-- Portfolio summary materialized view
CREATE MATERIALIZED VIEW portfolio_summary AS
SELECT
    p.id as portfolio_id,
    p.name as portfolio_name,
    p.organization_id,
    COUNT(h.id) as total_holdings,
    SUM(h.market_value) as total_value,
    SUM(h.unrealized_gain_loss) as total_unrealized_gl,
    AVG(h.weight_percentage) as avg_weight
FROM portfolios p
LEFT JOIN holdings h ON p.id = h.portfolio_id
GROUP BY p.id, p.name, p.organization_id;

-- Refresh materialized views
REFRESH MATERIALIZED VIEW portfolio_summary;
```

## 🔄 Data Retention and Archival

### 1. Retention Policies

```sql
-- Create retention policy function
CREATE OR REPLACE FUNCTION cleanup_old_data()
RETURNS void AS $$
BEGIN
    -- Delete audit logs older than 7 years
    DELETE FROM audit_logs
    WHERE created_at < NOW() - INTERVAL '7 years';

    -- Archive old transactions
    INSERT INTO transactions_archive
    SELECT * FROM transactions
    WHERE trade_date < NOW() - INTERVAL '3 years';

    DELETE FROM transactions
    WHERE trade_date < NOW() - INTERVAL '3 years';
END;
$$ LANGUAGE plpgsql;

-- Schedule cleanup job
SELECT cron.schedule('cleanup-old-data', '0 2 * * 0', 'SELECT cleanup_old_data();');
```

### 2. Backup Strategy

```sql
-- Create backup function
CREATE OR REPLACE FUNCTION create_backup()
RETURNS void AS $$
BEGIN
    -- Full database backup
    PERFORM pg_dump(
        'familyoffice',
        '--format=custom',
        '--file=/backups/familyoffice_' || to_char(now(), 'YYYY_MM_DD_HH24_MI') || '.backup'
    );
END;
$$ LANGUAGE plpgsql;
```

## 📋 Database Maintenance

### 1. Regular Maintenance

```sql
-- Vacuum and analyze tables
VACUUM ANALYZE users;
VACUUM ANALYZE portfolios;
VACUUM ANALYZE transactions;
VACUUM ANALYZE audit_logs;

-- Update statistics
ANALYZE;

-- Reindex tables
REINDEX TABLE users;
REINDEX TABLE portfolios;
REINDEX TABLE transactions;
```

### 2. Health Monitoring

```sql
-- Database health check function
CREATE OR REPLACE FUNCTION check_database_health()
RETURNS TABLE(metric VARCHAR, value NUMERIC) AS $$
BEGIN
    RETURN QUERY
    SELECT 'total_users'::VARCHAR, COUNT(*)::NUMERIC FROM users WHERE deleted_at IS NULL
    UNION ALL
    SELECT 'total_portfolios'::VARCHAR, COUNT(*)::NUMERIC FROM portfolios WHERE status = 'active'
    UNION ALL
    SELECT 'total_transactions'::VARCHAR, COUNT(*)::NUMERIC FROM transactions WHERE status = 'executed'
    UNION ALL
    SELECT 'audit_logs_today'::VARCHAR, COUNT(*)::NUMERIC FROM audit_logs WHERE created_at >= CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;
```

---

**Document Version**: 1.0  
**Last Updated**: 2024-12-19  
**Next Review**: 2025-01-19  
**Owner**: Database Team
