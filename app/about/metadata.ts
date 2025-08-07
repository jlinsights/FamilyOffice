import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata(
  'FamilyOffice S 소개 | 삼성생명 기업컨설팅센터 VIP 전담팀',
  '삼성생명 기업컨설팅센터 소속 FamilyOffice S는 중소중견기업 CEO와 고액자산가를 위한 종합 자산관리 서비스를 제공합니다. 패밀리오피스, 가업승계, CEO플랜 전문팀입니다.',
  [
    'FamilyOffice S 소개',
    '삼성생명 기업컨설팅센터',
    'VIP 자산관리팀',
    '패밀리오피스 전문가',
    '가업승계 컨설팅',
    'CEO플랜 전문팀',
    '중소중견기업 자산관리',
    '기업 대표 재무설계',
    '프리미엄 자산관리',
    '20년 경력 전문가',
  ]
);