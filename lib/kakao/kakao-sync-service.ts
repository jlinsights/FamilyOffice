/**
 * 카카오 싱크 서비스
 * 카카오톡 메시지, 채널 연동, 상담 시스템 등의 고급 카카오 기능 제공
 */
import { createClient } from '@/lib/supabase/client';
import { safeFrom } from '@/lib/supabase/helpers';

import { Database } from '@/types/supabase';

// type UserRecord = Database['public']['Tables']['users']['Row']; // 미사용
type ConsultationRecord = Database['public']['Tables']['consultations']['Row'];

interface KakaoMessageTemplate {
  object_type: 'text' | 'feed' | 'list' | 'location' | 'commerce';
  text?: string;
  link: {
    web_url?: string;
    mobile_web_url?: string;
  };
  button_title?: string;
}

interface KakaoSyncOptions {
  enableNotifications?: boolean;
  enableChannelSync?: boolean;
  enableAutoReply?: boolean;
}

export class KakaoSyncService {
  private supabase;
  private channelId: string;
  private isEnabled: boolean;

  constructor() {
    this.supabase = createClient();
    this.channelId = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID || '';
    this.isEnabled = !!this.channelId;
  }

  /**
   * 상담 예약 시 카카오톡 알림 발송
   */
  async sendConsultationNotification(consultationId: string): Promise<boolean> {
    if (!this.isEnabled) {
      console.log('카카오 싱크가 비활성화되어 있습니다.');
      return false;
    }

    try {
      // 상담 정보 조회
      const { data: consultation, error } = await safeFrom(
        this.supabase,
        'consultations'
      )
        .select('*')
        .eq('id', consultationId)
        .single();

      if (error || !consultation) {
        console.error('상담 정보 조회 실패:', error);
        return false;
      }

      // 카카오톡 메시지 템플릿 생성
      const message = this.createConsultationMessage(consultation);

      // 개발 환경에서는 로그만 출력
      if (process.env.NODE_ENV === 'development') {
        console.log('📱 카카오톡 상담 알림 (개발 모드):', {
          to: consultation.email,
          message,
          timestamp: new Date().toISOString(),
        });
        return true;
      }

      // 실제 카카오톡 메시지 발송 (구현 필요)
      return await this.sendKakaoMessage(consultation.email, message);
    } catch (error) {
      console.error('상담 알림 발송 실패:', error);
      return false;
    }
  }

  /**
   * 뉴스레터 구독 시 카카오톡 환영 메시지
   */
  async sendNewsletterWelcome(userEmail: string): Promise<boolean> {
    if (!this.isEnabled) return false;

    try {
      const message: KakaoMessageTemplate = {
        object_type: 'text',
        text: `🌟 FamilyOffice S 뉴스레터 구독 환영!

📬 매주 화/금 발송되는 프리미엄 콘텐츠
✅ 가업승계 실전 노하우
✅ 법인보험 최적화 전략  
✅ 자산관리 전문가 인사이트

💡 성공한 CEO들의 선택, 함께하세요!`,
        link: {
          web_url: 'https://newsletter.familyoffices.vip',
          mobile_web_url: 'https://newsletter.familyoffices.vip',
        },
        button_title: '뉴스레터 보기',
      };

      return await this.sendKakaoMessage(userEmail, message);
    } catch (error) {
      console.error('뉴스레터 환영 메시지 발송 실패:', error);
      return false;
    }
  }

  /**
   * 카카오톡 채널 추가 안내
   */
  async promoteChannelSubscription(_userId: string): Promise<boolean> {
    if (!this.isEnabled || !this.channelId) return false;

    try {
      // 브라우저 환경에서만 실행
      if (typeof window === 'undefined') return false;

      // 카카오 SDK 확인
      if (!window.Kakao?.Channel) {
        console.error('카카오 Channel API가 로드되지 않았습니다.');
        return false;
      }

      // 채널 추가 팝업 표시
      window.Kakao.Channel.addChannel({
        channelPublicId: this.channelId,
      });

      return true;
    } catch (error) {
      console.error('카카오톡 채널 추가 실패:', error);
      return false;
    }
  }

  /**
   * 카카오톡 채널 채팅 시작
   */
  async startChannelChat(): Promise<boolean> {
    if (!this.isEnabled || !this.channelId) return false;

    try {
      // 브라우저 환경에서만 실행
      if (typeof window === 'undefined') return false;

      // 카카오 SDK 확인
      if (!window.Kakao?.Channel) {
        console.error('카카오 Channel API가 로드되지 않았습니다.');
        return false;
      }

      // 채널 채팅 시작
      window.Kakao.Channel.chat({
        channelPublicId: this.channelId,
      });

      return true;
    } catch (error) {
      console.error('카카오톡 채널 채팅 시작 실패:', error);
      return false;
    }
  }

