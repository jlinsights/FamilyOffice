import React from "react";

/**
 * 완전한 로고(권장) - 태그라인 포함 풀 브랜드 로고 예시 카드
 * - 실제 렌더링, 코드 예시, 설명, 코드 복사 버튼 포함
 */
const LogoShowcaseCard: React.FC = () => (
  <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg p-8 mb-10 max-w-xl mx-auto">
    {/* 제목/설명 */}
    <h3 className="text-xl font-bold mb-2">완전한 로고 <span className="text-sm text-gray-400">(권장)</span></h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">태그라인이 포함된 풀 브랜드 로고</p>
    {/* 실제 렌더링 */}
    <div className="flex flex-col items-center mb-6">
      {/* 실제 로고 구현 */}
      <div className="flex flex-col items-center space-y-3">
        <div className="inline-flex items-center space-x-2">
          <div className="text-xl font-playfair font-bold text-foreground">FamilyOffice</div>
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">S</span>
          </div>
        </div>
        <div className="w-full max-w-[240px]">
          <p
            className="text-xs text-muted-foreground font-light tracking-wide text-center"
            style={{ fontSize: "10px", letterSpacing: "0.08em" }}
          >
            Your Trusted Financial Partner for Life
          </p>
        </div>
      </div>
    </div>
    {/* 코드 블록 */}
    <div className="relative bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto text-xs font-mono">
      {/* 코드 복사 버튼 */}
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-blue-500"
        aria-label="코드 복사"
        onClick={() => navigator.clipboard.writeText(`<div className=\"flex flex-col items-center space-y-3\">
  <div className=\"inline-flex items-center space-x-2\">
    <div className=\"text-xl font-playfair font-bold text-foreground\">FamilyOffice</div>
    <div className=\"h-8 w-8 rounded-lg bg-primary flex items-center justify-center\">
      <span className=\"text-primary-foreground font-bold text-xl\">S</span>
    </div>
  </div>
  <div className=\"w-full max-w-[240px]\">
    <p className=\"text-xs text-muted-foreground font-light tracking-wide text-center\" style={{ fontSize: '10px', letterSpacing: '0.08em' }}>
      Your Trusted Financial Partner for Life
    </p>
  </div>
</div>`)}
        title="코드 복사"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20">
          <rect x="7" y="7" width="9" height="9" rx="2" />
          <path d="M3 13V5a2 2 0 0 1 2-2h8" />
        </svg>
      </button>
      <pre>
{`<div className="flex flex-col items-center space-y-3">
  <div className="inline-flex items-center space-x-2">
    <div className="text-xl font-playfair font-bold text-foreground">FamilyOffice</div>
    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
      <span className="text-primary-foreground font-bold text-xl">S</span>
    </div>
  </div>
  <div className="w-full max-w-[240px]">
    <p className="text-xs text-muted-foreground font-light tracking-wide text-center" style={{ fontSize: '10px', letterSpacing: '0.08em' }}>
      Your Trusted Financial Partner for Life
    </p>
  </div>
</div>`}
      </pre>
    </div>
  </div>
);

export default LogoShowcaseCard; 