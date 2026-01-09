# 이메일 자동화 전략 (Week 5-8)

## 전략 개요

**목표**: 계산기를 통해 수집한 리드를 교육하고 무료 상담으로 전환

**핵심 지표**:
- 이메일 오픈율: 40-60% 목표
- 클릭률(CTR): 15-25% 목표
- 상담 신청 전환율: 5-10% 목표
- 7일 완료율: 60-70% 목표

**전환 퍼널**:
```
계산기 완료 (100%)
    ↓
이메일 수집 (30-40%)
    ↓
Day 1 오픈 (60%)
    ↓
Day 3 클릭 (35%)
    ↓
Day 7 상담 신청 (10%)
    ↓
실제 상담 (70%)
    ↓
계약 (30%)
```

**예상 결과**:
- 월 리드: 500명
- 상담 신청: 50명
- 실제 상담: 35명
- 신규 계약: 10-11명

---

## 7일 이메일 시퀀스 설계

### 전체 구조 및 목적

**AIDA 프레임워크 적용**:
- **Day 1-2**: Attention (주목) - 문제 인식 강화
- **Day 3-4**: Interest (흥미) - 해결책 제시
- **Day 5-6**: Desire (욕구) - 가치 입증
- **Day 7**: Action (행동) - 명확한 CTA

**톤앤매너**:
- 전문적이면서도 친근한 어조
- 불안감 조성보다는 해결책 중심
- 구체적 숫자와 사례 활용
- 한국 문화에 맞는 존댓말 사용

---

### Day 1: 환영 이메일 (계산 후 즉시 발송)

**발송 타이밍**: 이메일 수집 후 5분 이내

**제목 옵션** (A/B 테스트):
- A: "계산 결과 확인하셨나요? 절세 가이드 드립니다 📊"
- B: "[이름]님, 상속세 [금액]원 절감 방법을 알려드릴게요"
- C: "3가지만 실천하면 상속세 40% 줄일 수 있습니다"

**본문 구조**:

```
안녕하세요, [이름]님!

패밀리오피스S 상속세 계산기를 이용해주셔서 감사합니다.

계산 결과, [이름]님의 예상 상속세는 약 [금액]원으로 확인되었습니다.

📊 [이름]님의 계산 결과 요약:
━━━━━━━━━━━━━━━━━━━━━━
• 총 자산: [금액]원
• 예상 상속세: [금액]원
• 실효세율: [비율]%
━━━━━━━━━━━━━━━━━━━━━━

이 금액은 현재 상태 기준이며,
적절한 절세 전략을 활용하면 40-80%까지 줄일 수 있습니다.

💡 실제 절감 사례:
━━━━━━━━━━━━━━━━━━━━━━
• K대표님 (제조업): 60억 → 12억 (80% ↓)
• L대표님 (IT): 25억 → 8억 (68% ↓)
• M기업 (가업승계): 140억 → 10억 (93% ↓)

🎯 오늘부터 7일간 무료 가이드:
━━━━━━━━━━━━━━━━━━━━━━
앞으로 7일간 매일 하나씩,
실전에서 바로 활용할 수 있는 절세 전략을 보내드립니다.

Day 1 (오늘): ✅ 내 상황 정확히 파악하기
Day 2: 💰 배우자 공제 극대화 전략
Day 3: 🏢 가업승계 공제 600억 활용법
Day 4: 📈 생전증여 최적 타이밍
Day 5: 🛡️ 보험을 활용한 절세 전략
Day 6: 📊 실제 절세 플랜 설계 사례
Day 7: 🎁 전문가 무료 상담 특별 혜택

📌 오늘의 액션 아이템:
━━━━━━━━━━━━━━━━━━━━━━
1. 계산 결과를 저장해두세요
2. 가족 구성원과 공유하세요
3. 내일 Day 2 이메일을 기다려주세요

👉 계산 결과 다시 보기: [링크]
👉 블로그에서 더 알아보기: [링크]

질문이 있으시면 언제든 이 이메일로 회신해주세요.
24시간 내 답변 드리겠습니다.

감사합니다.

패밀리오피스S 드림
```

**CTA 버튼**:
- Primary: "내 계산 결과 다시 보기"
- Secondary: "절세 사례 더 보기"

**추적 이벤트**:
- `email_day1_open`
- `email_day1_click_calculator`
- `email_day1_click_blog`

---

### Day 2: 배우자 공제 극대화 전략

**발송 타이밍**: Day 1 발송 후 24시간

**제목 옵션**:
- A: "배우자 공제로 최대 30억까지 절세 가능합니다 💰"
- B: "[이름]님, 이것만 알아도 10억 아낄 수 있어요"
- C: "가장 강력한 절세 도구: 배우자 공제 완전 정복"

**본문 구조**:

```
[이름]님, 안녕하세요!

어제 약속드린 대로, 오늘은 가장 강력한 절세 도구
'배우자 공제' 극대화 전략을 알려드립니다.

💡 핵심 요약:
━━━━━━━━━━━━━━━━━━━━━━
배우자 공제는 최소 5억원부터 최대 30억원까지
공제받을 수 있는 가장 효과적인 절세 수단입니다.

📊 배우자 공제 계산법:
━━━━━━━━━━━━━━━━━━━━━━
기본 공제: 5억원
추가 공제: 순자산의 50% (최대 30억 한도)

실제 공제액 = MIN(MAX(5억, 순자산×50%), 30억)

💰 자산별 실제 공제액:
━━━━━━━━━━━━━━━━━━━━━━
• 순자산 10억: 5억 공제 (최소 보장)
• 순자산 30억: 15억 공제
• 순자산 60억: 30억 공제 (최대 한도)
• 순자산 100억: 30억 공제 (한도 적용)

🎯 극대화 전략 3가지:
━━━━━━━━━━━━━━━━━━━━━━
1. 배우자 명의 재산 최소화
   → 본인 명의로 집중하여 공제 극대화

2. 1차 상속은 배우자에게
   → 배우자 공제로 세금 최소화
   → 2차 상속 시 자녀 증여 활용

3. 배우자 상속 재산의 운용
   → 생전 증여로 자녀에게 분산
   → 2차 상속세 부담 경감

📌 실제 사례: K대표님 (순자산 50억)
━━━━━━━━━━━━━━━━━━━━━━
Before (일괄공제):
• 공제: 5억
• 상속세: 18억

After (배우자공제):
• 공제: 25억 (기초 2억 + 배우자 25억)
• 상속세: 7억
• 절세액: 11억 (61% 절감) ✨

⚠️ 주의사항:
━━━━━━━━━━━━━━━━━━━━━━
• 배우자가 먼저 사망 시 공제 불가
• 법정 상속분 범위 내에서만 적용
• 2차 상속 대비 필수 (배우자→자녀)

📚 더 알아보기:
━━━━━━━━━━━━━━━━━━━━━━
👉 배우자공제 vs 일괄공제 비교: [블로그 링크]
👉 2차 상속 대비 전략: [블로그 링크]

💬 [이름]님께 질문:
━━━━━━━━━━━━━━━━━━━━━━
배우자가 있으신가요?
자산이 배우자와 본인 명의로 어떻게 나뉘어 있나요?

궁금한 점이 있으시면 이 이메일로 회신해주세요.
맞춤형 조언을 드리겠습니다.

내일은 '가업승계 공제 600억 활용법'을 알려드릴게요!

감사합니다.

패밀리오피스S 드림

P.S. 계산기에서 배우자 공제 시뮬레이션을 다시 해보세요.
👉 [계산기 링크]
```

