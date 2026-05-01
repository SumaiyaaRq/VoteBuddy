"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { logger } from "@/services/logger";

interface LocationData {
  city: string;
  state: string;
  coordinates: { lat: number; lng: number } | null;
  method: "gps" | "manual" | null;
}

interface LocationContextType {
  location: LocationData;
  setLocation: (data: LocationData) => void;
  requestGPS: () => void;
  error: string | null;
  loading: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<LocationData>({
    city: "",
    state: "",
    coordinates: null,
    method: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const requestGPS = () => {
    logger.info("Requesting GPS location");
    setLoading(true);
    setError(null);
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, you would reverse geocode here to get city/state
        setLocation({
          city: "San Francisco", // Mocked reverse geocode
          state: "CA",
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          method: "gps",
        });
        setLoading(false);
        logger.info("GPS Location retrieved", { city: "San Francisco", state: "CA" });
      },
      (err) => {
        const errorMsg = "Unable to retrieve your location. Please enter it manually.";
        setError(errorMsg);
        setLoading(false);
        logger.warn("GPS Location failed", { error: err.message });
      }
    );
  };

  const setManualLocation = (city: string, state: string) => {
    logger.info("Setting manual location", { city, state });
    setLocation({
      city,
      state,
      coordinates: null,
      method: "manual"
    });
  };

  return (
    <LocationContext.Provider value={{ location, setLocation, requestGPS, error, loading }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
