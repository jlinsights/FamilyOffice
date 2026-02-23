'use client';

import React, { useEffect } from 'react';
import HubSpotFormIntegration from '@/lib/hubspot-integration';

/**
 * HubSpot 통합 컴포넌트
 * 폼 제출, 이메일 도메인 차단, 체크박스 유효성 검사 기능 제공
 */
export function HubSpotIntegration() {
  useEffect(() => {
    try {
      // HubSpot 통합 초기화
      new HubSpotFormIntegration();
    } catch (error) {
      console.warn('HubSpot 통합 초기화 실패:', error);
      // HubSpot 통합이 실패해도 앱이 계속 작동하도록 함
    }
  }, []);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
}

/**
 * HubSpot 폼 래퍼 컴포넌트
 * HubSpot 폼을 감싸는 컨테이너
 */
interface HubSpotFormProps {
  children: React.ReactNode;
  className?: string;
}

export function HubSpotForm({ children, className }: HubSpotFormProps) {
  return (
    <div className={className} data-wf-hs-form>
      {children}
    </div>
  );
}

/**
 * HubSpot API 폼 래퍼 컴포넌트
 * HubSpot API를 사용하는 폼을 감싸는 컨테이너
 */
interface HubSpotApiFormProps {
  children: React.ReactNode;
  className?: string;
  formUrl: string;
}

export function HubSpotApiForm({
  children,
  className,
  formUrl,
}: HubSpotApiFormProps) {
  return (
    <div className={className} data-webflow-hubspot-api-form-url={formUrl}>
      {children}
    </div>
  );
}

/**
 * HubSpot 필드 컴포넌트
 * HubSpot 필드 매핑을 위한 래퍼
 */
interface HubSpotFieldProps {
  children: React.ReactNode;
  fieldName: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'checkbox' | 'radio' | 'file';
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export function HubSpotField({
  children,
  fieldName,
  type = 'text',
  required = false,
  placeholder,
  className,
}: HubSpotFieldProps) {
  return (
    <div className={className}>
      {React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        'data-wfhsfieldname': fieldName,
        type,
        required,
        placeholder,
      })}
    </div>
  );
}
