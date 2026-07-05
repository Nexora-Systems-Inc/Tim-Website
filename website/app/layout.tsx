import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import fr from "@/locales/fr";

export const metadata: Metadata = {
  title: "Galerie Artistes Peintres — Sherbrooke",
  description: "Une sélection de plus de 950 œuvres d'artistes peintres québécois. Des créations uniques pour compléter votre univers, taxes incluses.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      {/* lang="fr" for current locale — swap to "en" when toggle is wired */}
      <body className="grain">
        {/*
          i18n: Default locale is "fr".
          When adding the EN toggle:
          1. Lift locale state to a client wrapper around I18nProvider
          2. Import `en` from "@/locales/en" and pass it as `t` when locale === "en"
          3. Persist user choice in localStorage / cookie
        */}
        <I18nProvider locale="fr" t={fr}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
