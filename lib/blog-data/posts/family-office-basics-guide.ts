import { BlogPost } from '@/types/blog';

/**
 * Sample Blog Post: Family Office Basics Guide
 *
 * This is a code-split version that loads on-demand
 */

const post: BlogPost = {
  id: 'family-office-basics-guide',
  title: '패밀리오피스란 무엇인가',
  image:
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop',
  excerpt:
    '과거 초고액 자산가들만의 전유물로 여겨졌던 패밀리오피스가 이제는 중견기업과 성공한 창업가들 사이에서 빠르게 확산되고 있습니다. 단순히 부를 물려주는 것이 아닌, 대표님의 철학과 가치를 담아 다음 세대의 행복을 설계하는 현대적 패밀리오피스의 진정한 의미를 알아보세요.',
  content: `<div className="font-sans leading-relaxed max-w-4xl mx-auto text-base text-foreground bg-background px-5">

<header className="text-center mb-10 py-8 border-b-4 border-primary">
    <h1 className="text-primary mb-4 text-3xl md:text-4xl font-bold leading-tight">패밀리오피스, 100년 기업을 위한 현대판 '가문 관리'의 모든 것</h1>
    <p className="text-muted-foreground text-lg font-normal leading-relaxed">가업승계부터 글로벌 투자, 세금 최적화까지. 대한민국 CEO가 반드시 알아야 할 패밀리오피스 설립 및 운영 전략 A to Z.</p>
    <div className="mt-5 text-muted-foreground text-sm">
        작성일: 2025년 8월 13일 | 예상 읽기 시간: 25분 | 카테고리: 가업승계 및 자산관리
    </div>
</header>

<div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 rounded-2xl mb-10">
    <h2 className="text-primary-foreground mb-5 text-xl font-bold">📋 Executive Summary</h2>
    <div className="bg-white/10 dark:bg-black/20 p-5 rounded-xl mb-5">
        <h3 className="text-primary-foreground mb-3 text-base font-semibold">🎯 핵심 포인트 3줄 요약</h3>
        <ul className="m-0 pl-5 text-primary-foreground text-sm leading-relaxed">
            <li className="mb-2">패밀리오피스는 단순 자산관리를 넘어 가문의 부와 가치를 다음 세대로 계승하는 '통합 가문 관리 시스템'입니다.</li>
            <li className="mb-2">가업승계, 세금 최적화, 글로벌 투자 등 CEO의 복합적인 니즈를 해결하며, 제2의 성장을 위한 전략적 파트너 역할을 수행합니다.</li>
            <li className="mb-2">성공적인 패밀리오피스 구축을 위해서는 명확한 목표 설정, 맞춤형 거버넌스 설계, 그리고 신뢰할 수 있는 전문가 그룹과의 협업이 필수적입니다.</li>
        </ul>
    </div>
</div>

<section className="mb-12">
    <h2 className="text-slate-800 dark:text-slate-200 mb-6 text-2xl font-bold border-b-2 border-slate-200 dark:border-slate-700 pb-3">📊 현황 분석</h2>
    <p className="mb-4">전 세계적으로 초고액자산가(UHNW)의 수가 증가하면서 패밀리오피스 시장은 폭발적인 성장세를 보이고 있습니다...</p>
</section>

</div>`,
  category: '패밀리오피스',
  author: '임재홍',
  date: '2025-08-13',
  readTime: '12분',
  tags: [
    '패밀리오피스',
    '가업승계',
    '자산관리',
    '상속세',
    '중견기업',
    'MFO',
    '디지털패밀리오피스',
    '가문경영',
    '세무전략',
    '투자다각화',
  ],
  slug: 'family-office-basics-guide',
  featured: true,
};

export default post;
