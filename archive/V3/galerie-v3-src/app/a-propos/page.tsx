import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutValues from "@/components/about/AboutValues";
import AboutTeam from "@/components/about/AboutTeam";
import AboutPress from "@/components/about/AboutPress";
import AboutContact from "@/components/about/AboutContact";

export const metadata: Metadata = {
  title: "À propos — Galerie Artistes Peintres",
  description: "Fondée en 1994 à Sherbrooke, la Galerie Artistes Peintres est le sanctuaire de l'art québécois. Découvrez notre histoire, notre équipe et prenez contact.",
};

export default function AboutPage() {
  return (
    <main>
      <Navigation />
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutTeam />
      <AboutPress />
      <AboutContact />
      <Footer />
    </main>
  );
}
