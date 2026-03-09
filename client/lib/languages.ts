// Language configuration system with support for 20+ languages
// Includes RTL languages (Arabic, Urdu, Hebrew, Farsi) and major regional languages

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  direction: "ltr" | "rtl";
  region?: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  // Major International Languages
  { code: "en", name: "English", nativeName: "English", direction: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", direction: "rtl" },

  // South Asian Languages (High priority for India market)
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    direction: "ltr",
    region: "India",
  },
  {
    code: "ur",
    name: "Urdu",
    nativeName: "اردو",
    direction: "rtl",
    region: "India/Pakistan",
  },
  {
    code: "ur-IN",
    name: "Urdu (Indian)",
    nativeName: "اردو (ہندوستانی)",
    direction: "rtl",
    region: "India",
  },
  {
    code: "ur-PK",
    name: "Urdu (Pakistani)",
    nativeName: "اردو (پاکستانی)",
    direction: "rtl",
    region: "Pakistan",
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    direction: "ltr",
    region: "Bangladesh/India",
  },
  {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    direction: "ltr",
    region: "India/Sri Lanka",
  },
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    direction: "ltr",
    region: "India",
  },
  {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    direction: "ltr",
    region: "India",
  },
  {
    code: "pa",
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    direction: "ltr",
    region: "India/Pakistan",
  },
  {
    code: "ml",
    name: "Malayalam",
    nativeName: "മലയാളം",
    direction: "ltr",
    region: "India",
  },

  // Middle Eastern & Islamic World Languages
  {
    code: "fa",
    name: "Farsi (Persian)",
    nativeName: "فارسی",
    direction: "rtl",
    region: "Iran",
  },
  { code: "he", name: "Hebrew", nativeName: "עברית", direction: "rtl" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", direction: "ltr" },

  // Major Global Languages
  { code: "es", name: "Spanish", nativeName: "Español", direction: "ltr" },
  { code: "fr", name: "French", nativeName: "Français", direction: "ltr" },
  { code: "de", name: "German", nativeName: "Deutsch", direction: "ltr" },
  { code: "zh", name: "Chinese (Simplified)", nativeName: "中文", direction: "ltr" },
  { code: "ja", name: "Japanese", nativeName: "日本語", direction: "ltr" },
  { code: "ko", name: "Korean", nativeName: "한국어", direction: "ltr" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", direction: "ltr" },
  { code: "pt", name: "Portuguese", nativeName: "Português", direction: "ltr" },
];

export const LANGUAGE_MAP = new Map(
  SUPPORTED_LANGUAGES.map((lang) => [lang.code, lang])
);

// Get the browser's preferred language
export function getDetectedLanguage(): string {
  if (typeof window === "undefined") return "en";

  // Try to get from browser
  const browserLang = navigator.language || navigator.languages?.[0];
  if (!browserLang) return "en";

  // Check for exact match
  const langCode = browserLang.toLowerCase().split("-")[0];
  if (LANGUAGE_MAP.has(langCode)) {
    return langCode;
  }

  // Fallback to English
  return "en";
}

// Get language direction (for RTL support)
export function getLanguageDirection(languageCode: string): "ltr" | "rtl" {
  const lang = LANGUAGE_MAP.get(languageCode);
  return lang?.direction || "ltr";
}

// Check if a language is RTL
export function isRTLLanguage(languageCode: string): boolean {
  return getLanguageDirection(languageCode) === "rtl";
}
