'use client';

import { useState, useEffect } from 'react';
import { Shield, TrendingUp, Bell, Sparkles } from 'lucide-react';

export interface Announcement {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'promotion';
  icon?: React.ReactNode;
  link?: {
    text: string;
    href: string;
  };
  expiresAt?: Date;
  priority?: number; // 높을수록 우선순위 높음
}

// 중앙 관리되는 공지사항 데이터
export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'deposit-protection-2025',
    message: '2025년 9월 1일부터 예금자보호 한도가 1억으로 상향됩니다.',
    type: 'info',
    icon: <Shield className="h-5 w-5" />,
    link: {
      text: '자세히 보기',
      href: '/insights/market-intelligence/deposit-protection-update',
    },
    expiresAt: new Date('2025-09-01'),
    priority: 10,
  },
  // 추가 예시 공지사항들 (필요시 주석 해제)
  /*
  {
    id: 'tax-optimization-seminar',
    message: '2025 세무최적화 전략 세미나 - 2월 15일 개최',
    type: 'promotion',
    icon: <TrendingUp className="h-5 w-5" />,
    link: {
      text: '신청하기',
      href: '/seminar',
    },
    expiresAt: new Date('2025-02-15'),
    priority: 8,
  },
  {
    id: 'new-service-launch',
    message: '가업승계 AI 분석 서비스가 출시되었습니다.',
    type: 'success',
    icon: <Sparkles className="h-5 w-5" />,
    link: {
      text: '서비스 보기',
      href: '/services#ai-analysis',
    },
    priority: 9,
  },
  {
    id: 'vip-membership-offer',
    message: 'VVIP 멤버십 가입 시 첫 3개월 컨설팅 무료',
    type: 'promotion',
    icon: <Bell className="h-5 w-5" />,
    link: {
      text: '혜택 확인',
      href: '/program#vip-membership',
    },
    expiresAt: new Date('2025-03-31'),
    priority: 7,
  },
  */
];

// 공지사항 관리 훅
export function useAnnouncements() {
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  useEffect(() => {
    // 로컬 스토리지에서 닫은 공지사항 ID 불러오기
    const stored = localStorage.getItem('dismissedAnnouncements');
    if (stored) {
      setDismissedIds(JSON.parse(stored));
    }
  }, []);

  const activeAnnouncements = ANNOUNCEMENTS
    .filter(
      (announcement) =>
        (!announcement.expiresAt || announcement.expiresAt > new Date()) &&
        !dismissedIds.includes(announcement.id)
    )
    .sort((a, b) => (b.priority || 0) - (a.priority || 0));

  const dismissAnnouncement = (id: string) => {
    const newDismissedIds = [...dismissedIds, id];
    setDismissedIds(newDismissedIds);
    localStorage.setItem('dismissedAnnouncements', JSON.stringify(newDismissedIds));
  };

  const resetDismissed = () => {
    setDismissedIds([]);
    localStorage.removeItem('dismissedAnnouncements');
  };

  return {
    activeAnnouncements,
    dismissAnnouncement,
    resetDismissed,
    dismissedCount: dismissedIds.length,
  };
}