import { createContext } from "react";

import type { Translation } from "../i18n/translations";
import type { Language } from "../types/language";

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  content: Translation;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
