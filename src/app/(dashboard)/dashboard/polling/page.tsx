"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PollingRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard?view=polling");
  }, [router]);

  return (
    <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "40px", height: "40px", border: "3px solid var(--glass-border)", borderTopColor: "var(--primary)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
