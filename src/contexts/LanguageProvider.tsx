import { useMemo, useState } from "react";
import type { ReactNode } from "react";

import { translations } from "../i18n/translations";
import type { Language } from "../types/language";
import { LanguageContext } from "./LanguageContext";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      content: translations[language]
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
