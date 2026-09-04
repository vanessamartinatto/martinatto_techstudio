"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { translations, type Dict, type Lang } from "@/lib/i18n";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "vm-tech-studio-lang";
const LANGS: Lang[] = ["it", "en", "pt"];

/* Minimal external store backed by localStorage. */
const listeners = new Set<() => void>();
let cachedLang: Lang | null = null;

function readLang(): Lang {
  if (cachedLang) return cachedLang;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && (LANGS as string[]).includes(saved)) {
      cachedLang = saved as Lang;
      return cachedLang;
    }
  } catch {
    // localStorage unavailable — fall through to default
  }
  cachedLang = "it";
  return cachedLang;
}

function getServerSnapshot(): Lang {
  return "it";
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function persistLang(next: Lang) {
  cachedLang = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // ignore persistence errors
  }
  listeners.forEach((fn) => fn());
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readLang, getServerSnapshot);

  const setLang = useCallback((next: Lang) => {
    persistLang(next);
  }, []);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: translations[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
