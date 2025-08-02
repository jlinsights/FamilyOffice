# 헤더 서브메뉴 디버깅 가이드

## 현재 상태
사용자가 보고한 문제: "헤더 메뉴에 '프로그램' 아래 서브 메뉴들이 마우스를 움직여도 나타나지 않고 있습니다."

## 적용된 수정사항

### 1. 디버깅 로그 추가
```javascript
const handleMenuHover = useCallback((label: string) => {
  console.log('Menu hover:', label) // 디버깅용
  setHoveredMenu(label)
}, [])

const handleMenuLeave = useCallback(() => {
  console.log('Menu leave') // 디버깅용
  setHoveredMenu(null)
}, [])

// hoveredMenu 상태 변화 로깅
console.log('Current hoveredMenu state:', hoveredMenu)
```

### 2. 서브메뉴 스타일 개선
**변경 전:**
```javascript
{hoveredMenu === item.label && (
  <div className="absolute top-full left-0 pt-2 w-80 z-50">
```

**변경 후:**
```javascript
<div className={`absolute top-full left-0 pt-2 w-80 transition-all duration-200 ${
  hoveredMenu === item.label 
    ? 'opacity-100 visible translate-y-0 z-[60]' 
    : 'opacity-0 invisible translate-y-2 z-[60] pointer-events-none'
}`}>
```

### 3. 호버 영역 개선
- 메뉴 버튼에 직접 `onMouseEnter` 추가
- z-index를 60으로 명시적 설정
- transition 애니메이션 추가

## 테스트 방법

### 브라우저에서 확인:
1. `http://localhost:3000` 접속
2. 개발자 도구 콘솔 열기
3. '프로그램' 메뉴에 마우스 호버
4. 콘솔에서 다음 로그 확인:
   - "Menu hover: 프로그램"
   - "Current hoveredMenu state: 프로그램"
5. 서브메뉴가 나타나는지 확인

### 예상되는 서브메뉴 항목들:
- 프로그램 전체
- 100년 기업 차세대 CEO 과정  
- 예술자산클래스ART

## 잠재적 문제점들

### 1. CSS 충돌
- 다른 CSS가 호버 상태를 방해할 수 있음
- Tailwind CSS의 `group` 클래스 충돌 가능성

### 2. JavaScript 이벤트 충돌
- 다른 이벤트 리스너가 마우스 이벤트를 방해
- React의 이벤트 버블링 문제

### 3. z-index 문제
- 다른 요소가 더 높은 z-index로 서브메뉴를 가림
- backdrop-blur 효과로 인한 렌더링 문제

### 4. SSR/Hydration 문제
- 서버와 클라이언트의 상태 불일치
- useCallback dependency 문제

## 추가 디버깅 단계

만약 여전히 작동하지 않는다면:

### 1. 강제 표시 테스트
```javascript
// hoveredMenu === item.label를 true로 바꿔서 항상 표시
{true && (
  <div className="...">
```

### 2. 스타일 제거 테스트
```javascript
// 복잡한 클래스를 간단하게
<div className="absolute top-full left-0 bg-white border p-4 z-50">
```

### 3. 이벤트 테스트
```javascript
// onClick으로 테스트
<button onClick={() => setHoveredMenu(item.label)}>
```

## 현재 서버 상태
- 개발 서버: `http://localhost:3000`
- Next.js 15.4.3
- 빌드 상태: 성공적
- 애니메이션 카운터 문제: 해결됨