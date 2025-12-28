/**
 * 카카오 비즈니스 API 실제 연동 서비스
 * 카카오톡 메시지 발송, 프로필 조회, 비즈니스 기능 구현
 */

interface KakaoProfile {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
  kakao_account?: {
    profile_nickname_needs_agreement?: boolean;
    profile_image_needs_agreement?: boolean;
    profile?: {
      nickname: string;
      thumbnail_image_url?: string;
      profile_image_url?: string;
      is_default_image?: boolean;
    };
    name_needs_agreement?: boolean;
    name?: string;
    email_needs_agreement?: boolean;
    is_email_valid?: boolean;
    is_email_verified?: boolean;
    email?: string;
    age_range_needs_agreement?: boolean;
    age_range?: string;
    birthday_needs_agreement?: boolean;
    birthday?: string;
    gender_needs_agreement?: boolean;
    gender?: 'female' | 'male';
  };
}

interface KakaoMessageTemplate {
  object_type: 'text' | 'feed' | 'list' | 'location' | 'commerce';
  text?: string;
  link?: {
    web_url?: string;
    mobile_web_url?: string;
  };
  button_title?: string;
  content?: {
    title: string;
    description: string;
    image_url?: string;
    image_width?: number;
    image_height?: number;
    link: {
      web_url?: string;
      mobile_web_url?: string;
    };
  };
  buttons?: Array<{
    title: string;
    link: {
      web_url?: string;
      mobile_web_url?: string;
    };
  }>;
}

interface KakaoAPIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: number;
    message: string;
    details?: any;
  };
}

export class KakaoBusinessAPIService {
  private readonly BASE_URL = 'https://kapi.kakao.com';
  private readonly ADMIN_KEY: string;
  private readonly REST_API_KEY: string;

  constructor() {
    this.ADMIN_KEY = process.env.KAKAO_ADMIN_KEY || '';
    this.REST_API_KEY = process.env.KAKAO_REST_API_KEY || '';
  }

