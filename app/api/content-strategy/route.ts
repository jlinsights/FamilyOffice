import { NextRequest, NextResponse } from 'next/server';

import {
  WEEKLY_CONTENT_SCHEDULE,
  CONTENT_TEMPLATES,
  ContentGenerator,
  ContentAnalytics,
  ContentAutomation,
  type ContentPerformanceMetrics,
} from '@/lib/content-strategy';

/**
 * 콘텐츠 전략 관리 API
 * SuperClaude Framework + BMAD Method 기반 콘텐츠 마케팅 시스템
 */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const topic = searchParams.get('topic');
  const templateId = searchParams.get('template');
  const weeks = parseInt(searchParams.get('weeks') || '4');

  try {
    switch (action) {
      case 'schedule':
        // 주간 콘텐츠 일정 조회
        return NextResponse.json({
          success: true,
          data: {
            weeklySchedule: WEEKLY_CONTENT_SCHEDULE,
            nextPublishDates: WEEKLY_CONTENT_SCHEDULE.map(schedule => ({
              type: schedule.type,
              day: schedule.day,
              time: schedule.time,
              nextDate: ContentGenerator['getNextPublishDate'](
                `${schedule.day}-${schedule.type}`
              ),
            })),
          },
        });

      case 'templates':
        // 콘텐츠 템플릿 목록
        const selectedTemplate = templateId
          ? CONTENT_TEMPLATES.find(t => t.id === templateId)
          : undefined;

        return NextResponse.json({
          success: true,
          data: selectedTemplate
            ? {
                template: selectedTemplate,
              }
            : {
                templates: CONTENT_TEMPLATES,
                totalTemplates: CONTENT_TEMPLATES.length,
              },
        });

      case 'generate':
        // 콘텐츠 구조 생성
        if (!topic || !templateId) {
          return NextResponse.json(
            {
              success: false,
              error: 'topic and template parameters required',
            },
            { status: 400 }
          );
        }

        try {
          const contentStructure = ContentGenerator.generateContentStructure(
            topic,
            templateId
          );
          return NextResponse.json({
            success: true,
            data: {
              topic,
              templateId,
              ...contentStructure,
              generatedAt: new Date().toISOString(),
            },
          });
        } catch (error) {
          return NextResponse.json(
            {
              success: false,
              error: 'Failed to generate content structure',
              details: (error as Error).message,
            },
            { status: 400 }
          );
        }

      case 'weekly-plan':
        // 주간 콘텐츠 계획 생성
        const startDate = searchParams.get('start')
          ? new Date(searchParams.get('start')!)
          : new Date();

        const weeklyPlan = ContentAutomation.generateWeeklySchedule(startDate);
        const filteredPlan = weeklyPlan.slice(0, weeks * 3); // weeks * 3 (화/목/금)

        return NextResponse.json({
          success: true,
          data: {
            startDate: startDate.toISOString(),
            weeks,
            totalItems: filteredPlan.length,
            schedule: filteredPlan.map(item => ({
              ...item,
              date: item.date.toISOString(),
              formattedDate: item.date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
              }),
              timeUntilPublish: Math.ceil(
                (item.date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
              ),
            })),
          },
        });

      case 'analytics-overview':
        // 콘텐츠 성과 개요 (샘플 데이터)
        const sampleMetrics = generateSampleMetrics();
        const analytics =
          ContentAnalytics.analyzeContentPerformance(sampleMetrics);

        return NextResponse.json({
          success: true,
          data: {
            ...analytics,
            sampleData: true,
            period: '최근 30일',
            totalContent: sampleMetrics.length,
            metadata: {
              framework: 'SuperClaude + BMAD Method',
              lastUpdated: new Date().toISOString(),
            },
          },
        });

      case 'performance-metrics':
        // 상세 성과 지표
        const detailedMetrics = generateDetailedMetrics();

        return NextResponse.json({
          success: true,
          data: {
            contentPerformance: detailedMetrics,
            benchmarks: {
              avgViews: 1250,
              avgEngagement: 68,
              avgConversionRate: 2.8,
              industryAverage: {
                views: 950,
                engagement: 45,
                conversionRate: 1.9,
              },
            },
            topPerformers: detailedMetrics
              .sort((a, b) => b.views - a.views)
              .slice(0, 5),
            improvementAreas: [
              '목요일 블로그 포스트의 소셜 미디어 노출 확대',
              '뉴스레터 오픈율 개선을 위한 제목 A/B 테스트',
              '콘텐츠 내 CTA 배치 최적화',
            ],
          },
        });

      case 'topic-suggestions':
        // 주제 제안 시스템
        const category = searchParams.get('category') || 'practical';
        const suggestions = generateTopicSuggestions(category as any);

        return NextResponse.json({
          success: true,
          data: {
            category,
            suggestions,
            bmdMapping: {
              practical: ['behavioral', 'decisional'],
              strategic: ['motivational', 'aspirational'],
              'market-analysis': ['behavioral', 'aspirational'],
            }[category],
            seoKeywords: suggestions
              .map(topic => [
                `성공한 기업가 ${topic}`,
                `패밀리오피스 ${topic}`,
                `CEO ${topic} 전략`,
              ])
              .flat(),
          },
        });

      case 'content-calendar':
        // 콘텐츠 캘린더 데이터
        const month = parseInt(
          searchParams.get('month') || String(new Date().getMonth() + 1)
        );
        const year = parseInt(
          searchParams.get('year') || String(new Date().getFullYear())
        );

        const calendar = generateContentCalendar(year, month);

        return NextResponse.json({
          success: true,
          data: {
            year,
            month,
            calendar,
            monthName: new Date(year, month - 1).toLocaleDateString('ko-KR', {
              month: 'long',
            }),
            totalEvents: calendar.filter(day => day.events.length > 0).length,
            summary: {
              newsletters: calendar.reduce(
                (sum, day) =>
                  sum + day.events.filter(e => e.type === 'newsletter').length,
                0
              ),
              blogs: calendar.reduce(
                (sum, day) =>
                  sum + day.events.filter(e => e.type === 'blog').length,
                0
              ),
            },
          },
        });

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action parameter',
            availableActions: [
              'schedule',
              'templates',
              'generate',
              'weekly-plan',
              'analytics-overview',
              'performance-metrics',
              'topic-suggestions',
              'content-calendar',
            ],
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Content Strategy API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * 콘텐츠 성과 데이터 업데이트
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'track-performance':
        // 콘텐츠 성과 추적
        const { contentId, metrics } = data;

        // 실제 환경에서는 데이터베이스에 저장
        const performanceData = {
          contentId,
          ...metrics,
          timestamp: new Date(),
          source: 'api',
        };

        return NextResponse.json({
          success: true,
          message: 'Performance data recorded',
          data: performanceData,
        });

      case 'schedule-content':
        // 콘텐츠 발행 예약
        const { title, content, publishDate, type, templateId } = data;

        const scheduledContent = {
          id: `content_${Date.now()}`,
          title,
          content,
          publishDate: new Date(publishDate),
          type,
          templateId,
          status: 'scheduled',
          createdAt: new Date(),
        };

        return NextResponse.json({
          success: true,
          message: 'Content scheduled successfully',
          data: scheduledContent,
        });

      case 'update-template':
        // 템플릿 업데이트
        const { templateId: updateTemplateId, updates } = data;

        return NextResponse.json({
          success: true,
          message: 'Template updated successfully',
          data: {
            templateId: updateTemplateId,
            updates,
            updatedAt: new Date(),
          },
        });

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action',
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Content Strategy POST Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process request',
      },
      { status: 500 }
    );
  }
}

