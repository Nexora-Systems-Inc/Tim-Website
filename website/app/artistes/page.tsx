import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ArtistesPlaceholder from "@/components/placeholders/ArtistesPlaceholder";

export const metadata: Metadata = {
  title: "Artistes — Galerie Artistes Peintres",
  description: "Section bientôt disponible. Accès exclusif aux collections et aux expériences personnalisées de la galerie.",
};

export default function ArtistesPage() {
  return (
    <main>
      <Navigation />
      <ArtistesPlaceholder />
      <Footer />
    </main>
  );
}
