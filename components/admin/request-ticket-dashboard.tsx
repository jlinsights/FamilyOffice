'use client';

import { format } from 'date-fns';
import { CheckCircle2, Clock, MoreHorizontal, Search } from 'lucide-react';
import { useState } from 'react';
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
import { RequestTicketSubmission } from '@/app/request/schema';

interface RequestTicketDashboardProps {
  initialTickets: RequestTicketSubmission[];
}

export function RequestTicketDashboard({
  initialTickets,
}: RequestTicketDashboardProps) {
  const [tickets, setTickets] =
    useState<RequestTicketSubmission[]>(initialTickets);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] =
    useState<RequestTicketSubmission | null>(null);

  // Filter
  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus =
      filterStatus === 'all' || ticket.status === filterStatus;
    const matchesSearch =
      searchQuery === '' ||
      ticket.requestType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.contactChannel.toLowerCase().includes(searchQuery.toLowerCase());
    // Add more search fields if needed (e.g. ID search)
    return matchesStatus && matchesSearch;
  });

  // Stats
  const stats = {
    total: tickets.length,
    new: tickets.filter(t => t.status === 'new').length,
    processing: tickets.filter(t => t.status === 'processing').length,
    completed: tickets.filter(t => t.status === 'completed').length,
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      new: { label: '신규 요청', variant: 'destructive' as const, icon: Clock },
      processing: {
        label: '처리 중',
        variant: 'default' as const,
        icon: MoreHorizontal,
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

  const formatRequestType = (type: string) => {
    const map: Record<string, string> = {
      hotel_dining: '호텔/다이닝',
      travel: '여행 기획',
      art_tour: '아트/전시',
      family_office_meeting: 'FO 미팅',
      network_inquiry: '네트워크',
      other: '기타',
    };
    return map[type] || type;
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>전체 티켓</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>신규 (미확인)</CardDescription>
            <CardTitle className="text-3xl text-red-600">{stats.new}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>진행 중</CardDescription>
            <CardTitle className="text-3xl text-blue-600">
              {stats.processing}
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
          <CardTitle>컨시어지 요청 내역 (Request Tickets)</CardTitle>
          <CardDescription>
            회원 및 비서가 제출한 1:1 요청 티켓입니다. 마감 시한을 엄수해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="요청 유형, 연락처 검색..."
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
                <SelectItem value="new">신규 요청</SelectItem>
                <SelectItem value="processing">처리 중</SelectItem>
                <SelectItem value="completed">완료</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">상태</TableHead>
                  <TableHead>유형</TableHead>
                  <TableHead>마감 시한 (Deadline)</TableHead>
                  <TableHead>희망 일정</TableHead>
                  <TableHead>회신 채널</TableHead>
                  <TableHead>접수일시</TableHead>
                  <TableHead className="text-right">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-muted-foreground"
                    >
                      접수된 티켓이 없습니다.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTickets.map(ticket => (
                    <TableRow key={ticket.id}>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell className="font-medium">
                        {formatRequestType(ticket.requestType)}
                        {ticket.requestType === 'other' &&
                          ticket.requestTypeOther && (
                            <span className="block text-xs text-muted-foreground truncate max-w-[100px]">
                              {ticket.requestTypeOther}
                            </span>
                          )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-red-200 text-red-600 bg-red-50"
                        >
                          {ticket.deadline}
                        </Badge>
                      </TableCell>
                      <TableCell>{ticket.preferredDate}</TableCell>
                      <TableCell>
                        <div className="flex flex-col text-sm">
                          <span className="capitalize">
                            {ticket.contactChannel}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {ticket.contactDetail}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {format(new Date(ticket.submittedAt), 'MM.dd HH:mm')}
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedTicket(ticket)}
                            >
                              상세보기
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>요청 티켓 상세</DialogTitle>
                              <DialogDescription>
                                Ticket ID: {ticket.id}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedTicket && (
                              <div className="space-y-6 py-4">
                                {/* Summary Section */}
                                <div className="p-4 bg-muted/50 rounded-lg border">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-xs font-semibold text-muted-foreground mb-1">
                                        요청 유형
                                      </p>
                                      <p className="font-medium">
                                        {formatRequestType(
                                          selectedTicket.requestType
                                        )}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-xs font-semibold text-red-500 mb-1">
                                        마감 시한(Deadline)
                                      </p>
                                      <p className="font-bold text-red-600">
                                        {selectedTicket.deadline}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-xs font-semibold text-muted-foreground mb-1">
                                        희망/타겟 일정
                                      </p>
                                      <p>{selectedTicket.preferredDate}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs font-semibold text-muted-foreground mb-1">
                                        참여 인원
                                      </p>
                                      <p>
                                        성인 {selectedTicket.participantsAdults}
                                        명, 아동{' '}
                                        {selectedTicket.participantsChildren}명
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Details */}
                                <div className="grid gap-4">
                                  <div className="border p-4 rounded-lg">
                                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                                      <CheckCircle2 className="h-4 w-4" /> 예산
                                      및 선호
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="text-muted-foreground mr-2">
                                          예산:
                                        </span>
                                        <span className="font-medium">
                                          {selectedTicket.budget}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground mr-2">
                                          제안 방식:
                                        </span>
                                        <span className="font-medium capitalize">
                                          {selectedTicket.optionStyle.replace(
                                            '_',
                                            ' '
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                    {selectedTicket.stylePreference && (
                                      <div className="mt-2 text-sm bg-slate-50 dark:bg-slate-900 p-2 rounded">
                                        <span className="text-muted-foreground mr-2">
                                          선호 스타일:
                                        </span>
                                        {selectedTicket.stylePreference}
                                      </div>
                                    )}
                                  </div>

                                  <div className="border p-4 rounded-lg border-red-100 dark:border-red-900/30">
                                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-red-600">
                                      <CheckCircle2 className="h-4 w-4" /> 제약
                                      조건 / 알레르기
                                    </h4>
                                    <p className="text-sm">
                                      {selectedTicket.constraints || '없음'}
                                    </p>
                                  </div>

                                  <div className="border p-4 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                      동행자 / 기타 사항
                                    </h4>
                                    {selectedTicket.participantsNotes && (
                                      <p className="text-sm mb-2">
                                        <span className="font-semibold">
                                          동행 특이사항:
                                        </span>{' '}
                                        {selectedTicket.participantsNotes}
                                      </p>
                                    )}
                                    {selectedTicket.additionalNotes && (
                                      <p className="text-sm">
                                        <span className="font-semibold">
                                          추가 요청:
                                        </span>{' '}
                                        {selectedTicket.additionalNotes}
                                      </p>
                                    )}
                                  </div>

                                  <div className="text-right text-xs text-muted-foreground">
                                    연락 채널: {selectedTicket.contactChannel} (
                                    {selectedTicket.contactDetail})
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
