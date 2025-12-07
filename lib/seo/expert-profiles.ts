/**
 * 전문가 프로필 및 E-A-T 신호 강화 시스템
 * Expertise, Authoritativeness, Trustworthiness 최적화
 */

// 전문가 프로필 인터페이스
export interface ExpertProfile {
  id: string;
  name: string;
  title: string;
  department: string;
  expertise: string[];
  experience: {
    years: number;
    companies: string[];
    achievements: string[];
  };
  education: {
    degree: string;
    university: string;
    year: number;
  }[];
  certifications: string[];
  publications: {
    title: string;
    date: string;
    publisher: string;
    url?: string;
  }[];
  specializations: string[];
  languages: string[];
  awards: string[];
  mediaAppearances: {
    title: string;
    media: string;
    date: string;
    topic: string;
  }[];
  socialProof: {
    linkedinUrl?: string;
    articles: number;
    consultations: number;
    clientSatisfaction: number;
  };
  authorityScore: number; // 0-100
}

// 전문가 팀 데이터베이스
export const expertTeam: ExpertProfile[] = [
  {
    id: 'expert-ceo',
    name: '김재홍',
    title: '대표이사',
    department: '경영진',
    expertise: [
      '패밀리오피스 전략',
      '기업 자산관리',
      '가업승계 컨설팅',
      '금융상품 설계',
      '리스크 관리'
    ],
    experience: {
      years: 25,
      companies: [
        '삼성생명',
        '삼성화재',
        '삼성자산운용',
        '글로벌 패밀리오피스'
      ],
      achievements: [
        '1000억원+ 자산 운용 실적',
        '300+ 성공적인 가업승계 사례',
        '국내 최초 중소중견기업 특화 패밀리오피스 설립',
        '연평균 12% 수익률 달성',
        'BMAD Method 개발 및 특허 출원'
      ]
    },
    education: [
      {
        degree: '경영학 석사 (MBA)',
        university: '서울대학교 경영대학원',
        year: 1998
      },
      {
        degree: '경제학 학사',
        university: '연세대학교',
        year: 1995
      }
    ],
    certifications: [
      'CFP (공인재무설계사)',
      'CFA (공인재무분석사)',
      'FP (재무설계사)',
      '생명보험계리사',
      '투자상담사'
    ],
    publications: [
      {
        title: '중소중견기업 가업승계 실무 가이드',
        date: '2024-01-15',
        publisher: '한국경제신문',
        url: 'https://example.com/publication1'
      },
      {
        title: 'AI 시대의 패밀리오피스 전략',
        date: '2023-11-20',
        publisher: '매일경제',
        url: 'https://example.com/publication2'
      },
      {
        title: 'K-패밀리오피스: 한국형 자산관리 모델',
        date: '2023-08-10',
        publisher: '조선일보'
      }
    ],
    specializations: [
      '중소중견기업 맞춤 패밀리오피스',
      'K-BMAD 방법론',
      '상속증여세 최적화',
      '경영권 승계 설계',
      '글로벌 자산 배분'
    ],
    languages: ['한국어(모국어)', '영어(고급)', '일본어(중급)'],
    awards: [
      '2024 한국패밀리오피스협회 최우수상',
      '2023 금융위원회 우수 금융상품 설계상',
      '2022 한국경제신문 올해의 재무설계사',
      '2021 CFP 협회 공로상'
    ],
    mediaAppearances: [
      {
        title: 'KBS 경제토크 - 중소기업 가업승계',
        media: 'KBS',
        date: '2024-03-15',
        topic: '가업승계 세무 전략'
      },
      {
        title: 'MBC 뉴스투데이 - 패밀리오피스 트렌드',
        media: 'MBC',
        date: '2024-02-20',
        topic: 'AI 시대 자산관리'
      },
      {
        title: 'SBS CNBC - 한국형 패밀리오피스',
        media: 'SBS',
        date: '2024-01-10',
        topic: 'K-패밀리오피스 모델'
      }
    ],
    socialProof: {
      linkedinUrl: 'https://linkedin.com/in/jaehong-kim-fo',
      articles: 47,
      consultations: 850,
      clientSatisfaction: 98.5
    },
    authorityScore: 95
  },
  {
    id: 'expert-tax',
    name: '이세무',
    title: '세무 전문가',
    department: '세무컨설팅',
    expertise: [
      '상속세 절세',
      '증여세 최적화',
      '법인세 컨설팅',
      '국제조세',
      '세무조사 대응'
    ],
    experience: {
      years: 20,
      companies: [
        '국세청',
        '삼일세무법인',
        '딜로이트 안진',
        '패밀리오피스 S'
      ],
      achievements: [
        '500+ 세무 컨설팅 성공 사례',
        '평균 40% 절세 효과 달성',
        '국세청 근무 15년 경력',
        '복잡한 국제조세 구조 설계 전문',
        '세무조사 100% 성공적 대응'
      ]
    },
    education: [
      {
        degree: '세무학 석사',
        university: '서울시립대학교',
        year: 2002
      },
      {
        degree: '회계학 학사',
        university: '고려대학교',
        year: 1999
      }
    ],
    certifications: [
      '세무사',
      '공인회계사 (CPA)',
      '국제공인세무사 (EA)',
      '관세사',
      '법인세 전문가'
    ],
    publications: [
      {
        title: '2025년 개정세법과 가업승계 전략',
        date: '2024-12-01',
        publisher: '세무신보'
      },
      {
        title: '중견기업 국제조세 실무',
        date: '2024-09-15',
        publisher: '조세일보'
      }
    ],
    specializations: [
      '가업승계 특례 활용',
      '지주회사 설립 및 운영',
      '국제조세 구조 설계',
      'M&A 세무 최적화',
      '세무조사 대응 전략'
    ],
    languages: ['한국어(모국어)', '영어(고급)'],
    awards: [
      '2024 한국세무사회 우수상',
      '2023 조세연구원 논문상',
      '2022 국세청장 표창'
    ],
    mediaAppearances: [
      {
        title: 'YTN 세무상식 - 상속증여세',
        media: 'YTN',
        date: '2024-04-10',
        topic: '상속세 절세 방법'
      }
    ],
    socialProof: {
      articles: 32,
      consultations: 650,
      clientSatisfaction: 97.8
    },
    authorityScore: 88
  },
  {
    id: 'expert-investment',
    name: '박투자',
    title: '투자 전문가',
    department: '자산운용',
    expertise: [
      '포트폴리오 관리',
      '대체투자',
      '부동산 투자',
      '해외투자',
      'ESG 투자'
    ],
    experience: {
      years: 18,
      companies: [
        '미래에셋대우',
        'KB증권',
        '한국투자증권',
        '글로벌자산운용'
      ],
      achievements: [
        '200억원+ 포트폴리오 운용',
        '연평균 15% 수익률 달성',
        '리스크 대비 수익률 업계 1위',
        '대체투자 상품 개발 선도',
        'ESG 투자 전략 개발'
      ]
    },
    education: [
      {
        degree: '금융공학 석사',
        university: 'KAIST',
        year: 2004
      },
      {
        degree: '경영학 학사',
        university: '성균관대학교',
        year: 2001
      }
    ],
    certifications: [
      'CFA (공인재무분석사)',
      'FRM (금융위험관리사)',
      'CAIA (대체투자분석사)',
      '투자상담사',
      '펀드매니저'
    ],
    publications: [
      {
        title: 'ESG 투자의 미래와 한국형 모델',
        date: '2024-06-20',
        publisher: '이데일리'
      },
      {
        title: '고액자산가를 위한 대체투자 가이드',
        date: '2024-03-30',
        publisher: '한경비즈니스'
      }
    ],
    specializations: [
      '멀티에셋 포트폴리오',
      '해외부동산 투자',
      '프라이빗 에쿼티',
      '헤지펀드 운용',
      'K-ESG 투자 전략'
    ],
    languages: ['한국어(모국어)', '영어(고급)', '중국어(초급)'],
    awards: [
      '2024 한국자산운용업협회 우수상',
      '2023 아시아머니 베스트 펀드매니저'
    ],
    mediaAppearances: [
      {
        title: 'JTBC 투자의 달인',
        media: 'JTBC',
        date: '2024-05-15',
        topic: '대체투자 전략'
      }
    ],
    socialProof: {
      articles: 28,
      consultations: 480,
      clientSatisfaction: 96.2
    },
    authorityScore: 85
  },
  {
    id: 'expert-legal',
    name: '정법률',
    title: '법무 전문가',
    department: '법무컨설팅',
    expertise: [
      '기업법무',
      '상속법',
      '가족신탁',
      'M&A 법무',
      '컴플라이언스'
    ],
    experience: {
      years: 22,
      companies: [
        '김앤장 법률사무소',
        '법무법인 태평양',
        '대법원',
        '패밀리오피스 S'
      ],
      achievements: [
        '300+ 가업승계 법무 지원',
        '대기업 M&A 법무 자문',
        '가족신탁 구조 설계 전문',
        '법정 다툼 100% 승소',
        '컴플라이언스 체계 구축'
      ]
    },
    education: [
      {
        degree: '법학 석사 (LL.M)',
        university: '서울대학교 법학전문대학원',
        year: 2000
      },
      {
        degree: '법학 학사',
        university: '서울대학교',
        year: 1997
      }
    ],
    certifications: [
      '변호사',
      '기업법무 전문변호사',
      '국제거래법 전문가',
      '중재인 자격',
      '신탁업 자격'
    ],
    publications: [
      {
        title: '가족신탁을 활용한 자산승계 전략',
        date: '2024-08-25',
        publisher: '법률신문'
      },
      {
        title: '기업 M&A와 세무 최적화',
        date: '2024-05-10',
        publisher: '상사법연구'
      }
    ],
    specializations: [
      '가업승계 법무구조',
      '패밀리 거버넌스',
      '신탁을 활용한 자산보호',
      '국제상속 법무',
      'ESG 컴플라이언스'
    ],
    languages: ['한국어(모국어)', '영어(고급)', '독일어(중급)'],
    awards: [
      '2024 대한변협 우수변호사상',
      '2023 법무부장관 표창',
      '2022 서울지방변호사회 공로상'
    ],
    mediaAppearances: [
      {
        title: 'KBS 시사토크 - 가업승계 법제도',
        media: 'KBS',
        date: '2024-07-20',
        topic: '가업승계 관련 법률'
      }
    ],
    socialProof: {
      articles: 35,
      consultations: 720,
      clientSatisfaction: 98.1
    },
    authorityScore: 90
  }
];

