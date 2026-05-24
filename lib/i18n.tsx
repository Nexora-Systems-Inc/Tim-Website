"use client";
import { createContext, useContext, type ReactNode } from "react";
import type { Translations } from "@/locales/fr";
import fr from "@/locales/fr";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
export type Locale = "fr" | "en";

interface I18nContextValue {
  locale: Locale;
  t: Translations;
}

// ─────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────
const I18nContext = createContext<I18nContextValue>({
  locale: "fr",
  t: fr,
});

// ─────────────────────────────────────────────────────────────
// Provider
// Wire up: pass `locale` and corresponding `t` object.
// When the EN toggle is added, lift locale state here and
// swap `t` between the fr / en imports dynamically.
// ─────────────────────────────────────────────────────────────
export function I18nProvider({
  locale = "fr",
  t,
  children,
}: {
  locale?: Locale;
  t: Translations;
  children: ReactNode;
}) {
  return (
    <I18nContext.Provider value={{ locale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────
// Hook — use anywhere inside the tree
// ─────────────────────────────────────────────────────────────
export function useI18n() {
  return useContext(I18nContext);
}
