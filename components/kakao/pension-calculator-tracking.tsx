'use client';

import { useEffect } from 'react';

import { kakaoPixelTrack } from './kakao-pixel';

export function PensionCalculatorTracking() {
  useEffect(() => {
    // 페이지 조회 추적
    kakaoPixelTrack.pageView('연금계산기 페이지', 'calculator');

    // 컨텐츠 조회 추적 - 계산기 페이지 전용
    kakaoPixelTrack.viewContent('calculator', 'pension-calculator', 80000);
  }, []);

  useEffect(() => {
    // 계산 버튼 클릭 추적
    const handleCalculationInteraction = () => {
      kakaoPixelTrack.custom('calculator_used', {
        content_category: 'calculator',
        value: 50000,
        currency: 'KRW',
        event_type: 'engagement',
      });
    };

    // 입력 필드 상호작용 추적 (디바운싱된)
    let interactionTimer: NodeJS.Timeout;
    const handleInputInteraction = () => {
      clearTimeout(interactionTimer);
      interactionTimer = setTimeout(() => {
        kakaoPixelTrack.custom('calculator_input', {
          content_category: 'calculator',
          value: 10000,
          currency: 'KRW',
          event_type: 'interaction',
        });
      }, 2000); // 2초 디바운싱
    };

    // 결과 확인 추적
    const handleResultView = () => {
      kakaoPixelTrack.custom('calculator_result', {
        content_category: 'calculator',
        value: 100000,
        currency: 'KRW',
        event_type: 'conversion',
      });
    };

    // 이벤트 리스너 등록
    const calculatorForm = document.querySelector('#pension-calculator-form');
    const inputFields = document.querySelectorAll(
      'input[type="number"], input[type="range"]'
    );

    if (calculatorForm) {
      calculatorForm.addEventListener('submit', handleCalculationInteraction);
    }

    inputFields.forEach(input => {
      input.addEventListener('input', handleInputInteraction);
      input.addEventListener('change', handleInputInteraction);
    });

    // 결과 영역 관찰
    const resultSection = document.querySelector('#calculation-results');
    if (resultSection) {
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            handleResultView();
          }
        });
      });

      observer.observe(resultSection, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
        calculatorForm?.removeEventListener(
          'submit',
          handleCalculationInteraction
        );
        inputFields.forEach(input => {
          input.removeEventListener('input', handleInputInteraction);
          input.removeEventListener('change', handleInputInteraction);
        });
        clearTimeout(interactionTimer);
      };
    }

    return () => {
      calculatorForm?.removeEventListener(
        'submit',
        handleCalculationInteraction
      );
      inputFields.forEach(input => {
        input.removeEventListener('input', handleInputInteraction);
        input.removeEventListener('change', handleInputInteraction);
      });
      clearTimeout(interactionTimer);
    };
  }, []);

  return null;
}
