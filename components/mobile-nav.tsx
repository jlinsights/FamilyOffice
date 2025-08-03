import {
  Menu,
  X,
  Home,
  User,
  BarChart3,
  Calendar,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react';

import { useState } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { cn } from '@/lib/utils';

interface NavigationItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  badge?: string;
}

const navigationItems: NavigationItem[] = [
  {
    href: '/',
    label: '홈',
    icon: Home,
    description: '메인 대시보드',
  },
  {
    href: '/dashboard',
    label: '대시보드',
    icon: BarChart3,
    description: '포트폴리오 관리',
  },
  {
    href: '/program',
    label: '프로그램',
    icon: Calendar,
    description: '교육 프로그램',
    badge: 'NEW',
  },
  {
    href: '/services',
    label: '서비스',
    icon: FileText,
    description: '컨설팅 서비스',
  },
  {
    href: '/contact',
    label: '문의',
    icon: User,
    description: '상담 신청',
  },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="relative"
            aria-label="메뉴 열기"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">메뉴 열기</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">
                    F
                  </span>
                </div>
                <span className="font-semibold text-lg">FamilyOffice</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                aria-label="메뉴 닫기"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6">
              <div className="space-y-2">
                {navigationItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200',
                        'hover:bg-accent hover:text-accent-foreground',
                        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                      )}
                      onClick={() => setIsOpen(false)}
                      aria-describedby={
                        item.description ? `${item.href}-desc` : undefined
                      }
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p
                            id={`${item.href}-desc`}
                            className="text-sm text-muted-foreground truncate"
                          >
                            {item.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t space-y-3">
              <Link
                href="/settings"
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200',
                  'hover:bg-accent hover:text-accent-foreground',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                )}
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-4 w-4" />
                <span className="font-medium">설정</span>
              </Link>

              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-3 py-2 h-auto"
                onClick={() => {
                  // 로그아웃 로직
                  setIsOpen(false);
                }}
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium">로그아웃</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// Quick actions component for mobile
export function MobileQuickActions() {
  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-background border rounded-lg shadow-lg p-2">
        <div className="flex items-center justify-around">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto p-2"
            asChild
          >
            <Link href="/contact">
              <User className="h-4 w-4" />
              <span className="text-xs">상담</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto p-2"
            asChild
          >
            <Link href="/program">
              <Calendar className="h-4 w-4" />
              <span className="text-xs">프로그램</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto p-2"
            asChild
          >
            <Link href="/dashboard">
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs">대시보드</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