**CTA 버튼**:
- Primary: "배우자 공제 시뮬레이션하기"
- Secondary: "2차 상속 대비 전략 보기"

**추적 이벤트**:
- `email_day2_open`
- `email_day2_click_calculator`
- `email_day2_reply`

---

### Day 3: 가업승계 공제 600억 활용법

**발송 타이밍**: Day 2 발송 후 24시간

**제목 옵션**:
- A: "중소기업 대표님, 최대 600억까지 상속세 없습니다 🏢"
- B: "가업승계로 상속세 93% 절감한 M기업 사례"
- C: "[이름]님 회사도 가업승계 대상일 수 있습니다"

**본문 구조**:

```
[이름]님, 안녕하세요!

혹시 사업을 하고 계신가요?
또는 가족 중에 사업을 하시는 분이 계신가요?

그렇다면 오늘 내용이 수십억원의 가치가 있을 수 있습니다.

🏢 가업승계 상속공제란?
━━━━━━━━━━━━━━━━━━━━━━
중소·중견기업을 자녀에게 승계할 때
상속세를 최대 600억원까지 공제해주는 제도입니다.

💰 공제 한도:
━━━━━━━━━━━━━━━━━━━━━━
• 중소기업: 최대 500억원
• 중견기업: 최대 600억원

✨ 실제 효과:
━━━━━━━━━━━━━━━━━━━━━━
• 100억 기업: 상속세 40억 → 0원 (100% 절감)
• 300억 기업: 상속세 120억 → 20억 (83% 절감)
• 500억 기업: 상속세 200억 → 30억 (85% 절감)

📋 요건 체크리스트:
━━━━━━━━━━━━━━━━━━━━━━
기업 요건:
☐ 중소·중견기업 해당
☐ 10년 이상 계속 경영
☐ 업종 적격 (금융·보험업 제외)

피상속인(사업주) 요건:
☐ 10년 이상 대표이사 재직
☐ 50% 이상 지분 보유

상속인(후계자) 요건:
☐ 상속 후 2년 내 대표이사 취임
☐ 7년 이상 대표이사 유지
☐ 정규직 80% 이상 유지

💼 실제 사례: M기업 (정밀기계 제조)
━━━━━━━━━━━━━━━━━━━━━━
기업 정보:
• 자산: 350억원
• 종업원: 120명
• 창업: 1985년 (40년 기업)

절세 결과:
• 예상 상속세: 140억원
• 가업상속공제: 300억원
• 실제 납부: 10억원
• 절세액: 130억원 (93% 절감) ✨

🎯 준비 로드맵 (최소 5년 필요):
━━━━━━━━━━━━━━━━━━━━━━
Phase 1 (5-10년 전):
• 기업 가치 평가
• 요건 충족 여부 확인
• 후계자 교육 시작

Phase 2 (5년 전):
• 지주회사 설립 검토
• 지분 정리
• 후계자 경영 참여

Phase 3 (3년 전):
• 주식 증여 시작
• 세무 전략 수립

Phase 4 (승계 시):
• 공제 신청
• 법적 절차 완료

Phase 5 (승계 후):
• 고용 유지
• 지분 유지
• 정기 점검

⚠️ 절대 하면 안 되는 실수:
━━━━━━━━━━━━━━━━━━━━━━
❌ 급하게 준비 → 요건 미충족
❌ 사후관리 소홀 → 추징세 발생
❌ 자격 미확인 → 신청 거부

✅ 성공 포인트:
━━━━━━━━━━━━━━━━━━━━━━
• 최소 5년 전부터 체계적 준비
• 전문가 조기 자문
• 정기적 점검과 관리

📌 [이름]님 회사 진단:
━━━━━━━━━━━━━━━━━━━━━━
다음 중 해당하는 항목이 있나요?

☐ 중소·중견기업을 운영 중
☐ 10년 이상 경영
☐ 자녀에게 사업 승계 계획
☐ 기업 가치 50억 이상

→ 1개라도 해당하면 전문가 상담 권장

📚 더 알아보기:
━━━━━━━━━━━━━━━━━━━━━━
👉 가업승계 완전 정복 가이드: [블로그 링크]
👉 요건 체크리스트 다운로드: [PDF 링크]

💬 무료 진단 받기:
━━━━━━━━━━━━━━━━━━━━━━
우리 회사가 가업승계 대상인지 궁금하신가요?

간단한 정보만 알려주시면
무료로 자격 여부를 진단해드립니다.

👉 [30초 무료 진단 신청]

내일은 '생전증여 최적 타이밍'을 알려드릴게요!

감사합니다.

패밀리오피스S 드림
```

**CTA 버튼**:
- Primary: "가업승계 자격 무료 진단"
- Secondary: "완전 정복 가이드 보기"

**추적 이벤트**:
- `email_day3_open`
- `email_day3_click_diagnosis`
- `email_day3_download_pdf`

---

### Day 4: 생전증여 최적 타이밍

**발송 타이밍**: Day 3 발송 후 24시간

**제목 옵션**:
- A: "증여 vs 상속, 어떤 게 유리할까? (타이밍이 전부입니다) ⏰"
- B: "지금 증여하면 20억 아낄 수 있습니다"
- C: "[이름]님, 증여 타이밍을 놓치면 수억원 손해입니다"

**본문 구조**:

