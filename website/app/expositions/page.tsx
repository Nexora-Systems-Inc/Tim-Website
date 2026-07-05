import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ExpositionsPlaceholder from "@/components/placeholders/ExpositionsPlaceholder";
import { SITE_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Expositions — ${SITE_TITLE}`,
  description: "Les prochaines expositions et présentations exclusives seront annoncées prochainement.",
};

export default function ExpositionsPage() {
  return (
    <main>
      <Navigation />
      <ExpositionsPlaceholder />
      <Footer />
    </main>
  );
}
