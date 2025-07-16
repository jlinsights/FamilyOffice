import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "개인정보처리방침 | FamilyOffice S",
  description: "FamilyOffice S 개인정보처리방침을 확인하세요. 개인정보 수집, 이용, 보관에 관한 상세한 정책을 제공합니다.",
  robots: "noindex, nofollow"
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* 간단한 히어로 섹션 */}
      <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background pt-20">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="flex justify-center mb-6">
            <Badge variant="outline" className="animate-fade-in bg-background/80 backdrop-blur-sm">
              <Shield className="h-3 w-3 mr-1" />
              Privacy Policy
            </Badge>
          </div>
          
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-primary animate-slide-up">
            개인정보처리방침
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '200ms' }}>
            FamilyOffice S의 개인정보 수집, 이용, 보관에 관한 상세한 정책을 확인하세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '400ms' }}>
            <Button variant="outline" asChild className="font-bold shadow-lg px-6 py-3">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-6 py-3">
              <Link href="/terms">
                <FileText className="mr-2 h-4 w-4" />
                이용약관 보기
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <main className="section pt-16">
        <div className="container max-w-4xl">
          <div className="prose prose-slate max-w-none">
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">1. 개인정보의 처리목적</h2>
                <div className="pl-4 space-y-4">
                  <p>FamilyOffice S('회사'라 함)는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
                  
                  <h3 className="text-lg font-semibold mt-6 mb-3">가. 홈페이지 회원가입 및 관리</h3>
                  <p>회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지 목적으로 개인정보를 처리합니다.</p>
                  
                  <h3 className="text-lg font-semibold mt-6 mb-3">나. 자산관리 서비스 제공</h3>
                  <p>자산관리 상담, 맞춤형 서비스 제공, 본인인증, 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산 목적으로 개인정보를 처리합니다.</p>
                  
                  <h3 className="text-lg font-semibold mt-6 mb-3">다. 마케팅 및 광고에의 활용</h3>
                  <p>신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공, 인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">2. 개인정보의 처리 및 보유기간</h2>
                <div className="pl-4 space-y-4">
                  <p>① 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                  
                  <p>② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
                  
                  <div className="bg-muted/30 p-4 rounded-lg mt-4">
                    <h3 className="font-semibold mb-3">보유기간별 개인정보 항목</h3>
                    <ul className="space-y-2">
                      <li>• <strong>회원가입 및 관리:</strong> 회원탈퇴 시까지 (단, 관련 법령에 보존의무가 있는 경우 해당 기간까지)</li>
                      <li>• <strong>자산관리 서비스 제공:</strong> 서비스 종료 후 3년</li>
                      <li>• <strong>계약 또는 청약철회 등에 관한 기록:</strong> 5년</li>
                      <li>• <strong>대금결제 및 재화 등의 공급에 관한 기록:</strong> 5년</li>
                      <li>• <strong>소비자 불만 또는 분쟁처리에 관한 기록:</strong> 3년</li>
                      <li>• <strong>표시·광고에 관한 기록:</strong> 6개월</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">3. 처리하는 개인정보의 항목</h2>
                <div className="pl-4 space-y-4">
                  <p>회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
                  
                  <div className="bg-muted/30 p-4 rounded-lg mt-4">
                    <h3 className="font-semibold mb-3">필수항목</h3>
                    <ul className="space-y-2">
                      <li>• 이름, 휴대전화번호, 이메일</li>
                      <li>• 회사명, 직책, 사업자등록번호</li>
                      <li>• 서비스 이용기록, 접속 로그, 쿠키</li>
                      <li>• 접속 IP 정보, 결제기록</li>
                    </ul>
                    
                    <h3 className="font-semibold mb-3 mt-6">선택항목</h3>
                    <ul className="space-y-2">
                      <li>• 관심분야, 서비스 선호도</li>
                      <li>• 마케팅 수신 동의 여부</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">4. 개인정보의 제3자 제공</h2>
                <div className="pl-4 space-y-4">
                  <p>① 회사는 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>
                  
                  <p>② 회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.</p>
                  
                  <div className="bg-muted/30 p-4 rounded-lg mt-4">
                    <h3 className="font-semibold mb-3">제3자 제공 현황</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">• 제공받는 자: 협력 세무사, 변호사, 회계사</h4>
                        <p className="text-sm text-muted-foreground ml-4">- 제공목적: 전문 자산관리 서비스 제공</p>
                        <p className="text-sm text-muted-foreground ml-4">- 제공항목: 이름, 연락처, 회사정보</p>
                        <p className="text-sm text-muted-foreground ml-4">- 보유기간: 서비스 제공 완료 시까지</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">5. 개인정보처리의 위탁</h2>
                <div className="pl-4 space-y-4">
                  <p>① 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
                  
                  <div className="bg-muted/30 p-4 rounded-lg mt-4">
                    <h3 className="font-semibold mb-3">위탁업체 현황</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">• 시스템 운영 및 유지보수</h4>
                        <p className="text-sm text-muted-foreground ml-4">- 위탁업무: 웹사이트 운영 및 시스템 유지보수</p>
                        <p className="text-sm text-muted-foreground ml-4">- 위탁기간: 위탁계약 종료시까지</p>
                      </div>
                      <div>
                        <h4 className="font-medium">• 고객상담 서비스</h4>
                        <p className="text-sm text-muted-foreground ml-4">- 위탁업무: 고객 문의 접수 및 상담</p>
                        <p className="text-sm text-muted-foreground ml-4">- 위탁기간: 위탁계약 종료시까지</p>
                      </div>
                    </div>
                  </div>
                  
                  <p>② 회사는 위탁계약 체결시 개인정보보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">6. 정보주체의 권리·의무 및 행사방법</h2>
                <div className="pl-4 space-y-4">
                  <p>① 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
                  
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>개인정보 처리현황 통지요구</li>
                    <li>개인정보 열람요구</li>
                    <li>개인정보 정정·삭제요구</li>
                    <li>개인정보 처리정지요구</li>
                  </ol>
                  
                  <p>② 제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.</p>
                  
                  <p>③ 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.</p>
                  
                  <p>④ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">7. 개인정보의 파기</h2>
                <div className="pl-4 space-y-4">
                  <p>① 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p>
                  
                  <p>② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.</p>
                  
                  <p>③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.</p>
                  
                  <div className="bg-muted/30 p-4 rounded-lg mt-4">
                    <h3 className="font-semibold mb-3">파기절차</h3>
                    <p className="text-sm mb-4">회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.</p>
                    
                    <h3 className="font-semibold mb-3">파기방법</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>전자적 파일형태:</strong> 기록을 재생할 수 없도록 로우레벨포맷(Low Level Format) 등의 방법을 이용하여 파기</li>
                      <li>• <strong>종이 문서:</strong> 분쇄기로 분쇄하거나 소각하여 파기</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">8. 개인정보의 안전성 확보조치</h2>
                <div className="pl-4 space-y-4">
                  <p>회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.</p>
                  
                  <ol className="list-decimal list-inside space-y-3 ml-4">
                    <li>
                      <strong>개인정보 취급 직원의 최소화 및 교육</strong>
                      <p className="text-sm text-muted-foreground mt-1 ml-6">개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화하여 개인정보를 관리하는 대책을 시행하고 있습니다.</p>
                    </li>
                    <li>
                      <strong>정기적인 자체 감사 실시</strong>
                      <p className="text-sm text-muted-foreground mt-1 ml-6">개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를 실시하고 있습니다.</p>
                    </li>
                    <li>
                      <strong>내부관리계획의 수립 및 시행</strong>
                      <p className="text-sm text-muted-foreground mt-1 ml-6">개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.</p>
                    </li>
                    <li>
                      <strong>개인정보의 암호화</strong>
                      <p className="text-sm text-muted-foreground mt-1 ml-6">개인정보는 암호화 등을 통해 안전하게 저장 및 관리되고 있습니다.</p>
                    </li>
                    <li>
                      <strong>해킹 등에 대비한 기술적 대책</strong>
                      <p className="text-sm text-muted-foreground mt-1 ml-6">해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.</p>
                    </li>
                    <li>
                      <strong>개인정보에 대한 접근 제한</strong>
                      <p className="text-sm text-muted-foreground mt-1 ml-6">개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.</p>
                    </li>
                    <li>
                      <strong>접속기록의 보관 및 위변조 방지</strong>
                      <p className="text-sm text-muted-foreground mt-1 ml-6">개인정보처리시스템에 접속한 기록을 최소 6개월 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능을 사용하고 있습니다.</p>
                    </li>
                    <li>
                      <strong>문서보안을 위한 잠금장치 사용</strong>
                      <p className="text-sm text-muted-foreground mt-1 ml-6">개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고 있습니다.</p>
                    </li>
                  </ol>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">9. 개인정보 보호책임자</h2>
                <div className="pl-4 space-y-4">
                  <p>① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                  
                  <div className="bg-muted/30 p-4 rounded-lg mt-4">
                    <h3 className="font-semibold mb-3">▶ 개인정보 보호책임자</h3>
                    <ul className="space-y-2">
                      <li>• 성명: 개인정보보호팀</li>
                      <li>• 직책: 개인정보보호책임자</li>
                      <li>• 연락처: 0502-5550-8700, info@familyoffices.vip</li>
                    </ul>
                    
                    <p className="text-sm text-muted-foreground mt-4">※ 개인정보보호 담당부서로 연결됩니다.</p>
                  </div>
                  
                  <p>② 정보주체께서는 회사의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">10. 개인정보 처리방침 변경</h2>
                <div className="pl-4 space-y-4">
                  <p>① 이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>
                  
                  <p>② 본 방침은 2024년 8월 27일부터 시행됩니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">11. 권익침해 구제방법</h2>
                <div className="pl-4 space-y-4">
                  <p>정보주체는 아래의 기관에 대해 개인정보 침해신고, 상담등을 문의하실 수 있습니다.</p>
                  <p className="text-sm text-muted-foreground">(아래의 기관은 회사와는 별개의 기관으로서, 회사의 자체적인 개인정보 불만처리, 피해구제 결과에 만족하지 못하시거나 보다 자세한 도움이 필요하시면 문의하여 주시기 바랍니다)</p>
                  
                  <div className="bg-muted/30 p-4 rounded-lg mt-4 space-y-4">
                    <div>
                      <h3 className="font-semibold">▶ 개인정보보호위원회 : (국번없이) 1833-6972 (privacy.go.kr)</h3>
                    </div>
                    <div>
                      <h3 className="font-semibold">▶ 개인정보 침해신고센터 : (국번없이) privacy.go.kr</h3>
                    </div>
                    <div>
                      <h3 className="font-semibold">▶ 대검찰청 : (국번없이) 1301 (www.spo.go.kr)</h3>
                    </div>
                    <div>
                      <h3 className="font-semibold">▶ 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)</h3>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-4">
                    「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.
                  </p>
                  
                  <p className="text-sm text-muted-foreground">
                    ※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 