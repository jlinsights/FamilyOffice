import React from 'react';
import { SVGLogoDisplay } from './svg-logo-display';

/**
 * 완전한 로고(권장) - 태그라인 포함 풀 브랜드 로고 예시 카드
 * - 실제 SVG 파일 렌더링, 다크모드 지원, 설명 포함
 */
const LogoShowcaseCard: React.FC = () => (
  <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg p-8 mb-10 max-w-xl mx-auto">
    {/* 제목/설명 */}
    <h3 className="text-xl font-bold mb-2">
      완전한 로고 <span className="text-sm text-gray-400">(권장)</span>
    </h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
      태그라인이 포함된 풀 브랜드 로고
    </p>
    
    {/* 실제 SVG 렌더링 */}
    <div className="flex flex-col items-center mb-6">
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex items-center justify-center">
        {/* 라이트 모드용 블루 로고 */}
        <div className="block dark:hidden">
          <SVGLogoDisplay
            src="/SVG/FamilyOfficeS_blue_tagline.svg"
            alt="FamilyOffice S - 태그라인 포함 로고"
            width={240}
            height={80}
          />
        </div>
        {/* 다크 모드용 블랙 로고 */}
        <div className="hidden dark:block">
          <SVGLogoDisplay
            src="/SVG/FamilyOfficeS_black_tagline.svg"
            alt="FamilyOffice S - 태그라인 포함 로고 (다크모드)"
            width={240}
            height={80}
          />
        </div>
      </div>
    </div>
    
    {/* 사용 가이드 */}
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-xs space-y-2">
      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">사용 가이드</h4>
      <ul className="space-y-1 text-gray-600 dark:text-gray-400">
        <li>• 최소 크기: 너비 180px 이상 유지</li>
        <li>• 여백: 로고 주변 최소 20px 확보</li>
        <li>• 배경: 밝은 배경에는 블루, 어두운 배경에는 블랙 버전 사용</li>
        <li>• 형식: SVG 파일로 확대/축소 시에도 선명도 유지</li>
      </ul>
    </div>
  </div>
);

export default LogoShowcaseCard;