```
[이름]님, 안녕하세요!

"증여가 나을까요, 상속이 나을까요?"

가장 많이 받는 질문입니다.
정답은... "경우에 따라 다릅니다!"

오늘은 언제, 어떻게 증여해야
최대 절세 효과를 얻을 수 있는지 알려드릴게요.

💡 핵심 원칙:
━━━━━━━━━━━━━━━━━━━━━━
"가치가 오르기 전에 증여하라!"

부동산, 주식 등 가치 상승 예상 자산은
미리 증여하면 엄청난 절세 효과가 있습니다.

📊 실제 비교: 자산 50억 기준
━━━━━━━━━━━━━━━━━━━━━━
Case 1) 전액 상속:
• 상속세: 약 18억원

Case 2) 생전증여 활용 (10년 × 2회):
• 1차 증여세 (10억): 1.6억
• 2차 증여세 (10억): 1.6억
• 상속세 (30억): 7억
• 총 세금: 10.2억원
• 절세액: 7.8억원 (43% ↓) ✨

🎯 증여가 절대 유리한 3가지 상황:
━━━━━━━━━━━━━━━━━━━━━━
1. 자산 규모가 큰 경우 (30억 이상)
   → 높은 세율 구간 분산 효과

2. 자산 가치 상승 예상
   → 부동산 개발 예정 지역
   → 성장 가능성 높은 비상장 주식
   → IPO 준비 중인 기업

3. 시간적 여유가 있는 경우
   → 10년 단위 반복 증여 가능
   → 공제 한도 재활용

⏰ 증여 최적 타이밍 3가지:
━━━━━━━━━━━━━━━━━━━━━━
1순위: 자산 가치 상승 직전
• 개발 호재 발표 전 부동산
• IPO 신청 전 비상장 주식
• 사업 확장 직전 기업 지분

2순위: 10년 주기 활용
• 1차: 자녀 30세 (5천만원)
• 2차: 자녀 40세 (5억원)
• 3차: 자녀 50세 (10억원)
• 상속: 본인 70대

3순위: 세법 개정 전
• 공제 축소 예정 시
• 세율 인상 예고 시
• 제도 폐지 우려 시

💰 자산별 최적 전략:
━━━━━━━━━━━━━━━━━━━━━━
부동산:
• 개발 호재 전 증여
• 저평가 시점 활용
• 임대소득 분산 효과

상장주식:
• 저가 매수 후 증여
• 배당 수익 자녀에게
• 양도세 분산

비상장주식:
• IPO 전 증여 필수
• 가업승계 병행
• 평가 시점 조절

현금/예금:
• 증여세 부담 큼
• 소액 분할 증여
• 10년 주기 활용

📌 실제 사례: L대표님 (IT 창업가)
━━━━━━━━━━━━━━━━━━━━━━
상황:
• 비상장 주식 100억 (IPO 준비 중)
• IPO 후 예상 가치: 300억

전략:
• IPO 전 자녀 증여 (평가액 100억)
• 증여세: 약 30억
• IPO 후 가치: 300억
• 증여 안 했으면: 상속세 120억
• 절세액: 90억원 (75% ↓) ✨

⚠️ 증여 시 주의사항:
━━━━━━━━━━━━━━━━━━━━━━
• 10년 내 증여 재산은 상속세 합산
• 부담부증여 시 양도세 발생
• 증여세 미신고 시 가산세 20-40%

🛡️ 상속이 유리한 경우:
━━━━━━━━━━━━━━━━━━━━━━
• 자산 규모 15억 이하
• 배우자 공제 활용 가능
• 재산 가치 하락 예상
• 자녀 자금 필요 없음

📊 [이름]님 맞춤 시뮬레이션:
━━━━━━━━━━━━━━━━━━━━━━
증여 vs 상속, 어떤 게 유리한지
계산기에서 직접 비교해보세요!

👉 [증여/상속 비교 계산하기]

📚 더 알아보기:
━━━━━━━━━━━━━━━━━━━━━━
👉 증여 vs 상속 완벽 가이드: [블로그 링크]
👉 증여세 계산기: [계산기 링크]

💬 [이름]님께 질문:
━━━━━━━━━━━━━━━━━━━━━━
1. 가치 상승이 예상되는 자산이 있나요?
2. 자녀에게 언제쯤 재산을 물려줄 계획인가요?
3. 10년 단위 증여 계획을 세워보셨나요?

회신 주시면 맞춤형 조언을 드리겠습니다.

내일은 '보험을 활용한 절세 전략'을 알려드릴게요!

감사합니다.

패밀리오피스S 드림
```

**CTA 버튼**:
- Primary: "증여/상속 비교 계산하기"
- Secondary: "완벽 가이드 다운로드"

**추적 이벤트**:
- `email_day4_open`
- `email_day4_click_calculator`
- `email_day4_reply`

---

### Day 5: 보험을 활용한 절세 전략

**발송 타이밍**: Day 4 발송 후 24시간

**제목 옵션**:
- A: "보험으로 상속세를 납부한다? 똑똑한 절세 전략 🛡️"
- B: "상속세 납부 자금, 이렇게 준비하세요"
- C: "[이름]님, 상속세 때문에 회사 팔 필요 없습니다"

**본문 구조**:

```
[이름]님, 안녕하세요!

"상속세는 줄였는데, 납부할 현금이 없어요..."

이런 상황, 실제로 자주 발생합니다.
특히 부동산이나 회사 지분이 많은 경우요.

오늘은 보험을 활용한
스마트한 상속세 납부 전략을 알려드릴게요.

💡 핵심 아이디어:
━━━━━━━━━━━━━━━━━━━━━━
상속세 납부 자금을 보험금으로 준비하면
1) 유동성 문제 해결
2) 추가 절세 효과
3) 가족 보호 기능

까지 한 번에 해결됩니다.

🛡️ 보험 활용 전략 3가지:
━━━━━━━━━━━━━━━━━━━━━━
1. 종신보험 활용
• 사망 시 즉시 현금 확보
• 상속세 납부 자금 준비
• 보험금은 비과세 (일부)

2. 변액보험 활용
• 투자 수익 + 보험 기능
• 장기 자산 증식
• 상속 재원 마련

3. 즉시연금 활용
• 고령자 현금 흐름 확보
• 상속 재산 감소 효과
• 생활비 + 절세 동시

📊 실제 사례: C회장님 (자산 100억)
━━━━━━━━━━━━━━━━━━━━━━
문제 상황:
• 총 자산: 100억 (회사 지분 80억 + 부동산 20억)
• 예상 상속세: 35억
• 현금 자산: 5억 (부족!)
• 고민: 회사 지분 팔아야 하나?

해결 전략:
• 종신보험 가입: 보험료 10억 → 보험금 30억
• 변액보험 가입: 보험료 5억 → 예상 수령액 15억
• 총 투자: 15억
• 확보 자금: 45억 (상속세 납부 충분)

결과:
• 회사 지분 유지 ✅
• 상속세 납부 가능 ✅
• 오히려 10억 여유 자금 ✅

💰 보험의 절세 효과:
━━━━━━━━━━━━━━━━━━━━━━
1. 보험금 비과세 한도
• 피상속인 사망 보험금
• 상속인 1인당 2억원 비과세
• 배우자 5억원 비과세

2. 재산 평가 감소
• 보험 계약자: 피상속인
• 수익자: 상속인
• 보험료 납부로 재산 감소

3. 유동성 확보
• 상속 재산은 부동산/주식
• 보험금은 즉시 현금화
• 납부 자금 걱정 해소

⏰ 보험 가입 최적 타이밍:
━━━━━━━━━━━━━━━━━━━━━━
50대 이전: ⭐⭐⭐⭐⭐
• 보험료 저렴
• 가입 심사 유리
• 장기 운용 가능

50-60대: ⭐⭐⭐⭐
• 아직 가입 가능
• 중기 운용
• 납부 자금 확보

70대 이상: ⭐⭐
• 가입 제한 많음
• 보험료 고가
• 즉시연금 검토

⚠️ 주의사항:
━━━━━━━━━━━━━━━━━━━━━━
1. 건강 상태 확인
• 고령일수록 심사 까다로움
• 지병 있으면 가입 어려움
• 조기 검토 필수

2. 보험료 부담
• 과도한 보험료 주의
• 생활비 우선 확보
• 적정 수준 유지

3. 계약 구조 설계
• 계약자/피보험자/수익자
• 세금 효과 고려
• 전문가 상담 필수

🎯 [이름]님 체크리스트:
━━━━━━━━━━━━━━━━━━━━━━
☐ 예상 상속세 확인 완료
☐ 현금 자산 충분한지 점검
☐ 부족 시 보험 검토 필요
☐ 건강 상태 양호 (가입 가능)
☐ 50-60대 (최적 타이밍)

→ 2개 이상 체크 시 전문가 상담 권장

📌 보험 설계 무료 상담:
━━━━━━━━━━━━━━━━━━━━━━
상속세 납부 자금을
어떻게 준비하면 좋을지 궁금하신가요?

세무사 + 보험 전문가가 함께
최적의 솔루션을 제시해드립니다.

👉 [무료 보험 설계 상담 신청]
(30분 화상 or 대면 상담)

📚 더 알아보기:
━━━━━━━━━━━━━━━━━━━━━━
👉 보험 활용 절세 완벽 가이드: [블로그 링크]
👉 보험 vs 증여 비교 분석: [블로그 링크]

💬 [이름]님께 질문:
━━━━━━━━━━━━━━━━━━━━━━
1. 현금 자산이 총 자산의 몇 %인가요?
2. 상속세 납부 자금 준비하셨나요?
3. 보험으로 해결하는 방법을 고려해보셨나요?

회신 주시면 맞춤 조언을 드리겠습니다.

내일은 '실제 절세 플랜 설계 사례'를 공유드릴게요!

감사합니다.

패밀리오피스S 드림
```

