"use client";

import React, { useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";
import { auth } from "@/services/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, UserPlus, AlertCircle, CheckCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ActionButton } from "@/components/ui/ActionButton";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      
      // We can't use alert() in SSR sometimes, but this is client side.
      // Better to use a state-based message.
      setError("success:Verification email sent! Please check your inbox before logging in.");
      
      setTimeout(() => {
        router.push("/login");
      }, 3000);

    }
    catch (err: any) {
      setError(err.message || "Failed to create an account.");
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
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ 
            width: "60px", height: "60px", background: "var(--primary)", borderRadius: "var(--radius-md)", 
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem",
            boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)"
          }}>
            <UserPlus size={32} color="white" />
          </div>
          <h1 style={{ fontSize: "2.25rem", marginBottom: "0.5rem" }}>Create Account</h1>
          <p style={{ opacity: 0.6 }}>Join VoteBuddy today</p>
        </div>

        {error && (
          <div style={{
            padding: "1rem", 
            background: error.startsWith("success:") ? "rgba(16, 185, 129, 0.08)" : "rgba(239, 68, 68, 0.08)", 
            color: error.startsWith("success:") ? "var(--success)" : "var(--error)",
            borderRadius: "var(--radius-md)", marginBottom: "1.5rem", fontSize: "0.875rem",
            border: error.startsWith("success:") ? "1px solid rgba(16, 185, 129, 0.15)" : "1px solid rgba(239, 68, 68, 0.15)", 
            display: "flex", alignItems: "center", gap: "0.75rem"
          }}>
            {error.startsWith("success:") ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            <span>{error.replace("success:", "")}</span>
          </div>
        )}

        <form onSubmit={handleEmailRegister} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
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
            <label style={{ fontSize: "0.875rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Lock size={14} /> Password
            </label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" required
              style={{
                padding: "0.875rem", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)",
                background: "rgba(255, 255, 255, 0.03)", color: "inherit", outline: "none", fontSize: "1rem"
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Lock size={14} /> Confirm Password
            </label>
            <input
              type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••" required
              style={{
                padding: "0.875rem", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)",
                background: "rgba(255, 255, 255, 0.03)", color: "inherit", outline: "none", fontSize: "1rem"
              }}
            />
          </div>

          <ActionButton type="submit" variant="primary" fullWidth disabled={loading} style={{ marginTop: "0.5rem" }}>
            {loading ? "Creating Account..." : "Sign Up"}
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
          Already have an account? <Link href="/login" style={{ color: "var(--primary)", fontWeight: 700 }}>Sign in</Link>
        </p>
      </GlassCard>
    </div>
  );
}
