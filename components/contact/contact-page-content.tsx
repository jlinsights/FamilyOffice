'use client';

import { CalComPopup } from '@/components/cal-com-popup';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { StructuredData } from '@/components/structured-data';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { generateStructuredData } from '@/lib/seo/structured-data';
import {
  ArrowRight,
  Building,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Shield,
  Target,
  User
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ContactPageContent() {
  const structuredData = generateStructuredData('ContactPage');
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: 'https://familyoffices.vip',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '상담 문의',
        item: 'https://familyoffices.vip/contact',
      },
    ],
  };

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 로직 (실제 구현 시 API 연동 필요)
    alert('상담 신청이 접수되었습니다. 담당자가 곧 연락드리겠습니다.');
    setFormState({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <StructuredData data={structuredData} />
      <StructuredData data={breadcrumbData} />
      <Header />

      <main className="pt-20">
        {/* 히어로 섹션 */}
        <section className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-emerald-400/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.03] pointer-events-none"></div>

          <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center justify-center p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full shadow-sm animate-fade-in">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full mr-2">Contact Us</span>
                <span className="text-sm text-slate-600 dark:text-slate-300 pr-2 flex items-center">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  전문가 상담 신청
                </span>
              </div>
            </div>

            <h1 className="font-black text-5xl sm:text-6xl md:text-7xl leading-tight mb-8 text-slate-900 dark:text-white whitespace-pre-line animate-slide-up tracking-tight">
              성공을 위한 <span className="bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">첫 걸음</span>
            </h1>

            <p 
              className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up font-light"
              style={{ animationDelay: '200ms' }}
            >
              기업의 성장과 자산의 보호를 위한 <span className="font-semibold text-blue-600 dark:text-blue-400">최적의 솔루션</span>을 제안해드립니다.<br className="hidden sm:block" />
              지금 바로 전문가와 상담하세요.
            </p>
          </div>
        </section>

        {/* 상담 혜택 섹션 */}
        <section className="py-12 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Target,
                  title: '맞춤형 진단',
                  description: '기업 및 개인 자산 현황에 따른 정밀 분석 및 진단 리포트 제공',
                  color: 'blue'
                },
                {
                  icon: Shield,
                  title: '리스크 관리',
                  description: '잠재적 위험 요소를 사전에 파악하고 대비하는 최적의 솔루션 제시',
                  color: 'red'
                },
                {
                  icon: Building,
                  title: '가업 승계',
                  description: '원활한 가업 승계와 절세를 위한 장기적인 로드맵 수립 지원',
                  color: 'purple'
                },
              ].map((benefit, index) => (
                <Card key={index} className="text-center h-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg hover:-translate-y-1 transition-transform duration-300">
                  <CardHeader>
                    <div className={`w-16 h-16 bg-${benefit.color}-50 dark:bg-${benefit.color}-900/20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-${benefit.color}-600 dark:text-${benefit.color}-400 shadow-sm`}>
                      <benefit.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 메인 컨텐츠: 연락처 및 폼 */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.03] pointer-events-none"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              
              {/* 좌측: 연락처 정보 */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
                    상담 문의
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                    궁금하신 점이 있으시거나 상담을 원하시면 언제든지 연락주세요.<br />
                    전문 컨설턴트가 친절하게 안내해 드립니다.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">상담 전화</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-2">평일 09:00 - 18:00</p>
                        <a href="tel:0502-5550-8700" className="text-xl font-black text-blue-600 dark:text-blue-400 hover:underline">
                          0502-5550-8700
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">이메일</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-2">24시간 접수 가능</p>
                        <a href="mailto:cs@familyoffices.vip" className="text-lg font-bold text-purple-600 dark:text-purple-400 hover:underline break-all">
                          cs@familyoffices.vip
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">오시는 길</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          <a href="https://naver.me/x1Vz2wUe" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            서울시 중구 세종대로 73 태평로빌딩
                          </a>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="pt-8">
                   <CalComPopup
                    buttonText="간편 상담 예약하기"
                    variant="default"
                    size="lg"
                    className="w-full py-6 text-lg font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-xl rounded-xl"
                    eventType="consultation"
                  />
                  <p className="text-center text-sm text-slate-500 mt-4">
                    * 원하시는 시간에 맞춰 상담을 예약하실 수 있습니다.
                  </p>
                </div>
              </div>

              {/* 우측: 상담 신청 폼 */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full"></div>
                
                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white relative z-10">
                  온라인 상담 신청
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700 dark:text-slate-300 font-medium">이름</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <Input 
                          id="name" 
                          name="name" 
                          placeholder="홍길동" 
                          className="pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:ring-blue-500" 
                          value={formState.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300 font-medium">연락처</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <Input 
                          id="phone" 
                          name="phone" 
                          placeholder="010-0000-0000" 
                          className="pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:ring-blue-500" 
                          value={formState.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-medium">이메일</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="example@company.com" 
                        className="pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:ring-blue-500" 
                        value={formState.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-slate-700 dark:text-slate-300 font-medium">회사명 / 직함</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <Input 
                        id="company" 
                        name="company" 
                        placeholder="OO기업 / 대표이사" 
                        className="pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:ring-blue-500" 
                        value={formState.company}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-700 dark:text-slate-300 font-medium">문의 내용</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="상담받고 싶은 내용을 간단히 적어주세요." 
                      className="min-h-[150px] bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:ring-blue-500 resize-none" 
                      value={formState.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" className="w-full py-6 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-xl">
                      상담 신청하기
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <p className="text-xs text-slate-400 mt-4 text-center">
                      보내주신 정보는 상담 목적으로만 사용되며, 안전하게 보호됩니다.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* 상담 진행 과정 섹션 */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-2 bg-white dark:bg-slate-800 rounded-full mb-6 shadow-sm">
                <Clock className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 pr-2">Process</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
                상담 진행 과정
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light">
                체계적인 프로세스를 통해 최적의 솔루션을 제공합니다
              </p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 z-0"></div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {[
                  { step: '01', title: '상담 신청', desc: '전화, 이메일, 폼을 통한 접수' },
                  { step: '02', title: '기초 상담', desc: '유선 또는 대면으로 니즈 파악' },
                  { step: '03', title: '솔루션 제안', desc: '맞춤형 분석 및 전략 수립' },
                  { step: '04', title: '실행 및 관리', desc: '솔루션 실행 및 사후 관리' },
                ].map((item, index) => (
                  <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 text-center group hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-black mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-12 md:p-20 relative overflow-hidden shadow-2xl max-w-5xl mx-auto text-white">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight leading-tight">
                  지금 바로 전문가와<br />
                  상담을 시작하세요
                </h2>
                <p className="text-xl text-blue-100/80 mb-12 max-w-2xl mx-auto font-light">
                  고객님의 소중한 자산과 기업의 미래를 위해<br />
                  최고의 전문가들이 함께하겠습니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-10 py-6 text-lg font-bold bg-white text-blue-900 hover:bg-blue-50 shadow-xl border-none rounded-full" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    상담 신청하기
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="px-10 py-6 text-lg font-bold border-2 border-white/30 text-white hover:bg-white/10 bg-transparent rounded-full" asChild>
                    <Link href="/solutions">
                      솔루션 보기
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
