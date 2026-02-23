'use client';

export const dynamic = 'force-dynamic';

import {
  ChevronRight,
  ClipboardCheck,
  FileText,
  MessageCircle,
  Settings,
  Shield,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSafeAuth } from '@/hooks/use-safe-auth';

interface DashboardData {
  user: {
    name: string;
    email: string;
    imageUrl: string;
    createdAt: string;
    lastSignInAt: string | null;
    companyName: string | null;
    phone: string | null;
    provider: string | null;
  };
  stats: {
    consultations: { total: number; pending: number };
    structureChecks: { total: number };
  };
  recentConsultations: Array<{
    id: string;
    service_type: string;
    status: string;
    created_at: string;
  }>;
  recentStructureChecks: Array<{
    id: string;
    status: string;
    qualification_score: number;
    created_at: string;
  }>;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    pending: {
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      text: 'text-yellow-700 dark:text-yellow-400',
      label: '대기중',
    },
    contacted: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-700 dark:text-blue-400',
      label: '연락 완료',
    },
    completed: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-700 dark:text-green-400',
      label: '완료',
    },
    reviewed: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-700 dark:text-blue-400',
      label: '검토됨',
    },
    meeting_scheduled: {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-700 dark:text-purple-400',
      label: '미팅 예정',
    },
  };

  const c = config[status] ?? {
    bg: 'bg-slate-100 dark:bg-slate-800',
    text: 'text-slate-600 dark:text-slate-400',
    label: status,
  };

  return (
    <span
      className={`px-2 py-0.5 text-xs font-semibold rounded-full ${c.bg} ${c.text}`}
    >
      {c.label}
    </span>
  );
}

function SkeletonCard() {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-700" />
        <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="h-5 w-32 rounded bg-slate-200 dark:bg-slate-700 mb-2" />
      <div className="h-8 w-24 rounded bg-slate-200 dark:bg-slate-700" />
    </div>
  );
}

