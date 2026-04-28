import Link from "next/link";
import React from "react";

export default function AboutPage() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center",
      padding: "4rem 2rem",
    }}>
      <div className="glass" style={{
        padding: "4rem 2rem",
        borderRadius: "var(--radius-lg)",
        maxWidth: "800px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "2rem"
      }}>
        
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem", lineHeight: 1.1 }}>
            About VoteBuddy
          </h1>
          <p style={{ fontSize: "1.25rem", opacity: 0.8, maxWidth: "600px", margin: "0 auto" }}>
            Empowering citizens with knowledge, accessibility, and confidence to participate in democracy.
          </p>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--primary)" }}>Our Mission</h2>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.6, opacity: 0.9 }}>
            VoteBuddy was created to simplify the voting process for everyone. We believe that a strong democracy relies on informed and engaged citizens. However, navigating election information, polling locations, and voter eligibility can often be confusing. Our platform provides a centralized, AI-powered assistant to make voting accessible, transparent, and easy.
          </p>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "1.5rem",
          marginTop: "2rem",
        }}>
          <div className="card" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
            <h3 style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>🔒 Secure & Private</h3>
            <p style={{ fontSize: "0.95rem", opacity: 0.7, lineHeight: 1.5 }}>
              Your data is encrypted and protected. We prioritize your privacy while providing personalized voting information.
            </p>
          </div>
          <div className="card" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
            <h3 style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>⚖️ Neutral & Unbiased</h3>
            <p style={{ fontSize: "0.95rem", opacity: 0.7, lineHeight: 1.5 }}>
              VoteBuddy is non-partisan. We provide factual, verified information directly from official election sources without bias.
            </p>
          </div>
          <div className="card" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
            <h3 style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>⚡ Real-time Updates</h3>
            <p style={{ fontSize: "0.95rem", opacity: 0.7, lineHeight: 1.5 }}>
              Get the latest information on polling center wait times, election dates, and ballot changes instantly.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "3rem" }}>
          <Link href="/" className="btn" style={{ 
            minWidth: "160px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--glass-border)"
          }}>
            Back to Home
          </Link>
          <Link href="/register" className="btn btn-primary" style={{ minWidth: "160px" }}>
            Join VoteBuddy
          </Link>
        </div>
      </div>
    </div>
  );
}
