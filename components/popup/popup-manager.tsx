'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { X, Shield, TrendingUp, Clock, Target } from 'lucide-react';
import Link from 'next/link';
import { analytics } from '@/lib/analytics';

// BMAD Method: Behavior Mapping & Analysis Data
interface BMAPBehaviorMetrics {
  sessionId: string;
  viewTime: number;
  interactionCount: number;
  scrollDepth: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  userSegment: 'first_visit' | 'returning' | 'engaged';
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  dayOfWeek: 'weekday' | 'weekend';
}

// AgentOS Optimization Principles
interface AgentOSOptimizationConfig {
  adaptiveTimingEnabled: boolean;
  contextualPersonalization: boolean;
  performanceThresholds: {
    loadTime: number;
    renderTime: number;
    interactionDelay: number;
  };
  abTestVariants: string[];
  emergencyFallback: boolean;
}


// Sub Agent Personalization
interface SubAgentPersonalization {
  popupStrategy: 'sequential' | 'parallel' | 'adaptive' | 'contextual';
  timingOptimization: {
    delayMin: number;
    delayMax: number;
    intervalBetween: number;
  };
  targetingRules: {
    ceoSegment: boolean;
    assetThreshold: string;
    industryFocus: string[];
    engagementLevel: 'low' | 'medium' | 'high';
  };
}

// Popup Configuration Types
interface PopupConfig {
  id: string;
  type: 'ceo_protection' | 'newsletter_signup' | 'investment_guide' | 'webinar_invite';
  priority: number;
  isActive: boolean;
  endDate: Date;
  maxDisplays: number;
  minInterval: number; // minutes
  targetAudience: string[];
  content: PopupContentConfig;
  analytics: PopupAnalyticsConfig;
  abTest?: ABTestConfig;
}

interface PopupContentConfig {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  ctaText: string;
  ctaUrl: string;
  secondaryAction?: {
    text: string;
    action: 'dismiss' | 'remind_later' | 'never_show';
  };
  variant?: 'default' | 'urgent' | 'premium' | 'time_limited';
  koreanOptimized: {
    tone: 'formal' | 'friendly' | 'professional';
    urgencyLevel: 'low' | 'medium' | 'high';
    culturalElements: string[];
  };
}

interface PopupAnalyticsConfig {
  trackViews: boolean;
  trackInteractions: boolean;
  trackConversions: boolean;
  segmentationEnabled: boolean;
  realTimeOptimization: boolean;
}

interface ABTestConfig {
  enabled: boolean;
  variants: string[];
  trafficSplit: number[];
  metrics: string[];
  duration: number; // days
  confidenceThreshold: number;
}

// Analytics Dashboard Data
interface PopupPerformanceMetrics {
  popupId: string;
  impressions: number;
  clicks: number;
  conversions: number;
  dismissals: number;
  ctr: number; // Click-through rate
  cvr: number; // Conversion rate
  avgTimeToAction: number;
  bounceRateImpact: number;
  userSegmentPerformance: Record<string, any>;
  devicePerformance: Record<string, any>;
  abTestResults?: {
    variant: string;
    performance: number;
    significance: number;
  }[];
}

// Main PopupManager Component
interface PopupManagerProps {
  enableDualPopup?: boolean;
  maxConcurrentPopups?: number;
  globalConfig?: Partial<AgentOSOptimizationConfig>;
  debugMode?: boolean;
}

