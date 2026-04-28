"use client";

import React, { useState } from "react";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { auth } from "@/services/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
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
      padding: "1rem"
    }}>
      <div className="glass card" style={{ maxWidth: "400px", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Create Account</h1>
          <p style={{ opacity: 0.7 }}>Join VoteBuddy today</p>
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

        <form onSubmit={handleEmailRegister} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
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

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
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
            disabled={loading}
            style={{ marginTop: "0.5rem" }}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div style={{ margin: "1.5rem 0", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--glass-border)" }}></div>
          <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>OR</span>
          <div style={{ flex: 1, height: "1px", background: "var(--glass-border)" }}></div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="btn" 
          style={{ 
            width: "100%", 
            background: "rgba(255, 255, 255, 0.05)", 
            border: "1px solid var(--glass-border)",
            display: "flex",
            gap: "0.75rem"
          }}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" />
          Continue with Google
        </button>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", opacity: 0.7 }}>
          Already have an account? <Link href="/login" style={{ color: "var(--primary)", fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
