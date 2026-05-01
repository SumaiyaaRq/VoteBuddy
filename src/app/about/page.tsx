"use client";

import Link from "next/link";
import React from "react";
import { Info, Shield, Scale, Zap, ArrowLeft, Heart } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ActionButton } from "@/components/ui/ActionButton";

export default function AboutPage() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center",
      padding: "4rem 2rem",
      background: "radial-gradient(circle at top left, rgba(79, 70, 229, 0.05), transparent), radial-gradient(circle at bottom right, rgba(124, 58, 237, 0.05), transparent)"
    }}>
      <GlassCard style={{
        padding: "4rem 2rem",
        maxWidth: "900px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "3rem"
      }}>
        
        <div style={{ textAlign: "center" }}>
          <div style={{ 
            width: "60px", height: "60px", background: "rgba(79, 70, 229, 0.1)", borderRadius: "50%", 
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" 
          }}>
            <Info size={32} color="var(--primary)" />
          </div>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem", lineHeight: 1.1 }}>
            About VoteBuddy
          </h1>
          <p style={{ fontSize: "1.25rem", opacity: 0.7, maxWidth: "600px", margin: "0 auto" }}>
            Empowering citizens with knowledge, accessibility, and confidence to participate in democracy.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          <div>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem", color: "var(--primary)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Heart size={24} /> Our Mission
            </h2>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.7, opacity: 0.8 }}>
              VoteBuddy was created to simplify the voting process for everyone. We believe that a strong democracy relies on informed and engaged citizens. However, navigating election information, polling locations, and voter eligibility can often be confusing. Our platform provides a centralized, AI-powered assistant to make voting accessible, transparent, and easy.
            </p>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ padding: "1.5rem", background: "rgba(255, 255, 255, 0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)" }}>
              <h3 style={{ marginBottom: "0.5rem", fontSize: "1.125rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Shield size={18} color="var(--success)" /> Secure & Private
              </h3>
              <p style={{ fontSize: "0.9375rem", opacity: 0.6 }}>
                Your data is encrypted and protected. We prioritize your privacy while providing personalized voting information.
              </p>
            </div>
            <div style={{ padding: "1.5rem", background: "rgba(255, 255, 255, 0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)" }}>
              <h3 style={{ marginBottom: "0.5rem", fontSize: "1.125rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Scale size={18} color="var(--primary)" /> Neutral & Unbiased
              </h3>
              <p style={{ fontSize: "0.9375rem", opacity: 0.6 }}>
                VoteBuddy is non-partisan. We provide factual, verified information directly from official election sources without bias.
              </p>
            </div>
            <div style={{ padding: "1.5rem", background: "rgba(255, 255, 255, 0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)" }}>
              <h3 style={{ marginBottom: "0.5rem", fontSize: "1.125rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Zap size={18} color="var(--warning)" /> Real-time Updates
              </h3>
              <p style={{ fontSize: "0.9375rem", opacity: 0.6 }}>
                Get the latest information on polling centers, election dates, and ballot changes instantly.
              </p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: "3rem", display: "flex", gap: "1.5rem", justifyContent: "center" }}>
          <Link href="/">
            <ActionButton onClick={() => {}} variant="secondary" style={{ minWidth: "180px" }}>
              <ArrowLeft size={18} /> Back to Home
            </ActionButton>
          </Link>
          <Link href="/register">
            <ActionButton onClick={() => {}} variant="primary" style={{ minWidth: "180px" }}>
              Join VoteBuddy
            </ActionButton>
          </Link>
        </div>
      </GlassCard>
      
      <footer style={{ marginTop: "4rem", opacity: 0.4, fontSize: "0.875rem" }}>
        © 2026 VoteBuddy. Built for democracy.
      </footer>
    </div>
  );
}
