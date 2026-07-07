"use client";
import { useI18n } from "@/lib/i18n";
import DarkPageHero from "@/components/DarkPageHero";

export default function AboutHero() {
  const { t } = useI18n();
  const a = t.aboutPage;

  return (
    <DarkPageHero
      eyebrow={a.hero_eyebrow}
      heading={a.hero_heading}
      sub={a.hero_sub}
    />
  );
}
