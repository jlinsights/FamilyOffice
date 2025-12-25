'use client';

import { CheckCircle, Target, Clock, Shield, AlertCircle } from 'lucide-react';

import { memo } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { ClientOnlyIcon } from '@/components/ui/client-only-icon';

export const StructureCheckContentSection = memo(
  function StructureCheckContentSection() {
    return (
      <section className="py-16 lg:py-24 bg-muted/10">
        <div className="max-w-6xl mx-auto px-6">
          {/* 이런 분들께 필요합니다 */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              이런 분들께 필요합니다
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

            <div className="grid md:grid-cols-2 gap-6">
              {targetAudiences.map((audience, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow bg-card border-border"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        <ClientOnlyIcon
                          icon={CheckCircle}
                          className="h-6 w-6 text-primary"
                        />
                      </div>
                      <p className="text-base md:text-lg text-foreground leading-relaxed pt-2">
                        {audience}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-center text-xl font-medium text-primary mt-8">
              한 가지라도 해당된다면, 구조 점검이 먼저입니다.
            </p>
          </div>

          {/* 구조 점검이 다루는 것 */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              구조 점검이 다루는 것
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>

            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-center text-lg text-muted-foreground mb-8">
                구조 점검은 해결책을 제시하는 자리가 아닙니다.
                <br />
                <span className="font-semibold text-foreground">
                  판단의 기준을 명확히 하는 과정입니다.
                </span>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {checkPoints.map((point, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <ClientOnlyIcon
                        icon={point.icon}
                        className="h-6 w-6 text-primary flex-shrink-0 mt-1"
                      />
                      <p className="text-base text-foreground leading-relaxed">
                        {point.text}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg font-medium text-foreground">
                이 네 가지가 정리되면,
                <br />
                이후의 선택은 훨씬 단순해집니다.
              </p>
            </div>
          </div>

          {/* 구조 점검 진행 방식 */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              구조 점검은 이렇게 진행됩니다
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

            <div className="max-w-4xl mx-auto space-y-8">
              {processSteps.map((step, index) => (
                <Card
                  key={index}
                  className="bg-card border-border hover:border-primary/50 transition-colors"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-3 text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Card className="max-w-2xl mx-auto bg-primary/10 dark:bg-primary/5 border-primary/30">
                <CardContent className="p-8">
                  <p className="text-lg font-semibold text-foreground">
                    이 단계까지가 구조 점검의 전부입니다.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 자주 묻는 질문 */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              자주 묻는 질문
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className="bg-card border-border hover:border-primary/50 transition-colors"
                >
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-3 text-primary">
                      Q. {faq.question}
                    </h3>
                    <p className="text-base text-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

const targetAudiences = [
  '상속·가업승계를 언젠가는 해야 한다고 느끼지만, 언제가 적절한지 모르겠는 분',
  '자산은 충분하지만, 유사시 바로 동원할 수 있는 구조가 있는지 불안한 분',
  '대표자 유고 시 회사의 의사결정 권한이 명확한지 확신이 없는 분',
  '세무·회계 자문은 받고 있으나, 최종 판단은 계속 미뤄지고 있는 분',
];

const checkPoints = [
  {
    icon: Target,
    text: '상속·승계와 관련해 이미 결정된 것과, 아직 비어 있는 영역',
  },
  {
    icon: AlertCircle,
    text: '대표자 유고 시 의사결정이 멈추는 구간',
  },
  {
    icon: Shield,
    text: '자산 구성상 가장 취약한 지점(유동성·지분·권한)',
  },
  {
    icon: Clock,
    text: '지금 당장 결정해야 할 것과, 미뤄도 되는 것의 경계',
  },
];

const processSteps = [
  {
    title: '사전 질문 정리',
    description: '간단한 사전 질문을 통해 현재 상황을 정리합니다.',
  },
  {
    title: '1:1 구조 점검 미팅 (약 30분)',
    description: '방법이나 상품 제안 없이, 판단 구조만 함께 정리합니다.',
  },
  {
    title: '정리 결과 공유',
    description:
      '- 지금 결정해야 할 사안\n- 아직 미뤄도 되는 사안\n- 외부 전문가가 필요한 영역',
  },
];

const faqs = [
  {
    question: '상담이나 상품 제안이 포함되나요?',
    answer: '아닙니다. 구조 점검은 판매를 전제로 하지 않습니다.',
  },
  {
    question: '이미 세무사·회계사가 있어도 의미가 있나요?',
    answer:
      '의미가 있습니다. 구조 점검은 세무·회계 자문을 대체하지 않고, 그 조언들을 어떤 순서로 적용할지 판단 기준을 정리합니다.',
  },
  {
    question: '지금 당장 실행할 계획이 없어도 되나요?',
    answer:
      '오히려 그런 경우에 더 적합합니다. 결정하지 않아도 되는 이유가 명확해지면, 불안이 사라집니다.',
  },
];