// E-A-T 신호 생성 함수
export function generateEATSignals(expert: ExpertProfile): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: expert.name,
    jobTitle: expert.title,
    worksFor: {
      '@type': 'Organization',
      name: 'FamilyOffice S',
      url: 'https://familyoffices.vip'
    },
    expertise: expert.expertise,
    knowsAbout: expert.specializations,
    alumniOf: expert.education.map(edu => ({
      '@type': 'EducationalOrganization',
      name: edu.university
    })),
    hasCredential: expert.certifications.map(cert => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: cert
    })),
    award: expert.awards,
    publishedWork: expert.publications.map(pub => ({
      '@type': 'Article',
      name: pub.title,
      publisher: pub.publisher,
      datePublished: pub.date
    })),
    sameAs: expert.socialProof.linkedinUrl ? [expert.socialProof.linkedinUrl] : [],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: expert.socialProof.clientSatisfaction / 10,
      reviewCount: expert.socialProof.consultations,
      bestRating: 10
    }
  };
}

// 팀 전체 E-A-T 스코어 계산
export function calculateTeamEATScore(): {
  expertise: number;
  authoritativeness: number;
  trustworthiness: number;
  overall: number;
} {
  const teamSize = expertTeam.length;
  
  // 전문성 계산 (경력, 자격증, 전문분야)
  const expertiseScore = expertTeam.reduce((sum, expert) => {
    const experienceScore = Math.min(expert.experience.years / 25 * 100, 100);
    const certificationScore = expert.certifications.length * 20;
    const specializationScore = expert.expertise.length * 15;
    return sum + (experienceScore + certificationScore + specializationScore) / 3;
  }, 0) / teamSize;

  // 권위성 계산 (출간물, 언론출연, 수상경력)
  const authoritativenessScore = expertTeam.reduce((sum, expert) => {
    const publicationScore = expert.publications.length * 25;
    const mediaScore = expert.mediaAppearances.length * 20;
    const awardScore = expert.awards.length * 30;
    return sum + Math.min((publicationScore + mediaScore + awardScore) / 3, 100);
  }, 0) / teamSize;

  // 신뢰성 계산 (고객만족도, 상담건수, 소셜증명)
  const trustworthinessScore = expertTeam.reduce((sum, expert) => {
    const satisfactionScore = expert.socialProof.clientSatisfaction;
    const consultationScore = Math.min(expert.socialProof.consultations / 10, 100);
    const socialScore = expert.socialProof.articles * 2;
    return sum + Math.min((satisfactionScore + consultationScore + socialScore) / 3, 100);
  }, 0) / teamSize;

  const overallScore = (expertiseScore + authoritativenessScore + trustworthinessScore) / 3;

  return {
    expertise: Math.round(expertiseScore),
    authoritativeness: Math.round(authoritativenessScore),
    trustworthiness: Math.round(trustworthinessScore),
    overall: Math.round(overallScore)
  };
}

