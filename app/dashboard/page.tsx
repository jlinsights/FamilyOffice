'use client';

import {
  Users,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Calendar,
  Activity,
  Eye,
  Bell,
  Settings,
  BarChart3,
  PieChart,
  LineChart,
  FileText,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertTriangle,
  Shield,
} from 'lucide-react';

import { useState } from 'react';

import Link from 'next/link';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

// 메타데이터는 클라이언트 컴포넌트에서 제거

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// 대시보드 KPI 데이터
const dashboardStats = [
  {
    title: '총 관리자산',
    value: 850,
    suffix: '억원',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    description: '전월 대비',
  },
  {
    title: '활성 고객수',
    value: 156,
    suffix: '명',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    description: '전월 대비',
  },
  {
    title: '신규 상담',
    value: 23,
    suffix: '건',
    change: '+15.0%',
    trend: 'up',
    icon: MessageSquare,
    description: '이번 주',
  },
  {
    title: '완료 프로젝트',
    value: 89,
    suffix: '%',
    change: '+2.1%',
    trend: 'up',
    icon: Target,
    description: '성공률',
  },
];

// 최근 활동 데이터
const recentActivities = [
  {
    id: 1,
    type: 'consultation',
    title: '김OO 대표 - 가업승계 상담 완료',
    time: '2시간 전',
    status: 'completed',
    priority: 'high',
  },
  {
    id: 2,
    type: 'document',
    title: '법인 세무신고서 검토 완료',
    time: '4시간 전',
    status: 'completed',
    priority: 'medium',
  },
  {
    id: 3,
    type: 'meeting',
    title: '박OO 고객 정기 미팅 예정',
    time: '내일 오전 10시',
    status: 'scheduled',
    priority: 'high',
  },
  {
    id: 4,
    type: 'alert',
    title: '이OO 고객 투자 검토 필요',
    time: '1일 전',
    status: 'pending',
    priority: 'medium',
  },
];

// 진행중인 프로젝트 데이터
const ongoingProjects = [
  {
    id: 1,
    client: '㈜ABC제조',
    service: '가업승계 설계',
    progress: 75,
    deadline: '2024-03-15',
    status: '진행중',
    manager: '임재홍',
  },
  {
    id: 2,
    client: '㈜XYZ건설',
    service: '법인구조 최적화',
    progress: 45,
    deadline: '2024-02-28',
    status: '진행중',
    manager: '박병학',
  },
  {
    id: 3,
    client: 'DEF테크놀로지',
    service: '투자유치 컨설팅',
    progress: 90,
    deadline: '2024-02-20',
    status: '완료예정',
    manager: '주상미',
  },
];

