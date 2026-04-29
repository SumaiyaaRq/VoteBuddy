"use client";

import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/services/firebase/firebaseConfig";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
      padding: "1rem"
    }}>
      <div className="glass card" style={{ maxWidth: "400px", width: "100%" }}>
        <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--foreground)", opacity: 0.7, textDecoration: "none", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
          <ArrowLeft size={16} /> Back to login
        </Link>
        
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Reset Password</h1>
          <p style={{ opacity: 0.7, fontSize: "0.875rem" }}>Enter your email address and we'll send you a link to reset your password.</p>
        </div>

        {error && (
          <div style={{
            padding: "0.75rem",
            background: "rgba(239, 68, 68, 0.1)",
            color: "var(--error)",
            borderRadius: "var(--radius-md)",
            marginBottom: "1rem",
            fontSize: "0.875rem",
            border: "1px solid rgba(239, 68, 68, 0.2)"
          }}>
            {error}
          </div>
        )}

        {message && (
          <div style={{
            padding: "0.75rem",
            background: "rgba(16, 185, 129, 0.1)",
            color: "var(--success)",
            borderRadius: "var(--radius-md)",
            marginBottom: "1rem",
            fontSize: "0.875rem",
            border: "1px solid rgba(16, 185, 129, 0.2)"
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleResetPassword} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              style={{
                padding: "0.75rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--glass-border)",
                background: "rgba(255, 255, 255, 0.05)",
                color: "var(--foreground)",
                outline: "none"
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !email}
            style={{ marginTop: "0.5rem" }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