  /**
   * 사용자 프로필 정보 조회
   */
  async getUserProfile(
    accessToken: string
  ): Promise<KakaoAPIResponse<KakaoProfile>> {
    try {
      const response = await fetch(`${this.BASE_URL}/v2/user/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: {
            code: response.status,
            message: errorData.msg || '프로필 조회에 실패했습니다.',
            details: errorData,
          },
        };
      }

      const profileData: KakaoProfile = await response.json();

      return {
        success: true,
        data: profileData,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 0,
          message: '네트워크 오류가 발생했습니다.',
          details: error,
        },
      };
    }
  }

  /**
   * 나에게 메시지 보내기 (개발/테스트용)
   */
  async sendMessageToMe(
    accessToken: string,
    template: KakaoMessageTemplate
  ): Promise<KakaoAPIResponse> {
    try {
      const templateObject = JSON.stringify(template);

      const response = await fetch(
        `${this.BASE_URL}/v2/api/talk/memo/default/send`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            template_object: templateObject,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: {
            code: response.status,
            message: errorData.msg || '메시지 발송에 실패했습니다.',
            details: errorData,
          },
        };
      }

      const result = await response.json();

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 0,
          message: '네트워크 오류가 발생했습니다.',
          details: error,
        },
      };
    }
  }

  /**
   * 친구에게 메시지 보내기 (비즈니스 계정 필요)
   */
  async sendMessageToFriends(
    accessToken: string,
    template: KakaoMessageTemplate,
    receiverUuids: string[]
  ): Promise<KakaoAPIResponse> {
    try {
      const templateObject = JSON.stringify(template);

      const response = await fetch(
        `${this.BASE_URL}/v1/api/talk/friends/message/default/send`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            template_object: templateObject,
            receiver_uuids: JSON.stringify(receiverUuids),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: {
            code: response.status,
            message: errorData.msg || '친구 메시지 발송에 실패했습니다.',
            details: errorData,
          },
        };
      }

      const result = await response.json();

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 0,
          message: '네트워크 오류가 발생했습니다.',
          details: error,
        },
      };
    }
  }

  /**
   * 상담 예약 완료 메시지 템플릿
   */
  createConsultationTemplate(data: {
    name: string;
    serviceType: string;
    phone: string;
    consultationDate?: string;
  }): KakaoMessageTemplate {
    return {
      object_type: 'feed',
      content: {
        title: '🎯 FamilyOffice S 상담 예약 완료',
        description: `${data.name}님의 ${data.serviceType} 상담이 예약되었습니다.\n담당자가 24시간 내에 연락드리겠습니다.`,
        image_url:
          'https://familyoffices.vip/images/og-image-familyoffice-v2.png',
        link: {
          web_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
          mobile_web_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
        },
      },
      buttons: [
        {
          title: '상담 현황 확인',
          link: {
            web_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
            mobile_web_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
          },
        },
        {
          title: '추가 문의하기',
          link: {
            web_url: `${process.env.NEXT_PUBLIC_APP_URL}/contact`,
            mobile_web_url: `${process.env.NEXT_PUBLIC_APP_URL}/contact`,
          },
        },
      ],
    };
  }

  /**
   * 뉴스레터 구독 환영 메시지 템플릿
   */
  createNewsletterWelcomeTemplate(data: {
    name?: string;
    email: string;
  }): KakaoMessageTemplate {
    return {
      object_type: 'feed',
      content: {
        title: '🌟 뉴스레터 구독을 환영합니다!',
        description: `${data.name ? `${data.name}님, ` : ''}FamilyOffice S 프리미엄 뉴스레터 구독이 완료되었습니다.\n\n📬 매주 화/금 발송\n💡 가업승계·자산관리 전문 인사이트`,
        image_url:
          'https://familyoffices.vip/images/og-image-familyoffice-v2.png',
        link: {
          web_url: 'https://newsletter.familyoffices.vip',
          mobile_web_url: 'https://newsletter.familyoffices.vip',
        },
      },
      buttons: [
        {
          title: '뉴스레터 보기',
          link: {
            web_url: 'https://newsletter.familyoffices.vip',
            mobile_web_url: 'https://newsletter.familyoffices.vip',
          },
        },
        {
          title: '서비스 둘러보기',
          link: {
            web_url: `${process.env.NEXT_PUBLIC_APP_URL}/services`,
            mobile_web_url: `${process.env.NEXT_PUBLIC_APP_URL}/services`,
          },
        },
      ],
    };
  }

  /**
   * 세미나 신청 완료 메시지 템플릿
   */
  createSeminarTemplate(data: {
    name: string;
    seminarTitle: string;
    seminarDate: string;
    venue?: string;
  }): KakaoMessageTemplate {
    return {
      object_type: 'feed',
      content: {
        title: '🎓 세미나 신청이 완료되었습니다',
        description: `📚 ${data.seminarTitle}\n🗓️ ${data.seminarDate}\n👤 참석자: ${data.name}\n${data.venue ? `📍 장소: ${data.venue}` : ''}\n\n세미나 자료는 이메일로 발송됩니다.`,
        image_url:
          'https://familyoffices.vip/images/og-image-familyoffice-v2.png',
        link: {
          web_url: `${process.env.NEXT_PUBLIC_APP_URL}/seminar`,
          mobile_web_url: `${process.env.NEXT_PUBLIC_APP_URL}/seminar`,
        },
      },
      buttons: [
        {
          title: '세미나 정보',
          link: {
            web_url: `${process.env.NEXT_PUBLIC_APP_URL}/seminar`,
            mobile_web_url: `${process.env.NEXT_PUBLIC_APP_URL}/seminar`,
          },
        },
      ],
    };
  }

  /**
   * 회원가입 환영 메시지 템플릿
   */
  createWelcomeTemplate(data: {
    name: string;
    membershipTier?: string;
  }): KakaoMessageTemplate {
    return {
      object_type: 'feed',
      content: {
        title: '👑 FamilyOffice S에 오신 것을 환영합니다!',
        description: `${data.name}님, ${data.membershipTier || 'Premium'} 회원가입을 축하드립니다!\n\n🌟 전용 혜택\n✅ 개인 맞춤 자산관리 상담\n✅ VIP 전용 세미나 우선 초대\n✅ 프리미엄 투자정보 제공`,
        image_url:
          'https://familyoffices.vip/images/og-image-familyoffice-v2.png',
        link: {
          web_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
          mobile_web_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
        },
      },
      buttons: [
        {
          title: '대시보드 바로가기',
          link: {
            web_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
            mobile_web_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
          },
        },
        {
          title: '서비스 소개',
          link: {
            web_url: `${process.env.NEXT_PUBLIC_APP_URL}/services`,
            mobile_web_url: `${process.env.NEXT_PUBLIC_APP_URL}/services`,
          },
        },
      ],
    };
  }

  /**
   * 계정 연결 해제
   */
  async unlinkAccount(accessToken: string): Promise<KakaoAPIResponse> {
    try {
      const response = await fetch(`${this.BASE_URL}/v1/user/unlink`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: {
            code: response.status,
            message: errorData.msg || '계정 연결 해제에 실패했습니다.',
            details: errorData,
          },
        };
      }

      const result = await response.json();

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 0,
          message: '네트워크 오류가 발생했습니다.',
          details: error,
        },
      };
    }
  }

  /**
   * API 사용량 조회 (Admin Key 필요)
   */
  async getAPIUsage(): Promise<KakaoAPIResponse> {
    if (!this.ADMIN_KEY) {
      return {
        success: false,
        error: {
          code: 401,
          message: 'Admin Key가 설정되지 않았습니다.',
        },
      };
    }

    try {
      const response = await fetch(`${this.BASE_URL}/v1/api/quota`, {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${this.ADMIN_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: {
            code: response.status,
            message: errorData.msg || 'API 사용량 조회에 실패했습니다.',
            details: errorData,
          },
        };
      }

      const result = await response.json();

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 0,
          message: '네트워크 오류가 발생했습니다.',
          details: error,
        },
      };
    }
  }

  /**
   * 서비스 상태 확인
   */
  getServiceStatus(): {
    isConfigured: boolean;
    availableFeatures: string[];
    missingConfig: string[];
  } {
    const missingConfig: string[] = [];
    const availableFeatures: string[] = [];

    if (!this.REST_API_KEY) {
      missingConfig.push('KAKAO_REST_API_KEY');
    } else {
      availableFeatures.push('프로필 조회', '나에게 메시지');
    }

    if (!this.ADMIN_KEY) {
      missingConfig.push('KAKAO_ADMIN_KEY');
    } else {
      availableFeatures.push('API 사용량 조회', '관리자 기능');
    }

    // 비즈니스 계정 연동 시 추가 기능
    if (this.REST_API_KEY && this.ADMIN_KEY) {
      availableFeatures.push('친구에게 메시지', '비즈니스 알림');
    }

    return {
      isConfigured: missingConfig.length === 0,
      availableFeatures,
      missingConfig,
    };
  }
}

// 싱글톤 인스턴스
let kakaoBusinessInstance: KakaoBusinessAPIService | null = null;

export const getKakaoBusinessAPIService = (): KakaoBusinessAPIService => {
  if (!kakaoBusinessInstance) {
    kakaoBusinessInstance = new KakaoBusinessAPIService();
  }
  return kakaoBusinessInstance;
};
