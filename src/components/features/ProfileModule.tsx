"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/services/firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User, Save, History, Calendar, MapPin, CreditCard, Activity, ShieldCheck } from "lucide-react";
import { UserProfile } from "@/types";


export default function ProfileModule() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "",
    age: "",
    city: "",
    state: "",
    voterId: "",
    hasVotedLastElection: false,
    registrationStatus: "not_registered",
    locationMethod: null
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (!user) return;
    
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          // Fallback to auth display name if new
          setProfile(prev => ({ ...prev, fullName: user.displayName || "" }));
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    const validate = () => {
      if (profile.fullName.length < 2) {
        setMessage({ text: "Name must be at least 2 characters.", type: "error" });
        return false;
      }
      if (profile.age && (parseInt(profile.age) < 13 || parseInt(profile.age) > 120)) {
        setMessage({ text: "Please enter a valid age (13-120).", type: "error" });
        return false;
      }
      return true;
    };

    setSaving(true);
    setMessage(null);

    if (!validate()) {
      setSaving(false);
      return;
    }

    try {
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, profile, { merge: true });
      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (err) {
      console.error("Error saving profile:", err);
      setMessage({ text: "Failed to save profile.", type: "error" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
        <div style={{ width: "30px", height: "30px", border: "2px solid var(--glass-border)", borderTopColor: "var(--primary)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "2rem" }}>
      <div className="glass card" style={{ padding: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <User size={24} color="var(--primary)" />
          Personal Details
        </h2>

        {message && (
          <div style={{
            padding: "0.75rem",
            background: message.type === "success" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
            color: message.type === "success" ? "var(--success)" : "var(--error)",
            borderRadius: "var(--radius-md)",
            marginBottom: "1.5rem",
            fontSize: "0.875rem",
            border: `1px solid ${message.type === "success" ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}`
          }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <User size={14} /> Full Name
              </label>
              <input
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                placeholder="Jane Doe"
                style={{
                  padding: "0.75rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--glass-border)",
                  background: "rgba(255, 255, 255, 0.03)",
                  color: "var(--foreground)",
                  outline: "none"
                }}
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Calendar size={14} /> Age
              </label>
              <input
                name="age"
                type="number"
                value={profile.age}
                onChange={handleChange}
                placeholder="e.g. 25"
                style={{
                  padding: "0.75rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--glass-border)",
                  background: "rgba(255, 255, 255, 0.03)",
                  color: "var(--foreground)",
                  outline: "none"
                }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <MapPin size={14} /> City
              </label>
              <input
                name="city"
                value={profile.city}
                onChange={handleChange}
                placeholder="Springfield"
                style={{
                  padding: "0.75rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--glass-border)",
                  background: "rgba(255, 255, 255, 0.03)",
                  color: "var(--foreground)",
                  outline: "none"
                }}
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>State</label>
              <input
                name="state"
                value={profile.state}
                onChange={handleChange}
                placeholder="IL"
                maxLength={2}
                style={{
                  padding: "0.75rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--glass-border)",
                  background: "rgba(255, 255, 255, 0.03)",
                  color: "var(--foreground)",
                  outline: "none",
                  textTransform: "uppercase"
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <CreditCard size={14} /> Voter ID (Optional)
            </label>
            <input
              name="voterId"
              value={profile.voterId}
              onChange={handleChange}
              placeholder="Enter your Voter ID number"
              style={{
                padding: "0.75rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--glass-border)",
                background: "rgba(255, 255, 255, 0.03)",
                color: "var(--foreground)",
                outline: "none"
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <ShieldCheck size={14} /> Registration Status
            </label>
            <select
              name="registrationStatus"
              value={profile.registrationStatus}
              onChange={(e) => setProfile({ ...profile, registrationStatus: e.target.value as any })}
              style={{
                padding: "0.75rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--glass-border)",
                background: "rgba(255, 255, 255, 0.03)",
                color: "var(--foreground)",
                outline: "none",
                cursor: "pointer"
              }}
            >
              <option value="not_registered" style={{ color: "#000" }}>Not Registered</option>
              <option value="pending" style={{ color: "#000" }}>Pending Verification</option>
              <option value="active" style={{ color: "#000" }}>Active / Registered</option>
            </select>
          </div>

          <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: "1.5rem", marginTop: "0.5rem", display: "flex", justifyContent: "flex-end" }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={saving}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Save size={16} /> {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div className="glass card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <h3 style={{ fontSize: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Activity size={20} color="var(--success)" />
            Voting Status
          </h3>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "rgba(255, 255, 255, 0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)" }}>
            <span style={{ fontSize: "0.875rem", opacity: 0.8 }}>Last Election</span>
            {profile.hasVotedLastElection ? (
              <span style={{ fontSize: "0.875rem", color: "var(--success)", fontWeight: 600, background: "rgba(16, 185, 129, 0.1)", padding: "0.2rem 0.6rem", borderRadius: "var(--radius-full)" }}>Voted</span>
            ) : (
              <span style={{ fontSize: "0.875rem", color: "var(--warning)", fontWeight: 600, background: "rgba(245, 158, 11, 0.1)", padding: "0.2rem 0.6rem", borderRadius: "var(--radius-full)" }}>Did Not Vote</span>
            )}
          </div>
        </div>

        <div className="glass card" style={{ padding: "1.5rem", flex: 1 }}>
          <h3 style={{ fontSize: "1.25rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <History size={20} color="var(--primary)" />
            Voting History
          </h3>
          
          <div style={{ position: "relative", paddingLeft: "1rem" }}>
            <div style={{ position: "absolute", top: 0, bottom: 0, left: "7px", width: "2px", background: "var(--glass-border)" }} />
            
            <div style={{ position: "relative", marginBottom: "1.5rem", opacity: profile.hasVotedLastElection ? 1 : 0.5 }}>
              <div style={{ position: "absolute", left: "-1rem", width: "12px", height: "12px", borderRadius: "50%", background: profile.hasVotedLastElection ? "var(--success)" : "var(--glass-border)", top: "6px" }} />
              <p style={{ fontWeight: 600, fontSize: "0.875rem" }}>May 14, 2024</p>
              <p style={{ fontSize: "0.75rem", opacity: 0.7 }}>Primary Gubernatorial Election</p>
            </div>
            
            <div style={{ position: "relative", marginBottom: "1.5rem" }}>
              <div style={{ position: "absolute", left: "-1rem", width: "12px", height: "12px", borderRadius: "50%", background: "var(--success)", top: "6px" }} />
              <p style={{ fontWeight: 600, fontSize: "0.875rem" }}>November 8, 2022</p>
              <p style={{ fontSize: "0.75rem", opacity: 0.7 }}>Midterm Elections</p>
            </div>
          </div>
        </div>

        <div className="glass card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShieldCheck size={20} color="var(--primary)" />
            Privacy & Data
          </h3>
          <p style={{ fontSize: "0.875rem", opacity: 0.8, marginBottom: "1rem", lineHeight: 1.5 }}>
            VoteBuddy only stores the information necessary to provide you with accurate election dates, polling locations, and eligibility criteria.
          </p>
          <ul style={{ fontSize: "0.875rem", opacity: 0.8, paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <li>Your <strong>Voter ID</strong> is kept strictly confidential and is only used to verify your registration status locally.</li>
            <li>Your <strong>Location</strong> data is only used to find nearby polling stations and is not sold to third parties.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
