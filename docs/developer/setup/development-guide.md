# FamilyOffice Platform - Developer Guide

## 👨‍💻 Developer Overview

This guide provides comprehensive instructions for developers working on the FamilyOffice platform, including setup procedures, coding standards, testing practices, and deployment workflows.

### 🎯 Development Philosophy

- **Quality First**: Write clean, maintainable, and well-tested code
- **Security by Design**: Implement security best practices in every component
- **Performance Optimization**: Build fast, scalable, and efficient systems
- **Compliance Ready**: Ensure all code meets regulatory requirements
- **Team Collaboration**: Follow consistent standards and practices

## 🚀 Development Environment Setup

### 1. Prerequisites

#### System Requirements

- **Operating System**: macOS 12+, Ubuntu 20.04+, Windows 11+
- **Node.js**: Version 18.0.0 or higher
- **Docker**: Version 20.10.0 or higher
- **Git**: Version 2.30.0 or higher
- **IDE**: VS Code (recommended) or IntelliJ IDEA

#### Required Tools

```bash
# Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Git
sudo apt-get update
sudo apt-get install git

# Install VS Code
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt-get update
sudo apt-get install code
```

### 2. Project Setup

#### Clone Repository

```bash
# Clone the repository
git clone https://github.com/familyoffice/platform.git
cd platform

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
```

#### Environment Configuration

```bash
# Development environment
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://localhost:5432/familyoffice_dev
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_here
MFA_SECRET=your_mfa_secret_here

# API Keys (for development)
BLOOMBERG_API_KEY=your_bloomberg_key
REUTERS_API_KEY=your_reuters_key
SENTRY_DSN=your_sentry_dsn
```

#### Database Setup

```bash
# Start PostgreSQL with Docker
docker run --name postgres-dev \
  -e POSTGRES_DB=familyoffice_dev \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:14

# Start Redis with Docker
docker run --name redis-dev \
  -p 6379:6379 \
  -d redis:7-alpine

# Run database migrations
npm run migrate:dev
```

### 3. Development Tools

#### VS Code Extensions

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "ms-vscode.vscode-docker"
  ]
}
```

#### Git Hooks

```bash
# Install Husky for Git hooks
npm install --save-dev husky lint-staged

# Setup pre-commit hooks
npx husky install
npx husky add .husky/pre-commit "npm run lint-staged"
npx husky add .husky/commit-msg "npm run lint:commit"
```

## 📝 Coding Standards

### 1. TypeScript Standards

#### Code Style

```typescript
// Use strict TypeScript configuration
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}

// Prefer interfaces over types for object shapes
interface Portfolio {
  id: string;
  name: string;
  familyId: string;
  status: PortfolioStatus;
  totalValue: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

// Use enums for constants
enum PortfolioStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived'
}

// Use generics for reusable components
interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta: {
    timestamp: string;
    requestId: string;
    version: string;
  };
  errors: string[] | null;
}
```

#### Function Standards

```typescript
// Use async/await for asynchronous operations
async function getPortfolio(id: string): Promise<Portfolio> {
  try {
    const portfolio = await portfolioRepository.findById(id);
    if (!portfolio) {
      throw new NotFoundError(`Portfolio ${id} not found`);
    }
    return portfolio;
  } catch (error) {
    logger.error('Failed to get portfolio', { id, error });
    throw error;
  }
}

// Use descriptive function names
function calculatePortfolioReturn(
  portfolio: Portfolio,
  period: TimePeriod
): number {
  // Implementation
}

// Use proper error handling
function validatePortfolioData(data: Partial<Portfolio>): void {
  if (!data.name) {
    throw new ValidationError('Portfolio name is required');
  }
  if (data.totalValue && data.totalValue < 0) {
    throw new ValidationError('Portfolio value cannot be negative');
  }
}
```

### 2. React Standards

#### Component Structure

```typescript
// Use functional components with hooks
import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/hooks/usePortfolio';
import { PortfolioCard } from '@/components/PortfolioCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';

interface PortfolioListProps {
  familyId: string;
  onPortfolioSelect: (portfolio: Portfolio) => void;
}

export const PortfolioList: React.FC<PortfolioListProps> = ({
  familyId,
  onPortfolioSelect,
}) => {
  const { portfolios, loading, error } = usePortfolio(familyId);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {portfolios.map((portfolio) => (
        <PortfolioCard
          key={portfolio.id}
          portfolio={portfolio}
          onClick={() => onPortfolioSelect(portfolio)}
        />
      ))}
    </div>
  );
};
```

#### Custom Hooks

```typescript
// Create reusable custom hooks
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export function usePortfolio(familyId: string) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPortfolios() {
      try {
        setLoading(true);
        const response = await api.get(`/portfolios?family_id=${familyId}`);
        setPortfolios(response.data.portfolios);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolios();
  }, [familyId]);

  return { portfolios, loading, error };
}
```

### 3. API Standards

#### RESTful API Design

```typescript
// Use consistent HTTP methods
// GET /portfolios - List portfolios
// GET /portfolios/{id} - Get portfolio
// POST /portfolios - Create portfolio
// PUT /portfolios/{id} - Update portfolio
// DELETE /portfolios/{id} - Delete portfolio

