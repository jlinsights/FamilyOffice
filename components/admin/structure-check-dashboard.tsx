'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { AlertCircle, Building2, CheckCircle2, Clock, Mail, Phone } from 'lucide-react';
import { useState } from 'react';

interface StructureCheckRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  q1_decision_made: 'yes' | 'no';
  q1_decision_detail?: string;
  q2_documented: 'yes' | 'no';
  q3_authority_clear: 'clear' | 'partial' | 'unclear';
  q4_cash_plan: 'structure_exists' | 'rough_idea' | 'not_considered';
  q5_deadline: 'within_6m' | '1_2y' | 'when_needed';
  q6_concerns?: string[];
  q7_advisors?: string[];
  additional_notes?: string;
  qualification_score: number;
  status: 'pending_review' | 'low_priority' | 'contacted' | 'completed';
  submitted_at: string;
}

interface StructureCheckDashboardProps {
  initialRequests: StructureCheckRequest[];
}

export function StructureCheckDashboard({ initialRequests }: StructureCheckDashboardProps) {
  const [requests, setRequests] = useState<StructureCheckRequest[]>(initialRequests);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<StructureCheckRequest | null>(null);

  // 필터링 및 검색
  const filteredRequests = requests.filter((request) => {
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesSearch =
      searchQuery === '' ||
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.company?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // 점수별 정렬
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (b.qualification_score !== a.qualification_score) {
      return b.qualification_score - a.qualification_score;
    }
    return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
  });

  // 통계 계산
  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === 'pending_review').length,
    highPriority: requests.filter((r) => r.qualification_score >= 3).length,
    contacted: requests.filter((r) => r.status === 'contacted').length,
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending_review: { label: '검토 대기', variant: 'default' as const, icon: Clock },
      low_priority: { label: '낮은 우선순위', variant: 'secondary' as const, icon: AlertCircle },
      contacted: { label: '연락 완료', variant: 'outline' as const, icon: CheckCircle2 },
      completed: { label: '완료', variant: 'outline' as const, icon: CheckCircle2 },
    };
    const config = variants[status as keyof typeof variants] || variants.pending_review;
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getScoreBadge = (score: number) => {
    if (score >= 4) {
      return <Badge className="bg-red-500">긴급 ({score}점)</Badge>;
    }
    if (score >= 3) {
      return <Badge className="bg-orange-500">높음 ({score}점)</Badge>;
    }
    if (score >= 2) {
      return <Badge variant="secondary">보통 ({score}점)</Badge>;
    }
    return <Badge variant="outline">낮음 ({score}점)</Badge>;
  };

  const getAnswerLabel = (question: string, answer: string) => {
    const labels: Record<string, Record<string, string>> = {
      q1_decision_made: { yes: '있음', no: '없음' },
      q2_documented: { yes: '있음', no: '없음' },
      q3_authority_clear: { clear: '명확함', partial: '부분적', unclear: '불명확' },
      q4_cash_plan: {
        structure_exists: '구조 있음',
        rough_idea: '대략적 계획',
        not_considered: '미고려',
      },
      q5_deadline: {
        within_6m: '6개월 이내',
        '1_2y': '1-2년 내',
        when_needed: '필요시',
      },
    };
    return labels[question]?.[answer] || answer;
  };

  return (
    <div className="space-y-6">
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>전체 요청</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>검토 대기</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{stats.pending}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>높은 우선순위</CardDescription>
            <CardTitle className="text-3xl text-orange-600">{stats.highPriority}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>연락 완료</CardDescription>
            <CardTitle className="text-3xl text-green-600">{stats.contacted}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* 필터 및 검색 */}
      <Card>
        <CardHeader>
          <CardTitle>요청 목록</CardTitle>
          <CardDescription>구조 점검 요청을 필터링하고 관리합니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
              placeholder="이름, 이메일, 회사명으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="md:w-96"
            />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="md:w-48">
                <SelectValue placeholder="상태 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="pending_review">검토 대기</SelectItem>
                <SelectItem value="low_priority">낮은 우선순위</SelectItem>
                <SelectItem value="contacted">연락 완료</SelectItem>
                <SelectItem value="completed">완료</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 테이블 */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>우선순위</TableHead>
                  <TableHead>이름</TableHead>
                  <TableHead>연락처</TableHead>
                  <TableHead>회사</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>제출일</TableHead>
                  <TableHead className="text-right">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                      요청이 없습니다
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{getScoreBadge(request.qualification_score)}</TableCell>
                      <TableCell className="font-medium">{request.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 text-sm">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {request.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {request.phone}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {request.company ? (
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {request.company}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        {format(new Date(request.submitted_at), 'PPp', { locale: ko })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedRequest(request)}
                            >
                              상세보기
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-2xl w-[95vw] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                            <DialogHeader>
                              <DialogTitle className="text-slate-900 dark:text-white">구조 점검 요청 상세</DialogTitle>
                              <DialogDescription className="text-slate-600 dark:text-slate-400">
                                제출일: {format(new Date(request.submitted_at), 'PPP p', { locale: ko })}
                              </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6 mt-4">
                              {/* 연락처 정보 */}
                              <div>
                                <h3 className="font-semibold mb-3 text-lg text-slate-900 dark:text-white">연락처 정보</h3>
                                <div className="grid grid-cols-2 gap-4 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
                                  <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">이름</p>
                                    <p className="font-medium text-slate-900 dark:text-white">{request.name}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">이메일</p>
                                    <p className="font-medium text-slate-900 dark:text-white">{request.email}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">전화번호</p>
                                    <p className="font-medium text-slate-900 dark:text-white">{request.phone}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">회사명</p>
                                    <p className="font-medium text-slate-900 dark:text-white">{request.company || '-'}</p>
                                  </div>
                                </div>
                              </div>

                              {/* 설문 응답 */}
                              <div>
                                <h3 className="font-semibold mb-3 text-lg text-slate-900 dark:text-white">설문 응답</h3>
                                <div className="space-y-3">
                                  <div className="p-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700/30">
                                    <p className="text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Q1. 상속/증여 관련 결정 사항</p>
                                    <p className="text-slate-900 dark:text-white">
                                      {getAnswerLabel('q1_decision_made', request.q1_decision_made)}
                                      {request.q1_decision_detail && (
                                        <span className="block mt-1 text-sm text-slate-600 dark:text-slate-400">
                                          상세: {request.q1_decision_detail}
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                  <div className="p-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700/30">
                                    <p className="text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Q2. 문서화 여부</p>
                                    <p className="text-slate-900 dark:text-white">
                                      {getAnswerLabel('q2_documented', request.q2_documented)}
                                    </p>
                                  </div>
                                  <div className="p-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700/30">
                                    <p className="text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Q3. 의사결정 권한 명확성</p>
                                    <p className="text-slate-900 dark:text-white">
                                      {getAnswerLabel('q3_authority_clear', request.q3_authority_clear)}
                                    </p>
                                  </div>
                                  <div className="p-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700/30">
                                    <p className="text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Q4. 현금 유동성 계획</p>
                                    <p className="text-slate-900 dark:text-white">
                                      {getAnswerLabel('q4_cash_plan', request.q4_cash_plan)}
                                    </p>
                                  </div>
                                  <div className="p-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700/30">
                                    <p className="text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Q5. 실행 시기</p>
                                    <p className="text-slate-900 dark:text-white">
                                      {getAnswerLabel('q5_deadline', request.q5_deadline)}
                                    </p>
                                  </div>
                                  {request.q6_concerns && request.q6_concerns.length > 0 && (
                                    <div className="p-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700/30">
                                      <p className="text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Q6. 주요 우려사항</p>
                                      <ul className="list-disc list-inside text-slate-900 dark:text-white">
                                        {request.q6_concerns.map((concern, idx) => (
                                          <li key={idx}>{concern}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {request.q7_advisors && request.q7_advisors.length > 0 && (
                                    <div className="p-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700/30">
                                      <p className="text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Q7. 현재 자문단</p>
                                      <ul className="list-disc list-inside text-slate-900 dark:text-white">
                                        {request.q7_advisors.map((advisor, idx) => (
                                          <li key={idx}>{advisor}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {request.additional_notes && (
                                    <div className="p-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700/30">
                                      <p className="text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">추가 메모</p>
                                      <p className="text-slate-900 dark:text-white">
                                        {request.additional_notes}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* 우선순위 정보 */}
                              <div>
                                <h3 className="font-semibold mb-3 text-lg text-slate-900 dark:text-white">우선순위 분석</h3>
                                <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-slate-600 dark:text-slate-300">
                                      자격 점수
                                    </span>
                                    {getScoreBadge(request.qualification_score)}
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-600 dark:text-slate-300">
                                      현재 상태
                                    </span>
                                    {getStatusBadge(request.status)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
