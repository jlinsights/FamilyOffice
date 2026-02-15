'use client';

import {
  Building2,
  Calendar,
  Mail,
  MessageCircle,
  Phone,
  Shield,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSafeAuth } from '@/hooks/use-safe-auth';

interface UserProfile {
  name: string;
  email: string;
  imageUrl: string;
  createdAt: string;
  lastSignInAt: string | null;
  companyName: string | null;
  phone: string | null;
  provider: string | null;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-900 dark:text-white mt-0.5 truncate">
          {value || '-'}
        </p>
      </div>
    </div>
  );
}

function SkeletonSection() {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-6 animate-pulse">
      <div className="h-6 w-32 rounded bg-slate-200 dark:bg-slate-700 mb-6" />
      <div className="space-y-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PortalSettings() {
  const { isSignedIn } = useSafeAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) return;

    async function fetchProfile() {
      try {
        const res = await fetch('/api/portal/dashboard');
        if (!res.ok) throw new Error('Failed to fetch profile');
        const json = await res.json();
        setProfile(json.user);
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [isSignedIn]);

  return (
    <div className="p-6 lg:p-10 max-w-3xl">
      <section className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          계정 설정
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          개인 정보 및 계정 정보를 확인하세요.
        </p>
      </section>

      <div className="space-y-6">
        {/* Personal Information */}
        {loading ? (
          <SkeletonSection />
        ) : (
          <div className="rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <User className="h-4 w-4" />
                개인 정보
              </h2>
            </div>
            <div className="px-6">
              <InfoRow
                icon={<User className="h-4 w-4" />}
                label="이름"
                value={profile?.name}
              />
              <InfoRow
                icon={<Mail className="h-4 w-4" />}
                label="이메일"
                value={profile?.email}
              />
              <InfoRow
                icon={<Phone className="h-4 w-4" />}
                label="연락처"
                value={profile?.phone}
              />
              <InfoRow
                icon={<Calendar className="h-4 w-4" />}
                label="가입일"
                value={
                  profile?.createdAt ? formatDate(profile.createdAt) : null
                }
              />
              <InfoRow
                icon={<Calendar className="h-4 w-4" />}
                label="최근 로그인"
                value={
                  profile?.lastSignInAt
                    ? formatDate(profile.lastSignInAt)
                    : null
                }
              />
            </div>
          </div>
        )}

        {/* Account Information */}
        {loading ? (
          <SkeletonSection />
        ) : (
          <div className="rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                계정 정보
              </h2>
            </div>
            <div className="px-6">
              <InfoRow
                icon={<Building2 className="h-4 w-4" />}
                label="회사명"
                value={profile?.companyName}
              />
              <InfoRow
                icon={<Shield className="h-4 w-4" />}
                label="멤버십 상태"
                value="Active"
              />
              <InfoRow
                icon={<Shield className="h-4 w-4" />}
                label="멤버십 등급"
                value="Standard"
              />
              {profile?.provider && (
                <InfoRow
                  icon={<User className="h-4 w-4" />}
                  label="로그인 방식"
                  value={
                    profile.provider === 'oauth_google'
                      ? 'Google'
                      : profile.provider === 'oauth_kakao'
                        ? 'Kakao'
                        : profile.provider
                  }
                />
              )}
            </div>
          </div>
        )}

        {/* Contact Support Notice */}
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shrink-0">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                정보 변경이 필요하신가요?
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                개인 정보 또는 계정 정보 변경은 담당자에게 문의해 주세요. 보안을
                위해 관리자 확인 후 변경이 처리됩니다.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
