'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

// Dynamically import SwaggerUI to avoid SSR issues
const SwaggerUI = dynamic(
  () => import('swagger-ui-react').then((mod) => ({ default: mod.default })),
  {
    ssr: false,
    loading: () => (
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-2">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    ),
  }
)

import 'swagger-ui-react/swagger-ui.css'

// Disable static generation for this page
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function SwaggerPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            FamilyOffice S API Documentation
          </h1>
          <p className="text-gray-600 mt-1">
            중소중견기업 법인 대표 전용 자산관리 플랫폼 API 문서
          </p>
        </div>
      </div>
      
      <div className="container mx-auto">
        <SwaggerUI
          url="/api/docs"
          deepLinking={true}
          displayOperationId={false}
          defaultModelsExpandDepth={1}
          defaultModelExpandDepth={1}
          defaultModelRendering="example"
          displayRequestDuration={true}
          docExpansion="list"
          filter={true}
          layout="BaseLayout"
          showExtensions={true}
          showCommonExtensions={true}
          tryItOutEnabled={true}
          requestInterceptor={(req) => {
            // Add authentication headers if available
            const token = localStorage.getItem('clerk-db-jwt')
            if (token) {
              req.headers.Authorization = `Bearer ${token}`
            }
            return req
          }}
          onComplete={(_system) => {
            console.log('Swagger UI loaded successfully')
          }}
        />
      </div>
      
      <style jsx global>{`
        .swagger-ui .topbar {
          display: none;
        }
        
        .swagger-ui .info .title {
          color: #1e3a8a;
        }
        
        .swagger-ui .scheme-container {
          background: #f8fafc;
          padding: 1rem;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
        
        .swagger-ui .btn.authorize {
          background-color: #1e3a8a;
          border-color: #1e3a8a;
        }
        
        .swagger-ui .btn.authorize:hover {
          background-color: #1e40af;
        }
        
        .swagger-ui .opblock.opblock-get {
          border-color: #059669;
          background: rgba(5, 150, 105, 0.1);
        }
        
        .swagger-ui .opblock.opblock-post {
          border-color: #dc2626;
          background: rgba(220, 38, 38, 0.1);
        }
        
        .swagger-ui .opblock.opblock-put {
          border-color: #d97706;
          background: rgba(217, 119, 6, 0.1);
        }
        
        .swagger-ui .opblock.opblock-delete {
          border-color: #dc2626;
          background: rgba(220, 38, 38, 0.1);
        }
        
        .swagger-ui .response-col_status {
          font-family: monospace;
        }
        
        .swagger-ui .parameter__name {
          font-weight: 600;
        }
        
        .swagger-ui .model-title {
          color: #1e3a8a;
          font-weight: 600;
        }
        
        .swagger-ui .prop-type {
          color: #059669;
        }
        
        .swagger-ui .prop-format {
          color: #6b7280;
        }
      `}</style>
    </div>
  )
}