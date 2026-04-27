"use client";

import React, { useState } from "react";
import { Search, MapPin, Navigation, Info, ExternalLink } from "lucide-react";

interface Station {
  id: string;
  name: string;
  address: string;
  distance: string;
  isOpen: boolean;
}

export default function PollingLocator() {
  const [zip, setZip] = useState("");
  const [searching, setSearching] = useState(false);
  const [stations, setStations] = useState<Station[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zip) return;
    
    setSearching(true);
    // Mock search results
    setTimeout(() => {
      setStations([
        { id: "1", name: "Central High School", address: "123 Education Way, Springfield", distance: "0.8 miles", isOpen: true },
        { id: "2", name: "Community Library", address: "456 Knowledge St, Springfield", distance: "1.2 miles", isOpen: true },
        { id: "3", name: "Westside Fire Station", address: "789 Safety Ave, Springfield", distance: "2.5 miles", isOpen: false },
      ]);
      setSearching(false);
    }, 1500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div className="glass card" style={{ padding: "1.5rem" }}>
        <h3 style={{ marginBottom: "1rem" }}>Find Your Polling Station</h3>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", opacity: 0.5 }} />
            <input 
              type="text" 
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="Enter Zip Code or City"
              style={{
                width: "100%",
                padding: "0.75rem 1rem 0.75rem 2.75rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--glass-border)",
                background: "rgba(255, 255, 255, 0.03)",
                color: "inherit",
                outline: "none"
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={searching}>
            {searching ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "1.5rem", minHeight: "500px" }}>
        {/* Mock Map Container */}
        <div className="glass card" style={{ 
          position: "relative", 
          overflow: "hidden", 
          background: "rgba(0, 0, 0, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{ textAlign: "center", zIndex: 1 }}>
            <MapPin size={48} color="var(--primary)" style={{ marginBottom: "1rem" }} />
            <p style={{ maxWidth: "300px", opacity: 0.7 }}>
              Interactive Google Map will be integrated here with your API key.
            </p>
          </div>
          {/* Map Grid Pattern */}
          <div style={{ 
            position: "absolute", 
            inset: 0, 
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.3
          }} />
        </div>

        {/* Results List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h4 style={{ fontSize: "1rem", fontWeight: 600, opacity: 0.8 }}>
            {stations.length > 0 ? `${stations.length} Stations Found` : "Nearby Stations"}
          </h4>
          
          {stations.length === 0 && !searching && (
            <div style={{ textAlign: "center", padding: "3rem 1rem", opacity: 0.5 }}>
              <Info size={32} style={{ marginBottom: "1rem" }} />
              <p>Enter your zip code to see nearby polling locations.</p>
            </div>
          )}

          {searching && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[1, 2, 3].map(i => (
                <div key={i} className="glass card" style={{ height: "100px", animation: "pulse 1.5s infinite" }} />
              ))}
              <style>{`@keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 0.8; } 100% { opacity: 0.5; } }`}</style>
            </div>
          )}

          {stations.map(station => (
            <div key={station.id} className="glass card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h5 style={{ fontSize: "1rem", fontWeight: 600 }}>{station.name}</h5>
                <span style={{ 
                  fontSize: "0.75rem", 
                  padding: "0.25rem 0.5rem", 
                  borderRadius: "var(--radius-full)",
                  background: station.isOpen ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                  color: station.isOpen ? "var(--success)" : "var(--error)"
                }}>
                  {station.isOpen ? "Open" : "Closed"}
                </span>
              </div>
              <p style={{ fontSize: "0.875rem", opacity: 0.7 }}>{station.address}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 500 }}>{station.distance}</span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button className="btn" style={{ padding: "0.4rem", background: "rgba(255, 255, 255, 0.05)", border: "1px solid var(--glass-border)" }}>
                    <Navigation size={16} />
                  </button>
                  <button className="btn" style={{ padding: "0.4rem", background: "rgba(255, 255, 255, 0.05)", border: "1px solid var(--glass-border)" }}>
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
