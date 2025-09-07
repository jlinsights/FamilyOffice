'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

declare global {
  interface Window {
    ChannelIO?: any;
    ChannelIOInitialized?: boolean;
  }
}

export function ChannelTalk() {
  const [isClient, setIsClient] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { theme, systemTheme } = useTheme();
  const maxRetries = 3;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // 클라이언트에서만 실행
    if (!isClient) return;
    
    // 모바일 디바이스 감지
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    // 현재 테마 결정
    const currentTheme = theme === 'system' ? systemTheme : theme;
    
    // 채널톡 스크립트 로딩 및 초기화
    const initChannelIO = () => {
      if (typeof window !== 'undefined' && !window.ChannelIO) {
        // 모바일 최적화를 위한 CSS 추가
        const mobileOptimizedCSS = `
          <style id="channeltalk-mobile-fix">
            /* 채널톡 모바일 최적화 CSS */
            #ch-plugin {
              z-index: 2147483647 !important;
            }
            
            /* 모바일에서 채널톡 iframe 최적화 */
            #ch-plugin iframe {
              background-color: ${currentTheme === 'dark' ? '#1a1a1a' : '#ffffff'} !important;
              color: ${currentTheme === 'dark' ? '#ffffff' : '#000000'} !important;
            }
            
            /* iOS Safari 호환성 개선 */
            ${isIOS ? `
              #ch-plugin {
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
              }
            ` : ''}
            
            /* 모바일 터치 영역 개선 */
            @media (max-width: 768px) {
              #ch-plugin-launcher {
                bottom: 20px !important;
                right: 20px !important;
                width: 60px !important;
                height: 60px !important;
              }
              
              #ch-plugin-launcher-backdrop {
                background-color: ${currentTheme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.95)'} !important;
              }
            }
            
            /* 다크모드 지원 */
            ${currentTheme === 'dark' ? `
              #ch-plugin .ch-plugin-core {
                background-color: #1a1a1a !important;
                color: #ffffff !important;
              }
              
              #ch-plugin .ch-plugin-core * {
                color: #ffffff !important;
              }
            ` : ''}
            
            /* 검은색 화면 방지 */
            #ch-plugin-script-container,
            #ch-plugin-script-container * {
              background: transparent !important;
            }
          </style>
        `;
        
        // CSS를 head에 추가
        if (!document.getElementById('channeltalk-mobile-fix')) {
          document.head.insertAdjacentHTML('beforeend', mobileOptimizedCSS);
        }

        const script = `
          (function(){
            var w=window;
            if(w.ChannelIO){return;}
            var ch=function(){ch.c(arguments);};
            ch.q=[];
            ch.c=function(args){ch.q.push(args);};
            w.ChannelIO=ch;
            function l(){
              if(w.ChannelIOInitialized){return;}
              w.ChannelIOInitialized=true;
              var s=document.createElement("script");
              s.type="text/javascript";
              s.async=true;
              s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";
              s.onerror = function() {
                console.warn('채널톡 스크립트 로딩 실패, 재시도합니다...');
                if (${retryCount} < ${maxRetries}) {
                  setTimeout(l, 2000);
                }
              };
              s.onload = function() {
                // 스크립트 로드 완료 후 채널톡 초기화
                if (w.ChannelIO) {
                  try {
                    w.ChannelIO('boot', {
                      pluginKey: '4c0cca0c-7cf1-4441-8f11-3e04995a4a78',
                      memberId: null,
                      profile: {
                        name: '방문자',
                        userType: '방문자',
                        website: 'familyoffices.vip',
                        serviceType: 'Premium Family Office',
                        device: '${isMobile ? 'mobile' : 'desktop'}',
                        theme: '${currentTheme || 'light'}'
                      },
                      // 모바일 최적화 설정
                      mobileMessengerMode: ${isMobile ? 'overlay' : 'embed'},
                      hideDefaultLauncher: false,
                      // 다크모드 지원
                      appearance: '${currentTheme === 'dark' ? 'dark' : 'light'}',
                      // 모바일에서 성능 최적화
                      lazy: ${isMobile ? 'true' : 'false'}
                    });
                    
                    // 초기화 완료 후 추가 모바일 최적화
                    if (${isMobile}) {
                      w.ChannelIO('onShowMessenger', function() {
                        // 모바일에서 메신저 표시 시 body 스크롤 방지
                        document.body.style.overflow = 'hidden';
                      });
                      
                      w.ChannelIO('onHideMessenger', function() {
                        // 모바일에서 메신저 숨김 시 body 스크롤 복원
                        document.body.style.overflow = '';
                      });
                    }
                    
                    console.log('채널톡이 성공적으로 초기화되었습니다 (모바일: ${isMobile}, 테마: ${currentTheme})');
                  } catch (error) {
                    console.error('채널톡 초기화 오류:', error);
                    if (${retryCount} < ${maxRetries}) {
                      setTimeout(function() {
                        window.location.reload();
                      }, 3000);
                    }
                  }
                } else {
                  console.error('ChannelIO 객체를 찾을 수 없습니다');
                }
              };
              var x=document.getElementsByTagName("script")[0];
              if(x && x.parentNode){x.parentNode.insertBefore(s,x);}
            }
            
            // 로딩 지연을 통한 안정성 개선
            if(document.readyState==="complete"){
              setTimeout(l, 500);
            } else {
              w.addEventListener("DOMContentLoaded", function() {
                setTimeout(l, 500);
              });
              w.addEventListener("load", function() {
                setTimeout(l, 1000);
              });
            }
          })();
        `;
        
        // 스크립트 실행
        const scriptElement = document.createElement('script');
        scriptElement.innerHTML = script;
        scriptElement.onerror = () => {
          console.warn('채널톡 인라인 스크립트 실행 실패');
          if (retryCount < maxRetries) {
            setRetryCount(prev => prev + 1);
          }
        };
        document.head.appendChild(scriptElement);
      }
    };

    // 초기화 실행 (약간의 지연을 통한 안정성 확보)
    const initTimer = setTimeout(initChannelIO, 1000);
    
    return () => {
      clearTimeout(initTimer);
    };
  }, [isClient, theme, systemTheme, retryCount]);

  // 테마 변경 시 채널톡 스타일 업데이트
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ChannelIO && isClient) {
      const currentTheme = theme === 'system' ? systemTheme : theme;
      
      // 기존 스타일 제거하고 새로운 스타일 적용
      const existingStyle = document.getElementById('channeltalk-mobile-fix');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      // 새로운 테마로 스타일 재적용
      setTimeout(() => {
        const event = new CustomEvent('channeltalk-theme-change', { 
          detail: { theme: currentTheme } 
        });
        window.dispatchEvent(event);
      }, 500);
    }
  }, [theme, systemTheme, isClient]);

  // 개발 환경에서 디버깅 정보 표시
  if (process.env.NODE_ENV === 'development' && isClient) {
    return (
      <div className="fixed bottom-4 left-4 z-50 bg-background/80 backdrop-blur-sm p-2 rounded text-xs text-muted-foreground border max-w-xs">
        <div>채널톡 상태: {typeof window !== 'undefined' && window.ChannelIO ? '✅ 로드됨' : '❌ 로딩중'}</div>
        <div>재시도: {retryCount}/{maxRetries}</div>
        <div>테마: {theme === 'system' ? `시스템(${systemTheme})` : theme}</div>
      </div>
    );
  }

  return null;
}