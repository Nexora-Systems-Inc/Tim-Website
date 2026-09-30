import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ArtistesPlaceholder from "@/components/placeholders/ArtistesPlaceholder";
import { SITE_TITLE, createMetadata } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: `Artistes — ${SITE_TITLE}`,
  description: "Section bientôt disponible. Accès exclusif aux collections et aux expériences personnalisées de la galerie.",
  path: "/artistes",
});

export default function ArtistesPage() {
  return (
    <main>
      <Navigation />
      <ArtistesPlaceholder />
      <Footer />
    </main>
  );
}
