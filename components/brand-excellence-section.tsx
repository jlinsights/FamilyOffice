import React from "react";

/**
 * Brand Excellence 안내 섹션
 * - 모든 브랜드 관련 탭 하단에 공통적으로 노출
 * - 일관된 브랜드 경험을 위한 안내, CTA 버튼 포함
 */
const BrandExcellenceSection: React.FC = () => {
  return (
    <section className="w-full max-w-3xl mx-auto py-16 px-4 flex flex-col items-center border-t border-gray-200 dark:border-gray-700 mt-16">
      {/* 상단 pill 라벨 */}
      <span className="inline-flex items-center px-4 py-1 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-semibold gap-1">
        {/* 아이콘 (예: Sparkles) */}
        <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20"><path strokeLinecap="round" strokeLinejoin="round" d="M10 2v2m0 12v2m8-8h-2M4 10H2m12.07-5.07l-1.42 1.42M6.34 17.66l-1.42-1.42m12.02 0l-1.42-1.42M6.34 2.34l-1.42 1.42" /></svg>
        Brand Excellence
      </span>
      {/* 메인 타이틀 */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
        일관된 브랜드 경험을 위해
      </h2>
      {/* 설명 */}
      <p className="text-lg text-center text-gray-500 dark:text-gray-300 mb-8 max-w-2xl">
        이 가이드라인을 통해 <span className="font-semibold text-gray-800 dark:text-white">FamilyOffice S</span>의 브랜드 아이덴티티를 일관되게 표현하고, 사용자에게 신뢰할 수 있는 프리미엄 서비스 경험을 제공할 수 있습니다.
      </p>
      {/* CTA 버튼 2개 */}
      <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
        {/* 서비스 상담받기(주황) */}
        <button
          type="button"
          className="w-full md:w-auto px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg shadow transition-colors flex items-center justify-center gap-2"
        >
          서비스 상담받기
          <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </button>
        {/* 서비스 알아보기(흰색) */}
        <button
          type="button"
          className="w-full md:w-auto px-8 py-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-bold text-lg shadow transition-colors flex items-center justify-center gap-2"
        >
          서비스 알아보기
        </button>
      </div>
    </section>
  );
};

export default BrandExcellenceSection; 