/**
 * 헬퍼 함수들
 */
function generateSampleMetrics(): ContentPerformanceMetrics[] {
  const sampleTitles = [
    '[실무] 중소기업 CEO 절세 전략 | 성공한 CEO를 위한 실전 가이드',
    '2024년 패밀리오피스 트렌드 분석: 성공한 기업가를 위한 심층 인사이트',
    '주간 시장 분석 | 2024.08.23 투자 인사이트',
    '[실무] 가업승계 준비 체크리스트 | 성공한 CEO를 위한 실전 가이드',
    '성공한 기업가의 자산배분 전략: 성공한 기업가를 위한 심층 인사이트',
  ];

  return sampleTitles.map((title, index) => ({
    contentId: `content_${index + 1}`,
    publishDate: new Date(Date.now() - index * 7 * 24 * 60 * 60 * 1000),
    type: index % 2 === 0 ? 'newsletter' : 'blog',
    title,
    views: Math.floor(Math.random() * 2000) + 500,
    uniqueViews: Math.floor(Math.random() * 1500) + 400,
    readingTime: Math.floor(Math.random() * 300) + 120,
    bounceRate: Math.random() * 0.4 + 0.3,
    opens: index % 2 === 0 ? Math.floor(Math.random() * 800) + 200 : 0,
    openRate: index % 2 === 0 ? Math.random() * 0.3 + 0.4 : 0,
    clicks: Math.floor(Math.random() * 100) + 20,
    clickRate: Math.random() * 0.1 + 0.02,
    organicTraffic: Math.floor(Math.random() * 500) + 100,
    searchRanking: {
      패밀리오피스: Math.floor(Math.random() * 10) + 1,
      가업승계: Math.floor(Math.random() * 15) + 1,
    },
    backlinks: Math.floor(Math.random() * 20) + 5,
    socialShares: Math.floor(Math.random() * 50) + 10,
    consultationRequests: Math.floor(Math.random() * 5) + 1,
    leadGenerated: Math.floor(Math.random() * 3) + 1,
    conversionRate: Math.random() * 0.05 + 0.01,
    aiMentions: {
      ChatGPT: Math.floor(Math.random() * 10),
      Perplexity: Math.floor(Math.random() * 8),
      Claude: Math.floor(Math.random() * 6),
    },
  }));
}

