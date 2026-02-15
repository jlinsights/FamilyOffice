import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata(
  'About Us & FAQ | FamilyOffice S 소개 및 자주 묻는 질문',
  '삼성생명 기업컨설팅센터 소속 FamilyOffice S 소개와 중소중견기업 CEO가 자주 묻는 자산관리, 세무, 보험 관련 질문과 답변을 확인하세요.',
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