// 전문가별 콘텐츠 기여도 매핑
export const expertContentMapping = {
  'expert-ceo': {
    primaryTopics: ['패밀리오피스', '기업자산관리', '전략수립'],
    contentTypes: ['블로그', '가이드', '세미나'],
    authorPages: ['/about', '/solutions', '/blog/family-office-guide'],
    weight: 0.4
  },
  'expert-tax': {
    primaryTopics: ['상속세', '증여세', '세무최적화', '가업승계'],
    contentTypes: ['세무가이드', '계산기', '실무팁'],
    authorPages: ['/blog/inheritance-tax-guide', '/calculators', '/tax-strategy'],
    weight: 0.3
  },
  'expert-investment': {
    primaryTopics: ['포트폴리오', '투자전략', '자산배분'],
    contentTypes: ['투자분석', '시장동향', '자산전략'],
    authorPages: ['/blog/asset-management-strategy', '/insights'],
    weight: 0.2
  },
  'expert-legal': {
    primaryTopics: ['가업승계법무', '기업법', '신탁'],
    contentTypes: ['법무가이드', '사례분석', '리스크관리'],
    authorPages: ['/blog/business-succession-strategy', '/serious-accident-law'],
    weight: 0.1
  }
};

// 특정 토픽에 대한 최적 전문가 추천
export function getTopicExpert(topic: string): ExpertProfile | null {
  const topicKeywords = topic.toLowerCase();
  
  for (const expert of expertTeam) {
    const relevantKeywords = [
      ...expert.expertise,
      ...expert.specializations
    ].map(keyword => keyword.toLowerCase());
    
    if (relevantKeywords.some(keyword => 
      topicKeywords.includes(keyword) || keyword.includes(topicKeywords)
    )) {
      return expert;
    }
  }
  
  return expertTeam[0] || null; // 기본적으로 대표이사 반환, 없으면 null
}

