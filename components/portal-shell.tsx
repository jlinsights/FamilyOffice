'use client';

import {
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Menu,
  Package,
  Settings,
  TrendingUp,
  X,
} from 'lucide-react';

import { useCallback, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: '/portal',
    label: '대시보드',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    href: '/portal/consultations',
    label: '상담 내역',
    icon: <FileText className="h-5 w-5" />,
    comingSoon: true,
  },
  {
    href: '/portal/tracking',
    label: '진행 현황',
    icon: <Package className="h-5 w-5" />,
    comingSoon: true,
  },
  {
    href: '/portal/insights',
    label: '인사이트',
    icon: <TrendingUp className="h-5 w-5" />,
    comingSoon: true,
  },
  {
    href: '/portal/settings',
    label: '계정 설정',
    icon: <Settings className="h-5 w-5" />,
  },
];

export function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapsed = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen(prev => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const isActive = (href: string) => {
    if (href === '/portal') return pathname === '/portal';
    return pathname.startsWith(href);
  };

  return (
    <div className="flex pt-16">
      {/* Mobile toggle button */}
      <button
        onClick={toggleMobile}
        className="fixed top-20 left-4 z-50 lg:hidden p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md"
        aria-label={mobileOpen ? '메뉴 닫기' : '메뉴 열기'}
      >
        {mobileOpen ? (
          <X className="h-5 w-5 text-slate-700 dark:text-slate-300" />
        ) : (
          <Menu className="h-5 w-5 text-slate-700 dark:text-slate-300" />
        )}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col',
          collapsed ? 'w-16' : 'w-64',
          mobileOpen
            ? 'translate-x-0'
            : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Collapse toggle - desktop only */}
        <button
          onClick={toggleCollapsed}
          className="hidden lg:flex absolute -right-3 top-6 h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          aria-label={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3 text-slate-500" />
          ) : (
            <ChevronLeft className="h-3 w-3 text-slate-500" />
          )}
        </button>

        {/* Portal title */}
        {!collapsed && (
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              My Portal
            </h2>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const active = isActive(item.href);
            const isDisabled = item.comingSoon;

            const content = (
              <div
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : isDisabled
                      ? 'text-slate-400 dark:text-slate-600 cursor-default'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white',
                  collapsed && 'justify-center px-2'
                )}
              >
                <span
                  className={cn(
                    active && 'text-white dark:text-slate-900'
                  )}
                >
                  {item.icon}
                </span>
                {!collapsed && <span className="flex-1">{item.label}</span>}
                {!collapsed && item.comingSoon && (
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded">
                    Soon
                  </span>
                )}
              </div>
            );

            if (isDisabled) {
              return (
                <div key={item.href} title={`${item.label} - 준비 중`}>
                  {content}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                aria-current={active ? 'page' : undefined}
              >
                {content}
              </Link>
            );
          })}
        </nav>

        {/* Help section */}
        {!collapsed && (
          <div className="px-4 py-4 border-t border-slate-100 dark:border-slate-800">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                도움이 필요하신가요?
              </p>
              <Link
                href="/contact"
                className="text-xs font-medium text-slate-900 dark:text-white hover:underline mt-1 inline-block"
              >
                문의하기
              </Link>
            </div>
          </div>
        )}
      </aside>

      {/* Main content with dynamic margin */}
      <main
        className={cn(
          'flex-1 min-h-[calc(100vh-4rem)] transition-all duration-300',
          collapsed ? 'lg:ml-16' : 'lg:ml-64'
        )}
      >
        {children}
      </main>
    </div>
  );
}
