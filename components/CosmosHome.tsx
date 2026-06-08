"use client";

import dynamic from "next/dynamic";

/* The cosmos is a canvas + drag interactive scene with no SSR value, and its
   lazy lucide icons cause hydration mismatches. Render it client-only with a
   lightweight wordmark fallback for first paint. */
const CosmosScreen = dynamic(() => import("@/components/CosmosScreen").then((m) => m.CosmosScreen), {
  ssr: false,
  loading: () => (
    <div className="fz-lab">
      <div className="fz-center-id">
        <div className="fz-center-wm">FENGZIAAA</div>
      </div>
    </div>
  ),
});

export default function CosmosHome() {
  return <CosmosScreen />;
}
