'use client'

/* First make sure that you have installed the package */
/* If you are using yarn */
// yarn add @calcom/embed-react

/* If you are using npm */
// npm install @calcom/embed-react

import { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"

export function CalComFloating() {
  useEffect(() => {
    (async function () {
      try {
        console.log('🚀 Initializing Cal.com floating button...')
        const cal = await getCalApi({ "namespace": "familyoffice-chat" })
        
        cal("floatingButton", {
          "calLink": "familyoffice/consultation",
          "config": { "layout": "month_view" },
          "buttonPosition": "bottom-right",
          "buttonText": "상담 예약",
          "buttonColor": "#c9a961"
        })
        
        cal("ui", {
          "cssVarsPerTheme": {
            "light": { 
              "cal-brand": "#c9a961",
              "cal-text": "#1e3a5f"
            },
            "dark": { 
              "cal-brand": "#c9a961",
              "cal-text": "#ffffff"
            }
          },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        })
        
        console.log('✅ Cal.com floating button initialized successfully')
      } catch (error) {
        console.error('❌ Cal.com floating button initialization failed:', error)
      }
    })()
  }, [])

  return null
} 