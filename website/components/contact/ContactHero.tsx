"use client";
import { useI18n } from "@/lib/i18n";
import DarkPageHero from "@/components/DarkPageHero";

export default function ContactHero() {
  const { t } = useI18n();
  const c = t.contactPage;

  return (
    <DarkPageHero
      eyebrow={c.hero_eyebrow}
      heading={c.hero_heading}
      sub={c.hero_sub}
    />
  );
}