// 클라이언트 전용 대시보드 컴포넌트
const DashboardContent = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-6 py-8 space-y-8 max-w-7xl">
          {/* 헤더 섹션 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-12 w-12 rounded-lg bg-blue-600/10 dark:bg-blue-500/20 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      관리자 대시보드
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                      실시간 비즈니스 현황 및 KPI 모니터링
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-md text-sm">
                  <Activity className="h-3 w-3" />
                  실시간 업데이트
                </div>
                <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                  마지막 업데이트: {new Date().toLocaleString('ko-KR')}
                </div>
              </div>
            </div>
          </div>

          {/* KPI 카드 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardStats.map((stat, index) => {
              const IconComponent = stat.icon;
              const isPositive = stat.trend === 'up';
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg bg-blue-600/10 dark:bg-blue-500/20 flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div
                      className={`flex items-center text-xs gap-1 font-medium ${
                        isPositive
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {isPositive ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      {stat.title}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                        {stat.suffix}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {stat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 탭 네비게이션 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {[
                { id: 'overview', label: '개요' },
                { id: 'clients', label: '고객관리' },
                { id: 'projects', label: '프로젝트' },
                { id: 'analytics', label: '분석' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                    selectedTab === tab.id
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {/* 개요 탭 */}
              {selectedTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 최근 활동 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg border dark:border-gray-600 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        최근 활동
                      </h4>
                      <button className="flex items-center gap-2 px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                        <Eye className="h-4 w-4" />
                        전체보기
                      </button>
                    </div>
                    <div>
                      <div className="space-y-4">
                        {recentActivities.map(activity => {
                          const getStatusIcon = () => {
                            switch (activity.status) {
                              case 'completed':
                                return (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                );
                              case 'scheduled':
                                return (
                                  <Clock className="h-4 w-4 text-blue-500" />
                                );
                              case 'pending':
                                return (
                                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                );
                              default:
                                return (
                                  <Activity className="h-4 w-4 text-gray-400" />
                                );
                            }
                          };

                          return (
                            <div
                              key={activity.id}
                              className="flex items-start gap-3 p-3 rounded-lg bg-gray-100/50 dark:bg-gray-800/50"
                            >
                              <div className="mt-0.5">{getStatusIcon()}</div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-gray-900 dark:text-white">
                                  {activity.title}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {activity.time}
                                </p>
                              </div>
                              <span
                                className={`px-2 py-1 rounded-md text-xs font-medium ${
                                  activity.priority === 'high'
                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                                }`}
                              >
                                {activity.priority === 'high' ? '중요' : '일반'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* 진행중인 프로젝트 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg border dark:border-gray-600 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        진행중인 프로젝트
                      </h4>
                      <button className="flex items-center gap-2 px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                        <Target className="h-4 w-4" />
                        관리
                      </button>
                    </div>
                    <div>
                      <div className="space-y-4">
                        {ongoingProjects.map(project => (
                          <div
                            key={project.id}
                            className="p-4 rounded-lg border"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-medium text-sm">
                                  {project.client}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  {project.service}
                                </p>
                              </div>
                              <span
                                className={`px-2 py-1 rounded-md text-xs font-medium ${
                                  project.status === '완료예정'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {project.status}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span>진행률</span>
                                <span>{project.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>담당: {project.manager}</span>
                                <span>마감: {project.deadline}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 고객관리 탭 */}
              {selectedTab === 'clients' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-gray-50 rounded-lg border p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      고객 현황
                    </h4>
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">
                        고객 관리 시스템을 준비 중입니다.
                      </p>
                      <Link
                        href="/admin/consultations"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md text-sm hover:bg-gray-50"
                      >
                        상담 관리로 이동
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg border p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      빠른 작업
                    </h4>
                    <div>
                      <div className="space-y-3">
                        <button className="w-full flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md text-sm hover:bg-gray-50">
                          <Phone className="h-4 w-4" />
                          신규 상담 등록
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md text-sm hover:bg-gray-50">
                          <FileText className="h-4 w-4" />
                          보고서 생성
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md text-sm hover:bg-gray-50">
                          <Calendar className="h-4 w-4" />
                          일정 관리
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md text-sm hover:bg-gray-50">
                          <Settings className="h-4 w-4" />
                          시스템 설정
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 프로젝트 탭 */}
              {selectedTab === 'projects' && (
                <div className="bg-gray-50 rounded-lg border p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    프로젝트 현황
                  </h4>
                  <div className="text-center py-8">
                    <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      프로젝트 관리 시스템을 준비 중입니다.
                    </p>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md text-sm hover:bg-gray-50">
                      프로젝트 관리 도구 준비중
                    </button>
                  </div>
                </div>
              )}

              {/* 분석 탭 */}
              {selectedTab === 'analytics' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg border p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      비즈니스 성과
                    </h4>
                    <div className="text-center py-8">
                      <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">
                        고급 분석 기능을 준비 중입니다.
                      </p>
                      <Link
                        href="/admin/analytics"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md text-sm hover:bg-gray-50"
                      >
                        상세 분석 보기
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg border p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      서비스 분석
                    </h4>
                    <div className="text-center py-8">
                      <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">
                        서비스별 성과 분석을 준비 중입니다.
                      </p>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md text-sm hover:bg-gray-50">
                        분석 도구 준비중
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 시스템 상태 */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                시스템 상태
              </h3>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">정상 운영중</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900">보안</p>
                  <p className="text-sm text-gray-600">정상</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900">서버</p>
                  <p className="text-sm text-gray-600">정상</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900">결제</p>
                  <p className="text-sm text-gray-600">정상</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bell className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900">알림</p>
                  <p className="text-sm text-gray-600">정상</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default function DashboardPage() {
  return <DashboardContent />;
}
