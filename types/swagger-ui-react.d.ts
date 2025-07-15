declare module 'swagger-ui-react' {
  import { ComponentType } from 'react'
  
  interface SwaggerUIProps {
    url?: string
    spec?: object
    deepLinking?: boolean
    displayOperationId?: boolean
    defaultModelsExpandDepth?: number
    defaultModelExpandDepth?: number
    defaultModelRendering?: string
    displayRequestDuration?: boolean
    docExpansion?: string
    filter?: boolean | string
    layout?: string
    showExtensions?: boolean
    showCommonExtensions?: boolean
    tryItOutEnabled?: boolean
    requestInterceptor?: (req: any) => any
    onComplete?: (system: any) => void
    [key: string]: any
  }
  
  const SwaggerUI: ComponentType<SwaggerUIProps>
  export default SwaggerUI
}