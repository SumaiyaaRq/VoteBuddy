"use client";

import React, { useState } from "react";
import { Search, MapPin, Navigation, Info, ExternalLink, Crosshair, AlertCircle, AlertTriangle } from "lucide-react";
import { useLocation } from "@/context/LocationContext";
import { GlassCard } from "../ui/GlassCard";
import { ActionButton } from "../ui/ActionButton";
import { StatusBadge } from "../ui/StatusBadge";
import { logger } from "@/services/logger";

interface Station {
  id: string;
  name: string;
  address: string;
  distance: string;
  isOpen: boolean;
}

export default function PollingLocator() {
  const { location, setLocation, requestGPS, error, loading: locationLoading } = useLocation();
  const [searchInput, setSearchInput] = useState(location.city || location.state || "");
  const [searching, setSearching] = useState(false);
  const [stations, setStations] = useState<Station[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Sync search input if location changes via GPS
  React.useEffect(() => {
    if (location.method === "gps" && location.city) {
      setSearchInput(`${location.city}, ${location.state}`);
      handleMockSearch(`${location.city}, ${location.state}`);
    }
  }, [location]);

  const handleMockSearch = (query: string) => {
    if (!query) return;
    setSearching(true);
    setHasSearched(true);
    logger.info("Polling Station Search", { query });
    
    // Simulate API call
    setTimeout(() => {
      // Mock "No Results" scenario for specific inputs
      if (query.toLowerCase().includes("nowhere") || query === "00000") {
        setStations([]);
        logger.warn("No stations found for query", { query });
      } else {
        setStations([
          { id: "1", name: "Central High School", address: "123 Education Way, Springfield", distance: "0.8 miles", isOpen: true },
          { id: "2", name: "Community Library", address: "456 Knowledge St, Springfield", distance: "1.2 miles", isOpen: true },
          { id: "3", name: "Westside Fire Station", address: "789 Safety Ave, Springfield", distance: "2.5 miles", isOpen: false },
        ]);
      }
      setSearching(false);
    }, 1200);
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput) return;
    
    setLocation({ ...location, city: searchInput, method: "manual" });
    handleMockSearch(searchInput);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div className="glass card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3>Find Your Polling Station</h3>
          <button 
            onClick={requestGPS}
            disabled={locationLoading}
            className="btn" 
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(16, 185, 129, 0.1)", color: "var(--success)", border: "1px solid rgba(16, 185, 129, 0.2)", fontSize: "0.875rem" }}
          >
            <Crosshair size={16} /> {locationLoading ? "Locating..." : "Use My Location"}
          </button>
        </div>
        
        {error && (
          <div style={{ padding: "0.75rem", background: "rgba(239, 68, 68, 0.1)", color: "var(--error)", borderRadius: "var(--radius-md)", marginBottom: "1rem", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleManualSearch} style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", opacity: 0.5 }} />
            <input 
              type="text" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter Zip Code, City, or State (Try 'nowhere' for empty state)"
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
          <button type="submit" className="btn btn-primary" disabled={searching || !searchInput}>
            {searching ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "1.5rem", minHeight: "500px" }}>
        {/* Map Container / Fallback */}
        <div className="glass card" style={{ 
          position: "relative", 
          overflow: "hidden", 
          background: "rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem"
        }}>
          {stations.length > 0 ? (
            <>
              <div style={{ position: "absolute", inset: 0, opacity: 0.15, background: "url('https://maps.googleapis.com/maps/api/staticmap?center=Springfield&zoom=13&size=600x600&key=MOCK_KEY') center/cover" }} />
              <div style={{ textAlign: "center", zIndex: 1 }}>
                <MapPin size={48} color="var(--primary)" style={{ marginBottom: "1rem" }} />
                <h4 style={{ marginBottom: "0.5rem" }}>Nearby Stations Ready</h4>
                <p style={{ maxWidth: "300px", opacity: 0.7, fontSize: "0.875rem" }}>
                  Interactive Google Map is currently in demonstration mode. Use the list to navigate to specific locations.
                </p>
                <div style={{ marginTop: "1.5rem" }}>
                   <ActionButton onClick={() => window.open(`https://www.google.com/maps/search/polling+stations+near+${location.city}`, "_blank")} variant="secondary" size="sm">
                     Open in Google Maps <ExternalLink size={14} />
                   </ActionButton>
                </div>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", zIndex: 1 }}>
              <AlertTriangle size={48} color="var(--warning)" style={{ marginBottom: "1rem", opacity: 0.5 }} />
              <p style={{ maxWidth: "300px", opacity: 0.5 }}>
                Enter your location to see nearby polling stations on the map.
              </p>
            </div>
          )}
          {/* Map Grid Pattern Overlay */}
          <div style={{ 
            position: "absolute", 
            inset: 0, 
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none"
          }} />
        </div>

        {/* Results List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h4 style={{ fontSize: "1rem", fontWeight: 600, opacity: 0.8 }}>
            {stations.length > 0 ? `${stations.length} Stations Found` : "Nearby Stations"}
          </h4>
          
          {stations.length === 0 && !searching && !hasSearched && (
            <div style={{ textAlign: "center", padding: "3rem 1rem", opacity: 0.5 }}>
              <Info size={32} style={{ margin: "0 auto 1rem auto" }} />
              <p>Enter your location or use GPS to find nearby polling places.</p>
            </div>
          )}

          {stations.length === 0 && !searching && hasSearched && (
             <div style={{ textAlign: "center", padding: "3rem 1rem", opacity: 0.8 }}>
               <AlertCircle size={32} color="var(--warning)" style={{ margin: "0 auto 1rem auto" }} />
               <p style={{ fontWeight: 500, marginBottom: "0.5rem" }}>No Polling Stations Found</p>
               <p style={{ fontSize: "0.875rem", opacity: 0.7 }}>We couldn't find any polling locations for "{searchInput}". Please try a different zip code or city.</p>
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
            <GlassCard key={station.id} style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h5 style={{ fontSize: "1rem", fontWeight: 600 }}>{station.name}</h5>
                <StatusBadge 
                  label={station.isOpen ? "Open" : "Closed"} 
                  variant={station.isOpen ? "success" : "error"} 
                  size="sm" 
                />
              </div>
              <p style={{ fontSize: "0.875rem", opacity: 0.7 }}>{station.address}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--primary)" }}>{station.distance}</span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <ActionButton 
                    onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(station.address)}`, "_blank")} 
                    variant="secondary" 
                    size="sm" 
                    style={{ padding: "0.4rem" }}
                    ariaLabel={`Get directions to ${station.name}`}
                  >
                    <Navigation size={16} />
                  </ActionButton>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
