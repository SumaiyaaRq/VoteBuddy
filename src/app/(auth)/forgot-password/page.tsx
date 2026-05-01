"use client";

import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/services/firebase/firebaseConfig";
import Link from "next/link";
import { ArrowLeft, Mail, Key, AlertCircle, CheckCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ActionButton } from "@/components/ui/ActionButton";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Please check your inbox.");
    } catch (err: any) {
      setError(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1.5rem",
      background: "radial-gradient(circle at top right, rgba(79, 70, 229, 0.1), transparent), radial-gradient(circle at bottom left, rgba(124, 58, 237, 0.1), transparent)"
    }}>
      <GlassCard style={{ maxWidth: "450px", width: "100%", padding: "2.5rem" }}>
        <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "inherit", opacity: 0.6, textDecoration: "none", marginBottom: "2rem", fontSize: "0.875rem", fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to login
        </Link>
        
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ 
            width: "60px", height: "60px", background: "var(--primary)", borderRadius: "var(--radius-md)", 
            display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem",
            boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)"
          }}>
            <Key size={32} color="white" />
          </div>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Reset Password</h1>
          <p style={{ opacity: 0.6, fontSize: "0.9375rem" }}>Enter your email address and we'll send you a link to reset your password.</p>
        </div>

        {error && (
          <div style={{
            padding: "1rem", background: "rgba(239, 68, 68, 0.08)", color: "var(--error)",
            borderRadius: "var(--radius-md)", marginBottom: "1.5rem", fontSize: "0.875rem",
            border: "1px solid rgba(239, 68, 68, 0.15)", display: "flex", alignItems: "center", gap: "0.75rem"
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div style={{
            padding: "1rem", background: "rgba(16, 185, 129, 0.08)", color: "var(--success)",
            borderRadius: "var(--radius-md)", marginBottom: "1.5rem", fontSize: "0.875rem",
            border: "1px solid rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", gap: "0.75rem"
          }}>
            <CheckCircle size={16} />
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleResetPassword} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Mail size={14} /> Email Address
            </label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com" required
              style={{
                padding: "0.875rem", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)",
                background: "rgba(255, 255, 255, 0.03)", color: "inherit", outline: "none", fontSize: "1rem"
              }}
            />
          </div>

          <ActionButton onClick={() => {}} variant="primary" fullWidth disabled={loading || !email} style={{ marginTop: "0.5rem" }}>
            {loading ? "Sending..." : "Send Reset Link"}
          </ActionButton>
        </form>
      </GlassCard>
    </div>
  );
}
