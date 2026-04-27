"use client";

import React, { useState } from "react";
import { CheckCircle, AlertCircle, ChevronRight, ChevronLeft } from "lucide-react";

type Step = 1 | 2 | 3 | 4;

export default function EligibilityChecker() {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState({
    age: "",
    citizenship: "",
    residency: "",
    registered: ""
  });
  const [result, setResult] = useState<"eligible" | "not-eligible" | "action-required" | null>(null);

  const handleNext = () => {
    if (step < 4) setStep((s) => (s + 1) as Step);
    else checkEligibility();
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

  const checkEligibility = () => {
    const isAdult = parseInt(data.age) >= 18;
    const isCitizen = data.citizenship === "yes";
    
    if (isAdult && isCitizen) {
      if (data.registered === "yes") {
        setResult("eligible");
      } else {
        setResult("action-required");
      }
    } else {
      setResult("not-eligible");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.25rem" }}>Step 1: Basic Information</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label>How old are you?</label>
              <input 
                type="number" 
                value={data.age}
                onChange={(e) => setData({ ...data, age: e.target.value })}
                placeholder="Enter your age"
                style={{ padding: "0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)", background: "rgba(255, 255, 255, 0.03)", color: "inherit" }}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.25rem" }}>Step 2: Citizenship</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <label>Are you a citizen?</label>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button 
                  onClick={() => setData({ ...data, citizenship: "yes" })}
                  className="btn" 
                  style={{ flex: 1, background: data.citizenship === "yes" ? "var(--primary)" : "rgba(255, 255, 255, 0.05)", border: "1px solid var(--glass-border)" }}
                >
                  Yes
                </button>
                <button 
                  onClick={() => setData({ ...data, citizenship: "no" })}
                  className="btn" 
                  style={{ flex: 1, background: data.citizenship === "no" ? "var(--primary)" : "rgba(255, 255, 255, 0.05)", border: "1px solid var(--glass-border)" }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.25rem" }}>Step 3: Residency</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <label>Have you lived in your current area for at least 30 days?</label>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button 
                  onClick={() => setData({ ...data, residency: "yes" })}
                  className="btn" 
                  style={{ flex: 1, background: data.residency === "yes" ? "var(--primary)" : "rgba(255, 255, 255, 0.05)", border: "1px solid var(--glass-border)" }}
                >
                  Yes
                </button>
                <button 
                  onClick={() => setData({ ...data, residency: "no" })}
                  className="btn" 
                  style={{ flex: 1, background: data.residency === "no" ? "var(--primary)" : "rgba(255, 255, 255, 0.05)", border: "1px solid var(--glass-border)" }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.25rem" }}>Step 4: Registration</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <label>Are you already registered to vote?</label>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button 
                  onClick={() => setData({ ...data, registered: "yes" })}
                  className="btn" 
                  style={{ flex: 1, background: data.registered === "yes" ? "var(--primary)" : "rgba(255, 255, 255, 0.05)", border: "1px solid var(--glass-border)" }}
                >
                  Yes
                </button>
                <button 
                  onClick={() => setData({ ...data, registered: "no" })}
                  className="btn" 
                  style={{ flex: 1, background: data.registered === "no" ? "var(--primary)" : "rgba(255, 255, 255, 0.05)", border: "1px solid var(--glass-border)" }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  if (result) {
    return (
      <div className="glass card" style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "1.5rem", padding: "3rem" }}>
        {result === "eligible" && (
          <>
            <div style={{ background: "rgba(16, 185, 129, 0.1)", width: "80px", height: "80px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
              <CheckCircle size={40} color="var(--success)" />
            </div>
            <div>
              <h2 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>You are Eligible!</h2>
              <p style={{ opacity: 0.7 }}>Everything looks good. You are ready to vote in upcoming elections.</p>
            </div>
            <button className="btn btn-primary" onClick={() => setResult(null)}>Done</button>
          </>
        )}
        {result === "action-required" && (
          <>
            <div style={{ background: "rgba(245, 158, 11, 0.1)", width: "80px", height: "80px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
              <AlertCircle size={40} color="var(--warning)" />
            </div>
            <div>
              <h2 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Registration Required</h2>
              <p style={{ opacity: 0.7 }}>You meet the basic requirements, but you need to register before you can vote.</p>
            </div>
            <button className="btn btn-primary">Register Now</button>
            <button className="btn" onClick={() => setResult(null)} style={{ background: "none" }}>Go Back</button>
          </>
        )}
        {result === "not-eligible" && (
          <>
            <div style={{ background: "rgba(239, 68, 68, 0.1)", width: "80px", height: "80px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
              <AlertCircle size={40} color="var(--error)" />
            </div>
            <div>
              <h2 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Not Eligible</h2>
              <p style={{ opacity: 0.7 }}>Based on your answers, you may not be eligible to vote at this time.</p>
            </div>
            <button className="btn" onClick={() => setResult(null)} style={{ background: "rgba(255, 255, 255, 0.05)" }}>Try Again</button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="glass card" style={{ maxWidth: "500px", width: "100%", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
          <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>Step {step} of 4</span>
          <span style={{ fontSize: "0.875rem", opacity: 0.5 }}>{Math.round((step / 4) * 100)}% Complete</span>
        </div>
        <div style={{ height: "4px", background: "var(--glass-border)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
          <div style={{ height: "100%", background: "var(--primary)", width: `${(step / 4) * 100}%`, transition: "width 0.3s ease" }} />
        </div>
      </div>

      <div style={{ minHeight: "200px" }}>
        {renderStep()}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
        <button 
          onClick={handleBack} 
          className="btn" 
          disabled={step === 1}
          style={{ opacity: step === 1 ? 0.3 : 1, background: "rgba(255, 255, 255, 0.05)", border: "1px solid var(--glass-border)" }}
        >
          <ChevronLeft size={18} /> Back
        </button>
        <button 
          onClick={handleNext} 
          className="btn btn-primary"
          style={{ gap: "0.5rem" }}
        >
          {step === 4 ? "Check Now" : "Continue"} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
