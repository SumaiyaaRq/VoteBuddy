"use client";

import React, { useState } from "react";
import { Calendar, MapPin, Search, Filter, Clock, CheckCircle } from "lucide-react";

// Mock Data
const upcomingElections = [
  {
    id: "elec_1",
    title: "General Municipal Election",
    date: "November 4, 2026",
    type: "Local",
    location: "Citywide",
    status: "Open for Registration",
    registrationDeadline: "October 15, 2026",
  },
  {
    id: "elec_2",
    title: "State Senate Special Election",
    date: "December 12, 2026",
    type: "State",
    location: "District 4",
    status: "Upcoming",
    registrationDeadline: "November 20, 2026",
  }
];

const pastElections = [
  {
    id: "elec_past_1",
    title: "Primary Gubernatorial Election",
    date: "May 14, 2024",
    type: "State",
    location: "Statewide",
    turnout: "64%",
    winner: "Results Certified",
  },
  {
    id: "elec_past_2",
    title: "City Council District 2",
    date: "November 5, 2023",
    type: "Local",
    location: "District 2",
    turnout: "42%",
    winner: "Results Certified",
  }
];

export default function ElectionsModule() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const filteredUpcoming = upcomingElections.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || e.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || e.type === filterType;
    return matchesSearch && matchesType;
  });

  const filteredPast = pastElections.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || e.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || e.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="glass card" style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Calendar size={24} color="var(--primary)" />
          Elections Center
        </h2>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", opacity: 0.5 }} />
            <input
              type="text"
              placeholder="Search elections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "0.5rem 1rem 0.5rem 2.5rem",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--glass-border)",
                background: "rgba(255, 255, 255, 0.05)",
                color: "var(--foreground)",
                outline: "none",
                width: "250px"
              }}
            />
          </div>
          <div style={{ position: "relative" }}>
            <Filter size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", opacity: 0.5 }} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{
                padding: "0.5rem 1rem 0.5rem 2.5rem",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--glass-border)",
                background: "rgba(255, 255, 255, 0.05)",
                color: "var(--foreground)",
                outline: "none",
                cursor: "pointer"
              }}
            >
              <option value="All" style={{ color: "#000" }}>All Types</option>
              <option value="Local" style={{ color: "#000" }}>Local</option>
              <option value="State" style={{ color: "#000" }}>State</option>
              <option value="National" style={{ color: "#000" }}>National</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", borderBottom: "1px solid var(--glass-border)", paddingBottom: "1rem" }}>
        <button
          onClick={() => setActiveTab("upcoming")}
          style={{
            background: "none", border: "none", color: "inherit",
            fontWeight: activeTab === "upcoming" ? 600 : 400,
            opacity: activeTab === "upcoming" ? 1 : 0.6,
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderBottom: activeTab === "upcoming" ? "2px solid var(--primary)" : "2px solid transparent",
            marginBottom: "-1rem"
          }}
        >
          Upcoming Elections
        </button>
        <button
          onClick={() => setActiveTab("past")}
          style={{
            background: "none", border: "none", color: "inherit",
            fontWeight: activeTab === "past" ? 600 : 400,
            opacity: activeTab === "past" ? 1 : 0.6,
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderBottom: activeTab === "past" ? "2px solid var(--primary)" : "2px solid transparent",
            marginBottom: "-1rem"
          }}
        >
          Past Elections
        </button>
      </div>

      {activeTab === "upcoming" && (
        <div style={{ display: "grid", gap: "1rem" }}>
          {filteredUpcoming.length > 0 ? filteredUpcoming.map(election => (
            <div key={election.id} style={{ padding: "1.5rem", background: "rgba(255, 255, 255, 0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>{election.title}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", opacity: 0.7, fontSize: "0.875rem", flexWrap: "wrap" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><Calendar size={14} /> {election.date}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><MapPin size={14} /> {election.location}</span>
                    <span style={{ background: "rgba(255,255,255,0.1)", padding: "0.1rem 0.5rem", borderRadius: "1rem" }}>{election.type}</span>
                  </div>
                </div>
                <span style={{
                  background: election.status.includes("Open") ? "rgba(16, 185, 129, 0.1)" : "rgba(79, 70, 229, 0.1)",
                  color: election.status.includes("Open") ? "var(--success)" : "var(--primary)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.875rem",
                  fontWeight: 500
                }}>
                  {election.status}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--warning)" }}>
                <Clock size={16} />
                Registration Deadline: {election.registrationDeadline}
              </div>
            </div>
          )) : (
            <div style={{ textAlign: "center", padding: "3rem", opacity: 0.5 }}>
              <p>No upcoming elections found matching your criteria.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "past" && (
        <div style={{ display: "grid", gap: "1rem" }}>
          {filteredPast.length > 0 ? filteredPast.map(election => (
            <div key={election.id} style={{ padding: "1.5rem", background: "rgba(255, 255, 255, 0.02)", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem", opacity: 0.9 }}>{election.title}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", opacity: 0.6, fontSize: "0.875rem", flexWrap: "wrap" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><Calendar size={14} /> {election.date}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><MapPin size={14} /> {election.location}</span>
                  </div>
                </div>
                <span style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.875rem",
                }}>
                  <CheckCircle size={14} color="var(--success)" />
                  {election.winner}
                </span>
              </div>
            </div>
          )) : (
            <div style={{ textAlign: "center", padding: "3rem", opacity: 0.5 }}>
              <p>No past elections found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
