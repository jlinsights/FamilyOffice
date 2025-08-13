'use client';

import { useEffect, useState } from 'react';
import { Bot, MessageCircle, Sparkles, Share2, Copy, Check, Clock, Shield, Zap } from 'lucide-react';
import Head from 'next/head';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { AIChatFloating } from '@/components/ai-chat-floating';
import { MinimalFamilyOfficeLogo } from '@/components/logo';

export default function AIPage() {
  const [showCopied, setShowCopied] = useState(false);

  // 페이지 로드시 채팅 자동 열기
  useEffect(() => {
    const timer = setTimeout(() => {
      // AI 채팅 컴포넌트의 상태를 직접 제어할 수 없으므로
      // 버튼 클릭을 시뮬레이션합니다
      const chatButton = document.querySelector('[aria-label="AI 컨설팅 채팅 열기"]') as HTMLButtonElement;
      if (chatButton) {
        chatButton.click();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const shareUrl = 'https://ai.familyoffices.vip';
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };

  const shareOnSocialMedia = (platform: string) => {
    const text = 'FamilyOffice S AI 컨설턴트 - 24시간 가업승계, 자산관리 전문 상담';
    const url = shareUrl;
    const hashtags = '#패밀리오피스 #AI컨설턴트 #가업승계 #자산관리 #CEO플랜';
    
    let shareLink = '';
    
    switch (platform) {
      case 'kakao':
        // 카카오톡 공유 (웹 링크)
        shareLink = `https://story.kakao.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent('패밀리오피스,AI컨설턴트,가업승계,자산관리')}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'instagram':
        // Instagram은 직접 링크 공유가 제한적이므로 클립보드 복사 후 안내
        copyToClipboard();
        alert('링크가 복사되었습니다!\n\nInstagram 스토리나 게시물에서 링크를 붙여넣어 주세요.\n\n추천 해시태그:\n' + hashtags);
        return;
      case 'threads':
        // Threads 웹 공유 (Meta의 새로운 플랫폼)
        shareLink = `https://www.threads.net/intent/post?text=${encodeURIComponent(text + '\n\n' + url + '\n\n' + hashtags)}`;
        break;
      default:
        return;
    }
    
    window.open(shareLink, '_blank', 'width=600,height=400');
  };

  return (
    <>
      <Head>
        <link rel="canonical" href="https://ai.familyoffices.vip" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:url" content="https://ai.familyoffices.vip" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ko_KR" />
        <meta name="twitter:domain" content="ai.familyoffices.vip" />
        <meta name="twitter:url" content="https://ai.familyoffices.vip" />
        
        {/* 네이버 검색엔진 최적화 */}
        <meta name="naver-site-verification" content="ai-consultant-familyoffice" />
        <meta name="NaverBot" content="All" />
        
        {/* 다음 검색엔진 최적화 */}
        <meta name="Daumoa" content="index,follow" />
        
        {/* 모바일 최적화 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FamilyOffice S AI" />
        
        {/* 소셜 미디어 최적화 */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="FamilyOffice S AI 컨설턴트 - 24시간 가업승계, 자산관리 전문 상담" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        {/* 헤더 */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MinimalFamilyOfficeLogo className="h-8 w-auto" />
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900 dark:to-purple-900 dark:text-blue-100">
                  <Bot className="h-3 w-3 mr-1" />
                  AI 컨설턴트
                </Badge>
              </div>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                {showCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="ml-2">{showCopied ? '복사됨!' : '링크 복사'}</span>
              </Button>
            </div>
          </div>
        </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          {/* 히어로 섹션 */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-full">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">24시간 AI 전문 상담</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FamilyOffice S
              <br />
              AI 컨설턴트
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              가업승계, 자산관리, 세무 최적화 등 중소중견기업 CEO를 위한
              <br />
              <strong className="text-foreground">전문 AI 컨설팅 서비스</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
                onClick={() => {
                  const chatButton = document.querySelector('[aria-label="AI 컨설팅 채팅 열기"]') as HTMLButtonElement;
                  if (chatButton) chatButton.click();
                }}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                AI와 상담 시작하기
              </Button>
            </div>
          </div>

          {/* 특징 카드 */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Bot className="h-5 w-5" />
                  전문 AI 답변
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  가업승계, 자산이전, 세무 최적화, CEO플랜 등 전문 분야에 특화된 AI가 정확하고 실무적인 답변을 제공합니다.
                </p>
                <div className="mt-3 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                  <Shield className="h-4 w-4" />
                  <span>삼성생명 전문팀 검증</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                  <Clock className="h-5 w-5" />
                  24시간 실시간
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  언제든지 궁금한 점을 실시간으로 질문하고 즉시 전문적인 답변을 받을 수 있습니다.
                </p>
                <div className="mt-3 flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
                  <Zap className="h-4 w-4" />
                  <span>평균 응답시간 3초</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <Share2 className="h-5 w-5" />
                  간편한 공유
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  ai.familyoffices.vip 링크로 동료, 지인과 쉽게 공유하고 함께 전문 상담을 받을 수 있습니다.
                </p>
                <div className="mt-3 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <MessageCircle className="h-4 w-4" />
                  <span>무료 이용</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 공유 섹션 */}
          <div className="bg-muted/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">이 링크를 공유해보세요</h2>
            <p className="text-muted-foreground mb-6">
              동료, 지인들과 함께 전문 AI 컨설팅을 받아보세요
            </p>
            
            <div className="bg-background rounded-lg p-4 mb-6 border">
              <code className="text-primary font-mono text-lg break-all">{shareUrl}</code>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap justify-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => shareOnSocialMedia('kakao')}
                className="bg-yellow-50 hover:bg-yellow-100 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400"
              >
                💬 카카오톡
              </Button>
              <Button 
                variant="outline" 
                onClick={() => shareOnSocialMedia('facebook')}
                className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400"
              >
                📘 페이스북
              </Button>
              <Button 
                variant="outline" 
                onClick={() => shareOnSocialMedia('twitter')}
                className="bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-800 dark:bg-sky-900/20 dark:border-sky-800 dark:text-sky-400"
              >
                🐦 트위터
              </Button>
              <Button 
                variant="outline" 
                onClick={() => shareOnSocialMedia('instagram')}
                className="bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 border-pink-200 text-pink-800 dark:from-pink-900/20 dark:to-purple-900/20 dark:border-pink-800 dark:text-pink-400"
              >
                📷 인스타그램
              </Button>
              <Button 
                variant="outline" 
                onClick={() => shareOnSocialMedia('threads')}
                className="bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-800 dark:bg-gray-900/20 dark:border-gray-700 dark:text-gray-400"
              >
                🧵 Threads
              </Button>
              <Button 
                variant="outline" 
                onClick={() => shareOnSocialMedia('linkedin')}
                className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400"
              >
                💼 링크드인
              </Button>
            </div>
            
            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Pro Tip:</strong> 북마크에 저장하면 언제든 쉽게 AI 상담을 받을 수 있어요!
              </p>
              <p className="text-xs text-muted-foreground">
                📱 인스타그램: 클릭하면 링크가 복사됩니다 (스토리/게시물에 붙여넣기)
              </p>
            </div>
          </div>

          {/* 사용법 안내 */}
          <div className="text-left max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl font-semibold text-center mb-6">사용법 안내</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400">1</div>
                <p>우측 하단의 AI 채팅 버튼을 클릭하세요</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400">2</div>
                <p>가업승계, 자산관리, 세무 등 궁금한 점을 자유롭게 질문하세요</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400">3</div>
                <p>AI 컨설턴트가 전문적인 답변을 실시간으로 제공해드립니다</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400">4</div>
                <p>더 상세한 상담이 필요하시면 전문 컨설턴트와 직접 상담도 가능합니다</p>
              </div>
            </div>
          </div>

          {/* 추가 정보 섹션 */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-blue-800 dark:text-blue-200">전문 상담사와 직접 상담</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 dark:text-blue-300 mb-4">
                  더 복잡한 문제나 맞춤형 솔루션이 필요하시면 전문 상담사와 1:1 상담을 받으실 수 있습니다.
                </p>
                <Button 
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <a href="/contact" target="_blank" rel="noopener noreferrer">
                    상담 예약하기 →
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="text-purple-800 dark:text-purple-200">FamilyOffice S 둘러보기</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-700 dark:text-purple-300 mb-4">
                  패밀리오피스 전문 서비스와 CEO 프로그램을 자세히 알아보세요.
                </p>
                <Button 
                  asChild
                  variant="outline"
                  className="border-purple-300 text-purple-700 hover:bg-purple-100 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900"
                >
                  <a href="https://familyoffices.vip" target="_blank" rel="noopener noreferrer">
                    메인 사이트 방문 →
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-muted/50 border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MinimalFamilyOfficeLogo className="h-6 w-auto" />
              <span className="text-sm font-medium text-muted-foreground">FamilyOffice S AI 컨설턴트</span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              삼성생명 기업컨설팅센터의 VIP 고객 전담 프로젝트팀
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-muted-foreground">
              <span>📞 문의: 502-5550-8700</span>
              <span className="hidden md:inline">•</span>
              <span>📧 cs@familyoffices.vip</span>
              <span className="hidden md:inline">•</span>
              <span>🏢 서울특별시 중구</span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-muted-foreground/20">
              <p className="text-xs text-muted-foreground">
                © 2024 FamilyOffice S. All rights reserved. | AI 답변은 참고용이며, 정확한 상담은 전문가와 진행하시기 바랍니다.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* AI 채팅 플로팅 버튼 */}
      <AIChatFloating />
    </div>
    </>
  );
}