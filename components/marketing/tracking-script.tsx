/**
 * 행동 추적 스크립트 컴포넌트
 * 클라이언트 사이드에서 사용자 행동을 자동으로 추적
 */

'use client';

import { useEffect, useRef } from 'react';


import {
    BehavioralTracker,
    initializeBehavioralTracker,
} from '@/lib/marketing/behavioral-tracker';

/**
 * 행동 추적 스크립트 컴포넌트
 * 클라이언트 사이드에서 사용자 행동을 자동으로 추적
 */

interface TrackingScriptProps {
  contactId?: string;
  enablePageTracking?: boolean;
  enableScrollTracking?: boolean;
  enableTimeTracking?: boolean;
  enableFormTracking?: boolean;
  debug?: boolean;
}

export function TrackingScript({
  contactId,
  enablePageTracking = true,
  enableScrollTracking = true,
  enableTimeTracking = true,
  enableFormTracking = true,
  debug = false,
}: TrackingScriptProps) {
  const { user } = useSafeUser();
  const trackerRef = useRef<BehavioralTracker | null>(null);
  const sessionIdRef = useRef<string>('');

  useEffect(() => {
    // 세션 ID 생성 (한 번만)
    if (!sessionIdRef.current) {
      sessionIdRef.current = generateSessionId();
    }

    // 추적할 콘택트 ID 결정
    const effectiveContactId =
      contactId || user?.emailAddresses?.[0]?.emailAddress || '';

    // 콘택트 ID가 없으면 추적하지 않음
    if (!effectiveContactId) {
      if (debug) {
        console.log('🚫 추적 스킵: 콘택트 ID 없음');
      }
      return;
    }

    // 행동 추적기 초기화
    try {
      const tracker = initializeBehavioralTracker({
        contactId: effectiveContactId,
        ...(user?.id && { userId: user.id }),
        sessionId: sessionIdRef.current,
        enablePageTracking,
        enableScrollTracking,
        enableTimeTracking,
        enableFormTracking,
      });

      trackerRef.current = tracker;

      if (debug) {
        console.log('🎯 행동 추적기 초기화:', {
          contactId: effectiveContactId,
          userId: user?.id,
          sessionId: sessionIdRef.current,
        });
      }
    } catch (error) {
      console.error('행동 추적기 초기화 실패:', error);
    }

    // 클린업
    return () => {
      if (trackerRef.current) {
        trackerRef.current.stopTracking();
      }
    };
  }, [
    contactId,
    user?.id,
    user?.emailAddresses,
    enablePageTracking,
    enableScrollTracking,
    enableTimeTracking,
    enableFormTracking,
    debug,
  ]);

  // 콘택트 ID 변경 시 업데이트
  useEffect(() => {
    const effectiveContactId =
      contactId || user?.emailAddresses?.[0]?.emailAddress || '';

    if (trackerRef.current && effectiveContactId) {
      trackerRef.current.updateContactId(effectiveContactId);

      if (debug) {
        console.log('🔄 콘택트 ID 업데이트:', effectiveContactId);
      }
    }
  }, [contactId, user?.emailAddresses, debug]);

  return null; // 렌더링할 UI 없음
}

/**
 * 특정 이벤트를 추적하기 위한 훅
 */
export function useEventTracking() {
  const trackerRef = useRef<BehavioralTracker | null>(null);

  // 전역 추적기 가져오기
  useEffect(() => {
    const {
      getBehavioralTracker,
    } = require('@/lib/marketing/behavioral-tracker');
    trackerRef.current = getBehavioralTracker();
  }, []);

  const trackEvent = async (
    eventName: string,
    eventData?: Record<string, any>
  ) => {
    if (trackerRef.current) {
      await trackerRef.current.trackCustomEvent(eventName, eventData || {});
    }
  };

  const trackConsultationRequest = async (
    serviceType: string,
    formData: Record<string, any>
  ) => {
    await trackEvent('consultation_request', {
      service_type: serviceType,
      form_data: formData,
      page_context: window.location.pathname,
    });
  };

  const trackDownload = async (documentType: string, documentUrl: string) => {
    await trackEvent('document_download', {
      document_type: documentType,
      document_url: documentUrl,
      page_context: window.location.pathname,
    });
  };

  const trackVideoEngagement = async (
    videoId: string,
    action: 'play' | 'pause' | 'complete',
    progress?: number
  ) => {
    await trackEvent('video_engagement', {
      video_id: videoId,
      action,
      progress_percent: progress,
      page_context: window.location.pathname,
    });
  };

  const trackServiceInquiry = async (
    serviceCategory: string,
    inquiryDetails: Record<string, any>
  ) => {
    await trackEvent('service_inquiry', {
      service_category: serviceCategory,
      inquiry_details: inquiryDetails,
      page_context: window.location.pathname,
    });
  };

  return {
    trackEvent,
    trackConsultationRequest,
    trackDownload,
    trackVideoEngagement,
    trackServiceInquiry,
  };
}

