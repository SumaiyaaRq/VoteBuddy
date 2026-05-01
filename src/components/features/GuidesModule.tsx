"use client";

import React, { useState } from "react";
import { FileText, CheckSquare, Info, ExternalLink, ChevronRight, CheckCircle, Clock, MapPin, UserCheck } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { StatusBadge } from "../ui/StatusBadge";
import { logger } from "@/services/logger";

export default function GuidesModule() {
  const [activeGuide, setActiveGuide] = useState<"registration" | "process" | "checklist">("registration");

  const [checklist, setChecklist] = useState({
    reg_form: false,
    id_proof: false,
    address_proof: false,
    know_polling: false,
    know_candidates: false,
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    const newState = !checklist[key];
    setChecklist(prev => ({ ...prev, [key]: newState }));
    logger.trackAction("Checklist Item Toggled", { item: key, state: newState });
  };

  return (
    <div className="glass card" style={{ padding: "2rem" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <FileText size={24} color="var(--primary)" />
        Voting Guides & Resources
      </h2>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", borderBottom: "1px solid var(--glass-border)", paddingBottom: "1rem", overflowX: "auto" }}>
        <button 
          onClick={() => setActiveGuide("registration")}
          style={{ 
            background: "none", border: "none", color: "inherit", 
            fontWeight: activeGuide === "registration" ? 600 : 400,
            opacity: activeGuide === "registration" ? 1 : 0.6,
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderBottom: activeGuide === "registration" ? "2px solid var(--primary)" : "2px solid transparent",
            marginBottom: "-1rem",
            whiteSpace: "nowrap"
          }}
        >
          Registration Guide
        </button>
        <button 
          onClick={() => setActiveGuide("process")}
          style={{ 
            background: "none", border: "none", color: "inherit", 
            fontWeight: activeGuide === "process" ? 600 : 400,
            opacity: activeGuide === "process" ? 1 : 0.6,
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderBottom: activeGuide === "process" ? "2px solid var(--primary)" : "2px solid transparent",
            marginBottom: "-1rem",
            whiteSpace: "nowrap"
          }}
        >
          Voting Process
        </button>
        <button 
          onClick={() => setActiveGuide("checklist")}
          style={{ 
            background: "none", border: "none", color: "inherit", 
            fontWeight: activeGuide === "checklist" ? 600 : 400,
            opacity: activeGuide === "checklist" ? 1 : 0.6,
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderBottom: activeGuide === "checklist" ? "2px solid var(--primary)" : "2px solid transparent",
            marginBottom: "-1rem",
            whiteSpace: "nowrap"
          }}
        >
          Preparation Checklist
        </button>
      </div>

      {activeGuide === "registration" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ padding: "1.5rem", background: "rgba(255, 255, 255, 0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Info size={20} color="var(--primary)" />
              How to Register
            </h3>
            <ol style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", opacity: 0.8, lineHeight: 1.6 }}>
              <li><strong>Check your eligibility:</strong> Ensure you meet the age and residency requirements for your jurisdiction.</li>
              <li><strong>Gather documents:</strong> You will need a valid ID (Driver's License, Passport, or State ID) and proof of residency (utility bill, bank statement).</li>
              <li><strong>Submit application:</strong> Register online, by mail, or in-person at your local election office.</li>
            </ol>

            <div style={{ marginTop: "2rem", padding: "1rem", background: "rgba(79, 70, 229, 0.1)", borderRadius: "var(--radius-md)", border: "1px solid rgba(79, 70, 229, 0.2)" }}>
              <h4 style={{ marginBottom: "0.5rem", fontWeight: 600 }}>Official Government Portals</h4>
              <p style={{ fontSize: "0.875rem", opacity: 0.8, marginBottom: "1rem" }}>Register securely through verified government websites.</p>
              <a href="https://vote.gov" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--primary)", color: "white", padding: "0.5rem 1rem", borderRadius: "var(--radius-full)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500 }}>
                Register on Vote.gov <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}

      {activeGuide === "process" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <GlassCard style={{ background: "rgba(79, 70, 229, 0.03)" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Clock size={20} color="var(--primary)" /> Before Voting Day
            </h3>
            <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", opacity: 0.8 }}>
              <li>Research the candidates and ballot measures in your local district.</li>
              <li>Locate your assigned polling booth and check its specific hours.</li>
              <li>Verify your registration status one last time (at least 30 days before).</li>
              <li>Decide if you will vote by mail or in person.</li>
            </ul>
          </GlassCard>

          <GlassCard style={{ background: "rgba(16, 185, 129, 0.03)" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <MapPin size={20} color="var(--success)" /> At the Polling Booth
            </h3>
            <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", opacity: 0.8 }}>
              <li>Bring your valid photo ID and proof of residency.</li>
              <li>If you're in line before the polls close, you are entitled to vote.</li>
              <li>Don't hesitate to ask election officials for help with machines.</li>
              <li>Review your ballot choices carefully before submitting.</li>
            </ul>
          </GlassCard>
          
          <GlassCard style={{ background: "rgba(59, 130, 246, 0.03)" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <UserCheck size={20} color="var(--info)" /> After Voting
            </h3>
            <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", opacity: 0.8 }}>
              <li>Wear your "I Voted" sticker with pride!</li>
              <li>Check official results through verified government portals.</li>
              <li>Results can take time to be certified—patience is key to democracy.</li>
            </ul>
          </GlassCard>
        </div>
      )}

      {activeGuide === "checklist" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p style={{ opacity: 0.8, marginBottom: "1rem" }}>Mark these items off to ensure you are fully prepared for election day.</p>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[
              { id: "reg_form", label: "Registered to vote successfully" },
              { id: "id_proof", label: "Have a valid photo ID ready" },
              { id: "address_proof", label: "Have proof of address (if required in your state)" },
              { id: "know_polling", label: "Know my polling booth location and timings" },
              { id: "know_candidates", label: "Reviewed candidates and ballot measures" },
            ].map(item => (
              <div 
                key={item.id} 
                onClick={() => toggleCheck(item.id as keyof typeof checklist)}
                style={{ 
                  display: "flex", alignItems: "center", gap: "1rem", 
                  padding: "1rem", 
                  background: checklist[item.id as keyof typeof checklist] ? "rgba(16, 185, 129, 0.05)" : "rgba(255, 255, 255, 0.03)", 
                  borderRadius: "var(--radius-md)", 
                  border: `1px solid ${checklist[item.id as keyof typeof checklist] ? "rgba(16, 185, 129, 0.3)" : "var(--glass-border)"}`,
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                <div style={{ 
                  width: "24px", height: "24px", 
                  borderRadius: "var(--radius-sm)", 
                  border: `2px solid ${checklist[item.id as keyof typeof checklist] ? "var(--success)" : "var(--glass-border)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: checklist[item.id as keyof typeof checklist] ? "var(--success)" : "transparent"
                }}>
                  {checklist[item.id as keyof typeof checklist] && <CheckSquare size={16} color="white" />}
                </div>
                <span style={{ 
                  textDecoration: checklist[item.id as keyof typeof checklist] ? "line-through" : "none",
                  opacity: checklist[item.id as keyof typeof checklist] ? 0.6 : 1
                }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2rem", padding: "1.5rem", background: "rgba(16, 185, 129, 0.1)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: "1rem" }}>
            <CheckCircle size={32} color="var(--success)" />
            <div>
              <h4 style={{ fontWeight: 600, color: "var(--success)", marginBottom: "0.25rem" }}>
                {Object.values(checklist).filter(Boolean).length} of 5 items completed
              </h4>
              <p style={{ fontSize: "0.875rem", opacity: 0.8 }}>
                {Object.values(checklist).filter(Boolean).length === 5 
                  ? "You are completely ready to vote!" 
                  : "Keep going! Make sure you check off all items before voting day."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