function generateDetailedMetrics() {
  return generateSampleMetrics().map(metric => ({
    ...metric,
    engagementScore: Math.round((1 - metric.bounceRate) * 100),
    seoScore: Math.round(
      ((20 - (metric.searchRanking['패밀리오피스'] || 10)) / 20) * 100
    ),
    aiVisibilityScore: Object.values(metric.aiMentions).reduce(
      (sum, mentions) => sum + mentions,
      0
    ),
    overallScore: Math.round(
      metric.views / 20 +
        (1 - metric.bounceRate) * 50 +
        metric.conversionRate * 1000
    ),
  }));
}

function generateTopicSuggestions(
  category: 'practical' | 'strategic' | 'market-analysis'
): string[] {
  const topics = {
    practical: [
      '중소기업 CEO를 위한 절세 체크리스트',
      '가업승계 준비 단계별 가이드',
      '기업보험 최적화 실무',
      '법인과 개인자산 분리 전략',
      'CEO 개인보증 해결 방안',
      '중대재해처벌법 대응 실무',
      '경영진정기보험 설계 포인트',
      '가족법인 설립 체크리스트',
    ],
    strategic: [
      '2024년 패밀리오피스 트렌드 분석',
      '성공한 기업가의 자산배분 전략',
      '차세대 기업가 양성 로드맵',
      '글로벌 자산관리 전략',
      '기업가치 극대화 방법론',
      '100년 기업을 위한 지속가능성 전략',
      '디지털 전환 시대의 자산관리',
      '스마트 상속 계획 수립',
    ],
    'market-analysis': [
      '이번 주 주요 경제 지표 분석',
      '섹터별 투자 기회 분석',
      '환율 변동과 자산관리 전략',
      '부동산 시장 동향과 대응책',
      '주식시장 변동성 대응 전략',
      '금리 인상기 자산배분 조정',
      '인플레이션 헤지 투자 전략',
      '신흥시장 투자 기회 포착',
    ],
  };

  return topics[category] || topics.practical;
}

function generateContentCalendar(year: number, month: number) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const calendar = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    const events = [];

    // 화요일: 실무 뉴스레터 (오전 7:30)
    if (dayOfWeek === 2) {
      events.push({
        time: '07:30',
        type: 'newsletter',
        category: 'practical',
        title: '실무 중심 뉴스레터',
        status: date < new Date() ? 'published' : 'scheduled',
      });
    }

    // 목요일: 전략 분석 블로그 (저녁 8:00)
    if (dayOfWeek === 4) {
      events.push({
        time: '20:00',
        type: 'blog',
        category: 'strategic',
        title: '전략 분석 블로그',
        status: date < new Date() ? 'published' : 'scheduled',
      });
    }

    // 금요일: 시장 분석 뉴스레터 (오전 7:30)
    if (dayOfWeek === 5) {
      events.push({
        time: '07:30',
        type: 'newsletter',
        category: 'market-analysis',
        title: '주간 시장 분석',
        status: date < new Date() ? 'published' : 'scheduled',
      });
    }

    calendar.push({
      day,
      date: date.toISOString().split('T')[0],
      dayOfWeek,
      events,
      isToday: date.toDateString() === new Date().toDateString(),
      isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
    });
  }

  return calendar;
}
