'use client'

import Script from "next/script";
import { useEffect } from "react";

export default function ExternalScripts() {
  const channelIOKey = process.env.NEXT_PUBLIC_CHANNEL_IO_KEY;
  
  useEffect(() => {
    // Channel Talk 초기화
    if (channelIOKey && typeof window !== 'undefined') {
      // ChannelIO 로더 스크립트
      if (!window.ChannelIO) {
        const script = document.createElement('script');
        script.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
        script.async = true;
        script.onload = () => {
          window.ChannelIO('boot', {
            pluginKey: channelIOKey
          });
        };
        document.head.appendChild(script);
      }
    }
  }, [channelIOKey]);
  
  return (
    <>
      {/* HubSpot Embed Code */}
      <Script
        id="hubspot-loader"
        src="//js.hs-scripts.com/43932435.js"
        async
        defer
        strategy="afterInteractive"
      />

      {/* Cal.com Floating Button */}
      <Script id="calcom-floating" strategy="afterInteractive">
        {`
          (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
          Cal("init", "coffeechat", {origin:"https://cal.com"});
          Cal.ns.coffeechat("floatingButton", {"calLink":"familyoffice","config":{"layout":"month_view"},"buttonPosition":"bottom-left"});
          Cal.ns.coffeechat("ui", {"styles":{"branding":{"brandColor":"#000000"}},"hideEventTypeDetails":false,"layout":"month_view"});
        `}
      </Script>

      {/* Google Tag Manager (noscript) */}
      <div dangerouslySetInnerHTML={{
        __html: `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MP3HPPMN" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
      }} />
    </>
  );
} 