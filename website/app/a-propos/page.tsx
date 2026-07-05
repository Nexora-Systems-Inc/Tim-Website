import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import { SITE_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  title: `À propos — ${SITE_TITLE}`,
  description: "Fondée en 1994 à Sherbrooke, la Galerie Artistes Peintres est le sanctuaire de l'art québécois. Découvrez notre histoire, notre équipe et prenez contact.",
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
