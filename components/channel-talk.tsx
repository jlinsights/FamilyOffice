'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    ChannelIO?: any;
    ChannelIOInitialized?: boolean;
  }
}

export function ChannelTalk() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // 클라이언트에서만 실행
    if (!isClient) return;
    
    // 채널톡 스크립트 로딩 및 초기화
    if (typeof window !== 'undefined' && !window.ChannelIO) {
      const script = `
        (function(){
          var w=window;
          if(w.ChannelIO){return w.console.error("ChannelIO script included twice.");}
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
            s.onload = function() {
              // 스크립트 로드 완료 후 채널톡 초기화
              if (w.ChannelIO) {
                w.ChannelIO('boot', {
                  pluginKey: '4c0cca0c-7cf1-4441-8f11-3e04995a4a78',
                  profile: {
                    name: '방문자',
                    userType: '방문자',
                    website: 'familyoffices.vip',
                    serviceType: 'Premium Family Office'
                  }
                });
                console.log('채널톡이 초기화되었습니다');
              }
            };
            var x=document.getElementsByTagName("script")[0];
            if(x.parentNode){x.parentNode.insertBefore(s,x);}
          }
          if(document.readyState==="complete"){l();}
          else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l);}
        })();
      `;
      
      // 스크립트 실행
      const scriptElement = document.createElement('script');
      scriptElement.innerHTML = script;
      document.head.appendChild(scriptElement);
    }
  }, [isClient]);

  // 채널톡은 자동으로 우하단에 플로팅 버튼을 생성하므로 별도 UI 반환하지 않음
  return null;
}