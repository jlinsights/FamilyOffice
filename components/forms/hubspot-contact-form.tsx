'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { HubSpotForm, HubSpotField, HubSpotApiForm } from '@/components/hubspot-integration'

interface HubSpotContactFormProps {
  className?: string
  formId?: string
}

/**
 * HubSpot 연락처 폼 컴포넌트
 * 이메일 도메인 차단, 체크박스 유효성 검사 기능 포함
 */
export function HubSpotContactForm({ className, formId }: HubSpotContactFormProps) {
  return (
    <HubSpotForm className={className}>
      <form 
        action={`https://api.hubapi.com/submissions/v3/integration/submit/${formId || 'default-form-id'}`}
        method="POST"
        className="space-y-6"
      >
        {/* 이름 필드 */}
        <div className="space-y-2">
          <Label htmlFor="firstname">이름 *</Label>
          <HubSpotField fieldName="firstname" required>
            <Input
              id="firstname"
              name="firstname"
              type="text"
              placeholder="이름을 입력하세요"
              required
            />
          </HubSpotField>
        </div>

        {/* 성 필드 */}
        <div className="space-y-2">
          <Label htmlFor="lastname">성 *</Label>
          <HubSpotField fieldName="lastname" required>
            <Input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="성을 입력하세요"
              required
            />
          </HubSpotField>
        </div>

        {/* 이메일 필드 */}
        <div className="space-y-2">
          <Label htmlFor="email">이메일 *</Label>
          <HubSpotField fieldName="email" type="email" required>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력하세요"
              required
            />
          </HubSpotField>
        </div>

        {/* 전화번호 필드 */}
        <div className="space-y-2">
          <Label htmlFor="phone">전화번호</Label>
          <HubSpotField fieldName="phone" type="tel">
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="전화번호를 입력하세요"
            />
          </HubSpotField>
        </div>

        {/* 회사명 필드 */}
        <div className="space-y-2">
          <Label htmlFor="company">회사명</Label>
          <HubSpotField fieldName="company">
            <Input
              id="company"
              name="company"
              type="text"
              placeholder="회사명을 입력하세요"
            />
          </HubSpotField>
        </div>

        {/* 직책 필드 */}
        <div className="space-y-2">
          <Label htmlFor="jobtitle">직책</Label>
          <HubSpotField fieldName="jobtitle">
            <Input
              id="jobtitle"
              name="jobtitle"
              type="text"
              placeholder="직책을 입력하세요"
            />
          </HubSpotField>
        </div>

        {/* 메시지 필드 */}
        <div className="space-y-2">
          <Label htmlFor="message">문의사항 *</Label>
          <HubSpotField fieldName="message" required>
            <Textarea
              id="message"
              name="message"
              placeholder="문의사항을 입력하세요"
              rows={5}
              required
            />
          </HubSpotField>
        </div>

        {/* 관심 서비스 체크박스 */}
        <div className="space-y-3">
          <Label>관심 있는 서비스 *</Label>
          <div className="space-y-2">
            <HubSpotField fieldName="services" type="checkbox">
              <div className="flex items-center space-x-2">
                <Checkbox id="service1" name="services" value="asset-management" />
                <Label htmlFor="service1">자산관리</Label>
              </div>
            </HubSpotField>
            
            <HubSpotField fieldName="services" type="checkbox">
              <div className="flex items-center space-x-2">
                <Checkbox id="service2" name="services" value="tax-consulting" />
                <Label htmlFor="service2">세무컨설팅</Label>
              </div>
            </HubSpotField>
            
            <HubSpotField fieldName="services" type="checkbox">
              <div className="flex items-center space-x-2">
                <Checkbox id="service3" name="services" value="succession-planning" />
                <Label htmlFor="service3">가업승계</Label>
              </div>
            </HubSpotField>
            
            <HubSpotField fieldName="services" type="checkbox">
              <div className="flex items-center space-x-2">
                <Checkbox id="service4" name="services" value="investment-advisory" />
                <Label htmlFor="service4">투자자문</Label>
              </div>
            </HubSpotField>
          </div>
        </div>

        {/* 개인정보 처리방침 동의 */}
        <div className="space-y-2">
          <HubSpotField fieldName="privacy_consent" type="checkbox" required>
            <div className="flex items-start space-x-2">
              <Checkbox id="privacy" name="privacy_consent" value="yes" required />
              <Label htmlFor="privacy" className="text-sm">
                <a href="/privacy" className="text-primary hover:underline">
                  개인정보 처리방침
                </a>에 동의합니다. *
              </Label>
            </div>
          </HubSpotField>
        </div>

        {/* 마케팅 수신 동의 */}
        <div className="space-y-2">
          <HubSpotField fieldName="marketing_consent" type="checkbox">
            <div className="flex items-start space-x-2">
              <Checkbox id="marketing" name="marketing_consent" value="yes" />
              <Label htmlFor="marketing" className="text-sm">
                마케팅 정보 수신에 동의합니다. (선택사항)
              </Label>
            </div>
          </HubSpotField>
        </div>

        {/* 숨겨진 필드들 */}
        <input type="hidden" name="hutk" />
        <input type="hidden" name="pageUri" />
        <input type="hidden" name="pageName" />
        <input type="hidden" name="pageId" />

        {/* 제출 버튼 */}
        <Button type="submit" className="w-full">
          문의하기
        </Button>
      </form>
    </HubSpotForm>
  )
}

/**
 * HubSpot API를 사용하는 연락처 폼
 */
export function HubSpotApiContactForm({ className, formId }: HubSpotContactFormProps) {
  return (
    <HubSpotApiForm 
      className={className} 
      formUrl={`https://api.hubapi.com/submissions/v3/integration/submit/${formId || 'default-form-id'}`}
    >
      <form className="space-y-6">
        {/* 이름 필드 */}
        <div className="space-y-2">
          <Label htmlFor="api-firstname">이름 *</Label>
          <HubSpotField fieldName="firstname" required>
            <Input
              id="api-firstname"
              type="text"
              placeholder="이름을 입력하세요"
              required
            />
          </HubSpotField>
        </div>

        {/* 이메일 필드 */}
        <div className="space-y-2">
          <Label htmlFor="api-email">이메일 *</Label>
          <HubSpotField fieldName="email" type="email" required>
            <Input
              id="api-email"
              type="email"
              placeholder="이메일을 입력하세요"
              required
            />
          </HubSpotField>
        </div>

        {/* 메시지 필드 */}
        <div className="space-y-2">
          <Label htmlFor="api-message">문의사항 *</Label>
          <HubSpotField fieldName="message" required>
            <Textarea
              id="api-message"
              placeholder="문의사항을 입력하세요"
              rows={5}
              required
            />
          </HubSpotField>
        </div>

        {/* 제출 버튼 */}
        <Button type="submit" className="w-full">
          문의하기
        </Button>
      </form>
    </HubSpotApiForm>
  )
} 