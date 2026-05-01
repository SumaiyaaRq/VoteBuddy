"use client";

import React, { useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";
import { auth } from "@/services/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, LogIn, AlertCircle, CheckCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ActionButton } from "@/components/ui/ActionButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setError("");
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResendMessage("");
    setShowResend(false);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        setShowResend(true);
        setLoading(false);
        return;
      }

      router.push("/dashboard");

    }
    catch (err: any) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!auth.currentUser) return;
    try {
      await sendEmailVerification(auth.currentUser);
      setResendMessage("Verification email sent! Please check your inbox.");
      setShowResend(false);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to send verification email.");
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
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ 
            width: "60px", height: "60px", background: "var(--primary)", borderRadius: "var(--radius-md)", 
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem",
            boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)"
          }}>
            <LogIn size={32} color="white" />
          </div>
          <h1 style={{ fontSize: "2.25rem", marginBottom: "0.5rem" }}>Welcome Back</h1>
          <p style={{ opacity: 0.6 }}>Login to your VoteBuddy account</p>
        </div>

        {error && (
          <div style={{
            padding: "1rem", background: "rgba(239, 68, 68, 0.08)", color: "var(--error)",
            borderRadius: "var(--radius-md)", marginBottom: "1.5rem", fontSize: "0.875rem",
            border: "1px solid rgba(239, 68, 68, 0.15)", display: "flex", flexDirection: "column", gap: "0.75rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
            {showResend && (
              <button 
                onClick={handleResendVerification}
                style={{ alignSelf: "flex-start", background: "none", border: "none", color: "var(--error)", fontWeight: 700, cursor: "pointer", padding: 0, fontSize: "0.875rem", textDecoration: "underline" }}
              >
                Resend Verification Email
              </button>
            )}
          </div>
        )}

        {resendMessage && (
          <div style={{
            padding: "1rem", background: "rgba(16, 185, 129, 0.08)", color: "var(--success)",
            borderRadius: "var(--radius-md)", marginBottom: "1.5rem", fontSize: "0.875rem",
            border: "1px solid rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", gap: "0.5rem"
          }}>
            <CheckCircle size={16} />
            <span>{resendMessage}</span>
          </div>
        )}

        <form onSubmit={handleEmailLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
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

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Lock size={14} /> Password
              </label>
              <Link href="/forgot-password" style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 500 }}>Forgot password?</Link>
            </div>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" required
              style={{
                padding: "0.875rem", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)",
                background: "rgba(255, 255, 255, 0.03)", color: "inherit", outline: "none", fontSize: "1rem"
              }}
            />
          </div>

          <ActionButton onClick={() => {}} variant="primary" fullWidth disabled={loading} style={{ marginTop: "0.5rem" }}>
            {loading ? "Signing in..." : "Sign In"}
          </ActionButton>
        </form>

        <div style={{ margin: "2rem 0", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--glass-border)" }}></div>
          <span style={{ fontSize: "0.75rem", opacity: 0.4, fontWeight: 600 }}>OR</span>
          <div style={{ flex: 1, height: "1px", background: "var(--glass-border)" }}></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="btn"
          style={{
            width: "100%", background: "rgba(255, 255, 255, 0.05)", border: "1px solid var(--glass-border)",
            display: "flex", gap: "0.75rem", padding: "0.875rem"
          }}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20" />
          <span style={{ fontWeight: 600 }}>Continue with Google</span>
        </button>

        <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.9375rem", opacity: 0.7 }}>
          Don't have an account? <Link href="/register" style={{ color: "var(--primary)", fontWeight: 700 }}>Sign up</Link>
        </p>
      </GlassCard>
    </div>
  );
}
