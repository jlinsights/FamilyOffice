'use client'
import { useEffect } from "react";

declare global {
  interface Window {
    ChannelIO?: any;
    ChannelIOInitialized?: boolean;
  }
}

export default function ExternalScripts() {
  useEffect(() => {
    // Channel Talk boot
    if (typeof window !== "undefined" && window.ChannelIO) {
      window.ChannelIO('boot', { pluginKey: "4c0cca0c-7cf1-4441-8f11-3e04995a4a78" });
    }
    // Cal.com floating button
    if (typeof window !== "undefined" && window.Cal && window.Cal.ns?.coffeechat) {
      window.Cal.ns.coffeechat("floatingButton", {
        calLink: "familyoffice",
        config: { layout: "month_view" },
        buttonPosition: "bottom-left"
      });
      window.Cal.ns.coffeechat("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    }
  }, []);

  return (
    <>
      {/* ...기존 Script 코드 동일 */}
    </>
  );
}
