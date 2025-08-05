'use client';

export function SkipLinks() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        메인 콘텐츠로 건너뛰기
      </a>
      <a href="#navigation" className="skip-link">
        네비게이션으로 건너뛰기
      </a>
      <a href="#footer" className="skip-link">
        푸터로 건너뛰기
      </a>
    </>
  );
}