// Use proper HTTP status codes
enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

// Use consistent response format
interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta: {
    timestamp: string;
    requestId: string;
    version: string;
  };
  errors: string[] | null;
}
```

#### Error Handling

```typescript
// Create custom error classes
export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

// Use error middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('API Error', { error: error.message, stack: error.stack });

  if (error instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      errors: [
        {
          code: 'VALIDATION_ERROR',
          message: error.message,
          field: error.field,
        },
      ],
    });
  }

  if (error instanceof NotFoundError) {
    return res.status(404).json({
      success: false,
      errors: [{ code: 'NOT_FOUND', message: error.message }],
    });
  }

  return res.status(500).json({
    success: false,
    errors: [{ code: 'INTERNAL_ERROR', message: 'Internal server error' }],
  });
});
```

### 4. Security Standards

#### Input Validation

```typescript
// Use validation libraries
import { z } from 'zod';

const PortfolioSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  familyId: z.string().uuid('Invalid family ID'),
  currency: z.enum(['USD', 'EUR', 'GBP', 'JPY']),
  riskProfile: z.enum(['conservative', 'moderate', 'aggressive']),
});

// Validate input data
function createPortfolio(data: unknown): Portfolio {
  const validatedData = PortfolioSchema.parse(data);
  return portfolioService.create(validatedData);
}
```

#### Authentication and Authorization

```typescript
// Use JWT for authentication
import jwt from 'jsonwebtoken';

interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  familyId: string;
  exp: number;
}

function generateToken(payload: Omit<JWTPayload, 'exp'>): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
}

function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
}

// Use role-based access control
function requireRole(roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        errors: [{ code: 'FORBIDDEN', message: 'Insufficient permissions' }],
      });
    }
    next();
  };
}
```

## 🧪 Testing Standards

### 1. Unit Testing

#### Test Structure

```typescript
// Use Jest for unit testing
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { PortfolioRepository } from '@/repositories/PortfolioRepository';
import { PortfolioService } from '@/services/PortfolioService';

describe('PortfolioService', () => {
  let portfolioService: PortfolioService;
  let mockRepository: jest.Mocked<PortfolioRepository>;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<PortfolioRepository>;

    portfolioService = new PortfolioService(mockRepository);
  });

  describe('getPortfolio', () => {
    it('should return portfolio when found', async () => {
      // Arrange
      const portfolioId = 'port_123';
      const expectedPortfolio: Portfolio = {
        id: portfolioId,
        name: 'Test Portfolio',
        familyId: 'fam_123',
        status: PortfolioStatus.ACTIVE,
        totalValue: 1000000,
        currency: 'USD',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepository.findById.mockResolvedValue(expectedPortfolio);

      // Act
      const result = await portfolioService.getPortfolio(portfolioId);

      // Assert
      expect(result).toEqual(expectedPortfolio);
      expect(mockRepository.findById).toHaveBeenCalledWith(portfolioId);
    });

    it('should throw error when portfolio not found', async () => {
      // Arrange
      const portfolioId = 'port_123';
      mockRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(portfolioService.getPortfolio(portfolioId)).rejects.toThrow(
        'Portfolio not found'
      );
    });
  });
});
```

### 2. Integration Testing

#### API Testing

```typescript
// Use Supertest for API testing
import request from 'supertest';
import { app } from '@/app';
import { createTestUser, createTestPortfolio } from '@/test/helpers';

describe('Portfolio API', () => {
  let authToken: string;
  let testUser: User;

  beforeEach(async () => {
    testUser = await createTestUser();
    authToken = generateTestToken(testUser);
  });

  describe('GET /portfolios', () => {
    it('should return user portfolios', async () => {
      // Arrange
      const portfolio = await createTestPortfolio(testUser.familyId);

      // Act
      const response = await request(app)
        .get('/portfolios')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      // Assert
      expect(response.body.success).toBe(true);
      expect(response.body.data.portfolios).toHaveLength(1);
      expect(response.body.data.portfolios[0].id).toBe(portfolio.id);
    });

    it('should return 401 without authentication', async () => {
      await request(app).get('/portfolios').expect(401);
    });
  });
});
```

### 3. End-to-End Testing

#### E2E Testing with Playwright

```typescript
// Use Playwright for E2E testing
import { test, expect } from '@playwright/test';

