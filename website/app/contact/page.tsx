import type { Metadata } from "next";
import { Suspense } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import AboutContact from "@/components/about/AboutContact";
import { SITE_TITLE, createMetadata } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: `Contact — ${SITE_TITLE}`,
  description:
    "Que vous souhaitiez acquérir une œuvre, planifier une visite privée ou en savoir plus sur la collection, écrivez-nous pour entamer la conversation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main>
      <Navigation />
      <ContactHero />
      <Suspense fallback={null}>
        <AboutContact />
      </Suspense>
      <Footer />
    </main>
  );
}