**CTA 버튼**:
- Primary: "무료 보험 설계 상담"
- Secondary: "완벽 가이드 보기"

**추적 이벤트**:
- `email_day5_open`
- `email_day5_click_consultation`
- `email_day5_download_guide`

---

### Day 6: 실제 절세 플랜 설계 사례

**발송 타이밍**: Day 5 발송 후 24시간

**제목 옵션**:
- A: "100억 자산가의 완벽한 절세 플랜 (전체 공개) 📋"
- B: "[이름]님도 이렇게 플랜을 짜보세요 (템플릿 제공)"
- C: "상속세 80% 절감, 어떻게 가능했을까?"

**본문 구조**:

```
[이름]님, 안녕하세요!

지난 5일간 배운 내용을 모두 종합하면
어떤 플랜이 나올까요?

오늘은 실제 100억 자산가의
종합 절세 플랜을 전체 공개합니다.

[이름]님의 상황에 맞게 응용해보세요!

👤 사례: P대표님 (IT 기업 대표, 58세)
━━━━━━━━━━━━━━━━━━━━━━
가족 구성:
• 본인 (58세)
• 배우자 (55세)
• 자녀 2명 (28세, 25세)

자산 현황:
• 회사 지분: 70억 (70% 지분)
• 부동산: 20억 (자택 + 투자용)
• 금융자산: 10억
• 총 자산: 100억

현 상태 예상 상속세:
• 약 38억원 (!)

🎯 10년 플랜 전략:
━━━━━━━━━━━━━━━━━━━━━━
Phase 1 (1-2년차): 구조 설계
━━━━━━━━━━━━━━━━━━━━━━
• 지주회사 설립 (자산 관리 효율화)
• 가업승계 요건 확인 및 준비
• 자녀 경영 참여 시작
• 종신보험 가입 (보험금 30억)

예상 효과: 구조 최적화

Phase 2 (3-4년차): 1차 증여
━━━━━━━━━━━━━━━━━━━━━━
• 자녀 1: 비상장 주식 5억 증여
• 자녀 2: 비상장 주식 5억 증여
• 배우자: 부동산 6억 증여 (10년 비과세)
• 증여세: 약 3억

예상 효과: 자산 16억 이전

Phase 3 (5-6년차): 가업승계 준비
━━━━━━━━━━━━━━━━━━━━━━
• 자녀 1 이사 승진
• 경영 노하우 전수
• 주요 거래처 인사
• 세무사 자문 계약

예상 효과: 가업승계 요건 충족

Phase 4 (7-8년차): IPO 준비
━━━━━━━━━━━━━━━━━━━━━━
• 코스닥 상장 추진
• 상장 전 추가 증여 (각 5억)
• 증여세: 약 3억
• 상장 후 주가 상승 (70억 → 150억)

예상 효과: 추가 절세 + 기업 가치 ↑

Phase 5 (9-10년차): 2차 증여
━━━━━━━━━━━━━━━━━━━━━━
• 10년 경과로 공제 재사용
• 자녀 각 10억 추가 증여
• 증여세: 약 6억
• 배우자 추가 증여 6억

예상 효과: 총 52억 증여 완료

💰 10년 후 예상 결과:
━━━━━━━━━━━━━━━━━━━━━━
Before (플랜 없이):
• 총 자산: 150억 (IPO로 증가)
• 상속세: 약 60억

After (플랜 실행):
• 증여 완료: 52억
• 남은 자산: 98억
• 가업승계 공제: 50억
• 배우자 공제: 30억
• 과세 표준: 18억
• 상속세: 약 5억

절세 효과:
━━━━━━━━━━━━━━━━━━━━━━
• 총 투자: 12억 (증여세)
• 절세액: 55억
• 순이익: 43억
• 절감율: 92% ✨

📋 성공 요인 분석:
━━━━━━━━━━━━━━━━━━━━━━
✅ 조기 시작 (58세부터)
✅ 단계별 실행 (급하지 않게)
✅ 가치 상승 활용 (IPO 전 증여)
✅ 공제 최대화 (가업승계 + 배우자)
✅ 10년 주기 활용 (증여 2회)
✅ 전문가 자문 (세무사 + 변호사)

🎯 [이름]님 맞춤 플랜 만들기:
━━━━━━━━━━━━━━━━━━━━━━
1단계: 현황 파악
• 총 자산: ________억
• 예상 상속세: ________억
• 현재 나이: ________세

2단계: 목표 설정
• 목표 절세액: ________억
• 준비 기간: ________년
• 우선순위: ________

3단계: 전략 선택 (복수 선택 가능)
☐ 생전 증여 (10년 주기)
☐ 가업승계 공제
☐ 배우자 공제 극대화
☐ 보험 활용
☐ 지주회사 구조

4단계: 실행 계획
• 1년차: ________________
• 3년차: ________________
• 5년차: ________________
• 10년차: _______________

📊 무료 플랜 설계 서비스:
━━━━━━━━━━━━━━━━━━━━━━
[이름]님만의 맞춤형 절세 플랜을
전문가가 직접 설계해드립니다.

포함 내용:
✅ 현황 분석 (자산/가족/목표)
✅ 최적 전략 조합 제시
✅ 10년 로드맵 작성
✅ 예상 절세액 계산
✅ 실행 체크리스트
✅ 1년 후 점검 (무료)

상담 방식:
• 화상 상담: 60분
• 대면 상담: 90분 (서울 강남)
• 플랜 문서: PDF 제공

비용: 무료 (선착순 20명)
※ 계산기 이용자 한정 특별 혜택

👉 [무료 플랜 설계 신청하기]

💬 이미 상담받으신 분들의 후기:
━━━━━━━━━━━━━━━━━━━━━━
"막연했던 절세가 구체적으로 보였어요" - K대표님
"10년 플랜 덕분에 안심하고 준비합니다" - L회장님
"상담 한 번으로 20억 절세 길이 열렸습니다" - M대표님

📚 더 알아보기:
━━━━━━━━━━━━━━━━━━━━━━
👉 절세 플랜 템플릿 다운로드: [PDF]
👉 체크리스트 다운로드: [Excel]
👉 사례집 더 보기: [블로그]

내일은 마지막 Day 7!
'전문가 무료 상담 특별 혜택'을 안내드릴게요.

7일간의 절세 여정, 거의 다 왔습니다!

감사합니다.

패밀리오피스S 드림
```

**CTA 버튼**:
- Primary: "무료 플랜 설계 신청" (강조)
- Secondary: "템플릿 다운로드"

**추적 이벤트**:
- `email_day6_open`
- `email_day6_click_consultation` (중요)
- `email_day6_download_template`

---

### Day 7: 무료 상담 특별 혜택 (최종 전환)

**발송 타이밍**: Day 6 발송 후 24시간

**제목 옵션**:
- A: "[마감 임박] [이름]님께 드리는 특별 혜택 🎁"
- B: "7일 완주 축하합니다! 특별 선물을 준비했어요"
- C: "지금 신청하면 500만원 상당 무료 혜택"

**본문 구조**:

