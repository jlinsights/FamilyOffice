'use client';

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [envVars, setEnvVars] = useState<Record<string, string>>({});
  const [kakaoStatus, setKakaoStatus] = useState<string>('확인 중...');
  const [floatingButtonStatus, setFloatingButtonStatus] = useState<string>('확인 중...');

  useEffect(() => {
    // 환경 변수 확인
    const vars = {
      'NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY': process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY || 'NOT SET',
      'NEXT_PUBLIC_KAKAO_PIXEL_ID': process.env.NEXT_PUBLIC_KAKAO_PIXEL_ID || 'NOT SET',
      'NEXT_PUBLIC_KAKAO_CHANNEL_ID': process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID || 'NOT SET',
      'NODE_ENV': process.env.NODE_ENV || 'NOT SET',
    };
    setEnvVars(vars);

    // 카카오 SDK 상태 확인
    const checkKakao = () => {
      if (typeof window !== 'undefined') {
        if (window.Kakao) {
          if (window.Kakao.isInitialized()) {
            setKakaoStatus('✅ 초기화됨');
          } else {
            setKakaoStatus('⚠️ 로드됨 but 초기화 안됨');
          }
        } else {
          setKakaoStatus('❌ 로드 안됨');
        }
      }
    };

    // Floating Button 상태 확인
    const checkFloatingButton = () => {
      if (typeof window !== 'undefined') {
        const floatingButtons = document.querySelector('.floating-buttons-mobile');
        if (floatingButtons) {
          const buttons = floatingButtons.querySelectorAll('button');
          if (buttons.length > 0) {
            setFloatingButtonStatus(`✅ 발견됨 (${buttons.length}개 버튼)`);
          } else {
            setFloatingButtonStatus('⚠️ 컨테이너는 있지만 버튼이 없음');
          }
        } else {
          setFloatingButtonStatus('❌ 발견되지 않음');
        }
      }
    };

    // 즉시 확인
    checkKakao();
    checkFloatingButton();

    // 3초 후 다시 확인 (SDK 로딩 시간 고려)
    setTimeout(() => {
      checkKakao();
      checkFloatingButton();
    }, 3000);

    // 5초 후 한 번 더 확인
    setTimeout(() => {
      checkFloatingButton();
    }, 5000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔍 FamilyOffice 디버그 페이지</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 환경 변수 섹션 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">🌍 환경 변수</h2>
            <div className="space-y-3">
              {Object.entries(envVars).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-mono text-sm">{key}</span>
                  <span className={`font-mono text-sm ${
                    value === 'NOT SET' ? 'text-red-500' : 'text-green-600'
                  }`}>
                    {value === 'NOT SET' ? 'NOT SET' : `${value.substring(0, 10)}...`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 카카오 SDK 상태 섹션 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">💬 카카오 SDK 상태</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded">
                <span className="font-medium">SDK 상태:</span>
                <span className="ml-2">{kakaoStatus}</span>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <span className="font-medium">Window.Kakao:</span>
                <span className="ml-2">
                  {typeof window !== 'undefined' && window.Kakao ? '✅ 존재' : '❌ 없음'}
                </span>
              </div>

              <div className="p-3 bg-gray-50 rounded">
                <span className="font-medium">초기화 여부:</span>
                <span className="ml-2">
                  {typeof window !== 'undefined' && window.Kakao && window.Kakao.isInitialized ? '✅ 초기화됨' : '❌ 초기화 안됨'}
                </span>
              </div>
            </div>
          </div>

          {/* Floating Button 상태 섹션 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">🔘 Floating Button 상태</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded">
                <span className="font-medium">상태:</span>
                <span className="ml-2">{floatingButtonStatus}</span>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <span className="font-medium">컨테이너:</span>
                <span className="ml-2">
                  {typeof window !== 'undefined' && document.querySelector('.floating-buttons-mobile') ? '✅ 발견됨' : '❌ 없음'}
                </span>
              </div>

              <div className="p-3 bg-gray-50 rounded">
                <span className="font-medium">버튼 개수:</span>
                <span className="ml-2">
                  {typeof window !== 'undefined' && document.querySelector('.floating-buttons-mobile') 
                    ? document.querySelectorAll('.floating-buttons-mobile button').length + '개' 
                    : 'N/A'}
                </span>
              </div>

              <div className="p-3 bg-gray-50 rounded">
                <span className="font-medium">CSS 클래스:</span>
                <span className="ml-2">
                  {typeof window !== 'undefined' && document.querySelector('.floating-buttons-mobile') 
                    ? '✅ floating-buttons-mobile' 
                    : '❌ 클래스 없음'}
                </span>
              </div>
            </div>
          </div>

          {/* 브라우저 정보 섹션 */}
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">🌐 브라우저 정보</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <span className="font-medium text-sm">User Agent:</span>
                <p className="text-xs mt-1 text-gray-600">
                  {typeof window !== 'undefined' ? navigator.userAgent.substring(0, 50) + '...' : 'N/A'}
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <span className="font-medium text-sm">URL:</span>
                <p className="text-xs mt-1 text-gray-600">
                  {typeof window !== 'undefined' ? window.location.href : 'N/A'}
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded">
                <span className="font-medium text-sm">Referrer:</span>
                <p className="text-xs mt-1 text-gray-600">
                  {typeof window !== 'undefined' ? (document.referrer || '직접 접근') : 'N/A'}
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded">
                <span className="font-medium text-sm">Viewport:</span>
                <p className="text-xs mt-1 text-gray-600">
                  {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">📝 디버그 가이드</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 환경 변수가 &apos;NOT SET&apos;으로 표시되면 .env.local 파일을 확인하세요</li>
            <li>• 카카오 SDK가 초기화되지 않으면 JavaScript Key가 올바른지 확인하세요</li>
            <li>• Floating Button이 발견되지 않으면 컴포넌트가 제대로 렌더링되었는지 확인하세요</li>
            <li>• 개발자 도구 콘솔에서 추가 에러 메시지를 확인하세요</li>
            <li>• 이 페이지는 개발 중에만 사용하고, 프로덕션에서는 제거하세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
