import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { translations } from "../i18n/translations";
import type { Language } from "../types/language";
import { LanguageContext } from "./LanguageContext";

const STORAGE_KEY = "cv-language";

const isLanguage = (value: string | null | undefined): value is Language =>
  value === "es" || value === "en";

/**
 * Prioridad: ?lang= en la URL > elección previa guardada > idioma del navegador > español.
 * El inglés sólo se activa si el navegador lo declara explícitamente; cualquier otro
 * idioma cae en español, que es el mercado principal.
 */
const detectLanguage = (): Language => {
  if (typeof window === "undefined") {
    return "es";
  }

  const fromQuery = new URLSearchParams(window.location.search).get("lang")?.toLowerCase();
  if (isLanguage(fromQuery)) {
    return fromQuery;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLanguage(stored)) {
      return stored;
    }
  } catch {
    // localStorage puede estar bloqueado (modo privado / cookies deshabilitadas).
  }

  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of preferred) {
    const base = tag?.toLowerCase().split("-")[0];
    if (base === "es") return "es";
    if (base === "en") return "en";
  }

  return "es";
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectLanguage);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  /**
   * Sólo se persiste cuando la persona cambia el idioma a mano. Si se guardara
   * también el valor autodetectado, la detección del navegador dejaría de
   * aplicar a partir de la primera visita.
   */
  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);

    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Persistir la preferencia es opcional; no debe romper la app.
    }
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      content: translations[language]
    }),
    [language, setLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