```
[이름]님, 안녕하세요!

드디어 7일 절세 가이드의 마지막 날입니다.

지난 일주일간 함께해주셔서 정말 감사합니다!

🎉 [이름]님이 배운 내용:
━━━━━━━━━━━━━━━━━━━━━━
✅ Day 1: 내 상황 정확히 파악
✅ Day 2: 배우자 공제 극대화
✅ Day 3: 가업승계 600억 공제
✅ Day 4: 생전증여 최적 타이밍
✅ Day 5: 보험 활용 전략
✅ Day 6: 실제 플랜 설계 사례

이제 [이름]님은 상속세 절세에 대해
많은 것을 아시게 되었습니다!

💡 하지만...
━━━━━━━━━━━━━━━━━━━━━━
"아는 것"과 "실행하는 것"은 다릅니다.

• 내 상황에 맞는 전략은 뭘까?
• 어떤 순서로 실행해야 할까?
• 세법이 바뀌면 어떻게 하지?
• 전문가 도움이 필요한데...

이런 고민, 혼자 하지 마세요!

🎁 7일 완주 특별 혜택:
━━━━━━━━━━━━━━━━━━━━━━
[이름]님께 특별한 선물을 준비했습니다.

━━━━━━━━━━━━━━━━━━━━━━
🎯 무료 전문가 상담 (90분)
━━━━━━━━━━━━━━━━━━━━━━
정상가: 500,000원
→ 7일 완주자: 무료 ✨

포함 내용:
✅ 맞춤형 절세 플랜 설계
✅ 예상 절세액 정밀 계산
✅ 10년 로드맵 작성
✅ 실행 체크리스트 제공
✅ 전문가 팀 배정 (세무사 + 변호사)

상담 방식 선택:
• 화상 상담 (Zoom)
• 대면 상담 (서울 강남 오피스)

━━━━━━━━━━━━━━━━━━━━━━
📄 맞춤형 절세 리포트
━━━━━━━━━━━━━━━━━━━━━━
정상가: 300,000원
→ 7일 완주자: 무료 ✨

포함 내용:
✅ 현황 분석 (20페이지)
✅ 최적 전략 제시
✅ 예상 절세액 계산서
✅ 단계별 실행 계획
✅ 체크리스트 및 템플릿

━━━━━━━━━━━━━━━━━━━━━━
🔄 1년 무료 점검 서비스
━━━━━━━━━━━━━━━━━━━━━━
정상가: 200,000원/년
→ 7일 완주자: 1년 무료 ✨

포함 내용:
✅ 연 2회 정기 점검
✅ 세법 개정 알림
✅ 전략 업데이트
✅ 이메일/전화 상담 무제한

━━━━━━━━━━━━━━━━━━━━━━
총 가치: 1,000,000원
→ [이름]님: 100% 무료 🎁
━━━━━━━━━━━━━━━━━━━━━━

⏰ 단, 조건이 있습니다:
━━━━━━━━━━━━━━━━━━━━━━
이 혜택은 선착순 20명에게만 제공됩니다.

현재 신청: 14명
남은 인원: 6명

마감까지: 48시간

※ 7일 가이드 완주자만 신청 가능
※ 1인 1회 한정
※ 강매 없음 (상담만 받고 가셔도 됩니다)

📊 상담 후 기대 효과:
━━━━━━━━━━━━━━━━━━━━━━
상담 받으신 분들의 90%가
명확한 실행 계획을 갖게 되었습니다.

"계산기로는 막연했는데,
상담 후 구체적인 로드맵이 생겼어요!" - K대표님

"10년 플랜을 받아서
이제 단계별로 실행만 하면 됩니다!" - L회장님

"20억 절세 방법을 찾았습니다.
상담 받길 정말 잘했어요!" - M대표님

💬 상담 진행 절차:
━━━━━━━━━━━━━━━━━━━━━━
1단계: 신청서 제출 (3분)
• 기본 정보 입력
• 희망 날짜/시간 선택
• 상담 방식 선택

2단계: 일정 확정
• 24시간 내 연락
• 상담 일정 조율
• 사전 자료 안내

3단계: 상담 진행 (90분)
• 현황 분석
• 전략 제시
• 질의응답

4단계: 리포트 제공
• 상담 후 7일 내
• PDF 파일 이메일 발송
• 추가 질문 가능

👉 [지금 무료 상담 신청하기]
(클릭 한 번으로 신청 완료)

━━━━━━━━━━━━━━━━━━━━━━
⚠️ 이런 분들은 꼭 신청하세요!
━━━━━━━━━━━━━━━━━━━━━━
☑️ 자산 10억 이상
☑️ 상속세 고민 중
☑️ 구체적 플랜 필요
☑️ 전문가 조언 필요
☑️ 지금 시작하고 싶음

→ 1개라도 해당하면 신청 권장

❌ 이런 분들은 패스하세요:
━━━━━━━━━━━━━━━━━━━━━━
• 자산 5억 이하 (기초공제로 충분)
• 시간 여유 없으신 분
• 단순 정보 수집만 원하시는 분
• 이미 전문가 있으신 분

🔒 개인정보 보호 약속:
━━━━━━━━━━━━━━━━━━━━━━
• 상담 내용 100% 비밀 보장
• 제3자 정보 제공 절대 없음
• 불필요한 마케팅 전화 없음
• 원하지 않으면 언제든 거절 가능

📞 급하신 분은 전화주세요:
━━━━━━━━━━━━━━━━━━━━━━
상담 예약: 02-XXXX-XXXX
(평일 9시-18시)

"7일 가이드 완주했어요!"
라고 말씀해주시면
우선 배정해드립니다.

📚 놓친 내용 복습하기:
━━━━━━━━━━━━━━━━━━━━━━
👉 Day 1: 내 상황 파악 [다시보기]
👉 Day 2: 배우자 공제 [다시보기]
👉 Day 3: 가업승계 [다시보기]
👉 Day 4: 생전증여 [다시보기]
👉 Day 5: 보험 활용 [다시보기]
👉 Day 6: 플랜 설계 [다시보기]

💌 마지막 인사:
━━━━━━━━━━━━━━━━━━━━━━
[이름]님,

7일간 함께해주셔서 진심으로 감사드립니다.

상속세는 준비하는 사람에게는 '기회'입니다.
미리 준비하면 수십억을 절감할 수 있습니다.

하지만 준비하지 않는 사람에게는 '재앙'입니다.
예상치 못한 세금으로 가족이 힘들어질 수 있습니다.

[이름]님은 이미 첫걸음을 떼셨습니다.
이제 실행만 하시면 됩니다.

무료 상담이 그 시작이 될 수 있습니다.

망설이지 마세요.
지금 신청하세요.

48시간 후면 이 혜택은 사라집니다.

[이름]님의 성공적인 재산 승계를
진심으로 응원합니다!

━━━━━━━━━━━━━━━━━━━━━━
👉 [마지막 기회 - 지금 신청하기]
━━━━━━━━━━━━━━━━━━━━━━

감사합니다.

패밀리오피스S 드림

P.S.
7일 가이드가 도움이 되셨다면
주변 분들께도 공유해주세요!

👉 [친구에게 추천하기]
(추천하신 분도 무료 상담 혜택 드립니다)
```

**CTA 버튼**:
- Primary: "무료 상담 신청하기" (강조, 크게)
- Secondary: "전화 상담 예약"
- Tertiary: "친구 추천하기"

**추적 이벤트**:
- `email_day7_open`
- `email_day7_click_consultation` (최종 전환)
- `email_day7_click_phone`
- `email_day7_referral`

---

## Beehiiv API 통합 가이드

### API 개요

**Beehiiv API v2**: RESTful API with authentication

**Base URL**: `https://api.beehiiv.com/v2/`

**Authentication**: Bearer token in Authorization header

### 필요한 API 엔드포인트

#### 1. 구독자 추가 (Subscriber Creation)

