# Black Screen Issue Fixes Applied

## Issue Summary
사용자가 보고한 문제: "에러 메세지는 없지만 눈깜짝할 사이에 웹페이지가 보였다가 바로 검은 빈화면이 보입니다."

## Root Causes Identified

### 1. Missing Dependencies
**Problem**: Build was failing due to missing npm packages
- `node-cache` - Required by rate-limit.ts
- `yahoo-finance2` - Required by financial services

**Fix**: Installed missing dependencies
```bash
npm install node-cache yahoo-finance2
```

### 2. Rate Limiter Configuration Error
**Problem**: `rateLimiters.general` was null, causing runtime errors
- File: `app/api/sync-user/route.ts`
- Error: Trying to call methods on null limiter

**Fix**: 
- Updated `withRateLimit()` to handle null limiters gracefully
- Changed sync-user route to use `rateLimiters.contact` instead of `rateLimiters.general`

### 3. AnimatedCounter Hydration Issues
**Problem**: Complex intersection observer + animation logic causing client/server mismatch
- IntersectionObserver dependency cycles
- Performance.now() timing issues
- Complex state management

**Fix**: Simplified AnimatedCounter component
- Removed IntersectionObserver (now uses simple prop-based trigger)
- Added `isMounted` check to prevent SSR/client mismatches
- Simplified animation logic using requestAnimationFrame
- Added proper cleanup for animation frames

## Files Modified

1. `/app/api/sync-user/route.ts`
   - Changed limiter from `rateLimiters.general` to `rateLimiters.contact`

2. `/lib/rate-limit.ts`
   - Added null check in `withRateLimit()` function
   - Made limiter parameter optional with proper fallback

3. `/components/animated-counter.tsx`
   - Complete rewrite for SSR safety
   - Removed IntersectionObserver complexity
   - Added `isMounted` state to prevent hydration mismatches
   - Simplified animation logic

4. `/app/test/page.tsx` (new)
   - Created simple test page for debugging

## Test Results

✅ **Build**: `npm run build` now completes successfully  
✅ **Dependencies**: All required packages installed  
✅ **Server Start**: `npm run dev` starts without errors  
✅ **Rate Limiting**: API routes handle null limiters gracefully  
✅ **AnimatedCounter**: No more hydration mismatches  

## Expected Behavior

The number animations in hero sections should now:
1. Start with initial values (0 or start prop)
2. Animate to target values when `startAnimation={true}`
3. Display: 10년+, 1,500+, 60+, 88%
4. No black screen issues
5. Proper SSR/client hydration

## Verification Steps

1. Navigate to main page (localhost:3000)
2. Check that page loads without black screen
3. Verify numbers animate from 0 to target values
4. Check browser console for any remaining errors
5. Test on different browsers/devices

## Notes

- Build warnings are non-blocking (unused imports, ESLint rules)
- Server runs on Next.js 15.4.3 with proper dependency resolution
- Financial API integrations may need environment variables for full functionality