test.describe('Portfolio Management', () => {
  test('should create new portfolio', async ({ page }) => {
    // Navigate to portfolio page
    await page.goto('/portfolios');

    // Click create portfolio button
    await page.click('[data-testid="create-portfolio-btn"]');

    // Fill portfolio form
    await page.fill('[data-testid="portfolio-name"]', 'Test Portfolio');
    await page.selectOption('[data-testid="portfolio-currency"]', 'USD');
    await page.selectOption('[data-testid="portfolio-risk"]', 'moderate');

    // Submit form
    await page.click('[data-testid="submit-btn"]');

    // Verify portfolio created
    await expect(page.locator('[data-testid="portfolio-list"]')).toContainText(
      'Test Portfolio'
    );
  });
});
```

## 🔄 Development Workflow

### 1. Git Workflow

#### Branch Naming

```bash
# Feature branches
git checkout -b feature/portfolio-management

# Bug fix branches
git checkout -b fix/login-authentication

# Hotfix branches
git checkout -b hotfix/security-patch

# Release branches
git checkout -b release/v1.2.3
```

#### Commit Standards

```bash
# Use conventional commits
git commit -m "feat: add portfolio creation functionality"
git commit -m "fix: resolve authentication token issue"
git commit -m "docs: update API documentation"
git commit -m "test: add unit tests for portfolio service"
git commit -m "refactor: improve error handling in API"
```

### 2. Code Review Process

#### Pull Request Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Security

- [ ] Security review completed
- [ ] No security vulnerabilities introduced

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
- [ ] Performance impact assessed
```

### 3. Deployment Pipeline

#### CI/CD Configuration

```yaml
# GitHub Actions workflow
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:integration
      - run: npm run test:e2e

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm audit
      - run: npm run security:scan

  build:
    needs: [test, security]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: docker build -t familyoffice/platform:${{ github.sha }} .
      - run: docker push familyoffice/platform:${{ github.sha }}

  deploy:
    needs: [build]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - run: kubectl set image deployment/familyoffice-platform app=familyoffice/platform:${{ github.sha }}
```

## 📚 Documentation Standards

### 1. Code Documentation

#### JSDoc Comments

```typescript
/**
 * Calculates the total return of a portfolio over a specified period
 * @param portfolio - The portfolio to calculate return for
 * @param period - The time period for calculation
 * @param benchmark - Optional benchmark for comparison
 * @returns The total return percentage
 * @throws {ValidationError} When portfolio data is invalid
 * @example
 * const return = calculatePortfolioReturn(portfolio, '1y', 'SPY');
 */
function calculatePortfolioReturn(
  portfolio: Portfolio,
  period: TimePeriod,
  benchmark?: string
): number {
  // Implementation
}
```

#### README Files

````markdown
# Portfolio Service

Handles portfolio management operations including creation, updates, and performance calculations.

## Features

- Portfolio CRUD operations
- Performance calculation
- Risk assessment
- Benchmark comparison

## Usage

```typescript
import { PortfolioService } from '@/services/PortfolioService';

const portfolioService = new PortfolioService();
const portfolio = await portfolioService.getPortfolio('port_123');
```
````

## API Reference

### getPortfolio(id: string): Promise<Portfolio>

Retrieves a portfolio by ID.

**Parameters:**

- `id`: Portfolio identifier

**Returns:** Promise resolving to Portfolio object

**Throws:** NotFoundError if portfolio doesn't exist

````

### 2. API Documentation

#### OpenAPI Specification
```yaml
openapi: 3.0.0
info:
  title: FamilyOffice Platform API
  version: 1.0.0
  description: API for family office portfolio management

paths:
  /portfolios:
    get:
      summary: List portfolios
      security:
        - bearerAuth: []
      parameters:
        - name: family_id
          in: query
          schema:
            type: string
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PortfolioList'
````

## 🚨 Security Guidelines

### 1. Secure Coding Practices

#### Input Sanitization

```typescript
// Always sanitize user input
import DOMPurify from 'dompurify';

function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input);
}

// Use parameterized queries
const query = 'SELECT * FROM portfolios WHERE family_id = $1';
const result = await db.query(query, [familyId]);
```

#### Authentication Best Practices

```typescript
// Implement rate limiting
import rateLimit from 'express-rate-limit';

// Use secure session management
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 2. Data Protection

#### Encryption

```typescript
// Encrypt sensitive data
import crypto from 'crypto';

function encryptData(data: string): string {
  const algorithm = 'aes-256-gcm';
  const key = crypto.scryptSync(process.env.ENCRYPTION_KEY!, 'salt', 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(algorithm, key);

  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`;
}
```

---

_This developer guide is maintained by the Development Team and updated with each major release._