```typescript
POST /publications/{publication_id}/subscriptions

Headers:
Authorization: Bearer {API_KEY}
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "reactivate_existing": false,
  "send_welcome_email": true,
  "utm_source": "calculator",
  "utm_medium": "website",
  "utm_campaign": "inheritance_tax",
  "referring_site": "familyoffices.vip",
  "custom_fields": [
    {
      "name": "계산_금액",
      "value": "5000000000"
    },
    {
      "name": "예상_상속세",
      "value": "1000000000"
    },
    {
      "name": "등록_경로",
      "value": "calculator"
    }
  ]
}

Response:
{
  "data": {
    "id": "sub_xxx",
    "email": "user@example.com",
    "status": "active",
    "created": 1234567890,
    "custom_fields": {...}
  }
}
```

#### 2. 구독자 태그 추가

```typescript
POST /publications/{publication_id}/subscriptions/{subscription_id}/tags

Request Body:
{
  "tags": [
    "calculator_user",
    "high_value",  // 50억 이상
    "week_1_started"
  ]
}
```

#### 3. 자동화 시퀀스 등록

```typescript
POST /publications/{publication_id}/automations/{automation_id}/subscribers

Request Body:
{
  "email": "user@example.com",
  "start_immediately": true
}
```

### Beehiiv 자동화 설정

**자동화 시퀀스 생성 단계**:

1. Beehiiv 대시보드 → Automations → Create New
2. Trigger: "Manual API trigger"
3. 이메일 7개 추가 (Day 1-7)
4. 각 이메일 간격: 24시간
5. Automation ID 저장

**커스텀 필드 설정**:
- `계산_금액` (Number)
- `예상_상속세` (Number)
- `등록_경로` (Text)
- `자산_규모` (Text: "10억 이하", "10-50억", "50억 이상")

---

## Supabase 스키마 설계

### leads 테이블

```sql
CREATE TABLE leads (
  -- 기본 정보
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  phone VARCHAR(20),

  -- 계산 결과
  total_assets BIGINT, -- 총 자산 (원)
  total_debts BIGINT, -- 총 부채
  net_assets BIGINT, -- 순자산
  estimated_tax BIGINT, -- 예상 상속세

  -- 가족 정보
  has_spouse BOOLEAN DEFAULT false,
  num_children INTEGER DEFAULT 0,
  num_minor_children INTEGER DEFAULT 0,

  -- 리드 소스
  source VARCHAR(50) DEFAULT 'calculator', -- calculator, blog, naver
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  utm_content VARCHAR(100),
  referring_url TEXT,

  -- Beehiiv 연동
  beehiiv_subscription_id VARCHAR(100),
  beehiiv_status VARCHAR(20), -- active, unsubscribed, bounced
  automation_started_at TIMESTAMP WITH TIME ZONE,

  -- 이메일 추적
  email_day1_sent BOOLEAN DEFAULT false,
  email_day1_opened BOOLEAN DEFAULT false,
  email_day1_clicked BOOLEAN DEFAULT false,
  email_day2_sent BOOLEAN DEFAULT false,
  email_day2_opened BOOLEAN DEFAULT false,
  email_day2_clicked BOOLEAN DEFAULT false,
  email_day3_sent BOOLEAN DEFAULT false,
  email_day3_opened BOOLEAN DEFAULT false,
  email_day3_clicked BOOLEAN DEFAULT false,
  email_day4_sent BOOLEAN DEFAULT false,
  email_day4_opened BOOLEAN DEFAULT false,
  email_day4_clicked BOOLEAN DEFAULT false,
  email_day5_sent BOOLEAN DEFAULT false,
  email_day5_opened BOOLEAN DEFAULT false,
  email_day5_clicked BOOLEAN DEFAULT false,
  email_day6_sent BOOLEAN DEFAULT false,
  email_day6_opened BOOLEAN DEFAULT false,
  email_day6_clicked BOOLEAN DEFAULT false,
  email_day7_sent BOOLEAN DEFAULT false,
  email_day7_opened BOOLEAN DEFAULT false,
  email_day7_clicked BOOLEAN DEFAULT false,

  -- 전환 추적
  consultation_requested BOOLEAN DEFAULT false,
  consultation_requested_at TIMESTAMP WITH TIME ZONE,
  consultation_completed BOOLEAN DEFAULT false,
  consultation_completed_at TIMESTAMP WITH TIME ZONE,
  converted_to_client BOOLEAN DEFAULT false,
  converted_at TIMESTAMP WITH TIME ZONE,

  -- 메타데이터
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- 인덱스
  CONSTRAINT email_valid CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- 인덱스 생성
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_beehiiv_status ON leads(beehiiv_status);
CREATE INDEX idx_leads_consultation_requested ON leads(consultation_requested) WHERE consultation_requested = true;

-- 자동 updated_at 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) 정책
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 관리자만 모든 데이터 접근 가능
CREATE POLICY "Admin access" ON leads
  FOR ALL
  USING (auth.jwt() ->> 'email' = 'jhlim725@gmail.com');

-- 서비스 역할은 모든 작업 가능
CREATE POLICY "Service role access" ON leads
  FOR ALL
  USING (auth.role() = 'service_role');
```

### email_events 테이블 (이벤트 로그)

```sql
CREATE TABLE email_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL, -- sent, opened, clicked, bounced, unsubscribed
  email_day INTEGER, -- 1-7
  event_data JSONB, -- 추가 정보 (클릭한 링크, 오픈 시간 등)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- 인덱스
  INDEX idx_email_events_lead_id (lead_id),
  INDEX idx_email_events_type (event_type),
  INDEX idx_email_events_day (email_day),
  INDEX idx_email_events_created_at (created_at DESC)
);

-- RLS 정책
ALTER TABLE email_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin access" ON email_events
  FOR ALL
  USING (auth.jwt() ->> 'email' = 'jhlim725@gmail.com');

CREATE POLICY "Service role access" ON email_events
  FOR ALL
  USING (auth.role() = 'service_role');
```

### consultation_requests 테이블

```sql
CREATE TABLE consultation_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,

  -- 연락 정보
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,

  -- 상담 희망 사항
  preferred_method VARCHAR(20), -- video, in_person, phone
  preferred_date DATE,
  preferred_time VARCHAR(20), -- morning, afternoon, evening
  message TEXT,

  -- 자산 정보 (선택)
  estimated_assets BIGINT,
  has_business BOOLEAN DEFAULT false,
  business_type VARCHAR(100),

  -- 처리 상태
  status VARCHAR(20) DEFAULT 'pending', -- pending, scheduled, completed, cancelled
  assigned_to VARCHAR(100), -- 담당 상담사
  scheduled_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,

  -- 메모
  internal_notes TEXT,

  -- 소스 추적
  source VARCHAR(50), -- email_day7, blog, homepage

  -- 메타데이터
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- 인덱스
  INDEX idx_consultation_status (status),
  INDEX idx_consultation_created_at (created_at DESC),
  INDEX idx_consultation_lead_id (lead_id)
);

-- 자동 updated_at 트리거
CREATE TRIGGER update_consultation_updated_at BEFORE UPDATE ON consultation_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS 정책
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin access" ON consultation_requests
  FOR ALL
  USING (auth.jwt() ->> 'email' = 'jhlim725@gmail.com');

CREATE POLICY "Service role access" ON consultation_requests
  FOR ALL
  USING (auth.role() = 'service_role');
```

---

## API 엔드포인트 설계

### 1. 리드 수집 API

**Endpoint**: `POST /api/leads/capture`

