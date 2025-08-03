'use client';

import Link from 'next/link';

export function SkipLinks() {
  return (
    <>
      <Link href="#main-content" className="skip-link">
        메인 콘텐츠로 건너뛰기
      </Link>
      <Link href="#navigation" className="skip-link">
        네비게이션으로 건너뛰기
      </Link>
      <Link href="#footer" className="skip-link">
        푸터로 건너뛰기
      </Link>
    </>
  );
}
