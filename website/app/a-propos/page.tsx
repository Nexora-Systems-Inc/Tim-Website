import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import { SITE_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  title: `À propos — ${SITE_TITLE}`,
  description:
    "Découvrez le parcours de Manon Lalonde, artiste peintre — de ses premiers cours à une démarche artistique toujours en exploration.",
};

export default function AboutPage() {
  return (
    <main>
      <Navigation />
      <AboutHero />
      <AboutStory />
      <Footer />
    </main>
  );
}
