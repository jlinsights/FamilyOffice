# FamilyOffice Platform - API Reference

## 📚 API Overview

The FamilyOffice platform provides a comprehensive REST API for managing family office operations, including portfolio management, transaction processing, reporting, user management, and external integrations.

### 🔗 Base URLs

| Environment | Base URL                                      | Description            |
| ----------- | --------------------------------------------- | ---------------------- |
| Development | `http://localhost:3000/api/v1`                | Local development      |
| Staging     | `https://staging-api.familyoffice.com/api/v1` | Pre-production testing |
| Production  | `https://api.familyoffice.com/api/v1`         | Live production        |

### 🔐 Authentication

All API endpoints require authentication using JWT tokens.

```http
Authorization: Bearer <your-jwt-token>
```

### 📊 Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "meta": {
    "timestamp": "2024-12-19T10:30:00Z",
    "requestId": "req_123456789",
    "version": "1.0.0"
  },
  "errors": null
}
```

## 🏦 Portfolio Management API

### Base URL: `/portfolios`

#### Get All Portfolios

```http
GET /portfolios
```

**Query Parameters:**

- `family_id` (string): Filter by family ID
- `status` (string): Filter by status (active, inactive, archived)
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)

**Response:**

```json
{
  "success": true,
  "data": {
    "portfolios": [
      {
        "id": "port_123456789",
        "name": "Main Family Portfolio",
        "family_id": "fam_123456789",
        "status": "active",
        "total_value": 50000000,
        "currency": "USD",
        "created_at": "2024-01-01T00:00:00Z",
        "updated_at": "2024-12-19T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1,
      "pages": 1
    }
  }
}
```

#### Create Portfolio

```http
POST /portfolios
```

**Request Body:**

```json
{
  "name": "New Portfolio",
  "family_id": "fam_123456789",
  "currency": "USD",
  "description": "Portfolio description",
  "risk_profile": "moderate",
  "investment_horizon": "long_term"
}
```

#### Get Portfolio by ID

```http
GET /portfolios/{portfolio_id}
```

#### Update Portfolio

```http
PUT /portfolios/{portfolio_id}
```

#### Delete Portfolio

```http
DELETE /portfolios/{portfolio_id}
```

#### Get Portfolio Performance

```http
GET /portfolios/{portfolio_id}/performance
```

**Query Parameters:**

- `period` (string): Time period (1m, 3m, 6m, 1y, 3y, 5y, all)
- `benchmark` (string): Benchmark index (optional)

**Response:**

```json
{
  "success": true,
  "data": {
    "portfolio_id": "port_123456789",
    "period": "1y",
    "total_return": 12.5,
    "annualized_return": 11.8,
    "volatility": 8.2,
    "sharpe_ratio": 1.44,
    "max_drawdown": -5.2,
    "benchmark_comparison": {
      "benchmark_return": 10.2,
      "excess_return": 2.3,
      "information_ratio": 0.28
    },
    "holdings": [
      {
        "asset_id": "asset_123",
        "name": "Apple Inc.",
        "ticker": "AAPL",
        "weight": 15.5,
        "value": 7750000,
        "return": 18.2
      }
    ]
  }
}
```

#### Rebalance Portfolio

```http
POST /portfolios/{portfolio_id}/rebalance
```

**Request Body:**

```json
{
  "target_allocations": [
    {
      "asset_class": "equity",
      "target_weight": 60,
      "tolerance": 5
    },
    {
      "asset_class": "fixed_income",
      "target_weight": 30,
      "tolerance": 3
    },
    {
      "asset_class": "alternatives",
      "target_weight": 10,
      "tolerance": 2
    }
  ],
  "execution_strategy": "gradual",
  "max_trade_size": 1000000
}
```

## 💰 Transaction Processing API

### Base URL: `/transactions`

#### Get All Transactions

```http
GET /transactions
```

**Query Parameters:**

- `portfolio_id` (string): Filter by portfolio
- `type` (string): Transaction type (buy, sell, dividend, corporate_action)
- `status` (string): Status (pending, executed, settled, cancelled)
- `date_from` (string): Start date (ISO 8601)
- `date_to` (string): End date (ISO 8601)

#### Create Transaction

```http
POST /transactions
```

**Request Body:**

```json
{
  "portfolio_id": "port_123456789",
  "asset_id": "asset_123",
  "type": "buy",
  "quantity": 1000,
  "price": 150.5,
  "currency": "USD",
  "trade_date": "2024-12-19",
  "settlement_date": "2024-12-21",
  "broker": "Goldman Sachs",
  "notes": "Regular rebalancing"
}
```

#### Get Transaction by ID

```http
GET /transactions/{transaction_id}
```

#### Update Transaction

```http
PUT /transactions/{transaction_id}
```

#### Cancel Transaction

```http
DELETE /transactions/{transaction_id}
```

#### Batch Transaction Processing

```http
POST /transactions/batch
```

**Request Body:**

```json
{
  "transactions": [
    {
      "portfolio_id": "port_123456789",
      "asset_id": "asset_123",
      "type": "buy",
      "quantity": 1000,
      "price": 150.5
    },
    {
      "portfolio_id": "port_123456789",
      "asset_id": "asset_456",
      "type": "sell",
      "quantity": 500,
      "price": 75.25
    }
  ],
  "execution_strategy": "all_or_none"
}
```

## 📊 Reporting API

### Base URL: `/reports`

#### Get All Reports

```http
GET /reports
```

#### Create Report

```http
POST /reports
```

**Request Body:**

```json
{
  "name": "Monthly Performance Report",
  "type": "performance",
  "portfolio_ids": ["port_123456789"],
  "parameters": {
    "period": "1m",
    "include_benchmarks": true,
    "include_holdings": true
  },
  "schedule": {
    "frequency": "monthly",
    "day_of_month": 1,
    "recipients": ["user@familyoffice.com"]
  }
}
```

#### Get Report by ID

```http
GET /reports/{report_id}
```

#### Update Report

```http
PUT /reports/{report_id}
```

#### Delete Report

```http
DELETE /reports/{report_id}
```

#### Generate Report

```http
POST /reports/{report_id}/generate
```

#### Export Report

```http
GET /reports/{report_id}/export
```

**Query Parameters:**

- `format` (string): Export format (pdf, excel, csv)

## 👥 User Management API

### Base URL: `/users`

#### Authentication

##### Login

```http
POST /auth/login
```

**Request Body:**

```json
{
  "email": "user@familyoffice.com",
  "password": "secure_password",
  "mfa_code": "123456"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123456789",
      "email": "user@familyoffice.com",
      "name": "John Doe",
      "role": "portfolio_manager",
      "family_id": "fam_123456789"
    },
    "tokens": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expires_in": 3600
    }
  }
}
```

##### Refresh Token

```http
POST /auth/refresh
```

**Request Body:**

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

##### Logout

```http
POST /auth/logout
```

#### User Management

##### Get All Users

```http
GET /users
```

##### Create User

```http
POST /users
```

**Request Body:**

```json
{
  "email": "newuser@familyoffice.com",
  "name": "Jane Smith",
  "role": "family_member",
  "family_id": "fam_123456789",
  "permissions": ["read_portfolio", "read_reports"]
}
```

##### Get User by ID

```http
GET /users/{user_id}
```

##### Update User

```http
PUT /users/{user_id}
```

##### Delete User

```http
DELETE /users/{user_id}
```

#### Multi-Factor Authentication

##### Setup MFA

```http
POST /users/{user_id}/2fa/setup
```

**Response:**

```json
{
  "success": true,
  "data": {
    "qr_code": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "secret": "JBSWY3DPEHPK3PXP",
    "backup_codes": ["123456", "234567", "345678", "456789", "567890"]
  }
}
```

##### Verify MFA

```http
POST /users/{user_id}/2fa/verify
```

**Request Body:**

```json
{
  "code": "123456"
}
```

#### Family Management

##### Get Family Members

```http
GET /families/{family_id}/members
```

##### Add Family Member

```http
POST /families/{family_id}/members
```

## 🔗 Integration Hub API

### Base URL: `/integrations`

#### Get All Integrations

```http
GET /integrations
```

#### Create Integration

```http
POST /integrations
```

**Request Body:**

```json
{
  "name": "Bloomberg Market Data",
  "type": "market_data",
  "provider": "bloomberg",
  "configuration": {
    "api_key": "your_api_key",
    "endpoint": "https://api.bloomberg.com/v1",
    "rate_limit": 1000
  },
  "webhooks": [
    {
      "event": "price_update",
      "url": "https://api.familyoffice.com/webhooks/bloomberg"
    }
  ]
}
```

#### Get Integration by ID

```http
GET /integrations/{integration_id}
```

#### Update Integration

```http
PUT /integrations/{integration_id}
```

#### Delete Integration

```http
DELETE /integrations/{integration_id}
```

#### Test Integration

```http
POST /integrations/{integration_id}/test
```

#### Sync Data

```http
POST /integrations/{integration_id}/sync
```

**Request Body:**

```json
{
  "data_types": ["prices", "corporate_actions"],
  "date_from": "2024-12-01",
  "date_to": "2024-12-19"
}
```

#### Get Sync Status

```http
GET /sync-jobs/{job_id}/status
```

## 🔒 Security API

### Base URL: `/security`

#### Audit Trail

##### Get Audit Logs

```http
GET /audit/logs
```

**Query Parameters:**

- `user_id` (string): Filter by user
- `event_type` (string): Filter by event type
- `date_from` (string): Start date
- `date_to` (string): End date
- `severity` (string): Log severity (info, warning, error)

#### Privileged Access Management

##### Request Elevated Access

```http
POST /pam/requests
```

**Request Body:**

```json
{
  "resource": "portfolio_management",
  "reason": "Emergency rebalancing required",
  "duration": 3600,
  "approvers": ["admin@familyoffice.com"]
}
```

##### Approve Access Request

```http
PUT /pam/requests/{request_id}/approve
```

**Request Body:**

```json
{
  "approved_by": "admin@familyoffice.com",
  "notes": "Approved for emergency rebalancing"
}
```

## 📈 Error Handling

### Error Response Format

```json
{
  "success": false,
  "data": null,
  "errors": [
    {
      "code": "VALIDATION_ERROR",
      "message": "Invalid input parameters",
      "field": "email",
      "details": "Email format is invalid"
    }
  ],
  "meta": {
    "timestamp": "2024-12-19T10:30:00Z",
    "requestId": "req_123456789"
  }
}
```

### Common Error Codes

| Code                   | HTTP Status | Description                       |
| ---------------------- | ----------- | --------------------------------- |
| `AUTHENTICATION_ERROR` | 401         | Invalid or missing authentication |
| `AUTHORIZATION_ERROR`  | 403         | Insufficient permissions          |
| `VALIDATION_ERROR`     | 400         | Invalid request parameters        |
| `NOT_FOUND`            | 404         | Resource not found                |
| `RATE_LIMIT_EXCEEDED`  | 429         | Too many requests                 |
| `INTERNAL_ERROR`       | 500         | Internal server error             |

## 📊 Rate Limiting

API requests are rate-limited to ensure system stability:

- **Authentication endpoints**: 5 requests per minute
- **Read operations**: 1000 requests per hour
- **Write operations**: 100 requests per hour
- **Batch operations**: 10 requests per hour

Rate limit headers are included in responses:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640000000
```

## 🔄 Webhooks

### Webhook Events

The platform supports webhooks for real-time notifications:

- `portfolio.updated`: Portfolio data changed
- `transaction.executed`: Transaction executed
- `report.generated`: Report generation completed
- `user.created`: New user created
- `security.alert`: Security alert triggered

### Webhook Format

```json
{
  "event": "portfolio.updated",
  "timestamp": "2024-12-19T10:30:00Z",
  "data": {
    "portfolio_id": "port_123456789",
    "changes": {
      "total_value": {
        "old": 50000000,
        "new": 51000000
      }
    }
  },
  "signature": "sha256=abc123..."
}
```

---

_This API documentation is maintained by the Platform Development Team and is updated with each release._
