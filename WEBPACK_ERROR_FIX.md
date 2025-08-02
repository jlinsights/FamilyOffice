# Webpack Module Loading Error Fix

## Error Summary
```
TypeError: Cannot read properties of undefined (reading 'call')
    at options.factory (webpack.js:692:31)
    at __webpack_require__ (webpack.js:29:33)
```

## Root Cause
The webpack configuration was incorrectly handling server-side only modules like `yahoo-finance2` and `node-cache` on the client side. The `config.externals.push()` approach was causing webpack to try to load these modules as external dependencies, but they were undefined in the browser environment.

## Solution Applied

### 1. Changed Webpack Externals Strategy
**Before** (problematic):
```javascript
// yahoo-finance2 관련 모듈 처리
config.externals = config.externals || []
if (!isServer) {
  config.externals.push('yahoo-finance2')
}
```

**After** (fixed):
```javascript
// Node.js 전용 모듈들을 클라이언트에서 제외
if (!isServer) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    'yahoo-finance2': false,
    'node-cache': false,
    'fs': false,
    'stream': false,
    'path': false,
    'os': false,
    'crypto': false,
  }
}
```

### 2. Why This Works Better
- **Externals**: Tells webpack "this module exists externally, load it at runtime"
- **Fallback: false**: Tells webpack "this module doesn't exist on client-side, replace with empty"
- **Result**: No runtime errors when server-only modules are referenced

## Key Technical Details

### 1. Server-Side Module Safety
The financial modules already had proper server-side checks:
```javascript
// From yahoo-finance.ts
const loadYahooFinance = async () => {
  // 서버 사이드에서만 로드
  if (typeof window !== 'undefined') {
    console.warn('Yahoo Finance는 서버 사이드에서만 사용됩니다.');
    return null;
  }
  // ... rest of logic
}
```

### 2. Build Process Verification
- ✅ Build completes successfully: `npm run build`
- ✅ No webpack module loading errors
- ✅ Development server starts: `npm run dev` (port 3001)
- ✅ All server-only modules properly excluded from client bundle

## Other Fixes Applied in Session

### 1. Missing Dependencies
```bash
npm install node-cache yahoo-finance2
```

### 2. Rate Limiter Null Safety
```javascript
// lib/rate-limit.ts - Added null checks
export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  limiter?: RateLimiter | null  // Made optional
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    // Skip rate limiting if no limiter provided
    if (!limiter) {
      return handler(req)
    }
    // ... rest of logic
  }
}
```

### 3. AnimatedCounter SSR Safety
```javascript
// components/animated-counter.tsx - Added isMounted check
const [isMounted, setIsMounted] = useState(false)

// SSR 방지: 마운트되기 전에는 시작 값 표시
if (!isMounted) {
  return (
    <span className={className}>
      {prefix}{formatDisplayNumber(start)}{suffix}
    </span>
  )
}
```

## Test Results

### ✅ Fixed Issues
1. **Black Screen**: Page now loads properly without black screen
2. **Webpack Errors**: No more "Cannot read properties of undefined" errors  
3. **Animation**: Number animations work (10년+, 1,500+, 60+, 88%)
4. **Build Process**: Clean build without module resolution errors

### 🎯 Expected Behavior
- Main page loads at `http://localhost:3001`
- Hero section displays with animated counters
- No console errors related to webpack module loading
- Proper SSR/client hydration without mismatches

## Technical Notes

- **Port Change**: Server now runs on 3001 due to port 3000 conflict
- **Build Warnings**: ESLint warnings are non-blocking (unused imports)
- **Financial APIs**: Only work on server-side API routes, not client components
- **Cache Cleared**: `.next` and `node_modules/.cache` cleared for clean build

This fix ensures proper separation between server-only and client-side code, preventing webpack from trying to bundle Node.js modules for the browser.