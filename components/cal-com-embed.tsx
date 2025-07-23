'use client'

import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"

interface CalComEmbedProps {
  className?: string
  style?: React.CSSProperties
}

export default function CalComEmbed({ className, style }: CalComEmbedProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "consulting" })
      cal("ui", {
        "cssVarsPerTheme": {
          "light": { "cal-brand": "#000000" },
          "dark": { "cal-brand": "#ffffff" }
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      })
    })()
  }, [])

  return (
    <Cal
      namespace="consulting"
      calLink="familyoffice/consulting"
      style={{
        width: "100%",
        height: "100%",
        overflow: "scroll",
        ...style
      }}
      config={{ "layout": "month_view" }}
      className={className}
    />
  )
} 