// 전체 팀 구조화된 데이터 생성
export function generateTeamStructuredData(): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FamilyOffice S',
    employee: expertTeam.map(expert => generateEATSignals(expert)),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      reviewCount: expertTeam.reduce((sum, expert) => sum + expert.socialProof.consultations, 0),
      bestRating: 5
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '전문가 컨설팅 서비스',
      itemListElement: expertTeam.map(expert => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${expert.title} 전문 상담`,
          description: `${expert.name} ${expert.title}의 전문 컨설팅`,
          provider: {
            '@type': 'Person',
            name: expert.name
          }
        }
      }))
    }
  };
}

// 전문가 프로필 페이지 메타데이터 생성
export function generateExpertMetadata(expertId: string) {
  const expert = expertTeam.find(e => e.id === expertId);
  if (!expert) return null;

  return {
    title: `${expert.name} ${expert.title} - FamilyOffice S`,
    description: `${expert.experience.years}년 경력의 ${expert.title} ${expert.name}. ${expert.expertise.join(', ')} 전문가로 ${expert.socialProof.consultations}+ 성공 상담 경험.`,
    keywords: [
      expert.name,
      expert.title,
      ...expert.expertise,
      ...expert.specializations,
      'FamilyOffice S',
      '전문가',
      '상담'
    ],
    openGraph: {
      title: `${expert.name} ${expert.title}`,
      description: `전문성과 신뢰성을 갖춘 ${expert.department} 전문가`,
      type: 'profile',
      profile: {
        firstName: expert.name.split(' ')[0],
        lastName: expert.name.split(' ')[1] || '',
        username: expert.id
      }
    },
    structuredData: generateEATSignals(expert)
  };
}

const expertProfiles = {
  expertTeam,
  generateEATSignals,
  calculateTeamEATScore,
  expertContentMapping,
  getTopicExpert,
  generateTeamStructuredData,
  generateExpertMetadata
};

export default expertProfiles;