export const PopupManager: React.FC<PopupManagerProps> = ({
  enableDualPopup = true,
  maxConcurrentPopups = 2,
  globalConfig: _globalConfig,
  debugMode = false,
}) => {
  // State Management
  const [activePopups, setActivePopups] = useState<string[]>([]);
  const [dismissedPopups, setDismissedPopups] = useState<string[]>([]);
  const [behaviorMetrics, setBehaviorMetrics] = useState<BMAPBehaviorMetrics | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<Record<string, PopupPerformanceMetrics>>({});
  const [currentABTests, setCurrentABTests] = useState<Record<string, string>>({});
  
  // Date-based visibility control (until further notice - indefinite campaign)
  const CAMPAIGN_END_DATE = useMemo(() => new Date('2099-12-31T23:59:59+09:00'), []);
  const isCampaignActive = useMemo(() => true, []); // Always active until further notice

  // Popup Configurations with Korean CEO targeting
  const popupConfigs: PopupConfig[] = useMemo(() => [
    {
      id: 'ceo_protection_asset',
      type: 'ceo_protection',
      priority: 1,
      isActive: isCampaignActive,
      endDate: CAMPAIGN_END_DATE,
      maxDisplays: 3,
      minInterval: 60, // 1 hour
      targetAudience: ['ceo', 'executives', 'high_net_worth'],
      content: {
        title: 'CEO 보장자산 안내',
        description: '가정과 회사의 중심인 CEO는 보장자산이 필요합니다',
        icon: Shield,
        ctaText: '자세히 보기',
        ctaUrl: '/insights/resources',
        secondaryAction: {
          text: '나중에',
          action: 'remind_later',
        },
        variant: 'premium',
        koreanOptimized: {
          tone: 'professional',
          urgencyLevel: 'medium',
          culturalElements: ['respect_hierarchy', 'family_values', 'long_term_thinking'],
        },
      },
      analytics: {
        trackViews: true,
        trackInteractions: true,
        trackConversions: true,
        segmentationEnabled: true,
        realTimeOptimization: true,
      },
      abTest: {
        enabled: true,
        variants: ['conservative', 'urgent', 'premium'],
        trafficSplit: [0.4, 0.3, 0.3],
        metrics: ['ctr', 'cvr', 'time_to_action'],
        duration: 30,
        confidenceThreshold: 0.95,
      },
    },
    {
      id: 'newsletter_signup_2024',
      type: 'newsletter_signup',
      priority: 2,
      isActive: isCampaignActive,
      endDate: CAMPAIGN_END_DATE,
      maxDisplays: 2,
      minInterval: 30, // 30 minutes
      targetAudience: ['prospects', 'engaged_users', 'newsletter_subscribers'],
      content: {
        title: '주간 자산관리 인사이트',
        description: '매주 화요일, 전문가의 시장 분석과 투자 전략을 받아보세요',
        icon: TrendingUp,
        ctaText: '무료 구독하기',
        ctaUrl: '/insights/weekly-brief',
        secondaryAction: {
          text: '관심없음',
          action: 'never_show',
        },
        variant: 'time_limited',
        koreanOptimized: {
          tone: 'friendly',
          urgencyLevel: 'low',
          culturalElements: ['exclusive_information', 'expert_credibility', 'community_belonging'],
        },
      },
      analytics: {
        trackViews: true,
        trackInteractions: true,
        trackConversions: true,
        segmentationEnabled: true,
        realTimeOptimization: true,
      },
      abTest: {
        enabled: true,
        variants: ['information_focused', 'community_focused', 'exclusivity_focused'],
        trafficSplit: [0.33, 0.33, 0.34],
        metrics: ['signup_rate', 'email_engagement', 'retention'],
        duration: 30,
        confidenceThreshold: 0.95,
      },
    }
  ], [isCampaignActive, CAMPAIGN_END_DATE]);

  // BMAD Method Implementation - User Behavior Analysis
  const initializeBehaviorTracking = useCallback(() => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const deviceType = window.innerWidth > 1024 ? 'desktop' : window.innerWidth > 768 ? 'tablet' : 'mobile';
    const currentHour = new Date().getHours();
    const timeOfDay = currentHour < 6 ? 'night' : currentHour < 12 ? 'morning' : currentHour < 18 ? 'afternoon' : 'evening';
    const dayOfWeek = [0, 6].includes(new Date().getDay()) ? 'weekend' : 'weekday';
    
    // Determine user segment based on behavior
    const visitCount = parseInt(localStorage.getItem('visit_count') || '0') + 1;
    const lastVisit = localStorage.getItem('last_visit');
    const userSegment = visitCount === 1 ? 'first_visit' : 
                       (lastVisit && Date.now() - parseInt(lastVisit) < 24 * 60 * 60 * 1000) ? 'engaged' : 'returning';
    
    localStorage.setItem('visit_count', visitCount.toString());
    localStorage.setItem('last_visit', Date.now().toString());

    const metrics: BMAPBehaviorMetrics = {
      sessionId,
      viewTime: 0,
      interactionCount: 0,
      scrollDepth: 0,
      deviceType,
      userSegment,
      timeOfDay,
      dayOfWeek,
    };

    setBehaviorMetrics(metrics);

    // Track scroll depth
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      setBehaviorMetrics(prev => prev ? { ...prev, scrollDepth: Math.max(prev.scrollDepth, scrollPercent) } : null);
    };

    // Track view time
    const startTime = Date.now();
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setBehaviorMetrics(prev => prev ? { ...prev, viewTime: Date.now() - startTime } : null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // AgentOS Optimization - Adaptive Timing Logic
  const calculateOptimalTiming = useCallback((_popupConfig: PopupConfig, behavior: BMAPBehaviorMetrics): number => {
    let baseDelay = 3000; // 3 seconds base

    // Adjust based on user segment
    switch (behavior.userSegment) {
      case 'first_visit':
        baseDelay += 2000; // Give new users more time to explore
        break;
      case 'returning':
        baseDelay -= 1000; // Returning users can handle quicker popups
        break;
      case 'engaged':
        baseDelay -= 500; // Engaged users are ready for interaction
        break;
    }

    // Adjust based on device type
    if (behavior.deviceType === 'mobile') {
      baseDelay += 1000; // Mobile users need more time
    }

    // Adjust based on time of day (Korean business context)
    if (behavior.timeOfDay === 'morning' && behavior.dayOfWeek === 'weekday') {
      baseDelay -= 500; // Business hours are optimal
    } else if (behavior.timeOfDay === 'evening' || behavior.dayOfWeek === 'weekend') {
      baseDelay += 1000; // Less intrusive during off-hours
    }

    // Adjust based on scroll engagement
    if (behavior.scrollDepth > 30) {
      baseDelay -= 1000; // User is engaged, reduce delay
    }

    return Math.max(1000, Math.min(baseDelay, 10000)); // Keep between 1-10 seconds
  }, []);

  // Sub Agent Personalization - Popup Strategy Selection
  const selectPopupStrategy = useCallback((behavior: BMAPBehaviorMetrics): SubAgentPersonalization => {
    const strategy: SubAgentPersonalization = {
      popupStrategy: 'sequential',
      timingOptimization: {
        delayMin: 2000,
        delayMax: 8000,
        intervalBetween: 30000, // 30 seconds between popups
      },
      targetingRules: {
        ceoSegment: behavior.deviceType === 'desktop' && behavior.timeOfDay !== 'night',
        assetThreshold: 'mid_market', // 중견기업 CEO 타겟
        industryFocus: ['manufacturing', 'construction', 'it_venture', 'retail', 'service'],
        engagementLevel: behavior.scrollDepth > 50 && behavior.interactionCount > 2 ? 'high' : 
                        behavior.scrollDepth > 20 ? 'medium' : 'low',
      },
    };

    // Adaptive strategy based on user behavior
    if (behavior.userSegment === 'engaged' && behavior.deviceType === 'desktop') {
      strategy.popupStrategy = 'parallel';
      strategy.timingOptimization.intervalBetween = 15000; // Faster for engaged users
    } else if (behavior.userSegment === 'first_visit') {
      strategy.popupStrategy = 'contextual';
      strategy.timingOptimization.delayMax = 12000; // More patient with new users
    }

    return strategy;
  }, []);


  // A/B Testing Implementation
  const selectABVariant = useCallback((popupConfig: PopupConfig): string => {
    if (!popupConfig.abTest?.enabled) return 'default';
    
    const existingVariant = currentABTests[popupConfig.id];
    if (existingVariant) return existingVariant;

    const random = Math.random();
    let cumulativeWeight = 0;
    
    for (let i = 0; i < popupConfig.abTest.variants.length; i++) {
      cumulativeWeight += popupConfig.abTest?.trafficSplit[i] || 0;
      if (random <= cumulativeWeight) {
        const selectedVariant = popupConfig.abTest?.variants[i] || 'default';
        setCurrentABTests(prev => ({ ...prev, [popupConfig.id]: selectedVariant }));
        return selectedVariant;
      }
    }
    
    return popupConfig.abTest?.variants[0] || 'default';
  }, [currentABTests]);

  // Analytics Tracking
  const trackPopupEvent = useCallback((eventType: string, popupId: string, additionalData?: any) => {
    analytics.track(`popup_${eventType}`, {
      popup_id: popupId,
      timestamp: Date.now(),
      behavior_metrics: behaviorMetrics,
      ab_variant: currentABTests[popupId],
      campaign_active: isCampaignActive,
      ...additionalData,
    });

    // Update performance metrics
    setPerformanceMetrics(prev => {
      const current = prev[popupId] || {
        popupId,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        dismissals: 0,
        ctr: 0,
        cvr: 0,
        avgTimeToAction: 0,
        bounceRateImpact: 0,
        userSegmentPerformance: {},
        devicePerformance: {},
      };

      switch (eventType) {
        case 'viewed':
          current.impressions++;
          break;
        case 'clicked':
          current.clicks++;
          current.ctr = (current.clicks / current.impressions) * 100;
          break;
        case 'converted':
          current.conversions++;
          current.cvr = (current.conversions / current.impressions) * 100;
          break;
        case 'dismissed':
          current.dismissals++;
          break;
      }

      return { ...prev, [popupId]: current };
    });
  }, [behaviorMetrics, currentABTests, isCampaignActive]);

  // Popup Display Logic
  const shouldShowPopup = useCallback((popupConfig: PopupConfig): boolean => {
    if (!isCampaignActive || !popupConfig.isActive) return false;
    if (dismissedPopups.includes(popupConfig.id)) return false;
    if (activePopups.length >= maxConcurrentPopups) return false;

    // Check display limits
    const displayCount = parseInt(localStorage.getItem(`popup_${popupConfig.id}_count`) || '0');
    if (displayCount >= popupConfig.maxDisplays) return false;

    // Check minimum interval
    const lastShown = parseInt(localStorage.getItem(`popup_${popupConfig.id}_last`) || '0');
    const minIntervalMs = popupConfig.minInterval * 60 * 1000;
    if (Date.now() - lastShown < minIntervalMs) return false;

    // Check targeting rules
    if (behaviorMetrics) {
      const strategy = selectPopupStrategy(behaviorMetrics);
      if (popupConfig.type === 'ceo_protection' && !strategy.targetingRules.ceoSegment) {
        return false;
      }
    }

    return true;
  }, [isCampaignActive, dismissedPopups, activePopups.length, maxConcurrentPopups, behaviorMetrics, selectPopupStrategy]);

  // Show Popup Function
  const showPopup = useCallback((popupConfig: PopupConfig) => {
    if (!shouldShowPopup(popupConfig)) return;

    const delay = behaviorMetrics ? calculateOptimalTiming(popupConfig, behaviorMetrics) : 3000;
    
    setTimeout(() => {
      setActivePopups(prev => {
        if (prev.includes(popupConfig.id)) return prev;
        
        // Update display count
        const currentCount = parseInt(localStorage.getItem(`popup_${popupConfig.id}_count`) || '0');
        localStorage.setItem(`popup_${popupConfig.id}_count`, (currentCount + 1).toString());
        localStorage.setItem(`popup_${popupConfig.id}_last`, Date.now().toString());
        
        // Track view event
        trackPopupEvent('viewed', popupConfig.id);
        
        return [...prev, popupConfig.id];
      });
    }, delay);
  }, [shouldShowPopup, behaviorMetrics, calculateOptimalTiming, trackPopupEvent]);

  // Dismiss Popup Function
  const dismissPopup = useCallback((popupId: string, action: 'dismiss' | 'remind_later' | 'never_show' = 'dismiss') => {
    setActivePopups(prev => prev.filter(id => id !== popupId));
    
    if (action === 'never_show') {
      setDismissedPopups(prev => [...prev, popupId]);
      localStorage.setItem(`popup_${popupId}_dismissed`, 'true');
    } else if (action === 'remind_later') {
      // Set reminder for later (e.g., next day)
      localStorage.setItem(`popup_${popupId}_remind`, (Date.now() + 24 * 60 * 60 * 1000).toString());
    }
    
    trackPopupEvent('dismissed', popupId, { action });
  }, [trackPopupEvent]);

  // Handle Popup Click
  const handlePopupClick = useCallback((popupId: string, url: string) => {
    trackPopupEvent('clicked', popupId, { url });
    dismissPopup(popupId);
  }, [trackPopupEvent, dismissPopup]);

  // Initialize system
  useEffect(() => {
    const cleanup = initializeBehaviorTracking();
    
    // Load dismissed popups from localStorage
    const dismissed = popupConfigs
      .filter(config => localStorage.getItem(`popup_${config.id}_dismissed`) === 'true')
      .map(config => config.id);
    setDismissedPopups(dismissed);

    return cleanup;
  }, [initializeBehaviorTracking, popupConfigs]);

  // Auto-show popups based on behavior and timing
  useEffect(() => {
    if (!behaviorMetrics || !isCampaignActive) return;

    const strategy = selectPopupStrategy(behaviorMetrics);
    const eligiblePopups = popupConfigs
      .filter(shouldShowPopup)
      .sort((a, b) => a.priority - b.priority);

    if (strategy.popupStrategy === 'sequential') {
      // Show popups one by one with intervals
      eligiblePopups.forEach((popup, index) => {
        setTimeout(() => showPopup(popup), index * strategy.timingOptimization.intervalBetween);
      });
    } else if (strategy.popupStrategy === 'parallel' && enableDualPopup) {
      // Show multiple popups simultaneously (up to maxConcurrentPopups)
      eligiblePopups.slice(0, maxConcurrentPopups).forEach(popup => showPopup(popup));
    } else if (strategy.popupStrategy === 'contextual') {
      // Show popups based on specific user actions or context
      if (behaviorMetrics.scrollDepth > 30 && eligiblePopups[0]) {
        showPopup(eligiblePopups[0]);
      }
    }
  }, [behaviorMetrics, isCampaignActive, selectPopupStrategy, popupConfigs, shouldShowPopup, showPopup, enableDualPopup, maxConcurrentPopups]);

  // Render individual popup
  const renderPopup = useCallback((popupConfig: PopupConfig) => {
    const variant = selectABVariant(popupConfig);
    const { content } = popupConfig;
    const IconComponent = content.icon;

    // Variant-based content modifications
    let displayTitle = content.title;
    let displayDescription = content.description;
    let displayCTA = content.ctaText;

    if (popupConfig.abTest?.enabled && variant !== 'default') {
      // Customize content based on A/B test variant
      if (popupConfig.type === 'ceo_protection') {
        switch (variant) {
          case 'conservative':
            displayTitle = 'CEO 안전자산 관리';
            displayDescription = '안정적인 자산 보호 전략으로 경영 리스크를 최소화하세요';
            break;
          case 'urgent':
            displayTitle = '⚠️ CEO 필수 보장자산';
            displayDescription = '지금 바로 확인하세요! 예상치 못한 리스크로부터 보호받으세요';
            displayCTA = '긴급 확인';
            break;
          case 'premium':
            displayTitle = '프리미엄 CEO 자산 솔루션';
            displayDescription = '최고 경영진을 위한 맞춤형 보장자산 포트폴리오';
            displayCTA = '전용 상담받기';
            break;
        }
      } else if (popupConfig.type === 'newsletter_signup') {
        switch (variant) {
          case 'information_focused':
            displayTitle = '전문가 시장 분석 리포트';
            displayDescription = '매주 화요일, 검증된 투자 정보와 시장 인사이트를 제공합니다';
            break;
          case 'community_focused':
            displayTitle = 'CEO 전용 인사이트 커뮤니티';
            displayDescription = '500+ 동료 CEO들과 함께하는 프리미엄 정보 공유';
            break;
          case 'exclusivity_focused':
            displayTitle = '초대 전용 투자 인사이트';
            displayDescription = '선별된 고액자산가만을 위한 독점 시장 정보';
            displayCTA = '초대장 받기';
            break;
        }
      }
    }

    return (
      <div 
        key={popupConfig.id}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        role="dialog"
        aria-labelledby={`${popupConfig.id}-title`}
        aria-describedby={`${popupConfig.id}-description`}
      >
        <div className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100 border border-gray-200 dark:border-gray-700 ${
          content.variant === 'urgent' ? 'ring-2 ring-red-500 animate-pulse' :
          content.variant === 'premium' ? 'ring-2 ring-yellow-500' :
          content.variant === 'time_limited' ? 'ring-2 ring-blue-500' : ''
        }`}>
          {/* Close button */}
          <button
            onClick={() => dismissPopup(popupConfig.id)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="닫기"
          >
            <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </button>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                content.variant === 'urgent' ? 'bg-red-100 dark:bg-red-900' :
                content.variant === 'premium' ? 'bg-yellow-100 dark:bg-yellow-900' :
                'bg-primary/10 dark:bg-primary/20'
              }`}>
                <IconComponent className={`h-6 w-6 ${
                  content.variant === 'urgent' ? 'text-red-600' :
                  content.variant === 'premium' ? 'text-yellow-600' :
                  'text-primary'
                }`} />
              </div>
              <div className="flex-1">
                <h3 
                  id={`${popupConfig.id}-title`}
                  className="text-lg font-semibold text-gray-900 dark:text-white leading-tight"
                >
                  {displayTitle}
                </h3>
                {content.variant === 'time_limited' && (
                  <div className="flex items-center gap-1 mt-1 text-sm text-blue-600 dark:text-blue-400">
                    <Clock className="h-3 w-3" />
                    8월 31일까지 한정
                  </div>
                )}
              </div>
            </div>
            
            <p 
              id={`${popupConfig.id}-description`}
              className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
            >
              {displayDescription}
            </p>
            
            <div className="flex gap-3">
              <Link
                href={content.ctaUrl}
                onClick={() => handlePopupClick(popupConfig.id, content.ctaUrl)}
                className={`flex-1 inline-flex items-center justify-center px-4 py-3 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                  content.variant === 'urgent' ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500' :
                  content.variant === 'premium' ? 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500' :
                  'bg-primary text-white hover:bg-primary/90 focus:ring-primary'
                }`}
              >
                {displayCTA}
                <Target className="ml-2 h-4 w-4" />
              </Link>
              {content.secondaryAction && (
                <button
                  onClick={() => dismissPopup(popupConfig.id, content.secondaryAction?.action)}
                  className="px-4 py-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium transition-colors"
                >
                  {content.secondaryAction.text}
                </button>
              )}
            </div>

            {/* A/B Test Debug Info */}
            {debugMode && (
              <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                <div>Variant: {variant}</div>
                <div>Priority: {popupConfig.priority}</div>
                <div>Behavior: {behaviorMetrics?.userSegment}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }, [selectABVariant, dismissPopup, handlePopupClick, behaviorMetrics, debugMode]);

  // Campaign end notification
  if (!isCampaignActive) {
    return null;
  }

  // Render active popups
  return (
    <>
      {activePopups.map(popupId => {
        const config = popupConfigs.find(c => c.id === popupId);
        return config ? renderPopup(config) : null;
      })}
      
      {/* Debug Panel */}
      {debugMode && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs z-[110]">
          <div className="mb-2 font-bold">PopupManager Debug</div>
          <div>Campaign Active: {isCampaignActive ? 'Yes' : 'No'}</div>
          <div>Active Popups: {activePopups.length}</div>
          <div>Dismissed: {dismissedPopups.length}</div>
          <div>Behavior: {behaviorMetrics?.userSegment || 'Loading...'}</div>
          <div>Device: {behaviorMetrics?.deviceType || 'Unknown'}</div>
          <div>Scroll: {behaviorMetrics?.scrollDepth || 0}%</div>
          
          <div className="mt-2">
            <div className="font-semibold">Performance:</div>
            {Object.entries(performanceMetrics).map(([id, metrics]) => (
              <div key={id} className="ml-2">
                {id}: {metrics.impressions}v, {metrics.clicks}c, {metrics.conversions}cv
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

// Performance Analytics Dashboard Hook
export const usePopupAnalytics = () => {
  const [metrics, _setMetrics] = useState<Record<string, PopupPerformanceMetrics>>({});
  const [abTestResults, _setABTestResults] = useState<Record<string, any>>({});

  const getPopupPerformance = useCallback((popupId: string) => {
    return metrics[popupId] || null;
  }, [metrics]);

  const getABTestResults = useCallback((popupId: string) => {
    return abTestResults[popupId] || null;
  }, [abTestResults]);

  const exportAnalytics = useCallback(() => {
    return {
      metrics,
      abTestResults,
      exportTime: new Date().toISOString(),
    };
  }, [metrics, abTestResults]);

  return {
    getPopupPerformance,
    getABTestResults,
    exportAnalytics,
    totalMetrics: metrics,
  };
};

export default PopupManager;