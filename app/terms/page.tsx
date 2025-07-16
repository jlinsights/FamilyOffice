import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "이용약관 | FamilyOffice S",
  description: "FamilyOffice S 서비스 이용약관을 확인하세요. 회원 가입부터 서비스 이용까지 상세한 약관 내용을 제공합니다.",
  robots: "noindex, nofollow"
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* 간단한 히어로 섹션 */}
        <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background pt-20">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="flex justify-center mb-6">
            <Badge variant="outline" className="animate-fade-in bg-background/80 backdrop-blur-sm">
              <FileText className="h-3 w-3 mr-1" />
              Terms of Service
            </Badge>
          </div>
          
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-primary animate-slide-up">
            이용약관
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '200ms' }}>
            FamilyOffice S 서비스 이용에 관한 약관과 정책을 확인하세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '400ms' }}>
            <Button variant="outline" asChild className="font-bold shadow-lg px-6 py-3">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg px-6 py-3">
              <Link href="/privacy">
                <Shield className="mr-2 h-4 w-4" />
                개인정보처리방침 보기
              </Link>
            </Button>
          </div>
        </div>
        </section>
      
        <section className="section pt-16">
        <div className="container max-w-4xl">
          <div className="prose prose-slate max-w-none">
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">제1조 목적</h2>
                <div className="pl-4 space-y-4">
                  <p>① 이용자 약관(이하 "본 약관")은 이용자가 에서 제공하는 인터넷 관련 서비스(이하 "서비스")를 이용함에 있어 이용자와 의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>
                  <p>② 이용자가 되고자 하는 자가 패밀리오피스가 정한 소정의 절차를 거쳐서 "동의" 단추를 누르면 본 약관에 동의하는 것으로 간주합니다.</p>
                  <p>본 약관에 정하는 이외의 이용자와 패밀리오피스의 권리, 의무 및 책임사항에 관해서는 전기통신사업법 기타 대한민국의 관련 법령과 상관습에 의합니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">제2조 이용자의 정의</h2>
                <div className="pl-4">
                  <p>"이용자"란 패밀리오피스에 접속하여 본 약관에 따라 홈페이지에 회원으로 가입하여 패밀리오피스가 제공하는 서비스를 받는 자를 말합니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">제3조 회원 가입</h2>
                <div className="pl-4 space-y-4">
                  <p>① 이용자가 되고자 하는 자는 패밀리오피스가 정한 가입 양식에 따라 회원정보를 기입하고 "가입하기" 단추를 누르는 방법으로 회원 가입을 신청합니다.</p>
                  <p>② 패밀리오피스는 제1항과 같이 회원으로 가입할 것을 신청한 자가 다음 각 호에 해당하지 않는 한 신청한 자를 회원으로 등록합니다.</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>가입신청자가 본 약관 제7조 제3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우.다만 제7조 제3항에 의한 회원자격 상실 후 1개월이 경과한 자로서 서협의 회원재가입 승낙을 얻은 경우에는 예외로 합니다.</li>
                    <li>등록 내용에 허위, 기재누락, 오기, 상업성이 있는 경우</li>
                    <li>기타 회원으로 등록하는 것이 서협의 기술상 현저히 지장이 있다고 판단되는 경우</li>
                  </ol>
                  <p>③ 회원가입계약의 성립시기는 회원가입의 여부를 확인한 시점으로 합니다.</p>
                  <p>④ 회원은 제1항의 회원정보 기재 내용에 변경이 발생한 경우, 즉시 변경사항을 정정하여 기재하여야 합니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">제4조 서비스의 제공 및 변경</h2>
                <div className="pl-4 space-y-4">
                  <p>① 패밀리오피스는 이용자에게 아래와 같은 서비스를 제공합니다.</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>문서 다운로드 서비스</li>
                    <li>게시판 이용 서비스</li>
                  </ol>
                  <p>② 패밀리오피스는 그 변경될 서비스의 내용 및 제공일자를 제8조 제2항에서 정한 방법으로 이용자에게 통지하고, 제1항에 정한 서비스를 변경하여 제공할 수 있습니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">제5조 서비스의 요금</h2>
                <div className="pl-4">
                  <p>동양서예협회가 제공하는 서비스는 무료 또는 유료로 구분하여 제공할 수 있다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">제6조 서비스의 중단</h2>
                <div className="pl-4 space-y-4">
                  <p>① 패밀리오피스는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있고, 새로운 서비스로의 교체 기타 서협이 적절하다고 판단하는 사유에 기하여 현재 제공되는 서비스를 완전히 중단할 수 있습니다.</p>
                  <p>② 제1항에 의한 서비스 중단의 경우에는 패밀리오피스는 제8조 제2항에서 정한 방법으로 이용자에게 통지합니다. 다만, 패밀리오피스가 통제할 수 없는 사유로 인한 서비스의 중단(시스템 관리자의 고의, 과실이 없는 디스크 장애, 시스템 다운 등)으로 인하여 사전 통지가 불가능한 경우에는 그러하지 아니합니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">제7조 이용자 탈퇴 및 자격 상실 등</h2>
                <div className="pl-4 space-y-4">
                  <p>① 이용자는 언제든지 자신의 회원 등록을 말소해 줄 것(이용자 탈퇴)을 요청할 수 있으며 패밀리오피스는 위 요청을 받은 즉시 해당 이용자의 회원 등록 말소를 위한 절차를 밟습니다.</p>
                  <p>② 이용자가 다음 각 호의 사유에 해당하는 경우, 패밀리오피스는 이용자의 회원자격을 적절한 방법으로 제한 및 정지, 상실시킬 수 있습니다.</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>가입 신청 시에 허위 내용을 등록한 경우 (타인 주민등록번호 또는 정보를 악용)</li>
                    <li>다른 사람의 홈페이지 이용을 방해하거나 그 정보를 도용하는 등 전자거래질서를 위협하는 경우</li>
                    <li>패밀리오피스를 이용하여 법령과 본 약관에 금지 된 행위, 또는 공서양속에 반하는 행위를 하는 경우</li>
                  </ol>
                  <p>③ 패밀리오피스가 이용자의 회원자격을 상실시키기로 결정한 경우에는 회원등록을 말소합니다. 이 경우 이용자인 회원에게 회원등록 말소 전에 이를 통지하고, 소명할 기회를 부여합니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">제8조 이용자에 대한 통지</h2>
                <div className="pl-4 space-y-4">
                  <p>① 패밀리오피스가 특정 이용자에 대한 통지를 하는 경우 회원이 등록한 전자우편주소로 할 수 있습니다.</p>
                  <p>② 패밀리오피스가 불특정 다수 이용자에 대한 통지를 하는 경우 1주일 이상 패밀리오피스 게시판에 게시함으로써 개별 통지에 갈음할 수 있습니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">제9조 패밀리오피스의 의무</h2>
                <div className="pl-4 space-y-4">
                  <p>① 패밀리오피스는 계속적이고 안정적인 서비스의 제공에 최선을 다하여야 합니다.</p>
                  <p>② 패밀리오피스는 이용자가 안전하게 서비스를 이용할 수 있도록 개인정보(신용정보 포함)보호를 위해 보안시스템을 갖추어야 하고 개인정보취급방침을 공시하고 준수합니다.</p>
                  <p>③ 패밀리오피스는 이용자로부터 제기되는 의견이나 불만이 정당하다고 인정될 경우에는 이를 처리하여야 합니다. 이용자가 제기한 의견이나 불만사항에 대해서는 게시판을 활용하거나 전자우편 등을 통하여 이용자에게 처리과정 및 결과를 전달합니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">제10조 개인정보보호</h2>
                <div className="pl-4 space-y-4">
                  <p>① 패밀리오피스는 이용자의 정보수집시 서비스제공에 필요한 최소한의 정보를 수집합니다.</p>
                  <p>② 패밀리오피스는 회원가입시 구매계약이행에 필요한 정보를 미리 수집하지 않습니다. 다만, 관련 법령상 의무이행을 위하여 구매계약 이전에 본인확인이 필요한 경우로서 최소한의 특정 개인정보를 수집하는 경우에는 그러하지 아니합니다.</p>
                  <p>③ 패밀리오피스는 이용자의 개인정보를 수집·이용하는 때에는 당해 이용자에게 그 목적을 고지하고 동의를 받습니다.</p>
                  <p>④ 패밀리오피스는 수집된 개인정보를 목적외의 용도로 이용할 수 없으며, 새로운 이용목적이 발생한 경우 또는 제3자에게 제공하는 경우에는 이용·제공단계에서 당해 이용자에게 그 목적을 고지하고 동의를 받습니다. 다만, 관련 법령에 달리 정함이 있는 경우에는 예외로 합니다.</p>
                  <p>⑤ 패밀리오피스가 제2항과 제3항에 의해 이용자의 동의를 받아야 하는 경우에는 개인정보관리 책임자의 신원(소속, 성명 및 전화번호, 기타 연락처), 정보의 수집목적 및 이용목적, 제3자에 대한 정보제공 관련사항(제공받은자, 제공목적 및 제공할 정보의 내용) 등 정보통신망이용촉진 및 정보보호 등에 관한 법률 제22조제2항이 규정한 사항을 미리 명시하거나 고지해야 하며 이용자는 언제든지 이 동의를 철회할 수 있습니다.</p>
                  <p>⑥ 이용자는 언제든지 패밀리오피스가 가지고 있는 자신의 개인정보에 대해 열람 및 오류정정을 요구할 수 있으며 패밀리오피스는 이에 대해 지체 없이 필요한 조치를 취해야 합니다. 이용자가 오류의 정정을 요구한 경우에는 패밀리오피스는 그 오류를 정정할 때까지 당해 개인정보를 이용하지 않습니다.</p>
                  <p>⑦ 패밀리오피스는 개인정보 보호를 위하여 이용자의 개인정보를 취급하는 자를 최소한으로 제한하여야 하며 신용카드, 은행계좌 등을 포함한 이용자의 개인정보의 분실, 도난, 유출, 동의 없는 제3자 제공, 변조 등으로 인한 이용자의 손해에 대하여 모든 책임을 집니다.</p>
                  <p>⑧ 패밀리오피스 또는 그로부터 개인정보를 제공받은 제3자는 개인정보의 수집목적 또는 제공받은 목적을 달성한 때에는 당해 개인정보를 지체 없이 파기합니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">제11조 패밀리오피스의 면책</h2>
                <div className="pl-4 space-y-4">
                  <p>① 패밀리오피스는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</p>
                  <p>② 패밀리오피스는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</p>
                  <p>③ 패밀리오피스는 이용자가 서비스를 이용하여 기대하는 손익이나 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.</p>
                  <p>④ 패밀리오피스는 이용자가 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">제12조 이용자의 의무</h2>
                <div className="pl-4 space-y-4">
                  <p>① 이용자는 다음 각 호의 행위를 하여서는 안됩니다.</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>회원가입신청 또는 변경시 허위내용을 등록하는 행위</li>
                    <li>패밀리오피스에 게시된 정보를 변경하는 행위</li>
                    <li>패밀리오피스 기타 제3자의 인격권 또는 지적재산권을 침해하거나 업무를 방해하는 행위</li>
                    <li>다른 회원의 ID를 도용하는 행위</li>
                    <li>스팸메일, 행운의 편지 등, 외설 또는 폭력적인 메시지·화상·음성, 광고 등이 담긴 메일을 보내거나 기타 공공 미풍양속에 반하는 정보를 공개 또는 게시하는 행위</li>
                    <li>관련 법령에 의하여 그 전송 또는 게시가 금지되는 정보(컴퓨터 프로그램 등)의 전송 또는 게시하는 행위</li>
                    <li>패밀리오피스의 직원이나 서비스의 관리자를 가장하거나 사칭하여 또는 타인의 명의를 모용하여 글을 게시하거나 메일을 발송하는 행위</li>
                    <li>컴퓨터 소프트웨어, 하드웨어, 전기통신 장비의 정상적인 가동을 방해, 파괴할 목적으로 고안된 소프트웨어 바이러스, 기타 다른 컴퓨터 코드, 파일, 프로그램을 포함하고 있는 자료를 게시하거나 전자우편으로 발송하는 행위</li>
                    <li>회원을 스토킹, 협박 등 다른 이용자를 괴롭히는 행위</li>
                    <li>다른 이용자에 대한 개인정보를 그 동의 없이 수집,저장,공개하는 행위</li>
                    <li>불특정 다수의 자를 대상으로 하여 광고 또는 선전을 게시하거나 스팸메일을 전송하는 등의 방법으로 동양서예협회의 서비스를 이용하여 영리 목적의 활동을 하는 행위</li>
                    <li>패밀리오피스가 제공하는 서비스에 정한 약관 기타 서비스 이용에 관한 규정을 위반하는 행위</li>
                  </ol>
                  <p>② 제1항에 해당하는 행위를 한 이용자가 있을 경우 패밀리오피스는 본 약관 제7조 제2, 3항에서 정한 바에 따라 이용자의 회원자격을 적절한 방법으로 제한 및 정지, 상실시킬 수 있습니다.</p>
                  <p>③ 이용자는 그 귀책 사유로 인하여 패밀리오피스나 다른 이용자가 입은 손해를 배상할 책임이 있습니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">제13조 공개 게시물의 삭제</h2>
                <div className="pl-4 space-y-4">
                  <p>이용자의 공개 게시물의 내용이 다음 각 호에 해당하는 경우 동양서예협회는 이용자에게 사전 통지 없이 해당 공개게시물을 삭제할 수 있고, 해당 이용자의 회원 자격을 제한, 정지 또는 상실시킬 수 있습니다.</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>다른 이용자 또는 제3자를 비방하거나 중상 모략으로 명예를 손상시키는 내용</li>
                    <li>공서양속에 위반되는 내용의 정보, 문장, 도형 등을 유포하는 내용</li>
                    <li>범죄행위와 관련이 있다고 판단되는 내용</li>
                    <li>다른 이용자 또는 제3자의 저작권 등 기타 권리를 침해하는 내용</li>
                    <li>기타 관계 법령에 위배된다고 판단되는 내용</li>
                  </ol>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">제14조 (저작권의 귀속 및 이용제한)</h2>
                <div className="pl-4 space-y-4">
                  <p>① 패밀리오피스가 작성한 저작물에 대한 저작권 기타 지적재산권은 패밀리오피스에 귀속합니다.</p>
                  <p>② 이용자는 패밀리오피스를 이용함으로써 얻은 정보를 패밀리오피스의 사전승낙 없이 복제, 전송, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">제15조 약관의 개정</h2>
                <div className="pl-4 space-y-4">
                  <p>① 패밀리오피스는 약관의 규제등에 관한 법률, 전자거래기본법, 전자서명법, 정보통신망이용촉진등에 관한 법률 등 관련 법을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.</p>
                  <p>② 패밀리오피스가 본 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행 약관과 함께 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.</p>
                  <p>③ 패밀리오피스가 본 약관을 개정할 경우에는 그 개정약관은 개정된 내용이 관계 법령에 위배되지 않는 한 개정 이전에 회원으로 가입한 이용자에게도 적용됩니다.</p>
                  <p>④ 변경된 약관에 이의가 있는 이용자는 제7조 제1항에 따라 탈퇴할 수 있습니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">제16조 재판관할</h2>
                <div className="pl-4">
                  <p>패밀리오피스와 이용자간에 발생한 서비스 이용에 관한 분쟁으로 인한 소는 민사소송법상의 관할을 가지는 대한민국의 법원에 제기합니다.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">[부 칙]</h2>
                <div className="pl-4">
                  <p>이 약관은 2024년 8월 27일부터 시행합니다.</p>
                </div>
              </section>
            </div>
          </div>
        </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 