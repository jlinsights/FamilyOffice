import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '세무 계산기 | FamilyOffice S',
  description: '상속세, 증여세, 가업승계 비용을 정확하게 계산해보세요. 전문가가 설계한 계산기로 세무 최적화 전략을 확인하실 수 있습니다.',
  keywords: ['상속세 계산기', '증여세 계산기', '가업승계 비용', '세무 계산', '절세 전략'],
};

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* 계산기 전용 헤더 */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-4 text-sm">
            <Link href="/" className="text-slate-600 hover:text-blue-600">홈</Link>
            <span className="text-slate-400">/</span>
            <Link href="/calculators" className="text-slate-600 hover:text-blue-600">계산기</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">세무 계산기</span>
          </nav>
        </div>
      </div>
      
      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      {/* 계산기 전용 푸터 */}
      <div className="bg-slate-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-4">전문가 상담이 필요하신가요?</h3>
          <p className="text-slate-300 mb-6">
            계산 결과를 바탕으로 맞춤형 세무 최적화 전략을 제안해 드립니다.
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/contact?service=tax-consulting" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              무료 세무 상담 신청
            </a>
            <a 
              href="tel:0502-5550-8700" 
              className="border border-slate-600 hover:border-slate-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              전화 상담: 0502-5550-8700
            </a>
          </div>
          <p className="text-slate-400 text-sm mt-4">
            ⚠️ 계산 결과는 참고용이며, 정확한 세무 계획은 전문가와 상담 후 수립하시기 바랍니다.
          </p>
        </div>
      </div>
    </div>
  );
}