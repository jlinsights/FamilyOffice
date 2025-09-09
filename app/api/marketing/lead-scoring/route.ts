import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { leadScoringEngine, convertToHubSpotProperties } from '@/lib/marketing/lead-scoring';
import { env } from '@/lib/env';

// 리드 스코어링 요청 스키마
const leadScoringSchema = z.object({
  leadId: z.string().min(1, 'Lead ID is required'),
  email: z.string().email('Valid email is required'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  company: z.string().optional(),
  title: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  source: z.string().default('website'),
  activities: z.array(z.object({
    type: z.enum(['page_view', 'form_submission', 'email_click', 'download', 'webinar_attend', 'consultation_request']),
    page: z.string().optional(),
    timestamp: z.string().transform(str => new Date(str)),
    duration: z.number().optional(),
    content: z.string().optional(),
    value: z.number().default(1)
  })).default([]),
  emailMetrics: z.object({
    opens: z.number().default(0),
    clicks: z.number().default(0),
    lastOpened: z.string().transform(str => new Date(str)).optional(),
    lastClicked: z.string().transform(str => new Date(str)).optional(),
    unsubscribed: z.boolean().default(false)
  }).optional()
});

// POST: 리드 스코어 계산
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const leadData = leadScoringSchema.parse(body);
    
    // Lead 객체 생성
    const lead: any = {
      id: leadData.leadId,
      email: leadData.email,
      firstName: leadData.firstName,
      lastName: leadData.lastName,
      company: leadData.company,
      title: leadData.title,
      industry: leadData.industry,
      companySize: leadData.companySize,
      phone: leadData.phone,
      website: leadData.website,
      source: leadData.source,
      createdAt: new Date(),
      lastActivity: leadData.activities.length > 0 
        ? leadData.activities[leadData.activities.length - 1]?.timestamp
        : undefined,
      activities: leadData.activities,
      emailMetrics: leadData.emailMetrics
    };
    
    // 스코어 계산
    const score = leadScoringEngine.calculateScore(lead);
    const priority = leadScoringEngine.getPriority(score);
    const recommendedActions = leadScoringEngine.getRecommendedActions(lead, score);
    
    // HubSpot 속성 변환
    const hubspotProperties = convertToHubSpotProperties(score);
    
    // HubSpot에 스코어 업데이트 (선택적)
    if (env.HUBSPOT_PRIVATE_ACCESS_TOKEN && leadData.email) {
      try {
        await updateHubSpotLeadScore(leadData.email, hubspotProperties);
      } catch (hubspotError) {
        console.error('HubSpot 업데이트 실패:', hubspotError);
        // HubSpot 오류는 전체 프로세스를 중단하지 않음
      }
    }
    
    return NextResponse.json({
      success: true,
      lead: {
        id: lead.id,
        email: lead.email,
        name: `${lead.firstName || ''} ${lead.lastName || ''}`.trim() || lead.email
      },
      score,
      priority,
      recommendedActions,
      hubspotProperties,
      analysis: {
        strengths: getScoreStrengths(score),
        improvements: getScoreImprovements(score),
        nextSteps: getNextSteps(priority, score)
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('리드 스코어링 오류:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Lead scoring failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// GET: 리드 스코어 조회 (이메일 기반)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const includeHistory = searchParams.get('history') === 'true';
    
    if (!email) {
      return NextResponse.json({
        success: false,
        error: 'Email parameter is required'
      }, { status: 400 });
    }
    
    // HubSpot에서 리드 정보 조회
    const leadData = await getHubSpotLead(email);
    
    if (!leadData) {
      return NextResponse.json({
        success: false,
        error: 'Lead not found'
      }, { status: 404 });
    }
    
    const response: any = {
      success: true,
      lead: leadData.contact,
      currentScore: leadData.score,
      lastCalculated: leadData.lastScored
    };
    
    // 스코어 히스토리 포함 (선택적)
    if (includeHistory && leadData.scoreHistory) {
      response.scoreHistory = leadData.scoreHistory;
      response.trend = analyzeScoreTrend(leadData.scoreHistory);
    }
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('리드 스코어 조회 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to retrieve lead score',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// HubSpot에 리드 스코어 업데이트
async function updateHubSpotLeadScore(email: string, properties: Record<string, any>): Promise<void> {
  if (!env.HUBSPOT_PRIVATE_ACCESS_TOKEN) {
    throw new Error('HubSpot token not configured');
  }
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${env.HUBSPOT_PRIVATE_ACCESS_TOKEN}`
  };
  
  // 먼저 연락처 검색
  const searchResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      filterGroups: [{
        filters: [{
          propertyName: 'email',
          operator: 'EQ',
          value: email
        }]
      }]
    })
  });
  
  if (!searchResponse.ok) {
    throw new Error('Failed to search contact in HubSpot');
  }
  
  const searchData = await searchResponse.json();
  
  if (searchData.results && searchData.results.length > 0) {
    const contactId = searchData.results[0].id;
    
    // 연락처 속성 업데이트
    const updateResponse = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ properties })
    });
    
    if (!updateResponse.ok) {
      throw new Error('Failed to update contact properties in HubSpot');
    }
  }
}

// HubSpot에서 리드 정보 조회
async function getHubSpotLead(email: string): Promise<any> {
  if (!env.HUBSPOT_PRIVATE_ACCESS_TOKEN) {
    return null;
  }
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${env.HUBSPOT_PRIVATE_ACCESS_TOKEN}`
  };
  
  try {
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        filterGroups: [{
          filters: [{
            propertyName: 'email',
            operator: 'EQ',
            value: email
          }]
        }],
        properties: [
          'email', 'firstname', 'lastname', 'company', 'jobtitle',
          'lead_score', 'lead_grade', 'lead_temperature',
          'demographic_score', 'behavioral_score', 'engagement_score', 'recency_score',
          'last_scored'
        ]
      })
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const contact = data.results[0];
      
      return {
        contact: {
          id: contact.id,
          email: contact.properties.email,
          firstName: contact.properties.firstname,
          lastName: contact.properties.lastname,
          company: contact.properties.company,
          title: contact.properties.jobtitle
        },
        score: {
          total: parseInt(contact.properties.lead_score) || 0,
          grade: contact.properties.lead_grade,
          hotness: contact.properties.lead_temperature,
          demographic: parseInt(contact.properties.demographic_score) || 0,
          behavioral: parseInt(contact.properties.behavioral_score) || 0,
          engagement: parseInt(contact.properties.engagement_score) || 0,
          timing: parseInt(contact.properties.recency_score) || 0
        },
        lastScored: contact.properties.last_scored
      };
    }
    
    return null;
  } catch (error) {
    console.error('HubSpot 조회 오류:', error);
    return null;
  }
}

// 스코어 강점 분석
function getScoreStrengths(score: any): string[] {
  const strengths: string[] = [];
  
  if (score.demographic >= 20) strengths.push('높은 타겟 적합성');
  if (score.behavioral >= 30) strengths.push('활발한 웹사이트 활동');
  if (score.engagement >= 15) strengths.push('높은 이메일 참여도');
  if (score.timing >= 10) strengths.push('최근 활동 활발');
  if (score.hotness === 'Hot') strengths.push('즉시 대응 필요');
  
  return strengths.length > 0 ? strengths : ['기본적인 관심도 보유'];
}

// 스코어 개선 영역 분석
function getScoreImprovements(score: any): string[] {
  const improvements: string[] = [];
  
  if (score.demographic < 15) improvements.push('타겟 정보 보완 필요');
  if (score.behavioral < 20) improvements.push('웹사이트 참여 유도 필요');
  if (score.engagement < 10) improvements.push('이메일 참여율 개선 필요');
  if (score.timing < 5) improvements.push('재참여 유도 캠페인 필요');
  
  return improvements;
}

// 다음 단계 제안
function getNextSteps(priority: string, score: any): string[] {
  const steps: string[] = [];
  
  switch (priority) {
    case 'High':
      steps.push('즉시 세일즈팀 배정');
      steps.push('개인화된 제안서 준비');
      steps.push('1:1 미팅 스케줄링');
      break;
      
    case 'Medium':
      steps.push('마케팅 자동화 워크플로우 진입');
      steps.push('맞춤 콘텐츠 제공');
      steps.push('정기적 팔로업 설정');
      break;
      
    case 'Low':
      steps.push('넛처링 이메일 시퀀스 진입');
      steps.push('교육 콘텐츠 제공');
      steps.push('장기 관계 구축');
      break;
  }
  
  return steps;
}

// 스코어 트렌드 분석
function analyzeScoreTrend(scoreHistory: any[]): any {
  if (scoreHistory.length < 2) {
    return { trend: 'insufficient_data', change: 0 };
  }
  
  const latest = scoreHistory[scoreHistory.length - 1];
  const previous = scoreHistory[scoreHistory.length - 2];
  const change = latest.total - previous.total;
  
  let trend = 'stable';
  if (change > 5) trend = 'increasing';
  else if (change < -5) trend = 'decreasing';
  
  return {
    trend,
    change,
    period: `${scoreHistory.length} measurements`,
    recommendation: getTrendRecommendation(trend, change)
  };
}

function getTrendRecommendation(trend: string, change: number): string {
  switch (trend) {
    case 'increasing':
      return '긍정적인 트렌드. 지속적인 관심 유도 필요';
    case 'decreasing':
      return '관심도 하락. 재참여 캠페인 고려 필요';
    default:
      return '안정적인 관심도. 지속적인 넛처링 필요';
  }
}