  /**
   * 카카오톡 공유하기
   */
  static shareToKakao(content: {
    title: string;
    description: string;
    imageUrl?: string;
    linkUrl?: string;
  }): boolean {
    try {
      // 브라우저 환경에서만 실행
      if (typeof window === 'undefined') return false;

      // 카카오 SDK 확인
      if (!window.Kakao?.Share) {
        console.error('카카오 Share API가 로드되지 않았습니다.');
        return false;
      }

      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: content.title,
          description: content.description,
          imageUrl:
            content.imageUrl ||
            'https://familyoffices.vip/images/og-image-familyoffice-v2.png',
          link: {
            mobileWebUrl: content.linkUrl || process.env.NEXT_PUBLIC_APP_URL,
            webUrl: content.linkUrl || process.env.NEXT_PUBLIC_APP_URL,
          },
        },
        buttons: [
          {
            title: '자세히 보기',
            link: {
              mobileWebUrl: content.linkUrl || process.env.NEXT_PUBLIC_APP_URL,
              webUrl: content.linkUrl || process.env.NEXT_PUBLIC_APP_URL,
            },
          },
        ],
      });

      return true;
    } catch (error) {
      console.error('카카오톡 공유 실패:', error);
      return false;
    }
  }

  /**
   * 사용자별 카카오 싱크 설정 관리
   */
  async updateUserSyncSettings(
    userId: string,
    options: KakaoSyncOptions
  ): Promise<boolean> {
    try {
      // users 테이블에 싱크 설정 저장 (향후 컬럼 추가 시)
      // 현재는 로컬 스토리지 또는 별도 테이블 사용

      if (typeof window !== 'undefined') {
        localStorage.setItem(`kakao_sync_${userId}`, JSON.stringify(options));
      }

      return true;
    } catch (error) {
      console.error('카카오 싱크 설정 저장 실패:', error);
      return false;
    }
  }

  /**
   * 사용자별 카카오 싱크 설정 조회
   */
  getUserSyncSettings(userId: string): KakaoSyncOptions {
    try {
      if (typeof window === 'undefined') {
        return {
          enableNotifications: true,
          enableChannelSync: true,
          enableAutoReply: false,
        };
      }

      const settings = localStorage.getItem(`kakao_sync_${userId}`);
      return settings
        ? JSON.parse(settings)
        : {
            enableNotifications: true,
            enableChannelSync: true,
            enableAutoReply: false,
          };
    } catch (error) {
      console.error('카카오 싱크 설정 조회 실패:', error);
      return {
        enableNotifications: true,
        enableChannelSync: true,
        enableAutoReply: false,
      };
    }
  }

  /**
   * 상담 메시지 템플릿 생성
   */
  private createConsultationMessage(
    consultation: ConsultationRecord
  ): KakaoMessageTemplate {
    return {
      object_type: 'text',
      text: `🎯 FamilyOffice S 상담 예약 완료!

📋 예약 정보
• 성함: ${consultation.name}
• 서비스: ${consultation.service_type}
• 연락처: ${consultation.phone}

📞 담당자가 24시간 내에 연락드립니다.

💼 성공한 CEO를 위한 프리미엄 패밀리오피스
✨ 가업승계·자산관리 완전해결`,
      link: {
        web_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
        mobile_web_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      },
      button_title: '상담 현황 확인',
    };
  }

  /**
   * 실제 카카오톡 메시지 발송 (구현 필요)
   */
  private async sendKakaoMessage(
    userEmail: string,
    message: KakaoMessageTemplate
  ): Promise<boolean> {
    try {
      // 개발 환경에서는 콘솔 로그
      if (process.env.NODE_ENV === 'development') {
        console.log('📱 카카오톡 메시지 발송 시뮬레이션:', {
          to: userEmail,
          message,
          timestamp: new Date().toISOString(),
        });
        return true;
      }

      // 실제 구현 시 카카오 비즈니스 메시지 API 사용
      // 현재는 기본 브라우저 알림으로 대체
      if (typeof window !== 'undefined' && 'Notification' in window) {
        if (Notification.permission === 'granted') {
          new Notification('FamilyOffice S', {
            body: message.text?.substring(0, 100) || '새로운 알림이 있습니다.',
            icon: '/favicon.ico',
          });
        }
      }

      return true;
    } catch (error) {
      console.error('카카오톡 메시지 발송 실패:', error);
      return false;
    }
  }

  /**
   * 서비스 상태 확인
   */
  getStatus(): { enabled: boolean; channelId: string; features: string[] } {
    return {
      enabled: this.isEnabled,
      channelId: this.channelId
        ? `${this.channelId.substring(0, 8)}...`
        : '설정 안됨',
      features: ['상담 알림', '뉴스레터 환영', '채널 연동', '메시지 공유'],
    };
  }
}

// 싱글톤 인스턴스
let kakaoSyncInstance: KakaoSyncService | null = null;

export const getKakaoSyncService = (): KakaoSyncService => {
  if (!kakaoSyncInstance) {
    kakaoSyncInstance = new KakaoSyncService();
  }
  return kakaoSyncInstance;
};