**Request Body**:
```typescript
{
  email: string;
  name?: string;
  calculationResult: {
    totalAssets: number;
    totalDebts: number;
    netAssets: number;
    estimatedTax: number;
    hasSpouse: boolean;
    numChildren: number;
    numMinorChildren: number;
  };
  source: 'calculator' | 'blog' | 'naver';
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
  };
  referringUrl?: string;
}
```

**Response**:
```typescript
{
  success: boolean;
  leadId: string;
  beehiivSubscriptionId?: string;
  message: string;
}
```

**플로우**:
1. 이메일 유효성 검증
2. Supabase leads 테이블에 저장 (중복 체크)
3. Beehiiv API로 구독자 추가
4. Beehiiv 자동화 시퀀스 시작
5. GA4 이벤트 트래킹
6. 응답 반환

### 2. 이메일 이벤트 웹훅

**Endpoint**: `POST /api/webhooks/beehiiv/events`

**Request Body** (Beehiiv webhook):
```typescript
{
  type: 'email.sent' | 'email.opened' | 'email.clicked' | 'email.bounced' | 'email.unsubscribed';
  data: {
    subscription_id: string;
    email: string;
    email_id: string;
    clicked_url?: string;
    timestamp: number;
  };
}
```

**플로우**:
1. Webhook 서명 검증
2. subscription_id로 lead 조회
3. 이벤트 타입에 따라 leads 테이블 업데이트
4. email_events 테이블에 로그 저장
5. 특정 이벤트 시 알림 (예: Day 7 클릭)

### 3. 상담 신청 API

**Endpoint**: `POST /api/consultation/request`

**Request Body**:
```typescript
{
  name: string;
  email: string;
  phone: string;
  preferredMethod: 'video' | 'in_person' | 'phone';
  preferredDate?: string; // ISO date
  preferredTime?: 'morning' | 'afternoon' | 'evening';
  message?: string;
  estimatedAssets?: number;
  hasBusiness?: boolean;
  businessType?: string;
  source: string; // email_day7, blog, homepage
  leadId?: string; // 기존 리드인 경우
}
```

**Response**:
```typescript
{
  success: boolean;
  requestId: string;
  message: string;
  estimatedResponse: string; // "24시간 이내 연락드리겠습니다"
}
```

**플로우**:
1. 입력 유효성 검증
2. consultation_requests 테이블에 저장
3. 기존 리드 있으면 연결 및 업데이트
4. 관리자 이메일 알림 발송
5. 신청자에게 확인 이메일 발송
6. GA4 전환 이벤트 트래킹

### 4. 리드 분석 대시보드 API

**Endpoint**: `GET /api/admin/leads/analytics`

**Query Parameters**:
```typescript
{
  startDate?: string; // ISO date
  endDate?: string;
  source?: string;
  minAssets?: number;
}
```

**Response**:
```typescript
{
  summary: {
    totalLeads: number;
    newLeadsThisWeek: number;
    newLeadsThisMonth: number;
    emailEngagementRate: number; // 평균 오픈율
    consultationRequestRate: number; // 상담 신청률
    conversionRate: number; // 계약 전환율
  };
  funnel: {
    totalLeads: number;
    emailDay1Opened: number;
    emailDay3Clicked: number;
    emailDay7Clicked: number;
    consultationRequested: number;
    consultationCompleted: number;
    convertedToClient: number;
  };
  topSources: Array<{
    source: string;
    count: number;
    conversionRate: number;
  }>;
  recentLeads: Array<Lead>;
}
```

---

## 자동화 플로우 다이어그램

```
사용자 계산 완료
    ↓
이메일 입력
    ↓
[API] POST /api/leads/capture
    ↓
━━━━━━━━━━━━━━━━━━━━
병렬 처리:
━━━━━━━━━━━━━━━━━━━━
1. Supabase 저장
   ├─ leads 테이블 INSERT
   └─ email_events INSERT (captured)

2. Beehiiv 연동
   ├─ 구독자 추가 API
   ├─ 커스텀 필드 설정
   ├─ 태그 추가
   └─ 자동화 시퀀스 시작

3. GA4 트래킹
   └─ lead_generated 이벤트
━━━━━━━━━━━━━━━━━━━━
    ↓
Day 1 이메일 발송 (Beehiiv 자동)
    ↓
웹훅: email.sent
    ↓
[API] POST /api/webhooks/beehiiv/events
    ↓
Supabase 업데이트
    ├─ email_day1_sent = true
    └─ email_events INSERT
    ↓
━━━━━━━━━━━━━━━━━━━━
사용자 액션:
━━━━━━━━━━━━━━━━━━━━
• 이메일 오픈
  → 웹훅: email.opened
  → email_day1_opened = true

• 링크 클릭
  → 웹훅: email.clicked
  → email_day1_clicked = true
  → clicked_url 저장
━━━━━━━━━━━━━━━━━━━━
    ↓
24시간 후
    ↓
Day 2 이메일 발송
    ↓
(반복... Day 7까지)
    ↓
Day 7 이메일
    ↓
상담 신청 클릭
    ↓
[API] POST /api/consultation/request
    ↓
━━━━━━━━━━━━━━━━━━━━
병렬 처리:
━━━━━━━━━━━━━━━━━━━━
1. Supabase 저장
   ├─ consultation_requests INSERT
   └─ leads UPDATE
       ├─ consultation_requested = true
       └─ consultation_requested_at = NOW()

2. 알림 발송
   ├─ 관리자 이메일
   └─ 신청자 확인 이메일

3. GA4 전환
   └─ consultation_requested 이벤트
━━━━━━━━━━━━━━━━━━━━
    ↓
관리자 대시보드
    ↓
상담 일정 잡기
    ↓
상담 완료 후
    ↓
[Admin] 상태 업데이트
    ├─ consultation_completed = true
    └─ converted_to_client = true (계약 시)
```

---

## 측정 지표 및 KPI

### 이메일 성과 지표

**Day별 목표**:

| Day | 발송율 | 오픈율 | 클릭율 | 목표 |
|-----|--------|--------|--------|------|
| 1 | 100% | 60% | 10% | 환영 및 관계 구축 |
| 2 | 95% | 55% | 15% | 교육 및 관심 유발 |
| 3 | 90% | 50% | 20% | 가치 제공 |
| 4 | 85% | 45% | 18% | 심화 교육 |
| 5 | 80% | 40% | 15% | 추가 가치 |
| 6 | 75% | 38% | 22% | 상담 준비 |
| 7 | 70% | 50% | 30% | **최종 전환** |

**전체 퍼널 목표**:
```
리드 수집: 500명/월
    ↓ 30% (이메일 수집)
이메일 시작: 150명
    ↓ 60% (Day 1 오픈)
Day 1 오픈: 90명
    ↓ 35% (Day 3 클릭)
Day 3 참여: 31명
    ↓ 70% (Day 7 도달)
Day 7 도달: 22명
    ↓ 30% (상담 신청)
상담 신청: 7명
    ↓ 70% (상담 완료)
상담 완료: 5명
    ↓ 40% (계약)
신규 계약: 2명

월간 예상 신규 계약: 2명
평균 계약금: 5,000,000원
월 매출: 10,000,000원
```

### 이메일별 핵심 지표

**Day 1**:
- 오픈율 60% 목표
- 계산 결과 재확인 클릭 10%

**Day 3**:
- 오픈율 50% 목표
- 블로그 클릭 15%
- 무료 진단 신청 5%

