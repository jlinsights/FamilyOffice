import { Icon } from '@iconify/react';
// Lucide + Iconify 함께 사용하기
import { Home, User } from 'lucide-react';

/**
 * Iconify 아이콘 사용 예제
 *
 * Iconify는 150,000개 이상의 오픈소스 아이콘을 제공합니다.
 * 기존 Lucide 아이콘과 함께 사용할 수 있습니다.
 *
 * 아이콘 검색: https://icon-sets.iconify.design/
 */

// 기본 사용법
export function BasicIconifyExample() {
  return (
    <div className="flex gap-4 items-center">
      {/* Material Design Icons */}
      <Icon icon="mdi:home" width="24" height="24" />

      {/* Font Awesome */}
      <Icon icon="fa:user" width="24" height="24" />

      {/* Bootstrap Icons */}
      <Icon icon="bi:github" width="24" height="24" />

      {/* Heroicons */}
      <Icon icon="heroicons:academic-cap" width="24" height="24" />
    </div>
  );
}

// 스타일링 예제
export function StyledIconifyExample() {
  return (
    <div className="flex gap-4 items-center">
      {/* Tailwind CSS 클래스 사용 */}
      <Icon
        icon="mdi:heart"
        className="text-red-500 hover:scale-110 transition-transform"
        width="32"
        height="32"
      />

      {/* Inline 스타일 */}
      <Icon
        icon="mdi:star"
        style={{ color: '#FFD700' }}
        width="32"
        height="32"
      />

      {/* 회전 */}
      <Icon
        icon="mdi:loading"
        className="animate-spin text-blue-500"
        width="32"
        height="32"
      />
    </div>
  );
}

// 한국 관련 아이콘 예제
export function KoreanIconsExample() {
  return (
    <div className="flex gap-4 items-center">
      {/* 카카오 */}
      <Icon
        icon="simple-icons:kakao"
        width="24"
        height="24"
        className="text-yellow-400"
      />

      {/* 네이버 */}
      <Icon
        icon="simple-icons:naver"
        width="24"
        height="24"
        className="text-green-500"
      />

      {/* 한글 */}
      <Icon icon="mdi:alphabet-hangul" width="24" height="24" />

      {/* 대한민국 국기 */}
      <Icon icon="twemoji:flag-south-korea" width="24" height="24" />
    </div>
  );
}

// 금융/비즈니스 아이콘 예제 (FamilyOffice 프로젝트용)
export function FinanceIconsExample() {
  return (
    <div className="flex gap-4 items-center flex-wrap">
      {/* 금융 */}
      <Icon icon="mdi:bank" width="24" height="24" className="text-blue-600" />
      <Icon
        icon="mdi:chart-line"
        width="24"
        height="24"
        className="text-green-600"
      />
      <Icon
        icon="mdi:cash-multiple"
        width="24"
        height="24"
        className="text-emerald-600"
      />

      {/* 비즈니스 */}
      <Icon
        icon="mdi:briefcase"
        width="24"
        height="24"
        className="text-slate-600"
      />
      <Icon
        icon="mdi:handshake"
        width="24"
        height="24"
        className="text-blue-500"
      />
      <Icon
        icon="mdi:office-building"
        width="24"
        height="24"
        className="text-gray-600"
      />

      {/* 자산관리 */}
      <Icon icon="mdi:safe" width="24" height="24" className="text-amber-600" />
      <Icon
        icon="mdi:shield-check"
        width="24"
        height="24"
        className="text-green-500"
      />
      <Icon
        icon="mdi:trophy"
        width="24"
        height="24"
        className="text-yellow-500"
      />
    </div>
  );
}

// 재사용 가능한 아이콘 컴포넌트
interface IconifyIconProps {
  icon: string;
  size?: number;
  className?: string;
}

export function IconifyIcon({
  icon,
  size = 24,
  className = '',
}: IconifyIconProps) {
  return <Icon icon={icon} width={size} height={size} className={className} />;
}

export function MixedIconsExample() {
  return (
    <div className="flex gap-4 items-center">
      {/* Lucide 아이콘 */}
      <Home className="w-6 h-6 text-blue-500" />
      <User className="w-6 h-6 text-green-500" />

      {/* Iconify 아이콘 */}
      <Icon icon="mdi:home" width="24" height="24" className="text-blue-500" />
      <Icon
        icon="mdi:account"
        width="24"
        height="24"
        className="text-green-500"
      />
    </div>
  );
}
