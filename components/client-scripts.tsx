"use client"

import { useEffect } from 'react'

// 전역 타입 확장
declare global {
  interface Window {
    hbspt?: any
    dataLayer?: any[]
  }
}

export function ClientScripts() {
  useEffect(() => {
    // HubSpot 스크립트 로드
    const loadHubSpotScript = () => {
      if (typeof window !== 'undefined' && !window.hbspt) {
        const script = document.createElement('script')
        script.id = 'hs-script-loader'
        script.src = '//js.hs-scripts.com/43932435.js'
        script.async = true
        document.head.appendChild(script)
      }
    }

    // Google Tag Manager 스크립트 로드
    const loadGTMScript = () => {
      if (typeof window !== 'undefined' && !window.dataLayer) {
        const script = document.createElement('script')
        script.innerHTML = `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MP3HPPMN');
        `
        document.head.appendChild(script)
      }
    }

    // 스크립트 로드
    loadHubSpotScript()
    loadGTMScript()
  }, [])

  return (
    <>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-MP3HPPMN"
          height="0" 
          width="0" 
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
} 