**Day 7**:
- 오픈율 50% 목표 (재관심 유도)
- 상담 신청 클릭 30% (핵심)
- 실제 상담 신청 10%

---

## A/B 테스트 계획

### 제목 테스트

**Day 1 제목**:
- A: "계산 결과 확인하셨나요? 절세 가이드 드립니다"
- B: "[이름]님, 상속세 [금액]원 절감 방법을 알려드릴게요"

**Day 7 제목**:
- A: "[마감 임박] [이름]님께 드리는 특별 혜택"
- B: "7일 완주 축하합니다! 특별 선물을 준비했어요"

### CTA 버튼 테스트

**Day 3 CTA**:
- A: "가업승계 자격 무료 진단"
- B: "우리 회사 대상인지 확인하기"

**Day 7 CTA**:
- A: "무료 상담 신청하기"
- B: "전문가와 30분 통화하기"

### 발송 타이밍 테스트

**Day 2-6**:
- Group A: 오전 10시 발송
- Group B: 오후 2시 발송
- Group C: 저녁 8시 발송

### 개인화 수준 테스트

- A: 기본 (이름만)
- B: 중간 (이름 + 계산 금액)
- C: 고급 (이름 + 계산 금액 + 맞춤 제안)

---

## 리스크 관리

### 스팸 방지

**문제**: 이메일이 스팸으로 분류될 위험

**대응**:
- SPF, DKIM, DMARC 설정 필수
- Beehiiv는 기본 설정 제공 (신뢰도 높음)
- 스팸 단어 피하기 ("무료", "지금", "클릭" 과다 사용 자제)
- 매 이메일에 수신거부 링크 포함
- 참여율 모니터링 (오픈율 20% 미만 시 제목/내용 개선)

### 법적 컴플라이언스

**개인정보보호법**:
- 이메일 수집 시 동의 명시
- 개인정보 처리방침 링크
- 수신거부 즉시 처리
- 개인정보 암호화 저장 (Supabase RLS)

**전자상거래법**:
- 광고성 정보 표시 "[광고]" (해당 시)
- 발신자 정보 명시
- 수신거부 방법 안내

### 이메일 피로도 관리

**문제**: 7일 연속 이메일로 인한 피로도

**대응**:
- 수신거부 시 즉시 중단
- 가치 중심 콘텐츠 (판매보다 교육)
- 선택적 건너뛰기 옵션
- 관심도 기반 조정 (오픈 안 하면 발송 간격 조정)

---

## 구현 우선순위

### Phase 1 (Week 5): 기반 구축
- [ ] Supabase 스키마 생성
- [ ] Beehiiv 계정 설정 및 자동화 생성
- [ ] 7일 이메일 콘텐츠 작성 및 Beehiiv 업로드
- [ ] 기본 API 엔드포인트 구현 (리드 수집)

### Phase 2 (Week 6): 연동 및 테스트
- [ ] Beehiiv API 연동 완료
- [ ] 웹훅 엔드포인트 구현
- [ ] 계산기 페이지 이메일 수집 폼 개선
- [ ] 내부 테스트 (10명 샘플)

### Phase 3 (Week 7): 모니터링 시스템
- [ ] 관리자 대시보드 구축
- [ ] 실시간 알림 시스템 (상담 신청 시)
- [ ] GA4 이벤트 트래킹 강화
- [ ] A/B 테스트 설정

### Phase 4 (Week 8): 최적화 및 런칭
- [ ] 이메일 콘텐츠 최종 검토
- [ ] 오픈율/클릭률 모니터링 대시보드
- [ ] 실제 리드로 베타 테스트
- [ ] 공식 런칭 및 모니터링

---

## 예산 및 ROI

### 비용 구조

**Beehiiv 요금**:
- Scale 플랜: $42/월 (2,500 구독자, 자동화 무제한)
- 예상 구독자: 500명/월 → 충분

**Supabase**:
- Pro 플랜: $25/월 (100,000 rows)
- 예상 사용: 월 500 리드 + 이벤트 로그

**개발 비용**:
- API 개발: 40시간 × $50/시간 = $2,000
- 이메일 작성: 20시간 × $30/시간 = $600
- 테스트/최적화: 10시간 × $50/시간 = $500

**총 초기 비용**: $3,167
**월간 운영 비용**: $67

### ROI 계산

**보수적 시나리오**:
- 월 리드: 500명
- 상담 신청: 7명 (1.4%)
- 계약: 2명 (0.4%)
- 평균 계약금: 5,000,000원
- 월 매출: 10,000,000원
- 연 매출: 120,000,000원
- **ROI**: 3,689%

**낙관적 시나리오**:
- 월 리드: 1,000명
- 상담 신청: 30명 (3%)
- 계약: 12명 (1.2%)
- 평균 계약금: 5,000,000원
- 월 매출: 60,000,000원
- 연 매출: 720,000,000원
- **ROI**: 22,137%

---

## 체크리스트

### Week 5 체크리스트
- [ ] Beehiiv 계정 생성 및 publication 설정
- [ ] API 키 발급 및 환경변수 설정
- [ ] Supabase 스키마 생성 (leads, email_events, consultation_requests)
- [ ] 7일 이메일 콘텐츠 최종 작성 완료
- [ ] Beehiiv에 이메일 7개 업로드
- [ ] 자동화 시퀀스 생성 및 테스트

### Week 6 체크리스트
- [ ] `/api/leads/capture` 엔드포인트 구현
- [ ] `/api/webhooks/beehiiv/events` 웹훅 구현
- [ ] Beehiiv API 연동 테스트 (구독자 추가)
- [ ] 계산기 페이지 이메일 폼 업데이트
- [ ] 내부 테스트 10명 실행 및 피드백 수집

### Week 7 체크리스트
- [ ] 관리자 대시보드 `/admin/leads` 구현
- [ ] `/api/consultation/request` 엔드포인트 구현
- [ ] 실시간 알림 시스템 (이메일/Slack)
- [ ] GA4 커스텀 이벤트 설정
- [ ] A/B 테스트 프레임워크 구축

### Week 8 체크리스트
- [ ] 이메일 콘텐츠 세무사 검토 완료
- [ ] 전체 시스템 통합 테스트
- [ ] 모니터링 대시보드 최종 점검
- [ ] 베타 테스트 (실제 리드 20명)
- [ ] 공식 런칭 및 주간 리뷰 미팅 설정

---

## 성공 기준

### 단기 목표 (1개월)
- ✅ 월 리드 500명 수집
- ✅ 평균 이메일 오픈율 40%+
- ✅ Day 7 상담 신청 클릭률 25%+
- ✅ 상담 신청 월 10건+

### 중기 목표 (3개월)
- ✅ 월 리드 1,000명
- ✅ 이메일 시퀀스 완료율 60%+
- ✅ 상담 신청 월 30건+
- ✅ 신규 계약 월 10건+

### 장기 목표 (6개월)
- ✅ 누적 리드 5,000명
- ✅ 이메일 리스트 건강도 유지 (오픈율 35%+)
- ✅ 상담-계약 전환율 30%+
- ✅ 월 매출 50,000,000원+

---

## Next Actions

1. **즉시 시작**: Beehiiv 계정 생성 및 환경 설정
2. **Week 5 Day 1**: Supabase 스키마 생성
3. **Week 5 Day 2-3**: 이메일 콘텐츠 작성 완료
4. **Week 5 Day 4-5**: API 엔드포인트 개발 시작
5. **Week 5 말**: 내부 테스트 준비

**첫 번째 마일스톤**: Week 5 종료 시 첫 테스트 이메일 발송 가능 상태