function SkeletonProfile() {
  return (
    <div className="rounded-3xl p-6 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 animate-pulse">
      <div className="flex flex-col items-center">
        <div className="h-24 w-24 rounded-full bg-slate-200 dark:bg-slate-700 mb-4" />
        <div className="h-6 w-32 rounded bg-slate-200 dark:bg-slate-700 mb-2" />
        <div className="h-4 w-48 rounded bg-slate-200 dark:bg-slate-700 mb-6" />
        <div className="w-full h-16 rounded-xl bg-slate-200 dark:bg-slate-700 mb-6" />
        <div className="w-full space-y-3">
          <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-700" />
          <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
}

export default function PortalDashboard() {
  const { isSignedIn } = useSafeAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSignedIn) return;

    async function fetchDashboard() {
      try {
        const res = await fetch('/api/portal/dashboard');
        if (!res.ok) throw new Error('Failed to fetch dashboard data');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load dashboard'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, [isSignedIn]);

  const userName = data?.user.name || '';
  const memberSince = data?.user.createdAt
    ? formatDate(data.user.createdAt)
    : '';

  return (
    <div className="p-6 lg:p-10">
      {/* Welcome */}
      <section className="mb-10">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-10 w-64 rounded bg-slate-200 dark:bg-slate-700 mb-3" />
            <div className="h-5 w-96 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
              {userName && (
                <>
                  <span className="text-premium-gold dark:text-premium-gold-enhanced">
                    {userName}
                  </span>
                  님, 반갑습니다
                </>
              )}
              {!userName && '대시보드'}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              FamilyOffice S 서비스 현황을 한눈에 확인하세요.
            </p>
          </>
        )}
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="xl:col-span-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              <>
                {/* Consultations */}
                <div className="group p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-premium-gold/50 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      {data?.stats.consultations.total ?? 0}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    전체 상담 요청
                  </h3>
                  {(data?.stats.consultations.pending ?? 0) > 0 && (
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                      {data?.stats.consultations.pending}건 대기중
                    </p>
                  )}
                </div>

                {/* Structure Checks */}
                <div className="group p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-premium-gold/50 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600 dark:text-green-400">
                      <ClipboardCheck className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      {data?.stats.structureChecks.total ?? 0}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    구조 점검 요청
                  </h3>
                </div>

                {/* Membership Status */}
                <div className="group p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-premium-gold/50 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-amber-600 dark:text-amber-400">
                      <Shield className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                      Active
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    멤버십 상태
                  </h3>
                  <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    Standard
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                최근 활동
              </h2>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  {[1, 2, 3].map(i => (
                    <div
                      key={i}
                      className="h-14 rounded-lg bg-slate-100 dark:bg-slate-800"
                    />
                  ))}
                </div>
              ) : (data?.recentConsultations.length ?? 0) === 0 &&
                (data?.recentStructureChecks.length ?? 0) === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                  <p className="text-slate-500 dark:text-slate-400 mb-2">
                    아직 활동 내역이 없습니다
                  </p>
                  <p className="text-sm text-slate-400 dark:text-slate-500 mb-6">
                    구조 점검을 요청하시면 여기에 진행 현황이 표시됩니다.
                  </p>
                  <Link
                    href="/structure-check"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    구조 점검 요청하기
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {data?.recentConsultations.map(c => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex items-center gap-3">
                        <MessageCircle className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">
                            {c.service_type || '상담 요청'}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {formatDate(c.created_at)}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={c.status} />
                    </div>
                  ))}
                  {data?.recentStructureChecks.map(s => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex items-center gap-3">
                        <ClipboardCheck className="h-4 w-4 text-green-500" />
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">
                            구조 점검 요청
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {formatDate(s.created_at)} &middot; 점수:{' '}
                            {s.qualification_score}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={s.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              바로가기
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/structure-check"
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:border-premium-gold hover:shadow-md transition-all duration-300"
              >
                <ClipboardCheck className="h-6 w-6 text-slate-400 group-hover:text-amber-500 transition-colors mb-3" />
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                  구조 점검 요청
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  가업승계 구조 진단
                </p>
              </Link>
              <Link
                href="/services"
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:border-premium-gold hover:shadow-md transition-all duration-300"
              >
                <Settings className="h-6 w-6 text-slate-400 group-hover:text-amber-500 transition-colors mb-3" />
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                  서비스 전체보기
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  자산관리 & 승계 솔루션
                </p>
              </Link>
              <Link
                href="/contact"
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:border-premium-gold hover:shadow-md transition-all duration-300"
              >
                <MessageCircle className="h-6 w-6 text-slate-400 group-hover:text-amber-500 transition-colors mb-3" />
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                  상담 문의
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  전문 컨설턴트 상담
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Account Card */}
        <div className="xl:col-span-4">
          <div className="sticky top-24">
            {loading ? (
              <SkeletonProfile />
            ) : (
              <div className="rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {/* Header gradient */}
                <div className="h-20 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-800 dark:to-slate-900 relative">
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                    <div className="w-20 h-20 rounded-full p-0.5 bg-gradient-to-br from-premium-gold via-yellow-500 to-amber-600 shadow-lg">
                      <Image
                        src={
                          data?.user.imageUrl ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=0D8ABC&color=fff`
                        }
                        alt="Profile"
                        width={80}
                        height={80}
                        className="w-full h-full rounded-full object-cover border-3 border-white dark:border-slate-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-14 pb-6 px-6 text-center">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-0.5">
                    {userName || '회원'}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                    {data?.user.email}
                  </p>
                  {data?.user.companyName && (
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-4">
                      {data.user.companyName}
                    </p>
                  )}

                  {/* Account details */}
                  <div className="space-y-3 text-left mt-4">
                    <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        가입일
                      </span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {memberSince}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        상태
                      </span>
                      <span className="px-2 py-0.5 text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                        Active
                      </span>
                    </div>
                    {data?.user.phone && (
                      <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          연락처
                        </span>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {data.user.phone}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 space-y-2">
                    <Link
                      href="/portal/settings"
                      className="flex items-center justify-center w-full py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      계정 설정
                    </Link>
                    <Link
                      href="/structure-check"
                      className="flex items-center justify-center w-full py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      구조 점검 요청
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="mt-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
