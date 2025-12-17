/**
 * HubSpot API 통합 클라이언트
 * 리드 관리, 콘택트 동기화, 마케팅 자동화를 위한 HubSpot API 래퍼
 */

import { z } from 'zod';

// HubSpot API 응답 스키마
export const HubSpotContactSchema = z.object({
  id: z.string(),
  properties: z.object({
    email: z.string().optional(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
    jobtitle: z.string().optional(),
    website: z.string().optional(),
    lifecyclestage: z.string().optional(),
    lead_status: z.string().optional(),
    hubspot_owner_id: z.string().optional(),
    createdate: z.string().optional(),
    lastmodifieddate: z.string().optional(),
    // Custom properties for FamilyOffice
    service_interest: z.string().optional(),
    company_size: z.string().optional(),
    revenue_range: z.string().optional(),
    consultation_requested: z.boolean().optional(),
    lead_source: z.string().optional(),
    lead_score: z.number().optional(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
  archived: z.boolean().optional(),
});

export const HubSpotDealSchema = z.object({
  id: z.string(),
  properties: z.object({
    dealname: z.string().optional(),
    amount: z.string().optional(),
    dealstage: z.string().optional(),
    pipeline: z.string().optional(),
    closedate: z.string().optional(),
    dealtype: z.string().optional(),
    deal_probability: z.number().optional(),
    // Custom properties
    service_type: z.string().optional(),
    consultation_type: z.string().optional(),
    estimated_value: z.number().optional(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type HubSpotContact = z.infer<typeof HubSpotContactSchema>;
export type HubSpotDeal = z.infer<typeof HubSpotDealSchema>;

// HubSpot API 에러 타입
export interface HubSpotError {
  status: string;
  message: string;
  correlationId: string;
  category: string;
}

// 리드 상태 enum
export enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  PROPOSAL = 'proposal',
  NEGOTIATION = 'negotiation',
  CLOSED_WON = 'closed_won',
  CLOSED_LOST = 'closed_lost',
}

// 서비스 관심도 enum
export enum ServiceInterest {
  SUCCESSION_PLANNING = 'succession_planning',
  ASSET_MANAGEMENT = 'asset_management',
  TAX_STRATEGY = 'tax_strategy',
  EDUCATION = 'education',
  MULTIPLE = 'multiple',
}

export class HubSpotAPIClient {
  private baseURL = 'https://api.hubapi.com';
  private accessToken: string;

  constructor(accessToken?: string) {
    this.accessToken = accessToken || process.env.HUBSPOT_ACCESS_TOKEN || '';
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    if (!this.accessToken) {
      throw new Error('HubSpot access token is required');
    }

    const url = `${this.baseURL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`HubSpot API Error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    return response.json();
  }

  // ==================== 콘택트 관리 ====================

  /**
   * 새로운 콘택트 생성
   */
  async createContact(contactData: {
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    company?: string;
    jobTitle?: string;
    website?: string;
    serviceInterest?: ServiceInterest;
    leadSource?: string;
    companySize?: string;
    revenueRange?: string;
  }): Promise<HubSpotContact> {
    const properties = {
      email: contactData.email,
      firstname: contactData.firstName,
      lastname: contactData.lastName,
      phone: contactData.phone,
      company: contactData.company,
      jobtitle: contactData.jobTitle,
      website: contactData.website,
      service_interest: contactData.serviceInterest,
      lead_source: contactData.leadSource || 'website',
      company_size: contactData.companySize,
      revenue_range: contactData.revenueRange,
      lifecyclestage: 'lead',
      lead_status: LeadStatus.NEW,
    };

    const response = await this.makeRequest<any>('/crm/v3/objects/contacts', {
      method: 'POST',
      body: JSON.stringify({ properties }),
    });

    return HubSpotContactSchema.parse(response);
  }

  /**
   * 콘택트 조회 (이메일 기준)
   */
  async getContactByEmail(email: string): Promise<HubSpotContact | null> {
    try {
      const response = await this.makeRequest<any>(
        `/crm/v3/objects/contacts/${email}?idProperty=email`
      );
      return HubSpotContactSchema.parse(response);
    } catch (error) {
      // 404인 경우 null 반환
      if (error instanceof Error && error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  /**
   * 콘택트 업데이트
   */
  async updateContact(
    contactId: string,
    properties: Partial<HubSpotContact['properties']>
  ): Promise<HubSpotContact> {
    const response = await this.makeRequest<any>(
      `/crm/v3/objects/contacts/${contactId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ properties }),
      }
    );

    return HubSpotContactSchema.parse(response);
  }

  /**
   * 리드 스코어 업데이트
   */
  async updateLeadScore(contactId: string, score: number): Promise<void> {
    await this.updateContact(contactId, {
      lead_score: score,
    });
  }

  /**
   * 최근 콘택트 목록 조회
   */
  async getRecentContacts(limit = 100): Promise<HubSpotContact[]> {
    const response = await this.makeRequest<any>(
      `/crm/v3/objects/contacts?limit=${limit}&sort=createdate&properties=email,firstname,lastname,company,phone,lifecyclestage,lead_status,lead_score,createdate`
    );

    return response.results.map((contact: any) => HubSpotContactSchema.parse(contact));
  }

  // ==================== 딜 관리 ====================

  /**
   * 새로운 딜 생성
   */
  async createDeal(dealData: {
    dealName: string;
    amount?: number;
    dealStage?: string;
    pipeline?: string;
    closeDate?: string;
    contactId?: string;
    serviceType?: string;
    consultationType?: string;
  }): Promise<HubSpotDeal> {
    const properties = {
      dealname: dealData.dealName,
      amount: dealData.amount?.toString(),
      dealstage: dealData.dealStage || 'appointmentscheduled',
      pipeline: dealData.pipeline || 'default',
      closedate: dealData.closeDate,
      service_type: dealData.serviceType,
      consultation_type: dealData.consultationType,
    };

    const requestBody: any = { properties };

    // 콘택트 연결
    if (dealData.contactId) {
      requestBody.associations = [
        {
          to: { id: dealData.contactId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }]
        }
      ];
    }

    const response = await this.makeRequest<any>('/crm/v3/objects/deals', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    return HubSpotDealSchema.parse(response);
  }

  /**
   * 딜 단계 업데이트
   */
  async updateDealStage(dealId: string, stage: string): Promise<HubSpotDeal> {
    const response = await this.makeRequest<any>(
      `/crm/v3/objects/deals/${dealId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          properties: { dealstage: stage }
        }),
      }
    );

    return HubSpotDealSchema.parse(response);
  }

  // ==================== 활동 추적 ====================

  /**
   * 이메일 활동 추가
   */
  async trackEmailActivity(contactId: string, subject: string, body: string): Promise<void> {
    await this.makeRequest('/crm/v3/objects/emails', {
      method: 'POST',
      body: JSON.stringify({
        properties: {
          hs_email_subject: subject,
          hs_email_text: body,
        },
        associations: [
          {
            to: { id: contactId },
            types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 198 }]
          }
        ]
      }),
    });
  }

  /**
   * 웹사이트 활동 추가
   */
  async trackWebActivity(contactId: string, pageUrl: string, pageTitle?: string): Promise<void> {
    await this.makeRequest('/crm/v3/objects/notes', {
      method: 'POST',
      body: JSON.stringify({
        properties: {
          hs_note_body: `웹사이트 방문: ${pageTitle || pageUrl}`,
          hs_timestamp: new Date().toISOString(),
        },
        associations: [
          {
            to: { id: contactId },
            types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }]
          }
        ]
      }),
    });
  }

  /**
   * 컨설팅 신청 활동 추가
   */
  async trackConsultationRequest(contactId: string, serviceType: string, message: string): Promise<void> {
    await this.makeRequest('/crm/v3/objects/notes', {
      method: 'POST',
      body: JSON.stringify({
        properties: {
          hs_note_body: `컨설팅 신청 - ${serviceType}: ${message}`,
          hs_timestamp: new Date().toISOString(),
        },
        associations: [
          {
            to: { id: contactId },
            types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }]
          }
        ]
      }),
    });
  }

  // ==================== 리스트 및 세분화 ====================

  /**
   * 특정 조건의 콘택트 검색
   */
  async searchContacts(filters: {
    leadStatus?: LeadStatus;
    serviceInterest?: ServiceInterest;
    leadScoreMin?: number;
    lifecycleStage?: string;
  }): Promise<HubSpotContact[]> {
    const filterGroups = [];

    if (filters.leadStatus) {
      filterGroups.push({
        filters: [{
          propertyName: 'lead_status',
          operator: 'EQ',
          value: filters.leadStatus
        }]
      });
    }

    if (filters.serviceInterest) {
      filterGroups.push({
        filters: [{
          propertyName: 'service_interest',
          operator: 'EQ',
          value: filters.serviceInterest
        }]
      });
    }

    if (filters.leadScoreMin) {
      filterGroups.push({
        filters: [{
          propertyName: 'lead_score',
          operator: 'GTE',
          value: filters.leadScoreMin.toString()
        }]
      });
    }

    const response = await this.makeRequest<any>('/crm/v3/objects/contacts/search', {
      method: 'POST',
      body: JSON.stringify({
        filterGroups,
        properties: ['email', 'firstname', 'lastname', 'company', 'lead_status', 'lead_score', 'service_interest'],
        limit: 100,
      }),
    });

    return response.results.map((contact: any) => HubSpotContactSchema.parse(contact));
  }

  // ==================== 마케팅 이벤트 ====================

  /**
   * 마케팅 이벤트 트리거 (이메일 자동화)
   */
  async triggerMarketingEvent(contactId: string, eventName: string, properties?: Record<string, any>): Promise<void> {
    await this.makeRequest('/automation/v2/workflows/trigger', {
      method: 'POST',
      body: JSON.stringify({
        enrollmentTrigger: {
          triggerType: 'PROPERTY_CHANGE',
          propertyName: 'lead_status'
        },
        contactId,
        eventName,
        properties: properties || {},
      }),
    });
  }

  // ==================== 분석 및 리포팅 ====================

  /**
   * 리드 전환율 분석
   */
  async getLeadConversionMetrics(dateRange?: { start: string; end: string }) {
    // HubSpot Analytics API 호출 로직
    const params = new URLSearchParams();
    if (dateRange) {
      params.append('startDate', dateRange.start);
      params.append('endDate', dateRange.end);
    }

    const response = await this.makeRequest<any>(
      `/analytics/v2/reports/contacts/lifecycle?${params.toString()}`
    );

    return response;
  }
}

// 싱글톤 인스턴스
let hubspotClient: HubSpotAPIClient | null = null;

export function getHubSpotClient(): HubSpotAPIClient {
  if (!hubspotClient) {
    hubspotClient = new HubSpotAPIClient();
  }
  return hubspotClient;
}

// HubSpot 웹훅 검증
export function verifyHubSpotWebhook(
  signature: string,
  requestBody: string,
  clientSecret: string
): boolean {
  const crypto = require('crypto');
  const hash = crypto
    .createHmac('sha256', clientSecret)
    .update(requestBody)
    .digest('hex');
  
  return signature === hash;
}