"use client";

import React, { createContext, useContext, useState } from "react";

type Locale = "en" | "es" | "hi";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    eligibility: "Eligibility",
    polling_booths: "Polling Booths",
    profile: "Profile",
    welcome: "Hello",
    check_eligibility: "Check Eligibility",
    sign_out: "Sign Out",
  },
  es: {
    dashboard: "Panel",
    eligibility: "Elegibilidad",
    polling_booths: "Centros de Votación",
    profile: "Perfil",
    welcome: "Hola",
    check_eligibility: "Verificar Elegibilidad",
    sign_out: "Cerrar Sesión",
  },
  hi: {
    dashboard: "डैशबोर्ड",
    eligibility: "पात्रता",
    polling_booths: "मतदान केंद्र",
    profile: "प्रोफ़ाइल",
    welcome: "नमस्ते",
    check_eligibility: "पात्रता जाँचें",
    sign_out: "साइन आउट",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>("en");

  const t = (key: string) => {
    return translations[locale][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
