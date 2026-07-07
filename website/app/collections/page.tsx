import type { Metadata } from "next";
import { Suspense } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CollectionsHero from "@/components/collections/CollectionsHero";
import CollectionsGrid from "@/components/collections/CollectionsGrid";
import { SITE_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Collections — ${SITE_TITLE}`,
  description: "Parcourez plus de 950 œuvres originales d'artistes peintres québécois. Huiles, acryliques et techniques mixtes. Toutes taxes incluses.",
};

export default function CollectionsPage() {
  return (
    <main>
      <Navigation />
      <CollectionsHero />
      <Suspense fallback={null}>
        <CollectionsGrid />
      </Suspense>
      <Footer />
    </main>
  );
}