/**
 * HubSpot 웹훅과 연동하기 위한 추적 컴포넌트
 */
export function HubSpotTrackingScript({
  hubspotContactId,
}: {
  hubspotContactId: string;
}) {
  return (
    <TrackingScript
      contactId={hubspotContactId}
      enablePageTracking={true}
      enableScrollTracking={true}
      enableTimeTracking={true}
      enableFormTracking={true}
    />
  );
}

/**
 * 세션 ID 생성 함수
 */
function generateSessionId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 15);
  return `session_${timestamp}_${randomStr}`;
}

/**
 * 고급 추적 설정을 위한 컴포넌트
 */
interface AdvancedTrackingScriptProps extends TrackingScriptProps {
  customEvents?: {
    trackOutboundLinks?: boolean;
    trackFileDownloads?: boolean;
    trackVideoInteractions?: boolean;
    trackErrorEvents?: boolean;
  };
}

export function AdvancedTrackingScript({
  customEvents = {},
  ...props
}: AdvancedTrackingScriptProps) {
  const { trackEvent } = useEventTracking();

  useEffect(() => {
    // 외부 링크 클릭 추적
    if (customEvents.trackOutboundLinks) {
      const handleLinkClick = (event: MouseEvent) => {
        const target = event.target as HTMLAnchorElement;
        if (
          target.tagName === 'A' &&
          target.href &&
          !target.href.includes(window.location.hostname)
        ) {
          trackEvent('outbound_link_click', {
            link_url: target.href,
            link_text: target.textContent?.substring(0, 100) || '',
            page_context: window.location.pathname,
          });
        }
      };

      document.addEventListener('click', handleLinkClick);
      return () => document.removeEventListener('click', handleLinkClick);
    }
    return () => {}; // 빈 cleanup 함수
  }, [customEvents.trackOutboundLinks, trackEvent]);

  useEffect(() => {
    // 파일 다운로드 추적
    if (customEvents.trackFileDownloads) {
      const handleDownloadClick = (event: MouseEvent) => {
        const target = event.target as HTMLAnchorElement;
        if (target.tagName === 'A' && target.href) {
          const fileExtensions = [
            '.pdf',
            '.doc',
            '.docx',
            '.xls',
            '.xlsx',
            '.ppt',
            '.pptx',
            '.zip',
            '.rar',
          ];
          const hasFileExtension = fileExtensions.some(ext =>
            target.href.toLowerCase().includes(ext)
          );

          if (hasFileExtension) {
            trackEvent('file_download', {
              file_url: target.href,
              file_name: target.textContent?.substring(0, 100) || '',
              file_type: getFileExtension(target.href),
              page_context: window.location.pathname,
            });
          }
        }
      };

      document.addEventListener('click', handleDownloadClick);
      return () => document.removeEventListener('click', handleDownloadClick);
    }
    return () => {}; // 빈 cleanup 함수
  }, [customEvents.trackFileDownloads, trackEvent]);

  useEffect(() => {
    // 에러 이벤트 추적
    if (customEvents.trackErrorEvents) {
      const handleError = (event: ErrorEvent) => {
        trackEvent('javascript_error', {
          error_message: event.message,
          error_filename: event.filename,
          error_lineno: event.lineno,
          page_context: window.location.pathname,
        });
      };

      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        trackEvent('unhandled_promise_rejection', {
          error_reason:
            event.reason?.toString()?.substring(0, 200) || 'Unknown',
          page_context: window.location.pathname,
        });
      };

      window.addEventListener('error', handleError);
      window.addEventListener('unhandledrejection', handleUnhandledRejection);

      return () => {
        window.removeEventListener('error', handleError);
        window.removeEventListener(
          'unhandledrejection',
          handleUnhandledRejection
        );
      };
    }
    return () => {}; // 빈 cleanup 함수
  }, [customEvents.trackErrorEvents, trackEvent]);

  return <TrackingScript {...props} />;
}

/**
 * 파일 확장자 추출
 */
function getFileExtension(url: string): string {
  const match = url.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
  return match?.[1]?.toLowerCase() || 'unknown';
}
