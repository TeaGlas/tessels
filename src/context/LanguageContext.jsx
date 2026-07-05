import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { t as translate, translateCategory, translateUnit } from "../lib/i18n.js";

const STORAGE_KEY = "tessels-lang";
const LanguageContext = createContext(null);

function readInitialLang() {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "nl" || stored === "en" ? stored : "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readInitialLang);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang((l) => (l === "en" ? "nl" : "en")),
      t: (key, ...args) => translate(lang, key, ...args),
      tCategory: (category) => translateCategory(category, lang),
      tUnit: (unit) => translateUnit(unit, lang),
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
