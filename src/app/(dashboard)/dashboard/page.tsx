"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { LogOut, Calendar, CheckCircle, MapPin, User as UserIcon, X, Languages } from "lucide-react";
import Assistant from "@/components/features/Assistant";
import EligibilityChecker from "@/components/features/EligibilityChecker";
import PollingLocator from "@/components/features/PollingLocator";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const { t, locale, setLocale } = useLanguage();
  const [view, setView] = useState<"dashboard" | "eligibility" | "polling">("dashboard");
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "40px", height: "40px", border: "3px solid var(--glass-border)", borderTopColor: "var(--primary)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside className="glass" style={{ width: "260px", padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem", borderLeft: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ background: "var(--primary)", padding: "0.5rem", borderRadius: "var(--radius-sm)" }}>🗳️</div>
          <h2 style={{ fontSize: "1.25rem" }}>VoteBuddy</h2>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <button 
            onClick={() => setView("dashboard")}
            style={{ 
              background: view === "dashboard" ? "rgba(79, 70, 229, 0.1)" : "none", 
              color: view === "dashboard" ? "var(--primary)" : "inherit", 
              padding: "0.75rem", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: "0.75rem", border: "none", cursor: "pointer", width: "100%", fontWeight: view === "dashboard" ? 600 : 400 
            }}
          >
            <Calendar size={18} /> {t("dashboard")}
          </button>
          <button 
            onClick={() => setView("eligibility")}
            style={{ 
              background: view === "eligibility" ? "rgba(79, 70, 229, 0.1)" : "none", 
              color: view === "eligibility" ? "var(--primary)" : "inherit", 
              padding: "0.75rem", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: "0.75rem", border: "none", cursor: "pointer", width: "100%", fontWeight: view === "eligibility" ? 600 : 400 
            }}
          >
            <CheckCircle size={18} /> {t("eligibility")}
          </button>
          <button 
            onClick={() => setView("polling")}
            style={{ 
              background: view === "polling" ? "rgba(79, 70, 229, 0.1)" : "none", 
              color: view === "polling" ? "var(--primary)" : "inherit", 
              padding: "0.75rem", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: "0.75rem", border: "none", cursor: "pointer", width: "100%", fontWeight: view === "polling" ? 600 : 400 
            }}
          >
            <MapPin size={18} /> {t("polling_booths")}
          </button>
        </nav>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0 0.75rem" }}>
            <Languages size={16} style={{ opacity: 0.5 }} />
            <select 
              value={locale} 
              onChange={(e) => setLocale(e.target.value as any)}
              style={{ background: "none", border: "none", color: "inherit", fontSize: "0.875rem", outline: "none", cursor: "pointer" }}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
          
          <button 
            onClick={logout}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "none", border: "none", color: "var(--error)", cursor: "pointer", fontWeight: 500, padding: "0.75rem" }}
          >
            <LogOut size={18} /> {t("sign_out")}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2.5rem", overflowY: "auto" }}>
        <header style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{t("welcome")}, {user.displayName || "Voter"}!</h1>
            <p style={{ opacity: 0.7 }}>Your central hub for election guidance.</p>
          </div>
        </header>

        {view === "eligibility" && (
          <div style={{ padding: "1rem 0" }}>
            <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>{t("check_eligibility")}</h2>
            <EligibilityChecker />
          </div>
        )}

        {view === "polling" && (
          <div style={{ padding: "1rem 0" }}>
            <h2 style={{ marginBottom: "2rem" }}>{t("polling_booths")}</h2>
            <PollingLocator />
          </div>
        )}

        {view === "dashboard" && (
          <>
            {/* Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
              <div className="glass card">
                <h3 style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Calendar size={20} color="var(--primary)" /> Upcoming Elections
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ padding: "1rem", background: "rgba(255, 255, 255, 0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)" }}>
                    <h4 style={{ marginBottom: "0.25rem" }}>General Municipal Election</h4>
                    <p style={{ fontSize: "0.875rem", opacity: 0.6 }}>November 4, 2026 • Local</p>
                    <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.75rem", background: "rgba(16, 185, 129, 0.1)", color: "var(--success)", padding: "0.25rem 0.5rem", borderRadius: "var(--radius-full)" }}>
                        Open for Registration
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass card">
                <h3 style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle size={20} color="var(--success)" /> Your Status
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ opacity: 0.7 }}>Registration Status</span>
                    <span style={{ color: "var(--success)", fontWeight: 600 }}>Active</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ opacity: 0.7 }}>Eligibility</span>
                    <span style={{ color: "var(--success)", fontWeight: 600 }}>Verified</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ opacity: 0.7 }}>Last Voted</span>
                    <span style={{ opacity: 0.7 }}>May 2024</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="glass card">
              <h3 style={{ marginBottom: "1.5rem" }}>Election Timeline</h3>
              <div style={{ display: "flex", justifyContent: "space-between", position: "relative", padding: "0 1rem" }}>
                <div style={{ position: "absolute", top: "12px", left: "2rem", right: "2rem", height: "2px", background: "var(--glass-border)", zIndex: 0 }} />
                
                {[
                  { label: "Registration", status: "completed", date: "Sept 15" },
                  { label: "Verification", status: "completed", date: "Oct 01" },
                  { label: "Voting Day", status: "active", date: "Nov 04" },
                  { label: "Results", status: "pending", date: "Nov 10" }
                ].map((step, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", position: "relative", zIndex: 1 }}>
                    <div style={{ 
                      width: "24px", 
                      height: "24px", 
                      borderRadius: "50%", 
                      background: step.status === "completed" ? "var(--success)" : step.status === "active" ? "var(--primary)" : "var(--background)",
                      border: `2px solid ${step.status === "pending" ? "var(--glass-border)" : "transparent"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "0.75rem"
                    }}>
                      {step.status === "completed" && "✓"}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "0.875rem", fontWeight: 600 }}>{step.label}</p>
                      <p style={{ fontSize: "0.75rem", opacity: 0.5 }}>{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Floating Assistant */}
      <Assistant />
    </div>
  );
}
