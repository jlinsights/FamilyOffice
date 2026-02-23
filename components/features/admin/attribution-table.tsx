'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { AttributionMetric } from '@/lib/conversion/types';

export function AttributionTable({
  data,
}: {
  data: AttributionMetric[];
}) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>유입 경로 분석</CardTitle>
          <CardDescription>UTM 소스별 전환 현황</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">데이터가 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>유입 경로 분석</CardTitle>
        <CardDescription>UTM 소스별 전환 현황</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>소스</TableHead>
              <TableHead>매체</TableHead>
              <TableHead className="text-right">방문</TableHead>
              <TableHead className="text-right">리드</TableHead>
              <TableHead className="text-right">상담</TableHead>
              <TableHead className="text-right">고객</TableHead>
              <TableHead className="text-right">전환율</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{row.source}</TableCell>
                <TableCell>{row.medium}</TableCell>
                <TableCell className="text-right">{row.visitors}</TableCell>
                <TableCell className="text-right">{row.leads}</TableCell>
                <TableCell className="text-right">
                  {row.consultations}
                </TableCell>
                <TableCell className="text-right">{row.clients}</TableCell>
                <TableCell className="text-right font-medium">
                  {row.conversion_rate}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
