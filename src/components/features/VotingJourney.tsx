"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CheckCircle, Circle, ChevronRight, ChevronLeft, ShieldCheck, User, CreditCard, MapPin, FileText, ExternalLink, Info } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { ActionButton } from "../ui/ActionButton";
import { StatusBadge } from "../ui/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/services/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { logger } from "@/services/logger";
import { UserProfile } from "@/types";

interface Step {
  id: number;
  title: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  { id: 1, title: "Eligibility", icon: <User size={20} /> },
  { id: 2, title: "Registration", icon: <ShieldCheck size={20} /> },
  { id: 3, title: "Documents", icon: <CreditCard size={20} /> },
  { id: 4, title: "Polling", icon: <MapPin size={20} /> },
  { id: 5, title: "Final Ready", icon: <CheckCircle size={20} /> },
];

export default function VotingJourney() {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Checklist state for documents (not persisted for simplicity in mock)
  const [docsChecklist, setDocsChecklist] = useState({
    id: false,
    residency: false,
    registration: false
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        }
      } catch (err) {
        logger.error("Error fetching profile for Journey", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const progress = useMemo(() => (currentStep / steps.length) * 100, [currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      logger.trackAction("Journey Step Advanced", { from: currentStep, to: nextStep });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
        <div style={{ width: "40px", height: "40px", border: "3px solid var(--glass-border)", borderTopColor: "var(--primary)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
      {/* Progress Header */}
      <div style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.5rem" }}>Your Voting Journey</h2>
          <span style={{ opacity: 0.7, fontWeight: 500 }}>Step {currentStep} of 5</span>
        </div>
        <div style={{ height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "var(--primary)", transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
          {steps.map((step) => (
            <div key={step.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", opacity: currentStep >= step.id ? 1 : 0.4 }}>
              <div style={{ 
                width: "36px", height: "36px", borderRadius: "50%", 
                background: currentStep > step.id ? "var(--success)" : currentStep === step.id ? "var(--primary)" : "rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center", color: "white"
              }}>
                {currentStep > step.id ? <CheckCircle size={18} /> : step.icon}
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, display: "none" }}>{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <GlassCard style={{ padding: "2.5rem", minHeight: "400px", display: "flex", flexDirection: "column" }}>
        {currentStep === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ padding: "1rem", background: "rgba(79, 70, 229, 0.1)", borderRadius: "var(--radius-lg)" }}>
                <User size={32} color="var(--primary)" />
              </div>
              <div>
                <h3 style={{ fontSize: "1.25rem" }}>Step 1: Check Eligibility</h3>
                <p style={{ opacity: 0.7 }}>Let's confirm you can participate in upcoming elections.</p>
              </div>
            </div>

            <div style={{ padding: "1.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)" }}>
              <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <li style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Are you 18 or older?</span>
                  {profile?.age && parseInt(profile.age) >= 18 ? <StatusBadge label="Confirmed" variant="success" /> : <StatusBadge label="Pending" variant="warning" />}
                </li>
                <li style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Are you a citizen?</span>
                  <StatusBadge label="Required" variant="info" />
                </li>
                <li style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Residency in {profile?.state || "your state"}?</span>
                  {profile?.state ? <StatusBadge label={profile.state} variant="success" /> : <StatusBadge label="Not Set" variant="error" />}
                </li>
              </ul>
            </div>

            {!profile?.age && (
              <div style={{ padding: "1rem", background: "rgba(245, 158, 11, 0.1)", borderRadius: "var(--radius-md)", display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <Info size={18} color="var(--warning)" />
                <p style={{ fontSize: "0.875rem" }}>Your profile is incomplete. We recommend updating your age and location for better accuracy.</p>
              </div>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ padding: "1rem", background: "rgba(16, 185, 129, 0.1)", borderRadius: "var(--radius-lg)" }}>
                <ShieldCheck size={32} color="var(--success)" />
              </div>
              <div>
                <h3 style={{ fontSize: "1.25rem" }}>Step 2: Voter Registration</h3>
                <p style={{ opacity: 0.7 }}>Your current status: <strong style={{ color: profile?.registrationStatus === "active" ? "var(--success)" : "var(--warning)" }}>{profile?.registrationStatus?.replace("_", " ") || "unknown"}</strong></p>
              </div>
            </div>

            {profile?.registrationStatus !== "active" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <p>Registration is the most critical step. Most states require you to register at least 15-30 days before election day.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <ActionButton onClick={() => window.open("https://vote.gov", "_blank")} variant="primary" fullWidth>
                    Register Online (Vote.gov) <ExternalLink size={16} />
                  </ActionButton>
                  <p style={{ fontSize: "0.875rem", textAlign: "center", opacity: 0.6 }}>Or check your state's specific portal for {profile?.state || "your location"}.</p>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <div style={{ width: "60px", height: "60px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                  <CheckCircle size={32} color="var(--success)" />
                </div>
                <h4>You are all set!</h4>
                <p style={{ opacity: 0.7 }}>Your registration is active. You can proceed to prepare your documents.</p>
              </div>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
             <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ padding: "1rem", background: "rgba(79, 70, 229, 0.1)", borderRadius: "var(--radius-lg)" }}>
                <CreditCard size={32} color="var(--primary)" />
              </div>
              <div>
                <h3 style={{ fontSize: "1.25rem" }}>Step 3: Document Preparation</h3>
                <p style={{ opacity: 0.7 }}>Ensure you have the right ID for your polling booth.</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { id: "id", label: "Valid Photo ID (Driver's License, Passport)" },
                { id: "residency", label: "Proof of Residency (Utility bill or Bank statement)" },
                { id: "registration", label: "Voter Registration Card (Optional but helpful)" },
              ].map(item => (
                <div 
                  key={item.id}
                  onClick={() => setDocsChecklist(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof docsChecklist] }))}
                  style={{ 
                    padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", 
                    border: "1px solid var(--glass-border)", display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" 
                  }}
                >
                  {docsChecklist[item.id as keyof typeof docsChecklist] ? <CheckCircle size={20} color="var(--success)" /> : <Circle size={20} opacity={0.3} />}
                  <span style={{ opacity: docsChecklist[item.id as keyof typeof docsChecklist] ? 0.6 : 1 }}>{item.label}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: "1rem", background: "rgba(59, 130, 246, 0.05)", borderRadius: "var(--radius-md)", fontSize: "0.875rem", border: "1px solid rgba(59, 130, 246, 0.2)" }}>
              <strong>Note:</strong> ID requirements vary by state. In {profile?.state || "some states"}, a non-photo ID may be accepted.
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ padding: "1rem", background: "rgba(79, 70, 229, 0.1)", borderRadius: "var(--radius-lg)" }}>
                <MapPin size={32} color="var(--primary)" />
              </div>
              <div>
                <h3 style={{ fontSize: "1.25rem" }}>Step 4: Locate Polling Booth</h3>
                <p style={{ opacity: 0.7 }}>Find out where to cast your vote on election day.</p>
              </div>
            </div>

            <p>Based on your city: <strong>{profile?.city || "Not provided"}</strong></p>
            
            <div style={{ padding: "2rem", background: "rgba(0,0,0,0.2)", borderRadius: "var(--radius-md)", textAlign: "center", border: "1px dashed var(--glass-border)" }}>
              <p style={{ opacity: 0.6, marginBottom: "1rem" }}>Interactive Polling Locator can be accessed from the sidebar for full details.</p>
              <ActionButton onClick={() => {}} variant="secondary">Check Nearby Booths</ActionButton>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", textAlign: "center" }}>
            <div style={{ width: "80px", height: "80px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
              <CheckCircle size={48} color="var(--success)" />
            </div>
            <h3 style={{ fontSize: "1.75rem" }}>You're Ready to Vote!</h3>
            <p style={{ opacity: 0.8, maxWidth: "500px", margin: "0 auto" }}>
              Congratulations, {profile?.fullName || user?.displayName}! You've completed your voting journey preparation. 
              Keep your documents ready and mark November 4 on your calendar.
            </p>

            <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <GlassCard style={{ textAlign: "left", padding: "1.25rem" }}>
                <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><FileText size={16} /> Summary</h4>
                <ul style={{ fontSize: "0.75rem", opacity: 0.7, paddingLeft: "1rem" }}>
                  <li>Eligible: Yes</li>
                  <li>Registered: {profile?.registrationStatus === "active" ? "Yes" : "Check portal"}</li>
                  <li>ID Prepared: {Object.values(docsChecklist).every(Boolean) ? "Yes" : "Partial"}</li>
                </ul>
              </GlassCard>
              <GlassCard style={{ textAlign: "left", padding: "1.25rem" }}>
                <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><MapPin size={16} /> Location</h4>
                <p style={{ fontSize: "0.75rem", opacity: 0.7 }}>{profile?.city}, {profile?.state}</p>
                <p style={{ fontSize: "0.75rem", opacity: 0.7 }}>Check Booths for hours.</p>
              </GlassCard>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div style={{ marginTop: "auto", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button 
            onClick={handleBack} 
            disabled={currentStep === 1}
            style={{ 
              background: "none", border: "none", color: "inherit", cursor: currentStep === 1 ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", gap: "0.5rem", opacity: currentStep === 1 ? 0.3 : 0.7, fontWeight: 600
            }}
          >
            <ChevronLeft size={20} /> Back
          </button>
          
          {currentStep < 5 ? (
            <ActionButton onClick={handleNext} variant="primary" className="btn-primary" style={{ padding: "0.75rem 2rem" }}>
              Next Step <ChevronRight size={20} />
            </ActionButton>
          ) : (
            <ActionButton onClick={() => window.location.reload()} variant="success" style={{ padding: "0.75rem 2rem" }}>
              Finish Journey
            </ActionButton>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
