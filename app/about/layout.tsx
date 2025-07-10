import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '소개 | 패밀리오피스 S',
  description: '패밀리오피스 S는 중소중견기업 전문 자산관리 서비스 팀으로, 법인 대표님을 위한 전문적인 자산관리 및 승계 설계 서비스를 제공합니다.',
  keywords: ['패밀리오피스', '자산관리', '투자자문', '상속설계', '세무컨설팅', '중소중견기업', '기업컨설팅', '가업승계'],
  openGraph: {
    title: '소개 | 패밀리오피스 S',
    description: '중소중견기업 전문 자산관리 서비스 팀. 법인 대표님을 위한 전문적인 자산관리 및 승계 설계 서비스',
    type: 'website',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
} 