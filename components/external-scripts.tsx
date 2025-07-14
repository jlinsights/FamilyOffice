'use client'

import Script from "next/script";

export default function ExternalScripts() {
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

      {/* Channel Talk */}
      <Script id="channel-talk" strategy="afterInteractive">
        {`
          (function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.");}var ch=function(){ch.c(arguments);};ch.q=[];ch.c=function(args){ch.q.push(args);};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return;}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x);}}if(document.readyState==="complete"){l();}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l);}})();
          ChannelIO('boot', {"pluginKey": "${process.env.NEXT_PUBLIC_CHANNEL_IO_KEY}"}); // 환경변수 사용
        `}
      </Script>

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