import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ArtistesPlaceholder from "@/components/placeholders/ArtistesPlaceholder";
import { SITE_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Artistes — ${SITE_TITLE}`,
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
