"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

const Cal = dynamic(() => import("@calcom/embed-react").then(mod => mod.default), {
  ssr: false,
});

export default function SeminarRegistrationSection() {
  useEffect(() => {
    import("@calcom/embed-react").then(({ getCalApi }) => {
      getCalApi({ namespace: "consulting" }).then(cal => {
        cal("ui", {
          cssVarsPerTheme: {
            light: { "cal-brand": "#000000" },
            dark: { "cal-brand": "#ffffff" },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      });
    });
  }, []);

  return (
    <div style={{ width: "100%", height: "600px", overflow: "scroll" }}>
      <Cal
        namespace="consulting"
        calLink="familyoffice/consulting"
        style={{ width: "100%", height: "100%" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}