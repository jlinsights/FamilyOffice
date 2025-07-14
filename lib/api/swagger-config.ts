// OpenAPI/Swagger configuration for API documentation
import { OpenAPIV3 } from 'openapi-types'

export const swaggerConfig: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'FamilyOffice S API',
    version: '1.0.0',
    description: '중소중견기업 법인 대표 전용 자산관리 플랫폼 API',
    contact: {
      name: 'FamilyOffice S Support',
      email: 'support@familyoffices.vip',
      url: 'https://familyoffices.vip/contact'
    },
    license: {
      name: 'Private',
    }
  },
  servers: [
    {
      url: 'https://familyoffices.vip/api',
      description: 'Production server'
    },
    {
      url: 'http://localhost:3000/api',
      description: 'Development server'
    }
  ],
  
  // Security schemes
  components: {
    securitySchemes: {
      ClerkAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Clerk authentication token'
      },
      ApiKey: {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
        description: 'API key for service-to-service communication'
      }
    },
    
    // Reusable schemas
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique user identifier'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address'
          },
          name: {
            type: 'string',
            description: 'User full name'
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'Account creation timestamp'
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            description: 'Last update timestamp'
          }
        },
        required: ['id', 'email', 'name']
      },
      
      UserStats: {
        type: 'object',
        properties: {
          totalUsers: {
            type: 'integer',
            description: 'Total number of registered users'
          },
          activeUsers: {
            type: 'integer',
            description: 'Number of active users (last 30 days)'
          },
          newUsersThisMonth: {
            type: 'integer',
            description: 'New users registered this month'
          },
          userGrowthRate: {
            type: 'number',
            format: 'float',
            description: 'Monthly user growth rate as percentage'
          }
        }
      },
      
      ConsultationRequest: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: '신청자 이름'
          },
          email: {
            type: 'string',
            format: 'email',
            description: '이메일 주소'
          },
          phone: {
            type: 'string',
            description: '연락처'
          },
          company: {
            type: 'string',
            description: '회사명'
          },
          position: {
            type: 'string',
            description: '직책'
          },
          businessType: {
            type: 'string',
            enum: ['manufacturing', 'construction', 'it', 'family_corp', 'other'],
            description: '업종'
          },
          assets: {
            type: 'string',
            enum: ['under_1b', '1b_5b', '5b_10b', '10b_50b', 'over_50b'],
            description: '자산 규모'
          },
          consultationType: {
            type: 'string',
            enum: ['asset_management', 'succession_planning', 'tax_strategy', 'risk_management'],
            description: '상담 분야'
          },
          message: {
            type: 'string',
            description: '상담 내용'
          }
        },
        required: ['name', 'email', 'phone', 'businessType', 'consultationType']
      },
      
      StockData: {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            description: 'Stock symbol (e.g., 005930.KS)'
          },
          name: {
            type: 'string',
            description: 'Company name'
          },
          price: {
            type: 'number',
            format: 'float',
            description: 'Current stock price'
          },
          change: {
            type: 'number',
            format: 'float',
            description: 'Price change'
          },
          changePercent: {
            type: 'number',
            format: 'float',
            description: 'Percentage change'
          },
          volume: {
            type: 'integer',
            description: 'Trading volume'
          },
          marketCap: {
            type: 'number',
            format: 'float',
            description: 'Market capitalization'
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            description: 'Data timestamp'
          }
        }
      },
      
      ForexData: {
        type: 'object',
        properties: {
          from: {
            type: 'string',
            description: 'Base currency code'
          },
          to: {
            type: 'string',
            description: 'Target currency code'
          },
          rate: {
            type: 'number',
            format: 'float',
            description: 'Exchange rate'
          },
          change: {
            type: 'number',
            format: 'float',
            description: 'Rate change'
          },
          changePercent: {
            type: 'number',
            format: 'float',
            description: 'Percentage change'
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            description: 'Data timestamp'
          }
        }
      },
      
      FinancialStatus: {
        type: 'object',
        properties: {
          yahooFinance: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                enum: ['operational', 'degraded', 'down'],
                description: 'Yahoo Finance API status'
              },
              latency: {
                type: 'number',
                description: 'Average response time in milliseconds'
              },
              lastCheck: {
                type: 'string',
                format: 'date-time',
                description: 'Last health check timestamp'
              }
            }
          },
          alphaVantage: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                enum: ['operational', 'degraded', 'down'],
                description: 'Alpha Vantage API status'
              },
              latency: {
                type: 'number',
                description: 'Average response time in milliseconds'
              },
              lastCheck: {
                type: 'string',
                format: 'date-time',
                description: 'Last health check timestamp'
              }
            }
          },
          cache: {
            type: 'object',
            properties: {
              memoryHitRate: {
                type: 'number',
                format: 'float',
                description: 'Memory cache hit rate'
              },
              redisHitRate: {
                type: 'number',
                format: 'float',
                description: 'Redis cache hit rate'
              }
            }
          }
        }
      },
      
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Error message'
          },
          code: {
            type: 'string',
            description: 'Error code'
          },
          details: {
            type: 'object',
            description: 'Additional error details'
          }
        },
        required: ['error']
      }
    }
  },
  
  // API paths
  paths: {
    '/admin/users/stats': {
      get: {
        tags: ['Admin'],
        summary: '사용자 통계 조회',
        description: '관리자를 위한 사용자 통계 정보를 반환합니다.',
        security: [{ ClerkAuth: [] }],
        responses: {
          '200': {
            description: '사용자 통계 데이터',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserStats'
                }
              }
            }
          },
          '401': {
            description: '인증 필요',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          },
          '403': {
            description: '관리자 권한 필요',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          }
        }
      }
    },
    
    '/admin/check-permission': {
      get: {
        tags: ['Admin'],
        summary: '관리자 권한 확인',
        description: '현재 사용자의 관리자 권한을 확인합니다.',
        security: [{ ClerkAuth: [] }],
        responses: {
          '200': {
            description: '권한 확인 결과',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    isAdmin: {
                      type: 'boolean',
                      description: '관리자 권한 여부'
                    },
                    email: {
                      type: 'string',
                      description: '사용자 이메일'
                    }
                  }
                }
              }
            }
          },
          '401': {
            description: '인증 필요',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          }
        }
      }
    },
    
    '/financial/stocks': {
      get: {
        tags: ['Financial'],
        summary: '주식 데이터 조회',
        description: '실시간 주식 가격 및 정보를 조회합니다.',
        parameters: [
          {
            name: 'symbol',
            in: 'query',
            description: '주식 심볼 (예: 005930.KS)',
            schema: {
              type: 'string'
            }
          },
          {
            name: 'korean',
            in: 'query',
            description: '한국 주요 종목 조회',
            schema: {
              type: 'boolean'
            }
          }
        ],
        responses: {
          '200': {
            description: '주식 데이터',
            content: {
              'application/json': {
                schema: {
                  oneOf: [
                    { $ref: '#/components/schemas/StockData' },
                    {
                      type: 'array',
                      items: { $ref: '#/components/schemas/StockData' }
                    }
                  ]
                }
              }
            }
          },
          '400': {
            description: '잘못된 요청',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          }
        }
      }
    },
    
    '/financial/forex': {
      get: {
        tags: ['Financial'],
        summary: '환율 데이터 조회',
        description: '실시간 환율 정보를 조회합니다.',
        parameters: [
          {
            name: 'from',
            in: 'query',
            description: '기준 통화',
            schema: {
              type: 'string'
            }
          },
          {
            name: 'to',
            in: 'query',
            description: '대상 통화',
            schema: {
              type: 'string'
            }
          },
          {
            name: 'major',
            in: 'query',
            description: '주요 통화쌍 조회',
            schema: {
              type: 'boolean'
            }
          }
        ],
        responses: {
          '200': {
            description: '환율 데이터',
            content: {
              'application/json': {
                schema: {
                  oneOf: [
                    { $ref: '#/components/schemas/ForexData' },
                    {
                      type: 'array',
                      items: { $ref: '#/components/schemas/ForexData' }
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },
    
    '/financial/status': {
      get: {
        tags: ['Financial'],
        summary: '금융 API 상태 확인',
        description: '금융 데이터 제공 API들의 상태를 확인합니다.',
        parameters: [
          {
            name: 'detailed',
            in: 'query',
            description: '상세 정보 포함',
            schema: {
              type: 'boolean'
            }
          }
        ],
        responses: {
          '200': {
            description: 'API 상태 정보',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/FinancialStatus'
                }
              }
            }
          }
        }
      }
    },
    
    '/sync-user': {
      post: {
        tags: ['User'],
        summary: '사용자 동기화',
        description: 'Clerk와 Supabase 간 사용자 데이터를 동기화합니다.',
        security: [{ ClerkAuth: [] }],
        responses: {
          '200': {
            description: '동기화 성공',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean'
                    },
                    user: {
                      $ref: '#/components/schemas/User'
                    }
                  }
                }
              }
            }
          },
          '401': {
            description: '인증 필요',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          }
        }
      }
    },
    
    '/webhooks/clerk': {
      post: {
        tags: ['Webhooks'],
        summary: 'Clerk 웹훅',
        description: 'Clerk 사용자 이벤트를 처리합니다.',
        security: [{ ApiKey: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                description: 'Clerk webhook payload'
              }
            }
          }
        },
        responses: {
          '200': {
            description: '웹훅 처리 성공'
          },
          '400': {
            description: '잘못된 웹훅 데이터'
          },
          '401': {
            description: '웹훅 인증 실패'
          }
        }
      }
    }
  },
  
  // Global security requirements
  security: [
    { ClerkAuth: [] }
  ],
  
  // Tags for grouping
  tags: [
    {
      name: 'Admin',
      description: '관리자 전용 API'
    },
    {
      name: 'Financial',
      description: '금융 데이터 API'
    },
    {
      name: 'User',
      description: '사용자 관리 API'
    },
    {
      name: 'Webhooks',
      description: '웹훅 엔드포인트'
    }
  ]
}

// Swagger UI configuration
export const swaggerUIConfig = {
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { color: #1e3a8a }
    .swagger-ui .scheme-container { background: #f8fafc; padding: 1rem; border-radius: 0.5rem }
  `,
  customSiteTitle: 'FamilyOffice S API Documentation',
  customfavIcon: '/favicon-32x32.png',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    tryItOutEnabled: true,
    filter: true,
    layout: 'BaseLayout',
    docExpansion: 'list',
    defaultModelRendering: 'model',
    showExtensions: true,
    showCommonExtensions: true,
  }
}