'use client';

import { HomeIcon, UserIcon, PhoneIcon } from 'lucide-react';

import React from 'react';

import { Button } from '@/components/ui/button';

import { BackgroundBeams } from '@/components/aceternity/background-beams';
import { FloatingNav } from '@/components/aceternity/floating-navbar';
import {
  HeroHighlight,
  Highlight,
} from '@/components/aceternity/hero-highlight';
import { InfiniteMovingCards } from '@/components/aceternity/infinite-moving-cards';
import { Meteors } from '@/components/aceternity/meteors';
import { Spotlight } from '@/components/aceternity/spotlight';

const testimonials = [
  {
    quote:
      'FamilyOffice S의 자산 관리 서비스는 정말 탁월합니다. 우리 가족의 재정 목표를 체계적으로 관리할 수 있게 되었습니다.',
    name: '김철수',
    title: '삼성전자 부회장',
  },
  {
    quote:
      '상속 계획과 세무 최적화에서 전문적인 컨설팅을 받았습니다. 차세대 승계 준비가 완벽하게 되었습니다.',
    name: '이영희',
    title: '현대그룹 회장',
  },
  {
    quote:
      '글로벌 투자 포트폴리오 구성에서 뛰어난 성과를 얻었습니다. 리스크 관리도 완벽합니다.',
    name: '박민수',
    title: 'LG전자 대표이사',
  },
  {
    quote:
      '가족 거버넌스 시스템 구축에서 체계적인 도움을 받았습니다. 다음 세대 교육도 훌륭합니다.',
    name: '최지현',
    title: 'SK하이닉스 부회장',
  },
];

const navItems = [
  {
    name: '홈',
    link: '/',
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    name: '서비스',
    link: '/services',
    icon: <UserIcon className="h-4 w-4" />,
  },
  {
    name: '연락처',
    link: '/contact',
    icon: <PhoneIcon className="h-4 w-4" />,
  },
];

export default function AceternityDemo() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Floating Navigation */}
      <FloatingNav navItems={navItems} />

      {/* Hero Section with Spotlight */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            FamilyOffice S
          </h1>
          <p className="text-xl md:text-2xl mt-6 max-w-3xl mx-auto text-neutral-300">
            프리미엄 자산 관리 서비스로 <br />
            차세대 성공을 준비하세요
          </p>
          <Button
            className="mt-8 bg-white text-black hover:bg-gray-200"
            size="lg"
          >
            상담 신청하기
          </Button>
        </div>
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:[mask-image:radial-gradient(farthest-side_at_top,black,transparent)]" />
      </section>

      {/* Meteors Card Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            핵심 서비스
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '자산 관리',
                description: '포트폴리오 최적화와 리스크 관리',
                features: ['글로벌 투자', '리스크 분산', '수익 극대화'],
              },
              {
                title: '상속 계획',
                description: '체계적인 승계 및 세무 전략',
                features: ['세무 최적화', '거버넌스', '차세대 교육'],
              },
              {
                title: '가족 오피스',
                description: '종합적인 재정 관리 솔루션',
                features: ['맞춤형 서비스', '전담팀 운영', '24/7 지원'],
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 overflow-hidden"
              >
                <Meteors number={15} />
                <h3 className="text-2xl font-bold mb-4 relative z-10">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-6 relative z-10">
                  {service.description}
                </p>
                <ul className="space-y-2 relative z-10">
                  {service.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Highlight Section */}
      <section className="py-20">
        <HeroHighlight containerClassName="h-[60vh]">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              한국 최고의{' '}
              <Highlight className="text-black dark:text-white">
                패밀리 오피스
              </Highlight>{' '}
              서비스
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              30년 이상의 경험과 전문성으로 한국 재벌가문들의 자산을 관리해온
              노하우를 바탕으로 맞춤형 솔루션을 제공합니다.
            </p>
          </div>
        </HeroHighlight>
      </section>

      {/* Testimonials with Infinite Moving Cards */}
      <section className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">고객 추천사</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            한국 대기업 총수들이 신뢰하는 FamilyOffice S의 서비스 품질을
            확인해보세요
          </p>
        </div>
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
          className="mb-8"
        />
      </section>

      {/* Background Beams Section */}
      <section className="relative py-20">
        <BackgroundBeams className="absolute inset-0" />
        <div className="relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            지금 시작하세요
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            전문 컨설턴트와의 무료 상담을 통해 귀하의 자산 관리 전략을
            수립해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
            >
              무료 상담 신청
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
              size="lg"
            >
              서비스 자료 다운로드
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 FamilyOffice S. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
