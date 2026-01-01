'use client';

import Script from 'next/script';

import {
    isAllowedScriptSource,
    isSafeHTMLContent,
} from '@/lib/security/html-sanitizer';
import { securityLogger } from '@/lib/security/secure-logger';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MP3HPPMN';

export default function ExternalScripts() {
  // Validate HubSpot script source
  const hubspotSrc = '//js.hs-scripts.com/43932435.js';

  if (!isAllowedScriptSource(hubspotSrc)) {
    securityLogger.security('Blocked HubSpot script from unauthorized source', {
      source: hubspotSrc,
    });
    return null;
  }

  // Create secure GTM noscript fallback
  const gtmNoscript = `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`;

  // Validate the noscript content is safe
  if (!isSafeHTMLContent(gtmNoscript)) {
    securityLogger.security('GTM noscript content failed security validation');
    return null;
  }

  return (
    <>
      {/* HubSpot Embed Code */}
      <Script
        id="hubspot-loader"
        src="//js.hs-scripts.com/43932435.js"
        async
        defer
        strategy="lazyOnload"
      />

      {/* Cal.com Floating Button - 주석 처리됨 (AI 챗봇에서 상담 예약 버튼으로 대체) */}
      {/*
      <Script id="calcom-floating" strategy="afterInteractive">
        {`
          (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
          Cal("init", "coffeechat", {origin:"https://cal.com"});
          Cal.ns.coffeechat("floatingButton", {"calLink":"familyoffice","config":{"layout":"month_view"},"buttonPosition":"bottom-left"});
          Cal.ns.coffeechat("ui", {"styles":{"branding":{"brandColor":"#000000"}},"hideEventTypeDetails":false,"layout":"month_view"});
        `}
      </Script>
      */}

      {/* Google Tag Manager (noscript) */}
      <div
        dangerouslySetInnerHTML={{
          __html: gtmNoscript,
        }}
      />
    </>
  );
}
