export function GlobalMetaTags() {
  return (
    <>
      <link rel="dns-prefetch" href="//cal.com" />
      <link rel="dns-prefetch" href="//analytics.google.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />

      {/* 파비콘 및 앱 아이콘 설정 - 캐시 우회를 위한 버전 추가 */}
      <link
        rel="icon"
        href="/favicon.ico?v=2025"
        sizes="16x16 32x32 48x48"
        type="image/x-icon"
      />
      <link
        rel="shortcut icon"
        href="/favicon.ico?v=2025"
        type="image/x-icon"
      />
      <link rel="apple-touch-icon" href="/favicon.png?v=2025" sizes="180x180" />
      <link
        rel="icon"
        href="/favicon.png?v=2025"
        sizes="192x192"
        type="image/png"
      />
      <link rel="manifest" href="/site.webmanifest?v=2025" />

      <link rel="canonical" href="https://familyoffices.vip" />
      {/* 다중 지역 SEO - 서울/경기/충청권 */}
      <meta name="geo.region" content="KR-11;KR-41;KR-43;KR-44" />
      <meta
        name="geo.placename"
        content="Seoul;Gyeonggi;Chungcheongbuk;Chungcheongnam"
      />
      <meta name="geo.position" content="37.5665;126.9780" />
      <meta name="ICBM" content="37.5665, 126.9780" />
      <meta name="coverage" content="서울특별시, 경기도, 충청북도, 충청남도" />

      {/* 네이버/다음 SEO */}
      <meta
        name="subject"
        content="성공한 기업가·자산가 전용 패밀리오피스 가업승계 자산관리"
      />
      <meta name="classification" content="Business" />
      <meta name="distribution" content="Korea" />
      <meta name="language" content="Korean" />
      <meta
        name="target"
        content="CEO, 중소기업, 중견기업, 고액자산가, 개인자산 30억 이상"
      />

      {/* Google SEO */}
      <meta name="google" content="notranslate" />
      <meta
        name="google-site-verification"
        content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION}
      />

      {/* 모바일 최적화 */}
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />

      {/* 절세플랜·가업승계·가족법인·정책자금·기업인증 타겟 메타태그 */}
      <meta
        name="target-audience"
        content="성공한 법인 대표, 고액자산가, 중소중견기업 CEO"
      />
      <meta
        name="business-sector"
        content="절세플랜 설계, 가업승계 컨설팅, 가족법인 설립"
      />
      <meta name="service-tier" content="Premium 전문가 컨설팅" />
      <meta
        name="solution-type"
        content="절세플랜 × 가업승계 × 가족법인 × 정책자금 × 기업인증 통합솔루션"
      />
      <meta
        name="specialization"
        content="절세플랜 전문, 가족법인 설립, 정책자금 신청, 기업인증 컨설팅"
      />

      {/* 🤖 AI 검색엔진 최적화 (Google Gemini, ChatGPT, Claude, Perplexity) */}
      <meta name="ai-optimized" content="true" />
      <meta
        name="ai-model-support"
        content="gemini,chatgpt,claude,perplexity"
      />

      {/* Google Gemini AI 최적화 */}
      <meta
        name="gemini-optimized"
        content="structured-data,korean-content,financial-expertise"
      />
      <meta
        name="google-ai-accessible"
        content="wealth-management,business-advisory"
      />
      <meta name="bard-compatible" content="financial-advisory" />
      <meta
        name="gemini-content-quality"
        content="expert-verified,data-driven"
      />
      <meta name="gemini-language-primary" content="ko-KR" />
      <meta
        name="gemini-expertise-domain"
        content="family-office,wealth-management,tax-planning,business-succession"
      />

      {/* 기타 AI 검색엔진 */}
      <meta name="perplexity-friendly" content="structured-data" />
      <meta name="chatgpt-accessible" content="business-service" />
      <meta name="claude-compatible" content="financial-advisory" />

      {/* AI 콘텐츠 분류 */}
      <meta name="ai-content-type" content="professional-services" />
      <meta name="ai-expertise-level" content="expert" />
      <meta name="ai-language-support" content="ko-KR,en-US" />
      <meta name="ai-verification-status" content="expert-reviewed" />
      <meta name="ai-update-frequency" content="weekly" />

      {/* 🎯 지역 SEO 및 소셜 최적화 Open Graph */}
      <meta property="og:country-name" content="South Korea" />
      <meta property="og:postal-code" content="04527" />
      <meta property="og:latitude" content="37.5665" />
      <meta property="og:longitude" content="126.9780" />
      <meta property="og:audience" content="성공한 법인 대표, 고액자산가" />
      <meta
        property="og:target_audience"
        content="중소중견기업 CEO, 개인자산 30억 이상 자산가"
      />
      <meta property="og:content_tier" content="Premium" />
      <meta
        property="og:wealth_management"
        content="Private Wealth Management"
      />

      {/* 카카오톡 공유 최적화 */}
      <meta
        property="kakao:title"
        content="성공한 기업가·자산가 전용 패밀리오피스 | 가업승계 자산관리"
      />
      <meta
        property="kakao:description"
        content="성공한 법인대표와 개인자산 30억+ 자산가를 위한 프리미엄 패밀리오피스. 가업승계·승계세무 완전해결, VVIP 맞춤 자산관리. 삼성생명 1000억+ 운용실적"
      />
      <meta
        property="kakao:image"
        content="https://familyoffices.vip/images/og-image-familyoffice-v2.png"
      />
      <meta property="kakao:url" content="https://familyoffices.vip" />

      {/* 네이버 블로그/카페 최적화 */}
      <meta
        name="naver:title"
        content="성공한 기업가·자산가 전용 패밀리오피스 | FamilyOffice S"
      />
      <meta
        name="naver:description"
        content="법인보험 × 가업승계 × 개인자산관리 통합솔루션. 성공한 법인대표와 30억+ 자산가 전용 가업승계·자산관리 완전해결"
      />
      <meta
        name="naver:image"
        content="https://familyoffices.vip/images/og-image-familyoffice-v2.png"
      />

      {/* LinkedIn 비즈니스 네트워크 최적화 */}
      <meta
        property="linkedin:title"
        content="성공한 기업가·자산가를 위한 패밀리오피스 | 가업승계 전문"
      />
      <meta
        property="linkedin:description"
        content="중소중견기업 CEO와 개인자산 30억+ 자산가 전용 프리미엄 자산관리. 가업승계부터 세무최적화까지 원스톱 솔루션"
      />
      <meta
        property="linkedin:image"
        content="https://familyoffices.vip/images/og-image-familyoffice-v2.png"
      />

      {/* 지역 비즈니스 신뢰성 향상 - 수도권 + 충청권 확장 */}
      <meta
        name="business:contact_data:street_address"
        content="서울특별시 중구"
      />
      <meta name="business:contact_data:locality" content="서울" />
      <meta name="business:contact_data:region" content="서울특별시" />
      <meta name="business:contact_data:postal_code" content="04527" />
      <meta name="business:contact_data:country_name" content="대한민국" />
      <meta
        name="business:contact_data:service_area"
        content="서울특별시, 경기도, 인천광역시, 충청북도, 충청남도, 세종특별자치시"
      />
      <meta
        name="business:contact_data:phone_number"
        content="+82-502-5550-8700"
      />
      <meta name="business:contact_data:email" content="cs@familyoffices.vip" />

      {/* 검색엔진 우선순위 */}
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
    </>
  );
}
