import { Metadata } from 'next';
import MembershipContent from './membership-content';

export const metadata: Metadata = {
  title: 'FamilyOffice S 프리미엄 멤버십 | 컨시어지 · 아트 · 호텔 큐레이션',
  description:
    '자산가를 위한 프라이빗 컨시어지 및 멤버십 서비스. 시간, 선택, 품격을 관리하는 의사결정 파트너.',
  openGraph: {
    title: 'FamilyOffice S 프리미엄 멤버십',
    description: '자산가를 위한 프라이빗 컨시어지 및 멤버십 서비스.',
    type: 'website',
  },
};

export default function MembershipPage() {
  return <MembershipContent />;
}
