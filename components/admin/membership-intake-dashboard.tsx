'use client';

import { format } from 'date-fns';
import {
    CheckCircle2,
    Clock,
    Phone,
    Search
} from 'lucide-react';
import { useState } from 'react';

import { MembershipIntakeSubmission } from '@/app/apply/membership-intake/schema';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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

interface MembershipIntakeDashboardProps {
  initialSubmissions: MembershipIntakeSubmission[];
}

export function MembershipIntakeDashboard({
  initialSubmissions,
}: MembershipIntakeDashboardProps) {
  const [submissions, setSubmissions] = useState<MembershipIntakeSubmission[]>(
    initialSubmissions
  );
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] =
    useState<MembershipIntakeSubmission | null>(null);

  // Filter and Search
  const filteredSubmissions = submissions.filter(submission => {
    const matchesStatus =
      filterStatus === 'all' || submission.status === filterStatus;
    const matchesSearch =
      searchQuery === '' ||
      submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.affiliation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate Stats
  const stats = {
    total: submissions.length,
    new: submissions.filter(s => s.status === 'new').length,
    contacted: submissions.filter(s => s.status === 'contacted').length,
    completed: submissions.filter(s => s.status === 'completed').length,
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      new: {
        label: '신규 접수',
        variant: 'default' as const,
        icon: Clock,
      },
      contacted: {
        label: '연락 완료',
        variant: 'secondary' as const,
        icon: Phone,
      },
      completed: {
        label: '완료',
        variant: 'outline' as const,
        icon: CheckCircle2,
      },
    };
    const config = variants[status as keyof typeof variants] || variants.new;
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const formatFrequency = (value: string) => {
    const map: Record<string, string> = {
      monthly_1: '월 1회 이하',
      monthly_2_3: '월 2~3회',
      weekly_1: '주 1회 이상',
      project: '프로젝트형',
    };
    return map[value] || value;
  };

  const formatBudget = (value: string) => {
    const map: Record<string, string> = {
      '300': '300만원 (Essential)',
      '600': '600만원 (Signature)',
      '1200': '1,200만원 (Platinum)',
      '2400': '2,400만원 (Black)',
      negotiable: '별도 협의',
    };
    return map[value] || value;
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>전체 접수</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>신규 대기</CardDescription>
            <CardTitle className="text-3xl text-orange-600">
              {stats.new}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>연락 완료</CardDescription>
            <CardTitle className="text-3xl text-blue-600">
              {stats.contacted}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>처리 완료</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {stats.completed}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filter & List */}
      <Card>
        <CardHeader>
          <CardTitle>멤버십 진단 신청 내역</CardTitle>
          <CardDescription>
            10분 진단을 통해 접수된 잠재 고객 목록입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="이름, 소속, 이메일 검색..."
                className="pl-9"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="상태 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 상태</SelectItem>
                <SelectItem value="new">신규 접수</SelectItem>
                <SelectItem value="contacted">연락 완료</SelectItem>
                <SelectItem value="completed">완료</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">상태</TableHead>
                  <TableHead>이름</TableHead>
                  <TableHead>소속/직함</TableHead>
                  <TableHead>희망 예산</TableHead>
                  <TableHead>빈도</TableHead>
                  <TableHead>접수일시</TableHead>
                  <TableHead className="text-right">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-muted-foreground"
                    >
                      접수된 내역이 없습니다.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubmissions.map(submission => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        {getStatusBadge(submission.status)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {submission.name}
                        <div className="text-xs text-muted-foreground">
                          {submission.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        {submission.affiliation}
                        {submission.title && (
                          <span className="text-xs text-muted-foreground block">
                            {submission.title}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{formatBudget(submission.budget)}</TableCell>
                      <TableCell>{formatFrequency(submission.frequency)}</TableCell>
                      <TableCell>
                        {format(new Date(submission.submittedAt), 'MM.dd HH:mm')}
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedSubmission(submission)}
                            >
                              상세보기
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>진단 상세 내역</DialogTitle>
                              <DialogDescription>
                                접수번호: {submission.id}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedSubmission && (
                              <div className="grid gap-6 py-4">
                                {/* Basic Info */}
                                <div className="grid md:grid-cols-2 gap-4 border p-4 rounded-lg">
                                  <div>
                                    <h4 className="font-semibold mb-2">기본 정보</h4>
                                    <dl className="space-y-1 text-sm">
                                      <div className="flex justify-between">
                                        <dt className="text-muted-foreground">이름</dt>
                                        <dd>{selectedSubmission.name}</dd>
                                      </div>
                                      <div className="flex justify-between">
                                        <dt className="text-muted-foreground">소속</dt>
                                        <dd>{selectedSubmission.affiliation}</dd>
                                      </div>
                                      <div className="flex justify-between">
                                        <dt className="text-muted-foreground">직함</dt>
                                        <dd>{selectedSubmission.title || '-'}</dd>
                                      </div>
                                      <div className="flex justify-between">
                                        <dt className="text-muted-foreground">거주지</dt>
                                        <dd>{selectedSubmission.city}</dd>
                                      </div>
                                    </dl>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">연락처</h4>
                                    <dl className="space-y-1 text-sm">
                                      <div className="flex justify-between">
                                        <dt className="text-muted-foreground">휴대폰</dt>
                                        <dd>{selectedSubmission.phone}</dd>
                                      </div>
                                      <div className="flex justify-between">
                                        <dt className="text-muted-foreground">이메일</dt>
                                        <dd>{selectedSubmission.email}</dd>
                                      </div>
                                      <div className="flex justify-between">
                                        <dt className="text-muted-foreground">선호 시간</dt>
                                        <dd>{selectedSubmission.preferredTime}</dd>
                                      </div>
                                    </dl>
                                  </div>
                                </div>

                                {/* Needs Analysis */}
                                <div className="border p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
                                  <h4 className="font-semibold mb-3">니즈 분석</h4>
                                  <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground mb-1">관심사</p>
                                      <div className="flex flex-wrap gap-1">
                                        {selectedSubmission.interests.map(interest => (
                                          <Badge key={interest} variant="secondary">
                                            {interest}
                                          </Badge>
                                        ))}
                                        {selectedSubmission.interestsOther && (
                                          <Badge variant="outline">
                                            기타: {selectedSubmission.interestsOther}
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground mb-1">가장 해결하고 싶은 문제</p>
                                      <p className="text-sm p-2 bg-background rounded border">
                                        {selectedSubmission.keyProblem}
                                      </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-1">금기사항 (Taboos)</p>
                                        <p className="text-sm text-foreground">
                                            {selectedSubmission.taboos || '-'}
                                        </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Plan Preference */}
                                <div className="border p-4 rounded-lg">
                                  <h4 className="font-semibold mb-3">플랜 선호도</h4>
                                  <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded">
                                      <p className="text-xs text-muted-foreground mb-1">희망 빈도</p>
                                      <p className="font-bold text-sm">
                                        {formatFrequency(selectedSubmission.frequency)}
                                      </p>
                                    </div>
                                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded">
                                      <p className="text-xs text-muted-foreground mb-1">희망 예산</p>
                                      <p className="font-bold text-sm">
                                        {formatBudget(selectedSubmission.budget)}
                                      </p>
                                    </div>
                                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded">
                                      <p className="text-xs text-muted-foreground mb-1">결제 방식</p>
                                      <p className="font-bold text-sm">
                                        {selectedSubmission.paymentMethod}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
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
