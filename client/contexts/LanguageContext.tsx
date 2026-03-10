import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getDetectedLanguage,
  isRTLLanguage,
  SUPPORTED_LANGUAGES,
} from "@/lib/languages";
import { t } from "@/lib/translations";

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
  supportedLanguages: typeof SUPPORTED_LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use "en" as default to ensure context is always available
  const [currentLanguage, setCurrentLanguageState] = useState<string>("en");

  // Initialize language on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferred-language");
    const language = savedLanguage || getDetectedLanguage();
    setCurrentLanguageState(language);

    // Update document direction and lang attribute
    const htmlElement = document.documentElement;
    htmlElement.lang = language;
    htmlElement.dir = isRTLLanguage(language) ? "rtl" : "ltr";
  }, []);

  const setLanguage = (language: string) => {
    setCurrentLanguageState(language);
    localStorage.setItem("preferred-language", language);

    // Update document direction and lang attribute
    const htmlElement = document.documentElement;
    htmlElement.lang = language;
    htmlElement.dir = isRTLLanguage(language) ? "rtl" : "ltr";

    // Dispatch custom event for any external listeners
    window.dispatchEvent(
      new CustomEvent("languageChanged", {
        detail: { language },
      })
    );
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        t: (key: string) => t(key, currentLanguage),
        isRTL: isRTLLanguage(currentLanguage),
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
